import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';
import Logger       from './Logger';
import Message      from './Message';

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
    init(id) {
        if(id) this._id = id;
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
                    this.addPeer(this._peer.connect(this._host, {
                        "reliable": true
                    }));

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
                        peer.connection.send(1);
                    });
                });

                res(this._id);
            });
        });
    }

    addPeer(connection) {
        let peer = {
            "connection": connection,
        };
        this._peers.set(connection.peer, peer);

        connection.on('data', (data)=>{
            this.handleMessages(data);
        });

        connection.on('close', ()=>{
            this.removePeer(peer);
        });

        return peer;
    }

    removePeer(peer) {
        this._peers.delete(peer.connection.peer);
    }

    disconnect() {
        this._peer.destroy();
    }

    /**
     * Send message to all peers
     */
    sendMessages(messages) {
        if(this._peers) {
            for(let peer of this._peers.values()) {
                // If this message has a to, make sure this peers needs the message
                let messagesToSend = [];
                for(let message of messages) {
                    message.from = this._id;
                    if(!message.to || messsage.to === peer.connection.peer)
                        messagesToSend.push(message);
                }
                Logger.network("Send messages to peers");
                Logger.log(messagesToSend);
                peer.connection.send(messagesToSend);
            }
        }
    }

    /**
     * Handle incoming message
     */
    handleMessages(messages) {
        Logger.network(`Network Service recieved message from peer with id ${messages.from}`);
        Logger.log(messages);

        if(messages === 1) {
            let m = new Message(0, "player-join-remote", {"name": this._name, "id": this._id});
            this.postMessage([
                    new Message(0, "game-state", "lobby"),
                    new Message(0, "player-join-local", {"name": this._name, "id": this._id})
            ]);
            this.sendMessages([m]);
        } else {
            this.postMessage(messages);
            //for(let message of messages) {
                //this.postMessage(message);
            //}
        }
    }
}
