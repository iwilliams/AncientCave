import EventEmitter from '../mixins/EventEmitter';
import Logger       from '../services/Logger';

export default class extends EventEmitter {

    constructor() {
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
}
