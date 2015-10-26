import Logger  from './Logger';
import Player  from '../models/Player';
import Monster from '../models/Monster';
import Room    from '../models/Room';
import Ui      from '../models/Ui';
import Utils   from './Utils';
import Config  from '../../Config';

export default class {
    constructor(element) {
        this._element = element;
        this._canvas = document.createElement('canvas');

        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
    }

    loop() {
        this._ctx.fillStyle = "#000";
        this._ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

        this.room.render(this._ctx);

        if(!this.frame) this.frame = 0;

        this.players.forEach((player)=>{
            player.render(this._ctx);
        });

        this.ui.render(this._ctx);

        this.necro.render(this._ctx);

        this.frame = this.frame ? 0 : 1;

        setTimeout(()=>{
            window.requestAnimationFrame(this.loop.bind(this));
        }, Config.FPS);
    }

    /**
     * Resize Handler
     * @todo: does this belong here?
     */
    resize() {
        console.log("resize");
        Config.calculate();
    }

    /**
     * Request the game goes full screen, will fullscreen the canvas element
     * Found: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
     */
    requestFullscreen() {
        if (this._canvas.requestFullscreen) {
            this._canvas.requestFullscreen();
        } else if (this._canvas.msRequestFullscreen) {
            this._canvas.msRequestFullscreen();
        } else if (this._canvas.mozRequestFullScreen) {
            this._canvas.mozRequestFullScreen();
        } else if (this._canvas.webkitRequestFullscreen) {
            this._canvas.webkitRequestFullscreen();
        }
    }

    /**
     * Initialize the engine
     */
    init() {
        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        let players = [];
        let playerPromises = [];

         //Initialize all players
        //for(let y = 0; y < Config.TILE_Y - 2; y++) {
            //for(let x = 0; x < Config.TILE_X; x++) {
                //let p = new Player(x, y);
                //players.push(p);
                //playerPromises.push(p.init());
            //}
        //}

        // Create 4 players
        let p1 = new Player(13, 3);
        players.push(p1);
        let p2 = new Player(14, 4);
        players.push(p2);
        let p3 = new Player(13, 5);
        players.push(p3);
        let p4 = new Player(14, 6);
        players.push(p4);

        // Init all players
        playerPromises.push(p1.init());
        playerPromises.push(p2.init());
        playerPromises.push(p3.init());
        playerPromises.push(p4.init());

        this.players = new Set(players);

        //// Add a baddie
        this.necro = new Monster(1, 1);
        playerPromises.push(this.necro.init());

        // Initialize UI
        this.ui = new Ui();
        playerPromises.push(this.ui.init());

        // Initialize Room
        this.room = new Room();
        playerPromises.push(this.room.init());


        Promise.all(playerPromises).then(()=>{
            window.requestAnimationFrame(this.loop.bind(this));
        });

        // Attach resize event
        //window.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize.bind(this));

        // Attach Fullscreen event
        document.getElementsByTagName("button")[0].addEventListener("click", this.requestFullscreen.bind(this));

        Logger.banner('Game Started');
    }
}
