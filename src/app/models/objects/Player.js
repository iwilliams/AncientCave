import BaseModel     from '../BaseModel'; // Can't call this Object b/c of conflict xD
import Logger from '../../services/Logger';
//import Config from '../../../Config';

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
    'position': 'back'
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

        this.xPos = Config.TILE_X - 3;
        if(this._job.position === "back") {
            this.xPos += .5;
        }
    }

    resetAction() {
        this.currentAction  = this.nextAction || Immutable.Map({
            "action": "thinking",
            "cycle": this.actionCycle
        });
        this._nextAction = undefined;
    }

    beginCombat() {
        this.currentState   = "idle";
        this.cooldown       = 0;
        this._readyToAttack = false;
    }

    /**
     * Move player forward
     */
    walkForward(cb) {
        this.currentState = "walking";
        this._isWalkingForward = true;
        this._idleXPos = this.xPos;
        this._destXPos = this.xPos - 1;
        if (cb) this._onWalkForward = cb;
    }

    /**
     * Player attack
     */
    attack(cb) {
        this.currentState = "attacking";
        this._attackDelay = 10;
        if(cb) this._onAttack = cb;
    }

    /**
     * Move player backward
     */
    walkBack(cb) {
        this.currentState = "walking";
        this._isWalkingBack = true;
        let currentXPos = this.xPos;
        this._destXPos = this.xPos + 1;
        if(cb) this._onWalkBack = cb;
    }

    endCombat() {
        this.nextActionCycle();

        this.currentState   = "idle";
        this.cooldown       = 0;
        this._readyToAttack = false;

        this.onCooldown = undefined;
        this._isCoolingdown = false;
    }

    /**
     * Update so we know to charge cooldown meeter
     */
    chargeCooldown(callback) {
        this.cooldown = 0;
        this._isCoolingdown = true;
    }

    nextActionCycle() {
        this._readyToAttack = false;
        this._actionCycle++;
        this.resetAction();
        this.chargeCooldown();
    }

    resetActionCycle() {
        this._actionCycle = 0;
        this._nextAction = undefined;
        this.resetAction();
    }

    damage() {
        Logger.debug(`${this.name} Damaged!`);
        if(this.health > 0) {
            this.health -= 10;
        }

        if(this.health < 0 ){
            this.health = 0;
        }
    }

    tick() {
        if(this._isCoolingdown) {
            this.cooldown++;
            if(this.cooldown >= this.maxCooldown) {
                this._isCoolingdown = false;
                this._readyToAttack = true;
                if(this.onCooldown)
                    this.onCooldown(this);
            }
        }

        if(this._isWalkingForward) {
            let step = .10;
            this.xPos -= step;

            if(this.xPos <= this._destXPos) {
                this._isWalkingForward = false;
                this.currentState = "idle";
                if(this._onWalkForward) this._onWalkForward();
            }
        }

        if(this.currentState == "attacking") {
            this._attackDelay--;
            if(this._attackDelay <= 0) {
                Logger.debug("DONE ATTACKING");
                this.currentState = "idle";
                if(this._onAttack) this._onAttack();
            }
        }

        if(this._isWalkingBack) {
            let step = .10;

            this.xPos += step;
            if(this.xPos >= this._destXPos) {
                this.currentState = "idle";
                this._isWalkingBack = false;
                if(this._onWalkBack) this._onWalkBack();
            }
        }
    }
}

export default Player;
