import UiRenderer from './UiRenderer';
import Config from '../../Config';

export default class extends UiRenderer {
    render(ctx) {
        super.render(ctx);

        let fontSize    = 5*Config.SPRITE_SCALE;
        ctx.font        = fontSize + "px Courier New";

        let xpos = Config.TILE_SIZE*(Config.TILE_X - 9)
        let ypos = Config.TILE_SIZE*(Config.TILE_Y-this._tileHeight) + fontSize*2;

        // Render Battle Options
        if(this.ui.showBattleOptions) {
            ctx.fillStyle   = "#ffffff";

            ctx.fillText(...[
                `${this.ui.selectedBattleOptionIndex == 0 ? '>' : ''}${this.ui.battleOptions[0]}`,
                xpos,
                ypos
            ]);

            ctx.fillText(...[
                `${this.ui.selectedBattleOptionIndex == 1 ? '>' : ''}${this.ui.battleOptions[1]}`,
                xpos + Config.TILE_SIZE*2,
                ypos
            ]);

            ctx.fillText(...[
                `${this.ui.selectedBattleOptionIndex == 2 ? '>' : ''}${this.ui.battleOptions[2]}`,
                xpos,
                ypos + fontSize*2
            ]);

            ctx.fillText(...[
                `${this.ui.selectedBattleOptionIndex == 3 ? '>' : ''}${this.ui.battleOptions[3]}`,
                xpos + Config.TILE_SIZE*2,
                ypos + fontSize*2
            ]);
        }

        xpos = Config.TILE_SIZE*(Config.TILE_X - 5)
        ypos = Config.TILE_SIZE*(Config.TILE_Y-this._tileHeight);

        // Render Player Info
        this.ui.playerCharacters.forEach((player)=>{
            ypos += fontSize*2;

            ctx.fillStyle   = "#ffffff";

            // Render Player Names
            ctx.fillText(...[
                player.name,
                xpos,
                ypos
            ]);

            let healthBarXPos   = xpos + Config.TILE_SIZE*2;
            let healthBarYPos   = ypos - fontSize/2;
            let healthBarWidth  = Config.TILE_SIZE*2;
            let healthBarHeight = fontSize;


            ctx.fillStyle = "#000";
            ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

            // Render Player Health Fill
            ctx.fillStyle = "#FF0000";
            let healthPercentage = player.currentHealth/player.maxHealth;
            ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth*healthPercentage, healthBarHeight);

            // Render Player Health Stroke
            ctx.strokeStyle = "#000";
            ctx.lineWidth   = 1*Config.SPRITE_SCALE;
            ctx.strokeRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

            ctx.fillStyle = "#FFF";
            ctx.fillText(...[
                `${player.currentHealth}/${player.maxHealth}`,
                healthBarXPos+healthBarWidth+2*Config.SPRITE_SCALE,
                healthBarYPos
            ]);
        });
    }
}
