import Config from '../Config';
// Import Game
import DataStore from './services/DataStore';

// Import View
import View from './views/Canvas2d';

// Import Dispatcher
import Dispatcher from './dispatcher/Dispatcher';

export default class {
    constructor() {
        this._dispatcher = new Dispatcher();
        this._dataStore  = new DataStore();
        this._view       = new View();


        window.dataStore  = this._dataStore;
        window.view       = this._view;
        window.dispatcher = this._dispatcher;
    }

    /**
     * Initialize the engine
     */
    init() {
        Promise.all([
            this._dispatcher.init(this._view),
            this._dataStore.init(this._dispatcher),
            this._view.init(this._dispatcher, this._dataStore),
        ]).then(()=>{
            //this._dispatcher.postMessage({"event": "game-start"});
        });
    }
}
