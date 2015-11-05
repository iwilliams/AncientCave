import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super(object.spriteResource);
        this.object = object;
    }

    render(ctx, frame) {
        this.frame = (frame < Config.FPS/2) ? 0 : 1;

        ctx.drawImage(...[
            this.shadow,
            0,
            0, // DY
            Config.SPRITE_SIZE, // dWidth
            Config.SPRITE_SIZE, // dHeight
            this.object.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sx ~ Replace with object X Pos
            this.object.yPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE) + (Config.SPRITE_SIZE*Config.SPRITE_SCALE) - (Config.SPRITE_SCALE*this.shadow.height/1.75), // sy ~ Replace with object Y Pos
            Config.SPRITE_SIZE*Config.SPRITE_SCALE, // sWidth
            Config.SPRITE_SIZE*Config.SPRITE_SCALE  // sHeight
        ]);

        ctx.drawImage(...[
            this.image,
            this.object.isWalking ? Config.SPRITE_SIZE*(this.frame) : 0, // DX
            0, // DY
            Config.SPRITE_SIZE, // dWidth
            Config.SPRITE_SIZE, // dHeight
            this.object.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sx ~ Replace with object X Pos
            this.object.yPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sy ~ Replace with object Y Pos
            Config.SPRITE_SIZE*Config.SPRITE_SCALE, // sWidth
            Config.SPRITE_SIZE*Config.SPRITE_SCALE  // sHeight
        ]);

        if(!this.object.ready) {
            ctx.drawImage(...[
                this.waiting,
                0,
                0, // DY
                this.waiting.width, // dWidth
                this.waiting.height, // dHeight
                this.object.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE) - (this.waiting.width*Config.SPRITE_SCALE/1.5), // sx ~ Replace with object X Pos
                this.object.yPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE) - (this.waiting.height*Config.SPRITE_SCALE/1.5), // sy ~ Replace with object Y Pos
                this.waiting.width*Config.SPRITE_SCALE, // sWidth
                this.waiting.height*Config.SPRITE_SCALE  // sHeight
            ]);
        }
    }
}
