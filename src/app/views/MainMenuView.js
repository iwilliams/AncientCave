import ObjectView      from './ObjectView';
import Utils           from '../services/Utils';
import Config          from '../../Config';
import ResrouceService from '../services/ResourceService';

export default class extends ObjectView {
    constructor(mainMenu) {
        super(mainMenu);
        this._mainMenu = mainMenu;
    }


    render(ctx, frame) {
        ctx.fillStyle   = "#ffffff";

        let xPos = 100;
        let yPos = 100;

        for(let menuOption of this._mainMenu.currentOptions) {
            let menuOptionText = menuOption;

            if(menuOptionText == this._mainMenu.selectedOption)
                menuOptionText = "> " + menuOptionText;

            ctx.fillText(menuOptionText, 100, yPos);
            yPos += 100;
        }
    }
}
