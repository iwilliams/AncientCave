import MultiplayerController from './MultiplayerController';
import Config                from '../../Config';

export default class extends MultiplayerController {

    constructor(hostId, player) {
        super(player);
        this._hostId = hostId;
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */
    init() {
        return new Promise((res, rej)=>{
            let connection = this._peer.connect(this._hostId);

            if(this._connections)
                this._connections.push(connection);
            else
                this._connections = [connection];

            connection.on('data', this.handleData.bind(this));

            res();
        });
    }

    click() {
        this._connections.forEach((connection)=>{
            connection.send({
                "event": "click"
            });
        });
    }

}
