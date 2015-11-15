import ObjectView      from './ObjectView';
import Utils           from '../services/Utils';
import Config          from '../../Config';
import ResrouceService from '../services/ResourceService';

export default class extends ObjectView {
    constructor(player) {
        super(player);
        this._player = player;

        //this._images = [
            //{
                //"name": "sprite",
                //"image": this._player.job.sprite,
            //},
            //{
                //"name": "shadow",
                //"image": "shadow.png",
            //},
            //{
                //"name": "bubble",
                //"image": "bubble.png",
            //},
        //];
    }


    render(ctx, frame) {
        this.frame      = (frame < Config.FPS/2) ? 0 : 1;

        let playerWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE;

        ctx.fillStyle   = "#ffffff";
        ctx.fillText(this._player.name, 100, this._player.yPos*playerWidth);
    }
}
