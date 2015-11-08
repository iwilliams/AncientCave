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
        this.frame      = (frame < Config.FPS/2) ? 0 : 1;

        let player      = this._resources.get('player');
        let playerWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE;

        let shadow      = this._resources.get('shadow');

        let bubble       = this._resources.get('bubble');
        let bubbleWidth  = bubble.width*Config.SPRITE_SCALE;
        let bubbleHeight = bubble.height/5*Config.SPRITE_SCALE;

        ctx.drawImage(...[
            shadow,
            0,
            0, // DY
            shadow.width, // dWidth
            shadow.width, // dHeight
            this.player.xPos*(playerWidth), // sx ~ Replace with player X Pos
            this.player.yPos*(playerWidth) + (playerWidth) - (Config.SPRITE_SCALE*this._resources.get('shadow').height/1.75), // sy ~ Replace with player Y Pos
            playerWidth, // sWidth
            playerWidth  // sHeight
        ]);


        // DRAW PLAYE SPRIET
        ctx.drawImage(...[
            this._resources.get('sprite'),
            this.player.isWalking ? Config.SPRITE_SIZE*(this.frame) : 0, // DX
            0, // DY
            Config.SPRITE_SIZE, // dWidth
            Config.SPRITE_SIZE, // dHeight
            this.player.xPos*(playerWidth), // sx ~ Replace with object X Pos
            this.player.yPos*(playerWidth), // sy ~ Replace with object Y Pos
            playerWidth, // sWidth
            playerWidth  // sHeight
        ]);

        let bubbleOffset = 0;
        switch(this.player.action) {
            case "wait":
                bubbleOffset = 0;
                break;
            case "attack":
                bubbleOffset = bubble.height/5;
                break;
            case "defend":
                bubbleOffset = bubble.height/5*2;
                break;
            case "item":
                bubbleOffset = bubble.height/5*3;
                break;
            case "ability":
                bubbleOffset = bubble.height/5*4;
                break;
        }

        if(this.player.action !== "walk" && this.player.action !== "ready") {
            ctx.drawImage(...[
                this._resources.get('bubble'),
                0,
                bubbleOffset, // DY
                bubble.width,  // dWidth
                bubble.height/5, // dHeight
                this.player.xPos*(playerWidth) - (bubbleWidth/1.5), // sx ~ Replace with object X Pos
                this.player.yPos*(playerWidth) - (bubbleHeight/1.5), // sy ~ Replace with object Y Pos
                bubbleWidth,  // sWidth
                bubbleHeight  // sHeight
            ]);
        }
    }
}
