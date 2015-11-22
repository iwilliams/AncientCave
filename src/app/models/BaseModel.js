import EventEmitter from '../mixins/EventEmitter';
import Logger       from '../services/Logger';

export default class extends EventEmitter {

    constructor(fillable) {
        super();
    }

    set currentState(state) {
        if(this._states.has(state)) {
            Logger.debug("SET STATE TO STATE");
            this._currentState = state;
        }
    }

    set currentState(state) {
        if(this._states.has(state)) {
            this._currentState = state;
        }
    }

    get currentState() {
        return this._currentState;
    }

    serialize() {
        let obj = {};
        for(let prop of this._fillable) {
            obj[prop] = this[prop].serialize ? this[prop].serialize(): this[prop];
        }
        obj['isVisible'] = this['isVisible'];
        return obj;
    }

    deserialize(data) {
        Logger.debug("Deserialize");
        Logger.log(data);
        for(let prop of this._fillable) {
            this[prop] = data[prop] !== undefined ? data[prop] : this[prop];
        }
    }
}
