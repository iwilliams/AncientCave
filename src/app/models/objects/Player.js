import BaseModel     from '../BaseModel'; // Can't call this Object b/c of conflict xD
import Logger from '../../services/Logger';

let FILLABLE = new Set([
    "name",
    "ready",
    "isWalking",
    "job",
    "position",
    "maxHealth",
    "health",
    "maxMana",
    "mana",
    "action",
]);

class Player extends BaseModel {
    // Static Room Types
    static get JOB_CLAIRVOYANT() {
        return {
            'sprite': 'clairvoyant-sheet.png',
            'name':   'clairvoyant',
            'health': 60,
            'mana': 40,
            'position': 'back'
        }
    }

    static get JOB_HERBALIST() {
        return {
            'sprite': 'herbalist-sheet.png',
            'name': 'herbalist',
            'health': 40,
            'mana': 0,
            'position': 'back'
        }
    }

    static get JOB_VILLAIN() {
        return {
            'sprite': 'villain2-sheet.png',
            'name': 'villain',
            'health': 80,
            'mana': 20,
            'position': 'front'
        }
    }

    static get JOB_KNIGHT() {
        return {
            'sprite': 'knight-sheet.png',
            'name': 'knight',
            'health': 100,
            'mana': 0,
            'position': 'front'
        }
    }

    static get JOB_NECROMANCER() {
        return {
            'sprite': 'necromancer-sheet.png',
            'name': 'necromancer',
            'health': 40,
            'mana': 120,
            'position': 'front'
        }
    }

    constructor(name, id) {
        super(FILLABLE);
        this._name = name;
        this._id = id;

        this._states = new Set([
            "idle",
            "ready",
            "walking",
            "attacking"
        ]);
        this.currentState = "idle";
    }

    set currentState(state) {
        if(this._states.has(state)) {
            Logger.debug("SET STATE TO STATE");
            this._currentState = state;
        }
    }

    get currentState() {
        return this._currentState;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }

    init() {
        return new Promise((res, rej)=>{
            res();
        });
    }
}

export default Player;
