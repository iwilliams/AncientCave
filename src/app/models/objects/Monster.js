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

        this.health = 5;

        this.maxCooldown = 120;
    }

    /**
     * Update so we know to charge cooldown meeter
     */
    chargeCooldown(callback) {
        this.cooldown = 0;
        this._isCoolingdown = true;
    }

    tick() {
        if(this._isCoolingdown) {
            this.cooldown++;
            if(this.cooldown >= this.maxCooldown) {
                this._isCoolingdown = false;
                this._readyToAttack = true;
                if(this.onCooldown)
                    this.onCooldown(this);
            }
        }
    }
}
