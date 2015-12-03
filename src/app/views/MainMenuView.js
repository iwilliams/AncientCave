import ObjectView      from './ObjectView';
import Utils           from '../services/Utils';
import Logger          from '../services/Logger';
import Message         from '../services/Message';
import Config          from '../../Config';
import ResrouceService from '../services/ResourceService';

let hostDialog = `
    <div class="dialog">
        <h3>Host Multiplayer Game</h3>
        <label>Name: </label>
        <input type="text" name="name">
        <label>Id (optional):</label>
        <input type="text" name="id"><br>
        <button name="host" disabled>Host</button>
        <button name="cancel">Cancel</button>
    </div>
`;

let joinDialog = `
    <div class="dialog">
        <h3>Join Multiplayer Game</h3>
        <label>Name: </label>
        <input type="text" name="name">
        <label>Host Id: </label>
        <input type="text" name="host">
        <label>Id (optional):</label>
        <input type="text" name="id"><br>
        <button name="join" disabled>Join</button>
        <button name="cancel">Cancel</button>
    </div>
`;

export default class extends ObjectView {
    constructor(mainMenu, view) {
        super(mainMenu);
        this._mainMenu = mainMenu;
        this._view = view;
        this._selectedOptionIndex = 0;
        this._dialogOpen = false;
    }

    render(ctx, frame) {
        ctx.fillStyle   = "#ffffff";

        let xPos = 100;
        let yPos = 100;

        for(let menuOption of this._mainMenu.currentOptions) {
            let menuOptionText = menuOption;

            // Show select cursor
            if(menuOptionText == this._mainMenu.currentOptions[this._selectedOptionIndex])
                menuOptionText = "> " + menuOptionText;

            // Draw Menu Option
            ctx.fillText(menuOptionText, 100, yPos);
            yPos += 100;
        }
    }

    get selectedOption() {
        return this._mainMenu.currentOptions[this._selectedOptionIndex];
    }

    openHostDialog(view) {
        let parser = new DOMParser()
        let doc = parser.parseFromString(hostDialog, "text/html");
        let element = doc.firstChild;

        let hostButton   = element.querySelector('button[name="host"]');
        let cancelButton = element.querySelector('button[name="cancel"]');

        let nameInput = element.querySelector('input[name="name"]');
        let idInput   = element.querySelector('input[name="id"]');

        view._element.appendChild(element);

        nameInput.oninput = ()=>{
            if(nameInput.value.trim() !== "") {
                hostButton.removeAttribute("disabled");
            } else {
                hostButton.setAttribute("disabled", true);
            }
        }

        cancelButton.addEventListener("click", ()=>{
            this._dialog.remove();
            this._dialog = false;
        });

        hostButton.addEventListener("click", ()=>{
            this._dialog.confirm();
        });

        this._dialog = {
            element: element,
            remove: function() {
                this.element.remove()
            },
            confirm: function() {
                if(nameInput.value.trim()) {
                    let message = new Message("game-host", {});
                    view.postMessage(message.serialize());
                    this.remove();
                }
            }
        };
    }

    openJoinDialog(view) {
        let parser = new DOMParser()
        let doc = parser.parseFromString(joinDialog, "text/html");
        let element = doc.firstChild;


        let joinButton   = element.querySelector('button[name="join"]');
        let cancelButton = element.querySelector('button[name="cancel"]');

        let nameInput   = element.querySelector('input[name="name"]');
        let hostInput   = element.querySelector('input[name="host"]');
        let idInput     = element.querySelector('input[name="id"]');

        view._element.appendChild(element);

        let checkInput = function() {
            if(nameInput.value.trim() && hostInput.value.trim()) {
                joinButton.removeAttribute("disabled");
            } else {
                joinButton.setAttribute("disabled", true);
            }
        };
        nameInput.oninput = checkInput.bind(this);
        hostInput.oninput = checkInput.bind(this);

        cancelButton.addEventListener("click", ()=>{
            this._dialog.remove();
            this._dialog = false;
        });

        joinButton.addEventListener("click", ()=>{
            this._dialog.confirm();
        });

        this._dialog = {
            element: element,
            remove: function() {
                this.element.remove()
            },
            confirm: function() {
                if(nameInput.value.trim() && hostInput.value.trim()) {
                    view.postMessage({
                        "event": "start-mp",
                        "data": {
                            name: nameInput.value,
                            hostId: hostInput.value,
                            id: idInput.value
                        }
                    });
                    this.remove();
                }
            }
        };
    }

    up() {
        if(!this._dialog)
            this._selectedOptionIndex = this._selectedOptionIndex ? 0 : 1;
    }

    down() {
        this.up();
    }

    confirm() {
        if(!this._dialog) {
            if(this.selectedOption == "Host Game") {
                this.openHostDialog(this._view);
            } else {
                this.openJoinDialog(this._view);
            }
        } else {
            this._dialog.confirm();
        }
    }

    back() {
        this.closeDialog();
    }



}
