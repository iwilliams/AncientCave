import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD

export default class extends BaseObject {

    constructor(xPos, yPos) {
        super(xPos, yPos);

        // Define the Spirte Associated with the Player
        this.spriteResource = '/dist/resources/images/spritesheet.png';

    }
}
