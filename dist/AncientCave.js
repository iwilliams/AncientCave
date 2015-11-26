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

config.DISABLE_AUDIO = true;

// 16x9 Aspect Ratio
config.ASPECT_WIDTH = 1920;
config.ASPECT_HEIGHT = 1080;

config.TILE_X = 16; // MUST BE MULTIPLE OF 16
config.TILE_Y = config.TILE_X * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

config.calculate = function () {
    // Horizontal or Vertical percentage that the game view should occupy
    config.PERCENTAGE = 1;

    // Caclulate canvas width and height according to above percentage and aspect ratio
    config.CANVAS_WIDTH = window.outerWidth * config.PERCENTAGE;
    config.CANVAS_HEIGHT = config.CANVAS_WIDTH * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

    // Make sure the window will fit vertically
    if (config.CANVAS_HEIGHT > window.innerHeight) {
        config.CANVAS_HEIGHT = window.outerHeight * config.PERCENTAGE;
        config.CANVAS_WIDTH = config.CANVAS_HEIGHT * config.ASPECT_WIDTH / config.ASPECT_HEIGHT;
    }

    // Determine Sprite Scaling
    config.SPRITE_SIZE = 24;
    config.SPRITE_SCALE = config.CANVAS_WIDTH / (config.TILE_X * config.SPRITE_SIZE);
    config.TILE_SIZE = config.SPRITE_SIZE * config.SPRITE_SCALE;

    // Set FPS
    config.FPS = 30;
};

config.calculate();

exports["default"] = config;
module.exports = exports["default"];

},{}],3:[function(require,module,exports){
// Import Game
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
                _this._dispatcher.emit("start-game");
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"./dispatcher/Dispatcher":4,"./models/Game":8,"./views/Canvas2d":22}],4:[function(require,module,exports){
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
            this.registerViewMessages(this._view);
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
                _this.registerMultiplayerMessages(_this._networkService);
                _servicesLogger2['default'].debug("Dispatcher: Broadcast Add Player Message");
                _this.emit("add-player", {
                    "id": Symbol(),
                    "name": message.name,
                    "isLocal": true
                });
                _this.emit("game-state", "lobby");
            });
        }
    }, {
        key: 'leaveGame',
        value: function leaveGame() {
            this._networkService.disconnect();
            this.emit("game-state", "main menu");
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
            this.emit("add-player", {
                "id": message.from,
                "name": message.data.name,
                "job": message.data.job
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
            this.emit("remove-player", {
                "id": message
            });
        }

        /**
         * Register all multiplayer Events
         */
    }, {
        key: 'registerMultiplayerMessages',
        value: function registerMultiplayerMessages(multiplayerService) {
            var _this2 = this;

            multiplayerService.on("peer-connect", this.peerConnect.bind(this));
            multiplayerService.on("peer-disconnect", this.peerDisconnect.bind(this));

            multiplayerService.on("player-state", function (message) {
                _this2.emit("player-state", message);
            });

            multiplayerService.on("job-select", function (message) {
                _this2.emit("player-job", message);
            });

            multiplayerService.on("option-select", function (message) {
                _this2.emit("option-select", message);
            });
        }

        /**
         * Register all view messages
         */
    }, {
        key: 'registerViewMessages',
        value: function registerViewMessages(view) {
            var _this3 = this;

            view.on("start-mp", this.initMultiplayerGame.bind(this));
            view.on("leave-game", function () {
                _this3.leaveGame();
            });

            view.on("job-select", function (message) {
                _servicesLogger2['default'].log(message);
                _this3._networkService.jobSelect(message.job);
                _this3.emit("player-job", message);
            });

            view.on("ready", function (message) {
                var state = message.state ? "ready" : "idle";
                _this3._networkService.playerState(state);
                _this3.emit("player-state", {
                    "id": message.id,
                    "state": state
                });
            });

            view.on("option-select", function (message) {
                _this3._networkService.optionSelect(message.option);
                _this3.emit("option-select", message);
            });
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
                _this.listenToDispatcher(_this._dispatcher);

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

                _servicesLogger2['default'].debug("Players are ready? " + readyToStart);

                if (readyToStart) {
                    _servicesLogger2['default'].banner("STARTING GAME");
                    this._startPlaying();
                }
            }
        }
    }, {
        key: 'checkPlayerAction',
        value: function checkPlayerAction(p, message) {
            if (this.currentState === "playing") {
                if (this._room.currentState == "idle") {
                    var readyToMove = true;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = this.players.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var player = _step2.value;

                            readyToMove = readyToMove && player.currentAction === "ready";
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
                } else if (this._room.currentState == "battle") {
                    if (message === "attack") {
                        this._playerAttack(p);
                    }
                }
            }
        }

        /**
         * Return current state
         */
    }, {
        key: '_startMenu',
        value: function _startMenu() {
            this.currentState = "main menu";
        }
    }, {
        key: '_startMultiplayer',
        value: function _startMultiplayer() {
            this.currentState = "lobby";
        }
    }, {
        key: '_startPlaying',
        value: function _startPlaying() {
            // Create a room
            this._room = new _objectsRoom2['default']();
            this._ui = new _objectsUi2['default']();
            this.currentState = "playing";
        }
    }, {
        key: '_lookForTrouble',
        value: function _lookForTrouble() {
            var _this2 = this;

            // Set room to moving
            this._room.currentState = "moving";

            // Set players to walking
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.players.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var player = _step3.value;

                    player.currentState = "walking";
                }

                // Create enemies
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
            this._room.currentState = "battle";
            this._ui.setBattleOptions();
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = this.players.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var player = _step4.value;

                    player.beginCombat();
                    player.chargeCooldown(this._playerCooldownReady.bind(this));
                }
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

            this.emit('start-battle');
        }
    }, {
        key: '_playerCooldownReady',
        value: function _playerCooldownReady(player) {
            this.emit("player-cooldown", player);
            if (player.currentAction === "attack") {
                this._playerAttack(player);
            }
        }
    }, {
        key: '_playerAttack',
        value: function _playerAttack(p) {
            if (p.readyToAttack) {
                this._combatPhase();
                p.chargeCooldown(this._playerCooldownReady.bind(this));
                this.emit("player-attack", p);
            }
        }
    }, {
        key: '_combatPhase',
        value: function _combatPhase() {
            var shouldEndBattle = true;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = this._enemies.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var enemy = _step5.value;

                    enemy.health--;
                    shouldEndBattle = shouldEndBattle && enemy.health <= 0;
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

            if (shouldEndBattle) {
                this._endBattle();
            }
        }
    }, {
        key: '_endBattle',
        value: function _endBattle() {
            this._room.currentState = "idle";
            this._ui.setIdleOptions();
            this.emit('end-battle');

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = this.players.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var player = _step6.value;

                    player.endCombat();
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
        }

        /**
         * Listen to events from the dispatcher and respond acordingly
         */
    }, {
        key: 'listenToDispatcher',
        value: function listenToDispatcher(dispatcher) {
            var _this3 = this;

            dispatcher.on("start-game", this._startMenu.bind(this));
            dispatcher.on("start-mp", this._startMultiplayer.bind(this));

            // Listen to game state events
            dispatcher.on("game-state", function (message) {
                _this3.currentState = message;
            });

            dispatcher.on("add-player", function (message) {
                _servicesLogger2['default'].debug("Game: Add Player message recieved");
                _servicesLogger2['default'].log(message);

                var p = new _objectsPlayer2['default'](message.name, message.id, message.job);

                p.init().then(function () {
                    _this3.addPlayer(p, message.isLocal);
                });
            });

            // Remove the peers player from the game
            dispatcher.on("remove-player", function (message) {
                _servicesLogger2['default'].debug("Game: Remove Player message recieved");
                _servicesLogger2['default'].log(message);

                _this3._players['delete'](message.id);

                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = _this3._players.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var player = _step7.value;

                        player.currentState = "idle";
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
            });

            // Alter player's job
            dispatcher.on("player-job", function (message) {
                var player = _this3._players.get(message.id);
                player.job = message.job;
            });

            // Alter player's state
            dispatcher.on("player-state", function (message) {
                _servicesLogger2['default'].debug("Game: Remote Player State message recieved");
                _servicesLogger2['default'].log(message);

                var player = _this3._players.get(message.id);
                player.currentState = message.state;

                // Progress Game logic accoridng to player state
                _this3.checkPlayerState();
            });

            // Listen for remote option select
            // CHANGE TO PLAYER-ACTION
            dispatcher.on("option-select", function (message) {
                var player = _this3._players.get(message.id);
                player.currentAction = message.option;
                _this3.checkPlayerAction(player, message.option);
            });
        }

        /**
         * Adds a player regardless of remote or local
         */
    }, {
        key: 'addPlayer',
        value: function addPlayer(p, isLocal) {
            _servicesLogger2['default'].debug("Game: Adding Player");
            _servicesLogger2['default'].log(p);
            var players = this._players.values();
            var yPos = .8;
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = players[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var player = _step8.value;

                    yPos = player.yPos;
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

            yPos += 1.2;
            p.yPos = yPos;
            this._players.set(p.id, p);
            if (isLocal) {
                this._localPlayer = p;
            }
            this.emit("add-player", p);
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
        },
        get: function get() {
            return this._currentState;
        }

        /**
         * Return main menu
         */
    }, {
        key: 'mainMenu',
        get: function get() {
            return this._mainMenu;
        }

        /**
         * Return lobby
         */
    }, {
        key: 'lobby',
        get: function get() {
            return this._lobby;
        }

        /**
         * Return players
         */
    }, {
        key: 'players',
        get: function get() {
            return this._players;
        }

        /**
         * Return the local player
         */
    }, {
        key: 'localPlayer',
        get: function get() {
            return this._localPlayer;
        }

        /**
         * Return Current Room
         */
    }, {
        key: 'room',
        get: function get() {
            return this._room;
        }

        /**
         * Return Ui Room
         */
    }, {
        key: 'ui',
        get: function get() {
            return this._ui;
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

// Can't call this Object b/c of conflict xD

var _servicesLogger = require('../../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

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
    'position': 'front'
});

var Player = (function (_BaseModel) {
    _inherits(Player, _BaseModel);

    _createClass(Player, null, [{
        key: 'getJobs',
        value: function getJobs() {
            return [].concat(_toConsumableArray(JOBS.values()));
        }
    }]);

    function Player(name, id, job) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this);
        this._name = name;
        this._id = id;

        this._states = new Set(["idle", "ready", "walking", "attacking"]);
        this.currentState = "idle";

        this.currentAction = "thinking";

        if (job) this.job = job;
    }

    _createClass(Player, [{
        key: 'init',
        value: function init() {
            return new Promise(function (res, rej) {
                res();
            });
        }
    }, {
        key: 'beginCombat',
        value: function beginCombat() {
            this.currentState = "idle";
            this.currentAction = "action";
            this.cooldown = 0;
            this._readyToAttack = false;
        }
    }, {
        key: 'endCombat',
        value: function endCombat() {
            this.currentState = "idle";
            this.currentAction = "thinking";
            this.cooldown = this.maxCooldown;
            this._readyToAttack = false;
            if (this._cooldownInterval) clearInterval(this._cooldownInterval);
        }
    }, {
        key: 'chargeCooldown',
        value: function chargeCooldown(callback) {
            var _this = this;

            this._currentAction = "thinking";
            this._readyToAttack = false;
            this.cooldown = 0;

            if (this._cooldownInterval) clearInterval(this._cooldownInterval);

            this._cooldownInterval = setInterval(function () {
                _this.cooldown++;
                if (_this.cooldown >= _this.maxCooldown) {
                    clearInterval(_this._cooldownInterval);
                    _this._readyToAttack = true;
                    callback(_this);
                }
            }, 60);
        }
    }, {
        key: 'job',
        set: function set(jobName) {
            this._job = JOBS.get(jobName);

            this.maxHealth = this._job.health;
            this.health = this._job.health;

            this.maxMana = this._job.mana;
            this.mana = this._job.mana;

            this.maxCooldown = this._job.cooldown;
            this.cooldown = this._job.cooldown;
        },
        get: function get() {
            return this._job;
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
            this._currentAction = action;
        },
        get: function get() {
            return this._currentAction;
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
    }]);

    return Player;
})(_BaseModel3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"../../services/Logger":16,"../BaseModel":7}],13:[function(require,module,exports){
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

var FILLABLE = new Set(["enemies", "type", "isMoving", "isBattle", "isLooking", "nextEncounter", "encounterRate", "tickCount"]);

var Room = (function (_BaseModel) {
    _inherits(Room, _BaseModel);

    function Room(type) {
        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this);
        this._states = new Set(["idle", "moving", "battle"]);

        this._type = type;
        this.currentState = "idle";
    }

    _createClass(Room, [{
        key: 'lookForTrouble',
        value: function lookForTrouble() {}
    }, {
        key: 'stopLooking',
        value: function stopLooking() {}
    }, {
        key: 'endBattle',
        value: function endBattle() {}
    }, {
        key: 'startBattle',
        value: function startBattle() {}
    }]);

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
        value: function init() {
            var _this = this;

            // Initialize the peer connection
            this._peer = new Peer(this._id, {
                key: _Config2['default'].API_KEY,
                debug: 3
            });

            return new Promise(function (res, rej) {
                _this._peer.on('open', function (id) {
                    _Logger2['default'].debug('Peer Connection created, Peer ID is ' + id);
                    _this._id = id;

                    // If we know about a peer then connect
                    if (_this._host) _this.addPeer(_this._peer.connect(_this._host));

                    // When a peer connects handle it
                    _this._peer.on('connection', function (connection) {
                        // Don't allow more than 4 players
                        if (_this._peers.size >= 4) {
                            connection.close();
                        }

                        connection.on('open', function () {
                            _Logger2['default'].debug("Peer has connected");
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

            connection.on('data', this.handleData.bind(this));

            connection.on('close', function () {
                _this2.removePeer(peer);
            });

            return peer;
        }
    }, {
        key: 'connectToPeer',
        value: function connectToPeer(peer) {
            var message = {
                "event": "peer-connect",
                "from": this._id,
                "data": {
                    "name": this._name,
                    "job": this._selectedJob || undefined
                }
            };

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

            message.data.peers = peers;

            _Logger2['default'].debug('Sending peer-connect message to peer with id ' + peer);
            _Logger2['default'].log(message);
            peer.connection.send(message);
            peer.hasConnected = true;
        }
    }, {
        key: 'removePeer',
        value: function removePeer(peer) {
            _Logger2['default'].debug("Remove peer");
            this.emit("peer-disconnect", peer.connection.peer);
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
    }, {
        key: 'playerState',
        value: function playerState(state) {
            var message = {
                "event": "player-state",
                "data": {
                    "id": this._id,
                    "state": state
                }
            };
            this._sendMessage(message);
        }
    }, {
        key: 'jobSelect',
        value: function jobSelect(job) {
            var message = {
                "event": "job-select",
                "data": {
                    "id": this._id,
                    "job": job
                }
            };
            this._selectedJob = job;
            this._sendMessage(message);
        }
    }, {
        key: 'optionSelect',
        value: function optionSelect(option) {
            var message = {
                "event": "option-select",
                "data": {
                    "id": this._id,
                    "option": option
                }
            };
            this._sendMessage(message);
        }
    }, {
        key: 'handleData',
        value: function handleData(message) {
            _Logger2['default'].debug('Message recieved from peer with id ' + message.from);
            _Logger2['default'].log(message);

            // Grab data from message
            var data = message.data;

            if (message.event == "peer-connect") {
                // See if this peer knows about any other peers and add if we don't know them
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = data.peers[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var peer = _step3.value;

                        if (!this._peers.get(peer) && peer !== this._id) {
                            _Logger2['default'].debug('Adding Peer with id ' + peer);
                            this.addPeer(this._peer.connect(peer));
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

                this.emit("peer-connect", message);
            }

            if (message.event == "player-state") {
                this.emit("player-state", message.data);
            }

            if (message.event == "job-select") {
                this.emit("job-select", message.data);
            }

            if (message.event == "option-select") {
                this.emit("option-select", message.data);
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
        value: function play(soundName, loop) {
            if (_Config2["default"].DISABLE_AUDIO) return;
            var sound = this._sounds.get(soundName);
            sound.loop(loop || false);
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
                var fps = parseInt(this.counter / time_el);

                // Show FPS
                var fontSize = 5 * _Config2['default'].SPRITE_SCALE;
                this._ctx.font = fontSize + "px Courier New";
                this._ctx.fillStyle = "#ffffff";

                this._ctx.fillText(this._frame + "/" + _Config2['default'].FPS + " " + fps + "fps", 20, 20);

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
                        //uiView.requestInput().then(this.handleUiInput.bind(this));
                        promises.push(uiView.loadResources());

                        // Load sounds
                        var soundService = new _servicesSoundService2['default']();
                        _this._soundService = soundService;
                        promises.push(soundService.loadResources());

                        // After all renderers are ready let the dispatcher know
                        Promise.all(promises).then(function () {
                            _this._views = [_this._roomView].concat(views, [_this._uiView]);
                            _this.emit("render-ready");
                        });
                    })();
                }
            });

            game.on("add-player", function (player) {
                if (game.currentState === "loby") _this._lobbyView._ready = false;
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
                _this._soundService.play("combat-theme", true);
                _this._views = [].concat(_toConsumableArray(_this._views), _toConsumableArray(_this._enemyViews));
            });

            game.on("player-cooldown", function (player) {
                if (player.isLocal) {
                    _this._soundService.play("cooldown-ready");
                }
            });

            game.on("player-attack", function (player) {
                if (player == _this._game.localPlayer) {
                    _this._uiView.clearLastOption();
                }
            });

            game.on("end-battle", function () {
                _this._soundService.stop("combat-theme");
                _this._views = [_this._roomView].concat(_toConsumableArray(_this._playerViews.values()), [_this._uiView]);
            });
        }
    }, {
        key: 'handleUiInput',
        value: function handleUiInput(input) {
            this.emit("option-select", input);
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
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../mixins/EventEmitter":5,"../services/KeyboardInputService":15,"../services/Logger":16,"../services/SoundService":20,"./EnemyView":23,"./LobbyView":24,"./MainMenuView":25,"./PlayerView":27,"./RoomView":28,"./UiView":29}],23:[function(require,module,exports){
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

},{"../../Config":2,"../services/Utils":21,"./ObjectView":26}],24:[function(require,module,exports){
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
                        view.emit("job-select", {
                            "job": jobSelect.value,
                            "id": _this._view._game.localPlayer.id
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
                    this._view.emit("leave-game");
                } else if (this.selectedOption == "Ready") {
                    this._ready = !this._ready;
                    this._view.emit("ready", {
                        "id": this._view._game.localPlayer.id,
                        "state": this._ready
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

},{"../../Config":2,"../models/objects/Player":12,"../services/ResourceService":18,"../services/Utils":21,"./ObjectView":26}],25:[function(require,module,exports){
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
                        view.emit("start-mp", {
                            name: nameInput.value,
                            id: idInput.value
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
                        view.emit("start-mp", {
                            name: nameInput.value,
                            hostId: hostInput.value,
                            id: idInput.value
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

},{"../../Config":2,"../services/ResourceService":18,"../services/Utils":21,"./ObjectView":26}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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
    "necromancer": "necromancer-sheet.png"
};

var _default = (function (_ObjectView) {
    _inherits(_default, _ObjectView);

    function _default(player) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, player);
        console.log("VIEW");
        console.log(player);
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

            var xOffset = _Config2['default'].TILE_X - 3;
            if (this._player.position == "back") {
                xOffset++;
            }

            var shadow = this._resources.get('shadow');

            var bubble = this._resources.get('bubble');
            var bubbleWidth = bubble.width * _Config2['default'].SPRITE_SCALE;
            var bubbleHeight = bubble.height / 5 * _Config2['default'].SPRITE_SCALE;

            // Draw Shadow
            ctx.drawImage.apply(ctx, [shadow, 0, 0, // DY
            shadow.width, // dWidth
            shadow.width, // dHeight
            xOffset * playerWidth, // sx ~ Replace with player X Pos
            this._player.yPos * playerWidth + playerWidth - _Config2['default'].SPRITE_SCALE * this._resources.get('shadow').height / 1.75, // sy ~ Replace with player Y Pos
            playerWidth, // sWidth
            playerWidth // sHeight
            ]);

            // Draw Player Sprite
            ctx.drawImage.apply(ctx, [this._resources.get('sprite'), this._player.currentState === "walking" ? _Config2['default'].SPRITE_SIZE * this.frame : 0, // DX
            0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            xOffset * playerWidth, // sx ~ Replace with object X Pos
            this._player.yPos * playerWidth, // sy ~ Replace with object Y Pos
            playerWidth, // sWidth
            playerWidth // sHeight
            ]);

            // Draw Bubble
            var bubbleOffset = 0;
            switch (this._player.currentAction) {
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

            if (this._player.currentAction !== "walk" && this._player.currentAction !== "ready") {
                ctx.drawImage.apply(ctx, [this._resources.get('bubble'), 0, bubbleOffset, // DY
                bubble.width, // dWidth
                bubble.height / 5, // dHeight
                xOffset * playerWidth - bubbleWidth / 1.5, // sx ~ Replace with object X Pos
                this._player.yPos * playerWidth - bubbleHeight / 1.5, // sy ~ Replace with object Y Pos
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

},{"../../Config":2,"../services/ResourceService":18,"../services/Utils":21,"./ObjectView":26}],28:[function(require,module,exports){
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
            this.frame = frame < _Config2['default'].FPS % 2 ? 0 : 1;
            this.frame = frame % 2;

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

},{"../../Config":2,"../services/Utils":21,"./ObjectView":26}],29:[function(require,module,exports){
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

            // Draw Info
            ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 0 ? ">" : "") + this._ui.currentOptions[0], xPos, yPos]);

            ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 1 ? ">" : "") + this._ui.currentOptions[1], xPos + _Config2['default'].TILE_SIZE * 2, yPos]);

            ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 2 ? ">" : "") + this._ui.currentOptions[2], xPos, yPos + fontSize * 2]);

            ctx.fillText.apply(ctx, ['' + (this._selectedOptionIndex == 3 ? ">" : "") + this._ui.currentOptions[3], xPos + _Config2['default'].TILE_SIZE * 2, yPos + fontSize * 2]);

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
            if (this._selectedOptionIndex == 0) this._selectedOptionIndex = 2;else if (this._selectedOptionIndex == 1) this._selectedOptionIndex = 3;else if (this._selectedOptionIndex == 2) this._selectedOptionIndex = 0;else if (this._selectedOptionIndex == 3) this._selectedOptionIndex = 1;
        }
    }, {
        key: 'down',
        value: function down() {
            this.up();
        }
    }, {
        key: 'left',
        value: function left() {
            if (this._selectedOptionIndex == 0) this._selectedOptionIndex = 1;else if (this._selectedOptionIndex == 1) this._selectedOptionIndex = 0;else if (this._selectedOptionIndex == 2) this._selectedOptionIndex = 3;else if (this._selectedOptionIndex == 3) this._selectedOptionIndex = 2;
        }
    }, {
        key: 'right',
        value: function right() {
            this.left();
        }
    }, {
        key: 'confirm',
        value: function confirm() {
            var currentOption = this._ui.currentOptions[this._selectedOptionIndex];
            if (currentOption !== this._lastOption) {
                this._view.emit("option-select", {
                    "id": this._view._game.localPlayer.id,
                    "option": this._ui.currentOptions[this._selectedOptionIndex]
                });
                this._lastOption = currentOption;
            }
        }
    }, {
        key: 'clearLastOption',
        value: function clearLastOption() {
            this._lastOption = undefined;
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Logger":16,"./ObjectView":26}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbWl4aW5zL2V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL0xvYmJ5LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTWFpbk1lbnUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUm9vbS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9OZXR3b3JrU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1JuZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1NvdW5kU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1V0aWxzLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvQ2FudmFzMmQuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9FbmVteVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Mb2JieVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9NYWluTWVudVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9PYmplY3RWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21WaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt5QkNBbUIsY0FBYzs7Ozs7QUFHakMsSUFBSSxNQUFNLEdBQUcsMkJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDUHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7OztBQUc1QixNQUFNLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQztBQUM1QixNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFFNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxBQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDOztBQUV6RSxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVc7O0FBRTFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdEIsVUFBTSxDQUFDLFlBQVksR0FBSSxNQUFNLENBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDM0QsVUFBTSxDQUFDLGFBQWEsR0FBRyxBQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDOzs7QUFHdEYsUUFBRyxNQUFNLENBQUMs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QVcsR0FBRyxhQUFhLENBQUM7YUFDcEM7U0FDSjs7O2VBRWMsMkJBQUc7QUFDZCxnQkFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDaEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEVuZ2luZSBmcm9tICcuL2FwcC9FbmdpbmUnO1xuXG4vLyBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIGdhbWVcbnZhciBlbmdpbmUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuZW5naW5lLmluaXQoKTtcblxuLy8gREVCVUdcbndpbmRvdy5lbmdpbmUgPSBlbmdpbmU7XG5cbiIsImxldCBjb25maWcgPSB7fTtcbi8qKlxuICogU2hvdWxkIGJlIHNldCB1cCB0byByZWNhbGN1bGF0ZSBvbiB0aGUgZmx5IHdoZW4gdGhpbmdzIGNoYWduZS5cbiAqIE5vdCB3b3JraW5nIHJpZ2h0IGF0IGFsbCBmb3Igd2luZG93IHNpemUgY2hhZ25lcy5cbiAqL1xuY29uZmlnLkFQSV9LRVkgPSBcInhhaHh4MHl1eTVsZTRzNGlcIjtcblxuY29uZmlnLkRJU0FCTEVfQVVESU8gPSB0cnVlO1xuXG4vLyAxNng5IEFzcGVjdCBSYXRpb1xuY29uZmlnLkFTUEVDVF9XSURUSCAgPSAxOTIwO1xuY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG5jb25maWcuVElMRV9YID0gMTY7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbmNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuY29uZmlnLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIEhvcml6b250YWwgb3IgVmVydGljYWwgcGVyY2VudGFnZSB0aGF0IHRoZSBnYW1lIHZpZXcgc2hvdWxkIG9jY3VweVxuICAgIGNvbmZpZy5QRVJDRU5UQUdFID0gMTtcblxuICAgIC8vIENhY2x1bGF0ZSBjYW52YXMgd2lkdGggYW5kIGhlaWdodCBhY2NvcmRpbmcgdG8gYWJvdmUgcGVyY2VudGFnZSBhbmQgYXNwZWN0IHJhdGlvXG4gICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSB3aW5kb3cub3V0ZXJXaWR0aCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3aW5kb3cgd2lsbCBmaXQgdmVydGljYWxseVxuICAgIGlmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCA9IChjb25maWcuQ0FOVkFTX0hFSUdIVCpjb25maWcuQVNQRUNUX1dJRFRIKS9jb25maWcuQVNQRUNUX0hFSUdIVDtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgU3ByaXRlIFNjYWxpbmdcbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuICAgIGNvbmZpZy5TUFJJVEVfU0NBTEUgID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCpjb25maWcuU1BSSVRFX1NJWkUpO1xuICAgIGNvbmZpZy5USUxFX1NJWkUgICAgID0gY29uZmlnLlNQUklURV9TSVpFKmNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAvLyBTZXQgRlBTXG4gICAgY29uZmlnLkZQUyA9IDMwO1xufVxuXG5jb25maWcuY2FsY3VsYXRlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsIi8vIEltcG9ydCBHYW1lXG5pbXBvcnQgR2FtZSBmcm9tICcuL21vZGVscy9HYW1lJztcblxuLy8gSW1wb3J0IFZpZXdcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlld3MvQ2FudmFzMmQnO1xuXG4vLyBJbXBvcnQgRGlzcGF0Y2hlclxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi9kaXNwYXRjaGVyL0Rpc3BhdGNoZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2dhbWUgICAgICAgPSBuZXcgR2FtZSgpO1xuICAgICAgICB0aGlzLl92aWV3ICAgICAgID0gbmV3IFZpZXcoKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG5cbiAgICAgICAgd2luZG93LmdhbWUgICAgICAgPSB0aGlzLl9nYW1lO1xuICAgICAgICB3aW5kb3cudmlldyAgICAgICA9IHRoaXMuX3ZpZXc7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaGVyID0gdGhpcy5fZGlzcGF0Y2hlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbmdpbmVcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLl9nYW1lLmluaXQodGhpcy5fZGlzcGF0Y2hlciksXG4gICAgICAgICAgICB0aGlzLl92aWV3LmluaXQodGhpcy5fZ2FtZSksXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmluaXQodGhpcy5fdmlldylcbiAgICAgICAgXSkudGhlbigoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5lbWl0KFwic3RhcnQtZ2FtZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgRXZlbnRFbWl0dGVyICAgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTmV0d29ya1NlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvTmV0d29ya1NlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLnJlZ2lzdGVyVmlld01lc3NhZ2VzKHRoaXMuX3ZpZXcpO1xuICAgIH1cblxuICAgIGluaXRNdWx0aXBsYXllckdhbWUobWVzc2FnZSkge1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICAvLyBCdWlsZCBhcmdzXG4gICAgICAgIGlmKG1lc3NhZ2UuaG9zdElkKSB7XG4gICAgICAgICAgICBhcmdzID0gW21lc3NhZ2UubmFtZSwgbWVzc2FnZS5ob3N0SWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncyA9IFttZXNzYWdlLm5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluaXQgbXAgY29udHJvbGxlclxuICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZSA9IG5ldyBOZXR3b3JrU2VydmljZSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNdWx0aXBsYXllck1lc3NhZ2VzKHRoaXMuX25ldHdvcmtTZXJ2aWNlKTtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBBZGQgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJhZGQtcGxheWVyXCIsIHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IFN5bWJvbCgpLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBtZXNzYWdlLm5hbWUsXG4gICAgICAgICAgICAgICAgXCJpc0xvY2FsXCI6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZ2FtZS1zdGF0ZVwiLCBcImxvYmJ5XCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZWF2ZUdhbWUoKSB7XG4gICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiZ2FtZS1zdGF0ZVwiLCBcIm1haW4gbWVudVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGdldCBhIHBlZXIgY29ubmVjdCBldmVudCBmb3JtIHRoZSBtdWx0aXBsYXllciBjb250cm9sbGVyLCBjcmVhdGUgYSBhZGQgcGxheWVyIGV2ZW50XG4gICAgICovXG4gICAgcGVlckNvbm5lY3QobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBQZWVyIENvbm5lY3QgTWVzc2FnZVwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBCcm9hZGNhc3QgQWRkIFBsYXllciBNZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGQtcGxheWVyXCIsIHtcbiAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZS5mcm9tLFxuICAgICAgICAgICAgXCJuYW1lXCI6IG1lc3NhZ2UuZGF0YS5uYW1lLFxuICAgICAgICAgICAgXCJqb2JcIjogbWVzc2FnZS5kYXRhLmpvYlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGdldCBhIHBlZXIgZGlzY29ubmVjdCBldmVudCBmb3JtIHRoZSBtdWx0aXBsYXllciBjb250cm9sbGVyLCBjcmVhdGUgYSByZW1vdmUgcGxheWVyIGV2ZW50XG4gICAgICovXG4gICAgcGVlckRpc2Nvbm5lY3QobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBQZWVyIERpc2Nvbm5lY3QgTWVzc2FnZVwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBCcm9hZGNhc3QgUmVtb3ZlIFBsYXllciBNZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJyZW1vdmUtcGxheWVyXCIsIHtcbiAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbGwgbXVsdGlwbGF5ZXIgRXZlbnRzXG4gICAgICovXG4gICAgcmVnaXN0ZXJNdWx0aXBsYXllck1lc3NhZ2VzKG11bHRpcGxheWVyU2VydmljZSkge1xuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJwZWVyLWNvbm5lY3RcIiwgICAgdGhpcy5wZWVyQ29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwicGVlci1kaXNjb25uZWN0XCIsIHRoaXMucGVlckRpc2Nvbm5lY3QuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwicGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIG1lc3NhZ2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJqb2Itc2VsZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWpvYlwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwib3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcIm9wdGlvbi1zZWxlY3RcIiwgbWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGFsbCB2aWV3IG1lc3NhZ2VzXG4gICAgICovXG4gICAgcmVnaXN0ZXJWaWV3TWVzc2FnZXModmlldykge1xuICAgICAgICB2aWV3Lm9uKFwic3RhcnQtbXBcIiwgdGhpcy5pbml0TXVsdGlwbGF5ZXJHYW1lLmJpbmQodGhpcykpO1xuICAgICAgICB2aWV3Lm9uKFwibGVhdmUtZ2FtZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5sZWF2ZUdhbWUoKVxuICAgICAgICB9KTtcblxuICAgICAgICB2aWV3Lm9uKFwiam9iLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5qb2JTZWxlY3QobWVzc2FnZS5qb2IpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWpvYlwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5vbihcInJlYWR5XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gbWVzc2FnZS5zdGF0ZSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiO1xuICAgICAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UucGxheWVyU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIHtcbiAgICAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHN0YXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5vbihcIm9wdGlvbi1zZWxlY3RcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5vcHRpb25TZWxlY3QobWVzc2FnZS5vcHRpb24pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiU0VUIFNUQVRFIFRPIFNUQVRFXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RhdGU7XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IE1peGluc1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvZXZlbnRFbWl0dGVyJztcblxuLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICAgZnJvbSAnLi4vc2VydmljZXMvUm5nJztcblxuLy8gSW1wb3J0IE1vZGVsc1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5pbXBvcnQgUGxheWVyICAgIGZyb20gJy4vb2JqZWN0cy9QbGF5ZXInO1xuaW1wb3J0IEVuZW15ICAgICBmcm9tICcuL29iamVjdHMvTW9uc3Rlcic7XG5pbXBvcnQgUm9vbSAgICAgIGZyb20gJy4vb2JqZWN0cy9Sb29tJztcbmltcG9ydCBNYWluTWVudSAgZnJvbSAnLi9vYmplY3RzL01haW5NZW51JztcbmltcG9ydCBMb2JieSAgICAgZnJvbSAnLi9vYmplY3RzL0xvYmJ5JztcbmltcG9ydCBVaSAgICAgICAgZnJvbSAnLi9vYmplY3RzL1VpJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJtYWluIG1lbnVcIixcbiAgICAgICAgICAgIFwibG9iYnlcIixcbiAgICAgICAgICAgIFwicGxheWluZ1wiXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX21haW5NZW51ID0gbmV3IE1haW5NZW51KCk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ICAgID0gbmV3IExvYmJ5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdChkaXNwYXRjaGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgICAgICAgICAgdGhpcy5fcGxheWVycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgLy8gTElTVEVOIEZPUiBFVkVOVFNcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG9EaXNwYXRjaGVyKHRoaXMuX2Rpc3BhdGNoZXIpO1xuXG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBnYW1lIHN0YXRlIGlmIGl0cyBhbGxvd2VkXG4gICAgICogTWFrZSBzdXJlIHdlIGVtaXQgaXRcbiAgICAgKi9cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRTdGF0ZSA9PSBcIm1haW4gbWVudVwiKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgYWxsIHBsYXllcnNcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJzICAgICA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFBsYXllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdChcImdhbWUtc3RhdGVcIiwgdGhpcy5fY3VycmVudFN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgdGhpcyBmdW5jdGlvbiBhZnRlciBhbnkgcGxheWVyc3RhZSBjaGFuZ2Ugc28gd2UgY2FuIGRlY2lkZSB3aGF0IHRvIGRvLlxuICAgICAqL1xuICAgIGNoZWNrUGxheWVyU3RhdGUoKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbG9ieSBkZWNpZGUgaWYgd2UgbmVlZCB0byBzdGFydCB0aGUgZ2FtZVxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJsb2JieVwiKSB7XG4gICAgICAgICAgICBsZXQgcmVhZHlUb1N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHJlYWR5VG9TdGFydCA9IHJlYWR5VG9TdGFydCAmJiBwbGF5ZXIuY3VycmVudFN0YXRlID09PSBcInJlYWR5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJQbGF5ZXJzIGFyZSByZWFkeT8gXCIgKyByZWFkeVRvU3RhcnQpO1xuXG4gICAgICAgICAgICBpZihyZWFkeVRvU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIuYmFubmVyKFwiU1RBUlRJTkcgR0FNRVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFBsYXlpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrUGxheWVyQWN0aW9uKHAsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT09IFwicGxheWluZ1wiKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PSBcImlkbGVcIikge1xuICAgICAgICAgICAgICAgIGxldCByZWFkeVRvTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWR5VG9Nb3ZlID0gcmVhZHlUb01vdmUgJiYgcGxheWVyLmN1cnJlbnRBY3Rpb24gPT09IFwicmVhZHlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihyZWFkeVRvTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPT0gXCJiYXR0bGVcIikge1xuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UgPT09IFwiYXR0YWNrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyQXR0YWNrKHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBjdXJyZW50IHN0YXRlXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtyZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlO31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBtYWluIG1lbnVcbiAgICAgKi9cbiAgICBnZXQgbWFpbk1lbnUoKSB7cmV0dXJuIHRoaXMuX21haW5NZW51O31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBsb2JieVxuICAgICAqL1xuICAgIGdldCBsb2JieSgpIHtyZXR1cm4gdGhpcy5fbG9iYnk7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHBsYXllcnNcbiAgICAgKi9cbiAgICBnZXQgcGxheWVycygpIHtyZXR1cm4gdGhpcy5fcGxheWVyczt9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGxvY2FsIHBsYXllclxuICAgICAqL1xuICAgIGdldCBsb2NhbFBsYXllcigpIHtyZXR1cm4gdGhpcy5fbG9jYWxQbGF5ZXI7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIEN1cnJlbnQgUm9vbVxuICAgICAqL1xuICAgIGdldCByb29tKCkge3JldHVybiB0aGlzLl9yb29tO31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBVaSBSb29tXG4gICAgICovXG4gICAgZ2V0IHVpKCkge3JldHVybiB0aGlzLl91aTt9XG5cbiAgICBfc3RhcnRNZW51KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwibWFpbiBtZW51XCI7XG4gICAgfVxuXG4gICAgX3N0YXJ0TXVsdGlwbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJsb2JieVwiO1xuICAgIH1cblxuICAgIF9zdGFydFBsYXlpbmcoKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHJvb21cbiAgICAgICAgdGhpcy5fcm9vbSAgICAgICAgPSBuZXcgUm9vbSgpO1xuICAgICAgICB0aGlzLl91aSAgICAgICAgICA9IG5ldyBVaSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwicGxheWluZ1wiO1xuICAgIH1cblxuICAgIF9sb29rRm9yVHJvdWJsZSgpIHtcbiAgICAgICAgLy8gU2V0IHJvb20gdG8gbW92aW5nXG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJtb3ZpbmdcIjtcblxuICAgICAgICAvLyBTZXQgcGxheWVycyB0byB3YWxraW5nXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwid2Fsa2luZ1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGVuZW1pZXNcbiAgICAgICAgbGV0IGVuZW15ID0gbmV3IEVuZW15KCk7XG4gICAgICAgIHRoaXMuZW1pdChcImFkZC1lbmVteVwiLCBlbmVteSk7XG5cbiAgICAgICAgdGhpcy5fZW5lbWllcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgZW5lbXlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRCYXR0bGUoKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgfVxuXG4gICAgX3N0YXJ0QmF0dGxlKCkge1xuICAgICAgICB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9IFwiYmF0dGxlXCI7XG4gICAgICAgIHRoaXMuX3VpLnNldEJhdHRsZU9wdGlvbnMoKTtcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwbGF5ZXIuYmVnaW5Db21iYXQoKTtcbiAgICAgICAgICAgIHBsYXllci5jaGFyZ2VDb29sZG93bih0aGlzLl9wbGF5ZXJDb29sZG93blJlYWR5LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCgnc3RhcnQtYmF0dGxlJyk7XG4gICAgfVxuXG4gICAgX3BsYXllckNvb2xkb3duUmVhZHkocGxheWVyKSB7XG4gICAgICAgIHRoaXMuZW1pdChcInBsYXllci1jb29sZG93blwiLCBwbGF5ZXIpO1xuICAgICAgICBpZihwbGF5ZXIuY3VycmVudEFjdGlvbiA9PT0gXCJhdHRhY2tcIikge1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyQXR0YWNrKHBsYXllcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGxheWVyQXR0YWNrKHApIHtcbiAgICAgICAgaWYocC5yZWFkeVRvQXR0YWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21iYXRQaGFzZSgpO1xuICAgICAgICAgICAgcC5jaGFyZ2VDb29sZG93bih0aGlzLl9wbGF5ZXJDb29sZG93blJlYWR5LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWF0dGFja1wiLCBwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jb21iYXRQaGFzZSgpIHtcbiAgICAgICAgbGV0IHNob3VsZEVuZEJhdHRsZSA9IHRydWU7XG4gICAgICAgIGZvcihsZXQgZW5lbXkgb2YgdGhpcy5fZW5lbWllcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZW5lbXkuaGVhbHRoLS07XG4gICAgICAgICAgICBzaG91bGRFbmRCYXR0bGUgPSBzaG91bGRFbmRCYXR0bGUgJiYgKGVuZW15LmhlYWx0aCA8PSAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNob3VsZEVuZEJhdHRsZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5kQmF0dGxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZW5kQmF0dGxlKCkge1xuICAgICAgICB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICB0aGlzLl91aS5zZXRJZGxlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLmVtaXQoJ2VuZC1iYXR0bGUnKTtcblxuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHBsYXllci5lbmRDb21iYXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBldmVudHMgZnJvbSB0aGUgZGlzcGF0Y2hlciBhbmQgcmVzcG9uZCBhY29yZGluZ2x5XG4gICAgICovXG4gICAgbGlzdGVuVG9EaXNwYXRjaGVyKGRpc3BhdGNoZXIpIHtcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInN0YXJ0LWdhbWVcIiwgdGhpcy5fc3RhcnRNZW51LmJpbmQodGhpcykpO1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwic3RhcnQtbXBcIiwgICB0aGlzLl9zdGFydE11bHRpcGxheWVyLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBnYW1lIHN0YXRlIGV2ZW50c1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwiZ2FtZS1zdGF0ZVwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbWVzc2FnZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzcGF0Y2hlci5vbihcImFkZC1wbGF5ZXJcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJHYW1lOiBBZGQgUGxheWVyIG1lc3NhZ2UgcmVjaWV2ZWRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBQbGF5ZXIobWVzc2FnZS5uYW1lLCBtZXNzYWdlLmlkLCBtZXNzYWdlLmpvYik7XG5cbiAgICAgICAgICAgIHAuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBsYXllcihwLCBtZXNzYWdlLmlzTG9jYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgcGVlcnMgcGxheWVyIGZyb20gdGhlIGdhbWVcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInJlbW92ZS1wbGF5ZXJcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJHYW1lOiBSZW1vdmUgUGxheWVyIG1lc3NhZ2UgcmVjaWV2ZWRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXJzLmRlbGV0ZShtZXNzYWdlLmlkKTtcblxuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHBsYXllci5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWx0ZXIgcGxheWVyJ3Mgam9iXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJwbGF5ZXItam9iXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX3BsYXllcnMuZ2V0KG1lc3NhZ2UuaWQpO1xuICAgICAgICAgICAgcGxheWVyLmpvYiA9IG1lc3NhZ2Uuam9iO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBbHRlciBwbGF5ZXIncyBzdGF0ZVxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwicGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiR2FtZTogUmVtb3RlIFBsYXllciBTdGF0ZSBtZXNzYWdlIHJlY2lldmVkXCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX3BsYXllcnMuZ2V0KG1lc3NhZ2UuaWQpO1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IG1lc3NhZ2Uuc3RhdGU7XG5cbiAgICAgICAgICAgIC8vIFByb2dyZXNzIEdhbWUgbG9naWMgYWNjb3JpZG5nIHRvIHBsYXllciBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllclN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExpc3RlbiBmb3IgcmVtb3RlIG9wdGlvbiBzZWxlY3RcbiAgICAgICAgLy8gQ0hBTkdFIFRPIFBMQVlFUi1BQ1RJT05cbiAgICAgICAgZGlzcGF0Y2hlci5vbihcIm9wdGlvbi1zZWxlY3RcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5pZCk7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudEFjdGlvbiA9IG1lc3NhZ2Uub3B0aW9uO1xuICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllckFjdGlvbihwbGF5ZXIsIG1lc3NhZ2Uub3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIHBsYXllciByZWdhcmRsZXNzIG9mIHJlbW90ZSBvciBsb2NhbFxuICAgICAqL1xuICAgIGFkZFBsYXllcihwLCBpc0xvY2FsKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkdhbWU6IEFkZGluZyBQbGF5ZXJcIik7XG4gICAgICAgIExvZ2dlci5sb2cocCk7XG4gICAgICAgIGxldCBwbGF5ZXJzID0gdGhpcy5fcGxheWVycy52YWx1ZXMoKTtcbiAgICAgICAgbGV0IHlQb3MgPSAuODtcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgcGxheWVycykge1xuICAgICAgICAgICAgeVBvcyA9IHBsYXllci55UG9zO1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICB9XG4gICAgICAgIHlQb3MgKz0gMS4yO1xuICAgICAgICBwLnlQb3MgPSB5UG9zO1xuICAgICAgICB0aGlzLl9wbGF5ZXJzLnNldChwLmlkLCBwKTtcbiAgICAgICAgaWYoaXNMb2NhbCkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxQbGF5ZXIgPSBwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChcImFkZC1wbGF5ZXJcIiwgcCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJTZWxlY3QgSm9iXCIsXG4gICAgICAgICAgICBcIlJlYWR5XCIsXG4gICAgICAgICAgICBcIkxlYXZlXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcIkhvc3QgR2FtZVwiLFxuICAgICAgICAgICAgXCJKb2luIEdhbWVcIlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV1VSTSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAgICd3dXJtJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgdHlwZSkge1xuICAgICAgICBzdXBlcihbXSk7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3M7XG4gICAgICAgIHRoaXMueXBvcyA9IHlQb3M7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAgICAgdGhpcy5oZWFsdGggPSA1O1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgICAgIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmxldCBKT0JTID0gbmV3IE1hcCgpO1xuXG5KT0JTLnNldChcImNsYWlydm95YW50XCIsIHtcbiAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50JyxcbiAgICAnaGVhbHRoJzogNjAsXG4gICAgJ21hbmEnOiA0MCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcImhlcmJhbGlzdFwiLCB7XG4gICAgJ25hbWUnOiAnaGVyYmFsaXN0JyxcbiAgICAnaGVhbHRoJzogNDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDgwLFxuICAgICdwb3NpdGlvbic6ICdiYWNrJ1xufSk7XG5cbkpPQlMuc2V0KFwidmlsbGFpblwiLCB7XG4gICAgJ25hbWUnOiAndmlsbGFpbicsXG4gICAgJ2hlYWx0aCc6IDgwLFxuICAgICdtYW5hJzogMjAsXG4gICAgJ2Nvb2xkb3duJzogNDAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwia25pZ2h0XCIsIHtcbiAgICAnbmFtZSc6ICdrbmlnaHQnLFxuICAgICdoZWFsdGgnOiAxMDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDEwMCxcbiAgICAncG9zaXRpb24nOiAnZnJvbnQnXG59KTtcblxuSk9CUy5zZXQoXCJuZWNyb21hbmNlclwiLCB7XG4gICAgJ25hbWUnOiAnbmVjcm9tYW5jZXInLFxuICAgICdoZWFsdGgnOiA0MCxcbiAgICAnbWFuYSc6IDEyMCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnZnJvbnQnXG59KTtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIHN0YXRpYyBnZXRKb2JzKCkge1xuICAgICAgICByZXR1cm4gWy4uLkpPQlMudmFsdWVzKCldO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkLCBqb2IpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgdGhpcy5fc3RhdGVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBcImlkbGVcIixcbiAgICAgICAgICAgIFwicmVhZHlcIixcbiAgICAgICAgICAgIFwid2Fsa2luZ1wiLFxuICAgICAgICAgICAgXCJhdHRhY2tpbmdcIlxuICAgICAgICBdKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcblxuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBcInRoaW5raW5nXCI7XG5cbiAgICAgICAgaWYoam9iKSB0aGlzLmpvYiA9IGpvYjtcbiAgICB9XG5cbiAgICBzZXQgam9iKGpvYk5hbWUpIHtcbiAgICAgICAgdGhpcy5fam9iID0gSk9CUy5nZXQoam9iTmFtZSk7XG5cbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMuX2pvYi5oZWFsdGg7XG5cbiAgICAgICAgdGhpcy5tYXhNYW5hID0gdGhpcy5fam9iLm1hbmE7XG4gICAgICAgIHRoaXMubWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuXG4gICAgICAgIHRoaXMubWF4Q29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG4gICAgfVxuXG4gICAgZ2V0IGpvYigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2pvYjtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBjdXJyZW50QWN0aW9uKGFjdGlvbikge3RoaXMuX2N1cnJlbnRBY3Rpb24gPSBhY3Rpb247fVxuXG4gICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtyZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlO31cblxuICAgIGdldCBjdXJyZW50QWN0aW9uKCkge3JldHVybiB0aGlzLl9jdXJyZW50QWN0aW9uO31cblxuICAgIGdldCBuYW1lKCkge3JldHVybiB0aGlzLl9uYW1lO31cblxuICAgIGdldCBpZCgpIHtyZXR1cm4gdGhpcy5faWQ7fVxuXG4gICAgZ2V0IHJlYWR5VG9BdHRhY2soKSB7cmV0dXJuIHRoaXMuX3JlYWR5VG9BdHRhY2s7fVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBiZWdpbkNvbWJhdCgpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IFwiYWN0aW9uXCI7XG4gICAgICAgIHRoaXMuY29vbGRvd24gICAgICA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5VG9BdHRhY2sgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBlbmRDb21iYXQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlICAgPSBcImlkbGVcIjtcbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uICA9IFwidGhpbmtpbmdcIjtcbiAgICAgICAgdGhpcy5jb29sZG93biAgICAgICA9IHRoaXMubWF4Q29vbGRvd247XG4gICAgICAgIHRoaXMuX3JlYWR5VG9BdHRhY2sgPSBmYWxzZTtcbiAgICAgICAgaWYodGhpcy5fY29vbGRvd25JbnRlcnZhbCkgY2xlYXJJbnRlcnZhbCh0aGlzLl9jb29sZG93bkludGVydmFsKTtcbiAgICB9XG5cbiAgICBjaGFyZ2VDb29sZG93bihjYWxsYmFjaykge1xuICAgICAgICB0aGlzLl9jdXJyZW50QWN0aW9uID0gXCJ0aGlua2luZ1wiO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSAwO1xuXG4gICAgICAgIGlmKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5fY29vbGRvd25JbnRlcnZhbCk7XG5cbiAgICAgICAgdGhpcy5fY29vbGRvd25JbnRlcnZhbCA9IHNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICB0aGlzLmNvb2xkb3duKys7XG4gICAgICAgICAgICBpZih0aGlzLmNvb2xkb3duID49IHRoaXMubWF4Q29vbGRvd24pIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlYWR5VG9BdHRhY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCA2MCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7XG5pbXBvcnQgTG9nZ2VyICAgIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmxldCBGSUxMQUJMRSA9IG5ldyBTZXQoW1xuICAgIFwiZW5lbWllc1wiLFxuICAgIFwidHlwZVwiLFxuICAgIFwiaXNNb3ZpbmdcIixcbiAgICBcImlzQmF0dGxlXCIsXG4gICAgXCJpc0xvb2tpbmdcIixcbiAgICBcIm5leHRFbmNvdW50ZXJcIixcbiAgICBcImVuY291bnRlclJhdGVcIixcbiAgICBcInRpY2tDb3VudFwiXG5dKTtcblxuY2xhc3MgUm9vbSBleHRlbmRzIEJhc2VNb2RlbCB7XG5cblxuICAgIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBcImlkbGVcIixcbiAgICAgICAgICAgIFwibW92aW5nXCIsXG4gICAgICAgICAgICBcImJhdHRsZVwiXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgIH1cblxuICAgIGxvb2tGb3JUcm91YmxlKCkge1xuICAgIH1cblxuICAgIHN0b3BMb29raW5nKCkge1xuICAgIH1cblxuICAgIGVuZEJhdHRsZSgpIHtcbiAgICB9XG5cbiAgICBzdGFydEJhdHRsZSgpIHtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvb207XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9iYXR0bGVPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJhdHRhY2tcIixcbiAgICAgICAgICAgIFwiYWJpbGl0eVwiLFxuICAgICAgICAgICAgXCJpdGVtXCIsXG4gICAgICAgICAgICBcImRlZmVuZFwiXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fcm9vbU9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJtYW5hZ2VcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fcm9vbU9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE9wdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0QmF0dGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9iYXR0bGVPcHRpb25zO1xuICAgIH1cblxuICAgIHNldElkbGVPcHRpb25zKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IHRoaXMuX3Jvb21PcHRpb25zO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGlkKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgd2luZG93LmtleXByZXNzLkxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoSW5wdXQodGhpcy5saXN0ZW5lcik7XG4gICAgfVxuXG4gICAgYXR0YWNoSW5wdXQobGlzdGVuZXIpIHtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwidXBcIiwgKCkgPT4gdGhpcy5lbWl0KFwidXBcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJrXCIsICgpID0+IHRoaXMuZW1pdChcInVwXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJkb3duXCIsICgpID0+IHRoaXMuZW1pdChcImRvd25cIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJqXCIsICgpID0+IHRoaXMuZW1pdChcImRvd25cIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImxlZnRcIiwgKCkgPT4gdGhpcy5lbWl0KFwibGVmdFwiKSk7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImhcIiwgKCkgPT4gdGhpcy5lbWl0KFwibGVmdFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwicmlnaHRcIiwgKCkgPT4gdGhpcy5lbWl0KFwicmlnaHRcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsXCIsICgpID0+IHRoaXMuZW1pdChcInJpZ2h0XCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJlbnRlclwiLCAoKT0+IHRoaXMuZW1pdChcImNvbmZpcm1cIikpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi9Mb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgaG9zdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgaWYoaG9zdClcbiAgICAgICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pZCA9IFwiaG9zdFwiO1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcGVlciBjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX3BlZXIgPSBuZXcgUGVlcih0aGlzLl9pZCwge1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdvcGVuJywgKGlkKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhgUGVlciBDb25uZWN0aW9uIGNyZWF0ZWQsIFBlZXIgSUQgaXMgJHtpZH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2Uga25vdyBhYm91dCBhIHBlZXIgdGhlbiBjb25uZWN0XG4gICAgICAgICAgICAgICAgaWYodGhpcy5faG9zdClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdCh0aGlzLl9ob3N0KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIGEgcGVlciBjb25uZWN0cyBoYW5kbGUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdjb25uZWN0aW9uJywgKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGFsbG93IG1vcmUgdGhhbiA0IHBsYXllcnNcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuc2l6ZSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdvcGVuJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlBlZXIgaGFzIGNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGVlciA9IHRoaXMuYWRkUGVlcihjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvUGVlcihwZWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRQZWVyKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgbGV0IHBlZXIgPSB7XG4gICAgICAgICAgICBcImNvbm5lY3Rpb25cIjogY29ubmVjdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcGVlcnMuc2V0KGNvbm5lY3Rpb24ucGVlciwgcGVlcik7XG5cbiAgICAgICAgY29ubmVjdGlvbi5vbignZGF0YScsICB0aGlzLmhhbmRsZURhdGEuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgY29ubmVjdGlvbi5vbignY2xvc2UnLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQZWVyKHBlZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcGVlcjtcbiAgICB9XG5cbiAgICBjb25uZWN0VG9QZWVyKHBlZXIpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwicGVlci1jb25uZWN0XCIsXG4gICAgICAgICAgICBcImZyb21cIjogdGhpcy5faWQsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiB0aGlzLl9uYW1lLFxuICAgICAgICAgICAgICAgIFwiam9iXCI6IHRoaXMuX3NlbGVjdGVkSm9iIHx8IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBlZXJzID0gW107XG4gICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy5rZXlzKCkpIHtcbiAgICAgICAgICAgIHBlZXJzLnB1c2gocGVlcik7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZS5kYXRhLnBlZXJzID0gcGVlcnM7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKGBTZW5kaW5nIHBlZXItY29ubmVjdCBtZXNzYWdlIHRvIHBlZXIgd2l0aCBpZCAke3BlZXJ9YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmhhc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGVlcihwZWVyKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIlJlbW92ZSBwZWVyXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWRpc2Nvbm5lY3RcIiwgcGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgICAgICB0aGlzLl9wZWVycy5kZWxldGUocGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX3BlZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgbWVzc2FnZSB0byBhbGwgcGVlcnNcbiAgICAgKi9cbiAgICBfc2VuZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBpZih0aGlzLl9wZWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIHRoaXMuX3BlZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGF5ZXJTdGF0ZShzdGF0ZSkge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItc3RhdGVcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHN0YXRlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGpvYlNlbGVjdChqb2IpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwiam9iLXNlbGVjdFwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIFwiam9iXCI6IGpvYlxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zZWxlY3RlZEpvYiA9IGpvYjtcbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgb3B0aW9uU2VsZWN0KG9wdGlvbikge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIFwiZXZlbnRcIjogXCJvcHRpb24tc2VsZWN0XCIsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgXCJvcHRpb25cIjogb3B0aW9uXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VuZE1lc3NhZ2UobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRGF0YShtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhgTWVzc2FnZSByZWNpZXZlZCBmcm9tIHBlZXIgd2l0aCBpZCAke21lc3NhZ2UuZnJvbX1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICAvLyBHcmFiIGRhdGEgZnJvbSBtZXNzYWdlXG4gICAgICAgIGxldCBkYXRhID0gbWVzc2FnZS5kYXRhO1xuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwZWVyLWNvbm5lY3RcIikge1xuICAgICAgICAgICAgLy8gU2VlIGlmIHRoaXMgcGVlciBrbm93cyBhYm91dCBhbnkgb3RoZXIgcGVlcnMgYW5kIGFkZCBpZiB3ZSBkb24ndCBrbm93IHRoZW1cbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiBkYXRhLnBlZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3BlZXJzLmdldChwZWVyKSAmJiBwZWVyICE9PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoYEFkZGluZyBQZWVyIHdpdGggaWQgJHtwZWVyfWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHBlZXIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlZSBpZiB3ZSBoYXZlIGFscmVhZHkgY29ubmVjdGVkIHRvIHRoaXMgcGVlclxuICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkgJiYgIXRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pLmhhc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvUGVlcih0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBlZXItY29ubmVjdFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwbGF5ZXItc3RhdGVcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIG1lc3NhZ2UuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwiam9iLXNlbGVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJqb2Itc2VsZWN0XCIsIG1lc3NhZ2UuZGF0YSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwib3B0aW9uLXNlbGVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJvcHRpb24tc2VsZWN0XCIsIG1lc3NhZ2UuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gJy4vTG9nZ2VyLmpzJztcblxubGV0IHJlc291cmNlRGlyID0gJy4vZGlzdC9yZXNvdXJjZXMvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRJbWFnZShyZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXMoaW1nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltZy5zcmMgPSByZXNvdXJjZURpciArICdpbWFnZXMvJyArIHJlc291cmNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzZWVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUk5HIENSRUFURVwiKTtcbiAgICAgICAgdGhpcy5fcm5nID0gbmV3IFJORyhzZWVkKTtcbiAgICAgICAgd2luZG93LnJuZyA9IHRoaXMuX3JuZztcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm5nLnJhbmRvbSgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9zb3VuZFBhdGggPSBcIi4vZGlzdC9yZXNvdXJjZXMvc291bmRzL1wiO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIGlmKENvbmZpZy5ESVNBQkxFX0FVRElPKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgbGV0IHNvdW5kcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJtZW51LW1vdmVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcIm1lbnUtbW92ZS5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJtZW51LXNlbGVjdFwiLFxuICAgICAgICAgICAgICAgIFwidXJsXCI6IHRoaXMuX3NvdW5kUGF0aCArIFwibWVudS1zZWxlY3QubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiY29vbGRvd24tcmVhZHlcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcImNvb2xkb3duLXJlYWR5Lm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvbWJhdC10aGVtZVwiLFxuICAgICAgICAgICAgICAgIFwidXJsXCI6IHRoaXMuX3NvdW5kUGF0aCArIFwicXJ0cm5vdGVxb21iYXQuZ2IubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZHVuZ2Vvbi10aGVtZVwiLFxuICAgICAgICAgICAgICAgIFwidXJsXCI6IHRoaXMuX3NvdW5kUGF0aCArIFwiZHVuZ2VvbmRlbGF5LmdiLm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3NvdW5kcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICBmb3IobGV0IHNvdW5kIG9mIHNvdW5kcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICAgICAgLy8gTG9hZCB0aGUgc291bmRcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZHMuc2V0KHNvdW5kLm5hbWUsIG5ldyBIb3dsKHtcbiAgICAgICAgICAgICAgICAgICAgdXJsczogW3NvdW5kLnVybF0sXG4gICAgICAgICAgICAgICAgICAgIG9ubG9hZDogcmVzLFxuICAgICAgICAgICAgICAgICAgICBvbmxvYWRlcnJvcjogcmVqXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICBwbGF5KHNvdW5kTmFtZSwgbG9vcCkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykgcmV0dXJuO1xuICAgICAgICBsZXQgc291bmQgPSB0aGlzLl9zb3VuZHMuZ2V0KHNvdW5kTmFtZSk7XG4gICAgICAgIHNvdW5kLmxvb3AobG9vcCB8fCBmYWxzZSk7XG4gICAgICAgIHNvdW5kLnBsYXkoKTtcbiAgICB9XG5cbiAgICBzdG9wKHNvdW5kTmFtZSkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykgcmV0dXJuO1xuICAgICAgICBsZXQgc291bmQgPSB0aGlzLl9zb3VuZHMuZ2V0KHNvdW5kTmFtZSk7XG4gICAgICAgIHNvdW5kLnN0b3AoKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGxpbWl0bG9vcChmbiwgZnBzKSB7XG4gICAgICAgIC8vIFVzZSB2YXIgdGhlbiA9IERhdGUubm93KCk7IGlmIHlvdVxuICAgICAgICAvLyBkb24ndCBjYXJlIGFib3V0IHRhcmdldHRpbmcgPCBJRTlcbiAgICAgICAgdmFyIHRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBjdXN0b20gZnBzLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gNjBcbiAgICAgICAgZnBzID0gZnBzIHx8IDYwO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgICAgICAgICAgLy8gYWdhaW4sIERhdGUubm93KCkgaWYgaXQncyBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAvLyBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCkgaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBqdXN0IFxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZW4gPSBub3csIHdoaWNoIGNhbiBlbmQgdXAgbG93ZXJpbmcgb3ZlcmFsbCBmcHNcbiAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZm5cbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KDApKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzcGVjdEhlaWdodENhbGModzIpIHtcbiAgICAgICAgbGV0IHcxID0gMTkyMDtcbiAgICAgICAgbGV0IGgxID0gMTA4MDtcbiAgICAgICAgcmV0dXJuIGgxKncyL3cxO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZVF1ZXJ5KHNlYXJjaCkge1xuICAgICAgICB2YXIgYXJncyA9IHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcblxuICAgICAgICB2YXIgYXJnc1BhcnNlZCA9IHt9O1xuXG4gICAgICAgIHZhciBpLCBhcmcsIGt2cCwga2V5LCB2YWx1ZTtcblxuICAgICAgICBmb3IgKGk9MDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICAgICAgaWYgKC0xID09PSBhcmcuaW5kZXhPZignPScpKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2RlY29kZVVSSUNvbXBvbmVudChhcmcpLnRyaW0oKV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBrdnAgPSBhcmcuc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMF0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFsxXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJnc1BhcnNlZDtcbiAgICB9XG5cbiAgICAvLyBHb29kZW5vdWdoIFVVSUQ/XG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDcyNjkwOS9yYW5kb20tYWxwaGEtbnVtZXJpYy1zdHJpbmctaW4tamF2YXNjcmlwdFxuICAgIHJhbmRvbVN0cmluZyhsZW5ndGgsIGNoYXJzKSB7XG4gICAgICAgIGlmKCFjaGFycykge1xuICAgICAgICAgICAgY2hhcnMgPSAnMDEyMzQ1Njc4OWFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonO1xuICAgICAgICB9XG4gICAgICAgIGxldCByZXN1bHQgPSAnJztcbiAgICAgICAgZm9yIChsZXQgaSA9IGxlbmd0aDsgaSA+IDA7IC0taSkgcmVzdWx0ICs9IGNoYXJzW01hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChjaGFycy5sZW5ndGggLSAxKSldO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5cbi8vIEltcG9ydCBTZXJ2aWNlc1xuaW1wb3J0IElucHV0U2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9LZXlib2FyZElucHV0U2VydmljZSc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgU291bmRTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1NvdW5kU2VydmljZSc7XG5cbi8vIEltcG9ydCB2aWV3c1xuaW1wb3J0IFBsYXllclZpZXcgICBmcm9tICcuL1BsYXllclZpZXcnO1xuaW1wb3J0IEVuZW15VmlldyAgICBmcm9tICcuL0VuZW15Vmlldyc7XG5pbXBvcnQgUm9vbVZpZXcgICAgIGZyb20gJy4vUm9vbVZpZXcnO1xuaW1wb3J0IE1haW5NZW51VmlldyBmcm9tICcuL01haW5NZW51Vmlldyc7XG5pbXBvcnQgTG9iYnlWaWV3ICAgIGZyb20gJy4vTG9iYnlWaWV3JztcbmltcG9ydCBVaVZpZXcgICAgICAgZnJvbSAnLi9VaVZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LmJvZHk7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcblxuICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgSGFuZGxlclxuICAgICAqIEB0b2RvOiBkb2VzIHRoaXMgYmVsb25nIGhlcmU/XG4gICAgICovXG4gICAgcmVzaXplKCkge1xuICAgICAgICBDb25maWcuY2FsY3VsYXRlKCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGluaXQoZ2FtZSkge1xuICAgICAgICB0aGlzLl9nYW1lID0gZ2FtZTtcblxuICAgICAgICB0aGlzLl9pbnB1dFNlcnZpY2UgPSBuZXcgSW5wdXRTZXJ2aWNlKCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIEF0dGFjaCByZXNpemUgZXZlbnRcbiAgICAgICAgLy93aW5kb3cucmVzaXplID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgdGhpcy5saXN0ZW5Ub0dhbWVFdmVudHModGhpcy5fZ2FtZSk7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJJbnB1dEhhbmRsZXJzKHRoaXMuX2lucHV0U2VydmljZSk7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2NvZGV0aGVvcnkuaW4vY29udHJvbGxpbmctdGhlLWZyYW1lLXJhdGUtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGRlbHRhID0gbm93IC0gdGhpcy50aGVuO1xuXG4gICAgICAgIC8vIElmIHRoZSBmcHMgaW50ZXJ2YWwgaXMgY29ycmVjdFxuICAgICAgICBpZiAoZGVsdGEgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGltZSBzaW5jZSBsYXN0IGZyYW1lXG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZGVsdGEgJSB0aGlzLmludGVydmFsKTtcblxuICAgICAgICAgICAgLy8gU2V0IHVwIFJlbmRlcmluZ1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB0aGlzLl9mcmFtZSB8fCAxO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSAodGhpcy5fZnJhbWUlQ29uZmlnLkZQUykgPyB0aGlzLl9mcmFtZSA6IDE7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBnYW1lXG4gICAgICAgICAgICB0aGlzLnJlbmRlcih0aGlzLl9mcmFtZSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBuZXh0IHJlbmRlciBjeWNsZVxuICAgICAgICAgICAgbGV0IHRpbWVfZWwgPSAodGhpcy50aGVuIC0gdGhpcy5maXJzdCkvMTAwMDtcbiAgICAgICAgICAgICsrdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgbGV0IGZwcyA9IHBhcnNlSW50KHRoaXMuY291bnRlci90aW1lX2VsKTtcblxuICAgICAgICAgICAgLy8gU2hvdyBGUFNcbiAgICAgICAgICAgIGxldCBmb250U2l6ZSAgICAgICAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dCh0aGlzLl9mcmFtZSArIFwiL1wiICsgQ29uZmlnLkZQUyArIFwiIFwiICsgZnBzICsgXCJmcHNcIiwgMjAsIDIwKTtcblxuICAgICAgICAgICAgLy8gSW5jcmVtZW50IEZyYW1lXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGZyYW1lKSB7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCAgICAgICAgICAgICAgPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ICAgICAgICAgICAgID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCgwLCAwLCBDb25maWcuQ0FOVkFTX1dJRFRILCBDb25maWcuQ0FOVkFTX0hFSUdIVCk7XG5cbiAgICAgICAgZm9yKGxldCB2aWV3IG9mIHRoaXMuX3ZpZXdzKSAge1xuICAgICAgICAgICAgdmlldy5yZW5kZXIodGhpcy5fY3R4LCBmcmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNYWluTWVudVZpZXdzKCkge1xuICAgICAgICBsZXQgdmlld3MgPSBbXTtcblxuICAgICAgICBpZih0aGlzLl9tYWluTWVudVZpZXcpIHtcbiAgICAgICAgICAgIHZpZXdzLnB1c2godGhpcy5fbWFpbk1lbnVWaWV3KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2aWV3cztcbiAgICB9XG5cbiAgICBzdGFydFJlbmRlcigpIHtcbiAgICAgICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAvQ29uZmlnLkZQUztcbiAgICAgICAgdGhpcy5maXJzdCA9IHRoaXMudGhlbjtcbiAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5fcmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgZ2FtZSBldmVudHMgc28gd2UgY2FuIGFkanVzdCByZW5kZXJlclxuICAgICAqL1xuICAgIGxpc3RlblRvR2FtZUV2ZW50cyhnYW1lKSB7XG4gICAgICAgIGdhbWUub24oXCJnYW1lLXN0YXRlXCIsIChtZXNzYWdlKT0+IHtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlZpZXcgR2FtZSBTdGF0ZSBFdmVudFwiKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICBpZihtZXNzYWdlID09IFwibWFpbiBtZW51XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgcmVuZGVyaW5nIHRoZW4gc3RhcnRcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fcmVuZGVyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1haW5NZW51VmlldyA9IG5ldyBNYWluTWVudVZpZXcoZ2FtZS5tYWluTWVudSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgbWFpbk1lbnVWaWV3LmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51VmlldyA9IG1haW5NZW51VmlldztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KFt0aGlzLl9tYWluTWVudVZpZXddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PSBcImxvYmJ5XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9iYnlWaWV3ID0gbmV3IExvYmJ5VmlldyhnYW1lLmxvYmJ5LCBnYW1lLnBsYXllcnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGxvYmJ5Vmlldy5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcgPSBsb2JieVZpZXc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gbmV3IFNldChbdGhpcy5fbG9iYnlWaWV3XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYobWVzc2FnZSA9PSBcInBsYXlpbmdcIikge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyByb29tIHZpZXdcbiAgICAgICAgICAgICAgICBsZXQgcm9vbVZpZXcgPSBuZXcgUm9vbVZpZXcoZ2FtZS5yb29tKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb29tVmlldyA9IHJvb21WaWV3O1xuXG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2VzID0gW1xuICAgICAgICAgICAgICAgICAgICByb29tVmlldy5sb2FkUmVzb3VyY2VzKClcbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZpZXdzID0gW107XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYWxsIG9mIG91ciBwbGF5ZXIgdmlld3NcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiBnYW1lLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllclZpZXcgPSBuZXcgUGxheWVyVmlldyhwbGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHBsYXllclZpZXcubG9hZFJlc291cmNlcygpKTtcbiAgICAgICAgICAgICAgICAgICAgdmlld3MucHVzaChwbGF5ZXJWaWV3KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyVmlld3Muc2V0KHBsYXllci5pZCwgcGxheWVyVmlldyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHVpVmlldyA9IG5ldyBVaVZpZXcoZ2FtZS51aSwgZ2FtZS5wbGF5ZXJzLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcgPSB1aVZpZXc7XG4gICAgICAgICAgICAgICAgLy91aVZpZXcucmVxdWVzdElucHV0KCkudGhlbih0aGlzLmhhbmRsZVVpSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh1aVZpZXcubG9hZFJlc291cmNlcygpKTtcblxuICAgICAgICAgICAgICAgIC8vIExvYWQgc291bmRzXG4gICAgICAgICAgICAgICAgbGV0IHNvdW5kU2VydmljZSA9IG5ldyBTb3VuZFNlcnZpY2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UgPSBzb3VuZFNlcnZpY2U7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzb3VuZFNlcnZpY2UubG9hZFJlc291cmNlcygpKTtcblxuICAgICAgICAgICAgICAgIC8vIEFmdGVyIGFsbCByZW5kZXJlcnMgYXJlIHJlYWR5IGxldCB0aGUgZGlzcGF0Y2hlciBrbm93XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb29tVmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnZpZXdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdChcInJlbmRlci1yZWFkeVwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcImFkZC1wbGF5ZXJcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKGdhbWUuY3VycmVudFN0YXRlID09PSBcImxvYnlcIilcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcuX3JlYWR5ID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJhZGQtZW5lbXlcIiwgKGVuZW15KT0+e1xuICAgICAgICAgICAgbGV0IGVuZW15VmlldyA9IG5ldyBFbmVteVZpZXcoZW5lbXkpO1xuICAgICAgICAgICAgZW5lbXlWaWV3LmxvYWRSZXNvdXJjZXMoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fZW5lbXlWaWV3cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVteVZpZXdzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlWaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5fZW5lbXlWaWV3c1xuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15Vmlld3MgPSBbZW5lbXlWaWV3XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInN0YXJ0LWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJjb21iYXQtdGhlbWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl92aWV3cyA9IFtcbiAgICAgICAgICAgICAgICAuLi50aGlzLl92aWV3cyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9lbmVteVZpZXdzXG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwicGxheWVyLWNvb2xkb3duXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBpZihwbGF5ZXIuaXNMb2NhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwiY29vbGRvd24tcmVhZHlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJwbGF5ZXItYXR0YWNrXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBpZihwbGF5ZXIgPT0gdGhpcy5fZ2FtZS5sb2NhbFBsYXllcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5jbGVhckxhc3RPcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcImVuZC1iYXR0bGVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5zdG9wKFwiY29tYmF0LXRoZW1lXCIpO1xuICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fcGxheWVyVmlld3MudmFsdWVzKCksXG4gICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3XG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVVaUlucHV0KGlucHV0KSB7XG4gICAgICAgIHRoaXMuZW1pdChcIm9wdGlvbi1zZWxlY3RcIiwgaW5wdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGlucHV0IHRvIGFsdGVyIHZpZXcgYW5kIHNlZSBpZiB3ZSBuZWVkIHRvIHNlbmQgZW52ZW50c1xuICAgICAqL1xuICAgIHJlZ2lzdGVySW5wdXRIYW5kbGVycyhpbnB1dCkge1xuICAgICAgICAvLyBVcCBpbnB1dFxuICAgICAgICBpbnB1dC5vbihcInVwXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRG93biBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImRvd25cIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFpbiBtZW51XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51Vmlldy5kb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5kb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGVmdCBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImxlZnRcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3LmxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSaWdodCBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcInJpZ2h0XCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5yaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcucmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb25maXJtIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiY29uZmlybVwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LmNvbmZpcm0odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb2JieVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcuY29uZmlybSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcuY29uZmlybSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtc2VsZWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQmFjayBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImJhY2tcIiwgKCk9PntcblxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGVuZW15KSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5fZW5lbXkgPSBlbmVteTtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic3ByaXRlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNwcml0ZSxcbiAgICAgICAgICAgIHNwcml0ZS53aWR0aC8zKnRoaXMuZnJhbWUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMywgLy8gZFdpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMiwgLy8gZEhlaWdodFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICAxMCwgLy8gWXBvc1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMypDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5pbXBvcnQgUGxheWVyICAgICAgICAgIGZyb20gJy4uL21vZGVscy9vYmplY3RzL1BsYXllcic7XG5cbmxldCBqb2JEaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+U2VsZWN0IEpvYjwvaDM+XG4gICAgICAgIDxsYWJlbD5Kb2I6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgbmFtZT1cImpvYlwiPlxuICAgICAgICA8L3NlbGVjdD48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNvbmZpcm1cIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihsb2JieSwgcGxheWVycywgdmlldykge1xuICAgICAgICBzdXBlcihsb2JieSk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ID0gbG9iYnk7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLl9wbGF5ZXJzID0gcGxheWVycztcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvcGVuSm9iRGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhqb2JEaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG4gICAgICAgIGxldCBjb25maXJtQnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY29uZmlybVwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBqb2JTZWxlY3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdFtuYW1lPVwiam9iXCJdJyk7XG5cbiAgICAgICAgZm9yKGxldCBqb2Igb2YgUGxheWVyLmdldEpvYnMoKSkge1xuICAgICAgICAgICAgbGV0IGpvYk9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICBqb2JPcHRpb24udmFsdWUgPSBqb2IubmFtZTtcbiAgICAgICAgICAgIGpvYk9wdGlvbi5pbm5lckhUTUwgPSBqb2IubmFtZTtcbiAgICAgICAgICAgIGpvYlNlbGVjdC5hcHBlbmRDaGlsZChqb2JPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlldy5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6ICgpPT57XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKGpvYlNlbGVjdC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmVtaXQoXCJqb2Itc2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiam9iXCI6IGpvYlNlbGVjdC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5fdmlldy5fZ2FtZS5sb2NhbFBsYXllci5pZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgIGxldCB4UG9zID0gMTAwO1xuICAgICAgICBsZXQgeVBvcyA9IDEwMDtcblxuICAgICAgICBjdHguZmlsbFRleHQoXCJOQU1FOlwiLCAxMDAsIHlQb3MpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJKT0I6XCIsIDMwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIlJFQURZOlwiLCA1MDAsIHlQb3MpO1xuICAgICAgICBjdHguc3Ryb2tlUmVjdCg5MCwgMTEwLCA2MDAsIDE4MCk7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMuX3BsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICB5UG9zICs9IDQwO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHBsYXllci5uYW1lLCAxMDAsIHlQb3MpO1xuXG4gICAgICAgICAgICBpZihwbGF5ZXIuam9iKSB7XG4gICAgICAgICAgICAgICAgbGV0IGpvYk5hbWUgPSBwbGF5ZXIuam9iLm5hbWVbMF0udG9VcHBlckNhc2UoKSArIHBsYXllci5qb2IubmFtZS5zbGljZSgxKTs7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGpvYk5hbWUsIDMwMCwgeVBvcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllci5jdXJyZW50U3RhdGUgPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIk5PVCBSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgeFBvcywgMzIwKTtcbiAgICAgICAgICAgIHhQb3MgKz0gMjAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgbGVmdCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgtLTtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgrKztcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiU2VsZWN0IEpvYlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSm9iRGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJMZWF2ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwibGVhdmUtZ2FtZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiUmVhZHlcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlYWR5ID0gIXRoaXMuX3JlYWR5O1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcuZW1pdChcInJlYWR5XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHRoaXMuX3JlYWR5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICB9XG5cblxuXG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxubGV0IGhvc3REaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+SG9zdCBNdWx0aXBsYXllciBHYW1lPC9oMz5cbiAgICAgICAgPGxhYmVsPk5hbWU6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCI+XG4gICAgICAgIDxsYWJlbD5JZCAob3B0aW9uYWwpOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiPjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiaG9zdFwiIGRpc2FibGVkPkhvc3Q8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5sZXQgam9pbkRpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5Kb2luIE11bHRpcGxheWVyIEdhbWU8L2gzPlxuICAgICAgICA8bGFiZWw+TmFtZTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIj5cbiAgICAgICAgPGxhYmVsPkhvc3QgSWQ6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJob3N0XCI+XG4gICAgICAgIDxsYWJlbD5JZCAob3B0aW9uYWwpOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiPjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiam9pblwiIGRpc2FibGVkPkpvaW48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKG1haW5NZW51LCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKG1haW5NZW51KTtcbiAgICAgICAgdGhpcy5fbWFpbk1lbnUgPSBtYWluTWVudTtcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9kaWFsb2dPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSAxMDA7XG4gICAgICAgIGxldCB5UG9zID0gMTAwO1xuXG4gICAgICAgIGZvcihsZXQgbWVudU9wdGlvbiBvZiB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgICAgbGV0IG1lbnVPcHRpb25UZXh0ID0gbWVudU9wdGlvbjtcblxuICAgICAgICAgICAgLy8gU2hvdyBzZWxlY3QgY3Vyc29yXG4gICAgICAgICAgICBpZihtZW51T3B0aW9uVGV4dCA9PSB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XSlcbiAgICAgICAgICAgICAgICBtZW51T3B0aW9uVGV4dCA9IFwiPiBcIiArIG1lbnVPcHRpb25UZXh0O1xuXG4gICAgICAgICAgICAvLyBEcmF3IE1lbnUgT3B0aW9uXG4gICAgICAgICAgICBjdHguZmlsbFRleHQobWVudU9wdGlvblRleHQsIDEwMCwgeVBvcyk7XG4gICAgICAgICAgICB5UG9zICs9IDEwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdO1xuICAgIH1cblxuICAgIG9wZW5Ib3N0RGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhob3N0RGlhbG9nLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2MuZmlyc3RDaGlsZDtcblxuICAgICAgICBsZXQgaG9zdEJ1dHRvbiAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImhvc3RcIl0nKTtcbiAgICAgICAgbGV0IGNhbmNlbEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjYW5jZWxcIl0nKTtcblxuICAgICAgICBsZXQgbmFtZUlucHV0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBsZXQgaWRJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaWRcIl0nKTtcblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIG5hbWVJbnB1dC5vbmlucHV0ID0gKCk9PntcbiAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBob3N0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3N0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9kaWFsb2cgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZW1pdChcInN0YXJ0LW1wXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZElucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvcGVuSm9pbkRpYWxvZyh2aWV3KSB7XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcbiAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoam9pbkRpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cblxuICAgICAgICBsZXQgam9pbkJ1dHRvbiAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImpvaW5cIl0nKTtcbiAgICAgICAgbGV0IGNhbmNlbEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjYW5jZWxcIl0nKTtcblxuICAgICAgICBsZXQgbmFtZUlucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGxldCBob3N0SW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImhvc3RcIl0nKTtcbiAgICAgICAgbGV0IGlkSW5wdXQgICAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaWRcIl0nKTtcblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIGxldCBjaGVja0lucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICYmIGhvc3RJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICBqb2luQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqb2luQnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBuYW1lSW5wdXQub25pbnB1dCA9IGNoZWNrSW5wdXQuYmluZCh0aGlzKTtcbiAgICAgICAgaG9zdElucHV0Lm9uaW5wdXQgPSBjaGVja0lucHV0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpvaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9kaWFsb2cgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICYmIGhvc3RJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5lbWl0KFwic3RhcnQtbXBcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9zdElkOiBob3N0SW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaWRJbnB1dC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXAoKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA/IDAgOiAxO1xuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudXAoKTtcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiSG9zdCBHYW1lXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ib3N0RGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Kb2luRGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2soKSB7XG4gICAgICAgIHRoaXMuY2xvc2VEaWFsb2coKTtcbiAgICB9XG5cblxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIGxvYWRSZXNvdXJjZShuYW1lLCByZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy8nICsgcmVzb3VyY2U7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHJlc291cmNlIGNyZWF0ZSBpdFxuICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5zZXQobmFtZSwgaW1nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgYWxsIHJlc291cmNlcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBvYmplY3RcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZVNlcnZpY2UubG9hZEltYWdlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgUHJvbWlzZS5hbGwocmVzb3VyY2VQcm9taXNlcykudGhlbigoaW1hZ2VzKT0+e1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9yZXNvdXJjZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBQcm9taXNlXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5cbmxldCBKT0JfU1BSSVRFUyA9IHtcbiAgICBcImNsYWlydm95YW50XCI6IFwiY2xhaXJ2b3lhbnQtc2hlZXQucG5nXCIsXG4gICAgXCJoZXJiYWxpc3RcIjogXCJoZXJiYWxpc3Qtc2hlZXQucG5nXCIsXG4gICAgXCJ2aWxsYWluXCI6IFwidmlsbGFpbjItc2hlZXQucG5nXCIsXG4gICAgXCJrbmlnaHRcIjogXCJrbmlnaHQtc2hlZXQucG5nXCIsXG4gICAgXCJuZWNyb21hbmNlclwiOiBcIm5lY3JvbWFuY2VyLXNoZWV0LnBuZ1wiLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIpIHtcbiAgICAgICAgc3VwZXIocGxheWVyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJWSUVXXCIpO1xuICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIpO1xuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNwcml0ZVwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogSk9CX1NQUklURVNbcGxheWVyLmpvYi5uYW1lXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic2hhZG93XCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInNoYWRvdy5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYnViYmxlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcImJ1YmJsZS5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgICAgICA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcblxuICAgICAgICBsZXQgcGxheWVyV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgICAgICBsZXQgeE9mZnNldCA9IENvbmZpZy5USUxFX1ggLSAzO1xuICAgICAgICBpZih0aGlzLl9wbGF5ZXIucG9zaXRpb24gPT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgIHhPZmZzZXQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzaGFkb3cgICAgICA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpO1xuXG4gICAgICAgIGxldCBidWJibGUgICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKTtcbiAgICAgICAgbGV0IGJ1YmJsZVdpZHRoICA9IGJ1YmJsZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBsZXQgYnViYmxlSGVpZ2h0ID0gYnViYmxlLmhlaWdodC81KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgLy8gRHJhdyBTaGFkb3dcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICBzaGFkb3csXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIHNoYWRvdy53aWR0aCwgLy8gZFdpZHRoXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHhPZmZzZXQqKHBsYXllcldpZHRoKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggcGxheWVyIFggUG9zXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpICsgKHBsYXllcldpZHRoKSAtIChDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpLmhlaWdodC8xLjc1KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggcGxheWVyIFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuXG4gICAgICAgIC8vIERyYXcgUGxheWVyIFNwcml0ZVxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLFxuICAgICAgICAgICAgdGhpcy5fcGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJ3YWxraW5nXCIgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUpIDogMCwgLy8gRFhcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBEcmF3IEJ1YmJsZVxuICAgICAgICBsZXQgYnViYmxlT2Zmc2V0ID0gMDtcbiAgICAgICAgc3dpdGNoKHRoaXMuX3BsYXllci5jdXJyZW50QWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwidGhpbmtpbmdcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImF0dGFja1wiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkZWZlbmRcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpdGVtXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYWJpbGl0eVwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSo0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5fcGxheWVyLmN1cnJlbnRBY3Rpb24gIT09IFwid2Fsa1wiICYmIHRoaXMuX3BsYXllci5jdXJyZW50QWN0aW9uICE9PSBcInJlYWR5XCIpIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ2J1YmJsZScpLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0LCAvLyBEWVxuICAgICAgICAgICAgICAgIGJ1YmJsZS53aWR0aCwgIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgIGJ1YmJsZS5oZWlnaHQvNSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgIHhPZmZzZXQqKHBsYXllcldpZHRoKSAtIChidWJibGVXaWR0aC8xLjUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpIC0gKGJ1YmJsZUhlaWdodC8xLjUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgICAgICBidWJibGVXaWR0aCwgIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIGJ1YmJsZUhlaWdodCAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG4vLyBTdGF0aWMgUm9vbSBUeXBlc1xuLy9zdGF0aWMgZ2V0IFRZUEVfQ0FWRSgpIHtcbiAgICAvL3JldHVybiB7XG4gICAgICAgIC8vZmxvb3I6ICdnb29kdGlsZS5wbmcnLFxuICAgICAgICAvL3dhbGw6ICdzaGl0d2FsbC5wbmcnXG4gICAgLy99O1xuLy99XG5cbi8vc3RhdGljIGdldCBUWVBFX1RFTVBMRSgpIHtcbiAgICAvL3JldHVybiB7XG4gICAgICAgIC8vZmxvb3I6ICdncmFzcy5wbmcnLFxuICAgICAgICAvL3dhbGw6ICdwaWxsYXJzLnBuZydcbiAgICAvL307XG4vL31cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihyb29tKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3Jvb20gPSByb29tO1xuICAgICAgICB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgID0gMDtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiZmxvb3JcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwiZ29vZHRpbGUucG5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIndhbGxcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwic2hpdHdhbGwyLnBuZ1wiLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcImZsb29yXCIsIFwiZ29vZHRpbGUucG5nXCIpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoXCJ3YWxsXCIsICBcInNoaXR3YWxsMi5wbmdcIilcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSAgICAgID0gKGZyYW1lIDwgQ29uZmlnLkZQUyUyKSA/IDAgOiAxO1xuICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWUlMjtcblxuICAgICAgICAvLyBSZW5kZXIgRmxvb3JcbiAgICAgICAgbGV0IGZsb29yID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnZmxvb3InKTtcbiAgICAgICAgbGV0IGZsb29yV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5USUxFX1grMTsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgQ29uZmlnLlRJTEVfWSAtIDQ7IHkrKykge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgICAgICBmbG9vcixcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICsgZmxvb3JXaWR0aCp4IC0gZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgKHkrMikqZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyIFdhbGxcbiAgICAgICAgbGV0IHdhbGwgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCd3YWxsJyk7XG4gICAgICAgIGxldCB3YWxsV2lkdGggPSB3YWxsLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuQ0FOVkFTX1dJRFRILyh3YWxsV2lkdGgpICsgMTsgeCsrKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB3YWxsLFxuICAgICAgICAgICAgICAgIDAsIC8vIERYXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQvMip0aGlzLmZyYW1lLCAvL0RZXG4gICAgICAgICAgICAgICAgd2FsbC53aWR0aCxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKyB3YWxsV2lkdGgqeCAtIHdhbGxXaWR0aCwgLy9zeFxuICAgICAgICAgICAgICAgIDAsIC8vc3lcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRS8yXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBPZmZzZXRzXG4gICAgICAgIGxldCB4U3RlcCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzE2O1xuICAgICAgICBpZih0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PSBcIm1vdmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX2Zsb29yT2Zmc2V0ID49IGZsb29yV2lkdGggLSAxKSB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl93YWxsT2Zmc2V0ID4gd2FsbFdpZHRoIC0gMSkgdGhpcy5fd2FsbE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgTG9nZ2VyICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IodWksIHBsYXllcnMsIHZpZXcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdWkgICAgICAgICA9IHVpO1xuICAgICAgICB0aGlzLl92aWV3ICAgICAgID0gdmlldztcbiAgICAgICAgdGhpcy5fcGxheWVycyAgICA9IHBsYXllcnM7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVUkgUExBWUVSU1wiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9wbGF5ZXJzKTtcblxuICAgICAgICB0aGlzLl90aWxlSGVpZ2h0ID0gMjtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYmdcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwidWktYmcucG5nXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBsZXQgeVBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCk7XG5cbiAgICAgICAgLy8gRHJhdyBCYWNrZ3JvdW5kXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgbGV0IGJnUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB5UG9zLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHlQb3MsXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCguLi5iZ1JlY3QpO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcIiM2NEEzNTdcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcIiMwMDM3MDBcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KC4uLnVpUmVjdCk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjOEQ4MDQ1XCI7XG5cbiAgICAgICAgLy8gVGhlIHN0cm9rZSBpcyBtaWRkbGUgYWxpZ25lZCB3aXRoIHRoZSBlZGdlcyBvZiB0aGUgYm94XG4gICAgICAgIGxldCBsaW5lV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8zMjtcbiAgICAgICAgLy9sZXQgbGluZVdpZHRoID0gNTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICBsZXQgc3Ryb2tlUmVjdCA9IFsuLi51aVJlY3RdO1xuICAgICAgICBzdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzJdIC09IGxpbmVXaWR0aDtcbiAgICAgICAgc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gRmlsbCBiZyB3aXRoIHBhdGVyblxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjE7XG4gICAgICAgIGxldCBwYXRlcm4gPSBjdHguY3JlYXRlUGF0dGVybih0aGlzLl9yZXNvdXJjZXMuZ2V0KFwiYmdcIiksIFwicmVwZWF0XCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0ZXJuO1xuICAgICAgICBjdHgucmVjdCguLi5zdHJva2VSZWN0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB5UG9zICs9IENvbmZpZy5USUxFX1NJWkUvMztcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuXG4gICAgICAgIGxldCB4UG9zID0gQ29uZmlnLlRJTEVfU0laRSoxLjI7XG5cbiAgICAgICAgLy8gRHJhdyBJbmZvXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDAgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzBdLFxuICAgICAgICAgICAgeFBvcyxcbiAgICAgICAgICAgIHlQb3NcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMV0sXG4gICAgICAgICAgICB4UG9zICsgQ29uZmlnLlRJTEVfU0laRSoyLFxuICAgICAgICAgICAgeVBvc1xuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1syXSxcbiAgICAgICAgICAgIHhQb3MsXG4gICAgICAgICAgICB5UG9zICsgZm9udFNpemUqMlxuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAzID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1szXSxcbiAgICAgICAgICAgIHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICB5UG9zICsgZm9udFNpemUqMlxuICAgICAgICBdKTtcblxuICAgICAgICB4UG9zID0gQ29uZmlnLlRJTEVfU0laRSo1O1xuICAgICAgICB5UG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEluZm9cbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgeVBvcyArPSBmb250U2l6ZSoyO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBOYW1lc1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgICAgIHlQb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgY29vbGRvd24gdmFyc1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFyWVBvcyAgID0geVBvcyArIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJXaWR0aCAgPSBDb25maWcuVElMRV9TSVpFO1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFySGVpZ2h0ID0gZm9udFNpemUvMjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBDb29sZG93biBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDBGRjAwXCI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25QZXJjZW50YWdlID0gcGxheWVyLmNvb2xkb3duL3BsYXllci5tYXhDb29sZG93bjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4UG9zLCBjb29sZG93bkJhcllQb3MsIGNvb2xkb3duQmFyV2lkdGgqY29vbGRvd25QZXJjZW50YWdlLCBjb29sZG93bkJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgQ29vbGRvd24gU3Ryb2tlXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggICA9IDEqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHhQb3MsIGNvb2xkb3duQmFyWVBvcywgY29vbGRvd25CYXJXaWR0aCwgY29vbGRvd25CYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgSGVhbHRoYmFyIHZhcnNcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJYUG9zICAgPSB4UG9zICsgQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcllQb3MgICA9IHlQb3MgLSBmb250U2l6ZS8yO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcldpZHRoICA9IENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJIZWlnaHQgPSBmb250U2l6ZS8yO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoUGVyY2VudGFnZSA9IHBsYXllci5oZWFsdGgvcGxheWVyLm1heEhlYWx0aDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCpoZWFsdGhQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLmhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGhlYWx0aEJhcllQb3MgKz0gaGVhbHRoQmFySGVpZ2h0KjEuNTtcblxuICAgICAgICAgICAgLy9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICAvL2N0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xuICAgICAgICAgICAgbGV0IG1hbmFQZXJjZW50YWdlID0gcGxheWVyLm1hbmEvcGxheWVyLm1heE1hbmE7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqbWFuYVBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIubWFuYX0vJHtwbGF5ZXIubWF4TWFuYX1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXAoKSB7XG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDEpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAxO1xuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudXAoKTtcbiAgICB9XG5cbiAgICBsZWZ0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDApXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMilcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgdGhpcy5sZWZ0KCk7XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRPcHRpb24gPSB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICAgICAgaWYoY3VycmVudE9wdGlvbiAhPT0gdGhpcy5fbGFzdE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkLFxuICAgICAgICAgICAgICAgIFwib3B0aW9uXCI6IHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RPcHRpb24gPSBjdXJyZW50T3B0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJMYXN0T3B0aW9uKCkge1xuICAgICAgICB0aGlzLl9sYXN0T3B0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==
