import BaseModel from '../BaseModel';
import Logger    from '../../services/Logger';

class Room extends BaseModel {
    constructor(type) {
        super();
        this._states = new Set([
            "idle",
            "moving",
            "battle"
        ]);

        this._type = type;
        this.currentState = "idle";
    }
}

export default Room;
