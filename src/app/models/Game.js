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

export default class extends BaseModel {

    constructor() {
        super();
        this._states = [
            "main menu",
            "lobby",
            "playing"
        ];

        this._currentState = "main menu";
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
     * Start the game
     */
    start() {
        this._mainMenu = new MainMenu();
        this.emit("add-main-menu", this._mainMenu);
        this.emit("game-start");
    }

    listenToDispatcher(dispatcher) {
        dispatcher.on("game-start", this.start.bind(this));

        // Add player when peer connects
        dispatcher.on("add-player", (message)=>{
            Logger.debug("Game: Add Player message recieved");
            Logger.log(message);

            let p = new Player(message.name, message.id);

            p.init().then(()=>{
                this.addPlayer(p);
                this.emit("add-player", p);
            });
        });

        // Remove the peers player from the game
        dispatcher.on("remove-player", (message)=>{
            Logger.debug("Game: Remove Player message recieved");
            Logger.log(message);

            this._players.delete(message.id);
        });

        // Sync Player state
        dispatcher.on("player-state", (message)=>{
            Logger.debug("Game: Player State message recieved");
            Logger.log(message);

            let player = this._players.get(message.from);
            if(player) {
                player.updateState(message.state);
            }
        });
    }

    addPlayer(p) {
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
