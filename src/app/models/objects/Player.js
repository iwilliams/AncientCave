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

let STATES = [
    "idle",
    "ready",
    "resting",
    "walking",
    "attacking"
];

class Player extends BaseModel {

    static get JOBS() {
        return [...JOBS.values()];
    }

    get job()           {return this._job;}
    get currentAction() {return this._currentAction}
    get nextAction()    {return this._nextAction}
    get name()          {return this._name;}
    get id()            {return this._id;}
    get readyToAttack() {return this._readyToAttack;}
    get isBusy()        {return this._isBusy}
    get actionCycle()   {return this._actionCycle}

    /**
     * Set this players job if it is a valid job
     */
    set job(jobName) {
        this._job = JOBS.get(jobName);

        // Check if it was a valid job
        if(!this._job)
            throw `Job ${jobName} is not allowed`;

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

    constructor(name, id, job) {
        super(STATES);
        this._name = name;
        this._id = id;

        this.state = "idle";

        this.currentAction = Immutable.Map({
            "action": "thinking"
        });
        this._nextAction    = undefined;

        // Store the action cycle
        this._actionCycle  = 0;

        this._isBusy = false;

        if(job) {this.job = job;}
    }
}

export default Player;
