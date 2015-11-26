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
            this.listenToDispatcher(this._dispatcher);

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
            Logger.debug("Players are ready? " + readyToStart);

            if(readyToStart) {
                Logger.banner("STARTING GAME");
                this._startPlaying();
            }
        }
    }

    checkPlayerAction(p, message) {
        if(this.currentState === "playing") {
            if(this._room.currentState == "idle") {
                let readyToMove = true;
                for(let player of this.players.values()) {
                    readyToMove = readyToMove && player.currentAction === "ready";
                }

                if(readyToMove) {
                    this._lookForTrouble();
                }
            } else if (this._room.currentState == "battle") {
                if(message === "attack") {
                    this._playerAttack(p);
                }
            }
        }
    }




    /**
     * Return current state
     */
    get currentState() {return this._currentState;}

    /**
     * Return main menu
     */
    get mainMenu() {return this._mainMenu;}

    /**
     * Return lobby
     */
    get lobby() {return this._lobby;}

    /**
     * Return players
     */
    get players() {return this._players;}

    /**
     * Return the local player
     */
    get localPlayer() {return this._localPlayer;}

    /**
     * Return Current Room
     */
    get room() {return this._room;}

    /**
     * Return Ui Room
     */
    get ui() {return this._ui;}

    _startMenu() {
        this.currentState = "main menu";
    }

    _startMultiplayer() {
        this.currentState = "lobby";
    }

    _startPlaying() {
        // Create a room
        this._room        = new Room();
        this._ui          = new Ui();
        this.currentState = "playing";
    }

    _lookForTrouble() {
        // Set room to moving
        this._room.currentState = "moving";

        // Set players to walking
        for(let player of this.players.values()) {
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
            player.chargeCooldown(this._playerCooldownReady.bind(this));
        }
        this.emit('start-battle');
    }

    _playerCooldownReady(player) {
        this.emit("player-cooldown", player);
        if(player.currentAction === "attack") {
            this._playerAttack(player);
        }
    }

    _playerAttack(p) {
        if(p.readyToAttack) {
            this._combatPhase();
            p.chargeCooldown(this._playerCooldownReady.bind(this));
            this.emit("player-attack", p);
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
        this._room.currentState = "idle";
        this._ui.setIdleOptions();
        this.emit('end-battle');

        for(let player of this.players.values()) {
            player.endCombat();
        }
    }

    /**
     * Listen to events from the dispatcher and respond acordingly
     */
    listenToDispatcher(dispatcher) {
        dispatcher.on("start-game", this._startMenu.bind(this));
        dispatcher.on("start-mp",   this._startMultiplayer.bind(this));

        // Listen to game state events
        dispatcher.on("game-state", (message)=>{
            this.currentState = message;
        });

        dispatcher.on("add-player", (message)=>{
            Logger.debug("Game: Add Player message recieved");
            Logger.log(message);

            let p = new Player(message.name, message.id, message.job);

            p.init().then(()=>{
                this.addPlayer(p, message.isLocal);
            });
        });

        // Remove the peers player from the game
        dispatcher.on("remove-player", (message)=>{
            Logger.debug("Game: Remove Player message recieved");
            Logger.log(message);

            // Get and then delete player
            let playerToRemove = this._players.get(message.id);
            let playerRemoved = this._players.delete(playerToRemove.id);

            // Make sure the player was there
            if(playerRemoved) {
                this.emit("remove-player", playerToRemove);

                if(this.currentState == "lobby") {
                    for(let player of this._players.values()) {
                        player.currentState = "idle";
                    }
                }
            }
        });

        // Alter player's job
        dispatcher.on("player-job", (message)=>{
            let player = this._players.get(message.id);
            player.job = message.job;
        });

        // Alter player's state
        dispatcher.on("player-state", (message)=>{
            Logger.debug("Game: Remote Player State message recieved");
            Logger.log(message);

            let player = this._players.get(message.id);
            player.currentState = message.state;

            // Progress Game logic accoridng to player state
            this.checkPlayerState();
        });

        // Listen for remote option select
        // CHANGE TO PLAYER-ACTION
        dispatcher.on("option-select", (message)=>{
            let player = this._players.get(message.id);
            player.currentAction = message.option;
            this.checkPlayerAction(player, message.option);
        });
    }

    /**
     * Adds a player regardless of remote or local
     */
    addPlayer(p, isLocal) {
        Logger.debug("Game: Adding Player");
        Logger.log(p);
        let players = this._players.values();
        let yPos = .8;
        for(let player of players) {
            yPos = player.yPos;
            player.currentState = "idle";
        }
        yPos += 1.2;
        p.yPos = yPos;
        this._players.set(p.id, p);
        if(isLocal) {
            this._localPlayer = p;
        }
        this.emit("add-player", p);
    }
}
