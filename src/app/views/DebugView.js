import Config          from '../../Config';

export default class {
    constructor(game) {
        this.game = game;
    }

    render(ctx, frame, fps) {
        // Show FPS
        let fontSize         = 5*Config.SPRITE_SCALE;
        ctx.font        = fontSize + "px Courier New";
        ctx.fillStyle   = "#ffffff";

        let line = 20;

        ctx.fillText(frame + "/" + Config.FPS + " " + fps + "fps", 20, line);

        line += fontSize;

        ctx.fillText("Players:", 20, line);

        for(let player of game.players.values()) {
            line += fontSize;
            ctx.fillText(player.name + " " + player.actionCycle, 40, line);
        }
    }
}
