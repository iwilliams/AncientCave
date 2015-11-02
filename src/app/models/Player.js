import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD

export default class extends BaseObject {

    // Static Room Types
    static get JOB_CLAIRVOYANT() { return './dist/resources/images/clairvoyant-sheet.png';}
    static get JOB_HERBALIST()   { return './dist/resources/images/herbalist-sheet.png';}

    constructor(xPos, yPos, name, job) {
        super(xPos, yPos);

        this.name = name;

        // Define the Spirte Associated with the Player
        this.spriteResource = job;

        this.isWalking = false;
    }
}
