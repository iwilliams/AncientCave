import ObjectView      from './ObjectView';
import Utils from '../services/Utils';
import Config from '../../Config';

// Static Room Types
//static get TYPE_CAVE() {
    //return {
        //floor: 'goodtile.png',
        //wall: 'shitwall.png'
    //};
//}

//static get TYPE_TEMPLE() {
    //return {
        //floor: 'grass.png',
        //wall: 'pillars.png'
    //};
//}

export default class extends ObjectView {
    constructor(room) {
        super();
        this._room = room;
        this._floorOffset = 0;
        this._wallOffset  = 0;

        this._images = [
            {
                "name": "floor",
                "image": "goodtile.png",
            },
            {
                "name": "wall",
                "image": "shitwall.png",
            }
        ];
    }

    loadResources() {
        return Promise.all([
            this.loadResource("floor", "goodtile.png"),
            this.loadResource("wall",  "shitwall.png")
        ]);
    }

    render(ctx, frame) {
        this.frame      = (frame < Config.FPS%2) ? 0 : 1;
        this.frame = frame%2;

        // Render Floor
        let floor = this._resources.get('floor');
        let floorWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE;
        for(let x = 0; x < Config.TILE_X+1; x++) {
            for(let y = 0; y < Config.TILE_Y - 4; y++) {
                ctx.drawImage(...[
                    floor,
                    0,
                    0,
                    Config.SPRITE_SIZE, // dWidth
                    Config.SPRITE_SIZE, // dHeight
                    this._floorOffset + floorWidth*x - floorWidth, // DX
                    (y+2)*floorWidth, // DX
                    floorWidth,
                    floorWidth
                ]);
            }
        }

        // Render Wall
        let wall = this._resources.get('wall');
        let wallWidth = wall.width*Config.SPRITE_SCALE;
        for(let x = 0; x < Config.CANVAS_WIDTH/(wallWidth) + 1; x++) {
            ctx.drawImage(...[
                wall,
                0, // DX
                wall.height/2*this.frame, //DY
                wall.width,
                wall.height/2,
                this._wallOffset + wallWidth*x - wallWidth, //sx
                0, //sy
                wall.width*Config.SPRITE_SCALE,
                wall.height*Config.SPRITE_SCALE/2
            ]);
        }

        // Calculate Offsets
        let xStep = Config.SPRITE_SIZE*Config.SPRITE_SCALE/16;
        if(this._room.currentState == "moving") {
            this._floorOffset += xStep;
            if(this._floorOffset >= floorWidth - 1) this._floorOffset = 0;

            this._wallOffset += xStep;
            if(this._wallOffset > wallWidth - 1) this._wallOffset = 0;
        }
    }
}
