import ObjectRenderer from '../views/ObjectRenderer';

export default class {

    constructor(xPos, yPos) {
        this.xPos = xPos || 0;
        this.yPos = yPos || 0;
    }

    init() {
        return new Promise((res, rej) => {
            this.renderer = new ObjectRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }

    render(ctx) {
        this.renderer.render(ctx);
    }
}
