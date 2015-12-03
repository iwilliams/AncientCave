let events = [
    "init",
    "tick",
    "game-host",
    "game-join",
    "game-start",
    "room-create",
    "peer-connect",
    "player-ready",
    "player-job",
    "player-state",
    "player-action",
    "option-select",
];

class Message {
    get event() {
        return this._event;
    }

    get data() {
        return this._data;
    }

    constructor() {
        if(arguments.length > 1) {
            this._event = arguments[0];
            this._data  = arguments[1] || 0;
        } else {
            let rawMessage = arguments[0];
            this._event    = events[rawMessage[0]];
            this._data     = rawMessage[1] || 0;
        }
    }

    serialize() {
        return [events.indexOf(this._event), this._data];
    }
}

export default Message;
