import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super(object.roomBgResource);
    }

    render(ctx) {
        if(!this.frame) this.frame = 0;
        ctx.drawImage(...[
                this.image,
                0, // DX
                0, // DY
                Config.CANVAS_WIDTH, // dWidth
                Config.CANVAS_HEIGHT, // dHeight
            ]);
        this.frame = this.frame ? 0 : 1;
    }
}
