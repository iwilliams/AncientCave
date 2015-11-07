import BaseObject     from './BaseObject'; // Can't call this Object b/c of conflict xD
import PlayerRenderer from '../views/PlayerRenderer';

export default class extends BaseObject {

    // Static Room Types
    static get JOB_CLAIRVOYANT() {
        return {
            'sprite': 'clairvoyant-sheet.png',
            'name':   'clairvoyant'
        }
    }

    static get JOB_HERBALIST() {
        return {
            'sprite': 'herbalist-sheet.png',
            'name': 'herbalist'
        }
    }

    static get JOB_VILLAIN() {
        return {
            'sprite': 'villain2-sheet.png',
            'name': 'villain'
        }
    }

    static get JOB_KNIGHT() {
        return {
            'sprite': 'knight-sheet.png',
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

    init() {
        this.renderer = new PlayerRenderer(this);
        return this.renderer.init()
    }
}
