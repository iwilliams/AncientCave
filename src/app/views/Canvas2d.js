import EventEmitter from '../mixins/EventEmitter';

// Import Services
import InputService from '../services/KeyboardInputService';
import Config from '../../Config';

// Import views
import PlayerView   from './PlayerView';
import EnemyView    from './EnemyView';
import RoomView     from './RoomView';

export default class extends EventEmitter {
    constructor() {
        super();

        this._element = document.body;
        this._canvas = document.createElement('canvas');

        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
    }

    /**
     * Resize Handler
     * @todo: does this belong here?
     */
    resize() {
        Config.calculate();
        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
        this._ctx.imageSmoothingEnabled = false;
    }

    init(game) {
        this._game = game;

        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        // Attach resize event
        //window.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize.bind(this));

        this.listenToGameEvents(this._game);
        this.registerInputHandlers();
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

            // Render game
            this.render(this._frame);

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

    render(frame) {
        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;
        this._ctx.imageSmoothingEnabled = false;

        this._ctx.fillStyle = "#000";
        this._ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

        // Consolidate all Views in render order
        let views = [
            //this._roomView,
            //...this._enemyViews.values(),
            ...this._playerViews.values(),
            //this._uiView
        ];

        for(let view of views)  {
            view.render(this._ctx, frame);
        }
    }

    /**
     * Listen for game events so we can adjust renderer
     */
    listenToGameEvents(game) {
        game.on("init", ()=> {
            this.then = Date.now();
            this.interval = 1000/Config.FPS;
            this.first = this.then;
            this.counter = 0;
            window.requestAnimationFrame(this.loop.bind(this));
        });

        game.on("add-player", (player)=>{
            // Create a new player view
            let playerView = new PlayerView(player);

            // Inititalize player view
            //playerView.init().then(()=>{
                // Decide what to do after initialized
                if(this._playerViews)
                    this._playerViews.add(playerView);
                else
                    this._playerViews = new Set([playerView]);
            //});
        });

        game.on("add-enemy", (enemy)=>{
            // Create a new enemy view
            let enemyView = new EnemyView(enemy);

            // Inititalize enemy view
            enemyView.init().then(()=>{
                // Decide what to do after initialized
                if(this._enemyViews)
                    this._enemyViews.add(enemyView);
                else
                    this._enemyViews = new Set([enemyView]);
            });
        });

        game.on("set-room", (room)=>{
            // Create a new room view
            let roomView = new RoomView(room);

            // Initialize room view
            roomView.init().then(()=> {
                this._roomView = new RoomView(room);
            });
        });
    }

    /**
     * Register input to create events
     */
    registerInputHandlers() {
        return;
    }
}
