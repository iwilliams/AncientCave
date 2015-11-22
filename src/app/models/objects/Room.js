import BaseModel from '../BaseModel';
import Logger    from '../../services/Logger';

let FILLABLE = new Set([
    "enemies",
    "type",
    "isMoving",
    "isBattle",
    "isLooking",
    "nextEncounter",
    "encounterRate",
    "tickCount"
]);

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

    lookForTrouble() {
    }

    stopLooking() {
    }

    endBattle() {
    }

    startBattle() {
    }
}

export default Room;
