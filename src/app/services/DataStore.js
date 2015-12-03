import Message from "./Message";

import Game from "../models/Game";
import MainMenu from "../models/objects/MainMenu";

export default class {
    get mainMenu() {return this._mainMenu}
    get game() {return this._game}

    constructor(dispatcher) {
        this._mainMenu = new MainMenu();
        this._game     = new Game();
    }

    init(dispatcher) {
        dispatcher.onmessage = this.handleMessage.bind(this);
    }

    handleMessage(message) {
        console.log("Data store handle message");
        let decodedMessage = new Message(message);
        let event = decodedMessage.event;
        let data  = decodedMessage.data;

        switch(event) {
            case "game-create":
                this.game = new Game();
                break;
        }
    }
}
