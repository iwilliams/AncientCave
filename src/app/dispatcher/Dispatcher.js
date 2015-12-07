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

    /**
     * Register all multiplayer Events
     */
    handleMultiplayerMessages(message) {
        if(!this._simulationWorker) {
            this.postMessage(message);
        }
    }

    /**
     * Register all view messages
     */
    handleViewMessages(message) {
        Logger.debug("Dispatcher recieved message from View:");
        let decodedMessage = message;
        Logger.log(decodedMessage);

        if(decodedMessage.event === "game-host") {
            // Initialize simulation loop
            this._simulationWorker           = Utils.loadWorker("SimulationWorker");
            this._simulationWorker.onmessage = this.handleSimulationMessages.bind(this);

            this._networkService = new NetworkService(message.data.name);
            this._networkService.onmessage  = this.handleNetworkMessages.bind(this);
            this._networkService.init(message.data.id).then((id)=>{
                //Logger.banner("network initdd");
                let playerMessage = new Message(0, "game-host", {
                    "name": message.data.name,
                    "id": id
                });
                this._simulationWorker.postMessage(playerMessage);
            });
        } else if(decodedMessage.event === "game-join") {
            this._networkService = new NetworkService(message.data.name, "host");
            this._networkService.onmessage  = this.handleNetworkMessages.bind(this);
            this._networkService.init();
        } else {
            if(this._simulationWorker) {
                this._simulationWorker.postMessage(message);
            } else {
                if(this._networkService) {
                    this._networkService.sendMessages([message]);
                }
                //this.postMessage(message);
            }
        }
    }

    /**
     * Register SimulationWorker messages
     */
    handleNetworkMessages(messages) {
        for(let message of messages) {
            Logger.debug("Dispatcher recieved message from Network");
            Logger.log(message);

            // If we are the host proccess the message and let the simulation verify it
            if(this._simulationWorker) {
                this._simulationWorker.postMessage(message);
            } else { // if we are a client then just blindly accept the all mighty message
                this.postMessage(message);
            }
        }
    }

    /**
     * Register SimulationWorker messages
     */
    handleSimulationMessages(e) {
        for(let message of e.data) {
            Logger.debug("Dispatcher recieved message from Simulation");
            Logger.log(message);
            this.postMessage(message);
        }
        if(this._networkService)
            this._networkService.sendMessages(e.data);
    }
}
