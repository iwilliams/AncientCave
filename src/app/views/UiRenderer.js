import Renderer from './Renderer';
import Config from '../../Config';

export default class extends Renderer {
    constructor(ui) {
        super();
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
        let patern = ctx.createPattern(this.image, "repeat");
        ctx.rect(...[
                0,
                Config.SPRITE_SIZE*Config.SPRITE_SCALE*(Config.TILE_Y-this._tileHeight), // Ancor to bottom
                Config.CANVAS_WIDTH,
                Config.SPRITE_SIZE*Config.SPRITE_SCALE*this._tileHeight
            ]);
        ctx.fillStyle = patern;
        ctx.fill();
    }
}
