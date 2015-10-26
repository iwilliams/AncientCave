import Logger from './Logger';
import Player from '../models/Player';
import Utils from './Utils';
import Config from '../../Config';

export default class {
    constructor(element) {
        this._element = element;
        this._canvas = document.createElement('canvas');

        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
    }

    loop() {
        this._ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

        if(!this.frame) this.frame = 0;

        this.players.forEach((player)=>{
            player.render(this._ctx);
        });

        this.frame = this.frame ? 0 : 1;

        setTimeout(()=>{
            window.requestAnimationFrame(this.loop.bind(this));
        }, Config.FPS);
    }


    init() {
        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        let players = [];
        let playerPromises = [];

        // Initialize all players
        for(let y = 0; y < Config.TILE_Y; y++) {
            for(let x = 0; x < Config.TILE_X; x++) {
                let p = new Player(x, y)
                players.push(p);
                playerPromises.push(p.init());
            }
        }
        this.players = new Set(players);

        Promise.all(playerPromises).then(()=>{
            window.requestAnimationFrame(this.loop.bind(this));
        });


        Logger.banner('Game Started');
    }
}
