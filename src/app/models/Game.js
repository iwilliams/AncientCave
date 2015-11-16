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
import Monster   from './objects/Monster';
import Room      from './objects/Room';
import MainMenu  from './objects/MainMenu';
import Lobby     from './objects/Lobby';

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

    get currentState() {
        return this._currentState;
    }

    get mainMenu() {
        return this._mainMenu;
    }

    get players() {
        return this._players;
    }

    get lobby() {
        return this._lobby;
    }

    startGame() {
        this.currentState = "main menu";
    }

    startMultiplayer() {
        this.currentState = "lobby";
    }

    listenToDispatcher(dispatcher) {
        dispatcher.on("start-game", this.startGame.bind(this));
        dispatcher.on("start-mp",   this.startMultiplayer.bind(this));

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
                this.emit("add-player", p);
            });
        });

        dispatcher.on("add-local-player", (message)=>{
            Logger.debug("Game: Add Local Player message recieved");
            Logger.log(message);

            let p = new Player(message.name, message.id);

            p.init().then(()=>{
                this.addLocalPlayer(p);
                this.emit("add-player", p);
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
        });

        // Sync Remote Player state
        dispatcher.on("remote-player-state", (message)=>{
            Logger.debug("Game: Remote Player State message recieved");
            Logger.log(message);

            let player = this._remotePlayers.get(message.id);
            player.currentState = message.state;
        });
    }

    addLocalPlayer(p) {
        this._localPlayers.set(p.id, p);
        this.addPlayer(p);
    }

    addRemotePlayer(p) {
        this._remotePlayers.set(p.id, p);
        this.addPlayer(p);
    }

    addPlayer(p) {
        Logger.debug("Game: Adding Player");
        Logger.log(p);
        let players = this._players.values();
        let yPos = 0;
        for(let player of players) {
            yPos = player.yPos;
        }
        yPos++;
        p.yPos = yPos;
        this._players.set(p.id, p);
    }
}
