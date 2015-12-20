import ObjectView      from './ObjectView';
import Utils           from '../services/Utils';
import Message         from '../services/Message';
import Config          from '../../Config';
import ResrouceService from '../services/ResourceService';
import Player          from '../models/objects/Player';

let jobDialog = `
    <div class="dialog">
        <h3>Select Job</h3>
        <label>Job: </label>
        <select name="job">
        </select><br>
        <button name="confirm">Confirm</button>
        <button name="cancel">Cancel</button>
    </div>
`;

export default class extends ObjectView {
    constructor(lobby, view) {
        super(lobby);
        this._lobby = lobby;
        this._view = view;
        this._selectedOptionIndex = 0;
        this._ready = false;
        this._dialogOpen = false;
    }

    openJobDialog(view) {
        let parser = new DOMParser()
        let doc = parser.parseFromString(jobDialog, "text/html");
        let element = doc.firstChild;

        let confirmButton   = element.querySelector('button[name="confirm"]');
        let cancelButton = element.querySelector('button[name="cancel"]');

        let jobSelect = element.querySelector('select[name="job"]');

        for(let job of Player.getJobs()) {
            let jobOption = document.createElement('option')
            jobOption.value = job.name;
            jobOption.innerHTML = job.name;
            jobSelect.appendChild(jobOption);
        }

        view._element.appendChild(element);

        cancelButton.addEventListener("click", ()=>{
            this._dialog.remove();
            this._dialog = false;
        });

        confirmButton.addEventListener("click", ()=>{
            this._dialog.confirm();
        });

        this._dialog = {
            element: element,
            remove: ()=>{
                element.remove()
                this._dialog = undefined;
            },
            confirm: ()=>{
                if(jobSelect.value) {
                    view.postMessage(new Message(0, "player-job", {
                        "job": jobSelect.value,
                        "id": view._dataStore._localPlayer.id
                    }));
                    this._dialog.remove();
                }
            }
        };
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

        for(let player of this._view._dataStore.players.values()) {
            ctx.fillStyle     = "#ffffff";
            yPos += 40;
            ctx.fillText(player.name, 100, yPos);

            if(player.job) {
                let jobName = player.job.name[0].toUpperCase() + player.job.name.slice(1);;
                ctx.fillText(jobName, 300, yPos);
            }

            if(player.state == "ready") {
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
        if(!this._dialog) {
            if(this.selectedOption == "Select Job") {
                this.openJobDialog(this._view);
            } else if(this.selectedOption == "Leave") {
                this._view.postMessage({
                    "event": "leave-game"
                });
            } else if(this.selectedOption == "Ready" && this._view._dataStore._localPlayer.job) {
                let state = this._view._dataStore._localPlayer.state === "idle" ? "ready" : "idle";
                this._view.postMessage(new Message(0, "player-state", {
                    "state": state,
                    "id": this._view._dataStore._localPlayer.id
                }));
            }
        } else {
            this._dialog.confirm();
        }
    }

    back() {
    }



}
