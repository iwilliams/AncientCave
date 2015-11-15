import BaseObject     from './BaseObject'; // Can't call this Object b/c of conflict xD
import PlayerRenderer from '../views/PlayerRenderer';

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

let STATES = new Set([
    "idle",
    "walking",
    "waiting",
    "action",
    "busy"
]);

class Player extends BaseObject {
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

    constructor(xPos, yPos, name, job, state) {
        super(FILLABLE);
        this.name = name;
        this.job = job;
        this.position = job.position;
        this.maxHealth = job.health;
        this.health = job.health;
        this.maxMana = job.mana;
        this.mana = job.mana;
        this.xPos = xPos || 0;
        this.yPos = yPos || 0;

        this.state = state || "idle";

        this._states = new Set([
            "idle",
            "ready",
            "walking",
            "attacking"
        ]);
        this.curentState = "idle";
    }

    set currentState(state) {
        if(this._states.has(state) {
            this._currentState = state;
        }
    }

    get currentState() {
        return this._currentState;
    }

    static createFromState(obj) {
        return new Player(obj.xpos, obj.ypos, obj.name, obj.job);
    }
}

export default Player;
