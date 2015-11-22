import ObjectView      from './ObjectView';
import Utils           from '../services/Utils';
import Config          from '../../Config';
import ResrouceService from '../services/ResourceService';

export default class extends ObjectView {
    constructor(lobby, players, view) {
        super(lobby);
        this._lobby = lobby;
        this._view = view;
        this._players = players;
        this._selectedOptionIndex = 0;
        this._ready = false;
    }

    render(ctx, frame) {
        ctx.fillStyle     = "#ffffff";
        ctx.strokeStyle   = "#ffffff";

        let xPos = 100;
        let yPos = 100;

        ctx.fillText("NAME:", 100, yPos);
        ctx.fillText("JOB:", 300, yPos);
        ctx.fillText("READY:", 500, yPos);
        ctx.strokeRect(90, 110, 600, 180);
        for(let player of this._players.values()) {
            ctx.fillStyle     = "#ffffff";
            yPos += 40;
            ctx.fillText(player.name, 100, yPos);
            if(player.currentState == "ready") {
                ctx.fillStyle     = "#00ff00";
                ctx.fillText("READY", 500, yPos);
            } else {
                ctx.fillStyle     = "#ff0000";
                ctx.fillText("NOT READY", 500, yPos);
            }
        }

        ctx.fillStyle     = "#ffffff";
        for(let menuOption of this._lobby.currentOptions) {
            let menuOptionText = menuOption;

            // Show select cursor
            if(menuOptionText == this._lobby.currentOptions[this._selectedOptionIndex])
                menuOptionText = "> " + menuOptionText;

            // Draw Menu Option
            ctx.fillText(menuOptionText, xPos, 320);
            xPos += 200;
        }
    }

    get selectedOption() {
        return this._lobby.currentOptions[this._selectedOptionIndex];
    }

    left() {
        if(this._selectedOptionIndex == 0)
            this._selectedOptionIndex = 2;
        else
            this._selectedOptionIndex--;
    }

    right() {
        if(this._selectedOptionIndex == 2)
            this._selectedOptionIndex = 0;
        else
            this._selectedOptionIndex++;
    }

    confirm() {
        if(this.selectedOption == "Leave") {
            this._view.emit("leave-game");
        } else if(this.selectedOption == "Ready") {
            this._ready = !this._ready;
            this._view.emit("ready", this._ready);
        }
    }

    back() {
    }



}
