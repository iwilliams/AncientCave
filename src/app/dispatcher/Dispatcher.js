import Logger         from '../services/Logger';
import Utils          from '../services/Utils';
import Message        from '../services/Message';
import EventEmitter   from '../mixins/EventEmitter';
import NetworkService from '../services/NetworkService';

export default class extends EventEmitter {
    constructor() {
        super();
    }

    init(view) {
        // Initialize simulation loop
        this._simulationWorker           = Utils.loadWorker("SimulationWorker");
        this._simulationWorker.onmessage = this.handleSimulationMessages.bind(this);

        view.onmessage = this.handleViewMessages.bind(this);
    }

    initMultiplayerGame(message) {
        let args = [];
        // Build args
        if(message.hostId) {
            args = [message.name, message.hostId];
        } else {
            args = [message.name];
            this._rng = new Math.seedrandom("", {state: true});
            this.postMessage({
                "event": "rng-set",
                "data": this._rng
            });
        }
        // Init mp controller
        this._networkService = new NetworkService(...args);
        this._networkService.init(this._rng).then(()=>{

            this._networkService.onmessage = message => {
                this.postMessage(message);
            }

            Logger.debug("Dispatcher: Broadcast Add Player Message");

            this.postMessage({
                "event": "add-player",
                "from": Symbol(),
                "data": {
                    "name": message.name,
                    "isLocal": true
                }
            });

            this.postMessage({
                "event": "game-state",
                "data": "lobby"
            });
        });
    }

    leaveGame() {
        this._networkService.disconnect();
        this.postMessage({
            "event": "game-state",
            "data": "main menu"
        });
    }

    /**
     * When we get a peer disconnect event form the multiplayer controller, create a remove player event
     */
    peerDisconnect(message) {
        Logger.debug("Dispatcher: Peer Disconnect Message");
        Logger.log(message);

        Logger.debug("Dispatcher: Broadcast Remove Player Message");
        this.postMessage({
           "event": "remove-player",
            "data": {
                "id": message
            }
        });
    }

    /**
     * Register all multiplayer Events
     */
    handleMultiplayerMessages(message) {
        this.postMessage(message);
    }

    /**
     * Register all view messages
     */
    handleViewMessages(message) {
        Logger.debug("Recieved message from view:");
        Logger.log(new Message(message));
        this._simulationWorker.postMessage(message);
        //let event = message.event;
        //let data  = message.data;

        //if(event === "start-mp") {
            //this.initMultiplayerGame(data);
        //} else if (event === "leave-game") {
            //this.leaveGame()
        //} else {
            //// Convert any Immutable data to JSON
            //if(message.data && message.data.toJSON)
                //message.data = data.toJSON();

            //this.postMessage(message);
            //this._networkService.broadcastMessage(message);
        //}
    }

    /**
     * Register SimulationWorker messages
     */
    handleSimulationMessages(e) {
        console.log(e.data);
        for(let message of e.data) {
            this.postMessage(message);
        }
    }
}
