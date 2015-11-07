import Renderer from './Renderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends Renderer {
    constructor(object) {
        super();
        this.room = object;
        this._floorOffset = 0;
        this._wallOffset  = 0;
    }

    init() {
        return Promise.all([
            this.loadResource("floor", this.room.type.floor),
            this.loadResource("wall",  this.room.type.wall)
        ]);
    }

    render(ctx, frame) {
        // Render Floor
        let floor = this._resources.get('floor');
        let floorWidth = floor.width*Config.SPRITE_SCALE;
        for(let x = 0; x < Config.TILE_X+1; x++) {
            for(let y = 0; y < Config.TILE_Y - 2; y++) {
                ctx.drawImage(...[
                    floor,
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
                this._wallOffset + wallWidth*x - wallWidth,
                0,
                this._resources.get('wall').width*Config.SPRITE_SCALE, // sWidth
                this._resources.get('wall').height*Config.SPRITE_SCALE // sWidth
            ]);
        }

        // Calculate Offsets
        let xStep = Config.SPRITE_SIZE*Config.SPRITE_SCALE/16;
        if(this.room.isMoving) {
            this._floorOffset += xStep;
            if(this._floorOffset >= floorWidth - 1) this._floorOffset = 0;

            this._wallOffset += xStep;
            if(this._wallOffset > wallWidth - 1) this._wallOffset = 0;
        }
    }
}
