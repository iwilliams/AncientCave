import UiRenderer from './UiRenderer';
import Config from '../../Config';

export default class extends UiRenderer {
    render(ctx) {
        super.render(ctx);

        let fontSize    = 5*Config.SPRITE_SCALE;
        ctx.font        = fontSize + "px Courier New";
        ctx.fillStyle   = "#ffffff";

        let ypos = Config.SPRITE_SIZE*Config.SPRITE_SCALE*(Config.TILE_Y-this._tileHeight);
        let xpos = Config.SPRITE_SIZE*Config.SPRITE_SCALE*(Config.TILE_X - 4)
        this.ui.playerCharacters.forEach((player)=>{
            ypos += fontSize*2;
            ctx.fillText(...[
                player.name,
                xpos,
                ypos
            ]);
        });
    }
}
