import UiRenderer from '../views/UiRenderer';

export default class {
    /**
     * Creates a UI window
     *
     * @param width   - % Width of the UI Element
     * @param height  - % Height of the UI Element
     * @param offsetX - % X offset
     * @param offsetY - % Y offset
     */
    constructor(width, height, offsetX, offsetY) {
        this.bg      = '/dist/resources/images/ui-bg.png';
        this.width   = width;
        this.height  = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
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
}
