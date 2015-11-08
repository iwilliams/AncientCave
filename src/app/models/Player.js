import BaseObject     from './BaseObject'; // Can't call this Object b/c of conflict xD
import PlayerRenderer from '../views/PlayerRenderer';

export default class extends BaseObject {

    // Static Room Types
    static get JOB_CLAIRVOYANT() {
        return {
            'sprite': 'clairvoyant-sheet.png',
            'name':   'clairvoyant',
            'health': 60,
            'mana': 40
        }
    }

    static get JOB_HERBALIST() {
        return {
            'sprite': 'herbalist-sheet.png',
            'name': 'herbalist',
            'health': 40,
            'mana': 0
        }
    }

    static get JOB_VILLAIN() {
        return {
            'sprite': 'villain2-sheet.png',
            'name': 'villain',
            'health': 80,
            'mana': 20
        }
    }

    static get JOB_KNIGHT() {
        return {
            'sprite': 'knight-sheet.png',
            'name': 'knight',
            'health': 100,
            'mana': 0
        }
    }

    constructor(xPos, yPos, name, job) {
        super(xPos, yPos);
        this.name = name;
        this.ready = false;
        this.job = job;
        this.isWalking = false;
    }

    init() {
        this.renderer = new PlayerRenderer(this);
        return this.renderer.init()
    }

    serialize() {
        return {
            "name": this.name,
            "job": this.job,
            "ready": this.ready,
            "isWalking": this.ready
        }
    }
}
