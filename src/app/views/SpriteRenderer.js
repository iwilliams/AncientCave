import Renderer from './Renderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends Renderer {
    constructor(spriteResource) {
        super();
        this._spriteResource = spriteResource;
    }

    init() {
        return new Promise((res, rej)=>{
            this.image = document.createElement('img');
            this.image.onload = function() {
                res(this);
            }
            this.image.src = this._spriteResource;
        });
    }

    render(ctx) {
    }
}
