import Config from '../../Config';
import ObjectView      from './ObjectView';

export default class extends ObjectView {
    constructor(ui) {
        super();
        this.ui = ui;
        this._uiBg = ui.bg;
        this._tileHeight = 2;
    }

    init() {
        return new Promise((res, rej)=>{
            this.image = document.createElement('img');
            this.image.onload = function() {
                res(this);
            }
            this.image.src = this._uiBg;
        });
    }

    render(ctx) {

        ctx.save();

        let bgRect = [
            0,
            Config.SPRITE_SIZE*Config.SPRITE_SCALE*(Config.TILE_Y-this._tileHeight),
            Config.CANVAS_WIDTH,
            Config.SPRITE_SIZE*Config.SPRITE_SCALE*this._tileHeight - 300
        ];

        let uiRect = [
            0,
            Config.SPRITE_SIZE*Config.SPRITE_SCALE*(Config.TILE_Y-this._tileHeight),
            Config.CANVAS_WIDTH,
            Config.SPRITE_SIZE*Config.SPRITE_SCALE*this._tileHeight
        ];

        let gradient = ctx.createLinearGradient(...bgRect);

        gradient.addColorStop(0, "#64A357");
        gradient.addColorStop(1, "#003700");
        ctx.fillStyle = gradient;
        ctx.fillRect(...uiRect);

        ctx.strokeStyle = "#8D8045";

        // The stroke is middle aligned with the edges of the box
        let lineWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE/32;
        //let lineWidth = 5;
        ctx.lineWidth = lineWidth;

        let strokeRect = [...uiRect];
        strokeRect[0] += lineWidth/2;
        strokeRect[1] += lineWidth/2;
        strokeRect[2] -= lineWidth;
        strokeRect[3] -= lineWidth;

        ctx.strokeRect(...strokeRect);

        // Trying to get second border
        //ctx.strokeStyle = "#FFFFFF";

        //lineWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE/48;
        //ctx.lineWidth = lineWidth;

        //strokeRect = [...uiRect];
        //strokeRect[0] += lineWidth/2;
        //strokeRect[1] += lineWidth/2;
        //strokeRect[2] -= lineWidth;
        //strokeRect[3] -= lineWidth;

        //ctx.strokeRect(...strokeRect);

        // Fill bg with patern

        ctx.globalAlpha = 0.1;
        let patern = ctx.createPattern(this.image, "repeat");
        ctx.fillStyle = patern;
        ctx.rect(...strokeRect);
        ctx.fill();

        ctx.restore()
    }
}
