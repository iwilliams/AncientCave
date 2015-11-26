import EventEmitter from '../mixins/EventEmitter';

// Import Services
import InputService from '../services/KeyboardInputService';
import Config from '../../Config';
import Logger from '../services/Logger';
import SoundService from '../services/SoundService';

// Import views
import PlayerView   from './PlayerView';
import EnemyView    from './EnemyView';
import RoomView     from './RoomView';
import MainMenuView from './MainMenuView';
import LobbyView    from './LobbyView';
import UiView       from './UiView';

export default class extends EventEmitter {
    constructor() {
        super();

        this._element = document.body;
        this._canvas = document.createElement('canvas');

        this._canvas.width = Config.CANVAS_WIDTH;
        this._canvas.height = Config.CANVAS_HEIGHT;

        this._views = new Set();
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

        this._inputService = new InputService();

        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        // Attach resize event
        //window.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize.bind(this));

        this.listenToGameEvents(this._game);
        this.registerInputHandlers(this._inputService);
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
        this._canvas.width              = Config.CANVAS_WIDTH;
        this._canvas.height             = Config.CANVAS_HEIGHT;
        this._ctx.imageSmoothingEnabled = false;

        this._ctx.fillStyle = "#000";
        this._ctx.fillRect(0, 0, Config.CANVAS_WIDTH, Config.CANVAS_HEIGHT);

        for(let view of this._views)  {
            view.render(this._ctx, frame);
        }
    }

    getMainMenuViews() {
        let views = [];

        if(this._mainMenuView) {
            views.push(this._mainMenuView);
        }

        return views;
    }

    startRender() {
        this.then = Date.now();
        this.interval = 1000/Config.FPS;
        this.first = this.then;
        this.counter = 0;
        this._rendering = true;
        window.requestAnimationFrame(this.loop.bind(this));
    }
    /**
     * Listen for game events so we can adjust renderer
     */
    listenToGameEvents(game) {
        game.on("game-state", (message)=> {
            Logger.debug("View Game State Event");
            Logger.log(message);
            if(message == "main menu") {
                // If we aren't rendering then start
                if(!this._rendering) {
                    this.startRender();
                }
                let mainMenuView = new MainMenuView(game.mainMenu, this);
                mainMenuView.init().then(()=>{
                    this._mainMenuView = mainMenuView;
                    this._views = new Set([this._mainMenuView]);
                });
            } else if (message == "lobby") {
                let lobbyView = new LobbyView(game.lobby, game.players, this);
                lobbyView.init().then(()=>{
                    this._lobbyView = lobbyView;
                    this._views = new Set([this._lobbyView]);
                });
            } else if(message == "playing") {
                // Create a new room view
                let roomView = new RoomView(game.room);
                this._roomView = roomView;

                let promises = [
                    roomView.loadResources()
                ];

                let views = [];

                // Create all of our player views
                this._playerViews = new Map();
                for(let player of game.players.values()) {
                    let playerView = new PlayerView(player);
                    promises.push(playerView.loadResources());
                    views.push(playerView);
                    this._playerViews.set(player.id, playerView);
                }

                let uiView = new UiView(game.ui, game.players, this);
                this._uiView = uiView;
                //uiView.requestInput().then(this.handleUiInput.bind(this));
                promises.push(uiView.loadResources());

                // Load sounds
                let soundService = new SoundService();
                this._soundService = soundService;
                promises.push(soundService.loadResources());

                // After all renderers are ready let the dispatcher know
                Promise.all(promises).then(()=>{
                    this._views = [
                        this._roomView,
                        ...views,
                        this._uiView
                    ];
                    this.emit("render-ready");
                });
            }
        });

        game.on("add-player", (player)=>{
            if(game.currentState === "loby")
                this._lobbyView._ready = false;
        });

        game.on("add-enemy", (enemy)=>{
            let enemyView = new EnemyView(enemy);
            enemyView.loadResources().then(()=>{
                if(this._enemyViews) {
                    this._enemyViews = [
                        enemyView,
                        ...this._enemyViews
                    ];
                } else {
                    this._enemyViews = [enemyView];
                }
            });
        });

        game.on("start-battle", ()=>{
            this._soundService.play("combat-theme", true);
            this._views = [
                ...this._views,
                ...this._enemyViews
            ];
        });

        game.on("player-cooldown", (player)=>{
            if(player.isLocal) {
                this._soundService.play("cooldown-ready");
            }
        });

        game.on("player-attack", (player)=>{
            if(player == this._game.localPlayer) {
                this._uiView.clearLastOption();
            }
        });

        game.on("end-battle", ()=>{
            this._soundService.stop("combat-theme");
            this._views = [
                this._roomView,
                ...this._playerViews.values(),
                this._uiView
            ];
        });
    }

    handleUiInput(input) {
        this.emit("option-select", input);
    }

    /**
     * Register input to alter view and see if we need to send envents
     */
    registerInputHandlers(input) {
        // Up input
        input.on("up", ()=>{
            let gameState = this._game.currentState;
            switch(gameState) {
                case "main menu":
                    this._mainMenuView.up();
                    break;
                case "playing":
                    this._uiView.up();
                    this._soundService.play("menu-move");
                    break;
            }
        });

        // Down Input
        input.on("down", ()=>{
            let gameState = this._game.currentState;
            switch(gameState) {
                case "main menu":
                    this._mainMenuView.down();
                    break;
                case "playing":
                    this._uiView.down();
                    this._soundService.play("menu-move");
                    break;
            }
        });

        // Left Input
        input.on("left", ()=>{
            let gameState = this._game.currentState;
            switch(gameState) {
                case "lobby":
                    this._lobbyView.left();
                    break;
                case "playing":
                    this._uiView.left();
                    this._soundService.play("menu-move");
                    break;
            }
        });

        // Right Input
        input.on("right", ()=>{
            let gameState = this._game.currentState;
            switch(gameState) {
                case "lobby":
                    this._lobbyView.right();
                    break;
                case "playing":
                    this._uiView.right();
                    this._soundService.play("menu-move");
                    break;
            }
        });

        // Confirm Input
        input.on("confirm", ()=>{
            let gameState = this._game.currentState;
            switch(gameState) {
                case "main menu":
                    this._mainMenuView.confirm(this);
                    break;
                case "lobby":
                    this._lobbyView.confirm();
                    break;
                case "playing":
                    this._uiView.confirm();
                    this._soundService.play("menu-select");
                    break;
            }
        });

        // Back Input
        input.on("back", ()=>{

        });
    }
}
