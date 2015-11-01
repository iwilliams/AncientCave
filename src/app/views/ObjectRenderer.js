import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super(object.spriteResource);
        this.object = object;
    }

    render(ctx, frame) {
        this.frame = (frame%2) ? 0 : 1;
        //if(frame < 15) {
            //this.frame = 0;
        //} else if (frame < 30) {
            //this.frame = 1;
        //} else if (frame < 45) {
            //this.frame = 0;
        //} else if (frame < 60) {
            //this.frame = 1;
        //}

        ctx.drawImage(...[
                this.image,
                this.object.isWalking ? Config.SPRITE_SIZE*(this.frame * 2) : 0, // DX
                this.object.flip*Config.SPRITE_SIZE, // DY
                Config.SPRITE_SIZE, // dWidth
                Config.SPRITE_SIZE, // dHeight
                this.object.xPos, //this.object.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sx ~ Replace with object X Pos
                this.object.yPos,//*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sy ~ Replace with object Y Pos
                Config.SPRITE_SIZE*Config.SPRITE_SCALE, // sWidth
                Config.SPRITE_SIZE*Config.SPRITE_SCALE  // sHeight
            ]);
    }
}
