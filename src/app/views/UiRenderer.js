import Renderer from './Renderer';
import Config from '../../Config';

export default class extends Renderer {
    constructor(ui) {
        super();
        this._uiBg = ui.bg;
    }

    init() {
        return new Promise((res, rej)=>{
            this.image = document.createElement('img');
            this.image.onload = function() {
                res(this);
            }
            this.image.src = this._uiBg;
        });
    }

    render(ctx) {
        let patern = ctx.createPattern(this.image, "repeat");
        ctx.rect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);
        ctx.fillStyle = patern;
        ctx.fill();
    }
}
