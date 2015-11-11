import BaseObject     from './BaseObject'; // Can't call this Object b/c of conflict xD

let FILLABLE = new Set([
]);

let STATES = new Set([
    "main",
    "declare",
    "combat",
    "end"
]);

class Battle extends BaseObject {
    // Static Room Types
    constructor(players, monsters) {
        super(FILLABLE);
        this._phaseIterator = STATES.values();
        this._phase = this._phaseIterator.next().value;
        this._players  = players;
        this._monsters = monsters;
    }

    static createFromState(obj) {
        //return new Player(obj.xpos, obj.ypos, obj.name, obj.job);
    }

    init() {
        return;
    }

    nextPhase() {
        this._phase = this._phaseIterator.next().value;
        if(this._phaseIterator.next().done) {
            this._phaseIterator = STATES.values();
        }
    }
}

export default Battle;
