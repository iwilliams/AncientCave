import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super(object.roomBgResource);

        this.room = object;
        this._offsetX = 0;
    }

    render(ctx, frame) {

        ctx.drawImage(...[
            this.image,
            this._offsetX - Config.CANVAS_WIDTH, // DX
            0, // DY
            Config.CANVAS_WIDTH, // dWidth
            Config.CANVAS_HEIGHT, // dHeight
        ]);

        ctx.drawImage(...[
            this.image,
            this._offsetX, // DX
            0, // DY
            Config.CANVAS_WIDTH, // dWidth
            Config.CANVAS_HEIGHT, // dHeight
        ]);

        if(this.room.isMoving) {
            this._offsetX += 10;
            if(this._offsetX > Config.CANVAS_WIDTH) this._offsetX = 0;
        }
    }
}
