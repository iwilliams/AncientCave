import InputService from '../services/InputService';

// Import views
import PlayerView   from './PlayerView';
import EnemyView    from './EnemyView';
import RoomView     from './RoomView';

export default class {
    constructor(game) {
        this._game = game;
        this._element = element;
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

    init() {
        this._element.appendChild(this._canvas);
        this._ctx = this._canvas.getContext('2d');
        this._ctx.imageSmoothingEnabled = false;

        this.listenToGameEvents(this._game);
        this.registerInputHandlers();
    }

    render(frame) {

        // Consolidate all Views in render order
        let views = [
            this._roomView,
            ...this._enemyViews.values(),
            ...this._playerViews.values(),
            this._uiView
        ];

        for(let view of views)  {
            view.render(frame);
        }
    }

    /**
     * Listen for game events so we can adjust renderer
     */
    listenToGameEvents(game) {
        game.on("new-player", player) {
            // Create a new player view
            let playerView = new PlayerView(player);

            // Inititalize player view
            playerView.init().then(()=>{
                // Decide what to do after initialized
                if(this._playerViews)
                    this._playerViews.add(playerView);
                else
                    this._playerViews = new Set([playerView]);
            });
        }

        game.on("new-enemy", enemy) {
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
        }

        game.on("new-room", room) {
            // Create a new room view
            let roomView = new RoomView(room);

            // Initialize room view
            roomView.init().then(()=> {
                this._roomView = new RoomView(room);
            });
        }
    }

    /**
     * Register input to create events
     */
    registerInputHandlers() {
    }
}
