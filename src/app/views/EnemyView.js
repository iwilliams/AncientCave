import Renderer from './Renderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends Renderer {
    constructor(monster) {
        super()
        this._monster = monster;

        this._images = [
            {
                "name": "sprite",
                "image": this._monster.type.sprite,
            }
        ];
    }

    render(ctx, frame) {
        this.frame = (frame < Config.FPS/2) ? 0 : 1;
        let sprite = this._resources.get('sprite');

        ctx.drawImage(...[
            sprite,
            sprite.width/3*this.frame,
            0,
            this._resources.get('sprite').width/3, // dWidth
            this._resources.get('sprite').height/2, // dHeight
            20,
            10, // Ypos
            this._resources.get('sprite').width/3*Config.SPRITE_SCALE, // sWidth
            this._resources.get('sprite').height/2*Config.SPRITE_SCALE  // sHeight
        ]);
    }
}
