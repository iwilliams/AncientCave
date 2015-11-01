import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super(object.spriteResource);
        this.object = object;
    }

    render(ctx, frame) {

        ctx.drawImage(...[
            this.image,
            0,
            0, // DY
            this.image.width, // dWidth
            this.image.height, // dHeight
            20,
            frame, // Ypos
            this.image.width*Config.SPRITE_SCALE, // sWidth
            this.image.height*Config.SPRITE_SCALE  // sHeight
        ]);
    }
}
