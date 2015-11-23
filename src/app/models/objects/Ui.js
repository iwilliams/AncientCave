import BaseModel from '../BaseModel'; // Can't call this Object b/c of conflict xD

export default class extends BaseModel {
    /**
     * Creates a UI window
     *
     * @param width   - % Width of the UI Element
     * @param height  - % Height of the UI Element
     * @param offsetX - % X offset
     * @param offsetY - % Y offset
     */
    constructor(width, height, offsetX, offsetY) {
        super();
        this._battleOptions = [
            "attack",
            "ability",
            "item",
            "defend"
        ];

        this._roomOptions = [
            "ready",
            "ability",
            "item",
            "manage"
        ];

        this._currentOptions = this._roomOptions;
    }

    get currentOptions() {
        return this._currentOptions;
    }

    setBattleOptions() {
        this._currentOptions = this._battleOptions;
    }

    setIdleOptions() {
        this._currentOptions = this._roomOptions;
    }
}
