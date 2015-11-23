import BaseModel     from '../BaseModel'; // Can't call this Object b/c of conflict xD
import Logger from '../../services/Logger';

let JOBS = new Map();

JOBS.set("clairvoyant", {
    'name':   'clairvoyant',
    'health': 60,
    'mana': 40,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("herbalist", {
    'name': 'herbalist',
    'health': 40,
    'mana': 0,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("villain", {
    'name': 'villain',
    'health': 80,
    'mana': 20,
    'cooldown': 40,
    'position': 'front'
});

JOBS.set("knight", {
    'name': 'knight',
    'health': 100,
    'mana': 0,
    'cooldown': 100,
    'position': 'front'
});

JOBS.set("necromancer", {
    'name': 'necromancer',
    'health': 40,
    'mana': 120,
    'cooldown': 80,
    'position': 'front'
});

class Player extends BaseModel {

    static getJobs() {
        return [...JOBS.values()];
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
    }

    set job(jobName) {
        this._job = JOBS.get(jobName);

        this.maxHealth = this._job.health;
        this.health = this._job.health;

        this.maxMana = this._job.mana;
        this.mana = this._job.mana;

        this.maxCooldown = this._job.cooldown;
        this.cooldown = this._job.cooldown;
    }

    get job() {
        return this._job;
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
                    if(this._attack) {
                        this._attack();
                        this.waitingToAttack = false;
                    }
                    res();
                }
            }, 60);
        });
    }

    attack() {
        this.waitingToAttack = true;
        return new Promise((res, rej)=>{
            if(this.cooldown == this.maxCooldown) {
                this.waitingToAttack = false;
                res();
            } else {
                this._attack = res;
            }
        });
    }
}

export default Player;
