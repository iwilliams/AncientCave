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
                _this._dispatcher.emit("start-game");
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

JOBS.set("ninja", {
    'name': 'ninja',
    'health': 60,
    'mana': 30,
    'cooldown': 30,
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
    "necromancer": "necromancer-sheet.png",
    "ninja": "ninja-sheet.png"
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbWl4aW5zL2V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL0xvYmJ5LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTWFpbk1lbnUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUm9vbS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9OZXR3b3JrU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1JuZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1NvdW5kU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1V0aWxzLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvQ2FudmFzMmQuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9FbmVteVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Mb2JieVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9NYWluTWVudVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9PYmplY3RWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21WaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt5QkNBbUIsY0FBYzs7Ozs7QUFHakMsSUFBSSxNQUFNLEdBQUcsMkJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDUHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7OztBQUc1QixNQUFNLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQztBQUM1QixNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFFNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxBQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDOztBQUV6RSxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVc7O0FBRTFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOztBQUV0QixVQUFNLENBQUMsV0FBVyxHQUFLLEVBQUUsQ0FBQzs7O0FBRzFCLFFBQUksV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDcEMsT0FBRztBQUNDLGNBQU0sQ0FBQyxZQUFZLEdBQUssV0FBVyxFQUFFLEdBQUMsTUFBTSxDQUFDLFVBQVUsQUFBQyxDQUFDO0FBQ3pELGNBQU0sQ0FBQyxhQUFhLEdBQUcsQUFBQyxNQUFNLENBQUMsWUFBWSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQztLQUN6RixRQUFPLE1BQU0sQ0FBQyxhQUFhLEdBQUMsTUFBTSxDQUFDLFdBQVcsS0FBSyxDQUFDLEVBQUM7Ozs7Ozs7OztBQVV0RCxVQUFNLENBQUMsWUFBWSxHQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUUsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsV0FBVyxDQUFBLEFBQUMsQ0FBQztBQUM5RSxVQUFNLENBQUMsU0FBUyxHQUFPLE1BQU0sQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs7O0FBRzlELFVBQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0NBQ25CLENBQUE7O0FBRUQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDOztxQkFFSixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7O3NCQzlDRixXQUFXOzs7Ozs7MEJBRWIsZUFBZTs7Ozs7OzZCQUdmLGtCQUFrQjs7Ozs7O29DQUdaLHlCQUF5Qjs7Ozs7QUFHakMsd0JBQUc7OztBQUNWLFlBQUksQ0FBQyxLQUFLLEdBQVMsNkJBQVUsQ0FBQztBQUM5QixZQUFJLENBQUMsS0FBSyxHQUFTLGdDQUFVLENBQUM7QUFDOUIsWUFBSSxDQUFDLFdBQVcsR0FBRyx1Q0FBZ0IsQ0FBQzs7QUFFcEMsY0FBTSxDQUFDLElBQUksR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQy9CLGNBQU0sQ0FBQyxJQUFJLEdBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUMvQixjQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDeEM7Ozs7Ozs7O2VBS0csZ0JBQUc7OztBQUNILG1CQUFPLENBQUMsR0FBRyxDQUFDLENBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQ1Isc0JBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN2QyxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEJDaENzQixvQkFBb0I7Ozs7a0NBQ3BCLHdCQUF3Qjs7OztzQ0FDeEIsNEJBQTRCOzs7Ozs7O0FBR3hDLHdCQUFHOzs7QUFDVix3RkFBUTtLQUNYOzs7O2VBRUcsY0FBQyxJQUFJLEVBQUU7QUFDUCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsZ0JBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7OztlQUVrQiw2QkFBQyxPQUFPLEVBQUU7OztBQUN6QixnQkFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVkLGdCQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDZixvQkFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekMsTUFBTTtBQUNILG9CQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7O0FBRUQsZ0JBQUksQ0FBQyxlQUFlLDBGQUF5QixJQUFJLE1BQUMsQ0FBQztBQUNuRCxnQkFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBSTtBQUNqQyxzQkFBSywyQkFBMkIsQ0FBQyxNQUFLLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZELDRDQUFPLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQ3pELHNCQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDcEIsd0JBQUksRUFBRSxNQUFNLEVBQUU7QUFDZCwwQkFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJO0FBQ3BCLDZCQUFTLEVBQUUsSUFBSTtpQkFDbEIsQ0FBQyxDQUFDO0FBQ0gsc0JBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxPQUFPLENBQUMsQ0FBQzthQUNwQyxDQUFDLENBQUM7U0FDTjs7O2VBRVEscUJBQUc7QUFDUixnQkFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQyxnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7U0FDeEM7Ozs7Ozs7ZUFLVSxxQkFBQyxPQUFPLEVBQUU7QUFDakIsd0NBQU8sS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDakQsd0NBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVwQix3Q0FBTyxLQUFLLENBQUMsMENBQTBDLENBQUMsQ0FBQztBQUN6RCxnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDcEIsb0JBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtBQUNsQixzQkFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSTtBQUN6QixxQkFBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRzthQUMxQixDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUthLHdCQUFDLE9BQU8sRUFBRTtBQUNwQix3Q0FBTyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUNwRCx3Q0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXBCLHdDQUFPLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0FBQzVELGdCQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN2QixvQkFBSSxFQUFFLE9BQU87YUFDaEIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7ZUFLMEIscUNBQUMsa0JBQWtCLEVBQUU7OztBQUM1Qyw4QkFBa0IsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEUsOEJBQWtCLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRXpFLDhCQUFrQixDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDN0MsdUJBQUssSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN0QyxDQUFDLENBQUM7O0FBRUgsOEJBQWtCLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLE9BQU8sRUFBRztBQUMzQyx1QkFBSyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQzs7QUFFSCw4QkFBa0IsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQzlDLHVCQUFLLElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdkMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7ZUFLbUIsOEJBQUMsSUFBSSxFQUFFOzs7QUFDdkIsZ0JBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN6RCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBSTtBQUN0Qix1QkFBSyxTQUFTLEVBQUUsQ0FBQTthQUNuQixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQzdCLDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQix1QkFBSyxlQUFlLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1Qyx1QkFBSyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDeEIsb0JBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUM3Qyx1QkFBSyxlQUFlLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLHVCQUFLLElBQUksQ0FBQyxjQUFjLEVBQUU7QUFDdkIsd0JBQUksRUFBRSxPQUFPLENBQUMsRUFBRTtBQUNmLDJCQUFPLEVBQUUsS0FBSztpQkFDakIsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFDLE9BQU8sRUFBRztBQUNoQyx1QkFBSyxlQUFlLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNsRCx1QkFBSyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3ZDLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3JITCxJQUFJLHFCQUFxQixHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsU0FBUyxLQUFLLENBQUMsT0FBTyxFQUFVO29DQUFMLElBQUk7QUFBSixRQUFJOzs7QUFDN0IsU0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDcEQsU0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO0NBQ2hCOzs7QUFJYyxzQkFBRzs7O0FBQ1YsUUFBSSxDQUFDLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQTtBQUMxQyxRQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtHQUNwQjs7OztXQUVDLFlBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUNoQixVQUFHLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtBQUNoQyxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7Ozs7OztBQUNELDZCQUFnQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyw4SEFBRTtjQUExQixJQUFJOztBQUNSLGNBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFBO0FBQzlELGNBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUNwQyxtQkFBTyxJQUFJLENBQUE7V0FDWjtBQUNELG1CQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3hCLGNBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3hDLGlCQUFLLENBQ0gsK0NBQStDLEdBQy9DLGtEQUFrRCxHQUNsRCxxQ0FBcUMsRUFDckMsU0FBUyxDQUFDLE1BQU0sRUFDaEIsSUFBSSxFQUNKLElBQUksQ0FBQyxhQUFhLENBQ25CLENBQUE7V0FDRjtTQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsYUFBTyxJQUFJLENBQUE7S0FDZDs7O1dBRUcsY0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ2pCLFVBQUksY0FBYyxHQUFHLElBQUksQ0FBQTtBQUN6QixlQUFTLFlBQVksR0FBRTtBQUNyQixzQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7QUFDdEMsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO09BQ2hDO0FBQ0QsYUFBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQTtLQUNyQzs7O1dBRUUsYUFBQyxJQUFJLEVBQVc7eUNBQU4sSUFBSTtBQUFKLFlBQUk7OztBQUNiLFVBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7QUFDbkIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7T0FDMUI7QUFDRCxVQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEIsVUFBRyxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDaEMsY0FBTSxJQUFJLFNBQVMsRUFBRSxDQUFBO09BQ3RCO0FBQ0QsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQyxVQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNsQyxlQUFPLElBQUksQ0FBQTtPQUNaO0FBQ0QsVUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNqRCxVQUFHLGVBQWUsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN4QixlQUFPLElBQUksQ0FBQTtPQUNaO0FBQ0QsZUFBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDcEMsYUFBTyxJQUFJLENBQUE7S0FDZDs7O1dBRUcsY0FBQyxJQUFJLEVBQVU7eUNBQUwsSUFBSTtBQUFKLFlBQUk7OztBQUNkLFVBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEMsVUFBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDbEMsZUFBTyxLQUFLLENBQUE7T0FDYjtBQUNELGVBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2VBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO09BQUEsQ0FBQyxDQUFBO0FBQzdDLGFBQU8sSUFBSSxDQUFBO0tBQ2Q7OztXQUVjLHlCQUFDLGVBQWUsRUFBQztBQUM1QixVQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxlQUFlLEVBQUU7QUFDaEQsY0FBTSxJQUFJLFNBQVMsRUFBRSxDQUFBO09BQ3RCO0FBQ0QsVUFBSSxDQUFDLGFBQWEsR0FBRyxlQUFlLENBQUE7S0FDdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZMLElBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFBOztBQUU5QixTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQVU7b0NBQUwsSUFBSTtBQUFKLFFBQUk7OztBQUM3QixTQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxTQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7Q0FDaEI7OztBQUljLHNCQUFHOzs7QUFDVixRQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFBO0FBQzFDLFFBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO0dBQ3BCOzs7O1dBRUMsWUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2hCLFVBQUcsT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO0FBQ2hDLGNBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQTtPQUN0Qjs7Ozs7O0FBQ0QsNkJBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLDhIQUFFO2NBQTFCLElBQUk7O0FBQ1IsY0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUE7QUFDOUQsY0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLG1CQUFPLElBQUksQ0FBQTtXQUNaO0FBQ0QsbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDeEIsY0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDeEMsaUJBQUssQ0FDSCwrQ0FBK0MsR0FDL0Msa0RBQWtELEdBQ2xELHFDQUFxQyxFQUNyQyxTQUFTLENBQUMsTUFBTSxFQUNoQixJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQTtXQUNGO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFRyxjQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDakIsVUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFBO0FBQ3pCLGVBQVMsWUFBWSxHQUFFO0FBQ3JCLHNCQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUN0QyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7T0FDaEM7QUFDRCxhQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO0tBQ3JDOzs7V0FFRSxhQUFDLElBQUksRUFBVzt5Q0FBTixJQUFJO0FBQUosWUFBSTs7O0FBQ2IsVUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNuQixZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtPQUMxQjtBQUNELFVBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN0QixVQUFHLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtBQUNoQyxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7QUFDRCxVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFVBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ2xDLGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxVQUFJLGVBQWUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2pELFVBQUcsZUFBZSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxlQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNwQyxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFRyxjQUFDLElBQUksRUFBVTt5Q0FBTCxJQUFJO0FBQUosWUFBSTs7O0FBQ2QsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQyxVQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNsQyxlQUFPLEtBQUssQ0FBQTtPQUNiO0FBQ0QsZUFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7ZUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7T0FBQSxDQUFDLENBQUE7QUFDN0MsYUFBTyxJQUFJLENBQUE7S0FDZDs7O1dBRWMseUJBQUMsZUFBZSxFQUFDO0FBQzVCLFVBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLGVBQWUsRUFBRTtBQUNoRCxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7QUFDRCxVQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQTtLQUN2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDakZvQix3QkFBd0I7Ozs7OEJBQ3hCLG9CQUFvQjs7Ozs7OztBQUk5Qix3QkFBRzs7O0FBQ1Ysd0ZBQVE7S0FDWDs7OzthQVNlLGFBQUMsS0FBSyxFQUFFO0FBQ3BCLGdCQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hCLG9CQUFJLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQzthQUM5QjtTQUNKO2FBRWUsZUFBRztBQUNmLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0N2Qm9CLHdCQUF3Qjs7Ozs7OzZCQUczQixtQkFBbUI7Ozs7OEJBQ25CLG9CQUFvQjs7OztzQkFDcEIsY0FBYzs7OzsyQkFDZCxpQkFBaUI7Ozs7OzswQkFHakIsYUFBYTs7Ozs2QkFDYixrQkFBa0I7Ozs7OEJBQ2xCLG1CQUFtQjs7OzsyQkFDbkIsZ0JBQWdCOzs7OytCQUNoQixvQkFBb0I7Ozs7NEJBQ3BCLGlCQUFpQjs7Ozt5QkFDakIsY0FBYzs7Ozs7OztBQUlyQix3QkFBRzs7O0FBQ1Ysd0ZBQVE7QUFDUixZQUFJLENBQUMsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLENBQ25CLFdBQVcsRUFDWCxPQUFPLEVBQ1AsU0FBUyxDQUNaLENBQUMsQ0FBQzs7QUFFSCxZQUFJLENBQUMsU0FBUyxHQUFHLGtDQUFjLENBQUM7QUFDaEMsWUFBSSxDQUFDLE1BQU0sR0FBTSwrQkFBVyxDQUFDO0tBQ2hDOzs7Ozs7Ozs7OztlQVFHLGNBQUMsVUFBVSxFQUFFOzs7QUFDYixtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUc7QUFDM0Isc0JBQUssV0FBVyxHQUFHLFVBQVUsQ0FBQzs7QUFFOUIsc0JBQUssUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7OztBQUcxQixzQkFBSyxrQkFBa0IsQ0FBQyxNQUFLLFdBQVcsQ0FBQyxDQUFDOztBQUUxQyxtQkFBRyxFQUFFLENBQUM7YUFDVCxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7O2VBcUJlLDRCQUFHOztBQUVmLGdCQUFHLElBQUksQ0FBQyxZQUFZLEtBQUssT0FBTyxFQUFFO0FBQzlCLG9CQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7Ozs7OztBQUN4Qix5Q0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsOEhBQUU7NEJBQWpDLE1BQU07O0FBQ1Ysb0NBQVksR0FBRyxZQUFZLElBQUksTUFBTSxDQUFDLFlBQVksS0FBSyxPQUFPLENBQUM7cUJBQ2xFOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsNENBQU8sS0FBSyxDQUFDLHFCQUFxQixHQUFHLFlBQVksQ0FBQyxDQUFDOztBQUVuRCxvQkFBRyxZQUFZLEVBQUU7QUFDYixnREFBTyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDL0Isd0JBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztpQkFDeEI7YUFDSjtTQUNKOzs7ZUFFZ0IsMkJBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRTtBQUMxQixnQkFBRyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTtBQUNoQyxvQkFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxNQUFNLEVBQUU7QUFDbEMsd0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQzs7Ozs7O0FBQ3ZCLDhDQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtSUFBRTtnQ0FBakMsTUFBTTs7QUFDVix1Q0FBVyxHQUFHLFdBQVcsSUFBSSxNQUFNLENBQUMsYUFBYSxLQUFLLE9BQU8sQ0FBQzt5QkFDakU7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCx3QkFBRyxXQUFXLEVBQUU7QUFDWiw0QkFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3FCQUMxQjtpQkFDSixNQUFNLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksUUFBUSxFQUFFO0FBQzVDLHdCQUFHLE9BQU8sS0FBSyxRQUFRLEVBQUU7QUFDckIsNEJBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pCO2lCQUNKO2FBQ0o7U0FDSjs7Ozs7OztlQXdDUyxzQkFBRztBQUNULGdCQUFJLENBQUMsWUFBWSxHQUFHLFdBQVcsQ0FBQztTQUNuQzs7O2VBRWdCLDZCQUFHO0FBQ2hCLGdCQUFJLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQztTQUMvQjs7O2VBRVkseUJBQUc7O0FBRVosZ0JBQUksQ0FBQyxLQUFLLEdBQVUsOEJBQVUsQ0FBQztBQUMvQixnQkFBSSxDQUFDLEdBQUcsR0FBWSw0QkFBUSxDQUFDO0FBQzdCLGdCQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztTQUNqQzs7O2VBRWMsMkJBQUc7Ozs7QUFFZCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDOzs7Ozs7OztBQUduQyxzQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUlBQUU7d0JBQWpDLE1BQU07O0FBQ1YsMEJBQU0sQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO2lCQUNuQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0QsZ0JBQUksS0FBSyxHQUFHLGlDQUFXLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU5QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNwQixLQUFLLENBQ1IsQ0FBQyxDQUFDOztBQUVILHNCQUFVLENBQUMsWUFBSTtBQUNYLHVCQUFLLFlBQVksRUFBRSxDQUFDO2FBQ3ZCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDWjs7O2VBRVcsd0JBQUc7QUFDWCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ25DLGdCQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7OztBQUM1QixzQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUlBQUU7d0JBQWpDLE1BQU07O0FBQ1YsMEJBQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNyQiwwQkFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQy9EOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsZ0JBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDN0I7OztlQUVtQiw4QkFBQyxNQUFNLEVBQUU7QUFDekIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDckMsZ0JBQUcsTUFBTSxDQUFDLGFBQWEsS0FBSyxRQUFRLEVBQUU7QUFDbEMsb0JBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDOUI7U0FDSjs7O2VBRVksdUJBQUMsQ0FBQyxFQUFFO0FBQ2IsZ0JBQUcsQ0FBQyxDQUFDLGFBQWEsRUFBRTtBQUNoQixvQkFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0FBQ3BCLGlCQUFDLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUN2RCxvQkFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDakM7U0FDSjs7O2VBRVcsd0JBQUc7QUFDWCxnQkFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDOzs7Ozs7QUFDM0Isc0NBQWlCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLG1JQUFFO3dCQUFqQyxLQUFLOztBQUNULHlCQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDZixtQ0FBZSxHQUFHLGVBQWUsSUFBSyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQUFBQyxDQUFDO2lCQUM1RDs7Ozs7Ozs7Ozs7Ozs7OztBQUVELGdCQUFHLGVBQWUsRUFBRTtBQUNoQixvQkFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO2FBQ3JCO1NBQ0o7OztlQUVTLHNCQUFHO0FBQ1QsZ0JBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUNqQyxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUMxQixnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7Ozs7OztBQUV4QixzQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUlBQUU7d0JBQWpDLE1BQU07O0FBQ1YsMEJBQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztpQkFDdEI7Ozs7Ozs7Ozs7Ozs7OztTQUNKOzs7Ozs7O2VBS2lCLDRCQUFDLFVBQVUsRUFBRTs7O0FBQzNCLHNCQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3hELHNCQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztBQUcvRCxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDbkMsdUJBQUssWUFBWSxHQUFHLE9BQU8sQ0FBQzthQUMvQixDQUFDLENBQUM7O0FBRUgsc0JBQVUsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQ25DLDRDQUFPLEtBQUssQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO0FBQ2xELDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEIsb0JBQUksQ0FBQyxHQUFHLCtCQUFXLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFELGlCQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDZCwyQkFBSyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDdEMsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDOzs7QUFHSCxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDdEMsNENBQU8sS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7QUFDckQsNENBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7QUFHcEIsb0JBQUksY0FBYyxHQUFHLE9BQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkQsb0JBQUksYUFBYSxHQUFHLE9BQUssUUFBUSxVQUFPLENBQUMsY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7QUFHNUQsb0JBQUcsYUFBYSxFQUFFO0FBQ2QsMkJBQUssSUFBSSxDQUFDLGVBQWUsRUFBRSxjQUFjLENBQUMsQ0FBQzs7QUFFM0Msd0JBQUcsT0FBSyxZQUFZLElBQUksT0FBTyxFQUFFOzs7Ozs7QUFDN0Isa0RBQWtCLE9BQUssUUFBUSxDQUFDLE1BQU0sRUFBRSxtSUFBRTtvQ0FBbEMsTUFBTTs7QUFDVixzQ0FBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7NkJBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7cUJBQ0o7aUJBQ0o7YUFDSixDQUFDLENBQUM7OztBQUdILHNCQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLE9BQU8sRUFBRztBQUNuQyxvQkFBSSxNQUFNLEdBQUcsT0FBSyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUMzQyxzQkFBTSxDQUFDLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO2FBQzVCLENBQUMsQ0FBQzs7O0FBR0gsc0JBQVUsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQ3JDLDRDQUFPLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO0FBQzNELDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEIsb0JBQUksTUFBTSxHQUFHLE9BQUssUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDM0Msc0JBQU0sQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQzs7O0FBR3BDLHVCQUFLLGdCQUFnQixFQUFFLENBQUM7YUFDM0IsQ0FBQyxDQUFDOzs7O0FBSUgsc0JBQVUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQ3RDLG9CQUFJLE1BQU0sR0FBRyxPQUFLLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLHNCQUFNLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDdEMsdUJBQUssaUJBQWlCLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNsRCxDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUtRLG1CQUFDLENBQUMsRUFBRSxPQUFPLEVBQUU7QUFDbEIsd0NBQU8sS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEMsd0NBQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2QsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckMsZ0JBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQ2Qsc0NBQWtCLE9BQU8sbUlBQUU7d0JBQW5CLE1BQU07O0FBQ1Ysd0JBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ25CLDBCQUFNLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztpQkFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxnQkFBSSxJQUFJLEdBQUcsQ0FBQztBQUNaLGFBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2QsZ0JBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDM0IsZ0JBQUcsT0FBTyxFQUFFO0FBQ1Isb0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO2FBQ3pCO0FBQ0QsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQzlCOzs7YUF0UWUsYUFBQyxLQUFLLEVBQUU7QUFDcEIsZ0JBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDeEIsb0JBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO0FBQzNCLG9CQUFHLElBQUksQ0FBQyxhQUFhLElBQUksV0FBVyxFQUFFOztBQUVsQyx3QkFBSSxDQUFDLFFBQVEsR0FBTyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQzlCLHdCQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsQ0FBQztpQkFDakM7QUFDRCxvQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQy9DO1NBQ0o7YUE4Q2UsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7U0FBQzs7Ozs7OzthQUtuQyxlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUFDOzs7Ozs7O2FBSzlCLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQUM7Ozs7Ozs7YUFLdEIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7U0FBQzs7Ozs7OzthQUt0QixlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUFDOzs7Ozs7O2FBS3JDLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQUM7Ozs7Ozs7YUFLekIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDN0lULGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdyQix3QkFBRzs7O0FBQ1Ysd0ZBQVE7O0FBRVIsWUFBSSxDQUFDLGVBQWUsR0FBRyxDQUNuQixZQUFZLEVBQ1osT0FBTyxFQUNQLE9BQU8sQ0FDVixDQUFDO0tBQ0w7Ozs7YUFFaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkN2QmlCLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdyQix3QkFBRzs7O0FBQ1Ysd0ZBQVE7O0FBRVIsWUFBSSxDQUFDLGVBQWUsR0FBRyxDQUNuQixXQUFXLEVBQ1gsV0FBVyxDQUNkLENBQUM7S0FDTDs7OzthQUVpQixlQUFHO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQ3RCaUIsY0FBYzs7Ozs7Ozs7Ozs7YUFLWixlQUFHO0FBQ25CLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSxnQkFBZ0I7QUFDMUIsc0JBQU0sRUFBSSxNQUFNO2FBQ25CLENBQUE7U0FDSjs7O0FBRVUsc0JBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7OztBQUMxQix3RkFBTSxFQUFFLEVBQUU7QUFDVixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsWUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkNuQnFCLGNBQWM7Ozs7Ozs4QkFDckIsdUJBQXVCOzs7O0FBRTFDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO0FBQ3BCLFVBQU0sRUFBSSxhQUFhO0FBQ3ZCLFlBQVEsRUFBRSxFQUFFO0FBQ1osVUFBTSxFQUFFLEVBQUU7QUFDVixjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxNQUFNO0NBQ3JCLENBQUMsQ0FBQzs7QUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRTtBQUNsQixVQUFNLEVBQUUsV0FBVztBQUNuQixZQUFRLEVBQUUsRUFBRTtBQUNaLFVBQU0sRUFBRSxDQUFDO0FBQ1QsY0FBVSxFQUFFLEVBQUU7QUFDZCxjQUFVLEVBQUUsTUFBTTtDQUNyQixDQUFDLENBQUM7O0FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUU7QUFDaEIsVUFBTSxFQUFFLFNBQVM7QUFDakIsWUFBUSxFQUFFLEVBQUU7QUFDWixVQUFNLEVBQUUsRUFBRTtBQUNWLGNBQVUsRUFBRSxFQUFFO0FBQ2QsY0FBVSxFQUFFLE9BQU87Q0FDdEIsQ0FBQyxDQUFDOztBQUVILElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFO0FBQ2YsVUFBTSxFQUFFLFFBQVE7QUFDaEIsWUFBUSxFQUFFLEdBQUc7QUFDYixVQUFNLEVBQUUsQ0FBQztBQUNULGNBQVUsRUFBRSxHQUFHO0FBQ2YsY0FBVSxFQUFFLE9BQU87Q0FDdEIsQ0FBQyxDQUFDOztBQUVILElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFO0FBQ3BCLFVBQU0sRUFBRSxhQUFhO0FBQ3JCLFlBQVEsRUFBRSxFQUFFO0FBQ1osVUFBTSxFQUFFLEdBQUc7QUFDWCxjQUFVLEVBQUUsRUFBRTtBQUNkLGNBQVUsRUFBRSxPQUFPO0NBQ3RCLENBQUMsQ0FBQzs7QUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNkLFVBQU0sRUFBRSxPQUFPO0FBQ2YsWUFBUSxFQUFFLEVBQUU7QUFDWixVQUFNLEVBQUUsRUFBRTtBQUNWLGNBQVUsRUFBRSxFQUFFO0FBQ2QsY0FBVSxFQUFFLE9BQU87Q0FDdEIsQ0FBQyxDQUFDOztJQUVHLE1BQU07Y0FBTixNQUFNOztpQkFBTixNQUFNOztlQUVNLG1CQUFHO0FBQ2IsZ0RBQVcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFFO1NBQzdCOzs7QUFFVSxhQU5ULE1BQU0sQ0FNSSxJQUFJLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRTs4QkFOekIsTUFBTTs7QUFPSixtQ0FQRixNQUFNLDZDQU9JO0FBQ1IsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsWUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O0FBRWQsWUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNuQixNQUFNLEVBQ04sT0FBTyxFQUNQLFNBQVMsRUFDVCxXQUFXLENBQ2QsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7O0FBRTNCLFlBQUksQ0FBQyxhQUFhLEdBQUcsVUFBVSxDQUFDOztBQUVoQyxZQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztLQUMxQjs7aUJBdEJDLE1BQU07O2VBMkRKLGdCQUFHO0FBQ0gsbUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFHO0FBQzNCLG1CQUFHLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztTQUNOOzs7ZUFFVSx1QkFBRztBQUNWLGdCQUFJLENBQUMsWUFBWSxHQUFJLE1BQU0sQ0FBQztBQUM1QixnQkFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxRQUFRLEdBQVEsQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztTQUMvQjs7O2VBRVEscUJBQUc7QUFDUixnQkFBSSxDQUFDLFlBQVksR0FBSyxNQUFNLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxhQUFhLEdBQUksVUFBVSxDQUFDO0FBQ2pDLGdCQUFJLENBQUMsUUFBUSxHQUFTLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDdkMsZ0JBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDO0FBQzVCLGdCQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDcEU7OztlQUVhLHdCQUFDLFFBQVEsRUFBRTs7O0FBQ3JCLGdCQUFJLENBQUMsY0FBYyxHQUFHLFVBQVUsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDOztBQUVsQixnQkFBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUVqRSxnQkFBSSxDQUFDLGlCQUFpQixHQUFHLFdBQVcsQ0FBQyxZQUFJO0FBQ3JDLHNCQUFLLFFBQVEsRUFBRSxDQUFDO0FBQ2hCLG9CQUFHLE1BQUssUUFBUSxJQUFJLE1BQUssV0FBVyxFQUFFO0FBQ2xDLGlDQUFhLENBQUMsTUFBSyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3RDLDBCQUFLLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDM0IsNEJBQVEsT0FBTSxDQUFDO2lCQUNsQjthQUNKLEVBQUUsRUFBRSxDQUFDLENBQUM7U0FDVjs7O2FBdkVNLGFBQUMsT0FBTyxFQUFFO0FBQ2IsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFOUIsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDbEMsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBRS9CLGdCQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQzlCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDOztBQUUzQixnQkFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUN0QyxnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUN0QzthQUVNLGVBQUc7QUFDTixtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ3BCOzs7YUFFZSxhQUFDLEtBQUssRUFBRTtBQUNwQixnQkFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QixvQkFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFDOUI7U0FDSjthQUllLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQUM7OzthQUY5QixhQUFDLE1BQU0sRUFBRTtBQUFDLGdCQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztTQUFDO2FBSXhDLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQUM7OzthQUV6QyxlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFDOzs7YUFFekIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FBQzs7O2FBRVYsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7U0FBQzs7O1dBekQvQyxNQUFNOzs7cUJBa0dHLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQ3ZKQyxjQUFjOzs7OzhCQUNkLHVCQUF1Qjs7OztBQUU3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNuQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLGVBQWUsRUFDZixlQUFlLEVBQ2YsV0FBVyxDQUNkLENBQUMsQ0FBQzs7SUFFRyxJQUFJO2NBQUosSUFBSTs7QUFHSyxhQUhULElBQUksQ0FHTSxJQUFJLEVBQUU7OEJBSGhCLElBQUk7O0FBSUYsbUNBSkYsSUFBSSw2Q0FJTTtBQUNSLFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FDbkIsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLENBQ1gsQ0FBQyxDQUFDOztBQUVILFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0tBQzlCOztpQkFiQyxJQUFJOztlQWVRLDBCQUFHLEVBQ2hCOzs7ZUFFVSx1QkFBRyxFQUNiOzs7ZUFFUSxxQkFBRyxFQUNYOzs7ZUFFVSx1QkFBRyxFQUNiOzs7V0F6QkMsSUFBSTs7O3FCQTRCSyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkMxQ0csY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV3JCLHNCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs7O0FBQ3pDLHdGQUFRO0FBQ1IsWUFBSSxDQUFDLGNBQWMsR0FBRyxDQUNsQixRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLENBQ1gsQ0FBQzs7QUFFRixZQUFJLENBQUMsWUFBWSxHQUFHLENBQ2hCLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsQ0FDWCxDQUFDOztBQUVGLFlBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUM1Qzs7OztlQU1lLDRCQUFHO0FBQ2YsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM5Qzs7O2VBRWEsMEJBQUc7QUFDYixnQkFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVDOzs7YUFWaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkNoQ29CLGNBQWM7Ozs7a0NBQ2Qsd0JBQXdCOzs7Ozs7O0FBR2xDLHNCQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7OztBQUNwQix3RkFBUTtBQUNSLFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQy9DLFlBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ25DOzs7O2VBRVUscUJBQUMsUUFBUSxFQUFFOzs7QUFDbEIsb0JBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQzthQUFBLENBQUMsQ0FBQztBQUNuRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQUEsQ0FBQyxDQUFDOztBQUVsRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQUEsQ0FBQyxDQUFDO0FBQ3ZELG9CQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTt1QkFBTSxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUM7YUFBQSxDQUFDLENBQUM7O0FBRXBELG9CQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTt1QkFBTSxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUM7YUFBQSxDQUFDLENBQUM7QUFDdkQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUFBLENBQUMsQ0FBQzs7QUFFcEQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUFBLENBQUMsQ0FBQztBQUN6RCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQUEsQ0FBQyxDQUFDOztBQUVyRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7dUJBQUssTUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUN2QlksZ0JBQUMsR0FBRyxFQUFFO0FBQ2YsbUJBQU8sQ0FBQyxHQUFHLFFBQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDL0Y7OztlQUVXLGVBQUMsR0FBRyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxLQUFLLFFBQU0sR0FBRyxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDbkY7OztlQUVTLGFBQUMsR0FBRyxFQUFFO0FBQ1osbUJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7OztlQUVXLGVBQUMsR0FBRyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQ2ZvQixjQUFjOzs7O2tDQUNkLHdCQUF3Qjs7OztzQkFDeEIsVUFBVTs7Ozs7OztBQUdwQixzQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFOzs7QUFDcEIsd0ZBQVE7QUFDUixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFHLElBQUksRUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUVsQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQzs7QUFFdEIsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQzNCOzs7Ozs7Ozs7OztlQVlHLGdCQUFHOzs7O0FBR0gsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUM1QixtQkFBRyxFQUFFLG9CQUFPLE9BQU87QUFDbkIscUJBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDOztBQUVILG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixzQkFBSyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEVBQUUsRUFBRztBQUN4Qix3Q0FBTyxLQUFLLDBDQUF3QyxFQUFFLENBQUcsQ0FBQztBQUMxRCwwQkFBSyxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7QUFHZCx3QkFBRyxNQUFLLEtBQUssRUFDVCxNQUFLLE9BQU8sQ0FBQyxNQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBSyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7QUFHakQsMEJBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxVQUFVLEVBQUc7O0FBRXRDLDRCQUFHLE1BQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7QUFDdEIsc0NBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDdEI7O0FBRUQsa0NBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQUk7QUFDdEIsZ0RBQU8sS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkMsZ0RBQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZCLGdDQUFJLElBQUksR0FBRyxNQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxrQ0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVCLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUM7O0FBRUgsdUJBQUcsRUFBRSxDQUFDO2lCQUNULENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7ZUFFTSxpQkFBQyxVQUFVLEVBQUU7OztBQUNoQixnQkFBSSxJQUFJLEdBQUc7QUFDUCw0QkFBWSxFQUFFLFVBQVU7YUFDM0IsQ0FBQztBQUNGLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV2QyxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFbkQsc0JBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDdkIsdUJBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCLENBQUMsQ0FBQzs7QUFFSCxtQkFBTyxJQUFJLENBQUM7U0FDZjs7O2VBRVksdUJBQUMsSUFBSSxFQUFFO0FBQ2hCLGdCQUFJLE9BQU8sR0FBRztBQUNWLHVCQUFPLEVBQUUsY0FBYztBQUN2QixzQkFBTSxFQUFFLElBQUksQ0FBQyxHQUFHO0FBQ2hCLHNCQUFNLEVBQUU7QUFDSiwwQkFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ2xCLHlCQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVksSUFBSSxTQUFTO2lCQUN4QzthQUNKLENBQUE7O0FBRUQsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQ2YscUNBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLDhIQUFFO3dCQUE1QixLQUFJOztBQUNSLHlCQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2lCQUNwQjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRTNCLGdDQUFPLEtBQUssbURBQWlELElBQUksQ0FBRyxDQUFDO0FBQ3JFLGdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCOzs7ZUFFUyxvQkFBQyxJQUFJLEVBQUU7QUFDYixnQ0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxnQkFBSSxDQUFDLE1BQU0sVUFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7OztlQUVTLHNCQUFHO0FBQ1QsZ0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7Ozs7Ozs7ZUFLVyxzQkFBQyxPQUFPLEVBQUU7QUFDbEIsZ0JBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTs7Ozs7O0FBQ1osMENBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLG1JQUFFOzRCQUE5QixJQUFJOztBQUNSLDRCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDakM7Ozs7Ozs7Ozs7Ozs7OzthQUNKO1NBQ0o7OztlQUVVLHFCQUFDLEtBQUssRUFBRTtBQUNmLGdCQUFJLE9BQU8sR0FBRztBQUNWLHVCQUFPLEVBQUUsY0FBYztBQUN2QixzQkFBTSxFQUFFO0FBQ0osd0JBQUksRUFBRSxJQUFJLENBQUMsR0FBRztBQUNkLDJCQUFPLEVBQUUsS0FBSztpQkFDakI7YUFDSixDQUFDO0FBQ0YsZ0JBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7OztlQUVRLG1CQUFDLEdBQUcsRUFBRTtBQUNYLGdCQUFJLE9BQU8sR0FBRztBQUNWLHVCQUFPLEVBQUUsWUFBWTtBQUNyQixzQkFBTSxFQUFFO0FBQ0osd0JBQUksRUFBRSxJQUFJLENBQUMsR0FBRztBQUNkLHlCQUFLLEVBQUUsR0FBRztpQkFDYjthQUNKLENBQUM7QUFDRixnQkFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7QUFDeEIsZ0JBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7OztlQUVXLHNCQUFDLE1BQU0sRUFBRTtBQUNqQixnQkFBSSxPQUFPLEdBQUc7QUFDVix1QkFBTyxFQUFFLGVBQWU7QUFDeEIsc0JBQU0sRUFBRTtBQUNKLHdCQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7QUFDZCw0QkFBUSxFQUFFLE1BQU07aUJBQ25CO2FBQ0osQ0FBQTtBQUNELGdCQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCOzs7ZUFFUyxvQkFBQyxPQUFPLEVBQUU7QUFDaEIsZ0NBQU8sS0FBSyx5Q0FBdUMsT0FBTyxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQ25FLGdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBR3BCLGdCQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV4QixnQkFBRyxPQUFPLENBQUMsS0FBSyxJQUFJLGNBQWMsRUFBRTs7Ozs7OztBQUVoQywwQ0FBZ0IsSUFBSSxDQUFDLEtBQUssbUlBQUU7NEJBQXBCLElBQUk7O0FBQ1IsNEJBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUM1QyxnREFBTyxLQUFLLDBCQUF3QixJQUFJLENBQUcsQ0FBQztBQUM1QyxnQ0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUMxQztxQkFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Qsb0JBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRTtBQUM3RSx3QkFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDckQ7O0FBRUQsb0JBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3RDOztBQUVELGdCQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksY0FBYyxFQUFFO0FBQ2hDLG9CQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0M7O0FBRUQsZ0JBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxZQUFZLEVBQUU7QUFDOUIsb0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN6Qzs7QUFFRCxnQkFBRyxPQUFPLENBQUMsS0FBSyxJQUFJLGVBQWUsRUFBRTtBQUNqQyxvQkFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzVDO1NBQ0o7OzthQTlLSyxlQUFHO0FBQ0wsbUJBQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztTQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt3QkNsQmMsYUFBYTs7OztBQUVoQyxJQUFJLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7ZUFRbEIsbUJBQUMsUUFBUSxFQUFFO0FBQ3ZCLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixvQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxtQkFBRyxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3BCLDBDQUFPLEdBQUcsdUJBQXFCLFFBQVEsQ0FBRyxDQUFDO0FBQzNDLHVCQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ1osQ0FBQTtBQUNELG1CQUFHLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxTQUFTLEdBQUcsUUFBUSxDQUFDO2FBQ2hELENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQlUsc0JBQUMsSUFBSSxFQUFFOzs7QUFDZCxlQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsY0FBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQzFCOzs7O2VBRUcsZ0JBQUc7QUFDSCxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQ1RvQixjQUFjOzs7OztBQUd4Qix3QkFBRzs7O0FBQ1YsWUFBSSxDQUFDLFVBQVUsR0FBRywwQkFBMEIsQ0FBQztLQUNoRDs7OztlQUVZLHlCQUFHOzs7QUFDWixnQkFBRyxvQkFBTyxhQUFhLEVBQUU7QUFDckIsdUJBQU87YUFDVjtBQUNELGdCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRWxCLGdCQUFJLE1BQU0sR0FBRyxDQUNUO0FBQ0ksc0JBQU0sRUFBRSxXQUFXO0FBQ25CLHFCQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxlQUFlO2FBQzNDLEVBQ0Q7QUFDSSxzQkFBTSxFQUFFLGFBQWE7QUFDckIscUJBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLGlCQUFpQjthQUM3QyxFQUNEO0FBQ0ksc0JBQU0sRUFBRSxnQkFBZ0I7QUFDeEIscUJBQUssRUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLG9CQUFvQjthQUNoRCxFQUNEO0FBQ0ksc0JBQU0sRUFBRSxjQUFjO0FBQ3RCLHFCQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyx1QkFBdUI7YUFDbkQsRUFDRDtBQUNJLHNCQUFNLEVBQUUsZUFBZTtBQUN2QixxQkFBSyxFQUFFLElBQUksQ0FBQyxVQUFVLEdBQUcscUJBQXFCO2FBQ2pELENBQ0osQ0FBQzs7QUFFRixnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozt3QkFFakIsS0FBSzs7QUFDVCw0QkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUc7O0FBRWxDLDhCQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLElBQUksQ0FBQztBQUNsQyxnQ0FBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUNqQixrQ0FBTSxFQUFFLEdBQUc7QUFDWCx1Q0FBVyxFQUFFLEdBQUc7eUJBQ25CLENBQUMsQ0FBQyxDQUFDO3FCQUNQLENBQUMsQ0FBQyxDQUFDOzs7QUFSUixxQ0FBaUIsTUFBTSw4SEFBRTs7aUJBU3hCOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsbUJBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQzs7O2VBRUcsY0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQ2xCLGdCQUFHLG9CQUFPLGFBQWEsRUFBRSxPQUFPO0FBQ2hDLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN4QyxpQkFBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUM7QUFDMUIsaUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQjs7O2VBRUcsY0FBQyxTQUFTLEVBQUU7QUFDWixnQkFBRyxvQkFBTyxhQUFhLEVBQUUsT0FBTztBQUNoQyxnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDeEMsaUJBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VDSVcsc0JBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN4QixnQkFBRyxDQUFDLEtBQUssRUFBRTtBQUNQLHFCQUFLLEdBQUcsZ0VBQWdFLENBQUM7YUFDNUU7QUFDRCxnQkFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGlCQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUFFLHNCQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxDQUFDLENBQUM7YUFBQSxBQUNqRyxPQUFPLE1BQU0sQ0FBQztTQUNqQjs7O2VBekVlLG1CQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7OztBQUd0QixnQkFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7O0FBR2hDLGVBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ2hCLGdCQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDOztBQUUxQixtQkFBUSxDQUFBLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBQztBQUN2QixxQ0FBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBRzVCLG9CQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQy9CLG9CQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDOztBQUV2QixvQkFBSSxLQUFLLEdBQUcsUUFBUSxFQUFFOzs7O0FBSWxCLHdCQUFJLEdBQUcsR0FBRyxHQUFJLEtBQUssR0FBRyxRQUFRLEFBQUMsQ0FBQzs7O0FBR2hDLHNCQUFFLEVBQUUsQ0FBQztpQkFDUjthQUNKLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBRTtTQUNUOzs7ZUFFc0IsMEJBQUMsRUFBRSxFQUFFO0FBQ3hCLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZCxnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2QsbUJBQU8sRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7U0FDbkI7OztlQUVnQixvQkFBQyxNQUFNLEVBQUU7QUFDdEIsZ0JBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUxQyxnQkFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVwQixnQkFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDOztBQUU1QixpQkFBSyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztBQUU1QixtQkFBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFZCxvQkFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztBQUV6Qiw4QkFBVSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNyRCxNQUNJOztBQUVELHVCQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFckIsdUJBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFeEMseUJBQUssR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFMUMsOEJBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQzNCO2FBQ0o7O0FBRUQsbUJBQU8sVUFBVSxDQUFDO1NBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQy9Eb0Isd0JBQXdCOzs7Ozs7NENBR3hCLGtDQUFrQzs7OztzQkFDeEMsY0FBYzs7Ozs4QkFDZCxvQkFBb0I7Ozs7b0NBQ2QsMEJBQTBCOzs7Ozs7MEJBRzFCLGNBQWM7Ozs7eUJBQ2QsYUFBYTs7Ozt3QkFDYixZQUFZOzs7OzRCQUNaLGdCQUFnQjs7Ozt5QkFDaEIsYUFBYTs7OztzQkFDYixVQUFVOzs7Ozs7O0FBR3BCLHdCQUFHOzs7QUFDVix3RkFBUTs7QUFFUixZQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUIsWUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxZQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBTyxZQUFZLENBQUM7QUFDekMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsb0JBQU8sYUFBYSxDQUFDOztBQUUzQyxZQUFJLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7S0FDM0I7Ozs7Ozs7OztlQU1LLGtCQUFHO0FBQ0wsZ0NBQU8sU0FBUyxFQUFFLENBQUM7QUFDbkIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFPLFlBQVksQ0FBQztBQUN6QyxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsb0JBQU8sYUFBYSxDQUFDO0FBQzNDLGdCQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztTQUMzQzs7O2VBRUcsY0FBQyxJQUFJLEVBQUU7QUFDUCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRWxCLGdCQUFJLENBQUMsYUFBYSxHQUFHLCtDQUFrQixDQUFDOztBQUV4QyxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLGdCQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQzs7OztBQUl4QyxrQkFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztBQUUxRCxnQkFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNwQyxnQkFBSSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztTQUNsRDs7Ozs7ZUFHRyxnQkFBRztBQUNILGlDQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRTVDLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckIsZ0JBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7QUFHNUIsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7O0FBRXZCLG9CQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQUFBQyxDQUFDOzs7QUFHMUMsb0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFDL0Isb0JBQUksQ0FBQyxNQUFNLEdBQUcsQUFBQyxJQUFJLENBQUMsTUFBTSxHQUFDLG9CQUFPLEdBQUcsR0FBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7O0FBR3pELG9CQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR3pCLG9CQUFJLE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQSxHQUFFLElBQUksQ0FBQztBQUM1QyxrQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQ2Ysb0JBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLE9BQU8sQ0FBQyxDQUFDOzs7QUFHekMsb0JBQUksUUFBUSxHQUFZLENBQUMsR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDOUMsb0JBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFVLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQztBQUNwRCxvQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUssU0FBUyxDQUFDOztBQUVsQyxvQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLEdBQUcsb0JBQU8sR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzs7O0FBRy9FLG9CQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakI7U0FDSjs7O2VBRUssZ0JBQUMsS0FBSyxFQUFFO0FBQ1YsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFnQixvQkFBTyxZQUFZLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFlLG9CQUFPLGFBQWEsQ0FBQztBQUN2RCxnQkFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7O0FBRXhDLGdCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsb0JBQU8sWUFBWSxFQUFFLG9CQUFPLGFBQWEsQ0FBQyxDQUFDOzs7Ozs7O0FBRXBFLHFDQUFnQixJQUFJLENBQUMsTUFBTSw4SEFBRzt3QkFBdEIsSUFBSTs7QUFDUix3QkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUNqQzs7Ozs7Ozs7Ozs7Ozs7O1NBQ0o7OztlQUVlLDRCQUFHO0FBQ2YsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7QUFFZixnQkFBRyxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ25CLHFCQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUNsQzs7QUFFRCxtQkFBTyxLQUFLLENBQUM7U0FDaEI7OztlQUVjLDJCQUFHO0FBQ2Qsb0JBQ0ksSUFBSSxDQUFDLFNBQVMsNEJBQ1gsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsSUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FDZDtTQUNMOzs7ZUFFVSx1QkFBRztBQUNWLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUMsb0JBQU8sR0FBRyxDQUFDO0FBQ2hDLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLGdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixrQkFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDdEQ7Ozs7Ozs7ZUFJaUIsNEJBQUMsSUFBSSxFQUFFOzs7QUFDckIsZ0JBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFVBQUMsT0FBTyxFQUFJO0FBQzlCLDRDQUFPLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3RDLDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixvQkFBRyxPQUFPLElBQUksV0FBVyxFQUFFOzs7QUFFdkIsNEJBQUcsQ0FBQyxNQUFLLFVBQVUsRUFBRTtBQUNqQixrQ0FBSyxXQUFXLEVBQUUsQ0FBQzt5QkFDdEI7QUFDRCw0QkFBSSxZQUFZLEdBQUcsOEJBQWlCLElBQUksQ0FBQyxRQUFRLFFBQU8sQ0FBQztBQUN6RCxvQ0FBWSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQ3pCLGtDQUFLLGFBQWEsR0FBRyxZQUFZLENBQUM7QUFDbEMsa0NBQUssTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsTUFBSyxhQUFhLENBQUMsQ0FBQyxDQUFDO3lCQUMvQyxDQUFDLENBQUM7O2lCQUNOLE1BQU0sSUFBSSxPQUFPLElBQUksT0FBTyxFQUFFOztBQUMzQiw0QkFBSSxTQUFTLEdBQUcsMkJBQWMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsT0FBTyxRQUFPLENBQUM7QUFDOUQsaUNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBSTtBQUN0QixrQ0FBSyxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQzVCLGtDQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQUssVUFBVSxDQUFDLENBQUMsQ0FBQzt5QkFDNUMsQ0FBQyxDQUFDOztpQkFDTixNQUFNLElBQUcsT0FBTyxJQUFJLFNBQVMsRUFBRTs7Ozs7Ozs7Ozs7QUFFNUIsNEJBQUksUUFBUSxHQUFHLDBCQUFhLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2Qyw4QkFBSyxTQUFTLEdBQUcsUUFBUSxDQUFDOztBQUUxQiw0QkFBSSxRQUFRLEdBQUcsQ0FDWCxRQUFRLENBQUMsYUFBYSxFQUFFLENBQzNCLENBQUM7O0FBRUYsNEJBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7O0FBR2YsOEJBQUssWUFBWSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7Ozs7OztBQUM5Qiw4Q0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsMkhBQUU7b0NBQWpDLE1BQU07O0FBQ1Ysb0NBQUksVUFBVSxHQUFHLDRCQUFlLE1BQU0sQ0FBQyxDQUFDO0FBQ3hDLHdDQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLHFDQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZCLHNDQUFLLFlBQVksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQzs2QkFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCw0QkFBSSxNQUFNLEdBQUcsd0JBQVcsSUFBSSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsT0FBTyxRQUFPLENBQUM7QUFDckQsOEJBQUssT0FBTyxHQUFHLE1BQU0sQ0FBQzs7QUFFdEIsZ0NBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7OztBQUd0Qyw0QkFBSSxZQUFZLEdBQUcsdUNBQWtCLENBQUM7QUFDdEMsOEJBQUssYUFBYSxHQUFHLFlBQVksQ0FBQztBQUNsQyxnQ0FBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQzs7O0FBRzVDLCtCQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQzNCLGtDQUFLLE1BQU0sSUFDUCxNQUFLLFNBQVMsU0FDWCxLQUFLLEdBQ1IsTUFBSyxPQUFPLEVBQ2YsQ0FBQztBQUNGLGtDQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLGtDQUFLLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzt5QkFDN0IsQ0FBQyxDQUFDOztpQkFDTjthQUNKLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxNQUFNLEVBQUc7QUFDNUIsb0JBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxNQUFNLEVBQzNCLE1BQUssVUFBVSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdEMsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxVQUFDLE1BQU0sRUFBRztBQUMvQiw0Q0FBTyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuQyw0Q0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3hCLG9CQUFHLE1BQUssWUFBWSxFQUFFO0FBQ2xCLDBCQUFLLFlBQVksVUFBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNwQywwQkFBSyxNQUFNLEdBQUcsTUFBSyxlQUFlLEVBQUUsQ0FBQztpQkFDeEM7YUFDSixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFHO0FBQzFCLG9CQUFJLFNBQVMsR0FBRywyQkFBYyxLQUFLLENBQUMsQ0FBQztBQUNyQyx5QkFBUyxDQUFDLGFBQWEsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQy9CLHdCQUFHLE1BQUssV0FBVyxFQUFFO0FBQ2pCLDhCQUFLLFdBQVcsSUFDWixTQUFTLDRCQUNOLE1BQUssV0FBVyxFQUN0QixDQUFDO3FCQUNMLE1BQU07QUFDSCw4QkFBSyxXQUFXLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDbEM7aUJBQ0osQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFJO0FBQ3hCLHNCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDekMsc0JBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsc0JBQUssTUFBTSxnQ0FDSixNQUFLLE1BQU0sc0JBQ1gsTUFBSyxXQUFXLEVBQ3RCLENBQUM7YUFDTCxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsVUFBQyxNQUFNLEVBQUc7QUFDakMsb0JBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRTtBQUNmLDBCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztpQkFDN0M7YUFDSixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsTUFBTSxFQUFHO0FBQy9CLG9CQUFHLE1BQU0sSUFBSSxNQUFLLEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDakMsMEJBQUssT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO2lCQUNsQzthQUNKLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBSTtBQUN0QixzQkFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ3hDLHNCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLHNCQUFLLE1BQU0sSUFDUCxNQUFLLFNBQVMsNEJBQ1gsTUFBSyxZQUFZLENBQUMsTUFBTSxFQUFFLElBQzdCLE1BQUssT0FBTyxFQUNmLENBQUM7YUFDTCxDQUFDLENBQUM7U0FDTjs7O2VBRVksdUJBQUMsS0FBSyxFQUFFO0FBQ2pCLGdCQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNyQzs7Ozs7OztlQUtvQiwrQkFBQyxLQUFLLEVBQUU7Ozs7QUFFekIsaUJBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQUk7QUFDZixvQkFBSSxTQUFTLEdBQUcsT0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3hDLHdCQUFPLFNBQVM7QUFDWix5QkFBSyxXQUFXO0FBQ1osK0JBQUssYUFBYSxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ3hCLDhCQUFNO0FBQUEsQUFDVix5QkFBSyxTQUFTO0FBQ1YsK0JBQUssT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDO0FBQ2xCLCtCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsOEJBQU07QUFBQSxpQkFDYjthQUNKLENBQUMsQ0FBQzs7O0FBR0gsaUJBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQUk7QUFDakIsb0JBQUksU0FBUyxHQUFHLE9BQUssS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4Qyx3QkFBTyxTQUFTO0FBQ1oseUJBQUssV0FBVztBQUNaLCtCQUFLLGFBQWEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUMxQiw4QkFBTTtBQUFBLEFBQ1YseUJBQUssU0FBUztBQUNWLCtCQUFLLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUNwQiwrQkFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3JDLDhCQUFNO0FBQUEsaUJBQ2I7YUFDSixDQUFDLENBQUM7OztBQUdILGlCQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFJO0FBQ2pCLG9CQUFJLFNBQVMsR0FBRyxPQUFLLEtBQUssQ0FBQyxZQUFZLENBQUM7QUFDeEMsd0JBQU8sU0FBUztBQUNaLHlCQUFLLE9BQU87QUFDUiwrQkFBSyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsOEJBQU07QUFBQSxBQUNWLHlCQUFLLFNBQVM7QUFDViwrQkFBSyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEIsK0JBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyw4QkFBTTtBQUFBLGlCQUNiO2FBQ0osQ0FBQyxDQUFDOzs7QUFHSCxpQkFBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUNsQixvQkFBSSxTQUFTLEdBQUcsT0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3hDLHdCQUFPLFNBQVM7QUFDWix5QkFBSyxPQUFPO0FBQ1IsK0JBQUssVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3hCLDhCQUFNO0FBQUEsQUFDVix5QkFBSyxTQUFTO0FBQ1YsK0JBQUssT0FBTyxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ3JCLCtCQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsOEJBQU07QUFBQSxpQkFDYjthQUNKLENBQUMsQ0FBQzs7O0FBR0gsaUJBQUssQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLFlBQUk7QUFDcEIsb0JBQUksU0FBUyxHQUFHLE9BQUssS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4Qyx3QkFBTyxTQUFTO0FBQ1oseUJBQUssV0FBVztBQUNaLCtCQUFLLGFBQWEsQ0FBQyxPQUFPLFFBQU0sQ0FBQztBQUNqQyw4QkFBTTtBQUFBLEFBQ1YseUJBQUssT0FBTztBQUNSLCtCQUFLLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMxQiw4QkFBTTtBQUFBLEFBQ1YseUJBQUssU0FBUztBQUNWLCtCQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN2QiwrQkFBSyxhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQ3ZDLDhCQUFNO0FBQUEsaUJBQ2I7YUFDSixDQUFDLENBQUM7OztBQUdILGlCQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFJLEVBRXBCLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkN2VnVCLGNBQWM7Ozs7NkJBQ3hCLG1CQUFtQjs7OztzQkFDbEIsY0FBYzs7Ozs7OztBQUdsQixzQkFBQyxLQUFLLEVBQUU7OztBQUNmLHdGQUFPO0FBQ1AsWUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7O0FBRXBCLFlBQUksQ0FBQyxPQUFPLEdBQUcsQ0FDWDtBQUNJLGtCQUFNLEVBQUUsUUFBUTtBQUNoQixtQkFBTyxFQUFFLGdCQUFnQjtTQUM1QixDQUNKLENBQUM7S0FDTDs7OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssR0FBRyxBQUFDLEtBQUssR0FBRyxvQkFBTyxHQUFHLEdBQUMsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUMsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUUzQyxlQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsTUFBTSxFQUNOLE1BQU0sQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLEVBQ3pCLENBQUMsRUFDRCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQztBQUNyQyxnQkFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFDLENBQUM7QUFDdEMsY0FBRSxFQUNGLEVBQUU7QUFDRixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsS0FBSyxHQUFDLENBQUMsR0FBQyxvQkFBTyxZQUFZO0FBQ3pELGdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLG9CQUFPLFlBQVk7YUFDN0QsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQ2hDdUIsY0FBYzs7Ozs2QkFDZCxtQkFBbUI7Ozs7c0JBQ25CLGNBQWM7Ozs7dUNBQ2QsNkJBQTZCOzs7O21DQUM3QiwwQkFBMEI7Ozs7QUFFdEQsSUFBSSxTQUFTLDRQQVNaLENBQUM7Ozs7O0FBR2Esc0JBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7OztBQUM5Qix3RkFBTSxLQUFLLEVBQUU7QUFDYixZQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNwQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUN4QixZQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFlBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ3BCLFlBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0tBQzVCOzs7O2VBRVksdUJBQUMsSUFBSSxFQUFFOzs7QUFDaEIsZ0JBQUksTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7QUFDNUIsZ0JBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3pELGdCQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDOztBQUU3QixnQkFBSSxhQUFhLEdBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RFLGdCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7O0FBRWxFLGdCQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7Ozs7Ozs7QUFFNUQscUNBQWUsaUNBQU8sT0FBTyxFQUFFLDhIQUFFO3dCQUF6QixHQUFHOztBQUNQLHdCQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2hELDZCQUFTLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDM0IsNkJBQVMsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztBQUMvQiw2QkFBUyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztpQkFDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5DLHdCQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDdkMsc0JBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3RCLHNCQUFLLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEIsQ0FBQyxDQUFDOztBQUVILHlCQUFhLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDeEMsc0JBQUssT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzFCLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLE9BQU8sR0FBRztBQUNYLHVCQUFPLEVBQUUsT0FBTztBQUNoQixzQkFBTSxFQUFFLGtCQUFJO0FBQ1IsMkJBQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtBQUNoQiwwQkFBSyxPQUFPLEdBQUcsU0FBUyxDQUFDO2lCQUM1QjtBQUNELHVCQUFPLEVBQUUsbUJBQUk7QUFDVCx3QkFBRyxTQUFTLENBQUMsS0FBSyxFQUFFO0FBQ2hCLDRCQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNwQixpQ0FBSyxFQUFFLFNBQVMsQ0FBQyxLQUFLO0FBQ3RCLGdDQUFJLEVBQUUsTUFBSyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFO3lCQUN4QyxDQUFDLENBQUM7QUFDSCw4QkFBSyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ3pCO2lCQUNKO2FBQ0osQ0FBQztTQUNMOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ2YsZUFBRyxDQUFDLFNBQVMsR0FBTyxTQUFTLENBQUM7QUFDOUIsZUFBRyxDQUFDLFdBQVcsR0FBSyxTQUFTLENBQUM7O0FBRTlCLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUM7QUFDZixnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDOztBQUVmLGVBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqQyxlQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEMsZUFBRyxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLGVBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7Ozs7OztBQUNsQyxzQ0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsbUlBQUU7d0JBQWxDLE1BQU07O0FBQ1YsdUJBQUcsQ0FBQyxTQUFTLEdBQU8sU0FBUyxDQUFDO0FBQzlCLHdCQUFJLElBQUksRUFBRSxDQUFDO0FBQ1gsdUJBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRXJDLHdCQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDWCw0QkFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0UsMkJBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDcEM7O0FBRUQsd0JBQUcsTUFBTSxDQUFDLFlBQVksSUFBSSxPQUFPLEVBQUU7QUFDL0IsMkJBQUcsQ0FBQyxTQUFTLEdBQU8sU0FBUyxDQUFDO0FBQzlCLDJCQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3BDLE1BQU07QUFDSCwyQkFBRyxDQUFDLFNBQVMsR0FBTyxTQUFTLENBQUM7QUFDOUIsMkJBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDeEM7aUJBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCxlQUFHLENBQUMsU0FBUyxHQUFPLFNBQVMsQ0FBQzs7Ozs7O0FBQzlCLHNDQUFzQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsbUlBQUU7d0JBQTFDLFVBQVU7O0FBQ2Qsd0JBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQzs7O0FBR2hDLHdCQUFHLGNBQWMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFDdEUsY0FBYyxHQUFHLElBQUksR0FBRyxjQUFjLENBQUM7OztBQUczQyx1QkFBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLHdCQUFJLElBQUksR0FBRyxDQUFDO2lCQUNmOzs7Ozs7Ozs7Ozs7Ozs7U0FDSjs7O2VBTUcsZ0JBQUc7QUFDSCxnQkFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUM3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBRTlCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ25DOzs7ZUFFSSxpQkFBRztBQUNKLGdCQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FFOUIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7U0FDbkM7OztlQUVNLG1CQUFHO0FBQ04sZ0JBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2Qsb0JBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxZQUFZLEVBQUU7QUFDcEMsd0JBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNsQyxNQUFNLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEVBQUU7QUFDdEMsd0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2lCQUNqQyxNQUFNLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEVBQUU7QUFDdEMsd0JBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLHdCQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDckIsNEJBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUNyQywrQkFBTyxFQUFFLElBQUksQ0FBQyxNQUFNO3FCQUN2QixDQUFDLENBQUM7aUJBQ047YUFDSixNQUFNO0FBQ0gsb0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUI7U0FDSjs7O2VBRUcsZ0JBQUcsRUFDTjs7O2FBckNpQixlQUFHO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ2hFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkN4SHVCLGNBQWM7Ozs7NkJBQ2QsbUJBQW1COzs7O3NCQUNuQixjQUFjOzs7O3VDQUNkLDZCQUE2Qjs7OztBQUV6RCxJQUFJLFVBQVUsa1ZBVWIsQ0FBQzs7QUFFRixJQUFJLFVBQVUsNlpBWWIsQ0FBQzs7Ozs7QUFHYSxzQkFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFOzs7QUFDeEIsd0ZBQU0sUUFBUSxFQUFFO0FBQ2hCLFlBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQzFCLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7QUFDOUIsWUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDNUI7Ozs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ2YsZUFBRyxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7O0FBRTVCLGdCQUFJLElBQUksR0FBRyxHQUFHLENBQUM7QUFDZixnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDOzs7Ozs7O0FBRWYscUNBQXNCLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyw4SEFBRTt3QkFBN0MsVUFBVTs7QUFDZCx3QkFBSSxjQUFjLEdBQUcsVUFBVSxDQUFDOzs7QUFHaEMsd0JBQUcsY0FBYyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUN6RSxjQUFjLEdBQUcsSUFBSSxHQUFHLGNBQWMsQ0FBQzs7O0FBRzNDLHVCQUFHLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDeEMsd0JBQUksSUFBSSxHQUFHLENBQUM7aUJBQ2Y7Ozs7Ozs7Ozs7Ozs7OztTQUNKOzs7ZUFNYSx3QkFBQyxJQUFJLEVBQUU7OztBQUNqQixnQkFBSSxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQTtBQUM1QixnQkFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7QUFDMUQsZ0JBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUM7O0FBRTdCLGdCQUFJLFVBQVUsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDaEUsZ0JBQUksWUFBWSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFbEUsZ0JBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM1RCxnQkFBSSxPQUFPLEdBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUUxRCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5DLHFCQUFTLENBQUMsT0FBTyxHQUFHLFlBQUk7QUFDcEIsb0JBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7QUFDOUIsOEJBQVUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzFDLE1BQU07QUFDSCw4QkFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzdDO2FBQ0osQ0FBQTs7QUFFRCx3QkFBWSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ3ZDLHNCQUFLLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUN0QixzQkFBSyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCLENBQUMsQ0FBQzs7QUFFSCxzQkFBVSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ3JDLHNCQUFLLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxPQUFPLEdBQUc7QUFDWCx1QkFBTyxFQUFFLE9BQU87QUFDaEIsc0JBQU0sRUFBRSxrQkFBVztBQUNmLHdCQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO2lCQUN4QjtBQUNELHVCQUFPLEVBQUUsbUJBQVc7QUFDaEIsd0JBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRTtBQUN2Qiw0QkFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDbEIsZ0NBQUksRUFBRSxTQUFTLENBQUMsS0FBSztBQUNyQiw4QkFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLO3lCQUNwQixDQUFDLENBQUM7QUFDSCw0QkFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNqQjtpQkFDSjthQUNKLENBQUM7U0FDTDs7O2VBRWEsd0JBQUMsSUFBSSxFQUFFOzs7QUFDakIsZ0JBQUksTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7QUFDNUIsZ0JBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGdCQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDOztBQUc3QixnQkFBSSxVQUFVLEdBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2hFLGdCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7O0FBRWxFLGdCQUFJLFNBQVMsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUQsZ0JBQUksU0FBUyxHQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUM5RCxnQkFBSSxPQUFPLEdBQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUU1RCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRW5DLGdCQUFJLFVBQVUsR0FBRyxTQUFiLFVBQVUsR0FBYztBQUN4QixvQkFBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDakQsOEJBQVUsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7aUJBQzFDLE1BQU07QUFDSCw4QkFBVSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzdDO2FBQ0osQ0FBQztBQUNGLHFCQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMscUJBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFMUMsd0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUN2Qyx1QkFBSyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdEIsdUJBQUssT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QixDQUFDLENBQUM7O0FBRUgsc0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUNyQyx1QkFBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUIsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsT0FBTyxHQUFHO0FBQ1gsdUJBQU8sRUFBRSxPQUFPO0FBQ2hCLHNCQUFNLEVBQUUsa0JBQVc7QUFDZix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtpQkFDeEI7QUFDRCx1QkFBTyxFQUFFLG1CQUFXO0FBQ2hCLHdCQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRTtBQUNqRCw0QkFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDbEIsZ0NBQUksRUFBRSxTQUFTLENBQUMsS0FBSztBQUNyQixrQ0FBTSxFQUFFLFNBQVMsQ0FBQyxLQUFLO0FBQ3ZCLDhCQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUs7eUJBQ3BCLENBQUMsQ0FBQztBQUNILDRCQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7cUJBQ2pCO2lCQUNKO2FBQ0osQ0FBQztTQUNMOzs7ZUFFQyxjQUFHO0FBQ0QsZ0JBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNyRTs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ2I7OztlQUVNLG1CQUFHO0FBQ04sZ0JBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2Qsb0JBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxXQUFXLEVBQUU7QUFDbkMsd0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNuQyxNQUFNO0FBQ0gsd0JBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNuQzthQUNKLE1BQU07QUFDSCxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQzthQUMxQjtTQUNKOzs7ZUFFRyxnQkFBRztBQUNILGdCQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDdEI7OzthQTlIaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0RVLHNCQUFDLE1BQU0sRUFBRTs7O0FBQ2hCLFlBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0tBQ3pCOzs7Ozs7Ozs7ZUFNVyxzQkFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFOzs7QUFDekIsbUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFHO0FBQzNCLG9CQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLG1CQUFHLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDcEIsMkJBQU8sQ0FBQyxHQUFHLHVCQUFxQixRQUFRLENBQUcsQ0FBQztBQUM1Qyx1QkFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNiLENBQUE7QUFDRCxtQkFBRyxDQUFDLEdBQUcsR0FBRywwQkFBMEIsR0FBRyxRQUFRLENBQUM7OztBQUdoRCxvQkFBRyxDQUFDLE1BQUssVUFBVSxFQUFFO0FBQ2pCLDBCQUFLLFVBQVUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO2lCQUMvQjtBQUNELHNCQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2xDLENBQUMsQ0FBQztTQUNOOzs7ZUFFWSx5QkFBRztBQUNaLGdCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7Ozs7OztBQUNqQixxQ0FBaUIsSUFBSSxDQUFDLE9BQU8sOEhBQUU7d0JBQXZCLEtBQUs7O0FBQ1QsNEJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7Ozs7Ozs7ZUFLRyxnQkFBRzs7O0FBQ0gsbUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFHO0FBQzNCLG1CQUFHLEVBQUUsQ0FBQztBQUNOLG9CQUFJLGdCQUFnQixHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQzFCLDBDQUFpQixPQUFLLE9BQU8sbUlBQUU7NEJBQXZCLEtBQUs7O0FBQ1QsdUNBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3REOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsdUJBQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxNQUFNLEVBQUc7Ozs7OztBQUN6Qyw4Q0FBaUIsTUFBTSxtSUFBRTtnQ0FBakIsS0FBSzs7QUFDVCxnQ0FBRyxDQUFDLE9BQUssVUFBVSxFQUNmLE9BQUssVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7O0FBRWhDLG1DQUFLLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCx1QkFBRyxFQUFFLENBQUM7aUJBQ1QsQ0FBQyxDQUFDO2FBQ04sQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQzFEdUIsY0FBYzs7Ozs2QkFDZCxtQkFBbUI7Ozs7c0JBQ25CLGNBQWM7Ozs7dUNBQ2QsNkJBQTZCOzs7O0FBRXpELElBQUksV0FBVyxHQUFHO0FBQ2QsaUJBQWEsRUFBRSx1QkFBdUI7QUFDdEMsZUFBVyxFQUFFLHFCQUFxQjtBQUNsQyxhQUFTLEVBQUUsb0JBQW9CO0FBQy9CLFlBQVEsRUFBRSxrQkFBa0I7QUFDNUIsaUJBQWEsRUFBRSx1QkFBdUI7QUFDdEMsV0FBTyxFQUFFLGlCQUFpQjtDQUM3QixDQUFDOzs7OztBQUdhLHNCQUFDLE1BQU0sRUFBRTs7O0FBQ2hCLHdGQUFNLE1BQU0sRUFBRTtBQUNkLGVBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDcEIsZUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixZQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7QUFFdEIsWUFBSSxDQUFDLE9BQU8sR0FBRyxDQUNYO0FBQ0ksa0JBQU0sRUFBRSxRQUFRO0FBQ2hCLG1CQUFPLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDO1NBQ3hDLEVBQ0Q7QUFDSSxrQkFBTSxFQUFFLFFBQVE7QUFDaEIsbUJBQU8sRUFBRSxZQUFZO1NBQ3hCLEVBQ0Q7QUFDSSxrQkFBTSxFQUFFLFFBQVE7QUFDaEIsbUJBQU8sRUFBRSxZQUFZO1NBQ3hCLENBQ0osQ0FBQztLQUNMOzs7O2VBRVkseUJBQUc7QUFDWixnQkFBSSxRQUFRLEdBQUcsRUFBRSxDQUFBOzs7Ozs7QUFDakIscUNBQWlCLElBQUksQ0FBQyxPQUFPLDhIQUFFO3dCQUF2QixLQUFLOztBQUNULDRCQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztpQkFDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxtQkFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ2YsZ0JBQUksQ0FBQyxLQUFLLEdBQVEsQUFBQyxLQUFLLEdBQUcsb0JBQU8sR0FBRyxHQUFDLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVqRCxnQkFBSSxXQUFXLEdBQUcsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksQ0FBQzs7QUFFekQsZ0JBQUksT0FBTyxHQUFHLG9CQUFPLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDaEMsZ0JBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLElBQUksTUFBTSxFQUFFO0FBQ2hDLHVCQUFPLEVBQUUsQ0FBQzthQUNiOztBQUVELGdCQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsZ0JBQUksTUFBTSxHQUFTLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELGdCQUFJLFdBQVcsR0FBSSxNQUFNLENBQUMsS0FBSyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUNwRCxnQkFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDOzs7QUFHdkQsZUFBRyxDQUFDLFNBQVMsTUFBQSxDQUFiLEdBQUcsRUFBYyxDQUNiLE1BQU0sRUFDTixDQUFDLEVBQ0QsQ0FBQztBQUNELGtCQUFNLENBQUMsS0FBSztBQUNaLGtCQUFNLENBQUMsS0FBSztBQUNaLG1CQUFPLEdBQUUsV0FBVyxBQUFDO0FBQ3JCLGdCQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRSxXQUFXLEFBQUMsR0FBSSxXQUFXLEFBQUMsR0FBSSxvQkFBTyxZQUFZLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQUFBQztBQUNqSCx1QkFBVztBQUNYLHVCQUFXO2FBQ2QsQ0FBQyxDQUFDOzs7QUFJSCxlQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQzdCLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxLQUFLLFNBQVMsR0FBRyxvQkFBTyxXQUFXLEdBQUUsSUFBSSxDQUFDLEtBQUssQUFBQyxHQUFHLENBQUM7QUFDN0UsYUFBQztBQUNELGdDQUFPLFdBQVc7QUFDbEIsZ0NBQU8sV0FBVztBQUNsQixtQkFBTyxHQUFFLFdBQVcsQUFBQztBQUNyQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUUsV0FBVyxBQUFDO0FBQy9CLHVCQUFXO0FBQ1gsdUJBQVc7YUFDZCxDQUFDLENBQUM7OztBQUdILGdCQUFJLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDckIsb0JBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhO0FBQzdCLHFCQUFLLFVBQVU7QUFDWCxnQ0FBWSxHQUFHLENBQUMsQ0FBQztBQUNqQiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssUUFBUTtBQUNULGdDQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7QUFDL0IsMEJBQU07QUFBQSxBQUNWLHFCQUFLLFFBQVE7QUFDVCxnQ0FBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNqQywwQkFBTTtBQUFBLEFBQ1YscUJBQUssTUFBTTtBQUNQLGdDQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ2pDLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxTQUFTO0FBQ1YsZ0NBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDakMsMEJBQU07QUFBQSxhQUNiOztBQUVELGdCQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsS0FBSyxPQUFPLEVBQUU7QUFDaEYsbUJBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFDN0IsQ0FBQyxFQUNELFlBQVk7QUFDWixzQkFBTSxDQUFDLEtBQUs7QUFDWixzQkFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDO0FBQ2YsdUJBQU8sR0FBRSxXQUFXLEFBQUMsR0FBSSxXQUFXLEdBQUMsR0FBRyxBQUFDO0FBQ3pDLG9CQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRSxXQUFXLEFBQUMsR0FBSSxZQUFZLEdBQUMsR0FBRyxBQUFDO0FBQ3BELDJCQUFXO0FBQ1gsNEJBQVk7aUJBQ2YsQ0FBQyxDQUFDO2FBQ047U0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDekh1QixjQUFjOzs7OzZCQUN4QixtQkFBbUI7Ozs7c0JBQ2xCLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQmxCLHNCQUFDLElBQUksRUFBRTs7O0FBQ2Qsd0ZBQVE7QUFDUixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUN0QixZQUFJLENBQUMsV0FBVyxHQUFJLENBQUMsQ0FBQzs7QUFFdEIsWUFBSSxDQUFDLE9BQU8sR0FBRyxDQUNYO0FBQ0ksa0JBQU0sRUFBRSxPQUFPO0FBQ2YsbUJBQU8sRUFBRSxjQUFjO1NBQzFCLEVBQ0Q7QUFDSSxrQkFBTSxFQUFFLE1BQU07QUFDZCxtQkFBTyxFQUFFLGVBQWU7U0FDM0IsQ0FDSixDQUFDO0tBQ0w7Ozs7ZUFFWSx5QkFBRztBQUNaLG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDZixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsRUFDMUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUcsZUFBZSxDQUFDLENBQzlDLENBQUMsQ0FBQztTQUNOOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsS0FBSyxFQUFFO0FBQ2YsZ0JBQUcsS0FBSyxHQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDYixvQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbkM7OztBQUdELGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QyxnQkFBSSxVQUFVLEdBQUcsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUN4RCxpQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFPLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMscUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBTyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZDLHVCQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsS0FBSyxFQUNMLENBQUMsRUFDRCxDQUFDLEVBQ0Qsb0JBQU8sV0FBVztBQUNsQix3Q0FBTyxXQUFXO0FBQ2xCLHdCQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBQyxDQUFDLEdBQUcsVUFBVTtBQUM3QyxxQkFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEdBQUUsVUFBVTtBQUNoQiw4QkFBVSxFQUNWLFVBQVUsQ0FDYixDQUFDLENBQUM7aUJBQ047YUFDSjs7O0FBR0QsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUMvQyxpQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFPLFlBQVksR0FBRSxTQUFTLEFBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekQsbUJBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixJQUFJLEVBQ0osQ0FBQztBQUNELG9CQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSztBQUN4QixvQkFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDYixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBQyxDQUFDLEdBQUcsU0FBUztBQUMxQyxpQkFBQztBQUNELG9CQUFJLENBQUMsS0FBSyxHQUFDLG9CQUFPLFlBQVksRUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBQyxvQkFBTyxZQUFZLEdBQUMsQ0FBQyxDQUNwQyxDQUFDLENBQUM7YUFDTjs7O0FBR0QsZ0JBQUksS0FBSyxHQUFHLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLEdBQUMsRUFBRSxDQUFDO0FBQ3RELGdCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLFFBQVEsRUFBRTtBQUNwQyxvQkFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7QUFDM0Isb0JBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDOztBQUU5RCxvQkFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7QUFDMUIsb0JBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQzdEO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDL0Z1QixjQUFjOzs7OzJCQUNkLGNBQWM7Ozs7OEJBQ2Qsb0JBQW9COzs7Ozs7O0FBR2pDLHNCQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFOzs7QUFDM0Isd0ZBQVE7QUFDUixZQUFJLENBQUMsR0FBRyxHQUFXLEVBQUUsQ0FBQztBQUN0QixZQUFJLENBQUMsS0FBSyxHQUFTLElBQUksQ0FBQztBQUN4QixZQUFJLENBQUMsUUFBUSxHQUFNLE9BQU8sQ0FBQzs7QUFFM0Isb0NBQU8sS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzNCLG9DQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTFCLFlBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDOztBQUVyQixZQUFJLENBQUMsT0FBTyxHQUFHLENBQ1g7QUFDSSxrQkFBTSxFQUFFLElBQUk7QUFDWixtQkFBTyxFQUFFLFdBQVc7U0FDdkIsQ0FDSixDQUFDOztBQUVGLFlBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7S0FDakM7Ozs7ZUFFWSx5QkFBRztBQUNaLGdCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7Ozs7OztBQUNqQixxQ0FBaUIsSUFBSSxDQUFDLE9BQU8sOEhBQUU7d0JBQXZCLEtBQUs7O0FBQ1QsNEJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7OztlQUVLLGdCQUFDLEdBQUcsRUFBRTs7QUFFUixnQkFBSSxJQUFJLEdBQUcsb0JBQU8sU0FBUyxJQUFFLG9CQUFPLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBLEFBQUMsQ0FBQzs7O0FBRzdELGVBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFWCxnQkFBSSxNQUFNLEdBQUcsQ0FDVCxDQUFDLEVBQ0QsSUFBSSxFQUNKLG9CQUFPLFlBQVksRUFDbkIsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FDaEUsQ0FBQzs7QUFFRixnQkFBSSxNQUFNLEdBQUcsQ0FDVCxDQUFDLEVBQ0QsSUFBSSxFQUNKLG9CQUFPLFlBQVksRUFDbkIsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksR0FBQyxJQUFJLENBQUMsV0FBVyxDQUMxRCxDQUFDOztBQUVGLGdCQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsb0JBQW9CLE1BQUEsQ0FBeEIsR0FBRyxFQUF5QixNQUFNLENBQUMsQ0FBQzs7QUFFbkQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3BDLG9CQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNwQyxlQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUN6QixlQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixlQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQzs7O0FBRzVCLGdCQUFJLFNBQVMsR0FBRyxvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxHQUFDLEVBQUUsQ0FBQzs7QUFFMUQsZUFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0FBRTFCLGdCQUFJLFVBQVUsYUFBTyxNQUFNLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDO0FBQzNCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDOztBQUUzQixlQUFHLENBQUMsVUFBVSxNQUFBLENBQWQsR0FBRyxxQkFBZSxVQUFVLEVBQUMsQ0FBQzs7O0FBRzlCLGVBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLGdCQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3BFLGVBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLGVBQUcsQ0FBQyxJQUFJLE1BQUEsQ0FBUixHQUFHLHFCQUFTLFVBQVUsRUFBQyxDQUFDO0FBQ3hCLGVBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFWCxlQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7O0FBRWQsZUFBRyxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7QUFDNUIsZ0JBQUksSUFBSSxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxDQUFDOztBQUUzQixnQkFBSSxRQUFRLEdBQU0sQ0FBQyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUN4QyxlQUFHLENBQUMsSUFBSSxHQUFVLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQzs7QUFFOUMsZ0JBQUksSUFBSSxHQUFHLG9CQUFPLFNBQVMsR0FBQyxHQUFHLENBQUM7OztBQUdoQyxlQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLENBQ1osTUFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFDM0UsSUFBSSxFQUNKLElBQUksQ0FDUCxDQUFDLENBQUM7O0FBRUgsZUFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNaLE1BQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBLEdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQzNFLElBQUksR0FBRyxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxFQUN6QixJQUFJLENBQ1AsQ0FBQyxDQUFDOztBQUVILGVBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDWixNQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQSxHQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUMzRSxJQUFJLEVBQ0osSUFBSSxHQUFHLFFBQVEsR0FBQyxDQUFDLENBQ3BCLENBQUMsQ0FBQzs7QUFFSCxlQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLENBQ1osTUFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFDM0UsSUFBSSxHQUFHLG9CQUFPLFNBQVMsR0FBQyxDQUFDLEVBQ3pCLElBQUksR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUNwQixDQUFDLENBQUM7O0FBRUgsZ0JBQUksR0FBRyxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQzFCLGdCQUFJLEdBQUcsb0JBQU8sU0FBUyxJQUFFLG9CQUFPLE1BQU0sR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFBLEFBQUMsQ0FBQzs7Ozs7Ozs7QUFHekQsc0NBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLG1JQUFFO3dCQUFsQyxNQUFNOztBQUNWLHdCQUFJLElBQUksUUFBUSxHQUFDLENBQUMsQ0FBQzs7QUFFbkIsdUJBQUcsQ0FBQyxTQUFTLEdBQUssU0FBUyxDQUFDOzs7QUFHNUIsdUJBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDWixNQUFNLENBQUMsSUFBSSxFQUNYLElBQUksRUFDSixJQUFJLENBQ1AsQ0FBQyxDQUFDOzs7QUFHSCx3QkFBSSxlQUFlLEdBQUssSUFBSSxHQUFHLFFBQVEsR0FBQyxDQUFDLENBQUM7QUFDMUMsd0JBQUksZ0JBQWdCLEdBQUksb0JBQU8sU0FBUyxDQUFDO0FBQ3pDLHdCQUFJLGlCQUFpQixHQUFHLFFBQVEsR0FBQyxDQUFDLENBQUM7OztBQUduQyx1QkFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsd0JBQUksa0JBQWtCLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQzVELHVCQUFHLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEdBQUMsa0JBQWtCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7O0FBRzVGLHVCQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUN6Qix1QkFBRyxDQUFDLFNBQVMsR0FBSyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDO0FBQ3hDLHVCQUFHLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsaUJBQWlCLENBQUMsQ0FBQzs7O0FBRzNFLHdCQUFJLGFBQWEsR0FBSyxJQUFJLEdBQUcsb0JBQU8sU0FBUyxHQUFDLENBQUMsQ0FBQztBQUNoRCx3QkFBSSxhQUFhLEdBQUssSUFBSSxHQUFHLFFBQVEsR0FBQyxDQUFDLENBQUM7QUFDeEMsd0JBQUksY0FBYyxHQUFJLG9CQUFPLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDekMsd0JBQUksZUFBZSxHQUFHLFFBQVEsR0FBQyxDQUFDLENBQUM7OztBQUdqQyx1QkFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsd0JBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ3RELHVCQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxHQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDOzs7QUFHN0YsdUJBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLHVCQUFHLENBQUMsU0FBUyxHQUFLLENBQUMsR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDeEMsdUJBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRTlFLHVCQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2Qix1QkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNULE1BQU0sQ0FBQyxNQUFNLFNBQUksTUFBTSxDQUFDLFNBQVMsRUFDcEMsYUFBYSxHQUFDLGNBQWMsR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxFQUNsRCxhQUFhLENBQ2hCLENBQUMsQ0FBQzs7QUFFSCxpQ0FBYSxJQUFJLGVBQWUsR0FBQyxHQUFHLENBQUM7Ozs7OztBQU1yQyx1QkFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsd0JBQUksY0FBYyxHQUFHLE1BQU0sQ0FBQyxJQUFJLEdBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQztBQUNoRCx1QkFBRyxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsR0FBQyxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7OztBQUczRix1QkFBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDekIsdUJBQUcsQ0FBQyxTQUFTLEdBQUssQ0FBQyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUN4Qyx1QkFBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFOUUsdUJBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLHVCQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLENBQ1QsTUFBTSxDQUFDLElBQUksU0FBSSxNQUFNLENBQUMsT0FBTyxFQUNoQyxhQUFhLEdBQUMsY0FBYyxHQUFDLENBQUMsR0FBQyxvQkFBTyxZQUFZLEVBQ2xELGFBQWEsQ0FDaEIsQ0FBQyxDQUFDO2lCQUNOOzs7Ozs7Ozs7Ozs7Ozs7U0FDSjs7O2VBRUMsY0FBRztBQUNELGdCQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBQzdCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7U0FDckM7OztlQUVHLGdCQUFHO0FBQ0gsZ0JBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNiOzs7ZUFFRyxnQkFBRztBQUNILGdCQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQzdCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBQzdCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUM7U0FDckM7OztlQUVJLGlCQUFHO0FBQ0osZ0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNmOzs7ZUFFTSxtQkFBRztBQUNOLGdCQUFJLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUN2RSxnQkFBRyxhQUFhLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNuQyxvQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFO0FBQzdCLHdCQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDckMsNEJBQVEsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7aUJBQy9ELENBQUMsQ0FBQztBQUNILG9CQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQzthQUNwQztTQUNKOzs7ZUFFYywyQkFBRztBQUNkLGdCQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztTQUNoQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGVuZ2luZSA9IG5ldyBFbmdpbmUoZG9jdW1lbnQuYm9keSk7XG5lbmdpbmUuaW5pdCgpO1xuXG4vLyBERUJVR1xud2luZG93LmVuZ2luZSA9IGVuZ2luZTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG5jb25maWcuRElTQUJMRV9BVURJTyA9IHRydWU7XG5cbi8vIDE2eDkgQXNwZWN0IFJhdGlvXG5jb25maWcuQVNQRUNUX1dJRFRIICA9IDE5MjA7XG5jb25maWcuQVNQRUNUX0hFSUdIVCA9IDEwODA7XG5cbmNvbmZpZy5USUxFX1ggPSAxNjsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuY29uZmlnLlRJTEVfWSA9IChjb25maWcuVElMRV9YKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG5jb25maWcuY2FsY3VsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gSG9yaXpvbnRhbCBvciBWZXJ0aWNhbCBwZXJjZW50YWdlIHRoYXQgdGhlIGdhbWUgdmlldyBzaG91bGQgb2NjdXB5XG4gICAgY29uZmlnLlBFUkNFTlRBR0UgPSAxO1xuXG4gICAgY29uZmlnLlNQUklURV9TSVpFICAgPSAyNDtcblxuICAgIC8vIENhY2x1bGF0ZSBjYW52YXMgd2lkdGggYW5kIGhlaWdodCBhY2NvcmRpbmcgdG8gYWJvdmUgcGVyY2VudGFnZSBhbmQgYXNwZWN0IHJhdGlvXG4gICAgbGV0IHNjcmVlbldpZHRoID0gd2luZG93Lm91dGVyV2lkdGg7XG4gICAgZG8ge1xuICAgICAgICBjb25maWcuQ0FOVkFTX1dJRFRIICA9IChzY3JlZW5XaWR0aC0tKmNvbmZpZy5QRVJDRU5UQUdFKTtcbiAgICAgICAgY29uZmlnLkNBTlZBU19IRUlHSFQgPSAoY29uZmlnLkNBTlZBU19XSURUSCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcbiAgICB9IHdoaWxlKGNvbmZpZy5DQU5WQVNfSEVJR0hUJWNvbmZpZy5TUFJJVEVfU0laRSAhPT0gMClcblxuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3aW5kb3cgd2lsbCBmaXQgdmVydGljYWxseVxuICAgIC8vaWYoY29uZmlnLkNBTlZBU19IRUlHSFQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgLy9jb25maWcuQ0FOVkFTX0hFSUdIVCAgPSB3aW5kb3cub3V0ZXJIZWlnaHQqY29uZmlnLlBFUkNFTlRBR0U7XG4gICAgICAgIC8vY29uZmlnLkNBTlZBU19XSURUSCA9IChjb25maWcuQ0FOVkFTX0hFSUdIVCpjb25maWcuQVNQRUNUX1dJRFRIKS9jb25maWcuQVNQRUNUX0hFSUdIVDtcbiAgICAvL31cblxuICAgIC8vIERldGVybWluZSBTcHJpdGUgU2NhbGluZ1xuICAgIGNvbmZpZy5TUFJJVEVfU0NBTEUgID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCpjb25maWcuU1BSSVRFX1NJWkUpO1xuICAgIGNvbmZpZy5USUxFX1NJWkUgICAgID0gY29uZmlnLlNQUklURV9TSVpFKmNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAvLyBTZXQgRlBTXG4gICAgY29uZmlnLkZQUyA9IDMwO1xufVxuXG5jb25maWcuY2FsY3VsYXRlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCBDb25maWcgZnJvbSAnLi4vQ29uZmlnJztcbi8vIEltcG9ydCBHYW1lXG5pbXBvcnQgR2FtZSBmcm9tICcuL21vZGVscy9HYW1lJztcblxuLy8gSW1wb3J0IFZpZXdcbmltcG9ydCBWaWV3IGZyb20gJy4vdmlld3MvQ2FudmFzMmQnO1xuXG4vLyBJbXBvcnQgRGlzcGF0Y2hlclxuaW1wb3J0IERpc3BhdGNoZXIgZnJvbSAnLi9kaXNwYXRjaGVyL0Rpc3BhdGNoZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX2dhbWUgICAgICAgPSBuZXcgR2FtZSgpO1xuICAgICAgICB0aGlzLl92aWV3ICAgICAgID0gbmV3IFZpZXcoKTtcbiAgICAgICAgdGhpcy5fZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKCk7XG5cbiAgICAgICAgd2luZG93LmdhbWUgICAgICAgPSB0aGlzLl9nYW1lO1xuICAgICAgICB3aW5kb3cudmlldyAgICAgICA9IHRoaXMuX3ZpZXc7XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaGVyID0gdGhpcy5fZGlzcGF0Y2hlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbmdpbmVcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLl9nYW1lLmluaXQodGhpcy5fZGlzcGF0Y2hlciksXG4gICAgICAgICAgICB0aGlzLl92aWV3LmluaXQodGhpcy5fZ2FtZSksXG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmluaXQodGhpcy5fdmlldylcbiAgICAgICAgXSkudGhlbigoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5lbWl0KFwic3RhcnQtZ2FtZVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgRXZlbnRFbWl0dGVyICAgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTmV0d29ya1NlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvTmV0d29ya1NlcnZpY2UnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgaW5pdCh2aWV3KSB7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLnJlZ2lzdGVyVmlld01lc3NhZ2VzKHRoaXMuX3ZpZXcpO1xuICAgIH1cblxuICAgIGluaXRNdWx0aXBsYXllckdhbWUobWVzc2FnZSkge1xuICAgICAgICBsZXQgYXJncyA9IFtdO1xuICAgICAgICAvLyBCdWlsZCBhcmdzXG4gICAgICAgIGlmKG1lc3NhZ2UuaG9zdElkKSB7XG4gICAgICAgICAgICBhcmdzID0gW21lc3NhZ2UubmFtZSwgbWVzc2FnZS5ob3N0SWRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXJncyA9IFttZXNzYWdlLm5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIC8vIEluaXQgbXAgY29udHJvbGxlclxuICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZSA9IG5ldyBOZXR3b3JrU2VydmljZSguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJNdWx0aXBsYXllck1lc3NhZ2VzKHRoaXMuX25ldHdvcmtTZXJ2aWNlKTtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBBZGQgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJhZGQtcGxheWVyXCIsIHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IFN5bWJvbCgpLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBtZXNzYWdlLm5hbWUsXG4gICAgICAgICAgICAgICAgXCJpc0xvY2FsXCI6IHRydWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZ2FtZS1zdGF0ZVwiLCBcImxvYmJ5XCIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsZWF2ZUdhbWUoKSB7XG4gICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiZ2FtZS1zdGF0ZVwiLCBcIm1haW4gbWVudVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGdldCBhIHBlZXIgY29ubmVjdCBldmVudCBmb3JtIHRoZSBtdWx0aXBsYXllciBjb250cm9sbGVyLCBjcmVhdGUgYSBhZGQgcGxheWVyIGV2ZW50XG4gICAgICovXG4gICAgcGVlckNvbm5lY3QobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBQZWVyIENvbm5lY3QgTWVzc2FnZVwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBCcm9hZGNhc3QgQWRkIFBsYXllciBNZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGQtcGxheWVyXCIsIHtcbiAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZS5mcm9tLFxuICAgICAgICAgICAgXCJuYW1lXCI6IG1lc3NhZ2UuZGF0YS5uYW1lLFxuICAgICAgICAgICAgXCJqb2JcIjogbWVzc2FnZS5kYXRhLmpvYlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXaGVuIHdlIGdldCBhIHBlZXIgZGlzY29ubmVjdCBldmVudCBmb3JtIHRoZSBtdWx0aXBsYXllciBjb250cm9sbGVyLCBjcmVhdGUgYSByZW1vdmUgcGxheWVyIGV2ZW50XG4gICAgICovXG4gICAgcGVlckRpc2Nvbm5lY3QobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBQZWVyIERpc2Nvbm5lY3QgTWVzc2FnZVwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBCcm9hZGNhc3QgUmVtb3ZlIFBsYXllciBNZXNzYWdlXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJyZW1vdmUtcGxheWVyXCIsIHtcbiAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbGwgbXVsdGlwbGF5ZXIgRXZlbnRzXG4gICAgICovXG4gICAgcmVnaXN0ZXJNdWx0aXBsYXllck1lc3NhZ2VzKG11bHRpcGxheWVyU2VydmljZSkge1xuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJwZWVyLWNvbm5lY3RcIiwgICAgdGhpcy5wZWVyQ29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwicGVlci1kaXNjb25uZWN0XCIsIHRoaXMucGVlckRpc2Nvbm5lY3QuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwicGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIG1lc3NhZ2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJqb2Itc2VsZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWpvYlwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwib3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcIm9wdGlvbi1zZWxlY3RcIiwgbWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGFsbCB2aWV3IG1lc3NhZ2VzXG4gICAgICovXG4gICAgcmVnaXN0ZXJWaWV3TWVzc2FnZXModmlldykge1xuICAgICAgICB2aWV3Lm9uKFwic3RhcnQtbXBcIiwgdGhpcy5pbml0TXVsdGlwbGF5ZXJHYW1lLmJpbmQodGhpcykpO1xuICAgICAgICB2aWV3Lm9uKFwibGVhdmUtZ2FtZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5sZWF2ZUdhbWUoKVxuICAgICAgICB9KTtcblxuICAgICAgICB2aWV3Lm9uKFwiam9iLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5qb2JTZWxlY3QobWVzc2FnZS5qb2IpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWpvYlwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5vbihcInJlYWR5XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgbGV0IHN0YXRlID0gbWVzc2FnZS5zdGF0ZSA/IFwicmVhZHlcIiA6IFwiaWRsZVwiO1xuICAgICAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UucGxheWVyU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIHtcbiAgICAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHN0YXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5vbihcIm9wdGlvbi1zZWxlY3RcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5vcHRpb25TZWxlY3QobWVzc2FnZS5vcHRpb24pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiU0VUIFNUQVRFIFRPIFNUQVRFXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50U3RhdGU7XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IE1peGluc1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvZXZlbnRFbWl0dGVyJztcblxuLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICAgZnJvbSAnLi4vc2VydmljZXMvUm5nJztcblxuLy8gSW1wb3J0IE1vZGVsc1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5pbXBvcnQgUGxheWVyICAgIGZyb20gJy4vb2JqZWN0cy9QbGF5ZXInO1xuaW1wb3J0IEVuZW15ICAgICBmcm9tICcuL29iamVjdHMvTW9uc3Rlcic7XG5pbXBvcnQgUm9vbSAgICAgIGZyb20gJy4vb2JqZWN0cy9Sb29tJztcbmltcG9ydCBNYWluTWVudSAgZnJvbSAnLi9vYmplY3RzL01haW5NZW51JztcbmltcG9ydCBMb2JieSAgICAgZnJvbSAnLi9vYmplY3RzL0xvYmJ5JztcbmltcG9ydCBVaSAgICAgICAgZnJvbSAnLi9vYmplY3RzL1VpJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJtYWluIG1lbnVcIixcbiAgICAgICAgICAgIFwibG9iYnlcIixcbiAgICAgICAgICAgIFwicGxheWluZ1wiXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX21haW5NZW51ID0gbmV3IE1haW5NZW51KCk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ICAgID0gbmV3IExvYmJ5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdChkaXNwYXRjaGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgICAgICAgICAgdGhpcy5fcGxheWVycyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgLy8gTElTVEVOIEZPUiBFVkVOVFNcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG9EaXNwYXRjaGVyKHRoaXMuX2Rpc3BhdGNoZXIpO1xuXG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBnYW1lIHN0YXRlIGlmIGl0cyBhbGxvd2VkXG4gICAgICogTWFrZSBzdXJlIHdlIGVtaXQgaXRcbiAgICAgKi9cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgICAgIGlmKHRoaXMuX2N1cnJlbnRTdGF0ZSA9PSBcIm1haW4gbWVudVwiKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVzZXQgYWxsIHBsYXllcnNcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJzICAgICA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFBsYXllciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZW1pdChcImdhbWUtc3RhdGVcIiwgdGhpcy5fY3VycmVudFN0YXRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENhbGwgdGhpcyBmdW5jdGlvbiBhZnRlciBhbnkgcGxheWVyc3RhZSBjaGFuZ2Ugc28gd2UgY2FuIGRlY2lkZSB3aGF0IHRvIGRvLlxuICAgICAqL1xuICAgIGNoZWNrUGxheWVyU3RhdGUoKSB7XG4gICAgICAgIC8vIElmIHdlIGFyZSBpbiB0aGUgbG9ieSBkZWNpZGUgaWYgd2UgbmVlZCB0byBzdGFydCB0aGUgZ2FtZVxuICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PT0gXCJsb2JieVwiKSB7XG4gICAgICAgICAgICBsZXQgcmVhZHlUb1N0YXJ0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHJlYWR5VG9TdGFydCA9IHJlYWR5VG9TdGFydCAmJiBwbGF5ZXIuY3VycmVudFN0YXRlID09PSBcInJlYWR5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJQbGF5ZXJzIGFyZSByZWFkeT8gXCIgKyByZWFkeVRvU3RhcnQpO1xuXG4gICAgICAgICAgICBpZihyZWFkeVRvU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIuYmFubmVyKFwiU1RBUlRJTkcgR0FNRVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFBsYXlpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrUGxheWVyQWN0aW9uKHAsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT09IFwicGxheWluZ1wiKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PSBcImlkbGVcIikge1xuICAgICAgICAgICAgICAgIGxldCByZWFkeVRvTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWR5VG9Nb3ZlID0gcmVhZHlUb01vdmUgJiYgcGxheWVyLmN1cnJlbnRBY3Rpb24gPT09IFwicmVhZHlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihyZWFkeVRvTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPT0gXCJiYXR0bGVcIikge1xuICAgICAgICAgICAgICAgIGlmKG1lc3NhZ2UgPT09IFwiYXR0YWNrXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyQXR0YWNrKHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBjdXJyZW50IHN0YXRlXG4gICAgICovXG4gICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtyZXR1cm4gdGhpcy5fY3VycmVudFN0YXRlO31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBtYWluIG1lbnVcbiAgICAgKi9cbiAgICBnZXQgbWFpbk1lbnUoKSB7cmV0dXJuIHRoaXMuX21haW5NZW51O31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBsb2JieVxuICAgICAqL1xuICAgIGdldCBsb2JieSgpIHtyZXR1cm4gdGhpcy5fbG9iYnk7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIHBsYXllcnNcbiAgICAgKi9cbiAgICBnZXQgcGxheWVycygpIHtyZXR1cm4gdGhpcy5fcGxheWVyczt9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGxvY2FsIHBsYXllclxuICAgICAqL1xuICAgIGdldCBsb2NhbFBsYXllcigpIHtyZXR1cm4gdGhpcy5fbG9jYWxQbGF5ZXI7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIEN1cnJlbnQgUm9vbVxuICAgICAqL1xuICAgIGdldCByb29tKCkge3JldHVybiB0aGlzLl9yb29tO31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBVaSBSb29tXG4gICAgICovXG4gICAgZ2V0IHVpKCkge3JldHVybiB0aGlzLl91aTt9XG5cbiAgICBfc3RhcnRNZW51KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwibWFpbiBtZW51XCI7XG4gICAgfVxuXG4gICAgX3N0YXJ0TXVsdGlwbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJsb2JieVwiO1xuICAgIH1cblxuICAgIF9zdGFydFBsYXlpbmcoKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHJvb21cbiAgICAgICAgdGhpcy5fcm9vbSAgICAgICAgPSBuZXcgUm9vbSgpO1xuICAgICAgICB0aGlzLl91aSAgICAgICAgICA9IG5ldyBVaSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwicGxheWluZ1wiO1xuICAgIH1cblxuICAgIF9sb29rRm9yVHJvdWJsZSgpIHtcbiAgICAgICAgLy8gU2V0IHJvb20gdG8gbW92aW5nXG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJtb3ZpbmdcIjtcblxuICAgICAgICAvLyBTZXQgcGxheWVycyB0byB3YWxraW5nXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwid2Fsa2luZ1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGVuZW1pZXNcbiAgICAgICAgbGV0IGVuZW15ID0gbmV3IEVuZW15KCk7XG4gICAgICAgIHRoaXMuZW1pdChcImFkZC1lbmVteVwiLCBlbmVteSk7XG5cbiAgICAgICAgdGhpcy5fZW5lbWllcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgZW5lbXlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRCYXR0bGUoKTtcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgfVxuXG4gICAgX3N0YXJ0QmF0dGxlKCkge1xuICAgICAgICB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9IFwiYmF0dGxlXCI7XG4gICAgICAgIHRoaXMuX3VpLnNldEJhdHRsZU9wdGlvbnMoKTtcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwbGF5ZXIuYmVnaW5Db21iYXQoKTtcbiAgICAgICAgICAgIHBsYXllci5jaGFyZ2VDb29sZG93bih0aGlzLl9wbGF5ZXJDb29sZG93blJlYWR5LmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdCgnc3RhcnQtYmF0dGxlJyk7XG4gICAgfVxuXG4gICAgX3BsYXllckNvb2xkb3duUmVhZHkocGxheWVyKSB7XG4gICAgICAgIHRoaXMuZW1pdChcInBsYXllci1jb29sZG93blwiLCBwbGF5ZXIpO1xuICAgICAgICBpZihwbGF5ZXIuY3VycmVudEFjdGlvbiA9PT0gXCJhdHRhY2tcIikge1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyQXR0YWNrKHBsYXllcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfcGxheWVyQXR0YWNrKHApIHtcbiAgICAgICAgaWYocC5yZWFkeVRvQXR0YWNrKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21iYXRQaGFzZSgpO1xuICAgICAgICAgICAgcC5jaGFyZ2VDb29sZG93bih0aGlzLl9wbGF5ZXJDb29sZG93blJlYWR5LmJpbmQodGhpcykpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLWF0dGFja1wiLCBwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9jb21iYXRQaGFzZSgpIHtcbiAgICAgICAgbGV0IHNob3VsZEVuZEJhdHRsZSA9IHRydWU7XG4gICAgICAgIGZvcihsZXQgZW5lbXkgb2YgdGhpcy5fZW5lbWllcy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgZW5lbXkuaGVhbHRoLS07XG4gICAgICAgICAgICBzaG91bGRFbmRCYXR0bGUgPSBzaG91bGRFbmRCYXR0bGUgJiYgKGVuZW15LmhlYWx0aCA8PSAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHNob3VsZEVuZEJhdHRsZSkge1xuICAgICAgICAgICAgdGhpcy5fZW5kQmF0dGxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfZW5kQmF0dGxlKCkge1xuICAgICAgICB0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICB0aGlzLl91aS5zZXRJZGxlT3B0aW9ucygpO1xuICAgICAgICB0aGlzLmVtaXQoJ2VuZC1iYXR0bGUnKTtcblxuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHBsYXllci5lbmRDb21iYXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBldmVudHMgZnJvbSB0aGUgZGlzcGF0Y2hlciBhbmQgcmVzcG9uZCBhY29yZGluZ2x5XG4gICAgICovXG4gICAgbGlzdGVuVG9EaXNwYXRjaGVyKGRpc3BhdGNoZXIpIHtcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInN0YXJ0LWdhbWVcIiwgdGhpcy5fc3RhcnRNZW51LmJpbmQodGhpcykpO1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwic3RhcnQtbXBcIiwgICB0aGlzLl9zdGFydE11bHRpcGxheWVyLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBnYW1lIHN0YXRlIGV2ZW50c1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwiZ2FtZS1zdGF0ZVwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbWVzc2FnZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzcGF0Y2hlci5vbihcImFkZC1wbGF5ZXJcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJHYW1lOiBBZGQgUGxheWVyIG1lc3NhZ2UgcmVjaWV2ZWRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBQbGF5ZXIobWVzc2FnZS5uYW1lLCBtZXNzYWdlLmlkLCBtZXNzYWdlLmpvYik7XG5cbiAgICAgICAgICAgIHAuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFBsYXllcihwLCBtZXNzYWdlLmlzTG9jYWwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgcGVlcnMgcGxheWVyIGZyb20gdGhlIGdhbWVcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInJlbW92ZS1wbGF5ZXJcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJHYW1lOiBSZW1vdmUgUGxheWVyIG1lc3NhZ2UgcmVjaWV2ZWRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICAvLyBHZXQgYW5kIHRoZW4gZGVsZXRlIHBsYXllclxuICAgICAgICAgICAgbGV0IHBsYXllclRvUmVtb3ZlID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5pZCk7XG4gICAgICAgICAgICBsZXQgcGxheWVyUmVtb3ZlZCA9IHRoaXMuX3BsYXllcnMuZGVsZXRlKHBsYXllclRvUmVtb3ZlLmlkKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBwbGF5ZXIgd2FzIHRoZXJlXG4gICAgICAgICAgICBpZihwbGF5ZXJSZW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlLXBsYXllclwiLCBwbGF5ZXJUb1JlbW92ZSk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PSBcImxvYmJ5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBbHRlciBwbGF5ZXIncyBqb2JcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInBsYXllci1qb2JcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5pZCk7XG4gICAgICAgICAgICBwbGF5ZXIuam9iID0gbWVzc2FnZS5qb2I7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFsdGVyIHBsYXllcidzIHN0YXRlXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJwbGF5ZXItc3RhdGVcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJHYW1lOiBSZW1vdGUgUGxheWVyIFN0YXRlIG1lc3NhZ2UgcmVjaWV2ZWRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5pZCk7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gbWVzc2FnZS5zdGF0ZTtcblxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3MgR2FtZSBsb2dpYyBhY2NvcmlkbmcgdG8gcGxheWVyIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmNoZWNrUGxheWVyU3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGlzdGVuIGZvciByZW1vdGUgb3B0aW9uIHNlbGVjdFxuICAgICAgICAvLyBDSEFOR0UgVE8gUExBWUVSLUFDVElPTlxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwib3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9wbGF5ZXJzLmdldChtZXNzYWdlLmlkKTtcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50QWN0aW9uID0gbWVzc2FnZS5vcHRpb247XG4gICAgICAgICAgICB0aGlzLmNoZWNrUGxheWVyQWN0aW9uKHBsYXllciwgbWVzc2FnZS5vcHRpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcGxheWVyIHJlZ2FyZGxlc3Mgb2YgcmVtb3RlIG9yIGxvY2FsXG4gICAgICovXG4gICAgYWRkUGxheWVyKHAsIGlzTG9jYWwpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiR2FtZTogQWRkaW5nIFBsYXllclwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhwKTtcbiAgICAgICAgbGV0IHBsYXllcnMgPSB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpO1xuICAgICAgICBsZXQgeVBvcyA9IC44O1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiBwbGF5ZXJzKSB7XG4gICAgICAgICAgICB5UG9zID0gcGxheWVyLnlQb3M7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgeVBvcyArPSAxLjI7XG4gICAgICAgIHAueVBvcyA9IHlQb3M7XG4gICAgICAgIHRoaXMuX3BsYXllcnMuc2V0KHAuaWQsIHApO1xuICAgICAgICBpZihpc0xvY2FsKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhbFBsYXllciA9IHA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkLXBsYXllclwiLCBwKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcIlNlbGVjdCBKb2JcIixcbiAgICAgICAgICAgIFwiUmVhZHlcIixcbiAgICAgICAgICAgIFwiTGVhdmVcIlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtICUgWSBvZmZzZXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiSG9zdCBHYW1lXCIsXG4gICAgICAgICAgICBcIkpvaW4gR2FtZVwiXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE9wdGlvbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9XVVJNKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICd3dXJtLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICAgJ3d1cm0nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih4UG9zLCB5UG9zLCB0eXBlKSB7XG4gICAgICAgIHN1cGVyKFtdKTtcbiAgICAgICAgdGhpcy54UG9zID0geFBvcztcbiAgICAgICAgdGhpcy55cG9zID0geVBvcztcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmhlYWx0aCA9IDU7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCAgICAgZnJvbSAnLi4vQmFzZU1vZGVsJzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vLi4vc2VydmljZXMvTG9nZ2VyJztcblxubGV0IEpPQlMgPSBuZXcgTWFwKCk7XG5cbkpPQlMuc2V0KFwiY2xhaXJ2b3lhbnRcIiwge1xuICAgICduYW1lJzogICAnY2xhaXJ2b3lhbnQnLFxuICAgICdoZWFsdGgnOiA2MCxcbiAgICAnbWFuYSc6IDQwLFxuICAgICdjb29sZG93bic6IDgwLFxuICAgICdwb3NpdGlvbic6ICdiYWNrJ1xufSk7XG5cbkpPQlMuc2V0KFwiaGVyYmFsaXN0XCIsIHtcbiAgICAnbmFtZSc6ICdoZXJiYWxpc3QnLFxuICAgICdoZWFsdGgnOiA0MCxcbiAgICAnbWFuYSc6IDAsXG4gICAgJ2Nvb2xkb3duJzogODAsXG4gICAgJ3Bvc2l0aW9uJzogJ2JhY2snXG59KTtcblxuSk9CUy5zZXQoXCJ2aWxsYWluXCIsIHtcbiAgICAnbmFtZSc6ICd2aWxsYWluJyxcbiAgICAnaGVhbHRoJzogODAsXG4gICAgJ21hbmEnOiAyMCxcbiAgICAnY29vbGRvd24nOiA0MCxcbiAgICAncG9zaXRpb24nOiAnZnJvbnQnXG59KTtcblxuSk9CUy5zZXQoXCJrbmlnaHRcIiwge1xuICAgICduYW1lJzogJ2tuaWdodCcsXG4gICAgJ2hlYWx0aCc6IDEwMCxcbiAgICAnbWFuYSc6IDAsXG4gICAgJ2Nvb2xkb3duJzogMTAwLFxuICAgICdwb3NpdGlvbic6ICdmcm9udCdcbn0pO1xuXG5KT0JTLnNldChcIm5lY3JvbWFuY2VyXCIsIHtcbiAgICAnbmFtZSc6ICduZWNyb21hbmNlcicsXG4gICAgJ2hlYWx0aCc6IDQwLFxuICAgICdtYW5hJzogMTIwLFxuICAgICdjb29sZG93bic6IDgwLFxuICAgICdwb3NpdGlvbic6ICdmcm9udCdcbn0pO1xuXG5KT0JTLnNldChcIm5pbmphXCIsIHtcbiAgICAnbmFtZSc6ICduaW5qYScsXG4gICAgJ2hlYWx0aCc6IDYwLFxuICAgICdtYW5hJzogMzAsXG4gICAgJ2Nvb2xkb3duJzogMzAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICBzdGF0aWMgZ2V0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5KT0JTLnZhbHVlcygpXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCwgam9iKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcIndhbGtpbmdcIixcbiAgICAgICAgICAgIFwiYXR0YWNraW5nXCJcbiAgICAgICAgXSk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG5cbiAgICAgICAgdGhpcy5jdXJyZW50QWN0aW9uID0gXCJ0aGlua2luZ1wiO1xuXG4gICAgICAgIGlmKGpvYikgdGhpcy5qb2IgPSBqb2I7XG4gICAgfVxuXG4gICAgc2V0IGpvYihqb2JOYW1lKSB7XG4gICAgICAgIHRoaXMuX2pvYiA9IEpPQlMuZ2V0KGpvYk5hbWUpO1xuXG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5fam9iLmhlYWx0aDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuXG4gICAgICAgIHRoaXMubWF4TWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuICAgICAgICB0aGlzLm1hbmEgPSB0aGlzLl9qb2IubWFuYTtcblxuICAgICAgICB0aGlzLm1heENvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgIH1cblxuICAgIGdldCBqb2IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9qb2I7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudEFjdGlvbihhY3Rpb24pIHt0aGlzLl9jdXJyZW50QWN0aW9uID0gYWN0aW9uO31cblxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTt9XG5cbiAgICBnZXQgY3VycmVudEFjdGlvbigpIHtyZXR1cm4gdGhpcy5fY3VycmVudEFjdGlvbjt9XG5cbiAgICBnZXQgbmFtZSgpIHtyZXR1cm4gdGhpcy5fbmFtZTt9XG5cbiAgICBnZXQgaWQoKSB7cmV0dXJuIHRoaXMuX2lkO31cblxuICAgIGdldCByZWFkeVRvQXR0YWNrKCkge3JldHVybiB0aGlzLl9yZWFkeVRvQXR0YWNrO31cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYmVnaW5Db21iYXQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlICA9IFwiaWRsZVwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBcImFjdGlvblwiO1xuICAgICAgICB0aGlzLmNvb2xkb3duICAgICAgPSAwO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5kQ29tYmF0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSAgID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiAgPSBcInRoaW5raW5nXCI7XG4gICAgICAgIHRoaXMuY29vbGRvd24gICAgICAgPSB0aGlzLm1heENvb2xkb3duO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5fY29vbGRvd25JbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY2hhcmdlQ29vbGRvd24oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGlvbiA9IFwidGhpbmtpbmdcIjtcbiAgICAgICAgdGhpcy5fcmVhZHlUb0F0dGFjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gMDtcblxuICAgICAgICBpZih0aGlzLl9jb29sZG93bkludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpO1xuXG4gICAgICAgIHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5jb29sZG93bisrO1xuICAgICAgICAgICAgaWYodGhpcy5jb29sZG93biA+PSB0aGlzLm1heENvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9jb29sZG93bkludGVydmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNjApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnO1xuaW1wb3J0IExvZ2dlciAgICBmcm9tICcuLi8uLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5sZXQgRklMTEFCTEUgPSBuZXcgU2V0KFtcbiAgICBcImVuZW1pZXNcIixcbiAgICBcInR5cGVcIixcbiAgICBcImlzTW92aW5nXCIsXG4gICAgXCJpc0JhdHRsZVwiLFxuICAgIFwiaXNMb29raW5nXCIsXG4gICAgXCJuZXh0RW5jb3VudGVyXCIsXG4gICAgXCJlbmNvdW50ZXJSYXRlXCIsXG4gICAgXCJ0aWNrQ291bnRcIlxuXSk7XG5cbmNsYXNzIFJvb20gZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcIm1vdmluZ1wiLFxuICAgICAgICAgICAgXCJiYXR0bGVcIlxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICB9XG5cbiAgICBsb29rRm9yVHJvdWJsZSgpIHtcbiAgICB9XG5cbiAgICBzdG9wTG9va2luZygpIHtcbiAgICB9XG5cbiAgICBlbmRCYXR0bGUoKSB7XG4gICAgfVxuXG4gICAgc3RhcnRCYXR0bGUoKSB7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fYmF0dGxlT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiYXR0YWNrXCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJkZWZlbmRcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX3Jvb21PcHRpb25zID0gW1xuICAgICAgICAgICAgXCJyZWFkeVwiLFxuICAgICAgICAgICAgXCJhYmlsaXR5XCIsXG4gICAgICAgICAgICBcIml0ZW1cIixcbiAgICAgICAgICAgIFwibWFuYWdlXCJcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IHRoaXMuX3Jvb21PcHRpb25zO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50T3B0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRPcHRpb25zO1xuICAgIH1cblxuICAgIHNldEJhdHRsZU9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fYmF0dGxlT3B0aW9ucztcbiAgICB9XG5cbiAgICBzZXRJZGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9yb29tT3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBpZCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInVwXCIsICgpID0+IHRoaXMuZW1pdChcInVwXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwia1wiLCAoKSA9PiB0aGlzLmVtaXQoXCJ1cFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZG93blwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwialwiLCAoKSA9PiB0aGlzLmVtaXQoXCJkb3duXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsZWZ0XCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJoXCIsICgpID0+IHRoaXMuZW1pdChcImxlZnRcIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInJpZ2h0XCIsICgpID0+IHRoaXMuZW1pdChcInJpZ2h0XCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJyaWdodFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZW50ZXJcIiwgKCk9PiB0aGlzLmVtaXQoXCJjb25maXJtXCIpKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4vTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGhvc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIGlmKGhvc3QpXG4gICAgICAgICAgICB0aGlzLl9ob3N0ID0gaG9zdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faWQgPSBcImhvc3RcIjtcblxuICAgICAgICB0aGlzLl9wZWVycyA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHBlZXIgY29ubmVjdGlvblxuICAgICAgICB0aGlzLl9wZWVyID0gbmV3IFBlZXIodGhpcy5faWQsIHtcbiAgICAgICAgICAgIGtleTogQ29uZmlnLkFQSV9LRVksXG4gICAgICAgICAgICBkZWJ1ZzogM1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5fcGVlci5vbignb3BlbicsIChpZCk9PntcbiAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoYFBlZXIgQ29ubmVjdGlvbiBjcmVhdGVkLCBQZWVyIElEIGlzICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faWQgPSBpZDtcblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGtub3cgYWJvdXQgYSBwZWVyIHRoZW4gY29ubmVjdFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2hvc3QpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGVlcih0aGlzLl9wZWVyLmNvbm5lY3QodGhpcy5faG9zdCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhIHBlZXIgY29ubmVjdHMgaGFuZGxlIGl0XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVlci5vbignY29ubmVjdGlvbicsIChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBtb3JlIHRoYW4gNCBwbGF5ZXJzXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLnNpemUgPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vbignb3BlbicsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJQZWVyIGhhcyBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXIgPSB0aGlzLmFkZFBlZXIoY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGVlcihjb25uZWN0aW9uKSB7XG4gICAgICAgIGxldCBwZWVyID0ge1xuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IGNvbm5lY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BlZXJzLnNldChjb25uZWN0aW9uLnBlZXIsIHBlZXIpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAgdGhpcy5oYW5kbGVEYXRhLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgY29ubmVjdFRvUGVlcihwZWVyKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcInBlZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5fbmFtZSxcbiAgICAgICAgICAgICAgICBcImpvYlwiOiB0aGlzLl9zZWxlY3RlZEpvYiB8fCB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwZWVycyA9IFtdO1xuICAgICAgICBmb3IobGV0IHBlZXIgb2YgdGhpcy5fcGVlcnMua2V5cygpKSB7XG4gICAgICAgICAgICBwZWVycy5wdXNoKHBlZXIpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UuZGF0YS5wZWVycyA9IHBlZXJzO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhgU2VuZGluZyBwZWVyLWNvbm5lY3QgbWVzc2FnZSB0byBwZWVyIHdpdGggaWQgJHtwZWVyfWApO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmNvbm5lY3Rpb24uc2VuZChtZXNzYWdlKTtcbiAgICAgICAgcGVlci5oYXNDb25uZWN0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHJlbW92ZVBlZXIocGVlcikge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJSZW1vdmUgcGVlclwiKTtcbiAgICAgICAgdGhpcy5lbWl0KFwicGVlci1kaXNjb25uZWN0XCIsIHBlZXIuY29ubmVjdGlvbi5wZWVyKTtcbiAgICAgICAgdGhpcy5fcGVlcnMuZGVsZXRlKHBlZXIuY29ubmVjdGlvbi5wZWVyKTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9wZWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIG1lc3NhZ2UgdG8gYWxsIHBlZXJzXG4gICAgICovXG4gICAgX3NlbmRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5fcGVlcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheWVyU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXN0YXRlXCIsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgXCJzdGF0ZVwiOiBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBqb2JTZWxlY3Qoam9iKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcImpvYi1zZWxlY3RcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBcImpvYlwiOiBqb2JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRKb2IgPSBqb2I7XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIG9wdGlvblNlbGVjdChvcHRpb24pIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwib3B0aW9uLXNlbGVjdFwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIFwib3B0aW9uXCI6IG9wdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGEobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gR3JhYiBkYXRhIGZyb20gbWVzc2FnZVxuICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGVlci1jb25uZWN0XCIpIHtcbiAgICAgICAgICAgIC8vIFNlZSBpZiB0aGlzIHBlZXIga25vd3MgYWJvdXQgYW55IG90aGVyIHBlZXJzIGFuZCBhZGQgaWYgd2UgZG9uJ3Qga25vdyB0aGVtXG4gICAgICAgICAgICBmb3IobGV0IHBlZXIgb2YgZGF0YS5wZWVycykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9wZWVycy5nZXQocGVlcikgJiYgcGVlciAhPT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBBZGRpbmcgUGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdChwZWVyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWUgaWYgd2UgaGF2ZSBhbHJlYWR5IGNvbm5lY3RlZCB0byB0aGlzIHBlZXJcbiAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pICYmICF0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKS5oYXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIodGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWNvbm5lY3RcIiwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGxheWVyLXN0YXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1zdGF0ZVwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcImpvYi1zZWxlY3RcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiam9iLXNlbGVjdFwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcIm9wdGlvbi1zZWxlY3RcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL0xvZ2dlci5qcyc7XG5cbmxldCByZXNvdXJjZURpciA9ICcuL2Rpc3QvcmVzb3VyY2VzLyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIHN0YXRpYyBsb2FkSW1hZ2UocmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKGltZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gcmVzb3VyY2VEaXIgKyAnaW1hZ2VzLycgKyByZXNvdXJjZTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJORyBDUkVBVEVcIik7XG4gICAgICAgIHRoaXMuX3JuZyA9IG5ldyBSTkcoc2VlZCk7XG4gICAgICAgIHdpbmRvdy5ybmcgPSB0aGlzLl9ybmc7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZy5yYW5kb20oKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fc291bmRQYXRoID0gXCIuL2Rpc3QvcmVzb3VyY2VzL3NvdW5kcy9cIjtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBpZihDb25maWcuRElTQUJMRV9BVURJTykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCBzb3VuZHMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1tb3ZlXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJtZW51LW1vdmUubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwibWVudS1zZWxlY3RcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcIm1lbnUtc2VsZWN0Lm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImNvb2xkb3duLXJlYWR5XCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJjb29sZG93bi1yZWFkeS5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb21iYXQtdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcInFydHJub3RlcW9tYmF0LmdiLm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImR1bmdlb24tdGhlbWVcIixcbiAgICAgICAgICAgICAgICBcInVybFwiOiB0aGlzLl9zb3VuZFBhdGggKyBcImR1bmdlb25kZWxheS5nYi5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9zb3VuZHMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgZm9yKGxldCBzb3VuZCBvZiBzb3VuZHMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2gobmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgIC8vIExvYWQgdGhlIHNvdW5kXG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRzLnNldChzb3VuZC5uYW1lLCBuZXcgSG93bCh7XG4gICAgICAgICAgICAgICAgICAgIHVybHM6IFtzb3VuZC51cmxdLFxuICAgICAgICAgICAgICAgICAgICBvbmxvYWQ6IHJlcyxcbiAgICAgICAgICAgICAgICAgICAgb25sb2FkZXJyb3I6IHJlalxuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcGxheShzb3VuZE5hbWUsIGxvb3ApIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHJldHVybjtcbiAgICAgICAgbGV0IHNvdW5kID0gdGhpcy5fc291bmRzLmdldChzb3VuZE5hbWUpO1xuICAgICAgICBzb3VuZC5sb29wKGxvb3AgfHwgZmFsc2UpO1xuICAgICAgICBzb3VuZC5wbGF5KCk7XG4gICAgfVxuXG4gICAgc3RvcChzb3VuZE5hbWUpIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHJldHVybjtcbiAgICAgICAgbGV0IHNvdW5kID0gdGhpcy5fc291bmRzLmdldChzb3VuZE5hbWUpO1xuICAgICAgICBzb3VuZC5zdG9wKCk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBsaW1pdGxvb3AoZm4sIGZwcykge1xuICAgICAgICAvLyBVc2UgdmFyIHRoZW4gPSBEYXRlLm5vdygpOyBpZiB5b3VcbiAgICAgICAgLy8gZG9uJ3QgY2FyZSBhYm91dCB0YXJnZXR0aW5nIDwgSUU5XG4gICAgICAgIHZhciB0aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gY3VzdG9tIGZwcywgb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIDYwXG4gICAgICAgIGZwcyA9IGZwcyB8fCA2MDtcbiAgICAgICAgdmFyIGludGVydmFsID0gMTAwMCAvIGZwcztcblxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodGltZSl7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cbiAgICAgICAgICAgIC8vIGFnYWluLCBEYXRlLm5vdygpIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPiBpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lXG4gICAgICAgICAgICAgICAgLy8gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpIGlzIGFuIGltcHJvdmVtZW50IG92ZXIganVzdCBcbiAgICAgICAgICAgICAgICAvLyB1c2luZyB0aGVuID0gbm93LCB3aGljaCBjYW4gZW5kIHVwIGxvd2VyaW5nIG92ZXJhbGwgZnBzXG4gICAgICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChkZWx0YSAlIGludGVydmFsKTtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIGZuXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgwKSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhc3BlY3RIZWlnaHRDYWxjKHcyKSB7XG4gICAgICAgIGxldCB3MSA9IDE5MjA7XG4gICAgICAgIGxldCBoMSA9IDEwODA7XG4gICAgICAgIHJldHVybiBoMSp3Mi93MTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VRdWVyeShzZWFyY2gpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBzZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XG5cbiAgICAgICAgdmFyIGFyZ3NQYXJzZWQgPSB7fTtcblxuICAgICAgICB2YXIgaSwgYXJnLCBrdnAsIGtleSwgdmFsdWU7XG5cbiAgICAgICAgZm9yIChpPTA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgICAgIGlmICgtMSA9PT0gYXJnLmluZGV4T2YoJz0nKSkge1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtkZWNvZGVVUklDb21wb25lbnQoYXJnKS50cmltKCldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAga3ZwID0gYXJnLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzBdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMV0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NQYXJzZWQ7XG4gICAgfVxuXG4gICAgLy8gR29vZGVub3VnaCBVVUlEP1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA3MjY5MDkvcmFuZG9tLWFscGhhLW51bWVyaWMtc3RyaW5nLWluLWphdmFzY3JpcHRcbiAgICByYW5kb21TdHJpbmcobGVuZ3RoLCBjaGFycykge1xuICAgICAgICBpZighY2hhcnMpIHtcbiAgICAgICAgICAgIGNoYXJzID0gJzAxMjM0NTY3ODlhYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ekFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaJztcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvciAobGV0IGkgPSBsZW5ndGg7IGkgPiAwOyAtLWkpIHJlc3VsdCArPSBjaGFyc1tNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoY2hhcnMubGVuZ3RoIC0gMSkpXTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG4vLyBJbXBvcnQgU2VydmljZXNcbmltcG9ydCBJbnB1dFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IExvZ2dlciBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IFNvdW5kU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9Tb3VuZFNlcnZpY2UnO1xuXG4vLyBJbXBvcnQgdmlld3NcbmltcG9ydCBQbGF5ZXJWaWV3ICAgZnJvbSAnLi9QbGF5ZXJWaWV3JztcbmltcG9ydCBFbmVteVZpZXcgICAgZnJvbSAnLi9FbmVteVZpZXcnO1xuaW1wb3J0IFJvb21WaWV3ICAgICBmcm9tICcuL1Jvb21WaWV3JztcbmltcG9ydCBNYWluTWVudVZpZXcgZnJvbSAnLi9NYWluTWVudVZpZXcnO1xuaW1wb3J0IExvYmJ5VmlldyAgICBmcm9tICcuL0xvYmJ5Vmlldyc7XG5pbXBvcnQgVWlWaWV3ICAgICAgIGZyb20gJy4vVWlWaWV3JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG5cbiAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKiBAdG9kbzogZG9lcyB0aGlzIGJlbG9uZyBoZXJlP1xuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0KGdhbWUpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSA9IGdhbWU7XG5cbiAgICAgICAgdGhpcy5faW5wdXRTZXJ2aWNlID0gbmV3IElucHV0U2VydmljZSgpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBBdHRhY2ggcmVzaXplIGV2ZW50XG4gICAgICAgIC8vd2luZG93LnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHRoaXMubGlzdGVuVG9HYW1lRXZlbnRzKHRoaXMuX2dhbWUpO1xuICAgICAgICB0aGlzLnJlZ2lzdGVySW5wdXRIYW5kbGVycyh0aGlzLl9pbnB1dFNlcnZpY2UpO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9jb2RldGhlb3J5LmluL2NvbnRyb2xsaW5nLXRoZS1mcmFtZS1yYXRlLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgICAgICAvLyBJZiB0aGUgZnBzIGludGVydmFsIGlzIGNvcnJlY3RcbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRpbWUgc2luY2UgbGFzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIFNldCB1cCBSZW5kZXJpbmdcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdGhpcy5fZnJhbWUgfHwgMTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gKHRoaXMuX2ZyYW1lJUNvbmZpZy5GUFMpID8gdGhpcy5fZnJhbWUgOiAxO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgZ2FtZVxuICAgICAgICAgICAgdGhpcy5yZW5kZXIodGhpcy5fZnJhbWUpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbmV4dCByZW5kZXIgY3ljbGVcbiAgICAgICAgICAgIGxldCB0aW1lX2VsID0gKHRoaXMudGhlbiAtIHRoaXMuZmlyc3QpLzEwMDA7XG4gICAgICAgICAgICArK3RoaXMuY291bnRlcjtcbiAgICAgICAgICAgIGxldCBmcHMgPSBwYXJzZUludCh0aGlzLmNvdW50ZXIvdGltZV9lbCk7XG5cbiAgICAgICAgICAgIC8vIFNob3cgRlBTXG4gICAgICAgICAgICBsZXQgZm9udFNpemUgICAgICAgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQodGhpcy5fZnJhbWUgKyBcIi9cIiArIENvbmZpZy5GUFMgKyBcIiBcIiArIGZwcyArIFwiZnBzXCIsIDIwLCAyMCk7XG5cbiAgICAgICAgICAgIC8vIEluY3JlbWVudCBGcmFtZVxuICAgICAgICAgICAgdGhpcy5fZnJhbWUrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihmcmFtZSkge1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggICAgICAgICAgICAgID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCAgICAgICAgICAgICA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgQ29uZmlnLkNBTlZBU19XSURUSCwgQ29uZmlnLkNBTlZBU19IRUlHSFQpO1xuXG4gICAgICAgIGZvcihsZXQgdmlldyBvZiB0aGlzLl92aWV3cykgIHtcbiAgICAgICAgICAgIHZpZXcucmVuZGVyKHRoaXMuX2N0eCwgZnJhbWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWFpbk1lbnVWaWV3cygpIHtcbiAgICAgICAgbGV0IHZpZXdzID0gW107XG5cbiAgICAgICAgaWYodGhpcy5fbWFpbk1lbnVWaWV3KSB7XG4gICAgICAgICAgICB2aWV3cy5wdXNoKHRoaXMuX21haW5NZW51Vmlldyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmlld3M7XG4gICAgfVxuXG4gICAgZ2V0UGxheWluZ1ZpZXdzKCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAuLi50aGlzLl9wbGF5ZXJWaWV3cy52YWx1ZXMoKSxcbiAgICAgICAgICAgIHRoaXMuX3VpVmlld1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIHN0YXJ0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLl9yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBnYW1lIGV2ZW50cyBzbyB3ZSBjYW4gYWRqdXN0IHJlbmRlcmVyXG4gICAgICovXG4gICAgbGlzdGVuVG9HYW1lRXZlbnRzKGdhbWUpIHtcbiAgICAgICAgZ2FtZS5vbihcImdhbWUtc3RhdGVcIiwgKG1lc3NhZ2UpPT4ge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVmlldyBHYW1lIFN0YXRlIEV2ZW50XCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIGlmKG1lc3NhZ2UgPT0gXCJtYWluIG1lbnVcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZW4ndCByZW5kZXJpbmcgdGhlbiBzdGFydFxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFJlbmRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbWFpbk1lbnVWaWV3ID0gbmV3IE1haW5NZW51VmlldyhnYW1lLm1haW5NZW51LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBtYWluTWVudVZpZXcuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3ID0gbWFpbk1lbnVWaWV3O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoW3RoaXMuX21haW5NZW51Vmlld10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlID09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgICAgIGxldCBsb2JieVZpZXcgPSBuZXcgTG9iYnlWaWV3KGdhbWUubG9iYnksIGdhbWUucGxheWVycywgdGhpcyk7XG4gICAgICAgICAgICAgICAgbG9iYnlWaWV3LmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5VmlldyA9IGxvYmJ5VmlldztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KFt0aGlzLl9sb2JieVZpZXddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihtZXNzYWdlID09IFwicGxheWluZ1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHJvb20gdmlld1xuICAgICAgICAgICAgICAgIGxldCByb29tVmlldyA9IG5ldyBSb29tVmlldyhnYW1lLnJvb20pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3ID0gcm9vbVZpZXc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHJvb21WaWV3LmxvYWRSZXNvdXJjZXMoKVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmlld3MgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbGwgb2Ygb3VyIHBsYXllciB2aWV3c1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIGdhbWUucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyVmlldyA9IG5ldyBQbGF5ZXJWaWV3KHBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocGxheWVyVmlldy5sb2FkUmVzb3VyY2VzKCkpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3cy5wdXNoKHBsYXllclZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cy5zZXQocGxheWVyLmlkLCBwbGF5ZXJWaWV3KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdWlWaWV3ID0gbmV3IFVpVmlldyhnYW1lLnVpLCBnYW1lLnBsYXllcnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldyA9IHVpVmlldztcbiAgICAgICAgICAgICAgICAvL3VpVmlldy5yZXF1ZXN0SW5wdXQoKS50aGVuKHRoaXMuaGFuZGxlVWlJbnB1dC5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHVpVmlldy5sb2FkUmVzb3VyY2VzKCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gTG9hZCBzb3VuZHNcbiAgICAgICAgICAgICAgICBsZXQgc291bmRTZXJ2aWNlID0gbmV3IFNvdW5kU2VydmljZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZSA9IHNvdW5kU2VydmljZTtcbiAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHNvdW5kU2VydmljZS5sb2FkUmVzb3VyY2VzKCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gQWZ0ZXIgYWxsIHJlbmRlcmVycyBhcmUgcmVhZHkgbGV0IHRoZSBkaXNwYXRjaGVyIGtub3dcbiAgICAgICAgICAgICAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udmlld3MsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXdcbiAgICAgICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJkdW5nZW9uLXRoZW1lXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJyZW5kZXItcmVhZHlcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJhZGQtcGxheWVyXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBpZihnYW1lLmN1cnJlbnRTdGF0ZSA9PT0gXCJsb2J5XCIpXG4gICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3Ll9yZWFkeSA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwicmVtb3ZlLXBsYXllclwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVklFVyBSRU1PVkUgUExBWUVSXCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKHBsYXllci5pZCk7XG4gICAgICAgICAgICBpZih0aGlzLl9wbGF5ZXJWaWV3cykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzLmRlbGV0ZShwbGF5ZXIuaWQpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gdGhpcy5nZXRQbGF5aW5nVmlld3MoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcImFkZC1lbmVteVwiLCAoZW5lbXkpPT57XG4gICAgICAgICAgICBsZXQgZW5lbXlWaWV3ID0gbmV3IEVuZW15VmlldyhlbmVteSk7XG4gICAgICAgICAgICBlbmVteVZpZXcubG9hZFJlc291cmNlcygpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9lbmVteVZpZXdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15Vmlld3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteVZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi50aGlzLl9lbmVteVZpZXdzXG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZW5lbXlWaWV3cyA9IFtlbmVteVZpZXddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwic3RhcnQtYmF0dGxlXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2Uuc3RvcChcImR1bmdlb24tdGhlbWVcIik7XG4gICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImNvbWJhdC10aGVtZVwiLCB0cnVlKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gW1xuICAgICAgICAgICAgICAgIC4uLnRoaXMuX3ZpZXdzLFxuICAgICAgICAgICAgICAgIC4uLnRoaXMuX2VuZW15Vmlld3NcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJwbGF5ZXItY29vbGRvd25cIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKHBsYXllci5pc0xvY2FsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJjb29sZG93bi1yZWFkeVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInBsYXllci1hdHRhY2tcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKHBsYXllciA9PSB0aGlzLl9nYW1lLmxvY2FsUGxheWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmNsZWFyTGFzdE9wdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwiZW5kLWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnN0b3AoXCJjb21iYXQtdGhlbWVcIik7XG4gICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcImR1bmdlb24tdGhlbWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl92aWV3cyA9IFtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb29tVmlldyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9wbGF5ZXJWaWV3cy52YWx1ZXMoKSxcbiAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXdcbiAgICAgICAgICAgIF07XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVVpSW5wdXQoaW5wdXQpIHtcbiAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBpbnB1dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgaW5wdXQgdG8gYWx0ZXIgdmlldyBhbmQgc2VlIGlmIHdlIG5lZWQgdG8gc2VuZCBlbnZlbnRzXG4gICAgICovXG4gICAgcmVnaXN0ZXJJbnB1dEhhbmRsZXJzKGlucHV0KSB7XG4gICAgICAgIC8vIFVwIGlucHV0XG4gICAgICAgIGlucHV0Lm9uKFwidXBcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFpbiBtZW51XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51Vmlldy51cCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEb3duIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiZG93blwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMZWZ0IElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwibGVmdFwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb2JieVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcubGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcubGVmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJpZ2h0IElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwicmlnaHRcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3LnJpZ2h0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5yaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtbW92ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbmZpcm0gSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJjb25maXJtXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcuY29uZmlybSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1zZWxlY3RcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCYWNrIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiYmFja1wiLCAoKT0+e1xuXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IoZW5lbXkpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLl9lbmVteSA9IGVuZW15O1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpdGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6ICd3dXJtLXNoZWV0LnBuZycsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc3ByaXRlLFxuICAgICAgICAgICAgc3ByaXRlLndpZHRoLzMqdGhpcy5mcmFtZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIDEwLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcbmltcG9ydCBQbGF5ZXIgICAgICAgICAgZnJvbSAnLi4vbW9kZWxzL29iamVjdHMvUGxheWVyJztcblxubGV0IGpvYkRpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5TZWxlY3QgSm9iPC9oMz5cbiAgICAgICAgPGxhYmVsPkpvYjogPC9sYWJlbD5cbiAgICAgICAgPHNlbGVjdCBuYW1lPVwiam9iXCI+XG4gICAgICAgIDwvc2VsZWN0Pjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY29uZmlybVwiPkNvbmZpcm08L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGxvYmJ5LCBwbGF5ZXJzLCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKGxvYmJ5KTtcbiAgICAgICAgdGhpcy5fbG9iYnkgPSBsb2JieTtcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuX3BsYXllcnMgPSBwbGF5ZXJzO1xuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZGlhbG9nT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9wZW5Kb2JEaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGpvYkRpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgbGV0IGNvbmZpcm1CdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjb25maXJtXCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IGpvYlNlbGVjdCA9IGVsZW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJqb2JcIl0nKTtcblxuICAgICAgICBmb3IobGV0IGpvYiBvZiBQbGF5ZXIuZ2V0Sm9icygpKSB7XG4gICAgICAgICAgICBsZXQgam9iT3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgIGpvYk9wdGlvbi52YWx1ZSA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iT3B0aW9uLmlubmVySFRNTCA9IGpvYi5uYW1lO1xuICAgICAgICAgICAgam9iU2VsZWN0LmFwcGVuZENoaWxkKGpvYk9wdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25maXJtQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogKCk9PntcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgaWYoam9iU2VsZWN0LnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZW1pdChcImpvYi1zZWxlY3RcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JcIjogam9iU2VsZWN0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSAxMDA7XG4gICAgICAgIGxldCB5UG9zID0gMTAwO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dChcIk5BTUU6XCIsIDEwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIkpPQjpcIiwgMzAwLCB5UG9zKTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiUkVBRFk6XCIsIDUwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5zdHJva2VSZWN0KDkwLCAxMTAsIDYwMCwgMTgwKTtcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgICAgIHlQb3MgKz0gNDA7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQocGxheWVyLm5hbWUsIDEwMCwgeVBvcyk7XG5cbiAgICAgICAgICAgIGlmKHBsYXllci5qb2IpIHtcbiAgICAgICAgICAgICAgICBsZXQgam9iTmFtZSA9IHBsYXllci5qb2IubmFtZVswXS50b1VwcGVyQ2FzZSgpICsgcGxheWVyLmpvYi5uYW1lLnNsaWNlKDEpOztcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoam9iTmFtZSwgMzAwLCB5UG9zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocGxheWVyLmN1cnJlbnRTdGF0ZSA9PSBcInJlYWR5XCIpIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiIzAwZmYwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIlJFQURZXCIsIDUwMCwgeVBvcyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmYwMDAwXCI7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KFwiTk9UIFJFQURZXCIsIDUwMCwgeVBvcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICBmb3IobGV0IG1lbnVPcHRpb24gb2YgdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBtZW51T3B0aW9uVGV4dCA9IG1lbnVPcHRpb247XG5cbiAgICAgICAgICAgIC8vIFNob3cgc2VsZWN0IGN1cnNvclxuICAgICAgICAgICAgaWYobWVudU9wdGlvblRleHQgPT0gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF0pXG4gICAgICAgICAgICAgICAgbWVudU9wdGlvblRleHQgPSBcIj4gXCIgKyBtZW51T3B0aW9uVGV4dDtcblxuICAgICAgICAgICAgLy8gRHJhdyBNZW51IE9wdGlvblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KG1lbnVPcHRpb25UZXh0LCB4UG9zLCAzMjApO1xuICAgICAgICAgICAgeFBvcyArPSAyMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sb2JieS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICB9XG5cbiAgICBsZWZ0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDApXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleC0tO1xuICAgIH1cblxuICAgIHJpZ2h0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCsrO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJTZWxlY3QgSm9iXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Kb2JEaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5zZWxlY3RlZE9wdGlvbiA9PSBcIkxlYXZlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3LmVtaXQoXCJsZWF2ZS1nYW1lXCIpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJSZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVhZHkgPSAhdGhpcy5fcmVhZHk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwicmVhZHlcIiwge1xuICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIFwic3RhdGVcIjogdGhpcy5fcmVhZHlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgIH1cblxuXG5cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyAgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJlc3JvdWNlU2VydmljZSBmcm9tICcuLi9zZXJ2aWNlcy9SZXNvdXJjZVNlcnZpY2UnO1xuXG5sZXQgaG9zdERpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5Ib3N0IE11bHRpcGxheWVyIEdhbWU8L2gzPlxuICAgICAgICA8bGFiZWw+TmFtZTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIj5cbiAgICAgICAgPGxhYmVsPklkIChvcHRpb25hbCk6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCI+PGJyPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJob3N0XCIgZGlzYWJsZWQ+SG9zdDwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJjYW5jZWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmxldCBqb2luRGlhbG9nID0gYFxuICAgIDxkaXYgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgICAgPGgzPkpvaW4gTXVsdGlwbGF5ZXIgR2FtZTwvaDM+XG4gICAgICAgIDxsYWJlbD5OYW1lOiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiPlxuICAgICAgICA8bGFiZWw+SG9zdCBJZDogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImhvc3RcIj5cbiAgICAgICAgPGxhYmVsPklkIChvcHRpb25hbCk6PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cImlkXCI+PGJyPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJqb2luXCIgZGlzYWJsZWQ+Sm9pbjwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIG5hbWU9XCJjYW5jZWxcIj5DYW5jZWw8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IobWFpbk1lbnUsIHZpZXcpIHtcbiAgICAgICAgc3VwZXIobWFpbk1lbnUpO1xuICAgICAgICB0aGlzLl9tYWluTWVudSA9IG1haW5NZW51O1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX2RpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeFBvcyA9IDEwMDtcbiAgICAgICAgbGV0IHlQb3MgPSAxMDA7XG5cbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgMTAwLCB5UG9zKTtcbiAgICAgICAgICAgIHlQb3MgKz0gMTAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFpbk1lbnUuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgb3Blbkhvc3REaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGhvc3REaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG4gICAgICAgIGxldCBob3N0QnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiaG9zdFwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBuYW1lSW5wdXQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGxldCBpZElucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpZFwiXScpO1xuXG4gICAgICAgIHZpZXcuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAgICAgbmFtZUlucHV0Lm9uaW5wdXQgPSAoKT0+e1xuICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGhvc3RCdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvc3RCdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaG9zdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5lbWl0KFwic3RhcnQtbXBcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkSW5wdXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9wZW5Kb2luRGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhqb2luRGlhbG9nLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2MuZmlyc3RDaGlsZDtcblxuXG4gICAgICAgIGxldCBqb2luQnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiam9pblwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBuYW1lSW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgbGV0IGhvc3RJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaG9zdFwiXScpO1xuICAgICAgICBsZXQgaWRJbnB1dCAgICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJpZFwiXScpO1xuXG4gICAgICAgIHZpZXcuX2VsZW1lbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG5cbiAgICAgICAgbGV0IGNoZWNrSW5wdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgJiYgaG9zdElucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgIGpvaW5CdXR0b24ucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGpvaW5CdXR0b24uc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5hbWVJbnB1dC5vbmlucHV0ID0gY2hlY2tJbnB1dC5iaW5kKHRoaXMpO1xuICAgICAgICBob3N0SW5wdXQub25pbnB1dCA9IGNoZWNrSW5wdXQuYmluZCh0aGlzKTtcblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgam9pbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbmZpcm06IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgJiYgaG9zdElucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmVtaXQoXCJzdGFydC1tcFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBob3N0SWQ6IGhvc3RJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZElucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgaWYoIXRoaXMuX2RpYWxvZylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID8gMCA6IDE7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgIH1cblxuICAgIGNvbmZpcm0oKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpIHtcbiAgICAgICAgICAgIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJIb3N0IEdhbWVcIikge1xuICAgICAgICAgICAgICAgIHRoaXMub3Blbkhvc3REaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbkpvaW5EaWFsb2codGhpcy5fdmlldyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICAgICAgdGhpcy5jbG9zZURpYWxvZygpO1xuICAgIH1cblxuXG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICB0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgbG9hZFJlc291cmNlKG5hbWUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzLycgKyByZXNvdXJjZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcmVzb3VyY2UgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChuYW1lLCBpbWcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSBhbGwgcmVzb3VyY2VzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIG9iamVjdFxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIGxldCByZXNvdXJjZVByb21pc2VzID0gW107XG4gICAgICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgICAgIFJlc291cmNlU2VydmljZS5sb2FkSW1hZ2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBQcm9taXNlLmFsbChyZXNvdXJjZVByb21pc2VzKS50aGVuKChpbWFnZXMpPT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpbWFnZSBvZiBpbWFnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KGltYWdlLm5hbWUsIGltYWdlLmltYWdlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBSZXNvbHZlIFByb21pc2VcbiAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxubGV0IEpPQl9TUFJJVEVTID0ge1xuICAgIFwiY2xhaXJ2b3lhbnRcIjogXCJjbGFpcnZveWFudC1zaGVldC5wbmdcIixcbiAgICBcImhlcmJhbGlzdFwiOiBcImhlcmJhbGlzdC1zaGVldC5wbmdcIixcbiAgICBcInZpbGxhaW5cIjogXCJ2aWxsYWluMi1zaGVldC5wbmdcIixcbiAgICBcImtuaWdodFwiOiBcImtuaWdodC1zaGVldC5wbmdcIixcbiAgICBcIm5lY3JvbWFuY2VyXCI6IFwibmVjcm9tYW5jZXItc2hlZXQucG5nXCIsXG4gICAgXCJuaW5qYVwiOiBcIm5pbmphLXNoZWV0LnBuZ1wiXG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgICAgICBzdXBlcihwbGF5ZXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZJRVdcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHBsYXllcik7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic3ByaXRlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBKT0JfU1BSSVRFU1twbGF5ZXIuam9iLm5hbWVdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzaGFkb3dcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwic2hhZG93LnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJidWJibGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwiYnViYmxlLnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSAgICAgID0gKGZyYW1lIDwgQ29uZmlnLkZQUy8yKSA/IDAgOiAxO1xuXG4gICAgICAgIGxldCBwbGF5ZXJXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIGxldCB4T2Zmc2V0ID0gQ29uZmlnLlRJTEVfWCAtIDM7XG4gICAgICAgIGlmKHRoaXMuX3BsYXllci5wb3NpdGlvbiA9PSBcImJhY2tcIikge1xuICAgICAgICAgICAgeE9mZnNldCsrO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNoYWRvdyAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93Jyk7XG5cbiAgICAgICAgbGV0IGJ1YmJsZSAgICAgICA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2J1YmJsZScpO1xuICAgICAgICBsZXQgYnViYmxlV2lkdGggID0gYnViYmxlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGxldCBidWJibGVIZWlnaHQgPSBidWJibGUuaGVpZ2h0LzUqQ29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgICAgICAvLyBEcmF3IFNoYWRvd1xuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNoYWRvdyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHNoYWRvdy53aWR0aCwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWCBQb3NcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci55UG9zKihwbGF5ZXJXaWR0aCkgKyAocGxheWVyV2lkdGgpIC0gKENvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93JykuaGVpZ2h0LzEuNzUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gRHJhdyBQbGF5ZXIgU3ByaXRlXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJyksXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIuY3VycmVudFN0YXRlID09PSBcIndhbGtpbmdcIiA/IENvbmZpZy5TUFJJVEVfU0laRSoodGhpcy5mcmFtZSkgOiAwLCAvLyBEWFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHhPZmZzZXQqKHBsYXllcldpZHRoKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIERyYXcgQnViYmxlXG4gICAgICAgIGxldCBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICBzd2l0Y2godGhpcy5fcGxheWVyLmN1cnJlbnRBY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgXCJ0aGlua2luZ1wiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXR0YWNrXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRlZmVuZFwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSoyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhYmlsaXR5XCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLl9wbGF5ZXIuY3VycmVudEFjdGlvbiAhPT0gXCJ3YWxrXCIgJiYgdGhpcy5fcGxheWVyLmN1cnJlbnRBY3Rpb24gIT09IFwicmVhZHlcIikge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQsIC8vIERZXG4gICAgICAgICAgICAgICAgYnViYmxlLndpZHRoLCAgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlLmhlaWdodC81LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpIC0gKGJ1YmJsZVdpZHRoLzEuNSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllci55UG9zKihwbGF5ZXJXaWR0aCkgLSAoYnViYmxlSGVpZ2h0LzEuNSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgICAgIGJ1YmJsZVdpZHRoLCAgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlSGVpZ2h0ICAvLyBzSGVpZ2h0XG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbi8vIFN0YXRpYyBSb29tIFR5cGVzXG4vL3N0YXRpYyBnZXQgVFlQRV9DQVZFKCkge1xuICAgIC8vcmV0dXJuIHtcbiAgICAgICAgLy9mbG9vcjogJ2dvb2R0aWxlLnBuZycsXG4gICAgICAgIC8vd2FsbDogJ3NoaXR3YWxsLnBuZydcbiAgICAvL307XG4vL31cblxuLy9zdGF0aWMgZ2V0IFRZUEVfVEVNUExFKCkge1xuICAgIC8vcmV0dXJuIHtcbiAgICAgICAgLy9mbG9vcjogJ2dyYXNzLnBuZycsXG4gICAgICAgIC8vd2FsbDogJ3BpbGxhcnMucG5nJ1xuICAgIC8vfTtcbi8vfVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKHJvb20pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcm9vbSA9IHJvb207XG4gICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fd2FsbE9mZnNldCAgPSAwO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJmbG9vclwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJnb29kdGlsZS5wbmdcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwid2FsbFwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJzaGl0d2FsbDIucG5nXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwiZmxvb3JcIiwgXCJnb29kdGlsZS5wbmdcIiksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcIndhbGxcIiwgIFwic2hpdHdhbGwyLnBuZ1wiKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBpZihmcmFtZSU0ID09IDApIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWUgPSB0aGlzLmZyYW1lID8gMCA6IDE7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXIgRmxvb3JcbiAgICAgICAgbGV0IGZsb29yID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnZmxvb3InKTtcbiAgICAgICAgbGV0IGZsb29yV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5USUxFX1grMTsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgQ29uZmlnLlRJTEVfWSAtIDQ7IHkrKykge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgICAgICBmbG9vcixcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICsgZmxvb3JXaWR0aCp4IC0gZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgKHkrMikqZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyIFdhbGxcbiAgICAgICAgbGV0IHdhbGwgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCd3YWxsJyk7XG4gICAgICAgIGxldCB3YWxsV2lkdGggPSB3YWxsLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuQ0FOVkFTX1dJRFRILyh3YWxsV2lkdGgpICsgMTsgeCsrKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB3YWxsLFxuICAgICAgICAgICAgICAgIDAsIC8vIERYXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQvMip0aGlzLmZyYW1lLCAvL0RZXG4gICAgICAgICAgICAgICAgd2FsbC53aWR0aCxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yLFxuICAgICAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKyB3YWxsV2lkdGgqeCAtIHdhbGxXaWR0aCwgLy9zeFxuICAgICAgICAgICAgICAgIDAsIC8vc3lcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRS8yXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENhbGN1bGF0ZSBPZmZzZXRzXG4gICAgICAgIGxldCB4U3RlcCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzE2O1xuICAgICAgICBpZih0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PSBcIm1vdmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX2Zsb29yT2Zmc2V0ID49IGZsb29yV2lkdGggLSAxKSB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl93YWxsT2Zmc2V0ID4gd2FsbFdpZHRoIC0gMSkgdGhpcy5fd2FsbE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgTG9nZ2VyICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IodWksIHBsYXllcnMsIHZpZXcpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fdWkgICAgICAgICA9IHVpO1xuICAgICAgICB0aGlzLl92aWV3ICAgICAgID0gdmlldztcbiAgICAgICAgdGhpcy5fcGxheWVycyAgICA9IHBsYXllcnM7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVUkgUExBWUVSU1wiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9wbGF5ZXJzKTtcblxuICAgICAgICB0aGlzLl90aWxlSGVpZ2h0ID0gMjtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiYmdcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwidWktYmcucG5nXCIsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBsZXQgeVBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCk7XG5cbiAgICAgICAgLy8gRHJhdyBCYWNrZ3JvdW5kXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgbGV0IGJnUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB5UG9zLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHlQb3MsXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCguLi5iZ1JlY3QpO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcIiM2NEEzNTdcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcIiMwMDM3MDBcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KC4uLnVpUmVjdCk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjOEQ4MDQ1XCI7XG5cbiAgICAgICAgLy8gVGhlIHN0cm9rZSBpcyBtaWRkbGUgYWxpZ25lZCB3aXRoIHRoZSBlZGdlcyBvZiB0aGUgYm94XG4gICAgICAgIGxldCBsaW5lV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8zMjtcbiAgICAgICAgLy9sZXQgbGluZVdpZHRoID0gNTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICBsZXQgc3Ryb2tlUmVjdCA9IFsuLi51aVJlY3RdO1xuICAgICAgICBzdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzJdIC09IGxpbmVXaWR0aDtcbiAgICAgICAgc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gRmlsbCBiZyB3aXRoIHBhdGVyblxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjE7XG4gICAgICAgIGxldCBwYXRlcm4gPSBjdHguY3JlYXRlUGF0dGVybih0aGlzLl9yZXNvdXJjZXMuZ2V0KFwiYmdcIiksIFwicmVwZWF0XCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0ZXJuO1xuICAgICAgICBjdHgucmVjdCguLi5zdHJva2VSZWN0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICB5UG9zICs9IENvbmZpZy5USUxFX1NJWkUvMztcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuXG4gICAgICAgIGxldCB4UG9zID0gQ29uZmlnLlRJTEVfU0laRSoxLjI7XG5cbiAgICAgICAgLy8gRHJhdyBJbmZvXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDAgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzBdLFxuICAgICAgICAgICAgeFBvcyxcbiAgICAgICAgICAgIHlQb3NcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMV0sXG4gICAgICAgICAgICB4UG9zICsgQ29uZmlnLlRJTEVfU0laRSoyLFxuICAgICAgICAgICAgeVBvc1xuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1syXSxcbiAgICAgICAgICAgIHhQb3MsXG4gICAgICAgICAgICB5UG9zICsgZm9udFNpemUqMlxuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAzID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1szXSxcbiAgICAgICAgICAgIHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICB5UG9zICsgZm9udFNpemUqMlxuICAgICAgICBdKTtcblxuICAgICAgICB4UG9zID0gQ29uZmlnLlRJTEVfU0laRSo1O1xuICAgICAgICB5UG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEluZm9cbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgeVBvcyArPSBmb250U2l6ZSoyO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBOYW1lc1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgICAgIHlQb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgY29vbGRvd24gdmFyc1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFyWVBvcyAgID0geVBvcyArIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJXaWR0aCAgPSBDb25maWcuVElMRV9TSVpFO1xuICAgICAgICAgICAgbGV0IGNvb2xkb3duQmFySGVpZ2h0ID0gZm9udFNpemUvMjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBDb29sZG93biBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDBGRjAwXCI7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25QZXJjZW50YWdlID0gcGxheWVyLmNvb2xkb3duL3BsYXllci5tYXhDb29sZG93bjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4UG9zLCBjb29sZG93bkJhcllQb3MsIGNvb2xkb3duQmFyV2lkdGgqY29vbGRvd25QZXJjZW50YWdlLCBjb29sZG93bkJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgQ29vbGRvd24gU3Ryb2tlXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggICA9IDEqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KHhQb3MsIGNvb2xkb3duQmFyWVBvcywgY29vbGRvd25CYXJXaWR0aCwgY29vbGRvd25CYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBEZWZpbmUgSGVhbHRoYmFyIHZhcnNcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJYUG9zICAgPSB4UG9zICsgQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcllQb3MgICA9IHlQb3MgLSBmb250U2l6ZS8yO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcldpZHRoICA9IENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJIZWlnaHQgPSBmb250U2l6ZS8yO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoUGVyY2VudGFnZSA9IHBsYXllci5oZWFsdGgvcGxheWVyLm1heEhlYWx0aDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCpoZWFsdGhQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLmhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGhlYWx0aEJhcllQb3MgKz0gaGVhbHRoQmFySGVpZ2h0KjEuNTtcblxuICAgICAgICAgICAgLy9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICAvL2N0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xuICAgICAgICAgICAgbGV0IG1hbmFQZXJjZW50YWdlID0gcGxheWVyLm1hbmEvcGxheWVyLm1heE1hbmE7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqbWFuYVBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIubWFuYX0vJHtwbGF5ZXIubWF4TWFuYX1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXAoKSB7XG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDEpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAxO1xuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudXAoKTtcbiAgICB9XG5cbiAgICBsZWZ0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDApXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMilcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgdGhpcy5sZWZ0KCk7XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRPcHRpb24gPSB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICAgICAgaWYoY3VycmVudE9wdGlvbiAhPT0gdGhpcy5fbGFzdE9wdGlvbikge1xuICAgICAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkLFxuICAgICAgICAgICAgICAgIFwib3B0aW9uXCI6IHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2xhc3RPcHRpb24gPSBjdXJyZW50T3B0aW9uO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJMYXN0T3B0aW9uKCkge1xuICAgICAgICB0aGlzLl9sYXN0T3B0aW9uID0gdW5kZWZpbmVkO1xuICAgIH1cbn1cbiJdfQ==
