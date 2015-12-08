import EventEmitter from '../mixins/EventEmitter';

// Import Services
import InputService from '../services/KeyboardInputService';
import MobileInputService from '../services/MobileInputService';
import Config       from '../../Config';
import Logger       from '../services/Logger';
import Message      from '../services/Logger';
import SoundService from '../services/SoundService';

// Import views
import PlayerView   from './PlayerView';
import EnemyView    from './EnemyView';
import RoomView     from './RoomView';
import MainMenuView from './MainMenuView';
import LobbyView    from './LobbyView';
import UiView       from './UiView';
import DebugView    from './DebugView';

export default class extends EventEmitter {
    constructor(dispatcher) {
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

    init(dispatcher, dataStore) {
        dispatcher.onmessage = this.handleMessage.bind(this);
        this._dataStore = dataStore;

        this._debugView = new DebugView(this._dataStore);

        this._inputService = new InputService();
        this._mobileInputService = new MobileInputService();
        this.registerInputHandlers(this._inputService);
        this.registerInputHandlers(this._mobileInputService);

        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        // Attach resize event
        //window.resize = this.resize.bind(this);
        window.addEventListener("resize", this.resize.bind(this));

        this._mainMenuView = new MainMenuView(dataStore.mainMenu, this);

        this._views.add(this._mainMenuView);

        // Start render loop
        this.startRender();
}

    /**
     * Handle messages from Dispatcher
     */
    handleMessage(message) {
        Logger.debug("View recieved message from Dispatcher");
        let decodedMessage = message;
        Logger.log(decodedMessage);
        let from  = decodedMessage.from;
        let event = decodedMessage.event;
        let data  = decodedMessage.data;

        switch(event) {
            case "game-state":
                if(data === "lobby") {
                    this._lobbyView = new LobbyView(dataStore.lobby, this);
                    this._views = new Set([
                       this._lobbyView
                    ]);
                } else if(data === "playing") {
                    let resourcePromises = [];
                    resourcePromises.push(this._roomView.loadResources());

                    this._playerViews = new Map();
                    for(let player of this._dataStore.players.values()) {
                        let playerView = new PlayerView(player);
                        this._playerViews.set(player.id, playerView);
                        resourcePromises.push(playerView.loadResources());
                    }

                    this._uiView = new UiView(this._dataStore._ui, this);
                    resourcePromises.push(this._uiView.loadResources());

                    this._soundService = new SoundService();
                    resourcePromises.push(this._soundService.loadResources());

                    Promise.all(resourcePromises).then(()=>{
                        this._views = new Set([
                           this._roomView,
                           ...this._playerViews.values(),
                           this._uiView
                        ]);
                        this._soundService.play("dungeon-theme", true);
                    });
                }
                break;
            case "room-create": {
                this._roomView = new RoomView(this._dataStore.room);
            }
        }
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
            this._fps = parseInt(this.counter/time_el);

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

        this._debugView.render(this._ctx, frame, this._fps);
    }

    /**
     * Kick off the render loop
     */
    startRender() {
        this.then = Date.now();
        this.interval = 1000/Config.FPS;
        this.first = this.then;
        this.counter = 0;
        this._rendering = true;
        window.requestAnimationFrame(this.loop.bind(this));
    }

    /**
     * Register input to alter view and see if we need to send envents
     */
    registerInputHandlers(input) {
        // Up input
        input.on("up", ()=>{
            let gameState = this._dataStore.game.state;
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
            let gameState = this._dataStore.game.state;
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
            let gameState = this._dataStore.game.state;
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
            let gameState = this._dataStore.game.state;
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
            let gameState = this._dataStore.game.state;
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

        input.on("debug", ()=>{
            this._debugView.toggle();
        });
    }
}
