import Logger       from '../services/Logger';
import EventEmitter from '../mixins/EventEmitter';
import MultiplayerController from '../controllers/MultiplayerController';

export default class extends EventEmitter {
    constructor() {
        super();
    }

    init(view) {
        this._view = view;
        this.registerViewMessages(this._view);
    }

    initMultiplayerGame(message) {
        let args = [];
        // Build args
        if(message.hostId) {
            args = [message.name, message.hostId];
        } else {
            args = [message.name];
        }
        // Init mp controller
        this._multiplayerController = new MultiplayerController(...args);
        this._multiplayerController.init().then(()=>{
            this.registerMultiplayerEvents(this._multiplayerController);
            Logger.debug("Dispatcher: Broadcast Add Player Message");
            this.emit("add-local-player", {
                "id": this._multiplayerController.id,
                "name": message.name
            });
            this.emit("game-state", "lobby");
        });
    }

    leaveGame() {
        this._multiplayerController.disconnect();
        this.emit("game-state", "main menu");
    }

    /**
     * When we get a peer connect event form the multiplayer controller, create a add player event
     */
    peerConnect(message) {
        Logger.debug("Dispatcher: Peer Connect Message");
        Logger.log(message);

        Logger.debug("Dispatcher: Broadcast Add Player Message");
        this.emit("add-remote-player", {
            "id": message.from,
            "name": message.data.name
        });
    }

    /**
     * When we get a peer disconnect event form the multiplayer controller, create a remove player event
     */
    peerDisconnect(message) {
        Logger.debug("Dispatcher: Peer Disconnect Message");
        Logger.log(message);

        Logger.debug("Dispatcher: Broadcast Remove Player Message");
        this.emit("remove-player", {
            "id": message
        });
    }

    /**
     * Register all multiplayer Events
     */
    registerMultiplayerEvents(multiplayerService) {
        multiplayerService.on("peer-connect",    this.peerConnect.bind(this));
        multiplayerService.on("peer-disconnect", this.peerDisconnect.bind(this));

        multiplayerService.on("player-state", (message)=>{
            this.emit("remote-player-state", message);
        });

        multiplayerService.on("job-select", (message)=>{
            this.emit("remote-player-job-select", message);
        });

        multiplayerService.on("option-select", (message)=>{
            this.emit("remote-option-select", message);
        });
    }

    /**
     * Register all view messages
     */
    registerViewMessages(view) {
        view.on("start-mp", this.initMultiplayerGame.bind(this));
        view.on("leave-game", ()=>{
            this.leaveGame()
        });

        view.on("job-select", (job)=>{
            this._multiplayerController.jobSelect(job);
            this.emit("local-player-job-select", job);
        });

        view.on("ready", (ready)=>{
            let state = ready ? "ready" : "idle";
            this._multiplayerController.playerState(state);
            this.emit("local-player-state", {
                "state": state
            });
        });

        view.on("option-select", (option)=>{
            this._multiplayerController.optionSelect(option);
            this.emit("local-option-select", option);
        });
    }
}
