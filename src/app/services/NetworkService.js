import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';
import Logger       from './Logger';

let events = [
    "peer-connect",
    "player-ready",
    "player-job",
    "player-state",
    "player-action",
    "option-select",
];

export default class extends EventEmitter {

    createMessage(eventName, data) {
        if(events.indexOf(eventName) >= 0) {
            return [events.indexOf(eventName), data];
        }
    }

    decodeMessage(id, message) {
        return {
            "from": id,
            "event": events[message[0]],
            "data": message[1]
        }
    }

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
                Logger.network(`Peer Connection created, Peer ID is ${id}`);
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
                        Logger.network("Peer has connected");
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

        connection.on('data', (data)=>{
            let message = this.decodeMessage(connection.peer, data);
            this.handleMessage(message);
        });

        connection.on('close', ()=>{
            this.removePeer(peer);
        });

        return peer;
    }

    connectToPeer(peer) {

        let data = {
            "name": this._name,
            "job": this._selectedJob || undefined
        }

        // Build list of peers
        let peers = [];
        for(let peer of this._peers.keys()) {
            peers.push(peer);
        }
        data.peers = peers;

        // Create a message
        let message = this.createMessage("peer-connect", data);

        Logger.network(`Sending peer-connect message to peer with id ${peer.id}`);
        Logger.log(message);
        peer.connection.send(message);
        peer.hasConnected = true;
    }

    removePeer(peer) {
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
        Logger.network("Send message to peers");
        Logger.log(message);
        if(this._peers) {
            for(let peer of this._peers.values()) {
                peer.connection.send(message);
            }
        }
    }

    /**
     * Handle incoming message
     */
    handleMessage(message) {
        Logger.network(`Message recieved from peer with id ${message.from}`);
        Logger.log(message);

        // Grab data from message
        let data = message.data;

        if(message.event === "peer-connect") {
            // See if this peer knows about any other peers and add if we don't know them
            for(let peer of data.peers) {
                if(!this._peers.get(peer) && peer !== this._id) {
                    Logger.network(`Adding Peer with id ${peer}`);
                    this.addPeer(this._peer.connect(peer));
                }
            }

            // See if we have already connected to this peer
            if(this._peers.get(message.from) && !this._peers.get(message.from).hasConnected) {
                this.connectToPeer(this._peers.get(message.from));
            }

            message.event = "add-player";
        }

        this.postMessage(message);
    }

    broadcastMessage(message) {
        if(message.event === "player-job") {
            this._selectedJob = message.data.job;
        }
        this._sendMessage(this.createMessage(message.event, message.data));
    }
}
