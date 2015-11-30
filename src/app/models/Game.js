// Import Mixins
import EventEmitter from '../mixins/eventEmitter';

// Import Utils
import Utils     from '../services/Utils';
import Logger    from '../services/Logger';
import Config    from '../../Config';
import Rng       from '../services/Rng';

// Import Models
import BaseModel from './BaseModel';
import Player    from './objects/Player';
import Enemy     from './objects/Monster';
import Room      from './objects/Room';
import MainMenu  from './objects/MainMenu';
import Lobby     from './objects/Lobby';
import Ui        from './objects/Ui';

export default class extends BaseModel {

    get currentState() {return this._currentState;}
    get mainMenu() {return this._mainMenu;}
    get lobby() {return this._lobby;}
    get players() {return this._players;}
    get localPlayer() {return this._localPlayer;}
    get room() {return this._room;}
    get ui() {return this._ui;}

    constructor() {
        super();

        this._states = new Set([
            "main menu",
            "lobby",
            "playing"
        ]);

        this._mainMenu = new MainMenu();
        this._lobby    = new Lobby();
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */
    init(dispatcher) {
        return new Promise((res, rej)=>{
            this._dispatcher = dispatcher;

            this._players = new Map();

            // LISTEN FOR EVENTS
            //this.listenToDispatcher(this._dispatcher);
            this._dispatcher.onmessage = this.handleMessage.bind(this);

            res();
        });
    }

    /**
     * Update the game state if its allowed
     * Make sure we emit it
     */
    set currentState(state) {
        if(this._states.has(state)) {
            this._currentState = state;
            if(this._currentState == "main menu") {
                // Reset all players
                this._players     = new Map();
                this._localPlayer = undefined;
            }
            this.emit("game-state", this._currentState);
        }
    }

    /**
     * Call this function after any playerstae change so we can decide what to do.
     */
    checkPlayerState() {
        // If we are in the loby decide if we need to start the game
        if(this.currentState === "lobby") {
            let readyToStart = true;
            for(let player of this.players.values()) {
                readyToStart = readyToStart && player.currentState === "ready";
            }

            if(readyToStart) {
                Logger.banner("STARTING GAME");
                this._startPlaying();
            }
        }
    }

    checkPlayerAction(p) {
        if(this.currentState === "playing") {
            if(this._room.currentState === "idle") {
                let readyToMove = true;
                for(let player of this.players.values()) {
                    readyToMove = readyToMove && player.currentAction.get("action") === "ready";
                }

                if(readyToMove) {
                    this._lookForTrouble();
                }
            } else if (this._room.currentState === "battle") {
                let actionName = p.currentAction.get("action");
                if(actionName !== "thinking" && p.readyToAttack) {
                    this._playerAction(p);
                }
            }
        }
    }

    _startPlaying() {
        // Create a room
        this._room        = new Room();
        this._ui          = new Ui();
        this.currentState = "playing";

        for(let player of this.players.values()) {
            player.currentState = "idle";
        }
    }

    _lookForTrouble() {
        // Set room to moving
        this._room.currentState = "moving";

        // Set players to walking
        for(let player of this.players.values()) {
            player.resetActionCycle();
            player.currentState = "walking";
        }

        // Create enemies
        let enemy = new Enemy();
        this.emit("add-enemy", enemy);

        this._enemies = new Set([
            enemy
        ]);

        setTimeout(()=>{
            this._startBattle();
        }, 2000);
    }

    _startBattle() {
        this._room.currentState = "battle";
        this._ui.setBattleOptions();

        for(let player of this.players.values()) {
            player.beginCombat();

            player.onCooldown = ()=>{
                this.checkPlayerAction(player);
                this.emit("player-cooldown", player);
            };

            player.chargeCooldown();
        }

        this.emit('start-battle');
    }

    _playerAction(p) {
        let action = p.currentAction;
        if(action.get("action") === "attack") {
            p.walkForward(()=>{
                p.attack(()=>{
                    this._combatPhase();
                    p.nextActionCycle();
                    p.walkBack(()=>{
                        if(this._room.currentState === "idle") {
                            p.endCombat();
                        }
                    });
                });
            });
        } else {
            p.nextActionCycle();
        }
    }

    _combatPhase() {
        let shouldEndBattle = true;
        for(let enemy of this._enemies.values()) {
            enemy.health--;
            shouldEndBattle = shouldEndBattle && (enemy.health <= 0);
        }

        if(shouldEndBattle) {
            this._endBattle();
        }
    }

    _endBattle() {
        for(let player of this.players.values()) {
            if(player.currentState === "idle") {
                player.endCombat();
            }
        }

        this._room.currentState = "idle";
        this._ui.setIdleOptions();
        this.emit('end-battle');
    }

    /**
     * Adds a player regardless of remote or local
     */
    addPlayer(p, isLocal) {
        let yPos = 2.2;

        if(this._players.size) {
            yPos += 1.1*this._players.size;
        }

        p.yPos = yPos;

        this._players.set(p.id, p);
        if(isLocal) {
            this._localPlayer = p;
        }
        this.emit("add-player", p);
    }

    handleMessage(message) {
        Logger.debug("Message recieved from dispatcher");
        Logger.log(message);

        // Assign event name and data
        let eventName = message.event;
        let data = message.data;

        if(eventName == "game-start") {
            this.currentState = "main menu";
        } else if(message.event == "game-state") {
            this.currentState = data;
        } else if(message.event == "add-player") {
            let p = new Player(data.name, message.from, data.job);
            this.addPlayer(p, data.isLocal);
        } else if(message.event == "player-remove") {
            // Remove the peers player from the game
            // Get and then delete player
            let playerToRemove = this._players.get(data);
            let playerRemoved  = this._players.delete(playerToRemove.id);

            // Make sure the player was there
            if(playerRemoved) {
                this.emit("remove-player", playerToRemove);

                if(this.currentState == "lobby") {
                    for(let player of this._players.values()) {
                        player.currentState = "idle";
                    }
                }
            }
        } else if(message.event == "player-job") {
            // Alter player's job
            let player = this._players.get(message.from);
            player.job = data.job;
        } else if(message.event == "player-state") {
            // Alter player's state
            let player = this._players.get(message.from);
            player.currentState = data.state;

            // Progress Game logic accoridng to player state
            this.checkPlayerState();
        } else if(message.event == "player-action") {
            let player = this._players.get(message.from);

            let action = Immutable.Map(data);
            player.currentAction = action;

            this.checkPlayerAction(player);
        }
    }
}
