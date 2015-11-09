import BaseObject     from './BaseObject'; // Can't call this Object b/c of conflict xD
import PlayerRenderer from '../views/PlayerRenderer';

export default class extends BaseObject {

    // Static Room Types
    static get JOB_CLAIRVOYANT() {
        return {
            'sprite': 'clairvoyant-sheet.png',
            'name':   'clairvoyant',
            'health': 60,
            'mana': 40,
            'position': 'back'
        }
    }

    static get JOB_HERBALIST() {
        return {
            'sprite': 'herbalist-sheet.png',
            'name': 'herbalist',
            'health': 40,
            'mana': 0,
            'position': 'back'
        }
    }

    static get JOB_VILLAIN() {
        return {
            'sprite': 'villain2-sheet.png',
            'name': 'villain',
            'health': 80,
            'mana': 20,
            'position': 'front'
        }
    }

    static get JOB_KNIGHT() {
        return {
            'sprite': 'knight-sheet.png',
            'name': 'knight',
            'health': 100,
            'mana': 0,
            'position': 'front'
        }
    }

    static get JOB_NECROMANCER() {
        return {
            'sprite': 'necromancer-sheet.png',
            'name': 'necromancer',
            'health': 40,
            'mana': 120,
            'position': 'front'
        }
    }

    constructor(xPos, yPos, name, job) {
        super(xPos, yPos);
        this.name = name;
        this.ready = false;
        this.isWalking = false;
        this.job = job;
        this.position = job.position;
        this.maxHealth = job.health;
        this.currentHealth = job.health;
        this.maxMana = job.mana;
        this.currentMana = job.mana;
        this.action = "wait";
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
            "isWalking": this.ready,
            "action": this.action
        }
    }

    deserialize(player) {
        this.name       = player.name;
        this.job        = player.job;
        this.ready      = player.ready;
        this.action     = player.action;
        this.isWalking  = player.ready;
    }

    setAction(action) {
        this.action = action;
    }
}
