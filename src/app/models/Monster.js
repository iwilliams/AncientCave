import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD
import MonsterRenderer from '../views/MonsterRenderer';

export default class extends BaseObject {

    constructor(xPos, yPos) {
        super(xPos, yPos);
        // Define the Spirte Associated with the Player
        this.spriteResource = '/dist/resources/images/necro-sprite.png';
    }

    init() {
        return new Promise((res, rej) => {
            this.renderer = new MonsterRenderer(this);
            this.renderer.init()
                .then(res);
        });
    }
}
