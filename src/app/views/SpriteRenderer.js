import Renderer from './Renderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends Renderer {
    constructor(spriteResource) {
        super();

        this.shadowImage = './dist/resources/images/shadow.png';
        this.waitingImage = './dist/resources/images/waiting.png';

        if(spriteResource) {
            this._spriteResource = spriteResource;
        }
    }

    init() {
        return Promise.all([
                new Promise((res, rej)=>{
                    this.image = document.createElement('img');
                    this.image.onload = function() {
                        res(this);
                    }
                    this.image.src = this._spriteResource;
                }),
                new Promise((res, rej)=>{
                    this.shadow = document.createElement('img');
                    this.shadow.onload = function() {
                        res(this);
                    }
                    this.shadow.src = this.shadowImage;
                }),
                new Promise((res, rej)=>{
                    this.waiting = document.createElement('img');
                    this.waiting.onload = function() {
                        res(this);
                    }
                    this.waiting.src = this.waitingImage;
                })
            ]);
    }
}
