import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super(object.spriteResource);
        this.object = object;
    }

    render(ctx) {
        ctx.drawImage(...[
                this.image,
                0,
                0, // DY
                this.image.width, // dWidth
                this.image.height, // dHeight
                20,
                20,
                this.image.width*Config.SPRITE_SCALE, // sWidth
                this.image.height*Config.SPRITE_SCALE  // sHeight
            ]);
    }
}
