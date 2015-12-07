(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appEngine = require('./app/Engine');

var _appEngine2 = _interopRequireDefault(_appEngine);

// Create new instance of game
var engine = new _appEngine2['default'](document.body);
engine.init();

// DEBUG
window.engine = engine;

},{"./app/Engine":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {};
/**
 * Should be set up to recalculate on the fly when things chagne.
 * Not working right at all for window size chagnes.
 */
config.API_KEY = "xahxx0yuy5le4s4i";

//config.DISABLE_AUDIO = true;

// 16x9 Aspect Ratio
config.ASPECT_WIDTH = 1920;
config.ASPECT_HEIGHT = 1080;

config.TILE_X = 16; // MUST BE MULTIPLE OF 16
config.TILE_Y = config.TILE_X * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

config.calculate = function () {
    // Horizontal or Vertical percentage that the game view should occupy
    config.PERCENTAGE = 1;

    config.SPRITE_SIZE = 24;

    // Caclulate canvas width and height according to above percentage and aspect ratio
    var screenWidth = window.outerWidth;
    do {
        config.CANVAS_WIDTH = screenWidth-- * config.PERCENTAGE;
        config.CANVAS_HEIGHT = config.CANVAS_WIDTH * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;
    } while (config.CANVAS_HEIGHT % config.SPRITE_SIZE !== 0);

    // Make sure the window will fit vertically
    //if(config.CANVAS_HEIGHT > window.innerHeight) {
    //config.CANVAS_HEIGHT  = window.outerHeight*config.PERCENTAGE;
    //config.CANVAS_WIDTH = (config.CANVAS_HEIGHT*config.ASPECT_WIDTH)/config.ASPECT_HEIGHT;
    //}

    // Determine Sprite Scaling
    config.SPRITE_SCALE = config.CANVAS_WIDTH / (config.TILE_X * config.SPRITE_SIZE);
    config.TILE_SIZE = config.SPRITE_SIZE * config.SPRITE_SCALE;

    // Set FPS
    config.FPS = 60;
};

if (self.document) config.calculate();

exports["default"] = config;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Config = require('../Config');

var _Config2 = _interopRequireDefault(_Config);

// Import Game

var _servicesDataStore = require('./services/DataStore');

var _servicesDataStore2 = _interopRequireDefault(_servicesDataStore);

// Import View

var _viewsCanvas2d = require('./views/Canvas2d');

var _viewsCanvas2d2 = _interopRequireDefault(_viewsCanvas2d);

// Import Dispatcher

var _dispatcherDispatcher = require('./dispatcher/Dispatcher');

var _dispatcherDispatcher2 = _interopRequireDefault(_dispatcherDispatcher);

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);

        this._dispatcher = new _dispatcherDispatcher2['default']();
        this._dataStore = new _servicesDataStore2['default']();
        this._view = new _viewsCanvas2d2['default']();

        window.dataStore = this._dataStore;
        window.view = this._view;
        window.dispatcher = this._dispatcher;
    }

    /**
     * Initialize the engine
     */

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            Promise.all([this._dispatcher.init(this._view), this._dataStore.init(this._dispatcher), this._view.init(this._dispatcher, this._dataStore)]).then(function () {
                //this._dispatcher.postMessage({"event": "game-start"});
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../Config":2,"./dispatcher/Dispatcher":4,"./services/DataStore":13,"./views/Canvas2d":22}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var _bind = Function.prototype.bind;

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _servicesMessage = require('../services/Message');

var _servicesMessage2 = _interopRequireDefault(_servicesMessage);

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

var _servicesNetworkService = require('../services/NetworkService');

var _servicesNetworkService2 = _interopRequireDefault(_servicesNetworkService);

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
    }

    _createClass(_default, [{
        key: 'init',
        value: function init(view) {

            view.onmessage = this.handleViewMessages.bind(this);
        }
    }, {
        key: 'initMultiplayerGame',
        value: function initMultiplayerGame(message) {
            var _this = this;

            var args = [];
            // Build args
            if (message.hostId) {
                args = [message.name, message.hostId];
            } else {
                args = [message.name];
                this._rng = new Math.seedrandom("", { state: true });
                this.postMessage({
                    "event": "rng-set",
                    "data": this._rng
                });
            }
            // Init mp controller
            this._networkService = new (_bind.apply(_servicesNetworkService2['default'], [null].concat(_toConsumableArray(args))))();
            this._networkService.init(this._rng).then(function () {

                _this._networkService.onmessage = function (message) {
                    _this.postMessage(message);
                };

                _servicesLogger2['default'].debug("Dispatcher: Broadcast Add Player Message");

                _this.postMessage({
                    "event": "add-player",
                    "from": Symbol(),
                    "data": {
                        "name": message.name,
                        "isLocal": true
                    }
                });

                _this.postMessage({
                    "event": "game-state",
                    "data": "lobby"
                });
            });
        }

        /**
         * Register all multiplayer Events
         */
    }, {
        key: 'handleMultiplayerMessages',
        value: function handleMultiplayerMessages(message) {
            if (!this._simulationWorker) {
                this.postMessage(message);
            }
        }

        /**
         * Register all view messages
         */
    }, {
        key: 'handleViewMessages',
        value: function handleViewMessages(message) {
            var _this2 = this;

            _servicesLogger2['default'].debug("Dispatcher recieved message from View:");
            var decodedMessage = message;
            _servicesLogger2['default'].log(decodedMessage);

            if (decodedMessage.event === "game-host") {
                // Initialize simulation loop
                this._simulationWorker = _servicesUtils2['default'].loadWorker("SimulationWorker");
                this._simulationWorker.onmessage = this.handleSimulationMessages.bind(this);

                this._networkService = new _servicesNetworkService2['default'](message.data.name);
                this._networkService.onmessage = this.handleNetworkMessages.bind(this);
                this._networkService.init(message.data.id).then(function (id) {
                    //Logger.banner("network initdd");
                    var playerMessage = new _servicesMessage2['default'](0, "game-host", {
                        "name": message.data.name,
                        "id": id
                    });
                    _this2._simulationWorker.postMessage(playerMessage);
                });
            } else if (decodedMessage.event === "game-join") {
                this._networkService = new _servicesNetworkService2['default'](message.data.name, "host");
                this._networkService.onmessage = this.handleNetworkMessages.bind(this);
                this._networkService.init();
            } else {
                if (this._simulationWorker) {
                    this._simulationWorker.postMessage(message);
                } else {
                    if (this._networkService) {
                        this._networkService.sendMessages([message]);
                    }
                    //this.postMessage(message);
                }
            }
        }

        /**
         * Register SimulationWorker messages
         */
    }, {
        key: 'handleNetworkMessages',
        value: function handleNetworkMessages(messages) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var message = _step.value;

                    _servicesLogger2['default'].debug("Dispatcher recieved message from Network");
                    _servicesLogger2['default'].log(message);

                    // If we are the host proccess the message and let the simulation verify it
                    if (this._simulationWorker) {
                        this._simulationWorker.postMessage(message);
                    } else {
                        // if we are a client then just blindly accept the all mighty message
                        this.postMessage(message);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }

        /**
         * Register SimulationWorker messages
         */
    }, {
        key: 'handleSimulationMessages',
        value: function handleSimulationMessages(e) {
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = e.data[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var message = _step2.value;

                    _servicesLogger2['default'].debug("Dispatcher recieved message from Simulation");
                    _servicesLogger2['default'].log(message);
                    this.postMessage(message);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            if (this._networkService) this._networkService.sendMessages(e.data);
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../mixins/EventEmitter":5,"../services/Logger":15,"../services/Message":16,"../services/NetworkService":18,"../services/Utils":21}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_MAX_LISTENERS = 12;

function error(message) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  console.error.apply(console, [message].concat(args));
  console.trace();
}

var _default = (function () {
  function _default() {
    _classCallCheck(this, _default);

    this._maxListeners = DEFAULT_MAX_LISTENERS;
    this._events = {};
    this._listeners = [];
  }

  _createClass(_default, [{
    key: "on",
    value: function on(types, listener) {
      if (typeof listener != "function") {
        throw new TypeError();
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = types.split(" ")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var type = _step.value;

          var listeners = this._events[type] || (this._events[type] = []);
          if (listeners.indexOf(listener) != -1) {
            return this;
          }
          listeners.push(listener);
          if (listeners.length > this._maxListeners) {
            error("possible memory leak, added %i %s listeners, " + "use EventEmitter#setMaxListeners(number) if you " + "want to increase the limit (%i now)", listeners.length, type, this._maxListeners);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return this;
    }
  }, {
    key: "once",
    value: function once(type, listener) {
      var eventsInstance = this;
      function onceCallback() {
        eventsInstance.off(type, onceCallback);
        listener.apply(null, arguments);
      }
      return this.on(type, onceCallback);
    }
  }, {
    key: "off",
    value: function off(type) {
      for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (args.length == 0) {
        this._events[type] = null;
      }
      var listener = args[0];
      if (typeof listener != "function") {
        throw new TypeError();
      }
      var listeners = this._events[type];
      if (!listeners || !listeners.length) {
        return this;
      }
      var indexOfListener = listeners.indexOf(listener);
      if (indexOfListener == -1) {
        return this;
      }
      listeners.splice(indexOfListener, 1);
      return this;
    }
  }, {
    key: "emit",
    value: function emit(type) {
      for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }

      var listeners = this._events[type];
      if (!listeners || !listeners.length) {
        return false;
      }
      listeners.forEach(function (fn) {
        return fn.apply(null, args);
      });
      return true;
    }
  }, {
    key: "setMaxListeners",
    value: function setMaxListeners(newMaxListeners) {
      if (parseInt(newMaxListeners) !== newMaxListeners) {
        throw new TypeError();
      }
      this._maxListeners = newMaxListeners;
    }
  }, {
    key: "postMessage",
    value: function postMessage(message) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this._listeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var listener = _step2.value;

          listener(message);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: "onmessage",
    set: function set(fn) {
      this._listeners.push(fn);
    }
  }]);

  return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _default = (function () {
    function _default(states) {
        _classCallCheck(this, _default);

        this._states = states;
    }

    /**
     * Set the state if it is legal.
     */

    _createClass(_default, [{
        key: 'state',
        set: function set(state) {
            if (this._states.indexOf(state) >= 0) {
                this._state = state;
            } else {
                throw 'State ' + state + ' is not allowed';
            }
        },

        /**
         * Return the current state
         */
        get: function get() {
            return this._state;
        }

        /**
         * Return the current state
         */
    }, {
        key: 'action',
        set: function set(action) {
            this._action = action;
        },
        get: function get() {
            return this._action;
        }

        /**
         * Return the name of the state message we need to send to modify
         * this model
         */
    }, {
        key: 'stateMessage',
        get: function get() {
            return this._stateMessage;
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../services/Logger":15}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('./BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var STATES = ["main menu", "lobby", "playing"];

var _default = (function (_BaseModel) {
    _inherits(_default, _BaseModel);

    _createClass(_default, [{
        key: "stateMessage",
        get: function get() {
            return "game-state";
        }
    }]);

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), "constructor", this).call(this, STATES);
        this.state = "main menu";
    }

    return _default;
})(_BaseModel3["default"]);

exports["default"] = _default;
module.exports = exports["default"];

},{"./BaseModel":6}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

// Can't call this Object b/c of conflict xD

var _default = (function (_BaseModel) {
    _inherits(_default, _BaseModel);

    /**
     * Creates a UI window
     *
     * @param width   - % Width of the UI Element
     * @param height  - % Height of the UI Element
     * @param offsetX - % X offset
     * @param offsetY - % Y offset
     */

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), "constructor", this).call(this);

        this._currentOptions = ["Select Job", "Ready", "Leave"];
    }

    _createClass(_default, [{
        key: "currentOptions",
        get: function get() {
            return this._currentOptions;
        }
    }]);

    return _default;
})(_BaseModel3["default"]);

exports["default"] = _default;
module.exports = exports["default"];

},{"../BaseModel":6}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _BaseModel = require('../BaseModel');

var _BaseModel2 = _interopRequireDefault(_BaseModel);

// Can't call this Object b/c of conflict xD

var _default = (function () {
    /**
     * Creates a UI window
     *
     * @param width   - % Width of the UI Element
     * @param height  - % Height of the UI Element
     * @param offsetX - % X offset
     * @param offsetY - % Y offset
     */

    function _default() {
        _classCallCheck(this, _default);

        this._currentOptions = ["Host Game", "Join Game"];
    }

    _createClass(_default, [{
        key: "currentOptions",
        get: function get() {
            return this._currentOptions;
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{"../BaseModel":6}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

// Can't call this Object b/c of conflict xD

var _servicesLogger = require('../../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _Config = require('../../../Config');

var _Config2 = _interopRequireDefault(_Config);

var JOBS = new Map();

JOBS.set("clairvoyant", {
    'name': 'clairvoyant',
    'health': 60,
    'mana': 40,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("herbalist", {
    'name': 'herbalist',
    'health': 40,
    'mana': 0,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("villain", {
    'name': 'villain',
    'health': 80,
    'mana': 20,
    'cooldown': 40,
    'position': 'front'
});

JOBS.set("knight", {
    'name': 'knight',
    'health': 100,
    'mana': 0,
    'cooldown': 100,
    'position': 'front'
});

JOBS.set("necromancer", {
    'name': 'necromancer',
    'health': 40,
    'mana': 120,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("ninja", {
    'name': 'ninja',
    'health': 60,
    'mana': 30,
    'cooldown': 30,
    'position': 'front'
});

var STATES = ["idle", "ready", "resting", "walking", "attacking"];

var Player = (function (_BaseModel) {
    _inherits(Player, _BaseModel);

    _createClass(Player, [{
        key: 'stateMessage',
        get: function get() {
            return "player-state";
        }
    }, {
        key: 'job',
        get: function get() {
            return this._job;
        },

        /**
         * Set this players job if it is a valid job
         */
        set: function set(jobName) {
            this._job = JOBS.get(jobName);

            // Check if it was a valid job
            if (!this._job) throw 'Job ' + jobName + ' is not allowed';

            this.maxHealth = this._job.health;
            this.health = this._job.health;

            this.maxMana = this._job.mana;
            this.mana = this._job.mana;

            this.maxCooldown = this._job.cooldown;
            this.cooldown = this._job.cooldown;
        }
    }, {
        key: 'currentAction',
        get: function get() {
            return this._currentAction;
        }
    }, {
        key: 'nextAction',
        get: function get() {
            return this._nextAction;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }, {
        key: 'readyToAttack',
        get: function get() {
            return this._readyToAttack;
        }
    }, {
        key: 'isBusy',
        get: function get() {
            return this._isBusy;
        }
    }, {
        key: 'actionCycle',
        get: function get() {
            return this._actionCycle;
        }
    }], [{
        key: 'getJobs',
        value: function getJobs() {
            return [].concat(_toConsumableArray(JOBS.values()));
        }
    }]);

    function Player(name, id, job) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, STATES);
        this._name = name;
        this._id = id;

        this.state = "idle";

        //this.currentAction = Immutable.Map({
        //"action": "thinking"
        //});
        this._nextAction = undefined;

        // Store the action cycle
        this._actionCycle = 0;

        this._isBusy = false;

        if (job) {
            this.job = job;
        }
    }

    return Player;
})(_BaseModel3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"../../../Config":2,"../../services/Logger":15,"../BaseModel":6}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _servicesLogger = require('../../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var STATES = ["idle", "moving", "battle"];

var Room = (function (_BaseModel) {
    _inherits(Room, _BaseModel);

    _createClass(Room, [{
        key: 'stateMessage',
        get: function get() {
            return "room-state";
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        }
    }], [{
        key: 'TYPES',
        get: function get() {
            return ["cave", "temple"];
        }
    }]);

    function Room(type) {
        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this, STATES);
        this._type = type;
        this.state = "idle";
    }

    return Room;
})(_BaseModel3['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"../../services/Logger":15,"../BaseModel":6}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

// Can't call this Object b/c of conflict xD

var _default = (function (_BaseModel) {
    _inherits(_default, _BaseModel);

    /**
     * Creates a UI window
     *
     * @param width   - % Width of the UI Element
     * @param height  - % Height of the UI Element
     * @param offsetX - % X offset
     * @param offsetY - % Y offset
     */

    function _default(width, height, offsetX, offsetY) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), "constructor", this).call(this);
        this._battleOptions = ["attack", "ability", "item", "defend"];

        this._roomOptions = ["ready", "ability", "item", "manage"];

        this._currentOptions = this._roomOptions;
    }

    _createClass(_default, [{
        key: "setBattleOptions",
        value: function setBattleOptions() {
            this._currentOptions = this._battleOptions;
        }
    }, {
        key: "setIdleOptions",
        value: function setIdleOptions() {
            this._currentOptions = this._roomOptions;
        }
    }, {
        key: "currentOptions",
        get: function get() {
            return this._currentOptions;
        }
    }]);

    return _default;
})(_BaseModel3["default"]);

exports["default"] = _default;
module.exports = exports["default"];

},{"../BaseModel":6}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Message = require("./Message");

var _Message2 = _interopRequireDefault(_Message);

var _Logger = require("./Logger");

var _Logger2 = _interopRequireDefault(_Logger);

var _modelsGame = require("../models/Game");

var _modelsGame2 = _interopRequireDefault(_modelsGame);

var _modelsObjectsPlayer = require("../models/objects/Player");

var _modelsObjectsPlayer2 = _interopRequireDefault(_modelsObjectsPlayer);

var _modelsObjectsMainMenu = require("../models/objects/MainMenu");

var _modelsObjectsMainMenu2 = _interopRequireDefault(_modelsObjectsMainMenu);

var _modelsObjectsLobby = require("../models/objects/Lobby");

var _modelsObjectsLobby2 = _interopRequireDefault(_modelsObjectsLobby);

var _modelsObjectsRoom = require("../models/objects/Room");

var _modelsObjectsRoom2 = _interopRequireDefault(_modelsObjectsRoom);

var _modelsObjectsUi = require("../models/objects/Ui");

var _modelsObjectsUi2 = _interopRequireDefault(_modelsObjectsUi);

var _default = (function () {
    _createClass(_default, [{
        key: "mainMenu",
        get: function get() {
            return this._mainMenu;
        }
    }, {
        key: "lobby",
        get: function get() {
            return this._lobby;
        }
    }, {
        key: "game",
        get: function get() {
            return this._game;
        }
    }, {
        key: "players",
        get: function get() {
            return this._players;
        }
    }]);

    function _default(dispatcher) {
        _classCallCheck(this, _default);

        this._mainMenu = new _modelsObjectsMainMenu2["default"]();
        this._game = new _modelsGame2["default"]();
        this._players = new Map();
    }

    _createClass(_default, [{
        key: "init",
        value: function init(dispatcher) {
            dispatcher.onmessage = this.handleMessage.bind(this);
        }
    }, {
        key: "handleMessage",
        value: function handleMessage(message) {
            _Logger2["default"].debug("Data Store recieved message form Dispatchere");
            var decodedMessage = message;
            var from = decodedMessage.from;
            var event = decodedMessage.event;
            var data = decodedMessage.data;
            _Logger2["default"].log(decodedMessage);

            switch (event) {
                case "game-state":
                    if (data === "lobby") {
                        this._game.state = "lobby";
                        this._lobby = new _modelsObjectsLobby2["default"]();
                    } else if (data === "playing") {
                        this._game.state = "playing";
                        this._ui = new _modelsObjectsUi2["default"]();
                    }
                    break;
                case "player-join-local":
                    if (!this._players.get(data.id)) {
                        this._localPlayer = new _modelsObjectsPlayer2["default"](data.name, data.id, data.job);
                        this._players.set(data.id, this._localPlayer);
                    }
                    break;
                case "player-join-remote":
                    // If the id is 0 this is coming from the host
                    if (!this._players.get(data.id)) {
                        if (data.id === 0) {
                            var playerId = from;
                        } else {
                            var playerId = data.id;
                        }
                        var p = new _modelsObjectsPlayer2["default"](data.name, playerId, data.job);
                        this._players.set(playerId, p);
                    }
                    break;
                case "player-job":
                    var player = this.players.get(data.id);
                    if (player && !(player.job && player.job.name === data.job)) {
                        player.job = data.job;
                    }
                    break;
                case "player-state":
                    var player = this.players.get(data.id);
                    if (player && !(player.state === data.state)) {
                        if (!(this.game.state === "lobby" && data.state === "ready" && !player.job)) player.state = data.state;
                    }
                    break;
                case "player-set":
                    var player = this.players.get(data.id);
                    if (player) {
                        for (var i = 0; i < data.keys.length; i++) {
                            player[data.keys[i]] = data.values[i];
                        }
                    }
                    break;
                case "player-action":
                    var player = this.players.get(data.id);
                    if (player) {
                        player.action = data.action;
                    }
                    break;
                case "room-create":
                    this.room = new _modelsObjectsRoom2["default"](data);
                    break;
                case "room-state":
                    this.room.state = data;
                    break;
                default:
                    break;
            }
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{"../models/Game":7,"../models/objects/Lobby":8,"../models/objects/MainMenu":9,"../models/objects/Player":10,"../models/objects/Room":11,"../models/objects/Ui":12,"./Logger":15,"./Message":16}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    function _default(player, id) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.listener = new window.keypress.Listener();
        this.attachInput(this.listener);
    }

    _createClass(_default, [{
        key: 'attachInput',
        value: function attachInput(listener) {
            var _this = this;

            listener.simple_combo("up", function () {
                return _this.emit("up");
            });
            listener.simple_combo("k", function () {
                return _this.emit("up");
            });

            listener.simple_combo("down", function () {
                return _this.emit("down");
            });
            listener.simple_combo("j", function () {
                return _this.emit("down");
            });

            listener.simple_combo("left", function () {
                return _this.emit("left");
            });
            listener.simple_combo("h", function () {
                return _this.emit("left");
            });

            listener.simple_combo("right", function () {
                return _this.emit("right");
            });
            listener.simple_combo("l", function () {
                return _this.emit("right");
            });

            listener.simple_combo("enter", function () {
                return _this.emit("confirm");
            });

            listener.simple_combo("`", function () {
                return _this.emit("debug");
            });
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../mixins/EventEmitter":5}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);
    }

    _createClass(_default, null, [{
        key: 'banner',
        value: function banner(msg) {
            console.log('%c' + msg.toUpperCase(), 'font-size: 30px; background: #222; color: #bada55;');
        }
    }, {
        key: 'debug',
        value: function debug(msg) {
            console.trace('%c' + msg, 'font-size: 15px; background: #222; color: #bada55;');
        }
    }, {
        key: 'network',
        value: function network(msg) {
            console.trace('%c' + msg, 'font-size: 15px; background: #FDF485; color: #000;');
        }
    }, {
        key: 'err',
        value: function err(msg) {
            console.trace('%c' + msg, 'font-size: 15px; background: #FDF485; color: #F00;');
        }
    }, {
        key: 'log',
        value: function log(msg) {
            console.trace(msg);
        }
    }, {
        key: 'error',
        value: function error(msg) {
            console.error(msg);
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (from, event, data) {
    return {
        from: from,
        event: event,
        data: data
    };
};

;
module.exports = exports["default"];

},{}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    function _default() {
        var _this = this;

        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        document.getElementById("up").addEventListener("click", function () {
            _this.emit("up");
        });
        document.getElementById("down").addEventListener("click", function () {
            _this.emit("down");
        });
        document.getElementById("left").addEventListener("click", function () {
            _this.emit("left");
        });
        document.getElementById("right").addEventListener("click", function () {
            _this.emit("right");
        });
        document.getElementById("confirm").addEventListener("click", function () {
            _this.emit("confirm");
        });
    }

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../mixins/EventEmitter":5}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Message = require('./Message');

var _Message2 = _interopRequireDefault(_Message);

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    function _default(name, host) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._name = name;
        if (host) this._host = host;else this._id = "host";

        this._peers = new Map();
    }

    _createClass(_default, [{
        key: 'init',

        /**
         * Initialize this Controller
         *
         * @return Promise
         *
         */
        value: function init(id) {
            var _this = this;

            if (id) this._id = id;
            // Initialize the peer connection
            this._peer = new Peer(this._id, {
                key: _Config2['default'].API_KEY,
                debug: 3
            });

            return new Promise(function (res, rej) {
                _this._peer.on('open', function (id) {
                    _Logger2['default'].network('Peer Connection created, Peer ID is ' + id);
                    _this._id = id;

                    // If we know about a peer then connect
                    if (_this._host) _this.addPeer(_this._peer.connect(_this._host, {
                        "reliable": true
                    }));

                    // When a peer connects handle it
                    _this._peer.on('connection', function (connection) {
                        // Don't allow more than 4 players
                        if (_this._peers.size >= 4) {
                            connection.close();
                        }

                        connection.on('open', function () {
                            _Logger2['default'].network("Peer has connected");
                            _Logger2['default'].log(connection);
                            var peer = _this.addPeer(connection);
                            peer.connection.send(1);
                        });
                    });

                    res(_this._id);
                });
            });
        }
    }, {
        key: 'addPeer',
        value: function addPeer(connection) {
            var _this2 = this;

            var peer = {
                "connection": connection
            };
            this._peers.set(connection.peer, peer);

            connection.on('data', function (data) {
                _this2.handleMessages(data);
            });

            connection.on('close', function () {
                _this2.removePeer(peer);
            });

            return peer;
        }
    }, {
        key: 'removePeer',
        value: function removePeer(peer) {
            this._peers['delete'](peer.connection.peer);
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this._peer.destroy();
        }

        /**
         * Send message to all peers
         */
    }, {
        key: 'sendMessages',
        value: function sendMessages(messages) {
            if (this._peers) {
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this._peers.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var peer = _step.value;

                        // If this message has a to, make sure this peers needs the message
                        var messagesToSend = [];
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = undefined;

                        try {
                            for (var _iterator2 = messages[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var message = _step2.value;

                                message.from = this._id;
                                if (!message.to || messsage.to === peer.connection.peer) messagesToSend.push(message);
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                                    _iterator2['return']();
                                }
                            } finally {
                                if (_didIteratorError2) {
                                    throw _iteratorError2;
                                }
                            }
                        }

                        _Logger2['default'].network("Send messages to peers");
                        _Logger2['default'].log(messagesToSend);
                        peer.connection.send(messagesToSend);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }

        /**
         * Handle incoming message
         */
    }, {
        key: 'handleMessages',
        value: function handleMessages(messages) {
            _Logger2['default'].network('Network Service recieved message from peer with id ' + messages.from);
            _Logger2['default'].log(messages);

            if (messages === 1) {
                var m = new _Message2['default'](0, "player-join-remote", { "name": this._name, "id": this._id });
                this.postMessage([new _Message2['default'](0, "game-state", "lobby"), new _Message2['default'](0, "player-join-local", { "name": this._name, "id": this._id })]);
                this.sendMessages([m]);
            } else {
                this.postMessage(messages);
                //for(let message of messages) {
                //this.postMessage(message);
                //}
            }
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../mixins/EventEmitter":5,"./Logger":15,"./Message":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _LoggerJs = require('./Logger.js');

var _LoggerJs2 = _interopRequireDefault(_LoggerJs);

var resourceDir = './dist/resources/';

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);
    }

    _createClass(_default, null, [{
        key: 'loadImage',

        /**
         * Loads the resource by filename
         * @return Promise
         */
        value: function loadImage(resource) {
            return new Promise(function (res, rej) {
                var img = document.createElement('img');
                img.onload = function () {
                    _LoggerJs2['default'].log('resource loaded: ' + resource);
                    res(img);
                };
                img.src = resourceDir + 'images/' + resource;
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"./Logger.js":15}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);

        this._soundPath = "./dist/resources/sounds/";
    }

    _createClass(_default, [{
        key: "loadResources",
        value: function loadResources() {
            var _this = this;

            if (_Config2["default"].DISABLE_AUDIO) {
                return;
            }
            var promises = [];

            var sounds = [{
                "name": "menu-move",
                "url": this._soundPath + "menu-move.mp3"
            }, {
                "name": "menu-select",
                "url": this._soundPath + "menu-select.mp3"
            }, {
                "name": "cooldown-ready",
                "url": this._soundPath + "cooldown-ready.mp3"
            }, {
                "name": "combat-theme",
                "url": this._soundPath + "qrtrnoteqombat.gb.mp3"
            }, {
                "name": "dungeon-theme",
                "url": this._soundPath + "dungeondelay.gb.mp3"
            }];

            this._sounds = new Map();

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function () {
                    var sound = _step.value;

                    promises.push(new Promise(function (res, rej) {
                        // Load the sound
                        _this._sounds.set(sound.name, new Howl({
                            urls: [sound.url],
                            onload: res,
                            onloaderror: rej
                        }));
                    }));
                };

                for (var _iterator = sounds[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator["return"]) {
                        _iterator["return"]();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return Promise.all(promises);
        }
    }, {
        key: "play",
        value: function play(soundName, loop, volume) {
            if (_Config2["default"].DISABLE_AUDIO) return;
            var sound = this._sounds.get(soundName);
            sound.loop(loop || false);
            sound.volume(volume || .5);
            sound.play();
        }
    }, {
        key: "stop",
        value: function stop(soundName) {
            if (_Config2["default"].DISABLE_AUDIO) return;
            var sound = this._sounds.get(soundName);
            sound.stop();
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{"../../Config":2}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);
    }

    _createClass(_default, [{
        key: 'randomString',

        // Goodenough UUID?
        // http://stackoverflow.com/questions/10726909/random-alpha-numeric-string-in-javascript
        value: function randomString(length, chars) {
            if (!chars) {
                chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }
            var result = '';
            for (var i = length; i > 0; --i) {
                result += chars[Math.round(Math.random() * (chars.length - 1))];
            }return result;
        }
    }], [{
        key: 'loadWorker',
        value: function loadWorker(worker) {
            return new Worker('./dist/workers/' + worker + '.js');
        }
    }, {
        key: 'limitloop',
        value: function limitloop(fn, fps) {
            // Use var then = Date.now(); if you
            // don't care about targetting < IE9
            var then = new Date().getTime();

            // custom fps, otherwise fallback to 60
            fps = fps || 60;
            var interval = 1000 / fps;

            return (function loop(time) {
                requestAnimationFrame(loop);

                // again, Date.now() if it's available
                var now = new Date().getTime();
                var delta = now - then;

                if (delta > interval) {
                    // Update time
                    // now - (delta % interval) is an improvement over just
                    // using then = now, which can end up lowering overall fps
                    then = now - delta % interval;

                    // call the fn
                    fn();
                }
            })(0);
        }
    }, {
        key: 'aspectHeightCalc',
        value: function aspectHeightCalc(w2) {
            var w1 = 1920;
            var h1 = 1080;
            return h1 * w2 / w1;
        }
    }, {
        key: 'parseQuery',
        value: function parseQuery(search) {
            var args = search.substring(1).split('&');

            var argsParsed = {};

            var i, arg, kvp, key, value;

            for (i = 0; i < args.length; i++) {

                arg = args[i];

                if (-1 === arg.indexOf('=')) {

                    argsParsed[decodeURIComponent(arg).trim()] = true;
                } else {

                    kvp = arg.split('=');

                    key = decodeURIComponent(kvp[0]).trim();

                    value = decodeURIComponent(kvp[1]).trim();

                    argsParsed[key] = value;
                }
            }

            return argsParsed;
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

// Import Services

var _servicesKeyboardInputService = require('../services/KeyboardInputService');

var _servicesKeyboardInputService2 = _interopRequireDefault(_servicesKeyboardInputService);

var _servicesMobileInputService = require('../services/MobileInputService');

var _servicesMobileInputService2 = _interopRequireDefault(_servicesMobileInputService);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _servicesLogger3 = _interopRequireDefault(_servicesLogger);

var _servicesSoundService = require('../services/SoundService');

var _servicesSoundService2 = _interopRequireDefault(_servicesSoundService);

// Import views

var _PlayerView = require('./PlayerView');

var _PlayerView2 = _interopRequireDefault(_PlayerView);

var _EnemyView = require('./EnemyView');

var _EnemyView2 = _interopRequireDefault(_EnemyView);

var _RoomView = require('./RoomView');

var _RoomView2 = _interopRequireDefault(_RoomView);

var _MainMenuView = require('./MainMenuView');

var _MainMenuView2 = _interopRequireDefault(_MainMenuView);

var _LobbyView = require('./LobbyView');

var _LobbyView2 = _interopRequireDefault(_LobbyView);

var _UiView = require('./UiView');

var _UiView2 = _interopRequireDefault(_UiView);

var _DebugView = require('./DebugView');

var _DebugView2 = _interopRequireDefault(_DebugView);

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    function _default(dispatcher) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);

        this._element = document.body;
        this._canvas = document.createElement('canvas');

        this._canvas.width = _Config2['default'].CANVAS_WIDTH;
        this._canvas.height = _Config2['default'].CANVAS_HEIGHT;

        this._views = new Set();
    }

    /**
     * Resize Handler
     * @todo: does this belong here?
     */

    _createClass(_default, [{
        key: 'resize',
        value: function resize() {
            _Config2['default'].calculate();
            this._canvas.width = _Config2['default'].CANVAS_WIDTH;
            this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
            this._ctx.imageSmoothingEnabled = false;
        }
    }, {
        key: 'init',
        value: function init(dispatcher, dataStore) {
            dispatcher.onmessage = this.handleMessage.bind(this);
            this._dataStore = dataStore;

            //this._debugView = new DebugView(game);

            this._inputService = new _servicesKeyboardInputService2['default']();
            this._mobileInputService = new _servicesMobileInputService2['default']();
            this.registerInputHandlers(this._inputService);
            this.registerInputHandlers(this._mobileInputService);

            this._element.appendChild(this._canvas);
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;

            // Attach resize event
            //window.resize = this.resize.bind(this);
            window.addEventListener("resize", this.resize.bind(this));

            this._mainMenuView = new _MainMenuView2['default'](dataStore.mainMenu, this);

            this._views.add(this._mainMenuView);

            // Start render loop
            this.startRender();
        }

        /**
         * Handle messages from Dispatcher
         */
    }, {
        key: 'handleMessage',
        value: function handleMessage(message) {
            var _this = this;

            _servicesLogger2['default'].debug("View recieved message from Dispatcher");
            var decodedMessage = message;
            _servicesLogger2['default'].log(decodedMessage);
            var from = decodedMessage.from;
            var event = decodedMessage.event;
            var data = decodedMessage.data;

            switch (event) {
                case "game-state":
                    if (data === "lobby") {
                        this._lobbyView = new _LobbyView2['default'](dataStore.lobby, this);
                        this._views = new Set([this._lobbyView]);
                    } else if (data === "playing") {
                        var resourcePromises = [];
                        resourcePromises.push(this._roomView.loadResources());

                        this._playerViews = new Map();
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = this._dataStore.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var player = _step.value;

                                var playerView = new _PlayerView2['default'](player);
                                this._playerViews.set(player.id, playerView);
                                resourcePromises.push(playerView.loadResources());
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator['return']) {
                                    _iterator['return']();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }

                        this._uiView = new _UiView2['default'](this._dataStore._ui, this);
                        resourcePromises.push(this._uiView.loadResources());

                        this._soundService = new _servicesSoundService2['default']();
                        resourcePromises.push(this._soundService.loadResources());

                        Promise.all(resourcePromises).then(function () {
                            _this._views = new Set([_this._roomView].concat(_toConsumableArray(_this._playerViews.values()), [_this._uiView]));
                            _this._soundService.play("dungeon-theme", true);
                        });
                    }
                    break;
                case "room-create":
                    {
                        this._roomView = new _RoomView2['default'](this._dataStore.room);
                    }
            }
        }

        // http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/
    }, {
        key: 'loop',
        value: function loop() {
            requestAnimationFrame(this.loop.bind(this));

            var now = Date.now();
            var delta = now - this.then;

            // If the fps interval is correct
            if (delta > this.interval) {
                // Calculate time since last frame
                this.then = now - delta % this.interval;

                // Set up Rendering
                this._frame = this._frame || 1;
                this._frame = this._frame % _Config2['default'].FPS ? this._frame : 1;

                // Render game
                this.render(this._frame);

                // Calculate next render cycle
                var time_el = (this.then - this.first) / 1000;
                ++this.counter;
                this._fps = parseInt(this.counter / time_el);

                // Increment Frame
                this._frame++;
            }
        }
    }, {
        key: 'render',
        value: function render(frame) {
            this._canvas.width = _Config2['default'].CANVAS_WIDTH;
            this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
            this._ctx.imageSmoothingEnabled = false;

            this._ctx.fillStyle = "#000";
            this._ctx.fillRect(0, 0, _Config2['default'].CANVAS_WIDTH, _Config2['default'].CANVAS_HEIGHT);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._views[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var view = _step2.value;

                    view.render(this._ctx, frame);
                }

                //this._debugView.render(this._ctx, frame, this._fps);
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }

        /**
         * Kick off the render loop
         */
    }, {
        key: 'startRender',
        value: function startRender() {
            this.then = Date.now();
            this.interval = 1000 / _Config2['default'].FPS;
            this.first = this.then;
            this.counter = 0;
            this._rendering = true;
            window.requestAnimationFrame(this.loop.bind(this));
        }

        /**
         * Register input to alter view and see if we need to send envents
         */
    }, {
        key: 'registerInputHandlers',
        value: function registerInputHandlers(input) {
            var _this2 = this;

            // Up input
            input.on("up", function () {
                var gameState = _this2._dataStore.game.state;
                switch (gameState) {
                    case "main menu":
                        _this2._mainMenuView.up();
                        break;
                    case "playing":
                        _this2._uiView.up();
                        _this2._soundService.play("menu-move");
                        break;
                }
            });

            // Down Input
            input.on("down", function () {
                var gameState = _this2._dataStore.game.state;
                switch (gameState) {
                    case "main menu":
                        _this2._mainMenuView.down();
                        break;
                    case "playing":
                        _this2._uiView.down();
                        _this2._soundService.play("menu-move");
                        break;
                }
            });

            // Left Input
            input.on("left", function () {
                var gameState = _this2._dataStore.game.state;
                switch (gameState) {
                    case "lobby":
                        _this2._lobbyView.left();
                        break;
                    case "playing":
                        _this2._uiView.left();
                        _this2._soundService.play("menu-move");
                        break;
                }
            });

            // Right Input
            input.on("right", function () {
                var gameState = _this2._dataStore.game.state;
                switch (gameState) {
                    case "lobby":
                        _this2._lobbyView.right();
                        break;
                    case "playing":
                        _this2._uiView.right();
                        _this2._soundService.play("menu-move");
                        break;
                }
            });

            // Confirm Input
            input.on("confirm", function () {
                var gameState = _this2._dataStore.game.state;
                switch (gameState) {
                    case "main menu":
                        _this2._mainMenuView.confirm(_this2);
                        break;
                    case "lobby":
                        _this2._lobbyView.confirm();
                        break;
                    case "playing":
                        _this2._uiView.confirm();
                        _this2._soundService.play("menu-select");
                        break;
                }
            });

            // Back Input
            input.on("back", function () {});

            input.on("debug", function () {
                _this2._debugView.toggle();
            });
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../mixins/EventEmitter":5,"../services/KeyboardInputService":14,"../services/Logger":15,"../services/MobileInputService":17,"../services/SoundService":20,"./DebugView":23,"./EnemyView":24,"./LobbyView":25,"./MainMenuView":26,"./PlayerView":28,"./RoomView":29,"./UiView":30}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function () {
    function _default(game) {
        _classCallCheck(this, _default);

        this.game = game;
        this._show = true;
    }

    _createClass(_default, [{
        key: "toggle",
        value: function toggle() {
            this._show = !this._show;
        }
    }, {
        key: "render",
        value: function render(ctx, frame, fps) {
            if (this._show) {
                // Show FPS
                var fontSize = 5 * _Config2["default"].SPRITE_SCALE;
                ctx.font = fontSize + "px Courier New";
                ctx.fillStyle = "#ffffff";

                var line = 20;

                ctx.fillText(frame + "/" + _Config2["default"].FPS + " " + fps + "fps", 20, line);

                line += fontSize;

                ctx.fillText("Players:", 20, line);

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = game.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var player = _step.value;

                        line += fontSize;
                        ctx.fillText(player.name, 40, line);
                        line += fontSize;
                        ctx.fillText("Action Cycle: " + player.actionCycle, 60, line);
                        line += fontSize;
                        ctx.fillText("Current Action: " + player.currentAction.get("action"), 60, line);
                        line += fontSize;
                        ctx.fillText("Next Action: " + (player.nextAction ? player.nextAction.get("action") : "NONE"), 60, line);
                        line += fontSize;
                        ctx.fillText("Current State: " + player.currentState, 60, line);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator["return"]) {
                            _iterator["return"]();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{"../../Config":2}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ObjectView2 = require('./ObjectView');

var _ObjectView3 = _interopRequireDefault(_ObjectView2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(enemy) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._enemy = enemy;

        this._images = [{
            "name": "sprite",
            "image": 'wurm-sheet.png'
        }];
    }

    _createClass(_default, [{
        key: 'render',
        value: function render(ctx, frame) {
            this.frame = frame < _Config2['default'].FPS / 2 ? 0 : 1;
            var sprite = this._resources.get('sprite');

            ctx.drawImage.apply(ctx, [sprite, sprite.width / 3 * this.frame, 0, this._resources.get('sprite').width / 3, // dWidth
            this._resources.get('sprite').height / 2, // dHeight
            20, 10, // Ypos
            this._resources.get('sprite').width / 3 * _Config2['default'].SPRITE_SCALE, // sWidth
            this._resources.get('sprite').height / 2 * _Config2['default'].SPRITE_SCALE // sHeight
            ]);
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":21,"./ObjectView":27}],25:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ObjectView2 = require('./ObjectView');

var _ObjectView3 = _interopRequireDefault(_ObjectView2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _servicesMessage = require('../services/Message');

var _servicesMessage2 = _interopRequireDefault(_servicesMessage);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesResourceService = require('../services/ResourceService');

var _servicesResourceService2 = _interopRequireDefault(_servicesResourceService);

var _modelsObjectsPlayer = require('../models/objects/Player');

var _modelsObjectsPlayer2 = _interopRequireDefault(_modelsObjectsPlayer);

var jobDialog = '\n    <div class="dialog">\n        <h3>Select Job</h3>\n        <label>Job: </label>\n        <select name="job">\n        </select><br>\n        <button name="confirm">Confirm</button>\n        <button name="cancel">Cancel</button>\n    </div>\n';

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(lobby, view) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, lobby);
        this._lobby = lobby;
        this._view = view;
        this._selectedOptionIndex = 0;
        this._ready = false;
        this._dialogOpen = false;
    }

    _createClass(_default, [{
        key: 'openJobDialog',
        value: function openJobDialog(view) {
            var _this = this;

            var parser = new DOMParser();
            var doc = parser.parseFromString(jobDialog, "text/html");
            var element = doc.firstChild;

            var confirmButton = element.querySelector('button[name="confirm"]');
            var cancelButton = element.querySelector('button[name="cancel"]');

            var jobSelect = element.querySelector('select[name="job"]');

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = _modelsObjectsPlayer2['default'].getJobs()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var job = _step.value;

                    var jobOption = document.createElement('option');
                    jobOption.value = job.name;
                    jobOption.innerHTML = job.name;
                    jobSelect.appendChild(jobOption);
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            view._element.appendChild(element);

            cancelButton.addEventListener("click", function () {
                _this._dialog.remove();
                _this._dialog = false;
            });

            confirmButton.addEventListener("click", function () {
                _this._dialog.confirm();
            });

            this._dialog = {
                element: element,
                remove: function remove() {
                    element.remove();
                    _this._dialog = undefined;
                },
                confirm: function confirm() {
                    if (jobSelect.value) {
                        view.postMessage(new _servicesMessage2['default'](0, "player-job", {
                            "job": jobSelect.value,
                            "id": view._dataStore._localPlayer.id
                        }));
                        _this._dialog.remove();
                    }
                }
            };
        }
    }, {
        key: 'render',
        value: function render(ctx, frame) {
            ctx.fillStyle = "#ffffff";
            ctx.strokeStyle = "#ffffff";

            var xPos = 100;
            var yPos = 100;

            ctx.fillText("NAME:", 100, yPos);
            ctx.fillText("JOB:", 300, yPos);
            ctx.fillText("READY:", 500, yPos);
            ctx.strokeRect(90, 110, 600, 180);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._view._dataStore.players.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var player = _step2.value;

                    ctx.fillStyle = "#ffffff";
                    yPos += 40;
                    ctx.fillText(player.name, 100, yPos);

                    if (player.job) {
                        var jobName = player.job.name[0].toUpperCase() + player.job.name.slice(1);;
                        ctx.fillText(jobName, 300, yPos);
                    }

                    if (player.state == "ready") {
                        ctx.fillStyle = "#00ff00";
                        ctx.fillText("READY", 500, yPos);
                    } else {
                        ctx.fillStyle = "#ff0000";
                        ctx.fillText("NOT READY", 500, yPos);
                    }
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }

            ctx.fillStyle = "#ffffff";
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this._lobby.currentOptions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var menuOption = _step3.value;

                    var menuOptionText = menuOption;

                    // Show select cursor
                    if (menuOptionText == this._lobby.currentOptions[this._selectedOptionIndex]) menuOptionText = "> " + menuOptionText;

                    // Draw Menu Option
                    ctx.fillText(menuOptionText, xPos, 320);
                    xPos += 200;
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                        _iterator3['return']();
                    }
                } finally {
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
    }, {
        key: 'left',
        value: function left() {
            if (this._selectedOptionIndex == 0) this._selectedOptionIndex = 2;else this._selectedOptionIndex--;
        }
    }, {
        key: 'right',
        value: function right() {
            if (this._selectedOptionIndex == 2) this._selectedOptionIndex = 0;else this._selectedOptionIndex++;
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            if (!this._dialog) {
                if (this.selectedOption == "Select Job") {
                    this.openJobDialog(this._view);
                } else if (this.selectedOption == "Leave") {
                    this._view.postMessage({
                        "event": "leave-game"
                    });
                } else if (this.selectedOption == "Ready" && this._view._dataStore._localPlayer.job) {
                    var state = this._view._dataStore._localPlayer.state === "idle" ? "ready" : "idle";
                    this._view.postMessage(new _servicesMessage2['default'](0, "player-state", {
                        "state": state,
                        "id": this._view._dataStore._localPlayer.id
                    }));
                }
            } else {
                this._dialog.confirm();
            }
        }
    }, {
        key: 'back',
        value: function back() {}
    }, {
        key: 'selectedOption',
        get: function get() {
            return this._lobby.currentOptions[this._selectedOptionIndex];
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../models/objects/Player":10,"../services/Message":16,"../services/ResourceService":19,"../services/Utils":21,"./ObjectView":27}],26:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ObjectView2 = require('./ObjectView');

var _ObjectView3 = _interopRequireDefault(_ObjectView2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _servicesMessage = require('../services/Message');

var _servicesMessage2 = _interopRequireDefault(_servicesMessage);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesResourceService = require('../services/ResourceService');

var _servicesResourceService2 = _interopRequireDefault(_servicesResourceService);

var hostDialog = '\n    <div class="dialog">\n        <h3>Host Multiplayer Game</h3>\n        <label>Name: </label>\n        <input type="text" name="name">\n        <label>Id (optional):</label>\n        <input type="text" name="id"><br>\n        <button name="host" disabled>Host</button>\n        <button name="cancel">Cancel</button>\n    </div>\n';

var joinDialog = '\n    <div class="dialog">\n        <h3>Join Multiplayer Game</h3>\n        <label>Name: </label>\n        <input type="text" name="name">\n        <label>Host Id: </label>\n        <input type="text" name="host">\n        <label>Id (optional):</label>\n        <input type="text" name="id"><br>\n        <button name="join" disabled>Join</button>\n        <button name="cancel">Cancel</button>\n    </div>\n';

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(mainMenu, view) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, mainMenu);
        this._mainMenu = mainMenu;
        this._view = view;
        this._selectedOptionIndex = 0;
        this._dialogOpen = false;
    }

    _createClass(_default, [{
        key: 'render',
        value: function render(ctx, frame) {
            ctx.fillStyle = "#ffffff";

            var xPos = 100;
            var yPos = 100;

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._mainMenu.currentOptions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var menuOption = _step.value;

                    var menuOptionText = menuOption;

                    // Show select cursor
                    if (menuOptionText == this._mainMenu.currentOptions[this._selectedOptionIndex]) menuOptionText = "> " + menuOptionText;

                    // Draw Menu Option
                    ctx.fillText(menuOptionText, 100, yPos);
                    yPos += 100;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    }, {
        key: 'openHostDialog',
        value: function openHostDialog(view) {
            var _this = this;

            var parser = new DOMParser();
            var doc = parser.parseFromString(hostDialog, "text/html");
            var element = doc.firstChild;

            var hostButton = element.querySelector('button[name="host"]');
            var cancelButton = element.querySelector('button[name="cancel"]');

            var nameInput = element.querySelector('input[name="name"]');
            var idInput = element.querySelector('input[name="id"]');

            view._element.appendChild(element);

            nameInput.oninput = function () {
                if (nameInput.value.trim() !== "") {
                    hostButton.removeAttribute("disabled");
                } else {
                    hostButton.setAttribute("disabled", true);
                }
            };

            cancelButton.addEventListener("click", function () {
                _this._dialog.remove();
                _this._dialog = false;
            });

            hostButton.addEventListener("click", function () {
                _this._dialog.confirm();
            });

            this._dialog = {
                element: element,
                remove: function remove() {
                    this.element.remove();
                },
                confirm: function confirm() {
                    if (nameInput.value.trim()) {
                        var message = new _servicesMessage2['default'](0, "game-host", {
                            "name": nameInput.value.trim(),
                            "id": _this._id
                        });
                        _this._view.postMessage(message);
                        _this._dialog.remove();
                    }
                }
            };
        }
    }, {
        key: 'openJoinDialog',
        value: function openJoinDialog(view) {
            var _this2 = this;

            var parser = new DOMParser();
            var doc = parser.parseFromString(joinDialog, "text/html");
            var element = doc.firstChild;

            var joinButton = element.querySelector('button[name="join"]');
            var cancelButton = element.querySelector('button[name="cancel"]');

            var nameInput = element.querySelector('input[name="name"]');
            var hostInput = element.querySelector('input[name="host"]');
            var idInput = element.querySelector('input[name="id"]');

            view._element.appendChild(element);

            var checkInput = function checkInput() {
                if (nameInput.value.trim() && hostInput.value.trim()) {
                    joinButton.removeAttribute("disabled");
                } else {
                    joinButton.setAttribute("disabled", true);
                }
            };
            nameInput.oninput = checkInput.bind(this);
            hostInput.oninput = checkInput.bind(this);

            cancelButton.addEventListener("click", function () {
                _this2._dialog.remove();
                _this2._dialog = false;
            });

            joinButton.addEventListener("click", function () {
                _this2._dialog.confirm();
            });

            this._dialog = {
                element: element,
                remove: function remove() {
                    this.element.remove();
                },
                confirm: function confirm() {
                    if (nameInput.value.trim() && hostInput.value.trim()) {
                        view.postMessage(new _servicesMessage2['default'](0, "game-join", {
                            name: nameInput.value,
                            hostId: hostInput.value
                        }));
                        this.remove();
                    }
                }
            };
        }
    }, {
        key: 'up',
        value: function up() {
            if (!this._dialog) this._selectedOptionIndex = this._selectedOptionIndex ? 0 : 1;
        }
    }, {
        key: 'down',
        value: function down() {
            this.up();
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            if (!this._dialog) {
                if (this.selectedOption == "Host Game") {
                    this.openHostDialog(this._view);
                } else {
                    this.openJoinDialog(this._view);
                }
            } else {
                this._dialog.confirm();
            }
        }
    }, {
        key: 'back',
        value: function back() {
            this.closeDialog();
        }
    }, {
        key: 'selectedOption',
        get: function get() {
            return this._mainMenu.currentOptions[this._selectedOptionIndex];
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Logger":15,"../services/Message":16,"../services/ResourceService":19,"../services/Utils":21,"./ObjectView":27}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _default = (function () {
    function _default(object) {
        _classCallCheck(this, _default);

        this._object = object;
    }

    /**
     * Loads the resource by filename
     * @return Promise
     */

    _createClass(_default, [{
        key: 'loadResource',
        value: function loadResource(name, resource) {
            var _this = this;

            return new Promise(function (res, rej) {
                var img = document.createElement('img');
                img.onload = function () {
                    console.log('resource loaded: ' + resource);
                    res(this);
                };
                img.src = './dist/resources/images/' + resource;

                // If this is the first resource create it
                if (!_this._resources) {
                    _this._resources = new Map();
                }
                _this._resources.set(name, img);
            });
        }
    }, {
        key: 'loadResources',
        value: function loadResources() {
            var promises = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var image = _step.value;

                    promises.push(this.loadResource(image.name, image.image));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return Promise.all(promises);
        }

        /**
         * Initialize all resources associated with this object
         */
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            return new Promise(function (res, rej) {
                res();
                var resourcePromises = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this2._images[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var image = _step2.value;

                        ResourceService.loadImage(image.name, image.image);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                Promise.all(resourcePromises).then(function (images) {
                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = images[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var image = _step3.value;

                            if (!_this2._resources) _this2._resources = new Map();

                            _this2._resources.set(image.name, image.image);
                        }

                        // Resolve Promise
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                                _iterator3['return']();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }

                    res();
                });
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{}],28:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ObjectView2 = require('./ObjectView');

var _ObjectView3 = _interopRequireDefault(_ObjectView2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesResourceService = require('../services/ResourceService');

var _servicesResourceService2 = _interopRequireDefault(_servicesResourceService);

var JOB_SPRITES = {
    "clairvoyant": "clairvoyant-sheet.png",
    "herbalist": "herbalist-sheet.png",
    "villain": "villain2-sheet.png",
    "knight": "knight-sheet.png",
    "necromancer": "necromancer-sheet.png",
    "ninja": "ninja-sheet.png"
};

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(player) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, player);
        this._player = player;

        this._images = [{
            "name": "sprite",
            "image": JOB_SPRITES[player.job.name]
        }, {
            "name": "shadow",
            "image": "shadow.png"
        }, {
            "name": "bubble",
            "image": "bubble.png"
        }];
    }

    _createClass(_default, [{
        key: 'loadResources',
        value: function loadResources() {
            var promises = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var image = _step.value;

                    promises.push(this.loadResource(image.name, image.image));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return Promise.all(promises);
        }
    }, {
        key: 'render',
        value: function render(ctx, frame) {
            this.frame = frame < _Config2['default'].FPS / 2 ? 0 : 1;

            var playerWidth = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE;

            var xOffset = this._player.xPos * _Config2['default'].TILE_SIZE;
            var yOffset = this._player.yPos * _Config2['default'].TILE_SIZE;

            var shadow = this._resources.get('shadow');

            var bubble = this._resources.get('bubble');
            var bubbleWidth = bubble.width * _Config2['default'].SPRITE_SCALE;
            var bubbleHeight = bubble.height / 5 * _Config2['default'].SPRITE_SCALE;

            // Draw Shadow
            ctx.drawImage.apply(ctx, [shadow, 0, 0, // DY
            shadow.width, // dWidth
            shadow.width, // dHeight
            xOffset, // sx ~ Replace with player X Pos
            yOffset + playerWidth - _Config2['default'].SPRITE_SCALE * this._resources.get('shadow').height / 1.75, // sy ~ Replace with player Y Pos
            playerWidth, // sWidth
            playerWidth // sHeight
            ]);

            var animationFrame = 0;

            if (this._player.state === "walking") {
                animationFrame = _Config2['default'].SPRITE_SIZE * this.frame;
            } else if (this._player.currentState === "attacking") {
                animationFrame = _Config2['default'].SPRITE_SIZE * 2;
            }

            // Draw Player Sprite
            ctx.drawImage.apply(ctx, [this._resources.get('sprite'), animationFrame, 0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            xOffset, //xOffset, // sx ~ Replace with object X Pos
            yOffset, //yOffset, // sy ~ Replace with object Y Pos
            playerWidth, // sWidth
            playerWidth // sHeight
            ]);

            // Draw Bubble
            var bubbleOffset = 0;

            switch (this._player.action) {
                case "thinking":
                    bubbleOffset = 0;
                    break;
                case "attack":
                    bubbleOffset = bubble.height / 5;
                    break;
                case "defend":
                    bubbleOffset = bubble.height / 5 * 2;
                    break;
                case "item":
                    bubbleOffset = bubble.height / 5 * 3;
                    break;
                case "ability":
                    bubbleOffset = bubble.height / 5 * 4;
                    break;
            }

            if (this._player.action !== "walk" && this._player.action !== "ready" && this._player.state !== "walking" && this._player.state !== "attacking") {
                ctx.drawImage.apply(ctx, [this._resources.get('bubble'), 0, bubbleOffset, // DY
                bubble.width, // dWidth
                bubble.height / 5, // dHeight
                xOffset - bubbleWidth / 1.5, // sx ~ Replace with object X Pos
                yOffset - bubbleHeight / 1.5, // sy ~ Replace with object Y Pos
                bubbleWidth, // sWidth
                bubbleHeight // sHeight
                ]);
            }
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/ResourceService":19,"../services/Utils":21,"./ObjectView":27}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ObjectView2 = require('./ObjectView');

var _ObjectView3 = _interopRequireDefault(_ObjectView2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

// Static Room Types
//static get TYPE_CAVE() {
//return {
//floor: 'goodtile.png',
//wall: 'shitwall.png'
//};
//}

//static get TYPE_TEMPLE() {
//return {
//floor: 'grass.png',
//wall: 'pillars.png'
//};
//}

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(room) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._room = room;
        this._floorOffset = 0;
        this._wallOffset = 0;

        this._images = [{
            "name": "floor",
            "image": "goodtile.png"
        }, {
            "name": "wall",
            "image": "shitwall2.png"
        }];
    }

    _createClass(_default, [{
        key: 'loadResources',
        value: function loadResources() {
            return Promise.all([this.loadResource("floor", "goodtile.png"), this.loadResource("wall", "shitwall2.png")]);
        }
    }, {
        key: 'render',
        value: function render(ctx, frame) {
            if (frame % 4 == 0) {
                this.frame = this.frame ? 0 : 1;
            }

            // Render Floor
            var floor = this._resources.get('floor');
            var floorWidth = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE;
            for (var x = 0; x < _Config2['default'].TILE_X + 1; x++) {
                for (var y = 0; y < _Config2['default'].TILE_Y - 4; y++) {
                    ctx.drawImage.apply(ctx, [floor, 0, 0, _Config2['default'].SPRITE_SIZE, // dWidth
                    _Config2['default'].SPRITE_SIZE, // dHeight
                    this._floorOffset + floorWidth * x - floorWidth, // DX
                    (y + 2) * floorWidth, // DX
                    floorWidth, floorWidth]);
                }
            }

            // Render Wall
            var wall = this._resources.get('wall');
            var wallWidth = wall.width * _Config2['default'].SPRITE_SCALE;
            for (var x = 0; x < _Config2['default'].CANVAS_WIDTH / wallWidth + 1; x++) {
                ctx.drawImage.apply(ctx, [wall, 0, // DX
                wall.height / 2 * this.frame, //DY
                wall.width, wall.height / 2, this._wallOffset + wallWidth * x - wallWidth, //sx
                0, //sy
                wall.width * _Config2['default'].SPRITE_SCALE, wall.height * _Config2['default'].SPRITE_SCALE / 2]);
            }

            // Calculate Offsets
            var xStep = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE / 24;
            if (this._room.state === "moving") {
                this._floorOffset += xStep;
                if (this._floorOffset >= floorWidth - 1) this._floorOffset = 0;

                this._wallOffset += xStep;
                if (this._wallOffset > wallWidth - 1) this._wallOffset = 0;
            }
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":21,"./ObjectView":27}],30:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _ObjectView2 = require('./ObjectView');

var _ObjectView3 = _interopRequireDefault(_ObjectView2);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _servicesMessage = require('../services/Message');

var _servicesMessage2 = _interopRequireDefault(_servicesMessage);

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(ui, view) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._ui = ui;
        this._view = view;

        this._tileHeight = 2;

        this._images = [{
            "name": "bg",
            "image": "ui-bg.png"
        }];

        this._selectedOptionIndex = 0;
    }

    _createClass(_default, [{
        key: 'loadResources',
        value: function loadResources() {
            var promises = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var image = _step.value;

                    promises.push(this.loadResource(image.name, image.image));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return Promise.all(promises);
        }
    }, {
        key: 'render',
        value: function render(ctx) {

            var yPos = _Config2['default'].TILE_SIZE * (_Config2['default'].TILE_Y - this._tileHeight);

            // Draw Background
            ctx.save();

            var bgRect = [0, yPos, _Config2['default'].CANVAS_WIDTH, _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * this._tileHeight - 300];

            var uiRect = [0, yPos, _Config2['default'].CANVAS_WIDTH, _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * this._tileHeight];

            var gradient = ctx.createLinearGradient.apply(ctx, bgRect);

            gradient.addColorStop(0, "#64A357");
            gradient.addColorStop(1, "#003700");
            ctx.fillStyle = gradient;
            ctx.fillRect.apply(ctx, uiRect);

            ctx.strokeStyle = "#8D8045";

            // The stroke is middle aligned with the edges of the box
            var lineWidth = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE / 32;
            //let lineWidth = 5;
            ctx.lineWidth = lineWidth;

            var strokeRect = [].concat(uiRect);
            strokeRect[0] += lineWidth / 2;
            strokeRect[1] += lineWidth / 2;
            strokeRect[2] -= lineWidth;
            strokeRect[3] -= lineWidth;

            ctx.strokeRect.apply(ctx, _toConsumableArray(strokeRect));

            // Fill bg with patern
            ctx.globalAlpha = 0.1;
            var patern = ctx.createPattern(this._resources.get("bg"), "repeat");
            ctx.fillStyle = patern;
            ctx.rect.apply(ctx, _toConsumableArray(strokeRect));
            ctx.fill();

            ctx.restore();

            ctx.fillStyle = "#ffffff";
            yPos += _Config2['default'].TILE_SIZE / 3;

            var fontSize = 5 * _Config2['default'].SPRITE_SCALE;
            ctx.font = fontSize + "px Courier New";

            var xPos = _Config2['default'].TILE_SIZE * 1.2;

            if (this._view._dataStore._localPlayer.state === "idle") {
                // Draw Info
                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 0 ? ">" : "") + this._ui.currentOptions[0], xPos, yPos]);

                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 1 ? ">" : "") + this._ui.currentOptions[1], xPos + _Config2['default'].TILE_SIZE * 2, yPos]);

                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 2 ? ">" : "") + this._ui.currentOptions[2], xPos, yPos + fontSize * 2]);

                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 3 ? ">" : "") + this._ui.currentOptions[3], xPos + _Config2['default'].TILE_SIZE * 2, yPos + fontSize * 2]);
            }

            xPos = _Config2['default'].TILE_SIZE * 5;
            yPos = _Config2['default'].TILE_SIZE * (_Config2['default'].TILE_Y - this._tileHeight);

            var players = this._view._dataStore.players.values();
            // Render Player Info
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var player = _step2.value;

                    yPos += fontSize * 2;

                    ctx.fillStyle = "#ffffff";

                    // Render Player Names
                    ctx.fillText.apply(ctx, [player.name, xPos, yPos]);

                    // Define cooldown vars
                    var cooldownBarYPos = yPos + fontSize / 2;
                    var cooldownBarWidth = _Config2['default'].TILE_SIZE;
                    var cooldownBarHeight = fontSize / 2;

                    // Render Player Cooldown Fill
                    ctx.fillStyle = "#00FF00";
                    var cooldownPercentage = player.cooldown / player.maxCooldown;
                    ctx.fillRect(xPos, cooldownBarYPos, cooldownBarWidth * cooldownPercentage, cooldownBarHeight);

                    // Render Player Cooldown Stroke
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 1 * _Config2['default'].SPRITE_SCALE;
                    ctx.strokeRect(xPos, cooldownBarYPos, cooldownBarWidth, cooldownBarHeight);

                    // Define Healthbar vars
                    var healthBarXPos = xPos + _Config2['default'].TILE_SIZE * 2;
                    var healthBarYPos = yPos - fontSize / 2;
                    var healthBarWidth = _Config2['default'].TILE_SIZE * 2;
                    var healthBarHeight = fontSize / 2;

                    // Render Player Health Fill
                    ctx.fillStyle = "#FF0000";
                    var healthPercentage = player.health / player.maxHealth;
                    ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth * healthPercentage, healthBarHeight);

                    // Render Player Health Stroke
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 1 * _Config2['default'].SPRITE_SCALE;
                    ctx.strokeRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

                    ctx.fillStyle = "#FFF";
                    ctx.fillText.apply(ctx, [player.health + '/' + player.maxHealth, healthBarXPos + healthBarWidth + 2 * _Config2['default'].SPRITE_SCALE, healthBarYPos]);

                    healthBarYPos += healthBarHeight * 1.5;

                    //ctx.fillStyle = "#000";
                    //ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

                    // Render Player Health Fill
                    ctx.fillStyle = "#0000FF";
                    var manaPercentage = player.mana / player.maxMana;
                    ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth * manaPercentage, healthBarHeight);

                    // Render Player Health Stroke
                    ctx.strokeStyle = "#000";
                    ctx.lineWidth = 1 * _Config2['default'].SPRITE_SCALE;
                    ctx.strokeRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

                    ctx.fillStyle = "#FFF";
                    ctx.fillText.apply(ctx, [player.mana + '/' + player.maxMana, healthBarXPos + healthBarWidth + 2 * _Config2['default'].SPRITE_SCALE, healthBarYPos]);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                        _iterator2['return']();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    }, {
        key: 'up',
        value: function up() {
            if (this._view._dataStore._localPlayer.state === "idle") {
                if (this._selectedOptionIndex == 0) this._selectedOptionIndex = 2;else if (this._selectedOptionIndex == 1) this._selectedOptionIndex = 3;else if (this._selectedOptionIndex == 2) this._selectedOptionIndex = 0;else if (this._selectedOptionIndex == 3) this._selectedOptionIndex = 1;
            }
        }
    }, {
        key: 'down',
        value: function down() {
            this.up();
        }
    }, {
        key: 'left',
        value: function left() {
            if (this._view._dataStore._localPlayer.state === "idle") {
                if (this._selectedOptionIndex == 0) this._selectedOptionIndex = 1;else if (this._selectedOptionIndex == 1) this._selectedOptionIndex = 0;else if (this._selectedOptionIndex == 2) this._selectedOptionIndex = 3;else if (this._selectedOptionIndex == 3) this._selectedOptionIndex = 2;
            }
        }
    }, {
        key: 'right',
        value: function right() {
            this.left();
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            if (this._view._dataStore._localPlayer.state === "idle") {
                var currentOption = this._ui.currentOptions[this._selectedOptionIndex];

                //let action = Immutable.Map({
                //"cycle": this._view._game.localPlayer.actionCycle,
                //"action": this._ui.currentOptions[this._selectedOptionIndex],
                //"target": 0
                //});
                //
                var message = new _servicesMessage2['default'](0, "player-action", {
                    "id": this._view._dataStore._localPlayer.id,
                    "action": this._ui.currentOptions[this._selectedOptionIndex]
                });
                this._view.postMessage(message);

                //if(!Immutable.is(action, this._view._game.localPlayer.currentAction)) {
                //let message = {
                //"event": "player-action",
                //"from": this._view._game.localPlayer.id,
                //"data": action
                //}

                //this._view.postMessage(message);
                //}
            }
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Logger":15,"../services/Message":16,"./ObjectView":27}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL0Jhc2VNb2RlbC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9HYW1lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTG9iYnkuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9NYWluTWVudS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1Jvb20uanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9VaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL0RhdGFTdG9yZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL0tleWJvYXJkSW5wdXRTZXJ2aWNlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTWVzc2FnZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL01vYmlsZUlucHV0U2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL05ldHdvcmtTZXJ2aWNlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvU291bmRTZXJ2aWNlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9DYW52YXMyZC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL0RlYnVnVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL0VuZW15Vmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL0xvYmJ5Vmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL01haW5NZW51Vmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL09iamVjdFZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9QbGF5ZXJWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUm9vbVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9VaVZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O3lCQ0FtQixjQUFjOzs7OztBQUdqQyxJQUFJLE1BQU0sR0FBRywyQkFBVyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHZCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7QUNQdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7OztBQUtoQixNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDOzs7OztBQUtwQyxNQUFNLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQztBQUM1QixNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFFNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxBQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDOztBQUV6RSxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVc7O0FBRTFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOztBQUV0QixVQUFNLENBQUMsV0FBVyxHQUFLLEVBQUUsQ0FBQzs7O0FBRzFCLFFBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDcEMsT0FBRztBQUNDLGNBQU0sQ0FBQyxZQUFZLEdBQUssV0FBVyxFQUFFLEdBQUMsTUFBTSxDQUFDLFVBQVUs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bkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQzthQUNyQztTQUNKOzs7ZUFFSSxpQkFBRztBQUNKLGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjs7O2VBRU0sbUJBQUc7QUFDTixnQkFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtBQUNwRCxvQkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Ozs7Ozs7O0FBUXZFLG9CQUFJLE9BQU8sR0FBRyxpQ0FBWSxDQUFDLEVBQUUsZUFBZSxFQUFFO0FBQzFDLHdCQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDM0MsNEJBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7aUJBQy9ELENBQUMsQ0FBQztBQUNILG9CQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7YUFXbkM7U0FDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGVuZ2luZSA9IG5ldyBFbmdpbmUoZG9jdW1lbnQuYm9keSk7XG5lbmdpbmUuaW5pdCgpO1xuXG4vLyBERUJVR1xud2luZG93LmVuZ2luZSA9IGVuZ2luZTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG4vL2NvbmZpZy5ESVNBQkxFX0FVRElPID0gdHJ1ZTtcblxuLy8gMTZ4OSBBc3BlY3QgUmF0aW9cbmNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbmNvbmZpZy5BU1BFQ1RfSEVJR0hUID0gMTA4MDtcblxuY29uZmlnLlRJTEVfWCA9IDE2OyAvLyBNVVNUIEJFIE1VTFRJUExFIE9GIDE2XG5jb25maWcuVElMRV9ZID0gKGNvbmZpZy5USUxFX1gqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbmNvbmZpZy5jYWxjdWxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBIb3Jpem9udGFsIG9yIFZlcnRpY2FsIHBlcmNlbnRhZ2UgdGhhdCB0aGUgZ2FtZSB2aWV3IHNob3VsZCBvY2N1cHlcbiAgICBjb25maWcuUEVSQ0VOVEFHRSA9IDE7XG5cbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuXG4gICAgLy8gQ2FjbHVsYXRlIGNhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IGFjY29yZGluZyB0byBhYm92ZSBwZXJjZW50YWdlIGFuZCBhc3BlY3QgcmF0aW9cbiAgICBsZXQgc2NyZWVuV2lkdGggPSB3aW5kb3cub3V0ZXJXaWR0aDtcbiAgICBkbyB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfV0lEVEggID0gKHNjcmVlbldpZHRoLS0qY29uZmlnLlBFUkNFTlRBR0UpO1xuICAgICAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuICAgIH0gd2hpbGUoY29uZmlnLkNBTlZBU19IRUlHSFQlY29uZmlnLlNQUklURV9TSVpFICE9PSAwKVxuXG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgLy9pZihjb25maWcuQ0FOVkFTX0hFSUdIVCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAvL2NvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgLy9jb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIC8vfVxuXG4gICAgLy8gRGV0ZXJtaW5lIFNwcml0ZSBTY2FsaW5nXG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG4gICAgY29uZmlnLlRJTEVfU0laRSAgICAgPSBjb25maWcuU1BSSVRFX1NJWkUqY29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgIC8vIFNldCBGUFNcbiAgICBjb25maWcuRlBTID0gNjA7XG59XG5cbmlmKHNlbGYuZG9jdW1lbnQpIGNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IENvbmZpZyBmcm9tICcuLi9Db25maWcnO1xuLy8gSW1wb3J0IEdhbWVcbmltcG9ydCBEYXRhU3RvcmUgZnJvbSAnLi9zZXJ2aWNlcy9EYXRhU3RvcmUnO1xuXG4vLyBJbXBvcnQgVmlld1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3cy9DYW52YXMyZCc7XG5cbi8vIEltcG9ydCBEaXNwYXRjaGVyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2Rpc3BhdGNoZXIvRGlzcGF0Y2hlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG4gICAgICAgIHRoaXMuX2RhdGFTdG9yZSAgPSBuZXcgRGF0YVN0b3JlKCk7XG4gICAgICAgIHRoaXMuX3ZpZXcgICAgICAgPSBuZXcgVmlldygpO1xuXG5cbiAgICAgICAgd2luZG93LmRhdGFTdG9yZSAgPSB0aGlzLl9kYXRhU3RvcmU7XG4gICAgICAgIHdpbmRvdy52aWV3ICAgICAgID0gdGhpcy5fdmlldztcbiAgICAgICAgd2luZG93LmRpc3BhdGNoZXIgPSB0aGlzLl9kaXNwYXRjaGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGVuZ2luZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuaW5pdCh0aGlzLl92aWV3KSxcbiAgICAgICAgICAgIHRoaXMuX2RhdGFTdG9yZS5pbml0KHRoaXMuX2Rpc3BhdGNoZXIpLFxuICAgICAgICAgICAgdGhpcy5fdmlldy5pbml0KHRoaXMuX2Rpc3BhdGNoZXIsIHRoaXMuX2RhdGFTdG9yZSksXG4gICAgICAgIF0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgIC8vdGhpcy5fZGlzcGF0Y2hlci5wb3N0TWVzc2FnZSh7XCJldmVudFwiOiBcImdhbWUtc3RhcnRcIn0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBVdGlscyAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgTWVzc2FnZSAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTWVzc2FnZSc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyICAgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTmV0d29ya1NlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvTmV0d29ya1NlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG5cbiAgICAgICAgdmlldy5vbm1lc3NhZ2UgPSB0aGlzLmhhbmRsZVZpZXdNZXNzYWdlcy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRNdWx0aXBsYXllckdhbWUobWVzc2FnZSkge1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICAvLyBCdWlsZCBhcmdzXG4gICAgICAgIGlmKG1lc3NhZ2UuaG9zdElkKSB7XG4gICAgICAgICAgICBhcmdzID0gW21lc3NhZ2UubmFtZSwgbWVzc2FnZS5ob3N0SWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncyA9IFttZXNzYWdlLm5hbWVdO1xuICAgICAgICAgICAgdGhpcy5fcm5nID0gbmV3IE1hdGguc2VlZHJhbmRvbShcIlwiLCB7c3RhdGU6IHRydWV9KTtcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJybmctc2V0XCIsXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IHRoaXMuX3JuZ1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW5pdCBtcCBjb250cm9sbGVyXG4gICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlID0gbmV3IE5ldHdvcmtTZXJ2aWNlKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5pbml0KHRoaXMuX3JuZykudGhlbigoKT0+e1xuXG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5vbm1lc3NhZ2UgPSBtZXNzYWdlID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBCcm9hZGNhc3QgQWRkIFBsYXllciBNZXNzYWdlXCIpO1xuXG4gICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwiYWRkLXBsYXllclwiLFxuICAgICAgICAgICAgICAgIFwiZnJvbVwiOiBTeW1ib2woKSxcbiAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogbWVzc2FnZS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImlzTG9jYWxcIjogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwiZ2FtZS1zdGF0ZVwiLFxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBcImxvYmJ5XCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbGwgbXVsdGlwbGF5ZXIgRXZlbnRzXG4gICAgICovXG4gICAgaGFuZGxlTXVsdGlwbGF5ZXJNZXNzYWdlcyhtZXNzYWdlKSB7XG4gICAgICAgIGlmKCF0aGlzLl9zaW11bGF0aW9uV29ya2VyKSB7XG4gICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYWxsIHZpZXcgbWVzc2FnZXNcbiAgICAgKi9cbiAgICBoYW5kbGVWaWV3TWVzc2FnZXMobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyIHJlY2lldmVkIG1lc3NhZ2UgZnJvbSBWaWV3OlwiKTtcbiAgICAgICAgbGV0IGRlY29kZWRNZXNzYWdlID0gbWVzc2FnZTtcbiAgICAgICAgTG9nZ2VyLmxvZyhkZWNvZGVkTWVzc2FnZSk7XG5cbiAgICAgICAgaWYoZGVjb2RlZE1lc3NhZ2UuZXZlbnQgPT09IFwiZ2FtZS1ob3N0XCIpIHtcbiAgICAgICAgICAgIC8vIEluaXRpYWxpemUgc2ltdWxhdGlvbiBsb29wXG4gICAgICAgICAgICB0aGlzLl9zaW11bGF0aW9uV29ya2VyICAgICAgICAgICA9IFV0aWxzLmxvYWRXb3JrZXIoXCJTaW11bGF0aW9uV29ya2VyXCIpO1xuICAgICAgICAgICAgdGhpcy5fc2ltdWxhdGlvbldvcmtlci5vbm1lc3NhZ2UgPSB0aGlzLmhhbmRsZVNpbXVsYXRpb25NZXNzYWdlcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZSA9IG5ldyBOZXR3b3JrU2VydmljZShtZXNzYWdlLmRhdGEubmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5vbm1lc3NhZ2UgID0gdGhpcy5oYW5kbGVOZXR3b3JrTWVzc2FnZXMuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmluaXQobWVzc2FnZS5kYXRhLmlkKS50aGVuKChpZCk9PntcbiAgICAgICAgICAgICAgICAvL0xvZ2dlci5iYW5uZXIoXCJuZXR3b3JrIGluaXRkZFwiKTtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyTWVzc2FnZSA9IG5ldyBNZXNzYWdlKDAsIFwiZ2FtZS1ob3N0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IG1lc3NhZ2UuZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IGlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2ltdWxhdGlvbldvcmtlci5wb3N0TWVzc2FnZShwbGF5ZXJNZXNzYWdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYoZGVjb2RlZE1lc3NhZ2UuZXZlbnQgPT09IFwiZ2FtZS1qb2luXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlID0gbmV3IE5ldHdvcmtTZXJ2aWNlKG1lc3NhZ2UuZGF0YS5uYW1lLCBcImhvc3RcIik7XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5vbm1lc3NhZ2UgID0gdGhpcy5oYW5kbGVOZXR3b3JrTWVzc2FnZXMuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmluaXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3NpbXVsYXRpb25Xb3JrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaW11bGF0aW9uV29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9uZXR3b3JrU2VydmljZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5zZW5kTWVzc2FnZXMoW21lc3NhZ2VdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy90aGlzLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgU2ltdWxhdGlvbldvcmtlciBtZXNzYWdlc1xuICAgICAqL1xuICAgIGhhbmRsZU5ldHdvcmtNZXNzYWdlcyhtZXNzYWdlcykge1xuICAgICAgICBmb3IobGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXIgcmVjaWV2ZWQgbWVzc2FnZSBmcm9tIE5ldHdvcmtcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSBhcmUgdGhlIGhvc3QgcHJvY2Nlc3MgdGhlIG1lc3NhZ2UgYW5kIGxldCB0aGUgc2ltdWxhdGlvbiB2ZXJpZnkgaXRcbiAgICAgICAgICAgIGlmKHRoaXMuX3NpbXVsYXRpb25Xb3JrZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaW11bGF0aW9uV29ya2VyLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gaWYgd2UgYXJlIGEgY2xpZW50IHRoZW4ganVzdCBibGluZGx5IGFjY2VwdCB0aGUgYWxsIG1pZ2h0eSBtZXNzYWdlXG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIFNpbXVsYXRpb25Xb3JrZXIgbWVzc2FnZXNcbiAgICAgKi9cbiAgICBoYW5kbGVTaW11bGF0aW9uTWVzc2FnZXMoZSkge1xuICAgICAgICBmb3IobGV0IG1lc3NhZ2Ugb2YgZS5kYXRhKSB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyIHJlY2lldmVkIG1lc3NhZ2UgZnJvbSBTaW11bGF0aW9uXCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5fbmV0d29ya1NlcnZpY2UpXG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5zZW5kTWVzc2FnZXMoZS5kYXRhKTtcbiAgICB9XG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0gW107XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxuICAgIHNldCBvbm1lc3NhZ2UoZm4pIHtcbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzLnB1c2goZm4pO1xuICAgIH1cblxuICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgZm9yKGxldCBsaXN0ZW5lciBvZiB0aGlzLl9saXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGxpc3RlbmVyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IHN0YXRlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHN0YXRlIGlmIGl0IGlzIGxlZ2FsLlxuICAgICAqL1xuICAgIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaW5kZXhPZihzdGF0ZSkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGBTdGF0ZSAke3N0YXRlfSBpcyBub3QgYWxsb3dlZGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgYWN0aW9uKGFjdGlvbikge1xuICAgICAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb25cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKi9cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKi9cbiAgICBnZXQgYWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbmFtZSBvZiB0aGUgc3RhdGUgbWVzc2FnZSB3ZSBuZWVkIHRvIHNlbmQgdG8gbW9kaWZ5XG4gICAgICogdGhpcyBtb2RlbFxuICAgICAqL1xuICAgIGdldCBzdGF0ZU1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZU1lc3NhZ2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5cbmxldCBTVEFURVMgPSBbXG4gICAgXCJtYWluIG1lbnVcIixcbiAgICBcImxvYmJ5XCIsXG4gICAgXCJwbGF5aW5nXCJcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICBnZXQgc3RhdGVNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gXCJnYW1lLXN0YXRlXCI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFNUQVRFUylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwibWFpbiBtZW51XCI7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJTZWxlY3QgSm9iXCIsXG4gICAgICAgICAgICBcIlJlYWR5XCIsXG4gICAgICAgICAgICBcIkxlYXZlXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJIb3N0IEdhbWVcIixcbiAgICAgICAgICAgIFwiSm9pbiBHYW1lXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsICAgICBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IExvZ2dlciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi8uLi9Db25maWcnO1xuXG5sZXQgSk9CUyA9IG5ldyBNYXAoKTtcblxuSk9CUy5zZXQoXCJjbGFpcnZveWFudFwiLCB7XG4gICAgJ25hbWUnOiAgICdjbGFpcnZveWFudCcsXG4gICAgJ2hlYWx0aCc6IDYwLFxuICAgICdtYW5hJzogNDAsXG4gICAgJ2Nvb2xkb3duJzogODAsXG4gICAgJ3Bvc2l0aW9uJzogJ2JhY2snXG59KTtcblxuSk9CUy5zZXQoXCJoZXJiYWxpc3RcIiwge1xuICAgICduYW1lJzogJ2hlcmJhbGlzdCcsXG4gICAgJ2hlYWx0aCc6IDQwLFxuICAgICdtYW5hJzogMCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcInZpbGxhaW5cIiwge1xuICAgICduYW1lJzogJ3ZpbGxhaW4nLFxuICAgICdoZWFsdGgnOiA4MCxcbiAgICAnbWFuYSc6IDIwLFxuICAgICdjb29sZG93bic6IDQwLFxuICAgICdwb3NpdGlvbic6ICdmcm9udCdcbn0pO1xuXG5KT0JTLnNldChcImtuaWdodFwiLCB7XG4gICAgJ25hbWUnOiAna25pZ2h0JyxcbiAgICAnaGVhbHRoJzogMTAwLFxuICAgICdtYW5hJzogMCxcbiAgICAnY29vbGRvd24nOiAxMDAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwibmVjcm9tYW5jZXJcIiwge1xuICAgICduYW1lJzogJ25lY3JvbWFuY2VyJyxcbiAgICAnaGVhbHRoJzogNDAsXG4gICAgJ21hbmEnOiAxMjAsXG4gICAgJ2Nvb2xkb3duJzogODAsXG4gICAgJ3Bvc2l0aW9uJzogJ2JhY2snXG59KTtcblxuSk9CUy5zZXQoXCJuaW5qYVwiLCB7XG4gICAgJ25hbWUnOiAnbmluamEnLFxuICAgICdoZWFsdGgnOiA2MCxcbiAgICAnbWFuYSc6IDMwLFxuICAgICdjb29sZG93bic6IDMwLFxuICAgICdwb3NpdGlvbic6ICdmcm9udCdcbn0pO1xuXG5sZXQgU1RBVEVTID0gW1xuICAgIFwiaWRsZVwiLFxuICAgIFwicmVhZHlcIixcbiAgICBcInJlc3RpbmdcIixcbiAgICBcIndhbGtpbmdcIixcbiAgICBcImF0dGFja2luZ1wiXG5dO1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgc3RhdGljIGdldEpvYnMoKSB7XG4gICAgICAgIHJldHVybiBbLi4uSk9CUy52YWx1ZXMoKV07XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicGxheWVyLXN0YXRlXCI7XG4gICAgfVxuXG4gICAgZ2V0IGpvYigpICAgICAgICAgICB7cmV0dXJuIHRoaXMuX2pvYjt9XG4gICAgZ2V0IGN1cnJlbnRBY3Rpb24oKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRBY3Rpb259XG4gICAgZ2V0IG5leHRBY3Rpb24oKSAgICB7cmV0dXJuIHRoaXMuX25leHRBY3Rpb259XG4gICAgZ2V0IG5hbWUoKSAgICAgICAgICB7cmV0dXJuIHRoaXMuX25hbWU7fVxuICAgIGdldCBpZCgpICAgICAgICAgICAge3JldHVybiB0aGlzLl9pZDt9XG4gICAgZ2V0IHJlYWR5VG9BdHRhY2soKSB7cmV0dXJuIHRoaXMuX3JlYWR5VG9BdHRhY2s7fVxuICAgIGdldCBpc0J1c3koKSAgICAgICAge3JldHVybiB0aGlzLl9pc0J1c3l9XG4gICAgZ2V0IGFjdGlvbkN5Y2xlKCkgICB7cmV0dXJuIHRoaXMuX2FjdGlvbkN5Y2xlfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoaXMgcGxheWVycyBqb2IgaWYgaXQgaXMgYSB2YWxpZCBqb2JcbiAgICAgKi9cbiAgICBzZXQgam9iKGpvYk5hbWUpIHtcbiAgICAgICAgdGhpcy5fam9iID0gSk9CUy5nZXQoam9iTmFtZSk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgd2FzIGEgdmFsaWQgam9iXG4gICAgICAgIGlmKCF0aGlzLl9qb2IpXG4gICAgICAgICAgICB0aHJvdyBgSm9iICR7am9iTmFtZX0gaXMgbm90IGFsbG93ZWRgO1xuXG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5fam9iLmhlYWx0aDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuXG4gICAgICAgIHRoaXMubWF4TWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuICAgICAgICB0aGlzLm1hbmEgPSB0aGlzLl9qb2IubWFuYTtcblxuICAgICAgICB0aGlzLm1heENvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkLCBqb2IpIHtcbiAgICAgICAgc3VwZXIoU1RBVEVTKTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiaWRsZVwiO1xuXG4gICAgICAgIC8vdGhpcy5jdXJyZW50QWN0aW9uID0gSW1tdXRhYmxlLk1hcCh7XG4gICAgICAgICAgICAvL1wiYWN0aW9uXCI6IFwidGhpbmtpbmdcIlxuICAgICAgICAvL30pO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aW9uICAgID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIFN0b3JlIHRoZSBhY3Rpb24gY3ljbGVcbiAgICAgICAgdGhpcy5fYWN0aW9uQ3ljbGUgID0gMDtcblxuICAgICAgICB0aGlzLl9pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICBpZihqb2IpIHt0aGlzLmpvYiA9IGpvYjt9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7XG5pbXBvcnQgTG9nZ2VyICAgIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmxldCBTVEFURVMgPSBbXG4gICAgXCJpZGxlXCIsXG4gICAgXCJtb3ZpbmdcIixcbiAgICBcImJhdHRsZVwiXG5dO1xuXG5jbGFzcyBSb29tIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICBnZXQgc3RhdGVNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gXCJyb29tLXN0YXRlXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFUygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiY2F2ZVwiLFxuICAgICAgICAgICAgXCJ0ZW1wbGVcIlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgICAgIHN1cGVyKFNUQVRFUyk7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJpZGxlXCI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYmF0dGxlT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiYXR0YWNrXCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJkZWZlbmRcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3Jvb21PcHRpb25zID0gW1xuICAgICAgICAgICAgXCJyZWFkeVwiLFxuICAgICAgICAgICAgXCJhYmlsaXR5XCIsXG4gICAgICAgICAgICBcIml0ZW1cIixcbiAgICAgICAgICAgIFwibWFuYWdlXCJcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IHRoaXMuX3Jvb21PcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cblxuICAgIHNldEJhdHRsZU9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fYmF0dGxlT3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXRJZGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9yb29tT3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgTWVzc2FnZSBmcm9tIFwiLi9NZXNzYWdlXCI7XG5pbXBvcnQgTG9nZ2VyICBmcm9tIFwiLi9Mb2dnZXJcIjtcblxuaW1wb3J0IEdhbWUgZnJvbSBcIi4uL21vZGVscy9HYW1lXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuLi9tb2RlbHMvb2JqZWN0cy9QbGF5ZXJcIjtcbmltcG9ydCBNYWluTWVudSBmcm9tIFwiLi4vbW9kZWxzL29iamVjdHMvTWFpbk1lbnVcIjtcbmltcG9ydCBMb2JieSBmcm9tIFwiLi4vbW9kZWxzL29iamVjdHMvTG9iYnlcIjtcbmltcG9ydCBSb29tIGZyb20gXCIuLi9tb2RlbHMvb2JqZWN0cy9Sb29tXCI7XG5pbXBvcnQgVWkgZnJvbSBcIi4uL21vZGVscy9vYmplY3RzL1VpXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBnZXQgbWFpbk1lbnUoKSB7cmV0dXJuIHRoaXMuX21haW5NZW51fVxuICAgIGdldCBsb2JieSgpIHtyZXR1cm4gdGhpcy5fbG9iYnl9XG4gICAgZ2V0IGdhbWUoKSB7cmV0dXJuIHRoaXMuX2dhbWV9XG4gICAgZ2V0IHBsYXllcnMoKSB7cmV0dXJuIHRoaXMuX3BsYXllcnN9XG5cbiAgICBjb25zdHJ1Y3RvcihkaXNwYXRjaGVyKSB7XG4gICAgICAgIHRoaXMuX21haW5NZW51ID0gbmV3IE1haW5NZW51KCk7XG4gICAgICAgIHRoaXMuX2dhbWUgICAgID0gbmV3IEdhbWUoKTtcbiAgICAgICAgdGhpcy5fcGxheWVycyAgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgaW5pdChkaXNwYXRjaGVyKSB7XG4gICAgICAgIGRpc3BhdGNoZXIub25tZXNzYWdlID0gdGhpcy5oYW5kbGVNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgaGFuZGxlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRhdGEgU3RvcmUgcmVjaWV2ZWQgbWVzc2FnZSBmb3JtIERpc3BhdGNoZXJlXCIpO1xuICAgICAgICBsZXQgZGVjb2RlZE1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgICBsZXQgZnJvbSAgPSBkZWNvZGVkTWVzc2FnZS5mcm9tO1xuICAgICAgICBsZXQgZXZlbnQgPSBkZWNvZGVkTWVzc2FnZS5ldmVudDtcbiAgICAgICAgbGV0IGRhdGEgID0gZGVjb2RlZE1lc3NhZ2UuZGF0YTtcbiAgICAgICAgTG9nZ2VyLmxvZyhkZWNvZGVkTWVzc2FnZSk7XG5cbiAgICAgICAgc3dpdGNoKGV2ZW50KSB7XG4gICAgICAgICAgICBjYXNlIFwiZ2FtZS1zdGF0ZVwiOlxuICAgICAgICAgICAgICAgIGlmKGRhdGEgPT09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nYW1lLnN0YXRlID0gXCJsb2JieVwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieSA9IG5ldyBMb2JieSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhID09PSBcInBsYXlpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9nYW1lLnN0YXRlID0gXCJwbGF5aW5nXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpID0gbmV3IFVpKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYXllci1qb2luLWxvY2FsXCI6XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3BsYXllcnMuZ2V0KGRhdGEuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsUGxheWVyID0gbmV3IFBsYXllcihkYXRhLm5hbWUsIGRhdGEuaWQsIGRhdGEuam9iKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheWVycy5zZXQoZGF0YS5pZCwgdGhpcy5fbG9jYWxQbGF5ZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5ZXItam9pbi1yZW1vdGVcIjpcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgaWQgaXMgMCB0aGlzIGlzIGNvbWluZyBmcm9tIHRoZSBob3N0XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3BsYXllcnMuZ2V0KGRhdGEuaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEuaWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwbGF5ZXJJZCA9IGZyb207XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGxheWVySWQgPSBkYXRhLmlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcihkYXRhLm5hbWUsIHBsYXllcklkLCBkYXRhLmpvYik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllcnMuc2V0KHBsYXllcklkLCBwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicGxheWVyLWpvYlwiOlxuICAgICAgICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzLnBsYXllcnMuZ2V0KGRhdGEuaWQpO1xuICAgICAgICAgICAgICAgIGlmKHBsYXllciAmJiAhKHBsYXllci5qb2IgJiYgcGxheWVyLmpvYi5uYW1lID09PSBkYXRhLmpvYikpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmpvYiA9IGRhdGEuam9iO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5ZXItc3RhdGVcIjpcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5wbGF5ZXJzLmdldChkYXRhLmlkKTtcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXIgJiYgIShwbGF5ZXIuc3RhdGUgPT09IGRhdGEuc3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCEodGhpcy5nYW1lLnN0YXRlID09PSBcImxvYmJ5XCIgJiYgZGF0YS5zdGF0ZSA9PT0gXCJyZWFkeVwiICYmICFwbGF5ZXIuam9iKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5zdGF0ZSA9IGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYXllci1zZXRcIjpcbiAgICAgICAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcy5wbGF5ZXJzLmdldChkYXRhLmlkKTtcbiAgICAgICAgICAgICAgICBpZihwbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGRhdGEua2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyW2RhdGEua2V5c1tpXV0gPSBkYXRhLnZhbHVlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJwbGF5ZXItYWN0aW9uXCI6XG4gICAgICAgICAgICAgICAgdmFyIHBsYXllciA9IHRoaXMucGxheWVycy5nZXQoZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5hY3Rpb24gPSBkYXRhLmFjdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwicm9vbS1jcmVhdGVcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20gPSBuZXcgUm9vbShkYXRhKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyb29tLXN0YXRlXCI6XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLnN0YXRlID0gZGF0YTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBpZCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInVwXCIsICgpID0+IHRoaXMuZW1pdChcInVwXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwia1wiLCAoKSA9PiB0aGlzLmVtaXQoXCJ1cFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZG93blwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwialwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsZWZ0XCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJoXCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInJpZ2h0XCIsICgpID0+IHRoaXMuZW1pdChcInJpZ2h0XCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJyaWdodFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZW50ZXJcIiwgKCk9PiB0aGlzLmVtaXQoXCJjb25maXJtXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJgXCIsICgpPT4gdGhpcy5lbWl0KFwiZGVidWdcIikpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV0d29yayhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjRkRGNDg1OyBjb2xvcjogIzAwMDsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKGAlYyR7bXNnfWAsICdmb250LXNpemU6IDE1cHg7IGJhY2tncm91bmQ6ICNGREY0ODU7IGNvbG9yOiAjRjAwOycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2cobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihmcm9tLCBldmVudCwgZGF0YSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGZyb206IGZyb20sXG4gICAgICAgIGV2ZW50OiBldmVudCxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgIH1cbn07XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ1cFwiKVxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkb3duXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZG93blwiKVxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWZ0XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwibGVmdFwiKVxuICAgICAgICB9KTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyaWdodFwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInJpZ2h0XCIpXG4gICAgICAgIH0pO1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpcm1cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjb25maXJtXCIpXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4vTG9nZ2VyJztcbmltcG9ydCBNZXNzYWdlICAgICAgZnJvbSAnLi9NZXNzYWdlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IobmFtZSwgaG9zdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgaWYoaG9zdClcbiAgICAgICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pZCA9IFwiaG9zdFwiO1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoaWQpIHtcbiAgICAgICAgaWYoaWQpIHRoaXMuX2lkID0gaWQ7XG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHBlZXIgY29ubmVjdGlvblxuICAgICAgICB0aGlzLl9wZWVyID0gbmV3IFBlZXIodGhpcy5faWQsIHtcbiAgICAgICAgICAgIGtleTogQ29uZmlnLkFQSV9LRVksXG4gICAgICAgICAgICBkZWJ1ZzogM1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5fcGVlci5vbignb3BlbicsIChpZCk9PntcbiAgICAgICAgICAgICAgICBMb2dnZXIubmV0d29yayhgUGVlciBDb25uZWN0aW9uIGNyZWF0ZWQsIFBlZXIgSUQgaXMgJHtpZH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2Uga25vdyBhYm91dCBhIHBlZXIgdGhlbiBjb25uZWN0XG4gICAgICAgICAgICAgICAgaWYodGhpcy5faG9zdClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdCh0aGlzLl9ob3N0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlbGlhYmxlXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhIHBlZXIgY29ubmVjdHMgaGFuZGxlIGl0XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVlci5vbignY29ubmVjdGlvbicsIChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBtb3JlIHRoYW4gNCBwbGF5ZXJzXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLnNpemUgPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vbignb3BlbicsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubmV0d29yayhcIlBlZXIgaGFzIGNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGVlciA9IHRoaXMuYWRkUGVlcihjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKDEpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlcyh0aGlzLl9pZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGVlcihjb25uZWN0aW9uKSB7XG4gICAgICAgIGxldCBwZWVyID0ge1xuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IGNvbm5lY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BlZXJzLnNldChjb25uZWN0aW9uLnBlZXIsIHBlZXIpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAoZGF0YSk9PntcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlTWVzc2FnZXMoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGVlcihwZWVyKSB7XG4gICAgICAgIHRoaXMuX3BlZXJzLmRlbGV0ZShwZWVyLmNvbm5lY3Rpb24ucGVlcik7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fcGVlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZCBtZXNzYWdlIHRvIGFsbCBwZWVyc1xuICAgICAqL1xuICAgIHNlbmRNZXNzYWdlcyhtZXNzYWdlcykge1xuICAgICAgICBpZih0aGlzLl9wZWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIHRoaXMuX3BlZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhpcyBtZXNzYWdlIGhhcyBhIHRvLCBtYWtlIHN1cmUgdGhpcyBwZWVycyBuZWVkcyB0aGUgbWVzc2FnZVxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlc1RvU2VuZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlLmZyb20gPSB0aGlzLl9pZDtcbiAgICAgICAgICAgICAgICAgICAgaWYoIW1lc3NhZ2UudG8gfHwgbWVzc3NhZ2UudG8gPT09IHBlZXIuY29ubmVjdGlvbi5wZWVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZXNUb1NlbmQucHVzaChtZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTG9nZ2VyLm5ldHdvcmsoXCJTZW5kIG1lc3NhZ2VzIHRvIHBlZXJzXCIpO1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZXNUb1NlbmQpO1xuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2VzVG9TZW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZSBpbmNvbWluZyBtZXNzYWdlXG4gICAgICovXG4gICAgaGFuZGxlTWVzc2FnZXMobWVzc2FnZXMpIHtcbiAgICAgICAgTG9nZ2VyLm5ldHdvcmsoYE5ldHdvcmsgU2VydmljZSByZWNpZXZlZCBtZXNzYWdlIGZyb20gcGVlciB3aXRoIGlkICR7bWVzc2FnZXMuZnJvbX1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlcyk7XG5cbiAgICAgICAgaWYobWVzc2FnZXMgPT09IDEpIHtcbiAgICAgICAgICAgIGxldCBtID0gbmV3IE1lc3NhZ2UoMCwgXCJwbGF5ZXItam9pbi1yZW1vdGVcIiwge1wibmFtZVwiOiB0aGlzLl9uYW1lLCBcImlkXCI6IHRoaXMuX2lkfSk7XG4gICAgICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKFtcbiAgICAgICAgICAgICAgICAgICAgbmV3IE1lc3NhZ2UoMCwgXCJnYW1lLXN0YXRlXCIsIFwibG9iYnlcIiksXG4gICAgICAgICAgICAgICAgICAgIG5ldyBNZXNzYWdlKDAsIFwicGxheWVyLWpvaW4tbG9jYWxcIiwge1wibmFtZVwiOiB0aGlzLl9uYW1lLCBcImlkXCI6IHRoaXMuX2lkfSlcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgdGhpcy5zZW5kTWVzc2FnZXMoW21dKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZXMpO1xuICAgICAgICAgICAgLy9mb3IobGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSAnLi9Mb2dnZXIuanMnO1xuXG5sZXQgcmVzb3VyY2VEaXIgPSAnLi9kaXN0L3Jlc291cmNlcy8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgcmVzb3VyY2UgYnkgZmlsZW5hbWVcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEltYWdlKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhgcmVzb3VyY2UgbG9hZGVkOiAke3Jlc291cmNlfWApO1xuICAgICAgICAgICAgICAgIHJlcyhpbWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1nLnNyYyA9IHJlc291cmNlRGlyICsgJ2ltYWdlcy8nICsgcmVzb3VyY2U7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3NvdW5kUGF0aCA9IFwiLi9kaXN0L3Jlc291cmNlcy9zb3VuZHMvXCI7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICBsZXQgc291bmRzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm1lbnUtbW92ZVwiLFxuICAgICAgICAgICAgICAgIFwidXJsXCI6IHRoaXMuX3NvdW5kUGF0aCArIFwibWVudS1tb3ZlLm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm1lbnUtc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJtZW51LXNlbGVjdC5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb29sZG93bi1yZWFkeVwiLFxuICAgICAgICAgICAgICAgIFwidXJsXCI6IHRoaXMuX3NvdW5kUGF0aCArIFwiY29vbGRvd24tcmVhZHkubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiY29tYmF0LXRoZW1lXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJxcnRybm90ZXFvbWJhdC5nYi5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJkdW5nZW9uLXRoZW1lXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJkdW5nZW9uZGVsYXkuZ2IubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fc291bmRzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZvcihsZXQgc291bmQgb2Ygc291bmRzKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgICAgICAvLyBMb2FkIHRoZSBzb3VuZFxuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kcy5zZXQoc291bmQubmFtZSwgbmV3IEhvd2woe1xuICAgICAgICAgICAgICAgICAgICB1cmxzOiBbc291bmQudXJsXSxcbiAgICAgICAgICAgICAgICAgICAgb25sb2FkOiByZXMsXG4gICAgICAgICAgICAgICAgICAgIG9ubG9hZGVycm9yOiByZWpcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHBsYXkoc291bmROYW1lLCBsb29wLCB2b2x1bWUpIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHJldHVybjtcbiAgICAgICAgbGV0IHNvdW5kID0gdGhpcy5fc291bmRzLmdldChzb3VuZE5hbWUpO1xuICAgICAgICBzb3VuZC5sb29wKGxvb3AgfHwgZmFsc2UpO1xuICAgICAgICBzb3VuZC52b2x1bWUodm9sdW1lIHx8IC41KTtcbiAgICAgICAgc291bmQucGxheSgpO1xuICAgIH1cblxuICAgIHN0b3Aoc291bmROYW1lKSB7XG4gICAgICAgIGlmKENvbmZpZy5ESVNBQkxFX0FVRElPKSByZXR1cm47XG4gICAgICAgIGxldCBzb3VuZCA9IHRoaXMuX3NvdW5kcy5nZXQoc291bmROYW1lKTtcbiAgICAgICAgc291bmQuc3RvcCgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbG9hZFdvcmtlcih3b3JrZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBXb3JrZXIoYC4vZGlzdC93b3JrZXJzLyR7d29ya2VyfS5qc2ApO1xuICAgIH1cblxuICAgIHN0YXRpYyBsaW1pdGxvb3AoZm4sIGZwcykge1xuICAgICAgICAvLyBVc2UgdmFyIHRoZW4gPSBEYXRlLm5vdygpOyBpZiB5b3VcbiAgICAgICAgLy8gZG9uJ3QgY2FyZSBhYm91dCB0YXJnZXR0aW5nIDwgSUU5XG4gICAgICAgIHZhciB0aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gY3VzdG9tIGZwcywgb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIDYwXG4gICAgICAgIGZwcyA9IGZwcyB8fCA2MDtcbiAgICAgICAgdmFyIGludGVydmFsID0gMTAwMCAvIGZwcztcblxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodGltZSl7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cbiAgICAgICAgICAgIC8vIGFnYWluLCBEYXRlLm5vdygpIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPiBpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lXG4gICAgICAgICAgICAgICAgLy8gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpIGlzIGFuIGltcHJvdmVtZW50IG92ZXIganVzdCBcbiAgICAgICAgICAgICAgICAvLyB1c2luZyB0aGVuID0gbm93LCB3aGljaCBjYW4gZW5kIHVwIGxvd2VyaW5nIG92ZXJhbGwgZnBzXG4gICAgICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChkZWx0YSAlIGludGVydmFsKTtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIGZuXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgwKSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhc3BlY3RIZWlnaHRDYWxjKHcyKSB7XG4gICAgICAgIGxldCB3MSA9IDE5MjA7XG4gICAgICAgIGxldCBoMSA9IDEwODA7XG4gICAgICAgIHJldHVybiBoMSp3Mi93MTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VRdWVyeShzZWFyY2gpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBzZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XG5cbiAgICAgICAgdmFyIGFyZ3NQYXJzZWQgPSB7fTtcblxuICAgICAgICB2YXIgaSwgYXJnLCBrdnAsIGtleSwgdmFsdWU7XG5cbiAgICAgICAgZm9yIChpPTA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgICAgIGlmICgtMSA9PT0gYXJnLmluZGV4T2YoJz0nKSkge1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtkZWNvZGVVUklDb21wb25lbnQoYXJnKS50cmltKCldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAga3ZwID0gYXJnLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzBdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMV0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NQYXJzZWQ7XG4gICAgfVxuXG4gICAgLy8gR29vZGVub3VnaCBVVUlEP1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA3MjY5MDkvcmFuZG9tLWFscGhhLW51bWVyaWMtc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICByYW5kb21TdHJpbmcobGVuZ3RoLCBjaGFycykge1xuICAgICAgICBpZighY2hhcnMpIHtcbiAgICAgICAgICAgIGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGg7IGkgPiAwOyAtLWkpIHJlc3VsdCArPSBjaGFyc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoY2hhcnMubGVuZ3RoIC0gMSkpXTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG4vLyBJbXBvcnQgU2VydmljZXNcbmltcG9ydCBJbnB1dFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UnO1xuaW1wb3J0IE1vYmlsZUlucHV0U2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9Nb2JpbGVJbnB1dFNlcnZpY2UnO1xuaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IE1lc3NhZ2UgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IFNvdW5kU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9Tb3VuZFNlcnZpY2UnO1xuXG4vLyBJbXBvcnQgdmlld3NcbmltcG9ydCBQbGF5ZXJWaWV3ICAgZnJvbSAnLi9QbGF5ZXJWaWV3JztcbmltcG9ydCBFbmVteVZpZXcgICAgZnJvbSAnLi9FbmVteVZpZXcnO1xuaW1wb3J0IFJvb21WaWV3ICAgICBmcm9tICcuL1Jvb21WaWV3JztcbmltcG9ydCBNYWluTWVudVZpZXcgZnJvbSAnLi9NYWluTWVudVZpZXcnO1xuaW1wb3J0IExvYmJ5VmlldyAgICBmcm9tICcuL0xvYmJ5Vmlldyc7XG5pbXBvcnQgVWlWaWV3ICAgICAgIGZyb20gJy4vVWlWaWV3JztcbmltcG9ydCBEZWJ1Z1ZpZXcgICAgZnJvbSAnLi9EZWJ1Z1ZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZGlzcGF0Y2hlcikge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG5cbiAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKiBAdG9kbzogZG9lcyB0aGlzIGJlbG9uZyBoZXJlP1xuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0KGRpc3BhdGNoZXIsIGRhdGFTdG9yZSkge1xuICAgICAgICBkaXNwYXRjaGVyLm9ubWVzc2FnZSA9IHRoaXMuaGFuZGxlTWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLl9kYXRhU3RvcmUgPSBkYXRhU3RvcmU7XG5cbiAgICAgICAgLy90aGlzLl9kZWJ1Z1ZpZXcgPSBuZXcgRGVidWdWaWV3KGdhbWUpO1xuXG4gICAgICAgIHRoaXMuX2lucHV0U2VydmljZSA9IG5ldyBJbnB1dFNlcnZpY2UoKTtcbiAgICAgICAgdGhpcy5fbW9iaWxlSW5wdXRTZXJ2aWNlID0gbmV3IE1vYmlsZUlucHV0U2VydmljZSgpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVySW5wdXRIYW5kbGVycyh0aGlzLl9pbnB1dFNlcnZpY2UpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVySW5wdXRIYW5kbGVycyh0aGlzLl9tb2JpbGVJbnB1dFNlcnZpY2UpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBBdHRhY2ggcmVzaXplIGV2ZW50XG4gICAgICAgIC8vd2luZG93LnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMuX21haW5NZW51VmlldyA9IG5ldyBNYWluTWVudVZpZXcoZGF0YVN0b3JlLm1haW5NZW51LCB0aGlzKTtcblxuICAgICAgICB0aGlzLl92aWV3cy5hZGQodGhpcy5fbWFpbk1lbnVWaWV3KTtcblxuICAgICAgICAvLyBTdGFydCByZW5kZXIgbG9vcFxuICAgICAgICB0aGlzLnN0YXJ0UmVuZGVyKCk7XG59XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGUgbWVzc2FnZXMgZnJvbSBEaXNwYXRjaGVyXG4gICAgICovXG4gICAgaGFuZGxlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIlZpZXcgcmVjaWV2ZWQgbWVzc2FnZSBmcm9tIERpc3BhdGNoZXJcIik7XG4gICAgICAgIGxldCBkZWNvZGVkTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICAgIExvZ2dlci5sb2coZGVjb2RlZE1lc3NhZ2UpO1xuICAgICAgICBsZXQgZnJvbSAgPSBkZWNvZGVkTWVzc2FnZS5mcm9tO1xuICAgICAgICBsZXQgZXZlbnQgPSBkZWNvZGVkTWVzc2FnZS5ldmVudDtcbiAgICAgICAgbGV0IGRhdGEgID0gZGVjb2RlZE1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBzd2l0Y2goZXZlbnQpIHtcbiAgICAgICAgICAgIGNhc2UgXCJnYW1lLXN0YXRlXCI6XG4gICAgICAgICAgICAgICAgaWYoZGF0YSA9PT0gXCJsb2JieVwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5VmlldyA9IG5ldyBMb2JieVZpZXcoZGF0YVN0b3JlLmxvYmJ5LCB0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3XG4gICAgICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkYXRhID09PSBcInBsYXlpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcmVzb3VyY2VQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICByZXNvdXJjZVByb21pc2VzLnB1c2godGhpcy5fcm9vbVZpZXcubG9hZFJlc291cmNlcygpKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fZGF0YVN0b3JlLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJWaWV3ID0gbmV3IFBsYXllclZpZXcocGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzLnNldChwbGF5ZXIuaWQsIHBsYXllclZpZXcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb3VyY2VQcm9taXNlcy5wdXNoKHBsYXllclZpZXcubG9hZFJlc291cmNlcygpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldyA9IG5ldyBVaVZpZXcodGhpcy5fZGF0YVN0b3JlLl91aSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlUHJvbWlzZXMucHVzaCh0aGlzLl91aVZpZXcubG9hZFJlc291cmNlcygpKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UgPSBuZXcgU291bmRTZXJ2aWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc291cmNlUHJvbWlzZXMucHVzaCh0aGlzLl9zb3VuZFNlcnZpY2UubG9hZFJlc291cmNlcygpKTtcblxuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChyZXNvdXJjZVByb21pc2VzKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLl9wbGF5ZXJWaWV3cy52YWx1ZXMoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlld1xuICAgICAgICAgICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImR1bmdlb24tdGhlbWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJyb29tLWNyZWF0ZVwiOiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcgPSBuZXcgUm9vbVZpZXcodGhpcy5fZGF0YVN0b3JlLnJvb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2NvZGV0aGVvcnkuaW4vY29udHJvbGxpbmctdGhlLWZyYW1lLXJhdGUtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGRlbHRhID0gbm93IC0gdGhpcy50aGVuO1xuXG4gICAgICAgIC8vIElmIHRoZSBmcHMgaW50ZXJ2YWwgaXMgY29ycmVjdFxuICAgICAgICBpZiAoZGVsdGEgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGltZSBzaW5jZSBsYXN0IGZyYW1lXG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZGVsdGEgJSB0aGlzLmludGVydmFsKTtcblxuICAgICAgICAgICAgLy8gU2V0IHVwIFJlbmRlcmluZ1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB0aGlzLl9mcmFtZSB8fCAxO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSAodGhpcy5fZnJhbWUlQ29uZmlnLkZQUykgPyB0aGlzLl9mcmFtZSA6IDE7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBnYW1lXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLl9mcmFtZSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBuZXh0IHJlbmRlciBjeWNsZVxuICAgICAgICAgICAgbGV0IHRpbWVfZWwgPSAodGhpcy50aGVuIC0gdGhpcy5maXJzdCkvMTAwMDtcbiAgICAgICAgICAgICsrdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgdGhpcy5fZnBzID0gcGFyc2VJbnQodGhpcy5jb3VudGVyL3RpbWVfZWwpO1xuXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgRnJhbWVcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoZnJhbWUpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoICAgICAgICAgICAgICA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgICAgICAgICAgICAgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICBmb3IobGV0IHZpZXcgb2YgdGhpcy5fdmlld3MpICB7XG4gICAgICAgICAgICB2aWV3LnJlbmRlcih0aGlzLl9jdHgsIGZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vdGhpcy5fZGVidWdWaWV3LnJlbmRlcih0aGlzLl9jdHgsIGZyYW1lLCB0aGlzLl9mcHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEtpY2sgb2ZmIHRoZSByZW5kZXIgbG9vcFxuICAgICAqL1xuICAgIHN0YXJ0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLl9yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBpbnB1dCB0byBhbHRlciB2aWV3IGFuZCBzZWUgaWYgd2UgbmVlZCB0byBzZW5kIGVudmVudHNcbiAgICAgKi9cbiAgICByZWdpc3RlcklucHV0SGFuZGxlcnMoaW5wdXQpIHtcbiAgICAgICAgLy8gVXAgaW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJ1cFwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2RhdGFTdG9yZS5nYW1lLnN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy51cCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIERvd24gSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJkb3duXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZGF0YVN0b3JlLmdhbWUuc3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcuZG93bigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcuZG93bigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExlZnQgSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJsZWZ0XCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZGF0YVN0b3JlLmdhbWUuc3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5sZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5sZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmlnaHQgSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJyaWdodFwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2RhdGFTdG9yZS5nYW1lLnN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb2JieVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcucmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LnJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29uZmlybSBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImNvbmZpcm1cIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9kYXRhU3RvcmUuZ2FtZS5zdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFpbiBtZW51XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51Vmlldy5jb25maXJtKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3LmNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LXNlbGVjdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJhY2sgSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJiYWNrXCIsICgpPT57XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW5wdXQub24oXCJkZWJ1Z1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGVidWdWaWV3LnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuX3Nob3cgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5fc2hvdyA9ICF0aGlzLl9zaG93O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lLCBmcHMpIHtcbiAgICAgICAgaWYodGhpcy5fc2hvdykge1xuICAgICAgICAgICAgLy8gU2hvdyBGUFNcbiAgICAgICAgICAgIGxldCBmb250U2l6ZSAgICAgICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgbGV0IGxpbmUgPSAyMDtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGZyYW1lICsgXCIvXCIgKyBDb25maWcuRlBTICsgXCIgXCIgKyBmcHMgKyBcImZwc1wiLCAyMCwgbGluZSk7XG5cbiAgICAgICAgICAgIGxpbmUgKz0gZm9udFNpemU7XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIlBsYXllcnM6XCIsIDIwLCBsaW5lKTtcblxuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgZ2FtZS5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgbGluZSArPSBmb250U2l6ZTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQocGxheWVyLm5hbWUsIDQwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBsaW5lICs9IGZvbnRTaXplO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIkFjdGlvbiBDeWNsZTogXCIgKyBwbGF5ZXIuYWN0aW9uQ3ljbGUsIDYwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBsaW5lICs9IGZvbnRTaXplO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIkN1cnJlbnQgQWN0aW9uOiBcIiArIHBsYXllci5jdXJyZW50QWN0aW9uLmdldChcImFjdGlvblwiKSwgNjAsIGxpbmUpO1xuICAgICAgICAgICAgICAgIGxpbmUgKz0gZm9udFNpemU7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiTmV4dCBBY3Rpb246IFwiICsgKHBsYXllci5uZXh0QWN0aW9uID8gcGxheWVyLm5leHRBY3Rpb24uZ2V0KFwiYWN0aW9uXCIpIDogXCJOT05FXCIpLCA2MCwgbGluZSk7XG4gICAgICAgICAgICAgICAgbGluZSArPSBmb250U2l6ZTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJDdXJyZW50IFN0YXRlOiBcIiArIHBsYXllci5jdXJyZW50U3RhdGUsIDYwLCBsaW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IoZW5lbXkpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLl9lbmVteSA9IGVuZW15O1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpdGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6ICd3dXJtLXNoZWV0LnBuZycsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc3ByaXRlLFxuICAgICAgICAgICAgc3ByaXRlLndpZHRoLzMqdGhpcy5mcmFtZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIDEwLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBNZXNzYWdlICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTWVzc2FnZSc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5pbXBvcnQgUGxheWVyICAgICAgICAgIGZyb20gJy4uL21vZGVscy9vYmplY3RzL1BsYXllcic7XG5cbmxldCBqb2JEaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+U2VsZWN0IEpvYjwvaDM+XG4gICAgICAgIDxsYWJlbD5Kb2I6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgbmFtZT1cImpvYlwiPlxuICAgICAgICA8L3NlbGVjdD48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNvbmZpcm1cIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihsb2JieSwgdmlldykge1xuICAgICAgICBzdXBlcihsb2JieSk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ID0gbG9iYnk7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlhbG9nT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9wZW5Kb2JEaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGpvYkRpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgbGV0IGNvbmZpcm1CdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjb25maXJtXCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IGpvYlNlbGVjdCA9IGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJqb2JcIl0nKTtcblxuICAgICAgICBmb3IobGV0IGpvYiBvZiBQbGF5ZXIuZ2V0Sm9icygpKSB7XG4gICAgICAgICAgICBsZXQgam9iT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgIGpvYk9wdGlvbi52YWx1ZSA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iT3B0aW9uLmlubmVySFRNTCA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iU2VsZWN0LmFwcGVuZENoaWxkKGpvYk9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogKCk9PntcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoam9iU2VsZWN0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcucG9zdE1lc3NhZ2UobmV3IE1lc3NhZ2UoMCwgXCJwbGF5ZXItam9iXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiam9iXCI6IGpvYlNlbGVjdC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogdmlldy5fZGF0YVN0b3JlLl9sb2NhbFBsYXllci5pZFxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeFBvcyA9IDEwMDtcbiAgICAgICAgbGV0IHlQb3MgPSAxMDA7XG5cbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiTkFNRTpcIiwgMTAwLCB5UG9zKTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiSk9COlwiLCAzMDAsIHlQb3MpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJSRUFEWTpcIiwgNTAwLCB5UG9zKTtcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoOTAsIDExMCwgNjAwLCAxODApO1xuXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMuX3ZpZXcuX2RhdGFTdG9yZS5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgeVBvcyArPSA0MDtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChwbGF5ZXIubmFtZSwgMTAwLCB5UG9zKTtcblxuICAgICAgICAgICAgaWYocGxheWVyLmpvYikge1xuICAgICAgICAgICAgICAgIGxldCBqb2JOYW1lID0gcGxheWVyLmpvYi5uYW1lWzBdLnRvVXBwZXJDYXNlKCkgKyBwbGF5ZXIuam9iLm5hbWUuc2xpY2UoMSk7O1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChqb2JOYW1lLCAzMDAsIHlQb3MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihwbGF5ZXIuc3RhdGUgPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIk5PVCBSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgeFBvcywgMzIwKTtcbiAgICAgICAgICAgIHhQb3MgKz0gMjAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgbGVmdCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgtLTtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgrKztcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiU2VsZWN0IEpvYlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSm9iRGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJMZWF2ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJsZWF2ZS1nYW1lXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiUmVhZHlcIiAmJiB0aGlzLl92aWV3Ll9kYXRhU3RvcmUuX2xvY2FsUGxheWVyLmpvYikge1xuICAgICAgICAgICAgICAgIGxldCBzdGF0ZSA9IHRoaXMuX3ZpZXcuX2RhdGFTdG9yZS5fbG9jYWxQbGF5ZXIuc3RhdGUgPT09IFwiaWRsZVwiID8gXCJyZWFkeVwiIDogXCJpZGxlXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5wb3N0TWVzc2FnZShuZXcgTWVzc2FnZSgwLCBcInBsYXllci1zdGF0ZVwiLCB7XG4gICAgICAgICAgICAgICAgICAgIFwic3RhdGVcIjogc3RhdGUsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5fdmlldy5fZGF0YVN0b3JlLl9sb2NhbFBsYXllci5pZFxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgIH1cblxuXG5cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyAgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IExvZ2dlciAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IE1lc3NhZ2UgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9NZXNzYWdlJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxubGV0IGhvc3REaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+SG9zdCBNdWx0aXBsYXllciBHYW1lPC9oMz5cbiAgICAgICAgPGxhYmVsPk5hbWU6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCI+XG4gICAgICAgIDxsYWJlbD5JZCAob3B0aW9uYWwpOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiPjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiaG9zdFwiIGRpc2FibGVkPkhvc3Q8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5sZXQgam9pbkRpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5Kb2luIE11bHRpcGxheWVyIEdhbWU8L2gzPlxuICAgICAgICA8bGFiZWw+TmFtZTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIj5cbiAgICAgICAgPGxhYmVsPkhvc3QgSWQ6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJob3N0XCI+XG4gICAgICAgIDxsYWJlbD5JZCAob3B0aW9uYWwpOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiPjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiam9pblwiIGRpc2FibGVkPkpvaW48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKG1haW5NZW51LCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKG1haW5NZW51KTtcbiAgICAgICAgdGhpcy5fbWFpbk1lbnUgPSBtYWluTWVudTtcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9kaWFsb2dPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSAxMDA7XG4gICAgICAgIGxldCB5UG9zID0gMTAwO1xuXG4gICAgICAgIGZvcihsZXQgbWVudU9wdGlvbiBvZiB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgICAgbGV0IG1lbnVPcHRpb25UZXh0ID0gbWVudU9wdGlvbjtcblxuICAgICAgICAgICAgLy8gU2hvdyBzZWxlY3QgY3Vyc29yXG4gICAgICAgICAgICBpZihtZW51T3B0aW9uVGV4dCA9PSB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XSlcbiAgICAgICAgICAgICAgICBtZW51T3B0aW9uVGV4dCA9IFwiPiBcIiArIG1lbnVPcHRpb25UZXh0O1xuXG4gICAgICAgICAgICAvLyBEcmF3IE1lbnUgT3B0aW9uXG4gICAgICAgICAgICBjdHguZmlsbFRleHQobWVudU9wdGlvblRleHQsIDEwMCwgeVBvcyk7XG4gICAgICAgICAgICB5UG9zICs9IDEwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdO1xuICAgIH1cblxuICAgIG9wZW5Ib3N0RGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhob3N0RGlhbG9nLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2MuZmlyc3RDaGlsZDtcblxuICAgICAgICBsZXQgaG9zdEJ1dHRvbiAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImhvc3RcIl0nKTtcbiAgICAgICAgbGV0IGNhbmNlbEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjYW5jZWxcIl0nKTtcblxuICAgICAgICBsZXQgbmFtZUlucHV0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBsZXQgaWRJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaWRcIl0nKTtcblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIG5hbWVJbnB1dC5vbmlucHV0ID0gKCk9PntcbiAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBob3N0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3N0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9kaWFsb2cgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgwLCBcImdhbWUtaG9zdFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogbmFtZUlucHV0LnZhbHVlLnRyaW0oKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5faWRcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb3BlbkpvaW5EaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGpvaW5EaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG5cbiAgICAgICAgbGV0IGpvaW5CdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJqb2luXCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IG5hbWVJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBsZXQgaG9zdElucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJob3N0XCJdJyk7XG4gICAgICAgIGxldCBpZElucHV0ICAgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImlkXCJdJyk7XG5cbiAgICAgICAgdmlldy5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICBsZXQgY2hlY2tJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSAmJiBob3N0SW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgam9pbkJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgam9pbkJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbmFtZUlucHV0Lm9uaW5wdXQgPSBjaGVja0lucHV0LmJpbmQodGhpcyk7XG4gICAgICAgIGhvc3RJbnB1dC5vbmlucHV0ID0gY2hlY2tJbnB1dC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBqb2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSAmJiBob3N0SW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcucG9zdE1lc3NhZ2UobmV3IE1lc3NhZ2UoMCwgXCJnYW1lLWpvaW5cIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9zdElkOiBob3N0SW5wdXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgaWYoIXRoaXMuX2RpYWxvZylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID8gMCA6IDE7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJIb3N0IEdhbWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbkhvc3REaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkpvaW5EaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZygpO1xuICAgIH1cblxuXG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICB0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgbG9hZFJlc291cmNlKG5hbWUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzLycgKyByZXNvdXJjZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcmVzb3VyY2UgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChuYW1lLCBpbWcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhbGwgcmVzb3VyY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG9iamVjdFxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZVByb21pc2VzID0gW107XG4gICAgICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VydmljZS5sb2FkSW1hZ2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBQcm9taXNlLmFsbChyZXNvdXJjZVByb21pc2VzKS50aGVuKChpbWFnZXMpPT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KGltYWdlLm5hbWUsIGltYWdlLmltYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIFByb21pc2VcbiAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxubGV0IEpPQl9TUFJJVEVTID0ge1xuICAgIFwiY2xhaXJ2b3lhbnRcIjogXCJjbGFpcnZveWFudC1zaGVldC5wbmdcIixcbiAgICBcImhlcmJhbGlzdFwiOiBcImhlcmJhbGlzdC1zaGVldC5wbmdcIixcbiAgICBcInZpbGxhaW5cIjogXCJ2aWxsYWluMi1zaGVldC5wbmdcIixcbiAgICBcImtuaWdodFwiOiBcImtuaWdodC1zaGVldC5wbmdcIixcbiAgICBcIm5lY3JvbWFuY2VyXCI6IFwibmVjcm9tYW5jZXItc2hlZXQucG5nXCIsXG4gICAgXCJuaW5qYVwiOiBcIm5pbmphLXNoZWV0LnBuZ1wiXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgICAgICBzdXBlcihwbGF5ZXIpO1xuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNwcml0ZVwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogSk9CX1NQUklURVNbcGxheWVyLmpvYi5uYW1lXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic2hhZG93XCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInNoYWRvdy5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnViYmxlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcImJ1YmJsZS5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgbGV0IHBsYXllcldpZHRoICA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIGxldCB4T2Zmc2V0ICAgICAgPSB0aGlzLl9wbGF5ZXIueFBvcypDb25maWcuVElMRV9TSVpFO1xuICAgICAgICBsZXQgeU9mZnNldCAgICAgID0gdGhpcy5fcGxheWVyLnlQb3MqQ29uZmlnLlRJTEVfU0laRTtcblxuICAgICAgICBsZXQgc2hhZG93ICAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93Jyk7XG5cbiAgICAgICAgbGV0IGJ1YmJsZSAgICAgICA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2J1YmJsZScpO1xuICAgICAgICBsZXQgYnViYmxlV2lkdGggID0gYnViYmxlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGxldCBidWJibGVIZWlnaHQgPSBidWJibGUuaGVpZ2h0LzUqQ29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgICAgICAvLyBEcmF3IFNoYWRvd1xuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNoYWRvdyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHNoYWRvdy53aWR0aCwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCwgLy8gc3ggfiBSZXBsYWNlIHdpdGggcGxheWVyIFggUG9zXG4gICAgICAgICAgICB5T2Zmc2V0ICsgKHBsYXllcldpZHRoKSAtIChDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpLmhlaWdodC8xLjc1KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggcGxheWVyIFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICBsZXQgYW5pbWF0aW9uRnJhbWUgPSAwO1xuXG4gICAgICAgIGlmKHRoaXMuX3BsYXllci5zdGF0ZSA9PT0gXCJ3YWxraW5nXCIpIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lID0gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuX3BsYXllci5jdXJyZW50U3RhdGUgPT09IFwiYXR0YWNraW5nXCIpIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lID0gQ29uZmlnLlNQUklURV9TSVpFKjI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEcmF3IFBsYXllciBTcHJpdGVcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKSxcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lLFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHhPZmZzZXQsIC8veE9mZnNldCwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICB5T2Zmc2V0LCAvL3lPZmZzZXQsIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgcGxheWVyV2lkdGgsIC8vIHNXaWR0aFxuICAgICAgICAgICAgcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gRHJhdyBCdWJibGVcbiAgICAgICAgbGV0IGJ1YmJsZU9mZnNldCA9IDA7XG5cbiAgICAgICAgc3dpdGNoKHRoaXMuX3BsYXllci5hY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ0aGlua2luZ1wiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXR0YWNrXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRlZmVuZFwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSoyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhYmlsaXR5XCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9wbGF5ZXIuYWN0aW9uICE9PSBcIndhbGtcIlxuICAgICAgICAgICAgJiYgdGhpcy5fcGxheWVyLmFjdGlvbiAhPT0gXCJyZWFkeVwiXG4gICAgICAgICAgICAmJiB0aGlzLl9wbGF5ZXIuc3RhdGUgIT09IFwid2Fsa2luZ1wiXG4gICAgICAgICAgICAmJiB0aGlzLl9wbGF5ZXIuc3RhdGUgIT09IFwiYXR0YWNraW5nXCIpIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ2J1YmJsZScpLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0LCAvLyBEWVxuICAgICAgICAgICAgICAgIGJ1YmJsZS53aWR0aCwgIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgIGJ1YmJsZS5oZWlnaHQvNSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgIHhPZmZzZXQgLSAoYnViYmxlV2lkdGgvMS41KSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAgICAgeU9mZnNldCAtIChidWJibGVIZWlnaHQvMS41KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAgICAgYnViYmxlV2lkdGgsICAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGVIZWlnaHQgIC8vIHNIZWlnaHRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuLy8gU3RhdGljIFJvb20gVHlwZXNcbi8vc3RhdGljIGdldCBUWVBFX0NBVkUoKSB7XG4gICAgLy9yZXR1cm4ge1xuICAgICAgICAvL2Zsb29yOiAnZ29vZHRpbGUucG5nJyxcbiAgICAgICAgLy93YWxsOiAnc2hpdHdhbGwucG5nJ1xuICAgIC8vfTtcbi8vfVxuXG4vL3N0YXRpYyBnZXQgVFlQRV9URU1QTEUoKSB7XG4gICAgLy9yZXR1cm4ge1xuICAgICAgICAvL2Zsb29yOiAnZ3Jhc3MucG5nJyxcbiAgICAgICAgLy93YWxsOiAncGlsbGFycy5wbmcnXG4gICAgLy99O1xuLy99XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3Iocm9vbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9yb29tID0gcm9vbTtcbiAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICA9IDA7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImZsb29yXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcImdvb2R0aWxlLnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ3YWxsXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInNoaXR3YWxsMi5wbmdcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoXCJmbG9vclwiLCBcImdvb2R0aWxlLnBuZ1wiKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwid2FsbFwiLCAgXCJzaGl0d2FsbDIucG5nXCIpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGlmKGZyYW1lJTQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZSA9IHRoaXMuZnJhbWUgPyAwIDogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbmRlciBGbG9vclxuICAgICAgICBsZXQgZmxvb3IgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdmbG9vcicpO1xuICAgICAgICBsZXQgZmxvb3JXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLlRJTEVfWCsxOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBDb25maWcuVElMRV9ZIC0gNDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgICAgIGZsb29yLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKyBmbG9vcldpZHRoKnggLSBmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICAoeSsyKSpmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXIgV2FsbFxuICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKTtcbiAgICAgICAgbGV0IHdhbGxXaWR0aCA9IHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHdhbGxXaWR0aCkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHdhbGwsXG4gICAgICAgICAgICAgICAgMCwgLy8gRFhcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yKnRoaXMuZnJhbWUsIC8vRFlcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArIHdhbGxXaWR0aCp4IC0gd2FsbFdpZHRoLCAvL3N4XG4gICAgICAgICAgICAgICAgMCwgLy9zeVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFLzJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIE9mZnNldHNcbiAgICAgICAgbGV0IHhTdGVwID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMjQ7XG4gICAgICAgIGlmKHRoaXMuX3Jvb20uc3RhdGUgPT09IFwibW92aW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fZmxvb3JPZmZzZXQgPj0gZmxvb3JXaWR0aCAtIDEpIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX3dhbGxPZmZzZXQgPiB3YWxsV2lkdGggLSAxKSB0aGlzLl93YWxsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBMb2dnZXIgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBNZXNzYWdlICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL01lc3NhZ2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHVpLCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3VpICAgICAgICAgPSB1aTtcbiAgICAgICAgdGhpcy5fdmlldyAgICAgICA9IHZpZXc7XG5cbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDI7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImJnXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInVpLWJnLnBuZ1wiLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubG9hZFJlc291cmNlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgbGV0IHlQb3MgPSBDb25maWcuVElMRV9TSVpFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuXG4gICAgICAgIC8vIERyYXcgQmFja2dyb3VuZFxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGxldCBiZ1JlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeVBvcyxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0IC0gMzAwXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IHVpUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB5UG9zLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLi4uYmdSZWN0KTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCIjNjRBMzU3XCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCIjMDAzNzAwXCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCguLi51aVJlY3QpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzhEODA0NVwiO1xuXG4gICAgICAgIC8vIFRoZSBzdHJva2UgaXMgbWlkZGxlIGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGJveFxuICAgICAgICBsZXQgbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMzI7XG4gICAgICAgIC8vbGV0IGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIHN0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIEZpbGwgYmcgd2l0aCBwYXRlcm5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBsZXQgcGF0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5fcmVzb3VyY2VzLmdldChcImJnXCIpLCBcInJlcGVhdFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdGVybjtcbiAgICAgICAgY3R4LnJlY3QoLi4uc3Ryb2tlUmVjdCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgeVBvcyArPSBDb25maWcuVElMRV9TSVpFLzM7XG5cbiAgICAgICAgbGV0IGZvbnRTaXplICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBjdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcblxuICAgICAgICBsZXQgeFBvcyA9IENvbmZpZy5USUxFX1NJWkUqMS4yO1xuXG4gICAgICAgIGlmKHRoaXMuX3ZpZXcuX2RhdGFTdG9yZS5fbG9jYWxQbGF5ZXIuc3RhdGUgPT09IFwiaWRsZVwiKSB7XG4gICAgICAgICAgICAvLyBEcmF3IEluZm9cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1swXSxcbiAgICAgICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgICAgIHlQb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMV0sXG4gICAgICAgICAgICAgICAgeFBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5UG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzJdLFxuICAgICAgICAgICAgICAgIHhQb3MsXG4gICAgICAgICAgICAgICAgeVBvcyArIGZvbnRTaXplKjJcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMyA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbM10sXG4gICAgICAgICAgICAgICAgeFBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5UG9zICsgZm9udFNpemUqMlxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICB4UG9zID0gQ29uZmlnLlRJTEVfU0laRSo1O1xuICAgICAgICB5UG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICBsZXQgcGxheWVycyA9IHRoaXMuX3ZpZXcuX2RhdGFTdG9yZS5wbGF5ZXJzLnZhbHVlcygpO1xuICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEluZm9cbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgcGxheWVycykge1xuICAgICAgICAgICAgeVBvcyArPSBmb250U2l6ZSoyO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBOYW1lc1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgICAgIHlQb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgY29vbGRvd24gdmFyc1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFyWVBvcyAgID0geVBvcyArIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJXaWR0aCAgPSBDb25maWcuVElMRV9TSVpFO1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFySGVpZ2h0ID0gZm9udFNpemUvMjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBDb29sZG93biBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDBGRjAwXCI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25QZXJjZW50YWdlID0gcGxheWVyLmNvb2xkb3duL3BsYXllci5tYXhDb29sZG93bjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4UG9zLCBjb29sZG93bkJhcllQb3MsIGNvb2xkb3duQmFyV2lkdGgqY29vbGRvd25QZXJjZW50YWdlLCBjb29sZG93bkJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgQ29vbGRvd24gU3Ryb2tlXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggICA9IDEqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHhQb3MsIGNvb2xkb3duQmFyWVBvcywgY29vbGRvd25CYXJXaWR0aCwgY29vbGRvd25CYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgSGVhbHRoYmFyIHZhcnNcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJYUG9zICAgPSB4UG9zICsgQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcllQb3MgICA9IHlQb3MgLSBmb250U2l6ZS8yO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcldpZHRoICA9IENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJIZWlnaHQgPSBmb250U2l6ZS8yO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoUGVyY2VudGFnZSA9IHBsYXllci5oZWFsdGgvcGxheWVyLm1heEhlYWx0aDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCpoZWFsdGhQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLmhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGhlYWx0aEJhcllQb3MgKz0gaGVhbHRoQmFySGVpZ2h0KjEuNTtcblxuICAgICAgICAgICAgLy9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICAvL2N0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xuICAgICAgICAgICAgbGV0IG1hbmFQZXJjZW50YWdlID0gcGxheWVyLm1hbmEvcGxheWVyLm1heE1hbmE7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqbWFuYVBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIubWFuYX0vJHtwbGF5ZXIubWF4TWFuYX1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXAoKSB7XG4gICAgICAgIGlmKHRoaXMuX3ZpZXcuX2RhdGFTdG9yZS5fbG9jYWxQbGF5ZXIuc3RhdGUgPT09IFwiaWRsZVwiKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDApXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDEpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDM7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMpXG4gICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDE7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkb3duKCkge1xuICAgICAgICB0aGlzLnVwKCk7XG4gICAgfVxuXG4gICAgbGVmdCgpIHtcbiAgICAgICAgaWYodGhpcy5fdmlldy5fZGF0YVN0b3JlLl9sb2NhbFBsYXllci5zdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSlcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMilcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJpZ2h0KCkge1xuICAgICAgICB0aGlzLmxlZnQoKTtcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZih0aGlzLl92aWV3Ll9kYXRhU3RvcmUuX2xvY2FsUGxheWVyLnN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRPcHRpb24gPSB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcblxuICAgICAgICAgICAgLy9sZXQgYWN0aW9uID0gSW1tdXRhYmxlLk1hcCh7XG4gICAgICAgICAgICAgICAgLy9cImN5Y2xlXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuYWN0aW9uQ3ljbGUsXG4gICAgICAgICAgICAgICAgLy9cImFjdGlvblwiOiB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XSxcbiAgICAgICAgICAgICAgICAvL1widGFyZ2V0XCI6IDBcbiAgICAgICAgICAgIC8vfSk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSgwLCBcInBsYXllci1hY3Rpb25cIiwge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5fdmlldy5fZGF0YVN0b3JlLl9sb2NhbFBsYXllci5pZCxcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fdmlldy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcblxuICAgICAgICAgICAgLy9pZighSW1tdXRhYmxlLmlzKGFjdGlvbiwgdGhpcy5fdmlldy5fZ2FtZS5sb2NhbFBsYXllci5jdXJyZW50QWN0aW9uKSkge1xuICAgICAgICAgICAgICAgIC8vbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIC8vXCJldmVudFwiOiBcInBsYXllci1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgLy9cImZyb21cIjogdGhpcy5fdmlldy5fZ2FtZS5sb2NhbFBsYXllci5pZCxcbiAgICAgICAgICAgICAgICAgICAgLy9cImRhdGFcIjogYWN0aW9uXG4gICAgICAgICAgICAgICAgLy99XG5cbiAgICAgICAgICAgICAgICAvL3RoaXMuX3ZpZXcucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICAvL31cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
