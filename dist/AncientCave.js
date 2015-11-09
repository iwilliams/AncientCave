(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appServicesEngine = require('./app/services/Engine');

var _appServicesEngine2 = _interopRequireDefault(_appServicesEngine);

// Create new instance of game
var engine = new _appServicesEngine2['default'](document.body);

// Initialize it
engine.init();

// DEBUG
window.engine = engine;

},{"./app/services/Engine":14}],2:[function(require,module,exports){
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
            console.log('%c' + msg, 'font-size: 15px; background: #222; color: #bada55;');
        }
    }, {
        key: 'log',
        value: function log(msg) {
            console.log(msg);
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

},{}],4:[function(require,module,exports){
// Import Utils
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesRng = require('../services/Rng');

var _servicesRng2 = _interopRequireDefault(_servicesRng);

// Import Controllers

var _MultiplayerController = require('./MultiplayerController');

var _MultiplayerController2 = _interopRequireDefault(_MultiplayerController);

var _InputController = require('./InputController');

var _InputController2 = _interopRequireDefault(_InputController);

// Import Models

var _modelsPlayer = require('../models/Player');

var _modelsPlayer2 = _interopRequireDefault(_modelsPlayer);

var _modelsMonster = require('../models/Monster');

var _modelsMonster2 = _interopRequireDefault(_modelsMonster);

var _modelsRoom = require('../models/Room');

var _modelsRoom2 = _interopRequireDefault(_modelsRoom);

var _modelsUi = require('../models/Ui');

var _modelsUi2 = _interopRequireDefault(_modelsUi);

var _modelsBattleUi = require('../models/BattleUi');

var _modelsBattleUi2 = _interopRequireDefault(_modelsBattleUi);

var _default = (function () {

    // Pass ctx

    function _default(ctx) {
        _classCallCheck(this, _default);

        this._ctx = ctx;
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            var queryParams = _servicesUtils2['default'].parseQuery(window.location.search);

            this.players = new Map();
            var promises = [];

            var yOffset = 2.5;
            var xOffset = _Config2['default'].TILE_X - 3;

            // Create 4 players
            var job = "";
            if (queryParams.job == "knight") {
                job = _modelsPlayer2['default'].JOB_KNIGHT;
            } else if (queryParams.job == "villain") {
                job = _modelsPlayer2['default'].JOB_VILLAIN;
            } else if (queryParams.job == "herbalist") {
                job = _modelsPlayer2['default'].JOB_HERBALIST;
            } else if (queryParams.job == "clairvoyant") {
                job = _modelsPlayer2['default'].JOB_CLAIRVOYANT;
            } else if (queryParams.job == "necromancer") {
                job = _modelsPlayer2['default'].JOB_NECROMANCER;
            }

            // Initialize Local Player
            var p1 = new _modelsPlayer2['default'](xOffset, yOffset, queryParams.name, job);
            this.players.set(p1.name, p1);
            promises.push(p1.init());
            window.player = p1;

            //// Add a baddie
            this.monster = new _modelsMonster2['default'](1, 1, _modelsMonster2['default'].TYPE_WURM);
            promises.push(this.monster.init());
            this.monster.hide();

            // Initialize UI
            this.ui = new _modelsBattleUi2['default'](0, 0, 0, 0, this.players, this.players);
            promises.push(this.ui.init());

            // Initialize Room
            this.room = new _modelsRoom2['default'](_modelsRoom2['default'].TYPE_CAVE, [this.monster], this.players);
            promises.push(this.room.init());

            this.room.on("start-battle", function () {
                _this.ui.toggleBattleOptions();
            });

            this.room.on("end-battle", function () {
                _this.ui.toggleBattleOptions();
            });

            // Create all objects
            this.objects = new Set([this.room].concat(_toConsumableArray(this.players.values()), [this.monster, this.ui]));

            // Initialize Multiplayer Controller
            if (queryParams.host) {
                this.multiplayerController = new _MultiplayerController2['default'](p1, null, queryParams.id, queryParams.host);
            } else {
                var seed = "TEST";
                this.rng = new _servicesRng2['default'](seed);
                this.multiplayerController = new _MultiplayerController2['default'](p1, seed, queryParams.id);
            }
            promises.push(this.multiplayerController.init());

            ///////////////////////////////////
            // LISTEN FOR MULTIPLAYER EVENTS //
            ///////////////////////////////////

            // Add player when peer connects
            this.multiplayerController.on("peer-connect", function (message) {
                _servicesLogger2['default'].debug("Add player");
                var p = new _modelsPlayer2['default'](xOffset, ++yOffset, message.data.player.name, message.data.player.job);
                p.init().then(function () {
                    _servicesLogger2['default'].debug('Add player with id ' + message.from);
                    _this.players.set(message.from, p);
                    _servicesLogger2['default'].log(_this.players);
                    _this.objects.add(p);
                });

                // If this is our first connection and we don't already have a seed then set it
                if (!_this.rng) {
                    _this.rng = new _servicesRng2['default'](message.data.seed);
                }
            });

            // Remove the peers player from the game
            this.multiplayerController.on("peer-disconnect", function (peer) {
                var playerToDelete = _this.players.get(peer);
                _this.players['delete'](peer);
                _this.objects['delete'](playerToDelete);
            });

            // Sync Player state
            this.multiplayerController.on("player-state", function (message) {
                _servicesLogger2['default'].debug("Set player to Ready");
                var player = _this.players.get(message.from);
                player.ready = message.data.player.ready;
                player.action = message.data.player.action;

                if (!_this.room.isBattle) {
                    if (player.ready) player.action = "ready";
                    _this.updateRoomState();
                }
            });

            /////////////////////////////
            // LISTEN FOR INPUT EVENTS //
            /////////////////////////////

            // Initialize Input Controller
            this.inputController = new _InputController2['default']();

            this.inputController.on('click', function () {
                if (!_this.room.isBattle) {
                    p1.ready = !p1.ready;
                    if (player.ready) player.action = "ready";
                    _this.multiplayerController.click();
                    _this.updateRoomState();
                }
            });

            this.inputController.on('enter', function () {
                if (_this.room.isBattle) {
                    p1.ready = !p1.ready;
                    p1.setAction(_this.ui.getSelectedBattleOption());
                    _this.multiplayerController.click();
                }
            });

            this.inputController.on('up', function () {
                _servicesLogger2['default'].debug('up');
                if (_this.ui.showBattleOptions) {
                    _this.ui.selectedBattleOptionIndex = (_this.ui.selectedBattleOptionIndex + 2) % 4;
                }
            });

            this.inputController.on('down', function () {
                _servicesLogger2['default'].debug('down');
                if (_this.ui.showBattleOptions) {
                    _this.ui.selectedBattleOptionIndex = (_this.ui.selectedBattleOptionIndex + 2) % 4;
                }
            });

            this.inputController.on('left', function () {
                _servicesLogger2['default'].debug('left');
                if (_this.ui.showBattleOptions) {
                    if (_this.ui.selectedBattleOptionIndex == 0) _this.ui.selectedBattleOptionIndex = 1;else if (_this.ui.selectedBattleOptionIndex == 1) _this.ui.selectedBattleOptionIndex = 0;else if (_this.ui.selectedBattleOptionIndex == 3) _this.ui.selectedBattleOptionIndex = 2;else if (_this.ui.selectedBattleOptionIndex == 2) _this.ui.selectedBattleOptionIndex = 3;
                }
            });

            this.inputController.on('right', function () {
                _servicesLogger2['default'].debug('right');
                if (_this.ui.showBattleOptions) {
                    if (_this.ui.selectedBattleOptionIndex == 0) _this.ui.selectedBattleOptionIndex = 1;else if (_this.ui.selectedBattleOptionIndex == 1) _this.ui.selectedBattleOptionIndex = 0;else if (_this.ui.selectedBattleOptionIndex == 3) _this.ui.selectedBattleOptionIndex = 2;else if (_this.ui.selectedBattleOptionIndex == 2) _this.ui.selectedBattleOptionIndex = 3;
                }
            });

            return Promise.all(promises);
        }
    }, {
        key: 'updateRoomState',
        value: function updateRoomState() {
            // Calculate if we should be moving based on player state
            // NEEDS TO BE MOVED
            var shouldMove = true;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _player = _step.value;

                    shouldMove = shouldMove && _player.ready;
                }

                // Decide if we need to start or end combat
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

            if (shouldMove && !this.room.isLooking) {
                this.room.setNextEncounter(this.rng.next() * 500);
                this.room.lookForTrouble();
            } else if (!this.room.isLooking && shouldMove) {
                this.room.setNextEncounter(this.rng.next() * 500);
                this.room.startLooking();
            }
        }

        /**
         * Progress Game Logic by calling tick on every object
         */
    }, {
        key: 'tick',
        value: function tick(frame) {
            var _this2 = this;

            // Render everything
            this.objects.forEach(function (object) {
                _this2._ctx.save();
                object.tick();
                object.render(_this2._ctx, frame);
                _this2._ctx.restore();
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../models/BattleUi":9,"../models/Monster":10,"../models/Player":11,"../models/Room":12,"../models/Ui":13,"../services/Logger":15,"../services/Rng":16,"../services/Utils":17,"./InputController":5,"./MultiplayerController":6}],5:[function(require,module,exports){
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

        // Attach input listeners
        // using https://dmauro.github.io/Keypress/
        this.listener = new window.keypress.Listener();
        this.attachInput(this.listener);
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */

    _createClass(_default, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'attachInput',
        value: function attachInput(listener) {
            var _this = this;

            window.onclick = function () {
                _this.emit("click");
            };

            listener.simple_combo("t", function () {
                _this.emit("click");
            });

            listener.simple_combo("up", function () {
                _this.emit("up");
            });

            listener.simple_combo("down", function () {
                _this.emit("down");
            });

            listener.simple_combo("left", function () {
                _this.emit("left");
            });

            listener.simple_combo("right", function () {
                _this.emit("right");
            });

            listener.simple_combo("enter", function () {
                _this.emit("enter");
            });
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../mixins/EventEmitter":7}],6:[function(require,module,exports){
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

    function _default(player, seed, id, host) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._player = player;
        this._seed = seed || null;
        this._id = id || null;

        if (host) this._host = host;

        this._peers = new Map();
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */

    _createClass(_default, [{
        key: 'init',
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
                    "seed": this._seed
                }
            };

            message.data.player = this._player.serialize();

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
            peer.hasSentPlayer = true;
        }
    }, {
        key: 'removePeer',
        value: function removePeer(peer) {
            _ServicesLogger2['default'].debug("Remove peer");
            this.emit("peer-disconnect", peer.connection.peer);
            this._peers['delete'](peer.connection.peer);
        }
    }, {
        key: 'handleData',
        value: function handleData(message) {
            _ServicesLogger2['default'].debug('Message recieved from peer with id ' + message.from);
            _ServicesLogger2['default'].log(message);

            var data = message.data;

            if (message.event == "peer-connect") {
                _ServicesLogger2['default'].debug('Current connections');
                _ServicesLogger2['default'].log(this._peers);

                // See if this peer knows about any other peers and add if we don't know them
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = data.peers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var peer = _step2.value;

                        if (!this._peers.get(peer) && peer !== this._id) {
                            _ServicesLogger2['default'].debug('Adding Peer with id ' + peer);
                            this.addPeer(this._peer.connect(peer));
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

                _ServicesLogger2['default'].debug('Check if we need to send message to message sender');
                _ServicesLogger2['default'].log(this._peers.get("host"));
                if (this._peers.get(message.from) && !this._peers.get(message.from).hasSentPlayer) {
                    this.connectToPeer(this._peers.get(message.from));
                }

                _ServicesLogger2['default'].log(this._connections);

                this.emit("peer-connect", message);
            }

            if (message.event == "player-state") {
                this.emit("player-state", message);
            }
        }
    }, {
        key: 'click',
        value: function click() {
            if (this._peers) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this._peers.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var peer = _step3.value;

                        var message = {
                            "event": "player-state",
                            "from": this._id,
                            "data": {
                                "player": this._player.serialize()
                            }
                        };

                        peer.connection.send(message);
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
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../Services/Logger":3,"../mixins/EventEmitter":7}],7:[function(require,module,exports){
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
    value: function on(type, listener) {
      if (typeof listener != "function") {
        throw new TypeError();
      }
      var listeners = this._events[type] || (this._events[type] = []);
      if (listeners.indexOf(listener) != -1) {
        return this;
      }
      listeners.push(listener);
      if (listeners.length > this._maxListeners) {
        error("possible memory leak, added %i %s listeners, " + "use EventEmitter#setMaxListeners(number) if you " + "want to increase the limit (%i now)", listeners.length, type, this._maxListeners);
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

var _default = (function () {
    function _default(xPos, yPos) {
        _classCallCheck(this, _default);

        this.xPos = xPos || 0;
        this.yPos = yPos || 0;
        this.isVisible = true;
    }

    _createClass(_default, [{
        key: "render",
        value: function render(ctx, frame) {
            if (this.isVisible) this.renderer.render(ctx, frame);
        }
    }, {
        key: "hide",
        value: function hide() {
            this.isVisible = false;
        }
    }, {
        key: "show",
        value: function show() {
            this.isVisible = true;
        }
    }, {
        key: "toggle",
        value: function toggle() {
            this.isVisible = !this.isVisible;
        }
    }, {
        key: "tick",
        value: function tick() {
            return;
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

var _Ui2 = require('./Ui');

var _Ui3 = _interopRequireDefault(_Ui2);

var _viewsBattleUiRenderer = require('../views/BattleUiRenderer');

var _viewsBattleUiRenderer2 = _interopRequireDefault(_viewsBattleUiRenderer);

var _default = (function (_Ui) {
    _inherits(_default, _Ui);

    /**
     * Creates a UI window
     *
     * @param width            - % Width of the UI Element
     * @param height           - % Height of the UI Element
     * @param offsetX          - % X offset
     * @param offsetY          - % Y offset
     * @param playerCharacters - array of playerCharacters
     * @param enemies          - array of playerCharacters
     */

    function _default(width, height, offsetX, offsetY, playerCharacters, enemies) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, width, height, offsetX, offsetY);

        this.playerCharacters = playerCharacters;
        this.enemies = enemies;
    }

    /**
     * Initialization Promise
     */

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return new Promise(function (res, rej) {
                _this.renderer = new _viewsBattleUiRenderer2['default'](_this);
                _this.renderer.init().then(res);
            });
        }
    }]);

    return _default;
})(_Ui3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/BattleUiRenderer":18,"./Ui":13}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseObject2 = require('./BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

// Can't call this Object b/c of conflict xD

var _viewsMonsterRenderer = require('../views/MonsterRenderer');

var _viewsMonsterRenderer2 = _interopRequireDefault(_viewsMonsterRenderer);

var _default = (function (_BaseObject) {
    _inherits(_default, _BaseObject);

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

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, xPos, yPos);
        this.type = type;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            this.renderer = new _viewsMonsterRenderer2['default'](this);
            return this.renderer.init();
        }
    }]);

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/MonsterRenderer":19,"./BaseObject":8}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseObject2 = require('./BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

// Can't call this Object b/c of conflict xD

var _viewsPlayerRenderer = require('../views/PlayerRenderer');

var _viewsPlayerRenderer2 = _interopRequireDefault(_viewsPlayerRenderer);

var _default = (function (_BaseObject) {
    _inherits(_default, _BaseObject);

    _createClass(_default, null, [{
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

    function _default(xPos, yPos, name, job) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, xPos, yPos);
        this.name = name;
        this.ready = false;
        this.isWalking = false;
        this.job = job;
        this.position = job.position;
        this.maxHealth = job.health;
        this.currentHealth = job.health;
        this.action = "wait";
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            this.renderer = new _viewsPlayerRenderer2['default'](this);
            return this.renderer.init();
        }
    }, {
        key: 'serialize',
        value: function serialize() {
            return {
                "name": this.name,
                "job": this.job,
                "ready": this.ready,
                "isWalking": this.ready,
                "action": this.action
            };
        }
    }, {
        key: 'deserialize',
        value: function deserialize(player) {
            this.name = player.name;
            this.job = player.job;
            this.ready = player.ready;
            this.action = player.action;
            this.isWalking = player.ready;
        }
    }, {
        key: 'setAction',
        value: function setAction(action) {
            this.action = action;
        }
    }]);

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/PlayerRenderer":20,"./BaseObject":8}],12:[function(require,module,exports){
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

var _viewsRoomRenderer = require('../views/RoomRenderer');

var _viewsRoomRenderer2 = _interopRequireDefault(_viewsRoomRenderer);

var _default = (function (_EventEmitter) {
    _inherits(_default, _EventEmitter);

    _createClass(_default, null, [{
        key: 'TYPE_CAVE',

        // Static Room Types
        get: function get() {
            return {
                floor: 'goodtile.png',
                wall: 'shitwall.png'
            };
        }
    }, {
        key: 'TYPE_TEMPLE',
        get: function get() {
            return {
                floor: 'grass.png',
                wall: 'pillars.png'
            };
        }
    }]);

    function _default(type, enemies, players, encounterRate) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.type = type;
        this.isMoving = false;
        this.isBattle = false;
        this.enemies = enemies;
        this.players = players;
        this.isLooking = false;
        this.isVisible = true;

        this.encounterRate = encounterRate || 50;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            this.renderer = new _viewsRoomRenderer2['default'](this);
            return this.renderer.init();
        }
    }, {
        key: 'lookForTrouble',
        value: function lookForTrouble() {
            if (this.isLooking) return;
            if (this.isBattle) this.endBattle();
            this.isMoving = true;
            this.isLooking = true;
            this.players.forEach(function (player) {
                player.isWalking = !player.isWalking;
                player.action = "walk";
                console.log(player.isWalking);
            });
        }
    }, {
        key: 'stopLooking',
        value: function stopLooking() {
            if (!this.isLooking) return;
            this.isMoving = false;
            this.isLooking = false;
            this.players.forEach(function (player) {
                player.isWalking = !player.isWalking;
            });
        }
    }, {
        key: 'endBattle',
        value: function endBattle() {
            if (this.isBattle) {
                this.isBattle = false;
                this.enemies.forEach(function (enemy) {
                    enemy.toggle();
                });
                this.emit("end-battle");
            }
        }
    }, {
        key: 'startBattle',
        value: function startBattle() {
            this.tickCount = 0;
            this.isBattle = true;
            this.isLooking = false;
            this.isMoving = false;
            this.enemies.forEach(function (enemy) {
                enemy.toggle();
            });
            this.players.forEach(function (player) {
                player.isWalking = false;
                player.ready = false;
                player.action = "wait";
            });
            this.emit("start-battle");
        }
    }, {
        key: 'setNextEncounter',
        value: function setNextEncounter(ticks) {
            this.nextEncounter = ticks;
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.tickCount = this.tickCount || 0;
            if (this.isLooking) {
                this.tickCount++;
                if (this.tickCount > this.nextEncounter) {
                    this.startBattle();
                }
            }
        }
    }, {
        key: 'render',
        value: function render(ctx, frame) {
            this.renderer.render(ctx, frame);
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../mixins/EventEmitter":7,"../views/RoomRenderer":22}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _viewsUiRenderer = require('../views/UiRenderer');

var _viewsUiRenderer2 = _interopRequireDefault(_viewsUiRenderer);

var _BaseObject2 = require('./BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

// Can't call this Object b/c of conflict xD

var _default = (function (_BaseObject) {
    _inherits(_default, _BaseObject);

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

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.bg = 'dist/resources/images/ui-bg.png';
        this.width = width;
        this.height = height;
        this.offsetX = offsetX;
        this.offsetY = offsetY;
        this.showBattleOptions = false;

        this.battleOptions = ["attack", "ability", "item", "defend"];
        this.selectedBattleOptionIndex = 0;
    }

    /**
     * Initialization Promise
     */

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return new Promise(function (res, rej) {
                _this.renderer = new _viewsUiRenderer2['default'](_this);
                _this.renderer.init().then(res);
            });
        }
    }, {
        key: 'render',
        value: function render(ctx) {
            this.renderer.render(ctx);
        }
    }, {
        key: 'toggleBattleOptions',
        value: function toggleBattleOptions() {
            this.showBattleOptions = !this.showBattleOptions;
        }
    }, {
        key: 'getSelectedBattleOption',
        value: function getSelectedBattleOption() {
            return this.battleOptions[this.selectedBattleOptionIndex];
        }
    }]);

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/UiRenderer":23,"./BaseObject":8}],14:[function(require,module,exports){
// Import Utils
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _Rng = require('./Rng');

var _Rng2 = _interopRequireDefault(_Rng);

// Import Controllers

var _controllersGameController = require('../controllers/GameController');

var _controllersGameController2 = _interopRequireDefault(_controllersGameController);

var _default = (function () {
    function _default(element) {
        _classCallCheck(this, _default);

        this._element = element;
        this._canvas = document.createElement('canvas');

        this._canvas.width = _Config2['default'].CANVAS_WIDTH;
        this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
    }

    // http://codetheory.in/controlling-the-frame-rate-with-requestanimationframe/

    _createClass(_default, [{
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

                this._canvas.width = _Config2['default'].CANVAS_WIDTH;
                this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
                this._ctx.imageSmoothingEnabled = false;

                this._ctx.fillStyle = "#000";
                this._ctx.fillRect(0, 0, _Config2['default'].CANVAS_WIDTH, _Config2['default'].CANVAS_HEIGHT);

                this._canvas.width = _Config2['default'].CANVAS_WIDTH;
                this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
                this._ctx.imageSmoothingEnabled = false;

                // Progress game
                this.game.tick(this._frame);

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

        /**
         * Resize Handler
         * @todo: does this belong here?
         */
    }, {
        key: 'resize',
        value: function resize() {
            _Config2['default'].calculate();
            this._canvas.width = _Config2['default'].CANVAS_WIDTH;
            this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
            this._ctx.imageSmoothingEnabled = false;
        }

        /**
         * Request the game goes full screen, will fullscreen the canvas element
         * Found: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
         */
    }, {
        key: 'requestFullscreen',
        value: function requestFullscreen() {
            if (this._canvas.requestFullscreen) {
                this._canvas.requestFullscreen();
            } else if (this._canvas.msRequestFullscreen) {
                this._canvas.msRequestFullscreen();
            } else if (this._canvas.mozRequestFullScreen) {
                this._canvas.mozRequestFullScreen();
            } else if (this._canvas.webkitRequestFullscreen) {
                this._canvas.webkitRequestFullscreen();
            }
        }

        /**
         * Initialize the engine
         */
    }, {
        key: 'init',
        value: function init() {
            var _this = this;

            var queryParams = _Utils2['default'].parseQuery(window.location.search);

            this._element.appendChild(this._canvas);
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;

            //initialize the game controller
            //@todo need to pass params to this
            this.game = new _controllersGameController2['default'](this._ctx);
            this.game.init().then(function () {
                console.log("Game Controller Initialized");
                _this.then = Date.now();
                _this.interval = 1000 / _Config2['default'].FPS;
                _this.first = _this.then;
                _this.counter = 0;
                window.requestAnimationFrame(_this.loop.bind(_this));
            });

            // Attach resize event
            //window.resize = this.resize.bind(this);
            window.addEventListener("resize", this.resize.bind(this));

            // Attach Fullscreen event
            //document.getElementsByTagName("button")[0].addEventListener("click", this.requestFullscreen.bind(this));

            _Logger2['default'].banner('Game Started');
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../controllers/GameController":4,"./Logger":15,"./Rng":16,"./Utils":17}],15:[function(require,module,exports){
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
            console.log('%c' + msg, 'font-size: 15px; background: #222; color: #bada55;');
        }
    }, {
        key: 'log',
        value: function log(msg) {
            console.log(msg);
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _UiRenderer2 = require('./UiRenderer');

var _UiRenderer3 = _interopRequireDefault(_UiRenderer2);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_UiRenderer) {
    _inherits(_default, _UiRenderer);

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(_default, [{
        key: 'render',
        value: function render(ctx) {
            _get(Object.getPrototypeOf(_default.prototype), 'render', this).call(this, ctx);

            var fontSize = 5 * _Config2['default'].SPRITE_SCALE;
            ctx.font = fontSize + "px Courier New";

            var xpos = _Config2['default'].TILE_SIZE * (_Config2['default'].TILE_X - 9);
            var ypos = _Config2['default'].TILE_SIZE * (_Config2['default'].TILE_Y - this._tileHeight) + fontSize * 2;

            // Render Battle Options
            if (this.ui.showBattleOptions) {
                ctx.fillStyle = "#ffffff";

                ctx.fillText.apply(ctx, ['' + (this.ui.selectedBattleOptionIndex == 0 ? '>' : '') + this.ui.battleOptions[0], xpos, ypos]);

                ctx.fillText.apply(ctx, ['' + (this.ui.selectedBattleOptionIndex == 1 ? '>' : '') + this.ui.battleOptions[1], xpos + _Config2['default'].TILE_SIZE * 2, ypos]);

                ctx.fillText.apply(ctx, ['' + (this.ui.selectedBattleOptionIndex == 2 ? '>' : '') + this.ui.battleOptions[2], xpos, ypos + fontSize * 2]);

                ctx.fillText.apply(ctx, ['' + (this.ui.selectedBattleOptionIndex == 3 ? '>' : '') + this.ui.battleOptions[3], xpos + _Config2['default'].TILE_SIZE * 2, ypos + fontSize * 2]);
            }

            xpos = _Config2['default'].TILE_SIZE * (_Config2['default'].TILE_X - 5);
            ypos = _Config2['default'].TILE_SIZE * (_Config2['default'].TILE_Y - this._tileHeight);

            // Render Player Info
            this.ui.playerCharacters.forEach(function (player) {
                ypos += fontSize * 2;

                ctx.fillStyle = "#ffffff";

                // Render Player Names
                ctx.fillText.apply(ctx, [player.name, xpos, ypos]);

                var healthBarXPos = xpos + _Config2['default'].TILE_SIZE * 2;
                var healthBarYPos = ypos - fontSize / 2;
                var healthBarWidth = _Config2['default'].TILE_SIZE * 2;
                var healthBarHeight = fontSize;

                ctx.fillStyle = "#000";
                ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

                // Render Player Health Fill
                ctx.fillStyle = "#FF0000";
                var healthPercentage = player.currentHealth / player.maxHealth;
                ctx.fillRect(healthBarXPos, healthBarYPos, healthBarWidth * healthPercentage, healthBarHeight);

                // Render Player Health Stroke
                ctx.strokeStyle = "#000";
                ctx.lineWidth = 1 * _Config2['default'].SPRITE_SCALE;
                ctx.strokeRect(healthBarXPos, healthBarYPos, healthBarWidth, healthBarHeight);

                ctx.fillStyle = "#FFF";
                ctx.fillText.apply(ctx, [player.currentHealth + '/' + player.maxHealth, healthBarXPos + healthBarWidth + 2 * _Config2['default'].SPRITE_SCALE, healthBarYPos]);
            });
        }
    }]);

    return _default;
})(_UiRenderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"./UiRenderer":23}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Renderer2 = require('./Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_Renderer) {
    _inherits(_default, _Renderer);

    function _default(monster) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.monster = monster;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            return Promise.all([this.loadResource('sprite', this.monster.type.sprite)]);
        }
    }, {
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
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":17,"./Renderer":21}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _Renderer2 = require('./Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_Renderer) {
    _inherits(_default, _Renderer);

    function _default(player) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.player = player;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            return Promise.all([this.loadResource('sprite', this.player.job.sprite), this.loadResource('shadow', 'shadow.png'), this.loadResource('bubble', 'waiting.png')]);
        }
    }, {
        key: 'render',
        value: function render(ctx, frame) {
            this.frame = frame < _Config2['default'].FPS / 2 ? 0 : 1;

            var player = this._resources.get('player');
            var playerWidth = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE;

            var xOffset = _Config2['default'].TILE_X - 3;
            if (this.player.position == "back") {
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
            this.player.yPos * playerWidth + playerWidth - _Config2['default'].SPRITE_SCALE * this._resources.get('shadow').height / 1.75, // sy ~ Replace with player Y Pos
            playerWidth, // sWidth
            playerWidth // sHeight
            ]);

            // Draw Player Sprite
            ctx.drawImage.apply(ctx, [this._resources.get('sprite'), this.player.isWalking ? _Config2['default'].SPRITE_SIZE * this.frame : 0, // DX
            0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            xOffset * playerWidth, // sx ~ Replace with object X Pos
            this.player.yPos * playerWidth, // sy ~ Replace with object Y Pos
            playerWidth, // sWidth
            playerWidth // sHeight
            ]);

            // Draw Bubble
            var bubbleOffset = 0;
            switch (this.player.action) {
                case "wait":
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

            if (this.player.action !== "walk" && this.player.action !== "ready") {
                ctx.drawImage.apply(ctx, [this._resources.get('bubble'), 0, bubbleOffset, // DY
                bubble.width, // dWidth
                bubble.height / 5, // dHeight
                xOffset * playerWidth - bubbleWidth / 1.5, // sx ~ Replace with object X Pos
                this.player.yPos * playerWidth - bubbleHeight / 1.5, // sy ~ Replace with object Y Pos
                bubbleWidth, // sWidth
                bubbleHeight // sHeight
                ]);
            }
        }
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":17,"./Renderer":21}],21:[function(require,module,exports){
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

var _Renderer2 = require('./Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_Renderer) {
    _inherits(_default, _Renderer);

    function _default(object) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.room = object;
        this._floorOffset = 0;
        this._wallOffset = 0;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            return Promise.all([this.loadResource("floor", this.room.type.floor), this.loadResource("wall", this.room.type.wall)]);
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

            //this._resources.get('sprite'),
            //this.player.isWalking ? Config.SPRITE_SIZE*(this.frame) : 0, // DX
            //0, // DY
            //Config.SPRITE_SIZE, // dWidth
            //Config.SPRITE_SIZE, // dHeight
            //xOffset*(playerWidth), // sx ~ Replace with object X Pos
            //this.player.yPos*(playerWidth), // sy ~ Replace with object Y Pos
            //playerWidth, // sWidth
            //playerWidth  // sHeight

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
            if (this.room.isMoving) {
                this._floorOffset += xStep;
                if (this._floorOffset >= floorWidth - 1) this._floorOffset = 0;

                this._wallOffset += xStep;
                if (this._wallOffset > wallWidth - 1) this._wallOffset = 0;
            }
        }
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":17,"./Renderer":21}],23:[function(require,module,exports){
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

var _Renderer2 = require('./Renderer');

var _Renderer3 = _interopRequireDefault(_Renderer2);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_Renderer) {
    _inherits(_default, _Renderer);

    function _default(ui) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.ui = ui;
        this._uiBg = ui.bg;
        this._tileHeight = 2;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return new Promise(function (res, rej) {
                _this.image = document.createElement('img');
                _this.image.onload = function () {
                    res(this);
                };
                _this.image.src = _this._uiBg;
            });
        }
    }, {
        key: 'render',
        value: function render(ctx) {

            ctx.save();

            var bgRect = [0, _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * (_Config2['default'].TILE_Y - this._tileHeight), _Config2['default'].CANVAS_WIDTH, _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * this._tileHeight - 300];

            var uiRect = [0, _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * (_Config2['default'].TILE_Y - this._tileHeight), _Config2['default'].CANVAS_WIDTH, _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * this._tileHeight];

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

            // Trying to get second border
            //ctx.strokeStyle = "#FFFFFF";

            //lineWidth = Config.SPRITE_SIZE*Config.SPRITE_SCALE/48;
            //ctx.lineWidth = lineWidth;

            //strokeRect = [...uiRect];
            //strokeRect[0] += lineWidth/2;
            //strokeRect[1] += lineWidth/2;
            //strokeRect[2] -= lineWidth;
            //strokeRect[3] -= lineWidth;

            //ctx.strokeRect(...strokeRect);

            // Fill bg with patern

            ctx.globalAlpha = 0.1;
            var patern = ctx.createPattern(this.image, "repeat");
            ctx.fillStyle = patern;
            ctx.rect.apply(ctx, _toConsumableArray(strokeRect));
            ctx.fill();

            ctx.restore();
        }
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"./Renderer":21}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9TZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL0lucHV0Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL011bHRpcGxheWVyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21peGlucy9FdmVudEVtaXR0ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvUm5nLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyUmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1VpUmVuZGVyZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2lDQ0FtQix1QkFBdUI7Ozs7O0FBRzFDLElBQUksTUFBTSxHQUFHLG1DQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBR3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDVHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7O0FBR3BDLE1BQU0sQ0FBQyxZQUFZLEdBQUksSUFBSSxDQUFDO0FBQzVCLE1BQU0sQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDOztBQUU1QixNQUFNLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNuQixNQUFNLENBQUMsTUFBTSxHQUFHLEFBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxNQUFNLENBQUMsYUFBYSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUM7O0FBRXpFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsWUFBVzs7QUFFMUIsVUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7OztBQUd0QixVQUFNLENBQUMsWUFBWSxHQUFJLE1BQU0sQ0FBQyxVQUFVLEdBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUMzRCxVQUFNLENBQUMsYUFBYSxHQUFHLEFBQUMsTUFBTSxDQUFDLFlBQVksR0FBQyxNQUFNLENBQUMsYUFBYSxHQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUM7OztBQUd0RixRQUFHLE1BQU0sQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUMxQyxjQUFNLENBQUMsYUFBYSxHQUFJLE1BQU0sQ0FBQyxXQUFXLEdBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUM3RCxjQUFNLENBQUMsWUFBWSxHQUFHLEFBQUMsTUFBTSxDQUFDLGFBQWEsR0FBQyxNQUFNLENBQUMsWUFBWSxHQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUM7S0FDekY7OztBQUdELFVBQU0sQ0FBQyxXQUFXLEdBQUssRUFBRSxDQUFDO0FBQzFCLFVBQU0sQ0FBQyxZQUFZLEdBQUksTUFBTSxDQUFDLFlBQVksSUFBRSxNQUFNLENBQUMsTUFBTSxHQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUEsQUFBQyxDQUFDO0FBQzlFLFVBQU0sQ0FBQyxTQUFTLEdBQU8sTUFBTSxDQUFDLFdBQVcsR0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDOzs7QUFHOUQsVUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7Q0FDbkIsQ0FBQTs7QUFFRCxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7O3FCQUVKLE1BQU07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQ3RDSixnQkFBQyxHQUFHLEVBQUU7QUFDZixtQkFBTyxDQUFDLEdBQUcsUUFBTSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUksb0RBQW9ELENBQUMsQ0FBQztTQUMvRjs7O2VBRVcsZUFBQyxHQUFHLEVBQUU7QUFDZCxtQkFBTyxDQUFDLEdBQUcsUUFBTSxHQUFHLEVBQUksb0RBQW9ELENBQUMsQ0FBQztTQUNqRjs7O2VBRVMsYUFBQyxHQUFHLEVBQUU7QUFDWixtQkFBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNwQjs7O2VBRVcsZUFBQyxHQUFHLEVBQUU7QUFDZCxtQkFBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkNkZ0IsbUJBQW1COzs7OzhCQUNuQixvQkFBb0I7Ozs7c0JBQ3BCLGNBQWM7Ozs7MkJBQ2QsaUJBQWlCOzs7Ozs7cUNBR0EseUJBQXlCOzs7OytCQUN6QixtQkFBbUI7Ozs7Ozs0QkFHcEMsa0JBQWtCOzs7OzZCQUNsQixtQkFBbUI7Ozs7MEJBQ25CLGdCQUFnQjs7Ozt3QkFDaEIsY0FBYzs7Ozs4QkFDZCxvQkFBb0I7Ozs7Ozs7O0FBSzFCLHNCQUFDLEdBQUcsRUFBRTs7O0FBQ2IsWUFBSSxDQUFDLElBQUksR0FBRyxHQUFHLENBQUM7S0FDbkI7Ozs7Ozs7Ozs7O2VBUUcsZ0JBQUc7OztBQUNILGdCQUFJLFdBQVcsR0FBRywyQkFBTSxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFM0QsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUN6QixnQkFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUVsQixnQkFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO0FBQ2xCLGdCQUFJLE9BQU8sR0FBRyxvQkFBTyxNQUFNLEdBQUcsQ0FBQyxDQUFDOzs7QUFHaEMsZ0JBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNiLGdCQUFHLFdBQVcsQ0FBQyxHQUFHLElBQUksUUFBUSxFQUFFO0FBQzVCLG1CQUFHLEdBQUcsMEJBQU8sVUFBVSxDQUFDO2FBQzNCLE1BQU0sSUFBSSxXQUFXLENBQUMsR0FBRyxJQUFJLFNBQVMsRUFBRTtBQUNyQyxtQkFBRyxHQUFHLDBCQUFPLFdBQVcsQ0FBQzthQUM1QixNQUFNLElBQUksV0FBVyxDQUFDLEdBQUcsSUFBSSxXQUFXLEVBQUU7QUFDdkMsbUJBQUcsR0FBRywwQkFBTyxhQUFhLENBQUM7YUFDOUIsTUFBTSxJQUFJLFdBQVcsQ0FBQyxHQUFHLElBQUksYUFBYSxFQUFFO0FBQ3pDLG1CQUFHLEdBQUcsMEJBQU8sZUFBZSxDQUFDO2FBQ2hDLE1BQU8sSUFBSSxXQUFXLENBQUMsR0FBRyxJQUFJLGFBQWEsRUFBRTtBQUMxQyxtQkFBRyxHQUFHLDBCQUFPLGVBQWUsQ0FBQzthQUNoQzs7O0FBR0QsZ0JBQUksRUFBRSxHQUFHLDhCQUFXLE9BQU8sRUFBRSxPQUFPLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUM3RCxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztBQUM5QixvQkFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUN6QixrQkFBTSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7OztBQUduQixnQkFBSSxDQUFDLE9BQU8sR0FBRywrQkFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLDJCQUFRLFNBQVMsQ0FBQyxDQUFDO0FBQ3BELG9CQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNuQyxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR3BCLGdCQUFJLENBQUMsRUFBRSxHQUFHLGdDQUFhLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMvRCxvQkFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7OztBQUc5QixnQkFBSSxDQUFDLElBQUksR0FBRyw0QkFBUyx3QkFBSyxTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25FLG9CQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzs7QUFFaEMsZ0JBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFJO0FBQzdCLHNCQUFLLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO2FBQ2pDLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLFlBQUk7QUFDM0Isc0JBQUssRUFBRSxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDakMsQ0FBQyxDQUFDOzs7QUFHSCxnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLEdBQUcsRUFDbEIsSUFBSSxDQUFDLElBQUksNEJBQ04sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsSUFDeEIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsRUFBRSxHQUNULENBQUM7OztBQUdILGdCQUFHLFdBQVcsQ0FBQyxJQUFJLEVBQUU7QUFDakIsb0JBQUksQ0FBQyxxQkFBcUIsR0FBRyx1Q0FBMEIsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN0RyxNQUFNO0FBQ0gsb0JBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNsQixvQkFBSSxDQUFDLEdBQUcsR0FBRyw2QkFBUSxJQUFJLENBQUMsQ0FBQztBQUN6QixvQkFBSSxDQUFDLHFCQUFxQixHQUFHLHVDQUEwQixFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQzthQUNwRjtBQUNELG9CQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDOzs7Ozs7O0FBUWpELGdCQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxVQUFDLE9BQU8sRUFBRztBQUNyRCw0Q0FBTyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0Isb0JBQUksQ0FBQyxHQUFHLDhCQUFXLE9BQU8sRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUYsaUJBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBSTtBQUNkLGdEQUFPLEtBQUsseUJBQXVCLE9BQU8sQ0FBQyxJQUFJLENBQUcsQ0FBQztBQUNuRCwwQkFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbEMsZ0RBQU8sR0FBRyxDQUFDLE1BQUssT0FBTyxDQUFDLENBQUM7QUFDekIsMEJBQUssT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkIsQ0FBQyxDQUFDOzs7QUFHSCxvQkFBRyxDQUFDLE1BQUssR0FBRyxFQUFFO0FBQ1YsMEJBQUssR0FBRyxHQUFHLDZCQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3pDO2FBQ0osQ0FBQyxDQUFDOzs7QUFHSCxnQkFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFDLElBQUksRUFBRztBQUNyRCxvQkFBSSxjQUFjLEdBQUcsTUFBSyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzNDLHNCQUFLLE9BQU8sVUFBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLHNCQUFLLE9BQU8sVUFBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDO2FBQ3ZDLENBQUMsQ0FBQzs7O0FBR0gsZ0JBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLFVBQUMsT0FBTyxFQUFHO0FBQ3JELDRDQUFPLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBQ3BDLG9CQUFJLE1BQU0sR0FBRyxNQUFLLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVDLHNCQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN6QyxzQkFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7O0FBRTNDLG9CQUFHLENBQUMsTUFBSyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ3BCLHdCQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFDekMsMEJBQUssZUFBZSxFQUFFLENBQUM7aUJBQzFCO2FBQ0osQ0FBQyxDQUFDOzs7Ozs7O0FBT0gsZ0JBQUksQ0FBQyxlQUFlLEdBQUcsa0NBQXFCLENBQUM7O0FBRTdDLGdCQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUNqQyxvQkFBRyxDQUFDLE1BQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNwQixzQkFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDckIsd0JBQUcsTUFBTSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQztBQUN6QywwQkFBSyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNuQywwQkFBSyxlQUFlLEVBQUUsQ0FBQztpQkFDMUI7YUFDSixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ2pDLG9CQUFHLE1BQUssSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNuQixzQkFBRSxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUM7QUFDckIsc0JBQUUsQ0FBQyxTQUFTLENBQUMsTUFBSyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDO0FBQ2hELDBCQUFLLHFCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDO2lCQUN0QzthQUNKLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFlBQUk7QUFDOUIsNENBQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25CLG9CQUFHLE1BQUssRUFBRSxDQUFDLGlCQUFpQixFQUFFO0FBQzFCLDBCQUFLLEVBQUUsQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLE1BQUssRUFBRSxDQUFDLHlCQUF5QixHQUFDLENBQUMsQ0FBQSxHQUFFLENBQUMsQ0FBQztpQkFDL0U7YUFDSixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxZQUFJO0FBQ2hDLDRDQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNyQixvQkFBRyxNQUFLLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtBQUMxQiwwQkFBSyxFQUFFLENBQUMseUJBQXlCLEdBQUcsQ0FBQyxNQUFLLEVBQUUsQ0FBQyx5QkFBeUIsR0FBQyxDQUFDLENBQUEsR0FBRSxDQUFDLENBQUM7aUJBQy9FO2FBQ0osQ0FBQyxDQUFDOztBQUVILGdCQUFJLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsWUFBSTtBQUNoQyw0Q0FBTyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDckIsb0JBQUcsTUFBSyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7QUFDMUIsd0JBQUcsTUFBSyxFQUFFLENBQUMseUJBQXlCLElBQUksQ0FBQyxFQUFFLE1BQUssRUFBRSxDQUFDLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxLQUM1RSxJQUFHLE1BQUssRUFBRSxDQUFDLHlCQUF5QixJQUFJLENBQUMsRUFBRSxNQUFLLEVBQUUsQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUMsS0FDakYsSUFBRyxNQUFLLEVBQUUsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLEVBQUUsTUFBSyxFQUFFLENBQUMseUJBQXlCLEdBQUcsQ0FBQyxDQUFDLEtBQ2pGLElBQUcsTUFBSyxFQUFFLENBQUMseUJBQXlCLElBQUksQ0FBQyxFQUFFLE1BQUssRUFBRSxDQUFDLHlCQUF5QixHQUFHLENBQUMsQ0FBQztpQkFDekY7YUFDSixDQUFDLENBQUM7O0FBRUgsZ0JBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQ2pDLDRDQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0QixvQkFBRyxNQUFLLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRTtBQUMxQix3QkFBRyxNQUFLLEVBQUUsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLEVBQUUsTUFBSyxFQUFFLENBQUMseUJBQXlCLEdBQUcsQ0FBQyxDQUFDLEtBQzVFLElBQUcsTUFBSyxFQUFFLENBQUMseUJBQXlCLElBQUksQ0FBQyxFQUFFLE1BQUssRUFBRSxDQUFDLHlCQUF5QixHQUFHLENBQUMsQ0FBQyxLQUNqRixJQUFHLE1BQUssRUFBRSxDQUFDLHlCQUF5QixJQUFJLENBQUMsRUFBRSxNQUFLLEVBQUUsQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUMsS0FDakYsSUFBRyxNQUFLLEVBQUUsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLEVBQUUsTUFBSyxFQUFFLENBQUMseUJBQXlCLEdBQUcsQ0FBQyxDQUFDO2lCQUN6RjthQUNKLENBQUMsQ0FBQzs7QUFFSCxtQkFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDOzs7ZUFFYywyQkFBRzs7O0FBR2QsZ0JBQUksVUFBVSxHQUFHLElBQUksQ0FBQzs7Ozs7O0FBQ3RCLHFDQUFtQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSw4SEFBRTt3QkFBakMsT0FBTTs7QUFDWCw4QkFBVSxHQUFHLFVBQVUsSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDO2lCQUMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0QsZ0JBQUcsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDbkMsb0JBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNsRCxvQkFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUM5QixNQUFNLElBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxVQUFVLEVBQUU7QUFDMUMsb0JBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNsRCxvQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUM1QjtTQUNKOzs7Ozs7O2VBTUcsY0FBQyxLQUFLLEVBQUU7Ozs7QUFFUixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUc7QUFDM0IsdUJBQUssSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ2pCLHNCQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDZCxzQkFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFLLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUNoQyx1QkFBSyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDdkIsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQ3ZPb0IsY0FBYzs7OztrQ0FDZCx3QkFBd0I7Ozs7Ozs7QUFJbEMsc0JBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRTs7O0FBQ3BCLHdGQUFROzs7O0FBSVIsWUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDL0MsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDbkM7Ozs7Ozs7Ozs7O2VBUUcsZ0JBQUcsRUFFTjs7O2VBRVUscUJBQUMsUUFBUSxFQUFFOzs7QUFDbEIsa0JBQU0sQ0FBQyxPQUFPLEdBQUcsWUFBTTtBQUNuQixzQkFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEIsQ0FBQzs7QUFFRixvQkFBUSxDQUFDLFlBQVksQ0FBQyxHQUFHLEVBQUUsWUFBSTtBQUMzQixzQkFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDdEIsQ0FBQyxDQUFDOztBQUVILG9CQUFRLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxZQUFJO0FBQzVCLHNCQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNuQixDQUFDLENBQUM7O0FBRUgsb0JBQVEsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLFlBQUk7QUFDOUIsc0JBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ3JCLENBQUMsQ0FBQzs7QUFFSCxvQkFBUSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsWUFBSTtBQUM5QixzQkFBSyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDckIsQ0FBQyxDQUFDOztBQUVILG9CQUFRLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFJO0FBQy9CLHNCQUFLLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN0QixDQUFDLENBQUM7O0FBRUgsb0JBQVEsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLFlBQUk7QUFDL0Isc0JBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RCLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkNwRG9CLGNBQWM7Ozs7a0NBQ2Qsd0JBQXdCOzs7OzhCQUN4QixvQkFBb0I7Ozs7Ozs7QUFJOUIsc0JBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFOzs7QUFDaEMsd0ZBQVE7QUFDUixZQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUN0QixZQUFJLENBQUMsS0FBSyxHQUFLLElBQUksSUFBSSxJQUFJLENBQUM7QUFDNUIsWUFBSSxDQUFDLEdBQUcsR0FBTyxFQUFFLElBQUksSUFBSSxDQUFDOztBQUUxQixZQUFHLElBQUksRUFDSCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQzs7QUFFdEIsWUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDO0tBQzNCOzs7Ozs7Ozs7OztlQVFHLGdCQUFHOzs7O0FBR0gsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtBQUM1QixtQkFBRyxFQUFFLG9CQUFPLE9BQU87QUFDbkIscUJBQUssRUFBRSxDQUFDO2FBQ1gsQ0FBQyxDQUFDOztBQUVILG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixzQkFBSyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFDLEVBQUUsRUFBRztBQUN4QixnREFBTyxLQUFLLDBDQUF3QyxFQUFFLENBQUcsQ0FBQztBQUMxRCwwQkFBSyxHQUFHLEdBQUcsRUFBRSxDQUFDOzs7QUFHZCx3QkFBRyxNQUFLLEtBQUssRUFDVCxNQUFLLE9BQU8sQ0FBQyxNQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBSyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7QUFHakQsMEJBQUssS0FBSyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsVUFBQyxVQUFVLEVBQUc7O0FBRXRDLDRCQUFHLE1BQUssTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7QUFDdEIsc0NBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQzt5QkFDdEI7O0FBRUQsa0NBQVUsQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFlBQUk7QUFDdEIsd0RBQU8sS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkMsd0RBQU8sR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ3ZCLGdDQUFJLElBQUksR0FBRyxNQUFLLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxrQ0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQzVCLENBQUMsQ0FBQztxQkFDTixDQUFDLENBQUM7O0FBRUgsdUJBQUcsRUFBRSxDQUFDO2lCQUNULENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7ZUFFTSxpQkFBQyxVQUFVLEVBQUU7OztBQUNoQixnQkFBSSxJQUFJLEdBQUc7QUFDUCw0QkFBWSxFQUFFLFVBQVU7YUFDM0IsQ0FBQztBQUNGLGdCQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUV2QyxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNuRCxzQkFBVSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsWUFBSTtBQUN2Qix1QkFBSyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekIsQ0FBQyxDQUFDOztBQUVILG1CQUFPLElBQUksQ0FBQztTQUNmOzs7ZUFFWSx1QkFBQyxJQUFJLEVBQUU7QUFDaEIsZ0JBQUksT0FBTyxHQUFHO0FBQ1YsdUJBQU8sRUFBRSxjQUFjO0FBQ3ZCLHNCQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUc7QUFDaEIsc0JBQU0sRUFBRTtBQUNKLDBCQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUs7aUJBQ3JCO2FBQ0osQ0FBQTs7QUFFRCxtQkFBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFL0MsZ0JBQUksS0FBSyxHQUFHLEVBQUUsQ0FBQzs7Ozs7O0FBQ2YscUNBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLDhIQUFFO3dCQUE1QixLQUFJOztBQUNSLHlCQUFLLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDO2lCQUNwQjs7Ozs7Ozs7Ozs7Ozs7OztBQUNELG1CQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7O0FBRTNCLHdDQUFPLEtBQUssbURBQWlELElBQUksQ0FBRyxDQUFDO0FBQ3JFLHdDQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixnQkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDOUIsZ0JBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1NBQzdCOzs7ZUFFUyxvQkFBQyxJQUFJLEVBQUU7QUFDYix3Q0FBTyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDNUIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRCxnQkFBSSxDQUFDLE1BQU0sVUFBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUM7OztlQUVTLG9CQUFDLE9BQU8sRUFBRTtBQUNoQix3Q0FBTyxLQUFLLHlDQUF1QyxPQUFPLENBQUMsSUFBSSxDQUFHLENBQUM7QUFDbkUsd0NBQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUVwQixnQkFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFeEIsZ0JBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxjQUFjLEVBQUU7QUFDaEMsNENBQU8sS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDcEMsNENBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzs7Ozs7Ozs7QUFHeEIsMENBQWdCLElBQUksQ0FBQyxLQUFLLG1JQUFFOzRCQUFwQixJQUFJOztBQUNSLDRCQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDNUMsd0RBQU8sS0FBSywwQkFBd0IsSUFBSSxDQUFHLENBQUM7QUFDNUMsZ0NBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt5QkFDMUM7cUJBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFRCw0Q0FBTyxLQUFLLENBQUMsb0RBQW9ELENBQUMsQ0FBQztBQUNuRSw0Q0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztBQUNwQyxvQkFBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFO0FBQzlFLHdCQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUNyRDs7QUFFRCw0Q0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUU5QixvQkFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDdEM7O0FBRUQsZ0JBQUcsT0FBTyxDQUFDLEtBQUssSUFBSSxjQUFjLEVBQUU7QUFDaEMsb0JBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7OztlQUVJLGlCQUFHO0FBQ0osZ0JBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRTs7Ozs7O0FBQ1osMENBQWdCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLG1JQUFFOzRCQUE5QixJQUFJOztBQUVSLDRCQUFJLE9BQU8sR0FBRztBQUNWLG1DQUFPLEVBQUUsY0FBYztBQUN2QixrQ0FBTSxFQUFFLElBQUksQ0FBQyxHQUFHO0FBQ2hCLGtDQUFNLEVBQUU7QUFDSix3Q0FBUSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFOzZCQUNyQzt5QkFDSixDQUFDOztBQUVGLDRCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztxQkFDakM7Ozs7Ozs7Ozs7Ozs7OzthQUNKO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekpMLElBQUkscUJBQXFCLEdBQUcsRUFBRSxDQUFBOztBQUU5QixTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQVU7b0NBQUwsSUFBSTtBQUFKLFFBQUk7OztBQUM3QixTQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtBQUNwRCxTQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7Q0FDaEI7OztBQUljLHNCQUFHOzs7QUFDVixRQUFJLENBQUMsYUFBYSxHQUFHLHFCQUFxQixDQUFBO0FBQzFDLFFBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFBO0dBQ3BCOzs7O1dBRUMsWUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ2YsVUFBRyxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDaEMsY0FBTSxJQUFJLFNBQVMsRUFBRSxDQUFBO09BQ3RCO0FBQ0QsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUE7QUFDOUQsVUFBRyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0FBQ3BDLGVBQU8sSUFBSSxDQUFBO09BQ1o7QUFDRCxlQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQ3hCLFVBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO0FBQ3hDLGFBQUssQ0FDSCwrQ0FBK0MsR0FDL0Msa0RBQWtELEdBQ2xELHFDQUFxQyxFQUNyQyxTQUFTLENBQUMsTUFBTSxFQUNoQixJQUFJLEVBQ0osSUFBSSxDQUFDLGFBQWEsQ0FDbkIsQ0FBQTtPQUNGO0FBQ0QsYUFBTyxJQUFJLENBQUE7S0FDZDs7O1dBRUcsY0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO0FBQ2pCLFVBQUksY0FBYyxHQUFHLElBQUksQ0FBQTtBQUN6QixlQUFTLFlBQVksR0FBRTtBQUNyQixzQkFBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUE7QUFDdEMsZ0JBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFBO09BQ2hDO0FBQ0QsYUFBTyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQTtLQUNyQzs7O1dBRUUsYUFBQyxJQUFJLEVBQVc7eUNBQU4sSUFBSTtBQUFKLFlBQUk7OztBQUNiLFVBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7QUFDbkIsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUE7T0FDMUI7QUFDRCxVQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdEIsVUFBRyxPQUFPLFFBQVEsSUFBSSxVQUFVLEVBQUU7QUFDaEMsY0FBTSxJQUFJLFNBQVMsRUFBRSxDQUFBO09BQ3RCO0FBQ0QsVUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNsQyxVQUFHLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRTtBQUNsQyxlQUFPLElBQUksQ0FBQTtPQUNaO0FBQ0QsVUFBSSxlQUFlLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUNqRCxVQUFHLGVBQWUsSUFBSSxDQUFDLENBQUMsRUFBRTtBQUN4QixlQUFPLElBQUksQ0FBQTtPQUNaO0FBQ0QsZUFBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFDcEMsYUFBTyxJQUFJLENBQUE7S0FDZDs7O1dBRUcsY0FBQyxJQUFJLEVBQVU7eUNBQUwsSUFBSTtBQUFKLFlBQUk7OztBQUNkLFVBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEMsVUFBRyxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUU7QUFDbEMsZUFBTyxLQUFLLENBQUE7T0FDYjtBQUNELGVBQVMsQ0FBQyxPQUFPLENBQUMsVUFBQSxFQUFFO2VBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO09BQUEsQ0FBQyxDQUFBO0FBQzdDLGFBQU8sSUFBSSxDQUFBO0tBQ2Q7OztXQUVjLHlCQUFDLGVBQWUsRUFBQztBQUM1QixVQUFHLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxlQUFlLEVBQUU7QUFDaEQsY0FBTSxJQUFJLFNBQVMsRUFBRSxDQUFBO09BQ3RCO0FBQ0QsVUFBSSxDQUFDLGFBQWEsR0FBRyxlQUFlLENBQUE7S0FDdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdFVSxzQkFBQyxJQUFJLEVBQUUsSUFBSSxFQUFFOzs7QUFDcEIsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDO0FBQ3RCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQztBQUN0QixZQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztLQUN6Qjs7OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBRyxJQUFJLENBQUMsU0FBUyxFQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztTQUN4Qzs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7U0FDMUI7OztlQUVHLGdCQUFHO0FBQ0gsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3pCOzs7ZUFFSyxrQkFBRztBQUNMLGdCQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNwQzs7O2VBRUcsZ0JBQUc7QUFDSCxtQkFBTztTQUNWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkMzQlUsTUFBTTs7OztxQ0FDUSwyQkFBMkI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWF6QyxzQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFOzs7QUFDcEUsd0ZBQU0sS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFOztBQUV2QyxZQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDekMsWUFBSSxDQUFDLE9BQU8sR0FBWSxPQUFPLENBQUM7S0FDbkM7Ozs7Ozs7O2VBS0csZ0JBQUc7OztBQUNILG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUM3QixzQkFBSyxRQUFRLEdBQUcsNkNBQTBCLENBQUM7QUFDM0Msc0JBQUssUUFBUSxDQUFDLElBQUksRUFBRSxDQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQixDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDOUJrQixjQUFjOzs7Ozs7b0NBQ1QsMEJBQTBCOzs7Ozs7Ozs7OzthQUs5QixlQUFHO0FBQ25CLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSxnQkFBZ0I7QUFDMUIsc0JBQU0sRUFBSSxNQUFNO2FBQ25CLENBQUE7U0FDSjs7O0FBRVUsc0JBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7OztBQUMxQix3RkFBTSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ2xCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ3BCOzs7O2VBRUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLFFBQVEsR0FBRyxzQ0FBb0IsSUFBSSxDQUFDLENBQUM7QUFDMUMsbUJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUMvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7MkJDckJzQixjQUFjOzs7Ozs7bUNBQ2QseUJBQXlCOzs7Ozs7Ozs7OzthQUt0QixlQUFHO0FBQ3pCLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSx1QkFBdUI7QUFDakMsc0JBQU0sRUFBSSxhQUFhO0FBQ3ZCLHdCQUFRLEVBQUUsRUFBRTtBQUNaLHNCQUFNLEVBQUUsRUFBRTtBQUNWLDBCQUFVLEVBQUUsTUFBTTthQUNyQixDQUFBO1NBQ0o7OzthQUV1QixlQUFHO0FBQ3ZCLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSxxQkFBcUI7QUFDL0Isc0JBQU0sRUFBRSxXQUFXO0FBQ25CLHdCQUFRLEVBQUUsRUFBRTtBQUNaLHNCQUFNLEVBQUUsQ0FBQztBQUNULDBCQUFVLEVBQUUsTUFBTTthQUNyQixDQUFBO1NBQ0o7OzthQUVxQixlQUFHO0FBQ3JCLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSxvQkFBb0I7QUFDOUIsc0JBQU0sRUFBRSxTQUFTO0FBQ2pCLHdCQUFRLEVBQUUsRUFBRTtBQUNaLHNCQUFNLEVBQUUsRUFBRTtBQUNWLDBCQUFVLEVBQUUsT0FBTzthQUN0QixDQUFBO1NBQ0o7OzthQUVvQixlQUFHO0FBQ3BCLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSxrQkFBa0I7QUFDNUIsc0JBQU0sRUFBRSxRQUFRO0FBQ2hCLHdCQUFRLEVBQUUsR0FBRztBQUNiLHNCQUFNLEVBQUUsQ0FBQztBQUNULDBCQUFVLEVBQUUsT0FBTzthQUN0QixDQUFBO1NBQ0o7OzthQUV5QixlQUFHO0FBQ3pCLG1CQUFPO0FBQ0gsd0JBQVEsRUFBRSx1QkFBdUI7QUFDakMsc0JBQU0sRUFBRSxhQUFhO0FBQ3JCLHdCQUFRLEVBQUUsRUFBRTtBQUNaLHNCQUFNLEVBQUUsR0FBRztBQUNYLDBCQUFVLEVBQUUsT0FBTzthQUN0QixDQUFBO1NBQ0o7OztBQUVVLHNCQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTs7O0FBQy9CLHdGQUFNLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDbEIsWUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsWUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsWUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdkIsWUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDZixZQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUM7QUFDN0IsWUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQzVCLFlBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUNoQyxZQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztLQUN4Qjs7OztlQUVHLGdCQUFHO0FBQ0gsZ0JBQUksQ0FBQyxRQUFRLEdBQUcscUNBQW1CLElBQUksQ0FBQyxDQUFDO0FBQ3pDLG1CQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7U0FDOUI7OztlQUVRLHFCQUFHO0FBQ1IsbUJBQU87QUFDSCxzQkFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO0FBQ2pCLHFCQUFLLEVBQUUsSUFBSSxDQUFDLEdBQUc7QUFDZix1QkFBTyxFQUFFLElBQUksQ0FBQyxLQUFLO0FBQ25CLDJCQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUs7QUFDdkIsd0JBQVEsRUFBRSxJQUFJLENBQUMsTUFBTTthQUN4QixDQUFBO1NBQ0o7OztlQUVVLHFCQUFDLE1BQU0sRUFBRTtBQUNoQixnQkFBSSxDQUFDLElBQUksR0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQzlCLGdCQUFJLENBQUMsR0FBRyxHQUFVLE1BQU0sQ0FBQyxHQUFHLENBQUM7QUFDN0IsZ0JBQUksQ0FBQyxLQUFLLEdBQVEsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUMvQixnQkFBSSxDQUFDLE1BQU0sR0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDO0FBQ2hDLGdCQUFJLENBQUMsU0FBUyxHQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDbEM7OztlQUVRLG1CQUFDLE1BQU0sRUFBRTtBQUNkLGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0NDN0ZzQix3QkFBd0I7Ozs7aUNBQzFCLHVCQUF1Qjs7Ozs7Ozs7Ozs7YUFLeEIsZUFBRztBQUNuQixtQkFBTztBQUNILHFCQUFLLEVBQUUsY0FBYztBQUNyQixvQkFBSSxFQUFFLGNBQWM7YUFDdkIsQ0FBQztTQUNMOzs7YUFFcUIsZUFBRztBQUNyQixtQkFBTztBQUNILHFCQUFLLEVBQUUsV0FBVztBQUNsQixvQkFBSSxFQUFFLGFBQWE7YUFDdEIsQ0FBQztTQUNMOzs7QUFFVSxzQkFBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUU7OztBQUMvQyx3RkFBUTtBQUNSLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFlBQUksQ0FBQyxRQUFRLEdBQVMsS0FBSyxDQUFDO0FBQzVCLFlBQUksQ0FBQyxRQUFRLEdBQVMsS0FBSyxDQUFDO0FBQzVCLFlBQUksQ0FBQyxPQUFPLEdBQVUsT0FBTyxDQUFDO0FBQzlCLFlBQUksQ0FBQyxPQUFPLEdBQVUsT0FBTyxDQUFDO0FBQzlCLFlBQUksQ0FBQyxTQUFTLEdBQVEsS0FBSyxDQUFDO0FBQzVCLFlBQUksQ0FBQyxTQUFTLEdBQVEsSUFBSSxDQUFDOztBQUUzQixZQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsSUFBSSxFQUFFLENBQUM7S0FDNUM7Ozs7ZUFFRyxnQkFBRztBQUNILGdCQUFJLENBQUMsUUFBUSxHQUFHLG1DQUFpQixJQUFJLENBQUMsQ0FBQztBQUN2QyxtQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO1NBQy9COzs7ZUFFYSwwQkFBRztBQUNiLGdCQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTztBQUMzQixnQkFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNwQyxnQkFBSSxDQUFDLFFBQVEsR0FBSSxJQUFJLENBQUM7QUFDdEIsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLGdCQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBRztBQUMzQixzQkFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7QUFDckMsc0JBQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLHVCQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNqQyxDQUFDLENBQUM7U0FDTjs7O2VBRVUsdUJBQUc7QUFDVixnQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsT0FBTztBQUM1QixnQkFBSSxDQUFDLFFBQVEsR0FBSSxLQUFLLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBRztBQUMzQixzQkFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDeEMsQ0FBQyxDQUFDO1NBQ047OztlQUVRLHFCQUFHO0FBQ1IsZ0JBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNkLG9CQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUN0QixvQkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxLQUFLLEVBQUc7QUFDMUIseUJBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDbEIsQ0FBQyxDQUFDO0FBQ0gsb0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDM0I7U0FDSjs7O2VBRVUsdUJBQUc7QUFDVixnQkFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFDbkIsZ0JBQUksQ0FBQyxRQUFRLEdBQUksSUFBSSxDQUFDO0FBQ3RCLGdCQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN2QixnQkFBSSxDQUFDLFFBQVEsR0FBSSxLQUFLLENBQUM7QUFDdkIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsS0FBSyxFQUFHO0FBQzFCLHFCQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDbEIsQ0FBQyxDQUFDO0FBQ0gsZ0JBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTSxFQUFHO0FBQzNCLHNCQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztBQUN6QixzQkFBTSxDQUFDLEtBQUssR0FBTyxLQUFLLENBQUM7QUFDekIsc0JBQU0sQ0FBQyxNQUFNLEdBQU0sTUFBTSxDQUFDO2FBQzdCLENBQUMsQ0FBQztBQUNILGdCQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQzdCOzs7ZUFFZSwwQkFBQyxLQUFLLEVBQUU7QUFDcEIsZ0JBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1NBQzlCOzs7ZUFFRyxnQkFBRztBQUNILGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ3JDLGdCQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDZixvQkFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLG9CQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUNwQyx3QkFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUN0QjthQUNKO1NBQ0o7OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsrQkNyR2tCLHFCQUFxQjs7OzsyQkFDckIsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV3RCLHNCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRTs7O0FBQ3pDLHdGQUFRO0FBQ1IsWUFBSSxDQUFDLEVBQUUsR0FBa0IsaUNBQWlDLENBQUM7QUFDM0QsWUFBSSxDQUFDLEtBQUssR0FBZSxLQUFLLENBQUM7QUFDL0IsWUFBSSxDQUFDLE1BQU0sR0FBYyxNQUFNLENBQUM7QUFDaEMsWUFBSSxDQUFDLE9BQU8sR0FBYSxPQUFPLENBQUM7QUFDakMsWUFBSSxDQUFDLE9BQU8sR0FBYSxPQUFPLENBQUM7QUFDakMsWUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQzs7QUFFL0IsWUFBSSxDQUFDLGFBQWEsR0FBRyxDQUNqQixRQUFRLEVBQ1IsU0FBUyxFQUNULE1BQU0sRUFDTixRQUFRLENBQ1gsQ0FBQTtBQUNELFlBQUksQ0FBQyx5QkFBeUIsR0FBRyxDQUFDLENBQUM7S0FDdEM7Ozs7Ozs7O2VBS0csZ0JBQUc7OztBQUNILG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBSztBQUM3QixzQkFBSyxRQUFRLEdBQUcsdUNBQW9CLENBQUM7QUFDckMsc0JBQUssUUFBUSxDQUFDLElBQUksRUFBRSxDQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQixDQUFDLENBQUM7U0FDTjs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFO0FBQ1IsZ0JBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQzdCOzs7ZUFFa0IsK0JBQUc7QUFDbEIsZ0JBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNwRDs7O2VBRXNCLG1DQUFHO0FBQ3RCLG1CQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLHlCQUF5QixDQUFDLENBQUM7U0FDN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQ2xEZ0IsU0FBUzs7OztzQkFDVCxVQUFVOzs7O3NCQUNWLGNBQWM7Ozs7bUJBQ2QsT0FBTzs7Ozs7O3lDQUdHLCtCQUErQjs7Ozs7QUFHL0Msc0JBQUMsT0FBTyxFQUFFOzs7QUFDakIsWUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7QUFDeEIsWUFBSSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDOztBQUVoRCxZQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBTyxZQUFZLENBQUM7QUFDekMsWUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsb0JBQU8sYUFBYSxDQUFDO0tBQzlDOzs7Ozs7ZUFHRyxnQkFBRztBQUNILGlDQUFxQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O0FBRTVDLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDckIsZ0JBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7QUFHNUIsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7O0FBRXZCLG9CQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsR0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsQUFBQyxDQUFDOzs7QUFHMUMsb0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFDL0Isb0JBQUksQ0FBQyxNQUFNLEdBQUcsQUFBQyxJQUFJLENBQUMsTUFBTSxHQUFDLG9CQUFPLEdBQUcsR0FBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQzs7QUFFekQsb0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFPLFlBQVksQ0FBQztBQUN6QyxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsb0JBQU8sYUFBYSxDQUFDO0FBQzNDLG9CQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQzs7QUFFeEMsb0JBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUM3QixvQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxvQkFBTyxZQUFZLEVBQUUsb0JBQU8sYUFBYSxDQUFDLENBQUM7O0FBRXBFLG9CQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssR0FBRyxvQkFBTyxZQUFZLENBQUM7QUFDekMsb0JBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLG9CQUFPLGFBQWEsQ0FBQztBQUMzQyxvQkFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7OztBQUd4QyxvQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHNUIsb0JBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLEdBQUUsSUFBSSxDQUFDO0FBQzVDLGtCQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDZixvQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDLENBQUM7OztBQUd6QyxvQkFBSSxRQUFRLEdBQVksQ0FBQyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUM5QyxvQkFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQVUsUUFBUSxHQUFHLGdCQUFnQixDQUFDO0FBQ3BELG9CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7O0FBRWxDLG9CQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsR0FBRyxvQkFBTyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDOzs7QUFHL0Usb0JBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQjtTQUNKOzs7Ozs7OztlQU1LLGtCQUFHO0FBQ0wsZ0NBQU8sU0FBUyxFQUFFLENBQUM7QUFDbkIsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLG9CQUFPLFlBQVksQ0FBQztBQUN6QyxnQkFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsb0JBQU8sYUFBYSxDQUFDO0FBQzNDLGdCQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQztTQUMzQzs7Ozs7Ozs7ZUFNZ0IsNkJBQUc7QUFDaEIsZ0JBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRTtBQUNoQyxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQ3BDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFO0FBQ3pDLG9CQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLENBQUM7YUFDdEMsTUFBTSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUU7QUFDMUMsb0JBQUksQ0FBQyxPQUFPLENBQUMsb0JBQW9CLEVBQUUsQ0FBQzthQUN2QyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRTtBQUM3QyxvQkFBSSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO2FBQzFDO1NBQ0o7Ozs7Ozs7ZUFLRyxnQkFBRzs7O0FBQ0gsZ0JBQUksV0FBVyxHQUFHLG1CQUFNLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUzRCxnQkFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLGdCQUFJLENBQUMsSUFBSSxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQzs7OztBQUl4QyxnQkFBSSxDQUFDLElBQUksR0FBRywyQ0FBbUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFDLGdCQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFJO0FBQ3RCLHVCQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7QUFDM0Msc0JBQUssSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN2QixzQkFBSyxRQUFRLEdBQUcsSUFBSSxHQUFDLG9CQUFPLEdBQUcsQ0FBQztBQUNoQyxzQkFBSyxLQUFLLEdBQUcsTUFBSyxJQUFJLENBQUM7QUFDdkIsc0JBQUssT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNqQixzQkFBTSxDQUFDLHFCQUFxQixDQUFDLE1BQUssSUFBSSxDQUFDLElBQUksT0FBTSxDQUFDLENBQUM7YUFDdEQsQ0FBQyxDQUFDOzs7O0FBSUgsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7QUFLMUQsZ0NBQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ2pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUN6SFksZ0JBQUMsR0FBRyxFQUFFO0FBQ2YsbUJBQU8sQ0FBQyxHQUFHLFFBQU0sR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDL0Y7OztlQUVXLGVBQUMsR0FBRyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxHQUFHLFFBQU0sR0FBRyxFQUFJLG9EQUFvRCxDQUFDLENBQUM7U0FDakY7OztlQUVTLGFBQUMsR0FBRyxFQUFFO0FBQ1osbUJBQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDcEI7OztlQUVXLGVBQUMsR0FBRyxFQUFFO0FBQ2QsbUJBQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RVLHNCQUFDLElBQUksRUFBRTs7O0FBQ2QsZUFBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUMxQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzFCLGNBQU0sQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztLQUMxQjs7OztlQUVHLGdCQUFHO0FBQ0gsbUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUM3Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VDUmUsbUJBQUMsRUFBRSxFQUFFLEdBQUcsRUFBRTs7O0FBR3RCLGdCQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7QUFHaEMsZUFBRyxHQUFHLEdBQUcsSUFBSSxFQUFFLENBQUM7QUFDaEIsZ0JBQUksUUFBUSxHQUFHLElBQUksR0FBRyxHQUFHLENBQUM7O0FBRTFCLG1CQUFRLENBQUEsU0FBUyxJQUFJLENBQUMsSUFBSSxFQUFDO0FBQ3ZCLHFDQUFxQixDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHNUIsb0JBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDL0Isb0JBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7O0FBRXZCLG9CQUFJLEtBQUssR0FBRyxRQUFRLEVBQUU7Ozs7QUFJbEIsd0JBQUksR0FBRyxHQUFHLEdBQUksS0FBSyxHQUFHLFFBQVEsQUFBQyxDQUFDOzs7QUFHaEMsc0JBQUUsRUFBRSxDQUFDO2lCQUNSO2FBQ0osQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFFO1NBQ1Q7OztlQUVzQiwwQkFBQyxFQUFFLEVBQUU7QUFDeEIsZ0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQztBQUNkLGdCQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZCxtQkFBTyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQztTQUNuQjs7O2VBRWdCLG9CQUFDLE1BQU0sRUFBRTtBQUN0QixnQkFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRTFDLGdCQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXBCLGdCQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUM7O0FBRTVCLGlCQUFLLENBQUMsR0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0FBRTVCLG1CQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVkLG9CQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7O0FBRXpCLDhCQUFVLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7aUJBQ3JELE1BQ0k7O0FBRUQsdUJBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVyQix1QkFBRyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUV4Qyx5QkFBSyxHQUFHLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUUxQyw4QkFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDM0I7YUFDSjs7QUFFRCxtQkFBTyxVQUFVLENBQUM7U0FDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzJCQy9Ea0IsY0FBYzs7OztzQkFDbEIsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O2VBR3ZCLGdCQUFDLEdBQUcsRUFBRTtBQUNSLHVGQUFhLEdBQUcsRUFBRTs7QUFFbEIsZ0JBQUksUUFBUSxHQUFNLENBQUMsR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDeEMsZUFBRyxDQUFDLElBQUksR0FBVSxRQUFRLEdBQUcsZ0JBQWdCLENBQUM7O0FBRTlDLGdCQUFJLElBQUksR0FBRyxvQkFBTyxTQUFTLElBQUUsb0JBQU8sTUFBTSxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUE7QUFDL0MsZ0JBQUksSUFBSSxHQUFHLG9CQUFPLFNBQVMsSUFBRSxvQkFBTyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQSxBQUFDLEdBQUcsUUFBUSxHQUFDLENBQUMsQ0FBQzs7O0FBRzFFLGdCQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLEVBQUU7QUFDMUIsbUJBQUcsQ0FBQyxTQUFTLEdBQUssU0FBUyxDQUFDOztBQUU1QixtQkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxPQUNULElBQUksQ0FBQyxFQUFFLENBQUMseUJBQXlCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFDL0UsSUFBSSxFQUNKLElBQUksQ0FDUCxDQUFDLENBQUM7O0FBRUgsbUJBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsT0FDVCxJQUFJLENBQUMsRUFBRSxDQUFDLHlCQUF5QixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFBLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQy9FLElBQUksR0FBRyxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxFQUN6QixJQUFJLENBQ1AsQ0FBQyxDQUFDOztBQUVILG1CQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLE9BQ1QsSUFBSSxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUMvRSxJQUFJLEVBQ0osSUFBSSxHQUFHLFFBQVEsR0FBQyxDQUFDLENBQ3BCLENBQUMsQ0FBQzs7QUFFSCxtQkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxPQUNULElBQUksQ0FBQyxFQUFFLENBQUMseUJBQXlCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUEsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFDL0UsSUFBSSxHQUFHLG9CQUFPLFNBQVMsR0FBQyxDQUFDLEVBQ3pCLElBQUksR0FBRyxRQUFRLEdBQUMsQ0FBQyxDQUNwQixDQUFDLENBQUM7YUFDTjs7QUFFRCxnQkFBSSxHQUFHLG9CQUFPLFNBQVMsSUFBRSxvQkFBTyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQTtBQUMzQyxnQkFBSSxHQUFHLG9CQUFPLFNBQVMsSUFBRSxvQkFBTyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQSxBQUFDLENBQUM7OztBQUd6RCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsVUFBQyxNQUFNLEVBQUc7QUFDdkMsb0JBQUksSUFBSSxRQUFRLEdBQUMsQ0FBQyxDQUFDOztBQUVuQixtQkFBRyxDQUFDLFNBQVMsR0FBSyxTQUFTLENBQUM7OztBQUc1QixtQkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNaLE1BQU0sQ0FBQyxJQUFJLEVBQ1gsSUFBSSxFQUNKLElBQUksQ0FDUCxDQUFDLENBQUM7O0FBRUgsb0JBQUksYUFBYSxHQUFLLElBQUksR0FBRyxvQkFBTyxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQ2hELG9CQUFJLGFBQWEsR0FBSyxJQUFJLEdBQUcsUUFBUSxHQUFDLENBQUMsQ0FBQztBQUN4QyxvQkFBSSxjQUFjLEdBQUksb0JBQU8sU0FBUyxHQUFDLENBQUMsQ0FBQztBQUN6QyxvQkFBSSxlQUFlLEdBQUcsUUFBUSxDQUFDOztBQUcvQixtQkFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsbUJBQUcsQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7OztBQUc1RSxtQkFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsb0JBQUksZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLGFBQWEsR0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQzdELG1CQUFHLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxhQUFhLEVBQUUsY0FBYyxHQUFDLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxDQUFDOzs7QUFHN0YsbUJBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLG1CQUFHLENBQUMsU0FBUyxHQUFLLENBQUMsR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDeEMsbUJBQUcsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGFBQWEsRUFBRSxjQUFjLEVBQUUsZUFBZSxDQUFDLENBQUM7O0FBRTlFLG1CQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QixtQkFBRyxDQUFDLFFBQVEsTUFBQSxDQUFaLEdBQUcsRUFBYSxDQUNULE1BQU0sQ0FBQyxhQUFhLFNBQUksTUFBTSxDQUFDLFNBQVMsRUFDM0MsYUFBYSxHQUFDLGNBQWMsR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxFQUNsRCxhQUFhLENBQ2hCLENBQUMsQ0FBQzthQUNOLENBQUMsQ0FBQztTQUNOOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozt5QkNwRmdCLFlBQVk7Ozs7NkJBQ2YsbUJBQW1COzs7O3NCQUNsQixjQUFjOzs7Ozs7O0FBR2xCLHNCQUFDLE9BQU8sRUFBRTs7O0FBQ2pCLHdGQUFPO0FBQ1AsWUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7S0FDMUI7Ozs7ZUFFRyxnQkFBRztBQUNILG1CQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FDZixJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FDeEQsQ0FBQyxDQUFDO1NBQ047OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssR0FBRyxBQUFDLEtBQUssR0FBRyxvQkFBTyxHQUFHLEdBQUMsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDNUMsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzNDLGVBQUcsQ0FBQyxTQUFTLE1BQUEsQ0FBYixHQUFHLEVBQWMsQ0FDYixNQUFNLEVBQ04sTUFBTSxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssRUFDekIsQ0FBQyxFQUNELElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEtBQUssR0FBQyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUMsQ0FBQztBQUN0QyxjQUFFLEVBQ0YsRUFBRTtBQUNGLGdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFDLG9CQUFPLFlBQVk7QUFDekQsZ0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWTthQUM3RCxDQUFDLENBQUM7U0FDTjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJDOUJnQixZQUFZOzs7OzZCQUNmLG1CQUFtQjs7OztzQkFDbEIsY0FBYzs7Ozs7OztBQUdsQixzQkFBQyxNQUFNLEVBQUU7OztBQUNoQix3RkFBUTtBQUNSLFlBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBQ3hCOzs7O2VBRUcsZ0JBQUc7QUFDSCxtQkFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQ25ELElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFHLFlBQVksQ0FBQyxFQUMxQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRyxhQUFhLENBQUMsQ0FDOUMsQ0FBQyxDQUFDO1NBQ047OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssR0FBUSxBQUFDLEtBQUssR0FBRyxvQkFBTyxHQUFHLEdBQUMsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWpELGdCQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxnQkFBSSxXQUFXLEdBQUcsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksQ0FBQzs7QUFFekQsZ0JBQUksT0FBTyxHQUFHLG9CQUFPLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDaEMsZ0JBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxFQUFFO0FBQy9CLHVCQUFPLEVBQUUsQ0FBQzthQUNiOztBQUVELGdCQUFJLE1BQU0sR0FBUSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFaEQsZ0JBQUksTUFBTSxHQUFTLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELGdCQUFJLFdBQVcsR0FBSSxNQUFNLENBQUMsS0FBSyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUNwRCxnQkFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsb0JBQU8sWUFBWSxDQUFDOzs7QUFHdkQsZUFBRyxDQUFDLFNBQVMsTUFBQSxDQUFiLEdBQUcsRUFBYyxDQUNiLE1BQU0sRUFDTixDQUFDLEVBQ0QsQ0FBQztBQUNELGtCQUFNLENBQUMsS0FBSztBQUNaLGtCQUFNLENBQUMsS0FBSztBQUNaLG1CQUFPLEdBQUUsV0FBVyxBQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRSxXQUFXLEFBQUMsR0FBSSxXQUFXLEFBQUMsR0FBSSxvQkFBTyxZQUFZLEdBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFDLElBQUksQUFBQztBQUNoSCx1QkFBVztBQUNYLHVCQUFXO2FBQ2QsQ0FBQyxDQUFDOzs7QUFJSCxlQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLG9CQUFPLFdBQVcsR0FBRSxJQUFJLENBQUMsS0FBSyxBQUFDLEdBQUcsQ0FBQztBQUMzRCxhQUFDO0FBQ0QsZ0NBQU8sV0FBVztBQUNsQixnQ0FBTyxXQUFXO0FBQ2xCLG1CQUFPLEdBQUUsV0FBVyxBQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxDQUFDLElBQUksR0FBRSxXQUFXLEFBQUM7QUFDOUIsdUJBQVc7QUFDWCx1QkFBVzthQUNkLENBQUMsQ0FBQzs7O0FBR0gsZ0JBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixvQkFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU07QUFDckIscUJBQUssTUFBTTtBQUNQLGdDQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ2pCLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxRQUFRO0FBQ1QsZ0NBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztBQUMvQiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssUUFBUTtBQUNULGdDQUFZLEdBQUcsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ2pDLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxNQUFNO0FBQ1AsZ0NBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUM7QUFDakMsMEJBQU07QUFBQSxBQUNWLHFCQUFLLFNBQVM7QUFDVixnQ0FBWSxHQUFHLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNqQywwQkFBTTtBQUFBLGFBQ2I7O0FBRUQsZ0JBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxLQUFLLE9BQU8sRUFBRTtBQUNoRSxtQkFBRyxDQUFDLFNBQVMsTUFBQSxDQUFiLEdBQUcsRUFBYyxDQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUM3QixDQUFDLEVBQ0QsWUFBWTtBQUNaLHNCQUFNLENBQUMsS0FBSztBQUNaLHNCQUFNLENBQUMsTUFBTSxHQUFDLENBQUM7QUFDZix1QkFBTyxHQUFFLFdBQVcsQUFBQyxHQUFJLFdBQVcsR0FBQyxHQUFHLEFBQUM7QUFDekMsb0JBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFFLFdBQVcsQUFBQyxHQUFJLFlBQVksR0FBQyxHQUFHLEFBQUM7QUFDbkQsMkJBQVc7QUFDWCw0QkFBWTtpQkFDZixDQUFDLENBQUM7YUFDTjtTQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM5RlUsd0JBQUc7O0tBQ2I7Ozs7Ozs7OztlQU1XLHNCQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7OztBQUN6QixtQkFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUc7QUFDM0Isb0JBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsbUJBQUcsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUNwQiwyQkFBTyxDQUFDLEdBQUcsdUJBQXFCLFFBQVEsQ0FBRyxDQUFDO0FBQzVDLHVCQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2IsQ0FBQTtBQUNELG1CQUFHLENBQUMsR0FBRyxHQUFHLDBCQUEwQixHQUFHLFFBQVEsQ0FBQzs7O0FBR2hELG9CQUFHLENBQUMsTUFBSyxVQUFVLEVBQUU7QUFDakIsMEJBQUssVUFBVSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7aUJBQy9CO0FBQ0Qsc0JBQUssVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDbEMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3lCQ3ZCZ0IsWUFBWTs7Ozs2QkFDZixtQkFBbUI7Ozs7c0JBQ2xCLGNBQWM7Ozs7Ozs7QUFHbEIsc0JBQUMsTUFBTSxFQUFFOzs7QUFDaEIsd0ZBQVE7QUFDUixZQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztBQUNuQixZQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztBQUN0QixZQUFJLENBQUMsV0FBVyxHQUFJLENBQUMsQ0FBQztLQUN6Qjs7OztlQUVHLGdCQUFHO0FBQ0gsbUJBQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUNoRCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDbEQsQ0FBQyxDQUFDO1NBQ047OztlQUVLLGdCQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDZixnQkFBSSxDQUFDLEtBQUssR0FBUSxBQUFDLEtBQUssR0FBRyxvQkFBTyxHQUFHLEdBQUMsQ0FBQyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDakQsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFDLENBQUMsQ0FBQzs7O0FBR3JCLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6QyxnQkFBSSxVQUFVLEdBQUcsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksQ0FBQztBQUN4RCxpQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG9CQUFPLE1BQU0sR0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMscUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBTyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZDLHVCQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsS0FBSyxFQUNMLENBQUMsRUFDRCxDQUFDLEVBQ0Qsb0JBQU8sV0FBVztBQUNsQix3Q0FBTyxXQUFXO0FBQ2xCLHdCQUFJLENBQUMsWUFBWSxHQUFHLFVBQVUsR0FBQyxDQUFDLEdBQUcsVUFBVTtBQUM3QyxxQkFBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEdBQUUsVUFBVTtBQUNoQiw4QkFBVSxFQUNWLFVBQVUsQ0FDYixDQUFDLENBQUM7aUJBQ047YUFDSjs7Ozs7Ozs7Ozs7OztBQWFELGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN2QyxnQkFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBQyxvQkFBTyxZQUFZLENBQUM7QUFDL0MsaUJBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxvQkFBTyxZQUFZLEdBQUUsU0FBUyxBQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3pELG1CQUFHLENBQUMsU0FBUyxNQUFBLENBQWIsR0FBRyxFQUFjLENBQ2IsSUFBSSxFQUNKLENBQUM7QUFDRCxvQkFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUs7QUFDeEIsb0JBQUksQ0FBQyxLQUFLLEVBQ1YsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUMsQ0FBQyxHQUFHLFNBQVM7QUFDMUMsaUJBQUM7QUFDRCxvQkFBSSxDQUFDLEtBQUssR0FBQyxvQkFBTyxZQUFZLEVBQzlCLElBQUksQ0FBQyxNQUFNLEdBQUMsb0JBQU8sWUFBWSxHQUFDLENBQUMsQ0FDcEMsQ0FBQyxDQUFDO2FBQ047OztBQUdELGdCQUFJLEtBQUssR0FBRyxvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxHQUFDLEVBQUUsQ0FBQztBQUN0RCxnQkFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNuQixvQkFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7QUFDM0Isb0JBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxVQUFVLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDOztBQUU5RCxvQkFBSSxDQUFDLFdBQVcsSUFBSSxLQUFLLENBQUM7QUFDMUIsb0JBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO2FBQzdEO1NBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUJDOUVnQixZQUFZOzs7O3NCQUNkLGNBQWM7Ozs7Ozs7QUFHbEIsc0JBQUMsRUFBRSxFQUFFOzs7QUFDWix3RkFBUTtBQUNSLFlBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO0FBQ2IsWUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDO0FBQ25CLFlBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCOzs7O2VBRUcsZ0JBQUc7OztBQUNILG1CQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRztBQUMzQixzQkFBSyxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyxzQkFBSyxLQUFLLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDM0IsdUJBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDYixDQUFBO0FBQ0Qsc0JBQUssS0FBSyxDQUFDLEdBQUcsR0FBRyxNQUFLLEtBQUssQ0FBQzthQUMvQixDQUFDLENBQUM7U0FDTjs7O2VBRUssZ0JBQUMsR0FBRyxFQUFFOztBQUVSLGVBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFWCxnQkFBSSxNQUFNLEdBQUcsQ0FDVCxDQUFDLEVBQ0Qsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksSUFBRSxvQkFBTyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQSxBQUFDLEVBQ3ZFLG9CQUFPLFlBQVksRUFDbkIsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksR0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FDaEUsQ0FBQzs7QUFFRixnQkFBSSxNQUFNLEdBQUcsQ0FDVCxDQUFDLEVBQ0Qsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksSUFBRSxvQkFBTyxNQUFNLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQSxBQUFDLEVBQ3ZFLG9CQUFPLFlBQVksRUFDbkIsb0JBQU8sV0FBVyxHQUFDLG9CQUFPLFlBQVksR0FBQyxJQUFJLENBQUMsV0FBVyxDQUMxRCxDQUFDOztBQUVGLGdCQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsb0JBQW9CLE1BQUEsQ0FBeEIsR0FBRyxFQUF5QixNQUFNLENBQUMsQ0FBQzs7QUFFbkQsb0JBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0FBQ3BDLG9CQUFRLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNwQyxlQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztBQUN6QixlQUFHLENBQUMsUUFBUSxNQUFBLENBQVosR0FBRyxFQUFhLE1BQU0sQ0FBQyxDQUFDOztBQUV4QixlQUFHLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQzs7O0FBRzVCLGdCQUFJLFNBQVMsR0FBRyxvQkFBTyxXQUFXLEdBQUMsb0JBQU8sWUFBWSxHQUFDLEVBQUUsQ0FBQzs7QUFFMUQsZUFBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7O0FBRTFCLGdCQUFJLFVBQVUsYUFBTyxNQUFNLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDO0FBQzNCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDOztBQUUzQixlQUFHLENBQUMsVUFBVSxNQUFBLENBQWQsR0FBRyxxQkFBZSxVQUFVLEVBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0I5QixlQUFHLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQztBQUN0QixnQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELGVBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO0FBQ3ZCLGVBQUcsQ0FBQyxJQUFJLE1BQUEsQ0FBUixHQUFHLHFCQUFTLFVBQVUsRUFBQyxDQUFDO0FBQ3hCLGVBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFWCxlQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7U0FDaEIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IEVuZ2luZSBmcm9tICcuL2FwcC9zZXJ2aWNlcy9FbmdpbmUnO1xuXG4vLyBDcmVhdGUgbmV3IGluc3RhbmNlIG9mIGdhbWVcbnZhciBlbmdpbmUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuXG4vLyBJbml0aWFsaXplIGl0XG5lbmdpbmUuaW5pdCgpO1xuXG4vLyBERUJVR1xud2luZG93LmVuZ2luZSA9IGVuZ2luZTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG4vLyAxNng5IEFzcGVjdCBSYXRpb1xuY29uZmlnLkFTUEVDVF9XSURUSCAgPSAxOTIwO1xuY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG5jb25maWcuVElMRV9YID0gMTY7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbmNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuY29uZmlnLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIEhvcml6b250YWwgb3IgVmVydGljYWwgcGVyY2VudGFnZSB0aGF0IHRoZSBnYW1lIHZpZXcgc2hvdWxkIG9jY3VweVxuICAgIGNvbmZpZy5QRVJDRU5UQUdFID0gMTtcblxuICAgIC8vIENhY2x1bGF0ZSBjYW52YXMgd2lkdGggYW5kIGhlaWdodCBhY2NvcmRpbmcgdG8gYWJvdmUgcGVyY2VudGFnZSBhbmQgYXNwZWN0IHJhdGlvXG4gICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSB3aW5kb3cub3V0ZXJXaWR0aCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3aW5kb3cgd2lsbCBmaXQgdmVydGljYWxseVxuICAgIGlmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCA9IChjb25maWcuQ0FOVkFTX0hFSUdIVCpjb25maWcuQVNQRUNUX1dJRFRIKS9jb25maWcuQVNQRUNUX0hFSUdIVDtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgU3ByaXRlIFNjYWxpbmdcbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuICAgIGNvbmZpZy5TUFJJVEVfU0NBTEUgID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCpjb25maWcuU1BSSVRFX1NJWkUpO1xuICAgIGNvbmZpZy5USUxFX1NJWkUgICAgID0gY29uZmlnLlNQUklURV9TSVpFKmNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAvLyBTZXQgRlBTXG4gICAgY29uZmlnLkZQUyA9IDMwO1xufVxuXG5jb25maWcuY2FsY3VsYXRlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCIvLyBJbXBvcnQgVXRpbHNcbmltcG9ydCBVdGlscyAgICBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgTG9nZ2VyICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJuZyAgICAgIGZyb20gJy4uL3NlcnZpY2VzL1JuZyc7XG5cbi8vIEltcG9ydCBDb250cm9sbGVyc1xuaW1wb3J0IE11bHRpcGxheWVyQ29udHJvbGxlciAgICAgZnJvbSAnLi9NdWx0aXBsYXllckNvbnRyb2xsZXInO1xuaW1wb3J0IElucHV0Q29udHJvbGxlciAgICAgICAgICAgZnJvbSAnLi9JbnB1dENvbnRyb2xsZXInO1xuXG4vLyBJbXBvcnQgTW9kZWxzXG5pbXBvcnQgUGxheWVyICAgZnJvbSAnLi4vbW9kZWxzL1BsYXllcic7XG5pbXBvcnQgTW9uc3RlciAgZnJvbSAnLi4vbW9kZWxzL01vbnN0ZXInO1xuaW1wb3J0IFJvb20gICAgIGZyb20gJy4uL21vZGVscy9Sb29tJztcbmltcG9ydCBVaSAgICAgICBmcm9tICcuLi9tb2RlbHMvVWknO1xuaW1wb3J0IEJhdHRsZVVpIGZyb20gJy4uL21vZGVscy9CYXR0bGVVaSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIC8vIFBhc3MgY3R4XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBVdGlscy5wYXJzZVF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICAgIHRoaXMucGxheWVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgbGV0IHlPZmZzZXQgPSAyLjU7XG4gICAgICAgIGxldCB4T2Zmc2V0ID0gQ29uZmlnLlRJTEVfWCAtIDM7XG5cbiAgICAgICAgLy8gQ3JlYXRlIDQgcGxheWVyc1xuICAgICAgICBsZXQgam9iID0gXCJcIjtcbiAgICAgICAgaWYocXVlcnlQYXJhbXMuam9iID09IFwia25pZ2h0XCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfS05JR0hUO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcInZpbGxhaW5cIikge1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9WSUxMQUlOO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcImhlcmJhbGlzdFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0hFUkJBTElTVDtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeVBhcmFtcy5qb2IgPT0gXCJjbGFpcnZveWFudFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0NMQUlSVk9ZQU5UO1xuICAgICAgICB9ICBlbHNlIGlmIChxdWVyeVBhcmFtcy5qb2IgPT0gXCJuZWNyb21hbmNlclwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX05FQ1JPTUFOQ0VSO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBMb2NhbCBQbGF5ZXJcbiAgICAgICAgbGV0IHAxID0gbmV3IFBsYXllcih4T2Zmc2V0LCB5T2Zmc2V0LCBxdWVyeVBhcmFtcy5uYW1lLCBqb2IpO1xuICAgICAgICB0aGlzLnBsYXllcnMuc2V0KHAxLm5hbWUsIHAxKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChwMS5pbml0KCkpO1xuICAgICAgICB3aW5kb3cucGxheWVyID0gcDE7XG5cbiAgICAgICAgLy8vLyBBZGQgYSBiYWRkaWVcbiAgICAgICAgdGhpcy5tb25zdGVyID0gbmV3IE1vbnN0ZXIoMSwgMSwgTW9uc3Rlci5UWVBFX1dVUk0pO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubW9uc3Rlci5pbml0KCkpO1xuICAgICAgICB0aGlzLm1vbnN0ZXIuaGlkZSgpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgVUlcbiAgICAgICAgdGhpcy51aSA9IG5ldyBCYXR0bGVVaSgwLCAwLCAwLCAwLCB0aGlzLnBsYXllcnMsIHRoaXMucGxheWVycyk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy51aS5pbml0KCkpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgUm9vbVxuICAgICAgICB0aGlzLnJvb20gPSBuZXcgUm9vbShSb29tLlRZUEVfQ0FWRSwgW3RoaXMubW9uc3Rlcl0sIHRoaXMucGxheWVycyk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5yb29tLmluaXQoKSk7XG5cbiAgICAgICAgdGhpcy5yb29tLm9uKFwic3RhcnQtYmF0dGxlXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLnVpLnRvZ2dsZUJhdHRsZU9wdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5yb29tLm9uKFwiZW5kLWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy51aS50b2dnbGVCYXR0bGVPcHRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbGwgb2JqZWN0c1xuICAgICAgICB0aGlzLm9iamVjdHMgPSBuZXcgU2V0KFtcbiAgICAgICAgICAgIHRoaXMucm9vbSxcbiAgICAgICAgICAgIC4uLnRoaXMucGxheWVycy52YWx1ZXMoKSxcbiAgICAgICAgICAgIHRoaXMubW9uc3RlcixcbiAgICAgICAgICAgIHRoaXMudWlcbiAgICAgICAgXSk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBNdWx0aXBsYXllciBDb250cm9sbGVyXG4gICAgICAgIGlmKHF1ZXJ5UGFyYW1zLmhvc3QpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyID0gbmV3IE11bHRpcGxheWVyQ29udHJvbGxlcihwMSwgbnVsbCwgcXVlcnlQYXJhbXMuaWQsIHF1ZXJ5UGFyYW1zLmhvc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlZWQgPSBcIlRFU1RcIjtcbiAgICAgICAgICAgIHRoaXMucm5nID0gbmV3IFJuZyhzZWVkKTtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyID0gbmV3IE11bHRpcGxheWVyQ29udHJvbGxlcihwMSwgc2VlZCwgcXVlcnlQYXJhbXMuaWQpO1xuICAgICAgICB9XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIuaW5pdCgpKTtcblxuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC8vIExJU1RFTiBGT1IgTVVMVElQTEFZRVIgRVZFTlRTIC8vXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gQWRkIHBsYXllciB3aGVuIHBlZXIgY29ubmVjdHNcbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJwZWVyLWNvbm5lY3RcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJBZGQgcGxheWVyXCIpO1xuICAgICAgICAgICAgbGV0IHAgPSBuZXcgUGxheWVyKHhPZmZzZXQsICsreU9mZnNldCwgbWVzc2FnZS5kYXRhLnBsYXllci5uYW1lLCBtZXNzYWdlLmRhdGEucGxheWVyLmpvYik7XG4gICAgICAgICAgICBwLmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBBZGQgcGxheWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLnNldChtZXNzYWdlLmZyb20sIHApO1xuICAgICAgICAgICAgICAgIExvZ2dlci5sb2codGhpcy5wbGF5ZXJzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHMuYWRkKHApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGNvbm5lY3Rpb24gYW5kIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhIHNlZWQgdGhlbiBzZXQgaXRcbiAgICAgICAgICAgIGlmKCF0aGlzLnJuZykge1xuICAgICAgICAgICAgICAgIHRoaXMucm5nID0gbmV3IFJuZyhtZXNzYWdlLmRhdGEuc2VlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgcGVlcnMgcGxheWVyIGZyb20gdGhlIGdhbWVcbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJwZWVyLWRpc2Nvbm5lY3RcIiwgKHBlZXIpPT57XG4gICAgICAgICAgICBsZXQgcGxheWVyVG9EZWxldGUgPSB0aGlzLnBsYXllcnMuZ2V0KHBlZXIpXG4gICAgICAgICAgICB0aGlzLnBsYXllcnMuZGVsZXRlKHBlZXIpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3RzLmRlbGV0ZShwbGF5ZXJUb0RlbGV0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN5bmMgUGxheWVyIHN0YXRlXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLm9uKFwicGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiU2V0IHBsYXllciB0byBSZWFkeVwiKTtcbiAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLnBsYXllcnMuZ2V0KG1lc3NhZ2UuZnJvbSk7XG4gICAgICAgICAgICBwbGF5ZXIucmVhZHkgPSBtZXNzYWdlLmRhdGEucGxheWVyLnJlYWR5O1xuICAgICAgICAgICAgcGxheWVyLmFjdGlvbiA9IG1lc3NhZ2UuZGF0YS5wbGF5ZXIuYWN0aW9uO1xuXG4gICAgICAgICAgICBpZighdGhpcy5yb29tLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyLnJlYWR5KSBwbGF5ZXIuYWN0aW9uID0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC8vIExJU1RFTiBGT1IgSU5QVVQgRVZFTlRTIC8vXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBJbnB1dCBDb250cm9sbGVyXG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyID0gbmV3IElucHV0Q29udHJvbGxlcigpO1xuXG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyLm9uKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICBpZighdGhpcy5yb29tLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICAgICAgcDEucmVhZHkgPSAhcDEucmVhZHk7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyLnJlYWR5KSBwbGF5ZXIuYWN0aW9uID0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVSb29tU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIub24oJ2VudGVyJywgKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMucm9vbS5pc0JhdHRsZSkge1xuICAgICAgICAgICAgICAgIHAxLnJlYWR5ID0gIXAxLnJlYWR5O1xuICAgICAgICAgICAgICAgIHAxLnNldEFjdGlvbih0aGlzLnVpLmdldFNlbGVjdGVkQmF0dGxlT3B0aW9uKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyLm9uKCd1cCcsICgpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ3VwJyk7XG4gICAgICAgICAgICBpZih0aGlzLnVpLnNob3dCYXR0bGVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCsyKSU0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbignZG93bicsICgpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ2Rvd24nKTtcbiAgICAgICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4KzIpJTQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyLm9uKCdsZWZ0JywgKCk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZygnbGVmdCcpO1xuICAgICAgICAgICAgaWYodGhpcy51aS5zaG93QmF0dGxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAwKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDEpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMykgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAyKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbigncmlnaHQnLCAoKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdyaWdodCcpO1xuICAgICAgICAgICAgaWYodGhpcy51aS5zaG93QmF0dGxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAwKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDEpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMykgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAyKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIHVwZGF0ZVJvb21TdGF0ZSgpIHtcbiAgICAgICAgLy8gQ2FsY3VsYXRlIGlmIHdlIHNob3VsZCBiZSBtb3ZpbmcgYmFzZWQgb24gcGxheWVyIHN0YXRlXG4gICAgICAgIC8vIE5FRURTIFRPIEJFIE1PVkVEXG4gICAgICAgIGxldCBzaG91bGRNb3ZlID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgc2hvdWxkTW92ZSA9IHNob3VsZE1vdmUgJiYgcGxheWVyLnJlYWR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGVjaWRlIGlmIHdlIG5lZWQgdG8gc3RhcnQgb3IgZW5kIGNvbWJhdFxuICAgICAgICBpZihzaG91bGRNb3ZlICYmICF0aGlzLnJvb20uaXNMb29raW5nKSB7XG4gICAgICAgICAgICB0aGlzLnJvb20uc2V0TmV4dEVuY291bnRlcih0aGlzLnJuZy5uZXh0KCkgKiA1MDApO1xuICAgICAgICAgICAgdGhpcy5yb29tLmxvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgIH0gZWxzZSBpZighdGhpcy5yb29tLmlzTG9va2luZyAmJiBzaG91bGRNb3ZlKSB7XG4gICAgICAgICAgICB0aGlzLnJvb20uc2V0TmV4dEVuY291bnRlcih0aGlzLnJuZy5uZXh0KCkgKiA1MDApO1xuICAgICAgICAgICAgdGhpcy5yb29tLnN0YXJ0TG9va2luZygpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBQcm9ncmVzcyBHYW1lIExvZ2ljIGJ5IGNhbGxpbmcgdGljayBvbiBldmVyeSBvYmplY3RcbiAgICAgKi9cbiAgICB0aWNrKGZyYW1lKSB7XG4gICAgICAgIC8vIFJlbmRlciBldmVyeXRoaW5nXG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpPT57XG4gICAgICAgICAgICB0aGlzLl9jdHguc2F2ZSgpO1xuICAgICAgICAgICAgb2JqZWN0LnRpY2soKTtcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXIodGhpcy5fY3R4LCBmcmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9jdHgucmVzdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGlkKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gQXR0YWNoIGlucHV0IGxpc3RlbmVyc1xuICAgICAgICAvLyB1c2luZyBodHRwczovL2RtYXVyby5naXRodWIuaW8vS2V5cHJlc3MvXG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgd2luZG93LmtleXByZXNzLkxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoSW5wdXQodGhpcy5saXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcblxuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG4gICAgICAgIHdpbmRvdy5vbmNsaWNrID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY2xpY2tcIik7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwidFwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY2xpY2tcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInVwXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ1cFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZG93blwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZG93blwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibGVmdFwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwibGVmdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwicmlnaHRcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInJpZ2h0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJlbnRlclwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZW50ZXJcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4uL1NlcnZpY2VzL0xvZ2dlcic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgc2VlZCwgaWQsIGhvc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9zZWVkICAgPSBzZWVkIHx8IG51bGw7XG4gICAgICAgIHRoaXMuX2lkICAgICA9IGlkIHx8IG51bGw7XG5cbiAgICAgICAgaWYoaG9zdClcbiAgICAgICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcGVlciBjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX3BlZXIgPSBuZXcgUGVlcih0aGlzLl9pZCwge1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdvcGVuJywgKGlkKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhgUGVlciBDb25uZWN0aW9uIGNyZWF0ZWQsIFBlZXIgSUQgaXMgJHtpZH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2Uga25vdyBhYm91dCBhIHBlZXIgdGhlbiBjb25uZWN0XG4gICAgICAgICAgICAgICAgaWYodGhpcy5faG9zdClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdCh0aGlzLl9ob3N0KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIGEgcGVlciBjb25uZWN0cyBoYW5kbGUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdjb25uZWN0aW9uJywgKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGFsbG93IG1vcmUgdGhhbiA0IHBsYXllcnNcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuc2l6ZSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdvcGVuJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlBlZXIgaGFzIGNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGVlciA9IHRoaXMuYWRkUGVlcihjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvUGVlcihwZWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRQZWVyKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgbGV0IHBlZXIgPSB7XG4gICAgICAgICAgICBcImNvbm5lY3Rpb25cIjogY29ubmVjdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcGVlcnMuc2V0KGNvbm5lY3Rpb24ucGVlciwgcGVlcik7XG5cbiAgICAgICAgY29ubmVjdGlvbi5vbignZGF0YScsICB0aGlzLmhhbmRsZURhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgY29ubmVjdFRvUGVlcihwZWVyKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcInBlZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcInNlZWRcIjogdGhpcy5fc2VlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbWVzc2FnZS5kYXRhLnBsYXllciA9IHRoaXMuX3BsYXllci5zZXJpYWxpemUoKTtcblxuICAgICAgICBsZXQgcGVlcnMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBwZWVyIG9mIHRoaXMuX3BlZXJzLmtleXMoKSkge1xuICAgICAgICAgICAgcGVlcnMucHVzaChwZWVyKTtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlLmRhdGEucGVlcnMgPSBwZWVycztcblxuICAgICAgICBMb2dnZXIuZGVidWcoYFNlbmRpbmcgcGVlci1jb25uZWN0IG1lc3NhZ2UgdG8gcGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuaGFzU2VudFBsYXllciA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGVlcihwZWVyKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIlJlbW92ZSBwZWVyXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWRpc2Nvbm5lY3RcIiwgcGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgICAgICB0aGlzLl9wZWVycy5kZWxldGUocGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGEobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcInBlZXItY29ubmVjdFwiKSB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ0N1cnJlbnQgY29ubmVjdGlvbnMnKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2codGhpcy5fcGVlcnMpO1xuXG4gICAgICAgICAgICAvLyBTZWUgaWYgdGhpcyBwZWVyIGtub3dzIGFib3V0IGFueSBvdGhlciBwZWVycyBhbmQgYWRkIGlmIHdlIGRvbid0IGtub3cgdGhlbVxuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIGRhdGEucGVlcnMpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fcGVlcnMuZ2V0KHBlZXIpICYmIHBlZXIgIT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhgQWRkaW5nIFBlZXIgd2l0aCBpZCAke3BlZXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGVlcih0aGlzLl9wZWVyLmNvbm5lY3QocGVlcikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdDaGVjayBpZiB3ZSBuZWVkIHRvIHNlbmQgbWVzc2FnZSB0byBtZXNzYWdlIHNlbmRlcicpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9wZWVycy5nZXQoXCJob3N0XCIpKTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pICYmICF0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKS5oYXNTZW50UGxheWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9jb25uZWN0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBlZXItY29ubmVjdFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwbGF5ZXItc3RhdGVcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2soKSB7XG4gICAgICAgIGlmKHRoaXMuX3BlZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IHBlZXIgb2YgdGhpcy5fcGVlcnMudmFsdWVzKCkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXN0YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnJvbVwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxheWVyXCI6IHRoaXMuX3BsYXllci5zZXJpYWxpemUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgIGlmKGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSAhPSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpXG4gICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgIFwicG9zc2libGUgbWVtb3J5IGxlYWssIGFkZGVkICVpICVzIGxpc3RlbmVycywgXCIrXG4gICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgIGxpc3RlbmVycy5sZW5ndGgsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgZXZlbnRzSW5zdGFuY2UgPSB0aGlzXG4gICAgICAgIGZ1bmN0aW9uIG9uY2VDYWxsYmFjaygpe1xuICAgICAgICAgIGV2ZW50c0luc3RhbmNlLm9mZih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgICAgICAgbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm9uKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICB9XG5cbiAgICBvZmYodHlwZSwgLi4uYXJncykge1xuICAgICAgICBpZihhcmdzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGFyZ3NbMF1cbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV1cbiAgICAgICAgaWYoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4T2ZMaXN0ZW5lciA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKVxuICAgICAgICBpZihpbmRleE9mTGlzdGVuZXIgPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXhPZkxpc3RlbmVyLCAxKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGVtaXQodHlwZSwgLi4uYXJncyl7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV1cbiAgICAgICAgaWYoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZuID0+IGZuLmFwcGx5KG51bGwsIGFyZ3MpKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHNldE1heExpc3RlbmVycyhuZXdNYXhMaXN0ZW5lcnMpe1xuICAgICAgICBpZihwYXJzZUludChuZXdNYXhMaXN0ZW5lcnMpICE9PSBuZXdNYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuZXdNYXhMaXN0ZW5lcnNcbiAgICB9XG5cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MpIHtcbiAgICAgICAgdGhpcy54UG9zID0geFBvcyB8fCAwO1xuICAgICAgICB0aGlzLnlQb3MgPSB5UG9zIHx8IDA7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBpZih0aGlzLmlzVmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGN0eCwgZnJhbWUpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgc2hvdygpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvZ2dsZSgpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSAhdGhpcy5pc1Zpc2libGU7XG4gICAgfVxuXG4gICAgdGljaygpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaSBmcm9tICcuL1VpJztcbmltcG9ydCBCYXR0bGVVaVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL0JhdHRsZVVpUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFVpIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAgICAgICAgICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAgICAgICAgICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggICAgICAgICAgLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgICAgICAgICAgLSAlIFkgb2Zmc2V0XG4gICAgICogQHBhcmFtIHBsYXllckNoYXJhY3RlcnMgLSBhcnJheSBvZiBwbGF5ZXJDaGFyYWN0ZXJzXG4gICAgICogQHBhcmFtIGVuZW1pZXMgICAgICAgICAgLSBhcnJheSBvZiBwbGF5ZXJDaGFyYWN0ZXJzXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSwgcGxheWVyQ2hhcmFjdGVycywgZW5lbWllcykge1xuICAgICAgICBzdXBlcih3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZKTtcblxuICAgICAgICB0aGlzLnBsYXllckNoYXJhY3RlcnMgPSBwbGF5ZXJDaGFyYWN0ZXJzO1xuICAgICAgICB0aGlzLmVuZW1pZXMgICAgICAgICAgPSBlbmVtaWVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemF0aW9uIFByb21pc2VcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IEJhdHRsZVVpUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlT2JqZWN0IGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgTW9uc3RlclJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL01vbnN0ZXJSZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU9iamVjdCB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9XVVJNKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICd3dXJtLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICAgJ3d1cm0nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih4UG9zLCB5UG9zLCB0eXBlKSB7XG4gICAgICAgIHN1cGVyKHhQb3MsIHlQb3MpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgTW9uc3RlclJlbmRlcmVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5pbml0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgICAgIGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgUGxheWVyUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvUGxheWVyUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IEpPQl9DTEFJUlZPWUFOVCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnY2xhaXJ2b3lhbnQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnY2xhaXJ2b3lhbnQnLFxuICAgICAgICAgICAgJ2hlYWx0aCc6IDYwLFxuICAgICAgICAgICAgJ21hbmEnOiA0MCxcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdiYWNrJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfSEVSQkFMSVNUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdoZXJiYWxpc3Qtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2hlcmJhbGlzdCcsXG4gICAgICAgICAgICAnaGVhbHRoJzogNDAsXG4gICAgICAgICAgICAnbWFuYSc6IDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnYmFjaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX1ZJTExBSU4oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3ZpbGxhaW4yLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICd2aWxsYWluJyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA4MCxcbiAgICAgICAgICAgICdtYW5hJzogMjAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnZnJvbnQnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9LTklHSFQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2tuaWdodC1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAna25pZ2h0JyxcbiAgICAgICAgICAgICdoZWFsdGgnOiAxMDAsXG4gICAgICAgICAgICAnbWFuYSc6IDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnZnJvbnQnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9ORUNST01BTkNFUigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnbmVjcm9tYW5jZXItc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ25lY3JvbWFuY2VyJyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA0MCxcbiAgICAgICAgICAgICdtYW5hJzogMTIwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgbmFtZSwgam9iKSB7XG4gICAgICAgIHN1cGVyKHhQb3MsIHlQb3MpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNXYWxraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuam9iID0gam9iO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gam9iLnBvc2l0aW9uO1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IGpvYi5oZWFsdGg7XG4gICAgICAgIHRoaXMuY3VycmVudEhlYWx0aCA9IGpvYi5oZWFsdGg7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gXCJ3YWl0XCI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQbGF5ZXJSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgfVxuXG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIFwiam9iXCI6IHRoaXMuam9iLFxuICAgICAgICAgICAgXCJyZWFkeVwiOiB0aGlzLnJlYWR5LFxuICAgICAgICAgICAgXCJpc1dhbGtpbmdcIjogdGhpcy5yZWFkeSxcbiAgICAgICAgICAgIFwiYWN0aW9uXCI6IHRoaXMuYWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlcmlhbGl6ZShwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lICAgICAgID0gcGxheWVyLm5hbWU7XG4gICAgICAgIHRoaXMuam9iICAgICAgICA9IHBsYXllci5qb2I7XG4gICAgICAgIHRoaXMucmVhZHkgICAgICA9IHBsYXllci5yZWFkeTtcbiAgICAgICAgdGhpcy5hY3Rpb24gICAgID0gcGxheWVyLmFjdGlvbjtcbiAgICAgICAgdGhpcy5pc1dhbGtpbmcgID0gcGxheWVyLnJlYWR5O1xuICAgIH1cblxuICAgIHNldEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciAgIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IFJvb21SZW5kZXJlciBmcm9tICcuLi92aWV3cy9Sb29tUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9DQVZFKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmxvb3I6ICdnb29kdGlsZS5wbmcnLFxuICAgICAgICAgICAgd2FsbDogJ3NoaXR3YWxsLnBuZydcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IFRZUEVfVEVNUExFKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmxvb3I6ICdncmFzcy5wbmcnLFxuICAgICAgICAgICAgd2FsbDogJ3BpbGxhcnMucG5nJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGVuZW1pZXMsIHBsYXllcnMsIGVuY291bnRlclJhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcyAgICAgICAgPSBlbmVtaWVzO1xuICAgICAgICB0aGlzLnBsYXllcnMgICAgICAgID0gcGxheWVycztcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSAgICAgID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmVuY291bnRlclJhdGUgPSBlbmNvdW50ZXJSYXRlIHx8IDUwO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUm9vbVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5pbml0KCk7XG4gICAgfVxuXG4gICAgbG9va0ZvclRyb3VibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9va2luZykgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5pc0JhdHRsZSkgdGhpcy5lbmRCYXR0bGUoKTtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTG9va2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICBwbGF5ZXIuaXNXYWxraW5nID0gIXBsYXllci5pc1dhbGtpbmc7XG4gICAgICAgICAgICBwbGF5ZXIuYWN0aW9uID0gXCJ3YWxrXCI7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuaXNXYWxraW5nKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcExvb2tpbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0xvb2tpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5kQmF0dGxlKCkge1xuICAgICAgICBpZih0aGlzLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQmF0dGxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuZm9yRWFjaCgoZW5lbXkpPT57XG4gICAgICAgICAgICAgICAgZW5lbXkudG9nZ2xlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImVuZC1iYXR0bGVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEJhdHRsZSgpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbmVteSk9PntcbiAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllci5yZWFkeSAgICAgPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllci5hY3Rpb24gICAgPSBcIndhaXRcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZW1pdChcInN0YXJ0LWJhdHRsZVwiKTtcbiAgICB9XG5cbiAgICBzZXROZXh0RW5jb3VudGVyKHRpY2tzKSB7XG4gICAgICAgIHRoaXMubmV4dEVuY291bnRlciA9IHRpY2tzO1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIHRoaXMudGlja0NvdW50ID0gdGhpcy50aWNrQ291bnQgfHwgMDtcbiAgICAgICAgaWYodGhpcy5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudGlja0NvdW50Kys7XG4gICAgICAgICAgICBpZih0aGlzLnRpY2tDb3VudCA+IHRoaXMubmV4dEVuY291bnRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCYXR0bGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGN0eCwgZnJhbWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1VpUmVuZGVyZXInO1xuaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJnICAgICAgICAgICAgICAgID0gJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy91aS1iZy5wbmcnO1xuICAgICAgICB0aGlzLndpZHRoICAgICAgICAgICAgID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ICAgICAgICAgICAgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMub2Zmc2V0WCAgICAgICAgICAgPSBvZmZzZXRYO1xuICAgICAgICB0aGlzLm9mZnNldFkgICAgICAgICAgID0gb2Zmc2V0WTtcbiAgICAgICAgdGhpcy5zaG93QmF0dGxlT3B0aW9ucyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuYmF0dGxlT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiYXR0YWNrXCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJkZWZlbmRcIlxuICAgICAgICBdXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUJhdHRsZU9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuc2hvd0JhdHRsZU9wdGlvbnMgPSAhdGhpcy5zaG93QmF0dGxlT3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEJhdHRsZU9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmF0dGxlT3B0aW9uc1t0aGlzLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXhdO1xuICAgIH1cbn1cbiIsIi8vIEltcG9ydCBVdGlsc1xuaW1wb3J0IFV0aWxzICAgIGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IExvZ2dlciAgIGZyb20gJy4vTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJuZyAgICAgIGZyb20gJy4vUm5nJztcblxuLy8gSW1wb3J0IENvbnRyb2xsZXJzXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgICAgIGZyb20gJy4uL2NvbnRyb2xsZXJzL0dhbWVDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vY29kZXRoZW9yeS5pbi9jb250cm9sbGluZy10aGUtZnJhbWUtcmF0ZS13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XG5cbiAgICAgICAgLy8gSWYgdGhlIGZwcyBpbnRlcnZhbCBpcyBjb3JyZWN0XG4gICAgICAgIGlmIChkZWx0YSA+IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aW1lIHNpbmNlIGxhc3QgZnJhbWVcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChkZWx0YSAlIHRoaXMuaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdXAgUmVuZGVyaW5nXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHRoaXMuX2ZyYW1lIHx8IDE7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9ICh0aGlzLl9mcmFtZSVDb25maWcuRlBTKSA/IHRoaXMuX2ZyYW1lIDogMTtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3MgZ2FtZVxuICAgICAgICAgICAgdGhpcy5nYW1lLnRpY2sodGhpcy5fZnJhbWUpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbmV4dCByZW5kZXIgY3ljbGVcbiAgICAgICAgICAgIGxldCB0aW1lX2VsID0gKHRoaXMudGhlbiAtIHRoaXMuZmlyc3QpLzEwMDA7XG4gICAgICAgICAgICArK3RoaXMuY291bnRlcjtcbiAgICAgICAgICAgIGxldCBmcHMgPSBwYXJzZUludCh0aGlzLmNvdW50ZXIvdGltZV9lbCk7XG5cbiAgICAgICAgICAgIC8vIFNob3cgRlBTXG4gICAgICAgICAgICBsZXQgZm9udFNpemUgICAgICAgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQodGhpcy5fZnJhbWUgKyBcIi9cIiArIENvbmZpZy5GUFMgKyBcIiBcIiArIGZwcyArIFwiZnBzXCIsIDIwLCAyMCk7XG5cbiAgICAgICAgICAgIC8vIEluY3JlbWVudCBGcmFtZVxuICAgICAgICAgICAgdGhpcy5fZnJhbWUrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSBIYW5kbGVyXG4gICAgICogQHRvZG86IGRvZXMgdGhpcyBiZWxvbmcgaGVyZT9cbiAgICAgKi9cbiAgICByZXNpemUoKSB7XG4gICAgICAgIENvbmZpZy5jYWxjdWxhdGUoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCB0aGUgZ2FtZSBnb2VzIGZ1bGwgc2NyZWVuLCB3aWxsIGZ1bGxzY3JlZW4gdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICogRm91bmQ6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GdWxsc2NyZWVuX0FQSVxuICAgICAqL1xuICAgIHJlcXVlc3RGdWxsc2NyZWVuKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbmdpbmVcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBVdGlscy5wYXJzZVF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvL2luaXRpYWxpemUgdGhlIGdhbWUgY29udHJvbGxlclxuICAgICAgICAvL0B0b2RvIG5lZWQgdG8gcGFzcyBwYXJhbXMgdG8gdGhpc1xuICAgICAgICB0aGlzLmdhbWUgPSBuZXcgR2FtZUNvbnRyb2xsZXIodGhpcy5fY3R4KTtcbiAgICAgICAgdGhpcy5nYW1lLmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgQ29udHJvbGxlciBJbml0aWFsaXplZFwiKTtcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICAgICAgdGhpcy5maXJzdCA9IHRoaXMudGhlbjtcbiAgICAgICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXR0YWNoIHJlc2l6ZSBldmVudFxuICAgICAgICAvL3dpbmRvdy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBBdHRhY2ggRnVsbHNjcmVlbiBldmVudFxuICAgICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlcXVlc3RGdWxsc2NyZWVuLmJpbmQodGhpcykpO1xuXG4gICAgICAgIExvZ2dlci5iYW5uZXIoJ0dhbWUgU3RhcnRlZCcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJORyBDUkVBVEVcIik7XG4gICAgICAgIHRoaXMuX3JuZyA9IG5ldyBSTkcoc2VlZCk7XG4gICAgICAgIHdpbmRvdy5ybmcgPSB0aGlzLl9ybmc7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZy5yYW5kb20oKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGxpbWl0bG9vcChmbiwgZnBzKSB7XG4gICAgICAgIC8vIFVzZSB2YXIgdGhlbiA9IERhdGUubm93KCk7IGlmIHlvdVxuICAgICAgICAvLyBkb24ndCBjYXJlIGFib3V0IHRhcmdldHRpbmcgPCBJRTlcbiAgICAgICAgdmFyIHRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBjdXN0b20gZnBzLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gNjBcbiAgICAgICAgZnBzID0gZnBzIHx8IDYwO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgICAgICAgICAgLy8gYWdhaW4sIERhdGUubm93KCkgaWYgaXQncyBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAvLyBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCkgaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBqdXN0IFxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZW4gPSBub3csIHdoaWNoIGNhbiBlbmQgdXAgbG93ZXJpbmcgb3ZlcmFsbCBmcHNcbiAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZm5cbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KDApKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzcGVjdEhlaWdodENhbGModzIpIHtcbiAgICAgICAgbGV0IHcxID0gMTkyMDtcbiAgICAgICAgbGV0IGgxID0gMTA4MDtcbiAgICAgICAgcmV0dXJuIGgxKncyL3cxO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZVF1ZXJ5KHNlYXJjaCkge1xuICAgICAgICB2YXIgYXJncyA9IHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcblxuICAgICAgICB2YXIgYXJnc1BhcnNlZCA9IHt9O1xuXG4gICAgICAgIHZhciBpLCBhcmcsIGt2cCwga2V5LCB2YWx1ZTtcblxuICAgICAgICBmb3IgKGk9MDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICAgICAgaWYgKC0xID09PSBhcmcuaW5kZXhPZignPScpKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2RlY29kZVVSSUNvbXBvbmVudChhcmcpLnRyaW0oKV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBrdnAgPSBhcmcuc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMF0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFsxXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJnc1BhcnNlZDtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWlSZW5kZXJlciBmcm9tICcuL1VpUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFVpUmVuZGVyZXIge1xuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKGN0eCk7XG5cbiAgICAgICAgbGV0IGZvbnRTaXplICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBjdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcblxuICAgICAgICBsZXQgeHBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ggLSA5KVxuICAgICAgICBsZXQgeXBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCkgKyBmb250U2l6ZSoyO1xuXG4gICAgICAgIC8vIFJlbmRlciBCYXR0bGUgT3B0aW9uc1xuICAgICAgICBpZih0aGlzLnVpLnNob3dCYXR0bGVPcHRpb25zKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMCA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzBdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMSA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzFdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMiA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzJdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zICsgZm9udFNpemUqMlxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7dGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDMgPyAnPicgOiAnJ30ke3RoaXMudWkuYmF0dGxlT3B0aW9uc1szXX1gLFxuICAgICAgICAgICAgICAgIHhwb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICAgICAgeXBvcyArIGZvbnRTaXplKjJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgeHBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ggLSA1KVxuICAgICAgICB5cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEluZm9cbiAgICAgICAgdGhpcy51aS5wbGF5ZXJDaGFyYWN0ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHlwb3MgKz0gZm9udFNpemUqMjtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgTmFtZXNcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgbGV0IGhlYWx0aEJhclhQb3MgICA9IHhwb3MgKyBDb25maWcuVElMRV9TSVpFKjI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyWVBvcyAgID0geXBvcyAtIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyV2lkdGggID0gQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhckhlaWdodCA9IGZvbnRTaXplO1xuXG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGMDAwMFwiO1xuICAgICAgICAgICAgbGV0IGhlYWx0aFBlcmNlbnRhZ2UgPSBwbGF5ZXIuY3VycmVudEhlYWx0aC9wbGF5ZXIubWF4SGVhbHRoO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoKmhlYWx0aFBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIuY3VycmVudEhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG1vbnN0ZXIpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBtb25zdGVyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnc3ByaXRlJywgdGhpcy5tb25zdGVyLnR5cGUuc3ByaXRlKSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNwcml0ZSxcbiAgICAgICAgICAgIHNwcml0ZS53aWR0aC8zKnRoaXMuZnJhbWUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMywgLy8gZFdpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMiwgLy8gZEhlaWdodFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICAxMCwgLy8gWXBvc1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMypDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnc3ByaXRlJywgdGhpcy5wbGF5ZXIuam9iLnNwcml0ZSksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnc2hhZG93JywgICdzaGFkb3cucG5nJyksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnYnViYmxlJywgICd3YWl0aW5nLnBuZycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgICAgICA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcblxuICAgICAgICBsZXQgcGxheWVyICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdwbGF5ZXInKTtcbiAgICAgICAgbGV0IHBsYXllcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgbGV0IHhPZmZzZXQgPSBDb25maWcuVElMRV9YIC0gMztcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIucG9zaXRpb24gPT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgIHhPZmZzZXQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzaGFkb3cgICAgICA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpO1xuXG4gICAgICAgIGxldCBidWJibGUgICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKTtcbiAgICAgICAgbGV0IGJ1YmJsZVdpZHRoICA9IGJ1YmJsZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBsZXQgYnViYmxlSGVpZ2h0ID0gYnViYmxlLmhlaWdodC81KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgLy8gRHJhdyBTaGFkb3dcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICBzaGFkb3csXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIHNoYWRvdy53aWR0aCwgLy8gZFdpZHRoXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHhPZmZzZXQqKHBsYXllcldpZHRoKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggcGxheWVyIFggUG9zXG4gICAgICAgICAgICB0aGlzLnBsYXllci55UG9zKihwbGF5ZXJXaWR0aCkgKyAocGxheWVyV2lkdGgpIC0gKENvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93JykuaGVpZ2h0LzEuNzUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gRHJhdyBQbGF5ZXIgU3ByaXRlXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJyksXG4gICAgICAgICAgICB0aGlzLnBsYXllci5pc1dhbGtpbmcgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUpIDogMCwgLy8gRFhcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIERyYXcgQnViYmxlXG4gICAgICAgIGxldCBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICBzd2l0Y2godGhpcy5wbGF5ZXIuYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwid2FpdFwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXR0YWNrXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRlZmVuZFwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSoyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhYmlsaXR5XCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnBsYXllci5hY3Rpb24gIT09IFwid2Fsa1wiICYmIHRoaXMucGxheWVyLmFjdGlvbiAhPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCwgLy8gRFlcbiAgICAgICAgICAgICAgICBidWJibGUud2lkdGgsICAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGUuaGVpZ2h0LzUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCkgLSAoYnViYmxlV2lkdGgvMS41KSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpIC0gKGJ1YmJsZUhlaWdodC8xLjUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgICAgICBidWJibGVXaWR0aCwgIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIGJ1YmJsZUhlaWdodCAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgbG9hZFJlc291cmNlKG5hbWUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzLycgKyByZXNvdXJjZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcmVzb3VyY2UgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChuYW1lLCBpbWcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvb20gPSBvYmplY3Q7XG4gICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fd2FsbE9mZnNldCAgPSAwO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcImZsb29yXCIsIHRoaXMucm9vbS50eXBlLmZsb29yKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwid2FsbFwiLCAgdGhpcy5yb29tLnR5cGUud2FsbClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSAgICAgID0gKGZyYW1lIDwgQ29uZmlnLkZQUyUyKSA/IDAgOiAxO1xuICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWUlMjtcblxuICAgICAgICAvLyBSZW5kZXIgRmxvb3JcbiAgICAgICAgbGV0IGZsb29yID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnZmxvb3InKTtcbiAgICAgICAgbGV0IGZsb29yV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5USUxFX1grMTsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgQ29uZmlnLlRJTEVfWSAtIDQ7IHkrKykge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgICAgICBmbG9vcixcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ICsgZmxvb3JXaWR0aCp4IC0gZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgKHkrMikqZmxvb3JXaWR0aCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgZmxvb3JXaWR0aFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJyksXG4gICAgICAgICAgICAvL3RoaXMucGxheWVyLmlzV2Fsa2luZyA/IENvbmZpZy5TUFJJVEVfU0laRSoodGhpcy5mcmFtZSkgOiAwLCAvLyBEWFxuICAgICAgICAgICAgLy8wLCAvLyBEWVxuICAgICAgICAgICAgLy9Db25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgLy9Db25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIC8veE9mZnNldCoocGxheWVyV2lkdGgpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgIC8vcGxheWVyV2lkdGgsIC8vIHNXaWR0aFxuICAgICAgICAgICAgLy9wbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuXG4gICAgICAgIC8vIFJlbmRlciBXYWxsXG4gICAgICAgIGxldCB3YWxsID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnd2FsbCcpO1xuICAgICAgICBsZXQgd2FsbFdpZHRoID0gd2FsbC53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLkNBTlZBU19XSURUSC8od2FsbFdpZHRoKSArIDE7IHgrKykge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgd2FsbCxcbiAgICAgICAgICAgICAgICAwLCAvLyBEWFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIqdGhpcy5mcmFtZSwgLy9EWVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgsXG4gICAgICAgICAgICAgICAgd2FsbC5oZWlnaHQvMixcbiAgICAgICAgICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICsgd2FsbFdpZHRoKnggLSB3YWxsV2lkdGgsIC8vc3hcbiAgICAgICAgICAgICAgICAwLCAvL3N5XG4gICAgICAgICAgICAgICAgd2FsbC53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0KkNvbmZpZy5TUFJJVEVfU0NBTEUvMlxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxjdWxhdGUgT2Zmc2V0c1xuICAgICAgICBsZXQgeFN0ZXAgPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8xNjtcbiAgICAgICAgaWYodGhpcy5yb29tLmlzTW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX2Zsb29yT2Zmc2V0ID49IGZsb29yV2lkdGggLSAxKSB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl93YWxsT2Zmc2V0ID4gd2FsbFdpZHRoIC0gMSkgdGhpcy5fd2FsbE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKHVpKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudWkgPSB1aTtcbiAgICAgICAgdGhpcy5fdWlCZyA9IHVpLmJnO1xuICAgICAgICB0aGlzLl90aWxlSGVpZ2h0ID0gMjtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHRoaXMuX3VpQmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGxldCBiZ1JlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCksXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodCAtIDMwMFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCB1aVJlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCksXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCguLi5iZ1JlY3QpO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcIiM2NEEzNTdcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcIiMwMDM3MDBcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KC4uLnVpUmVjdCk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjOEQ4MDQ1XCI7XG5cbiAgICAgICAgLy8gVGhlIHN0cm9rZSBpcyBtaWRkbGUgYWxpZ25lZCB3aXRoIHRoZSBlZGdlcyBvZiB0aGUgYm94XG4gICAgICAgIGxldCBsaW5lV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8zMjtcbiAgICAgICAgLy9sZXQgbGluZVdpZHRoID0gNTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICBsZXQgc3Ryb2tlUmVjdCA9IFsuLi51aVJlY3RdO1xuICAgICAgICBzdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzJdIC09IGxpbmVXaWR0aDtcbiAgICAgICAgc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gVHJ5aW5nIHRvIGdldCBzZWNvbmQgYm9yZGVyXG4gICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gXCIjRkZGRkZGXCI7XG5cbiAgICAgICAgLy9saW5lV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS80ODtcbiAgICAgICAgLy9jdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIC8vc3Ryb2tlUmVjdCA9IFsuLi51aVJlY3RdO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgLy9zdHJva2VSZWN0WzJdIC09IGxpbmVXaWR0aDtcbiAgICAgICAgLy9zdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICAvL2N0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIEZpbGwgYmcgd2l0aCBwYXRlcm5cblxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjE7XG4gICAgICAgIGxldCBwYXRlcm4gPSBjdHguY3JlYXRlUGF0dGVybih0aGlzLmltYWdlLCBcInJlcGVhdFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdGVybjtcbiAgICAgICAgY3R4LnJlY3QoLi4uc3Ryb2tlUmVjdCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgIH1cbn1cbiJdfQ==
