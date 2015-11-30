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
    config.FPS = 30;
};

config.calculate();

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

var _modelsGame = require('./models/Game');

var _modelsGame2 = _interopRequireDefault(_modelsGame);

// Import View

var _viewsCanvas2d = require('./views/Canvas2d');

var _viewsCanvas2d2 = _interopRequireDefault(_viewsCanvas2d);

// Import Dispatcher

var _dispatcherDispatcher = require('./dispatcher/Dispatcher');

var _dispatcherDispatcher2 = _interopRequireDefault(_dispatcherDispatcher);

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);

        this._game = new _modelsGame2['default']();
        this._view = new _viewsCanvas2d2['default']();
        this._dispatcher = new _dispatcherDispatcher2['default']();

        window.game = this._game;
        window.view = this._view;
        window.dispatcher = this._dispatcher;
    }

    /**
     * Initialize the engine
     */

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            Promise.all([this._game.init(this._dispatcher), this._view.init(this._game), this._dispatcher.init(this._view)]).then(function () {
                _this._dispatcher.postMessage({ "event": "game-start" });
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../Config":2,"./dispatcher/Dispatcher":4,"./models/Game":8,"./views/Canvas2d":22}],4:[function(require,module,exports){
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
            this._view = view;
            this._view.onmessage = this.handleViewMessages.bind(this);

            // Initialize simulation loop
            this._simulationWorker = _servicesUtils2['default'].loadWorker("SimulationWorker");
            this._simulationWorker.onmessage = this.handleSimulationMessages.bind(this);
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
            }
            // Init mp controller
            this._networkService = new (_bind.apply(_servicesNetworkService2['default'], [null].concat(_toConsumableArray(args))))();
            this._networkService.init().then(function () {

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
    }, {
        key: 'leaveGame',
        value: function leaveGame() {
            this._networkService.disconnect();
            this.postMessage({
                "event": "game-state",
                "data": "main menu"
            });
        }

        /**
         * When we get a peer connect event form the multiplayer controller, create a add player event
         */
    }, {
        key: 'peerConnect',
        value: function peerConnect(message) {
            _servicesLogger2['default'].debug("Dispatcher: Peer Connect Message");
            _servicesLogger2['default'].log(message);

            _servicesLogger2['default'].debug("Dispatcher: Broadcast Add Player Message");
            this.postMessage({
                "event": "add-player",
                "data": {
                    "id": message.from,
                    "name": message.data.name,
                    "job": message.data.job
                }
            });
        }

        /**
         * When we get a peer disconnect event form the multiplayer controller, create a remove player event
         */
    }, {
        key: 'peerDisconnect',
        value: function peerDisconnect(message) {
            _servicesLogger2['default'].debug("Dispatcher: Peer Disconnect Message");
            _servicesLogger2['default'].log(message);

            _servicesLogger2['default'].debug("Dispatcher: Broadcast Remove Player Message");
            this.postMessage({
                "event": "remove-player",
                "data": {
                    "id": message
                }
            });
        }

        /**
         * Register all multiplayer Events
         */
    }, {
        key: 'handleMultiplayerMessages',
        value: function handleMultiplayerMessages(message) {
            this.postMessage(message);
        }

        /**
         * Register all view messages
         */
    }, {
        key: 'handleViewMessages',
        value: function handleViewMessages(message) {
            var event = message.event;
            var data = message.data;

            if (event === "start-mp") {
                this.initMultiplayerGame(data);
            } else if (event === "leave-game") {
                this.leaveGame();
            } else {
                // Convert any Immutable data to JSON
                if (message.data && message.data.toJSON) message.data = data.toJSON();

                this.postMessage(message);
                this._networkService.broadcastMessage(message);
            }
        }

        /**
         * Register SimulationWorker messages
         */
    }, {
        key: 'handleSimulationMessages',
        value: function handleSimulationMessages(message) {
            if (message) {
                this.postMessage({
                    "event": "tick"
                });
            }
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../mixins/EventEmitter":5,"../services/Logger":16,"../services/NetworkService":17,"../services/Utils":21}],5:[function(require,module,exports){
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
      if (this.onmessage) this.onmessage(message);
    }
  }]);

  return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{}],6:[function(require,module,exports){
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
      if (this.onmessage) this.onmessage(message);
    }
  }]);

  return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
    }

    _createClass(_default, [{
        key: 'currentState',
        set: function set(state) {
            if (this._states.has(state)) {
                this._currentState = state;
            }
        },
        get: function get() {
            return this._currentState;
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../mixins/EventEmitter":5,"../services/Logger":16}],8:[function(require,module,exports){
// Import Mixins
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _mixinsEventEmitter = require('../mixins/eventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

// Import Utils

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesRng = require('../services/Rng');

var _servicesRng2 = _interopRequireDefault(_servicesRng);

// Import Models

var _BaseModel2 = require('./BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _objectsPlayer = require('./objects/Player');

var _objectsPlayer2 = _interopRequireDefault(_objectsPlayer);

var _objectsMonster = require('./objects/Monster');

var _objectsMonster2 = _interopRequireDefault(_objectsMonster);

var _objectsRoom = require('./objects/Room');

var _objectsRoom2 = _interopRequireDefault(_objectsRoom);

var _objectsMainMenu = require('./objects/MainMenu');

var _objectsMainMenu2 = _interopRequireDefault(_objectsMainMenu);

var _objectsLobby = require('./objects/Lobby');

var _objectsLobby2 = _interopRequireDefault(_objectsLobby);

var _objectsUi = require('./objects/Ui');

var _objectsUi2 = _interopRequireDefault(_objectsUi);

var _default = (function (_BaseModel) {
    _inherits(_default, _BaseModel);

    _createClass(_default, [{
        key: 'currentState',
        get: function get() {
            return this._currentState;
        }
    }, {
        key: 'mainMenu',
        get: function get() {
            return this._mainMenu;
        }
    }, {
        key: 'lobby',
        get: function get() {
            return this._lobby;
        }
    }, {
        key: 'players',
        get: function get() {
            return this._players;
        }
    }, {
        key: 'localPlayer',
        get: function get() {
            return this._localPlayer;
        }
    }, {
        key: 'room',
        get: function get() {
            return this._room;
        }
    }, {
        key: 'ui',
        get: function get() {
            return this._ui;
        }
    }]);

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);

        this._states = new Set(["main menu", "lobby", "playing"]);

        this._mainMenu = new _objectsMainMenu2['default']();
        this._lobby = new _objectsLobby2['default']();
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */

    _createClass(_default, [{
        key: 'init',
        value: function init(dispatcher) {
            var _this = this;

            return new Promise(function (res, rej) {
                _this._dispatcher = dispatcher;

                _this._players = new Map();

                // LISTEN FOR EVENTS
                //this.listenToDispatcher(this._dispatcher);
                _this._dispatcher.onmessage = _this.handleMessage.bind(_this);

                res();
            });
        }

        /**
         * Update the game state if its allowed
         * Make sure we emit it
         */
    }, {
        key: 'checkPlayerState',

        /**
         * Call this function after any playerstae change so we can decide what to do.
         */
        value: function checkPlayerState() {
            // If we are in the loby decide if we need to start the game
            if (this.currentState === "lobby") {
                var readyToStart = true;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var player = _step.value;

                        readyToStart = readyToStart && player.currentState === "ready";
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

                if (readyToStart) {
                    _servicesLogger2['default'].banner("STARTING GAME");
                    this._startPlaying();
                }
            }
        }
    }, {
        key: 'checkPlayerAction',
        value: function checkPlayerAction(p) {
            if (this.currentState === "playing") {
                if (this._room.currentState === "idle") {
                    var readyToMove = true;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.players.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var player = _step2.value;

                            readyToMove = readyToMove && player.currentAction.get("action") === "ready";
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

                    if (readyToMove) {
                        this._lookForTrouble();
                    }
                } else if (this._room.currentState === "battle") {
                    var actionName = p.currentAction.get("action");
                    if (actionName !== "thinking" && p.readyToAttack) {
                        this._playerAction(p);
                    }
                }
            }
        }
    }, {
        key: '_startPlaying',
        value: function _startPlaying() {
            // Create a room
            this._room = new _objectsRoom2['default']();
            this._ui = new _objectsUi2['default']();
            this.currentState = "playing";

            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.players.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var player = _step3.value;

                    player.currentState = "idle";
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
        key: '_lookForTrouble',
        value: function _lookForTrouble() {
            // Set room to moving
            this._room.currentState = "moving";
            this._moveTimer = 50;

            // Set players to walking
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.players.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var player = _step4.value;

                    player.resetActionCycle();
                    player.currentState = "walking";
                }

                // Create enemies
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                        _iterator4['return']();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            var enemy = new _objectsMonster2['default']();
            this.emit("add-enemy", enemy);

            this._enemies = new Set([enemy]);
        }
    }, {
        key: '_startBattle',
        value: function _startBattle() {
            var _this2 = this;

            this._room.currentState = "battle";
            this._ui.setBattleOptions();

            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                var _loop = function () {
                    var player = _step5.value;

                    player.beginCombat();

                    player.onCooldown = function () {
                        _this2.checkPlayerAction(player);
                        _this2.emit("player-cooldown", player);
                    };

                    player.chargeCooldown();
                };

                for (var _iterator5 = this.players.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                        _iterator5['return']();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            this.emit('start-battle');
        }
    }, {
        key: '_playerAction',
        value: function _playerAction(p) {
            var _this3 = this;

            var action = p.currentAction;
            if (action.get("action") === "attack") {
                p.walkForward(function () {
                    p.attack(function () {
                        _servicesLogger2['default'].debug("Game ATTACK");
                        _this3._combatPhase();
                        p.nextActionCycle();
                        p.walkBack(function () {
                            if (_this3._room.currentState === "idle") {
                                p.endCombat();
                            }
                        });
                    });
                });
            } else {
                p.nextActionCycle();
            }
        }
    }, {
        key: '_combatPhase',
        value: function _combatPhase() {
            var shouldEndBattle = true;
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this._enemies.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var enemy = _step6.value;

                    enemy.health--;
                    shouldEndBattle = shouldEndBattle && enemy.health <= 0;
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                        _iterator6['return']();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            if (shouldEndBattle) {
                this._endBattle();
            }
        }
    }, {
        key: '_endBattle',
        value: function _endBattle() {
            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = this.players.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var player = _step7.value;

                    if (player.currentState === "idle") {
                        player.endCombat();
                    }
                }
            } catch (err) {
                _didIteratorError7 = true;
                _iteratorError7 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                        _iterator7['return']();
                    }
                } finally {
                    if (_didIteratorError7) {
                        throw _iteratorError7;
                    }
                }
            }

            this._room.currentState = "idle";
            this._ui.setIdleOptions();
            this.emit('end-battle');
        }

        /**
         * Adds a player regardless of remote or local
         */
    }, {
        key: 'addPlayer',
        value: function addPlayer(p, isLocal) {
            var yPos = 2.2;

            if (this._players.size) {
                yPos += 1.1 * this._players.size;
            }

            p.yPos = yPos;

            this._players.set(p.id, p);
            if (isLocal) {
                this._localPlayer = p;
            }
            this.emit("add-player", p);
        }

        // Simulation Logic
    }, {
        key: 'tick',
        value: function tick() {
            if (this._room && this._room.currentState === "moving") {
                this._moveTimer--;
                if (this._moveTimer <= 0) {
                    this._startBattle();
                }
            }

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.players.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var player = _step8.value;

                    player.tick();
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                        _iterator8['return']();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }
        }
    }, {
        key: 'handleMessage',
        value: function handleMessage(message) {
            if (message.event === "tick") {
                this.tick();
            } else {
                _servicesLogger2['default'].debug("Message recieved from dispatcher");
                _servicesLogger2['default'].log(message);

                // Assign event name and data
                var eventName = message.event;
                var data = message.data;

                if (eventName == "game-start") {
                    this.currentState = "main menu";
                } else if (message.event == "game-state") {
                    this.currentState = data;
                } else if (message.event == "add-player") {
                    var p = new _objectsPlayer2['default'](data.name, message.from, data.job);
                    this.addPlayer(p, data.isLocal);
                } else if (message.event == "player-remove") {
                    // Remove the peers player from the game
                    // Get and then delete player
                    var playerToRemove = this._players.get(data);
                    var playerRemoved = this._players['delete'](playerToRemove.id);

                    // Make sure the player was there
                    if (playerRemoved) {
                        this.emit("remove-player", playerToRemove);

                        if (this.currentState == "lobby") {
                            var _iteratorNormalCompletion9 = true;
                            var _didIteratorError9 = false;
                            var _iteratorError9 = undefined;

                            try {
                                for (var _iterator9 = this._players.values()[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                                    var player = _step9.value;

                                    player.currentState = "idle";
                                }
                            } catch (err) {
                                _didIteratorError9 = true;
                                _iteratorError9 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion9 && _iterator9['return']) {
                                        _iterator9['return']();
                                    }
                                } finally {
                                    if (_didIteratorError9) {
                                        throw _iteratorError9;
                                    }
                                }
                            }
                        }
                    }
                } else if (message.event == "player-job") {
                    // Alter player's job
                    var player = this._players.get(message.from);
                    player.job = data.job;
                } else if (message.event == "player-state") {
                    // Alter player's state
                    var player = this._players.get(message.from);
                    player.currentState = data.state;

                    // Progress Game logic accoridng to player state
                    this.checkPlayerState();
                } else if (message.event == "player-action") {
                    var player = this._players.get(message.from);

                    var action = Immutable.Map(data);
                    player.currentAction = action;

                    this.checkPlayerAction(player);
                }
            }
        }
    }, {
        key: 'currentState',
        set: function set(state) {
            if (this._states.has(state)) {
                this._currentState = state;
                if (this._currentState == "main menu") {
                    // Reset all players
                    this._players = new Map();
                    this._localPlayer = undefined;
                }
                this.emit("game-state", this._currentState);
            }
        }
    }]);

    return _default;
})(_BaseModel3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../mixins/eventEmitter":6,"../services/Logger":16,"../services/Rng":19,"../services/Utils":21,"./BaseModel":7,"./objects/Lobby":9,"./objects/MainMenu":10,"./objects/Monster":11,"./objects/Player":12,"./objects/Room":13,"./objects/Ui":14}],9:[function(require,module,exports){
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

},{"../BaseModel":7}],10:[function(require,module,exports){
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

        this._currentOptions = ["Host Game", "Join Game"];
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

},{"../BaseModel":7}],11:[function(require,module,exports){
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

var _default = (function (_BaseModel) {
    _inherits(_default, _BaseModel);

    _createClass(_default, null, [{
        key: 'TYPE_WURM',

        // Static Room Types
        get: function get() {
            return {
                'sprite': 'wurm-sheet.png',
                'name': 'wurm'
            };
        }
    }]);

    function _default(xPos, yPos, type) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, []);
        this.xPos = xPos;
        this.ypos = yPos;
        this.type = type;

        this.health = 5;
    }

    return _default;
})(_BaseModel3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../BaseModel":7}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

var PlayerAction = function PlayerAction() {
    _classCallCheck(this, PlayerAction);
};

var Player = (function (_BaseModel) {
    _inherits(Player, _BaseModel);

    function Player(name, id, job) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this);
        this._name = name;
        this._id = id;

        this._states = new Set(["idle", "ready", "resting", "walking", "attacking"]);
        this.currentState = "idle";

        this.currentAction = Immutable.Map({
            "action": "thinking"
        });
        this._nextAction = undefined;

        // Store the action cycle
        this._actionCycle = 0;

        this._isBusy = false;

        if (job) {
            this.job = job;
        }
    }

    _createClass(Player, [{
        key: 'resetAction',
        value: function resetAction() {
            this.currentAction = this.nextAction || Immutable.Map({
                "action": "thinking",
                "cycle": this.actionCycle
            });
            this._nextAction = undefined;
        }
    }, {
        key: 'beginCombat',
        value: function beginCombat() {
            this.currentState = "idle";
            this.cooldown = 0;
            this._readyToAttack = false;
        }

        /**
         * Move player forward
         */
    }, {
        key: 'walkForward',
        value: function walkForward(cb) {
            this.currentState = "walking";
            this._isWalkingForward = true;
            this._idleXPos = this.xPos;
            this._destXPos = this.xPos - 1;
            if (cb) this._onWalkForward = cb;
        }

        /**
         * Player attack
         */
    }, {
        key: 'attack',
        value: function attack(cb) {
            this.currentState = "attacking";
            this._attackDelay = 10;
            if (cb) this._onAttack = cb;
        }

        /**
         * Move player backward
         */
    }, {
        key: 'walkBack',
        value: function walkBack(cb) {
            this.currentState = "walking";
            this._isWalkingBack = true;
            var currentXPos = this.xPos;
            this._destXPos = this.xPos + 1;
            if (cb) this._onWalkBack = cb;
        }
    }, {
        key: 'endCombat',
        value: function endCombat() {
            this.nextActionCycle();

            this.currentState = "idle";
            this.cooldown = 0;
            this._readyToAttack = false;

            this.onCooldown = undefined;
            this._isCoolingdown = false;
        }

        /**
         * Update so we know to charge cooldown meeter
         */
    }, {
        key: 'chargeCooldown',
        value: function chargeCooldown(callback) {
            this.cooldown = 0;
            this._isCoolingdown = true;
        }
    }, {
        key: 'nextActionCycle',
        value: function nextActionCycle() {
            this._readyToAttack = false;
            this._actionCycle++;
            this.resetAction();
            this.chargeCooldown();
        }
    }, {
        key: 'resetActionCycle',
        value: function resetActionCycle() {
            this._actionCycle = 0;
            this._nextAction = undefined;
            this.resetAction();
        }
    }, {
        key: 'tick',
        value: function tick() {
            if (this._isCoolingdown) {
                this.cooldown++;
                if (this.cooldown >= this.maxCooldown) {
                    this._isCoolingdown = false;
                    this._readyToAttack = true;
                    if (this.onCooldown) this.onCooldown(this);
                }
            }

            if (this._isWalkingForward) {
                var step = .10;
                this.xPos -= step;

                if (this.xPos <= this._destXPos) {
                    this._isWalkingForward = false;
                    this.currentState = "idle";
                    if (this._onWalkForward) this._onWalkForward();
                }
            }

            if (this.currentState == "attacking") {
                this._attackDelay--;
                if (this._attackDelay <= 0) {
                    _servicesLogger2['default'].debug("DONE ATTACKING");
                    this.currentState = "idle";
                    if (this._onAttack) this._onAttack();
                }
            }

            if (this._isWalkingBack) {
                var step = .10;

                this.xPos += step;
                if (this.xPos >= this._destXPos) {
                    this.currentState = "idle";
                    this._isWalkingBack = false;
                    if (this._onWalkBack) this._onWalkBack();
                }
            }
        }
    }, {
        key: 'currentState',
        set: function set(state) {
            if (this._states.has(state)) {
                this._currentState = state;
            }
        },
        get: function get() {
            return this._currentState;
        }
    }, {
        key: 'currentAction',
        set: function set(action) {
            if (action.get("cycle") > this.actionCycle) {
                this._nextAction = action;
            } else {
                this._currentAction = action;
            }
        },
        get: function get() {
            return this._currentAction;
        }
    }, {
        key: 'job',
        get: function get() {
            return this._job;
        },
        set: function set(jobName) {
            this._job = JOBS.get(jobName);

            this.maxHealth = this._job.health;
            this.health = this._job.health;

            this.maxMana = this._job.mana;
            this.mana = this._job.mana;

            this.maxCooldown = this._job.cooldown;
            this.cooldown = this._job.cooldown;

            this.xPos = _Config2['default'].TILE_X - 3;
            if (this._job.position === "back") {
                this.xPos += .5;
            }
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

    return Player;
})(_BaseModel3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"../../../Config":2,"../../services/Logger":16,"../BaseModel":7}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _servicesLogger = require('../../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var Room = (function (_BaseModel) {
    _inherits(Room, _BaseModel);

    function Room(type) {
        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this);
        this._states = new Set(["idle", "moving", "battle"]);

        this._type = type;
        this.currentState = "idle";
    }

    return Room;
})(_BaseModel3['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"../../services/Logger":16,"../BaseModel":7}],14:[function(require,module,exports){
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

},{"../BaseModel":7}],15:[function(require,module,exports){
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

},{"../../Config":2,"../mixins/EventEmitter":5}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

var events = ["peer-connect", "player-ready", "player-job", "player-state", "player-action", "option-select"];

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    _createClass(_default, [{
        key: 'createMessage',
        value: function createMessage(eventName, data) {
            if (events.indexOf(eventName) >= 0) {
                return [events.indexOf(eventName), data];
            }
        }
    }, {
        key: 'decodeMessage',
        value: function decodeMessage(id, message) {
            return {
                "from": id,
                "event": events[message[0]],
                "data": message[1]
            };
        }
    }]);

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
        value: function init() {
            var _this = this;

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
                            _this.connectToPeer(peer);
                        });
                    });

                    res();
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
                var message = _this2.decodeMessage(connection.peer, data);
                _this2.handleMessage(message);
            });

            connection.on('close', function () {
                _this2.removePeer(peer);
            });

            return peer;
        }
    }, {
        key: 'connectToPeer',
        value: function connectToPeer(peer) {

            var data = {
                "name": this._name,
                "job": this._selectedJob || undefined
            };

            // Build list of peers
            var peers = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._peers.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _peer = _step.value;

                    peers.push(_peer);
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

            data.peers = peers;

            // Create a message
            var message = this.createMessage("peer-connect", data);

            _Logger2['default'].network('Sending peer-connect message to peer with id ' + peer.id);
            _Logger2['default'].log(message);
            peer.connection.send(message);
            peer.hasConnected = true;
        }
    }, {
        key: 'removePeer',
        value: function removePeer(peer) {
            this.postMessage({
                "event": "player-remove",
                "data": peer.connection.peer
            });
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
        key: '_sendMessage',
        value: function _sendMessage(message) {
            _Logger2['default'].network("Send message to peers");
            _Logger2['default'].log(message);
            if (this._peers) {
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = this._peers.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var peer = _step2.value;

                        peer.connection.send(message);
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
        }

        /**
         * Handle incoming message
         */
    }, {
        key: 'handleMessage',
        value: function handleMessage(message) {
            _Logger2['default'].network('Message recieved from peer with id ' + message.from);
            _Logger2['default'].log(message);

            // Grab data from message
            var data = message.data;

            if (message.event === "peer-connect") {
                // See if this peer knows about any other peers and add if we don't know them
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = data.peers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var peer = _step3.value;

                        if (!this._peers.get(peer) && peer !== this._id) {
                            _Logger2['default'].network('Adding Peer with id ' + peer);
                            this.addPeer(this._peer.connect(peer, {
                                "reliable": true
                            }));
                        }
                    }

                    // See if we have already connected to this peer
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

                if (this._peers.get(message.from) && !this._peers.get(message.from).hasConnected) {
                    this.connectToPeer(this._peers.get(message.from));
                }

                message.event = "add-player";
            }

            this.postMessage(message);
        }
    }, {
        key: 'broadcastMessage',
        value: function broadcastMessage(message) {
            if (message.event === "player-job") {
                this._selectedJob = message.data.job;
            }
            this._sendMessage(this.createMessage(message.event, message.data));
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

},{"../../Config":2,"../mixins/EventEmitter":5,"./Logger":16}],18:[function(require,module,exports){
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

},{"./Logger.js":16}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = (function () {
    function _default(seed) {
        _classCallCheck(this, _default);

        console.log("RNG CREATE");
        this._rng = new RNG(seed);
        window.rng = this._rng;
    }

    _createClass(_default, [{
        key: "next",
        value: function next() {
            return this._rng.random();
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{}],20:[function(require,module,exports){
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

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

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

    function _default() {
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
        value: function init(game) {
            this._game = game;

            this._debugView = new _DebugView2['default'](game);

            this._inputService = new _servicesKeyboardInputService2['default']();

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

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._views[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var view = _step.value;

                    view.render(this._ctx, frame);
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

            this._debugView.render(this._ctx, frame, this._fps);
        }
    }, {
        key: 'getMainMenuViews',
        value: function getMainMenuViews() {
            var views = [];

            if (this._mainMenuView) {
                views.push(this._mainMenuView);
            }

            return views;
        }
    }, {
        key: 'getPlayingViews',
        value: function getPlayingViews() {
            return [this._roomView].concat(_toConsumableArray(this._playerViews.values()), [this._uiView]);
        }
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
         * Listen for game events so we can adjust renderer
         */
    }, {
        key: 'listenToGameEvents',
        value: function listenToGameEvents(game) {
            var _this = this;

            game.on("game-state", function (message) {
                _servicesLogger2['default'].debug("View Game State Event");
                _servicesLogger2['default'].log(message);
                if (message == "main menu") {
                    (function () {
                        // If we aren't rendering then start
                        if (!_this._rendering) {
                            _this.startRender();
                        }
                        var mainMenuView = new _MainMenuView2['default'](game.mainMenu, _this);
                        mainMenuView.init().then(function () {
                            _this._mainMenuView = mainMenuView;
                            _this._views = new Set([_this._mainMenuView]);
                        });
                    })();
                } else if (message == "lobby") {
                    (function () {
                        var lobbyView = new _LobbyView2['default'](game.lobby, game.players, _this);
                        lobbyView.init().then(function () {
                            _this._lobbyView = lobbyView;
                            _this._views = new Set([_this._lobbyView]);
                        });
                    })();
                } else if (message == "playing") {
                    var _iteratorNormalCompletion2;

                    var _didIteratorError2;

                    var _iteratorError2;

                    var _iterator2, _step2;

                    (function () {
                        // Create a new room view
                        var roomView = new _RoomView2['default'](game.room);
                        _this._roomView = roomView;

                        var promises = [roomView.loadResources()];

                        var views = [];

                        // Create all of our player views
                        _this._playerViews = new Map();
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;

                        try {
                            for (_iterator2 = game.players.values()[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var player = _step2.value;

                                var playerView = new _PlayerView2['default'](player);
                                promises.push(playerView.loadResources());
                                views.push(playerView);
                                _this._playerViews.set(player.id, playerView);
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

                        var uiView = new _UiView2['default'](game.ui, game.players, _this);
                        _this._uiView = uiView;
                        promises.push(uiView.loadResources());

                        // Load sounds
                        var soundService = new _servicesSoundService2['default']();
                        _this._soundService = soundService;
                        promises.push(soundService.loadResources());

                        // After all renderers are ready let the dispatcher know
                        Promise.all(promises).then(function () {
                            _this._views = [_this._roomView].concat(views, [_this._uiView]);
                            _this._soundService.play("dungeon-theme", true, .3);
                        });
                    })();
                }
            });

            game.on("add-player", function (player) {
                if (game.currentState === "loby") _this._lobbyView._ready = false;
            });

            game.on("remove-player", function (player) {
                _servicesLogger2['default'].debug("VIEW REMOVE PLAYER");
                _servicesLogger2['default'].debug(player.id);
                if (_this._playerViews) {
                    _this._playerViews['delete'](player.id);
                    _this._views = _this.getPlayingViews();
                }
            });

            game.on("add-enemy", function (enemy) {
                var enemyView = new _EnemyView2['default'](enemy);
                enemyView.loadResources().then(function () {
                    if (_this._enemyViews) {
                        _this._enemyViews = [enemyView].concat(_toConsumableArray(_this._enemyViews));
                    } else {
                        _this._enemyViews = [enemyView];
                    }
                });
            });

            game.on("start-battle", function () {
                _this._soundService.stop("dungeon-theme");
                _this._soundService.play("combat-theme", true, .3);
                _this._views = [].concat(_toConsumableArray(_this._views), _toConsumableArray(_this._enemyViews));
            });

            game.on("player-cooldown", function (player) {
                if (player.isLocal) {
                    _this._soundService.play("cooldown-ready");
                }
            });

            game.on("player-attack", function (player) {});

            game.on("end-battle", function () {
                _this._soundService.stop("combat-theme");
                _this._soundService.play("dungeon-theme", true, .3);
                _this._views = [_this._roomView].concat(_toConsumableArray(_this._playerViews.values()), [_this._uiView]);
            });
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
                var gameState = _this2._game.currentState;
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
                var gameState = _this2._game.currentState;
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
                var gameState = _this2._game.currentState;
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
                var gameState = _this2._game.currentState;
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
                var gameState = _this2._game.currentState;
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

},{"../../Config":2,"../mixins/EventEmitter":5,"../services/KeyboardInputService":15,"../services/Logger":16,"../services/SoundService":20,"./DebugView":23,"./EnemyView":24,"./LobbyView":25,"./MainMenuView":26,"./PlayerView":28,"./RoomView":29,"./UiView":30}],23:[function(require,module,exports){
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

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesResourceService = require('../services/ResourceService');

var _servicesResourceService2 = _interopRequireDefault(_servicesResourceService);

var _modelsObjectsPlayer = require('../models/objects/Player');

var _modelsObjectsPlayer2 = _interopRequireDefault(_modelsObjectsPlayer);

var jobDialog = '\n    <div class="dialog">\n        <h3>Select Job</h3>\n        <label>Job: </label>\n        <select name="job">\n        </select><br>\n        <button name="confirm">Confirm</button>\n        <button name="cancel">Cancel</button>\n    </div>\n';

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(lobby, players, view) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, lobby);
        this._lobby = lobby;
        this._view = view;
        this._players = players;
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
                        view.postMessage({
                            "event": "player-job",
                            "from": _this._view._game.localPlayer.id,
                            "data": {
                                "job": jobSelect.value
                            }
                        });
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
                for (var _iterator2 = this._players.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var player = _step2.value;

                    ctx.fillStyle = "#ffffff";
                    yPos += 40;
                    ctx.fillText(player.name, 100, yPos);

                    if (player.job) {
                        var jobName = player.job.name[0].toUpperCase() + player.job.name.slice(1);;
                        ctx.fillText(jobName, 300, yPos);
                    }

                    if (player.currentState == "ready") {
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
                } else if (this.selectedOption == "Ready") {
                    this._ready = !this._ready;
                    this._view.postMessage({
                        "event": "player-state",
                        "from": this._view._game.localPlayer.id,
                        "data": {
                            "state": this._ready ? "ready" : "idle"
                        }
                    });
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

},{"../../Config":2,"../models/objects/Player":12,"../services/ResourceService":18,"../services/Utils":21,"./ObjectView":27}],26:[function(require,module,exports){
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
                        view.postMessage({
                            "event": "start-mp",
                            "data": {
                                name: nameInput.value,
                                id: idInput.value
                            }
                        });
                        this.remove();
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
                        view.postMessage({
                            "event": "start-mp",
                            "data": {
                                name: nameInput.value,
                                hostId: hostInput.value,
                                id: idInput.value
                            }
                        });
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

},{"../../Config":2,"../services/ResourceService":18,"../services/Utils":21,"./ObjectView":27}],27:[function(require,module,exports){
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

            if (this._player.currentState === "walking") {
                animationFrame = _Config2['default'].SPRITE_SIZE * this.frame;
            } else if (this._player.currentState === "attacking") {
                animationFrame = _Config2['default'].SPRITE_SIZE * 2;
            }

            // Draw Player Sprite
            ctx.drawImage.apply(ctx, [this._resources.get('sprite'), animationFrame, 0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            xOffset, // sx ~ Replace with object X Pos
            yOffset, // sy ~ Replace with object Y Pos
            playerWidth, // sWidth
            playerWidth // sHeight
            ]);

            // Draw Bubble
            var bubbleOffset = 0;

            switch (this._player.currentAction.get("action")) {
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

            if (this._player.currentAction.get("action") !== "walk" && this._player.currentAction.get("action") !== "ready" && this._player.currentState !== "walking" && this._player.currentState !== "attacking") {
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

},{"../../Config":2,"../services/ResourceService":18,"../services/Utils":21,"./ObjectView":27}],29:[function(require,module,exports){
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
            var xStep = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE / 16;
            if (this._room.currentState == "moving") {
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

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(ui, players, view) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._ui = ui;
        this._view = view;
        this._players = players;

        _servicesLogger2['default'].debug("UI PLAYERS");
        _servicesLogger2['default'].log(this._players);

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

            if (this._view._game.localPlayer.currentState === "idle") {
                // Draw Info
                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 0 ? ">" : "") + this._ui.currentOptions[0], xPos, yPos]);

                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 1 ? ">" : "") + this._ui.currentOptions[1], xPos + _Config2['default'].TILE_SIZE * 2, yPos]);

                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 2 ? ">" : "") + this._ui.currentOptions[2], xPos, yPos + fontSize * 2]);

                ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 3 ? ">" : "") + this._ui.currentOptions[3], xPos + _Config2['default'].TILE_SIZE * 2, yPos + fontSize * 2]);
            }

            xPos = _Config2['default'].TILE_SIZE * 5;
            yPos = _Config2['default'].TILE_SIZE * (_Config2['default'].TILE_Y - this._tileHeight);

            // Render Player Info
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._players.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
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
            if (this._view._game.localPlayer.currentState === "idle") {
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
            if (this._view._game.localPlayer.currentState === "idle") {
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
            if (this._view._game.localPlayer.currentState === "idle") {
                var currentOption = this._ui.currentOptions[this._selectedOptionIndex];

                var action = Immutable.Map({
                    "cycle": this._view._game.localPlayer.actionCycle,
                    "action": this._ui.currentOptions[this._selectedOptionIndex],
                    "target": 0
                });

                if (!Immutable.is(action, this._view._game.localPlayer.currentAction)) {
                    var message = {
                        "event": "player-action",
                        "from": this._view._game.localPlayer.id,
                        "data": action
                    };

                    this._view.postMessage(message);
                }
            }
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Logger":16,"./ObjectView":27}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbWl4aW5zL2V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL0xvYmJ5LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTWFpbk1lbnUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUm9vbS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9OZXR3b3JrU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1JuZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1NvdW5kU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1V0aWxzLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvQ2FudmFzMmQuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9EZWJ1Z1ZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9FbmVteVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Mb2JieVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9NYWluTWVudVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9PYmplY3RWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21WaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt5QkNBbUIsY0FBYzs7Ozs7QUFHakMsSUFBSSxNQUFNLEdBQUcsMkJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDUHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7Ozs7QUFLcEMsTUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7QUFFekUsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXOztBQUUxQixVQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs7QUFFdEIsVUFBTSxDQUFDLFdBQVcsR0FBSyxFQUFFLENBQUM7OztBQUcxQixRQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BDLE9BQUc7QUFDQyxjQUFNLENBQUMsWUFBWSxHQUFLLFdBQVcsRUFBRSxHQUFDLE1BQU0sQ0FBQyxVQUFVLEFBQUMsQ0FBQztBQUN6RCxjQUFNLENBQUMsYUFBYSxHQUFHLEFBQUMsTUFBTSxDQUFDLFlBQVksR0FBQyxNQUFNLENBQUMsYUFBYSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUM7S0FDekYsUUFBTyxNQUFNLENBQUMsYUFBYSxHQUFDLE1BQU0sQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFDOzs7Ozs7Ozs7QUFVdEQsVUFBTSxDQUFDLFlBQVksR0FBSSxNQUFNLENBQUMsWUFBWSxJQUFFLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQSxBQUFDLENBQUM7QUFDOUUsVUFBTSxDQUFDLFNBQVMsR0FBTyxNQUFNLENBQUMsV0FBVyxHQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUM7OztBQUc5RCxVQUFNLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztDQUNuQixDQUFBOztBQUVELE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7cUJBRUosTUFBTTs7Ozs7Ozs7Ozs7Ozs7OztzQkM5Q0YsV0FBVzs7Ozs7OzBCQUViLGVBQWU7Ozs7Ozs2QkFHZixrQkFBa0I7Ozs7OztvQ0FHWix5QkFBeUI7Ozs7O0FBR2pDLHdCQUFHOzs7QUFDVixZQUFJLENBQUMsS0FBSyxHQUFTLDZCQUFVLENBQUM7QUFDOUIsWUFBSSxDQUFDLEtBQUssR0FBUyxnQ0FBVSxDQUFDO0FBQzlCLFlBQUksQ0FBQyxXQUFXLEdBQUcsdUNBQWdCLENBQUM7O0FBRXBDLGNBQU0sQ0FBQyxJQUFJLEdBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUMvQixjQUFNLENBQUMsSUFBSSxHQUFTLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDL0IsY0FBTSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3hDOzs7Ozs7OztlQUtHLGdCQUFHOzs7QUFDSCxtQkFBTyxDQUFDLEdBQUcsQ0FBQyxDQUNSLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDakMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBSTtBQUNSLHNCQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFDLENBQUMsQ0FBQzthQUN6RCxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJDaENzQixvQkFBb0I7Ozs7NkJBQ3BCLG1CQUFtQjs7OztrQ0FDbkIsd0JBQXdCOzs7O3NDQUN4Qiw0QkFBNEI7Ozs7Ozs7QUFHeEMsd0JBQUc7OztBQUNWLHdGQUFRO0tBQ1g7Ozs7ZUFFRyxjQUFDLElBQUksRUFBRTtBQUNQLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixnQkFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBRzFELGdCQUFJLENBQUMsaUJBQWlCLEdBQWEsMkJBQU0sVUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDeEUsZ0JBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMvRTs7O2VBRWtCLDZCQUFDLE9BQU8sRUFBRTs7O0FBQ3pCLGdCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsZ0JBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNmLG9CQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN6QyxNQUFNO0FBQ0gsb0JBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6Qjs7QUFFRCxnQkFBSSxDQUFDLGVBQWUsMEZBQXlCLElBQUksTUFBQyxDQUFDO0FBQ25ELGdCQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFJOztBQUVqQyxzQkFBSyxlQUFlLENBQUMsU0FBUyxHQUFHLFVBQUEsT0FBTyxFQUFJO0FBQ3hDLDBCQUFLLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDN0IsQ0FBQTs7QUFFRCw0Q0FBTyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQzs7QUFFekQsc0JBQUssV0FBVyxDQUFDO0FBQ2IsMkJBQU8sRUFBRSxZQUFZO0FBQ3JCLDBCQUFNLEVBQUUsTUFBTSxFQUFFO0FBQ2hCLDBCQUFNLEVBQUU7QUFDSiw4QkFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJO0FBQ3BCLGlDQUFTLEVBQUUsSUFBSTtxQkFDbEI7aUJBQ0osQ0FBQyxDQUFDOztBQUVILHNCQUFLLFdBQVcsQ0FBQztBQUNiLDJCQUFPLEVBQUUsWUFBWTtBQUNyQiwwQkFBTSxFQUFFLE9BQU87aUJBQ2xCLENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7ZUFFUSxxQkFBRztBQUNSLGdCQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xDLGdCQUFJLENBQUMsV0FBVyxDQUFDO0FBQ2IsdUJBQU8sRUFBRSxZQUFZO0FBQ3JCLHNCQUFNLEVBQUUsV0FBVzthQUN0QixDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUtVLHFCQUFDLE9BQU8sRUFBRTtBQUNqQix3Q0FBTyxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUNqRCx3Q0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXBCLHdDQUFPLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQ3pELGdCQUFJLENBQUMsV0FBVyxDQUFDO0FBQ2IsdUJBQU8sRUFBRSxZQUFZO0FBQ3JCLHNCQUFNLEVBQUU7QUFDSix3QkFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJO0FBQ2xCLDBCQUFNLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJO0FBQ3pCLHlCQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHO2lCQUMxQjthQUNKLENBQUMsQ0FBQztTQUNOOzs7Ozs7O2VBS2Esd0JBQUMsT0FBTyxFQUFFO0FBQ3BCLHdDQUFPLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0FBQ3BELHdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEIsd0NBQU8sS0FBSyxDQUFDLDZDQUE2QyxDQUFDLENBQUM7QUFDNUQsZ0JBQUksQ0FBQyxXQUFXLENBQUM7QUFDZCx1QkFBTyxFQUFFLGVBQWU7QUFDdkIsc0JBQU0sRUFBRTtBQUNKLHdCQUFJLEVBQUUsT0FBTztpQkFDaEI7YUFDSixDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUt3QixtQ0FBQyxPQUFPLEVBQUU7QUFDL0IsZ0JBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDN0I7Ozs7Ozs7ZUFLaUIsNEJBQUMsT0FBTyxFQUFFO0FBQ3hCLGdCQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDO0FBQzFCLGdCQUFJLElBQUksR0FBSSxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV6QixnQkFBRyxLQUFLLEtBQUssVUFBVSxFQUFFO0FBQ3JCLG9CQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDbEMsTUFBTSxJQUFJLEtBQUssS0FBSyxZQUFZLEVBQUU7QUFDL0Isb0JBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQTthQUNuQixNQUFNOztBQUVILG9CQUFHLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQ2xDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDOztBQUVqQyxvQkFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMxQixvQkFBSSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUNsRDtTQUNKOzs7Ozs7O2VBS3VCLGtDQUFDLE9BQU8sRUFBRTtBQUM5QixnQkFBRyxPQUFPLEVBQUU7QUFDUixvQkFBSSxDQUFDLFdBQVcsQ0FBQztBQUNiLDJCQUFPLEVBQUUsTUFBTTtpQkFDbEIsQ0FBQyxDQUFDO2FBQ047U0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwSUwsSUFBSSxxQkFBcUIsR0FBRyxFQUFFLENBQUE7O0FBRTlCLFNBQVMsS0FBSyxDQUFDLE9BQU8sRUFBVTtvQ0FBTCxJQUFJO0FBQUosUUFBSTs7O0FBQzdCLFNBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3BELFNBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtDQUNoQjs7O0FBSWMsc0JBQUc7OztBQUNWLFFBQUksQ0FBQyxhQUFhLEdBQUcscUJBQXFCLENBQUE7QUFDMUMsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7R0FDcEI7Ozs7V0FFQyxZQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDaEIsVUFBRyxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDaEMsY0FBTSxJQUFJLFNBQVMsRUFBRSxDQUFBO09BQ3RCOzs7Ozs7QUFDRCw2QkFBZ0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsOEhBQUU7Y0FBMUIsSUFBSTs7QUFDUixjQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQTtBQUM5RCxjQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDcEMsbUJBQU8sSUFBSSxDQUFBO1dBQ1o7QUFDRCxtQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN4QixjQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN4QyxpQkFBSyxDQUNILCtDQUErQyxHQUMvQyxrREFBa0QsR0FDbEQscUNBQXFDLEVBQ3JDLFNBQVMsQ0FBQyxNQUFNLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsYUFBYSxDQUNuQixDQUFBO1dBQ0Y7U0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELGFBQU8sSUFBSSxDQUFBO0tBQ2Q7OztXQUVHLGNBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNqQixVQUFJLGNBQWMsR0FBRyxJQUFJLENBQUE7QUFDekIsZUFBUyxZQUFZLEdBQUU7QUFDckIsc0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ3RDLGdCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtPQUNoQztBQUNELGFBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7S0FDckM7OztXQUVFLGFBQUMsSUFBSSxFQUFXO3lDQUFOLElBQUk7QUFBSixZQUFJOzs7QUFDYixVQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ25CLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO09BQzFCO0FBQ0QsVUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLFVBQUcsT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO0FBQ2hDLGNBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQTtPQUN0QjtBQUNELFVBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEMsVUFBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDbEMsZUFBTyxJQUFJLENBQUE7T0FDWjtBQUNELFVBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDakQsVUFBRyxlQUFlLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDeEIsZUFBTyxJQUFJLENBQUE7T0FDWjtBQUNELGVBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3BDLGFBQU8sSUFBSSxDQUFBO0tBQ2Q7OztXQUVHLGNBQUMsSUFBSSxFQUFVO3lDQUFMLElBQUk7QUFBSixZQUFJOzs7QUFDZCxVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFVBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ2xDLGVBQU8sS0FBSyxDQUFBO09BQ2I7QUFDRCxlQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtlQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztPQUFBLENBQUMsQ0FBQTtBQUM3QyxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFYyx5QkFBQyxlQUFlLEVBQUM7QUFDNUIsVUFBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssZUFBZSxFQUFFO0FBQ2hELGNBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQTtPQUN0QjtBQUNELFVBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFBO0tBQ3ZDOzs7V0FFVSxxQkFBQyxPQUFPLEVBQUU7QUFDakIsVUFBRyxJQUFJLENBQUMsU0FBUyxFQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZMLElBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFBOztBQUU5QixTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQVU7b0NBQUwsSUFBSTtBQUFKLFFBQUk7OztBQUM3QixTQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxTQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7Q0FDaEI7OztBQUljLHNCQUFHOzs7QUFDVixRQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFBO0FBQzFDLFFBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO0dBQ3BCOzs7O1dBRUMsWUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2hCLFVBQUcsT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO0FBQ2hDLGNBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQTtPQUN0Qjs7Ozs7O0FBQ0QsNkJBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLDhIQUFFO2NBQTFCLElBQUk7O0FBQ1IsY0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUE7QUFDOUQsY0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLG1CQUFPLElBQUksQ0FBQTtXQUNaO0FBQ0QsbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDeEIsY0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDeEMsaUJBQUssQ0FDSCwrQ0FBK0MsR0FDL0Msa0RBQWtELEdBQ2xELHFDQUFxQyxFQUNyQyxTQUFTLENBQUMsTUFBTSxFQUNoQixJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQTtXQUNGO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFRyxjQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDakIsVUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFBO0FBQ3pCLGVBQVMsWUFBWSxHQUFFO0FBQ3JCLHNCQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUN0QyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7T0FDaEM7QUFDRCxhQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO0tBQ3JDOzs7V0FFRSxhQUFDLElBQUksRUFBVzt5Q0FBTixJQUFJO0FBQUosWUFBSTs7O0FBQ2IsVUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNuQixZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtPQUMxQjtBQUNELFVBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN0QixVQUFHLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtBQUNoQyxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7QUFDRCxVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFVBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ2xDLGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxVQUFJLGVBQWUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2pELFVBQUcsZUFBZSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxlQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNwQyxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFRyxjQUFDLElBQUksRUFBVTt5Q0FBTCxJQUFJO0FBQUosWUFBSTs7O0FBQ2QsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQyxVQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNsQyxlQUFPLEtBQUssQ0FBQTtPQUNiO0FBQ0QsZUFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7ZUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7T0FBQSxDQUFDLENBQUE7QUFDN0MsYUFBTyxJQUFJLENBQUE7S0FDZDs7O1dBRWMseUJBQUMsZUFBZSxFQUFDO0FBQzVCLFVBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLGVBQWUsRUFBRTtBQUNoRCxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7QUFDRCxVQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQTtLQUN2Qzs7O1dBRVUscUJBQUMsT0FBTyxFQUFFO0FBQ2pCLFVBQUcsSUFBSSxDQUFDLFNBQVMsRUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0N0Rm9CLHdCQUF3Qjs7Ozs4QkFDeEIsb0JBQW9COzs7Ozs7O0FBSTlCLHdCQUFHOzs7QUFDVix3RkFBUTtLQUNYOzs7O2FBU2UsYUFBQyxLQUFLLEVBQUU7QUFDcEIsZ0JBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDeEIsb0JBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQzlCO1NBQ0o7YUFFZSxlQUFHO0FBQ2YsbUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ3ZCb0Isd0JBQXdCOzs7Ozs7NkJBRzNCLG1CQUFtQjs7Ozs4QkFDbkIsb0JBQW9COzs7O3NCQUNwQixjQUFjOzs7OzJCQUNkLGlCQUFpQjs7Ozs7OzBCQUdqQixhQUFhOzs7OzZCQUNiLGtCQUFrQjs7Ozs4QkFDbEIsbUJBQW1COzs7OzJCQUNuQixnQkFBZ0I7Ozs7K0JBQ2hCLG9CQUFvQjs7Ozs0QkFDcEIsaUJBQWlCOzs7O3lCQUNqQixjQUFjOzs7Ozs7Ozs7YUFJaEIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FBQzs7O2FBQ25DLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQUM7OzthQUM5QixlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUFDOzs7YUFDdEIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FBQzs7O2FBQ3RCLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQUM7OzthQUNyQyxlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFDOzs7YUFDekIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FBQzs7O0FBRWhCLHdCQUFHOzs7QUFDVix3RkFBUTs7QUFFUixZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLENBQ25CLFdBQVcsRUFDWCxPQUFPLEVBQ1AsU0FBUyxDQUNaLENBQUMsQ0FBQzs7QUFFSCxZQUFJLENBQUMsU0FBUyxHQUFHLGtDQUFjLENBQUM7QUFDaEMsWUFBSSxDQUFDLE1BQU0sR0FBTSwrQkFBVyxDQUFDO0tBQ2hDOzs7Ozs7Ozs7OztlQVFHLGNBQUMsVUFBVSxFQUFFOzs7QUFDYixtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUc7QUFDM0Isc0JBQUssV0FBVyxHQUFHLFVBQVUsQ0FBQzs7QUFFOUIsc0JBQUssUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Ozs7QUFJMUIsc0JBQUssV0FBVyxDQUFDLFNBQVMsR0FBRyxNQUFLLGFBQWEsQ0FBQyxJQUFJLE9BQU0sQ0FBQzs7QUFFM0QsbUJBQUcsRUFBRSxDQUFDO2FBQ1QsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7OztlQXFCZSw0QkFBRzs7QUFFZixnQkFBRyxJQUFJLENBQUMsWUFBWSxLQUFLLE9BQU8sRUFBRTtBQUM5QixvQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDOzs7Ozs7QUFDeEIseUNBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLDhIQUFFOzRCQUFqQyxNQUFNOztBQUNWLG9DQUFZLEdBQUcsWUFBWSxJQUFJLE1BQU0sQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDO3FCQUNsRTs7Ozs7Ozs7Ozs7Ozs7OztBQUVELG9CQUFHLFlBQVksRUFBRTtBQUNiLGdEQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMvQix3QkFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7OztlQUVnQiwyQkFBQyxDQUFDLEVBQUU7QUFDakIsZ0JBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxTQUFTLEVBQUU7QUFDaEMsb0JBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO0FBQ25DLHdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7Ozs7OztBQUN2Qiw4Q0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUlBQUU7Z0NBQWpDLE1BQU07O0FBQ1YsdUNBQVcsR0FBRyxXQUFXLElBQUksTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssT0FBTyxDQUFDO3lCQUMvRTs7Ozs7Ozs7Ozs7Ozs7OztBQUVELHdCQUFHLFdBQVcsRUFBRTtBQUNaLDRCQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7cUJBQzFCO2lCQUNKLE1BQU0sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7QUFDN0Msd0JBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9DLHdCQUFHLFVBQVUsS0FBSyxVQUFVLElBQUksQ0FBQyxDQUFDLGFBQWEsRUFBRTtBQUM3Qyw0QkFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekI7aUJBQ0o7YUFDSjtTQUNKOzs7ZUFFWSx5QkFBRzs7QUFFWixnQkFBSSxDQUFDLEtBQUssR0FBVSw4QkFBVSxDQUFDO0FBQy9CLGdCQUFJLENBQUMsR0FBRyxHQUFZLDRCQUFRLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDOzs7Ozs7O0FBRTlCLHNDQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtSUFBRTt3QkFBakMsTUFBTTs7QUFDViwwQkFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7aUJBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7U0FDSjs7O2VBRWMsMkJBQUc7O0FBRWQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUNuQyxnQkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7O0FBR3JCLHNDQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtSUFBRTt3QkFBakMsTUFBTTs7QUFDViwwQkFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUM7QUFDMUIsMEJBQU0sQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO2lCQUNuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0QsZ0JBQUksS0FBSyxHQUFHLGlDQUFXLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU5QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNwQixLQUFLLENBQ1IsQ0FBQyxDQUFDO1NBRU47OztlQUVXLHdCQUFHOzs7QUFDWCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ25DLGdCQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7Ozs7O3dCQUVwQixNQUFNOztBQUNWLDBCQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7O0FBRXJCLDBCQUFNLENBQUMsVUFBVSxHQUFHLFlBQUk7QUFDcEIsK0JBQUssaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0IsK0JBQUssSUFBSSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUN4QyxDQUFDOztBQUVGLDBCQUFNLENBQUMsY0FBYyxFQUFFLENBQUM7OztBQVI1QixzQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUlBQUU7O2lCQVN4Qzs7Ozs7Ozs7Ozs7Ozs7OztBQUVELGdCQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzdCOzs7ZUFFWSx1QkFBQyxDQUFDLEVBQUU7OztBQUNiLGdCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO0FBQzdCLGdCQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssUUFBUSxFQUFFO0FBQ2xDLGlCQUFDLENBQUMsV0FBVyxDQUFDLFlBQUk7QUFDZCxxQkFBQyxDQUFDLE1BQU0sQ0FBQyxZQUFJO0FBQ1Qsb0RBQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzVCLCtCQUFLLFlBQVksRUFBRSxDQUFDO0FBQ3BCLHlCQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDcEIseUJBQUMsQ0FBQyxRQUFRLENBQUMsWUFBSTtBQUNYLGdDQUFHLE9BQUssS0FBSyxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQUU7QUFDbkMsaUNBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs2QkFDakI7eUJBQ0osQ0FBQyxDQUFDO3FCQUNOLENBQUMsQ0FBQztpQkFDTixDQUFDLENBQUM7YUFDTixNQUFNO0FBQ0gsaUJBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQzthQUN2QjtTQUNKOzs7ZUFFVyx3QkFBRztBQUNYLGdCQUFJLGVBQWUsR0FBRyxJQUFJLENBQUM7Ozs7OztBQUMzQixzQ0FBaUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsbUlBQUU7d0JBQWpDLEtBQUs7O0FBQ1QseUJBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNmLG1DQUFlLEdBQUcsZUFBZSxJQUFLLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxBQUFDLENBQUM7aUJBQzVEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZ0JBQUcsZUFBZSxFQUFFO0FBQ2hCLG9CQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDckI7U0FDSjs7O2VBRVMsc0JBQUc7Ozs7OztBQUNULHNDQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtSUFBRTt3QkFBakMsTUFBTTs7QUFDVix3QkFBRyxNQUFNLENBQUMsWUFBWSxLQUFLLE1BQU0sRUFBRTtBQUMvQiw4QkFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO3FCQUN0QjtpQkFDSjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELGdCQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7QUFDakMsZ0JBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDMUIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDM0I7Ozs7Ozs7ZUFLUSxtQkFBQyxDQUFDLEVBQUUsT0FBTyxFQUFFO0FBQ2xCLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUM7O0FBRWYsZ0JBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDbkIsb0JBQUksSUFBSSxHQUFHLEdBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUM7YUFDbEM7O0FBRUQsYUFBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0IsZ0JBQUcsT0FBTyxFQUFFO0FBQ1Isb0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO0FBQ0QsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlCOzs7OztlQUdHLGdCQUFHO0FBQ0gsZ0JBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7QUFDbkQsb0JBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixvQkFBRyxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRTtBQUNyQix3QkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2lCQUN2QjthQUNKOzs7Ozs7O0FBRUQsc0NBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLG1JQUFFO3dCQUFqQyxNQUFNOztBQUNWLDBCQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQ2pCOzs7Ozs7Ozs7Ozs7Ozs7U0FDSjs7O2VBRVksdUJBQUMsT0FBTyxFQUFFO0FBQ25CLGdCQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssTUFBTSxFQUFFO0FBQ3pCLG9CQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNO0FBQ0gsNENBQU8sS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDakQsNENBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7QUFHcEIsb0JBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDOUIsb0JBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7O0FBRXhCLG9CQUFHLFNBQVMsSUFBSSxZQUFZLEVBQUU7QUFDMUIsd0JBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO2lCQUNuQyxNQUFNLElBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxZQUFZLEVBQUU7QUFDckMsd0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO2lCQUM1QixNQUFNLElBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxZQUFZLEVBQUU7QUFDckMsd0JBQUksQ0FBQyxHQUFHLCtCQUFXLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEQsd0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkMsTUFBTSxJQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksZUFBZSxFQUFFOzs7QUFHeEMsd0JBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLHdCQUFJLGFBQWEsR0FBSSxJQUFJLENBQUMsUUFBUSxVQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7QUFHN0Qsd0JBQUcsYUFBYSxFQUFFO0FBQ2QsNEJBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLGNBQWMsQ0FBQyxDQUFDOztBQUUzQyw0QkFBRyxJQUFJLENBQUMsWUFBWSxJQUFJLE9BQU8sRUFBRTs7Ozs7O0FBQzdCLHNEQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxtSUFBRTt3Q0FBbEMsTUFBTTs7QUFDViwwQ0FBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7aUNBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7eUJBQ0o7cUJBQ0o7aUJBQ0osTUFBTSxJQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksWUFBWSxFQUFFOztBQUVyQyx3QkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdDLDBCQUFNLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7aUJBQ3pCLE1BQU0sSUFBRyxPQUFPLENBQUMsS0FBSyxJQUFJLGNBQWMsRUFBRTs7QUFFdkMsd0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QywwQkFBTSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7QUFHakMsd0JBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2lCQUMzQixNQUFNLElBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxlQUFlLEVBQUU7QUFDeEMsd0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFN0Msd0JBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDakMsMEJBQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOztBQUU5Qix3QkFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUNsQzthQUNKO1NBQ0o7OzthQXZPZSxhQUFDLEtBQUssRUFBRTtBQUNwQixnQkFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QixvQkFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDM0Isb0JBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxXQUFXLEVBQUU7O0FBRWxDLHdCQUFJLENBQUMsUUFBUSxHQUFPLElBQUksR0FBRyxFQUFFLENBQUM7QUFDOUIsd0JBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO2lCQUNqQztBQUNELG9CQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDL0M7U0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDM0VpQixjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXckIsd0JBQUc7OztBQUNWLHdGQUFROztBQUVSLFlBQUksQ0FBQyxlQUFlLEdBQUcsQ0FDbkIsWUFBWSxFQUNaLE9BQU8sRUFDUCxPQUFPLENBQ1YsQ0FBQztLQUNMOzs7O2FBRWlCLGVBQUc7QUFDakIsbUJBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztTQUMvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDdkJpQixjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXckIsd0JBQUc7OztBQUNWLHdGQUFROztBQUVSLFlBQUksQ0FBQyxlQUFlLEdBQUcsQ0FDbkIsV0FBVyxFQUNYLFdBQVcsQ0FDZCxDQUFDO0tBQ0w7Ozs7YUFFaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkN0QmlCLGNBQWM7Ozs7Ozs7Ozs7O2FBS1osZUFBRztBQUNuQixtQkFBTztBQUNILHdCQUFRLEVBQUUsZ0JBQWdCO0FBQzFCLHNCQUFNLEVBQUksTUFBTTthQUNuQixDQUFBO1NBQ0o7OztBQUVVLHNCQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFOzs7QUFDMUIsd0ZBQU0sRUFBRSxFQUFFO0FBQ1YsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLFlBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDbkJxQixjQUFjOzs7Ozs7OEJBQ3JCLHVCQUF1Qjs7OztzQkFDdkIsaUJBQWlCOzs7O0FBRXBDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO0FBQ3BCLFVBQU0sRUFBSSxhQUFhO0FBQ3ZCLFlBQVEsRUFBRSxFQUFFO0FBQ1osVUFBTSxFQUFFLEVBQUU7QUFDVixjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxNQUFNO0NBQ3JCLENBQUMsQ0FBQzs7QUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtBQUNsQixVQUFNLEVBQUUsV0FBVztBQUNuQixZQUFRLEVBQUUsRUFBRTtBQUNaLFVBQU0sRUFBRSxDQUFDO0FBQ1QsY0FBVSxFQUFFLEVBQUU7QUFDZCxjQUFVLEVBQUUsTUFBTTtDQUNyQixDQUFDLENBQUM7O0FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7QUFDaEIsVUFBTSxFQUFFLFNBQVM7QUFDakIsWUFBUSxFQUFFLEVBQUU7QUFDWixVQUFNLEVBQUUsRUFBRTtBQUNWLGNBQVUsRUFBRSxFQUFFO0FBQ2QsY0FBVSxFQUFFLE9BQU87Q0FDdEIsQ0FBQyxDQUFDOztBQUVILElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0FBQ2YsVUFBTSxFQUFFLFFBQVE7QUFDaEIsWUFBUSxFQUFFLEdBQUc7QUFDYixVQUFNLEVBQUUsQ0FBQztBQUNULGNBQVUsRUFBRSxHQUFHO0FBQ2YsY0FBVSxFQUFFLE9BQU87Q0FDdEIsQ0FBQyxDQUFDOztBQUVILElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO0FBQ3BCLFVBQU0sRUFBRSxhQUFhO0FBQ3JCLFlBQVEsRUFBRSxFQUFFO0FBQ1osVUFBTSxFQUFFLEdBQUc7QUFDWCxjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxNQUFNO0NBQ3JCLENBQUMsQ0FBQzs7QUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNkLFVBQU0sRUFBRSxPQUFPO0FBQ2YsWUFBUSxFQUFFLEVBQUU7QUFDWixVQUFNLEVBQUUsRUFBRTtBQUNWLGNBQVUsRUFBRSxFQUFFO0FBQ2QsY0FBVSxFQUFFLE9BQU87Q0FDdEIsQ0FBQyxDQUFDOztJQUVHLFlBQVksWUFBWixZQUFZOzBCQUFaLFlBQVk7OztJQUdaLE1BQU07Y0FBTixNQUFNOztBQUVHLGFBRlQsTUFBTSxDQUVJLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFOzhCQUZ6QixNQUFNOztBQUdKLG1DQUhGLE1BQU0sNkNBR0k7QUFDUixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7QUFFZCxZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLENBQ25CLE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNULFNBQVMsRUFDVCxXQUFXLENBQ2QsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7O0FBRTNCLFlBQUksQ0FBQyxhQUFhLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUMvQixvQkFBUSxFQUFFLFVBQVU7U0FDdkIsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLFdBQVcsR0FBTSxTQUFTLENBQUM7OztBQUdoQyxZQUFJLENBQUMsWUFBWSxHQUFJLENBQUMsQ0FBQzs7QUFFdkIsWUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7O0FBR3JCLFlBQUcsR0FBRyxFQUFFO0FBQUMsZ0JBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1NBQUM7S0FDNUI7O2lCQTVCQyxNQUFNOztlQTRFRyx1QkFBRztBQUNWLGdCQUFJLENBQUMsYUFBYSxHQUFJLElBQUksQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUNuRCx3QkFBUSxFQUFFLFVBQVU7QUFDcEIsdUJBQU8sRUFBRSxJQUFJLENBQUMsV0FBVzthQUM1QixDQUFDLENBQUM7QUFDSCxnQkFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDaEM7OztlQUVVLHVCQUFHO0FBQ1YsZ0JBQUksQ0FBQyxZQUFZLEdBQUssTUFBTSxDQUFDO0FBQzdCLGdCQUFJLENBQUMsUUFBUSxHQUFTLENBQUMsQ0FBQztBQUN4QixnQkFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7U0FDL0I7Ozs7Ozs7ZUFLVSxxQkFBQyxFQUFFLEVBQUU7QUFDWixnQkFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUMzQixnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUMvQixnQkFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7U0FDcEM7Ozs7Ozs7ZUFLSyxnQkFBQyxFQUFFLEVBQUU7QUFDUCxnQkFBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUM7QUFDaEMsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ3ZCLGdCQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztTQUM5Qjs7Ozs7OztlQUtPLGtCQUFDLEVBQUUsRUFBRTtBQUNULGdCQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztBQUM5QixnQkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDM0IsZ0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7QUFDL0IsZ0JBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1NBQ2hDOzs7ZUFFUSxxQkFBRztBQUNSLGdCQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7O0FBRXZCLGdCQUFJLENBQUMsWUFBWSxHQUFLLE1BQU0sQ0FBQztBQUM3QixnQkFBSSxDQUFDLFFBQVEsR0FBUyxDQUFDLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDOztBQUU1QixnQkFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO1NBQy9COzs7Ozs7O2VBS2Esd0JBQUMsUUFBUSxFQUFFO0FBQ3JCLGdCQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUNsQixnQkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDOUI7OztlQUVjLDJCQUFHO0FBQ2QsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzVCLGdCQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEIsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixnQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQ3pCOzs7ZUFFZSw0QkFBRztBQUNmLGdCQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUN0QixnQkFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUN0Qjs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBRyxJQUFJLENBQUMsY0FBYyxFQUFFO0FBQ3BCLG9CQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDaEIsb0JBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ2xDLHdCQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztBQUM1Qix3QkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDM0Isd0JBQUcsSUFBSSxDQUFDLFVBQVUsRUFDZCxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM3QjthQUNKOztBQUVELGdCQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRTtBQUN2QixvQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2Ysb0JBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDOztBQUVsQixvQkFBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDNUIsd0JBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7QUFDL0Isd0JBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0FBQzNCLHdCQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUNqRDthQUNKOztBQUVELGdCQUFHLElBQUksQ0FBQyxZQUFZLElBQUksV0FBVyxFQUFFO0FBQ2pDLG9CQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEIsb0JBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxDQUFDLEVBQUU7QUFDdkIsZ0RBQU8sS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDL0Isd0JBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0FBQzNCLHdCQUFHLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO2lCQUN2QzthQUNKOztBQUVELGdCQUFHLElBQUksQ0FBQyxjQUFjLEVBQUU7QUFDcEIsb0JBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQzs7QUFFZixvQkFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDbEIsb0JBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQzVCLHdCQUFJLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUMzQix3QkFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDNUIsd0JBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQzNDO2FBQ0o7U0FDSjs7O2FBcEtlLGFBQUMsS0FBSyxFQUFFO0FBQ3BCLGdCQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hCLG9CQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUM5QjtTQUNKO2FBYWUsZUFBSTtBQUFDLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FBQzs7O2FBWC9CLGFBQUMsTUFBTSxFQUFFO0FBQ3RCLGdCQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUN2QyxvQkFBSSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7YUFDN0IsTUFBTTtBQUNILG9CQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQzthQUNoQztTQUNKO2FBR2dCLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsY0FBYyxDQUFBO1NBQUM7OzthQUR6QyxlQUFhO0FBQUMsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztTQUFDO2FBY2hDLGFBQUMsT0FBTyxFQUFFO0FBQ2IsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFOUIsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBRS9CLGdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQzlCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUUzQixnQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUN0QyxnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7QUFFbkMsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsb0JBQU8sTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM5QixnQkFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7QUFDOUIsb0JBQUksQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2FBQ25CO1NBQ0o7OzthQTVCYSxlQUFNO0FBQUMsbUJBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQTtTQUFDOzs7YUFFckMsZUFBWTtBQUFDLG1CQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7U0FBQzs7O2FBQ2xDLGVBQWM7QUFBQyxtQkFBTyxJQUFJLENBQUMsR0FBRyxDQUFDO1NBQUM7OzthQUNyQixlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUFDOzs7YUFDdkMsZUFBVTtBQUFDLG1CQUFPLElBQUksQ0FBQyxPQUFPLENBQUE7U0FBQzs7O2FBQzFCLGVBQUs7QUFBQyxtQkFBTyxJQUFJLENBQUMsWUFBWSxDQUFBO1NBQUM7OztlQUVoQyxtQkFBRztBQUNiLGdEQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRTtTQUM3Qjs7O1dBeERDLE1BQU07OztxQkFxTUcsTUFBTTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQzlQQyxjQUFjOzs7OzhCQUNkLHVCQUF1Qjs7OztJQUV2QyxJQUFJO2NBQUosSUFBSTs7QUFDSyxhQURULElBQUksQ0FDTSxJQUFJLEVBQUU7OEJBRGhCLElBQUk7O0FBRUYsbUNBRkYsSUFBSSw2Q0FFTTtBQUNSLFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FDbkIsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLENBQ1gsQ0FBQyxDQUFDOztBQUVILFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0tBQzlCOztXQVhDLElBQUk7OztxQkFjSyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkNqQkcsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV3JCLHNCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs7O0FBQ3pDLHdGQUFRO0FBQ1IsWUFBSSxDQUFDLGNBQWMsR0FBRyxDQUNsQixRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLENBQ1gsQ0FBQzs7QUFFRixZQUFJLENBQUMsWUFBWSxHQUFHLENBQ2hCLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsQ0FDWCxDQUFDOztBQUVGLFlBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUM1Qzs7OztlQU1lLDRCQUFHO0FBQ2YsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM5Qzs7O2VBRWEsMEJBQUc7QUFDYixnQkFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVDOzs7YUFWaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkNoQ29CLGNBQWM7Ozs7a0NBQ2Qsd0JBQXdCOzs7Ozs7O0FBR2xDLHNCQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7OztBQUNwQix3RkFBUTtBQUNSLFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQy9DLFlBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ25DOzs7O2VBRVUscUJBQUMsUUFBUSxFQUFFOzs7QUFDbEIsb0JBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQzthQUFBLENBQUMsQ0FBQztBQUNuRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQUEsQ0FBQyxDQUFDOztBQUVsRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQUEsQ0FBQyxDQUFDO0FBQ3ZELG9CQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTt1QkFBTSxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUM7YUFBQSxDQUFDLENBQUM7O0FBRXBELG9CQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTt1QkFBTSxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUM7YUFBQSxDQUFDLENBQUM7QUFDdkQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUFBLENBQUMsQ0FBQzs7QUFFcEQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUFBLENBQUMsQ0FBQztBQUN6RCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQUEsQ0FBQyxDQUFDOztBQUVyRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7dUJBQUssTUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQUEsQ0FBQyxDQUFDOztBQUUxRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7dUJBQUssTUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBQ3ZEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUN6QlksZ0JBQUMsR0FBRyxFQUFFO0FBQ2YsbUJBQU8sQ0FBQyxHQUFHLFFBQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDL0Y7OztlQUVXLGVBQUMsR0FBRyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxLQUFLLFFBQU0sR0FBRyxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDbkY7OztlQUVhLGlCQUFDLEdBQUcsRUFBRTtBQUNoQixtQkFBTyxDQUFDLEtBQUssUUFBTSxHQUFHLEVBQUksb0RBQW9ELENBQUMsQ0FBQztTQUNuRjs7O2VBRVMsYUFBQyxHQUFHLEVBQUU7QUFDWixtQkFBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Qjs7O2VBRVcsZUFBQyxHQUFHLEVBQUU7QUFDZCxtQkFBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDbkJvQixjQUFjOzs7O2tDQUNkLHdCQUF3Qjs7OztzQkFDeEIsVUFBVTs7OztBQUVuQyxJQUFJLE1BQU0sR0FBRyxDQUNULGNBQWMsRUFDZCxjQUFjLEVBQ2QsWUFBWSxFQUNaLGNBQWMsRUFDZCxlQUFlLEVBQ2YsZUFBZSxDQUNsQixDQUFDOzs7Ozs7O2VBSWUsdUJBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtBQUMzQixnQkFBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUMvQix1QkFBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDNUM7U0FDSjs7O2VBRVksdUJBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRTtBQUN2QixtQkFBTztBQUNILHNCQUFNLEVBQUUsRUFBRTtBQUNWLHVCQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMzQixzQkFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDckIsQ0FBQTtTQUNKOzs7QUFFVSxzQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFOzs7QUFDcEIsd0ZBQVE7QUFDUixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFHLElBQUksRUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUVsQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQzs7QUFFdEIsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQzNCOzs7Ozs7Ozs7OztlQVlHLGdCQUFHOzs7O0FBR0gsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUM1QixtQkFBRyxFQUFFLG9CQUFPLE9BQU87QUFDbkIscUJBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDOztBQUVILG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixzQkFBSyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEVBQUUsRUFBRztBQUN4Qix3Q0FBTyxPQUFPLDBDQUF3QyxFQUFFLENBQUcsQ0FBQztBQUM1RCwwQkFBSyxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7QUFHZCx3QkFBRyxNQUFLLEtBQUssRUFDVCxNQUFLLE9BQU8sQ0FBQyxNQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBSyxLQUFLLEVBQUU7QUFDeEMsa0NBQVUsRUFBRSxJQUFJO3FCQUNuQixDQUFDLENBQUMsQ0FBQzs7O0FBR1IsMEJBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxVQUFVLEVBQUc7O0FBRXRDLDRCQUFHLE1BQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7QUFDdEIsc0NBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDdEI7O0FBRUQsa0NBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQUk7QUFDdEIsZ0RBQU8sT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDckMsZ0RBQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZCLGdDQUFJLElBQUksR0FBRyxNQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxrQ0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVCLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUM7O0FBRUgsdUJBQUcsRUFBRSxDQUFDO2lCQUNULENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7ZUFFTSxpQkFBQyxVQUFVLEVBQUU7OztBQUNoQixnQkFBSSxJQUFJLEdBQUc7QUFDUCw0QkFBWSxFQUFFLFVBQVU7YUFDM0IsQ0FBQztBQUNGLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV2QyxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBQyxJQUFJLEVBQUc7QUFDMUIsb0JBQUksT0FBTyxHQUFHLE9BQUssYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEQsdUJBQUssYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CLENBQUMsQ0FBQzs7QUFFSCxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUN2Qix1QkFBSyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekIsQ0FBQyxDQUFDOztBQUVILG1CQUFPLElBQUksQ0FBQztTQUNmOzs7ZUFFWSx1QkFBQyxJQUFJLEVBQUU7O0FBRWhCLGdCQUFJLElBQUksR0FBRztBQUNQLHNCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDbEIscUJBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxJQUFJLFNBQVM7YUFDeEMsQ0FBQTs7O0FBR0QsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQ2YscUNBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLDhIQUFFO3dCQUE1QixLQUFJOztBQUNSLHlCQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2lCQUNwQjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELGdCQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQzs7O0FBR25CLGdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFdkQsZ0NBQU8sT0FBTyxtREFBaUQsSUFBSSxDQUFDLEVBQUUsQ0FBRyxDQUFDO0FBQzFFLGdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCOzs7ZUFFUyxvQkFBQyxJQUFJLEVBQUU7QUFDYixnQkFBSSxDQUFDLFdBQVcsQ0FBQztBQUNiLHVCQUFPLEVBQUUsZUFBZTtBQUN4QixzQkFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSTthQUMvQixDQUFDLENBQUM7QUFDSCxnQkFBSSxDQUFDLE1BQU0sVUFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7OztlQUVTLHNCQUFHO0FBQ1QsZ0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7Ozs7Ozs7ZUFLVyxzQkFBQyxPQUFPLEVBQUU7QUFDbEIsZ0NBQU8sT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7QUFDeEMsZ0NBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3BCLGdCQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7Ozs7OztBQUNaLDBDQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxtSUFBRTs0QkFBOUIsSUFBSTs7QUFDUiw0QkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7YUFDSjtTQUNKOzs7Ozs7O2VBS1ksdUJBQUMsT0FBTyxFQUFFO0FBQ25CLGdDQUFPLE9BQU8seUNBQXVDLE9BQU8sQ0FBQyxJQUFJLENBQUcsQ0FBQztBQUNyRSxnQ0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7OztBQUdwQixnQkFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFeEIsZ0JBQUcsT0FBTyxDQUFDLEtBQUssS0FBSyxjQUFjLEVBQUU7Ozs7Ozs7QUFFakMsMENBQWdCLElBQUksQ0FBQyxLQUFLLG1JQUFFOzRCQUFwQixJQUFJOztBQUNSLDRCQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDNUMsZ0RBQU8sT0FBTywwQkFBd0IsSUFBSSxDQUFHLENBQUM7QUFDOUMsZ0NBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO0FBQ2xDLDBDQUFVLEVBQUUsSUFBSTs2QkFDbkIsQ0FBQyxDQUFDLENBQUM7eUJBQ1A7cUJBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdELG9CQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEVBQUU7QUFDN0Usd0JBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQ3JEOztBQUVELHVCQUFPLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQzthQUNoQzs7QUFFRCxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM3Qjs7O2VBRWUsMEJBQUMsT0FBTyxFQUFFO0FBQ3RCLGdCQUFHLE9BQU8sQ0FBQyxLQUFLLEtBQUssWUFBWSxFQUFFO0FBQy9CLG9CQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2FBQ3hDO0FBQ0QsZ0JBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3RFOzs7YUF4SkssZUFBRztBQUNMLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JDMUNjLGFBQWE7Ozs7QUFFaEMsSUFBSSxXQUFXLEdBQUcsbUJBQW1CLENBQUM7Ozs7Ozs7Ozs7Ozs7O2VBUWxCLG1CQUFDLFFBQVEsRUFBRTtBQUN2QixtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUc7QUFDM0Isb0JBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsbUJBQUcsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUNwQiwwQ0FBTyxHQUFHLHVCQUFxQixRQUFRLENBQUcsQ0FBQztBQUMzQyx1QkFBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNaLENBQUE7QUFDRCxtQkFBRyxDQUFDLEdBQUcsR0FBRyxXQUFXLEdBQUcsU0FBUyxHQUFHLFFBQVEsQ0FBQzthQUNoRCxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbEJVLHNCQUFDLElBQUksRUFBRTs7O0FBQ2QsZUFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLGNBQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztLQUMxQjs7OztlQUVHLGdCQUFHO0FBQ0gsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkNUb0IsY0FBYzs7Ozs7QUFHeEIsd0JBQUc7OztBQUNWLFlBQUksQ0FBQyxVQUFVLEdBQUcsMEJBQTBCLENBQUM7S0FDaEQ7Ozs7ZUFFWSx5QkFBRzs7O0FBQ1osZ0JBQUcsb0JBQU8sYUFBYSxFQUFFO0FBQ3JCLHVCQUFPO2FBQ1Y7QUFDRCxnQkFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVsQixnQkFBSSxNQUFNLEdBQUcsQ0FDVDtBQUNJLHNCQUFNLEVBQUUsV0FBVztBQUNuQixxQkFBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZTthQUMzQyxFQUNEO0FBQ0ksc0JBQU0sRUFBRSxhQUFhO0FBQ3JCLHFCQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxpQkFBaUI7YUFDN0MsRUFDRDtBQUNJLHNCQUFNLEVBQUUsZ0JBQWdCO0FBQ3hCLHFCQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxvQkFBb0I7YUFDaEQsRUFDRDtBQUNJLHNCQUFNLEVBQUUsY0FBYztBQUN0QixxQkFBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcsdUJBQXVCO2FBQ25ELEVBQ0Q7QUFDSSxzQkFBTSxFQUFFLGVBQWU7QUFDdkIscUJBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLHFCQUFxQjthQUNqRCxDQUNKLENBQUM7O0FBRUYsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7d0JBRWpCLEtBQUs7O0FBQ1QsNEJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFHOztBQUVsQyw4QkFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxJQUFJLENBQUM7QUFDbEMsZ0NBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDakIsa0NBQU0sRUFBRSxHQUFHO0FBQ1gsdUNBQVcsRUFBRSxHQUFHO3lCQUNuQixDQUFDLENBQUMsQ0FBQztxQkFDUCxDQUFDLENBQUMsQ0FBQzs7O0FBUlIscUNBQWlCLE1BQU0sOEhBQUU7O2lCQVN4Qjs7Ozs7Ozs7Ozs7Ozs7OztBQUVELG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7OztlQUVHLGNBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDMUIsZ0JBQUcsb0JBQU8sYUFBYSxFQUFFLE9BQU87QUFDaEMsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3hDLGlCQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQztBQUMxQixpQkFBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUM7QUFDM0IsaUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQjs7O2VBRUcsY0FBQyxTQUFTLEVBQUU7QUFDWixnQkFBRyxvQkFBTyxhQUFhLEVBQUUsT0FBTztBQUNoQyxnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsaUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VDT1csc0JBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN4QixnQkFBRyxDQUFDLEtBQUssRUFBRTtBQUNQLHFCQUFLLEdBQUcsZ0VBQWdFLENBQUM7YUFDNUU7QUFDRCxnQkFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGlCQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUFFLHNCQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxDQUFDLENBQUM7YUFBQSxBQUNqRyxPQUFPLE1BQU0sQ0FBQztTQUNqQjs7O2VBN0VnQixvQkFBQyxNQUFNLEVBQUU7QUFDdEIsbUJBQU8sSUFBSSxNQUFNLHFCQUFtQixNQUFNLFNBQU0sQ0FBQztTQUNwRDs7O2VBRWUsbUJBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTs7O0FBR3RCLGdCQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7QUFHaEMsZUFBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDaEIsZ0JBQUksUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7O0FBRTFCLG1CQUFRLENBQUEsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFDO0FBQ3ZCLHFDQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHNUIsb0JBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDL0Isb0JBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7O0FBRXZCLG9CQUFJLEtBQUssR0FBRyxRQUFRLEVBQUU7Ozs7QUFJbEIsd0JBQUksR0FBRyxHQUFHLEdBQUksS0FBSyxHQUFHLFFBQVEsQUFBQyxDQUFDOzs7QUFHaEMsc0JBQUUsRUFBRSxDQUFDO2lCQUNSO2FBQ0osQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFFO1NBQ1Q7OztlQUVzQiwwQkFBQyxFQUFFLEVBQUU7QUFDeEIsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQztBQUNkLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZCxtQkFBTyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztTQUNuQjs7O2VBRWdCLG9CQUFDLE1BQU0sRUFBRTtBQUN0QixnQkFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFDLGdCQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXBCLGdCQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7O0FBRTVCLGlCQUFLLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0FBRTVCLG1CQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVkLG9CQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7O0FBRXpCLDhCQUFVLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3JELE1BQ0k7O0FBRUQsdUJBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVyQix1QkFBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUV4Qyx5QkFBSyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUUxQyw4QkFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDM0I7YUFDSjs7QUFFRCxtQkFBTyxVQUFVLENBQUM7U0FDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDbkVvQix3QkFBd0I7Ozs7Ozs0Q0FHeEIsa0NBQWtDOzs7O3NCQUN4QyxjQUFjOzs7OzhCQUNkLG9CQUFvQjs7OztvQ0FDZCwwQkFBMEI7Ozs7OzswQkFHMUIsY0FBYzs7Ozt5QkFDZCxhQUFhOzs7O3dCQUNiLFlBQVk7Ozs7NEJBQ1osZ0JBQWdCOzs7O3lCQUNoQixhQUFhOzs7O3NCQUNiLFVBQVU7Ozs7eUJBQ1YsYUFBYTs7Ozs7OztBQUd2Qix3QkFBRzs7O0FBQ1Ysd0ZBQVE7O0FBRVIsWUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDO0FBQzlCLFlBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsWUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQU8sWUFBWSxDQUFDO0FBQ3pDLFlBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLG9CQUFPLGFBQWEsQ0FBQzs7QUFFM0MsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBRTNCOzs7Ozs7Ozs7ZUFNSyxrQkFBRztBQUNMLGdDQUFPLFNBQVMsRUFBRSxDQUFDO0FBQ25CLGdCQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBTyxZQUFZLENBQUM7QUFDekMsZ0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLG9CQUFPLGFBQWEsQ0FBQztBQUMzQyxnQkFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7U0FDM0M7OztlQUVHLGNBQUMsSUFBSSxFQUFFO0FBQ1AsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOztBQUVsQixnQkFBSSxDQUFDLFVBQVUsR0FBRywyQkFBYyxJQUFJLENBQUMsQ0FBQzs7QUFFdEMsZ0JBQUksQ0FBQyxhQUFhLEdBQUcsK0NBQWtCLENBQUM7O0FBRXhDLGdCQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsZ0JBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDOzs7O0FBSXhDLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRTFELGdCQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLGdCQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xEOzs7OztlQUdHLGdCQUFHO0FBQ0gsaUNBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFNUMsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7OztBQUc1QixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTs7QUFFdkIsb0JBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxBQUFDLENBQUM7OztBQUcxQyxvQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztBQUMvQixvQkFBSSxDQUFDLE1BQU0sR0FBRyxBQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsb0JBQU8sR0FBRyxHQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzs7QUFHekQsb0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHekIsb0JBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLEdBQUUsSUFBSSxDQUFDO0FBQzVDLGtCQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDZixvQkFBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBRzNDLG9CQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakI7U0FDSjs7O2VBRUssZ0JBQUMsS0FBSyxFQUFFO0FBQ1YsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFnQixvQkFBTyxZQUFZLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFlLG9CQUFPLGFBQWEsQ0FBQztBQUN2RCxnQkFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7O0FBRXhDLGdCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsb0JBQU8sWUFBWSxFQUFFLG9CQUFPLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7O0FBRXBFLHFDQUFnQixJQUFJLENBQUMsTUFBTSw4SEFBRzt3QkFBdEIsSUFBSTs7QUFDUix3QkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzs7Ozs7Ozs7Ozs7Ozs7OztBQUVELGdCQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDdkQ7OztlQUVlLDRCQUFHO0FBQ2YsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7QUFFZixnQkFBRyxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ25CLHFCQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNsQzs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7OztlQUVjLDJCQUFHO0FBQ2Qsb0JBQ0ksSUFBSSxDQUFDLFNBQVMsNEJBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FDZDtTQUNMOzs7ZUFFVSx1QkFBRztBQUNWLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUMsb0JBQU8sR0FBRyxDQUFDO0FBQ2hDLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLGdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixrQkFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEQ7Ozs7Ozs7ZUFJaUIsNEJBQUMsSUFBSSxFQUFFOzs7QUFDckIsZ0JBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsT0FBTyxFQUFJO0FBQzlCLDRDQUFPLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3RDLDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixvQkFBRyxPQUFPLElBQUksV0FBVyxFQUFFOzs7QUFFdkIsNEJBQUcsQ0FBQyxNQUFLLFVBQVUsRUFBRTtBQUNqQixrQ0FBSyxXQUFXLEVBQUUsQ0FBQzt5QkFDdEI7QUFDRCw0QkFBSSxZQUFZLEdBQUcsOEJBQWlCLElBQUksQ0FBQyxRQUFRLFFBQU8sQ0FBQztBQUN6RCxvQ0FBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQ3pCLGtDQUFLLGFBQWEsR0FBRyxZQUFZLENBQUM7QUFDbEMsa0NBQUssTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsTUFBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO3lCQUMvQyxDQUFDLENBQUM7O2lCQUNOLE1BQU0sSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFOztBQUMzQiw0QkFBSSxTQUFTLEdBQUcsMkJBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxRQUFPLENBQUM7QUFDOUQsaUNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBSTtBQUN0QixrQ0FBSyxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQzVCLGtDQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQUssVUFBVSxDQUFDLENBQUMsQ0FBQzt5QkFDNUMsQ0FBQyxDQUFDOztpQkFDTixNQUFNLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBRTs7Ozs7Ozs7Ozs7QUFFNUIsNEJBQUksUUFBUSxHQUFHLDBCQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2Qyw4QkFBSyxTQUFTLEdBQUcsUUFBUSxDQUFDOztBQUUxQiw0QkFBSSxRQUFRLEdBQUcsQ0FDWCxRQUFRLENBQUMsYUFBYSxFQUFFLENBQzNCLENBQUM7O0FBRUYsNEJBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7O0FBR2YsOEJBQUssWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Ozs7OztBQUM5Qiw4Q0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsMkhBQUU7b0NBQWpDLE1BQU07O0FBQ1Ysb0NBQUksVUFBVSxHQUFHLDRCQUFlLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLHdDQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLHFDQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZCLHNDQUFLLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQzs2QkFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCw0QkFBSSxNQUFNLEdBQUcsd0JBQVcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxRQUFPLENBQUM7QUFDckQsOEJBQUssT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUN0QixnQ0FBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzs7O0FBR3RDLDRCQUFJLFlBQVksR0FBRyx1Q0FBa0IsQ0FBQztBQUN0Qyw4QkFBSyxhQUFhLEdBQUcsWUFBWSxDQUFDO0FBQ2xDLGdDQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDOzs7QUFHNUMsK0JBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDM0Isa0NBQUssTUFBTSxJQUNQLE1BQUssU0FBUyxTQUNYLEtBQUssR0FDUixNQUFLLE9BQU8sRUFDZixDQUFDO0FBQ0Ysa0NBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO3lCQUN0RCxDQUFDLENBQUM7O2lCQUNOO2FBQ0osQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLE1BQU0sRUFBRztBQUM1QixvQkFBRyxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sRUFDM0IsTUFBSyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUN0QyxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsTUFBTSxFQUFHO0FBQy9CLDRDQUFPLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ25DLDRDQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDeEIsb0JBQUcsTUFBSyxZQUFZLEVBQUU7QUFDbEIsMEJBQUssWUFBWSxVQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BDLDBCQUFLLE1BQU0sR0FBRyxNQUFLLGVBQWUsRUFBRSxDQUFDO2lCQUN4QzthQUNKLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxXQUFXLEVBQUUsVUFBQyxLQUFLLEVBQUc7QUFDMUIsb0JBQUksU0FBUyxHQUFHLDJCQUFjLEtBQUssQ0FBQyxDQUFDO0FBQ3JDLHlCQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDL0Isd0JBQUcsTUFBSyxXQUFXLEVBQUU7QUFDakIsOEJBQUssV0FBVyxJQUNaLFNBQVMsNEJBQ04sTUFBSyxXQUFXLEVBQ3RCLENBQUM7cUJBQ0wsTUFBTTtBQUNILDhCQUFLLFdBQVcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUNsQztpQkFDSixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFlBQUk7QUFDeEIsc0JBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUN6QyxzQkFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDbEQsc0JBQUssTUFBTSxnQ0FDSixNQUFLLE1BQU0sc0JBQ1gsTUFBSyxXQUFXLEVBQ3RCLENBQUM7YUFDTCxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxNQUFNLEVBQUc7QUFDakMsb0JBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUNmLDBCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDN0M7YUFDSixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsTUFBTSxFQUFHLEVBQ2xDLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBSTtBQUN0QixzQkFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3hDLHNCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUNuRCxzQkFBSyxNQUFNLElBQ1AsTUFBSyxTQUFTLDRCQUNYLE1BQUssWUFBWSxDQUFDLE1BQU0sRUFBRSxJQUM3QixNQUFLLE9BQU8sRUFDZixDQUFDO2FBQ0wsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7ZUFLb0IsK0JBQUMsS0FBSyxFQUFFOzs7O0FBRXpCLGlCQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxZQUFJO0FBQ2Ysb0JBQUksU0FBUyxHQUFHLE9BQUssS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4Qyx3QkFBTyxTQUFTO0FBQ1oseUJBQUssV0FBVztBQUNaLCtCQUFLLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUN4Qiw4QkFBTTtBQUFBLEFBQ1YseUJBQUssU0FBUztBQUNWLCtCQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNsQiwrQkFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLDhCQUFNO0FBQUEsaUJBQ2I7YUFDSixDQUFDLENBQUM7OztBQUdILGlCQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFJO0FBQ2pCLG9CQUFJLFNBQVMsR0FBRyxPQUFLLEtBQUssQ0FBQyxZQUFZLENBQUM7QUFDeEMsd0JBQU8sU0FBUztBQUNaLHlCQUFLLFdBQVc7QUFDWiwrQkFBSyxhQUFhLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDMUIsOEJBQU07QUFBQSxBQUNWLHlCQUFLLFNBQVM7QUFDViwrQkFBSyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEIsK0JBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyw4QkFBTTtBQUFBLGlCQUNiO2FBQ0osQ0FBQyxDQUFDOzs7QUFHSCxpQkFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBSTtBQUNqQixvQkFBSSxTQUFTLEdBQUcsT0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3hDLHdCQUFPLFNBQVM7QUFDWix5QkFBSyxPQUFPO0FBQ1IsK0JBQUssVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3ZCLDhCQUFNO0FBQUEsQUFDVix5QkFBSyxTQUFTO0FBQ1YsK0JBQUssT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLCtCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsOEJBQU07QUFBQSxpQkFDYjthQUNKLENBQUMsQ0FBQzs7O0FBR0gsaUJBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDbEIsb0JBQUksU0FBUyxHQUFHLE9BQUssS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4Qyx3QkFBTyxTQUFTO0FBQ1oseUJBQUssT0FBTztBQUNSLCtCQUFLLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4Qiw4QkFBTTtBQUFBLEFBQ1YseUJBQUssU0FBUztBQUNWLCtCQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQiwrQkFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLDhCQUFNO0FBQUEsaUJBQ2I7YUFDSixDQUFDLENBQUM7OztBQUdILGlCQUFLLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFJO0FBQ3BCLG9CQUFJLFNBQVMsR0FBRyxPQUFLLEtBQUssQ0FBQyxZQUFZLENBQUM7QUFDeEMsd0JBQU8sU0FBUztBQUNaLHlCQUFLLFdBQVc7QUFDWiwrQkFBSyxhQUFhLENBQUMsT0FBTyxRQUFNLENBQUM7QUFDakMsOEJBQU07QUFBQSxBQUNWLHlCQUFLLE9BQU87QUFDUiwrQkFBSyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDMUIsOEJBQU07QUFBQSxBQUNWLHlCQUFLLFNBQVM7QUFDViwrQkFBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdkIsK0JBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUN2Qyw4QkFBTTtBQUFBLGlCQUNiO2FBQ0osQ0FBQyxDQUFDOzs7QUFHSCxpQkFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBSSxFQUVwQixDQUFDLENBQUM7O0FBRUgsaUJBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDbEIsdUJBQUssVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVCLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQ2pWdUIsY0FBYzs7Ozs7QUFHM0Isc0JBQUMsSUFBSSxFQUFFOzs7QUFDZCxZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztLQUNyQjs7OztlQUVLLGtCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzVCOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtBQUNwQixnQkFBRyxJQUFJLENBQUMsS0FBSyxFQUFFOztBQUVYLG9CQUFJLFFBQVEsR0FBVyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDO0FBQzdDLG1CQUFHLENBQUMsSUFBSSxHQUFVLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztBQUM5QyxtQkFBRyxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7O0FBRTVCLG9CQUFJLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWQsbUJBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEdBQUcsR0FBRyxvQkFBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVyRSxvQkFBSSxJQUFJLFFBQVEsQ0FBQzs7QUFFakIsbUJBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQzs7Ozs7OztBQUVuQyx5Q0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsOEhBQUU7NEJBQWpDLE1BQU07O0FBQ1YsNEJBQUksSUFBSSxRQUFRLENBQUM7QUFDakIsMkJBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEMsNEJBQUksSUFBSSxRQUFRLENBQUM7QUFDakIsMkJBQUcsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUQsNEJBQUksSUFBSSxRQUFRLENBQUM7QUFDakIsMkJBQUcsQ0FBQyxRQUFRLENBQUMsa0JBQWtCLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hGLDRCQUFJLElBQUksUUFBUSxDQUFDO0FBQ2pCLDJCQUFHLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxNQUFNLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE1BQU0sQ0FBQSxBQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3pHLDRCQUFJLElBQUksUUFBUSxDQUFDO0FBQ2pCLDJCQUFHLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNuRTs7Ozs7Ozs7Ozs7Ozs7O2FBQ0o7U0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDeEN1QixjQUFjOzs7OzZCQUN4QixtQkFBbUI7Ozs7c0JBQ2xCLGNBQWM7Ozs7Ozs7QUFHbEIsc0JBQUMsS0FBSyxFQUFFOzs7QUFDZix3RkFBTztBQUNQLFlBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOztBQUVwQixZQUFJLENBQUMsT0FBTyxHQUFHLENBQ1g7QUFDSSxrQkFBTSxFQUFFLFFBQVE7QUFDaEIsbUJBQU8sRUFBRSxnQkFBZ0I7U0FDNUIsQ0FDSixDQUFDO0tBQ0w7Ozs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ2YsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsQUFBQyxLQUFLLEdBQUcsb0JBQU8sR0FBRyxHQUFDLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVDLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFM0MsZUFBRyxDQUFDLFNBQVMsTUFBQSxDQUFiLEdBQUcsRUFBYyxDQUNiLE1BQU0sRUFDTixNQUFNLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxFQUN6QixDQUFDLEVBQ0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUM7QUFDckMsZ0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDO0FBQ3RDLGNBQUUsRUFDRixFQUFFO0FBQ0YsZ0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWTtBQUN6RCxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxvQkFBTyxZQUFZO2FBQzdELENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkNoQ3VCLGNBQWM7Ozs7NkJBQ2QsbUJBQW1COzs7O3NCQUNuQixjQUFjOzs7O3VDQUNkLDZCQUE2Qjs7OzttQ0FDN0IsMEJBQTBCOzs7O0FBRXRELElBQUksU0FBUyw0UEFTWixDQUFDOzs7OztBQUdhLHNCQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFOzs7QUFDOUIsd0ZBQU0sS0FBSyxFQUFFO0FBQ2IsWUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEIsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsWUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7QUFDeEIsWUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQUM5QixZQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNwQixZQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztLQUM1Qjs7OztlQUVZLHVCQUFDLElBQUksRUFBRTs7O0FBQ2hCLGdCQUFJLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBO0FBQzVCLGdCQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN6RCxnQkFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQzs7QUFFN0IsZ0JBQUksYUFBYSxHQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN0RSxnQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUVsRSxnQkFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOzs7Ozs7O0FBRTVELHFDQUFlLGlDQUFPLE9BQU8sRUFBRSw4SEFBRTt3QkFBekIsR0FBRzs7QUFDUCx3QkFBSSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNoRCw2QkFBUyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQzNCLDZCQUFTLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDL0IsNkJBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQyx3QkFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ3ZDLHNCQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN0QixzQkFBSyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCLENBQUMsQ0FBQzs7QUFFSCx5QkFBYSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ3hDLHNCQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxPQUFPLEdBQUc7QUFDWCx1QkFBTyxFQUFFLE9BQU87QUFDaEIsc0JBQU0sRUFBRSxrQkFBSTtBQUNSLDJCQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7QUFDaEIsMEJBQUssT0FBTyxHQUFHLFNBQVMsQ0FBQztpQkFDNUI7QUFDRCx1QkFBTyxFQUFFLG1CQUFJO0FBQ1Qsd0JBQUcsU0FBUyxDQUFDLEtBQUssRUFBRTtBQUNoQiw0QkFBSSxDQUFDLFdBQVcsQ0FBQztBQUNiLG1DQUFPLEVBQUUsWUFBWTtBQUNyQixrQ0FBTSxFQUFFLE1BQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN2QyxrQ0FBTSxFQUFFO0FBQ0oscUNBQUssRUFBRSxTQUFTLENBQUMsS0FBSzs2QkFDekI7eUJBQ0osQ0FBQyxDQUFDO0FBQ0gsOEJBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUN6QjtpQkFDSjthQUNKLENBQUM7U0FDTDs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNmLGVBQUcsQ0FBQyxTQUFTLEdBQU8sU0FBUyxDQUFDO0FBQzlCLGVBQUcsQ0FBQyxXQUFXLEdBQUssU0FBUyxDQUFDOztBQUU5QixnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2YsZ0JBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQzs7QUFFZixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDakMsZUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hDLGVBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxlQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUFDbEMsc0NBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLG1JQUFFO3dCQUFsQyxNQUFNOztBQUNWLHVCQUFHLENBQUMsU0FBUyxHQUFPLFNBQVMsQ0FBQztBQUM5Qix3QkFBSSxJQUFJLEVBQUUsQ0FBQztBQUNYLHVCQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVyQyx3QkFBRyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ1gsNEJBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzNFLDJCQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3BDOztBQUVELHdCQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksT0FBTyxFQUFFO0FBQy9CLDJCQUFHLENBQUMsU0FBUyxHQUFPLFNBQVMsQ0FBQztBQUM5QiwyQkFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNwQyxNQUFNO0FBQ0gsMkJBQUcsQ0FBQyxTQUFTLEdBQU8sU0FBUyxDQUFDO0FBQzlCLDJCQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3hDO2lCQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZUFBRyxDQUFDLFNBQVMsR0FBTyxTQUFTLENBQUM7Ozs7OztBQUM5QixzQ0FBc0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLG1JQUFFO3dCQUExQyxVQUFVOztBQUNkLHdCQUFJLGNBQWMsR0FBRyxVQUFVLENBQUM7OztBQUdoQyx3QkFBRyxjQUFjLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQ3RFLGNBQWMsR0FBRyxJQUFJLEdBQUcsY0FBYyxDQUFDOzs7QUFHM0MsdUJBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4Qyx3QkFBSSxJQUFJLEdBQUcsQ0FBQztpQkFDZjs7Ozs7Ozs7Ozs7Ozs7O1NBQ0o7OztlQU1HLGdCQUFHO0FBQ0gsZ0JBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUU5QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUNuQzs7O2VBRUksaUJBQUc7QUFDSixnQkFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUM3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBRTlCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ25DOzs7ZUFFTSxtQkFBRztBQUNOLGdCQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNkLG9CQUFHLElBQUksQ0FBQyxjQUFjLElBQUksWUFBWSxFQUFFO0FBQ3BDLHdCQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbEMsTUFBTSxJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksT0FBTyxFQUFFO0FBQ3RDLHdCQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztBQUNuQiwrQkFBTyxFQUFFLFlBQVk7cUJBQ3hCLENBQUMsQ0FBQztpQkFDTixNQUFNLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEVBQUU7QUFDdEMsd0JBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLHdCQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztBQUNuQiwrQkFBTyxFQUFFLGNBQWM7QUFDdkIsOEJBQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN2Qyw4QkFBTSxFQUFFO0FBQ0osbUNBQU8sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sR0FBRyxNQUFNO3lCQUMxQztxQkFDSixDQUFDLENBQUM7aUJBQ047YUFDSixNQUFNO0FBQ0gsb0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUI7U0FDSjs7O2VBRUcsZ0JBQUcsRUFDTjs7O2FBMUNpQixlQUFHO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkMzSHVCLGNBQWM7Ozs7NkJBQ2QsbUJBQW1COzs7O3NCQUNuQixjQUFjOzs7O3VDQUNkLDZCQUE2Qjs7OztBQUV6RCxJQUFJLFVBQVUsa1ZBVWIsQ0FBQzs7QUFFRixJQUFJLFVBQVUsNlpBWWIsQ0FBQzs7Ozs7QUFHYSxzQkFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFOzs7QUFDeEIsd0ZBQU0sUUFBUSxFQUFFO0FBQ2hCLFlBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQzFCLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7QUFDOUIsWUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDNUI7Ozs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ2YsZUFBRyxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7O0FBRTVCLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUM7QUFDZixnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDOzs7Ozs7O0FBRWYscUNBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyw4SEFBRTt3QkFBN0MsVUFBVTs7QUFDZCx3QkFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDOzs7QUFHaEMsd0JBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUN6RSxjQUFjLEdBQUcsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7O0FBRzNDLHVCQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEMsd0JBQUksSUFBSSxHQUFHLENBQUM7aUJBQ2Y7Ozs7Ozs7Ozs7Ozs7OztTQUNKOzs7ZUFNYSx3QkFBQyxJQUFJLEVBQUU7OztBQUNqQixnQkFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQUM1QixnQkFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDMUQsZ0JBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7O0FBRTdCLGdCQUFJLFVBQVUsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDaEUsZ0JBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFbEUsZ0JBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM1RCxnQkFBSSxPQUFPLEdBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUUxRCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5DLHFCQUFTLENBQUMsT0FBTyxHQUFHLFlBQUk7QUFDcEIsb0JBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7QUFDOUIsOEJBQVUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzFDLE1BQU07QUFDSCw4QkFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzdDO2FBQ0osQ0FBQTs7QUFFRCx3QkFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ3ZDLHNCQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN0QixzQkFBSyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCLENBQUMsQ0FBQzs7QUFFSCxzQkFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ3JDLHNCQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxPQUFPLEdBQUc7QUFDWCx1QkFBTyxFQUFFLE9BQU87QUFDaEIsc0JBQU0sRUFBRSxrQkFBVztBQUNmLHdCQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO2lCQUN4QjtBQUNELHVCQUFPLEVBQUUsbUJBQVc7QUFDaEIsd0JBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRTtBQUN2Qiw0QkFBSSxDQUFDLFdBQVcsQ0FBQztBQUNiLG1DQUFPLEVBQUUsVUFBVTtBQUNuQixrQ0FBTSxFQUFFO0FBQ0osb0NBQUksRUFBRSxTQUFTLENBQUMsS0FBSztBQUNyQixrQ0FBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLOzZCQUNwQjt5QkFDSixDQUFDLENBQUM7QUFDSCw0QkFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNqQjtpQkFDSjthQUNKLENBQUM7U0FDTDs7O2VBRWEsd0JBQUMsSUFBSSxFQUFFOzs7QUFDakIsZ0JBQUksTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7QUFDNUIsZ0JBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGdCQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDOztBQUc3QixnQkFBSSxVQUFVLEdBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2hFLGdCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7O0FBRWxFLGdCQUFJLFNBQVMsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUQsZ0JBQUksU0FBUyxHQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM5RCxnQkFBSSxPQUFPLEdBQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU1RCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5DLGdCQUFJLFVBQVUsR0FBRyxTQUFiLFVBQVUsR0FBYztBQUN4QixvQkFBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDakQsOEJBQVUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzFDLE1BQU07QUFDSCw4QkFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzdDO2FBQ0osQ0FBQztBQUNGLHFCQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMscUJBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFMUMsd0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUN2Qyx1QkFBSyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdEIsdUJBQUssT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QixDQUFDLENBQUM7O0FBRUgsc0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUNyQyx1QkFBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUIsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsT0FBTyxHQUFHO0FBQ1gsdUJBQU8sRUFBRSxPQUFPO0FBQ2hCLHNCQUFNLEVBQUUsa0JBQVc7QUFDZix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtpQkFDeEI7QUFDRCx1QkFBTyxFQUFFLG1CQUFXO0FBQ2hCLHdCQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRTtBQUNqRCw0QkFBSSxDQUFDLFdBQVcsQ0FBQztBQUNiLG1DQUFPLEVBQUUsVUFBVTtBQUNuQixrQ0FBTSxFQUFFO0FBQ0osb0NBQUksRUFBRSxTQUFTLENBQUMsS0FBSztBQUNyQixzQ0FBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLO0FBQ3ZCLGtDQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUs7NkJBQ3BCO3lCQUNKLENBQUMsQ0FBQztBQUNILDRCQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2pCO2lCQUNKO2FBQ0osQ0FBQztTQUNMOzs7ZUFFQyxjQUFHO0FBQ0QsZ0JBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyRTs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ2I7OztlQUVNLG1CQUFHO0FBQ04sZ0JBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2Qsb0JBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxXQUFXLEVBQUU7QUFDbkMsd0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNuQyxNQUFNO0FBQ0gsd0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNuQzthQUNKLE1BQU07QUFDSCxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQjtTQUNKOzs7ZUFFRyxnQkFBRztBQUNILGdCQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7OzthQXBJaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RVLHNCQUFDLE1BQU0sRUFBRTs7O0FBQ2hCLFlBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ3pCOzs7Ozs7Ozs7ZUFNVyxzQkFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFOzs7QUFDekIsbUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFHO0FBQzNCLG9CQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLG1CQUFHLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDcEIsMkJBQU8sQ0FBQyxHQUFHLHVCQUFxQixRQUFRLENBQUcsQ0FBQztBQUM1Qyx1QkFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNiLENBQUE7QUFDRCxtQkFBRyxDQUFDLEdBQUcsR0FBRywwQkFBMEIsR0FBRyxRQUFRLENBQUM7OztBQUdoRCxvQkFBRyxDQUFDLE1BQUssVUFBVSxFQUFFO0FBQ2pCLDBCQUFLLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO2lCQUMvQjtBQUNELHNCQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDLENBQUMsQ0FBQztTQUNOOzs7ZUFFWSx5QkFBRztBQUNaLGdCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7Ozs7OztBQUNqQixxQ0FBaUIsSUFBSSxDQUFDLE9BQU8sOEhBQUU7d0JBQXZCLEtBQUs7O0FBQ1QsNEJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7Ozs7Ozs7ZUFLRyxnQkFBRzs7O0FBQ0gsbUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFHO0FBQzNCLG1CQUFHLEVBQUUsQ0FBQztBQUNOLG9CQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQzFCLDBDQUFpQixPQUFLLE9BQU8sbUlBQUU7NEJBQXZCLEtBQUs7O0FBQ1QsdUNBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3REOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsdUJBQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNLEVBQUc7Ozs7OztBQUN6Qyw4Q0FBaUIsTUFBTSxtSUFBRTtnQ0FBakIsS0FBSzs7QUFDVCxnQ0FBRyxDQUFDLE9BQUssVUFBVSxFQUNmLE9BQUssVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWhDLG1DQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCx1QkFBRyxFQUFFLENBQUM7aUJBQ1QsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQzFEdUIsY0FBYzs7Ozs2QkFDZCxtQkFBbUI7Ozs7c0JBQ25CLGNBQWM7Ozs7dUNBQ2QsNkJBQTZCOzs7O0FBRXpELElBQUksV0FBVyxHQUFHO0FBQ2QsaUJBQWEsRUFBRSx1QkFBdUI7QUFDdEMsZUFBVyxFQUFFLHFCQUFxQjtBQUNsQyxhQUFTLEVBQUUsb0JBQW9CO0FBQy9CLFlBQVEsRUFBRSxrQkFBa0I7QUFDNUIsaUJBQWEsRUFBRSx1QkFBdUI7QUFDdEMsV0FBTyxFQUFFLGlCQUFpQjtDQUM3QixDQUFDOzs7OztBQUdhLHNCQUFDLE1BQU0sRUFBRTs7O0FBQ2hCLHdGQUFNLE1BQU0sRUFBRTtBQUNkLFlBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztBQUV0QixZQUFJLENBQUMsT0FBTyxHQUFHLENBQ1g7QUFDSSxrQkFBTSxFQUFFLFFBQVE7QUFDaEIsbUJBQU8sRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDeEMsRUFDRDtBQUNJLGtCQUFNLEVBQUUsUUFBUTtBQUNoQixtQkFBTyxFQUFFLFlBQVk7U0FDeEIsRUFDRDtBQUNJLGtCQUFNLEVBQUUsUUFBUTtBQUNoQixtQkFBTyxFQUFFLFlBQVk7U0FDeEIsQ0FDSixDQUFDO0tBQ0w7Ozs7ZUFFWSx5QkFBRztBQUNaLGdCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7Ozs7OztBQUNqQixxQ0FBaUIsSUFBSSxDQUFDLE9BQU8sOEhBQUU7d0JBQXZCLEtBQUs7O0FBQ1QsNEJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssR0FBUyxBQUFDLEtBQUssR0FBRyxvQkFBTyxHQUFHLEdBQUMsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWxELGdCQUFJLFdBQVcsR0FBSSxvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxDQUFDOztBQUUxRCxnQkFBSSxPQUFPLEdBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUMsb0JBQU8sU0FBUyxDQUFDO0FBQ3RELGdCQUFJLE9BQU8sR0FBUSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBQyxvQkFBTyxTQUFTLENBQUM7O0FBRXRELGdCQUFJLE1BQU0sR0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFakQsZ0JBQUksTUFBTSxHQUFTLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELGdCQUFJLFdBQVcsR0FBSSxNQUFNLENBQUMsS0FBSyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUNwRCxnQkFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDOzs7QUFHdkQsZUFBRyxDQUFDLFNBQVMsTUFBQSxDQUFiLEdBQUcsRUFBYyxDQUNiLE1BQU0sRUFDTixDQUFDLEVBQ0QsQ0FBQztBQUNELGtCQUFNLENBQUMsS0FBSztBQUNaLGtCQUFNLENBQUMsS0FBSztBQUNaLG1CQUFPO0FBQ1AsbUJBQU8sR0FBSSxXQUFXLEFBQUMsR0FBSSxvQkFBTyxZQUFZLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQUFBQztBQUN6Rix1QkFBVztBQUNYLHVCQUFXO2FBQ2QsQ0FBQyxDQUFDOztBQUVILGdCQUFJLGNBQWMsR0FBRyxDQUFDLENBQUM7O0FBRXZCLGdCQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtBQUN4Qyw4QkFBYyxHQUFHLG9CQUFPLFdBQVcsR0FBRSxJQUFJLENBQUMsS0FBSyxBQUFDLENBQUM7YUFDcEQsTUFBTSxJQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLFdBQVcsRUFBRTtBQUNqRCw4QkFBYyxHQUFHLG9CQUFPLFdBQVcsR0FBQyxDQUFDLENBQUM7YUFDekM7OztBQUdELGVBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFDN0IsY0FBYyxFQUNkLENBQUM7QUFDRCxnQ0FBTyxXQUFXO0FBQ2xCLGdDQUFPLFdBQVc7QUFDbEIsbUJBQU87QUFDUCxtQkFBTztBQUNQLHVCQUFXO0FBQ1gsdUJBQVc7YUFDZCxDQUFDLENBQUM7OztBQUdILGdCQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7O0FBRXJCLG9CQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDM0MscUJBQUssVUFBVTtBQUNYLGdDQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxRQUFRO0FBQ1QsZ0NBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztBQUMvQiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssUUFBUTtBQUNULGdDQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ2pDLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxNQUFNO0FBQ1AsZ0NBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDakMsMEJBQU07QUFBQSxBQUNWLHFCQUFLLFNBQVM7QUFDVixnQ0FBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNqQywwQkFBTTtBQUFBLGFBQ2I7O0FBRUQsZ0JBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE1BQU0sSUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLE9BQU8sSUFDcEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUyxJQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksS0FBSyxXQUFXLEVBQUU7QUFDbEQsbUJBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFDN0IsQ0FBQyxFQUNELFlBQVk7QUFDWixzQkFBTSxDQUFDLEtBQUs7QUFDWixzQkFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDO0FBQ2YsdUJBQU8sR0FBSSxXQUFXLEdBQUMsR0FBRyxBQUFDO0FBQzNCLHVCQUFPLEdBQUksWUFBWSxHQUFDLEdBQUcsQUFBQztBQUM1QiwyQkFBVztBQUNYLDRCQUFZO2lCQUNmLENBQUMsQ0FBQzthQUNOO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQ2hJdUIsY0FBYzs7Ozs2QkFDeEIsbUJBQW1COzs7O3NCQUNsQixjQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JsQixzQkFBQyxJQUFJLEVBQUU7OztBQUNkLHdGQUFRO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsWUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdEIsWUFBSSxDQUFDLFdBQVcsR0FBSSxDQUFDLENBQUM7O0FBRXRCLFlBQUksQ0FBQyxPQUFPLEdBQUcsQ0FDWDtBQUNJLGtCQUFNLEVBQUUsT0FBTztBQUNmLG1CQUFPLEVBQUUsY0FBYztTQUMxQixFQUNEO0FBQ0ksa0JBQU0sRUFBRSxNQUFNO0FBQ2QsbUJBQU8sRUFBRSxlQUFlO1NBQzNCLENBQ0osQ0FBQztLQUNMOzs7O2VBRVkseUJBQUc7QUFDWixtQkFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsY0FBYyxDQUFDLEVBQzFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFHLGVBQWUsQ0FBQyxDQUM5QyxDQUFDLENBQUM7U0FDTjs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNmLGdCQUFHLEtBQUssR0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2Isb0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ25DOzs7QUFHRCxnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekMsZ0JBQUksVUFBVSxHQUFHLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDeEQsaUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBTyxNQUFNLEdBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLHFCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsb0JBQU8sTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2Qyx1QkFBRyxDQUFDLFNBQVMsTUFBQSxDQUFiLEdBQUcsRUFBYyxDQUNiLEtBQUssRUFDTCxDQUFDLEVBQ0QsQ0FBQyxFQUNELG9CQUFPLFdBQVc7QUFDbEIsd0NBQU8sV0FBVztBQUNsQix3QkFBSSxDQUFDLFlBQVksR0FBRyxVQUFVLEdBQUMsQ0FBQyxHQUFHLFVBQVU7QUFDN0MscUJBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQSxHQUFFLFVBQVU7QUFDaEIsOEJBQVUsRUFDVixVQUFVLENBQ2IsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7OztBQUdELGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxnQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDL0MsaUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBTyxZQUFZLEdBQUUsU0FBUyxBQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pELG1CQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsSUFBSSxFQUNKLENBQUM7QUFDRCxvQkFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUs7QUFDeEIsb0JBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUMsQ0FBQyxHQUFHLFNBQVM7QUFDMUMsaUJBQUM7QUFDRCxvQkFBSSxDQUFDLEtBQUssR0FBQyxvQkFBTyxZQUFZLEVBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUMsb0JBQU8sWUFBWSxHQUFDLENBQUMsQ0FDcEMsQ0FBQyxDQUFDO2FBQ047OztBQUdELGdCQUFJLEtBQUssR0FBRyxvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxHQUFDLEVBQUUsQ0FBQztBQUN0RCxnQkFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxRQUFRLEVBQUU7QUFDcEMsb0JBQUksQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDO0FBQzNCLG9CQUFHLElBQUksQ0FBQyxZQUFZLElBQUksVUFBVSxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzs7QUFFOUQsb0JBQUksQ0FBQyxXQUFXLElBQUksS0FBSyxDQUFDO0FBQzFCLG9CQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxHQUFHLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUM3RDtTQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQy9GdUIsY0FBYzs7OzsyQkFDZCxjQUFjOzs7OzhCQUNkLG9CQUFvQjs7Ozs7OztBQUdqQyxzQkFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRTs7O0FBQzNCLHdGQUFRO0FBQ1IsWUFBSSxDQUFDLEdBQUcsR0FBVyxFQUFFLENBQUM7QUFDdEIsWUFBSSxDQUFDLEtBQUssR0FBUyxJQUFJLENBQUM7QUFDeEIsWUFBSSxDQUFDLFFBQVEsR0FBTSxPQUFPLENBQUM7O0FBRTNCLG9DQUFPLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMzQixvQ0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUUxQixZQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzs7QUFFckIsWUFBSSxDQUFDLE9BQU8sR0FBRyxDQUNYO0FBQ0ksa0JBQU0sRUFBRSxJQUFJO0FBQ1osbUJBQU8sRUFBRSxXQUFXO1NBQ3ZCLENBQ0osQ0FBQzs7QUFFRixZQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0tBQ2pDOzs7O2VBRVkseUJBQUc7QUFDWixnQkFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBOzs7Ozs7QUFDakIscUNBQWlCLElBQUksQ0FBQyxPQUFPLDhIQUFFO3dCQUF2QixLQUFLOztBQUNULDRCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxtQkFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUU7O0FBRVIsZ0JBQUksSUFBSSxHQUFHLG9CQUFPLFNBQVMsSUFBRSxvQkFBTyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQSxBQUFDLENBQUM7OztBQUc3RCxlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVgsZ0JBQUksTUFBTSxHQUFHLENBQ1QsQ0FBQyxFQUNELElBQUksRUFDSixvQkFBTyxZQUFZLEVBQ25CLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQ2hFLENBQUM7O0FBRUYsZ0JBQUksTUFBTSxHQUFHLENBQ1QsQ0FBQyxFQUNELElBQUksRUFDSixvQkFBTyxZQUFZLEVBQ25CLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FDMUQsQ0FBQzs7QUFFRixnQkFBSSxRQUFRLEdBQUcsR0FBRyxDQUFDLG9CQUFvQixNQUFBLENBQXhCLEdBQUcsRUFBeUIsTUFBTSxDQUFDLENBQUM7O0FBRW5ELG9CQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNwQyxvQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDcEMsZUFBRyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7QUFDekIsZUFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxNQUFNLENBQUMsQ0FBQzs7QUFFeEIsZUFBRyxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7OztBQUc1QixnQkFBSSxTQUFTLEdBQUcsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksR0FBQyxFQUFFLENBQUM7O0FBRTFELGVBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDOztBQUUxQixnQkFBSSxVQUFVLGFBQU8sTUFBTSxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFDLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztBQUMzQixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQzs7QUFFM0IsZUFBRyxDQUFDLFVBQVUsTUFBQSxDQUFkLEdBQUcscUJBQWUsVUFBVSxFQUFDLENBQUM7OztBQUc5QixlQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN0QixnQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNwRSxlQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QixlQUFHLENBQUMsSUFBSSxNQUFBLENBQVIsR0FBRyxxQkFBUyxVQUFVLEVBQUMsQ0FBQztBQUN4QixlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVgsZUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFDOztBQUVkLGVBQUcsQ0FBQyxTQUFTLEdBQUssU0FBUyxDQUFDO0FBQzVCLGdCQUFJLElBQUksb0JBQU8sU0FBUyxHQUFDLENBQUMsQ0FBQzs7QUFFM0IsZ0JBQUksUUFBUSxHQUFNLENBQUMsR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDeEMsZUFBRyxDQUFDLElBQUksR0FBVSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7O0FBRTlDLGdCQUFJLElBQUksR0FBRyxvQkFBTyxTQUFTLEdBQUMsR0FBRyxDQUFDOztBQUVoQyxnQkFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxLQUFLLE1BQU0sRUFBRTs7QUFFckQsbUJBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDWixNQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQSxHQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUMzRSxJQUFJLEVBQ0osSUFBSSxDQUNQLENBQUMsQ0FBQzs7QUFFSCxtQkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNaLE1BQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBLEdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQzNFLElBQUksR0FBRyxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxFQUN6QixJQUFJLENBQ1AsQ0FBQyxDQUFDOztBQUVILG1CQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLENBQ1osTUFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFDM0UsSUFBSSxFQUNKLElBQUksR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUNwQixDQUFDLENBQUM7O0FBRUgsbUJBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDWixNQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQSxHQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUMzRSxJQUFJLEdBQUcsb0JBQU8sU0FBUyxHQUFDLENBQUMsRUFDekIsSUFBSSxHQUFHLFFBQVEsR0FBQyxDQUFDLENBQ3BCLENBQUMsQ0FBQzthQUNOOztBQUVELGdCQUFJLEdBQUcsb0JBQU8sU0FBUyxHQUFDLENBQUMsQ0FBQztBQUMxQixnQkFBSSxHQUFHLG9CQUFPLFNBQVMsSUFBRSxvQkFBTyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQSxBQUFDLENBQUM7Ozs7Ozs7O0FBR3pELHNDQUFrQixJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxtSUFBRTt3QkFBbEMsTUFBTTs7QUFDVix3QkFBSSxJQUFJLFFBQVEsR0FBQyxDQUFDLENBQUM7O0FBRW5CLHVCQUFHLENBQUMsU0FBUyxHQUFLLFNBQVMsQ0FBQzs7O0FBRzVCLHVCQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLENBQ1osTUFBTSxDQUFDLElBQUksRUFDWCxJQUFJLEVBQ0osSUFBSSxDQUNQLENBQUMsQ0FBQzs7O0FBR0gsd0JBQUksZUFBZSxHQUFLLElBQUksR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUFDO0FBQzFDLHdCQUFJLGdCQUFnQixHQUFJLG9CQUFPLFNBQVMsQ0FBQztBQUN6Qyx3QkFBSSxpQkFBaUIsR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUFDOzs7QUFHbkMsdUJBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLHdCQUFJLGtCQUFrQixHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUM1RCx1QkFBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixHQUFDLGtCQUFrQixFQUFFLGlCQUFpQixDQUFDLENBQUM7OztBQUc1Rix1QkFBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDekIsdUJBQUcsQ0FBQyxTQUFTLEdBQUssQ0FBQyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUN4Qyx1QkFBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLENBQUM7OztBQUczRSx3QkFBSSxhQUFhLEdBQUssSUFBSSxHQUFHLG9CQUFPLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDaEQsd0JBQUksYUFBYSxHQUFLLElBQUksR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUFDO0FBQ3hDLHdCQUFJLGNBQWMsR0FBSSxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQ3pDLHdCQUFJLGVBQWUsR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUFDOzs7QUFHakMsdUJBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLHdCQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUN0RCx1QkFBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsR0FBQyxnQkFBZ0IsRUFBRSxlQUFlLENBQUMsQ0FBQzs7O0FBRzdGLHVCQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUN6Qix1QkFBRyxDQUFDLFNBQVMsR0FBSyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDO0FBQ3hDLHVCQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDOztBQUU5RSx1QkFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsdUJBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDVCxNQUFNLENBQUMsTUFBTSxTQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQ3BDLGFBQWEsR0FBQyxjQUFjLEdBQUMsQ0FBQyxHQUFDLG9CQUFPLFlBQVksRUFDbEQsYUFBYSxDQUNoQixDQUFDLENBQUM7O0FBRUgsaUNBQWEsSUFBSSxlQUFlLEdBQUMsR0FBRyxDQUFDOzs7Ozs7QUFNckMsdUJBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLHdCQUFJLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7QUFDaEQsdUJBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLEdBQUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDOzs7QUFHM0YsdUJBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLHVCQUFHLENBQUMsU0FBUyxHQUFLLENBQUMsR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDeEMsdUJBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRTlFLHVCQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2Qix1QkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNULE1BQU0sQ0FBQyxJQUFJLFNBQUksTUFBTSxDQUFDLE9BQU8sRUFDaEMsYUFBYSxHQUFDLGNBQWMsR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxFQUNsRCxhQUFhLENBQ2hCLENBQUMsQ0FBQztpQkFDTjs7Ozs7Ozs7Ozs7Ozs7O1NBQ0o7OztlQUVDLGNBQUc7QUFDRCxnQkFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsWUFBWSxLQUFLLE1BQU0sRUFBRTtBQUNyRCxvQkFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUM3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBQzdCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO2FBQ3JDO1NBQ0o7OztlQUVHLGdCQUFHO0FBQ0gsZ0JBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNiOzs7ZUFFRyxnQkFBRztBQUNILGdCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO0FBQ3JELG9CQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBQzdCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7YUFDckM7U0FDSjs7O2VBRUksaUJBQUc7QUFDSixnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7OztlQUVNLG1CQUFHO0FBQ04sZ0JBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQUU7QUFDckQsb0JBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUV2RSxvQkFBSSxNQUFNLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQztBQUN2QiwyQkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxXQUFXO0FBQ2pELDRCQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO0FBQzVELDRCQUFRLEVBQUUsQ0FBQztpQkFDZCxDQUFDLENBQUM7O0FBRUgsb0JBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUU7QUFDbEUsd0JBQUksT0FBTyxHQUFHO0FBQ1YsK0JBQU8sRUFBRSxlQUFlO0FBQ3hCLDhCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDdkMsOEJBQU0sRUFBRSxNQUFNO3FCQUNqQixDQUFBOztBQUVELHdCQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDbkM7YUFDSjtTQUNKIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi9hcHAvRW5naW5lJztcblxuLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG52YXIgZW5naW5lID0gbmV3IEVuZ2luZShkb2N1bWVudC5ib2R5KTtcbmVuZ2luZS5pbml0KCk7XG5cbi8vIERFQlVHXG53aW5kb3cuZW5naW5lID0gZW5naW5lO1xuXG4iLCJsZXQgY29uZmlnID0ge307XG4vKipcbiAqIFNob3VsZCBiZSBzZXQgdXAgdG8gcmVjYWxjdWxhdGUgb24gdGhlIGZseSB3aGVuIHRoaW5ncyBjaGFnbmUuXG4gKiBOb3Qgd29ya2luZyByaWdodCBhdCBhbGwgZm9yIHdpbmRvdyBzaXplIGNoYWduZXMuXG4gKi9cbmNvbmZpZy5BUElfS0VZID0gXCJ4YWh4eDB5dXk1bGU0czRpXCI7XG5cbi8vY29uZmlnLkRJU0FCTEVfQVVESU8gPSB0cnVlO1xuXG4vLyAxNng5IEFzcGVjdCBSYXRpb1xuY29uZmlnLkFTUEVDVF9XSURUSCAgPSAxOTIwO1xuY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG5jb25maWcuVElMRV9YID0gMTY7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbmNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuY29uZmlnLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIEhvcml6b250YWwgb3IgVmVydGljYWwgcGVyY2VudGFnZSB0aGF0IHRoZSBnYW1lIHZpZXcgc2hvdWxkIG9jY3VweVxuICAgIGNvbmZpZy5QRVJDRU5UQUdFID0gMTtcblxuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG5cbiAgICAvLyBDYWNsdWxhdGUgY2FudmFzIHdpZHRoIGFuZCBoZWlnaHQgYWNjb3JkaW5nIHRvIGFib3ZlIHBlcmNlbnRhZ2UgYW5kIGFzcGVjdCByYXRpb1xuICAgIGxldCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5vdXRlcldpZHRoO1xuICAgIGRvIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSAoc2NyZWVuV2lkdGgtLSpjb25maWcuUEVSQ0VOVEFHRSk7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG4gICAgfSB3aGlsZShjb25maWcuQ0FOVkFTX0hFSUdIVCVjb25maWcuU1BSSVRFX1NJWkUgIT09IDApXG5cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgd2luZG93IHdpbGwgZml0IHZlcnRpY2FsbHlcbiAgICAvL2lmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIC8vY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICAvL2NvbmZpZy5DQU5WQVNfV0lEVEggPSAoY29uZmlnLkNBTlZBU19IRUlHSFQqY29uZmlnLkFTUEVDVF9XSURUSCkvY29uZmlnLkFTUEVDVF9IRUlHSFQ7XG4gICAgLy99XG5cbiAgICAvLyBEZXRlcm1pbmUgU3ByaXRlIFNjYWxpbmdcbiAgICBjb25maWcuU1BSSVRFX1NDQUxFICA9IGNvbmZpZy5DQU5WQVNfV0lEVEgvKGNvbmZpZy5USUxFX1gqY29uZmlnLlNQUklURV9TSVpFKTtcbiAgICBjb25maWcuVElMRV9TSVpFICAgICA9IGNvbmZpZy5TUFJJVEVfU0laRSpjb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgLy8gU2V0IEZQU1xuICAgIGNvbmZpZy5GUFMgPSAzMDtcbn1cblxuY29uZmlnLmNhbGN1bGF0ZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4uL0NvbmZpZyc7XG4vLyBJbXBvcnQgR2FtZVxuaW1wb3J0IEdhbWUgZnJvbSAnLi9tb2RlbHMvR2FtZSc7XG5cbi8vIEltcG9ydCBWaWV3XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXdzL0NhbnZhczJkJztcblxuLy8gSW1wb3J0IERpc3BhdGNoZXJcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4vZGlzcGF0Y2hlci9EaXNwYXRjaGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9nYW1lICAgICAgID0gbmV3IEdhbWUoKTtcbiAgICAgICAgdGhpcy5fdmlldyAgICAgICA9IG5ldyBWaWV3KCk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuXG4gICAgICAgIHdpbmRvdy5nYW1lICAgICAgID0gdGhpcy5fZ2FtZTtcbiAgICAgICAgd2luZG93LnZpZXcgICAgICAgPSB0aGlzLl92aWV3O1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hlciA9IHRoaXMuX2Rpc3BhdGNoZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZW5naW5lXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5fZ2FtZS5pbml0KHRoaXMuX2Rpc3BhdGNoZXIpLFxuICAgICAgICAgICAgdGhpcy5fdmlldy5pbml0KHRoaXMuX2dhbWUpLFxuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5pbml0KHRoaXMuX3ZpZXcpXG4gICAgICAgIF0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIucG9zdE1lc3NhZ2Uoe1wiZXZlbnRcIjogXCJnYW1lLXN0YXJ0XCJ9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciAgIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IE5ldHdvcmtTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL05ldHdvcmtTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5fdmlldy5vbm1lc3NhZ2UgPSB0aGlzLmhhbmRsZVZpZXdNZXNzYWdlcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgc2ltdWxhdGlvbiBsb29wXG4gICAgICAgIHRoaXMuX3NpbXVsYXRpb25Xb3JrZXIgICAgICAgICAgID0gVXRpbHMubG9hZFdvcmtlcihcIlNpbXVsYXRpb25Xb3JrZXJcIik7XG4gICAgICAgIHRoaXMuX3NpbXVsYXRpb25Xb3JrZXIub25tZXNzYWdlID0gdGhpcy5oYW5kbGVTaW11bGF0aW9uTWVzc2FnZXMuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBpbml0TXVsdGlwbGF5ZXJHYW1lKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgLy8gQnVpbGQgYXJnc1xuICAgICAgICBpZihtZXNzYWdlLmhvc3RJZCkge1xuICAgICAgICAgICAgYXJncyA9IFttZXNzYWdlLm5hbWUsIG1lc3NhZ2UuaG9zdElkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MgPSBbbWVzc2FnZS5uYW1lXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbml0IG1wIGNvbnRyb2xsZXJcbiAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UgPSBuZXcgTmV0d29ya1NlcnZpY2UoLi4uYXJncyk7XG4gICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmluaXQoKS50aGVuKCgpPT57XG5cbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLm9ubWVzc2FnZSA9IG1lc3NhZ2UgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBBZGQgUGxheWVyIE1lc3NhZ2VcIik7XG5cbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJhZGQtcGxheWVyXCIsXG4gICAgICAgICAgICAgICAgXCJmcm9tXCI6IFN5bWJvbCgpLFxuICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgIFwibmFtZVwiOiBtZXNzYWdlLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIFwiaXNMb2NhbFwiOiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJnYW1lLXN0YXRlXCIsXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IFwibG9iYnlcIlxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxlYXZlR2FtZSgpIHtcbiAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIFwiZXZlbnRcIjogXCJnYW1lLXN0YXRlXCIsXG4gICAgICAgICAgICBcImRhdGFcIjogXCJtYWluIG1lbnVcIlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGdldCBhIHBlZXIgY29ubmVjdCBldmVudCBmb3JtIHRoZSBtdWx0aXBsYXllciBjb250cm9sbGVyLCBjcmVhdGUgYSBhZGQgcGxheWVyIGV2ZW50XG4gICAgICovXG4gICAgcGVlckNvbm5lY3QobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBQZWVyIENvbm5lY3QgTWVzc2FnZVwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBCcm9hZGNhc3QgQWRkIFBsYXllciBNZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgIFwiZXZlbnRcIjogXCJhZGQtcGxheWVyXCIsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZS5mcm9tLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBtZXNzYWdlLmRhdGEubmFtZSxcbiAgICAgICAgICAgICAgICBcImpvYlwiOiBtZXNzYWdlLmRhdGEuam9iXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZ2V0IGEgcGVlciBkaXNjb25uZWN0IGV2ZW50IGZvcm0gdGhlIG11bHRpcGxheWVyIGNvbnRyb2xsZXIsIGNyZWF0ZSBhIHJlbW92ZSBwbGF5ZXIgZXZlbnRcbiAgICAgKi9cbiAgICBwZWVyRGlzY29ubmVjdChtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IFBlZXIgRGlzY29ubmVjdCBNZXNzYWdlXCIpO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBSZW1vdmUgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICBcImV2ZW50XCI6IFwicmVtb3ZlLXBsYXllclwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IG1lc3NhZ2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYWxsIG11bHRpcGxheWVyIEV2ZW50c1xuICAgICAqL1xuICAgIGhhbmRsZU11bHRpcGxheWVyTWVzc2FnZXMobWVzc2FnZSkge1xuICAgICAgICB0aGlzLnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGFsbCB2aWV3IG1lc3NhZ2VzXG4gICAgICovXG4gICAgaGFuZGxlVmlld01lc3NhZ2VzKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IGV2ZW50ID0gbWVzc2FnZS5ldmVudDtcbiAgICAgICAgbGV0IGRhdGEgID0gbWVzc2FnZS5kYXRhO1xuXG4gICAgICAgIGlmKGV2ZW50ID09PSBcInN0YXJ0LW1wXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdE11bHRpcGxheWVyR2FtZShkYXRhKTtcbiAgICAgICAgfSBlbHNlIGlmIChldmVudCA9PT0gXCJsZWF2ZS1nYW1lXCIpIHtcbiAgICAgICAgICAgIHRoaXMubGVhdmVHYW1lKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIENvbnZlcnQgYW55IEltbXV0YWJsZSBkYXRhIHRvIEpTT05cbiAgICAgICAgICAgIGlmKG1lc3NhZ2UuZGF0YSAmJiBtZXNzYWdlLmRhdGEudG9KU09OKVxuICAgICAgICAgICAgICAgIG1lc3NhZ2UuZGF0YSA9IGRhdGEudG9KU09OKCk7XG5cbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5icm9hZGNhc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgU2ltdWxhdGlvbldvcmtlciBtZXNzYWdlc1xuICAgICAqL1xuICAgIGhhbmRsZVNpbXVsYXRpb25NZXNzYWdlcyhtZXNzYWdlKSB7XG4gICAgICAgIGlmKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJ0aWNrXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxuICAgIHBvc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5vbm1lc3NhZ2UpXG4gICAgICAgICAgICB0aGlzLm9ubWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG5cbiAgICBvbih0eXBlcywgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgdHlwZSBvZiB0eXBlcy5zcGxpdChcIiBcIikpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG4gICAgcG9zdE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBpZih0aGlzLm9ubWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMub25tZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlNFVCBTVEFURSBUTyBTVEFURVwiKTtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlO1xuICAgIH1cbn1cbiIsIi8vIEltcG9ydCBNaXhpbnNcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL2V2ZW50RW1pdHRlcic7XG5cbi8vIEltcG9ydCBVdGlsc1xuaW1wb3J0IFV0aWxzICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgTG9nZ2VyICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUm5nICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1JuZyc7XG5cbi8vIEltcG9ydCBNb2RlbHNcbmltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi9CYXNlTW9kZWwnO1xuaW1wb3J0IFBsYXllciAgICBmcm9tICcuL29iamVjdHMvUGxheWVyJztcbmltcG9ydCBFbmVteSAgICAgZnJvbSAnLi9vYmplY3RzL01vbnN0ZXInO1xuaW1wb3J0IFJvb20gICAgICBmcm9tICcuL29iamVjdHMvUm9vbSc7XG5pbXBvcnQgTWFpbk1lbnUgIGZyb20gJy4vb2JqZWN0cy9NYWluTWVudSc7XG5pbXBvcnQgTG9iYnkgICAgIGZyb20gJy4vb2JqZWN0cy9Mb2JieSc7XG5pbXBvcnQgVWkgICAgICAgIGZyb20gJy4vb2JqZWN0cy9VaSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTt9XG4gICAgZ2V0IG1haW5NZW51KCkge3JldHVybiB0aGlzLl9tYWluTWVudTt9XG4gICAgZ2V0IGxvYmJ5KCkge3JldHVybiB0aGlzLl9sb2JieTt9XG4gICAgZ2V0IHBsYXllcnMoKSB7cmV0dXJuIHRoaXMuX3BsYXllcnM7fVxuICAgIGdldCBsb2NhbFBsYXllcigpIHtyZXR1cm4gdGhpcy5fbG9jYWxQbGF5ZXI7fVxuICAgIGdldCByb29tKCkge3JldHVybiB0aGlzLl9yb29tO31cbiAgICBnZXQgdWkoKSB7cmV0dXJuIHRoaXMuX3VpO31cblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJtYWluIG1lbnVcIixcbiAgICAgICAgICAgIFwibG9iYnlcIixcbiAgICAgICAgICAgIFwicGxheWluZ1wiXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX21haW5NZW51ID0gbmV3IE1haW5NZW51KCk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ICAgID0gbmV3IExvYmJ5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdChkaXNwYXRjaGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgICAgICAgICAgdGhpcy5fcGxheWVycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgLy8gTElTVEVOIEZPUiBFVkVOVFNcbiAgICAgICAgICAgIC8vdGhpcy5saXN0ZW5Ub0Rpc3BhdGNoZXIodGhpcy5fZGlzcGF0Y2hlcik7XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLm9ubWVzc2FnZSA9IHRoaXMuaGFuZGxlTWVzc2FnZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBnYW1lIHN0YXRlIGlmIGl0cyBhbGxvd2VkXG4gICAgICogTWFrZSBzdXJlIHdlIGVtaXQgaXRcbiAgICAgKi9cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRTdGF0ZSA9PSBcIm1haW4gbWVudVwiKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgYWxsIHBsYXllcnNcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJzICAgICA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFBsYXllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdChcImdhbWUtc3RhdGVcIiwgdGhpcy5fY3VycmVudFN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgdGhpcyBmdW5jdGlvbiBhZnRlciBhbnkgcGxheWVyc3RhZSBjaGFuZ2Ugc28gd2UgY2FuIGRlY2lkZSB3aGF0IHRvIGRvLlxuICAgICAqL1xuICAgIGNoZWNrUGxheWVyU3RhdGUoKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbG9ieSBkZWNpZGUgaWYgd2UgbmVlZCB0byBzdGFydCB0aGUgZ2FtZVxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJsb2JieVwiKSB7XG4gICAgICAgICAgICBsZXQgcmVhZHlUb1N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHJlYWR5VG9TdGFydCA9IHJlYWR5VG9TdGFydCAmJiBwbGF5ZXIuY3VycmVudFN0YXRlID09PSBcInJlYWR5XCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHJlYWR5VG9TdGFydCkge1xuICAgICAgICAgICAgICAgIExvZ2dlci5iYW5uZXIoXCJTVEFSVElORyBHQU1FXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0UGxheWluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tQbGF5ZXJBY3Rpb24ocCkge1xuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJwbGF5aW5nXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgICAgICAgICAgIGxldCByZWFkeVRvTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWR5VG9Nb3ZlID0gcmVhZHlUb01vdmUgJiYgcGxheWVyLmN1cnJlbnRBY3Rpb24uZ2V0KFwiYWN0aW9uXCIpID09PSBcInJlYWR5XCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYocmVhZHlUb01vdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09PSBcImJhdHRsZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGFjdGlvbk5hbWUgPSBwLmN1cnJlbnRBY3Rpb24uZ2V0KFwiYWN0aW9uXCIpO1xuICAgICAgICAgICAgICAgIGlmKGFjdGlvbk5hbWUgIT09IFwidGhpbmtpbmdcIiAmJiBwLnJlYWR5VG9BdHRhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyQWN0aW9uKHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zdGFydFBsYXlpbmcoKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHJvb21cbiAgICAgICAgdGhpcy5fcm9vbSAgICAgICAgPSBuZXcgUm9vbSgpO1xuICAgICAgICB0aGlzLl91aSAgICAgICAgICA9IG5ldyBVaSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwicGxheWluZ1wiO1xuXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2xvb2tGb3JUcm91YmxlKCkge1xuICAgICAgICAvLyBTZXQgcm9vbSB0byBtb3ZpbmdcbiAgICAgICAgdGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPSBcIm1vdmluZ1wiO1xuICAgICAgICB0aGlzLl9tb3ZlVGltZXIgPSA1MDtcblxuICAgICAgICAvLyBTZXQgcGxheWVycyB0byB3YWxraW5nXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLnJlc2V0QWN0aW9uQ3ljbGUoKTtcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50U3RhdGUgPSBcIndhbGtpbmdcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSBlbmVtaWVzXG4gICAgICAgIGxldCBlbmVteSA9IG5ldyBFbmVteSgpO1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGQtZW5lbXlcIiwgZW5lbXkpO1xuXG4gICAgICAgIHRoaXMuX2VuZW1pZXMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgIGVuZW15XG4gICAgICAgIF0pO1xuXG4gICAgfVxuXG4gICAgX3N0YXJ0QmF0dGxlKCkge1xuICAgICAgICB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9IFwiYmF0dGxlXCI7XG4gICAgICAgIHRoaXMuX3VpLnNldEJhdHRsZU9wdGlvbnMoKTtcblxuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHBsYXllci5iZWdpbkNvbWJhdCgpO1xuXG4gICAgICAgICAgICBwbGF5ZXIub25Db29sZG93biA9ICgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllckFjdGlvbihwbGF5ZXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1jb29sZG93blwiLCBwbGF5ZXIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcGxheWVyLmNoYXJnZUNvb2xkb3duKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVtaXQoJ3N0YXJ0LWJhdHRsZScpO1xuICAgIH1cblxuICAgIF9wbGF5ZXJBY3Rpb24ocCkge1xuICAgICAgICBsZXQgYWN0aW9uID0gcC5jdXJyZW50QWN0aW9uO1xuICAgICAgICBpZihhY3Rpb24uZ2V0KFwiYWN0aW9uXCIpID09PSBcImF0dGFja1wiKSB7XG4gICAgICAgICAgICBwLndhbGtGb3J3YXJkKCgpPT57XG4gICAgICAgICAgICAgICAgcC5hdHRhY2soKCk9PntcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiR2FtZSBBVFRBQ0tcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2NvbWJhdFBoYXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIHAubmV4dEFjdGlvbkN5Y2xlKCk7XG4gICAgICAgICAgICAgICAgICAgIHAud2Fsa0JhY2soKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHAuZW5kQ29tYmF0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwLm5leHRBY3Rpb25DeWNsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NvbWJhdFBoYXNlKCkge1xuICAgICAgICBsZXQgc2hvdWxkRW5kQmF0dGxlID0gdHJ1ZTtcbiAgICAgICAgZm9yKGxldCBlbmVteSBvZiB0aGlzLl9lbmVtaWVzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBlbmVteS5oZWFsdGgtLTtcbiAgICAgICAgICAgIHNob3VsZEVuZEJhdHRsZSA9IHNob3VsZEVuZEJhdHRsZSAmJiAoZW5lbXkuaGVhbHRoIDw9IDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2hvdWxkRW5kQmF0dGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRCYXR0bGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9lbmRCYXR0bGUoKSB7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgaWYocGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuZW5kQ29tYmF0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICB0aGlzLl91aS5zZXRJZGxlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLmVtaXQoJ2VuZC1iYXR0bGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcGxheWVyIHJlZ2FyZGxlc3Mgb2YgcmVtb3RlIG9yIGxvY2FsXG4gICAgICovXG4gICAgYWRkUGxheWVyKHAsIGlzTG9jYWwpIHtcbiAgICAgICAgbGV0IHlQb3MgPSAyLjI7XG5cbiAgICAgICAgaWYodGhpcy5fcGxheWVycy5zaXplKSB7XG4gICAgICAgICAgICB5UG9zICs9IDEuMSp0aGlzLl9wbGF5ZXJzLnNpemU7XG4gICAgICAgIH1cblxuICAgICAgICBwLnlQb3MgPSB5UG9zO1xuXG4gICAgICAgIHRoaXMuX3BsYXllcnMuc2V0KHAuaWQsIHApO1xuICAgICAgICBpZihpc0xvY2FsKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFBsYXllciA9IHA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkLXBsYXllclwiLCBwKTtcbiAgICB9XG5cbiAgICAvLyBTaW11bGF0aW9uIExvZ2ljXG4gICAgdGljaygpIHtcbiAgICAgICAgaWYodGhpcy5fcm9vbSAmJiB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PT0gXCJtb3ZpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRpbWVyLS07XG4gICAgICAgICAgICBpZih0aGlzLl9tb3ZlVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0QmF0dGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHBsYXllci50aWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PT0gXCJ0aWNrXCIpIHtcbiAgICAgICAgICAgIHRoaXMudGljaygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiTWVzc2FnZSByZWNpZXZlZCBmcm9tIGRpc3BhdGNoZXJcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAvLyBBc3NpZ24gZXZlbnQgbmFtZSBhbmQgZGF0YVxuICAgICAgICAgICAgbGV0IGV2ZW50TmFtZSA9IG1lc3NhZ2UuZXZlbnQ7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICAgICAgaWYoZXZlbnROYW1lID09IFwiZ2FtZS1zdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcIm1haW4gbWVudVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJnYW1lLXN0YXRlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IGRhdGE7XG4gICAgICAgICAgICB9IGVsc2UgaWYobWVzc2FnZS5ldmVudCA9PSBcImFkZC1wbGF5ZXJcIikge1xuICAgICAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcihkYXRhLm5hbWUsIG1lc3NhZ2UuZnJvbSwgZGF0YS5qb2IpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGxheWVyKHAsIGRhdGEuaXNMb2NhbCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYobWVzc2FnZS5ldmVudCA9PSBcInBsYXllci1yZW1vdmVcIikge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgcGVlcnMgcGxheWVyIGZyb20gdGhlIGdhbWVcbiAgICAgICAgICAgICAgICAvLyBHZXQgYW5kIHRoZW4gZGVsZXRlIHBsYXllclxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJUb1JlbW92ZSA9IHRoaXMuX3BsYXllcnMuZ2V0KGRhdGEpO1xuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJSZW1vdmVkICA9IHRoaXMuX3BsYXllcnMuZGVsZXRlKHBsYXllclRvUmVtb3ZlLmlkKTtcblxuICAgICAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgcGxheWVyIHdhcyB0aGVyZVxuICAgICAgICAgICAgICAgIGlmKHBsYXllclJlbW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlLXBsYXllclwiLCBwbGF5ZXJUb1JlbW92ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT0gXCJsb2JieVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwbGF5ZXItam9iXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBBbHRlciBwbGF5ZXIncyBqb2JcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5mcm9tKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuam9iID0gZGF0YS5qb2I7XG4gICAgICAgICAgICB9IGVsc2UgaWYobWVzc2FnZS5ldmVudCA9PSBcInBsYXllci1zdGF0ZVwiKSB7XG4gICAgICAgICAgICAgICAgLy8gQWx0ZXIgcGxheWVyJ3Mgc3RhdGVcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5mcm9tKTtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gZGF0YS5zdGF0ZTtcblxuICAgICAgICAgICAgICAgIC8vIFByb2dyZXNzIEdhbWUgbG9naWMgYWNjb3JpZG5nIHRvIHBsYXllciBzdGF0ZVxuICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tQbGF5ZXJTdGF0ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwbGF5ZXItYWN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5mcm9tKTtcblxuICAgICAgICAgICAgICAgIGxldCBhY3Rpb24gPSBJbW11dGFibGUuTWFwKGRhdGEpO1xuICAgICAgICAgICAgICAgIHBsYXllci5jdXJyZW50QWN0aW9uID0gYWN0aW9uO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllckFjdGlvbihwbGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJTZWxlY3QgSm9iXCIsXG4gICAgICAgICAgICBcIlJlYWR5XCIsXG4gICAgICAgICAgICBcIkxlYXZlXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcIkhvc3QgR2FtZVwiLFxuICAgICAgICAgICAgXCJKb2luIEdhbWVcIlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV1VSTSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAgICd3dXJtJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgdHlwZSkge1xuICAgICAgICBzdXBlcihbXSk7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3M7XG4gICAgICAgIHRoaXMueXBvcyA9IHlQb3M7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5oZWFsdGggPSA1O1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgICAgIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uLy4uL0NvbmZpZyc7XG5cbmxldCBKT0JTID0gbmV3IE1hcCgpO1xuXG5KT0JTLnNldChcImNsYWlydm95YW50XCIsIHtcbiAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50JyxcbiAgICAnaGVhbHRoJzogNjAsXG4gICAgJ21hbmEnOiA0MCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcImhlcmJhbGlzdFwiLCB7XG4gICAgJ25hbWUnOiAnaGVyYmFsaXN0JyxcbiAgICAnaGVhbHRoJzogNDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDgwLFxuICAgICdwb3NpdGlvbic6ICdiYWNrJ1xufSk7XG5cbkpPQlMuc2V0KFwidmlsbGFpblwiLCB7XG4gICAgJ25hbWUnOiAndmlsbGFpbicsXG4gICAgJ2hlYWx0aCc6IDgwLFxuICAgICdtYW5hJzogMjAsXG4gICAgJ2Nvb2xkb3duJzogNDAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwia25pZ2h0XCIsIHtcbiAgICAnbmFtZSc6ICdrbmlnaHQnLFxuICAgICdoZWFsdGgnOiAxMDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDEwMCxcbiAgICAncG9zaXRpb24nOiAnZnJvbnQnXG59KTtcblxuSk9CUy5zZXQoXCJuZWNyb21hbmNlclwiLCB7XG4gICAgJ25hbWUnOiAnbmVjcm9tYW5jZXInLFxuICAgICdoZWFsdGgnOiA0MCxcbiAgICAnbWFuYSc6IDEyMCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcIm5pbmphXCIsIHtcbiAgICAnbmFtZSc6ICduaW5qYScsXG4gICAgJ2hlYWx0aCc6IDYwLFxuICAgICdtYW5hJzogMzAsXG4gICAgJ2Nvb2xkb3duJzogMzAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbmNsYXNzIFBsYXllckFjdGlvbiB7XG59XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCwgam9iKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcInJlc3RpbmdcIixcbiAgICAgICAgICAgIFwid2Fsa2luZ1wiLFxuICAgICAgICAgICAgXCJhdHRhY2tpbmdcIlxuICAgICAgICBdKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcblxuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBJbW11dGFibGUuTWFwKHtcbiAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwidGhpbmtpbmdcIlxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbmV4dEFjdGlvbiAgICA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBTdG9yZSB0aGUgYWN0aW9uIGN5Y2xlXG4gICAgICAgIHRoaXMuX2FjdGlvbkN5Y2xlICA9IDA7XG5cbiAgICAgICAgdGhpcy5faXNCdXN5ID0gZmFsc2U7XG5cblxuICAgICAgICBpZihqb2IpIHt0aGlzLmpvYiA9IGpvYjt9XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgaWYoYWN0aW9uLmdldChcImN5Y2xlXCIpID4gdGhpcy5hY3Rpb25DeWNsZSkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dEFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgam9iKCkgICAgICAgICAgIHtyZXR1cm4gdGhpcy5fam9iO31cbiAgICBnZXQgY3VycmVudEFjdGlvbigpIHtyZXR1cm4gdGhpcy5fY3VycmVudEFjdGlvbn1cbiAgICBnZXQgbmV4dEFjdGlvbigpICAgIHtyZXR1cm4gdGhpcy5fbmV4dEFjdGlvbn1cbiAgICBnZXQgY3VycmVudFN0YXRlKCkgIHtyZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlO31cbiAgICBnZXQgbmFtZSgpICAgICAgICAgIHtyZXR1cm4gdGhpcy5fbmFtZTt9XG4gICAgZ2V0IGlkKCkgICAgICAgICAgICB7cmV0dXJuIHRoaXMuX2lkO31cbiAgICBnZXQgcmVhZHlUb0F0dGFjaygpIHtyZXR1cm4gdGhpcy5fcmVhZHlUb0F0dGFjazt9XG4gICAgZ2V0IGlzQnVzeSgpICAgICAgICB7cmV0dXJuIHRoaXMuX2lzQnVzeX1cbiAgICBnZXQgYWN0aW9uQ3ljbGUoKSAgIHtyZXR1cm4gdGhpcy5fYWN0aW9uQ3ljbGV9XG5cbiAgICBzdGF0aWMgZ2V0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5KT0JTLnZhbHVlcygpXTtcbiAgICB9XG5cbiAgICBzZXQgam9iKGpvYk5hbWUpIHtcbiAgICAgICAgdGhpcy5fam9iID0gSk9CUy5nZXQoam9iTmFtZSk7XG5cbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMuX2pvYi5oZWFsdGg7XG5cbiAgICAgICAgdGhpcy5tYXhNYW5hID0gdGhpcy5fam9iLm1hbmE7XG4gICAgICAgIHRoaXMubWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuXG4gICAgICAgIHRoaXMubWF4Q29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG5cbiAgICAgICAgdGhpcy54UG9zID0gQ29uZmlnLlRJTEVfWCAtIDM7XG4gICAgICAgIGlmKHRoaXMuX2pvYi5wb3NpdGlvbiA9PT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgIHRoaXMueFBvcyArPSAuNTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0QWN0aW9uKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gID0gdGhpcy5uZXh0QWN0aW9uIHx8IEltbXV0YWJsZS5NYXAoe1xuICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJ0aGlua2luZ1wiLFxuICAgICAgICAgICAgXCJjeWNsZVwiOiB0aGlzLmFjdGlvbkN5Y2xlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGJlZ2luQ29tYmF0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSAgID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuY29vbGRvd24gICAgICAgPSAwO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZSBwbGF5ZXIgZm9yd2FyZFxuICAgICAqL1xuICAgIHdhbGtGb3J3YXJkKGNiKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJ3YWxraW5nXCI7XG4gICAgICAgIHRoaXMuX2lzV2Fsa2luZ0ZvcndhcmQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9pZGxlWFBvcyA9IHRoaXMueFBvcztcbiAgICAgICAgdGhpcy5fZGVzdFhQb3MgPSB0aGlzLnhQb3MgLSAxO1xuICAgICAgICBpZiAoY2IpIHRoaXMuX29uV2Fsa0ZvcndhcmQgPSBjYjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQbGF5ZXIgYXR0YWNrXG4gICAgICovXG4gICAgYXR0YWNrKGNiKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJhdHRhY2tpbmdcIjtcbiAgICAgICAgdGhpcy5fYXR0YWNrRGVsYXkgPSAxMDtcbiAgICAgICAgaWYoY2IpIHRoaXMuX29uQXR0YWNrID0gY2I7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTW92ZSBwbGF5ZXIgYmFja3dhcmRcbiAgICAgKi9cbiAgICB3YWxrQmFjayhjYikge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwid2Fsa2luZ1wiO1xuICAgICAgICB0aGlzLl9pc1dhbGtpbmdCYWNrID0gdHJ1ZTtcbiAgICAgICAgbGV0IGN1cnJlbnRYUG9zID0gdGhpcy54UG9zO1xuICAgICAgICB0aGlzLl9kZXN0WFBvcyA9IHRoaXMueFBvcyArIDE7XG4gICAgICAgIGlmKGNiKSB0aGlzLl9vbldhbGtCYWNrID0gY2I7XG4gICAgfVxuXG4gICAgZW5kQ29tYmF0KCkge1xuICAgICAgICB0aGlzLm5leHRBY3Rpb25DeWNsZSgpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlICAgPSBcImlkbGVcIjtcbiAgICAgICAgdGhpcy5jb29sZG93biAgICAgICA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5VG9BdHRhY2sgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm9uQ29vbGRvd24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuX2lzQ29vbGluZ2Rvd24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgc28gd2Uga25vdyB0byBjaGFyZ2UgY29vbGRvd24gbWVldGVyXG4gICAgICovXG4gICAgY2hhcmdlQ29vbGRvd24oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jb29sZG93biA9IDA7XG4gICAgICAgIHRoaXMuX2lzQ29vbGluZ2Rvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIG5leHRBY3Rpb25DeWNsZSgpIHtcbiAgICAgICAgdGhpcy5fcmVhZHlUb0F0dGFjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hY3Rpb25DeWNsZSsrO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhcmdlQ29vbGRvd24oKTtcbiAgICB9XG5cbiAgICByZXNldEFjdGlvbkN5Y2xlKCkge1xuICAgICAgICB0aGlzLl9hY3Rpb25DeWNsZSA9IDA7XG4gICAgICAgIHRoaXMuX25leHRBY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmVzZXRBY3Rpb24oKTtcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICBpZih0aGlzLl9pc0Nvb2xpbmdkb3duKSB7XG4gICAgICAgICAgICB0aGlzLmNvb2xkb3duKys7XG4gICAgICAgICAgICBpZih0aGlzLmNvb2xkb3duID49IHRoaXMubWF4Q29vbGRvd24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc0Nvb2xpbmdkb3duID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZHlUb0F0dGFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5vbkNvb2xkb3duKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uQ29vbGRvd24odGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9pc1dhbGtpbmdGb3J3YXJkKSB7XG4gICAgICAgICAgICBsZXQgc3RlcCA9IC4xMDtcbiAgICAgICAgICAgIHRoaXMueFBvcyAtPSBzdGVwO1xuXG4gICAgICAgICAgICBpZih0aGlzLnhQb3MgPD0gdGhpcy5fZGVzdFhQb3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pc1dhbGtpbmdGb3J3YXJkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9vbldhbGtGb3J3YXJkKSB0aGlzLl9vbldhbGtGb3J3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PSBcImF0dGFja2luZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9hdHRhY2tEZWxheS0tO1xuICAgICAgICAgICAgaWYodGhpcy5fYXR0YWNrRGVsYXkgPD0gMCkge1xuICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRPTkUgQVRUQUNLSU5HXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fb25BdHRhY2spIHRoaXMuX29uQXR0YWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9pc1dhbGtpbmdCYWNrKSB7XG4gICAgICAgICAgICBsZXQgc3RlcCA9IC4xMDtcblxuICAgICAgICAgICAgdGhpcy54UG9zICs9IHN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLnhQb3MgPj0gdGhpcy5fZGVzdFhQb3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzV2Fsa2luZ0JhY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9vbldhbGtCYWNrKSB0aGlzLl9vbldhbGtCYWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJztcbmltcG9ydCBMb2dnZXIgICAgZnJvbSAnLi4vLi4vc2VydmljZXMvTG9nZ2VyJztcblxuY2xhc3MgUm9vbSBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgY29uc3RydWN0b3IodHlwZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgIFwiaWRsZVwiLFxuICAgICAgICAgICAgXCJtb3ZpbmdcIixcbiAgICAgICAgICAgIFwiYmF0dGxlXCJcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYmF0dGxlT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiYXR0YWNrXCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJkZWZlbmRcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3Jvb21PcHRpb25zID0gW1xuICAgICAgICAgICAgXCJyZWFkeVwiLFxuICAgICAgICAgICAgXCJhYmlsaXR5XCIsXG4gICAgICAgICAgICBcIml0ZW1cIixcbiAgICAgICAgICAgIFwibWFuYWdlXCJcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IHRoaXMuX3Jvb21PcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cblxuICAgIHNldEJhdHRsZU9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fYmF0dGxlT3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXRJZGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9yb29tT3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBpZCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInVwXCIsICgpID0+IHRoaXMuZW1pdChcInVwXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwia1wiLCAoKSA9PiB0aGlzLmVtaXQoXCJ1cFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZG93blwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwialwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsZWZ0XCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJoXCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInJpZ2h0XCIsICgpID0+IHRoaXMuZW1pdChcInJpZ2h0XCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJyaWdodFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZW50ZXJcIiwgKCk9PiB0aGlzLmVtaXQoXCJjb25maXJtXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJgXCIsICgpPT4gdGhpcy5lbWl0KFwiZGVidWdcIikpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV0d29yayhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjRkRGNDg1OyBjb2xvcjogIzAwMDsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi9Mb2dnZXInO1xuXG5sZXQgZXZlbnRzID0gW1xuICAgIFwicGVlci1jb25uZWN0XCIsXG4gICAgXCJwbGF5ZXItcmVhZHlcIixcbiAgICBcInBsYXllci1qb2JcIixcbiAgICBcInBsYXllci1zdGF0ZVwiLFxuICAgIFwicGxheWVyLWFjdGlvblwiLFxuICAgIFwib3B0aW9uLXNlbGVjdFwiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY3JlYXRlTWVzc2FnZShldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgaWYoZXZlbnRzLmluZGV4T2YoZXZlbnROYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW2V2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSksIGRhdGFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjb2RlTWVzc2FnZShpZCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJmcm9tXCI6IGlkLFxuICAgICAgICAgICAgXCJldmVudFwiOiBldmVudHNbbWVzc2FnZVswXV0sXG4gICAgICAgICAgICBcImRhdGFcIjogbWVzc2FnZVsxXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobmFtZSwgaG9zdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgaWYoaG9zdClcbiAgICAgICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pZCA9IFwiaG9zdFwiO1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcGVlciBjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX3BlZXIgPSBuZXcgUGVlcih0aGlzLl9pZCwge1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdvcGVuJywgKGlkKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5uZXR3b3JrKGBQZWVyIENvbm5lY3Rpb24gY3JlYXRlZCwgUGVlciBJRCBpcyAke2lkfWApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBrbm93IGFib3V0IGEgcGVlciB0aGVuIGNvbm5lY3RcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9ob3N0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHRoaXMuX2hvc3QsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVsaWFibGVcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIGEgcGVlciBjb25uZWN0cyBoYW5kbGUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdjb25uZWN0aW9uJywgKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGFsbG93IG1vcmUgdGhhbiA0IHBsYXllcnNcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuc2l6ZSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdvcGVuJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5uZXR3b3JrKFwiUGVlciBoYXMgY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwZWVyID0gdGhpcy5hZGRQZWVyKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFBlZXIoY29ubmVjdGlvbikge1xuICAgICAgICBsZXQgcGVlciA9IHtcbiAgICAgICAgICAgIFwiY29ubmVjdGlvblwiOiBjb25uZWN0aW9uLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wZWVycy5zZXQoY29ubmVjdGlvbi5wZWVyLCBwZWVyKTtcblxuICAgICAgICBjb25uZWN0aW9uLm9uKCdkYXRhJywgKGRhdGEpPT57XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuZGVjb2RlTWVzc2FnZShjb25uZWN0aW9uLnBlZXIsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25uZWN0aW9uLm9uKCdjbG9zZScsICgpPT57XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBlZXIocGVlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwZWVyO1xuICAgIH1cblxuICAgIGNvbm5lY3RUb1BlZXIocGVlcikge1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuX25hbWUsXG4gICAgICAgICAgICBcImpvYlwiOiB0aGlzLl9zZWxlY3RlZEpvYiB8fCB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1aWxkIGxpc3Qgb2YgcGVlcnNcbiAgICAgICAgbGV0IHBlZXJzID0gW107XG4gICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy5rZXlzKCkpIHtcbiAgICAgICAgICAgIHBlZXJzLnB1c2gocGVlcik7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5wZWVycyA9IHBlZXJzO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG1lc3NhZ2VcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmNyZWF0ZU1lc3NhZ2UoXCJwZWVyLWNvbm5lY3RcIiwgZGF0YSk7XG5cbiAgICAgICAgTG9nZ2VyLm5ldHdvcmsoYFNlbmRpbmcgcGVlci1jb25uZWN0IG1lc3NhZ2UgdG8gcGVlciB3aXRoIGlkICR7cGVlci5pZH1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuaGFzQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVQZWVyKHBlZXIpIHtcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXJlbW92ZVwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHBlZXIuY29ubmVjdGlvbi5wZWVyXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wZWVycy5kZWxldGUocGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX3BlZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgbWVzc2FnZSB0byBhbGwgcGVlcnNcbiAgICAgKi9cbiAgICBfc2VuZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIubmV0d29yayhcIlNlbmQgbWVzc2FnZSB0byBwZWVyc1wiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgaWYodGhpcy5fcGVlcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGluY29taW5nIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBoYW5kbGVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nZ2VyLm5ldHdvcmsoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gR3JhYiBkYXRhIGZyb20gbWVzc2FnZVxuICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09PSBcInBlZXItY29ubmVjdFwiKSB7XG4gICAgICAgICAgICAvLyBTZWUgaWYgdGhpcyBwZWVyIGtub3dzIGFib3V0IGFueSBvdGhlciBwZWVycyBhbmQgYWRkIGlmIHdlIGRvbid0IGtub3cgdGhlbVxuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIGRhdGEucGVlcnMpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fcGVlcnMuZ2V0KHBlZXIpICYmIHBlZXIgIT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5uZXR3b3JrKGBBZGRpbmcgUGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdChwZWVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlbGlhYmxlXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VlIGlmIHdlIGhhdmUgYWxyZWFkeSBjb25uZWN0ZWQgdG8gdGhpcyBwZWVyXG4gICAgICAgICAgICBpZih0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKSAmJiAhdGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkuaGFzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVzc2FnZS5ldmVudCA9IFwiYWRkLXBsYXllclwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBicm9hZGNhc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PT0gXCJwbGF5ZXItam9iXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSm9iID0gbWVzc2FnZS5kYXRhLmpvYjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZSh0aGlzLmNyZWF0ZU1lc3NhZ2UobWVzc2FnZS5ldmVudCwgbWVzc2FnZS5kYXRhKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL0xvZ2dlci5qcyc7XG5cbmxldCByZXNvdXJjZURpciA9ICcuL2Rpc3QvcmVzb3VyY2VzLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkSW1hZ2UocmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKGltZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gcmVzb3VyY2VEaXIgKyAnaW1hZ2VzLycgKyByZXNvdXJjZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJORyBDUkVBVEVcIik7XG4gICAgICAgIHRoaXMuX3JuZyA9IG5ldyBSTkcoc2VlZCk7XG4gICAgICAgIHdpbmRvdy5ybmcgPSB0aGlzLl9ybmc7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZy5yYW5kb20oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc291bmRQYXRoID0gXCIuL2Rpc3QvcmVzb3VyY2VzL3NvdW5kcy9cIjtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCBzb3VuZHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1tb3ZlXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJtZW51LW1vdmUubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1zZWxlY3RcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcIm1lbnUtc2VsZWN0Lm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvb2xkb3duLXJlYWR5XCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJjb29sZG93bi1yZWFkeS5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb21iYXQtdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcInFydHJub3RlcW9tYmF0LmdiLm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImR1bmdlb24tdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcImR1bmdlb25kZWxheS5nYi5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9zb3VuZHMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgZm9yKGxldCBzb3VuZCBvZiBzb3VuZHMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgIC8vIExvYWQgdGhlIHNvdW5kXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRzLnNldChzb3VuZC5uYW1lLCBuZXcgSG93bCh7XG4gICAgICAgICAgICAgICAgICAgIHVybHM6IFtzb3VuZC51cmxdLFxuICAgICAgICAgICAgICAgICAgICBvbmxvYWQ6IHJlcyxcbiAgICAgICAgICAgICAgICAgICAgb25sb2FkZXJyb3I6IHJlalxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcGxheShzb3VuZE5hbWUsIGxvb3AsIHZvbHVtZSkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykgcmV0dXJuO1xuICAgICAgICBsZXQgc291bmQgPSB0aGlzLl9zb3VuZHMuZ2V0KHNvdW5kTmFtZSk7XG4gICAgICAgIHNvdW5kLmxvb3AobG9vcCB8fCBmYWxzZSk7XG4gICAgICAgIHNvdW5kLnZvbHVtZSh2b2x1bWUgfHwgLjUpO1xuICAgICAgICBzb3VuZC5wbGF5KCk7XG4gICAgfVxuXG4gICAgc3RvcChzb3VuZE5hbWUpIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHJldHVybjtcbiAgICAgICAgbGV0IHNvdW5kID0gdGhpcy5fc291bmRzLmdldChzb3VuZE5hbWUpO1xuICAgICAgICBzb3VuZC5zdG9wKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBsb2FkV29ya2VyKHdvcmtlcikge1xuICAgICAgICByZXR1cm4gbmV3IFdvcmtlcihgLi9kaXN0L3dvcmtlcnMvJHt3b3JrZXJ9LmpzYCk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxpbWl0bG9vcChmbiwgZnBzKSB7XG4gICAgICAgIC8vIFVzZSB2YXIgdGhlbiA9IERhdGUubm93KCk7IGlmIHlvdVxuICAgICAgICAvLyBkb24ndCBjYXJlIGFib3V0IHRhcmdldHRpbmcgPCBJRTlcbiAgICAgICAgdmFyIHRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBjdXN0b20gZnBzLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gNjBcbiAgICAgICAgZnBzID0gZnBzIHx8IDYwO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgICAgICAgICAgLy8gYWdhaW4sIERhdGUubm93KCkgaWYgaXQncyBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAvLyBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCkgaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBqdXN0IFxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZW4gPSBub3csIHdoaWNoIGNhbiBlbmQgdXAgbG93ZXJpbmcgb3ZlcmFsbCBmcHNcbiAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZm5cbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KDApKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzcGVjdEhlaWdodENhbGModzIpIHtcbiAgICAgICAgbGV0IHcxID0gMTkyMDtcbiAgICAgICAgbGV0IGgxID0gMTA4MDtcbiAgICAgICAgcmV0dXJuIGgxKncyL3cxO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZVF1ZXJ5KHNlYXJjaCkge1xuICAgICAgICB2YXIgYXJncyA9IHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcblxuICAgICAgICB2YXIgYXJnc1BhcnNlZCA9IHt9O1xuXG4gICAgICAgIHZhciBpLCBhcmcsIGt2cCwga2V5LCB2YWx1ZTtcblxuICAgICAgICBmb3IgKGk9MDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICAgICAgaWYgKC0xID09PSBhcmcuaW5kZXhPZignPScpKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2RlY29kZVVSSUNvbXBvbmVudChhcmcpLnRyaW0oKV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBrdnAgPSBhcmcuc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMF0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFsxXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJnc1BhcnNlZDtcbiAgICB9XG5cbiAgICAvLyBHb29kZW5vdWdoIFVVSUQ/XG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDcyNjkwOS9yYW5kb20tYWxwaGEtbnVtZXJpYy1zdHJpbmctaW4tamF2YXNjcmlwdFxuICAgIHJhbmRvbVN0cmluZyhsZW5ndGgsIGNoYXJzKSB7XG4gICAgICAgIGlmKCFjaGFycykge1xuICAgICAgICAgICAgY2hhcnMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbmd0aDsgaSA+IDA7IC0taSkgcmVzdWx0ICs9IGNoYXJzW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChjaGFycy5sZW5ndGggLSAxKSldO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5cbi8vIEltcG9ydCBTZXJ2aWNlc1xuaW1wb3J0IElucHV0U2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9LZXlib2FyZElucHV0U2VydmljZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgU291bmRTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1NvdW5kU2VydmljZSc7XG5cbi8vIEltcG9ydCB2aWV3c1xuaW1wb3J0IFBsYXllclZpZXcgICBmcm9tICcuL1BsYXllclZpZXcnO1xuaW1wb3J0IEVuZW15VmlldyAgICBmcm9tICcuL0VuZW15Vmlldyc7XG5pbXBvcnQgUm9vbVZpZXcgICAgIGZyb20gJy4vUm9vbVZpZXcnO1xuaW1wb3J0IE1haW5NZW51VmlldyBmcm9tICcuL01haW5NZW51Vmlldyc7XG5pbXBvcnQgTG9iYnlWaWV3ICAgIGZyb20gJy4vTG9iYnlWaWV3JztcbmltcG9ydCBVaVZpZXcgICAgICAgZnJvbSAnLi9VaVZpZXcnO1xuaW1wb3J0IERlYnVnVmlldyAgICBmcm9tICcuL0RlYnVnVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuXG4gICAgICAgIHRoaXMuX3ZpZXdzID0gbmV3IFNldCgpO1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKiBAdG9kbzogZG9lcyB0aGlzIGJlbG9uZyBoZXJlP1xuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSA9IGdhbWU7XG5cbiAgICAgICAgdGhpcy5fZGVidWdWaWV3ID0gbmV3IERlYnVnVmlldyhnYW1lKTtcblxuICAgICAgICB0aGlzLl9pbnB1dFNlcnZpY2UgPSBuZXcgSW5wdXRTZXJ2aWNlKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEF0dGFjaCByZXNpemUgZXZlbnRcbiAgICAgICAgLy93aW5kb3cucmVzaXplID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ub0dhbWVFdmVudHModGhpcy5fZ2FtZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJJbnB1dEhhbmRsZXJzKHRoaXMuX2lucHV0U2VydmljZSk7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2NvZGV0aGVvcnkuaW4vY29udHJvbGxpbmctdGhlLWZyYW1lLXJhdGUtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGRlbHRhID0gbm93IC0gdGhpcy50aGVuO1xuXG4gICAgICAgIC8vIElmIHRoZSBmcHMgaW50ZXJ2YWwgaXMgY29ycmVjdFxuICAgICAgICBpZiAoZGVsdGEgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGltZSBzaW5jZSBsYXN0IGZyYW1lXG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZGVsdGEgJSB0aGlzLmludGVydmFsKTtcblxuICAgICAgICAgICAgLy8gU2V0IHVwIFJlbmRlcmluZ1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB0aGlzLl9mcmFtZSB8fCAxO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSAodGhpcy5fZnJhbWUlQ29uZmlnLkZQUykgPyB0aGlzLl9mcmFtZSA6IDE7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBnYW1lXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLl9mcmFtZSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBuZXh0IHJlbmRlciBjeWNsZVxuICAgICAgICAgICAgbGV0IHRpbWVfZWwgPSAodGhpcy50aGVuIC0gdGhpcy5maXJzdCkvMTAwMDtcbiAgICAgICAgICAgICsrdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgdGhpcy5fZnBzID0gcGFyc2VJbnQodGhpcy5jb3VudGVyL3RpbWVfZWwpO1xuXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgRnJhbWVcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoZnJhbWUpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoICAgICAgICAgICAgICA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgICAgICAgICAgICAgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICBmb3IobGV0IHZpZXcgb2YgdGhpcy5fdmlld3MpICB7XG4gICAgICAgICAgICB2aWV3LnJlbmRlcih0aGlzLl9jdHgsIGZyYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2RlYnVnVmlldy5yZW5kZXIodGhpcy5fY3R4LCBmcmFtZSwgdGhpcy5fZnBzKTtcbiAgICB9XG5cbiAgICBnZXRNYWluTWVudVZpZXdzKCkge1xuICAgICAgICBsZXQgdmlld3MgPSBbXTtcblxuICAgICAgICBpZih0aGlzLl9tYWluTWVudVZpZXcpIHtcbiAgICAgICAgICAgIHZpZXdzLnB1c2godGhpcy5fbWFpbk1lbnVWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2aWV3cztcbiAgICB9XG5cbiAgICBnZXRQbGF5aW5nVmlld3MoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0aGlzLl9yb29tVmlldyxcbiAgICAgICAgICAgIC4uLnRoaXMuX3BsYXllclZpZXdzLnZhbHVlcygpLFxuICAgICAgICAgICAgdGhpcy5fdWlWaWV3XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgc3RhcnRSZW5kZXIoKSB7XG4gICAgICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDAwL0NvbmZpZy5GUFM7XG4gICAgICAgIHRoaXMuZmlyc3QgPSB0aGlzLnRoZW47XG4gICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICAgIHRoaXMuX3JlbmRlcmluZyA9IHRydWU7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMaXN0ZW4gZm9yIGdhbWUgZXZlbnRzIHNvIHdlIGNhbiBhZGp1c3QgcmVuZGVyZXJcbiAgICAgKi9cbiAgICBsaXN0ZW5Ub0dhbWVFdmVudHMoZ2FtZSkge1xuICAgICAgICBnYW1lLm9uKFwiZ2FtZS1zdGF0ZVwiLCAobWVzc2FnZSk9PiB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJWaWV3IEdhbWUgU3RhdGUgRXZlbnRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgaWYobWVzc2FnZSA9PSBcIm1haW4gbWVudVwiKSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgd2UgYXJlbid0IHJlbmRlcmluZyB0aGVuIHN0YXJ0XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3JlbmRlcmluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0UmVuZGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGxldCBtYWluTWVudVZpZXcgPSBuZXcgTWFpbk1lbnVWaWV3KGdhbWUubWFpbk1lbnUsIHRoaXMpO1xuICAgICAgICAgICAgICAgIG1haW5NZW51Vmlldy5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcgPSBtYWluTWVudVZpZXc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gbmV3IFNldChbdGhpcy5fbWFpbk1lbnVWaWV3XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1lc3NhZ2UgPT0gXCJsb2JieVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGxvYmJ5VmlldyA9IG5ldyBMb2JieVZpZXcoZ2FtZS5sb2JieSwgZ2FtZS5wbGF5ZXJzLCB0aGlzKTtcbiAgICAgICAgICAgICAgICBsb2JieVZpZXcuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3ID0gbG9iYnlWaWV3O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoW3RoaXMuX2xvYmJ5Vmlld10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UgPT0gXCJwbGF5aW5nXCIpIHtcbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgcm9vbSB2aWV3XG4gICAgICAgICAgICAgICAgbGV0IHJvb21WaWV3ID0gbmV3IFJvb21WaWV3KGdhbWUucm9vbSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcgPSByb29tVmlldztcblxuICAgICAgICAgICAgICAgIGxldCBwcm9taXNlcyA9IFtcbiAgICAgICAgICAgICAgICAgICAgcm9vbVZpZXcubG9hZFJlc291cmNlcygpXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIGxldCB2aWV3cyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGFsbCBvZiBvdXIgcGxheWVyIHZpZXdzXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyVmlld3MgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgZ2FtZS5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJWaWV3ID0gbmV3IFBsYXllclZpZXcocGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChwbGF5ZXJWaWV3LmxvYWRSZXNvdXJjZXMoKSk7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdzLnB1c2gocGxheWVyVmlldyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzLnNldChwbGF5ZXIuaWQsIHBsYXllclZpZXcpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCB1aVZpZXcgPSBuZXcgVWlWaWV3KGdhbWUudWksIGdhbWUucGxheWVycywgdGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3ID0gdWlWaWV3O1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godWlWaWV3LmxvYWRSZXNvdXJjZXMoKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBMb2FkIHNvdW5kc1xuICAgICAgICAgICAgICAgIGxldCBzb3VuZFNlcnZpY2UgPSBuZXcgU291bmRTZXJ2aWNlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlID0gc291bmRTZXJ2aWNlO1xuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2goc291bmRTZXJ2aWNlLmxvYWRSZXNvdXJjZXMoKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZnRlciBhbGwgcmVuZGVyZXJzIGFyZSByZWFkeSBsZXQgdGhlIGRpc3BhdGNoZXIga25vd1xuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi52aWV3cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlld1xuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImR1bmdlb24tdGhlbWVcIiwgdHJ1ZSwgLjMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwiYWRkLXBsYXllclwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgaWYoZ2FtZS5jdXJyZW50U3RhdGUgPT09IFwibG9ieVwiKVxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5fcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInJlbW92ZS1wbGF5ZXJcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlZJRVcgUkVNT1ZFIFBMQVlFUlwiKTtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhwbGF5ZXIuaWQpO1xuICAgICAgICAgICAgaWYodGhpcy5fcGxheWVyVmlld3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cy5kZWxldGUocGxheWVyLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IHRoaXMuZ2V0UGxheWluZ1ZpZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJhZGQtZW5lbXlcIiwgKGVuZW15KT0+e1xuICAgICAgICAgICAgbGV0IGVuZW15VmlldyA9IG5ldyBFbmVteVZpZXcoZW5lbXkpO1xuICAgICAgICAgICAgZW5lbXlWaWV3LmxvYWRSZXNvdXJjZXMoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fZW5lbXlWaWV3cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVteVZpZXdzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlWaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5fZW5lbXlWaWV3c1xuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15Vmlld3MgPSBbZW5lbXlWaWV3XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInN0YXJ0LWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnN0b3AoXCJkdW5nZW9uLXRoZW1lXCIpO1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJjb21iYXQtdGhlbWVcIiwgdHJ1ZSwgLjMpO1xuICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBbXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fdmlld3MsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fZW5lbXlWaWV3c1xuICAgICAgICAgICAgXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInBsYXllci1jb29sZG93blwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgaWYocGxheWVyLmlzTG9jYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImNvb2xkb3duLXJlYWR5XCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwicGxheWVyLWF0dGFja1wiLCAocGxheWVyKT0+e1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwiZW5kLWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnN0b3AoXCJjb21iYXQtdGhlbWVcIik7XG4gICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImR1bmdlb24tdGhlbWVcIiwgdHJ1ZSwgLjMpO1xuICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fcGxheWVyVmlld3MudmFsdWVzKCksXG4gICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3XG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBpbnB1dCB0byBhbHRlciB2aWV3IGFuZCBzZWUgaWYgd2UgbmVlZCB0byBzZW5kIGVudmVudHNcbiAgICAgKi9cbiAgICByZWdpc3RlcklucHV0SGFuZGxlcnMoaW5wdXQpIHtcbiAgICAgICAgLy8gVXAgaW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJ1cFwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy51cCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIERvd24gSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJkb3duXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcuZG93bigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcuZG93bigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExlZnQgSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJsZWZ0XCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5sZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5sZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmlnaHQgSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJyaWdodFwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb2JieVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcucmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LnJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ29uZmlybSBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImNvbmZpcm1cIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFpbiBtZW51XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51Vmlldy5jb25maXJtKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3LmNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmNvbmZpcm0oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LXNlbGVjdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEJhY2sgSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJiYWNrXCIsICgpPT57XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW5wdXQub24oXCJkZWJ1Z1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGVidWdWaWV3LnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuX3Nob3cgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5fc2hvdyA9ICF0aGlzLl9zaG93O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lLCBmcHMpIHtcbiAgICAgICAgaWYodGhpcy5fc2hvdykge1xuICAgICAgICAgICAgLy8gU2hvdyBGUFNcbiAgICAgICAgICAgIGxldCBmb250U2l6ZSAgICAgICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgbGV0IGxpbmUgPSAyMDtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGZyYW1lICsgXCIvXCIgKyBDb25maWcuRlBTICsgXCIgXCIgKyBmcHMgKyBcImZwc1wiLCAyMCwgbGluZSk7XG5cbiAgICAgICAgICAgIGxpbmUgKz0gZm9udFNpemU7XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIlBsYXllcnM6XCIsIDIwLCBsaW5lKTtcblxuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgZ2FtZS5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgbGluZSArPSBmb250U2l6ZTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQocGxheWVyLm5hbWUsIDQwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBsaW5lICs9IGZvbnRTaXplO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIkFjdGlvbiBDeWNsZTogXCIgKyBwbGF5ZXIuYWN0aW9uQ3ljbGUsIDYwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBsaW5lICs9IGZvbnRTaXplO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIkN1cnJlbnQgQWN0aW9uOiBcIiArIHBsYXllci5jdXJyZW50QWN0aW9uLmdldChcImFjdGlvblwiKSwgNjAsIGxpbmUpO1xuICAgICAgICAgICAgICAgIGxpbmUgKz0gZm9udFNpemU7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiTmV4dCBBY3Rpb246IFwiICsgKHBsYXllci5uZXh0QWN0aW9uID8gcGxheWVyLm5leHRBY3Rpb24uZ2V0KFwiYWN0aW9uXCIpIDogXCJOT05FXCIpLCA2MCwgbGluZSk7XG4gICAgICAgICAgICAgICAgbGluZSArPSBmb250U2l6ZTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJDdXJyZW50IFN0YXRlOiBcIiArIHBsYXllci5jdXJyZW50U3RhdGUsIDYwLCBsaW5lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IoZW5lbXkpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLl9lbmVteSA9IGVuZW15O1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpdGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6ICd3dXJtLXNoZWV0LnBuZycsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc3ByaXRlLFxuICAgICAgICAgICAgc3ByaXRlLndpZHRoLzMqdGhpcy5mcmFtZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIDEwLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcbmltcG9ydCBQbGF5ZXIgICAgICAgICAgZnJvbSAnLi4vbW9kZWxzL29iamVjdHMvUGxheWVyJztcblxubGV0IGpvYkRpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5TZWxlY3QgSm9iPC9oMz5cbiAgICAgICAgPGxhYmVsPkpvYjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBuYW1lPVwiam9iXCI+XG4gICAgICAgIDwvc2VsZWN0Pjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY29uZmlybVwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGxvYmJ5LCBwbGF5ZXJzLCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKGxvYmJ5KTtcbiAgICAgICAgdGhpcy5fbG9iYnkgPSBsb2JieTtcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuX3BsYXllcnMgPSBwbGF5ZXJzO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlhbG9nT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9wZW5Kb2JEaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGpvYkRpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgbGV0IGNvbmZpcm1CdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjb25maXJtXCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IGpvYlNlbGVjdCA9IGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJqb2JcIl0nKTtcblxuICAgICAgICBmb3IobGV0IGpvYiBvZiBQbGF5ZXIuZ2V0Sm9icygpKSB7XG4gICAgICAgICAgICBsZXQgam9iT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgIGpvYk9wdGlvbi52YWx1ZSA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iT3B0aW9uLmlubmVySFRNTCA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iU2VsZWN0LmFwcGVuZENoaWxkKGpvYk9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogKCk9PntcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoam9iU2VsZWN0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudFwiOiBcInBsYXllci1qb2JcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZnJvbVwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImpvYlwiOiBqb2JTZWxlY3QudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSAxMDA7XG4gICAgICAgIGxldCB5UG9zID0gMTAwO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dChcIk5BTUU6XCIsIDEwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIkpPQjpcIiwgMzAwLCB5UG9zKTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiUkVBRFk6XCIsIDUwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KDkwLCAxMTAsIDYwMCwgMTgwKTtcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgIHlQb3MgKz0gNDA7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQocGxheWVyLm5hbWUsIDEwMCwgeVBvcyk7XG5cbiAgICAgICAgICAgIGlmKHBsYXllci5qb2IpIHtcbiAgICAgICAgICAgICAgICBsZXQgam9iTmFtZSA9IHBsYXllci5qb2IubmFtZVswXS50b1VwcGVyQ2FzZSgpICsgcGxheWVyLmpvYi5uYW1lLnNsaWNlKDEpOztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoam9iTmFtZSwgMzAwLCB5UG9zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyLmN1cnJlbnRTdGF0ZSA9PSBcInJlYWR5XCIpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiIzAwZmYwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIlJFQURZXCIsIDUwMCwgeVBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmYwMDAwXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiTk9UIFJFQURZXCIsIDUwMCwgeVBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICBmb3IobGV0IG1lbnVPcHRpb24gb2YgdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBtZW51T3B0aW9uVGV4dCA9IG1lbnVPcHRpb247XG5cbiAgICAgICAgICAgIC8vIFNob3cgc2VsZWN0IGN1cnNvclxuICAgICAgICAgICAgaWYobWVudU9wdGlvblRleHQgPT0gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF0pXG4gICAgICAgICAgICAgICAgbWVudU9wdGlvblRleHQgPSBcIj4gXCIgKyBtZW51T3B0aW9uVGV4dDtcblxuICAgICAgICAgICAgLy8gRHJhdyBNZW51IE9wdGlvblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KG1lbnVPcHRpb25UZXh0LCB4UG9zLCAzMjApO1xuICAgICAgICAgICAgeFBvcyArPSAyMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2JieS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICB9XG5cbiAgICBsZWZ0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDApXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleC0tO1xuICAgIH1cblxuICAgIHJpZ2h0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCsrO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJTZWxlY3QgSm9iXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Kb2JEaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zZWxlY3RlZE9wdGlvbiA9PSBcIkxlYXZlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgXCJldmVudFwiOiBcImxlYXZlLWdhbWVcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJSZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZHkgPSAhdGhpcy5fcmVhZHk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItc3RhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHRoaXMuX3JlYWR5ID8gXCJyZWFkeVwiIDogXCJpZGxlXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2soKSB7XG4gICAgfVxuXG5cblxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5cbmxldCBob3N0RGlhbG9nID0gYFxuICAgIDxkaXYgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgICAgPGgzPkhvc3QgTXVsdGlwbGF5ZXIgR2FtZTwvaDM+XG4gICAgICAgIDxsYWJlbD5OYW1lOiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiPlxuICAgICAgICA8bGFiZWw+SWQgKG9wdGlvbmFsKTo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaWRcIj48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImhvc3RcIiBkaXNhYmxlZD5Ib3N0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxubGV0IGpvaW5EaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+Sm9pbiBNdWx0aXBsYXllciBHYW1lPC9oMz5cbiAgICAgICAgPGxhYmVsPk5hbWU6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCI+XG4gICAgICAgIDxsYWJlbD5Ib3N0IElkOiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaG9zdFwiPlxuICAgICAgICA8bGFiZWw+SWQgKG9wdGlvbmFsKTo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaWRcIj48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImpvaW5cIiBkaXNhYmxlZD5Kb2luPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihtYWluTWVudSwgdmlldykge1xuICAgICAgICBzdXBlcihtYWluTWVudSk7XG4gICAgICAgIHRoaXMuX21haW5NZW51ID0gbWFpbk1lbnU7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fZGlhbG9nT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgIGxldCB4UG9zID0gMTAwO1xuICAgICAgICBsZXQgeVBvcyA9IDEwMDtcblxuICAgICAgICBmb3IobGV0IG1lbnVPcHRpb24gb2YgdGhpcy5fbWFpbk1lbnUuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBtZW51T3B0aW9uVGV4dCA9IG1lbnVPcHRpb247XG5cbiAgICAgICAgICAgIC8vIFNob3cgc2VsZWN0IGN1cnNvclxuICAgICAgICAgICAgaWYobWVudU9wdGlvblRleHQgPT0gdGhpcy5fbWFpbk1lbnUuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF0pXG4gICAgICAgICAgICAgICAgbWVudU9wdGlvblRleHQgPSBcIj4gXCIgKyBtZW51T3B0aW9uVGV4dDtcblxuICAgICAgICAgICAgLy8gRHJhdyBNZW51IE9wdGlvblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KG1lbnVPcHRpb25UZXh0LCAxMDAsIHlQb3MpO1xuICAgICAgICAgICAgeVBvcyArPSAxMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICB9XG5cbiAgICBvcGVuSG9zdERpYWxvZyh2aWV3KSB7XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcbiAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaG9zdERpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgbGV0IGhvc3RCdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJob3N0XCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IG5hbWVJbnB1dCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgbGV0IGlkSW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImlkXCJdJyk7XG5cbiAgICAgICAgdmlldy5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICBuYW1lSW5wdXQub25pbnB1dCA9ICgpPT57XG4gICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgaG9zdEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG9zdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBob3N0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJzdGFydC1tcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkSW5wdXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9wZW5Kb2luRGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhqb2luRGlhbG9nLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2MuZmlyc3RDaGlsZDtcblxuXG4gICAgICAgIGxldCBqb2luQnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiam9pblwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBuYW1lSW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgbGV0IGhvc3RJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaG9zdFwiXScpO1xuICAgICAgICBsZXQgaWRJbnB1dCAgICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpZFwiXScpO1xuXG4gICAgICAgIHZpZXcuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAgICAgbGV0IGNoZWNrSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgJiYgaG9zdElucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIGpvaW5CdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGpvaW5CdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5hbWVJbnB1dC5vbmlucHV0ID0gY2hlY2tJbnB1dC5iaW5kKHRoaXMpO1xuICAgICAgICBob3N0SW5wdXQub25pbnB1dCA9IGNoZWNrSW5wdXQuYmluZCh0aGlzKTtcblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgam9pbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgJiYgaG9zdElucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJzdGFydC1tcFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaG9zdElkOiBob3N0SW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkSW5wdXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPyAwIDogMTtcbiAgICB9XG5cbiAgICBkb3duKCkge1xuICAgICAgICB0aGlzLnVwKCk7XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgaWYoIXRoaXMuX2RpYWxvZykge1xuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZE9wdGlvbiA9PSBcIkhvc3QgR2FtZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSG9zdERpYWxvZyh0aGlzLl92aWV3KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSm9pbkRpYWxvZyh0aGlzLl92aWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLmNsb3NlRGlhbG9nKCk7XG4gICAgfVxuXG5cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHRoaXMuX29iamVjdCA9IG9iamVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgcmVzb3VyY2UgYnkgZmlsZW5hbWVcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKi9cbiAgICBsb2FkUmVzb3VyY2UobmFtZSwgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgcmVzb3VyY2UgbG9hZGVkOiAke3Jlc291cmNlfWApO1xuICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltZy5zcmMgPSAnLi9kaXN0L3Jlc291cmNlcy9pbWFnZXMvJyArIHJlc291cmNlO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCByZXNvdXJjZSBjcmVhdGUgaXRcbiAgICAgICAgICAgIGlmKCF0aGlzLl9yZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KG5hbWUsIGltZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubG9hZFJlc291cmNlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIGFsbCByZXNvdXJjZXMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgb2JqZWN0XG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgbGV0IHJlc291cmNlUHJvbWlzZXMgPSBbXTtcbiAgICAgICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgUmVzb3VyY2VTZXJ2aWNlLmxvYWRJbWFnZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFByb21pc2UuYWxsKHJlc291cmNlUHJvbWlzZXMpLnRoZW4oKGltYWdlcyk9PntcbiAgICAgICAgICAgICAgICBmb3IobGV0IGltYWdlIG9mIGltYWdlcykge1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5zZXQoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFJlc29sdmUgUHJvbWlzZVxuICAgICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyAgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJlc3JvdWNlU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9SZXNvdXJjZVNlcnZpY2UnO1xuXG5sZXQgSk9CX1NQUklURVMgPSB7XG4gICAgXCJjbGFpcnZveWFudFwiOiBcImNsYWlydm95YW50LXNoZWV0LnBuZ1wiLFxuICAgIFwiaGVyYmFsaXN0XCI6IFwiaGVyYmFsaXN0LXNoZWV0LnBuZ1wiLFxuICAgIFwidmlsbGFpblwiOiBcInZpbGxhaW4yLXNoZWV0LnBuZ1wiLFxuICAgIFwia25pZ2h0XCI6IFwia25pZ2h0LXNoZWV0LnBuZ1wiLFxuICAgIFwibmVjcm9tYW5jZXJcIjogXCJuZWNyb21hbmNlci1zaGVldC5wbmdcIixcbiAgICBcIm5pbmphXCI6IFwibmluamEtc2hlZXQucG5nXCJcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgICAgIHN1cGVyKHBsYXllcik7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic3ByaXRlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBKT0JfU1BSSVRFU1twbGF5ZXIuam9iLm5hbWVdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzaGFkb3dcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwic2hhZG93LnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJidWJibGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwiYnViYmxlLnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSAgICAgICA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcblxuICAgICAgICBsZXQgcGxheWVyV2lkdGggID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgbGV0IHhPZmZzZXQgICAgICA9IHRoaXMuX3BsYXllci54UG9zKkNvbmZpZy5USUxFX1NJWkU7XG4gICAgICAgIGxldCB5T2Zmc2V0ICAgICAgPSB0aGlzLl9wbGF5ZXIueVBvcypDb25maWcuVElMRV9TSVpFO1xuXG4gICAgICAgIGxldCBzaGFkb3cgICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzaGFkb3cnKTtcblxuICAgICAgICBsZXQgYnViYmxlICAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyk7XG4gICAgICAgIGxldCBidWJibGVXaWR0aCAgPSBidWJibGUud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgbGV0IGJ1YmJsZUhlaWdodCA9IGJ1YmJsZS5oZWlnaHQvNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIC8vIERyYXcgU2hhZG93XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc2hhZG93LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRXaWR0aFxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0LCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWCBQb3NcbiAgICAgICAgICAgIHlPZmZzZXQgKyAocGxheWVyV2lkdGgpIC0gKENvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93JykuaGVpZ2h0LzEuNzUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG4gICAgICAgIGxldCBhbmltYXRpb25GcmFtZSA9IDA7XG5cbiAgICAgICAgaWYodGhpcy5fcGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJ3YWxraW5nXCIpIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lID0gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuX3BsYXllci5jdXJyZW50U3RhdGUgPT09IFwiYXR0YWNraW5nXCIpIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lID0gQ29uZmlnLlNQUklURV9TSVpFKjI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEcmF3IFBsYXllciBTcHJpdGVcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKSxcbiAgICAgICAgICAgIGFuaW1hdGlvbkZyYW1lLFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHhPZmZzZXQsIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgeU9mZnNldCwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBEcmF3IEJ1YmJsZVxuICAgICAgICBsZXQgYnViYmxlT2Zmc2V0ID0gMDtcblxuICAgICAgICBzd2l0Y2godGhpcy5fcGxheWVyLmN1cnJlbnRBY3Rpb24uZ2V0KFwiYWN0aW9uXCIpKSB7XG4gICAgICAgICAgICBjYXNlIFwidGhpbmtpbmdcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImF0dGFja1wiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkZWZlbmRcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpdGVtXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYWJpbGl0eVwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSo0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5fcGxheWVyLmN1cnJlbnRBY3Rpb24uZ2V0KFwiYWN0aW9uXCIpICE9PSBcIndhbGtcIlxuICAgICAgICAgICAgICAgICYmIHRoaXMuX3BsYXllci5jdXJyZW50QWN0aW9uLmdldChcImFjdGlvblwiKSAhPT0gXCJyZWFkeVwiXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fcGxheWVyLmN1cnJlbnRTdGF0ZSAhPT0gXCJ3YWxraW5nXCJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLl9wbGF5ZXIuY3VycmVudFN0YXRlICE9PSBcImF0dGFja2luZ1wiKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCwgLy8gRFlcbiAgICAgICAgICAgICAgICBidWJibGUud2lkdGgsICAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGUuaGVpZ2h0LzUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICB4T2Zmc2V0IC0gKGJ1YmJsZVdpZHRoLzEuNSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgICAgIHlPZmZzZXQgLSAoYnViYmxlSGVpZ2h0LzEuNSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgICAgIGJ1YmJsZVdpZHRoLCAgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlSGVpZ2h0ICAvLyBzSGVpZ2h0XG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbi8vIFN0YXRpYyBSb29tIFR5cGVzXG4vL3N0YXRpYyBnZXQgVFlQRV9DQVZFKCkge1xuICAgIC8vcmV0dXJuIHtcbiAgICAgICAgLy9mbG9vcjogJ2dvb2R0aWxlLnBuZycsXG4gICAgICAgIC8vd2FsbDogJ3NoaXR3YWxsLnBuZydcbiAgICAvL307XG4vL31cblxuLy9zdGF0aWMgZ2V0IFRZUEVfVEVNUExFKCkge1xuICAgIC8vcmV0dXJuIHtcbiAgICAgICAgLy9mbG9vcjogJ2dyYXNzLnBuZycsXG4gICAgICAgIC8vd2FsbDogJ3BpbGxhcnMucG5nJ1xuICAgIC8vfTtcbi8vfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHJvb20pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcm9vbSA9IHJvb207XG4gICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fd2FsbE9mZnNldCAgPSAwO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJmbG9vclwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJnb29kdGlsZS5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwid2FsbFwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJzaGl0d2FsbDIucG5nXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwiZmxvb3JcIiwgXCJnb29kdGlsZS5wbmdcIiksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcIndhbGxcIiwgIFwic2hpdHdhbGwyLnBuZ1wiKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBpZihmcmFtZSU0ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWUgPSB0aGlzLmZyYW1lID8gMCA6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXIgRmxvb3JcbiAgICAgICAgbGV0IGZsb29yID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnZmxvb3InKTtcbiAgICAgICAgbGV0IGZsb29yV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5USUxFX1grMTsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgQ29uZmlnLlRJTEVfWSAtIDQ7IHkrKykge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgICAgICBmbG9vcixcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICsgZmxvb3JXaWR0aCp4IC0gZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgKHkrMikqZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyIFdhbGxcbiAgICAgICAgbGV0IHdhbGwgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCd3YWxsJyk7XG4gICAgICAgIGxldCB3YWxsV2lkdGggPSB3YWxsLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuQ0FOVkFTX1dJRFRILyh3YWxsV2lkdGgpICsgMTsgeCsrKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB3YWxsLFxuICAgICAgICAgICAgICAgIDAsIC8vIERYXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQvMip0aGlzLmZyYW1lLCAvL0RZXG4gICAgICAgICAgICAgICAgd2FsbC53aWR0aCxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKyB3YWxsV2lkdGgqeCAtIHdhbGxXaWR0aCwgLy9zeFxuICAgICAgICAgICAgICAgIDAsIC8vc3lcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRS8yXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBPZmZzZXRzXG4gICAgICAgIGxldCB4U3RlcCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzE2O1xuICAgICAgICBpZih0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PSBcIm1vdmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX2Zsb29yT2Zmc2V0ID49IGZsb29yV2lkdGggLSAxKSB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl93YWxsT2Zmc2V0ID4gd2FsbFdpZHRoIC0gMSkgdGhpcy5fd2FsbE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgTG9nZ2VyICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IodWksIHBsYXllcnMsIHZpZXcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdWkgICAgICAgICA9IHVpO1xuICAgICAgICB0aGlzLl92aWV3ICAgICAgID0gdmlldztcbiAgICAgICAgdGhpcy5fcGxheWVycyAgICA9IHBsYXllcnM7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVUkgUExBWUVSU1wiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9wbGF5ZXJzKTtcblxuICAgICAgICB0aGlzLl90aWxlSGVpZ2h0ID0gMjtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYmdcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwidWktYmcucG5nXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBsZXQgeVBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCk7XG5cbiAgICAgICAgLy8gRHJhdyBCYWNrZ3JvdW5kXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgbGV0IGJnUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB5UG9zLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHlQb3MsXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCguLi5iZ1JlY3QpO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcIiM2NEEzNTdcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcIiMwMDM3MDBcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KC4uLnVpUmVjdCk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjOEQ4MDQ1XCI7XG5cbiAgICAgICAgLy8gVGhlIHN0cm9rZSBpcyBtaWRkbGUgYWxpZ25lZCB3aXRoIHRoZSBlZGdlcyBvZiB0aGUgYm94XG4gICAgICAgIGxldCBsaW5lV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8zMjtcbiAgICAgICAgLy9sZXQgbGluZVdpZHRoID0gNTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICBsZXQgc3Ryb2tlUmVjdCA9IFsuLi51aVJlY3RdO1xuICAgICAgICBzdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzJdIC09IGxpbmVXaWR0aDtcbiAgICAgICAgc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gRmlsbCBiZyB3aXRoIHBhdGVyblxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjE7XG4gICAgICAgIGxldCBwYXRlcm4gPSBjdHguY3JlYXRlUGF0dGVybih0aGlzLl9yZXNvdXJjZXMuZ2V0KFwiYmdcIiksIFwicmVwZWF0XCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0ZXJuO1xuICAgICAgICBjdHgucmVjdCguLi5zdHJva2VSZWN0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB5UG9zICs9IENvbmZpZy5USUxFX1NJWkUvMztcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuXG4gICAgICAgIGxldCB4UG9zID0gQ29uZmlnLlRJTEVfU0laRSoxLjI7XG5cbiAgICAgICAgaWYodGhpcy5fdmlldy5fZ2FtZS5sb2NhbFBsYXllci5jdXJyZW50U3RhdGUgPT09IFwiaWRsZVwiKSB7XG4gICAgICAgICAgICAvLyBEcmF3IEluZm9cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1swXSxcbiAgICAgICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgICAgIHlQb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMV0sXG4gICAgICAgICAgICAgICAgeFBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5UG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzJdLFxuICAgICAgICAgICAgICAgIHhQb3MsXG4gICAgICAgICAgICAgICAgeVBvcyArIGZvbnRTaXplKjJcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMyA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbM10sXG4gICAgICAgICAgICAgICAgeFBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5UG9zICsgZm9udFNpemUqMlxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICB4UG9zID0gQ29uZmlnLlRJTEVfU0laRSo1O1xuICAgICAgICB5UG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEluZm9cbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgeVBvcyArPSBmb250U2l6ZSoyO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBOYW1lc1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgICAgIHlQb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgY29vbGRvd24gdmFyc1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFyWVBvcyAgID0geVBvcyArIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJXaWR0aCAgPSBDb25maWcuVElMRV9TSVpFO1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFySGVpZ2h0ID0gZm9udFNpemUvMjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBDb29sZG93biBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDBGRjAwXCI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25QZXJjZW50YWdlID0gcGxheWVyLmNvb2xkb3duL3BsYXllci5tYXhDb29sZG93bjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4UG9zLCBjb29sZG93bkJhcllQb3MsIGNvb2xkb3duQmFyV2lkdGgqY29vbGRvd25QZXJjZW50YWdlLCBjb29sZG93bkJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgQ29vbGRvd24gU3Ryb2tlXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggICA9IDEqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHhQb3MsIGNvb2xkb3duQmFyWVBvcywgY29vbGRvd25CYXJXaWR0aCwgY29vbGRvd25CYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgSGVhbHRoYmFyIHZhcnNcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJYUG9zICAgPSB4UG9zICsgQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcllQb3MgICA9IHlQb3MgLSBmb250U2l6ZS8yO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcldpZHRoICA9IENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJIZWlnaHQgPSBmb250U2l6ZS8yO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoUGVyY2VudGFnZSA9IHBsYXllci5oZWFsdGgvcGxheWVyLm1heEhlYWx0aDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCpoZWFsdGhQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLmhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGhlYWx0aEJhcllQb3MgKz0gaGVhbHRoQmFySGVpZ2h0KjEuNTtcblxuICAgICAgICAgICAgLy9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICAvL2N0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xuICAgICAgICAgICAgbGV0IG1hbmFQZXJjZW50YWdlID0gcGxheWVyLm1hbmEvcGxheWVyLm1heE1hbmE7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqbWFuYVBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIubWFuYX0vJHtwbGF5ZXIubWF4TWFuYX1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXAoKSB7XG4gICAgICAgIGlmKHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuY3VycmVudFN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAyO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAzKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgIH1cblxuICAgIGxlZnQoKSB7XG4gICAgICAgIGlmKHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuY3VycmVudFN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAzKVxuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAyO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmlnaHQoKSB7XG4gICAgICAgIHRoaXMubGVmdCgpO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuY3VycmVudFN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRPcHRpb24gPSB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcblxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IEltbXV0YWJsZS5NYXAoe1xuICAgICAgICAgICAgICAgIFwiY3ljbGVcIjogdGhpcy5fdmlldy5fZ2FtZS5sb2NhbFBsYXllci5hY3Rpb25DeWNsZSxcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XSxcbiAgICAgICAgICAgICAgICBcInRhcmdldFwiOiAwXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoIUltbXV0YWJsZS5pcyhhY3Rpb24sIHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuY3VycmVudEFjdGlvbikpIHtcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJldmVudFwiOiBcInBsYXllci1hY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiBhY3Rpb25cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3LnBvc3RNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIl19
