import BaseModel from './BaseModel';

let STATES = [
    "main menu",
    "lobby",
    "playing"
];

export default class extends BaseModel {
    constructor() {
        super(STATES)
        this.state = "main menu";
    }
}
