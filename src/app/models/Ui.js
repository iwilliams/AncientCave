import UiRenderer from '../views/UiRenderer';
import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD

export default class extends BaseObject {
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
        this.bg                = 'dist/resources/images/ui-bg.png';
        this.width             = width;
        this.height            = height;
        this.offsetX           = offsetX;
        this.offsetY           = offsetY;
        this.showBattleOptions = false;

        this.battleOptions = [
            "attack",
            "ability",
            "item",
            "defend"
        ]
        this.selectedBattleOptionIndex = 0;
    }

    /**
     * Initialization Promise
     */
    init() {
        return new Promise((res, rej) => {
            this.renderer = new UiRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }

    render(ctx) {
        this.renderer.render(ctx);
    }

    toggleBattleOptions() {
        this.showBattleOptions = !this.showBattleOptions;
    }

    getSelectedBattleOption() {
        return this.battleOptions[this.selectedBattleOptionIndex];
    }
}
