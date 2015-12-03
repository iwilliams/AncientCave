import BaseModel from '../BaseModel';
import Logger    from '../../services/Logger';

let STATES = [
    "idle",
    "moving",
    "battle"
];

class Room extends BaseModel {
    static get TYPES() {
        return [
            "cave",
            "temple"
        ];
    }

    get type() {
        return this._type;
    }

    constructor(type) {
        super(STATES);
        this._type = type;
        this.state = "idle";
    }
}

export default Room;
