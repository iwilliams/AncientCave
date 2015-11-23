import BaseModel     from '../BaseModel'; // Can't call this Object b/c of conflict xD
import Logger from '../../services/Logger';

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
        super();
        this._name = name;
        this._id = id;

        this._states = new Set([
            "idle",
            "ready",
            "walking",
            "attacking"
        ]);
        this.currentState = "idle";

        this.currentAction = "thinking";

        this.maxHealth = 100;
        this.health = 100;

        this.maxMana = 100;
        this.mana = 100;

        this.maxCooldown = 100;
        this.cooldown = 100;
    }

    set currentState(state) {
        if(this._states.has(state)) {
            Logger.debug("SET STATE TO STATE");
            this._currentState = state;
        }
    }

    set currentAction(action) {this._currentAction = action;}

    get currentState() {return this._currentState;}

    get currentAction() {return this._currentAction;}

    get name() {return this._name;}

    get id() {return this._id;}

    init() {
        return new Promise((res, rej)=>{
            res();
        });
    }

    beginCombat() {
        this.currentState  = "idle";
        this.currentAction = "action";
        this.cooldown      = 0;
    }

    chargeCooldown() {
        return new Promise((res, rej)=>{
            this._cooldownInterval = setInterval(()=>{
                this.cooldown++;
                if(this.cooldown == this.maxCooldown) {
                    clearInterval(this._cooldownInterval);
                    if(this._attack)
                        this._attack();
                    res();
                }
            }, 15);
        });
    }

    attack() {
        return new Promise((res, rej)=>{
            if(this.cooldown == this.maxCooldown) {
                res();
            } else {
                this._attack = res;
            }
        });
    }
}

export default Player;
