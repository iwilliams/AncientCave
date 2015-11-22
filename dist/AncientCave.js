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

},{"./dispatcher/Dispatcher":6,"./models/Game":10,"./views/Canvas2d":22}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

var _ServicesLogger = require('../Services/Logger');

var _ServicesLogger2 = _interopRequireDefault(_ServicesLogger);

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
                    _ServicesLogger2['default'].debug('Peer Connection created, Peer ID is ' + id);
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
                            _ServicesLogger2['default'].debug("Peer has connected");
                            _ServicesLogger2['default'].log(connection);
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
                    "name": this._name
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

            _ServicesLogger2['default'].debug('Sending peer-connect message to peer with id ' + peer);
            _ServicesLogger2['default'].log(message);
            peer.connection.send(message);
            peer.hasConnected = true;
        }
    }, {
        key: 'removePeer',
        value: function removePeer(peer) {
            _ServicesLogger2['default'].debug("Remove peer");
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
            _ServicesLogger2['default'].debug('Message recieved from peer with id ' + message.from);
            _ServicesLogger2['default'].log(message);

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
                            _ServicesLogger2['default'].debug('Adding Peer with id ' + peer);
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

},{"../../Config":2,"../Services/Logger":4,"../mixins/EventEmitter":7}],6:[function(require,module,exports){
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

var _controllersMultiplayerController = require('../controllers/MultiplayerController');

var _controllersMultiplayerController2 = _interopRequireDefault(_controllersMultiplayerController);

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
            this._multiplayerController = new (_bind.apply(_controllersMultiplayerController2['default'], [null].concat(_toConsumableArray(args))))();
            this._multiplayerController.init().then(function () {
                _this.registerMultiplayerEvents(_this._multiplayerController);
                _servicesLogger2['default'].debug("Dispatcher: Broadcast Add Player Message");
                _this.emit("add-local-player", {
                    "id": _this._multiplayerController.id,
                    "name": message.name
                });
                _this.emit("game-state", "lobby");
            });
        }
    }, {
        key: 'leaveGame',
        value: function leaveGame() {
            this._multiplayerController.disconnect();
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
            this.emit("add-remote-player", {
                "id": message.from,
                "name": message.data.name
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
        key: 'registerMultiplayerEvents',
        value: function registerMultiplayerEvents(multiplayerService) {
            var _this2 = this;

            multiplayerService.on("peer-connect", this.peerConnect.bind(this));
            multiplayerService.on("peer-disconnect", this.peerDisconnect.bind(this));

            multiplayerService.on("player-state", function (message) {
                _this2.emit("remote-player-state", message);
            });

            multiplayerService.on("option-select", function (message) {
                _this2.emit("remote-option-select", message);
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

            view.on("ready", function (ready) {
                var state = ready ? "ready" : "idle";
                _this3._multiplayerController.playerState(state);
                _this3.emit("local-player-state", {
                    "state": state
                });
            });

            view.on("option-select", function (option) {
                _this3._multiplayerController.optionSelect(option);
                _this3.emit("local-option-select", option);
            });
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../controllers/MultiplayerController":5,"../mixins/EventEmitter":7,"../services/Logger":18}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

    function _default(fillable) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
    }

    _createClass(_default, [{
        key: 'serialize',
        value: function serialize() {
            var obj = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._fillable[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var prop = _step.value;

                    obj[prop] = this[prop].serialize ? this[prop].serialize() : this[prop];
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

            obj['isVisible'] = this['isVisible'];
            return obj;
        }
    }, {
        key: 'deserialize',
        value: function deserialize(data) {
            _servicesLogger2['default'].debug("Deserialize");
            _servicesLogger2['default'].log(data);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._fillable[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var prop = _step2.value;

                    this[prop] = data[prop] !== undefined ? data[prop] : this[prop];
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

},{"../mixins/EventEmitter":7,"../services/Logger":18}],10:[function(require,module,exports){
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
                _this._localPlayers = new Map();
                _this._remotePlayers = new Map();

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
        value: function checkPlayerAction() {
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

            var enemy = new Enemy();
            this.emit("add-enemy", enemy);

            this._enemies = new Set[enemy]();

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

                    player.currentState = "idle";
                    player.currentAction = "action";
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

            // Add player when peer connects
            dispatcher.on("add-remote-player", function (message) {
                _servicesLogger2['default'].debug("Game: Add Remote Player message recieved");
                _servicesLogger2['default'].log(message);

                var p = new _objectsPlayer2['default'](message.name, message.id);

                p.init().then(function () {
                    _this3.addRemotePlayer(p);
                });
            });

            dispatcher.on("add-local-player", function (message) {
                _servicesLogger2['default'].debug("Game: Add Local Player message recieved");
                _servicesLogger2['default'].log(message);

                var p = new _objectsPlayer2['default'](message.name, message.id);

                p.init().then(function () {
                    _this3.addLocalPlayer(p);
                });
            });

            // Remove the peers player from the game
            dispatcher.on("remove-player", function (message) {
                _servicesLogger2['default'].debug("Game: Remove Player message recieved");
                _servicesLogger2['default'].log(message);

                _this3._players['delete'](message.id);
                _this3._localPlayers['delete'](message.id);
                _this3._remotePlayers['delete'](message.id);

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = _this3._players.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var player = _step5.value;

                        player.currentState = "idle";
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
            });

            // Sync Local Player state
            dispatcher.on("local-player-state", function (message) {
                _servicesLogger2['default'].debug("Game: Local Player State message recieved");
                _servicesLogger2['default'].log(message);

                var _iteratorNormalCompletion6 = true;
                var _didIteratorError6 = false;
                var _iteratorError6 = undefined;

                try {
                    for (var _iterator6 = _this3._localPlayers.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                        var player = _step6.value;

                        player.currentState = message.state;
                    }

                    // Progress Game logic accoridng to player state
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

                _this3.checkPlayerState();
            });

            // Sync Remote Player state
            dispatcher.on("remote-player-state", function (message) {
                _servicesLogger2['default'].debug("Game: Remote Player State message recieved");
                _servicesLogger2['default'].log(message);

                var player = _this3._remotePlayers.get(message.id);
                player.currentState = message.state;

                // Progress Game logic accoridng to player state
                _this3.checkPlayerState();
            });

            // Listen for local option select
            // CHANGE TO PLAYER-ACTION
            dispatcher.on("local-option-select", function (message) {
                _servicesLogger2['default'].debug("Game: local-option-select");
                _servicesLogger2['default'].log(message);
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = _this3._localPlayers.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var player = _step7.value;

                        player.currentAction = message;
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

                _this3.checkPlayerAction();
            });

            // Listen for remote option select
            // CHANGE TO PLAYER-ACTION
            dispatcher.on("remote-option-select", function (message) {
                var player = _this3._remotePlayers.get(message.id);
                player.currentAction = message.option;
                _this3.checkPlayerAction();
            });
        }

        /**
         * Add a Local Player
         */
    }, {
        key: 'addLocalPlayer',
        value: function addLocalPlayer(p) {
            this._localPlayers.set(p.id, p);
            this.addPlayer(p);
        }

        /**
         * Add a Remote Player
         */
    }, {
        key: 'addRemotePlayer',
        value: function addRemotePlayer(p) {
            this._remotePlayers.set(p.id, p);
            this.addPlayer(p);
        }

        /**
         * Adds a player regardless of remote or local
         */
    }, {
        key: 'addPlayer',
        value: function addPlayer(p) {
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
                    this._localPlayers = new Map();
                    this._remotePlayers = new Map();
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

},{"../../Config":2,"../mixins/eventEmitter":8,"../services/Logger":18,"../services/Rng":20,"../services/Utils":21,"./BaseModel":9,"./objects/Lobby":11,"./objects/MainMenu":12,"./objects/Monster":13,"./objects/Player":14,"./objects/Room":15,"./objects/Ui":16}],11:[function(require,module,exports){
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

},{"../BaseModel":9}],12:[function(require,module,exports){
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

},{"../BaseModel":9}],13:[function(require,module,exports){
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
    }

    return _default;
})(_BaseModel3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../BaseModel":9}],14:[function(require,module,exports){
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

// Can't call this Object b/c of conflict xD

var _servicesLogger = require('../../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var FILLABLE = new Set(["name", "ready", "isWalking", "job", "position", "maxHealth", "health", "maxMana", "mana", "action"]);

var Player = (function (_BaseModel) {
    _inherits(Player, _BaseModel);

    _createClass(Player, null, [{
        key: 'JOB_CLAIRVOYANT',

        // Static Room Types
        get: function get() {
            return {
                'sprite': 'clairvoyant-sheet.png',
                'name': 'clairvoyant',
                'health': 60,
                'mana': 40,
                'position': 'back'
            };
        }
    }, {
        key: 'JOB_HERBALIST',
        get: function get() {
            return {
                'sprite': 'herbalist-sheet.png',
                'name': 'herbalist',
                'health': 40,
                'mana': 0,
                'position': 'back'
            };
        }
    }, {
        key: 'JOB_VILLAIN',
        get: function get() {
            return {
                'sprite': 'villain2-sheet.png',
                'name': 'villain',
                'health': 80,
                'mana': 20,
                'position': 'front'
            };
        }
    }, {
        key: 'JOB_KNIGHT',
        get: function get() {
            return {
                'sprite': 'knight-sheet.png',
                'name': 'knight',
                'health': 100,
                'mana': 0,
                'position': 'front'
            };
        }
    }, {
        key: 'JOB_NECROMANCER',
        get: function get() {
            return {
                'sprite': 'necromancer-sheet.png',
                'name': 'necromancer',
                'health': 40,
                'mana': 120,
                'position': 'front'
            };
        }
    }]);

    function Player(name, id) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, FILLABLE);
        this._name = name;
        this._id = id;

        this._states = new Set(["idle", "ready", "walking", "attacking"]);
        this.currentState = "idle";

        this.currentAction = "thinking";

        this.maxHealth = 100;
        this.health = 100;

        this.maxMana = 100;
        this.mana = 100;
    }

    _createClass(Player, [{
        key: 'init',
        value: function init() {
            return new Promise(function (res, rej) {
                res();
            });
        }
    }, {
        key: 'currentState',
        set: function set(state) {
            if (this._states.has(state)) {
                _servicesLogger2['default'].debug("SET STATE TO STATE");
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
    }]);

    return Player;
})(_BaseModel3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"../../services/Logger":18,"../BaseModel":9}],15:[function(require,module,exports){
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

},{"../../services/Logger":18,"../BaseModel":9}],16:[function(require,module,exports){
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
        key: "setIdleOption",
        value: function setIdleOption() {
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

},{"../BaseModel":9}],17:[function(require,module,exports){
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

},{"../../Config":2,"../mixins/EventEmitter":7}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"./Logger.js":18}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

                        promises.push(uiView.loadResources());

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

            game.on("add-enemy", function (enemy) {});

            game.on("set-room", function (room) {});
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

},{"../../Config":2,"../mixins/EventEmitter":7,"../services/KeyboardInputService":17,"../services/Logger":18,"./EnemyView":23,"./LobbyView":24,"./MainMenuView":25,"./PlayerView":27,"./RoomView":28,"./UiView":29}],23:[function(require,module,exports){
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

    function _default(monster) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._monster = monster;

        this._images = [{
            "name": "sprite",
            "image": this._monster.type.sprite
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
    }

    _createClass(_default, [{
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
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this._players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var player = _step.value;

                    ctx.fillStyle = "#ffffff";
                    yPos += 40;
                    ctx.fillText(player.name, 100, yPos);
                    if (player.currentState == "ready") {
                        ctx.fillStyle = "#00ff00";
                        ctx.fillText("READY", 500, yPos);
                    } else {
                        ctx.fillStyle = "#ff0000";
                        ctx.fillText("NOT READY", 500, yPos);
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

            ctx.fillStyle = "#ffffff";
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._lobby.currentOptions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var menuOption = _step2.value;

                    var menuOptionText = menuOption;

                    // Show select cursor
                    if (menuOptionText == this._lobby.currentOptions[this._selectedOptionIndex]) menuOptionText = "> " + menuOptionText;

                    // Draw Menu Option
                    ctx.fillText(menuOptionText, xPos, 320);
                    xPos += 200;
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
            if (this.selectedOption == "Leave") {
                this._view.emit("leave-game");
            } else if (this.selectedOption == "Ready") {
                this._ready = !this._ready;
                this._view.emit("ready", this._ready);
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

},{"../../Config":2,"../services/ResourceService":19,"../services/Utils":21,"./ObjectView":26}],25:[function(require,module,exports){
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

},{"../../Config":2,"../services/ResourceService":19,"../services/Utils":21,"./ObjectView":26}],26:[function(require,module,exports){
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
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this2._images[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var image = _step.value;

                        ResourceService.loadImage(image.name, image.image);
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

                Promise.all(resourcePromises).then(function (images) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = images[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var image = _step2.value;

                            if (!_this2._resources) _this2._resources = new Map();

                            _this2._resources.set(image.name, image.image);
                        }

                        // Resolve Promise
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
            "image": "necromancer-sheet.png"
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

},{"../../Config":2,"../services/ResourceService":19,"../services/Utils":21,"./ObjectView":26}],28:[function(require,module,exports){
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
            "image": "shitwall.png"
        }];
    }

    _createClass(_default, [{
        key: 'loadResources',
        value: function loadResources() {
            return Promise.all([this.loadResource("floor", "goodtile.png"), this.loadResource("wall", "shitwall.png")]);
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

                    var healthBarXPos = xPos + _Config2['default'].TILE_SIZE * 2;
                    var healthBarYPos = yPos - fontSize / 2;
                    var healthBarWidth = _Config2['default'].TILE_SIZE * 2;
                    var healthBarHeight = fontSize / 2;

                    //ctx.fillStyle = "#000";
                    //ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

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
            _servicesLogger2['default'].debug("Ui emit event option-select: " + this._ui.currentOptions[this._selectedOptionIndex]);
            this._view.emit("option-select", this._ui.currentOptions[this._selectedOptionIndex]);
        }
    }]);

    return _default;
})(_ObjectView3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Logger":18,"./ObjectView":26}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9TZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9NdWx0aXBsYXllckNvbnRyb2xsZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9kaXNwYXRjaGVyL0Rpc3BhdGNoZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbWl4aW5zL2V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL0xvYmJ5LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvTWFpbk1lbnUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL29iamVjdHMvUm9vbS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvS2V5Ym9hcmRJbnB1dFNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9SZXNvdXJjZVNlcnZpY2UuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9SbmcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9VdGlscy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL0NhbnZhczJkLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvRW5lbXlWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTG9iYnlWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTWFpbk1lbnVWaWV3LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvT2JqZWN0Vmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1BsYXllclZpZXcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Sb29tVmlldy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1VpVmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7eUJDQW1CLGNBQWM7Ozs7O0FBR2pDLElBQUksTUFBTSxHQUFHLDJCQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7OztBQUdkLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOzs7Ozs7OztBQ1B2QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7Ozs7O0FBS2hCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUM7OztBQUdwQyxNQUFNLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQztBQUM1QixNQUFNLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQzs7QUFFNUIsTUFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbkIsTUFBTSxDQUFDLE1BQU0sR0FBRyxBQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDOztBQUV6RSxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVc7O0FBRTFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdEIsVUFBTSxDQUFDLFlBQVksR0FBSSxNQUFNLENBQUMsVUFBVSxHQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDM0QsVUFBTSxDQUFDLGFBQWEsR0FBRyxBQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUMsTUFBTSxDQUFDLGFBQWEsR0FBRSxNQUFNLENBQUMsWUFBWSxDQUFDOzs7QUFHdEYsUUFBRyxNQUFNLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDMUMsY0FBTSxDQUFDLGFBQWEsR0FBSSxNQUFNLENBQUMsV0FBVyxHQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDN0QsY0FBTSxDQUFDLFlBQVksR0FBRyxBQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUMsTUFBTSxDQUFDLFlBQVksR0FBRSxNQUFNLENBQUMsYUFBYSxDQUFDO0tBQ3pGOzs7QUFHRCxVQUFNLENBQUMsV0FBVyxHQUFLLEVBQUUsQ0FBQztBQUMxQixVQUFNLENBQUMsWUFBWSxHQUFJLE1BQU0sQ0FBQyxZQUFZLElBQUUsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsV0FBVyxDQUFBLEFBQUMsQ0FBQztBQUM5RSxVQUFNLENBQUMsU0FBUyxHQUFPLE1BQU0sQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQzs7O0FBRzlELFVBQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO0NBQ25CLENBQUE7O0FBRUQsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDOztxQkFFSixNQUFNOzs7Ozs7Ozs7Ozs7Ozs7OzswQkN0Q0osZUFBZTs7Ozs7OzZCQUdmLGtCQUFrQjs7Ozs7O29DQUdaLHlCQUF5Qjs7Ozs7QUFHakMsd0JBQUc7OztBQUNWLFlBQUksQ0FBQyxLQUFLLEdBQVMsNkJBQVUsQ0FBQztBQUM5QixZQUFJLENBQUMsS0FBSyxHQUFTLGdDQUFVLENBQUM7QUFDOUIsWUFBSSxDQUFDLFdBQVcsR0FBRyx1Q0FBZ0IsQ0FBQzs7QUFFcEMsY0FBTSxDQUFDLElBQUksR0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQy9CLGNBQU0sQ0FBQyxJQUFJLEdBQVMsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUMvQixjQUFNLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDeEM7Ozs7Ozs7O2VBS0csZ0JBQUc7OztBQUNILG1CQUFPLENBQUMsR0FBRyxDQUFDLENBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQzNCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FDcEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQ1Isc0JBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUN2QyxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VDOUJZLGdCQUFDLEdBQUcsRUFBRTtBQUNmLG1CQUFPLENBQUMsR0FBRyxRQUFNLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBSSxvREFBb0QsQ0FBQyxDQUFDO1NBQy9GOzs7ZUFFVyxlQUFDLEdBQUcsRUFBRTtBQUNkLG1CQUFPLENBQUMsS0FBSyxRQUFNLEdBQUcsRUFBSSxvREFBb0QsQ0FBQyxDQUFDO1NBQ25GOzs7ZUFFUyxhQUFDLEdBQUcsRUFBRTtBQUNaLG1CQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCOzs7ZUFFVyxlQUFDLEdBQUcsRUFBRTtBQUNkLG1CQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkNmb0IsY0FBYzs7OztrQ0FDZCx3QkFBd0I7Ozs7OEJBQ3hCLG9CQUFvQjs7Ozs7OztBQUk5QixzQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFOzs7QUFDcEIsd0ZBQVE7QUFDUixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFHLElBQUksRUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUVsQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQzs7QUFFdEIsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQzNCOzs7Ozs7Ozs7OztlQVlHLGdCQUFHOzs7O0FBR0gsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUM1QixtQkFBRyxFQUFFLG9CQUFPLE9BQU87QUFDbkIscUJBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDOztBQUVILG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixzQkFBSyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEVBQUUsRUFBRztBQUN4QixnREFBTyxLQUFLLDBDQUF3QyxFQUFFLENBQUcsQ0FBQztBQUMxRCwwQkFBSyxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7QUFHZCx3QkFBRyxNQUFLLEtBQUssRUFDVCxNQUFLLE9BQU8sQ0FBQyxNQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBSyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7QUFHakQsMEJBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxVQUFVLEVBQUc7O0FBRXRDLDRCQUFHLE1BQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7QUFDdEIsc0NBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDdEI7O0FBRUQsa0NBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQUk7QUFDdEIsd0RBQU8sS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkMsd0RBQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZCLGdDQUFJLElBQUksR0FBRyxNQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxrQ0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVCLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUM7O0FBRUgsdUJBQUcsRUFBRSxDQUFDO2lCQUNULENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7ZUFFTSxpQkFBQyxVQUFVLEVBQUU7OztBQUNoQixnQkFBSSxJQUFJLEdBQUc7QUFDUCw0QkFBWSxFQUFFLFVBQVU7YUFDM0IsQ0FBQztBQUNGLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV2QyxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFbkQsc0JBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDdkIsdUJBQUssVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3pCLENBQUMsQ0FBQzs7QUFFSCxtQkFBTyxJQUFJLENBQUM7U0FDZjs7O2VBRVksdUJBQUMsSUFBSSxFQUFFO0FBQ2hCLGdCQUFJLE9BQU8sR0FBRztBQUNWLHVCQUFPLEVBQUUsY0FBYztBQUN2QixzQkFBTSxFQUFFLElBQUksQ0FBQyxHQUFHO0FBQ2hCLHNCQUFNLEVBQUU7QUFDSiwwQkFBTSxFQUFFLElBQUksQ0FBQyxLQUFLO2lCQUNyQjthQUNKLENBQUE7O0FBRUQsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQ2YscUNBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLDhIQUFFO3dCQUE1QixLQUFJOztBQUNSLHlCQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2lCQUNwQjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRTNCLHdDQUFPLEtBQUssbURBQWlELElBQUksQ0FBRyxDQUFDO0FBQ3JFLHdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1NBQzVCOzs7ZUFFUyxvQkFBQyxJQUFJLEVBQUU7QUFDYix3Q0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxnQkFBSSxDQUFDLE1BQU0sVUFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7OztlQUVTLHNCQUFHO0FBQ1QsZ0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7Ozs7Ozs7ZUFLVyxzQkFBQyxPQUFPLEVBQUU7QUFDbEIsZ0JBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTs7Ozs7O0FBQ1osMENBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLG1JQUFFOzRCQUE5QixJQUFJOztBQUNSLDRCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDakM7Ozs7Ozs7Ozs7Ozs7OzthQUNKO1NBQ0o7OztlQUVVLHFCQUFDLEtBQUssRUFBRTtBQUNmLGdCQUFJLE9BQU8sR0FBRztBQUNWLHVCQUFPLEVBQUUsY0FBYztBQUN2QixzQkFBTSxFQUFFO0FBQ0osd0JBQUksRUFBRSxJQUFJLENBQUMsR0FBRztBQUNkLDJCQUFPLEVBQUUsS0FBSztpQkFDakI7YUFDSixDQUFDO0FBQ0YsZ0JBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDOUI7OztlQUVXLHNCQUFDLE1BQU0sRUFBRTtBQUNqQixnQkFBSSxPQUFPLEdBQUc7QUFDVix1QkFBTyxFQUFFLGVBQWU7QUFDeEIsc0JBQU0sRUFBRTtBQUNKLHdCQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUc7QUFDZCw0QkFBUSxFQUFFLE1BQU07aUJBQ25CO2FBQ0osQ0FBQTtBQUNELGdCQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQzlCOzs7ZUFFUyxvQkFBQyxPQUFPLEVBQUU7QUFDaEIsd0NBQU8sS0FBSyx5Q0FBdUMsT0FBTyxDQUFDLElBQUksQ0FBRyxDQUFDO0FBQ25FLHdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBR3BCLGdCQUFJLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV4QixnQkFBRyxPQUFPLENBQUMsS0FBSyxJQUFJLGNBQWMsRUFBRTs7Ozs7OztBQUVoQywwQ0FBZ0IsSUFBSSxDQUFDLEtBQUssbUlBQUU7NEJBQXBCLElBQUk7O0FBQ1IsNEJBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUM1Qyx3REFBTyxLQUFLLDBCQUF3QixJQUFJLENBQUcsQ0FBQztBQUM1QyxnQ0FBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3lCQUMxQztxQkFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0Qsb0JBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFlBQVksRUFBRTtBQUM3RSx3QkFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztpQkFDckQ7O0FBRUQsb0JBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3RDOztBQUVELGdCQUFHLE9BQU8sQ0FBQyxLQUFLLElBQUksY0FBYyxFQUFFO0FBQ2hDLG9CQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDM0M7O0FBRUQsZ0JBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxlQUFlLEVBQUU7QUFDakMsb0JBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM1QztTQUNKOzs7YUE3SkssZUFBRztBQUNMLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQ25Cb0Isb0JBQW9COzs7O2tDQUNwQix3QkFBd0I7Ozs7Z0RBQ2Ysc0NBQXNDOzs7Ozs7O0FBR3pELHdCQUFHOzs7QUFDVix3RkFBUTtLQUNYOzs7O2VBRUcsY0FBQyxJQUFJLEVBQUU7QUFDUCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsZ0JBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDekM7OztlQUVrQiw2QkFBQyxPQUFPLEVBQUU7OztBQUN6QixnQkFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVkLGdCQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUU7QUFDZixvQkFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDekMsTUFBTTtBQUNILG9CQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekI7O0FBRUQsZ0JBQUksQ0FBQyxzQkFBc0Isb0dBQWdDLElBQUksTUFBQyxDQUFDO0FBQ2pFLGdCQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDeEMsc0JBQUsseUJBQXlCLENBQUMsTUFBSyxzQkFBc0IsQ0FBQyxDQUFDO0FBQzVELDRDQUFPLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQ3pELHNCQUFLLElBQUksQ0FBQyxrQkFBa0IsRUFBRTtBQUMxQix3QkFBSSxFQUFFLE1BQUssc0JBQXNCLENBQUMsRUFBRTtBQUNwQywwQkFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJO2lCQUN2QixDQUFDLENBQUM7QUFDSCxzQkFBSyxJQUFJLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3BDLENBQUMsQ0FBQztTQUNOOzs7ZUFFUSxxQkFBRztBQUNSLGdCQUFJLENBQUMsc0JBQXNCLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDekMsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ3hDOzs7Ozs7O2VBS1UscUJBQUMsT0FBTyxFQUFFO0FBQ2pCLHdDQUFPLEtBQUssQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQ2pELHdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEIsd0NBQU8sS0FBSyxDQUFDLDBDQUEwQyxDQUFDLENBQUM7QUFDekQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDM0Isb0JBQUksRUFBRSxPQUFPLENBQUMsSUFBSTtBQUNsQixzQkFBTSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSTthQUM1QixDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUthLHdCQUFDLE9BQU8sRUFBRTtBQUNwQix3Q0FBTyxLQUFLLENBQUMscUNBQXFDLENBQUMsQ0FBQztBQUNwRCx3Q0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXBCLHdDQUFPLEtBQUssQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDO0FBQzVELGdCQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtBQUN2QixvQkFBSSxFQUFFLE9BQU87YUFDaEIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7ZUFLd0IsbUNBQUMsa0JBQWtCLEVBQUU7OztBQUMxQyw4QkFBa0IsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7QUFDdEUsOEJBQWtCLENBQUMsRUFBRSxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRXpFLDhCQUFrQixDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDN0MsdUJBQUssSUFBSSxDQUFDLHFCQUFxQixFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQzdDLENBQUMsQ0FBQzs7QUFFSCw4QkFBa0IsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQzlDLHVCQUFLLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsQ0FBQzthQUM5QyxDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUttQiw4QkFBQyxJQUFJLEVBQUU7OztBQUN2QixnQkFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3pELGdCQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFJO0FBQ3RCLHVCQUFLLFNBQVMsRUFBRSxDQUFBO2FBQ25CLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFLLEVBQUc7QUFDdEIsb0JBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQ3JDLHVCQUFLLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMvQyx1QkFBSyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7QUFDNUIsMkJBQU8sRUFBRSxLQUFLO2lCQUNqQixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsTUFBTSxFQUFHO0FBQy9CLHVCQUFLLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqRCx1QkFBSyxJQUFJLENBQUMscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUM7YUFDNUMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEdMLElBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFBOztBQUU5QixTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQVU7b0NBQUwsSUFBSTtBQUFKLFFBQUk7OztBQUM3QixTQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxTQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7Q0FDaEI7OztBQUljLHNCQUFHOzs7QUFDVixRQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFBO0FBQzFDLFFBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO0dBQ3BCOzs7O1dBRUMsWUFBQyxLQUFLLEVBQUUsUUFBUSxFQUFFO0FBQ2hCLFVBQUcsT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO0FBQ2hDLGNBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQTtPQUN0Qjs7Ozs7O0FBQ0QsNkJBQWdCLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLDhIQUFFO2NBQTFCLElBQUk7O0FBQ1IsY0FBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUE7QUFDOUQsY0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLG1CQUFPLElBQUksQ0FBQTtXQUNaO0FBQ0QsbUJBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDeEIsY0FBRyxTQUFTLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDeEMsaUJBQUssQ0FDSCwrQ0FBK0MsR0FDL0Msa0RBQWtELEdBQ2xELHFDQUFxQyxFQUNyQyxTQUFTLENBQUMsTUFBTSxFQUNoQixJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQTtXQUNGO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFRyxjQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDakIsVUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFBO0FBQ3pCLGVBQVMsWUFBWSxHQUFFO0FBQ3JCLHNCQUFjLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUN0QyxnQkFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUE7T0FDaEM7QUFDRCxhQUFPLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO0tBQ3JDOzs7V0FFRSxhQUFDLElBQUksRUFBVzt5Q0FBTixJQUFJO0FBQUosWUFBSTs7O0FBQ2IsVUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUNuQixZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQTtPQUMxQjtBQUNELFVBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUN0QixVQUFHLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtBQUNoQyxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7QUFDRCxVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFVBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ2xDLGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxVQUFJLGVBQWUsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ2pELFVBQUcsZUFBZSxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3hCLGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxlQUFTLENBQUMsTUFBTSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQTtBQUNwQyxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFRyxjQUFDLElBQUksRUFBVTt5Q0FBTCxJQUFJO0FBQUosWUFBSTs7O0FBQ2QsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQyxVQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNsQyxlQUFPLEtBQUssQ0FBQTtPQUNiO0FBQ0QsZUFBUyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEVBQUU7ZUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7T0FBQSxDQUFDLENBQUE7QUFDN0MsYUFBTyxJQUFJLENBQUE7S0FDZDs7O1dBRWMseUJBQUMsZUFBZSxFQUFDO0FBQzVCLFVBQUcsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLGVBQWUsRUFBRTtBQUNoRCxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7QUFDRCxVQUFJLENBQUMsYUFBYSxHQUFHLGVBQWUsQ0FBQTtLQUN2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqRkwsSUFBSSxxQkFBcUIsR0FBRyxFQUFFLENBQUE7O0FBRTlCLFNBQVMsS0FBSyxDQUFDLE9BQU8sRUFBVTtvQ0FBTCxJQUFJO0FBQUosUUFBSTs7O0FBQzdCLFNBQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3BELFNBQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtDQUNoQjs7O0FBSWMsc0JBQUc7OztBQUNWLFFBQUksQ0FBQyxhQUFhLEdBQUcscUJBQXFCLENBQUE7QUFDMUMsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUE7R0FDcEI7Ozs7V0FFQyxZQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDaEIsVUFBRyxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDaEMsY0FBTSxJQUFJLFNBQVMsRUFBRSxDQUFBO09BQ3RCOzs7Ozs7QUFDRCw2QkFBZ0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsOEhBQUU7Y0FBMUIsSUFBSTs7QUFDUixjQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQTtBQUM5RCxjQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDcEMsbUJBQU8sSUFBSSxDQUFBO1dBQ1o7QUFDRCxtQkFBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN4QixjQUFHLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN4QyxpQkFBSyxDQUNILCtDQUErQyxHQUMvQyxrREFBa0QsR0FDbEQscUNBQXFDLEVBQ3JDLFNBQVMsQ0FBQyxNQUFNLEVBQ2hCLElBQUksRUFDSixJQUFJLENBQUMsYUFBYSxDQUNuQixDQUFBO1dBQ0Y7U0FDSjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELGFBQU8sSUFBSSxDQUFBO0tBQ2Q7OztXQUVHLGNBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUNqQixVQUFJLGNBQWMsR0FBRyxJQUFJLENBQUE7QUFDekIsZUFBUyxZQUFZLEdBQUU7QUFDckIsc0JBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFBO0FBQ3RDLGdCQUFRLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQTtPQUNoQztBQUNELGFBQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7S0FDckM7OztXQUVFLGFBQUMsSUFBSSxFQUFXO3lDQUFOLElBQUk7QUFBSixZQUFJOzs7QUFDYixVQUFHLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ25CLFlBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFBO09BQzFCO0FBQ0QsVUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3RCLFVBQUcsT0FBTyxRQUFRLElBQUksVUFBVSxFQUFFO0FBQ2hDLGNBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQTtPQUN0QjtBQUNELFVBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEMsVUFBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDbEMsZUFBTyxJQUFJLENBQUE7T0FDWjtBQUNELFVBQUksZUFBZSxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7QUFDakQsVUFBRyxlQUFlLElBQUksQ0FBQyxDQUFDLEVBQUU7QUFDeEIsZUFBTyxJQUFJLENBQUE7T0FDWjtBQUNELGVBQVMsQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBQ3BDLGFBQU8sSUFBSSxDQUFBO0tBQ2Q7OztXQUVHLGNBQUMsSUFBSSxFQUFVO3lDQUFMLElBQUk7QUFBSixZQUFJOzs7QUFDZCxVQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFVBQUcsQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFO0FBQ2xDLGVBQU8sS0FBSyxDQUFBO09BQ2I7QUFDRCxlQUFTLENBQUMsT0FBTyxDQUFDLFVBQUEsRUFBRTtlQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQztPQUFBLENBQUMsQ0FBQTtBQUM3QyxhQUFPLElBQUksQ0FBQTtLQUNkOzs7V0FFYyx5QkFBQyxlQUFlLEVBQUM7QUFDNUIsVUFBRyxRQUFRLENBQUMsZUFBZSxDQUFDLEtBQUssZUFBZSxFQUFFO0FBQ2hELGNBQU0sSUFBSSxTQUFTLEVBQUUsQ0FBQTtPQUN0QjtBQUNELFVBQUksQ0FBQyxhQUFhLEdBQUcsZUFBZSxDQUFBO0tBQ3ZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0NqRm9CLHdCQUF3Qjs7Ozs4QkFDeEIsb0JBQW9COzs7Ozs7O0FBSTlCLHNCQUFDLFFBQVEsRUFBRTs7O0FBQ2xCLHdGQUFRO0tBQ1g7Ozs7ZUFtQlEscUJBQUc7QUFDUixnQkFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDYixxQ0FBZ0IsSUFBSSxDQUFDLFNBQVMsOEhBQUU7d0JBQXhCLElBQUk7O0FBQ1IsdUJBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsR0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pFOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsZUFBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQyxtQkFBTyxHQUFHLENBQUM7U0FDZDs7O2VBRVUscUJBQUMsSUFBSSxFQUFFO0FBQ2Qsd0NBQU8sS0FBSyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzVCLHdDQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7Ozs7O0FBQ2pCLHNDQUFnQixJQUFJLENBQUMsU0FBUyxtSUFBRTt3QkFBeEIsSUFBSTs7QUFDUix3QkFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbkU7Ozs7Ozs7Ozs7Ozs7OztTQUNKOzs7YUF6QmUsYUFBQyxLQUFLLEVBQUU7QUFDcEIsZ0JBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDeEIsb0JBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2FBQzlCO1NBQ0o7YUFFZSxlQUFHO0FBQ2YsbUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tDQ3ZCb0Isd0JBQXdCOzs7Ozs7NkJBRzNCLG1CQUFtQjs7Ozs4QkFDbkIsb0JBQW9COzs7O3NCQUNwQixjQUFjOzs7OzJCQUNkLGlCQUFpQjs7Ozs7OzBCQUdqQixhQUFhOzs7OzZCQUNiLGtCQUFrQjs7Ozs4QkFDbEIsbUJBQW1COzs7OzJCQUNuQixnQkFBZ0I7Ozs7K0JBQ2hCLG9CQUFvQjs7Ozs0QkFDcEIsaUJBQWlCOzs7O3lCQUNqQixjQUFjOzs7Ozs7O0FBSXJCLHdCQUFHOzs7QUFDVix3RkFBUTtBQUNSLFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FDbkIsV0FBVyxFQUNYLE9BQU8sRUFDUCxTQUFTLENBQ1osQ0FBQyxDQUFDOztBQUVILFlBQUksQ0FBQyxTQUFTLEdBQUcsa0NBQWMsQ0FBQztBQUNoQyxZQUFJLENBQUMsTUFBTSxHQUFNLCtCQUFXLENBQUM7S0FDaEM7Ozs7Ozs7Ozs7O2VBUUcsY0FBQyxVQUFVLEVBQUU7OztBQUNiLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixzQkFBSyxXQUFXLEdBQUcsVUFBVSxDQUFDOztBQUU5QixzQkFBSyxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUMxQixzQkFBSyxhQUFhLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUMvQixzQkFBSyxjQUFjLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7O0FBR2hDLHNCQUFLLGtCQUFrQixDQUFDLE1BQUssV0FBVyxDQUFDLENBQUM7O0FBRTFDLG1CQUFHLEVBQUUsQ0FBQzthQUNULENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7ZUFzQmUsNEJBQUc7O0FBRWYsZ0JBQUcsSUFBSSxDQUFDLFlBQVksS0FBSyxPQUFPLEVBQUU7QUFDOUIsb0JBQUksWUFBWSxHQUFHLElBQUksQ0FBQzs7Ozs7O0FBQ3hCLHlDQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSw4SEFBRTs0QkFBakMsTUFBTTs7QUFDVixvQ0FBWSxHQUFHLFlBQVksSUFBSSxNQUFNLENBQUMsWUFBWSxLQUFLLE9BQU8sQ0FBQztxQkFDbEU7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCw0Q0FBTyxLQUFLLENBQUMscUJBQXFCLEdBQUcsWUFBWSxDQUFDLENBQUM7O0FBRW5ELG9CQUFHLFlBQVksRUFBRTtBQUNiLGdEQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMvQix3QkFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2lCQUN4QjthQUNKO1NBQ0o7OztlQUVnQiw2QkFBRztBQUNoQixnQkFBRyxJQUFJLENBQUMsWUFBWSxLQUFLLFNBQVMsRUFBRTs7QUFFaEMsb0JBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLElBQUksTUFBTSxFQUFFO0FBQ2xDLHdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7Ozs7OztBQUN2Qiw4Q0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUlBQUU7Z0NBQWpDLE1BQU07O0FBQ1YsdUNBQVcsR0FBRyxXQUFXLElBQUksTUFBTSxDQUFDLGFBQWEsS0FBSyxPQUFPLENBQUM7eUJBQ2pFOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsd0JBQUcsV0FBVyxFQUFFO0FBQ1osNEJBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztxQkFDMUI7aUJBQ0o7YUFDSjtTQUNKOzs7Ozs7O2VBaUNTLHNCQUFHO0FBQ1QsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO1NBQ25DOzs7ZUFFZ0IsNkJBQUc7QUFDaEIsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsT0FBTyxDQUFDO1NBQy9COzs7ZUFFWSx5QkFBRzs7QUFFWixnQkFBSSxDQUFDLEtBQUssR0FBVSw4QkFBVSxDQUFDO0FBQy9CLGdCQUFJLENBQUMsR0FBRyxHQUFZLDRCQUFRLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDO1NBQ2pDOzs7ZUFFYywyQkFBRzs7OztBQUVkLGdCQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUM7Ozs7Ozs7O0FBR25DLHNDQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxtSUFBRTt3QkFBakMsTUFBTTs7QUFDViwwQkFBTSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUM7aUJBQ25DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCxnQkFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUN4QixnQkFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRTlCLGdCQUFJLENBQUMsUUFBUSxHQUFHLElBQUksR0FBRyxDQUNuQixLQUFLLENBQ1IsRUFBQSxDQUFDOztBQUVGLHNCQUFVLENBQUMsWUFBSTtBQUNYLHVCQUFLLFlBQVksRUFBRSxDQUFDO2FBQ3ZCLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDWjs7O2VBRVcsd0JBQUc7QUFDWCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsUUFBUSxDQUFDO0FBQ25DLGdCQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7OztBQUM1QixzQ0FBa0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsbUlBQUU7d0JBQWpDLE1BQU07O0FBQ1YsMEJBQU0sQ0FBQyxZQUFZLEdBQUksTUFBTSxDQUFDO0FBQzlCLDBCQUFNLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQztpQkFDbkM7Ozs7Ozs7Ozs7Ozs7OztTQUNKOzs7Ozs7O2VBS2lCLDRCQUFDLFVBQVUsRUFBRTs7O0FBQzNCLHNCQUFVLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3hELHNCQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBSSxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztBQUcvRCxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDbkMsdUJBQUssWUFBWSxHQUFHLE9BQU8sQ0FBQzthQUMvQixDQUFDLENBQUM7OztBQUdILHNCQUFVLENBQUMsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQzFDLDRDQUFPLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO0FBQ3pELDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEIsb0JBQUksQ0FBQyxHQUFHLCtCQUFXLE9BQU8sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUU3QyxpQkFBQyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQ2QsMkJBQUssZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMzQixDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7O0FBRUgsc0JBQVUsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDekMsNENBQU8sS0FBSyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDeEQsNENBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVwQixvQkFBSSxDQUFDLEdBQUcsK0JBQVcsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7O0FBRTdDLGlCQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDZCwyQkFBSyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQzFCLENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQzs7O0FBR0gsc0JBQVUsQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQ3RDLDRDQUFPLEtBQUssQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO0FBQ3JELDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFcEIsdUJBQUssUUFBUSxVQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pDLHVCQUFLLGFBQWEsVUFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUN0Qyx1QkFBSyxjQUFjLFVBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7Ozs7Ozs7QUFFdkMsMENBQWtCLE9BQUssUUFBUSxDQUFDLE1BQU0sRUFBRSxtSUFBRTs0QkFBbEMsTUFBTTs7QUFDViw4QkFBTSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUM7cUJBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7YUFDSixDQUFDLENBQUM7OztBQUdILHNCQUFVLENBQUMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQzNDLDRDQUFPLEtBQUssQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDO0FBQzFELDRDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7Ozs7OztBQUVwQiwwQ0FBa0IsT0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFLG1JQUFFOzRCQUF2QyxNQUFNOztBQUNWLDhCQUFNLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7cUJBQ3ZDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHRCx1QkFBSyxnQkFBZ0IsRUFBRSxDQUFDO2FBQzNCLENBQUMsQ0FBQzs7O0FBR0gsc0JBQVUsQ0FBQyxFQUFFLENBQUMscUJBQXFCLEVBQUUsVUFBQyxPQUFPLEVBQUc7QUFDNUMsNENBQU8sS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7QUFDM0QsNENBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVwQixvQkFBSSxNQUFNLEdBQUcsT0FBSyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNqRCxzQkFBTSxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDOzs7QUFHcEMsdUJBQUssZ0JBQWdCLEVBQUUsQ0FBQzthQUMzQixDQUFDLENBQUM7Ozs7QUFJSCxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxVQUFDLE9BQU8sRUFBRztBQUM1Qyw0Q0FBTyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztBQUMxQyw0Q0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Ozs7OztBQUNwQiwwQ0FBa0IsT0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFLG1JQUFFOzRCQUF2QyxNQUFNOztBQUNWLDhCQUFNLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQztxQkFDbEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDRCx1QkFBSyxpQkFBaUIsRUFBRSxDQUFDO2FBQzVCLENBQUMsQ0FBQzs7OztBQUlILHNCQUFVLENBQUMsRUFBRSxDQUFDLHNCQUFzQixFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQzdDLG9CQUFJLE1BQU0sR0FBRyxPQUFLLGNBQWMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2pELHNCQUFNLENBQUMsYUFBYSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7QUFDdEMsdUJBQUssaUJBQWlCLEVBQUUsQ0FBQzthQUM1QixDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUthLHdCQUFDLENBQUMsRUFBRTtBQUNkLGdCQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hDLGdCQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3JCOzs7Ozs7O2VBS2MseUJBQUMsQ0FBQyxFQUFFO0FBQ2YsZ0JBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakMsZ0JBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDckI7Ozs7Ozs7ZUFLUSxtQkFBQyxDQUFDLEVBQUU7QUFDVCx3Q0FBTyxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNwQyx3Q0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZCxnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxnQkFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDZCxzQ0FBa0IsT0FBTyxtSUFBRTt3QkFBbkIsTUFBTTs7QUFDVix3QkFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDbkIsMEJBQU0sQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO2lCQUNoQzs7Ozs7Ozs7Ozs7Ozs7OztBQUNELGdCQUFJLElBQUksR0FBRyxDQUFDO0FBQ1osYUFBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDZCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUMzQixnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDOUI7OzthQTNQZSxhQUFDLEtBQUssRUFBRTtBQUNwQixnQkFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4QixvQkFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7QUFDM0Isb0JBQUcsSUFBSSxDQUFDLGFBQWEsSUFBSSxXQUFXLEVBQUU7O0FBRWxDLHdCQUFJLENBQUMsUUFBUSxHQUFTLElBQUksR0FBRyxFQUFFLENBQUM7QUFDaEMsd0JBQUksQ0FBQyxhQUFhLEdBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQyx3QkFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO2lCQUNuQztBQUNELG9CQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDL0M7U0FDSjthQXlDZSxlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUFDOzs7Ozs7O2FBS25DLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQUM7Ozs7Ozs7YUFLOUIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7U0FBQzs7Ozs7OzthQUt0QixlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUFDOzs7Ozs7O2FBSzdCLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQUM7Ozs7Ozs7YUFLekIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJDdElULGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdyQix3QkFBRzs7O0FBQ1Ysd0ZBQVE7O0FBRVIsWUFBSSxDQUFDLGVBQWUsR0FBRyxDQUNuQixZQUFZLEVBQ1osT0FBTyxFQUNQLE9BQU8sQ0FDVixDQUFDO0tBQ0w7Ozs7YUFFaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkN2QmlCLGNBQWM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdyQix3QkFBRzs7O0FBQ1Ysd0ZBQVE7O0FBRVIsWUFBSSxDQUFDLGVBQWUsR0FBRyxDQUNuQixXQUFXLEVBQ1gsV0FBVyxDQUNkLENBQUM7S0FDTDs7OzthQUVpQixlQUFHO0FBQ2pCLG1CQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQ3RCaUIsY0FBYzs7Ozs7Ozs7Ozs7YUFLWixlQUFHO0FBQ25CLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSxnQkFBZ0I7QUFDMUIsc0JBQU0sRUFBSSxNQUFNO2FBQ25CLENBQUE7U0FDSjs7O0FBRVUsc0JBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7OztBQUMxQix3RkFBTSxFQUFFLEVBQUU7QUFDVixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztLQUNwQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkNqQnFCLGNBQWM7Ozs7Ozs4QkFDckIsdUJBQXVCOzs7O0FBRTFDLElBQUksUUFBUSxHQUFHLElBQUksR0FBRyxDQUFDLENBQ25CLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxFQUNYLEtBQUssRUFDTCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFFBQVEsRUFDUixTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsQ0FDWCxDQUFDLENBQUM7O0lBRUcsTUFBTTtjQUFOLE1BQU07O2lCQUFOLE1BQU07Ozs7YUFFa0IsZUFBRztBQUN6QixtQkFBTztBQUNILHdCQUFRLEVBQUUsdUJBQXVCO0FBQ2pDLHNCQUFNLEVBQUksYUFBYTtBQUN2Qix3QkFBUSxFQUFFLEVBQUU7QUFDWixzQkFBTSxFQUFFLEVBQUU7QUFDViwwQkFBVSxFQUFFLE1BQU07YUFDckIsQ0FBQTtTQUNKOzs7YUFFdUIsZUFBRztBQUN2QixtQkFBTztBQUNILHdCQUFRLEVBQUUscUJBQXFCO0FBQy9CLHNCQUFNLEVBQUUsV0FBVztBQUNuQix3QkFBUSxFQUFFLEVBQUU7QUFDWixzQkFBTSxFQUFFLENBQUM7QUFDVCwwQkFBVSxFQUFFLE1BQU07YUFDckIsQ0FBQTtTQUNKOzs7YUFFcUIsZUFBRztBQUNyQixtQkFBTztBQUNILHdCQUFRLEVBQUUsb0JBQW9CO0FBQzlCLHNCQUFNLEVBQUUsU0FBUztBQUNqQix3QkFBUSxFQUFFLEVBQUU7QUFDWixzQkFBTSxFQUFFLEVBQUU7QUFDViwwQkFBVSxFQUFFLE9BQU87YUFDdEIsQ0FBQTtTQUNKOzs7YUFFb0IsZUFBRztBQUNwQixtQkFBTztBQUNILHdCQUFRLEVBQUUsa0JBQWtCO0FBQzVCLHNCQUFNLEVBQUUsUUFBUTtBQUNoQix3QkFBUSxFQUFFLEdBQUc7QUFDYixzQkFBTSxFQUFFLENBQUM7QUFDVCwwQkFBVSxFQUFFLE9BQU87YUFDdEIsQ0FBQTtTQUNKOzs7YUFFeUIsZUFBRztBQUN6QixtQkFBTztBQUNILHdCQUFRLEVBQUUsdUJBQXVCO0FBQ2pDLHNCQUFNLEVBQUUsYUFBYTtBQUNyQix3QkFBUSxFQUFFLEVBQUU7QUFDWixzQkFBTSxFQUFFLEdBQUc7QUFDWCwwQkFBVSxFQUFFLE9BQU87YUFDdEIsQ0FBQTtTQUNKOzs7QUFFVSxhQXBEVCxNQUFNLENBb0RJLElBQUksRUFBRSxFQUFFLEVBQUU7OEJBcERwQixNQUFNOztBQXFESixtQ0FyREYsTUFBTSw2Q0FxREUsUUFBUSxFQUFFO0FBQ2hCLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOztBQUVkLFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FDbkIsTUFBTSxFQUNOLE9BQU8sRUFDUCxTQUFTLEVBQ1QsV0FBVyxDQUNkLENBQUMsQ0FBQztBQUNILFlBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDOztBQUUzQixZQUFJLENBQUMsYUFBYSxHQUFHLFVBQVUsQ0FBQzs7QUFFaEMsWUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFDckIsWUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7O0FBRWxCLFlBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO0tBQ25COztpQkF4RUMsTUFBTTs7ZUEyRkosZ0JBQUc7QUFDSCxtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUc7QUFDM0IsbUJBQUcsRUFBRSxDQUFDO2FBQ1QsQ0FBQyxDQUFDO1NBQ047OzthQXJCZSxhQUFDLEtBQUssRUFBRTtBQUNwQixnQkFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUN4Qiw0Q0FBTyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNuQyxvQkFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7YUFDOUI7U0FDSjthQUllLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQUM7OzthQUY5QixhQUFDLE1BQU0sRUFBRTtBQUFDLGdCQUFJLENBQUMsY0FBYyxHQUFHLE1BQU0sQ0FBQztTQUFDO2FBSXhDLGVBQUc7QUFBQyxtQkFBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1NBQUM7OzthQUV6QyxlQUFHO0FBQUMsbUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUFDOzs7YUFFekIsZUFBRztBQUFDLG1CQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7U0FBQzs7O1dBekZ6QixNQUFNOzs7cUJBa0dHLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQ2xIQyxjQUFjOzs7OzhCQUNkLHVCQUF1Qjs7OztBQUU3QyxJQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUNuQixTQUFTLEVBQ1QsTUFBTSxFQUNOLFVBQVUsRUFDVixVQUFVLEVBQ1YsV0FBVyxFQUNYLGVBQWUsRUFDZixlQUFlLEVBQ2YsV0FBVyxDQUNkLENBQUMsQ0FBQzs7SUFFRyxJQUFJO2NBQUosSUFBSTs7QUFHSyxhQUhULElBQUksQ0FHTSxJQUFJLEVBQUU7OEJBSGhCLElBQUk7O0FBSUYsbUNBSkYsSUFBSSw2Q0FJTTtBQUNSLFlBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FDbkIsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLENBQ1gsQ0FBQyxDQUFDOztBQUVILFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO0tBQzlCOztpQkFiQyxJQUFJOztlQWVRLDBCQUFHLEVBQ2hCOzs7ZUFFVSx1QkFBRyxFQUNiOzs7ZUFFUSxxQkFBRyxFQUNYOzs7ZUFFVSx1QkFBRyxFQUNiOzs7V0F6QkMsSUFBSTs7O3FCQTRCSyxJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzswQkMxQ0csY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV3JCLHNCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs7O0FBQ3pDLHdGQUFRO0FBQ1IsWUFBSSxDQUFDLGNBQWMsR0FBRyxDQUNsQixRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLENBQ1gsQ0FBQzs7QUFFRixZQUFJLENBQUMsWUFBWSxHQUFHLENBQ2hCLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFFBQVEsQ0FDWCxDQUFDOztBQUVGLFlBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztLQUM1Qzs7OztlQU1lLDRCQUFHO0FBQ2YsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztTQUM5Qzs7O2VBRVkseUJBQUc7QUFDWixnQkFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzVDOzs7YUFWaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO1NBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkNoQ29CLGNBQWM7Ozs7a0NBQ2Qsd0JBQXdCOzs7Ozs7O0FBR2xDLHNCQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUU7OztBQUNwQix3RkFBUTtBQUNSLFlBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQy9DLFlBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0tBQ25DOzs7O2VBRVUscUJBQUMsUUFBUSxFQUFFOzs7QUFDbEIsb0JBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLElBQUksQ0FBQzthQUFBLENBQUMsQ0FBQztBQUNuRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQUEsQ0FBQyxDQUFDOztBQUVsRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQUEsQ0FBQyxDQUFDO0FBQ3ZELG9CQUFRLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRTt1QkFBTSxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUM7YUFBQSxDQUFDLENBQUM7O0FBRXBELG9CQUFRLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRTt1QkFBTSxNQUFLLElBQUksQ0FBQyxNQUFNLENBQUM7YUFBQSxDQUFDLENBQUM7QUFDdkQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsR0FBRyxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUFBLENBQUMsQ0FBQzs7QUFFcEQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFO3VCQUFNLE1BQUssSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUFBLENBQUMsQ0FBQztBQUN6RCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUU7dUJBQU0sTUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQUEsQ0FBQyxDQUFDOztBQUVyRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUU7dUJBQUssTUFBSyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQUEsQ0FBQyxDQUFDO1NBQzdEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUN2QlksZ0JBQUMsR0FBRyxFQUFFO0FBQ2YsbUJBQU8sQ0FBQyxHQUFHLFFBQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDL0Y7OztlQUVXLGVBQUMsR0FBRyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxLQUFLLFFBQU0sR0FBRyxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDbkY7OztlQUVTLGFBQUMsR0FBRyxFQUFFO0FBQ1osbUJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7OztlQUVXLGVBQUMsR0FBRyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JDZmMsYUFBYTs7OztBQUVoQyxJQUFJLFdBQVcsR0FBRyxtQkFBbUIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7ZUFRbEIsbUJBQUMsUUFBUSxFQUFFO0FBQ3ZCLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixvQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxtQkFBRyxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3BCLDBDQUFPLEdBQUcsdUJBQXFCLFFBQVEsQ0FBRyxDQUFDO0FBQzNDLHVCQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ1osQ0FBQTtBQUNELG1CQUFHLENBQUMsR0FBRyxHQUFHLFdBQVcsR0FBRyxTQUFTLEdBQUcsUUFBUSxDQUFDO2FBQ2hELENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQlUsc0JBQUMsSUFBSSxFQUFFOzs7QUFDZCxlQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQzFCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUIsY0FBTSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQzFCOzs7O2VBRUcsZ0JBQUc7QUFDSCxtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUMwRFcsc0JBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUN4QixnQkFBRyxDQUFDLEtBQUssRUFBRTtBQUNQLHFCQUFLLEdBQUcsZ0VBQWdFLENBQUM7YUFDNUU7QUFDRCxnQkFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGlCQUFLLElBQUksQ0FBQyxHQUFHLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUFFLHNCQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQyxDQUFDLENBQUM7YUFBQSxBQUNqRyxPQUFPLE1BQU0sQ0FBQztTQUNqQjs7O2VBekVlLG1CQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUU7OztBQUd0QixnQkFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7O0FBR2hDLGVBQUcsR0FBRyxHQUFHLElBQUksRUFBRSxDQUFDO0FBQ2hCLGdCQUFJLFFBQVEsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDOztBQUUxQixtQkFBUSxDQUFBLFNBQVMsSUFBSSxDQUFDLElBQUksRUFBQztBQUN2QixxQ0FBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBRzVCLG9CQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQy9CLG9CQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDOztBQUV2QixvQkFBSSxLQUFLLEdBQUcsUUFBUSxFQUFFOzs7O0FBSWxCLHdCQUFJLEdBQUcsR0FBRyxHQUFJLEtBQUssR0FBRyxRQUFRLEFBQUMsQ0FBQzs7O0FBR2hDLHNCQUFFLEVBQUUsQ0FBQztpQkFDUjthQUNKLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBRTtTQUNUOzs7ZUFFc0IsMEJBQUMsRUFBRSxFQUFFO0FBQ3hCLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZCxnQkFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0FBQ2QsbUJBQU8sRUFBRSxHQUFDLEVBQUUsR0FBQyxFQUFFLENBQUM7U0FDbkI7OztlQUVnQixvQkFBQyxNQUFNLEVBQUU7QUFDdEIsZ0JBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUUxQyxnQkFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDOztBQUVwQixnQkFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsS0FBSyxDQUFDOztBQUU1QixpQkFBSyxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztBQUU1QixtQkFBRyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFZCxvQkFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztBQUV6Qiw4QkFBVSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNyRCxNQUNJOztBQUVELHVCQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7QUFFckIsdUJBQUcsR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFeEMseUJBQUssR0FBRyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFMUMsOEJBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7aUJBQzNCO2FBQ0o7O0FBRUQsbUJBQU8sVUFBVSxDQUFDO1NBQ3JCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQ0MvRG9CLHdCQUF3Qjs7Ozs7OzRDQUd4QixrQ0FBa0M7Ozs7c0JBQ3hDLGNBQWM7Ozs7OEJBQ2Qsb0JBQW9COzs7Ozs7MEJBR2QsY0FBYzs7Ozt5QkFDZCxhQUFhOzs7O3dCQUNiLFlBQVk7Ozs7NEJBQ1osZ0JBQWdCOzs7O3lCQUNoQixhQUFhOzs7O3NCQUNiLFVBQVU7Ozs7Ozs7QUFHcEIsd0JBQUc7OztBQUNWLHdGQUFROztBQUVSLFlBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQztBQUM5QixZQUFJLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRWhELFlBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFPLFlBQVksQ0FBQztBQUN6QyxZQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxvQkFBTyxhQUFhLENBQUM7O0FBRTNDLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztLQUMzQjs7Ozs7Ozs7O2VBTUssa0JBQUc7QUFDTCxnQ0FBTyxTQUFTLEVBQUUsQ0FBQztBQUNuQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsb0JBQU8sWUFBWSxDQUFDO0FBQ3pDLGdCQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxvQkFBTyxhQUFhLENBQUM7QUFDM0MsZ0JBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDO1NBQzNDOzs7ZUFFRyxjQUFDLElBQUksRUFBRTtBQUNQLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFbEIsZ0JBQUksQ0FBQyxhQUFhLEdBQUcsK0NBQWtCLENBQUM7O0FBRXhDLGdCQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDeEMsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsZ0JBQUksQ0FBQyxJQUFJLENBQUMscUJBQXFCLEdBQUcsS0FBSyxDQUFDOzs7O0FBSXhDLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRTFELGdCQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BDLGdCQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ2xEOzs7OztlQUdHLGdCQUFHO0FBQ0gsaUNBQXFCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7QUFFNUMsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNyQixnQkFBSSxLQUFLLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7OztBQUc1QixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTs7QUFFdkIsb0JBQUksQ0FBQyxJQUFJLEdBQUcsR0FBRyxHQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxBQUFDLENBQUM7OztBQUcxQyxvQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztBQUMvQixvQkFBSSxDQUFDLE1BQU0sR0FBRyxBQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsb0JBQU8sR0FBRyxHQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzs7QUFHekQsb0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHekIsb0JBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLEdBQUUsSUFBSSxDQUFDO0FBQzVDLGtCQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDZixvQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDLENBQUM7OztBQUd6QyxvQkFBSSxRQUFRLEdBQVksQ0FBQyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUM5QyxvQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQVUsUUFBUSxHQUFHLGdCQUFnQixDQUFDO0FBQ3BELG9CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7O0FBRWxDLG9CQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxvQkFBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7QUFHL0Usb0JBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQjtTQUNKOzs7ZUFFSyxnQkFBQyxLQUFLLEVBQUU7QUFDVixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQWdCLG9CQUFPLFlBQVksQ0FBQztBQUN0RCxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQWUsb0JBQU8sYUFBYSxDQUFDO0FBQ3ZELGdCQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQzs7QUFFeEMsZ0JBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUM3QixnQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxvQkFBTyxZQUFZLEVBQUUsb0JBQU8sYUFBYSxDQUFDLENBQUM7Ozs7Ozs7QUFFcEUscUNBQWdCLElBQUksQ0FBQyxNQUFNLDhIQUFHO3dCQUF0QixJQUFJOztBQUNSLHdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7aUJBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7U0FDSjs7O2VBRWUsNEJBQUc7QUFDZixnQkFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDOztBQUVmLGdCQUFHLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDbkIscUJBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ2xDOztBQUVELG1CQUFPLEtBQUssQ0FBQztTQUNoQjs7O2VBRVUsdUJBQUc7QUFDVixnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFDLG9CQUFPLEdBQUcsQ0FBQztBQUNoQyxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNqQixnQkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsa0JBQU0sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQ3REOzs7Ozs7O2VBSWlCLDRCQUFDLElBQUksRUFBRTs7O0FBQ3JCLGdCQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLE9BQU8sRUFBSTtBQUM5Qiw0Q0FBTyxLQUFLLENBQUMsdUJBQXVCLENBQUMsQ0FBQztBQUN0Qyw0Q0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDcEIsb0JBQUcsT0FBTyxJQUFJLFdBQVcsRUFBRTs7O0FBRXZCLDRCQUFHLENBQUMsTUFBSyxVQUFVLEVBQUU7QUFDakIsa0NBQUssV0FBVyxFQUFFLENBQUM7eUJBQ3RCO0FBQ0QsNEJBQUksWUFBWSxHQUFHLDhCQUFpQixJQUFJLENBQUMsUUFBUSxRQUFPLENBQUM7QUFDekQsb0NBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBSTtBQUN6QixrQ0FBSyxhQUFhLEdBQUcsWUFBWSxDQUFDO0FBQ2xDLGtDQUFLLE1BQU0sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE1BQUssYUFBYSxDQUFDLENBQUMsQ0FBQzt5QkFDL0MsQ0FBQyxDQUFDOztpQkFDTixNQUFNLElBQUksT0FBTyxJQUFJLE9BQU8sRUFBRTs7QUFDM0IsNEJBQUksU0FBUyxHQUFHLDJCQUFjLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sUUFBTyxDQUFDO0FBQzlELGlDQUFTLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDdEIsa0NBQUssVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUM1QixrQ0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7eUJBQzVDLENBQUMsQ0FBQzs7aUJBQ04sTUFBTSxJQUFHLE9BQU8sSUFBSSxTQUFTLEVBQUU7Ozs7Ozs7Ozs7O0FBRTVCLDRCQUFJLFFBQVEsR0FBRywwQkFBYSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsOEJBQUssU0FBUyxHQUFHLFFBQVEsQ0FBQzs7QUFFMUIsNEJBQUksUUFBUSxHQUFHLENBQ1gsUUFBUSxDQUFDLGFBQWEsRUFBRSxDQUMzQixDQUFDOztBQUVGLDRCQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7OztBQUdmLDhCQUFLLFlBQVksR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDOUIsOENBQWtCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLDJIQUFFO29DQUFqQyxNQUFNOztBQUNWLG9DQUFJLFVBQVUsR0FBRyw0QkFBZSxNQUFNLENBQUMsQ0FBQztBQUN4Qyx3Q0FBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztBQUMxQyxxQ0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2QixzQ0FBSyxZQUFZLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7NkJBQ2hEOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsNEJBQUksTUFBTSxHQUFHLHdCQUFXLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLE9BQU8sUUFBTyxDQUFDO0FBQ3JELDhCQUFLLE9BQU8sR0FBRyxNQUFNLENBQUM7O0FBRXRCLGdDQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDOzs7QUFHdEMsK0JBQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQUk7QUFDM0Isa0NBQUssTUFBTSxJQUNQLE1BQUssU0FBUyxTQUNYLEtBQUssR0FDUixNQUFLLE9BQU8sRUFDZixDQUFDO0FBQ0Ysa0NBQUssSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO3lCQUM3QixDQUFDLENBQUM7O2lCQUNOO2FBQ0osQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxVQUFDLE1BQU0sRUFBRztBQUN4QixvQkFBRyxJQUFJLENBQUMsWUFBWSxLQUFLLE1BQU0sRUFDM0IsTUFBSyxVQUFVLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQzthQUMxQyxDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFHLEVBQzdCLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBQyxJQUFJLEVBQUcsRUFDM0IsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7ZUFLb0IsK0JBQUMsS0FBSyxFQUFFOzs7O0FBRXpCLGlCQUFLLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxZQUFJO0FBQ2Ysb0JBQUksU0FBUyxHQUFHLE9BQUssS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4Qyx3QkFBTyxTQUFTO0FBQ1oseUJBQUssV0FBVztBQUNaLCtCQUFLLGFBQWEsQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUN4Qiw4QkFBTTtBQUFBLEFBQ1YseUJBQUssU0FBUztBQUNWLCtCQUFLLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQztBQUNsQiw4QkFBTTtBQUFBLGlCQUNiO2FBQ0osQ0FBQyxDQUFDOzs7QUFHSCxpQkFBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBSTtBQUNqQixvQkFBSSxTQUFTLEdBQUcsT0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3hDLHdCQUFPLFNBQVM7QUFDWix5QkFBSyxXQUFXO0FBQ1osK0JBQUssYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzFCLDhCQUFNO0FBQUEsQUFDVix5QkFBSyxTQUFTO0FBQ1YsK0JBQUssT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ3BCLDhCQUFNO0FBQUEsaUJBQ2I7YUFDSixDQUFDLENBQUM7OztBQUdILGlCQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFJO0FBQ2pCLG9CQUFJLFNBQVMsR0FBRyxPQUFLLEtBQUssQ0FBQyxZQUFZLENBQUM7QUFDeEMsd0JBQU8sU0FBUztBQUNaLHlCQUFLLE9BQU87QUFDUiwrQkFBSyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDdkIsOEJBQU07QUFBQSxBQUNWLHlCQUFLLFNBQVM7QUFDViwrQkFBSyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDcEIsOEJBQU07QUFBQSxpQkFDYjthQUNKLENBQUMsQ0FBQzs7O0FBR0gsaUJBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDbEIsb0JBQUksU0FBUyxHQUFHLE9BQUssS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4Qyx3QkFBTyxTQUFTO0FBQ1oseUJBQUssT0FBTztBQUNSLCtCQUFLLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUN4Qiw4QkFBTTtBQUFBLEFBQ1YseUJBQUssU0FBUztBQUNWLCtCQUFLLE9BQU8sQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNyQiw4QkFBTTtBQUFBLGlCQUNiO2FBQ0osQ0FBQyxDQUFDOzs7QUFHSCxpQkFBSyxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsWUFBSTtBQUNwQixvQkFBSSxTQUFTLEdBQUcsT0FBSyxLQUFLLENBQUMsWUFBWSxDQUFDO0FBQ3hDLHdCQUFPLFNBQVM7QUFDWix5QkFBSyxXQUFXO0FBQ1osK0JBQUssYUFBYSxDQUFDLE9BQU8sUUFBTSxDQUFDO0FBQ2pDLDhCQUFNO0FBQUEsQUFDVix5QkFBSyxPQUFPO0FBQ1IsK0JBQUssVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzFCLDhCQUFNO0FBQUEsQUFDVix5QkFBSyxTQUFTO0FBQ1YsK0JBQUssT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3ZCLDhCQUFNO0FBQUEsaUJBQ2I7YUFDSixDQUFDLENBQUM7OztBQUdILGlCQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFJLEVBRXBCLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkMvUXVCLGNBQWM7Ozs7NkJBQ3hCLG1CQUFtQjs7OztzQkFDbEIsY0FBYzs7Ozs7OztBQUdsQixzQkFBQyxPQUFPLEVBQUU7OztBQUNqQix3RkFBTztBQUNQLFlBQUksQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDOztBQUV4QixZQUFJLENBQUMsT0FBTyxHQUFHLENBQ1g7QUFDSSxrQkFBTSxFQUFFLFFBQVE7QUFDaEIsbUJBQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNO1NBQ3JDLENBQ0osQ0FBQztLQUNMOzs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNmLGdCQUFJLENBQUMsS0FBSyxHQUFHLEFBQUMsS0FBSyxHQUFHLG9CQUFPLEdBQUcsR0FBQyxDQUFDLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QyxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTNDLGVBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixNQUFNLEVBQ04sTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssRUFDekIsQ0FBQyxFQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztBQUN0QyxjQUFFLEVBQ0YsRUFBRTtBQUNGLGdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLG9CQUFPLFlBQVk7QUFDekQsZ0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWTthQUM3RCxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDaEN1QixjQUFjOzs7OzZCQUNkLG1CQUFtQjs7OztzQkFDbkIsY0FBYzs7Ozt1Q0FDZCw2QkFBNkI7Ozs7Ozs7QUFHMUMsc0JBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7OztBQUM5Qix3RkFBTSxLQUFLLEVBQUU7QUFDYixZQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNwQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUN4QixZQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFlBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO0tBQ3ZCOzs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNmLGVBQUcsQ0FBQyxTQUFTLEdBQU8sU0FBUyxDQUFDO0FBQzlCLGVBQUcsQ0FBQyxXQUFXLEdBQUssU0FBUyxDQUFDOztBQUU5QixnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2YsZ0JBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQzs7QUFFZixlQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDakMsZUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hDLGVBQUcsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxlQUFHLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUFDbEMscUNBQWtCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLDhIQUFFO3dCQUFsQyxNQUFNOztBQUNWLHVCQUFHLENBQUMsU0FBUyxHQUFPLFNBQVMsQ0FBQztBQUM5Qix3QkFBSSxJQUFJLEVBQUUsQ0FBQztBQUNYLHVCQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3JDLHdCQUFHLE1BQU0sQ0FBQyxZQUFZLElBQUksT0FBTyxFQUFFO0FBQy9CLDJCQUFHLENBQUMsU0FBUyxHQUFPLFNBQVMsQ0FBQztBQUM5QiwyQkFBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO3FCQUNwQyxNQUFNO0FBQ0gsMkJBQUcsQ0FBQyxTQUFTLEdBQU8sU0FBUyxDQUFDO0FBQzlCLDJCQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7cUJBQ3hDO2lCQUNKOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUQsZUFBRyxDQUFDLFNBQVMsR0FBTyxTQUFTLENBQUM7Ozs7OztBQUM5QixzQ0FBc0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLG1JQUFFO3dCQUExQyxVQUFVOztBQUNkLHdCQUFJLGNBQWMsR0FBRyxVQUFVLENBQUM7OztBQUdoQyx3QkFBRyxjQUFjLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEVBQ3RFLGNBQWMsR0FBRyxJQUFJLEdBQUcsY0FBYyxDQUFDOzs7QUFHM0MsdUJBQUcsQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUN4Qyx3QkFBSSxJQUFJLEdBQUcsQ0FBQztpQkFDZjs7Ozs7Ozs7Ozs7Ozs7O1NBQ0o7OztlQU1HLGdCQUFHO0FBQ0gsZ0JBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUU5QixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztTQUNuQzs7O2VBRUksaUJBQUc7QUFDSixnQkFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUM3QixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBRTlCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1NBQ25DOzs7ZUFFTSxtQkFBRztBQUNOLGdCQUFHLElBQUksQ0FBQyxjQUFjLElBQUksT0FBTyxFQUFFO0FBQy9CLG9CQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUNqQyxNQUFNLElBQUcsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEVBQUU7QUFDdEMsb0JBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLG9CQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3pDO1NBQ0o7OztlQUVHLGdCQUFHLEVBQ047OzthQTVCaUIsZUFBRztBQUNqQixtQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztTQUNoRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDdkR1QixjQUFjOzs7OzZCQUNkLG1CQUFtQjs7OztzQkFDbkIsY0FBYzs7Ozt1Q0FDZCw2QkFBNkI7Ozs7QUFFekQsSUFBSSxVQUFVLGtWQVViLENBQUM7O0FBRUYsSUFBSSxVQUFVLDZaQVliLENBQUM7Ozs7O0FBR2Esc0JBQUMsUUFBUSxFQUFFLElBQUksRUFBRTs7O0FBQ3hCLHdGQUFNLFFBQVEsRUFBRTtBQUNoQixZQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUMxQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztBQUNsQixZQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFlBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO0tBQzVCOzs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNmLGVBQUcsQ0FBQyxTQUFTLEdBQUssU0FBUyxDQUFDOztBQUU1QixnQkFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQ2YsZ0JBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztBQUVmLHFDQUFzQixJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsOEhBQUU7d0JBQTdDLFVBQVU7O0FBQ2Qsd0JBQUksY0FBYyxHQUFHLFVBQVUsQ0FBQzs7O0FBR2hDLHdCQUFHLGNBQWMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFDekUsY0FBYyxHQUFHLElBQUksR0FBRyxjQUFjLENBQUM7OztBQUczQyx1QkFBRyxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hDLHdCQUFJLElBQUksR0FBRyxDQUFDO2lCQUNmOzs7Ozs7Ozs7Ozs7Ozs7U0FDSjs7O2VBTWEsd0JBQUMsSUFBSSxFQUFFOzs7QUFDakIsZ0JBQUksTUFBTSxHQUFHLElBQUksU0FBUyxFQUFFLENBQUE7QUFDNUIsZ0JBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQzFELGdCQUFJLE9BQU8sR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDOztBQUU3QixnQkFBSSxVQUFVLEdBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ2hFLGdCQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLHVCQUF1QixDQUFDLENBQUM7O0FBRWxFLGdCQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDNUQsZ0JBQUksT0FBTyxHQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFMUQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQyxxQkFBUyxDQUFDLE9BQU8sR0FBRyxZQUFJO0FBQ3BCLG9CQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO0FBQzlCLDhCQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUMxQyxNQUFNO0FBQ0gsOEJBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM3QzthQUNKLENBQUE7O0FBRUQsd0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUN2QyxzQkFBSyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdEIsc0JBQUssT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QixDQUFDLENBQUM7O0FBRUgsc0JBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUNyQyxzQkFBSyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUIsQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsT0FBTyxHQUFHO0FBQ1gsdUJBQU8sRUFBRSxPQUFPO0FBQ2hCLHNCQUFNLEVBQUUsa0JBQVc7QUFDZix3QkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQTtpQkFDeEI7QUFDRCx1QkFBTyxFQUFFLG1CQUFXO0FBQ2hCLHdCQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDdkIsNEJBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2xCLGdDQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUs7QUFDckIsOEJBQUUsRUFBRSxPQUFPLENBQUMsS0FBSzt5QkFDcEIsQ0FBQyxDQUFDO0FBQ0gsNEJBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztxQkFDakI7aUJBQ0o7YUFDSixDQUFDO1NBQ0w7OztlQUVhLHdCQUFDLElBQUksRUFBRTs7O0FBQ2pCLGdCQUFJLE1BQU0sR0FBRyxJQUFJLFNBQVMsRUFBRSxDQUFBO0FBQzVCLGdCQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztBQUMxRCxnQkFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLFVBQVUsQ0FBQzs7QUFHN0IsZ0JBQUksVUFBVSxHQUFLLE9BQU8sQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsQ0FBQztBQUNoRSxnQkFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDOztBQUVsRSxnQkFBSSxTQUFTLEdBQUssT0FBTyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzlELGdCQUFJLFNBQVMsR0FBSyxPQUFPLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDOUQsZ0JBQUksT0FBTyxHQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQzs7QUFFNUQsZ0JBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVuQyxnQkFBSSxVQUFVLEdBQUcsU0FBYixVQUFVLEdBQWM7QUFDeEIsb0JBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFFO0FBQ2pELDhCQUFVLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUMxQyxNQUFNO0FBQ0gsOEJBQVUsQ0FBQyxZQUFZLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM3QzthQUNKLENBQUM7QUFDRixxQkFBUyxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLHFCQUFTLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRTFDLHdCQUFZLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDdkMsdUJBQUssT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3RCLHVCQUFLLE9BQU8sR0FBRyxLQUFLLENBQUM7YUFDeEIsQ0FBQyxDQUFDOztBQUVILHNCQUFVLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDckMsdUJBQUssT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQzFCLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLE9BQU8sR0FBRztBQUNYLHVCQUFPLEVBQUUsT0FBTztBQUNoQixzQkFBTSxFQUFFLGtCQUFXO0FBQ2Ysd0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUE7aUJBQ3hCO0FBQ0QsdUJBQU8sRUFBRSxtQkFBVztBQUNoQix3QkFBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUU7QUFDakQsNEJBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2xCLGdDQUFJLEVBQUUsU0FBUyxDQUFDLEtBQUs7QUFDckIsa0NBQU0sRUFBRSxTQUFTLENBQUMsS0FBSztBQUN2Qiw4QkFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLO3lCQUNwQixDQUFDLENBQUM7QUFDSCw0QkFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO3FCQUNqQjtpQkFDSjthQUNKLENBQUM7U0FDTDs7O2VBRUMsY0FBRztBQUNELGdCQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDckU7OztlQUVHLGdCQUFHO0FBQ0gsZ0JBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztTQUNiOzs7ZUFFTSxtQkFBRztBQUNOLGdCQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNkLG9CQUFHLElBQUksQ0FBQyxjQUFjLElBQUksV0FBVyxFQUFFO0FBQ25DLHdCQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkMsTUFBTTtBQUNILHdCQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkM7YUFDSixNQUFNO0FBQ0gsb0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDMUI7U0FDSjs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQ3RCOzs7YUE5SGlCLGVBQUc7QUFDakIsbUJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLENBQUM7U0FDbkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNEVSxzQkFBQyxNQUFNLEVBQUU7OztBQUNoQixZQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUN6Qjs7Ozs7Ozs7O2VBTVcsc0JBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRTs7O0FBQ3pCLG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixvQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxtQkFBRyxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3BCLDJCQUFPLENBQUMsR0FBRyx1QkFBcUIsUUFBUSxDQUFHLENBQUM7QUFDNUMsdUJBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDYixDQUFBO0FBQ0QsbUJBQUcsQ0FBQyxHQUFHLEdBQUcsMEJBQTBCLEdBQUcsUUFBUSxDQUFDOzs7QUFHaEQsb0JBQUcsQ0FBQyxNQUFLLFVBQVUsRUFBRTtBQUNqQiwwQkFBSyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztpQkFDL0I7QUFDRCxzQkFBSyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNsQyxDQUFDLENBQUM7U0FDTjs7Ozs7OztlQUtHLGdCQUFHOzs7QUFDSCxtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUc7QUFDM0IsbUJBQUcsRUFBRSxDQUFDO0FBQ04sb0JBQUksZ0JBQWdCLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFDMUIseUNBQWlCLE9BQUssT0FBTyw4SEFBRTs0QkFBdkIsS0FBSzs7QUFDVCx1Q0FBZSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCx1QkFBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLE1BQU0sRUFBRzs7Ozs7O0FBQ3pDLDhDQUFpQixNQUFNLG1JQUFFO2dDQUFqQixLQUFLOztBQUNULGdDQUFHLENBQUMsT0FBSyxVQUFVLEVBQ2YsT0FBSyxVQUFVLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEMsbUNBQUssVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUdELHVCQUFHLEVBQUUsQ0FBQztpQkFDVCxDQUFDLENBQUM7YUFDTixDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDbER1QixjQUFjOzs7OzZCQUNkLG1CQUFtQjs7OztzQkFDbkIsY0FBYzs7Ozt1Q0FDZCw2QkFBNkI7Ozs7Ozs7QUFHMUMsc0JBQUMsTUFBTSxFQUFFOzs7QUFDaEIsd0ZBQU0sTUFBTSxFQUFFO0FBQ2QsZUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNwQixlQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3BCLFlBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOztBQUV0QixZQUFJLENBQUMsT0FBTyxHQUFHLENBQ1g7QUFDSSxrQkFBTSxFQUFFLFFBQVE7QUFDaEIsbUJBQU8sRUFBRSx1QkFBdUI7U0FDbkMsRUFDRDtBQUNJLGtCQUFNLEVBQUUsUUFBUTtBQUNoQixtQkFBTyxFQUFFLFlBQVk7U0FDeEIsRUFDRDtBQUNJLGtCQUFNLEVBQUUsUUFBUTtBQUNoQixtQkFBTyxFQUFFLFlBQVk7U0FDeEIsQ0FDSixDQUFDO0tBQ0w7Ozs7ZUFFWSx5QkFBRztBQUNaLGdCQUFJLFFBQVEsR0FBRyxFQUFFLENBQUE7Ozs7OztBQUNqQixxQ0FBaUIsSUFBSSxDQUFDLE9BQU8sOEhBQUU7d0JBQXZCLEtBQUs7O0FBQ1QsNEJBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDaEM7OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssR0FBUSxBQUFDLEtBQUssR0FBRyxvQkFBTyxHQUFHLEdBQUMsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWpELGdCQUFJLFdBQVcsR0FBRyxvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxDQUFDOztBQUV6RCxnQkFBSSxPQUFPLEdBQUcsb0JBQU8sTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNoQyxnQkFBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsSUFBSSxNQUFNLEVBQUU7QUFDaEMsdUJBQU8sRUFBRSxDQUFDO2FBQ2I7O0FBRUQsZ0JBQUksTUFBTSxHQUFRLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxnQkFBSSxNQUFNLEdBQVMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakQsZ0JBQUksV0FBVyxHQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUMsb0JBQU8sWUFBWSxDQUFDO0FBQ3BELGdCQUFJLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxvQkFBTyxZQUFZLENBQUM7OztBQUd2RCxlQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsTUFBTSxFQUNOLENBQUMsRUFDRCxDQUFDO0FBQ0Qsa0JBQU0sQ0FBQyxLQUFLO0FBQ1osa0JBQU0sQ0FBQyxLQUFLO0FBQ1osbUJBQU8sR0FBRSxXQUFXLEFBQUM7QUFDckIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFFLFdBQVcsQUFBQyxHQUFJLFdBQVcsQUFBQyxHQUFJLG9CQUFPLFlBQVksR0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsSUFBSSxBQUFDO0FBQ2pILHVCQUFXO0FBQ1gsdUJBQVc7YUFDZCxDQUFDLENBQUM7OztBQUlILGVBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEtBQUssU0FBUyxHQUFHLG9CQUFPLFdBQVcsR0FBRSxJQUFJLENBQUMsS0FBSyxBQUFDLEdBQUcsQ0FBQztBQUM3RSxhQUFDO0FBQ0QsZ0NBQU8sV0FBVztBQUNsQixnQ0FBTyxXQUFXO0FBQ2xCLG1CQUFPLEdBQUUsV0FBVyxBQUFDO0FBQ3JCLGdCQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRSxXQUFXLEFBQUM7QUFDL0IsdUJBQVc7QUFDWCx1QkFBVzthQUNkLENBQUMsQ0FBQzs7O0FBR0gsZ0JBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixvQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWE7QUFDN0IscUJBQUssVUFBVTtBQUNYLGdDQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxRQUFRO0FBQ1QsZ0NBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztBQUMvQiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssUUFBUTtBQUNULGdDQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ2pDLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxNQUFNO0FBQ1AsZ0NBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDakMsMEJBQU07QUFBQSxBQUNWLHFCQUFLLFNBQVM7QUFDVixnQ0FBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNqQywwQkFBTTtBQUFBLGFBQ2I7O0FBRUQsZ0JBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxLQUFLLE9BQU8sRUFBRTtBQUNoRixtQkFBRyxDQUFDLFNBQVMsTUFBQSxDQUFiLEdBQUcsRUFBYyxDQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUM3QixDQUFDLEVBQ0QsWUFBWTtBQUNaLHNCQUFNLENBQUMsS0FBSztBQUNaLHNCQUFNLENBQUMsTUFBTSxHQUFDLENBQUM7QUFDZix1QkFBTyxHQUFFLFdBQVcsQUFBQyxHQUFJLFdBQVcsR0FBQyxHQUFHLEFBQUM7QUFDekMsb0JBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFFLFdBQVcsQUFBQyxHQUFJLFlBQVksR0FBQyxHQUFHLEFBQUM7QUFDcEQsMkJBQVc7QUFDWCw0QkFBWTtpQkFDZixDQUFDLENBQUM7YUFDTjtTQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsyQkNoSHVCLGNBQWM7Ozs7NkJBQ3hCLG1CQUFtQjs7OztzQkFDbEIsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCbEIsc0JBQUMsSUFBSSxFQUFFOzs7QUFDZCx3RkFBUTtBQUNSLFlBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFlBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxXQUFXLEdBQUksQ0FBQyxDQUFDOztBQUV0QixZQUFJLENBQUMsT0FBTyxHQUFHLENBQ1g7QUFDSSxrQkFBTSxFQUFFLE9BQU87QUFDZixtQkFBTyxFQUFFLGNBQWM7U0FDMUIsRUFDRDtBQUNJLGtCQUFNLEVBQUUsTUFBTTtBQUNkLG1CQUFPLEVBQUUsY0FBYztTQUMxQixDQUNKLENBQUM7S0FDTDs7OztlQUVZLHlCQUFHO0FBQ1osbUJBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLGNBQWMsQ0FBQyxFQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRyxjQUFjLENBQUMsQ0FDN0MsQ0FBQyxDQUFDO1NBQ047OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssR0FBUSxBQUFDLEtBQUssR0FBRyxvQkFBTyxHQUFHLEdBQUMsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFDLENBQUMsQ0FBQzs7O0FBR3JCLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QyxnQkFBSSxVQUFVLEdBQUcsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUN4RCxpQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFPLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMscUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBTyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZDLHVCQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsS0FBSyxFQUNMLENBQUMsRUFDRCxDQUFDLEVBQ0Qsb0JBQU8sV0FBVztBQUNsQix3Q0FBTyxXQUFXO0FBQ2xCLHdCQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBQyxDQUFDLEdBQUcsVUFBVTtBQUM3QyxxQkFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEdBQUUsVUFBVTtBQUNoQiw4QkFBVSxFQUNWLFVBQVUsQ0FDYixDQUFDLENBQUM7aUJBQ047YUFDSjs7O0FBR0QsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUMvQyxpQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFPLFlBQVksR0FBRSxTQUFTLEFBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekQsbUJBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixJQUFJLEVBQ0osQ0FBQztBQUNELG9CQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSztBQUN4QixvQkFBSSxDQUFDLEtBQUssRUFDVixJQUFJLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDYixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsR0FBQyxDQUFDLEdBQUcsU0FBUztBQUMxQyxpQkFBQztBQUNELG9CQUFJLENBQUMsS0FBSyxHQUFDLG9CQUFPLFlBQVksRUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBQyxvQkFBTyxZQUFZLEdBQUMsQ0FBQyxDQUNwQyxDQUFDLENBQUM7YUFDTjs7O0FBR0QsZ0JBQUksS0FBSyxHQUFHLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLEdBQUMsRUFBRSxDQUFDO0FBQ3RELGdCQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxJQUFJLFFBQVEsRUFBRTtBQUNwQyxvQkFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7QUFDM0Isb0JBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDOztBQUU5RCxvQkFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7QUFDMUIsb0JBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQzdEO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JDOUZjLGNBQWM7Ozs7MkJBQ0wsY0FBYzs7Ozs4QkFDZCxvQkFBb0I7Ozs7Ozs7QUFHakMsc0JBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUU7OztBQUMzQix3RkFBUTtBQUNSLFlBQUksQ0FBQyxHQUFHLEdBQVcsRUFBRSxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxLQUFLLEdBQVMsSUFBSSxDQUFDO0FBQ3hCLFlBQUksQ0FBQyxRQUFRLEdBQU0sT0FBTyxDQUFDOztBQUUzQixvQ0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0Isb0NBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFMUIsWUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7O0FBRXJCLFlBQUksQ0FBQyxPQUFPLEdBQUcsQ0FDWDtBQUNJLGtCQUFNLEVBQUUsSUFBSTtBQUNaLG1CQUFPLEVBQUUsV0FBVztTQUN2QixDQUNKLENBQUM7O0FBRUYsWUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztLQUNqQzs7OztlQUVZLHlCQUFHO0FBQ1osZ0JBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQTs7Ozs7O0FBQ2pCLHFDQUFpQixJQUFJLENBQUMsT0FBTyw4SEFBRTt3QkFBdkIsS0FBSzs7QUFDVCw0QkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7aUJBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0QsbUJBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNoQzs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFOztBQUVSLGdCQUFJLElBQUksR0FBRyxvQkFBTyxTQUFTLElBQUUsb0JBQU8sTUFBTSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUEsQUFBQyxDQUFDOzs7QUFHN0QsZUFBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVYLGdCQUFJLE1BQU0sR0FBRyxDQUNULENBQUMsRUFDRCxJQUFJLEVBQ0osb0JBQU8sWUFBWSxFQUNuQixvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxHQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUNoRSxDQUFDOztBQUVGLGdCQUFJLE1BQU0sR0FBRyxDQUNULENBQUMsRUFDRCxJQUFJLEVBQ0osb0JBQU8sWUFBWSxFQUNuQixvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQzFELENBQUM7O0FBRUYsZ0JBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxvQkFBb0IsTUFBQSxDQUF4QixHQUFHLEVBQXlCLE1BQU0sQ0FBQyxDQUFDOztBQUVuRCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDcEMsb0JBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3BDLGVBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO0FBQ3pCLGVBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsTUFBTSxDQUFDLENBQUM7O0FBRXhCLGVBQUcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDOzs7QUFHNUIsZ0JBQUksU0FBUyxHQUFHLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLEdBQUMsRUFBRSxDQUFDOztBQUUxRCxlQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7QUFFMUIsZ0JBQUksVUFBVSxhQUFPLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFDLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7QUFDM0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7O0FBRTNCLGVBQUcsQ0FBQyxVQUFVLE1BQUEsQ0FBZCxHQUFHLHFCQUFlLFVBQVUsRUFBQyxDQUFDOzs7QUFHOUIsZUFBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDdEIsZ0JBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDcEUsZUFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsZUFBRyxDQUFDLElBQUksTUFBQSxDQUFSLEdBQUcscUJBQVMsVUFBVSxFQUFDLENBQUM7QUFDeEIsZUFBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVYLGVBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQzs7QUFFZCxlQUFHLENBQUMsU0FBUyxHQUFLLFNBQVMsQ0FBQztBQUM1QixnQkFBSSxJQUFJLG9CQUFPLFNBQVMsR0FBQyxDQUFDLENBQUM7O0FBRTNCLGdCQUFJLFFBQVEsR0FBTSxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDO0FBQ3hDLGVBQUcsQ0FBQyxJQUFJLEdBQVUsUUFBUSxHQUFHLGdCQUFnQixDQUFDOztBQUU5QyxnQkFBSSxJQUFJLEdBQUcsb0JBQU8sU0FBUyxHQUFDLEdBQUcsQ0FBQzs7O0FBR2hDLGVBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDWixNQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQSxHQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUMzRSxJQUFJLEVBQ0osSUFBSSxDQUNQLENBQUMsQ0FBQzs7QUFFSCxlQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLENBQ1osTUFBRyxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFDM0UsSUFBSSxHQUFHLG9CQUFPLFNBQVMsR0FBQyxDQUFDLEVBQ3pCLElBQUksQ0FDUCxDQUFDLENBQUM7O0FBRUgsZUFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNaLE1BQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBLEdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQzNFLElBQUksRUFDSixJQUFJLEdBQUcsUUFBUSxHQUFDLENBQUMsQ0FDcEIsQ0FBQyxDQUFDOztBQUVILGVBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDWixNQUFHLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQSxHQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUMzRSxJQUFJLEdBQUcsb0JBQU8sU0FBUyxHQUFDLENBQUMsRUFDekIsSUFBSSxHQUFHLFFBQVEsR0FBQyxDQUFDLENBQ3BCLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxHQUFHLG9CQUFPLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDMUIsZ0JBQUksR0FBRyxvQkFBTyxTQUFTLElBQUUsb0JBQU8sTUFBTSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUEsQUFBQyxDQUFDOzs7Ozs7OztBQUd6RCxzQ0FBa0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsbUlBQUU7d0JBQWxDLE1BQU07O0FBQ1Ysd0JBQUksSUFBSSxRQUFRLEdBQUMsQ0FBQyxDQUFDOztBQUVuQix1QkFBRyxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7OztBQUc1Qix1QkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNaLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsSUFBSSxFQUNKLElBQUksQ0FDUCxDQUFDLENBQUM7O0FBRUgsd0JBQUksYUFBYSxHQUFLLElBQUksR0FBRyxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQ2hELHdCQUFJLGFBQWEsR0FBSyxJQUFJLEdBQUcsUUFBUSxHQUFDLENBQUMsQ0FBQztBQUN4Qyx3QkFBSSxjQUFjLEdBQUksb0JBQU8sU0FBUyxHQUFDLENBQUMsQ0FBQztBQUN6Qyx3QkFBSSxlQUFlLEdBQUcsUUFBUSxHQUFDLENBQUMsQ0FBQzs7Ozs7O0FBTWpDLHVCQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQix3QkFBSSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDdEQsdUJBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLEdBQUMsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLENBQUM7OztBQUc3Rix1QkFBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUM7QUFDekIsdUJBQUcsQ0FBQyxTQUFTLEdBQUssQ0FBQyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUN4Qyx1QkFBRyxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFOUUsdUJBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLHVCQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLENBQ1QsTUFBTSxDQUFDLE1BQU0sU0FBSSxNQUFNLENBQUMsU0FBUyxFQUNwQyxhQUFhLEdBQUMsY0FBYyxHQUFDLENBQUMsR0FBQyxvQkFBTyxZQUFZLEVBQ2xELGFBQWEsQ0FDaEIsQ0FBQyxDQUFDOztBQUVILGlDQUFhLElBQUksZUFBZSxHQUFDLEdBQUcsQ0FBQzs7Ozs7O0FBTXJDLHVCQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQix3QkFBSSxjQUFjLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ2hELHVCQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxHQUFDLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQzs7O0FBRzNGLHVCQUFHLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQztBQUN6Qix1QkFBRyxDQUFDLFNBQVMsR0FBSyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDO0FBQ3hDLHVCQUFHLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDOztBQUU5RSx1QkFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsdUJBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsQ0FDVCxNQUFNLENBQUMsSUFBSSxTQUFJLE1BQU0sQ0FBQyxPQUFPLEVBQ2hDLGFBQWEsR0FBQyxjQUFjLEdBQUMsQ0FBQyxHQUFDLG9CQUFPLFlBQVksRUFDbEQsYUFBYSxDQUNoQixDQUFDLENBQUM7aUJBQ047Ozs7Ozs7Ozs7Ozs7OztTQUNKOzs7ZUFFQyxjQUFHO0FBQ0QsZ0JBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBQzdCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztTQUNyQzs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO1NBQ2I7OztlQUVHLGdCQUFHO0FBQ0gsZ0JBQUcsSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDN0IsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQyxLQUM3QixJQUFJLElBQUksQ0FBQyxvQkFBb0IsSUFBSSxDQUFDLEVBQ25DLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLENBQUMsS0FDN0IsSUFBSSxJQUFJLENBQUMsb0JBQW9CLElBQUksQ0FBQyxFQUNuQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxDQUFDLEtBQzdCLElBQUksSUFBSSxDQUFDLG9CQUFvQixJQUFJLENBQUMsRUFDbkMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLENBQUMsQ0FBQztTQUNyQzs7O2VBRUksaUJBQUc7QUFDSixnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ2Y7OztlQUVNLG1CQUFHO0FBQ04sd0NBQU8sS0FBSyxDQUFDLCtCQUErQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7QUFDbkcsZ0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1NBQ3hGIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi9hcHAvRW5naW5lJztcblxuLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG52YXIgZW5naW5lID0gbmV3IEVuZ2luZShkb2N1bWVudC5ib2R5KTtcbmVuZ2luZS5pbml0KCk7XG5cbi8vIERFQlVHXG53aW5kb3cuZW5naW5lID0gZW5naW5lO1xuXG4iLCJsZXQgY29uZmlnID0ge307XG4vKipcbiAqIFNob3VsZCBiZSBzZXQgdXAgdG8gcmVjYWxjdWxhdGUgb24gdGhlIGZseSB3aGVuIHRoaW5ncyBjaGFnbmUuXG4gKiBOb3Qgd29ya2luZyByaWdodCBhdCBhbGwgZm9yIHdpbmRvdyBzaXplIGNoYWduZXMuXG4gKi9cbmNvbmZpZy5BUElfS0VZID0gXCJ4YWh4eDB5dXk1bGU0czRpXCI7XG5cbi8vIDE2eDkgQXNwZWN0IFJhdGlvXG5jb25maWcuQVNQRUNUX1dJRFRIICA9IDE5MjA7XG5jb25maWcuQVNQRUNUX0hFSUdIVCA9IDEwODA7XG5cbmNvbmZpZy5USUxFX1ggPSAxNjsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuY29uZmlnLlRJTEVfWSA9IChjb25maWcuVElMRV9YKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG5jb25maWcuY2FsY3VsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gSG9yaXpvbnRhbCBvciBWZXJ0aWNhbCBwZXJjZW50YWdlIHRoYXQgdGhlIGdhbWUgdmlldyBzaG91bGQgb2NjdXB5XG4gICAgY29uZmlnLlBFUkNFTlRBR0UgPSAxO1xuXG4gICAgLy8gQ2FjbHVsYXRlIGNhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IGFjY29yZGluZyB0byBhYm92ZSBwZXJjZW50YWdlIGFuZCBhc3BlY3QgcmF0aW9cbiAgICBjb25maWcuQ0FOVkFTX1dJRFRIICA9IHdpbmRvdy5vdXRlcldpZHRoKmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgaWYoY29uZmlnLkNBTlZBU19IRUlHSFQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICBjb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIH1cblxuICAgIC8vIERldGVybWluZSBTcHJpdGUgU2NhbGluZ1xuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG4gICAgY29uZmlnLlRJTEVfU0laRSAgICAgPSBjb25maWcuU1BSSVRFX1NJWkUqY29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgIC8vIFNldCBGUFNcbiAgICBjb25maWcuRlBTID0gMzA7XG59XG5cbmNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiLy8gSW1wb3J0IEdhbWVcbmltcG9ydCBHYW1lIGZyb20gJy4vbW9kZWxzL0dhbWUnO1xuXG4vLyBJbXBvcnQgVmlld1xuaW1wb3J0IFZpZXcgZnJvbSAnLi92aWV3cy9DYW52YXMyZCc7XG5cbi8vIEltcG9ydCBEaXNwYXRjaGVyXG5pbXBvcnQgRGlzcGF0Y2hlciBmcm9tICcuL2Rpc3BhdGNoZXIvRGlzcGF0Y2hlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fZ2FtZSAgICAgICA9IG5ldyBHYW1lKCk7XG4gICAgICAgIHRoaXMuX3ZpZXcgICAgICAgPSBuZXcgVmlldygpO1xuICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gbmV3IERpc3BhdGNoZXIoKTtcblxuICAgICAgICB3aW5kb3cuZ2FtZSAgICAgICA9IHRoaXMuX2dhbWU7XG4gICAgICAgIHdpbmRvdy52aWV3ICAgICAgID0gdGhpcy5fdmlldztcbiAgICAgICAgd2luZG93LmRpc3BhdGNoZXIgPSB0aGlzLl9kaXNwYXRjaGVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGVuZ2luZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMuX2dhbWUuaW5pdCh0aGlzLl9kaXNwYXRjaGVyKSxcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcuaW5pdCh0aGlzLl9nYW1lKSxcbiAgICAgICAgICAgIHRoaXMuX2Rpc3BhdGNoZXIuaW5pdCh0aGlzLl92aWV3KVxuICAgICAgICBdKS50aGVuKCgpPT57XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyLmVtaXQoXCJzdGFydC1nYW1lXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4uL1NlcnZpY2VzL0xvZ2dlcic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGhvc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIGlmKGhvc3QpXG4gICAgICAgICAgICB0aGlzLl9ob3N0ID0gaG9zdDtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5faWQgPSBcImhvc3RcIjtcblxuICAgICAgICB0aGlzLl9wZWVycyA9IG5ldyBNYXAoKTtcbiAgICB9XG5cbiAgICBnZXQgaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9pZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgdGhlIHBlZXIgY29ubmVjdGlvblxuICAgICAgICB0aGlzLl9wZWVyID0gbmV3IFBlZXIodGhpcy5faWQsIHtcbiAgICAgICAgICAgIGtleTogQ29uZmlnLkFQSV9LRVksXG4gICAgICAgICAgICBkZWJ1ZzogM1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5fcGVlci5vbignb3BlbicsIChpZCk9PntcbiAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoYFBlZXIgQ29ubmVjdGlvbiBjcmVhdGVkLCBQZWVyIElEIGlzICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faWQgPSBpZDtcblxuICAgICAgICAgICAgICAgIC8vIElmIHdlIGtub3cgYWJvdXQgYSBwZWVyIHRoZW4gY29ubmVjdFxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2hvc3QpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGVlcih0aGlzLl9wZWVyLmNvbm5lY3QodGhpcy5faG9zdCkpO1xuXG4gICAgICAgICAgICAgICAgLy8gV2hlbiBhIHBlZXIgY29ubmVjdHMgaGFuZGxlIGl0XG4gICAgICAgICAgICAgICAgdGhpcy5fcGVlci5vbignY29ubmVjdGlvbicsIChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBEb24ndCBhbGxvdyBtb3JlIHRoYW4gNCBwbGF5ZXJzXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLnNpemUgPj0gNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vbignb3BlbicsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJQZWVyIGhhcyBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXIgPSB0aGlzLmFkZFBlZXIoY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGVlcihjb25uZWN0aW9uKSB7XG4gICAgICAgIGxldCBwZWVyID0ge1xuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IGNvbm5lY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BlZXJzLnNldChjb25uZWN0aW9uLnBlZXIsIHBlZXIpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAgdGhpcy5oYW5kbGVEYXRhLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgY29ubmVjdFRvUGVlcihwZWVyKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcInBlZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5fbmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBlZXJzID0gW107XG4gICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy5rZXlzKCkpIHtcbiAgICAgICAgICAgIHBlZXJzLnB1c2gocGVlcik7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZS5kYXRhLnBlZXJzID0gcGVlcnM7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKGBTZW5kaW5nIHBlZXItY29ubmVjdCBtZXNzYWdlIHRvIHBlZXIgd2l0aCBpZCAke3BlZXJ9YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmhhc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGVlcihwZWVyKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIlJlbW92ZSBwZWVyXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWRpc2Nvbm5lY3RcIiwgcGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgICAgICB0aGlzLl9wZWVycy5kZWxldGUocGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgIH1cblxuICAgIGRpc2Nvbm5lY3QoKSB7XG4gICAgICAgIHRoaXMuX3BlZXIuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNlbmQgbWVzc2FnZSB0byBhbGwgcGVlcnNcbiAgICAgKi9cbiAgICBfc2VuZE1lc3NhZ2UobWVzc2FnZSkge1xuICAgICAgICBpZih0aGlzLl9wZWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIHRoaXMuX3BlZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwbGF5ZXJTdGF0ZShzdGF0ZSkge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItc3RhdGVcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHN0YXRlXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIG9wdGlvblNlbGVjdChvcHRpb24pIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwib3B0aW9uLXNlbGVjdFwiLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIFwib3B0aW9uXCI6IG9wdGlvblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NlbmRNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGEobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgLy8gR3JhYiBkYXRhIGZyb20gbWVzc2FnZVxuICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGVlci1jb25uZWN0XCIpIHtcbiAgICAgICAgICAgIC8vIFNlZSBpZiB0aGlzIHBlZXIga25vd3MgYWJvdXQgYW55IG90aGVyIHBlZXJzIGFuZCBhZGQgaWYgd2UgZG9uJ3Qga25vdyB0aGVtXG4gICAgICAgICAgICBmb3IobGV0IHBlZXIgb2YgZGF0YS5wZWVycykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9wZWVycy5nZXQocGVlcikgJiYgcGVlciAhPT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBBZGRpbmcgUGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdChwZWVyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBTZWUgaWYgd2UgaGF2ZSBhbHJlYWR5IGNvbm5lY3RlZCB0byB0aGlzIHBlZXJcbiAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pICYmICF0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKS5oYXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIodGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWNvbm5lY3RcIiwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGxheWVyLXN0YXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1zdGF0ZVwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcIm9wdGlvbi1zZWxlY3RcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCBtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBNdWx0aXBsYXllckNvbnRyb2xsZXIgZnJvbSAnLi4vY29udHJvbGxlcnMvTXVsdGlwbGF5ZXJDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIGluaXQodmlldykge1xuICAgICAgICB0aGlzLl92aWV3ID0gdmlldztcbiAgICAgICAgdGhpcy5yZWdpc3RlclZpZXdNZXNzYWdlcyh0aGlzLl92aWV3KTtcbiAgICB9XG5cbiAgICBpbml0TXVsdGlwbGF5ZXJHYW1lKG1lc3NhZ2UpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcbiAgICAgICAgLy8gQnVpbGQgYXJnc1xuICAgICAgICBpZihtZXNzYWdlLmhvc3RJZCkge1xuICAgICAgICAgICAgYXJncyA9IFttZXNzYWdlLm5hbWUsIG1lc3NhZ2UuaG9zdElkXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFyZ3MgPSBbbWVzc2FnZS5uYW1lXTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJbml0IG1wIGNvbnRyb2xsZXJcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDb250cm9sbGVyID0gbmV3IE11bHRpcGxheWVyQ29udHJvbGxlciguLi5hcmdzKTtcbiAgICAgICAgdGhpcy5fbXVsdGlwbGF5ZXJDb250cm9sbGVyLmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyTXVsdGlwbGF5ZXJFdmVudHModGhpcy5fbXVsdGlwbGF5ZXJDb250cm9sbGVyKTtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBBZGQgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJhZGQtbG9jYWwtcGxheWVyXCIsIHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX211bHRpcGxheWVyQ29udHJvbGxlci5pZCxcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogbWVzc2FnZS5uYW1lXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImdhbWUtc3RhdGVcIiwgXCJsb2JieVwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGVhdmVHYW1lKCkge1xuICAgICAgICB0aGlzLl9tdWx0aXBsYXllckNvbnRyb2xsZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB0aGlzLmVtaXQoXCJnYW1lLXN0YXRlXCIsIFwibWFpbiBtZW51XCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZ2V0IGEgcGVlciBjb25uZWN0IGV2ZW50IGZvcm0gdGhlIG11bHRpcGxheWVyIGNvbnRyb2xsZXIsIGNyZWF0ZSBhIGFkZCBwbGF5ZXIgZXZlbnRcbiAgICAgKi9cbiAgICBwZWVyQ29ubmVjdChtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IFBlZXIgQ29ubmVjdCBNZXNzYWdlXCIpO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBBZGQgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdChcImFkZC1yZW1vdGUtcGxheWVyXCIsIHtcbiAgICAgICAgICAgIFwiaWRcIjogbWVzc2FnZS5mcm9tLFxuICAgICAgICAgICAgXCJuYW1lXCI6IG1lc3NhZ2UuZGF0YS5uYW1lXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdoZW4gd2UgZ2V0IGEgcGVlciBkaXNjb25uZWN0IGV2ZW50IGZvcm0gdGhlIG11bHRpcGxheWVyIGNvbnRyb2xsZXIsIGNyZWF0ZSBhIHJlbW92ZSBwbGF5ZXIgZXZlbnRcbiAgICAgKi9cbiAgICBwZWVyRGlzY29ubmVjdChtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IFBlZXIgRGlzY29ubmVjdCBNZXNzYWdlXCIpO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRpc3BhdGNoZXI6IEJyb2FkY2FzdCBSZW1vdmUgUGxheWVyIE1lc3NhZ2VcIik7XG4gICAgICAgIHRoaXMuZW1pdChcInJlbW92ZS1wbGF5ZXJcIiwge1xuICAgICAgICAgICAgXCJpZFwiOiBtZXNzYWdlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGFsbCBtdWx0aXBsYXllciBFdmVudHNcbiAgICAgKi9cbiAgICByZWdpc3Rlck11bHRpcGxheWVyRXZlbnRzKG11bHRpcGxheWVyU2VydmljZSkge1xuICAgICAgICBtdWx0aXBsYXllclNlcnZpY2Uub24oXCJwZWVyLWNvbm5lY3RcIiwgICAgdGhpcy5wZWVyQ29ubmVjdC5iaW5kKHRoaXMpKTtcbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwicGVlci1kaXNjb25uZWN0XCIsIHRoaXMucGVlckRpc2Nvbm5lY3QuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwicGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicmVtb3RlLXBsYXllci1zdGF0ZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbXVsdGlwbGF5ZXJTZXJ2aWNlLm9uKFwib3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInJlbW90ZS1vcHRpb24tc2VsZWN0XCIsIG1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhbGwgdmlldyBtZXNzYWdlc1xuICAgICAqL1xuICAgIHJlZ2lzdGVyVmlld01lc3NhZ2VzKHZpZXcpIHtcbiAgICAgICAgdmlldy5vbihcInN0YXJ0LW1wXCIsIHRoaXMuaW5pdE11bHRpcGxheWVyR2FtZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdmlldy5vbihcImxlYXZlLWdhbWVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMubGVhdmVHYW1lKClcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5vbihcInJlYWR5XCIsIChyZWFkeSk9PntcbiAgICAgICAgICAgIGxldCBzdGF0ZSA9IHJlYWR5ID8gXCJyZWFkeVwiIDogXCJpZGxlXCI7XG4gICAgICAgICAgICB0aGlzLl9tdWx0aXBsYXllckNvbnRyb2xsZXIucGxheWVyU3RhdGUoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwibG9jYWwtcGxheWVyLXN0YXRlXCIsIHtcbiAgICAgICAgICAgICAgICBcInN0YXRlXCI6IHN0YXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmlldy5vbihcIm9wdGlvbi1zZWxlY3RcIiwgKG9wdGlvbik9PntcbiAgICAgICAgICAgIHRoaXMuX211bHRpcGxheWVyQ29udHJvbGxlci5vcHRpb25TZWxlY3Qob3B0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImxvY2FsLW9wdGlvbi1zZWxlY3RcIiwgb3B0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoZmlsbGFibGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICBzZXQgY3VycmVudFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIGlmKHRoaXMuX3N0YXRlcy5oYXMoc3RhdGUpKSB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJTRVQgU1RBVEUgVE8gU1RBVEVcIik7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldCBjdXJyZW50U3RhdGUoc3RhdGUpIHtcbiAgICAgICAgaWYodGhpcy5fc3RhdGVzLmhhcyhzdGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRTdGF0ZSA9IHN0YXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTtcbiAgICB9XG5cbiAgICBzZXJpYWxpemUoKSB7XG4gICAgICAgIGxldCBvYmogPSB7fTtcbiAgICAgICAgZm9yKGxldCBwcm9wIG9mIHRoaXMuX2ZpbGxhYmxlKSB7XG4gICAgICAgICAgICBvYmpbcHJvcF0gPSB0aGlzW3Byb3BdLnNlcmlhbGl6ZSA/IHRoaXNbcHJvcF0uc2VyaWFsaXplKCk6IHRoaXNbcHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgb2JqWydpc1Zpc2libGUnXSA9IHRoaXNbJ2lzVmlzaWJsZSddO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGRlc2VyaWFsaXplKGRhdGEpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiRGVzZXJpYWxpemVcIik7XG4gICAgICAgIExvZ2dlci5sb2coZGF0YSk7XG4gICAgICAgIGZvcihsZXQgcHJvcCBvZiB0aGlzLl9maWxsYWJsZSkge1xuICAgICAgICAgICAgdGhpc1twcm9wXSA9IGRhdGFbcHJvcF0gIT09IHVuZGVmaW5lZCA/IGRhdGFbcHJvcF0gOiB0aGlzW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IE1peGluc1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvZXZlbnRFbWl0dGVyJztcblxuLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICAgZnJvbSAnLi4vc2VydmljZXMvUm5nJztcblxuLy8gSW1wb3J0IE1vZGVsc1xuaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5pbXBvcnQgUGxheWVyICAgIGZyb20gJy4vb2JqZWN0cy9QbGF5ZXInO1xuaW1wb3J0IE1vbnN0ZXIgICBmcm9tICcuL29iamVjdHMvTW9uc3Rlcic7XG5pbXBvcnQgUm9vbSAgICAgIGZyb20gJy4vb2JqZWN0cy9Sb29tJztcbmltcG9ydCBNYWluTWVudSAgZnJvbSAnLi9vYmplY3RzL01haW5NZW51JztcbmltcG9ydCBMb2JieSAgICAgZnJvbSAnLi9vYmplY3RzL0xvYmJ5JztcbmltcG9ydCBVaSAgICAgICAgZnJvbSAnLi9vYmplY3RzL1VpJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgXCJtYWluIG1lbnVcIixcbiAgICAgICAgICAgIFwibG9iYnlcIixcbiAgICAgICAgICAgIFwicGxheWluZ1wiXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX21haW5NZW51ID0gbmV3IE1haW5NZW51KCk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ICAgID0gbmV3IExvYmJ5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdChkaXNwYXRjaGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9kaXNwYXRjaGVyID0gZGlzcGF0Y2hlcjtcblxuICAgICAgICAgICAgdGhpcy5fcGxheWVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX2xvY2FsUGxheWVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW90ZVBsYXllcnMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgIC8vIExJU1RFTiBGT1IgRVZFTlRTXG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvRGlzcGF0Y2hlcih0aGlzLl9kaXNwYXRjaGVyKTtcblxuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgZ2FtZSBzdGF0ZSBpZiBpdHMgYWxsb3dlZFxuICAgICAqIE1ha2Ugc3VyZSB3ZSBlbWl0IGl0XG4gICAgICovXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgICAgICBpZih0aGlzLl9jdXJyZW50U3RhdGUgPT0gXCJtYWluIG1lbnVcIikge1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGFsbCBwbGF5ZXJzXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVycyAgICAgICA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhbFBsYXllcnMgID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW90ZVBsYXllcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJnYW1lLXN0YXRlXCIsIHRoaXMuX2N1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDYWxsIHRoaXMgZnVuY3Rpb24gYWZ0ZXIgYW55IHBsYXllcnN0YWUgY2hhbmdlIHNvIHdlIGNhbiBkZWNpZGUgd2hhdCB0byBkby5cbiAgICAgKi9cbiAgICBjaGVja1BsYXllclN0YXRlKCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdGhlIGxvYnkgZGVjaWRlIGlmIHdlIG5lZWQgdG8gc3RhcnQgdGhlIGdhbWVcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgbGV0IHJlYWR5VG9TdGFydCA9IHRydWU7XG4gICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICByZWFkeVRvU3RhcnQgPSByZWFkeVRvU3RhcnQgJiYgcGxheWVyLmN1cnJlbnRTdGF0ZSA9PT0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiUGxheWVycyBhcmUgcmVhZHk/IFwiICsgcmVhZHlUb1N0YXJ0KTtcblxuICAgICAgICAgICAgaWYocmVhZHlUb1N0YXJ0KSB7XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmJhbm5lcihcIlNUQVJUSU5HIEdBTUVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhcnRQbGF5aW5nKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja1BsYXllckFjdGlvbigpIHtcbiAgICAgICAgaWYodGhpcy5jdXJyZW50U3RhdGUgPT09IFwicGxheWluZ1wiKSB7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09IFwiaWRsZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlYWR5VG9Nb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZHlUb01vdmUgPSByZWFkeVRvTW92ZSAmJiBwbGF5ZXIuY3VycmVudEFjdGlvbiA9PT0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHJlYWR5VG9Nb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gY3VycmVudCBzdGF0ZVxuICAgICAqL1xuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTt9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gbWFpbiBtZW51XG4gICAgICovXG4gICAgZ2V0IG1haW5NZW51KCkge3JldHVybiB0aGlzLl9tYWluTWVudTt9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gbG9iYnlcbiAgICAgKi9cbiAgICBnZXQgbG9iYnkoKSB7cmV0dXJuIHRoaXMuX2xvYmJ5O31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBwbGF5ZXJzXG4gICAgICovXG4gICAgZ2V0IHBsYXllcnMoKSB7cmV0dXJuIHRoaXMuX3BsYXllcnM7fVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIEN1cnJlbnQgUm9vbVxuICAgICAqL1xuICAgIGdldCByb29tKCkge3JldHVybiB0aGlzLl9yb29tO31cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBVaSBSb29tXG4gICAgICovXG4gICAgZ2V0IHVpKCkge3JldHVybiB0aGlzLl91aTt9XG5cbiAgICBfc3RhcnRNZW51KCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwibWFpbiBtZW51XCI7XG4gICAgfVxuXG4gICAgX3N0YXJ0TXVsdGlwbGF5ZXIoKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gXCJsb2JieVwiO1xuICAgIH1cblxuICAgIF9zdGFydFBsYXlpbmcoKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHJvb21cbiAgICAgICAgdGhpcy5fcm9vbSAgICAgICAgPSBuZXcgUm9vbSgpO1xuICAgICAgICB0aGlzLl91aSAgICAgICAgICA9IG5ldyBVaSgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwicGxheWluZ1wiO1xuICAgIH1cblxuICAgIF9sb29rRm9yVHJvdWJsZSgpIHtcbiAgICAgICAgLy8gU2V0IHJvb20gdG8gbW92aW5nXG4gICAgICAgIHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID0gXCJtb3ZpbmdcIjtcblxuICAgICAgICAvLyBTZXQgcGxheWVycyB0byB3YWxraW5nXG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwid2Fsa2luZ1wiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIGVuZW1pZXNcbiAgICAgICAgbGV0IGVuZW15ID0gbmV3IEVuZW15KCk7XG4gICAgICAgIHRoaXMuZW1pdChcImFkZC1lbmVteVwiLCBlbmVteSk7XG5cbiAgICAgICAgdGhpcy5fZW5lbWllcyA9IG5ldyBTZXRbXG4gICAgICAgICAgICBlbmVteVxuICAgICAgICBdO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0QmF0dGxlKCk7XG4gICAgICAgIH0sIDIwMDApO1xuICAgIH1cblxuICAgIF9zdGFydEJhdHRsZSgpIHtcbiAgICAgICAgdGhpcy5fcm9vbS5jdXJyZW50U3RhdGUgPSBcImJhdHRsZVwiO1xuICAgICAgICB0aGlzLl91aS5zZXRCYXR0bGVPcHRpb25zKCk7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSAgPSBcImlkbGVcIjtcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50QWN0aW9uID0gXCJhY3Rpb25cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbiB0byBldmVudHMgZnJvbSB0aGUgZGlzcGF0Y2hlciBhbmQgcmVzcG9uZCBhY29yZGluZ2x5XG4gICAgICovXG4gICAgbGlzdGVuVG9EaXNwYXRjaGVyKGRpc3BhdGNoZXIpIHtcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcInN0YXJ0LWdhbWVcIiwgdGhpcy5fc3RhcnRNZW51LmJpbmQodGhpcykpO1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwic3RhcnQtbXBcIiwgICB0aGlzLl9zdGFydE11bHRpcGxheWVyLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIExpc3RlbiB0byBnYW1lIHN0YXRlIGV2ZW50c1xuICAgICAgICBkaXNwYXRjaGVyLm9uKFwiZ2FtZS1zdGF0ZVwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gbWVzc2FnZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQWRkIHBsYXllciB3aGVuIHBlZXIgY29ubmVjdHNcbiAgICAgICAgZGlzcGF0Y2hlci5vbihcImFkZC1yZW1vdGUtcGxheWVyXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiR2FtZTogQWRkIFJlbW90ZSBQbGF5ZXIgbWVzc2FnZSByZWNpZXZlZFwiKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcihtZXNzYWdlLm5hbWUsIG1lc3NhZ2UuaWQpO1xuXG4gICAgICAgICAgICBwLmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRSZW1vdGVQbGF5ZXIocCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZGlzcGF0Y2hlci5vbihcImFkZC1sb2NhbC1wbGF5ZXJcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJHYW1lOiBBZGQgTG9jYWwgUGxheWVyIG1lc3NhZ2UgcmVjaWV2ZWRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBQbGF5ZXIobWVzc2FnZS5uYW1lLCBtZXNzYWdlLmlkKTtcblxuICAgICAgICAgICAgcC5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkTG9jYWxQbGF5ZXIocCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBwZWVycyBwbGF5ZXIgZnJvbSB0aGUgZ2FtZVxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwicmVtb3ZlLXBsYXllclwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkdhbWU6IFJlbW92ZSBQbGF5ZXIgbWVzc2FnZSByZWNpZXZlZFwiKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3BsYXllcnMuZGVsZXRlKG1lc3NhZ2UuaWQpO1xuICAgICAgICAgICAgdGhpcy5fbG9jYWxQbGF5ZXJzLmRlbGV0ZShtZXNzYWdlLmlkKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbW90ZVBsYXllcnMuZGVsZXRlKG1lc3NhZ2UuaWQpO1xuXG4gICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTeW5jIExvY2FsIFBsYXllciBzdGF0ZVxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwibG9jYWwtcGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiR2FtZTogTG9jYWwgUGxheWVyIFN0YXRlIG1lc3NhZ2UgcmVjaWV2ZWRcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9sb2NhbFBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gbWVzc2FnZS5zdGF0ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3MgR2FtZSBsb2dpYyBhY2NvcmlkbmcgdG8gcGxheWVyIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmNoZWNrUGxheWVyU3RhdGUoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3luYyBSZW1vdGUgUGxheWVyIHN0YXRlXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJyZW1vdGUtcGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiR2FtZTogUmVtb3RlIFBsYXllciBTdGF0ZSBtZXNzYWdlIHJlY2lldmVkXCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMuX3JlbW90ZVBsYXllcnMuZ2V0KG1lc3NhZ2UuaWQpO1xuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRTdGF0ZSA9IG1lc3NhZ2Uuc3RhdGU7XG5cbiAgICAgICAgICAgIC8vIFByb2dyZXNzIEdhbWUgbG9naWMgYWNjb3JpZG5nIHRvIHBsYXllciBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllclN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExpc3RlbiBmb3IgbG9jYWwgb3B0aW9uIHNlbGVjdFxuICAgICAgICAvLyBDSEFOR0UgVE8gUExBWUVSLUFDVElPTlxuICAgICAgICBkaXNwYXRjaGVyLm9uKFwibG9jYWwtb3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkdhbWU6IGxvY2FsLW9wdGlvbi1zZWxlY3RcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5fbG9jYWxQbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRBY3Rpb24gPSBtZXNzYWdlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jaGVja1BsYXllckFjdGlvbigpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBMaXN0ZW4gZm9yIHJlbW90ZSBvcHRpb24gc2VsZWN0XG4gICAgICAgIC8vIENIQU5HRSBUTyBQTEFZRVItQUNUSU9OXG4gICAgICAgIGRpc3BhdGNoZXIub24oXCJyZW1vdGUtb3B0aW9uLXNlbGVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLl9yZW1vdGVQbGF5ZXJzLmdldChtZXNzYWdlLmlkKTtcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50QWN0aW9uID0gbWVzc2FnZS5vcHRpb247XG4gICAgICAgICAgICB0aGlzLmNoZWNrUGxheWVyQWN0aW9uKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCBhIExvY2FsIFBsYXllclxuICAgICAqL1xuICAgIGFkZExvY2FsUGxheWVyKHApIHtcbiAgICAgICAgdGhpcy5fbG9jYWxQbGF5ZXJzLnNldChwLmlkLCBwKTtcbiAgICAgICAgdGhpcy5hZGRQbGF5ZXIocCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIGEgUmVtb3RlIFBsYXllclxuICAgICAqL1xuICAgIGFkZFJlbW90ZVBsYXllcihwKSB7XG4gICAgICAgIHRoaXMuX3JlbW90ZVBsYXllcnMuc2V0KHAuaWQsIHApO1xuICAgICAgICB0aGlzLmFkZFBsYXllcihwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgcGxheWVyIHJlZ2FyZGxlc3Mgb2YgcmVtb3RlIG9yIGxvY2FsXG4gICAgICovXG4gICAgYWRkUGxheWVyKHApIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiR2FtZTogQWRkaW5nIFBsYXllclwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhwKTtcbiAgICAgICAgbGV0IHBsYXllcnMgPSB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpO1xuICAgICAgICBsZXQgeVBvcyA9IC44O1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiBwbGF5ZXJzKSB7XG4gICAgICAgICAgICB5UG9zID0gcGxheWVyLnlQb3M7XG4gICAgICAgICAgICBwbGF5ZXIuY3VycmVudFN0YXRlID0gXCJpZGxlXCI7XG4gICAgICAgIH1cbiAgICAgICAgeVBvcyArPSAxLjI7XG4gICAgICAgIHAueVBvcyA9IHlQb3M7XG4gICAgICAgIHRoaXMuX3BsYXllcnMuc2V0KHAuaWQsIHApO1xuICAgICAgICB0aGlzLmVtaXQoXCJhZGQtcGxheWVyXCIsIHApO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgZnJvbSAnLi4vQmFzZU1vZGVsJzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlTW9kZWwge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtICUgWSBvZmZzZXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9jdXJyZW50T3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiU2VsZWN0IEpvYlwiLFxuICAgICAgICAgICAgXCJSZWFkeVwiLFxuICAgICAgICAgICAgXCJMZWF2ZVwiXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE9wdGlvbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJIb3N0IEdhbWVcIixcbiAgICAgICAgICAgIFwiSm9pbiBHYW1lXCJcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudE9wdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50T3B0aW9ucztcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBUWVBFX1dVUk0oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3d1cm0tc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnd3VybSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIHR5cGUpIHtcbiAgICAgICAgc3VwZXIoW10pO1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zO1xuICAgICAgICB0aGlzLnlwb3MgPSB5UG9zO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgICAgIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmxldCBGSUxMQUJMRSA9IG5ldyBTZXQoW1xuICAgIFwibmFtZVwiLFxuICAgIFwicmVhZHlcIixcbiAgICBcImlzV2Fsa2luZ1wiLFxuICAgIFwiam9iXCIsXG4gICAgXCJwb3NpdGlvblwiLFxuICAgIFwibWF4SGVhbHRoXCIsXG4gICAgXCJoZWFsdGhcIixcbiAgICBcIm1heE1hbmFcIixcbiAgICBcIm1hbmFcIixcbiAgICBcImFjdGlvblwiLFxuXSk7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VNb2RlbCB7XG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IEpPQl9DTEFJUlZPWUFOVCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnY2xhaXJ2b3lhbnQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnY2xhaXJ2b3lhbnQnLFxuICAgICAgICAgICAgJ2hlYWx0aCc6IDYwLFxuICAgICAgICAgICAgJ21hbmEnOiA0MCxcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdiYWNrJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfSEVSQkFMSVNUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdoZXJiYWxpc3Qtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2hlcmJhbGlzdCcsXG4gICAgICAgICAgICAnaGVhbHRoJzogNDAsXG4gICAgICAgICAgICAnbWFuYSc6IDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnYmFjaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX1ZJTExBSU4oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3ZpbGxhaW4yLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICd2aWxsYWluJyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA4MCxcbiAgICAgICAgICAgICdtYW5hJzogMjAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnZnJvbnQnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9LTklHSFQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2tuaWdodC1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAna25pZ2h0JyxcbiAgICAgICAgICAgICdoZWFsdGgnOiAxMDAsXG4gICAgICAgICAgICAnbWFuYSc6IDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnZnJvbnQnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9ORUNST01BTkNFUigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnbmVjcm9tYW5jZXItc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ25lY3JvbWFuY2VyJyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA0MCxcbiAgICAgICAgICAgICdtYW5hJzogMTIwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobmFtZSwgaWQpIHtcbiAgICAgICAgc3VwZXIoRklMTEFCTEUpO1xuICAgICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5faWQgPSBpZDtcblxuICAgICAgICB0aGlzLl9zdGF0ZXMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgIFwiaWRsZVwiLFxuICAgICAgICAgICAgXCJyZWFkeVwiLFxuICAgICAgICAgICAgXCJ3YWxraW5nXCIsXG4gICAgICAgICAgICBcImF0dGFja2luZ1wiXG4gICAgICAgIF0pO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuXG4gICAgICAgIHRoaXMuY3VycmVudEFjdGlvbiA9IFwidGhpbmtpbmdcIjtcblxuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IDEwMDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSAxMDA7XG5cbiAgICAgICAgdGhpcy5tYXhNYW5hID0gMTAwO1xuICAgICAgICB0aGlzLm1hbmEgPSAxMDA7XG4gICAgfVxuXG4gICAgc2V0IGN1cnJlbnRTdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaGFzKHN0YXRlKSkge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiU0VUIFNUQVRFIFRPIFNUQVRFXCIpO1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgY3VycmVudEFjdGlvbihhY3Rpb24pIHt0aGlzLl9jdXJyZW50QWN0aW9uID0gYWN0aW9uO31cblxuICAgIGdldCBjdXJyZW50U3RhdGUoKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRTdGF0ZTt9XG5cbiAgICBnZXQgY3VycmVudEFjdGlvbigpIHtyZXR1cm4gdGhpcy5fY3VycmVudEFjdGlvbjt9XG5cbiAgICBnZXQgbmFtZSgpIHtyZXR1cm4gdGhpcy5fbmFtZTt9XG5cbiAgICBnZXQgaWQoKSB7cmV0dXJuIHRoaXMuX2lkO31cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7XG5pbXBvcnQgTG9nZ2VyICAgIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmxldCBGSUxMQUJMRSA9IG5ldyBTZXQoW1xuICAgIFwiZW5lbWllc1wiLFxuICAgIFwidHlwZVwiLFxuICAgIFwiaXNNb3ZpbmdcIixcbiAgICBcImlzQmF0dGxlXCIsXG4gICAgXCJpc0xvb2tpbmdcIixcbiAgICBcIm5leHRFbmNvdW50ZXJcIixcbiAgICBcImVuY291bnRlclJhdGVcIixcbiAgICBcInRpY2tDb3VudFwiXG5dKTtcblxuY2xhc3MgUm9vbSBleHRlbmRzIEJhc2VNb2RlbCB7XG5cblxuICAgIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3RhdGVzID0gbmV3IFNldChbXG4gICAgICAgICAgICBcImlkbGVcIixcbiAgICAgICAgICAgIFwibW92aW5nXCIsXG4gICAgICAgICAgICBcImJhdHRsZVwiXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZSA9IFwiaWRsZVwiO1xuICAgIH1cblxuICAgIGxvb2tGb3JUcm91YmxlKCkge1xuICAgIH1cblxuICAgIHN0b3BMb29raW5nKCkge1xuICAgIH1cblxuICAgIGVuZEJhdHRsZSgpIHtcbiAgICB9XG5cbiAgICBzdGFydEJhdHRsZSgpIHtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvb207XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9iYXR0bGVPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJhdHRhY2tcIixcbiAgICAgICAgICAgIFwiYWJpbGl0eVwiLFxuICAgICAgICAgICAgXCJpdGVtXCIsXG4gICAgICAgICAgICBcImRlZmVuZFwiXG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5fcm9vbU9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcInJlYWR5XCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJtYW5hZ2VcIlxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fcm9vbU9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0IGN1cnJlbnRPcHRpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE9wdGlvbnM7XG4gICAgfVxuXG4gICAgc2V0QmF0dGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5fY3VycmVudE9wdGlvbnMgPSB0aGlzLl9iYXR0bGVPcHRpb25zO1xuICAgIH1cblxuICAgIHNldElkbGVPcHRpb24oKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRPcHRpb25zID0gdGhpcy5fcm9vbU9wdGlvbnM7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgaWQpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IG5ldyB3aW5kb3cua2V5cHJlc3MuTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hJbnB1dCh0aGlzLmxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICBhdHRhY2hJbnB1dChsaXN0ZW5lcikge1xuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJ1cFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJ1cFwiKSk7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImtcIiwgKCkgPT4gdGhpcy5lbWl0KFwidXBcIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImRvd25cIiwgKCkgPT4gdGhpcy5lbWl0KFwiZG93blwiKSk7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImpcIiwgKCkgPT4gdGhpcy5lbWl0KFwiZG93blwiKSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibGVmdFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJsZWZ0XCIpKTtcbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiaFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJsZWZ0XCIpKTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJyaWdodFwiLCAoKSA9PiB0aGlzLmVtaXQoXCJyaWdodFwiKSk7XG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImxcIiwgKCkgPT4gdGhpcy5lbWl0KFwicmlnaHRcIikpO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImVudGVyXCIsICgpPT4gdGhpcy5lbWl0KFwiY29uZmlybVwiKSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBiYW5uZXIobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnLnRvVXBwZXJDYXNlKCl9YCwgJ2ZvbnQtc2l6ZTogMzBweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlYnVnKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKGAlYyR7bXNnfWAsICdmb250LXNpemU6IDE1cHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2cobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyIGZyb20gJy4vTG9nZ2VyLmpzJztcblxubGV0IHJlc291cmNlRGlyID0gJy4vZGlzdC9yZXNvdXJjZXMvJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgc3RhdGljIGxvYWRJbWFnZShyZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXMoaW1nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltZy5zcmMgPSByZXNvdXJjZURpciArICdpbWFnZXMvJyArIHJlc291cmNlO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzZWVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUk5HIENSRUFURVwiKTtcbiAgICAgICAgdGhpcy5fcm5nID0gbmV3IFJORyhzZWVkKTtcbiAgICAgICAgd2luZG93LnJuZyA9IHRoaXMuX3JuZztcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm5nLnJhbmRvbSgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbGltaXRsb29wKGZuLCBmcHMpIHtcbiAgICAgICAgLy8gVXNlIHZhciB0aGVuID0gRGF0ZS5ub3coKTsgaWYgeW91XG4gICAgICAgIC8vIGRvbid0IGNhcmUgYWJvdXQgdGFyZ2V0dGluZyA8IElFOVxuICAgICAgICB2YXIgdGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGN1c3RvbSBmcHMsIG90aGVyd2lzZSBmYWxsYmFjayB0byA2MFxuICAgICAgICBmcHMgPSBmcHMgfHwgNjA7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG5cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG4gICAgICAgICAgICAvLyBhZ2FpbiwgRGF0ZS5ub3coKSBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGltZVxuICAgICAgICAgICAgICAgIC8vIG5vdyAtIChkZWx0YSAlIGludGVydmFsKSBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIGp1c3QgXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlbiA9IG5vdywgd2hpY2ggY2FuIGVuZCB1cCBsb3dlcmluZyBvdmVyYWxsIGZwc1xuICAgICAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBmblxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oMCkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXNwZWN0SGVpZ2h0Q2FsYyh3Mikge1xuICAgICAgICBsZXQgdzEgPSAxOTIwO1xuICAgICAgICBsZXQgaDEgPSAxMDgwO1xuICAgICAgICByZXR1cm4gaDEqdzIvdzE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlUXVlcnkoc2VhcmNoKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xuXG4gICAgICAgIHZhciBhcmdzUGFyc2VkID0ge307XG5cbiAgICAgICAgdmFyIGksIGFyZywga3ZwLCBrZXksIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaT0wOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGFyZy5pbmRleE9mKCc9JykpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRbZGVjb2RlVVJJQ29tcG9uZW50KGFyZykudHJpbSgpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGt2cCA9IGFyZy5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFswXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzFdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzUGFyc2VkO1xuICAgIH1cblxuICAgIC8vIEdvb2Rlbm91Z2ggVVVJRD9cbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNzI2OTA5L3JhbmRvbS1hbHBoYS1udW1lcmljLXN0cmluZy1pbi1qYXZhc2NyaXB0XG4gICAgcmFuZG9tU3RyaW5nKGxlbmd0aCwgY2hhcnMpIHtcbiAgICAgICAgaWYoIWNoYXJzKSB7XG4gICAgICAgICAgICBjaGFycyA9ICcwMTIzNDU2Nzg5YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlc3VsdCA9ICcnO1xuICAgICAgICBmb3IgKGxldCBpID0gbGVuZ3RoOyBpID4gMDsgLS1pKSByZXN1bHQgKz0gY2hhcnNbTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKGNoYXJzLmxlbmd0aCAtIDEpKV07XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcblxuLy8gSW1wb3J0IFNlcnZpY2VzXG5pbXBvcnQgSW5wdXRTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL0tleWJvYXJkSW5wdXRTZXJ2aWNlJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBMb2dnZXIgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuLy8gSW1wb3J0IHZpZXdzXG5pbXBvcnQgUGxheWVyVmlldyAgIGZyb20gJy4vUGxheWVyVmlldyc7XG5pbXBvcnQgRW5lbXlWaWV3ICAgIGZyb20gJy4vRW5lbXlWaWV3JztcbmltcG9ydCBSb29tVmlldyAgICAgZnJvbSAnLi9Sb29tVmlldyc7XG5pbXBvcnQgTWFpbk1lbnVWaWV3IGZyb20gJy4vTWFpbk1lbnVWaWV3JztcbmltcG9ydCBMb2JieVZpZXcgICAgZnJvbSAnLi9Mb2JieVZpZXcnO1xuaW1wb3J0IFVpVmlldyAgICAgICBmcm9tICcuL1VpVmlldyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuXG4gICAgICAgIHRoaXMuX3ZpZXdzID0gbmV3IFNldCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSBIYW5kbGVyXG4gICAgICogQHRvZG86IGRvZXMgdGhpcyBiZWxvbmcgaGVyZT9cbiAgICAgKi9cbiAgICByZXNpemUoKSB7XG4gICAgICAgIENvbmZpZy5jYWxjdWxhdGUoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaW5pdChnYW1lKSB7XG4gICAgICAgIHRoaXMuX2dhbWUgPSBnYW1lO1xuXG4gICAgICAgIHRoaXMuX2lucHV0U2VydmljZSA9IG5ldyBJbnB1dFNlcnZpY2UoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX2N0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy8gQXR0YWNoIHJlc2l6ZSBldmVudFxuICAgICAgICAvL3dpbmRvdy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICB0aGlzLmxpc3RlblRvR2FtZUV2ZW50cyh0aGlzLl9nYW1lKTtcbiAgICAgICAgdGhpcy5yZWdpc3RlcklucHV0SGFuZGxlcnModGhpcy5faW5wdXRTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vY29kZXRoZW9yeS5pbi9jb250cm9sbGluZy10aGUtZnJhbWUtcmF0ZS13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XG5cbiAgICAgICAgLy8gSWYgdGhlIGZwcyBpbnRlcnZhbCBpcyBjb3JyZWN0XG4gICAgICAgIGlmIChkZWx0YSA+IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aW1lIHNpbmNlIGxhc3QgZnJhbWVcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChkZWx0YSAlIHRoaXMuaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdXAgUmVuZGVyaW5nXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHRoaXMuX2ZyYW1lIHx8IDE7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9ICh0aGlzLl9mcmFtZSVDb25maWcuRlBTKSA/IHRoaXMuX2ZyYW1lIDogMTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIGdhbWVcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKHRoaXMuX2ZyYW1lKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG5leHQgcmVuZGVyIGN5Y2xlXG4gICAgICAgICAgICBsZXQgdGltZV9lbCA9ICh0aGlzLnRoZW4gLSB0aGlzLmZpcnN0KS8xMDAwO1xuICAgICAgICAgICAgKyt0aGlzLmNvdW50ZXI7XG4gICAgICAgICAgICBsZXQgZnBzID0gcGFyc2VJbnQodGhpcy5jb3VudGVyL3RpbWVfZWwpO1xuXG4gICAgICAgICAgICAvLyBTaG93IEZQU1xuICAgICAgICAgICAgbGV0IGZvbnRTaXplICAgICAgICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KHRoaXMuX2ZyYW1lICsgXCIvXCIgKyBDb25maWcuRlBTICsgXCIgXCIgKyBmcHMgKyBcImZwc1wiLCAyMCwgMjApO1xuXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgRnJhbWVcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoZnJhbWUpIHtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoICAgICAgICAgICAgICA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgICAgICAgICAgICAgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICBmb3IobGV0IHZpZXcgb2YgdGhpcy5fdmlld3MpICB7XG4gICAgICAgICAgICB2aWV3LnJlbmRlcih0aGlzLl9jdHgsIGZyYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldE1haW5NZW51Vmlld3MoKSB7XG4gICAgICAgIGxldCB2aWV3cyA9IFtdO1xuXG4gICAgICAgIGlmKHRoaXMuX21haW5NZW51Vmlldykge1xuICAgICAgICAgICAgdmlld3MucHVzaCh0aGlzLl9tYWluTWVudVZpZXcpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHZpZXdzO1xuICAgIH1cblxuICAgIHN0YXJ0UmVuZGVyKCkge1xuICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLl9yZW5kZXJpbmcgPSB0cnVlO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTGlzdGVuIGZvciBnYW1lIGV2ZW50cyBzbyB3ZSBjYW4gYWRqdXN0IHJlbmRlcmVyXG4gICAgICovXG4gICAgbGlzdGVuVG9HYW1lRXZlbnRzKGdhbWUpIHtcbiAgICAgICAgZ2FtZS5vbihcImdhbWUtc3RhdGVcIiwgKG1lc3NhZ2UpPT4ge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVmlldyBHYW1lIFN0YXRlIEV2ZW50XCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIGlmKG1lc3NhZ2UgPT0gXCJtYWluIG1lbnVcIikge1xuICAgICAgICAgICAgICAgIC8vIElmIHdlIGFyZW4ndCByZW5kZXJpbmcgdGhlbiBzdGFydFxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9yZW5kZXJpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFJlbmRlcigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgbWFpbk1lbnVWaWV3ID0gbmV3IE1haW5NZW51VmlldyhnYW1lLm1haW5NZW51LCB0aGlzKTtcbiAgICAgICAgICAgICAgICBtYWluTWVudVZpZXcuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3ID0gbWFpbk1lbnVWaWV3O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl92aWV3cyA9IG5ldyBTZXQoW3RoaXMuX21haW5NZW51Vmlld10pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtZXNzYWdlID09IFwibG9iYnlcIikge1xuICAgICAgICAgICAgICAgIGxldCBsb2JieVZpZXcgPSBuZXcgTG9iYnlWaWV3KGdhbWUubG9iYnksIGdhbWUucGxheWVycywgdGhpcyk7XG4gICAgICAgICAgICAgICAgbG9iYnlWaWV3LmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5VmlldyA9IGxvYmJ5VmlldztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmlld3MgPSBuZXcgU2V0KFt0aGlzLl9sb2JieVZpZXddKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihtZXNzYWdlID09IFwicGxheWluZ1wiKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHJvb20gdmlld1xuICAgICAgICAgICAgICAgIGxldCByb29tVmlldyA9IG5ldyBSb29tVmlldyhnYW1lLnJvb20pO1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jvb21WaWV3ID0gcm9vbVZpZXc7XG5cbiAgICAgICAgICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXG4gICAgICAgICAgICAgICAgICAgIHJvb21WaWV3LmxvYWRSZXNvdXJjZXMoKVxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBsZXQgdmlld3MgPSBbXTtcblxuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhbGwgb2Ygb3VyIHBsYXllciB2aWV3c1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllclZpZXdzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIGdhbWUucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyVmlldyA9IG5ldyBQbGF5ZXJWaWV3KHBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2gocGxheWVyVmlldy5sb2FkUmVzb3VyY2VzKCkpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3cy5wdXNoKHBsYXllclZpZXcpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXJWaWV3cy5zZXQocGxheWVyLmlkLCBwbGF5ZXJWaWV3KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgdWlWaWV3ID0gbmV3IFVpVmlldyhnYW1lLnVpLCBnYW1lLnBsYXllcnMsIHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldyA9IHVpVmlldztcblxuICAgICAgICAgICAgICAgIHByb21pc2VzLnB1c2godWlWaWV3LmxvYWRSZXNvdXJjZXMoKSk7XG5cbiAgICAgICAgICAgICAgICAvLyBBZnRlciBhbGwgcmVuZGVyZXJzIGFyZSByZWFkeSBsZXQgdGhlIGRpc3BhdGNoZXIga25vd1xuICAgICAgICAgICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZpZXdzID0gW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcm9vbVZpZXcsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi52aWV3cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlld1xuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoXCJyZW5kZXItcmVhZHlcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJhZGQtcGxheWVyXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICAgICAgaWYoZ2FtZS5jdXJyZW50U3RhdGUgPT09IFwibG9ieVwiKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2JieVZpZXcuX3JlYWR5ID0gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdhbWUub24oXCJhZGQtZW5lbXlcIiwgKGVuZW15KT0+e1xuICAgICAgICB9KTtcblxuICAgICAgICBnYW1lLm9uKFwic2V0LXJvb21cIiwgKHJvb20pPT57XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGlucHV0IHRvIGFsdGVyIHZpZXcgYW5kIHNlZSBpZiB3ZSBuZWVkIHRvIHNlbmQgZW52ZW50c1xuICAgICAqL1xuICAgIHJlZ2lzdGVySW5wdXRIYW5kbGVycyhpbnB1dCkge1xuICAgICAgICAvLyBVcCBpbnB1dFxuICAgICAgICBpbnB1dC5vbihcInVwXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcudXAoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LnVwKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBEb3duIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiZG93blwiLCAoKT0+e1xuICAgICAgICAgICAgbGV0IGdhbWVTdGF0ZSA9IHRoaXMuX2dhbWUuY3VycmVudFN0YXRlO1xuICAgICAgICAgICAgc3dpdGNoKGdhbWVTdGF0ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJtYWluIG1lbnVcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFpbk1lbnVWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdWlWaWV3LmRvd24oKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIExlZnQgSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJsZWZ0XCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5sZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5sZWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSaWdodCBJbnB1dFxuICAgICAgICBpbnB1dC5vbihcInJpZ2h0XCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5yaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWluZ1wiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl91aVZpZXcucmlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENvbmZpcm0gSW5wdXRcbiAgICAgICAgaW5wdXQub24oXCJjb25maXJtXCIsICgpPT57XG4gICAgICAgICAgICBsZXQgZ2FtZVN0YXRlID0gdGhpcy5fZ2FtZS5jdXJyZW50U3RhdGU7XG4gICAgICAgICAgICBzd2l0Y2goZ2FtZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBcIm1haW4gbWVudVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYWluTWVudVZpZXcuY29uZmlybSh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxvYmJ5XCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvYmJ5Vmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5aW5nXCI6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3VpVmlldy5jb25maXJtKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBCYWNrIElucHV0XG4gICAgICAgIGlucHV0Lm9uKFwiYmFja1wiLCAoKT0+e1xuXG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IobW9uc3Rlcikge1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuX21vbnN0ZXIgPSBtb25zdGVyO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpdGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IHRoaXMuX21vbnN0ZXIudHlwZS5zcHJpdGUsXG4gICAgICAgICAgICB9XG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc3ByaXRlLFxuICAgICAgICAgICAgc3ByaXRlLndpZHRoLzMqdGhpcy5mcmFtZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIDEwLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8zKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0VmlldyAgICAgIGZyb20gJy4vT2JqZWN0Vmlldyc7XG5pbXBvcnQgVXRpbHMgICAgICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSZXNyb3VjZVNlcnZpY2UgZnJvbSAnLi4vc2VydmljZXMvUmVzb3VyY2VTZXJ2aWNlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcihsb2JieSwgcGxheWVycywgdmlldykge1xuICAgICAgICBzdXBlcihsb2JieSk7XG4gICAgICAgIHRoaXMuX2xvYmJ5ID0gbG9iYnk7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLl9wbGF5ZXJzID0gcGxheWVycztcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIHRoaXMuX3JlYWR5ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeFBvcyA9IDEwMDtcbiAgICAgICAgbGV0IHlQb3MgPSAxMDA7XG5cbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiTkFNRTpcIiwgMTAwLCB5UG9zKTtcbiAgICAgICAgY3R4LmZpbGxUZXh0KFwiSk9COlwiLCAzMDAsIHlQb3MpO1xuICAgICAgICBjdHguZmlsbFRleHQoXCJSRUFEWTpcIiwgNTAwLCB5UG9zKTtcbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoOTAsIDExMCwgNjAwLCAxODApO1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgeVBvcyArPSA0MDtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChwbGF5ZXIubmFtZSwgMTAwLCB5UG9zKTtcbiAgICAgICAgICAgIGlmKHBsYXllci5jdXJyZW50U3RhdGUgPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiMwMGZmMDBcIjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFRleHQoXCJSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgICA9IFwiI2ZmMDAwMFwiO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dChcIk5PVCBSRUFEWVwiLCA1MDAsIHlQb3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgICAgPSBcIiNmZmZmZmZcIjtcbiAgICAgICAgZm9yKGxldCBtZW51T3B0aW9uIG9mIHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zKSB7XG4gICAgICAgICAgICBsZXQgbWVudU9wdGlvblRleHQgPSBtZW51T3B0aW9uO1xuXG4gICAgICAgICAgICAvLyBTaG93IHNlbGVjdCBjdXJzb3JcbiAgICAgICAgICAgIGlmKG1lbnVPcHRpb25UZXh0ID09IHRoaXMuX2xvYmJ5LmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKVxuICAgICAgICAgICAgICAgIG1lbnVPcHRpb25UZXh0ID0gXCI+IFwiICsgbWVudU9wdGlvblRleHQ7XG5cbiAgICAgICAgICAgIC8vIERyYXcgTWVudSBPcHRpb25cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dChtZW51T3B0aW9uVGV4dCwgeFBvcywgMzIwKTtcbiAgICAgICAgICAgIHhQb3MgKz0gMjAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbG9iYnkuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF07XG4gICAgfVxuXG4gICAgbGVmdCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAwKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgtLTtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXgrKztcbiAgICB9XG5cbiAgICBjb25maXJtKCkge1xuICAgICAgICBpZih0aGlzLnNlbGVjdGVkT3B0aW9uID09IFwiTGVhdmVcIikge1xuICAgICAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwibGVhdmUtZ2FtZVwiKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXMuc2VsZWN0ZWRPcHRpb24gPT0gXCJSZWFkeVwiKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWFkeSA9ICF0aGlzLl9yZWFkeTtcbiAgICAgICAgICAgIHRoaXMuX3ZpZXcuZW1pdChcInJlYWR5XCIsIHRoaXMuX3JlYWR5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJhY2soKSB7XG4gICAgfVxuXG5cblxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5cbmxldCBob3N0RGlhbG9nID0gYFxuICAgIDxkaXYgY2xhc3M9XCJkaWFsb2dcIj5cbiAgICAgICAgPGgzPkhvc3QgTXVsdGlwbGF5ZXIgR2FtZTwvaDM+XG4gICAgICAgIDxsYWJlbD5OYW1lOiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwibmFtZVwiPlxuICAgICAgICA8bGFiZWw+SWQgKG9wdGlvbmFsKTo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaWRcIj48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImhvc3RcIiBkaXNhYmxlZD5Ib3N0PC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxubGV0IGpvaW5EaWFsb2cgPSBgXG4gICAgPGRpdiBjbGFzcz1cImRpYWxvZ1wiPlxuICAgICAgICA8aDM+Sm9pbiBNdWx0aXBsYXllciBHYW1lPC9oMz5cbiAgICAgICAgPGxhYmVsPk5hbWU6IDwvbGFiZWw+XG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIG5hbWU9XCJuYW1lXCI+XG4gICAgICAgIDxsYWJlbD5Ib3N0IElkOiA8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaG9zdFwiPlxuICAgICAgICA8bGFiZWw+SWQgKG9wdGlvbmFsKTo8L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiaWRcIj48YnI+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImpvaW5cIiBkaXNhYmxlZD5Kb2luPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gbmFtZT1cImNhbmNlbFwiPkNhbmNlbDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3RvcihtYWluTWVudSwgdmlldykge1xuICAgICAgICBzdXBlcihtYWluTWVudSk7XG4gICAgICAgIHRoaXMuX21haW5NZW51ID0gbWFpbk1lbnU7XG4gICAgICAgIHRoaXMuX3ZpZXcgPSB2aWV3O1xuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5fZGlhbG9nT3BlbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgIGxldCB4UG9zID0gMTAwO1xuICAgICAgICBsZXQgeVBvcyA9IDEwMDtcblxuICAgICAgICBmb3IobGV0IG1lbnVPcHRpb24gb2YgdGhpcy5fbWFpbk1lbnUuY3VycmVudE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGxldCBtZW51T3B0aW9uVGV4dCA9IG1lbnVPcHRpb247XG5cbiAgICAgICAgICAgIC8vIFNob3cgc2VsZWN0IGN1cnNvclxuICAgICAgICAgICAgaWYobWVudU9wdGlvblRleHQgPT0gdGhpcy5fbWFpbk1lbnUuY3VycmVudE9wdGlvbnNbdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleF0pXG4gICAgICAgICAgICAgICAgbWVudU9wdGlvblRleHQgPSBcIj4gXCIgKyBtZW51T3B0aW9uVGV4dDtcblxuICAgICAgICAgICAgLy8gRHJhdyBNZW51IE9wdGlvblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KG1lbnVPcHRpb25UZXh0LCAxMDAsIHlQb3MpO1xuICAgICAgICAgICAgeVBvcyArPSAxMDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgc2VsZWN0ZWRPcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYWluTWVudS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XTtcbiAgICB9XG5cbiAgICBvcGVuSG9zdERpYWxvZyh2aWV3KSB7XG4gICAgICAgIGxldCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcbiAgICAgICAgbGV0IGRvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaG9zdERpYWxvZywgXCJ0ZXh0L2h0bWxcIik7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZG9jLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgbGV0IGhvc3RCdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJob3N0XCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IG5hbWVJbnB1dCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cIm5hbWVcIl0nKTtcbiAgICAgICAgbGV0IGlkSW5wdXQgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImlkXCJdJyk7XG5cbiAgICAgICAgdmlldy5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICBuYW1lSW5wdXQub25pbnB1dCA9ICgpPT57XG4gICAgICAgICAgICBpZihuYW1lSW5wdXQudmFsdWUudHJpbSgpICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgaG9zdEJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaG9zdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBob3N0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmVtaXQoXCJzdGFydC1tcFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lSW5wdXQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaWRJbnB1dC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgb3BlbkpvaW5EaWFsb2codmlldykge1xuICAgICAgICBsZXQgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgICAgIGxldCBkb2MgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGpvaW5EaWFsb2csIFwidGV4dC9odG1sXCIpO1xuICAgICAgICBsZXQgZWxlbWVudCA9IGRvYy5maXJzdENoaWxkO1xuXG5cbiAgICAgICAgbGV0IGpvaW5CdXR0b24gICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignYnV0dG9uW25hbWU9XCJqb2luXCJdJyk7XG4gICAgICAgIGxldCBjYW5jZWxCdXR0b24gPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbltuYW1lPVwiY2FuY2VsXCJdJyk7XG5cbiAgICAgICAgbGV0IG5hbWVJbnB1dCAgID0gZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwibmFtZVwiXScpO1xuICAgICAgICBsZXQgaG9zdElucHV0ICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJob3N0XCJdJyk7XG4gICAgICAgIGxldCBpZElucHV0ICAgICA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImlkXCJdJyk7XG5cbiAgICAgICAgdmlldy5fZWxlbWVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcblxuICAgICAgICBsZXQgY2hlY2tJbnB1dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSAmJiBob3N0SW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgam9pbkJ1dHRvbi5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgam9pbkJ1dHRvbi5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbmFtZUlucHV0Lm9uaW5wdXQgPSBjaGVja0lucHV0LmJpbmQodGhpcyk7XG4gICAgICAgIGhvc3RJbnB1dC5vbmlucHV0ID0gY2hlY2tJbnB1dC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGNhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZyA9IGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBqb2luQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5fZGlhbG9nLmNvbmZpcm0oKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fZGlhbG9nID0ge1xuICAgICAgICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlybTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYobmFtZUlucHV0LnZhbHVlLnRyaW0oKSAmJiBob3N0SW5wdXQudmFsdWUudHJpbSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZW1pdChcInN0YXJ0LW1wXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWVJbnB1dC52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGhvc3RJZDogaG9zdElucHV0LnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGlkSW5wdXQudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHVwKCkge1xuICAgICAgICBpZighdGhpcy5fZGlhbG9nKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPyAwIDogMTtcbiAgICB9XG5cbiAgICBkb3duKCkge1xuICAgICAgICB0aGlzLnVwKCk7XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgaWYoIXRoaXMuX2RpYWxvZykge1xuICAgICAgICAgICAgaWYodGhpcy5zZWxlY3RlZE9wdGlvbiA9PSBcIkhvc3QgR2FtZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSG9zdERpYWxvZyh0aGlzLl92aWV3KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuSm9pbkRpYWxvZyh0aGlzLl92aWV3KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2RpYWxvZy5jb25maXJtKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiYWNrKCkge1xuICAgICAgICB0aGlzLmNsb3NlRGlhbG9nKCk7XG4gICAgfVxuXG5cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHRoaXMuX29iamVjdCA9IG9iamVjdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkcyB0aGUgcmVzb3VyY2UgYnkgZmlsZW5hbWVcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKi9cbiAgICBsb2FkUmVzb3VyY2UobmFtZSwgcmVzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgcmVzb3VyY2UgbG9hZGVkOiAke3Jlc291cmNlfWApO1xuICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGltZy5zcmMgPSAnLi9kaXN0L3Jlc291cmNlcy9pbWFnZXMvJyArIHJlc291cmNlO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIHRoZSBmaXJzdCByZXNvdXJjZSBjcmVhdGUgaXRcbiAgICAgICAgICAgIGlmKCF0aGlzLl9yZXNvdXJjZXMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuc2V0KG5hbWUsIGltZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgYWxsIHJlc291cmNlcyBhc3NvY2lhdGVkIHdpdGggdGhpcyBvYmplY3RcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICBsZXQgcmVzb3VyY2VQcm9taXNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yKGxldCBpbWFnZSBvZiB0aGlzLl9pbWFnZXMpIHtcbiAgICAgICAgICAgICAgICBSZXNvdXJjZVNlcnZpY2UubG9hZEltYWdlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgUHJvbWlzZS5hbGwocmVzb3VyY2VQcm9taXNlcykudGhlbigoaW1hZ2VzKT0+e1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgaW1hZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9yZXNvdXJjZXMpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMgPSBuZXcgTWFwKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gUmVzb2x2ZSBQcm9taXNlXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzICAgICAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUmVzcm91Y2VTZXJ2aWNlIGZyb20gJy4uL3NlcnZpY2VzL1Jlc291cmNlU2VydmljZSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgICAgIHN1cGVyKHBsYXllcik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVklFV1wiKTtcbiAgICAgICAgY29uc29sZS5sb2cocGxheWVyKTtcbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJzcHJpdGVcIixcbiAgICAgICAgICAgICAgICBcImltYWdlXCI6IFwibmVjcm9tYW5jZXItc2hlZXQucG5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcInNoYWRvd1wiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJzaGFkb3cucG5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImJ1YmJsZVwiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJidWJibGUucG5nXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdXG4gICAgICAgIGZvcihsZXQgaW1hZ2Ugb2YgdGhpcy5faW1hZ2VzKSB7XG4gICAgICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubG9hZFJlc291cmNlKGltYWdlLm5hbWUsIGltYWdlLmltYWdlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgbGV0IHBsYXllcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgbGV0IHhPZmZzZXQgPSBDb25maWcuVElMRV9YIC0gMztcbiAgICAgICAgaWYodGhpcy5fcGxheWVyLnBvc2l0aW9uID09IFwiYmFja1wiKSB7XG4gICAgICAgICAgICB4T2Zmc2V0Kys7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hhZG93ICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzaGFkb3cnKTtcblxuICAgICAgICBsZXQgYnViYmxlICAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyk7XG4gICAgICAgIGxldCBidWJibGVXaWR0aCAgPSBidWJibGUud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgbGV0IGJ1YmJsZUhlaWdodCA9IGJ1YmJsZS5oZWlnaHQvNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIC8vIERyYXcgU2hhZG93XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc2hhZG93LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRXaWR0aFxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIHBsYXllciBYIFBvc1xuICAgICAgICAgICAgdGhpcy5fcGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSArIChwbGF5ZXJXaWR0aCkgLSAoQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzaGFkb3cnKS5oZWlnaHQvMS43NSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIHBsYXllciBZIFBvc1xuICAgICAgICAgICAgcGxheWVyV2lkdGgsIC8vIHNXaWR0aFxuICAgICAgICAgICAgcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cblxuICAgICAgICAvLyBEcmF3IFBsYXllciBTcHJpdGVcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKSxcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci5jdXJyZW50U3RhdGUgPT09IFwid2Fsa2luZ1wiID8gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKSA6IDAsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMuX3BsYXllci55UG9zKihwbGF5ZXJXaWR0aCksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgcGxheWVyV2lkdGgsIC8vIHNXaWR0aFxuICAgICAgICAgICAgcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gRHJhdyBCdWJibGVcbiAgICAgICAgbGV0IGJ1YmJsZU9mZnNldCA9IDA7XG4gICAgICAgIHN3aXRjaCh0aGlzLl9wbGF5ZXIuY3VycmVudEFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcInRoaW5raW5nXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhdHRhY2tcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZGVmZW5kXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiaXRlbVwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSozO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImFiaWxpdHlcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqNDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuX3BsYXllci5jdXJyZW50QWN0aW9uICE9PSBcIndhbGtcIiAmJiB0aGlzLl9wbGF5ZXIuY3VycmVudEFjdGlvbiAhPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCwgLy8gRFlcbiAgICAgICAgICAgICAgICBidWJibGUud2lkdGgsICAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGUuaGVpZ2h0LzUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCkgLSAoYnViYmxlV2lkdGgvMS41KSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSAtIChidWJibGVIZWlnaHQvMS41KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAgICAgYnViYmxlV2lkdGgsICAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGVIZWlnaHQgIC8vIHNIZWlnaHRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFZpZXcgICAgICBmcm9tICcuL09iamVjdFZpZXcnO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuLy8gU3RhdGljIFJvb20gVHlwZXNcbi8vc3RhdGljIGdldCBUWVBFX0NBVkUoKSB7XG4gICAgLy9yZXR1cm4ge1xuICAgICAgICAvL2Zsb29yOiAnZ29vZHRpbGUucG5nJyxcbiAgICAgICAgLy93YWxsOiAnc2hpdHdhbGwucG5nJ1xuICAgIC8vfTtcbi8vfVxuXG4vL3N0YXRpYyBnZXQgVFlQRV9URU1QTEUoKSB7XG4gICAgLy9yZXR1cm4ge1xuICAgICAgICAvL2Zsb29yOiAnZ3Jhc3MucG5nJyxcbiAgICAgICAgLy93YWxsOiAncGlsbGFycy5wbmcnXG4gICAgLy99O1xuLy99XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgT2JqZWN0VmlldyB7XG4gICAgY29uc3RydWN0b3Iocm9vbSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9yb29tID0gcm9vbTtcbiAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgPSAwO1xuICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICA9IDA7XG5cbiAgICAgICAgdGhpcy5faW1hZ2VzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcImZsb29yXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcImdvb2R0aWxlLnBuZ1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJ3YWxsXCIsXG4gICAgICAgICAgICAgICAgXCJpbWFnZVwiOiBcInNoaXR3YWxsLnBuZ1wiLFxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGxvYWRSZXNvdXJjZXMoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcImZsb29yXCIsIFwiZ29vZHRpbGUucG5nXCIpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoXCJ3YWxsXCIsICBcInNoaXR3YWxsLnBuZ1wiKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTJTIpID8gMCA6IDE7XG4gICAgICAgIHRoaXMuZnJhbWUgPSBmcmFtZSUyO1xuXG4gICAgICAgIC8vIFJlbmRlciBGbG9vclxuICAgICAgICBsZXQgZmxvb3IgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdmbG9vcicpO1xuICAgICAgICBsZXQgZmxvb3JXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLlRJTEVfWCsxOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBDb25maWcuVElMRV9ZIC0gNDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgICAgIGZsb29yLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKyBmbG9vcldpZHRoKnggLSBmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICAoeSsyKSpmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSZW5kZXIgV2FsbFxuICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKTtcbiAgICAgICAgbGV0IHdhbGxXaWR0aCA9IHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHdhbGxXaWR0aCkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHdhbGwsXG4gICAgICAgICAgICAgICAgMCwgLy8gRFhcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yKnRoaXMuZnJhbWUsIC8vRFlcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArIHdhbGxXaWR0aCp4IC0gd2FsbFdpZHRoLCAvL3N4XG4gICAgICAgICAgICAgICAgMCwgLy9zeVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFLzJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIE9mZnNldHNcbiAgICAgICAgbGV0IHhTdGVwID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgIGlmKHRoaXMuX3Jvb20uY3VycmVudFN0YXRlID09IFwibW92aW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fZmxvb3JPZmZzZXQgPj0gZmxvb3JXaWR0aCAtIDEpIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcblxuICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX3dhbGxPZmZzZXQgPiB3YWxsV2lkdGggLSAxKSB0aGlzLl93YWxsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBPYmplY3RWaWV3ICAgICAgZnJvbSAnLi9PYmplY3RWaWV3JztcbmltcG9ydCBMb2dnZXIgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBPYmplY3RWaWV3IHtcbiAgICBjb25zdHJ1Y3Rvcih1aSwgcGxheWVycywgdmlldykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl91aSAgICAgICAgID0gdWk7XG4gICAgICAgIHRoaXMuX3ZpZXcgICAgICAgPSB2aWV3O1xuICAgICAgICB0aGlzLl9wbGF5ZXJzICAgID0gcGxheWVycztcblxuICAgICAgICBMb2dnZXIuZGVidWcoXCJVSSBQTEFZRVJTXCIpO1xuICAgICAgICBMb2dnZXIubG9nKHRoaXMuX3BsYXllcnMpO1xuXG4gICAgICAgIHRoaXMuX3RpbGVIZWlnaHQgPSAyO1xuXG4gICAgICAgIHRoaXMuX2ltYWdlcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCJiZ1wiLFxuICAgICAgICAgICAgICAgIFwiaW1hZ2VcIjogXCJ1aS1iZy5wbmdcIixcbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBsb2FkUmVzb3VyY2VzKCkge1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXVxuICAgICAgICBmb3IobGV0IGltYWdlIG9mIHRoaXMuX2ltYWdlcykge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLmxvYWRSZXNvdXJjZShpbWFnZS5uYW1lLCBpbWFnZS5pbWFnZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcyk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIGxldCB5UG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBEcmF3IEJhY2tncm91bmRcbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHlQb3MsXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodCAtIDMwMFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCB1aVJlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgeVBvcyxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC4uLmJnUmVjdCk7XG5cbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwiIzY0QTM1N1wiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwiIzAwMzcwMFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3QoLi4udWlSZWN0KTtcblxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM4RDgwNDVcIjtcblxuICAgICAgICAvLyBUaGUgc3Ryb2tlIGlzIG1pZGRsZSBhbGlnbmVkIHdpdGggdGhlIGVkZ2VzIG9mIHRoZSBib3hcbiAgICAgICAgbGV0IGxpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzMyO1xuICAgICAgICAvL2xldCBsaW5lV2lkdGggPSA1O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIGxldCBzdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIHN0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICBzdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMTtcbiAgICAgICAgbGV0IHBhdGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuX3Jlc291cmNlcy5nZXQoXCJiZ1wiKSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG4gICAgICAgIHlQb3MgKz0gQ29uZmlnLlRJTEVfU0laRS8zO1xuXG4gICAgICAgIGxldCBmb250U2l6ZSAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG5cbiAgICAgICAgbGV0IHhQb3MgPSBDb25maWcuVElMRV9TSVpFKjEuMjtcblxuICAgICAgICAvLyBEcmF3IEluZm9cbiAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgIGAke3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMCA/IFwiPlwiIDogXCJcIn1gICsgdGhpcy5fdWkuY3VycmVudE9wdGlvbnNbMF0sXG4gICAgICAgICAgICB4UG9zLFxuICAgICAgICAgICAgeVBvc1xuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgYCR7dGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxID8gXCI+XCIgOiBcIlwifWAgKyB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1sxXSxcbiAgICAgICAgICAgIHhQb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICB5UG9zXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDIgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzJdLFxuICAgICAgICAgICAgeFBvcyxcbiAgICAgICAgICAgIHlQb3MgKyBmb250U2l6ZSoyXG4gICAgICAgIF0pO1xuXG4gICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICBgJHt0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMgPyBcIj5cIiA6IFwiXCJ9YCArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zWzNdLFxuICAgICAgICAgICAgeFBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgIHlQb3MgKyBmb250U2l6ZSoyXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHhQb3MgPSBDb25maWcuVElMRV9TSVpFKjU7XG4gICAgICAgIHlQb3MgPSBDb25maWcuVElMRV9TSVpFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuXG4gICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSW5mb1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLl9wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICB5UG9zICs9IGZvbnRTaXplKjI7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIE5hbWVzXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIHBsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgIHhQb3MsXG4gICAgICAgICAgICAgICAgeVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJYUG9zICAgPSB4UG9zICsgQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcllQb3MgICA9IHlQb3MgLSBmb250U2l6ZS8yO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhcldpZHRoICA9IENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJIZWlnaHQgPSBmb250U2l6ZS8yO1xuXG4gICAgICAgICAgICAvL2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIC8vY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoUGVyY2VudGFnZSA9IHBsYXllci5oZWFsdGgvcGxheWVyLm1heEhlYWx0aDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCpoZWFsdGhQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLmhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGhlYWx0aEJhcllQb3MgKz0gaGVhbHRoQmFySGVpZ2h0KjEuNTtcblxuICAgICAgICAgICAgLy9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICAvL2N0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xuICAgICAgICAgICAgbGV0IG1hbmFQZXJjZW50YWdlID0gcGxheWVyLm1hbmEvcGxheWVyLm1heE1hbmE7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqbWFuYVBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIubWFuYX0vJHtwbGF5ZXIubWF4TWFuYX1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXAoKSB7XG4gICAgICAgIGlmKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMClcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAyO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDEpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAyKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMylcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAxO1xuICAgIH1cblxuICAgIGRvd24oKSB7XG4gICAgICAgIHRoaXMudXAoKTtcbiAgICB9XG5cbiAgICBsZWZ0KCkge1xuICAgICAgICBpZih0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDApXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgZWxzZSBpZiAodGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9PSAxKVxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0ZWRPcHRpb25JbmRleCA9IDA7XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPT0gMilcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICBlbHNlIGlmICh0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID09IDMpXG4gICAgICAgICAgICB0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4ID0gMjtcbiAgICB9XG5cbiAgICByaWdodCgpIHtcbiAgICAgICAgdGhpcy5sZWZ0KCk7XG4gICAgfVxuXG4gICAgY29uZmlybSgpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVWkgZW1pdCBldmVudCBvcHRpb24tc2VsZWN0OiBcIiArIHRoaXMuX3VpLmN1cnJlbnRPcHRpb25zW3RoaXMuX3NlbGVjdGVkT3B0aW9uSW5kZXhdKTtcbiAgICAgICAgdGhpcy5fdmlldy5lbWl0KFwib3B0aW9uLXNlbGVjdFwiLCB0aGlzLl91aS5jdXJyZW50T3B0aW9uc1t0aGlzLl9zZWxlY3RlZE9wdGlvbkluZGV4XSk7XG4gICAgfVxufVxuIl19
