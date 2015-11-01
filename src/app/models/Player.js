import BaseObject from './BaseObject'; // Can't call this Object b/c of conflict xD

export default class extends BaseObject {

    constructor(xPos, yPos, name) {
        super(xPos, yPos);

        this.name = name;

        // Define the Spirte Associated with the Player
        this.spriteResource = '/dist/resources/images/spritesheet.png';
        //this.spriteResource = '/dist/resources/images/astrologist.png';

        this.isWalking = false;

        this.step = 5;
        this.flip = 0;
    }

    walk(dir) {
        this.isWalking = true;
        if(dir == "w") {
            this.facing = "w";
        } else if (dir == "e") {
            this.facing = "e";
        }
        this.dir = dir;
    }

    stopWalking() {
        this.isWalking = false;
    }

    tick() {
        if(this.isWalking) {
            if(this.dir == "w") {
                this.xPos -= this.step;
                this.flip = 0;
            }

            if(this.dir == "e") {
                this.xPos += this.step;
                this.flip = 1;
            }

            if(this.dir == "n") {
                this.yPos -= this.step;
            }

            if(this.dir == "s") {
                this.yPos += this.step;
            }
        }
    }
}
