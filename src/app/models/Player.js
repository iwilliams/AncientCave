import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD

export default class extends BaseObject {

    constructor(xPos, yPos, name) {
        super(xPos, yPos);

        this.name = name;

        // Define the Spirte Associated with the Player
        this.spriteResource = '/dist/resources/images/spritesheet.png';
        //this.spriteResource = '/dist/resources/images/astrologist.png';

        this.isWalking = false;
    }
}
