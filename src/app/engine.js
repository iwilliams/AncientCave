// Import Game
import Game from './models/Game';

// Import View
import View from './views/Canvas2d';

// Import Dispatcher
import Dispatcher from './dispatcher/Dispatcher';

export default class {
    constructor() {
        this._game       = new Game();
        this._view       = new View();
        this._dispatcher = new Dispatcher();

        window.game       = this._game;
        window.view       = this._view;
        window.dispatcher = this._dispatcher;
    }

    /**
     * Initialize the engine
     */
    init() {
        return Promise.all([
            this._game.init(this._dispatcher),
            this._view.init(this._game),
            this._dispatcher.init(this._view)
        ]);
    }
}
