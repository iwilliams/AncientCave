import EventEmitter from '../mixins/EventEmitter';
import Logger       from '../services/Logger';

export default class extends EventEmitter {

    constructor(fillable) {
        super();
        this._fillable = fillable;
        this.isVisible = true;
    }

    render(ctx, frame) {
        if(this.isVisible)
            this.renderer.render(ctx, frame);
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

    attachEvents(buss) {
        return;
    }

    hide() {
        this.isVisible = false;
    }

    show() {
        this.isVisible = true;
    }

    toggle() {
        this.isVisible = !this.isVisible;
    }

    tick() {
        return;
    }
}
