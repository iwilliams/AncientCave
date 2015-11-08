import Renderer from './Renderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends Renderer {
    constructor(monster) {
        super()
        this.monster = monster;
    }

    init() {
        return Promise.all([
            this.loadResource('sprite', this.monster.type.sprite),
        ]);
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
