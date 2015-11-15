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
    constructor() {
        super();

        this._currentOptions = [
            "Singleplayer",
            "Multiplayer"
        ];

        this._selectedOption = "Singleplayer";
    }

    get currentOptions() {
        return this._currentOptions;
    }

    get selectedOption() {
        return this._selectedOption;
    }
}
