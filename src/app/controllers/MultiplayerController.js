import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';


export default class extends EventEmitter {
    constructor(player, id) {
        super();
        this._player = player;
        this._peer = new Peer(id || null, {
            key: Config.API_KEY,
            debug: 3
        });
        this._id = this._peer.id;
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */
    init() {

    }

     handleData(data) {
        console.log(data);
        if(data.event == "host-connect") {
            this.emit("host-connect", data.seed);
            this._connections.forEach((connection)=>{
                connection.send({
                    "event": "player-connect",
                    "player": {
                        "name": this._player.name,
                        "job": this._player.job
                    }
                });
            });
        }

        if(data.event == "player-connect") {
            this.emit("player-connect", data.player);
        }

        if(data.event == "player-state") {
            this.emit("player-state", data.player);
        }
    }

    click() {
        if(this._connections) {
            this._connections.forEach((connection)=>{
                connection.send({
                    "event":     "player-state",
                    "player": {
                        "name":  this._player.name,
                        "ready": this._player.ready
                    }
                });
            });
        }
    }
}
