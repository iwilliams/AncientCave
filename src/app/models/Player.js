import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD

export default class extends BaseObject {

    // Static Room Types
    static get JOB_CLAIRVOYANT() {
        return {
            'sprite': 'dist/resources/images/clairvoyant-sheet.png',
            'name':   'clairvoyant'
        }
    }

    static get JOB_HERBALIST() {
        return {
            'sprite': 'dist/resources/images/herbalist-sheet.png',
            'name': 'herbalist'
        }
    }

    static get JOB_VILLAIN() {
        return {
            'sprite': 'dist/resources/images/villain2-sheet.png',
            'name': 'villain'
        }
    }

    static get JOB_KNIGHT() {
        return {
            'sprite': 'dist/resources/images/knight-sheet.png',
            'name': 'knight'
        }
    }

    constructor(xPos, yPos, name, job) {
        super(xPos, yPos);

        this.name = name;

        this.ready = false;

        this.job = job;
        // Define the Spirte Associated with the Player
        this.spriteResource = job.sprite;

        this.isWalking = false;
    }
}
