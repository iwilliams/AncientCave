import Config          from '../../Config';

export default class {
    constructor(dataStore) {
        this.dataStore = dataStore;
        this._show = false;
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

            for(let player of dataStore.players.values()) {
                line += fontSize;
                ctx.fillText(player.name, 40, line);
                line += fontSize;
                ctx.fillText("State: " + player.state, 60, line);
                line += fontSize;
                ctx.fillText("Action: " + player.action, 60, line);
            }

            if(dataStore.room) {
                line = 20 + fontSize;
                ctx.fillText("Room", 240, line);
                line += fontSize;
                ctx.fillText("Type: " + dataStore.room.type, 260, line);
                line += fontSize;
                ctx.fillText("State: " + dataStore.room.state, 260, line);
            }
        }
    }
}
