import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super(object.spriteResource);
        this.object = object;
    }

    render(ctx) {
        if(!this.frame) this.frame = 0;
        ctx.drawImage(...[
                this.image,
                Config.SPRITE_SIZE*(this.frame * 2), // DX
                0, // DY
                Config.SPRITE_SIZE, // dWidth
                Config.SPRITE_SIZE, // dHeight
                this.object.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sx ~ Replace with object X Pos
                this.object.yPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sy ~ Replace with object Y Pos
                Config.SPRITE_SIZE*Config.SPRITE_SCALE, // sWidth
                Config.SPRITE_SIZE*Config.SPRITE_SCALE  // sHeight
            ]);
        this.frame = this.frame ? 0 : 1;
    }
}
