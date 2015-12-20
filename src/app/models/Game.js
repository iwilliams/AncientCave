import BaseModel from './BaseModel';

let STATES = [
    "main menu",
    "lobby",
    "playing"
];

export default class extends BaseModel {
    get stateMessage() {
        return "game-state";
    }

    constructor() {
        super(STATES)
        this.state = "main menu";
    }
}
