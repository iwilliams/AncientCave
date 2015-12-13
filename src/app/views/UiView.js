import Config          from '../../Config';
import ObjectView      from './ObjectView';
import Logger          from '../services/Logger';
import Message          from '../services/Message';

export default class extends ObjectView {
    constructor(ui, view) {
        super();
        this._ui         = ui;
        this._view       = view;

        this._tileHeight = 2;

        this._images = [
            {
                "name": "bg",
                "image": "ui-bg.png",
            }
        ];

        this._selectedOptionIndex = 0;
    }

    loadResources() {
        let promises = []
        for(let image of this._images) {
            promises.push(this.loadResource(image.name, image.image));
        }
        return Promise.all(promises);
    }

    render(ctx) {

        let yPos = Config.TILE_SIZE*(Config.TILE_Y-this._tileHeight);

        // Draw Background
        ctx.save();

        let bgRect = [
            0,
            yPos,
            Config.CANVAS_WIDTH,
            Config.SPRITE_SIZE*Config.SPRITE_SCALE*this._tileHeight - 300
        ];

        let uiRect = [
            0,
            yPos,
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

        // Fill bg with patern
        ctx.globalAlpha = 0.1;
        let patern = ctx.createPattern(this._resources.get("bg"), "repeat");
        ctx.fillStyle = patern;
        ctx.rect(...strokeRect);
        ctx.fill();

        ctx.restore();

        ctx.fillStyle   = "#ffffff";
        yPos += Config.TILE_SIZE/3;

        let fontSize    = 5*Config.SPRITE_SCALE;
        ctx.font        = fontSize + "px Courier New";

        let xPos = Config.TILE_SIZE*1.2;

        if(this._view.dataStore.localPlayer.state === "idle"
                || this._view.dataStore.localPlayer.state === "cooldown") {
            // Draw Info
            ctx.fillText(...[
                `${this._selectedOptionIndex == 0 ? ">" : ""}` + this._ui.currentOptions[0],
                xPos,
                yPos
            ]);

            ctx.fillText(...[
                `${this._selectedOptionIndex == 1 ? ">" : ""}` + this._ui.currentOptions[1],
                xPos + Config.TILE_SIZE*2,
                yPos
            ]);

            ctx.fillText(...[
                `${this._selectedOptionIndex == 2 ? ">" : ""}` + this._ui.currentOptions[2],
                xPos,
                yPos + fontSize*2
            ]);

            ctx.fillText(...[
                `${this._selectedOptionIndex == 3 ? ">" : ""}` + this._ui.currentOptions[3],
                xPos + Config.TILE_SIZE*2,
                yPos + fontSize*2
            ]);
        }

        xPos = Config.TILE_SIZE*5;
        yPos = Config.TILE_SIZE*(Config.TILE_Y-this._tileHeight);

        let players = this._view._dataStore.players.values();
        // Render Player Info
        for(let player of players) {
            yPos += fontSize*2;

            ctx.fillStyle   = "#ffffff";

            // Render Player Names
            ctx.fillText(...[
                player.name,
                xPos,
                yPos
            ]);

            // Define cooldown vars
            let cooldownBarYPos   = yPos + fontSize/2;
            let cooldownBarWidth  = Config.TILE_SIZE;
            let cooldownBarHeight = fontSize/2;

            // Render Player Cooldown Fill
            ctx.fillStyle = "#00FF00";
            let cooldownPercentage = player.cooldown/player.maxCooldown;
            ctx.fillRect(xPos, cooldownBarYPos, cooldownBarWidth*cooldownPercentage, cooldownBarHeight);

            // Render Player Cooldown Stroke
            ctx.strokeStyle = "#000";
            ctx.lineWidth   = 1*Config.SPRITE_SCALE;
            ctx.strokeRect(xPos, cooldownBarYPos, cooldownBarWidth, cooldownBarHeight);

            // Define Healthbar vars
            let healthBarXPos   = xPos + Config.TILE_SIZE*2;
            let healthBarYPos   = yPos - fontSize/2;
            let healthBarWidth  = Config.TILE_SIZE*2;
            let healthBarHeight = fontSize/2;

            // Render Player Health Fill
            ctx.fillStyle = "#FF0000";
            let healthPercentage = player.health/player.maxHealth;
            ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth*healthPercentage, healthBarHeight);

            // Render Player Health Stroke
            ctx.strokeStyle = "#000";
            ctx.lineWidth   = 1*Config.SPRITE_SCALE;
            ctx.strokeRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

            ctx.fillStyle = "#FFF";
            ctx.fillText(...[
                `${player.health}/${player.maxHealth}`,
                healthBarXPos+healthBarWidth+2*Config.SPRITE_SCALE,
                healthBarYPos
            ]);

            healthBarYPos += healthBarHeight*1.5;

            //ctx.fillStyle = "#000";
            //ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

            // Render Player Health Fill
            ctx.fillStyle = "#0000FF";
            let manaPercentage = player.mana/player.maxMana;
            ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth*manaPercentage, healthBarHeight);

            // Render Player Health Stroke
            ctx.strokeStyle = "#000";
            ctx.lineWidth   = 1*Config.SPRITE_SCALE;
            ctx.strokeRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

            ctx.fillStyle = "#FFF";
            ctx.fillText(...[
                `${player.mana}/${player.maxMana}`,
                healthBarXPos+healthBarWidth+2*Config.SPRITE_SCALE,
                healthBarYPos
            ]);
        }
    }

    up() {
        if(this._view.dataStore.localPlayer.state === "idle" ||
                this._view.dataStore.localPlayer.state === "cooldown") {
            if(this._selectedOptionIndex == 0)
                this._selectedOptionIndex = 2;
            else if (this._selectedOptionIndex == 1)
                this._selectedOptionIndex = 3;
            else if (this._selectedOptionIndex == 2)
                this._selectedOptionIndex = 0;
            else if (this._selectedOptionIndex == 3)
                this._selectedOptionIndex = 1;
        }
    }

    down() {
        this.up();
    }

    left() {
        if(this._view.dataStore.localPlayer.state === "idle" ||
                this._view.dataStore.localPlayer.state === "cooldown") {
            if(this._selectedOptionIndex == 0)
                this._selectedOptionIndex = 1;
            else if (this._selectedOptionIndex == 1)
                this._selectedOptionIndex = 0;
            else if (this._selectedOptionIndex == 2)
                this._selectedOptionIndex = 3;
            else if (this._selectedOptionIndex == 3)
                this._selectedOptionIndex = 2;
        }
    }

    right() {
        this.left();
    }

    confirm() {
        if(this._view.dataStore.localPlayer.state === "idle" ||
                this._view.dataStore.localPlayer.state === "cooldown") {
            let currentOption = this._ui.currentOptions[this._selectedOptionIndex];

            let message = new Message(0, "player-action", {
                "id": this._view._dataStore._localPlayer.id,
                "action": this._ui.currentOptions[this._selectedOptionIndex],
            });
            this._view.postMessage(message);
        }
    }
}
