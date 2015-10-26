import RoomRenderer from '../views/RoomRenderer';

export default class {

    constructor() {
        this.roomBgResource = '/dist/resources/images/ffv-bg.png';
    }

    init() {
        return new Promise((res, rej) => {
            this.renderer = new RoomRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }

    render(ctx) {
        this.renderer.render(ctx);
    }
}
