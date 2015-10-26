import UiRenderer from '../views/UiRenderer';

export default class {
    constructor() {
        this.bg = '/dist/resources/images/ui-bg.png';
    }

    init() {
        return new Promise((res, rej) => {
            this.renderer = new UiRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }
}
