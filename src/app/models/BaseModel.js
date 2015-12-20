import Logger       from '../services/Logger';

export default class {
    constructor(states) {
        this._states = states;
    }

    /**
     * Set the state if it is legal.
     */
    set state(state) {
        if(this._states.indexOf(state) >= 0) {
            this._state = state;
        } else {
            throw `State ${state} is not allowed`;
        }
    }

    set action(action) {
        this._action = action
    }

    /**
     * Return the current state
     */
    get state() {
        return this._state;
    }

    /**
     * Return the current state
     */
    get action() {
        return this._action;
    }

    /**
     * Return the name of the state message we need to send to modify
     * this model
     */
    get stateMessage() {
        return this._stateMessage;
    }
}
