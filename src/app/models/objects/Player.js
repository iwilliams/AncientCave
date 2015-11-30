import BaseModel     from '../BaseModel'; // Can't call this Object b/c of conflict xD
import Logger from '../../services/Logger';
import Config from '../../../Config';

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

JOBS.set("ninja", {
    'name': 'ninja',
    'health': 60,
    'mana': 30,
    'cooldown': 30,
    'position': 'front'
});

class PlayerAction {
}

class Player extends BaseModel {

    constructor(name, id, job) {
        super();
        this._name = name;
        this._id = id;

        this._states = new Set([
            "idle",
            "ready",
            "resting",
            "walking",
            "attacking"
        ]);
        this.currentState = "idle";

        this.currentAction = Immutable.Map({
            "action": "thinking"
        });
        this._nextAction    = undefined;

        // Store the action cycle
        this._actionCycle  = 0;

        this._isBusy = false;


        if(job) {this.job = job;}
    }

    set currentState(state) {
        if(this._states.has(state)) {
            this._currentState = state;
        }
    }

    set currentAction(action) {
        if(action.get("cycle") > this.actionCycle) {
            this._nextAction = action;
        } else {
            this._currentAction = action;
        }
    }

    get job()           {return this._job;}
    get currentAction() {return this._currentAction}
    get nextAction()    {return this._nextAction}
    get currentState()  {return this._currentState;}
    get name()          {return this._name;}
    get id()            {return this._id;}
    get readyToAttack() {return this._readyToAttack;}
    get isBusy()        {return this._isBusy}
    get actionCycle()   {return this._actionCycle}

    static getJobs() {
        return [...JOBS.values()];
    }

    set job(jobName) {
        this._job = JOBS.get(jobName);

        this.maxHealth = this._job.health;
        this.health = this._job.health;

        this.maxMana = this._job.mana;
        this.mana = this._job.mana;

        this.maxCooldown = this._job.cooldown;
        this.cooldown = this._job.cooldown;

        this.xPos = (Config.TILE_X - 3)*Config.TILE_SIZE;
        if(this._job.position == "back") {
            this.xPos++;
        }
    }

    resetAction() {
        this.nextActionCycle();

        this.currentAction  = this.nextAction || Immutable.Map({
            "action": "thinking",
            "cycle": this.actionCycle
        });
        this._nextAction = undefined;
    }

    beginCombat() {
        this.resetAction();

        this.currentState   = "idle";
        this.cooldown       = 0;
        this._readyToAttack = false;
    }

    walkForward(cb) {
        let idleXPos = this.xPos;
        let destXPos = this.xPos - Config.TILE_SIZE;

        let step = (idleXPos - destXPos)/Config.FPS*2;

        this.currentState = "walking";

        let walkInterval = setInterval(()=>{
           this.xPos -= step;
           if(this.xPos <= destXPos) {
               clearInterval(walkInterval);
               this.currentState = "idle";
               if(cb) cb();
           }
        }, 1000/Config.FPS);
    }

    attack(cb) {
        this.currentState = "attacking";

        let attackTimeout = setTimeout(()=>{
            this.currentState = "idle";
            if(cb) cb();
        }, 250);
    }

    walkBack(cb) {
        let currentXPos = this.xPos;
        let destXPos = this.xPos + Config.TILE_SIZE;

        let step = (destXPos - currentXPos)/Config.FPS*2;

        this.currentState = "walking";

        let walkInterval = setInterval(()=>{
           this.xPos += step;
           if(this.xPos >= destXPos) {
               clearInterval(walkInterval);
               this.currentState = "idle";
               if(cb) cb();
           }
        }, 1000/Config.FPS);
    }


    endCombat() {
        this.resetAction();

        this.currentState   = "idle";
        this.cooldown       = 0;
        this._readyToAttack = false;

        this.onCooldown = undefined;

        if(this._cooldownInterval) clearInterval(this._cooldownInterval);
    }

    chargeCooldown(callback) {
        this.resetAction();

        this._readyToAttack = false;
        this.cooldown = 0;

        if(this._cooldownInterval) clearInterval(this._cooldownInterval);

        this._cooldownInterval = setInterval(()=>{
            this.cooldown++;
            if(this.cooldown >= this.maxCooldown) {
                clearInterval(this._cooldownInterval);
                this._readyToAttack = true;
                if(this.onCooldown)
                    this.onCooldown(this);
            }
        }, 60);
    }

    nextActionCycle() {
        this._actionCycle++;
    }
}

export default Player;
