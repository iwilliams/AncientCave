// Utils
import Config       from '../../Config';
import Message      from '../services/Message';
import Logger       from '../services/Logger';
import seedrandom   from '../services/Rng';

// Models
import Game         from '../models/Game';
import Room         from '../models/objects/Room';
import Player       from '../models/objects/Player';
import Monster      from '../models/objects/Monster';

class Simulation {

    get localPlayer() {
        return this._localPlayer;
    }

    set localPlayer(p) {
        this._localPlayer = p;
    }

    /**
     * Sets the state of a model
     */
    setState(model, data) {
        try {
            model.state = data.state || data;
            this.outboundMessages.push(new Message(0, model.stateMessage, data));
        } catch (err) {
            Logger.err(err);
        }
    }

    constructor() {
        this.then = Date.now();
        this.interval = 1000/30;
        this.first = this.then;
        this.counter = 0;
        this.messageStack = [];
        this.outboundMessages = [];

        // Initialize basic models
        this.players = new Map();
        this.game    = new Game();
        this.setState(this.game, "lobby");


    }

    /**
     * Game Loop Logic
     */
    tick() {
        // Get current messages and then reset the stack
        let messages = this.messageStack;
        this.messageStack = [];

        // Process all messages that have come in since last tick
        for(let message of messages) {
            Logger.debug("Procesing message:");
            Logger.log(message);
            let from      = message.from;
            let eventName = message.event;
            let data      = message.data;

            // Decide what to do with message
            switch(eventName) {
                case "game-host":
                    this.rng = new Math.seedrandom();
                    let playerMessage = new Message(0, "player-join-local", {
                        "name": message.data.name,
                        "id": message.data.id
                    });
                    let p = new Player(data.name, data.id);
                    this.localPlayer = p;
                    this.players.set(data.id, p);
                    this.queueMessage(playerMessage);
                    break;
                case "player-join-remote":
                    this.players.set(data.id, new Player(data.name, data.id, data.job ? data.job.name : 0));
                    for(let player of this.players.values()) {
                        this.queueMessage(new Message(0, "player-join-remote", {
                            name: player.name,
                            id: player.id,
                            job: player.job ? player.job.name : 0
                        }));
                        this.setState(player, {
                            "id": player.id,
                            "state": "idle"
                        });
                    }
                    break;
                case "player-job":
                    // Check to make sure its valid
                    if(from === 0 || from === data.id) {
                        let player = this.players.get(data.id);
                        if(player && !(player.job && player.job.name === data.job)) {
                            player.job = data.job;
                            this.queueMessage(message);
                        }
                    }
                    break;
                case "player-state":
                    if(from === 0 || from === data.id) {
                        let player = this.players.get(data.id);
                        if(player && player.state !== data.state) {
                            if(!(this.game.state === "lobby" && data.state === "ready" && !player.job))
                                this.setState(player, data);
                        }
                    }
                    break;
                case "player-action":
                    if(from === 0 || from === data.id) {
                        let player = this.players.get(data.id);
                        this.setPlayerAction(player, data);
                    }
                    break;
                case "game-start":
                    this.rng = seedrandom(data.seed || "");
                    this.queueMessage(new Message(0, "game-create", 1));
                    break;
            }
        }

        switch(this.game.state) {
            case "lobby":
                this.lobbyTick();
                break;
            case "playing":
                this.playingTick();
                break;
        }

        // Do we need to broadcast tick?
        if(this.outboundMessages.length) {
            Logger.debug("Simulation send messages");
            Logger.log(this.outboundMessages);
            self.postMessage(this.outboundMessages);
            this.outboundMessages = [];
        }
    }

    /**
     * Game logic for when in lobby
     */
    lobbyTick() {
        let gameReady = true;

        // Check if all players are ready
        for(let player of this.players.values())
            gameReady &= player.state === "ready";

        // If all players are ready change the game state
        if(gameReady) {
            this.room = this.createRoom();
            this.queueMessage(new Message(0, "room-create", this.room.type));
            this.setState(this.game, "playing");

            let xPos = 13.5;
            let yPos = 2;
            for(let player of this.players.values()) {
                this.queueMessage(new Message(0, "player-set", {
                    "id": player.id,
                    "keys": [
                        "xPos",
                        "yPos"
                    ],
                    "values": [
                        (player.job.possition === "back") ? xPos - 1 : xPos,
                        yPos
                    ]
                }));
                this.setState(player, {
                    "state": "idle",
                    "id": player.id
                });
                yPos++;
            }
        }
    }

    /**
     * Game logic for when playing
     */
    playingTick() {
        if(this.room.state === "idle") {
            let partyReady = true;

            // Check if all players are ready
            for(let player of this.players.values())
                partyReady &= player.action === "ready";

            if(partyReady) {
                this.setState(this.room, "moving");
                this.room.steps = 0;
                for(let player of this.players.values())
                    this.setState(player, {
                        "state": "walking",
                        "id" : player.id
                    });
            }
        } else if(this.room.state === "moving") {
            this.room.steps++;
            if(this.room.steps >= 100) {
                this.room.steps = 0;
                this.setState(this.room, "idle");
                for(let player of this.players.values()) {
                    this.setPlayerAction(player, {
                        "action": "",
                        "id" : player.id
                    });
                    this.setState(player, {
                        "state": "idle",
                        "id" : player.id
                    });
                }
            }
        }
    }

    /**
     * Helper to create a room based on RNG
     */
    createRoom() {
        let type = Room.TYPES[parseInt(this.rng.quick()*Room.TYPES.length)];
        return new Room(type);
    }

    /**
     * Helper to create a room based on RNG
     */
    setPlayerAction(player, data) {
        if(this.game.state !== "playing") return;

        if(player.action !== data.action) {
            player.action = data.action;
            this.queueMessage(new Message(0, "player-action", data));
        }
    }

    /**
     * Add message to the outbound queue
     */
    queueMessage(message) {
        this.outboundMessages.push(message);
    }

    /**
     * Procces incoming message
     */
    onMessage(message) {
        Logger.debug("Simulation recieved message from Client");
        let decodedMessage = message.data;
        Logger.log(decodedMessage);
        this.messageStack.push(decodedMessage);
    }

    /**
     * Run closest to the FPS as possible
     */
    loop() {
        let now = Date.now();
        let delta = now - this.then;

        // If the fps interval is correct
        if (delta > this.interval) {
            // Calculate time since last frame
            this.then = now - (delta % this.interval);

            this.tick();

            // Calculate next render cycle
            let time_el = (this.then - this.first)/1000;
            ++this.counter;
            //let _fps = parseInt(counter/time_el);

            // Increment Frame
            this.loop();
        } else {
            setTimeout(this.loop.bind(this), 1);
        }
    }
}

// Initialize a new simulation
let simulation = new Simulation();

// Attach I/O
onmessage = simulation.onMessage.bind(simulation);
simulation.postMessage = postMessage;

// Start the simulation
simulation.loop();

self.simulation = simulation;
