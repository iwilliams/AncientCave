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
                _this3.emit("option-select", message);
                // This seems to have to go second for some reason
                _this3._networkService.optionSelect(message.option);
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
                    if (p.currentAction === "attack" && p.readyToAttack) {
                        this._playerAttack(p);
                    }
                }
            }
        }
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
            if (player.currentAction === "attack") {
                this._playerAttack(player);
            }
            this.emit("player-cooldown", player);
        }
    }, {
        key: '_playerAttack',
        value: function _playerAttack(p) {
            this.emit("player-attack", p);
            this._combatPhase();
            p.chargeCooldown(this._playerCooldownReady.bind(this));
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
                var p = new _objectsPlayer2['default'](message.name, message.id, message.job);
                _this3.addPlayer(p, message.isLocal);
            });

            // Remove the peers player from the game
            dispatcher.on("remove-player", function (message) {
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
                _this3.checkPlayerAction(player);
            });
        }

        /**
         * Adds a player regardless of remote or local
         */
    }, {
        key: 'addPlayer',
        value: function addPlayer(p, isLocal) {
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

    _createClass(Player, [{
        key: 'job',
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
    }], [{
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

        this._states = new Set(["idle", "ready", "resting", "walking"]);
        this.currentState = "idle";

        this.currentAction = "thinking";

        if (job) this.job = job;
    }

    _createClass(Player, [{
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
                    _Logger2['default'].network('Peer Connection created, Peer ID is ' + id);
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

            _Logger2['default'].network('Sending peer-connect message to peer with id ' + peer.id);
            _Logger2['default'].log(message);
            peer.connection.send(message);
            peer.hasConnected = true;
        }
    }, {
        key: 'removePeer',
        value: function removePeer(peer) {
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
            _Logger2['default'].network("Send message to peers");
            message.from = this._id;
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
            _Logger2['default'].network('Message recieved from peer with id ' + message.from);
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
                            _Logger2['default'].network('Adding Peer with id ' + peer);
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
            console.log("clear last option");
            this._lastOption = "";
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Logger":16,"./ObjectView":26}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbWl4aW5zL2V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL0xvYmJ5LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTWFpbk1lbnUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUm9vbS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9OZXR3b3JrU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1JuZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1NvdW5kU2VydmljZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1V0aWxzLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvQ2FudmFzMmQuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9FbmVteVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Mb2JieVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9NYWluTWVudVZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9PYmplY3RWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21WaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlWaWV3LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozt5QkNBbUIsY0FBYzs7Ozs7QUFHakMsSUFBSSxNQUFNLEdBQUcsMkJBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDUHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7Ozs7QUFLcEMsTUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsTUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTVCLE1BQU0sQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ25CLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7QUFFekUsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXOztBQUUxQixVQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQzs7QUFFdEIsVUFBTSxDQUFDLFdBQVcsR0FBSyxFQUFFLENBQUM7OztBQUcxQixRQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQ3BDLE9BQUc7QUFDQyxjQUFNLENBQUMsWUFBWSxHQUFLLFdBQVcsRUFBRSxHQUFDLE1BQU0sQ0FBQyxVQUFVLEFBQUMsQ0FBQztBQUN6RCxjQUFNLENBQUMsYUFBYSxHQUFHLEFBQUMsTUFBTSxDQUFDLFlBQVksR0FBQyxNQUFNLENBQUMs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RUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7aUJBQy9ELENBQUMsQ0FBQztBQUNILG9CQUFJLENBQUMsV0FBVyxHQUFHLGFBQWEsQ0FBQzthQUNwQztTQUNKOzs7ZUFFYywyQkFBRztBQUNkLG1CQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDakMsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsRUFBRSxDQUFDO1NBQ3pCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi9hcHAvRW5naW5lJztcblxuLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG52YXIgZW5naW5lID0gbmV3IEVuZ2luZShkb2N1bWVudC5ib2R5KTtcbmVuZ2luZS5pbml0KCk7XG5cbi8vIERFQlVHXG53aW5kb3cuZW5naW5lID0gZW5naW5lO1xuXG4iLCJsZXQgY29uZmlnID0ge307XG4vKipcbiAqIFNob3VsZCBiZSBzZXQgdXAgdG8gcmVjYWxjdWxhdGUgb24gdGhlIGZseSB3aGVuIHRoaW5ncyBjaGFnbmUuXG4gKiBOb3Qgd29ya2luZyByaWdodCBhdCBhbGwgZm9yIHdpbmRvdyBzaXplIGNoYWduZXMuXG4gKi9cbmNvbmZpZy5BUElfS0VZID0gXCJ4YWh4eDB5dXk1bGU0czRpXCI7XG5cbi8vY29uZmlnLkRJU0FCTEVfQVVESU8gPSB0cnVlO1xuXG4vLyAxNng5IEFzcGVjdCBSYXRpb1xuY29uZmlnLkFTUEVDVF9XSURUSCAgPSAxOTIwO1xuY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG5jb25maWcuVElMRV9YID0gMTY7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbmNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuY29uZmlnLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIEhvcml6b250YWwgb3IgVmVydGljYWwgcGVyY2VudGFnZSB0aGF0IHRoZSBnYW1lIHZpZXcgc2hvdWxkIG9jY3VweVxuICAgIGNvbmZpZy5QRVJDRU5UQUdFID0gMTtcblxuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG5cbiAgICAvLyBDYWNsdWxhdGUgY2FudmFzIHdpZHRoIGFuZCBoZWlnaHQgYWNjb3JkaW5nIHRvIGFib3ZlIHBlcmNlbnRhZ2UgYW5kIGFzcGVjdCByYXRpb1xuICAgIGxldCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5vdXRlcldpZHRoO1xuICAgIGRvIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSAoc2NyZWVuV2lkdGgtLSpjb25maWcuUEVSQ0VOVEFHRSk7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG4gICAgfSB3aGlsZShjb25maWcuQ0FOVkFTX0hFSUdIVCVjb25maWcuU1BSSVRFX1NJWkUgIT09IDApXG5cblxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgd2luZG93IHdpbGwgZml0IHZlcnRpY2FsbHlcbiAgICAvL2lmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIC8vY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICAvL2NvbmZpZy5DQU5WQVNfV0lEVEggPSAoY29uZmlnLkNBTlZBU19IRUlHSFQqY29uZmlnLkFTUEVDVF9XSURUSCkvY29uZmlnLkFTUEVDVF9IRUlHSFQ7XG4gICAgLy99XG5cbiAgICAvLyBEZXRlcm1pbmUgU3ByaXRlIFNjYWxpbmdcbiAgICBjb25maWcuU1BSSVRFX1NDQUxFICA9IGNvbmZpZy5DQU5WQVNfV0lEVEgvKGNvbmZpZy5USUxFX1gqY29uZmlnLlNQUklURV9TSVpFKTtcbiAgICBjb25maWcuVElMRV9TSVpFICAgICA9IGNvbmZpZy5TUFJJVEVfU0laRSpjb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgLy8gU2V0IEZQU1xuICAgIGNvbmZpZy5GUFMgPSAzMDtcbn1cblxuY29uZmlnLmNhbGN1bGF0ZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4uL0NvbmZpZyc7XG4vLyBJbXBvcnQgR2FtZVxuaW1wb3J0IEdhbWUgZnJvbSAnLi9tb2RlbHMvR2FtZSc7XG5cbi8vIEltcG9ydCBWaWV3XG5pbXBvcnQgVmlldyBmcm9tICcuL3ZpZXdzL0NhbnZhczJkJztcblxuLy8gSW1wb3J0IERpc3BhdGNoZXJcbmltcG9ydCBEaXNwYXRjaGVyIGZyb20gJy4vZGlzcGF0Y2hlci9EaXNwYXRjaGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9nYW1lICAgICAgID0gbmV3IEdhbWUoKTtcbiAgICAgICAgdGhpcy5fdmlldyAgICAgICA9IG5ldyBWaWV3KCk7XG4gICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIgPSBuZXcgRGlzcGF0Y2hlcigpO1xuXG4gICAgICAgIHdpbmRvdy5nYW1lICAgICAgID0gdGhpcy5fZ2FtZTtcbiAgICAgICAgd2luZG93LnZpZXcgICAgICAgPSB0aGlzLl92aWV3O1xuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hlciA9IHRoaXMuX2Rpc3BhdGNoZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZW5naW5lXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5fZ2FtZS5pbml0KHRoaXMuX2Rpc3BhdGNoZXIpLFxuICAgICAgICAgICAgdGhpcy5fdmlldy5pbml0KHRoaXMuX2dhbWUpLFxuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlci5pbml0KHRoaXMuX3ZpZXcpXG4gICAgICAgIF0pLnRoZW4oKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuZW1pdChcInN0YXJ0LWdhbWVcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IEV2ZW50RW1pdHRlciAgIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IE5ldHdvcmtTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL05ldHdvcmtTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5yZWdpc3RlclZpZXdNZXNzYWdlcyh0aGlzLl92aWV3KTtcbiAgICB9XG5cbiAgICBpbml0TXVsdGlwbGF5ZXJHYW1lKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgLy8gQnVpbGQgYXJnc1xuICAgICAgICBpZihtZXNzYWdlLmhvc3RJZCkge1xuICAgICAgICAgICAgYXJncyA9IFttZXNzYWdlLm5hbWUsIG1lc3NhZ2UuaG9zdElkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MgPSBbbWVzc2FnZS5uYW1lXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbml0IG1wIGNvbnRyb2xsZXJcbiAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2UgPSBuZXcgTmV0d29ya1NlcnZpY2UoLi4uYXJncyk7XG4gICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTXVsdGlwbGF5ZXJNZXNzYWdlcyh0aGlzLl9uZXR3b3JrU2VydmljZSk7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJEaXNwYXRjaGVyOiBCcm9hZGNhc3QgQWRkIFBsYXllciBNZXNzYWdlXCIpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiYWRkLXBsYXllclwiLCB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBTeW1ib2woKSxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogbWVzc2FnZS5uYW1lLFxuICAgICAgICAgICAgICAgIFwiaXNMb2NhbFwiOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImdhbWUtc3RhdGVcIiwgXCJsb2JieVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGVhdmVHYW1lKCkge1xuICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5kaXNjb25uZWN0KCk7XG4gICAgICAgIHRoaXMuZW1pdChcImdhbWUtc3RhdGVcIiwgXCJtYWluIG1lbnVcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBnZXQgYSBwZWVyIGNvbm5lY3QgZXZlbnQgZm9ybSB0aGUgbXVsdGlwbGF5ZXIgY29udHJvbGxlciwgY3JlYXRlIGEgYWRkIHBsYXllciBldmVudFxuICAgICAqL1xuICAgIHBlZXJDb25uZWN0KG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogUGVlciBDb25uZWN0IE1lc3NhZ2VcIik7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogQnJvYWRjYXN0IEFkZCBQbGF5ZXIgTWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkLXBsYXllclwiLCB7XG4gICAgICAgICAgICBcImlkXCI6IG1lc3NhZ2UuZnJvbSxcbiAgICAgICAgICAgIFwibmFtZVwiOiBtZXNzYWdlLmRhdGEubmFtZSxcbiAgICAgICAgICAgIFwiam9iXCI6IG1lc3NhZ2UuZGF0YS5qb2JcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSBnZXQgYSBwZWVyIGRpc2Nvbm5lY3QgZXZlbnQgZm9ybSB0aGUgbXVsdGlwbGF5ZXIgY29udHJvbGxlciwgY3JlYXRlIGEgcmVtb3ZlIHBsYXllciBldmVudFxuICAgICAqL1xuICAgIHBlZXJEaXNjb25uZWN0KG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogUGVlciBEaXNjb25uZWN0IE1lc3NhZ2VcIik7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGlzcGF0Y2hlcjogQnJvYWRjYXN0IFJlbW92ZSBQbGF5ZXIgTWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlLXBsYXllclwiLCB7XG4gICAgICAgICAgICBcImlkXCI6IG1lc3NhZ2VcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYWxsIG11bHRpcGxheWVyIEV2ZW50c1xuICAgICAqL1xuICAgIHJlZ2lzdGVyTXVsdGlwbGF5ZXJNZXNzYWdlcyhtdWx0aXBsYXllclNlcnZpY2UpIHtcbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwicGVlci1jb25uZWN0XCIsICAgIHRoaXMucGVlckNvbm5lY3QuYmluZCh0aGlzKSk7XG4gICAgICAgIG11bHRpcGxheWVyU2VydmljZS5vbihcInBlZXItZGlzY29ubmVjdFwiLCB0aGlzLnBlZXJEaXNjb25uZWN0LmJpbmQodGhpcykpO1xuXG4gICAgICAgIG11bHRpcGxheWVyU2VydmljZS5vbihcInBsYXllci1zdGF0ZVwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1zdGF0ZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwiam9iLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1qb2JcIiwgbWVzc2FnZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIG11bHRpcGxheWVyU2VydmljZS5vbihcIm9wdGlvbi1zZWxlY3RcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJvcHRpb24tc2VsZWN0XCIsIG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbGwgdmlldyBtZXNzYWdlc1xuICAgICAqL1xuICAgIHJlZ2lzdGVyVmlld01lc3NhZ2VzKHZpZXcpIHtcbiAgICAgICAgdmlldy5vbihcInN0YXJ0LW1wXCIsIHRoaXMuaW5pdE11bHRpcGxheWVyR2FtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdmlldy5vbihcImxlYXZlLWdhbWVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMubGVhdmVHYW1lKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5vbihcImpvYi1zZWxlY3RcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhpcy5fbmV0d29ya1NlcnZpY2Uuam9iU2VsZWN0KG1lc3NhZ2Uuam9iKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1qb2JcIiwgbWVzc2FnZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZpZXcub24oXCJyZWFkeVwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IG1lc3NhZ2Uuc3RhdGUgPyBcInJlYWR5XCIgOiBcImlkbGVcIjtcbiAgICAgICAgICAgIHRoaXMuX25ldHdvcmtTZXJ2aWNlLnBsYXllclN0YXRlKHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1zdGF0ZVwiLCB7XG4gICAgICAgICAgICAgICBcImlkXCI6IG1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgXCJzdGF0ZVwiOiBzdGF0ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZpZXcub24oXCJvcHRpb24tc2VsZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBtZXNzYWdlKTtcbiAgICAgICAgICAgIC8vIFRoaXMgc2VlbXMgdG8gaGF2ZSB0byBnbyBzZWNvbmQgZm9yIHNvbWUgcmVhc29uXG4gICAgICAgICAgICB0aGlzLl9uZXR3b3JrU2VydmljZS5vcHRpb25TZWxlY3QobWVzc2FnZS5vcHRpb24pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG5cbiAgICBvbih0eXBlcywgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgdHlwZSBvZiB0eXBlcy5zcGxpdChcIiBcIikpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG5cbiAgICBvbih0eXBlcywgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgdHlwZSBvZiB0eXBlcy5zcGxpdChcIiBcIikpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG59XG4iLCJpbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJTRVQgU1RBVEUgVE8gU1RBVEVcIik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTtcbiAgICB9XG59XG4iLCIvLyBJbXBvcnQgTWl4aW5zXG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9ldmVudEVtaXR0ZXInO1xuXG4vLyBJbXBvcnQgVXRpbHNcbmltcG9ydCBVdGlscyAgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IExvZ2dlciAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IENvbmZpZyAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJuZyAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9SbmcnO1xuXG4vLyBJbXBvcnQgTW9kZWxzXG5pbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4vQmFzZU1vZGVsJztcbmltcG9ydCBQbGF5ZXIgICAgZnJvbSAnLi9vYmplY3RzL1BsYXllcic7XG5pbXBvcnQgRW5lbXkgICAgIGZyb20gJy4vb2JqZWN0cy9Nb25zdGVyJztcbmltcG9ydCBSb29tICAgICAgZnJvbSAnLi9vYmplY3RzL1Jvb20nO1xuaW1wb3J0IE1haW5NZW51ICBmcm9tICcuL29iamVjdHMvTWFpbk1lbnUnO1xuaW1wb3J0IExvYmJ5ICAgICBmcm9tICcuL29iamVjdHMvTG9iYnknO1xuaW1wb3J0IFVpICAgICAgICBmcm9tICcuL29iamVjdHMvVWknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICBnZXQgY3VycmVudFN0YXRlKCkge3JldHVybiB0aGlzLl9jdXJyZW50U3RhdGU7fVxuICAgIGdldCBtYWluTWVudSgpIHtyZXR1cm4gdGhpcy5fbWFpbk1lbnU7fVxuICAgIGdldCBsb2JieSgpIHtyZXR1cm4gdGhpcy5fbG9iYnk7fVxuICAgIGdldCBwbGF5ZXJzKCkge3JldHVybiB0aGlzLl9wbGF5ZXJzO31cbiAgICBnZXQgbG9jYWxQbGF5ZXIoKSB7cmV0dXJuIHRoaXMuX2xvY2FsUGxheWVyO31cbiAgICBnZXQgcm9vbSgpIHtyZXR1cm4gdGhpcy5fcm9vbTt9XG4gICAgZ2V0IHVpKCkge3JldHVybiB0aGlzLl91aTt9XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgIFwibWFpbiBtZW51XCIsXG4gICAgICAgICAgICBcImxvYmJ5XCIsXG4gICAgICAgICAgICBcInBsYXlpbmdcIlxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl9tYWluTWVudSA9IG5ldyBNYWluTWVudSgpO1xuICAgICAgICB0aGlzLl9sb2JieSAgICA9IG5ldyBMb2JieSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoZGlzcGF0Y2hlcikge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlzcGF0Y2hlciA9IGRpc3BhdGNoZXI7XG5cbiAgICAgICAgICAgIHRoaXMuX3BsYXllcnMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgIC8vIExJU1RFTiBGT1IgRVZFTlRTXG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvRGlzcGF0Y2hlcih0aGlzLl9kaXNwYXRjaGVyKTtcblxuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZ2FtZSBzdGF0ZSBpZiBpdHMgYWxsb3dlZFxuICAgICAqIE1ha2Ugc3VyZSB3ZSBlbWl0IGl0XG4gICAgICovXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICBpZih0aGlzLl9jdXJyZW50U3RhdGUgPT0gXCJtYWluIG1lbnVcIikge1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGFsbCBwbGF5ZXJzXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVycyAgICAgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYWxQbGF5ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJnYW1lLXN0YXRlXCIsIHRoaXMuX2N1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIHRoaXMgZnVuY3Rpb24gYWZ0ZXIgYW55IHBsYXllcnN0YWUgY2hhbmdlIHNvIHdlIGNhbiBkZWNpZGUgd2hhdCB0byBkby5cbiAgICAgKi9cbiAgICBjaGVja1BsYXllclN0YXRlKCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxvYnkgZGVjaWRlIGlmIHdlIG5lZWQgdG8gc3RhcnQgdGhlIGdhbWVcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgbGV0IHJlYWR5VG9TdGFydCA9IHRydWU7XG4gICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICByZWFkeVRvU3RhcnQgPSByZWFkeVRvU3RhcnQgJiYgcGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihyZWFkeVRvU3RhcnQpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXIuYmFubmVyKFwiU1RBUlRJTkcgR0FNRVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGFydFBsYXlpbmcoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNoZWNrUGxheWVyQWN0aW9uKHApIHtcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT09IFwicGxheWluZ1wiKSB7XG4gICAgICAgICAgICBpZih0aGlzLl9yb29tLmN1cnJlbnRTdGF0ZSA9PSBcImlkbGVcIikge1xuICAgICAgICAgICAgICAgIGxldCByZWFkeVRvTW92ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlYWR5VG9Nb3ZlID0gcmVhZHlUb01vdmUgJiYgcGxheWVyLmN1cnJlbnRBY3Rpb24gPT09IFwicmVhZHlcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihyZWFkeVRvTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPT0gXCJiYXR0bGVcIikge1xuICAgICAgICAgICAgICAgIGlmKHAuY3VycmVudEFjdGlvbiA9PT0gXCJhdHRhY2tcIiAmJiBwLnJlYWR5VG9BdHRhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyQXR0YWNrKHApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9zdGFydE1lbnUoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJtYWluIG1lbnVcIjtcbiAgICB9XG5cbiAgICBfc3RhcnRNdWx0aXBsYXllcigpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImxvYmJ5XCI7XG4gICAgfVxuXG4gICAgX3N0YXJ0UGxheWluZygpIHtcbiAgICAgICAgLy8gQ3JlYXRlIGEgcm9vbVxuICAgICAgICB0aGlzLl9yb29tICAgICAgICA9IG5ldyBSb29tKCk7XG4gICAgICAgIHRoaXMuX3VpICAgICAgICAgID0gbmV3IFVpKCk7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJwbGF5aW5nXCI7XG4gICAgfVxuXG4gICAgX2xvb2tGb3JUcm91YmxlKCkge1xuICAgICAgICAvLyBTZXQgcm9vbSB0byBtb3ZpbmdcbiAgICAgICAgdGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPSBcIm1vdmluZ1wiO1xuXG4gICAgICAgIC8vIFNldCBwbGF5ZXJzIHRvIHdhbGtpbmdcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gXCJ3YWxraW5nXCI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgZW5lbWllc1xuICAgICAgICBsZXQgZW5lbXkgPSBuZXcgRW5lbXkoKTtcbiAgICAgICAgdGhpcy5lbWl0KFwiYWRkLWVuZW15XCIsIGVuZW15KTtcblxuICAgICAgICB0aGlzLl9lbmVtaWVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBlbmVteVxuICAgICAgICBdKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB0aGlzLl9zdGFydEJhdHRsZSgpO1xuICAgICAgICB9LCAyMDAwKTtcbiAgICB9XG5cbiAgICBfc3RhcnRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJiYXR0bGVcIjtcbiAgICAgICAgdGhpcy5fdWkuc2V0QmF0dGxlT3B0aW9ucygpO1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHBsYXllci5iZWdpbkNvbWJhdCgpO1xuICAgICAgICAgICAgcGxheWVyLmNoYXJnZUNvb2xkb3duKHRoaXMuX3BsYXllckNvb2xkb3duUmVhZHkuYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbWl0KCdzdGFydC1iYXR0bGUnKTtcbiAgICB9XG5cbiAgICBfcGxheWVyQ29vbGRvd25SZWFkeShwbGF5ZXIpIHtcbiAgICAgICAgaWYocGxheWVyLmN1cnJlbnRBY3Rpb24gPT09IFwiYXR0YWNrXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsYXllckF0dGFjayhwbGF5ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdChcInBsYXllci1jb29sZG93blwiLCBwbGF5ZXIpO1xuICAgIH1cblxuICAgIF9wbGF5ZXJBdHRhY2socCkge1xuICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItYXR0YWNrXCIsIHApO1xuICAgICAgICB0aGlzLl9jb21iYXRQaGFzZSgpO1xuICAgICAgICBwLmNoYXJnZUNvb2xkb3duKHRoaXMuX3BsYXllckNvb2xkb3duUmVhZHkuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgX2NvbWJhdFBoYXNlKCkge1xuICAgICAgICBsZXQgc2hvdWxkRW5kQmF0dGxlID0gdHJ1ZTtcbiAgICAgICAgZm9yKGxldCBlbmVteSBvZiB0aGlzLl9lbmVtaWVzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBlbmVteS5oZWFsdGgtLTtcbiAgICAgICAgICAgIHNob3VsZEVuZEJhdHRsZSA9IHNob3VsZEVuZEJhdHRsZSAmJiAoZW5lbXkuaGVhbHRoIDw9IDApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc2hvdWxkRW5kQmF0dGxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbmRCYXR0bGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF9lbmRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuX3VpLnNldElkbGVPcHRpb25zKCk7XG4gICAgICAgIHRoaXMuZW1pdCgnZW5kLWJhdHRsZScpO1xuXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmVuZENvbWJhdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVuIHRvIGV2ZW50cyBmcm9tIHRoZSBkaXNwYXRjaGVyIGFuZCByZXNwb25kIGFjb3JkaW5nbHlcbiAgICAgKi9cbiAgICBsaXN0ZW5Ub0Rpc3BhdGNoZXIoZGlzcGF0Y2hlcikge1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwic3RhcnQtZ2FtZVwiLCB0aGlzLl9zdGFydE1lbnUuYmluZCh0aGlzKSk7XG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJzdGFydC1tcFwiLCAgIHRoaXMuX3N0YXJ0TXVsdGlwbGF5ZXIuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gTGlzdGVuIHRvIGdhbWUgc3RhdGUgZXZlbnRzXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJnYW1lLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBtZXNzYWdlO1xuICAgICAgICB9KTtcblxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwiYWRkLXBsYXllclwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcihtZXNzYWdlLm5hbWUsIG1lc3NhZ2UuaWQsIG1lc3NhZ2Uuam9iKTtcbiAgICAgICAgICAgIHRoaXMuYWRkUGxheWVyKHAsIG1lc3NhZ2UuaXNMb2NhbCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgcGVlcnMgcGxheWVyIGZyb20gdGhlIGdhbWVcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInJlbW92ZS1wbGF5ZXJcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICAvLyBHZXQgYW5kIHRoZW4gZGVsZXRlIHBsYXllclxuICAgICAgICAgICAgbGV0IHBsYXllclRvUmVtb3ZlID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5pZCk7XG4gICAgICAgICAgICBsZXQgcGxheWVyUmVtb3ZlZCA9IHRoaXMuX3BsYXllcnMuZGVsZXRlKHBsYXllclRvUmVtb3ZlLmlkKTtcblxuICAgICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSBwbGF5ZXIgd2FzIHRoZXJlXG4gICAgICAgICAgICBpZihwbGF5ZXJSZW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVtb3ZlLXBsYXllclwiLCBwbGF5ZXJUb1JlbW92ZSk7XG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLmN1cnJlbnRTdGF0ZSA9PSBcImxvYmJ5XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fcGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBbHRlciBwbGF5ZXIncyBqb2JcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInBsYXllci1qb2JcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5pZCk7XG4gICAgICAgICAgICBwbGF5ZXIuam9iID0gbWVzc2FnZS5qb2I7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEFsdGVyIHBsYXllcidzIHN0YXRlXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJwbGF5ZXItc3RhdGVcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5fcGxheWVycy5nZXQobWVzc2FnZS5pZCk7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gbWVzc2FnZS5zdGF0ZTtcblxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3MgR2FtZSBsb2dpYyBhY2NvcmlkbmcgdG8gcGxheWVyIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmNoZWNrUGxheWVyU3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGlzdGVuIGZvciByZW1vdGUgb3B0aW9uIHNlbGVjdFxuICAgICAgICAvLyBDSEFOR0UgVE8gUExBWUVSLUFDVElPTlxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwib3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9wbGF5ZXJzLmdldChtZXNzYWdlLmlkKTtcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50QWN0aW9uID0gbWVzc2FnZS5vcHRpb247XG4gICAgICAgICAgICB0aGlzLmNoZWNrUGxheWVyQWN0aW9uKHBsYXllcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwbGF5ZXIgcmVnYXJkbGVzcyBvZiByZW1vdGUgb3IgbG9jYWxcbiAgICAgKi9cbiAgICBhZGRQbGF5ZXIocCwgaXNMb2NhbCkge1xuICAgICAgICBsZXQgcGxheWVycyA9IHRoaXMuX3BsYXllcnMudmFsdWVzKCk7XG4gICAgICAgIGxldCB5UG9zID0gLjg7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHBsYXllcnMpIHtcbiAgICAgICAgICAgIHlQb3MgPSBwbGF5ZXIueVBvcztcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICAgICAgfVxuICAgICAgICB5UG9zICs9IDEuMjtcbiAgICAgICAgcC55UG9zID0geVBvcztcbiAgICAgICAgdGhpcy5fcGxheWVycy5zZXQocC5pZCwgcCk7XG4gICAgICAgIGlmKGlzTG9jYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsUGxheWVyID0gcDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVtaXQoXCJhZGQtcGxheWVyXCIsIHApO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtICUgWSBvZmZzZXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiU2VsZWN0IEpvYlwiLFxuICAgICAgICAgICAgXCJSZWFkeVwiLFxuICAgICAgICAgICAgXCJMZWF2ZVwiXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE9wdGlvbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJIb3N0IEdhbWVcIixcbiAgICAgICAgICAgIFwiSm9pbiBHYW1lXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBUWVBFX1dVUk0oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3d1cm0tc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnd3VybSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIHR5cGUpIHtcbiAgICAgICAgc3VwZXIoW10pO1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zO1xuICAgICAgICB0aGlzLnlwb3MgPSB5UG9zO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIHRoaXMuaGVhbHRoID0gNTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsICAgICBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IExvZ2dlciBmcm9tICcuLi8uLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5sZXQgSk9CUyA9IG5ldyBNYXAoKTtcblxuSk9CUy5zZXQoXCJjbGFpcnZveWFudFwiLCB7XG4gICAgJ25hbWUnOiAgICdjbGFpcnZveWFudCcsXG4gICAgJ2hlYWx0aCc6IDYwLFxuICAgICdtYW5hJzogNDAsXG4gICAgJ2Nvb2xkb3duJzogODAsXG4gICAgJ3Bvc2l0aW9uJzogJ2JhY2snXG59KTtcblxuSk9CUy5zZXQoXCJoZXJiYWxpc3RcIiwge1xuICAgICduYW1lJzogJ2hlcmJhbGlzdCcsXG4gICAgJ2hlYWx0aCc6IDQwLFxuICAgICdtYW5hJzogMCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcInZpbGxhaW5cIiwge1xuICAgICduYW1lJzogJ3ZpbGxhaW4nLFxuICAgICdoZWFsdGgnOiA4MCxcbiAgICAnbWFuYSc6IDIwLFxuICAgICdjb29sZG93bic6IDQwLFxuICAgICdwb3NpdGlvbic6ICdmcm9udCdcbn0pO1xuXG5KT0JTLnNldChcImtuaWdodFwiLCB7XG4gICAgJ25hbWUnOiAna25pZ2h0JyxcbiAgICAnaGVhbHRoJzogMTAwLFxuICAgICdtYW5hJzogMCxcbiAgICAnY29vbGRvd24nOiAxMDAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwibmVjcm9tYW5jZXJcIiwge1xuICAgICduYW1lJzogJ25lY3JvbWFuY2VyJyxcbiAgICAnaGVhbHRoJzogNDAsXG4gICAgJ21hbmEnOiAxMjAsXG4gICAgJ2Nvb2xkb3duJzogODAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwibmluamFcIiwge1xuICAgICduYW1lJzogJ25pbmphJyxcbiAgICAnaGVhbHRoJzogNjAsXG4gICAgJ21hbmEnOiAzMCxcbiAgICAnY29vbGRvd24nOiAzMCxcbiAgICAncG9zaXRpb24nOiAnZnJvbnQnXG59KTtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIGdldCBqb2IoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9qb2I7XG4gICAgfVxuICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCBjdXJyZW50QWN0aW9uKGFjdGlvbikge3RoaXMuX2N1cnJlbnRBY3Rpb24gPSBhY3Rpb247fVxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTt9XG4gICAgZ2V0IGN1cnJlbnRBY3Rpb24oKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRBY3Rpb247fVxuICAgIGdldCBuYW1lKCkge3JldHVybiB0aGlzLl9uYW1lO31cbiAgICBnZXQgaWQoKSB7cmV0dXJuIHRoaXMuX2lkO31cbiAgICBnZXQgcmVhZHlUb0F0dGFjaygpIHtyZXR1cm4gdGhpcy5fcmVhZHlUb0F0dGFjazt9XG5cbiAgICBzdGF0aWMgZ2V0Sm9icygpIHtcbiAgICAgICAgcmV0dXJuIFsuLi5KT0JTLnZhbHVlcygpXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBpZCwgam9iKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX25hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcInJlc3RpbmdcIixcbiAgICAgICAgICAgIFwid2Fsa2luZ1wiLFxuICAgICAgICBdKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcblxuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBcInRoaW5raW5nXCI7XG5cbiAgICAgICAgaWYoam9iKSB0aGlzLmpvYiA9IGpvYjtcbiAgICB9XG5cbiAgICBzZXQgam9iKGpvYk5hbWUpIHtcbiAgICAgICAgdGhpcy5fam9iID0gSk9CUy5nZXQoam9iTmFtZSk7XG5cbiAgICAgICAgdGhpcy5tYXhIZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuICAgICAgICB0aGlzLmhlYWx0aCA9IHRoaXMuX2pvYi5oZWFsdGg7XG5cbiAgICAgICAgdGhpcy5tYXhNYW5hID0gdGhpcy5fam9iLm1hbmE7XG4gICAgICAgIHRoaXMubWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuXG4gICAgICAgIHRoaXMubWF4Q29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG4gICAgICAgIHRoaXMuY29vbGRvd24gPSB0aGlzLl9qb2IuY29vbGRvd247XG4gICAgfVxuXG4gICAgYmVnaW5Db21iYXQoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlICA9IFwiaWRsZVwiO1xuICAgICAgICB0aGlzLmN1cnJlbnRBY3Rpb24gPSBcImFjdGlvblwiO1xuICAgICAgICB0aGlzLmNvb2xkb3duICAgICAgPSAwO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZW5kQ29tYmF0KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSAgID0gXCJpZGxlXCI7XG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiAgPSBcInRoaW5raW5nXCI7XG4gICAgICAgIHRoaXMuY29vbGRvd24gICAgICAgPSB0aGlzLm1heENvb2xkb3duO1xuICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gZmFsc2U7XG4gICAgICAgIGlmKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpIGNsZWFySW50ZXJ2YWwodGhpcy5fY29vbGRvd25JbnRlcnZhbCk7XG4gICAgfVxuXG4gICAgY2hhcmdlQ29vbGRvd24oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGlvbiA9IFwidGhpbmtpbmdcIjtcbiAgICAgICAgdGhpcy5fcmVhZHlUb0F0dGFjayA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gMDtcblxuICAgICAgICBpZih0aGlzLl9jb29sZG93bkludGVydmFsKSBjbGVhckludGVydmFsKHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwpO1xuXG4gICAgICAgIHRoaXMuX2Nvb2xkb3duSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgdGhpcy5jb29sZG93bisrO1xuICAgICAgICAgICAgaWYodGhpcy5jb29sZG93biA+PSB0aGlzLm1heENvb2xkb3duKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9jb29sZG93bkludGVydmFsKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgNjApO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnO1xuaW1wb3J0IExvZ2dlciAgICBmcm9tICcuLi8uLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5jbGFzcyBSb29tIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJpZGxlXCIsXG4gICAgICAgICAgICBcIm1vdmluZ1wiLFxuICAgICAgICAgICAgXCJiYXR0bGVcIlxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLl90eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBcImlkbGVcIjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvb207XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9iYXR0bGVPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJhdHRhY2tcIixcbiAgICAgICAgICAgIFwiYWJpbGl0eVwiLFxuICAgICAgICAgICAgXCJpdGVtXCIsXG4gICAgICAgICAgICBcImRlZmVuZFwiXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fcm9vbU9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJtYW5hZ2VcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fcm9vbU9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE9wdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0QmF0dGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9iYXR0bGVPcHRpb25zO1xuICAgIH1cblxuICAgIHNldElkbGVPcHRpb25zKCkge1xuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IHRoaXMuX3Jvb21PcHRpb25zO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGlkKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgd2luZG93LmtleXByZXNzLkxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoSW5wdXQodGhpcy5saXN0ZW5lcik7XG4gICAgfVxuXG4gICAgYXR0YWNoSW5wdXQobGlzdGVuZXIpIHtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwidXBcIiwgKCkgPT4gdGhpcy5lbWl0KFwidXBcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJrXCIsICgpID0+IHRoaXMuZW1pdChcInVwXCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJkb3duXCIsICgpID0+IHRoaXMuZW1pdChcImRvd25cIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJqXCIsICgpID0+IHRoaXMuZW1pdChcImRvd25cIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImxlZnRcIiwgKCkgPT4gdGhpcy5lbWl0KFwibGVmdFwiKSk7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImhcIiwgKCkgPT4gdGhpcy5lbWl0KFwibGVmdFwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwicmlnaHRcIiwgKCkgPT4gdGhpcy5lbWl0KFwicmlnaHRcIikpO1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsXCIsICgpID0+IHRoaXMuZW1pdChcInJpZ2h0XCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJlbnRlclwiLCAoKT0+IHRoaXMuZW1pdChcImNvbmZpcm1cIikpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbmV0d29yayhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjRkRGNDg1OyBjb2xvcjogIzAwMDsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi9Mb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgaG9zdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgaWYoaG9zdClcbiAgICAgICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pZCA9IFwiaG9zdFwiO1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcGVlciBjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX3BlZXIgPSBuZXcgUGVlcih0aGlzLl9pZCwge1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdvcGVuJywgKGlkKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5uZXR3b3JrKGBQZWVyIENvbm5lY3Rpb24gY3JlYXRlZCwgUGVlciBJRCBpcyAke2lkfWApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBrbm93IGFib3V0IGEgcGVlciB0aGVuIGNvbm5lY3RcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9ob3N0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHRoaXMuX2hvc3QpKTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gYSBwZWVyIGNvbm5lY3RzIGhhbmRsZSBpdFxuICAgICAgICAgICAgICAgIHRoaXMuX3BlZXIub24oJ2Nvbm5lY3Rpb24nLCAoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgbW9yZSB0aGFuIDQgcGxheWVyc1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9wZWVycy5zaXplID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ29wZW4nLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLm5ldHdvcmsoXCJQZWVyIGhhcyBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXIgPSB0aGlzLmFkZFBlZXIoY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGVlcihjb25uZWN0aW9uKSB7XG4gICAgICAgIGxldCBwZWVyID0ge1xuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IGNvbm5lY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BlZXJzLnNldChjb25uZWN0aW9uLnBlZXIsIHBlZXIpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAgdGhpcy5oYW5kbGVEYXRhLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgY29ubmVjdFRvUGVlcihwZWVyKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcInBlZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5fbmFtZSxcbiAgICAgICAgICAgICAgICBcImpvYlwiOiB0aGlzLl9zZWxlY3RlZEpvYiB8fCB1bmRlZmluZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwZWVycyA9IFtdO1xuICAgICAgICBmb3IobGV0IHBlZXIgb2YgdGhpcy5fcGVlcnMua2V5cygpKSB7XG4gICAgICAgICAgICBwZWVycy5wdXNoKHBlZXIpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UuZGF0YS5wZWVycyA9IHBlZXJzO1xuXG4gICAgICAgIExvZ2dlci5uZXR3b3JrKGBTZW5kaW5nIHBlZXItY29ubmVjdCBtZXNzYWdlIHRvIHBlZXIgd2l0aCBpZCAke3BlZXIuaWR9YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmhhc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGVlcihwZWVyKSB7XG4gICAgICAgIHRoaXMuZW1pdChcInBlZXItZGlzY29ubmVjdFwiLCBwZWVyLmNvbm5lY3Rpb24ucGVlcik7XG4gICAgICAgIHRoaXMuX3BlZXJzLmRlbGV0ZShwZWVyLmNvbm5lY3Rpb24ucGVlcik7XG4gICAgfVxuXG4gICAgZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5fcGVlci5kZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2VuZCBtZXNzYWdlIHRvIGFsbCBwZWVyc1xuICAgICAqL1xuICAgIF9zZW5kTWVzc2FnZShtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5uZXR3b3JrKFwiU2VuZCBtZXNzYWdlIHRvIHBlZXJzXCIpO1xuICAgICAgICBtZXNzYWdlLmZyb20gPSB0aGlzLl9pZDtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgaWYodGhpcy5fcGVlcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxheWVyU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXN0YXRlXCIsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgXCJzdGF0ZVwiOiBzdGF0ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zZW5kTWVzc2FnZShtZXNzYWdlKTtcbiAgICB9XG5cbiAgICBqb2JTZWxlY3Qoam9iKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcImpvYi1zZWxlY3RcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBcImpvYlwiOiBqb2JcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRKb2IgPSBqb2I7XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIG9wdGlvblNlbGVjdChvcHRpb24pIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwib3B0aW9uLXNlbGVjdFwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIFwib3B0aW9uXCI6IG9wdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGEobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIubmV0d29yayhgTWVzc2FnZSByZWNpZXZlZCBmcm9tIHBlZXIgd2l0aCBpZCAke21lc3NhZ2UuZnJvbX1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICAvLyBHcmFiIGRhdGEgZnJvbSBtZXNzYWdlXG4gICAgICAgIGxldCBkYXRhID0gbWVzc2FnZS5kYXRhO1xuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwZWVyLWNvbm5lY3RcIikge1xuICAgICAgICAgICAgLy8gU2VlIGlmIHRoaXMgcGVlciBrbm93cyBhYm91dCBhbnkgb3RoZXIgcGVlcnMgYW5kIGFkZCBpZiB3ZSBkb24ndCBrbm93IHRoZW1cbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiBkYXRhLnBlZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3BlZXJzLmdldChwZWVyKSAmJiBwZWVyICE9PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIubmV0d29yayhgQWRkaW5nIFBlZXIgd2l0aCBpZCAke3BlZXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGVlcih0aGlzLl9wZWVyLmNvbm5lY3QocGVlcikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU2VlIGlmIHdlIGhhdmUgYWxyZWFkeSBjb25uZWN0ZWQgdG8gdGhpcyBwZWVyXG4gICAgICAgICAgICBpZih0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKSAmJiAhdGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkuaGFzQ29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGVlci1jb25uZWN0XCIsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcInBsYXllci1zdGF0ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItc3RhdGVcIiwgbWVzc2FnZS5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJqb2Itc2VsZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImpvYi1zZWxlY3RcIiwgbWVzc2FnZS5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJvcHRpb24tc2VsZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcIm9wdGlvbi1zZWxlY3RcIiwgbWVzc2FnZS5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSAnLi9Mb2dnZXIuanMnO1xuXG5sZXQgcmVzb3VyY2VEaXIgPSAnLi9kaXN0L3Jlc291cmNlcy8nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgcmVzb3VyY2UgYnkgZmlsZW5hbWVcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKi9cbiAgICBzdGF0aWMgbG9hZEltYWdlKHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhgcmVzb3VyY2UgbG9hZGVkOiAke3Jlc291cmNlfWApO1xuICAgICAgICAgICAgICAgIHJlcyhpbWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1nLnNyYyA9IHJlc291cmNlRGlyICsgJ2ltYWdlcy8nICsgcmVzb3VyY2U7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKHNlZWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSTkcgQ1JFQVRFXCIpO1xuICAgICAgICB0aGlzLl9ybmcgPSBuZXcgUk5HKHNlZWQpO1xuICAgICAgICB3aW5kb3cucm5nID0gdGhpcy5fcm5nO1xuICAgIH1cblxuICAgIG5leHQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ybmcucmFuZG9tKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX3NvdW5kUGF0aCA9IFwiLi9kaXN0L3Jlc291cmNlcy9zb3VuZHMvXCI7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgaWYoQ29uZmlnLkRJU0FCTEVfQVVESU8pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICBsZXQgc291bmRzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm1lbnUtbW92ZVwiLFxuICAgICAgICAgICAgICAgIFwidXJsXCI6IHRoaXMuX3NvdW5kUGF0aCArIFwibWVudS1tb3ZlLm1wM1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcIm1lbnUtc2VsZWN0XCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJtZW51LXNlbGVjdC5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJjb29sZG93bi1yZWFkeVwiLFxuICAgICAgICAgICAgICAgIFwidXJsXCI6IHRoaXMuX3NvdW5kUGF0aCArIFwiY29vbGRvd24tcmVhZHkubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwiY29tYmF0LXRoZW1lXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJxcnRybm90ZXFvbWJhdC5nYi5tcDNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJkdW5nZW9uLXRoZW1lXCIsXG4gICAgICAgICAgICAgICAgXCJ1cmxcIjogdGhpcy5fc291bmRQYXRoICsgXCJkdW5nZW9uZGVsYXkuZ2IubXAzXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fc291bmRzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIGZvcihsZXQgc291bmQgb2Ygc291bmRzKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgICAgICAvLyBMb2FkIHRoZSBzb3VuZFxuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kcy5zZXQoc291bmQubmFtZSwgbmV3IEhvd2woe1xuICAgICAgICAgICAgICAgICAgICB1cmxzOiBbc291bmQudXJsXSxcbiAgICAgICAgICAgICAgICAgICAgb25sb2FkOiByZXMsXG4gICAgICAgICAgICAgICAgICAgIG9ubG9hZGVycm9yOiByZWpcbiAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHBsYXkoc291bmROYW1lLCBsb29wKSB7XG4gICAgICAgIGlmKENvbmZpZy5ESVNBQkxFX0FVRElPKSByZXR1cm47XG4gICAgICAgIGxldCBzb3VuZCA9IHRoaXMuX3NvdW5kcy5nZXQoc291bmROYW1lKTtcbiAgICAgICAgc291bmQubG9vcChsb29wIHx8IGZhbHNlKTtcbiAgICAgICAgc291bmQucGxheSgpO1xuICAgIH1cblxuICAgIHN0b3Aoc291bmROYW1lKSB7XG4gICAgICAgIGlmKENvbmZpZy5ESVNBQkxFX0FVRElPKSByZXR1cm47XG4gICAgICAgIGxldCBzb3VuZCA9IHRoaXMuX3NvdW5kcy5nZXQoc291bmROYW1lKTtcbiAgICAgICAgc291bmQuc3RvcCgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbGltaXRsb29wKGZuLCBmcHMpIHtcbiAgICAgICAgLy8gVXNlIHZhciB0aGVuID0gRGF0ZS5ub3coKTsgaWYgeW91XG4gICAgICAgIC8vIGRvbid0IGNhcmUgYWJvdXQgdGFyZ2V0dGluZyA8IElFOVxuICAgICAgICB2YXIgdGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGN1c3RvbSBmcHMsIG90aGVyd2lzZSBmYWxsYmFjayB0byA2MFxuICAgICAgICBmcHMgPSBmcHMgfHwgNjA7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG5cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG4gICAgICAgICAgICAvLyBhZ2FpbiwgRGF0ZS5ub3coKSBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGltZVxuICAgICAgICAgICAgICAgIC8vIG5vdyAtIChkZWx0YSAlIGludGVydmFsKSBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIGp1c3QgXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlbiA9IG5vdywgd2hpY2ggY2FuIGVuZCB1cCBsb3dlcmluZyBvdmVyYWxsIGZwc1xuICAgICAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBmblxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oMCkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXNwZWN0SGVpZ2h0Q2FsYyh3Mikge1xuICAgICAgICBsZXQgdzEgPSAxOTIwO1xuICAgICAgICBsZXQgaDEgPSAxMDgwO1xuICAgICAgICByZXR1cm4gaDEqdzIvdzE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlUXVlcnkoc2VhcmNoKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xuXG4gICAgICAgIHZhciBhcmdzUGFyc2VkID0ge307XG5cbiAgICAgICAgdmFyIGksIGFyZywga3ZwLCBrZXksIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaT0wOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGFyZy5pbmRleE9mKCc9JykpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRbZGVjb2RlVVJJQ29tcG9uZW50KGFyZykudHJpbSgpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGt2cCA9IGFyZy5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFswXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzFdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzUGFyc2VkO1xuICAgIH1cblxuICAgIC8vIEdvb2Rlbm91Z2ggVVVJRD9cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNzI2OTA5L3JhbmRvbS1hbHBoYS1udW1lcmljLXN0cmluZy1pbi1qYXZhc2NyaXB0XG4gICAgcmFuZG9tU3RyaW5nKGxlbmd0aCwgY2hhcnMpIHtcbiAgICAgICAgaWYoIWNoYXJzKSB7XG4gICAgICAgICAgICBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoOyBpID4gMDsgLS1pKSByZXN1bHQgKz0gY2hhcnNbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGNoYXJzLmxlbmd0aCAtIDEpKV07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcblxuLy8gSW1wb3J0IFNlcnZpY2VzXG5pbXBvcnQgSW5wdXRTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL0tleWJvYXJkSW5wdXRTZXJ2aWNlJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBTb3VuZFNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvU291bmRTZXJ2aWNlJztcblxuLy8gSW1wb3J0IHZpZXdzXG5pbXBvcnQgUGxheWVyVmlldyAgIGZyb20gJy4vUGxheWVyVmlldyc7XG5pbXBvcnQgRW5lbXlWaWV3ICAgIGZyb20gJy4vRW5lbXlWaWV3JztcbmltcG9ydCBSb29tVmlldyAgICAgZnJvbSAnLi9Sb29tVmlldyc7XG5pbXBvcnQgTWFpbk1lbnVWaWV3IGZyb20gJy4vTWFpbk1lbnVWaWV3JztcbmltcG9ydCBMb2JieVZpZXcgICAgZnJvbSAnLi9Mb2JieVZpZXcnO1xuaW1wb3J0IFVpVmlldyAgICAgICBmcm9tICcuL1VpVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuXG4gICAgICAgIHRoaXMuX3ZpZXdzID0gbmV3IFNldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSBIYW5kbGVyXG4gICAgICogQHRvZG86IGRvZXMgdGhpcyBiZWxvbmcgaGVyZT9cbiAgICAgKi9cbiAgICByZXNpemUoKSB7XG4gICAgICAgIENvbmZpZy5jYWxjdWxhdGUoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaW5pdChnYW1lKSB7XG4gICAgICAgIHRoaXMuX2dhbWUgPSBnYW1lO1xuXG4gICAgICAgIHRoaXMuX2lucHV0U2VydmljZSA9IG5ldyBJbnB1dFNlcnZpY2UoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX2N0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQXR0YWNoIHJlc2l6ZSBldmVudFxuICAgICAgICAvL3dpbmRvdy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvR2FtZUV2ZW50cyh0aGlzLl9nYW1lKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcklucHV0SGFuZGxlcnModGhpcy5faW5wdXRTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vY29kZXRoZW9yeS5pbi9jb250cm9sbGluZy10aGUtZnJhbWUtcmF0ZS13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XG5cbiAgICAgICAgLy8gSWYgdGhlIGZwcyBpbnRlcnZhbCBpcyBjb3JyZWN0XG4gICAgICAgIGlmIChkZWx0YSA+IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aW1lIHNpbmNlIGxhc3QgZnJhbWVcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChkZWx0YSAlIHRoaXMuaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdXAgUmVuZGVyaW5nXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHRoaXMuX2ZyYW1lIHx8IDE7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9ICh0aGlzLl9mcmFtZSVDb25maWcuRlBTKSA/IHRoaXMuX2ZyYW1lIDogMTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIGdhbWVcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuX2ZyYW1lKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG5leHQgcmVuZGVyIGN5Y2xlXG4gICAgICAgICAgICBsZXQgdGltZV9lbCA9ICh0aGlzLnRoZW4gLSB0aGlzLmZpcnN0KS8xMDAwO1xuICAgICAgICAgICAgKyt0aGlzLmNvdW50ZXI7XG4gICAgICAgICAgICBsZXQgZnBzID0gcGFyc2VJbnQodGhpcy5jb3VudGVyL3RpbWVfZWwpO1xuXG4gICAgICAgICAgICAvLyBTaG93IEZQU1xuICAgICAgICAgICAgbGV0IGZvbnRTaXplICAgICAgICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KHRoaXMuX2ZyYW1lICsgXCIvXCIgKyBDb25maWcuRlBTICsgXCIgXCIgKyBmcHMgKyBcImZwc1wiLCAyMCwgMjApO1xuXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgRnJhbWVcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoZnJhbWUpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoICAgICAgICAgICAgICA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgICAgICAgICAgICAgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICBmb3IobGV0IHZpZXcgb2YgdGhpcy5fdmlld3MpICB7XG4gICAgICAgICAgICB2aWV3LnJlbmRlcih0aGlzLl9jdHgsIGZyYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1haW5NZW51Vmlld3MoKSB7XG4gICAgICAgIGxldCB2aWV3cyA9IFtdO1xuXG4gICAgICAgIGlmKHRoaXMuX21haW5NZW51Vmlldykge1xuICAgICAgICAgICAgdmlld3MucHVzaCh0aGlzLl9tYWluTWVudVZpZXcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZpZXdzO1xuICAgIH1cblxuICAgIGdldFBsYXlpbmdWaWV3cygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3LFxuICAgICAgICAgICAgLi4udGhpcy5fcGxheWVyVmlld3MudmFsdWVzKCksXG4gICAgICAgICAgICB0aGlzLl91aVZpZXdcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBzdGFydFJlbmRlcigpIHtcbiAgICAgICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAvQ29uZmlnLkZQUztcbiAgICAgICAgdGhpcy5maXJzdCA9IHRoaXMudGhlbjtcbiAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgICAgdGhpcy5fcmVuZGVyaW5nID0gdHJ1ZTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIExpc3RlbiBmb3IgZ2FtZSBldmVudHMgc28gd2UgY2FuIGFkanVzdCByZW5kZXJlclxuICAgICAqL1xuICAgIGxpc3RlblRvR2FtZUV2ZW50cyhnYW1lKSB7XG4gICAgICAgIGdhbWUub24oXCJnYW1lLXN0YXRlXCIsIChtZXNzYWdlKT0+IHtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlZpZXcgR2FtZSBTdGF0ZSBFdmVudFwiKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICBpZihtZXNzYWdlID09IFwibWFpbiBtZW51XCIpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgcmVuZGVyaW5nIHRoZW4gc3RhcnRcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fcmVuZGVyaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRSZW5kZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IG1haW5NZW51VmlldyA9IG5ldyBNYWluTWVudVZpZXcoZ2FtZS5tYWluTWVudSwgdGhpcyk7XG4gICAgICAgICAgICAgICAgbWFpbk1lbnVWaWV3LmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51VmlldyA9IG1haW5NZW51VmlldztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KFt0aGlzLl9tYWluTWVudVZpZXddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobWVzc2FnZSA9PSBcImxvYmJ5XCIpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9iYnlWaWV3ID0gbmV3IExvYmJ5VmlldyhnYW1lLmxvYmJ5LCBnYW1lLnBsYXllcnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIGxvYmJ5Vmlldy5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcgPSBsb2JieVZpZXc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gbmV3IFNldChbdGhpcy5fbG9iYnlWaWV3XSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYobWVzc2FnZSA9PSBcInBsYXlpbmdcIikge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyByb29tIHZpZXdcbiAgICAgICAgICAgICAgICBsZXQgcm9vbVZpZXcgPSBuZXcgUm9vbVZpZXcoZ2FtZS5yb29tKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yb29tVmlldyA9IHJvb21WaWV3O1xuXG4gICAgICAgICAgICAgICAgbGV0IHByb21pc2VzID0gW1xuICAgICAgICAgICAgICAgICAgICByb29tVmlldy5sb2FkUmVzb3VyY2VzKClcbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgbGV0IHZpZXdzID0gW107XG5cbiAgICAgICAgICAgICAgICAvLyBDcmVhdGUgYWxsIG9mIG91ciBwbGF5ZXIgdmlld3NcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiBnYW1lLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllclZpZXcgPSBuZXcgUGxheWVyVmlldyhwbGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBwcm9taXNlcy5wdXNoKHBsYXllclZpZXcubG9hZFJlc291cmNlcygpKTtcbiAgICAgICAgICAgICAgICAgICAgdmlld3MucHVzaChwbGF5ZXJWaWV3KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyVmlld3Muc2V0KHBsYXllci5pZCwgcGxheWVyVmlldyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IHVpVmlldyA9IG5ldyBVaVZpZXcoZ2FtZS51aSwgZ2FtZS5wbGF5ZXJzLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcgPSB1aVZpZXc7XG4gICAgICAgICAgICAgICAgLy91aVZpZXcucmVxdWVzdElucHV0KCkudGhlbih0aGlzLmhhbmRsZVVpSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh1aVZpZXcubG9hZFJlc291cmNlcygpKTtcblxuICAgICAgICAgICAgICAgIC8vIExvYWQgc291bmRzXG4gICAgICAgICAgICAgICAgbGV0IHNvdW5kU2VydmljZSA9IG5ldyBTb3VuZFNlcnZpY2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UgPSBzb3VuZFNlcnZpY2U7XG4gICAgICAgICAgICAgICAgcHJvbWlzZXMucHVzaChzb3VuZFNlcnZpY2UubG9hZFJlc291cmNlcygpKTtcblxuICAgICAgICAgICAgICAgIC8vIEFmdGVyIGFsbCByZW5kZXJlcnMgYXJlIHJlYWR5IGxldCB0aGUgZGlzcGF0Y2hlciBrbm93XG4gICAgICAgICAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yb29tVmlldyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLnZpZXdzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwiZHVuZ2Vvbi10aGVtZVwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVuZGVyLXJlYWR5XCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwiYWRkLXBsYXllclwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgaWYoZ2FtZS5jdXJyZW50U3RhdGUgPT09IFwibG9ieVwiKVxuICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5fcmVhZHkgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInJlbW92ZS1wbGF5ZXJcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlZJRVcgUkVNT1ZFIFBMQVlFUlwiKTtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhwbGF5ZXIuaWQpO1xuICAgICAgICAgICAgaWYodGhpcy5fcGxheWVyVmlld3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cy5kZWxldGUocGxheWVyLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IHRoaXMuZ2V0UGxheWluZ1ZpZXdzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJhZGQtZW5lbXlcIiwgKGVuZW15KT0+e1xuICAgICAgICAgICAgbGV0IGVuZW15VmlldyA9IG5ldyBFbmVteVZpZXcoZW5lbXkpO1xuICAgICAgICAgICAgZW5lbXlWaWV3LmxvYWRSZXNvdXJjZXMoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgaWYodGhpcy5fZW5lbXlWaWV3cykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lbmVteVZpZXdzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXlWaWV3LFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4udGhpcy5fZW5lbXlWaWV3c1xuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VuZW15Vmlld3MgPSBbZW5lbXlWaWV3XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcInN0YXJ0LWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnN0b3AoXCJkdW5nZW9uLXRoZW1lXCIpO1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJjb21iYXQtdGhlbWVcIiwgdHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLl92aWV3cyA9IFtcbiAgICAgICAgICAgICAgICAuLi50aGlzLl92aWV3cyxcbiAgICAgICAgICAgICAgICAuLi50aGlzLl9lbmVteVZpZXdzXG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwicGxheWVyLWNvb2xkb3duXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBpZihwbGF5ZXIuaXNMb2NhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwiY29vbGRvd24tcmVhZHlcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJwbGF5ZXItYXR0YWNrXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBpZihwbGF5ZXIgPT0gdGhpcy5fZ2FtZS5sb2NhbFBsYXllcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5jbGVhckxhc3RPcHRpb24oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZ2FtZS5vbihcImVuZC1iYXR0bGVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5zdG9wKFwiY29tYmF0LXRoZW1lXCIpO1xuICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJkdW5nZW9uLXRoZW1lXCIsIHRydWUpO1xuICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBbXG4gICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAgICAgLi4udGhpcy5fcGxheWVyVmlld3MudmFsdWVzKCksXG4gICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3XG4gICAgICAgICAgICBdO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVVaUlucHV0KGlucHV0KSB7XG4gICAgICAgIHRoaXMuZW1pdChcIm9wdGlvbi1zZWxlY3RcIiwgaW5wdXQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGlucHV0IHRvIGFsdGVyIHZpZXcgYW5kIHNlZSBpZiB3ZSBuZWVkIHRvIHNlbmQgZW52ZW50c1xuICAgICAqL1xuICAgIHJlZ2lzdGVySW5wdXRIYW5kbGVycyhpbnB1dCkge1xuICAgICAgICAvLyBVcCBpbnB1dFxuICAgICAgICBpbnB1dC5vbihcInVwXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gRG93biBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImRvd25cIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibWFpbiBtZW51XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21haW5NZW51Vmlldy5kb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5kb3duKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3NvdW5kU2VydmljZS5wbGF5KFwibWVudS1tb3ZlXCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTGVmdCBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImxlZnRcIiwgKCk9PntcbiAgICAgICAgICAgIGxldCBnYW1lU3RhdGUgPSB0aGlzLl9nYW1lLmN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgIHN3aXRjaChnYW1lU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9iYnlWaWV3LmxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmxlZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSaWdodCBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcInJpZ2h0XCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5yaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcucmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291bmRTZXJ2aWNlLnBsYXkoXCJtZW51LW1vdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDb25maXJtIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiY29uZmlybVwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LmNvbmZpcm0odGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJsb2JieVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcuY29uZmlybSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcuY29uZmlybSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VuZFNlcnZpY2UucGxheShcIm1lbnUtc2VsZWN0XCIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQmFjayBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcImJhY2tcIiwgKCk9PntcblxuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKGVuZW15KSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5fZW5lbXkgPSBlbmVteTtcblxuICAgICAgICB0aGlzLl9pbWFnZXMgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwic3ByaXRlXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNwcml0ZSxcbiAgICAgICAgICAgIHNwcml0ZS53aWR0aC8zKnRoaXMuZnJhbWUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMywgLy8gZFdpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMiwgLy8gZEhlaWdodFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICAxMCwgLy8gWXBvc1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMypDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5pbXBvcnQgUGxheWVyICAgICAgICAgIGZyb20gJy4uL21vZGVscy9vYmplY3RzL1BsYXllcic7XG5cbmxldCBqb2JEaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+U2VsZWN0IEpvYjwvaDM+XG4gICAgICAgIDxsYWJlbD5Kb2I6IDwvbGFiZWw+XG4gICAgICAgIDxzZWxlY3QgbmFtZT1cImpvYlwiPlxuICAgICAgICA8L3NlbGVjdD48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNvbmZpcm1cIj5Db25maXJtPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihsb2JieSwgcGxheWVycywgdmlldykge1xuICAgICAgICBzdXBlcihsb2JieSk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ID0gbG9iYnk7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLl9wbGF5ZXJzID0gcGxheWVycztcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2RpYWxvZ09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICBvcGVuSm9iRGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhqb2JEaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG4gICAgICAgIGxldCBjb25maXJtQnV0dG9uICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY29uZmlybVwiXScpO1xuICAgICAgICBsZXQgY2FuY2VsQnV0dG9uID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImNhbmNlbFwiXScpO1xuXG4gICAgICAgIGxldCBqb2JTZWxlY3QgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdFtuYW1lPVwiam9iXCJdJyk7XG5cbiAgICAgICAgZm9yKGxldCBqb2Igb2YgUGxheWVyLmdldEpvYnMoKSkge1xuICAgICAgICAgICAgbGV0IGpvYk9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICBqb2JPcHRpb24udmFsdWUgPSBqb2IubmFtZTtcbiAgICAgICAgICAgIGpvYk9wdGlvbi5pbm5lckhUTUwgPSBqb2IubmFtZTtcbiAgICAgICAgICAgIGpvYlNlbGVjdC5hcHBlbmRDaGlsZChqb2JPcHRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmlldy5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICBjYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cgPSBmYWxzZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uZmlybUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX2RpYWxvZyA9IHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGVsZW1lbnQsXG4gICAgICAgICAgICByZW1vdmU6ICgpPT57XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiAoKT0+e1xuICAgICAgICAgICAgICAgIGlmKGpvYlNlbGVjdC52YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmVtaXQoXCJqb2Itc2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiam9iXCI6IGpvYlNlbGVjdC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogdGhpcy5fdmlldy5fZ2FtZS5sb2NhbFBsYXllci5pZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgIGxldCB4UG9zID0gMTAwO1xuICAgICAgICBsZXQgeVBvcyA9IDEwMDtcblxuICAgICAgICBjdHguZmlsbFRleHQoXCJOQU1FOlwiLCAxMDAsIHlQb3MpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJKT0I6XCIsIDMwMCwgeVBvcyk7XG4gICAgICAgIGN0eC5maWxsVGV4dChcIlJFQURZOlwiLCA1MDAsIHlQb3MpO1xuICAgICAgICBjdHguc3Ryb2tlUmVjdCg5MCwgMTEwLCA2MDAsIDE4MCk7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMuX3BsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICB5UG9zICs9IDQwO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHBsYXllci5uYW1lLCAxMDAsIHlQb3MpO1xuXG4gICAgICAgICAgICBpZihwbGF5ZXIuam9iKSB7XG4gICAgICAgICAgICAgICAgbGV0IGpvYk5hbWUgPSBwbGF5ZXIuam9iLm5hbWVbMF0udG9VcHBlckNhc2UoKSArIHBsYXllci5qb2IubmFtZS5zbGljZSgxKTs7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KGpvYk5hbWUsIDMwMCwgeVBvcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBsYXllci5jdXJyZW50U3RhdGUgPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIk5PVCBSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgeFBvcywgMzIwKTtcbiAgICAgICAgICAgIHhQb3MgKz0gMjAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgbGVmdCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgtLTtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgrKztcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiU2VsZWN0IEpvYlwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSm9iRGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJMZWF2ZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwibGVhdmUtZ2FtZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiUmVhZHlcIikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlYWR5ID0gIXRoaXMuX3JlYWR5O1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXcuZW1pdChcInJlYWR5XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl92aWV3Ll9nYW1lLmxvY2FsUGxheWVyLmlkLFxuICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHRoaXMuX3JlYWR5XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmFjaygpIHtcbiAgICB9XG5cblxuXG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxubGV0IGhvc3REaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+SG9zdCBNdWx0aXBsYXllciBHYW1lPC9oMz5cbiAgICAgICAgPGxhYmVsPk5hbWU6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCI+XG4gICAgICAgIDxsYWJlbD5JZCAob3B0aW9uYWwpOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiPjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiaG9zdFwiIGRpc2FibGVkPkhvc3Q8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5sZXQgam9pbkRpYWxvZyA9IGBcbiAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nXCI+XG4gICAgICAgIDxoMz5Kb2luIE11bHRpcGxheWVyIEdhbWU8L2gzPlxuICAgICAgICA8bGFiZWw+TmFtZTogPC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIm5hbWVcIj5cbiAgICAgICAgPGxhYmVsPkhvc3QgSWQ6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJob3N0XCI+XG4gICAgICAgIDxsYWJlbD5JZCAob3B0aW9uYWwpOjwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJpZFwiPjxicj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiam9pblwiIGRpc2FibGVkPkpvaW48L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiBuYW1lPVwiY2FuY2VsXCI+Q2FuY2VsPC9idXR0b24+XG4gICAgPC9kaXY+XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE9iamVjdFZpZXcge1xuICAgIGNvbnN0cnVjdG9yKG1haW5NZW51LCB2aWV3KSB7XG4gICAgICAgIHN1cGVyKG1haW5NZW51KTtcbiAgICAgICAgdGhpcy5fbWFpbk1lbnUgPSBtYWluTWVudTtcbiAgICAgICAgdGhpcy5fdmlldyA9IHZpZXc7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICB0aGlzLl9kaWFsb2dPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSAxMDA7XG4gICAgICAgIGxldCB5UG9zID0gMTAwO1xuXG4gICAgICAgIGZvcihsZXQgbWVudU9wdGlvbiBvZiB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9ucykge1xuICAgICAgICAgICAgbGV0IG1lbnVPcHRpb25UZXh0ID0gbWVudU9wdGlvbjtcblxuICAgICAgICAgICAgLy8gU2hvdyBzZWxlY3QgY3Vyc29yXG4gICAgICAgICAgICBpZihtZW51T3B0aW9uVGV4dCA9PSB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XSlcbiAgICAgICAgICAgICAgICBtZW51T3B0aW9uVGV4dCA9IFwiPiBcIiArIG1lbnVPcHRpb25UZXh0O1xuXG4gICAgICAgICAgICAvLyBEcmF3IE1lbnUgT3B0aW9uXG4gICAgICAgICAgICBjdHguZmlsbFRleHQobWVudU9wdGlvblRleHQsIDEwMCwgeVBvcyk7XG4gICAgICAgICAgICB5UG9zICs9IDEwMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBzZWxlY3RlZE9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX21haW5NZW51LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdO1xuICAgIH1cblxuICAgIG9wZW5Ib3N0RGlhbG9nKHZpZXcpIHtcbiAgICAgICAgbGV0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgICAgICBsZXQgZG9jID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhob3N0RGlhbG9nLCBcInRleHQvaHRtbFwiKTtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBkb2MuZmlyc3RDaGlsZDtcblxuICAgICAgICBsZXQgaG9zdEJ1dHRvbiAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImhvc3RcIl0nKTtcbiAgICAgICAgbGV0IGNhbmNlbEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjYW5jZWxcIl0nKTtcblxuICAgICAgICBsZXQgbmFtZUlucHV0ID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBsZXQgaWRJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaWRcIl0nKTtcblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIG5hbWVJbnB1dC5vbmlucHV0ID0gKCk9PntcbiAgICAgICAgICAgIGlmKG5hbWVJbnB1dC52YWx1ZS50cmltKCkgIT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICBob3N0QnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3N0QnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGhvc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9kaWFsb2cgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZW1pdChcInN0YXJ0LW1wXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpZElucHV0LnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBvcGVuSm9pbkRpYWxvZyh2aWV3KSB7XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcbiAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoam9pbkRpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cblxuICAgICAgICBsZXQgam9pbkJ1dHRvbiAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdidXR0b25bbmFtZT1cImpvaW5cIl0nKTtcbiAgICAgICAgbGV0IGNhbmNlbEJ1dHRvbiA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJjYW5jZWxcIl0nKTtcblxuICAgICAgICBsZXQgbmFtZUlucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJyk7XG4gICAgICAgIGxldCBob3N0SW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImhvc3RcIl0nKTtcbiAgICAgICAgbGV0IGlkSW5wdXQgICAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaWRcIl0nKTtcblxuICAgICAgICB2aWV3Ll9lbGVtZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuXG4gICAgICAgIGxldCBjaGVja0lucHV0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICYmIGhvc3RJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICBqb2luQnV0dG9uLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBqb2luQnV0dG9uLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBuYW1lSW5wdXQub25pbnB1dCA9IGNoZWNrSW5wdXQuYmluZCh0aGlzKTtcbiAgICAgICAgaG9zdElucHV0Lm9uaW5wdXQgPSBjaGVja0lucHV0LmJpbmQodGhpcyk7XG5cbiAgICAgICAgY2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGpvaW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaWFsb2cuY29uZmlybSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9kaWFsb2cgPSB7XG4gICAgICAgICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb25maXJtOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICYmIGhvc3RJbnB1dC52YWx1ZS50cmltKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5lbWl0KFwic3RhcnQtbXBcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZUlucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaG9zdElkOiBob3N0SW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaWRJbnB1dC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdXAoKSB7XG4gICAgICAgIGlmKCF0aGlzLl9kaWFsb2cpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA/IDAgOiAxO1xuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudXAoKTtcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKSB7XG4gICAgICAgICAgICBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiSG9zdCBHYW1lXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Ib3N0RGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5Kb2luRGlhbG9nKHRoaXMuX3ZpZXcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2soKSB7XG4gICAgICAgIHRoaXMuY2xvc2VEaWFsb2coKTtcbiAgICB9XG5cblxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIGxvYWRSZXNvdXJjZShuYW1lLCByZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy8nICsgcmVzb3VyY2U7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHJlc291cmNlIGNyZWF0ZSBpdFxuICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5zZXQobmFtZSwgaW1nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9hZFJlc291cmNlcygpIHtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW11cbiAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgIHByb21pc2VzLnB1c2godGhpcy5sb2FkUmVzb3VyY2UoaW1hZ2UubmFtZSwgaW1hZ2UuaW1hZ2UpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgYWxsIHJlc291cmNlcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBvYmplY3RcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZVNlcnZpY2UubG9hZEltYWdlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgUHJvbWlzZS5hbGwocmVzb3VyY2VQcm9taXNlcykudGhlbigoaW1hZ2VzKT0+e1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9yZXNvdXJjZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBQcm9taXNlXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5cbmxldCBKT0JfU1BSSVRFUyA9IHtcbiAgICBcImNsYWlydm95YW50XCI6IFwiY2xhaXJ2b3lhbnQtc2hlZXQucG5nXCIsXG4gICAgXCJoZXJiYWxpc3RcIjogXCJoZXJiYWxpc3Qtc2hlZXQucG5nXCIsXG4gICAgXCJ2aWxsYWluXCI6IFwidmlsbGFpbjItc2hlZXQucG5nXCIsXG4gICAgXCJrbmlnaHRcIjogXCJrbmlnaHQtc2hlZXQucG5nXCIsXG4gICAgXCJuZWNyb21hbmNlclwiOiBcIm5lY3JvbWFuY2VyLXNoZWV0LnBuZ1wiLFxuICAgIFwibmluamFcIjogXCJuaW5qYS1zaGVldC5wbmdcIlxufTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIpIHtcbiAgICAgICAgc3VwZXIocGxheWVyKTtcbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpdGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IEpPQl9TUFJJVEVTW3BsYXllci5qb2IubmFtZV0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNoYWRvd1wiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJzaGFkb3cucG5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1YmJsZVwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJidWJibGUucG5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubG9hZFJlc291cmNlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgbGV0IHBsYXllcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgbGV0IHhPZmZzZXQgPSBDb25maWcuVElMRV9YIC0gMztcbiAgICAgICAgaWYodGhpcy5fcGxheWVyLnBvc2l0aW9uID09IFwiYmFja1wiKSB7XG4gICAgICAgICAgICB4T2Zmc2V0Kys7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hhZG93ICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzaGFkb3cnKTtcblxuICAgICAgICBsZXQgYnViYmxlICAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyk7XG4gICAgICAgIGxldCBidWJibGVXaWR0aCAgPSBidWJibGUud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgbGV0IGJ1YmJsZUhlaWdodCA9IGJ1YmJsZS5oZWlnaHQvNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIC8vIERyYXcgU2hhZG93XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc2hhZG93LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRXaWR0aFxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIHBsYXllciBYIFBvc1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSArIChwbGF5ZXJXaWR0aCkgLSAoQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzaGFkb3cnKS5oZWlnaHQvMS43NSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIHBsYXllciBZIFBvc1xuICAgICAgICAgICAgcGxheWVyV2lkdGgsIC8vIHNXaWR0aFxuICAgICAgICAgICAgcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cblxuICAgICAgICAvLyBEcmF3IFBsYXllciBTcHJpdGVcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKSxcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci5jdXJyZW50U3RhdGUgPT09IFwid2Fsa2luZ1wiID8gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKSA6IDAsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci55UG9zKihwbGF5ZXJXaWR0aCksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgcGxheWVyV2lkdGgsIC8vIHNXaWR0aFxuICAgICAgICAgICAgcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gRHJhdyBCdWJibGVcbiAgICAgICAgbGV0IGJ1YmJsZU9mZnNldCA9IDA7XG4gICAgICAgIHN3aXRjaCh0aGlzLl9wbGF5ZXIuY3VycmVudEFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcInRoaW5raW5nXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhdHRhY2tcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGVmZW5kXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaXRlbVwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSozO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFiaWxpdHlcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuX3BsYXllci5jdXJyZW50QWN0aW9uICE9PSBcIndhbGtcIiAmJiB0aGlzLl9wbGF5ZXIuY3VycmVudEFjdGlvbiAhPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCwgLy8gRFlcbiAgICAgICAgICAgICAgICBidWJibGUud2lkdGgsICAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGUuaGVpZ2h0LzUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCkgLSAoYnViYmxlV2lkdGgvMS41KSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSAtIChidWJibGVIZWlnaHQvMS41KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAgICAgYnViYmxlV2lkdGgsICAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGVIZWlnaHQgIC8vIHNIZWlnaHRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuLy8gU3RhdGljIFJvb20gVHlwZXNcbi8vc3RhdGljIGdldCBUWVBFX0NBVkUoKSB7XG4gICAgLy9yZXR1cm4ge1xuICAgICAgICAvL2Zsb29yOiAnZ29vZHRpbGUucG5nJyxcbiAgICAgICAgLy93YWxsOiAnc2hpdHdhbGwucG5nJ1xuICAgIC8vfTtcbi8vfVxuXG4vL3N0YXRpYyBnZXQgVFlQRV9URU1QTEUoKSB7XG4gICAgLy9yZXR1cm4ge1xuICAgICAgICAvL2Zsb29yOiAnZ3Jhc3MucG5nJyxcbiAgICAgICAgLy93YWxsOiAncGlsbGFycy5wbmcnXG4gICAgLy99O1xuLy99XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3Iocm9vbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9yb29tID0gcm9vbTtcbiAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICA9IDA7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImZsb29yXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcImdvb2R0aWxlLnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ3YWxsXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInNoaXR3YWxsMi5wbmdcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoXCJmbG9vclwiLCBcImdvb2R0aWxlLnBuZ1wiKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwid2FsbFwiLCAgXCJzaGl0d2FsbDIucG5nXCIpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGlmKGZyYW1lJTQgPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5mcmFtZSA9IHRoaXMuZnJhbWUgPyAwIDogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbmRlciBGbG9vclxuICAgICAgICBsZXQgZmxvb3IgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdmbG9vcicpO1xuICAgICAgICBsZXQgZmxvb3JXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLlRJTEVfWCsxOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBDb25maWcuVElMRV9ZIC0gNDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgICAgIGZsb29yLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKyBmbG9vcldpZHRoKnggLSBmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICAoeSsyKSpmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXIgV2FsbFxuICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKTtcbiAgICAgICAgbGV0IHdhbGxXaWR0aCA9IHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHdhbGxXaWR0aCkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHdhbGwsXG4gICAgICAgICAgICAgICAgMCwgLy8gRFhcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yKnRoaXMuZnJhbWUsIC8vRFlcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArIHdhbGxXaWR0aCp4IC0gd2FsbFdpZHRoLCAvL3N4XG4gICAgICAgICAgICAgICAgMCwgLy9zeVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFLzJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIE9mZnNldHNcbiAgICAgICAgbGV0IHhTdGVwID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgIGlmKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09IFwibW92aW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fZmxvb3JPZmZzZXQgPj0gZmxvb3JXaWR0aCAtIDEpIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX3dhbGxPZmZzZXQgPiB3YWxsV2lkdGggLSAxKSB0aGlzLl93YWxsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBMb2dnZXIgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcih1aSwgcGxheWVycywgdmlldykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl91aSAgICAgICAgID0gdWk7XG4gICAgICAgIHRoaXMuX3ZpZXcgICAgICAgPSB2aWV3O1xuICAgICAgICB0aGlzLl9wbGF5ZXJzICAgID0gcGxheWVycztcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJVSSBQTEFZRVJTXCIpO1xuICAgICAgICBMb2dnZXIubG9nKHRoaXMuX3BsYXllcnMpO1xuXG4gICAgICAgIHRoaXMuX3RpbGVIZWlnaHQgPSAyO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJiZ1wiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJ1aS1iZy5wbmdcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIGxldCB5UG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBEcmF3IEJhY2tncm91bmRcbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHlQb3MsXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodCAtIDMwMFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCB1aVJlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeVBvcyxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC4uLmJnUmVjdCk7XG5cbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwiIzY0QTM1N1wiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwiIzAwMzcwMFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3QoLi4udWlSZWN0KTtcblxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM4RDgwNDVcIjtcblxuICAgICAgICAvLyBUaGUgc3Ryb2tlIGlzIG1pZGRsZSBhbGlnbmVkIHdpdGggdGhlIGVkZ2VzIG9mIHRoZSBib3hcbiAgICAgICAgbGV0IGxpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzMyO1xuICAgICAgICAvL2xldCBsaW5lV2lkdGggPSA1O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIGxldCBzdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIHN0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICBzdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMTtcbiAgICAgICAgbGV0IHBhdGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuX3Jlc291cmNlcy5nZXQoXCJiZ1wiKSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIHlQb3MgKz0gQ29uZmlnLlRJTEVfU0laRS8zO1xuXG4gICAgICAgIGxldCBmb250U2l6ZSAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSBDb25maWcuVElMRV9TSVpFKjEuMjtcblxuICAgICAgICAvLyBEcmF3IEluZm9cbiAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMCA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMF0sXG4gICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgeVBvc1xuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1sxXSxcbiAgICAgICAgICAgIHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICB5UG9zXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzJdLFxuICAgICAgICAgICAgeFBvcyxcbiAgICAgICAgICAgIHlQb3MgKyBmb250U2l6ZSoyXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzNdLFxuICAgICAgICAgICAgeFBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgIHlQb3MgKyBmb250U2l6ZSoyXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHhQb3MgPSBDb25maWcuVElMRV9TSVpFKjU7XG4gICAgICAgIHlQb3MgPSBDb25maWcuVElMRV9TSVpFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuXG4gICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSW5mb1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICB5UG9zICs9IGZvbnRTaXplKjI7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIE5hbWVzXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIHBsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgIHhQb3MsXG4gICAgICAgICAgICAgICAgeVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIC8vIERlZmluZSBjb29sZG93biB2YXJzXG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJZUG9zICAgPSB5UG9zICsgZm9udFNpemUvMjtcbiAgICAgICAgICAgIGxldCBjb29sZG93bkJhcldpZHRoICA9IENvbmZpZy5USUxFX1NJWkU7XG4gICAgICAgICAgICBsZXQgY29vbGRvd25CYXJIZWlnaHQgPSBmb250U2l6ZS8yO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIENvb2xkb3duIEZpbGxcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMEZGMDBcIjtcbiAgICAgICAgICAgIGxldCBjb29sZG93blBlcmNlbnRhZ2UgPSBwbGF5ZXIuY29vbGRvd24vcGxheWVyLm1heENvb2xkb3duO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KHhQb3MsIGNvb2xkb3duQmFyWVBvcywgY29vbGRvd25CYXJXaWR0aCpjb29sZG93blBlcmNlbnRhZ2UsIGNvb2xkb3duQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBDb29sZG93biBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoeFBvcywgY29vbGRvd25CYXJZUG9zLCBjb29sZG93bkJhcldpZHRoLCBjb29sZG93bkJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIERlZmluZSBIZWFsdGhiYXIgdmFyc1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhclhQb3MgICA9IHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyWVBvcyAgID0geVBvcyAtIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyV2lkdGggID0gQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhckhlaWdodCA9IGZvbnRTaXplLzI7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIEZpbGxcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRjAwMDBcIjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhQZXJjZW50YWdlID0gcGxheWVyLmhlYWx0aC9wbGF5ZXIubWF4SGVhbHRoO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoKmhlYWx0aFBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIuaGVhbHRofS8ke3BsYXllci5tYXhIZWFsdGh9YCxcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXJYUG9zK2hlYWx0aEJhcldpZHRoKzIqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICBoZWFsdGhCYXJZUG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgaGVhbHRoQmFyWVBvcyArPSBoZWFsdGhCYXJIZWlnaHQqMS41O1xuXG4gICAgICAgICAgICAvL2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIC8vY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjMDAwMEZGXCI7XG4gICAgICAgICAgICBsZXQgbWFuYVBlcmNlbnRhZ2UgPSBwbGF5ZXIubWFuYS9wbGF5ZXIubWF4TWFuYTtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCptYW5hUGVyY2VudGFnZSwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggU3Ryb2tlXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggICA9IDEqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkZGXCI7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3BsYXllci5tYW5hfS8ke3BsYXllci5tYXhNYW5hfWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMSlcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAzKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDE7XG4gICAgfVxuXG4gICAgZG93bigpIHtcbiAgICAgICAgdGhpcy51cCgpO1xuICAgIH1cblxuICAgIGxlZnQoKSB7XG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDEpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDM7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAyO1xuICAgIH1cblxuICAgIHJpZ2h0KCkge1xuICAgICAgICB0aGlzLmxlZnQoKTtcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBsZXQgY3VycmVudE9wdGlvbiA9IHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdO1xuICAgICAgICBpZihjdXJyZW50T3B0aW9uICE9PSB0aGlzLl9sYXN0T3B0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl92aWV3LmVtaXQoXCJvcHRpb24tc2VsZWN0XCIsIHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX3ZpZXcuX2dhbWUubG9jYWxQbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgXCJvcHRpb25cIjogdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fbGFzdE9wdGlvbiA9IGN1cnJlbnRPcHRpb247XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhckxhc3RPcHRpb24oKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xlYXIgbGFzdCBvcHRpb25cIik7XG4gICAgICAgIHRoaXMuX2xhc3RPcHRpb24gPSBcIlwiO1xuICAgIH1cbn1cbiJdfQ==
