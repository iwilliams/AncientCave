import MultiplayerController from './MultiplayerController';
import Config                from '../../Config';

export default class extends MultiplayerController {

    constructor(player, seed) {
        super(player, "host");
        this._seed = seed;
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */
    init() {
        return new Promise((res, rej)=>{

            this._peer.on('open', function(id) {
                console.log(`Host ID is ${id}`);
                //this._id = id;
            });

            this._peer.on('connection', (connection)=>{
                // This `connection` is a DataConnection object with which we can send
                // data.
                // The `open` event firing means that the connection is now ready to
                // transmit data.

                if(this._connections)
                    this._connections.push(connection);
                else
                    this._connections = [connection];

                connection.on('open', ()=>{
                    // Send 'Hello' on the connection.
                    //
                    console.log(this._connections);

                    let ids = [];
                    this._connections.forEach((connection)=>{
                        ids.push(connection.id);
                    });

                    connection.send({
                        "event": "host-connect",
                        "connections": ids,
                        "seed": this._seed
                    });

                    connection.send({
                        "event": "player-connect",
                        "player": this._player.serialize()
                    });
                });

                connection.on('data', this.handleData.bind(this));
            });

            res();
        });
    }
}
