// Utils
import Message from '../services/Message';
import Logger  from '../services/Logger';
import seedrandom from '../services/Rng';

// Models
import Game    from '../models/Game';
import Room    from '../models/objects/Room';
import Player  from '../models/objects/Player';
import Monster from '../models/objects/Monster';

class Simulation {

    /**
     * Sets the state of a model
     */
    setState(model, state) {
        try {
            model.state = state;
            this.outboundMessages.push(new Message(model.stateMessage, model.state));
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

        // Initialize basic models
        this.players = new Map();
        this.game    = new Game();
    }

    /**
     * Game Loop Logic
     */
    tick() {
        // Get current messages and then reset the stack
        let messages = this.messageStack;
        this.messageStack = [];
        this.outboundMessages = [];

        // Process all messages that have come in since last tick
        for(let message of messages) {
            let eventName = message.event;
            let data      = message.data;

            // Decide what to do with message
            switch(eventName) {
                case "game-host":
                    this.setState(this.game, "lobby");
                case "game-start":
                    this.rng = seedrandom(data.seed || "");
                    this.queueMessage(new Message("game-create", 1));
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
        if(this.outboundMessages.length)
            self.postMessage(this.outboundMessages);
    }

    /**
     * Game logic for when in lobby
     */
    lobbyTick() {
        let gameReady = true;

        // Check if all players are ready
        for(let player of this.players.values())
            gameReady &= player.ready;

        // If all players are ready change the game state
        if(gameReady && false) {
            this.setState(this.game, "playing");
            this.room = this.createRoom();
            this.queueMessages.push(new Message("room-create", this.room.type));
        }
    }

    /**
     * Game logic for when playing
     */
    playingTick() {

    }

    createRoom() {
        let type = Room.TYPES[parseInt(this.rng.quick()*Room.TYPES.length)];
        return new Room(type);
    }

    /**
     * Add message to the outbound queue
     */
    queueMessage(message) {
        this.outboundMessages.push(message.serialize());
    }

    /**
     * Procces incoming message
     */
    onMessage(message) {
        let decodedMessage = new Message(message.data);
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
