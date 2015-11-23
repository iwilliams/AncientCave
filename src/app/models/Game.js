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
            this._localPlayers = new Map();
            this._remotePlayers = new Map();

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
                this._players       = new Map();
                this._localPlayers  = new Map();
                this._remotePlayers = new Map();
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

    checkPlayerAction() {
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
                let readyToAttack = true;
                for(let player of this.players.values()) {
                    readyToAttack = readyToAttack && player.currentAction === "attack";
                }

                if(readyToAttack) {
                    this._combatPhase();
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
            player.currentState  = "idle";
            player.currentAction = "action";
        }
        this.emit('start-battle');
    }

    _combatPhase() {
        let shouldEndBattle = true;
        for(let enemy of this._enemies.values()) {
            enemy.health--;
            shouldEndBattle = shouldEndBattle && (enemy.health <= 0);
        }

        Logger.debug("Combat Phase: " + shouldEndBattle);

        if(shouldEndBattle) {
            this._room.currentState = "idle";
            this._ui.setIdleOptions();
            this.emit('end-battle');
        }

        for(let player of this.players.values()) {
            player.currentState  = "idle";
            player.currentAction = "thinking";
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

        // Add player when peer connects
        dispatcher.on("add-remote-player", (message)=>{
            Logger.debug("Game: Add Remote Player message recieved");
            Logger.log(message);

            let p = new Player(message.name, message.id);

            p.init().then(()=>{
                this.addRemotePlayer(p);
            });
        });

        dispatcher.on("add-local-player", (message)=>{
            Logger.debug("Game: Add Local Player message recieved");
            Logger.log(message);

            let p = new Player(message.name, message.id);

            p.init().then(()=>{
                this.addLocalPlayer(p);
            });
        });

        // Remove the peers player from the game
        dispatcher.on("remove-player", (message)=>{
            Logger.debug("Game: Remove Player message recieved");
            Logger.log(message);

            this._players.delete(message.id);
            this._localPlayers.delete(message.id);
            this._remotePlayers.delete(message.id);

            for(let player of this._players.values()) {
                player.currentState = "idle";
            }
        });

        // Sync Local Player state
        dispatcher.on("local-player-state", (message)=>{
            Logger.debug("Game: Local Player State message recieved");
            Logger.log(message);

            for(let player of this._localPlayers.values()) {
                player.currentState = message.state;
            }

            // Progress Game logic accoridng to player state
            this.checkPlayerState();
        });

        // Sync Remote Player state
        dispatcher.on("remote-player-state", (message)=>{
            Logger.debug("Game: Remote Player State message recieved");
            Logger.log(message);

            let player = this._remotePlayers.get(message.id);
            player.currentState = message.state;

            // Progress Game logic accoridng to player state
            this.checkPlayerState();
        });

        // Listen for local option select
        // CHANGE TO PLAYER-ACTION
        dispatcher.on("local-option-select", (message)=>{
            Logger.debug("Game: local-option-select");
            Logger.log(message);
            for(let player of this._localPlayers.values()) {
                player.currentAction = message;
            }
            this.checkPlayerAction();
        });

        // Listen for remote option select
        // CHANGE TO PLAYER-ACTION
        dispatcher.on("remote-option-select", (message)=>{
            let player = this._remotePlayers.get(message.id);
            player.currentAction = message.option;
            this.checkPlayerAction();
        });
    }

    /**
     * Add a Local Player
     */
    addLocalPlayer(p) {
        this._localPlayers.set(p.id, p);
        this.addPlayer(p);
    }

    /**
     * Add a Remote Player
     */
    addRemotePlayer(p) {
        this._remotePlayers.set(p.id, p);
        this.addPlayer(p);
    }

    /**
     * Adds a player regardless of remote or local
     */
    addPlayer(p) {
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
        this.emit("add-player", p);
    }
}
