import Logger       from '../services/Logger';
import EventEmitter from '../mixins/EventEmitter';

export default class extends EventEmitter {
    constructor() {
        super();
    }

    init(view) {
        this._view = view;
        this.registerViewMessages(this._view);
    }

    registerViewMessages(view) {
        view.on("join-mp", this.joinMultiplayerGame.bind(this));
        view.on("host-mp", this.hostMultiplayerGame.bind(this));
    }

    joinMultiplayerGame(message) {
        this._multiplayerController = new MultiplayerController(message.data.name, message.data.hostId);
        this.multiplayerController.init().then(()=>{
            registerMultiplayerEvents(this._multiplayerController);
        })
    }

    hostMultiplayerGame(message) {
        this._multiplayerController = new MultiplayerController(message.name);
        this.multiplayerController.init().then(()=>{
            registerMultiplayerEvents(this._multiplayerController);
        })
    }

    /**
     * When we get a peer connect event form the multiplayer controller, create a add player event
     */
    peerConnect(message) {
        Logger.debug("Dispatcher: Peer Connect Message");
        Logger.log(message);

        Logger.debug("Dispatcher: Broadcast Add Player Message");
        this.emit("add-player", {
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

    registerMultiplaerEvents(multiplayerService) {
        multiplaerService.on("peer-connect",    this.peerConnect.bind(this));
        multiplaerService.on("peer-disconnect", this.peerDisconnect.bind(this));
    }
}
