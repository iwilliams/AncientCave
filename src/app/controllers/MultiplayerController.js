import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';
import Logger       from '../Services/Logger';


export default class extends EventEmitter {
    constructor(player, seed, id, host) {
        super();
        this._player = player;
        this._seed   = seed || null;
        this._id     = id || null;

        if(host)
            this._host = host;

        this._peers = new Map();
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */
    init() {

        // Initialize the peer connection
        this._peer = new Peer(this._id, {
            key: Config.API_KEY,
            debug: 3
        });

        return new Promise((res, rej)=>{
            this._peer.on('open', (id)=>{
                Logger.debug(`Peer Connection created, Peer ID is ${id}`);
                this._id = id;

                // If we know about a peer then connect
                if(this._host)
                    this.addPeer(this._peer.connect(this._host));

                // When a peer connects handle it
                this._peer.on('connection', (connection)=>{
                    // Don't allow more than 4 players
                    if(this._peers.size >= 4) {
                        connection.close();
                    }

                    connection.on('open', ()=>{
                        Logger.debug("Peer has connected");
                        Logger.log(connection);
                        let peer = this.addPeer(connection);
                        this.connectToPeer(peer);
                    });
                });

                res();
            });
        });
    }

    addPeer(connection) {
        let peer = {
            "connection": connection,
        };
        this._peers.set(connection.peer, peer);

        connection.on('data',  this.handleData.bind(this));
        connection.on('close', ()=>{
            this.removePeer(peer);
        });

        return peer;
    }

    connectToPeer(peer) {
        let message = {
            "event": "peer-connect",
            "from": this._id,
            "data": {
                "seed": this._seed
            }
        }

        message.data.player = this._player.serialize();

        let peers = [];
        for(let peer of this._peers.keys()) {
            peers.push(peer);
        }
        message.data.peers = peers;

        Logger.debug(`Sending peer-connect message to peer with id ${peer}`);
        Logger.log(message);
        peer.connection.send(message);
        peer.hasSentPlayer = true;
    }

    removePeer(peer) {
        Logger.debug("Remove peer");
        this.emit("peer-disconnect", peer.connection.peer);
        this._peers.delete(peer.connection.peer);
    }

    handleData(message) {
        Logger.debug(`Message recieved from peer with id ${message.from}`);
        Logger.log(message);

        let data = message.data;

        if(message.event == "peer-connect") {
            Logger.debug('Current connections');
            Logger.log(this._peers);

            // See if this peer knows about any other peers and add if we don't know them
            for(let peer of data.peers) {
                if(!this._peers.get(peer) && peer !== this._id) {
                    Logger.debug(`Adding Peer with id ${peer}`);
                    this.addPeer(this._peer.connect(peer));
                }
            }

            Logger.debug('Check if we need to send message to message sender');
            Logger.log(this._peers.get("host"));
            if(this._peers.get(message.from) && !this._peers.get(message.from).hasSentPlayer) {
                this.connectToPeer(this._peers.get(message.from));
            }

            Logger.log(this._connections);

            this.emit("peer-connect", message);
        }

        if(message.event == "player-state") {
            this.emit("player-state", message);
        }
    }

    click() {
        if(this._peers) {
            for(let peer of this._peers.values()) {

                let message = {
                    "event": "player-state",
                    "from": this._id,
                    "data": {
                        "player": this._player.serialize()
                    }
                };

                peer.connection.send(message);
            }
        }
    }
}
