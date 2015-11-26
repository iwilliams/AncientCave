import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';
import Logger       from './Logger';

export default class extends EventEmitter {
    constructor(name, host) {
        super();
        this._name = name;
        if(host)
            this._host = host;
        else
            this._id = "host";

        this._peers = new Map();
    }

    get id() {
        return this._id;
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
                "name": this._name
            }
        }

        let peers = [];
        for(let peer of this._peers.keys()) {
            peers.push(peer);
        }
        message.data.peers = peers;

        Logger.debug(`Sending peer-connect message to peer with id ${peer}`);
        Logger.log(message);
        peer.connection.send(message);
        peer.hasConnected = true;
    }

    removePeer(peer) {
        Logger.debug("Remove peer");
        this.emit("peer-disconnect", peer.connection.peer);
        this._peers.delete(peer.connection.peer);
    }

    disconnect() {
        this._peer.destroy();
    }

    /**
     * Send message to all peers
     */
    _sendMessage(message) {
        if(this._peers) {
            for(let peer of this._peers.values()) {
                peer.connection.send(message);
            }
        }
    }

    playerState(state) {
        let message = {
            "event": "player-state",
            "data": {
                "id": this._id,
                "state": state
            }
        };
        this._sendMessage(message);
    }

    jobSelect(job) {
        let message = {
            "event": "job-select",
            "data": {
                "id": this._id,
                "job": job
            }
        };
        this._sendMessage(message);
    }

    optionSelect(option) {
        let message = {
            "event": "option-select",
            "data": {
                "id": this._id,
                "option": option
            }
        }
        this._sendMessage(message);
    }

    handleData(message) {
        Logger.debug(`Message recieved from peer with id ${message.from}`);
        Logger.log(message);

        // Grab data from message
        let data = message.data;

        if(message.event == "peer-connect") {
            // See if this peer knows about any other peers and add if we don't know them
            for(let peer of data.peers) {
                if(!this._peers.get(peer) && peer !== this._id) {
                    Logger.debug(`Adding Peer with id ${peer}`);
                    this.addPeer(this._peer.connect(peer));
                }
            }

            // See if we have already connected to this peer
            if(this._peers.get(message.from) && !this._peers.get(message.from).hasConnected) {
                this.connectToPeer(this._peers.get(message.from));
            }

            this.emit("peer-connect", message);
        }

        if(message.event == "player-state") {
            this.emit("player-state", message.data);
        }

        if(message.event == "job-select") {
            this.emit("job-select", message.data);
        }

        if(message.event == "option-select") {
            this.emit("option-select", message.data);
        }
    }
}
