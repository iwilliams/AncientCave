import Message from "./Message";
import Logger  from "./Logger";

import Game from "../models/Game";
import Player from "../models/objects/Player";
import MainMenu from "../models/objects/MainMenu";
import Lobby from "../models/objects/Lobby";
import Room from "../models/objects/Room";
import Ui from "../models/objects/Ui";

export default class {
    get mainMenu() {return this._mainMenu}
    get lobby() {return this._lobby}
    get game() {return this._game}
    get players() {return this._players}

    constructor(dispatcher) {
        this._mainMenu = new MainMenu();
        this._game     = new Game();
        this._players  = new Map();
    }

    init(dispatcher) {
        dispatcher.onmessage = this.handleMessage.bind(this);
    }

    handleMessage(message) {
        Logger.debug("Data Store recieved message form Dispatchere");
        let decodedMessage = message;
        let from  = decodedMessage.from;
        let event = decodedMessage.event;
        let data  = decodedMessage.data;
        Logger.log(decodedMessage);

        switch(event) {
            case "game-state":
                if(data === "lobby") {
                    this._game.state = "lobby";
                    this._lobby = new Lobby();
                } else if(data === "playing") {
                    this._game.state = "playing";
                    this._ui = new Ui();
                }
                break;
            case "player-join-local":
                if(!this._players.get(data.id)) {
                    this._localPlayer = new Player(data.name, data.id, data.job);
                    this._players.set(data.id, this._localPlayer);
                }
                break;
            case "player-join-remote":
                // If the id is 0 this is coming from the host
                if(!this._players.get(data.id)) {
                    if(data.id === 0) {
                        var playerId = from;
                    } else {
                        var playerId = data.id;
                    }
                    let p = new Player(data.name, playerId, data.job);
                    this._players.set(playerId, p);
                }
                break;
            case "player-job":
                var player = this.players.get(data.id);
                if(player && !(player.job && player.job.name === data.job)) {
                    player.job = data.job;
                }
                break;
            case "player-state":
                var player = this.players.get(data.id);
                if(player && !(player.state === data.state)) {
                    if(!(this.game.state === "lobby" && data.state === "ready" && !player.job))
                        player.state = data.state;
                }
                break;
            case "player-set":
                var player = this.players.get(data.id);
                if(player) {
                    for(let i = 0; i < data.keys.length; i++) {
                        player[data.keys[i]] = data.values[i];
                    }
                }
                break;
            case "player-action":
                var player = this.players.get(data.id);
                if(player) {
                    player.action = data.action;
                }
                break;
            case "room-create":
                this.room = new Room(data);
                break;
            case "room-state":
                this.room.state = data;
                break;
            default:
                break;
        }
    }
}
