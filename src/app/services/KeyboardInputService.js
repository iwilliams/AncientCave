import Config       from '../../Config';
import EventEmitter from '../mixins/EventEmitter';

export default class extends EventEmitter {
    constructor(player, id) {
        super();
        this.listener = new window.keypress.Listener();
        this.attachInput(this.listener);
    }

    attachInput(listener) {
        listener.simple_combo("up", () => this.emit("up"));
        listener.simple_combo("k", () => this.emit("up"));

        listener.simple_combo("down", () => this.emit("down"));
        listener.simple_combo("j", () => this.emit("down"));

        listener.simple_combo("left", () => this.emit("left"));
        listener.simple_combo("h", () => this.emit("left"));

        listener.simple_combo("right", () => this.emit("right"));
        listener.simple_combo("l", () => this.emit("right"));

        listener.simple_combo("enter", ()=> this.emeit("enter"));
    }
}
