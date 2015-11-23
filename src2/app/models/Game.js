import Player  from './Player';
import Monster from './Monster';

class Game {
    constructor() {
        this.players = new Map();
    }

    /**
     * Progress Game Logic by calling tick on every object
     */
    tick(frame) {
        // Render everything
        this.objects.forEach((object)=>{
            this._ctx.save();
            object.tick();
            object.render(this._ctx, frame);
            this._ctx.restore();
        });
    }
}
