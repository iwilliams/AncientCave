import Config   from '../Config';

// Import Utils
import Utils    from './services/Utils';
import Logger   from './services/Logger';
import Rng      from './services/Rng';

// Import Controllers
import GameController     from '../controllers/GameController';

// Import View
import View from './views/Canvas2d';

export default class {
    constructor(element) {
        this._view = new View(element);
    }

    /**
     * Initialize the engine
     */
    init(name, job, id, host) {
        let queryParams = Utils.parseQuery(window.location.search);

        //initialize the game controller
        //@todo need to pass params to this
        this.game = new GameController(this._ctx);
        this.game.init(name, job, id, host).then(()=>{
            console.log("Game Controller Initialized");
            this.then = Date.now();
            this.interval = 1000/Config.FPS;
            this.first = this.then;
            this.counter = 0;
            window.requestAnimationFrame(this.loop.bind(this));
        });

        // Attach resize event
        //window.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize.bind(this));

        // Attach Fullscreen event
        //document.getElementsByTagName("button")[0].addEventListener("click", this.requestFullscreen.bind(this));

        Logger.banner('Game Started');
    }

    // http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
    loop() {
        requestAnimationFrame(this.loop.bind(this));

        let now = Date.now();
        let delta = now - this.then;

        // If the fps interval is correct
        if (delta > this.interval) {
            // Calculate time since last frame
            this.then = now - (delta % this.interval);

            // Set up Rendering
            this._frame = this._frame || 1;
            this._frame = (this._frame%Config.FPS) ? this._frame : 1;

            this._canvas.width = Config.CANVAS_WIDTH;
            this._canvas.height = Config.CANVAS_HEIGHT;
            this._ctx.imageSmoothingEnabled = false;

            this._ctx.fillStyle = "#000";
            this._ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

            this._canvas.width = Config.CANVAS_WIDTH;
            this._canvas.height = Config.CANVAS_HEIGHT;
            this._ctx.imageSmoothingEnabled = false;

            // Progress game
            this.game.tick(this._frame);
            this.renderer.tick(this._frame);

            // Calculate next render cycle
            let time_el = (this.then - this.first)/1000;
            ++this.counter;
            let fps = parseInt(this.counter/time_el);

            // Show FPS
            let fontSize          = 5*Config.SPRITE_SCALE;
            this._ctx.font        = fontSize + "px Courier New";
            this._ctx.fillStyle   = "#ffffff";

            this._ctx.fillText(this._frame + "/" + Config.FPS + " " + fps + "fps", 20, 20);

            // Increment Frame
            this._frame++;
        }
    }

}
