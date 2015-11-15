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

    // Static Room Types
    static get TYPE_CAVE() {
        return {
            floor: 'goodtile.png',
            wall: 'shitwall.png'
        };
    }

    static get TYPE_TEMPLE() {
        return {
            floor: 'grass.png',
            wall: 'pillars.png'
        };
    }

    constructor(type) {
        super();
        this._states = [
            "idle",
            "moving"
        ];
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
