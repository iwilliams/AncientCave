import RoomRenderer from '../views/RoomRenderer';

export default class {

    // Static Room Types
    static get TYPE_CAVE()    { return '/dist/resources/images/ffv-bg.png';}
    static get TYPE_OUTSIDE() { return '/dist/resources/images/ffv-bg2.png';}

    constructor(type) {
        this.roomBgResource = type;
        this.isMoving       = false;
    }

    init() {
        return new Promise((res, rej) => {
            this.renderer = new RoomRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }

    render(ctx, frame) {
        this.renderer.render(ctx, frame);
    }
}
