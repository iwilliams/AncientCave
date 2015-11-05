import SpriteRenderer from './SpriteRenderer';
import Utils from '../services/Utils';
import Config from '../../Config';

export default class extends SpriteRenderer {
    constructor(object) {
        super();
        this.floorResource = object.floorResource;
        this.wallResource  = object.wallResource;

        this.room = object;
        this._offsetX = 0;
        this.wallOffset = 0;
    }

    init() {
        return Promise.all([
            new Promise((res, rej)=>{
                this.floorImage = document.createElement('img');
                this.floorImage.onload = function() {
                    res(this);
                }
                this.floorImage.src = this.floorResource;
            }),
            new Promise((res, rej)=>{
                this.wallImage = document.createElement('img');
                this.wallImage.onload = function() {
                    res(this);
                }
                this.wallImage.src = this.wallResource;
            })
        ]);
    }

    render(ctx, frame) {

        for(let x = 0; x < Config.TILE_X+1; x++) {
            for(let y = 0; y < Config.TILE_Y - 2; y++) {
                ctx.drawImage(...[
                    this.floorImage,
                    (x*Config.SPRITE_SIZE*Config.SPRITE_SCALE) - (Config.SPRITE_SIZE*Config.SPRITE_SCALE) + this._offsetX, // DX
                    (y+2)*Config.SPRITE_SIZE*Config.SPRITE_SCALE, // DX
                    Config.SPRITE_SIZE*Config.SPRITE_SCALE, // sWidth
                    Config.SPRITE_SIZE*Config.SPRITE_SCALE // sWidth
                ]);
            }
        }

        for(let x = 0; x < Config.CANVAS_WIDTH/(this.wallImage.width*Config.SPRITE_SCALE) + 1; x++) {
            ctx.drawImage(...[
                this.wallImage,
                this.wallOffset + (this.wallImage.width*Config.SPRITE_SCALE*x) - (this.wallImage.width*Config.SPRITE_SCALE),
                0,
                this.wallImage.width*Config.SPRITE_SCALE, // sWidth
                this.wallImage.height*Config.SPRITE_SCALE // sWidth
            ]);
        }

        if(this.room.isMoving) {
            this._offsetX += Config.SPRITE_SIZE*Config.SPRITE_SCALE/16;
            if(this._offsetX >= Config.SPRITE_SIZE*Config.SPRITE_SCALE - 1) this._offsetX = 0;

            this.wallOffset += Config.SPRITE_SIZE*Config.SPRITE_SCALE/16;
            if(this.wallOffset > this.wallImage.width*Config.SPRITE_SCALE - 1) this.wallOffset = 0;
        }
    }
}
