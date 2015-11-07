import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD
import MonsterRenderer from '../views/MonsterRenderer';

export default class extends BaseObject {

    // Static Room Types
    static get TYPE_WURM() {
        return {
            'sprite': 'wurm-sheet.png',
            'name':   'wurm'
        }
    }

    constructor(xPos, yPos, type) {
        super(xPos, yPos);
        this.type = type;
    }

    init() {
        this.renderer = new MonsterRenderer(this);
        return this.renderer.init();
    }
}
