import Renderer from './Renderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends Renderer {
    constructor(player) {
        super();
        this.player = player;
    }

    init() {
        return Promise.all([
            this.loadResource('sprite', this.player.job.sprite),
            this.loadResource('shadow',  'shadow.png'),
            this.loadResource('bubble',  'waiting.png')
        ]);
    }

    render(ctx, frame) {
        this.frame = (frame < Config.FPS/2) ? 0 : 1;

        ctx.drawImage(...[
            this._resources.get('shadow'),
            0,
            0, // DY
            Config.SPRITE_SIZE, // dWidth
            Config.SPRITE_SIZE, // dHeight
            this.player.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sx ~ Replace with player X Pos
            this.player.yPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE) + (Config.SPRITE_SIZE*Config.SPRITE_SCALE) - (Config.SPRITE_SCALE*this._resources.get('shadow')/1.75), // sy ~ Replace with player Y Pos
            Config.SPRITE_SIZE*Config.SPRITE_SCALE, // sWidth
            Config.SPRITE_SIZE*Config.SPRITE_SCALE  // sHeight
        ]);


        // DRAW PLAYE SPRIET
        ctx.drawImage(...[
            this._resources.get('sprite'),
            this.player.isWalking ? Config.SPRITE_SIZE*(this.frame) : 0, // DX
            0, // DY
            Config.SPRITE_SIZE, // dWidth
            Config.SPRITE_SIZE, // dHeight
            this.player.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sx ~ Replace with object X Pos
            this.player.yPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE), // sy ~ Replace with object Y Pos
            Config.SPRITE_SIZE*Config.SPRITE_SCALE, // sWidth
            Config.SPRITE_SIZE*Config.SPRITE_SCALE  // sHeight
        ]);

        if(!this.player.ready) {
            ctx.drawImage(...[
                this._resources.get('bubble'),
                0,
                0, // DY
                this._resources.get('bubble').width, // dWidth
                this._resources.get('bubble').height, // dHeight
                this.player.xPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE) - (this._resources.get('bubble').width*Config.SPRITE_SCALE/1.5), // sx ~ Replace with object X Pos
                this.player.yPos*(Config.SPRITE_SIZE*Config.SPRITE_SCALE) - (this._resources.get('bubble').height*Config.SPRITE_SCALE/1.5), // sy ~ Replace with object Y Pos
                this._resources.get('bubble').width*Config.SPRITE_SCALE, // sWidth
                this._resources.get('bubble').height*Config.SPRITE_SCALE  // sHeight
            ]);
        }
    }
}
