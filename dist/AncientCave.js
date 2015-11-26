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

                // Get and then delete player
                var playerToRemove = _this3._players.get(message.id);
                var playerRemoved = _this3._players['delete'](playerToRemove.id);

                // Make sure the player was there
                if (playerRemoved) {
                    _this3.emit("remove-player", playerToRemove);

                    if (_this3.currentState == "lobby") {
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
                        //uiView.requestInput().then(this.handleUiInput.bind(this));
                        promises.push(uiView.loadResources());

                        // Load sounds
                        var soundService = new _servicesSoundService2['default']();
                        _this._soundService = soundService;
                        promises.push(soundService.loadResources());

                        // After all renderers are ready let the dispatcher know
                        Promise.all(promises).then(function () {
                            _this._views = [_this._roomView].concat(views, [_this._uiView]);
                            _this._soundService.play("dungeon-theme", true);
                            _this.emit("render-ready");
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
                _this._soundService.play("dungeon-theme", true);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbWl4aW5zL2V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL0xvYmJ5LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTWFpbk1lbnUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUm9vbS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9OZXR3b3JrU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1JuZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1NvdW5kU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1V0aWxzLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvQ2FudmFzMmQuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9FbmVteVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Mb2JieVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9NYWluTWVudVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9PYmplY3RWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21WaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt5QkNBbUIsY0FBYzs7Ozs7QUFHakMsSUFBSSxNQUFNLEdBQUcsMkJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDUHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7Ozs7QUFLcEMsTUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7QUFFekUsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXOztBQUUxQixVQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs7O0FBR3RCLFVBQU0sQ0FBQyxZQUFZLEdBQUksTUFBTSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQzNELFVBQU0sQ0FBQyxhQUFhLEdBQUcsQUFBQyxNQUFNLENBQUMsWUFBWSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7O0FBR3RGLFFBQUcsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzFD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Yjs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUM3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBQzdCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO1NBQ3JDOzs7ZUFFSSxpQkFBRztBQUNKLGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDZjs7O2VBRU0sbUJBQUc7QUFDTixnQkFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDdkUsZ0JBQUcsYUFBYSxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDbkMsb0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUM3Qix3QkFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO0FBQ3JDLDRCQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDO2lCQUMvRCxDQUFDLENBQUM7QUFDSCxvQkFBSSxDQUFDLFdBQVcsR0FBRyxhQUFhLENBQUM7YUFDcEM7U0FDSjs7O2VBRWMsMkJBQUc7QUFDZCxnQkFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDaEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEVuZ2luZSBmcm9tICcuL2FwcC9FbmdpbmUnO1xuXG4vLyBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIGdhbWVcbnZhciBlbmdpbmUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuZW5naW5lLmluaXQoKTtcblxuLy8gREVCVUdcbndpbmRvdy5lbmdpbmUgPSBlbmdpbmU7XG5cbiIsImxldCBjb25maWcgPSB7fTtcbi8qKlxuICogU2hvdWxkIGJlIHNldCB1cCB0byByZWNhbGN1bGF0ZSBvbiB0aGUgZmx5IHdoZW4gdGhpbmdzIGNoYWduZS5cbiAqIE5vdCB3b3JraW5nIHJpZ2h0IGF0IGFsbCBmb3Igd2luZG93IHNpemUgY2hhZ25lcy5cbiAqL1xuY29uZmlnLkFQSV9LRVkgPSBcInhhaHh4MHl1eTVsZTRzNGlcIjtcblxuLy9jb25maWcuRElTQUJMRV9BVURJTyA9IHRydWU7XG5cbi8vIDE2eDkgQXNwZWN0IFJhdGlvXG5jb25maWcuQVNQRUNUX1dJRFRIICA9IDE5MjA7XG5jb25maWcuQVNQRUNUX0hFSUdIVCA9IDEwODA7XG5cbmNvbmZpZy5USUxFX1ggPSAxNjsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuY29uZmlnLlRJTEVfWSA9IChjb25maWcuVElMRV9YKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG5jb25maWcuY2FsY3VsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gSG9yaXpvbnRhbCBvciBWZXJ0aWNhbCBwZXJjZW50YWdlIHRoYXQgdGhlIGdhbWUgdmlldyBzaG91bGQgb2NjdXB5XG4gICAgY29uZmlnLlBFUkNFTlRBR0UgPSAxO1xuXG4gICAgLy8gQ2FjbHVsYXRlIGNhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IGFjY29yZGluZyB0byBhYm92ZSBwZXJjZW50YWdlIGFuZCBhc3BlY3QgcmF0aW9cbiAgICBjb25maWcuQ0FOVkFTX1dJRFRIICA9IHdpbmRvdy5vdXRlcldpZHRoKmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgaWYoY29uZmlnLkNBTlZBU19IRUlHSFQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICBjb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIH1cblxuICAgIC8vIERldGVybWluZSBTcHJpdGUgU2NhbGluZ1xuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG4gICAgY29uZmlnLlRJTEVfU0laRSAgICAgPSBjb25maWcuU1BSSVRFX1NJWkUqY29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgIC8vIFNldCBGUFNcbiAgICBjb25maWcuRlBTID0gMzA7XG59XG5cbmNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiLy8gSW1wb3J0IEdhbWVcbmltcG9ydCBHYW1lIGZyb20gJy4vbW9kZWxzL0dhbWUnO1xuXG4vLyBJbXBvcnQgVmlld1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3cy9DYW52YXMyZCc7XG5cbi8vIEltcG9ydCBEaXNwYXRjaGVyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2Rpc3BhdGNoZXIvRGlzcGF0Y2hlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSAgICAgICA9IG5ldyBHYW1lKCk7XG4gICAgICAgIHRoaXMuX3ZpZXcgICAgICAgPSBuZXcgVmlldygpO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblxuICAgICAgICB3aW5kb3cuZ2FtZSAgICAgICA9IHRoaXMuX2dhbWU7XG4gICAgICAgIHdpbmRvdy52aWV3ICAgICAgID0gdGhpcy5fdmlldztcbiAgICAgICAgd2luZG93LmRpc3BhdGNoZXIgPSB0aGlzLl9kaXNwYXRjaGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGVuZ2luZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMuX2dhbWUuaW5pdCh0aGlzLl9kaXNwYXRjaGVyKSxcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcuaW5pdCh0aGlzLl9nYW1lKSxcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuaW5pdCh0aGlzLl92aWV3KVxuICAgICAgICBdKS50aGVuKCgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmVtaXQoXCJzdGFydC1nYW1lXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgICBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBOZXR3b3JrU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9OZXR3b3JrU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBpbml0KHZpZXcpIHtcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJWaWV3TWVzc2FnZXModGhpcy5fdmlldyk7XG4gICAgfVxuXG4gICAgaW5pdE11bHRpcGxheWVyR2FtZShtZXNzYWdlKSB7XG4gICAgICAgIGxldCBhcmdzID0gW107XG4gICAgICAgIC8vIEJ1aWxkIGFyZ3NcbiAgICAgICAgaWYobWVzc2FnZS5ob3N0SWQpIHtcbiAgICAgICAgICAgIGFyZ3MgPSBbbWVzc2FnZS5uYW1lLCBtZXNzYWdlLmhvc3RJZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhcmdzID0gW21lc3NhZ2UubmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgLy8gSW5pdCBtcCBjb250cm9sbGVyXG4gICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlID0gbmV3IE5ldHdvcmtTZXJ2aWNlKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgdGhpcy5yZWdpc3Rlck11bHRpcGxheWVyTWVzc2FnZXModGhpcy5fbmV0d29ya1NlcnZpY2UpO1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogQnJvYWRjYXN0IEFkZCBQbGF5ZXIgTWVzc2FnZVwiKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImFkZC1wbGF5ZXJcIiwge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogU3ltYm9sKCksXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IG1lc3NhZ2UubmFtZSxcbiAgICAgICAgICAgICAgICBcImlzTG9jYWxcIjogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJnYW1lLXN0YXRlXCIsIFwibG9iYnlcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxlYXZlR2FtZSgpIHtcbiAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmVtaXQoXCJnYW1lLXN0YXRlXCIsIFwibWFpbiBtZW51XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZ2V0IGEgcGVlciBjb25uZWN0IGV2ZW50IGZvcm0gdGhlIG11bHRpcGxheWVyIGNvbnRyb2xsZXIsIGNyZWF0ZSBhIGFkZCBwbGF5ZXIgZXZlbnRcbiAgICAgKi9cbiAgICBwZWVyQ29ubmVjdChtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IFBlZXIgQ29ubmVjdCBNZXNzYWdlXCIpO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBBZGQgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdChcImFkZC1wbGF5ZXJcIiwge1xuICAgICAgICAgICAgXCJpZFwiOiBtZXNzYWdlLmZyb20sXG4gICAgICAgICAgICBcIm5hbWVcIjogbWVzc2FnZS5kYXRhLm5hbWUsXG4gICAgICAgICAgICBcImpvYlwiOiBtZXNzYWdlLmRhdGEuam9iXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZ2V0IGEgcGVlciBkaXNjb25uZWN0IGV2ZW50IGZvcm0gdGhlIG11bHRpcGxheWVyIGNvbnRyb2xsZXIsIGNyZWF0ZSBhIHJlbW92ZSBwbGF5ZXIgZXZlbnRcbiAgICAgKi9cbiAgICBwZWVyRGlzY29ubmVjdChtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IFBlZXIgRGlzY29ubmVjdCBNZXNzYWdlXCIpO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBSZW1vdmUgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdChcInJlbW92ZS1wbGF5ZXJcIiwge1xuICAgICAgICAgICAgXCJpZFwiOiBtZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGFsbCBtdWx0aXBsYXllciBFdmVudHNcbiAgICAgKi9cbiAgICByZWdpc3Rlck11bHRpcGxheWVyTWVzc2FnZXMobXVsdGlwbGF5ZXJTZXJ2aWNlKSB7XG4gICAgICAgIG11bHRpcGxheWVyU2VydmljZS5vbihcInBlZXItY29ubmVjdFwiLCAgICB0aGlzLnBlZXJDb25uZWN0LmJpbmQodGhpcykpO1xuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJwZWVyLWRpc2Nvbm5lY3RcIiwgdGhpcy5wZWVyRGlzY29ubmVjdC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJwbGF5ZXItc3RhdGVcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItc3RhdGVcIiwgbWVzc2FnZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG11bHRpcGxheWVyU2VydmljZS5vbihcImpvYi1zZWxlY3RcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItam9iXCIsIG1lc3NhZ2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJvcHRpb24tc2VsZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYWxsIHZpZXcgbWVzc2FnZXNcbiAgICAgKi9cbiAgICByZWdpc3RlclZpZXdNZXNzYWdlcyh2aWV3KSB7XG4gICAgICAgIHZpZXcub24oXCJzdGFydC1tcFwiLCB0aGlzLmluaXRNdWx0aXBsYXllckdhbWUuYmluZCh0aGlzKSk7XG4gICAgICAgIHZpZXcub24oXCJsZWF2ZS1nYW1lXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmxlYXZlR2FtZSgpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZpZXcub24oXCJqb2Itc2VsZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmpvYlNlbGVjdChtZXNzYWdlLmpvYik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItam9iXCIsIG1lc3NhZ2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2aWV3Lm9uKFwicmVhZHlcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBsZXQgc3RhdGUgPSBtZXNzYWdlLnN0YXRlID8gXCJyZWFkeVwiIDogXCJpZGxlXCI7XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5wbGF5ZXJTdGF0ZShzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItc3RhdGVcIiwge1xuICAgICAgICAgICAgICAgXCJpZFwiOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgIFwic3RhdGVcIjogc3RhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB2aWV3Lm9uKFwib3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLm9wdGlvblNlbGVjdChtZXNzYWdlLm9wdGlvbik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJvcHRpb24tc2VsZWN0XCIsIG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG5cbiAgICBvbih0eXBlcywgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgdHlwZSBvZiB0eXBlcy5zcGxpdChcIiBcIikpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG5cbiAgICBvbih0eXBlcywgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgdHlwZSBvZiB0eXBlcy5zcGxpdChcIiBcIikpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJTRVQgU1RBVEUgVE8gU1RBVEVcIik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTtcbiAgICB9XG59XG4iLCIvLyBJbXBvcnQgTWl4aW5zXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9ldmVudEVtaXR0ZXInO1xuXG4vLyBJbXBvcnQgVXRpbHNcbmltcG9ydCBVdGlscyAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IExvZ2dlciAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IENvbmZpZyAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJuZyAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9SbmcnO1xuXG4vLyBJbXBvcnQgTW9kZWxzXG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vQmFzZU1vZGVsJztcbmltcG9ydCBQbGF5ZXIgICAgZnJvbSAnLi9vYmplY3RzL1BsYXllcic7XG5pbXBvcnQgRW5lbXkgICAgIGZyb20gJy4vb2JqZWN0cy9Nb25zdGVyJztcbmltcG9ydCBSb29tICAgICAgZnJvbSAnLi9vYmplY3RzL1Jvb20nO1xuaW1wb3J0IE1haW5NZW51ICBmcm9tICcuL29iamVjdHMvTWFpbk1lbnUnO1xuaW1wb3J0IExvYmJ5ICAgICBmcm9tICcuL29iamVjdHMvTG9iYnknO1xuaW1wb3J0IFVpICAgICAgICBmcm9tICcuL29iamVjdHMvVWknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBcIm1haW4gbWVudVwiLFxuICAgICAgICAgICAgXCJsb2JieVwiLFxuICAgICAgICAgICAgXCJwbGF5aW5nXCJcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fbWFpbk1lbnUgPSBuZXcgTWFpbk1lbnUoKTtcbiAgICAgICAgdGhpcy5fbG9iYnkgICAgPSBuZXcgTG9iYnkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KGRpc3BhdGNoZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBkaXNwYXRjaGVyO1xuXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgICAgICAvLyBMSVNURU4gRk9SIEVWRU5UU1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5Ub0Rpc3BhdGNoZXIodGhpcy5fZGlzcGF0Y2hlcik7XG5cbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGdhbWUgc3RhdGUgaWYgaXRzIGFsbG93ZWRcbiAgICAgKiBNYWtlIHN1cmUgd2UgZW1pdCBpdFxuICAgICAqL1xuICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICAgICAgaWYodGhpcy5fY3VycmVudFN0YXRlID09IFwibWFpbiBtZW51XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBhbGwgcGxheWVyc1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllcnMgICAgID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2FsUGxheWVyID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZ2FtZS1zdGF0ZVwiLCB0aGlzLl9jdXJyZW50U3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2FsbCB0aGlzIGZ1bmN0aW9uIGFmdGVyIGFueSBwbGF5ZXJzdGFlIGNoYW5nZSBzbyB3ZSBjYW4gZGVjaWRlIHdoYXQgdG8gZG8uXG4gICAgICovXG4gICAgY2hlY2tQbGF5ZXJTdGF0ZSgpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlIGluIHRoZSBsb2J5IGRlY2lkZSBpZiB3ZSBuZWVkIHRvIHN0YXJ0IHRoZSBnYW1lXG4gICAgICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09PSBcImxvYmJ5XCIpIHtcbiAgICAgICAgICAgIGxldCByZWFkeVRvU3RhcnQgPSB0cnVlO1xuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcmVhZHlUb1N0YXJ0ID0gcmVhZHlUb1N0YXJ0ICYmIHBsYXllci5jdXJyZW50U3RhdGUgPT09IFwicmVhZHlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlBsYXllcnMgYXJlIHJlYWR5PyBcIiArIHJlYWR5VG9TdGFydCk7XG5cbiAgICAgICAgICAgIGlmKHJlYWR5VG9TdGFydCkge1xuICAgICAgICAgICAgICAgIExvZ2dlci5iYW5uZXIoXCJTVEFSVElORyBHQU1FXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0YXJ0UGxheWluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hlY2tQbGF5ZXJBY3Rpb24ocCwgbWVzc2FnZSkge1xuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJwbGF5aW5nXCIpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09IFwiaWRsZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlYWR5VG9Nb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZHlUb01vdmUgPSByZWFkeVRvTW92ZSAmJiBwbGF5ZXIuY3VycmVudEFjdGlvbiA9PT0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHJlYWR5VG9Nb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PSBcImJhdHRsZVwiKSB7XG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZSA9PT0gXCJhdHRhY2tcIikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJBdHRhY2socCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cblxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGN1cnJlbnQgc3RhdGVcbiAgICAgKi9cbiAgICBnZXQgY3VycmVudFN0YXRlKCkge3JldHVybiB0aGlzLl9jdXJyZW50U3RhdGU7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIG1haW4gbWVudVxuICAgICAqL1xuICAgIGdldCBtYWluTWVudSgpIHtyZXR1cm4gdGhpcy5fbWFpbk1lbnU7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGxvYmJ5XG4gICAgICovXG4gICAgZ2V0IGxvYmJ5KCkge3JldHVybiB0aGlzLl9sb2JieTt9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gcGxheWVyc1xuICAgICAqL1xuICAgIGdldCBwbGF5ZXJzKCkge3JldHVybiB0aGlzLl9wbGF5ZXJzO31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbG9jYWwgcGxheWVyXG4gICAgICovXG4gICAgZ2V0IGxvY2FsUGxheWVyKCkge3JldHVybiB0aGlzLl9sb2NhbFBsYXllcjt9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gQ3VycmVudCBSb29tXG4gICAgICovXG4gICAgZ2V0IHJvb20oKSB7cmV0dXJuIHRoaXMuX3Jvb207fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIFVpIFJvb21cbiAgICAgKi9cbiAgICBnZXQgdWkoKSB7cmV0dXJuIHRoaXMuX3VpO31cblxuICAgIF9zdGFydE1lbnUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJtYWluIG1lbnVcIjtcbiAgICB9XG5cbiAgICBfc3RhcnRNdWx0aXBsYXllcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImxvYmJ5XCI7XG4gICAgfVxuXG4gICAgX3N0YXJ0UGxheWluZygpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgcm9vbVxuICAgICAgICB0aGlzLl9yb29tICAgICAgICA9IG5ldyBSb29tKCk7XG4gICAgICAgIHRoaXMuX3VpICAgICAgICAgID0gbmV3IFVpKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJwbGF5aW5nXCI7XG4gICAgfVxuXG4gICAgX2xvb2tGb3JUcm91YmxlKCkge1xuICAgICAgICAvLyBTZXQgcm9vbSB0byBtb3ZpbmdcbiAgICAgICAgdGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPSBcIm1vdmluZ1wiO1xuXG4gICAgICAgIC8vIFNldCBwbGF5ZXJzIHRvIHdhbGtpbmdcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gXCJ3YWxraW5nXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgZW5lbWllc1xuICAgICAgICBsZXQgZW5lbXkgPSBuZXcgRW5lbXkoKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkLWVuZW15XCIsIGVuZW15KTtcblxuICAgICAgICB0aGlzLl9lbmVtaWVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBlbmVteVxuICAgICAgICBdKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLl9zdGFydEJhdHRsZSgpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBfc3RhcnRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJiYXR0bGVcIjtcbiAgICAgICAgdGhpcy5fdWkuc2V0QmF0dGxlT3B0aW9ucygpO1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHBsYXllci5iZWdpbkNvbWJhdCgpO1xuICAgICAgICAgICAgcGxheWVyLmNoYXJnZUNvb2xkb3duKHRoaXMuX3BsYXllckNvb2xkb3duUmVhZHkuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KCdzdGFydC1iYXR0bGUnKTtcbiAgICB9XG5cbiAgICBfcGxheWVyQ29vbGRvd25SZWFkeShwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWNvb2xkb3duXCIsIHBsYXllcik7XG4gICAgICAgIGlmKHBsYXllci5jdXJyZW50QWN0aW9uID09PSBcImF0dGFja1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXJBdHRhY2socGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9wbGF5ZXJBdHRhY2socCkge1xuICAgICAgICBpZihwLnJlYWR5VG9BdHRhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbWJhdFBoYXNlKCk7XG4gICAgICAgICAgICBwLmNoYXJnZUNvb2xkb3duKHRoaXMuX3BsYXllckNvb2xkb3duUmVhZHkuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItYXR0YWNrXCIsIHApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX2NvbWJhdFBoYXNlKCkge1xuICAgICAgICBsZXQgc2hvdWxkRW5kQmF0dGxlID0gdHJ1ZTtcbiAgICAgICAgZm9yKGxldCBlbmVteSBvZiB0aGlzLl9lbmVtaWVzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBlbmVteS5oZWFsdGgtLTtcbiAgICAgICAgICAgIHNob3VsZEVuZEJhdHRsZSA9IHNob3VsZEVuZEJhdHRsZSAmJiAoZW5lbXkuaGVhbHRoIDw9IDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2hvdWxkRW5kQmF0dGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRCYXR0bGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9lbmRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuX3VpLnNldElkbGVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuZW1pdCgnZW5kLWJhdHRsZScpO1xuXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmVuZENvbWJhdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGV2ZW50cyBmcm9tIHRoZSBkaXNwYXRjaGVyIGFuZCByZXNwb25kIGFjb3JkaW5nbHlcbiAgICAgKi9cbiAgICBsaXN0ZW5Ub0Rpc3BhdGNoZXIoZGlzcGF0Y2hlcikge1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwic3RhcnQtZ2FtZVwiLCB0aGlzLl9zdGFydE1lbnUuYmluZCh0aGlzKSk7XG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJzdGFydC1tcFwiLCAgIHRoaXMuX3N0YXJ0TXVsdGlwbGF5ZXIuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIGdhbWUgc3RhdGUgZXZlbnRzXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJnYW1lLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBtZXNzYWdlO1xuICAgICAgICB9KTtcblxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwiYWRkLXBsYXllclwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkdhbWU6IEFkZCBQbGF5ZXIgbWVzc2FnZSByZWNpZXZlZFwiKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcihtZXNzYWdlLm5hbWUsIG1lc3NhZ2UuaWQsIG1lc3NhZ2Uuam9iKTtcblxuICAgICAgICAgICAgcC5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGxheWVyKHAsIG1lc3NhZ2UuaXNMb2NhbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBwZWVycyBwbGF5ZXIgZnJvbSB0aGUgZ2FtZVxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwicmVtb3ZlLXBsYXllclwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkdhbWU6IFJlbW92ZSBQbGF5ZXIgbWVzc2FnZSByZWNpZXZlZFwiKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIC8vIEdldCBhbmQgdGhlbiBkZWxldGUgcGxheWVyXG4gICAgICAgICAgICBsZXQgcGxheWVyVG9SZW1vdmUgPSB0aGlzLl9wbGF5ZXJzLmdldChtZXNzYWdlLmlkKTtcbiAgICAgICAgICAgIGxldCBwbGF5ZXJSZW1vdmVkID0gdGhpcy5fcGxheWVycy5kZWxldGUocGxheWVyVG9SZW1vdmUuaWQpO1xuXG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIHBsYXllciB3YXMgdGhlcmVcbiAgICAgICAgICAgIGlmKHBsYXllclJlbW92ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJyZW1vdmUtcGxheWVyXCIsIHBsYXllclRvUmVtb3ZlKTtcblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuY3VycmVudFN0YXRlID09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFsdGVyIHBsYXllcidzIGpvYlxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwicGxheWVyLWpvYlwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9wbGF5ZXJzLmdldChtZXNzYWdlLmlkKTtcbiAgICAgICAgICAgIHBsYXllci5qb2IgPSBtZXNzYWdlLmpvYjtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWx0ZXIgcGxheWVyJ3Mgc3RhdGVcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInBsYXllci1zdGF0ZVwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkdhbWU6IFJlbW90ZSBQbGF5ZXIgU3RhdGUgbWVzc2FnZSByZWNpZXZlZFwiKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9wbGF5ZXJzLmdldChtZXNzYWdlLmlkKTtcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50U3RhdGUgPSBtZXNzYWdlLnN0YXRlO1xuXG4gICAgICAgICAgICAvLyBQcm9ncmVzcyBHYW1lIGxvZ2ljIGFjY29yaWRuZyB0byBwbGF5ZXIgc3RhdGVcbiAgICAgICAgICAgIHRoaXMuY2hlY2tQbGF5ZXJTdGF0ZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMaXN0ZW4gZm9yIHJlbW90ZSBvcHRpb24gc2VsZWN0XG4gICAgICAgIC8vIENIQU5HRSBUTyBQTEFZRVItQUNUSU9OXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJvcHRpb24tc2VsZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX3BsYXllcnMuZ2V0KG1lc3NhZ2UuaWQpO1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRBY3Rpb24gPSBtZXNzYWdlLm9wdGlvbjtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tQbGF5ZXJBY3Rpb24ocGxheWVyLCBtZXNzYWdlLm9wdGlvbik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwbGF5ZXIgcmVnYXJkbGVzcyBvZiByZW1vdGUgb3IgbG9jYWxcbiAgICAgKi9cbiAgICBhZGRQbGF5ZXIocCwgaXNMb2NhbCkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJHYW1lOiBBZGRpbmcgUGxheWVyXCIpO1xuICAgICAgICBMb2dnZXIubG9nKHApO1xuICAgICAgICBsZXQgcGxheWVycyA9IHRoaXMuX3BsYXllcnMudmFsdWVzKCk7XG4gICAgICAgIGxldCB5UG9zID0gLjg7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHBsYXllcnMpIHtcbiAgICAgICAgICAgIHlQb3MgPSBwbGF5ZXIueVBvcztcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICAgICAgfVxuICAgICAgICB5UG9zICs9IDEuMjtcbiAgICAgICAgcC55UG9zID0geVBvcztcbiAgICAgICAgdGhpcy5fcGxheWVycy5zZXQocC5pZCwgcCk7XG4gICAgICAgIGlmKGlzTG9jYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsUGxheWVyID0gcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoXCJhZGQtcGxheWVyXCIsIHApO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtICUgWSBvZmZzZXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiU2VsZWN0IEpvYlwiLFxuICAgICAgICAgICAgXCJSZWFkeVwiLFxuICAgICAgICAgICAgXCJMZWF2ZVwiXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE9wdGlvbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJIb3N0IEdhbWVcIixcbiAgICAgICAgICAgIFwiSm9pbiBHYW1lXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBUWVBFX1dVUk0oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3d1cm0tc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnd3VybSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIHR5cGUpIHtcbiAgICAgICAgc3VwZXIoW10pO1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zO1xuICAgICAgICB0aGlzLnlwb3MgPSB5UG9zO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoID0gNTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsICAgICBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IExvZ2dlciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5sZXQgSk9CUyA9IG5ldyBNYXAoKTtcblxuSk9CUy5zZXQoXCJjbGFpcnZveWFudFwiLCB7XG4gICAgJ25hbWUnOiAgICdjbGFpcnZveWFudCcsXG4gICAgJ2hlYWx0aCc6IDYwLFxuICAgICdtYW5hJzogNDAsXG4gICAgJ2Nvb2xkb3duJzogODAsXG4gICAgJ3Bvc2l0aW9uJzogJ2JhY2snXG59KTtcblxuSk9CUy5zZXQoXCJoZXJiYWxpc3RcIiwge1xuICAgICduYW1lJzogJ2hlcmJhbGlzdCcsXG4gICAgJ2hlYWx0aCc6IDQwLFxuICAgICdtYW5hJzogMCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcInZpbGxhaW5cIiwge1xuICAgICduYW1lJzogJ3ZpbGxhaW4nLFxuICAgICdoZWFsdGgnOiA4MCxcbiAgICAnbWFuYSc6IDIwLFxuICAgICdjb29sZG93bic6IDQwLFxuICAgICdwb3NpdGlvbic6ICdmcm9udCdcbn0pO1xuXG5KT0JTLnNldChcImtuaWdodFwiLCB7XG4gICAgJ25hbWUnOiAna25pZ2h0JyxcbiAgICAnaGVhbHRoJzogMTAwLFxuICAgICdtYW5hJzogMCxcbiAgICAnY29vbGRvd24nOiAxMDAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwibmVjcm9tYW5jZXJcIiwge1xuICAgICduYW1lJzogJ25lY3JvbWFuY2VyJyxcbiAgICAnaGVhbHRoJzogNDAsXG4gICAgJ21hbmEnOiAxMjAsXG4gICAgJ2Nvb2xkb3duJzogODAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICBzdGF0aWMgZ2V0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5KT0JTLnZhbHVlcygpXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCwgam9iKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcIndhbGtpbmdcIixcbiAgICAgICAgICAgIFwiYXR0YWNraW5nXCJcbiAgICAgICAgXSk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gXCJ0aGlua2luZ1wiO1xuXG4gICAgICAgIGlmKGpvYikgdGhpcy5qb2IgPSBqb2I7XG4gICAgfVxuXG4gICAgc2V0IGpvYihqb2JOYW1lKSB7XG4gICAgICAgIHRoaXMuX2pvYiA9IEpPQlMuZ2V0KGpvYk5hbWUpO1xuXG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5fam9iLmhlYWx0aDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuXG4gICAgICAgIHRoaXMubWF4TWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuICAgICAgICB0aGlzLm1hbmEgPSB0aGlzLl9qb2IubWFuYTtcblxuICAgICAgICB0aGlzLm1heENvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgIH1cblxuICAgIGdldCBqb2IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9qb2I7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudEFjdGlvbihhY3Rpb24pIHt0aGlzLl9jdXJyZW50QWN0aW9uID0gYWN0aW9uO31cblxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTt9XG5cbiAgICBnZXQgY3VycmVudEFjdGlvbigpIHtyZXR1cm4gdGhpcy5fY3VycmVudEFjdGlvbjt9XG5cbiAgICBnZXQgbmFtZSgpIHtyZXR1cm4gdGhpcy5fbmFtZTt9XG5cbiAgICBnZXQgaWQoKSB7cmV0dXJuIHRoaXMuX2lkO31cblxuICAgIGdldCByZWFkeVRvQXR0YWNrKCkge3JldHVybiB0aGlzLl9yZWFkeVRvQXR0YWNrO31cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmVnaW5Db21iYXQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlICA9IFwiaWRsZVwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBcImFjdGlvblwiO1xuICAgICAgICB0aGlzLmNvb2xkb3duICAgICAgPSAwO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5kQ29tYmF0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSAgID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiAgPSBcInRoaW5raW5nXCI7XG4gICAgICAgIHRoaXMuY29vbGRvd24gICAgICAgPSB0aGlzLm1heENvb2xkb3duO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5fY29vbGRvd25JbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY2hhcmdlQ29vbGRvd24oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGlvbiA9IFwidGhpbmtpbmdcIjtcbiAgICAgICAgdGhpcy5fcmVhZHlUb0F0dGFjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gMDtcblxuICAgICAgICBpZih0aGlzLl9jb29sZG93bkludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpO1xuXG4gICAgICAgIHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5jb29sZG93bisrO1xuICAgICAgICAgICAgaWYodGhpcy5jb29sZG93biA+PSB0aGlzLm1heENvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9jb29sZG93bkludGVydmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNjApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnO1xuaW1wb3J0IExvZ2dlciAgICBmcm9tICcuLi8uLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5sZXQgRklMTEFCTEUgPSBuZXcgU2V0KFtcbiAgICBcImVuZW1pZXNcIixcbiAgICBcInR5cGVcIixcbiAgICBcImlzTW92aW5nXCIsXG4gICAgXCJpc0JhdHRsZVwiLFxuICAgIFwiaXNMb29raW5nXCIsXG4gICAgXCJuZXh0RW5jb3VudGVyXCIsXG4gICAgXCJlbmNvdW50ZXJSYXRlXCIsXG4gICAgXCJ0aWNrQ291bnRcIlxuXSk7XG5cbmNsYXNzIFJvb20gZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcIm1vdmluZ1wiLFxuICAgICAgICAgICAgXCJiYXR0bGVcIlxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICB9XG5cbiAgICBsb29rRm9yVHJvdWJsZSgpIHtcbiAgICB9XG5cbiAgICBzdG9wTG9va2luZygpIHtcbiAgICB9XG5cbiAgICBlbmRCYXR0bGUoKSB7XG4gICAgfVxuXG4gICAgc3RhcnRCYXR0bGUoKSB7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYmF0dGxlT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiYXR0YWNrXCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJkZWZlbmRcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3Jvb21PcHRpb25zID0gW1xuICAgICAgICAgICAgXCJyZWFkeVwiLFxuICAgICAgICAgICAgXCJhYmlsaXR5XCIsXG4gICAgICAgICAgICBcIml0ZW1cIixcbiAgICAgICAgICAgIFwibWFuYWdlXCJcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IHRoaXMuX3Jvb21PcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cblxuICAgIHNldEJhdHRsZU9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fYmF0dGxlT3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXRJZGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9yb29tT3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBpZCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInVwXCIsICgpID0+IHRoaXMuZW1pdChcInVwXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwia1wiLCAoKSA9PiB0aGlzLmVtaXQoXCJ1cFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZG93blwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwialwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsZWZ0XCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJoXCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInJpZ2h0XCIsICgpID0+IHRoaXMuZW1pdChcInJpZ2h0XCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJyaWdodFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZW50ZXJcIiwgKCk9PiB0aGlzLmVtaXQoXCJjb25maXJtXCIpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4vTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGhvc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIGlmKGhvc3QpXG4gICAgICAgICAgICB0aGlzLl9ob3N0ID0gaG9zdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faWQgPSBcImhvc3RcIjtcblxuICAgICAgICB0aGlzLl9wZWVycyA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHBlZXIgY29ubmVjdGlvblxuICAgICAgICB0aGlzLl9wZWVyID0gbmV3IFBlZXIodGhpcy5faWQsIHtcbiAgICAgICAgICAgIGtleTogQ29uZmlnLkFQSV9LRVksXG4gICAgICAgICAgICBkZWJ1ZzogM1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5fcGVlci5vbignb3BlbicsIChpZCk9PntcbiAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoYFBlZXIgQ29ubmVjdGlvbiBjcmVhdGVkLCBQZWVyIElEIGlzICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faWQgPSBpZDtcblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGtub3cgYWJvdXQgYSBwZWVyIHRoZW4gY29ubmVjdFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2hvc3QpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGVlcih0aGlzLl9wZWVyLmNvbm5lY3QodGhpcy5faG9zdCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhIHBlZXIgY29ubmVjdHMgaGFuZGxlIGl0XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVlci5vbignY29ubmVjdGlvbicsIChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBtb3JlIHRoYW4gNCBwbGF5ZXJzXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLnNpemUgPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vbignb3BlbicsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJQZWVyIGhhcyBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXIgPSB0aGlzLmFkZFBlZXIoY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGVlcihjb25uZWN0aW9uKSB7XG4gICAgICAgIGxldCBwZWVyID0ge1xuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IGNvbm5lY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BlZXJzLnNldChjb25uZWN0aW9uLnBlZXIsIHBlZXIpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAgdGhpcy5oYW5kbGVEYXRhLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgY29ubmVjdFRvUGVlcihwZWVyKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcInBlZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5fbmFtZSxcbiAgICAgICAgICAgICAgICBcImpvYlwiOiB0aGlzLl9zZWxlY3RlZEpvYiB8fCB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwZWVycyA9IFtdO1xuICAgICAgICBmb3IobGV0IHBlZXIgb2YgdGhpcy5fcGVlcnMua2V5cygpKSB7XG4gICAgICAgICAgICBwZWVycy5wdXNoKHBlZXIpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UuZGF0YS5wZWVycyA9IHBlZXJzO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhgU2VuZGluZyBwZWVyLWNvbm5lY3QgbWVzc2FnZSB0byBwZWVyIHdpdGggaWQgJHtwZWVyfWApO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmNvbm5lY3Rpb24uc2VuZChtZXNzYWdlKTtcbiAgICAgICAgcGVlci5oYXNDb25uZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJlbW92ZVBlZXIocGVlcikge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJSZW1vdmUgcGVlclwiKTtcbiAgICAgICAgdGhpcy5lbWl0KFwicGVlci1kaXNjb25uZWN0XCIsIHBlZXIuY29ubmVjdGlvbi5wZWVyKTtcbiAgICAgICAgdGhpcy5fcGVlcnMuZGVsZXRlKHBlZXIuY29ubmVjdGlvbi5wZWVyKTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9wZWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIG1lc3NhZ2UgdG8gYWxsIHBlZXJzXG4gICAgICovXG4gICAgX3NlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5fcGVlcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheWVyU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXN0YXRlXCIsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgXCJzdGF0ZVwiOiBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBqb2JTZWxlY3Qoam9iKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcImpvYi1zZWxlY3RcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBcImpvYlwiOiBqb2JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRKb2IgPSBqb2I7XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIG9wdGlvblNlbGVjdChvcHRpb24pIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwib3B0aW9uLXNlbGVjdFwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIFwib3B0aW9uXCI6IG9wdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGEobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gR3JhYiBkYXRhIGZyb20gbWVzc2FnZVxuICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGVlci1jb25uZWN0XCIpIHtcbiAgICAgICAgICAgIC8vIFNlZSBpZiB0aGlzIHBlZXIga25vd3MgYWJvdXQgYW55IG90aGVyIHBlZXJzIGFuZCBhZGQgaWYgd2UgZG9uJ3Qga25vdyB0aGVtXG4gICAgICAgICAgICBmb3IobGV0IHBlZXIgb2YgZGF0YS5wZWVycykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9wZWVycy5nZXQocGVlcikgJiYgcGVlciAhPT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBBZGRpbmcgUGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdChwZWVyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWUgaWYgd2UgaGF2ZSBhbHJlYWR5IGNvbm5lY3RlZCB0byB0aGlzIHBlZXJcbiAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pICYmICF0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKS5oYXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIodGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWNvbm5lY3RcIiwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGxheWVyLXN0YXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1zdGF0ZVwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcImpvYi1zZWxlY3RcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiam9iLXNlbGVjdFwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcIm9wdGlvbi1zZWxlY3RcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL0xvZ2dlci5qcyc7XG5cbmxldCByZXNvdXJjZURpciA9ICcuL2Rpc3QvcmVzb3VyY2VzLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkSW1hZ2UocmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKGltZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gcmVzb3VyY2VEaXIgKyAnaW1hZ2VzLycgKyByZXNvdXJjZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJORyBDUkVBVEVcIik7XG4gICAgICAgIHRoaXMuX3JuZyA9IG5ldyBSTkcoc2VlZCk7XG4gICAgICAgIHdpbmRvdy5ybmcgPSB0aGlzLl9ybmc7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZy5yYW5kb20oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc291bmRQYXRoID0gXCIuL2Rpc3QvcmVzb3VyY2VzL3NvdW5kcy9cIjtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCBzb3VuZHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1tb3ZlXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJtZW51LW1vdmUubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1zZWxlY3RcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcIm1lbnUtc2VsZWN0Lm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvb2xkb3duLXJlYWR5XCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJjb29sZG93bi1yZWFkeS5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb21iYXQtdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcInFydHJub3RlcW9tYmF0LmdiLm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImR1bmdlb24tdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcImR1bmdlb25kZWxheS5nYi5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9zb3VuZHMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgZm9yKGxldCBzb3VuZCBvZiBzb3VuZHMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgIC8vIExvYWQgdGhlIHNvdW5kXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRzLnNldChzb3VuZC5uYW1lLCBuZXcgSG93bCh7XG4gICAgICAgICAgICAgICAgICAgIHVybHM6IFtzb3VuZC51cmxdLFxuICAgICAgICAgICAgICAgICAgICBvbmxvYWQ6IHJlcyxcbiAgICAgICAgICAgICAgICAgICAgb25sb2FkZXJyb3I6IHJlalxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcGxheShzb3VuZE5hbWUsIGxvb3ApIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHJldHVybjtcbiAgICAgICAgbGV0IHNvdW5kID0gdGhpcy5fc291bmRzLmdldChzb3VuZE5hbWUpO1xuICAgICAgICBzb3VuZC5sb29wKGxvb3AgfHwgZmFsc2UpO1xuICAgICAgICBzb3VuZC5wbGF5KCk7XG4gICAgfVxuXG4gICAgc3RvcChzb3VuZE5hbWUpIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHJldHVybjtcbiAgICAgICAgbGV0IHNvdW5kID0gdGhpcy5fc291bmRzLmdldChzb3VuZE5hbWUpO1xuICAgICAgICBzb3VuZC5zdG9wKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBsaW1pdGxvb3AoZm4sIGZwcykge1xuICAgICAgICAvLyBVc2UgdmFyIHRoZW4gPSBEYXRlLm5vdygpOyBpZiB5b3VcbiAgICAgICAgLy8gZG9uJ3QgY2FyZSBhYm91dCB0YXJnZXR0aW5nIDwgSUU5XG4gICAgICAgIHZhciB0aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gY3VzdG9tIGZwcywgb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIDYwXG4gICAgICAgIGZwcyA9IGZwcyB8fCA2MDtcbiAgICAgICAgdmFyIGludGVydmFsID0gMTAwMCAvIGZwcztcblxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodGltZSl7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cbiAgICAgICAgICAgIC8vIGFnYWluLCBEYXRlLm5vdygpIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPiBpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lXG4gICAgICAgICAgICAgICAgLy8gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpIGlzIGFuIGltcHJvdmVtZW50IG92ZXIganVzdCBcbiAgICAgICAgICAgICAgICAvLyB1c2luZyB0aGVuID0gbm93LCB3aGljaCBjYW4gZW5kIHVwIGxvd2VyaW5nIG92ZXJhbGwgZnBzXG4gICAgICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChkZWx0YSAlIGludGVydmFsKTtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIGZuXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgwKSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhc3BlY3RIZWlnaHRDYWxjKHcyKSB7XG4gICAgICAgIGxldCB3MSA9IDE5MjA7XG4gICAgICAgIGxldCBoMSA9IDEwODA7XG4gICAgICAgIHJldHVybiBoMSp3Mi93MTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VRdWVyeShzZWFyY2gpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBzZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XG5cbiAgICAgICAgdmFyIGFyZ3NQYXJzZWQgPSB7fTtcblxuICAgICAgICB2YXIgaSwgYXJnLCBrdnAsIGtleSwgdmFsdWU7XG5cbiAgICAgICAgZm9yIChpPTA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgICAgIGlmICgtMSA9PT0gYXJnLmluZGV4T2YoJz0nKSkge1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtkZWNvZGVVUklDb21wb25lbnQoYXJnKS50cmltKCldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAga3ZwID0gYXJnLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzBdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMV0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NQYXJzZWQ7XG4gICAgfVxuXG4gICAgLy8gR29vZGVub3VnaCBVVUlEP1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA3MjY5MDkvcmFuZG9tLWFscGhhLW51bWVyaWMtc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICByYW5kb21TdHJpbmcobGVuZ3RoLCBjaGFycykge1xuICAgICAgICBpZighY2hhcnMpIHtcbiAgICAgICAgICAgIGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGg7IGkgPiAwOyAtLWkpIHJlc3VsdCArPSBjaGFyc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoY2hhcnMubGVuZ3RoIC0gMSkpXTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG4vLyBJbXBvcnQgU2VydmljZXNcbmltcG9ydCBJbnB1dFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IFNvdW5kU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9Tb3VuZFNlcnZpY2UnO1xuXG4vLyBJbXBvcnQgdmlld3NcbmltcG9ydCBQbGF5ZXJWaWV3ICAgZnJvbSAnLi9QbGF5ZXJWaWV3JztcbmltcG9ydCBFbmVteVZpZXcgICAgZnJvbSAnLi9FbmVteVZpZXcnO1xuaW1wb3J0IFJvb21WaWV3ICAgICBmcm9tICcuL1Jvb21WaWV3JztcbmltcG9ydCBNYWluTWVudVZpZXcgZnJvbSAnLi9NYWluTWVudVZpZXcnO1xuaW1wb3J0IExvYmJ5VmlldyAgICBmcm9tICcuL0xvYmJ5Vmlldyc7XG5pbXBvcnQgVWlWaWV3ICAgICAgIGZyb20gJy4vVWlWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG5cbiAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKiBAdG9kbzogZG9lcyB0aGlzIGJlbG9uZyBoZXJlP1xuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSA9IGdhbWU7XG5cbiAgICAgICAgdGhpcy5faW5wdXRTZXJ2aWNlID0gbmV3IElucHV0U2VydmljZSgpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBBdHRhY2ggcmVzaXplIGV2ZW50XG4gICAgICAgIC8vd2luZG93LnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG9HYW1lRXZlbnRzKHRoaXMuX2dhbWUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVySW5wdXRIYW5kbGVycyh0aGlzLl9pbnB1dFNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9jb2RldGhlb3J5LmluL2NvbnRyb2xsaW5nLXRoZS1mcmFtZS1yYXRlLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgICAgICAvLyBJZiB0aGUgZnBzIGludGVydmFsIGlzIGNvcnJlY3RcbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRpbWUgc2luY2UgbGFzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIFNldCB1cCBSZW5kZXJpbmdcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdGhpcy5fZnJhbWUgfHwgMTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gKHRoaXMuX2ZyYW1lJUNvbmZpZy5GUFMpID8gdGhpcy5fZnJhbWUgOiAxO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgZ2FtZVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5fZnJhbWUpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbmV4dCByZW5kZXIgY3ljbGVcbiAgICAgICAgICAgIGxldCB0aW1lX2VsID0gKHRoaXMudGhlbiAtIHRoaXMuZmlyc3QpLzEwMDA7XG4gICAgICAgICAgICArK3RoaXMuY291bnRlcjtcbiAgICAgICAgICAgIGxldCBmcHMgPSBwYXJzZUludCh0aGlzLmNvdW50ZXIvdGltZV9lbCk7XG5cbiAgICAgICAgICAgIC8vIFNob3cgRlBTXG4gICAgICAgICAgICBsZXQgZm9udFNpemUgICAgICAgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQodGhpcy5fZnJhbWUgKyBcIi9cIiArIENvbmZpZy5GUFMgKyBcIiBcIiArIGZwcyArIFwiZnBzXCIsIDIwLCAyMCk7XG5cbiAgICAgICAgICAgIC8vIEluY3JlbWVudCBGcmFtZVxuICAgICAgICAgICAgdGhpcy5fZnJhbWUrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihmcmFtZSkge1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggICAgICAgICAgICAgID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCAgICAgICAgICAgICA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgQ29uZmlnLkNBTlZBU19XSURUSCwgQ29uZmlnLkNBTlZBU19IRUlHSFQpO1xuXG4gICAgICAgIGZvcihsZXQgdmlldyBvZiB0aGlzLl92aWV3cykgIHtcbiAgICAgICAgICAgIHZpZXcucmVuZGVyKHRoaXMuX2N0eCwgZnJhbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFpbk1lbnVWaWV3cygpIHtcbiAgICAgICAgbGV0IHZpZXdzID0gW107XG5cbiAgICAgICAgaWYodGhpcy5fbWFpbk1lbnVWaWV3KSB7XG4gICAgICAgICAgICB2aWV3cy5wdXNoKHRoaXMuX21haW5NZW51Vmlldyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmlld3M7XG4gICAgfVxuXG4gICAgZ2V0UGxheWluZ1ZpZXdzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAuLi50aGlzLl9wbGF5ZXJWaWV3cy52YWx1ZXMoKSxcbiAgICAgICAgICAgIHRoaXMuX3VpVmlld1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIHN0YXJ0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLl9yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBnYW1lIGV2ZW50cyBzbyB3ZSBjYW4gYWRqdXN0IHJlbmRlcmVyXG4gICAgICovXG4gICAgbGlzdGVuVG9HYW1lRXZlbnRzKGdhbWUpIHtcbiAgICAgICAgZ2FtZS5vbihcImdhbWUtc3RhdGVcIiwgKG1lc3NhZ2UpPT4ge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVmlldyBHYW1lIFN0YXRlIEV2ZW50XCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIGlmKG1lc3NhZ2UgPT0gXCJtYWluIG1lbnVcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZW4ndCByZW5kZXJpbmcgdGhlbiBzdGFydFxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFJlbmRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbWFpbk1lbnVWaWV3ID0gbmV3IE1haW5NZW51VmlldyhnYW1lLm1haW5NZW51LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBtYWluTWVudVZpZXcuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3ID0gbWFpbk1lbnVWaWV3O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoW3RoaXMuX21haW5NZW51Vmlld10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlID09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgICAgIGxldCBsb2JieVZpZXcgPSBuZXcgTG9iYnlWaWV3KGdhbWUubG9iYnksIGdhbWUucGxheWVycywgdGhpcyk7XG4gICAgICAgICAgICAgICAgbG9iYnlWaWV3LmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5VmlldyA9IGxvYmJ5VmlldztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KFt0aGlzLl9sb2JieVZpZXddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihtZXNzYWdlID09IFwicGxheWluZ1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHJvb20gdmlld1xuICAgICAgICAgICAgICAgIGxldCByb29tVmlldyA9IG5ldyBSb29tVmlldyhnYW1lLnJvb20pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3ID0gcm9vbVZpZXc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHJvb21WaWV3LmxvYWRSZXNvdXJjZXMoKVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmlld3MgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbGwgb2Ygb3VyIHBsYXllciB2aWV3c1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIGdhbWUucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyVmlldyA9IG5ldyBQbGF5ZXJWaWV3KHBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocGxheWVyVmlldy5sb2FkUmVzb3VyY2VzKCkpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3cy5wdXNoKHBsYXllclZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cy5zZXQocGxheWVyLmlkLCBwbGF5ZXJWaWV3KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdWlWaWV3ID0gbmV3IFVpVmlldyhnYW1lLnVpLCBnYW1lLnBsYXllcnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldyA9IHVpVmlldztcbiAgICAgICAgICAgICAgICAvL3VpVmlldy5yZXF1ZXN0SW5wdXQoKS50aGVuKHRoaXMuaGFuZGxlVWlJbnB1dC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHVpVmlldy5sb2FkUmVzb3VyY2VzKCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gTG9hZCBzb3VuZHNcbiAgICAgICAgICAgICAgICBsZXQgc291bmRTZXJ2aWNlID0gbmV3IFNvdW5kU2VydmljZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZSA9IHNvdW5kU2VydmljZTtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNvdW5kU2VydmljZS5sb2FkUmVzb3VyY2VzKCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgYWxsIHJlbmRlcmVycyBhcmUgcmVhZHkgbGV0IHRoZSBkaXNwYXRjaGVyIGtub3dcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udmlld3MsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXdcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJkdW5nZW9uLXRoZW1lXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJyZW5kZXItcmVhZHlcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJhZGQtcGxheWVyXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBpZihnYW1lLmN1cnJlbnRTdGF0ZSA9PT0gXCJsb2J5XCIpXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3Ll9yZWFkeSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwicmVtb3ZlLXBsYXllclwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVklFVyBSRU1PVkUgUExBWUVSXCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKHBsYXllci5pZCk7XG4gICAgICAgICAgICBpZih0aGlzLl9wbGF5ZXJWaWV3cykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzLmRlbGV0ZShwbGF5ZXIuaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gdGhpcy5nZXRQbGF5aW5nVmlld3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcImFkZC1lbmVteVwiLCAoZW5lbXkpPT57XG4gICAgICAgICAgICBsZXQgZW5lbXlWaWV3ID0gbmV3IEVuZW15VmlldyhlbmVteSk7XG4gICAgICAgICAgICBlbmVteVZpZXcubG9hZFJlc291cmNlcygpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9lbmVteVZpZXdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15Vmlld3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteVZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLl9lbmVteVZpZXdzXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlWaWV3cyA9IFtlbmVteVZpZXddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwic3RhcnQtYmF0dGxlXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2Uuc3RvcChcImR1bmdlb24tdGhlbWVcIik7XG4gICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImNvbWJhdC10aGVtZVwiLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gW1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX3ZpZXdzLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2VuZW15Vmlld3NcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJwbGF5ZXItY29vbGRvd25cIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKHBsYXllci5pc0xvY2FsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJjb29sZG93bi1yZWFkeVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInBsYXllci1hdHRhY2tcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKHBsYXllciA9PSB0aGlzLl9nYW1lLmxvY2FsUGxheWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmNsZWFyTGFzdE9wdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwiZW5kLWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnN0b3AoXCJjb21iYXQtdGhlbWVcIik7XG4gICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImR1bmdlb24tdGhlbWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl92aWV3cyA9IFtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb29tVmlldyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9wbGF5ZXJWaWV3cy52YWx1ZXMoKSxcbiAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXdcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVVpSW5wdXQoaW5wdXQpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBpbnB1dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgaW5wdXQgdG8gYWx0ZXIgdmlldyBhbmQgc2VlIGlmIHdlIG5lZWQgdG8gc2VuZCBlbnZlbnRzXG4gICAgICovXG4gICAgcmVnaXN0ZXJJbnB1dEhhbmRsZXJzKGlucHV0KSB7XG4gICAgICAgIC8vIFVwIGlucHV0XG4gICAgICAgIGlucHV0Lm9uKFwidXBcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFpbiBtZW51XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51Vmlldy51cCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEb3duIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiZG93blwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMZWZ0IElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwibGVmdFwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb2JieVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcubGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcubGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJpZ2h0IElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwicmlnaHRcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3LnJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5yaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbmZpcm0gSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJjb25maXJtXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcuY29uZmlybSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1zZWxlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCYWNrIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiYmFja1wiLCAoKT0+e1xuXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IoZW5lbXkpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLl9lbmVteSA9IGVuZW15O1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpdGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6ICd3dXJtLXNoZWV0LnBuZycsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc3ByaXRlLFxuICAgICAgICAgICAgc3ByaXRlLndpZHRoLzMqdGhpcy5mcmFtZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIDEwLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcbmltcG9ydCBQbGF5ZXIgICAgICAgICAgZnJvbSAnLi4vbW9kZWxzL29iamVjdHMvUGxheWVyJztcblxubGV0IGpvYkRpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5TZWxlY3QgSm9iPC9oMz5cbiAgICAgICAgPGxhYmVsPkpvYjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBuYW1lPVwiam9iXCI+XG4gICAgICAgIDwvc2VsZWN0Pjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY29uZmlybVwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGxvYmJ5LCBwbGF5ZXJzLCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKGxvYmJ5KTtcbiAgICAgICAgdGhpcy5fbG9iYnkgPSBsb2JieTtcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuX3BsYXllcnMgPSBwbGF5ZXJzO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlhbG9nT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9wZW5Kb2JEaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGpvYkRpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgbGV0IGNvbmZpcm1CdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjb25maXJtXCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IGpvYlNlbGVjdCA9IGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJqb2JcIl0nKTtcblxuICAgICAgICBmb3IobGV0IGpvYiBvZiBQbGF5ZXIuZ2V0Sm9icygpKSB7XG4gICAgICAgICAgICBsZXQgam9iT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgIGpvYk9wdGlvbi52YWx1ZSA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iT3B0aW9uLmlubmVySFRNTCA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iU2VsZWN0LmFwcGVuZENoaWxkKGpvYk9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogKCk9PntcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoam9iU2VsZWN0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZW1pdChcImpvYi1zZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JcIjogam9iU2VsZWN0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSAxMDA7XG4gICAgICAgIGxldCB5UG9zID0gMTAwO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dChcIk5BTUU6XCIsIDEwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIkpPQjpcIiwgMzAwLCB5UG9zKTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiUkVBRFk6XCIsIDUwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KDkwLCAxMTAsIDYwMCwgMTgwKTtcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgIHlQb3MgKz0gNDA7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQocGxheWVyLm5hbWUsIDEwMCwgeVBvcyk7XG5cbiAgICAgICAgICAgIGlmKHBsYXllci5qb2IpIHtcbiAgICAgICAgICAgICAgICBsZXQgam9iTmFtZSA9IHBsYXllci5qb2IubmFtZVswXS50b1VwcGVyQ2FzZSgpICsgcGxheWVyLmpvYi5uYW1lLnNsaWNlKDEpOztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoam9iTmFtZSwgMzAwLCB5UG9zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyLmN1cnJlbnRTdGF0ZSA9PSBcInJlYWR5XCIpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiIzAwZmYwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIlJFQURZXCIsIDUwMCwgeVBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmYwMDAwXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiTk9UIFJFQURZXCIsIDUwMCwgeVBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICBmb3IobGV0IG1lbnVPcHRpb24gb2YgdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBtZW51T3B0aW9uVGV4dCA9IG1lbnVPcHRpb247XG5cbiAgICAgICAgICAgIC8vIFNob3cgc2VsZWN0IGN1cnNvclxuICAgICAgICAgICAgaWYobWVudU9wdGlvblRleHQgPT0gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF0pXG4gICAgICAgICAgICAgICAgbWVudU9wdGlvblRleHQgPSBcIj4gXCIgKyBtZW51T3B0aW9uVGV4dDtcblxuICAgICAgICAgICAgLy8gRHJhdyBNZW51IE9wdGlvblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KG1lbnVPcHRpb25UZXh0LCB4UG9zLCAzMjApO1xuICAgICAgICAgICAgeFBvcyArPSAyMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2JieS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICB9XG5cbiAgICBsZWZ0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDApXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleC0tO1xuICAgIH1cblxuICAgIHJpZ2h0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCsrO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJTZWxlY3QgSm9iXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Kb2JEaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zZWxlY3RlZE9wdGlvbiA9PSBcIkxlYXZlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3LmVtaXQoXCJsZWF2ZS1nYW1lXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJSZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZHkgPSAhdGhpcy5fcmVhZHk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwicmVhZHlcIiwge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIFwic3RhdGVcIjogdGhpcy5fcmVhZHlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgIH1cblxuXG5cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyAgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJlc3JvdWNlU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9SZXNvdXJjZVNlcnZpY2UnO1xuXG5sZXQgaG9zdERpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5Ib3N0IE11bHRpcGxheWVyIEdhbWU8L2gzPlxuICAgICAgICA8bGFiZWw+TmFtZTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIj5cbiAgICAgICAgPGxhYmVsPklkIChvcHRpb25hbCk6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCI+PGJyPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJob3N0XCIgZGlzYWJsZWQ+SG9zdDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJjYW5jZWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmxldCBqb2luRGlhbG9nID0gYFxuICAgIDxkaXYgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgICAgPGgzPkpvaW4gTXVsdGlwbGF5ZXIgR2FtZTwvaDM+XG4gICAgICAgIDxsYWJlbD5OYW1lOiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiPlxuICAgICAgICA8bGFiZWw+SG9zdCBJZDogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhvc3RcIj5cbiAgICAgICAgPGxhYmVsPklkIChvcHRpb25hbCk6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCI+PGJyPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJqb2luXCIgZGlzYWJsZWQ+Sm9pbjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJjYW5jZWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IobWFpbk1lbnUsIHZpZXcpIHtcbiAgICAgICAgc3VwZXIobWFpbk1lbnUpO1xuICAgICAgICB0aGlzLl9tYWluTWVudSA9IG1haW5NZW51O1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2RpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeFBvcyA9IDEwMDtcbiAgICAgICAgbGV0IHlQb3MgPSAxMDA7XG5cbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgMTAwLCB5UG9zKTtcbiAgICAgICAgICAgIHlQb3MgKz0gMTAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFpbk1lbnUuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgb3Blbkhvc3REaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGhvc3REaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG4gICAgICAgIGxldCBob3N0QnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiaG9zdFwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBuYW1lSW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGxldCBpZElucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpZFwiXScpO1xuXG4gICAgICAgIHZpZXcuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAgICAgbmFtZUlucHV0Lm9uaW5wdXQgPSAoKT0+e1xuICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGhvc3RCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvc3RCdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5lbWl0KFwic3RhcnQtbXBcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkSW5wdXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9wZW5Kb2luRGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhqb2luRGlhbG9nLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2MuZmlyc3RDaGlsZDtcblxuXG4gICAgICAgIGxldCBqb2luQnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiam9pblwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBuYW1lSW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgbGV0IGhvc3RJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaG9zdFwiXScpO1xuICAgICAgICBsZXQgaWRJbnB1dCAgICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpZFwiXScpO1xuXG4gICAgICAgIHZpZXcuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAgICAgbGV0IGNoZWNrSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgJiYgaG9zdElucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIGpvaW5CdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGpvaW5CdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5hbWVJbnB1dC5vbmlucHV0ID0gY2hlY2tJbnB1dC5iaW5kKHRoaXMpO1xuICAgICAgICBob3N0SW5wdXQub25pbnB1dCA9IGNoZWNrSW5wdXQuYmluZCh0aGlzKTtcblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgam9pbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgJiYgaG9zdElucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmVtaXQoXCJzdGFydC1tcFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBob3N0SWQ6IGhvc3RJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZElucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgaWYoIXRoaXMuX2RpYWxvZylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID8gMCA6IDE7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJIb3N0IEdhbWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbkhvc3REaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkpvaW5EaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZygpO1xuICAgIH1cblxuXG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICB0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgbG9hZFJlc291cmNlKG5hbWUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzLycgKyByZXNvdXJjZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcmVzb3VyY2UgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChuYW1lLCBpbWcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhbGwgcmVzb3VyY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG9iamVjdFxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZVByb21pc2VzID0gW107XG4gICAgICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VydmljZS5sb2FkSW1hZ2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBQcm9taXNlLmFsbChyZXNvdXJjZVByb21pc2VzKS50aGVuKChpbWFnZXMpPT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KGltYWdlLm5hbWUsIGltYWdlLmltYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIFByb21pc2VcbiAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxubGV0IEpPQl9TUFJJVEVTID0ge1xuICAgIFwiY2xhaXJ2b3lhbnRcIjogXCJjbGFpcnZveWFudC1zaGVldC5wbmdcIixcbiAgICBcImhlcmJhbGlzdFwiOiBcImhlcmJhbGlzdC1zaGVldC5wbmdcIixcbiAgICBcInZpbGxhaW5cIjogXCJ2aWxsYWluMi1zaGVldC5wbmdcIixcbiAgICBcImtuaWdodFwiOiBcImtuaWdodC1zaGVldC5wbmdcIixcbiAgICBcIm5lY3JvbWFuY2VyXCI6IFwibmVjcm9tYW5jZXItc2hlZXQucG5nXCIsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgICAgICBzdXBlcihwbGF5ZXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZJRVdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllcik7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic3ByaXRlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBKT0JfU1BSSVRFU1twbGF5ZXIuam9iLm5hbWVdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzaGFkb3dcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwic2hhZG93LnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJidWJibGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwiYnViYmxlLnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSAgICAgID0gKGZyYW1lIDwgQ29uZmlnLkZQUy8yKSA/IDAgOiAxO1xuXG4gICAgICAgIGxldCBwbGF5ZXJXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIGxldCB4T2Zmc2V0ID0gQ29uZmlnLlRJTEVfWCAtIDM7XG4gICAgICAgIGlmKHRoaXMuX3BsYXllci5wb3NpdGlvbiA9PSBcImJhY2tcIikge1xuICAgICAgICAgICAgeE9mZnNldCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNoYWRvdyAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93Jyk7XG5cbiAgICAgICAgbGV0IGJ1YmJsZSAgICAgICA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2J1YmJsZScpO1xuICAgICAgICBsZXQgYnViYmxlV2lkdGggID0gYnViYmxlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGxldCBidWJibGVIZWlnaHQgPSBidWJibGUuaGVpZ2h0LzUqQ29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgICAgICAvLyBEcmF3IFNoYWRvd1xuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNoYWRvdyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHNoYWRvdy53aWR0aCwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWCBQb3NcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci55UG9zKihwbGF5ZXJXaWR0aCkgKyAocGxheWVyV2lkdGgpIC0gKENvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93JykuaGVpZ2h0LzEuNzUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gRHJhdyBQbGF5ZXIgU3ByaXRlXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJyksXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIuY3VycmVudFN0YXRlID09PSBcIndhbGtpbmdcIiA/IENvbmZpZy5TUFJJVEVfU0laRSoodGhpcy5mcmFtZSkgOiAwLCAvLyBEWFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHhPZmZzZXQqKHBsYXllcldpZHRoKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIERyYXcgQnViYmxlXG4gICAgICAgIGxldCBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICBzd2l0Y2godGhpcy5fcGxheWVyLmN1cnJlbnRBY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ0aGlua2luZ1wiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXR0YWNrXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRlZmVuZFwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSoyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhYmlsaXR5XCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9wbGF5ZXIuY3VycmVudEFjdGlvbiAhPT0gXCJ3YWxrXCIgJiYgdGhpcy5fcGxheWVyLmN1cnJlbnRBY3Rpb24gIT09IFwicmVhZHlcIikge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQsIC8vIERZXG4gICAgICAgICAgICAgICAgYnViYmxlLndpZHRoLCAgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlLmhlaWdodC81LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpIC0gKGJ1YmJsZVdpZHRoLzEuNSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllci55UG9zKihwbGF5ZXJXaWR0aCkgLSAoYnViYmxlSGVpZ2h0LzEuNSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgICAgIGJ1YmJsZVdpZHRoLCAgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlSGVpZ2h0ICAvLyBzSGVpZ2h0XG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbi8vIFN0YXRpYyBSb29tIFR5cGVzXG4vL3N0YXRpYyBnZXQgVFlQRV9DQVZFKCkge1xuICAgIC8vcmV0dXJuIHtcbiAgICAgICAgLy9mbG9vcjogJ2dvb2R0aWxlLnBuZycsXG4gICAgICAgIC8vd2FsbDogJ3NoaXR3YWxsLnBuZydcbiAgICAvL307XG4vL31cblxuLy9zdGF0aWMgZ2V0IFRZUEVfVEVNUExFKCkge1xuICAgIC8vcmV0dXJuIHtcbiAgICAgICAgLy9mbG9vcjogJ2dyYXNzLnBuZycsXG4gICAgICAgIC8vd2FsbDogJ3BpbGxhcnMucG5nJ1xuICAgIC8vfTtcbi8vfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHJvb20pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcm9vbSA9IHJvb207XG4gICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fd2FsbE9mZnNldCAgPSAwO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJmbG9vclwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJnb29kdGlsZS5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwid2FsbFwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJzaGl0d2FsbDIucG5nXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwiZmxvb3JcIiwgXCJnb29kdGlsZS5wbmdcIiksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcIndhbGxcIiwgIFwic2hpdHdhbGwyLnBuZ1wiKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTJTIpID8gMCA6IDE7XG4gICAgICAgIHRoaXMuZnJhbWUgPSBmcmFtZSUyO1xuXG4gICAgICAgIC8vIFJlbmRlciBGbG9vclxuICAgICAgICBsZXQgZmxvb3IgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdmbG9vcicpO1xuICAgICAgICBsZXQgZmxvb3JXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLlRJTEVfWCsxOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBDb25maWcuVElMRV9ZIC0gNDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgICAgIGZsb29yLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKyBmbG9vcldpZHRoKnggLSBmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICAoeSsyKSpmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXIgV2FsbFxuICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKTtcbiAgICAgICAgbGV0IHdhbGxXaWR0aCA9IHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHdhbGxXaWR0aCkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHdhbGwsXG4gICAgICAgICAgICAgICAgMCwgLy8gRFhcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yKnRoaXMuZnJhbWUsIC8vRFlcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArIHdhbGxXaWR0aCp4IC0gd2FsbFdpZHRoLCAvL3N4XG4gICAgICAgICAgICAgICAgMCwgLy9zeVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFLzJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIE9mZnNldHNcbiAgICAgICAgbGV0IHhTdGVwID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgIGlmKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09IFwibW92aW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fZmxvb3JPZmZzZXQgPj0gZmxvb3JXaWR0aCAtIDEpIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX3dhbGxPZmZzZXQgPiB3YWxsV2lkdGggLSAxKSB0aGlzLl93YWxsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBMb2dnZXIgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcih1aSwgcGxheWVycywgdmlldykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl91aSAgICAgICAgID0gdWk7XG4gICAgICAgIHRoaXMuX3ZpZXcgICAgICAgPSB2aWV3O1xuICAgICAgICB0aGlzLl9wbGF5ZXJzICAgID0gcGxheWVycztcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJVSSBQTEFZRVJTXCIpO1xuICAgICAgICBMb2dnZXIubG9nKHRoaXMuX3BsYXllcnMpO1xuXG4gICAgICAgIHRoaXMuX3RpbGVIZWlnaHQgPSAyO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJiZ1wiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJ1aS1iZy5wbmdcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIGxldCB5UG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBEcmF3IEJhY2tncm91bmRcbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHlQb3MsXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodCAtIDMwMFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCB1aVJlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeVBvcyxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC4uLmJnUmVjdCk7XG5cbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwiIzY0QTM1N1wiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwiIzAwMzcwMFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3QoLi4udWlSZWN0KTtcblxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM4RDgwNDVcIjtcblxuICAgICAgICAvLyBUaGUgc3Ryb2tlIGlzIG1pZGRsZSBhbGlnbmVkIHdpdGggdGhlIGVkZ2VzIG9mIHRoZSBib3hcbiAgICAgICAgbGV0IGxpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzMyO1xuICAgICAgICAvL2xldCBsaW5lV2lkdGggPSA1O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIGxldCBzdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIHN0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICBzdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMTtcbiAgICAgICAgbGV0IHBhdGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuX3Jlc291cmNlcy5nZXQoXCJiZ1wiKSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIHlQb3MgKz0gQ29uZmlnLlRJTEVfU0laRS8zO1xuXG4gICAgICAgIGxldCBmb250U2l6ZSAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSBDb25maWcuVElMRV9TSVpFKjEuMjtcblxuICAgICAgICAvLyBEcmF3IEluZm9cbiAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMCA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMF0sXG4gICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgeVBvc1xuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1sxXSxcbiAgICAgICAgICAgIHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICB5UG9zXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzJdLFxuICAgICAgICAgICAgeFBvcyxcbiAgICAgICAgICAgIHlQb3MgKyBmb250U2l6ZSoyXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzNdLFxuICAgICAgICAgICAgeFBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgIHlQb3MgKyBmb250U2l6ZSoyXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHhQb3MgPSBDb25maWcuVElMRV9TSVpFKjU7XG4gICAgICAgIHlQb3MgPSBDb25maWcuVElMRV9TSVpFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuXG4gICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSW5mb1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICB5UG9zICs9IGZvbnRTaXplKjI7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIE5hbWVzXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIHBsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgIHhQb3MsXG4gICAgICAgICAgICAgICAgeVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIC8vIERlZmluZSBjb29sZG93biB2YXJzXG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJZUG9zICAgPSB5UG9zICsgZm9udFNpemUvMjtcbiAgICAgICAgICAgIGxldCBjb29sZG93bkJhcldpZHRoICA9IENvbmZpZy5USUxFX1NJWkU7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJIZWlnaHQgPSBmb250U2l6ZS8yO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIENvb2xkb3duIEZpbGxcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMEZGMDBcIjtcbiAgICAgICAgICAgIGxldCBjb29sZG93blBlcmNlbnRhZ2UgPSBwbGF5ZXIuY29vbGRvd24vcGxheWVyLm1heENvb2xkb3duO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHhQb3MsIGNvb2xkb3duQmFyWVBvcywgY29vbGRvd25CYXJXaWR0aCpjb29sZG93blBlcmNlbnRhZ2UsIGNvb2xkb3duQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBDb29sZG93biBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeFBvcywgY29vbGRvd25CYXJZUG9zLCBjb29sZG93bkJhcldpZHRoLCBjb29sZG93bkJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIERlZmluZSBIZWFsdGhiYXIgdmFyc1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhclhQb3MgICA9IHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyWVBvcyAgID0geVBvcyAtIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyV2lkdGggID0gQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhckhlaWdodCA9IGZvbnRTaXplLzI7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIEZpbGxcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRjAwMDBcIjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhQZXJjZW50YWdlID0gcGxheWVyLmhlYWx0aC9wbGF5ZXIubWF4SGVhbHRoO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoKmhlYWx0aFBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIuaGVhbHRofS8ke3BsYXllci5tYXhIZWFsdGh9YCxcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXJYUG9zK2hlYWx0aEJhcldpZHRoKzIqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXJZUG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgaGVhbHRoQmFyWVBvcyArPSBoZWFsdGhCYXJIZWlnaHQqMS41O1xuXG4gICAgICAgICAgICAvL2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIC8vY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMEZGXCI7XG4gICAgICAgICAgICBsZXQgbWFuYVBlcmNlbnRhZ2UgPSBwbGF5ZXIubWFuYS9wbGF5ZXIubWF4TWFuYTtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCptYW5hUGVyY2VudGFnZSwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggU3Ryb2tlXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggICA9IDEqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3BsYXllci5tYW5hfS8ke3BsYXllci5tYXhNYW5hfWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSlcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAzKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDE7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgIH1cblxuICAgIGxlZnQoKSB7XG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDEpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDM7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAyO1xuICAgIH1cblxuICAgIHJpZ2h0KCkge1xuICAgICAgICB0aGlzLmxlZnQoKTtcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBsZXQgY3VycmVudE9wdGlvbiA9IHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdO1xuICAgICAgICBpZihjdXJyZW50T3B0aW9uICE9PSB0aGlzLl9sYXN0T3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl92aWV3LmVtaXQoXCJvcHRpb24tc2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgXCJvcHRpb25cIjogdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbGFzdE9wdGlvbiA9IGN1cnJlbnRPcHRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckxhc3RPcHRpb24oKSB7XG4gICAgICAgIHRoaXMuX2xhc3RPcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxufVxuIl19
