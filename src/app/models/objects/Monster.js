import BaseModel from '../BaseModel';

export default class extends BaseModel {

    // Static Room Types
    static get TYPE_WURM() {
        return {
            'sprite': 'wurm-sheet.png',
            'name':   'wurm'
        }
    }

    constructor(xPos, yPos, type) {
        super([]);
        this.xPos = xPos;
        this.ypos = yPos;
        this.type = type;
    }
}
