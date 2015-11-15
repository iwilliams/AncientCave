import ObjectView      from './ObjectView';
import Utils           from '../services/Utils';
import Config          from '../../Config';
import ResrouceService from '../services/ResourceService';

export default class extends ObjectView {
    constructor(player) {
        super(player);
        this._player = player;

        this._images = [
            {
                "name": "sprite",
                "image": this._player.job.sprite,
            },
            {
                "name": "shadow",
                "image": "shadow.png",
            },
            {
                "name": "bubble",
                "image": "bubble.png",
            },
        ];
    }


    render(ctx, frame) {
        this.frame      = (frame < Config.FPS/2) ? 0 : 1;

        let playerWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE;
        ctx.fillText(this._player.name, 0, this._player.yPos*playerWidth);

        /**
        let player      = this._resources.get('player');
        let playerWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE;

        let xOffset = Config.TILE_X - 3;
        if(this.player.position == "back") {
            xOffset++;
        }

        let shadow      = this._resources.get('shadow');

        let bubble       = this._resources.get('bubble');
        let bubbleWidth  = bubble.width*Config.SPRITE_SCALE;
        let bubbleHeight = bubble.height/5*Config.SPRITE_SCALE;

        // Draw Shadow
        ctx.drawImage(...[
            shadow,
            0,
            0, // DY
            shadow.width, // dWidth
            shadow.width, // dHeight
            xOffset*(playerWidth), // sx ~ Replace with player X Pos
            this._player.yPos*(playerWidth) + (playerWidth) - (Config.SPRITE_SCALE*this._resources.get('shadow').height/1.75), // sy ~ Replace with player Y Pos
            playerWidth, // sWidth
            playerWidth  // sHeight
        ]);


        // Draw Player Sprite
        ctx.drawImage(...[
            this._resources.get('sprite'),
            this._player.isWalking ? Config.SPRITE_SIZE*(this.frame) : 0, // DX
            0, // DY
            Config.SPRITE_SIZE, // dWidth
            Config.SPRITE_SIZE, // dHeight
            xOffset*(playerWidth), // sx ~ Replace with object X Pos
            this._player.yPos*(playerWidth), // sy ~ Replace with object Y Pos
            playerWidth, // sWidth
            playerWidth  // sHeight
        ]);

        // Draw Bubble
        let bubbleOffset = 0;
        switch(this._player.action) {
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

        if(this._player.action !== "walk" && this.player.action !== "ready") {
            ctx.drawImage(...[
                this._resources.get('bubble'),
                0,
                bubbleOffset, // DY
                bubble.width,  // dWidth
                bubble.height/5, // dHeight
                xOffset*(playerWidth) - (bubbleWidth/1.5), // sx ~ Replace with object X Pos
                this._player.yPos*(playerWidth) - (bubbleHeight/1.5), // sy ~ Replace with object Y Pos
                bubbleWidth,  // sWidth
                bubbleHeight  // sHeight
            ]);
        }
        **/
    }
}
