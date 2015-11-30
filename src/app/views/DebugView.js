import Config          from '../../Config';

export default class {
    constructor(game) {
        this.game = game;
        this._show = true;
    }

    toggle() {
        this._show = !this._show;
    }

    render(ctx, frame, fps) {
        if(this._show) {
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
                ctx.fillText(player.name, 40, line);
                line += fontSize;
                ctx.fillText("Action Cycle: " + player.actionCycle, 60, line);
                line += fontSize;
                ctx.fillText("Current Action: " + player.currentAction.get("action"), 60, line);
                line += fontSize;
                ctx.fillText("Next Action: " + (player.nextAction ? player.nextAction.get("action") : "NONE"), 60, line);
                line += fontSize;
                ctx.fillText("Current State: " + player.currentState, 60, line);
            }
        }
    }
}
