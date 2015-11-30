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
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../mixins/EventEmitter":5,"../services/Logger":16,"../services/NetworkService":17}],5:[function(require,module,exports){
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
            var _this2 = this;

            // Set room to moving
            this._room.currentState = "moving";

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

            setTimeout(function () {
                _this2._startBattle();
            }, 2000);
        }
    }, {
        key: '_startBattle',
        value: function _startBattle() {
            var _this3 = this;

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
                        _this3.checkPlayerAction(player);
                        _this3.emit("player-cooldown", player);
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
            var _this4 = this;

            var action = p.currentAction;
            if (action.get("action") === "attack") {
                p.walkForward(function () {
                    p.attack(function () {
                        _this4._combatPhase();
                        p.nextActionCycle();
                        p.walkBack(function () {
                            if (_this4._room.currentState === "idle") {
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
    }, {
        key: 'handleMessage',
        value: function handleMessage(message) {
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
                        var _iteratorNormalCompletion8 = true;
                        var _didIteratorError8 = false;
                        var _iteratorError8 = undefined;

                        try {
                            for (var _iterator8 = this._players.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                                var player = _step8.value;

                                player.currentState = "idle";
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
    }, {
        key: 'walkForward',
        value: function walkForward(cb) {
            var _this = this;

            var idleXPos = this.xPos;
            var destXPos = this.xPos - 1;

            var step = .10;

            this.currentState = "walking";

            var walkInterval = setInterval(function () {
                _this.xPos -= step;
                if (_this.xPos <= destXPos) {
                    clearInterval(walkInterval);
                    _this.currentState = "idle";
                    if (cb) cb();
                }
            }, 1000 / _Config2['default'].FPS);
        }
    }, {
        key: 'attack',
        value: function attack(cb) {
            var _this2 = this;

            this.currentState = "attacking";

            var attackTimeout = setTimeout(function () {
                _this2.currentState = "idle";
                if (cb) cb();
            }, 250);
        }
    }, {
        key: 'walkBack',
        value: function walkBack(cb) {
            var _this3 = this;

            var currentXPos = this.xPos;
            var destXPos = this.xPos + 1;

            var step = .10;

            this.currentState = "walking";

            var walkInterval = setInterval(function () {
                _this3.xPos += step;
                if (_this3.xPos >= destXPos) {
                    clearInterval(walkInterval);
                    _this3.currentState = "idle";
                    if (cb) cb();
                }
            }, 1000 / _Config2['default'].FPS);
        }
    }, {
        key: 'endCombat',
        value: function endCombat() {
            this.nextActionCycle();

            this.currentState = "idle";
            this.cooldown = 0;
            this._readyToAttack = false;

            this.onCooldown = undefined;

            if (this._cooldownInterval) clearInterval(this._cooldownInterval);
        }
    }, {
        key: 'chargeCooldown',
        value: function chargeCooldown(callback) {
            var _this4 = this;

            this.cooldown = 0;

            if (this._cooldownInterval) clearInterval(this._cooldownInterval);

            this._cooldownInterval = setInterval(function () {
                _this4.cooldown++;
                if (_this4.cooldown >= _this4.maxCooldown) {
                    clearInterval(_this4._cooldownInterval);
                    _this4._readyToAttack = true;
                    if (_this4.onCooldown) _this4.onCooldown(_this4);
                }
            }, 60);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbWl4aW5zL2V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL0xvYmJ5LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTWFpbk1lbnUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUm9vbS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9OZXR3b3JrU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1JuZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1NvdW5kU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1V0aWxzLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvQ2FudmFzMmQuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9EZWJ1Z1ZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9FbmVteVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Mb2JieVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9NYWluTWVudVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9PYmplY3RWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21WaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt5QkNBbUIsY0FBYzs7Ozs7QUFHakMsSUFBSSxNQUFNLEdBQUcsMkJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDUHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7Ozs7QUFLcEMsTUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7QUFFekUsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXOztBQUUxQixVQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs7QUFFdEIsVUFBTSxDQUFDLFdBQVcsR0FBSyxFQUFFLENBQUM7OztBQUcxQixRQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BDLE9BQUc7QUFDQyxjQUFNLENBQUMsWUFBWSxHQUFLLFdBQVcsRUFBRSxHQUFDLE1BQU0sQ0FBQyxVQUFVLEFBQUMsQ0FB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QUNOLGdCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLEtBQUssTUFBTSxFQUFFO0FBQ3JELG9CQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFdkUsb0JBQUksTUFBTSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUM7QUFDdkIsMkJBQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsV0FBVztBQUNqRCw0QkFBUSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztBQUM1RCw0QkFBUSxFQUFFLENBQUM7aUJBQ2QsQ0FBQyxDQUFDOztBQUVILG9CQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFO0FBQ2xFLHdCQUFJLE9BQU8sR0FBRztBQUNWLCtCQUFPLEVBQUUsZUFBZTtBQUN4Qiw4QkFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQ3ZDLDhCQUFNLEVBQUUsTUFBTTtxQkFDakIsQ0FBQTs7QUFFRCx3QkFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQ25DO2FBQ0o7U0FDSiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGVuZ2luZSA9IG5ldyBFbmdpbmUoZG9jdW1lbnQuYm9keSk7XG5lbmdpbmUuaW5pdCgpO1xuXG4vLyBERUJVR1xud2luZG93LmVuZ2luZSA9IGVuZ2luZTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG4vL2NvbmZpZy5ESVNBQkxFX0FVRElPID0gdHJ1ZTtcblxuLy8gMTZ4OSBBc3BlY3QgUmF0aW9cbmNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbmNvbmZpZy5BU1BFQ1RfSEVJR0hUID0gMTA4MDtcblxuY29uZmlnLlRJTEVfWCA9IDE2OyAvLyBNVVNUIEJFIE1VTFRJUExFIE9GIDE2XG5jb25maWcuVElMRV9ZID0gKGNvbmZpZy5USUxFX1gqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbmNvbmZpZy5jYWxjdWxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBIb3Jpem9udGFsIG9yIFZlcnRpY2FsIHBlcmNlbnRhZ2UgdGhhdCB0aGUgZ2FtZSB2aWV3IHNob3VsZCBvY2N1cHlcbiAgICBjb25maWcuUEVSQ0VOVEFHRSA9IDE7XG5cbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuXG4gICAgLy8gQ2FjbHVsYXRlIGNhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IGFjY29yZGluZyB0byBhYm92ZSBwZXJjZW50YWdlIGFuZCBhc3BlY3QgcmF0aW9cbiAgICBsZXQgc2NyZWVuV2lkdGggPSB3aW5kb3cub3V0ZXJXaWR0aDtcbiAgICBkbyB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfV0lEVEggID0gKHNjcmVlbldpZHRoLS0qY29uZmlnLlBFUkNFTlRBR0UpO1xuICAgICAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuICAgIH0gd2hpbGUoY29uZmlnLkNBTlZBU19IRUlHSFQlY29uZmlnLlNQUklURV9TSVpFICE9PSAwKVxuXG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgLy9pZihjb25maWcuQ0FOVkFTX0hFSUdIVCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAvL2NvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgLy9jb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIC8vfVxuXG4gICAgLy8gRGV0ZXJtaW5lIFNwcml0ZSBTY2FsaW5nXG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG4gICAgY29uZmlnLlRJTEVfU0laRSAgICAgPSBjb25maWcuU1BSSVRFX1NJWkUqY29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgIC8vIFNldCBGUFNcbiAgICBjb25maWcuRlBTID0gMzA7XG59XG5cbmNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IENvbmZpZyBmcm9tICcuLi9Db25maWcnO1xuLy8gSW1wb3J0IEdhbWVcbmltcG9ydCBHYW1lIGZyb20gJy4vbW9kZWxzL0dhbWUnO1xuXG4vLyBJbXBvcnQgVmlld1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3cy9DYW52YXMyZCc7XG5cbi8vIEltcG9ydCBEaXNwYXRjaGVyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2Rpc3BhdGNoZXIvRGlzcGF0Y2hlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSAgICAgICA9IG5ldyBHYW1lKCk7XG4gICAgICAgIHRoaXMuX3ZpZXcgICAgICAgPSBuZXcgVmlldygpO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblxuICAgICAgICB3aW5kb3cuZ2FtZSAgICAgICA9IHRoaXMuX2dhbWU7XG4gICAgICAgIHdpbmRvdy52aWV3ICAgICAgID0gdGhpcy5fdmlldztcbiAgICAgICAgd2luZG93LmRpc3BhdGNoZXIgPSB0aGlzLl9kaXNwYXRjaGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGVuZ2luZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMuX2dhbWUuaW5pdCh0aGlzLl9kaXNwYXRjaGVyKSxcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcuaW5pdCh0aGlzLl9nYW1lKSxcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuaW5pdCh0aGlzLl92aWV3KVxuICAgICAgICBdKS50aGVuKCgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLnBvc3RNZXNzYWdlKHtcImV2ZW50XCI6IFwiZ2FtZS1zdGFydFwifSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IEV2ZW50RW1pdHRlciAgIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IE5ldHdvcmtTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL05ldHdvcmtTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5fdmlldy5vbm1lc3NhZ2UgPSB0aGlzLmhhbmRsZVZpZXdNZXNzYWdlcy5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIGluaXRNdWx0aXBsYXllckdhbWUobWVzc2FnZSkge1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICAvLyBCdWlsZCBhcmdzXG4gICAgICAgIGlmKG1lc3NhZ2UuaG9zdElkKSB7XG4gICAgICAgICAgICBhcmdzID0gW21lc3NhZ2UubmFtZSwgbWVzc2FnZS5ob3N0SWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncyA9IFttZXNzYWdlLm5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluaXQgbXAgY29udHJvbGxlclxuICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZSA9IG5ldyBOZXR3b3JrU2VydmljZSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UuaW5pdCgpLnRoZW4oKCk9PntcblxuICAgICAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2Uub25tZXNzYWdlID0gbWVzc2FnZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogQnJvYWRjYXN0IEFkZCBQbGF5ZXIgTWVzc2FnZVwiKTtcblxuICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgXCJldmVudFwiOiBcImFkZC1wbGF5ZXJcIixcbiAgICAgICAgICAgICAgICBcImZyb21cIjogU3ltYm9sKCksXG4gICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IG1lc3NhZ2UubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJpc0xvY2FsXCI6IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgXCJldmVudFwiOiBcImdhbWUtc3RhdGVcIixcbiAgICAgICAgICAgICAgICBcImRhdGFcIjogXCJsb2JieVwiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGVhdmVHYW1lKCkge1xuICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgXCJldmVudFwiOiBcImdhbWUtc3RhdGVcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiBcIm1haW4gbWVudVwiXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZ2V0IGEgcGVlciBjb25uZWN0IGV2ZW50IGZvcm0gdGhlIG11bHRpcGxheWVyIGNvbnRyb2xsZXIsIGNyZWF0ZSBhIGFkZCBwbGF5ZXIgZXZlbnRcbiAgICAgKi9cbiAgICBwZWVyQ29ubmVjdChtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IFBlZXIgQ29ubmVjdCBNZXNzYWdlXCIpO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBBZGQgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgXCJldmVudFwiOiBcImFkZC1wbGF5ZXJcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBtZXNzYWdlLmZyb20sXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IG1lc3NhZ2UuZGF0YS5uYW1lLFxuICAgICAgICAgICAgICAgIFwiam9iXCI6IG1lc3NhZ2UuZGF0YS5qb2JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBnZXQgYSBwZWVyIGRpc2Nvbm5lY3QgZXZlbnQgZm9ybSB0aGUgbXVsdGlwbGF5ZXIgY29udHJvbGxlciwgY3JlYXRlIGEgcmVtb3ZlIHBsYXllciBldmVudFxuICAgICAqL1xuICAgIHBlZXJEaXNjb25uZWN0KG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogUGVlciBEaXNjb25uZWN0IE1lc3NhZ2VcIik7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogQnJvYWRjYXN0IFJlbW92ZSBQbGF5ZXIgTWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgIFwiZXZlbnRcIjogXCJyZW1vdmUtcGxheWVyXCIsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbGwgbXVsdGlwbGF5ZXIgRXZlbnRzXG4gICAgICovXG4gICAgaGFuZGxlTXVsdGlwbGF5ZXJNZXNzYWdlcyhtZXNzYWdlKSB7XG4gICAgICAgIHRoaXMucG9zdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYWxsIHZpZXcgbWVzc2FnZXNcbiAgICAgKi9cbiAgICBoYW5kbGVWaWV3TWVzc2FnZXMobWVzc2FnZSkge1xuICAgICAgICBsZXQgZXZlbnQgPSBtZXNzYWdlLmV2ZW50O1xuICAgICAgICBsZXQgZGF0YSAgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICAgICAgaWYoZXZlbnQgPT09IFwic3RhcnQtbXBcIikge1xuICAgICAgICAgICAgdGhpcy5pbml0TXVsdGlwbGF5ZXJHYW1lKGRhdGEpO1xuICAgICAgICB9IGVsc2UgaWYgKGV2ZW50ID09PSBcImxlYXZlLWdhbWVcIikge1xuICAgICAgICAgICAgdGhpcy5sZWF2ZUdhbWUoKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gQ29udmVydCBhbnkgSW1tdXRhYmxlIGRhdGEgdG8gSlNPTlxuICAgICAgICAgICAgaWYobWVzc2FnZS5kYXRhICYmIG1lc3NhZ2UuZGF0YS50b0pTT04pXG4gICAgICAgICAgICAgICAgbWVzc2FnZS5kYXRhID0gZGF0YS50b0pTT04oKTtcblxuICAgICAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmJyb2FkY2FzdE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG5cbiAgICBvbih0eXBlcywgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgdHlwZSBvZiB0eXBlcy5zcGxpdChcIiBcIikpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG4gICAgcG9zdE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBpZih0aGlzLm9ubWVzc2FnZSlcbiAgICAgICAgICAgIHRoaXMub25tZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cbn1cbiIsInZhciBERUZBVUxUX01BWF9MSVNURU5FUlMgPSAxMlxuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlLCAuLi5hcmdzKXtcbiAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBbbWVzc2FnZV0uY29uY2F0KGFyZ3MpKVxuICBjb25zb2xlLnRyYWNlKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IERFRkFVTFRfTUFYX0xJU1RFTkVSU1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fVxuICAgIH1cblxuICAgIG9uKHR5cGVzLCBsaXN0ZW5lcikge1xuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCB0eXBlIG9mIHR5cGVzLnNwbGl0KFwiIFwiKSkge1xuICAgICAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXSB8fCh0aGlzLl9ldmVudHNbdHlwZV0gPSBbXSlcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSAhPSAtMSkge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnMubGVuZ3RoID4gdGhpcy5fbWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgIGVycm9yKFxuICAgICAgICAgICAgICAgIFwicG9zc2libGUgbWVtb3J5IGxlYWssIGFkZGVkICVpICVzIGxpc3RlbmVycywgXCIrXG4gICAgICAgICAgICAgICAgXCJ1c2UgRXZlbnRFbWl0dGVyI3NldE1heExpc3RlbmVycyhudW1iZXIpIGlmIHlvdSBcIiArXG4gICAgICAgICAgICAgICAgXCJ3YW50IHRvIGluY3JlYXNlIHRoZSBsaW1pdCAoJWkgbm93KVwiLFxuICAgICAgICAgICAgICAgIGxpc3RlbmVycy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnNcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgZXZlbnRzSW5zdGFuY2UgPSB0aGlzXG4gICAgICAgIGZ1bmN0aW9uIG9uY2VDYWxsYmFjaygpe1xuICAgICAgICAgIGV2ZW50c0luc3RhbmNlLm9mZih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgICAgICAgbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm9uKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICB9XG5cbiAgICBvZmYodHlwZSwgLi4uYXJncykge1xuICAgICAgICBpZihhcmdzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGFyZ3NbMF1cbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV1cbiAgICAgICAgaWYoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4T2ZMaXN0ZW5lciA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKVxuICAgICAgICBpZihpbmRleE9mTGlzdGVuZXIgPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXhPZkxpc3RlbmVyLCAxKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGVtaXQodHlwZSwgLi4uYXJncyl7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV1cbiAgICAgICAgaWYoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZuID0+IGZuLmFwcGx5KG51bGwsIGFyZ3MpKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHNldE1heExpc3RlbmVycyhuZXdNYXhMaXN0ZW5lcnMpe1xuICAgICAgICBpZihwYXJzZUludChuZXdNYXhMaXN0ZW5lcnMpICE9PSBuZXdNYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuZXdNYXhMaXN0ZW5lcnNcbiAgICB9XG5cbiAgICBwb3N0TWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIGlmKHRoaXMub25tZXNzYWdlKVxuICAgICAgICAgICAgdGhpcy5vbm1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiU0VUIFNUQVRFIFRPIFNUQVRFXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RhdGU7XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IE1peGluc1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvZXZlbnRFbWl0dGVyJztcblxuLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICAgZnJvbSAnLi4vc2VydmljZXMvUm5nJztcblxuLy8gSW1wb3J0IE1vZGVsc1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5pbXBvcnQgUGxheWVyICAgIGZyb20gJy4vb2JqZWN0cy9QbGF5ZXInO1xuaW1wb3J0IEVuZW15ICAgICBmcm9tICcuL29iamVjdHMvTW9uc3Rlcic7XG5pbXBvcnQgUm9vbSAgICAgIGZyb20gJy4vb2JqZWN0cy9Sb29tJztcbmltcG9ydCBNYWluTWVudSAgZnJvbSAnLi9vYmplY3RzL01haW5NZW51JztcbmltcG9ydCBMb2JieSAgICAgZnJvbSAnLi9vYmplY3RzL0xvYmJ5JztcbmltcG9ydCBVaSAgICAgICAgZnJvbSAnLi9vYmplY3RzL1VpJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtyZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlO31cbiAgICBnZXQgbWFpbk1lbnUoKSB7cmV0dXJuIHRoaXMuX21haW5NZW51O31cbiAgICBnZXQgbG9iYnkoKSB7cmV0dXJuIHRoaXMuX2xvYmJ5O31cbiAgICBnZXQgcGxheWVycygpIHtyZXR1cm4gdGhpcy5fcGxheWVyczt9XG4gICAgZ2V0IGxvY2FsUGxheWVyKCkge3JldHVybiB0aGlzLl9sb2NhbFBsYXllcjt9XG4gICAgZ2V0IHJvb20oKSB7cmV0dXJuIHRoaXMuX3Jvb207fVxuICAgIGdldCB1aSgpIHtyZXR1cm4gdGhpcy5fdWk7fVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fc3RhdGVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBcIm1haW4gbWVudVwiLFxuICAgICAgICAgICAgXCJsb2JieVwiLFxuICAgICAgICAgICAgXCJwbGF5aW5nXCJcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fbWFpbk1lbnUgPSBuZXcgTWFpbk1lbnUoKTtcbiAgICAgICAgdGhpcy5fbG9iYnkgICAgPSBuZXcgTG9iYnkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KGRpc3BhdGNoZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgICAgICAvLyBMSVNURU4gRk9SIEVWRU5UU1xuICAgICAgICAgICAgLy90aGlzLmxpc3RlblRvRGlzcGF0Y2hlcih0aGlzLl9kaXNwYXRjaGVyKTtcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIub25tZXNzYWdlID0gdGhpcy5oYW5kbGVNZXNzYWdlLmJpbmQodGhpcyk7XG5cbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGdhbWUgc3RhdGUgaWYgaXRzIGFsbG93ZWRcbiAgICAgKiBNYWtlIHN1cmUgd2UgZW1pdCBpdFxuICAgICAqL1xuICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgaWYodGhpcy5fY3VycmVudFN0YXRlID09IFwibWFpbiBtZW51XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBhbGwgcGxheWVyc1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllcnMgICAgID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsUGxheWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZ2FtZS1zdGF0ZVwiLCB0aGlzLl9jdXJyZW50U3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB0aGlzIGZ1bmN0aW9uIGFmdGVyIGFueSBwbGF5ZXJzdGFlIGNoYW5nZSBzbyB3ZSBjYW4gZGVjaWRlIHdoYXQgdG8gZG8uXG4gICAgICovXG4gICAgY2hlY2tQbGF5ZXJTdGF0ZSgpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsb2J5IGRlY2lkZSBpZiB3ZSBuZWVkIHRvIHN0YXJ0IHRoZSBnYW1lXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09PSBcImxvYmJ5XCIpIHtcbiAgICAgICAgICAgIGxldCByZWFkeVRvU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcmVhZHlUb1N0YXJ0ID0gcmVhZHlUb1N0YXJ0ICYmIHBsYXllci5jdXJyZW50U3RhdGUgPT09IFwicmVhZHlcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocmVhZHlUb1N0YXJ0KSB7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmJhbm5lcihcIlNUQVJUSU5HIEdBTUVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRQbGF5aW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1BsYXllckFjdGlvbihwKSB7XG4gICAgICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09PSBcInBsYXlpbmdcIikge1xuICAgICAgICAgICAgaWYodGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPT09IFwiaWRsZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlYWR5VG9Nb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZHlUb01vdmUgPSByZWFkeVRvTW92ZSAmJiBwbGF5ZXIuY3VycmVudEFjdGlvbi5nZXQoXCJhY3Rpb25cIikgPT09IFwicmVhZHlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihyZWFkeVRvTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPT09IFwiYmF0dGxlXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgYWN0aW9uTmFtZSA9IHAuY3VycmVudEFjdGlvbi5nZXQoXCJhY3Rpb25cIik7XG4gICAgICAgICAgICAgICAgaWYoYWN0aW9uTmFtZSAhPT0gXCJ0aGlua2luZ1wiICYmIHAucmVhZHlUb0F0dGFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJBY3Rpb24ocCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3N0YXJ0UGxheWluZygpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgcm9vbVxuICAgICAgICB0aGlzLl9yb29tICAgICAgICA9IG5ldyBSb29tKCk7XG4gICAgICAgIHRoaXMuX3VpICAgICAgICAgID0gbmV3IFVpKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJwbGF5aW5nXCI7XG5cbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfbG9va0ZvclRyb3VibGUoKSB7XG4gICAgICAgIC8vIFNldCByb29tIHRvIG1vdmluZ1xuICAgICAgICB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9IFwibW92aW5nXCI7XG5cbiAgICAgICAgLy8gU2V0IHBsYXllcnMgdG8gd2Fsa2luZ1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHBsYXllci5yZXNldEFjdGlvbkN5Y2xlKCk7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gXCJ3YWxraW5nXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgZW5lbWllc1xuICAgICAgICBsZXQgZW5lbXkgPSBuZXcgRW5lbXkoKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkLWVuZW15XCIsIGVuZW15KTtcblxuICAgICAgICB0aGlzLl9lbmVtaWVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBlbmVteVxuICAgICAgICBdKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLl9zdGFydEJhdHRsZSgpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBfc3RhcnRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJiYXR0bGVcIjtcbiAgICAgICAgdGhpcy5fdWkuc2V0QmF0dGxlT3B0aW9ucygpO1xuXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmJlZ2luQ29tYmF0KCk7XG5cbiAgICAgICAgICAgIHBsYXllci5vbkNvb2xkb3duID0gKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrUGxheWVyQWN0aW9uKHBsYXllcik7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWNvb2xkb3duXCIsIHBsYXllcik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBwbGF5ZXIuY2hhcmdlQ29vbGRvd24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZW1pdCgnc3RhcnQtYmF0dGxlJyk7XG4gICAgfVxuXG4gICAgX3BsYXllckFjdGlvbihwKSB7XG4gICAgICAgIGxldCBhY3Rpb24gPSBwLmN1cnJlbnRBY3Rpb247XG4gICAgICAgIGlmKGFjdGlvbi5nZXQoXCJhY3Rpb25cIikgPT09IFwiYXR0YWNrXCIpIHtcbiAgICAgICAgICAgIHAud2Fsa0ZvcndhcmQoKCk9PntcbiAgICAgICAgICAgICAgICBwLmF0dGFjaygoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb21iYXRQaGFzZSgpO1xuICAgICAgICAgICAgICAgICAgICBwLm5leHRBY3Rpb25DeWNsZSgpO1xuICAgICAgICAgICAgICAgICAgICBwLndhbGtCYWNrKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwLmVuZENvbWJhdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcC5uZXh0QWN0aW9uQ3ljbGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jb21iYXRQaGFzZSgpIHtcbiAgICAgICAgbGV0IHNob3VsZEVuZEJhdHRsZSA9IHRydWU7XG4gICAgICAgIGZvcihsZXQgZW5lbXkgb2YgdGhpcy5fZW5lbWllcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZW5lbXkuaGVhbHRoLS07XG4gICAgICAgICAgICBzaG91bGRFbmRCYXR0bGUgPSBzaG91bGRFbmRCYXR0bGUgJiYgKGVuZW15LmhlYWx0aCA8PSAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNob3VsZEVuZEJhdHRsZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5kQmF0dGxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZW5kQmF0dGxlKCkge1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGlmKHBsYXllci5jdXJyZW50U3RhdGUgPT09IFwiaWRsZVwiKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLmVuZENvbWJhdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICAgICAgdGhpcy5fdWkuc2V0SWRsZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5lbWl0KCdlbmQtYmF0dGxlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHBsYXllciByZWdhcmRsZXNzIG9mIHJlbW90ZSBvciBsb2NhbFxuICAgICAqL1xuICAgIGFkZFBsYXllcihwLCBpc0xvY2FsKSB7XG4gICAgICAgIGxldCB5UG9zID0gMi4yO1xuXG4gICAgICAgIGlmKHRoaXMuX3BsYXllcnMuc2l6ZSkge1xuICAgICAgICAgICAgeVBvcyArPSAxLjEqdGhpcy5fcGxheWVycy5zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgcC55UG9zID0geVBvcztcblxuICAgICAgICB0aGlzLl9wbGF5ZXJzLnNldChwLmlkLCBwKTtcbiAgICAgICAgaWYoaXNMb2NhbCkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxQbGF5ZXIgPSBwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChcImFkZC1wbGF5ZXJcIiwgcCk7XG4gICAgfVxuXG4gICAgaGFuZGxlTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIk1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBkaXNwYXRjaGVyXCIpO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIC8vIEFzc2lnbiBldmVudCBuYW1lIGFuZCBkYXRhXG4gICAgICAgIGxldCBldmVudE5hbWUgPSBtZXNzYWdlLmV2ZW50O1xuICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBpZihldmVudE5hbWUgPT0gXCJnYW1lLXN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJtYWluIG1lbnVcIjtcbiAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJnYW1lLXN0YXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gZGF0YTtcbiAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJhZGQtcGxheWVyXCIpIHtcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcihkYXRhLm5hbWUsIG1lc3NhZ2UuZnJvbSwgZGF0YS5qb2IpO1xuICAgICAgICAgICAgdGhpcy5hZGRQbGF5ZXIocCwgZGF0YS5pc0xvY2FsKTtcbiAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwbGF5ZXItcmVtb3ZlXCIpIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgcGVlcnMgcGxheWVyIGZyb20gdGhlIGdhbWVcbiAgICAgICAgICAgIC8vIEdldCBhbmQgdGhlbiBkZWxldGUgcGxheWVyXG4gICAgICAgICAgICBsZXQgcGxheWVyVG9SZW1vdmUgPSB0aGlzLl9wbGF5ZXJzLmdldChkYXRhKTtcbiAgICAgICAgICAgIGxldCBwbGF5ZXJSZW1vdmVkICA9IHRoaXMuX3BsYXllcnMuZGVsZXRlKHBsYXllclRvUmVtb3ZlLmlkKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBwbGF5ZXIgd2FzIHRoZXJlXG4gICAgICAgICAgICBpZihwbGF5ZXJSZW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlLXBsYXllclwiLCBwbGF5ZXJUb1JlbW92ZSk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PSBcImxvYmJ5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYobWVzc2FnZS5ldmVudCA9PSBcInBsYXllci1qb2JcIikge1xuICAgICAgICAgICAgLy8gQWx0ZXIgcGxheWVyJ3Mgam9iXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5mcm9tKTtcbiAgICAgICAgICAgIHBsYXllci5qb2IgPSBkYXRhLmpvYjtcbiAgICAgICAgfSBlbHNlIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwbGF5ZXItc3RhdGVcIikge1xuICAgICAgICAgICAgLy8gQWx0ZXIgcGxheWVyJ3Mgc3RhdGVcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9wbGF5ZXJzLmdldChtZXNzYWdlLmZyb20pO1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IGRhdGEuc3RhdGU7XG5cbiAgICAgICAgICAgIC8vIFByb2dyZXNzIEdhbWUgbG9naWMgYWNjb3JpZG5nIHRvIHBsYXllciBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllclN0YXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZihtZXNzYWdlLmV2ZW50ID09IFwicGxheWVyLWFjdGlvblwiKSB7XG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5mcm9tKTtcblxuICAgICAgICAgICAgbGV0IGFjdGlvbiA9IEltbXV0YWJsZS5NYXAoZGF0YSk7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudEFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllckFjdGlvbihwbGF5ZXIpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJTZWxlY3QgSm9iXCIsXG4gICAgICAgICAgICBcIlJlYWR5XCIsXG4gICAgICAgICAgICBcIkxlYXZlXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcIkhvc3QgR2FtZVwiLFxuICAgICAgICAgICAgXCJKb2luIEdhbWVcIlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV1VSTSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAgICd3dXJtJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgdHlwZSkge1xuICAgICAgICBzdXBlcihbXSk7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3M7XG4gICAgICAgIHRoaXMueXBvcyA9IHlQb3M7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5oZWFsdGggPSA1O1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgICAgIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uLy4uL0NvbmZpZyc7XG5cbmxldCBKT0JTID0gbmV3IE1hcCgpO1xuXG5KT0JTLnNldChcImNsYWlydm95YW50XCIsIHtcbiAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50JyxcbiAgICAnaGVhbHRoJzogNjAsXG4gICAgJ21hbmEnOiA0MCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcImhlcmJhbGlzdFwiLCB7XG4gICAgJ25hbWUnOiAnaGVyYmFsaXN0JyxcbiAgICAnaGVhbHRoJzogNDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDgwLFxuICAgICdwb3NpdGlvbic6ICdiYWNrJ1xufSk7XG5cbkpPQlMuc2V0KFwidmlsbGFpblwiLCB7XG4gICAgJ25hbWUnOiAndmlsbGFpbicsXG4gICAgJ2hlYWx0aCc6IDgwLFxuICAgICdtYW5hJzogMjAsXG4gICAgJ2Nvb2xkb3duJzogNDAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwia25pZ2h0XCIsIHtcbiAgICAnbmFtZSc6ICdrbmlnaHQnLFxuICAgICdoZWFsdGgnOiAxMDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDEwMCxcbiAgICAncG9zaXRpb24nOiAnZnJvbnQnXG59KTtcblxuSk9CUy5zZXQoXCJuZWNyb21hbmNlclwiLCB7XG4gICAgJ25hbWUnOiAnbmVjcm9tYW5jZXInLFxuICAgICdoZWFsdGgnOiA0MCxcbiAgICAnbWFuYSc6IDEyMCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcIm5pbmphXCIsIHtcbiAgICAnbmFtZSc6ICduaW5qYScsXG4gICAgJ2hlYWx0aCc6IDYwLFxuICAgICdtYW5hJzogMzAsXG4gICAgJ2Nvb2xkb3duJzogMzAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbmNsYXNzIFBsYXllckFjdGlvbiB7XG59XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCwgam9iKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcInJlc3RpbmdcIixcbiAgICAgICAgICAgIFwid2Fsa2luZ1wiLFxuICAgICAgICAgICAgXCJhdHRhY2tpbmdcIlxuICAgICAgICBdKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcblxuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBJbW11dGFibGUuTWFwKHtcbiAgICAgICAgICAgIFwiYWN0aW9uXCI6IFwidGhpbmtpbmdcIlxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbmV4dEFjdGlvbiAgICA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBTdG9yZSB0aGUgYWN0aW9uIGN5Y2xlXG4gICAgICAgIHRoaXMuX2FjdGlvbkN5Y2xlICA9IDA7XG5cbiAgICAgICAgdGhpcy5faXNCdXN5ID0gZmFsc2U7XG5cblxuICAgICAgICBpZihqb2IpIHt0aGlzLmpvYiA9IGpvYjt9XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgaWYoYWN0aW9uLmdldChcImN5Y2xlXCIpID4gdGhpcy5hY3Rpb25DeWNsZSkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dEFjdGlvbiA9IGFjdGlvbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3Rpb24gPSBhY3Rpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgam9iKCkgICAgICAgICAgIHtyZXR1cm4gdGhpcy5fam9iO31cbiAgICBnZXQgY3VycmVudEFjdGlvbigpIHtyZXR1cm4gdGhpcy5fY3VycmVudEFjdGlvbn1cbiAgICBnZXQgbmV4dEFjdGlvbigpICAgIHtyZXR1cm4gdGhpcy5fbmV4dEFjdGlvbn1cbiAgICBnZXQgY3VycmVudFN0YXRlKCkgIHtyZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlO31cbiAgICBnZXQgbmFtZSgpICAgICAgICAgIHtyZXR1cm4gdGhpcy5fbmFtZTt9XG4gICAgZ2V0IGlkKCkgICAgICAgICAgICB7cmV0dXJuIHRoaXMuX2lkO31cbiAgICBnZXQgcmVhZHlUb0F0dGFjaygpIHtyZXR1cm4gdGhpcy5fcmVhZHlUb0F0dGFjazt9XG4gICAgZ2V0IGlzQnVzeSgpICAgICAgICB7cmV0dXJuIHRoaXMuX2lzQnVzeX1cbiAgICBnZXQgYWN0aW9uQ3ljbGUoKSAgIHtyZXR1cm4gdGhpcy5fYWN0aW9uQ3ljbGV9XG5cbiAgICBzdGF0aWMgZ2V0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5KT0JTLnZhbHVlcygpXTtcbiAgICB9XG5cbiAgICBzZXQgam9iKGpvYk5hbWUpIHtcbiAgICAgICAgdGhpcy5fam9iID0gSk9CUy5nZXQoam9iTmFtZSk7XG5cbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMuX2pvYi5oZWFsdGg7XG5cbiAgICAgICAgdGhpcy5tYXhNYW5hID0gdGhpcy5fam9iLm1hbmE7XG4gICAgICAgIHRoaXMubWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuXG4gICAgICAgIHRoaXMubWF4Q29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG5cbiAgICAgICAgdGhpcy54UG9zID0gQ29uZmlnLlRJTEVfWCAtIDM7XG4gICAgICAgIGlmKHRoaXMuX2pvYi5wb3NpdGlvbiA9PT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgIHRoaXMueFBvcyArPSAuNTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0QWN0aW9uKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gID0gdGhpcy5uZXh0QWN0aW9uIHx8IEltbXV0YWJsZS5NYXAoe1xuICAgICAgICAgICAgXCJhY3Rpb25cIjogXCJ0aGlua2luZ1wiLFxuICAgICAgICAgICAgXCJjeWNsZVwiOiB0aGlzLmFjdGlvbkN5Y2xlXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGJlZ2luQ29tYmF0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSAgID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuY29vbGRvd24gICAgICAgPSAwO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgd2Fsa0ZvcndhcmQoY2IpIHtcbiAgICAgICAgbGV0IGlkbGVYUG9zID0gdGhpcy54UG9zO1xuICAgICAgICBsZXQgZGVzdFhQb3MgPSB0aGlzLnhQb3MgLSAxO1xuXG4gICAgICAgIGxldCBzdGVwID0gLjEwO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJ3YWxraW5nXCI7XG5cbiAgICAgICAgbGV0IHdhbGtJbnRlcnZhbCA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgIHRoaXMueFBvcyAtPSBzdGVwO1xuICAgICAgICAgICBpZih0aGlzLnhQb3MgPD0gZGVzdFhQb3MpIHtcbiAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2Fsa0ludGVydmFsKTtcbiAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgICAgICAgICBpZihjYikgY2IoKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwL0NvbmZpZy5GUFMpO1xuICAgIH1cblxuICAgIGF0dGFjayhjYikge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiYXR0YWNraW5nXCI7XG5cbiAgICAgICAgbGV0IGF0dGFja1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICAgICAgaWYoY2IpIGNiKCk7XG4gICAgICAgIH0sIDI1MCk7XG4gICAgfVxuXG4gICAgd2Fsa0JhY2soY2IpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRYUG9zID0gdGhpcy54UG9zO1xuICAgICAgICBsZXQgZGVzdFhQb3MgPSB0aGlzLnhQb3MgKyAxO1xuXG4gICAgICAgIGxldCBzdGVwID0gLjEwO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJ3YWxraW5nXCI7XG5cbiAgICAgICAgbGV0IHdhbGtJbnRlcnZhbCA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgIHRoaXMueFBvcyArPSBzdGVwO1xuICAgICAgICAgICBpZih0aGlzLnhQb3MgPj0gZGVzdFhQb3MpIHtcbiAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwod2Fsa0ludGVydmFsKTtcbiAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgICAgICAgICBpZihjYikgY2IoKTtcbiAgICAgICAgICAgfVxuICAgICAgICB9LCAxMDAwL0NvbmZpZy5GUFMpO1xuICAgIH1cblxuXG4gICAgZW5kQ29tYmF0KCkge1xuICAgICAgICB0aGlzLm5leHRBY3Rpb25DeWNsZSgpO1xuXG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlICAgPSBcImlkbGVcIjtcbiAgICAgICAgdGhpcy5jb29sZG93biAgICAgICA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5VG9BdHRhY2sgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLm9uQ29vbGRvd24gPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYodGhpcy5fY29vbGRvd25JbnRlcnZhbCkgY2xlYXJJbnRlcnZhbCh0aGlzLl9jb29sZG93bkludGVydmFsKTtcbiAgICB9XG5cbiAgICBjaGFyZ2VDb29sZG93bihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gMDtcblxuICAgICAgICBpZih0aGlzLl9jb29sZG93bkludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpO1xuXG4gICAgICAgIHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5jb29sZG93bisrO1xuICAgICAgICAgICAgaWYodGhpcy5jb29sZG93biA+PSB0aGlzLm1heENvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9jb29sZG93bkludGVydmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm9uQ29vbGRvd24pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db29sZG93bih0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNjApO1xuICAgIH1cblxuICAgIG5leHRBY3Rpb25DeWNsZSgpIHtcbiAgICAgICAgdGhpcy5fcmVhZHlUb0F0dGFjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9hY3Rpb25DeWNsZSsrO1xuICAgICAgICB0aGlzLnJlc2V0QWN0aW9uKCk7XG4gICAgICAgIHRoaXMuY2hhcmdlQ29vbGRvd24oKTtcbiAgICB9XG5cbiAgICByZXNldEFjdGlvbkN5Y2xlKCkge1xuICAgICAgICB0aGlzLl9hY3Rpb25DeWNsZSA9IDA7XG4gICAgICAgIHRoaXMuX25leHRBY3Rpb24gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMucmVzZXRBY3Rpb24oKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJztcbmltcG9ydCBMb2dnZXIgICAgZnJvbSAnLi4vLi4vc2VydmljZXMvTG9nZ2VyJztcblxuY2xhc3MgUm9vbSBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgY29uc3RydWN0b3IodHlwZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgIFwiaWRsZVwiLFxuICAgICAgICAgICAgXCJtb3ZpbmdcIixcbiAgICAgICAgICAgIFwiYmF0dGxlXCJcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fdHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYmF0dGxlT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiYXR0YWNrXCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJkZWZlbmRcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3Jvb21PcHRpb25zID0gW1xuICAgICAgICAgICAgXCJyZWFkeVwiLFxuICAgICAgICAgICAgXCJhYmlsaXR5XCIsXG4gICAgICAgICAgICBcIml0ZW1cIixcbiAgICAgICAgICAgIFwibWFuYWdlXCJcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IHRoaXMuX3Jvb21PcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cblxuICAgIHNldEJhdHRsZU9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fYmF0dGxlT3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXRJZGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9yb29tT3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBpZCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInVwXCIsICgpID0+IHRoaXMuZW1pdChcInVwXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwia1wiLCAoKSA9PiB0aGlzLmVtaXQoXCJ1cFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZG93blwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwialwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsZWZ0XCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJoXCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInJpZ2h0XCIsICgpID0+IHRoaXMuZW1pdChcInJpZ2h0XCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJyaWdodFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZW50ZXJcIiwgKCk9PiB0aGlzLmVtaXQoXCJjb25maXJtXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJgXCIsICgpPT4gdGhpcy5lbWl0KFwiZGVidWdcIikpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV0d29yayhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjRkRGNDg1OyBjb2xvcjogIzAwMDsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi9Mb2dnZXInO1xuXG5sZXQgZXZlbnRzID0gW1xuICAgIFwicGVlci1jb25uZWN0XCIsXG4gICAgXCJwbGF5ZXItcmVhZHlcIixcbiAgICBcInBsYXllci1qb2JcIixcbiAgICBcInBsYXllci1zdGF0ZVwiLFxuICAgIFwicGxheWVyLWFjdGlvblwiLFxuICAgIFwib3B0aW9uLXNlbGVjdFwiLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY3JlYXRlTWVzc2FnZShldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgaWYoZXZlbnRzLmluZGV4T2YoZXZlbnROYW1lKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gW2V2ZW50cy5pbmRleE9mKGV2ZW50TmFtZSksIGRhdGFdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVjb2RlTWVzc2FnZShpZCwgbWVzc2FnZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJmcm9tXCI6IGlkLFxuICAgICAgICAgICAgXCJldmVudFwiOiBldmVudHNbbWVzc2FnZVswXV0sXG4gICAgICAgICAgICBcImRhdGFcIjogbWVzc2FnZVsxXVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobmFtZSwgaG9zdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgaWYoaG9zdClcbiAgICAgICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pZCA9IFwiaG9zdFwiO1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcGVlciBjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX3BlZXIgPSBuZXcgUGVlcih0aGlzLl9pZCwge1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdvcGVuJywgKGlkKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5uZXR3b3JrKGBQZWVyIENvbm5lY3Rpb24gY3JlYXRlZCwgUGVlciBJRCBpcyAke2lkfWApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBrbm93IGFib3V0IGEgcGVlciB0aGVuIGNvbm5lY3RcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9ob3N0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHRoaXMuX2hvc3QsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVsaWFibGVcIjogdHJ1ZVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIGEgcGVlciBjb25uZWN0cyBoYW5kbGUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdjb25uZWN0aW9uJywgKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGFsbG93IG1vcmUgdGhhbiA0IHBsYXllcnNcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuc2l6ZSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdvcGVuJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5uZXR3b3JrKFwiUGVlciBoYXMgY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwZWVyID0gdGhpcy5hZGRQZWVyKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFBlZXIoY29ubmVjdGlvbikge1xuICAgICAgICBsZXQgcGVlciA9IHtcbiAgICAgICAgICAgIFwiY29ubmVjdGlvblwiOiBjb25uZWN0aW9uLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wZWVycy5zZXQoY29ubmVjdGlvbi5wZWVyLCBwZWVyKTtcblxuICAgICAgICBjb25uZWN0aW9uLm9uKCdkYXRhJywgKGRhdGEpPT57XG4gICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHRoaXMuZGVjb2RlTWVzc2FnZShjb25uZWN0aW9uLnBlZXIsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25uZWN0aW9uLm9uKCdjbG9zZScsICgpPT57XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBlZXIocGVlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwZWVyO1xuICAgIH1cblxuICAgIGNvbm5lY3RUb1BlZXIocGVlcikge1xuXG4gICAgICAgIGxldCBkYXRhID0ge1xuICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuX25hbWUsXG4gICAgICAgICAgICBcImpvYlwiOiB0aGlzLl9zZWxlY3RlZEpvYiB8fCB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1aWxkIGxpc3Qgb2YgcGVlcnNcbiAgICAgICAgbGV0IHBlZXJzID0gW107XG4gICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy5rZXlzKCkpIHtcbiAgICAgICAgICAgIHBlZXJzLnB1c2gocGVlcik7XG4gICAgICAgIH1cbiAgICAgICAgZGF0YS5wZWVycyA9IHBlZXJzO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhIG1lc3NhZ2VcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmNyZWF0ZU1lc3NhZ2UoXCJwZWVyLWNvbm5lY3RcIiwgZGF0YSk7XG5cbiAgICAgICAgTG9nZ2VyLm5ldHdvcmsoYFNlbmRpbmcgcGVlci1jb25uZWN0IG1lc3NhZ2UgdG8gcGVlciB3aXRoIGlkICR7cGVlci5pZH1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuaGFzQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVQZWVyKHBlZXIpIHtcbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXJlbW92ZVwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHBlZXIuY29ubmVjdGlvbi5wZWVyXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9wZWVycy5kZWxldGUocGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX3BlZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgbWVzc2FnZSB0byBhbGwgcGVlcnNcbiAgICAgKi9cbiAgICBfc2VuZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIubmV0d29yayhcIlNlbmQgbWVzc2FnZSB0byBwZWVyc1wiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgaWYodGhpcy5fcGVlcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlIGluY29taW5nIG1lc3NhZ2VcbiAgICAgKi9cbiAgICBoYW5kbGVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nZ2VyLm5ldHdvcmsoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gR3JhYiBkYXRhIGZyb20gbWVzc2FnZVxuICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09PSBcInBlZXItY29ubmVjdFwiKSB7XG4gICAgICAgICAgICAvLyBTZWUgaWYgdGhpcyBwZWVyIGtub3dzIGFib3V0IGFueSBvdGhlciBwZWVycyBhbmQgYWRkIGlmIHdlIGRvbid0IGtub3cgdGhlbVxuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIGRhdGEucGVlcnMpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fcGVlcnMuZ2V0KHBlZXIpICYmIHBlZXIgIT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5uZXR3b3JrKGBBZGRpbmcgUGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdChwZWVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlbGlhYmxlXCI6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VlIGlmIHdlIGhhdmUgYWxyZWFkeSBjb25uZWN0ZWQgdG8gdGhpcyBwZWVyXG4gICAgICAgICAgICBpZih0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKSAmJiAhdGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkuaGFzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVzc2FnZS5ldmVudCA9IFwiYWRkLXBsYXllclwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBicm9hZGNhc3RNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PT0gXCJwbGF5ZXItam9iXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkSm9iID0gbWVzc2FnZS5kYXRhLmpvYjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZSh0aGlzLmNyZWF0ZU1lc3NhZ2UobWVzc2FnZS5ldmVudCwgbWVzc2FnZS5kYXRhKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL0xvZ2dlci5qcyc7XG5cbmxldCByZXNvdXJjZURpciA9ICcuL2Rpc3QvcmVzb3VyY2VzLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkSW1hZ2UocmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKGltZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gcmVzb3VyY2VEaXIgKyAnaW1hZ2VzLycgKyByZXNvdXJjZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJORyBDUkVBVEVcIik7XG4gICAgICAgIHRoaXMuX3JuZyA9IG5ldyBSTkcoc2VlZCk7XG4gICAgICAgIHdpbmRvdy5ybmcgPSB0aGlzLl9ybmc7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZy5yYW5kb20oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc291bmRQYXRoID0gXCIuL2Rpc3QvcmVzb3VyY2VzL3NvdW5kcy9cIjtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCBzb3VuZHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1tb3ZlXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJtZW51LW1vdmUubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1zZWxlY3RcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcIm1lbnUtc2VsZWN0Lm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvb2xkb3duLXJlYWR5XCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJjb29sZG93bi1yZWFkeS5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb21iYXQtdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcInFydHJub3RlcW9tYmF0LmdiLm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImR1bmdlb24tdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcImR1bmdlb25kZWxheS5nYi5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9zb3VuZHMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgZm9yKGxldCBzb3VuZCBvZiBzb3VuZHMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgIC8vIExvYWQgdGhlIHNvdW5kXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRzLnNldChzb3VuZC5uYW1lLCBuZXcgSG93bCh7XG4gICAgICAgICAgICAgICAgICAgIHVybHM6IFtzb3VuZC51cmxdLFxuICAgICAgICAgICAgICAgICAgICBvbmxvYWQ6IHJlcyxcbiAgICAgICAgICAgICAgICAgICAgb25sb2FkZXJyb3I6IHJlalxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcGxheShzb3VuZE5hbWUsIGxvb3AsIHZvbHVtZSkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykgcmV0dXJuO1xuICAgICAgICBsZXQgc291bmQgPSB0aGlzLl9zb3VuZHMuZ2V0KHNvdW5kTmFtZSk7XG4gICAgICAgIHNvdW5kLmxvb3AobG9vcCB8fCBmYWxzZSk7XG4gICAgICAgIHNvdW5kLnZvbHVtZSh2b2x1bWUgfHwgLjUpO1xuICAgICAgICBzb3VuZC5wbGF5KCk7XG4gICAgfVxuXG4gICAgc3RvcChzb3VuZE5hbWUpIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHJldHVybjtcbiAgICAgICAgbGV0IHNvdW5kID0gdGhpcy5fc291bmRzLmdldChzb3VuZE5hbWUpO1xuICAgICAgICBzb3VuZC5zdG9wKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBsaW1pdGxvb3AoZm4sIGZwcykge1xuICAgICAgICAvLyBVc2UgdmFyIHRoZW4gPSBEYXRlLm5vdygpOyBpZiB5b3VcbiAgICAgICAgLy8gZG9uJ3QgY2FyZSBhYm91dCB0YXJnZXR0aW5nIDwgSUU5XG4gICAgICAgIHZhciB0aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gY3VzdG9tIGZwcywgb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIDYwXG4gICAgICAgIGZwcyA9IGZwcyB8fCA2MDtcbiAgICAgICAgdmFyIGludGVydmFsID0gMTAwMCAvIGZwcztcblxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodGltZSl7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cbiAgICAgICAgICAgIC8vIGFnYWluLCBEYXRlLm5vdygpIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPiBpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lXG4gICAgICAgICAgICAgICAgLy8gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpIGlzIGFuIGltcHJvdmVtZW50IG92ZXIganVzdCBcbiAgICAgICAgICAgICAgICAvLyB1c2luZyB0aGVuID0gbm93LCB3aGljaCBjYW4gZW5kIHVwIGxvd2VyaW5nIG92ZXJhbGwgZnBzXG4gICAgICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChkZWx0YSAlIGludGVydmFsKTtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIGZuXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgwKSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhc3BlY3RIZWlnaHRDYWxjKHcyKSB7XG4gICAgICAgIGxldCB3MSA9IDE5MjA7XG4gICAgICAgIGxldCBoMSA9IDEwODA7XG4gICAgICAgIHJldHVybiBoMSp3Mi93MTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VRdWVyeShzZWFyY2gpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBzZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XG5cbiAgICAgICAgdmFyIGFyZ3NQYXJzZWQgPSB7fTtcblxuICAgICAgICB2YXIgaSwgYXJnLCBrdnAsIGtleSwgdmFsdWU7XG5cbiAgICAgICAgZm9yIChpPTA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgICAgIGlmICgtMSA9PT0gYXJnLmluZGV4T2YoJz0nKSkge1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtkZWNvZGVVUklDb21wb25lbnQoYXJnKS50cmltKCldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAga3ZwID0gYXJnLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzBdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMV0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NQYXJzZWQ7XG4gICAgfVxuXG4gICAgLy8gR29vZGVub3VnaCBVVUlEP1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA3MjY5MDkvcmFuZG9tLWFscGhhLW51bWVyaWMtc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICByYW5kb21TdHJpbmcobGVuZ3RoLCBjaGFycykge1xuICAgICAgICBpZighY2hhcnMpIHtcbiAgICAgICAgICAgIGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGg7IGkgPiAwOyAtLWkpIHJlc3VsdCArPSBjaGFyc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoY2hhcnMubGVuZ3RoIC0gMSkpXTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG4vLyBJbXBvcnQgU2VydmljZXNcbmltcG9ydCBJbnB1dFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IFNvdW5kU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9Tb3VuZFNlcnZpY2UnO1xuXG4vLyBJbXBvcnQgdmlld3NcbmltcG9ydCBQbGF5ZXJWaWV3ICAgZnJvbSAnLi9QbGF5ZXJWaWV3JztcbmltcG9ydCBFbmVteVZpZXcgICAgZnJvbSAnLi9FbmVteVZpZXcnO1xuaW1wb3J0IFJvb21WaWV3ICAgICBmcm9tICcuL1Jvb21WaWV3JztcbmltcG9ydCBNYWluTWVudVZpZXcgZnJvbSAnLi9NYWluTWVudVZpZXcnO1xuaW1wb3J0IExvYmJ5VmlldyAgICBmcm9tICcuL0xvYmJ5Vmlldyc7XG5pbXBvcnQgVWlWaWV3ICAgICAgIGZyb20gJy4vVWlWaWV3JztcbmltcG9ydCBEZWJ1Z1ZpZXcgICAgZnJvbSAnLi9EZWJ1Z1ZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcblxuICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoKTtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSBIYW5kbGVyXG4gICAgICogQHRvZG86IGRvZXMgdGhpcyBiZWxvbmcgaGVyZT9cbiAgICAgKi9cbiAgICByZXNpemUoKSB7XG4gICAgICAgIENvbmZpZy5jYWxjdWxhdGUoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaW5pdChnYW1lKSB7XG4gICAgICAgIHRoaXMuX2dhbWUgPSBnYW1lO1xuXG4gICAgICAgIHRoaXMuX2RlYnVnVmlldyA9IG5ldyBEZWJ1Z1ZpZXcoZ2FtZSk7XG5cbiAgICAgICAgdGhpcy5faW5wdXRTZXJ2aWNlID0gbmV3IElucHV0U2VydmljZSgpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBBdHRhY2ggcmVzaXplIGV2ZW50XG4gICAgICAgIC8vd2luZG93LnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG9HYW1lRXZlbnRzKHRoaXMuX2dhbWUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVySW5wdXRIYW5kbGVycyh0aGlzLl9pbnB1dFNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9jb2RldGhlb3J5LmluL2NvbnRyb2xsaW5nLXRoZS1mcmFtZS1yYXRlLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgICAgICAvLyBJZiB0aGUgZnBzIGludGVydmFsIGlzIGNvcnJlY3RcbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRpbWUgc2luY2UgbGFzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIFNldCB1cCBSZW5kZXJpbmdcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdGhpcy5fZnJhbWUgfHwgMTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gKHRoaXMuX2ZyYW1lJUNvbmZpZy5GUFMpID8gdGhpcy5fZnJhbWUgOiAxO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgZ2FtZVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5fZnJhbWUpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbmV4dCByZW5kZXIgY3ljbGVcbiAgICAgICAgICAgIGxldCB0aW1lX2VsID0gKHRoaXMudGhlbiAtIHRoaXMuZmlyc3QpLzEwMDA7XG4gICAgICAgICAgICArK3RoaXMuY291bnRlcjtcbiAgICAgICAgICAgIHRoaXMuX2ZwcyA9IHBhcnNlSW50KHRoaXMuY291bnRlci90aW1lX2VsKTtcblxuICAgICAgICAgICAgLy8gSW5jcmVtZW50IEZyYW1lXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGZyYW1lKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCAgICAgICAgICAgICAgPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ICAgICAgICAgICAgID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCgwLCAwLCBDb25maWcuQ0FOVkFTX1dJRFRILCBDb25maWcuQ0FOVkFTX0hFSUdIVCk7XG5cbiAgICAgICAgZm9yKGxldCB2aWV3IG9mIHRoaXMuX3ZpZXdzKSAge1xuICAgICAgICAgICAgdmlldy5yZW5kZXIodGhpcy5fY3R4LCBmcmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9kZWJ1Z1ZpZXcucmVuZGVyKHRoaXMuX2N0eCwgZnJhbWUsIHRoaXMuX2Zwcyk7XG4gICAgfVxuXG4gICAgZ2V0TWFpbk1lbnVWaWV3cygpIHtcbiAgICAgICAgbGV0IHZpZXdzID0gW107XG5cbiAgICAgICAgaWYodGhpcy5fbWFpbk1lbnVWaWV3KSB7XG4gICAgICAgICAgICB2aWV3cy5wdXNoKHRoaXMuX21haW5NZW51Vmlldyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmlld3M7XG4gICAgfVxuXG4gICAgZ2V0UGxheWluZ1ZpZXdzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAuLi50aGlzLl9wbGF5ZXJWaWV3cy52YWx1ZXMoKSxcbiAgICAgICAgICAgIHRoaXMuX3VpVmlld1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIHN0YXJ0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLl9yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBnYW1lIGV2ZW50cyBzbyB3ZSBjYW4gYWRqdXN0IHJlbmRlcmVyXG4gICAgICovXG4gICAgbGlzdGVuVG9HYW1lRXZlbnRzKGdhbWUpIHtcbiAgICAgICAgZ2FtZS5vbihcImdhbWUtc3RhdGVcIiwgKG1lc3NhZ2UpPT4ge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVmlldyBHYW1lIFN0YXRlIEV2ZW50XCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIGlmKG1lc3NhZ2UgPT0gXCJtYWluIG1lbnVcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZW4ndCByZW5kZXJpbmcgdGhlbiBzdGFydFxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFJlbmRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbWFpbk1lbnVWaWV3ID0gbmV3IE1haW5NZW51VmlldyhnYW1lLm1haW5NZW51LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBtYWluTWVudVZpZXcuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3ID0gbWFpbk1lbnVWaWV3O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoW3RoaXMuX21haW5NZW51Vmlld10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlID09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgICAgIGxldCBsb2JieVZpZXcgPSBuZXcgTG9iYnlWaWV3KGdhbWUubG9iYnksIGdhbWUucGxheWVycywgdGhpcyk7XG4gICAgICAgICAgICAgICAgbG9iYnlWaWV3LmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5VmlldyA9IGxvYmJ5VmlldztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KFt0aGlzLl9sb2JieVZpZXddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihtZXNzYWdlID09IFwicGxheWluZ1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHJvb20gdmlld1xuICAgICAgICAgICAgICAgIGxldCByb29tVmlldyA9IG5ldyBSb29tVmlldyhnYW1lLnJvb20pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3ID0gcm9vbVZpZXc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHJvb21WaWV3LmxvYWRSZXNvdXJjZXMoKVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmlld3MgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbGwgb2Ygb3VyIHBsYXllciB2aWV3c1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIGdhbWUucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyVmlldyA9IG5ldyBQbGF5ZXJWaWV3KHBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocGxheWVyVmlldy5sb2FkUmVzb3VyY2VzKCkpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3cy5wdXNoKHBsYXllclZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cy5zZXQocGxheWVyLmlkLCBwbGF5ZXJWaWV3KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdWlWaWV3ID0gbmV3IFVpVmlldyhnYW1lLnVpLCBnYW1lLnBsYXllcnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldyA9IHVpVmlldztcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHVpVmlldy5sb2FkUmVzb3VyY2VzKCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gTG9hZCBzb3VuZHNcbiAgICAgICAgICAgICAgICBsZXQgc291bmRTZXJ2aWNlID0gbmV3IFNvdW5kU2VydmljZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZSA9IHNvdW5kU2VydmljZTtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNvdW5kU2VydmljZS5sb2FkUmVzb3VyY2VzKCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgYWxsIHJlbmRlcmVycyBhcmUgcmVhZHkgbGV0IHRoZSBkaXNwYXRjaGVyIGtub3dcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udmlld3MsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXdcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJkdW5nZW9uLXRoZW1lXCIsIHRydWUsIC4zKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcImFkZC1wbGF5ZXJcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKGdhbWUuY3VycmVudFN0YXRlID09PSBcImxvYnlcIilcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcuX3JlYWR5ID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJyZW1vdmUtcGxheWVyXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJWSUVXIFJFTU9WRSBQTEFZRVJcIik7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcocGxheWVyLmlkKTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3BsYXllclZpZXdzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyVmlld3MuZGVsZXRlKHBsYXllci5pZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSB0aGlzLmdldFBsYXlpbmdWaWV3cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwiYWRkLWVuZW15XCIsIChlbmVteSk9PntcbiAgICAgICAgICAgIGxldCBlbmVteVZpZXcgPSBuZXcgRW5lbXlWaWV3KGVuZW15KTtcbiAgICAgICAgICAgIGVuZW15Vmlldy5sb2FkUmVzb3VyY2VzKCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2VuZW15Vmlld3MpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlWaWV3cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZW15VmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnRoaXMuX2VuZW15Vmlld3NcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVteVZpZXdzID0gW2VuZW15Vmlld107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJzdGFydC1iYXR0bGVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5zdG9wKFwiZHVuZ2Vvbi10aGVtZVwiKTtcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwiY29tYmF0LXRoZW1lXCIsIHRydWUsIC4zKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gW1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX3ZpZXdzLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2VuZW15Vmlld3NcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJwbGF5ZXItY29vbGRvd25cIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKHBsYXllci5pc0xvY2FsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJjb29sZG93bi1yZWFkeVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInBsYXllci1hdHRhY2tcIiwgKHBsYXllcik9PntcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcImVuZC1iYXR0bGVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5zdG9wKFwiY29tYmF0LXRoZW1lXCIpO1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJkdW5nZW9uLXRoZW1lXCIsIHRydWUsIC4zKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gW1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3LFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuX3BsYXllclZpZXdzLnZhbHVlcygpLFxuICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlld1xuICAgICAgICAgICAgXTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgaW5wdXQgdG8gYWx0ZXIgdmlldyBhbmQgc2VlIGlmIHdlIG5lZWQgdG8gc2VuZCBlbnZlbnRzXG4gICAgICovXG4gICAgcmVnaXN0ZXJJbnB1dEhhbmRsZXJzKGlucHV0KSB7XG4gICAgICAgIC8vIFVwIGlucHV0XG4gICAgICAgIGlucHV0Lm9uKFwidXBcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFpbiBtZW51XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51Vmlldy51cCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEb3duIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiZG93blwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMZWZ0IElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwibGVmdFwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb2JieVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcubGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcubGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJpZ2h0IElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwicmlnaHRcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3LnJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5yaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbmZpcm0gSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJjb25maXJtXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcuY29uZmlybSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1zZWxlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCYWNrIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiYmFja1wiLCAoKT0+e1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlucHV0Lm9uKFwiZGVidWdcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RlYnVnVmlldy50b2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLl9zaG93ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuX3Nob3cgPSAhdGhpcy5fc2hvdztcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSwgZnBzKSB7XG4gICAgICAgIGlmKHRoaXMuX3Nob3cpIHtcbiAgICAgICAgICAgIC8vIFNob3cgRlBTXG4gICAgICAgICAgICBsZXQgZm9udFNpemUgICAgICAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIGxldCBsaW5lID0gMjA7XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChmcmFtZSArIFwiL1wiICsgQ29uZmlnLkZQUyArIFwiIFwiICsgZnBzICsgXCJmcHNcIiwgMjAsIGxpbmUpO1xuXG4gICAgICAgICAgICBsaW5lICs9IGZvbnRTaXplO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoXCJQbGF5ZXJzOlwiLCAyMCwgbGluZSk7XG5cbiAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIGdhbWUucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIGxpbmUgKz0gZm9udFNpemU7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHBsYXllci5uYW1lLCA0MCwgbGluZSk7XG4gICAgICAgICAgICAgICAgbGluZSArPSBmb250U2l6ZTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJBY3Rpb24gQ3ljbGU6IFwiICsgcGxheWVyLmFjdGlvbkN5Y2xlLCA2MCwgbGluZSk7XG4gICAgICAgICAgICAgICAgbGluZSArPSBmb250U2l6ZTtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJDdXJyZW50IEFjdGlvbjogXCIgKyBwbGF5ZXIuY3VycmVudEFjdGlvbi5nZXQoXCJhY3Rpb25cIiksIDYwLCBsaW5lKTtcbiAgICAgICAgICAgICAgICBsaW5lICs9IGZvbnRTaXplO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIk5leHQgQWN0aW9uOiBcIiArIChwbGF5ZXIubmV4dEFjdGlvbiA/IHBsYXllci5uZXh0QWN0aW9uLmdldChcImFjdGlvblwiKSA6IFwiTk9ORVwiKSwgNjAsIGxpbmUpO1xuICAgICAgICAgICAgICAgIGxpbmUgKz0gZm9udFNpemU7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiQ3VycmVudCBTdGF0ZTogXCIgKyBwbGF5ZXIuY3VycmVudFN0YXRlLCA2MCwgbGluZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGVuZW15KSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5fZW5lbXkgPSBlbmVteTtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic3ByaXRlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNwcml0ZSxcbiAgICAgICAgICAgIHNwcml0ZS53aWR0aC8zKnRoaXMuZnJhbWUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMywgLy8gZFdpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMiwgLy8gZEhlaWdodFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICAxMCwgLy8gWXBvc1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMypDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5pbXBvcnQgUGxheWVyICAgICAgICAgIGZyb20gJy4uL21vZGVscy9vYmplY3RzL1BsYXllcic7XG5cbmxldCBqb2JEaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+U2VsZWN0IEpvYjwvaDM+XG4gICAgICAgIDxsYWJlbD5Kb2I6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgbmFtZT1cImpvYlwiPlxuICAgICAgICA8L3NlbGVjdD48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNvbmZpcm1cIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihsb2JieSwgcGxheWVycywgdmlldykge1xuICAgICAgICBzdXBlcihsb2JieSk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ID0gbG9iYnk7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLl9wbGF5ZXJzID0gcGxheWVycztcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvcGVuSm9iRGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhqb2JEaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG4gICAgICAgIGxldCBjb25maXJtQnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY29uZmlybVwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBqb2JTZWxlY3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdFtuYW1lPVwiam9iXCJdJyk7XG5cbiAgICAgICAgZm9yKGxldCBqb2Igb2YgUGxheWVyLmdldEpvYnMoKSkge1xuICAgICAgICAgICAgbGV0IGpvYk9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICBqb2JPcHRpb24udmFsdWUgPSBqb2IubmFtZTtcbiAgICAgICAgICAgIGpvYk9wdGlvbi5pbm5lckhUTUwgPSBqb2IubmFtZTtcbiAgICAgICAgICAgIGpvYlNlbGVjdC5hcHBlbmRDaGlsZChqb2JPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlldy5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6ICgpPT57XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKGpvYlNlbGVjdC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnBvc3RNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItam9iXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZyb21cIjogdGhpcy5fdmlldy5fZ2FtZS5sb2NhbFBsYXllci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JcIjogam9iU2VsZWN0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgIGxldCB4UG9zID0gMTAwO1xuICAgICAgICBsZXQgeVBvcyA9IDEwMDtcblxuICAgICAgICBjdHguZmlsbFRleHQoXCJOQU1FOlwiLCAxMDAsIHlQb3MpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJKT0I6XCIsIDMwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIlJFQURZOlwiLCA1MDAsIHlQb3MpO1xuICAgICAgICBjdHguc3Ryb2tlUmVjdCg5MCwgMTEwLCA2MDAsIDE4MCk7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMuX3BsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICB5UG9zICs9IDQwO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHBsYXllci5uYW1lLCAxMDAsIHlQb3MpO1xuXG4gICAgICAgICAgICBpZihwbGF5ZXIuam9iKSB7XG4gICAgICAgICAgICAgICAgbGV0IGpvYk5hbWUgPSBwbGF5ZXIuam9iLm5hbWVbMF0udG9VcHBlckNhc2UoKSArIHBsYXllci5qb2IubmFtZS5zbGljZSgxKTs7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGpvYk5hbWUsIDMwMCwgeVBvcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllci5jdXJyZW50U3RhdGUgPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIk5PVCBSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgeFBvcywgMzIwKTtcbiAgICAgICAgICAgIHhQb3MgKz0gMjAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgbGVmdCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgtLTtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgrKztcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiU2VsZWN0IEpvYlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSm9iRGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJMZWF2ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJsZWF2ZS1nYW1lXCJcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiUmVhZHlcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlYWR5ID0gIXRoaXMuX3JlYWR5O1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcucG9zdE1lc3NhZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXN0YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnJvbVwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJzdGF0ZVwiOiB0aGlzLl9yZWFkeSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgIH1cblxuXG5cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyAgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJlc3JvdWNlU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9SZXNvdXJjZVNlcnZpY2UnO1xuXG5sZXQgaG9zdERpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5Ib3N0IE11bHRpcGxheWVyIEdhbWU8L2gzPlxuICAgICAgICA8bGFiZWw+TmFtZTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIj5cbiAgICAgICAgPGxhYmVsPklkIChvcHRpb25hbCk6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCI+PGJyPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJob3N0XCIgZGlzYWJsZWQ+SG9zdDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJjYW5jZWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmxldCBqb2luRGlhbG9nID0gYFxuICAgIDxkaXYgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgICAgPGgzPkpvaW4gTXVsdGlwbGF5ZXIgR2FtZTwvaDM+XG4gICAgICAgIDxsYWJlbD5OYW1lOiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiPlxuICAgICAgICA8bGFiZWw+SG9zdCBJZDogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhvc3RcIj5cbiAgICAgICAgPGxhYmVsPklkIChvcHRpb25hbCk6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCI+PGJyPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJqb2luXCIgZGlzYWJsZWQ+Sm9pbjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJjYW5jZWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IobWFpbk1lbnUsIHZpZXcpIHtcbiAgICAgICAgc3VwZXIobWFpbk1lbnUpO1xuICAgICAgICB0aGlzLl9tYWluTWVudSA9IG1haW5NZW51O1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2RpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeFBvcyA9IDEwMDtcbiAgICAgICAgbGV0IHlQb3MgPSAxMDA7XG5cbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgMTAwLCB5UG9zKTtcbiAgICAgICAgICAgIHlQb3MgKz0gMTAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFpbk1lbnUuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgb3Blbkhvc3REaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGhvc3REaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG4gICAgICAgIGxldCBob3N0QnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiaG9zdFwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBuYW1lSW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGxldCBpZElucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpZFwiXScpO1xuXG4gICAgICAgIHZpZXcuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAgICAgbmFtZUlucHV0Lm9uaW5wdXQgPSAoKT0+e1xuICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGhvc3RCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvc3RCdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwic3RhcnQtbXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZElucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvcGVuSm9pbkRpYWxvZyh2aWV3KSB7XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcbiAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoam9pbkRpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cblxuICAgICAgICBsZXQgam9pbkJ1dHRvbiAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImpvaW5cIl0nKTtcbiAgICAgICAgbGV0IGNhbmNlbEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjYW5jZWxcIl0nKTtcblxuICAgICAgICBsZXQgbmFtZUlucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGxldCBob3N0SW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImhvc3RcIl0nKTtcbiAgICAgICAgbGV0IGlkSW5wdXQgICAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaWRcIl0nKTtcblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIGxldCBjaGVja0lucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICYmIGhvc3RJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICBqb2luQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqb2luQnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBuYW1lSW5wdXQub25pbnB1dCA9IGNoZWNrSW5wdXQuYmluZCh0aGlzKTtcbiAgICAgICAgaG9zdElucHV0Lm9uaW5wdXQgPSBjaGVja0lucHV0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpvaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9kaWFsb2cgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICYmIGhvc3RJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5wb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwic3RhcnQtbXBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhvc3RJZDogaG9zdElucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZElucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgaWYoIXRoaXMuX2RpYWxvZylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID8gMCA6IDE7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJIb3N0IEdhbWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbkhvc3REaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkpvaW5EaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZygpO1xuICAgIH1cblxuXG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICB0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgbG9hZFJlc291cmNlKG5hbWUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzLycgKyByZXNvdXJjZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcmVzb3VyY2UgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChuYW1lLCBpbWcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhbGwgcmVzb3VyY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG9iamVjdFxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZVByb21pc2VzID0gW107XG4gICAgICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VydmljZS5sb2FkSW1hZ2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBQcm9taXNlLmFsbChyZXNvdXJjZVByb21pc2VzKS50aGVuKChpbWFnZXMpPT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KGltYWdlLm5hbWUsIGltYWdlLmltYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIFByb21pc2VcbiAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxubGV0IEpPQl9TUFJJVEVTID0ge1xuICAgIFwiY2xhaXJ2b3lhbnRcIjogXCJjbGFpcnZveWFudC1zaGVldC5wbmdcIixcbiAgICBcImhlcmJhbGlzdFwiOiBcImhlcmJhbGlzdC1zaGVldC5wbmdcIixcbiAgICBcInZpbGxhaW5cIjogXCJ2aWxsYWluMi1zaGVldC5wbmdcIixcbiAgICBcImtuaWdodFwiOiBcImtuaWdodC1zaGVldC5wbmdcIixcbiAgICBcIm5lY3JvbWFuY2VyXCI6IFwibmVjcm9tYW5jZXItc2hlZXQucG5nXCIsXG4gICAgXCJuaW5qYVwiOiBcIm5pbmphLXNoZWV0LnBuZ1wiXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgICAgICBzdXBlcihwbGF5ZXIpO1xuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNwcml0ZVwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogSk9CX1NQUklURVNbcGxheWVyLmpvYi5uYW1lXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic2hhZG93XCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInNoYWRvdy5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnViYmxlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcImJ1YmJsZS5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgbGV0IHBsYXllcldpZHRoICA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIGxldCB4T2Zmc2V0ICAgICAgPSB0aGlzLl9wbGF5ZXIueFBvcypDb25maWcuVElMRV9TSVpFO1xuICAgICAgICBsZXQgeU9mZnNldCAgICAgID0gdGhpcy5fcGxheWVyLnlQb3MqQ29uZmlnLlRJTEVfU0laRTtcblxuICAgICAgICBsZXQgc2hhZG93ICAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93Jyk7XG5cbiAgICAgICAgbGV0IGJ1YmJsZSAgICAgICA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2J1YmJsZScpO1xuICAgICAgICBsZXQgYnViYmxlV2lkdGggID0gYnViYmxlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGxldCBidWJibGVIZWlnaHQgPSBidWJibGUuaGVpZ2h0LzUqQ29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgICAgICAvLyBEcmF3IFNoYWRvd1xuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNoYWRvdyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHNoYWRvdy53aWR0aCwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCwgLy8gc3ggfiBSZXBsYWNlIHdpdGggcGxheWVyIFggUG9zXG4gICAgICAgICAgICB5T2Zmc2V0ICsgKHBsYXllcldpZHRoKSAtIChDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpLmhlaWdodC8xLjc1KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggcGxheWVyIFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICBsZXQgYW5pbWF0aW9uRnJhbWUgPSAwO1xuXG4gICAgICAgIGlmKHRoaXMuX3BsYXllci5jdXJyZW50U3RhdGUgPT09IFwid2Fsa2luZ1wiKSB7XG4gICAgICAgICAgICBhbmltYXRpb25GcmFtZSA9IENvbmZpZy5TUFJJVEVfU0laRSoodGhpcy5mcmFtZSk7XG4gICAgICAgIH0gZWxzZSBpZih0aGlzLl9wbGF5ZXIuY3VycmVudFN0YXRlID09PSBcImF0dGFja2luZ1wiKSB7XG4gICAgICAgICAgICBhbmltYXRpb25GcmFtZSA9IENvbmZpZy5TUFJJVEVfU0laRSoyO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRHJhdyBQbGF5ZXIgU3ByaXRlXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJyksXG4gICAgICAgICAgICBhbmltYXRpb25GcmFtZSxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0LCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHlPZmZzZXQsIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgcGxheWVyV2lkdGgsIC8vIHNXaWR0aFxuICAgICAgICAgICAgcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gRHJhdyBCdWJibGVcbiAgICAgICAgbGV0IGJ1YmJsZU9mZnNldCA9IDA7XG5cbiAgICAgICAgc3dpdGNoKHRoaXMuX3BsYXllci5jdXJyZW50QWN0aW9uLmdldChcImFjdGlvblwiKSkge1xuICAgICAgICAgICAgY2FzZSBcInRoaW5raW5nXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhdHRhY2tcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGVmZW5kXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaXRlbVwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSozO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFiaWxpdHlcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuX3BsYXllci5jdXJyZW50QWN0aW9uLmdldChcImFjdGlvblwiKSAhPT0gXCJ3YWxrXCJcbiAgICAgICAgICAgICAgICAmJiB0aGlzLl9wbGF5ZXIuY3VycmVudEFjdGlvbi5nZXQoXCJhY3Rpb25cIikgIT09IFwicmVhZHlcIlxuICAgICAgICAgICAgICAgICYmIHRoaXMuX3BsYXllci5jdXJyZW50U3RhdGUgIT09IFwid2Fsa2luZ1wiXG4gICAgICAgICAgICAgICAgJiYgdGhpcy5fcGxheWVyLmN1cnJlbnRTdGF0ZSAhPT0gXCJhdHRhY2tpbmdcIikge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQsIC8vIERZXG4gICAgICAgICAgICAgICAgYnViYmxlLndpZHRoLCAgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlLmhlaWdodC81LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgeE9mZnNldCAtIChidWJibGVXaWR0aC8xLjUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgICAgICB5T2Zmc2V0IC0gKGJ1YmJsZUhlaWdodC8xLjUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgICAgICBidWJibGVXaWR0aCwgIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIGJ1YmJsZUhlaWdodCAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG4vLyBTdGF0aWMgUm9vbSBUeXBlc1xuLy9zdGF0aWMgZ2V0IFRZUEVfQ0FWRSgpIHtcbiAgICAvL3JldHVybiB7XG4gICAgICAgIC8vZmxvb3I6ICdnb29kdGlsZS5wbmcnLFxuICAgICAgICAvL3dhbGw6ICdzaGl0d2FsbC5wbmcnXG4gICAgLy99O1xuLy99XG5cbi8vc3RhdGljIGdldCBUWVBFX1RFTVBMRSgpIHtcbiAgICAvL3JldHVybiB7XG4gICAgICAgIC8vZmxvb3I6ICdncmFzcy5wbmcnLFxuICAgICAgICAvL3dhbGw6ICdwaWxsYXJzLnBuZydcbiAgICAvL307XG4vL31cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihyb29tKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3Jvb20gPSByb29tO1xuICAgICAgICB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgID0gMDtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZmxvb3JcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwiZ29vZHRpbGUucG5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIndhbGxcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwic2hpdHdhbGwyLnBuZ1wiLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcImZsb29yXCIsIFwiZ29vZHRpbGUucG5nXCIpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoXCJ3YWxsXCIsICBcInNoaXR3YWxsMi5wbmdcIilcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgaWYoZnJhbWUlNCA9PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gdGhpcy5mcmFtZSA/IDAgOiAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyIEZsb29yXG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2Zsb29yJyk7XG4gICAgICAgIGxldCBmbG9vcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YKzE7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IENvbmZpZy5USUxFX1kgLSA0OyB5KyspIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICAgICAgZmxvb3IsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArIGZsb29yV2lkdGgqeCAtIGZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgICh5KzIpKmZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGhcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbmRlciBXYWxsXG4gICAgICAgIGxldCB3YWxsID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnd2FsbCcpO1xuICAgICAgICBsZXQgd2FsbFdpZHRoID0gd2FsbC53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLkNBTlZBU19XSURUSC8od2FsbFdpZHRoKSArIDE7IHgrKykge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgd2FsbCxcbiAgICAgICAgICAgICAgICAwLCAvLyBEWFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIqdGhpcy5mcmFtZSwgLy9EWVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgsXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQvMixcbiAgICAgICAgICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICsgd2FsbFdpZHRoKnggLSB3YWxsV2lkdGgsIC8vc3hcbiAgICAgICAgICAgICAgICAwLCAvL3N5XG4gICAgICAgICAgICAgICAgd2FsbC53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0KkNvbmZpZy5TUFJJVEVfU0NBTEUvMlxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxjdWxhdGUgT2Zmc2V0c1xuICAgICAgICBsZXQgeFN0ZXAgPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8xNjtcbiAgICAgICAgaWYodGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPT0gXCJtb3ZpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl9mbG9vck9mZnNldCA+PSBmbG9vcldpZHRoIC0gMSkgdGhpcy5fZmxvb3JPZmZzZXQgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fd2FsbE9mZnNldCA+IHdhbGxXaWR0aCAtIDEpIHRoaXMuX3dhbGxPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IExvZ2dlciAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHVpLCBwbGF5ZXJzLCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3VpICAgICAgICAgPSB1aTtcbiAgICAgICAgdGhpcy5fdmlldyAgICAgICA9IHZpZXc7XG4gICAgICAgIHRoaXMuX3BsYXllcnMgICAgPSBwbGF5ZXJzO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIlVJIFBMQVlFUlNcIik7XG4gICAgICAgIExvZ2dlci5sb2codGhpcy5fcGxheWVycyk7XG5cbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDI7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImJnXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInVpLWJnLnBuZ1wiLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubG9hZFJlc291cmNlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgbGV0IHlQb3MgPSBDb25maWcuVElMRV9TSVpFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuXG4gICAgICAgIC8vIERyYXcgQmFja2dyb3VuZFxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGxldCBiZ1JlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeVBvcyxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0IC0gMzAwXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IHVpUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB5UG9zLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLi4uYmdSZWN0KTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCIjNjRBMzU3XCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCIjMDAzNzAwXCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCguLi51aVJlY3QpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzhEODA0NVwiO1xuXG4gICAgICAgIC8vIFRoZSBzdHJva2UgaXMgbWlkZGxlIGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGJveFxuICAgICAgICBsZXQgbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMzI7XG4gICAgICAgIC8vbGV0IGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIHN0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIEZpbGwgYmcgd2l0aCBwYXRlcm5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBsZXQgcGF0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5fcmVzb3VyY2VzLmdldChcImJnXCIpLCBcInJlcGVhdFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdGVybjtcbiAgICAgICAgY3R4LnJlY3QoLi4uc3Ryb2tlUmVjdCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKTtcblxuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgeVBvcyArPSBDb25maWcuVElMRV9TSVpFLzM7XG5cbiAgICAgICAgbGV0IGZvbnRTaXplICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBjdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcblxuICAgICAgICBsZXQgeFBvcyA9IENvbmZpZy5USUxFX1NJWkUqMS4yO1xuXG4gICAgICAgIGlmKHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuY3VycmVudFN0YXRlID09PSBcImlkbGVcIikge1xuICAgICAgICAgICAgLy8gRHJhdyBJbmZvXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMCA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMF0sXG4gICAgICAgICAgICAgICAgeFBvcyxcbiAgICAgICAgICAgICAgICB5UG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDEgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzFdLFxuICAgICAgICAgICAgICAgIHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICAgICAgeVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1syXSxcbiAgICAgICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgICAgIHlQb3MgKyBmb250U2l6ZSoyXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzNdLFxuICAgICAgICAgICAgICAgIHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICAgICAgeVBvcyArIGZvbnRTaXplKjJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgeFBvcyA9IENvbmZpZy5USUxFX1NJWkUqNTtcbiAgICAgICAgeVBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCk7XG5cbiAgICAgICAgLy8gUmVuZGVyIFBsYXllciBJbmZvXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMuX3BsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHlQb3MgKz0gZm9udFNpemUqMjtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgTmFtZXNcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgeFBvcyxcbiAgICAgICAgICAgICAgICB5UG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgLy8gRGVmaW5lIGNvb2xkb3duIHZhcnNcbiAgICAgICAgICAgIGxldCBjb29sZG93bkJhcllQb3MgICA9IHlQb3MgKyBmb250U2l6ZS8yO1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFyV2lkdGggID0gQ29uZmlnLlRJTEVfU0laRTtcbiAgICAgICAgICAgIGxldCBjb29sZG93bkJhckhlaWdodCA9IGZvbnRTaXplLzI7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgQ29vbGRvd24gRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwRkYwMFwiO1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duUGVyY2VudGFnZSA9IHBsYXllci5jb29sZG93bi9wbGF5ZXIubWF4Q29vbGRvd247XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoeFBvcywgY29vbGRvd25CYXJZUG9zLCBjb29sZG93bkJhcldpZHRoKmNvb2xkb3duUGVyY2VudGFnZSwgY29vbGRvd25CYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIENvb2xkb3duIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdCh4UG9zLCBjb29sZG93bkJhcllQb3MsIGNvb2xkb3duQmFyV2lkdGgsIGNvb2xkb3duQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gRGVmaW5lIEhlYWx0aGJhciB2YXJzXG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyWFBvcyAgID0geFBvcyArIENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJZUG9zICAgPSB5UG9zIC0gZm9udFNpemUvMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJXaWR0aCAgPSBDb25maWcuVElMRV9TSVpFKjI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFySGVpZ2h0ID0gZm9udFNpemUvMjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGMDAwMFwiO1xuICAgICAgICAgICAgbGV0IGhlYWx0aFBlcmNlbnRhZ2UgPSBwbGF5ZXIuaGVhbHRoL3BsYXllci5tYXhIZWFsdGg7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqaGVhbHRoUGVyY2VudGFnZSwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggU3Ryb2tlXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggICA9IDEqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3BsYXllci5oZWFsdGh9LyR7cGxheWVyLm1heEhlYWx0aH1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBoZWFsdGhCYXJZUG9zICs9IGhlYWx0aEJhckhlaWdodCoxLjU7XG5cbiAgICAgICAgICAgIC8vY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgLy9jdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIEZpbGxcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDAwRkZcIjtcbiAgICAgICAgICAgIGxldCBtYW5hUGVyY2VudGFnZSA9IHBsYXllci5tYW5hL3BsYXllci5tYXhNYW5hO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoKm1hbmFQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLm1hbmF9LyR7cGxheWVyLm1heE1hbmF9YCxcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXJYUG9zK2hlYWx0aEJhcldpZHRoKzIqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXJZUG9zXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwKCkge1xuICAgICAgICBpZih0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSlcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMilcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudXAoKTtcbiAgICB9XG5cbiAgICBsZWZ0KCkge1xuICAgICAgICBpZih0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSlcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMilcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJpZ2h0KCkge1xuICAgICAgICB0aGlzLmxlZnQoKTtcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZih0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50T3B0aW9uID0gdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG5cbiAgICAgICAgICAgIGxldCBhY3Rpb24gPSBJbW11dGFibGUuTWFwKHtcbiAgICAgICAgICAgICAgICBcImN5Y2xlXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuYWN0aW9uQ3ljbGUsXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25cIjogdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF0sXG4gICAgICAgICAgICAgICAgXCJ0YXJnZXRcIjogMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKCFJbW11dGFibGUuaXMoYWN0aW9uLCB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmN1cnJlbnRBY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItYWN0aW9uXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnJvbVwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjogYWN0aW9uXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5wb3N0TWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==
