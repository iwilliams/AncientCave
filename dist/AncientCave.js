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
                this.multiplayerController = new _MultiplayerController2['default'](p1, null, queryParams.host);
            } else {
                var seed = "TEST";
                this.rng = new _servicesRng2['default'](seed);
                this.multiplayerController = new _MultiplayerController2['default'](p1, 'host', null, seed);
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

    function _default(player, id, host, seed) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this._player = player;
        this._peers = new Map();
        this._id = id || null;
        this._seed = seed || null;

        if (host) this._host = host;
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
                wall: 'pillars.png'
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
            document.getElementsByTagName("button")[0].addEventListener("click", this.requestFullscreen.bind(this));

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
                ctx.drawImage.apply(ctx, [wall, this._wallOffset + wallWidth * x - wallWidth, 0, this._resources.get('wall').width * _Config2['default'].SPRITE_SCALE, // sWidth
                this._resources.get('wall').height * _Config2['default'].SPRITE_SCALE // sWidth
                ]);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9TZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL0lucHV0Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL011bHRpcGxheWVyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21peGlucy9FdmVudEVtaXR0ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvUm5nLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyUmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1VpUmVuZGVyZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2lDQ0FtQix1QkFBdUI7Ozs7O0FBRzFDLElBQUksTUFBTSxHQUFHLG1DQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7O0FBR3ZDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR2QsTUFBTSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7Ozs7Ozs7O0FDVHZCLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9B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RyxHQUFHLENBQUM7QUFDdEIsZ0JBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyRCxlQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QixlQUFHLENBQUMsSUFBSSxNQUFBLENBQVIsR0FBRyxxQkFBUyxVQUFVLEVBQUMsQ0FBQztBQUN4QixlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVgsZUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2hCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi9hcHAvc2VydmljZXMvRW5naW5lJztcblxuLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG52YXIgZW5naW5lID0gbmV3IEVuZ2luZShkb2N1bWVudC5ib2R5KTtcblxuLy8gSW5pdGlhbGl6ZSBpdFxuZW5naW5lLmluaXQoKTtcblxuLy8gREVCVUdcbndpbmRvdy5lbmdpbmUgPSBlbmdpbmU7XG5cbiIsImxldCBjb25maWcgPSB7fTtcbi8qKlxuICogU2hvdWxkIGJlIHNldCB1cCB0byByZWNhbGN1bGF0ZSBvbiB0aGUgZmx5IHdoZW4gdGhpbmdzIGNoYWduZS5cbiAqIE5vdCB3b3JraW5nIHJpZ2h0IGF0IGFsbCBmb3Igd2luZG93IHNpemUgY2hhZ25lcy5cbiAqL1xuY29uZmlnLkFQSV9LRVkgPSBcInhhaHh4MHl1eTVsZTRzNGlcIjtcblxuLy8gMTZ4OSBBc3BlY3QgUmF0aW9cbmNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbmNvbmZpZy5BU1BFQ1RfSEVJR0hUID0gMTA4MDtcblxuY29uZmlnLlRJTEVfWCA9IDE2OyAvLyBNVVNUIEJFIE1VTFRJUExFIE9GIDE2XG5jb25maWcuVElMRV9ZID0gKGNvbmZpZy5USUxFX1gqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbmNvbmZpZy5jYWxjdWxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBIb3Jpem9udGFsIG9yIFZlcnRpY2FsIHBlcmNlbnRhZ2UgdGhhdCB0aGUgZ2FtZSB2aWV3IHNob3VsZCBvY2N1cHlcbiAgICBjb25maWcuUEVSQ0VOVEFHRSA9IDE7XG5cbiAgICAvLyBDYWNsdWxhdGUgY2FudmFzIHdpZHRoIGFuZCBoZWlnaHQgYWNjb3JkaW5nIHRvIGFib3ZlIHBlcmNlbnRhZ2UgYW5kIGFzcGVjdCByYXRpb1xuICAgIGNvbmZpZy5DQU5WQVNfV0lEVEggID0gd2luZG93Lm91dGVyV2lkdGgqY29uZmlnLlBFUkNFTlRBR0U7XG4gICAgY29uZmlnLkNBTlZBU19IRUlHSFQgPSAoY29uZmlnLkNBTlZBU19XSURUSCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuICAgIC8vIE1ha2Ugc3VyZSB0aGUgd2luZG93IHdpbGwgZml0IHZlcnRpY2FsbHlcbiAgICBpZihjb25maWcuQ0FOVkFTX0hFSUdIVCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCAgPSB3aW5kb3cub3V0ZXJIZWlnaHQqY29uZmlnLlBFUkNFTlRBR0U7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfV0lEVEggPSAoY29uZmlnLkNBTlZBU19IRUlHSFQqY29uZmlnLkFTUEVDVF9XSURUSCkvY29uZmlnLkFTUEVDVF9IRUlHSFQ7XG4gICAgfVxuXG4gICAgLy8gRGV0ZXJtaW5lIFNwcml0ZSBTY2FsaW5nXG4gICAgY29uZmlnLlNQUklURV9TSVpFICAgPSAyNDtcbiAgICBjb25maWcuU1BSSVRFX1NDQUxFICA9IGNvbmZpZy5DQU5WQVNfV0lEVEgvKGNvbmZpZy5USUxFX1gqY29uZmlnLlNQUklURV9TSVpFKTtcbiAgICBjb25maWcuVElMRV9TSVpFICAgICA9IGNvbmZpZy5TUFJJVEVfU0laRSpjb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgLy8gU2V0IEZQU1xuICAgIGNvbmZpZy5GUFMgPSAzMDtcbn1cblxuY29uZmlnLmNhbGN1bGF0ZSgpO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnfWAsICdmb250LXNpemU6IDE1cHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2cobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IExvZ2dlciAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9SbmcnO1xuXG4vLyBJbXBvcnQgQ29udHJvbGxlcnNcbmltcG9ydCBNdWx0aXBsYXllckNvbnRyb2xsZXIgICAgIGZyb20gJy4vTXVsdGlwbGF5ZXJDb250cm9sbGVyJztcbmltcG9ydCBJbnB1dENvbnRyb2xsZXIgICAgICAgICAgIGZyb20gJy4vSW5wdXRDb250cm9sbGVyJztcblxuLy8gSW1wb3J0IE1vZGVsc1xuaW1wb3J0IFBsYXllciAgIGZyb20gJy4uL21vZGVscy9QbGF5ZXInO1xuaW1wb3J0IE1vbnN0ZXIgIGZyb20gJy4uL21vZGVscy9Nb25zdGVyJztcbmltcG9ydCBSb29tICAgICBmcm9tICcuLi9tb2RlbHMvUm9vbSc7XG5pbXBvcnQgVWkgICAgICAgZnJvbSAnLi4vbW9kZWxzL1VpJztcbmltcG9ydCBCYXR0bGVVaSBmcm9tICcuLi9tb2RlbHMvQmF0dGxlVWknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICAvLyBQYXNzIGN0eFxuICAgIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gVXRpbHMucGFyc2VRdWVyeSh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuICAgICAgICB0aGlzLnBsYXllcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gMi41O1xuICAgICAgICBsZXQgeE9mZnNldCA9IENvbmZpZy5USUxFX1ggLSAzO1xuXG4gICAgICAgIC8vIENyZWF0ZSA0IHBsYXllcnNcbiAgICAgICAgbGV0IGpvYiA9IFwiXCI7XG4gICAgICAgIGlmKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcImtuaWdodFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0tOSUdIVDtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeVBhcmFtcy5qb2IgPT0gXCJ2aWxsYWluXCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfVklMTEFJTjtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeVBhcmFtcy5qb2IgPT0gXCJoZXJiYWxpc3RcIikge1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9IRVJCQUxJU1Q7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlQYXJhbXMuam9iID09IFwiY2xhaXJ2b3lhbnRcIikge1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9DTEFJUlZPWUFOVDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluaXRpYWxpemUgTG9jYWwgUGxheWVyXG4gICAgICAgIGxldCBwMSA9IG5ldyBQbGF5ZXIoeE9mZnNldCwgeU9mZnNldCwgcXVlcnlQYXJhbXMubmFtZSwgam9iKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLnNldChwMS5uYW1lLCBwMSk7XG4gICAgICAgIHByb21pc2VzLnB1c2gocDEuaW5pdCgpKTtcbiAgICAgICAgd2luZG93LnBsYXllciA9IHAxO1xuXG4gICAgICAgIC8vLy8gQWRkIGEgYmFkZGllXG4gICAgICAgIHRoaXMubW9uc3RlciA9IG5ldyBNb25zdGVyKDEsIDEsIE1vbnN0ZXIuVFlQRV9XVVJNKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLm1vbnN0ZXIuaW5pdCgpKTtcbiAgICAgICAgdGhpcy5tb25zdGVyLmhpZGUoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIFVJXG4gICAgICAgIHRoaXMudWkgPSBuZXcgQmF0dGxlVWkoMCwgMCwgMCwgMCwgdGhpcy5wbGF5ZXJzLCB0aGlzLnBsYXllcnMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMudWkuaW5pdCgpKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIFJvb21cbiAgICAgICAgdGhpcy5yb29tID0gbmV3IFJvb20oUm9vbS5UWVBFX0NBVkUsIFt0aGlzLm1vbnN0ZXJdLCB0aGlzLnBsYXllcnMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucm9vbS5pbml0KCkpO1xuXG4gICAgICAgIHRoaXMucm9vbS5vbihcInN0YXJ0LWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy51aS50b2dnbGVCYXR0bGVPcHRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm9vbS5vbihcImVuZC1iYXR0bGVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMudWkudG9nZ2xlQmF0dGxlT3B0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgYWxsIG9iamVjdHNcbiAgICAgICAgdGhpcy5vYmplY3RzID0gbmV3IFNldChbXG4gICAgICAgICAgICB0aGlzLnJvb20sXG4gICAgICAgICAgICAuLi50aGlzLnBsYXllcnMudmFsdWVzKCksXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIsXG4gICAgICAgICAgICB0aGlzLnVpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgTXVsdGlwbGF5ZXIgQ29udHJvbGxlclxuICAgICAgICBpZihxdWVyeVBhcmFtcy5ob3N0KSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlciA9IG5ldyBNdWx0aXBsYXllckNvbnRyb2xsZXIocDEsIG51bGwsIHF1ZXJ5UGFyYW1zLmhvc3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IHNlZWQgPSBcIlRFU1RcIjtcbiAgICAgICAgICAgIHRoaXMucm5nID0gbmV3IFJuZyhzZWVkKTtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyID0gbmV3IE11bHRpcGxheWVyQ29udHJvbGxlcihwMSwgJ2hvc3QnLCBudWxsLCBzZWVkKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmluaXQoKSk7XG5cblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyBMSVNURU4gRk9SIE1VTFRJUExBWUVSIEVWRU5UUyAvL1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vIEFkZCBwbGF5ZXIgd2hlbiBwZWVyIGNvbm5lY3RzXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLm9uKFwicGVlci1jb25uZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiQWRkIHBsYXllclwiKTtcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcih4T2Zmc2V0LCArK3lPZmZzZXQsIG1lc3NhZ2UuZGF0YS5wbGF5ZXIubmFtZSwgbWVzc2FnZS5kYXRhLnBsYXllci5qb2IpO1xuICAgICAgICAgICAgcC5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhgQWRkIHBsYXllciB3aXRoIGlkICR7bWVzc2FnZS5mcm9tfWApO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycy5zZXQobWVzc2FnZS5mcm9tLCBwKTtcbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMucGxheWVycyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLmFkZChwKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBjb25uZWN0aW9uIGFuZCB3ZSBkb24ndCBhbHJlYWR5IGhhdmUgYSBzZWVkIHRoZW4gc2V0IGl0XG4gICAgICAgICAgICBpZighdGhpcy5ybmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJuZyA9IG5ldyBSbmcobWVzc2FnZS5kYXRhLnNlZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZW1vdmUgdGhlIHBlZXJzIHBsYXllciBmcm9tIHRoZSBnYW1lXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLm9uKFwicGVlci1kaXNjb25uZWN0XCIsIChwZWVyKT0+e1xuICAgICAgICAgICAgbGV0IHBsYXllclRvRGVsZXRlID0gdGhpcy5wbGF5ZXJzLmdldChwZWVyKVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLmRlbGV0ZShwZWVyKTtcbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5kZWxldGUocGxheWVyVG9EZWxldGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBTeW5jIFBsYXllciBzdGF0ZVxuICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5vbihcInBsYXllci1zdGF0ZVwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlNldCBwbGF5ZXIgdG8gUmVhZHlcIik7XG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5wbGF5ZXJzLmdldChtZXNzYWdlLmZyb20pO1xuICAgICAgICAgICAgcGxheWVyLnJlYWR5ID0gbWVzc2FnZS5kYXRhLnBsYXllci5yZWFkeTtcbiAgICAgICAgICAgIHBsYXllci5hY3Rpb24gPSBtZXNzYWdlLmRhdGEucGxheWVyLmFjdGlvbjtcblxuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0JhdHRsZSkge1xuICAgICAgICAgICAgICAgIGlmKHBsYXllci5yZWFkeSkgcGxheWVyLmFjdGlvbiA9IFwicmVhZHlcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVJvb21TdGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyBMSVNURU4gRk9SIElOUFVUIEVWRU5UUyAvL1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgSW5wdXQgQ29udHJvbGxlclxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlciA9IG5ldyBJbnB1dENvbnRyb2xsZXIoKTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbignY2xpY2snLCAoKT0+e1xuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0JhdHRsZSkge1xuICAgICAgICAgICAgICAgIHAxLnJlYWR5ID0gIXAxLnJlYWR5O1xuICAgICAgICAgICAgICAgIGlmKHBsYXllci5yZWFkeSkgcGxheWVyLmFjdGlvbiA9IFwicmVhZHlcIjtcbiAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5jbGljaygpO1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUm9vbVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyLm9uKCdlbnRlcicsICgpPT57XG4gICAgICAgICAgICBpZih0aGlzLnJvb20uaXNCYXR0bGUpIHtcbiAgICAgICAgICAgICAgICBwMS5yZWFkeSA9ICFwMS5yZWFkeTtcbiAgICAgICAgICAgICAgICBwMS5zZXRBY3Rpb24odGhpcy51aS5nZXRTZWxlY3RlZEJhdHRsZU9wdGlvbigpKTtcbiAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbigndXAnLCAoKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCd1cCcpO1xuICAgICAgICAgICAgaWYodGhpcy51aS5zaG93QmF0dGxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9ICh0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXgrMiklNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIub24oJ2Rvd24nLCAoKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdkb3duJyk7XG4gICAgICAgICAgICBpZih0aGlzLnVpLnNob3dCYXR0bGVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCsyKSU0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbignbGVmdCcsICgpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ2xlZnQnKTtcbiAgICAgICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMCkgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAxKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDMpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDI7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMikgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIub24oJ3JpZ2h0JywgKCk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZygncmlnaHQnKTtcbiAgICAgICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMCkgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAxKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDMpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDI7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMikgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICB1cGRhdGVSb29tU3RhdGUoKSB7XG4gICAgICAgIC8vIENhbGN1bGF0ZSBpZiB3ZSBzaG91bGQgYmUgbW92aW5nIGJhc2VkIG9uIHBsYXllciBzdGF0ZVxuICAgICAgICAvLyBORUVEUyBUTyBCRSBNT1ZFRFxuICAgICAgICBsZXQgc2hvdWxkTW92ZSA9IHRydWU7XG4gICAgICAgIGZvciAobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgIHNob3VsZE1vdmUgPSBzaG91bGRNb3ZlICYmIHBsYXllci5yZWFkeTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIERlY2lkZSBpZiB3ZSBuZWVkIHRvIHN0YXJ0IG9yIGVuZCBjb21iYXRcbiAgICAgICAgaWYoc2hvdWxkTW92ZSAmJiAhdGhpcy5yb29tLmlzTG9va2luZykge1xuICAgICAgICAgICAgdGhpcy5yb29tLnNldE5leHRFbmNvdW50ZXIodGhpcy5ybmcubmV4dCgpICogNTAwKTtcbiAgICAgICAgICAgIHRoaXMucm9vbS5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICB9IGVsc2UgaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcgJiYgc2hvdWxkTW92ZSkge1xuICAgICAgICAgICAgdGhpcy5yb29tLnNldE5leHRFbmNvdW50ZXIodGhpcy5ybmcubmV4dCgpICogNTAwKTtcbiAgICAgICAgICAgIHRoaXMucm9vbS5zdGFydExvb2tpbmcoKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogUHJvZ3Jlc3MgR2FtZSBMb2dpYyBieSBjYWxsaW5nIHRpY2sgb24gZXZlcnkgb2JqZWN0XG4gICAgICovXG4gICAgdGljayhmcmFtZSkge1xuICAgICAgICAvLyBSZW5kZXIgZXZlcnl0aGluZ1xuICAgICAgICB0aGlzLm9iamVjdHMuZm9yRWFjaCgob2JqZWN0KT0+e1xuICAgICAgICAgICAgdGhpcy5fY3R4LnNhdmUoKTtcbiAgICAgICAgICAgIG9iamVjdC50aWNrKCk7XG4gICAgICAgICAgICBvYmplY3QucmVuZGVyKHRoaXMuX2N0eCwgZnJhbWUpO1xuICAgICAgICAgICAgdGhpcy5fY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBpZCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIC8vIEF0dGFjaCBpbnB1dCBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdXNpbmcgaHR0cHM6Ly9kbWF1cm8uZ2l0aHViLmlvL0tleXByZXNzL1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBhdHRhY2hJbnB1dChsaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNsaWNrXCIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInRcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImNsaWNrXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJ1cFwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwidXBcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImRvd25cIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImRvd25cIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImxlZnRcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImxlZnRcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInJpZ2h0XCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJyaWdodFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZW50ZXJcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImVudGVyXCIpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9TZXJ2aWNlcy9Mb2dnZXInO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGlkLCBob3N0LCBzZWVkKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5fcGVlcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuX2lkID0gaWQgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5fc2VlZCA9IHNlZWQgfHwgbnVsbDtcblxuICAgICAgICBpZihob3N0KVxuICAgICAgICAgICAgdGhpcy5faG9zdCA9IGhvc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBwZWVyIGNvbm5lY3Rpb25cbiAgICAgICAgdGhpcy5fcGVlciA9IG5ldyBQZWVyKHRoaXMuX2lkLCB7XG4gICAgICAgICAgICBrZXk6IENvbmZpZy5BUElfS0VZLFxuICAgICAgICAgICAgZGVidWc6IDNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuX3BlZXIub24oJ29wZW4nLCAoaWQpPT57XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBQZWVyIENvbm5lY3Rpb24gY3JlYXRlZCwgUGVlciBJRCBpcyAke2lkfWApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBrbm93IGFib3V0IGEgcGVlciB0aGVuIGNvbm5lY3RcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9ob3N0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHRoaXMuX2hvc3QpKTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gYSBwZWVyIGNvbm5lY3RzIGhhbmRsZSBpdFxuICAgICAgICAgICAgICAgIHRoaXMuX3BlZXIub24oJ2Nvbm5lY3Rpb24nLCAoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vbignb3BlbicsICgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJQZWVyIGhhcyBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBMb2dnZXIubG9nKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBlZXIgPSB0aGlzLmFkZFBlZXIoY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGVlcihjb25uZWN0aW9uKSB7XG4gICAgICAgIGxldCBwZWVyID0ge1xuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IGNvbm5lY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BlZXJzLnNldChjb25uZWN0aW9uLnBlZXIsIHBlZXIpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAgdGhpcy5oYW5kbGVEYXRhLmJpbmQodGhpcykpO1xuICAgICAgICBjb25uZWN0aW9uLm9uKCdjbG9zZScsICgpPT57XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVBlZXIocGVlcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwZWVyO1xuICAgIH1cblxuICAgIGNvbm5lY3RUb1BlZXIocGVlcikge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwZWVyLWNvbm5lY3RcIixcbiAgICAgICAgICAgIFwiZnJvbVwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJzZWVkXCI6IHRoaXMuX3NlZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1lc3NhZ2UuZGF0YS5wbGF5ZXIgPSB0aGlzLl9wbGF5ZXIuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgbGV0IHBlZXJzID0gW107XG4gICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy5rZXlzKCkpIHtcbiAgICAgICAgICAgIHBlZXJzLnB1c2gocGVlcik7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZS5kYXRhLnBlZXJzID0gcGVlcnM7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKGBTZW5kaW5nIHBlZXItY29ubmVjdCBtZXNzYWdlIHRvIHBlZXIgd2l0aCBpZCAke3BlZXJ9YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmhhc1NlbnRQbGF5ZXIgPSB0cnVlO1xuICAgIH1cblxuICAgIHJlbW92ZVBlZXIocGVlcikge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJSZW1vdmUgcGVlclwiKTtcbiAgICAgICAgdGhpcy5lbWl0KFwicGVlci1kaXNjb25uZWN0XCIsIHBlZXIuY29ubmVjdGlvbi5wZWVyKTtcbiAgICAgICAgdGhpcy5fcGVlcnMuZGVsZXRlKHBlZXIuY29ubmVjdGlvbi5wZWVyKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEYXRhKG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKGBNZXNzYWdlIHJlY2lldmVkIGZyb20gcGVlciB3aXRoIGlkICR7bWVzc2FnZS5mcm9tfWApO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuXG4gICAgICAgIGxldCBkYXRhID0gbWVzc2FnZS5kYXRhO1xuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwZWVyLWNvbm5lY3RcIikge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdDdXJyZW50IGNvbm5lY3Rpb25zJyk7XG4gICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMuX3BlZXJzKTtcblxuICAgICAgICAgICAgLy8gU2VlIGlmIHRoaXMgcGVlciBrbm93cyBhYm91dCBhbnkgb3RoZXIgcGVlcnMgYW5kIGFkZCBpZiB3ZSBkb24ndCBrbm93IHRoZW1cbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiBkYXRhLnBlZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3BlZXJzLmdldChwZWVyKSAmJiBwZWVyICE9PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoYEFkZGluZyBQZWVyIHdpdGggaWQgJHtwZWVyfWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHBlZXIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZygnQ2hlY2sgaWYgd2UgbmVlZCB0byBzZW5kIG1lc3NhZ2UgdG8gbWVzc2FnZSBzZW5kZXInKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2codGhpcy5fcGVlcnMuZ2V0KFwiaG9zdFwiKSk7XG4gICAgICAgICAgICBpZih0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKSAmJiAhdGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkuaGFzU2VudFBsYXllcikge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvUGVlcih0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIExvZ2dlci5sb2codGhpcy5fY29ubmVjdGlvbnMpO1xuXG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWNvbm5lY3RcIiwgbWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGxheWVyLXN0YXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1zdGF0ZVwiLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrKCkge1xuICAgICAgICBpZih0aGlzLl9wZWVycykge1xuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIHRoaXMuX3BlZXJzLnZhbHVlcygpKSB7XG5cbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJldmVudFwiOiBcInBsYXllci1zdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcImZyb21cIjogdGhpcy5faWQsXG4gICAgICAgICAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYXllclwiOiB0aGlzLl9wbGF5ZXIuc2VyaWFsaXplKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBwZWVyLmNvbm5lY3Rpb24uc2VuZChtZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsInZhciBERUZBVUxUX01BWF9MSVNURU5FUlMgPSAxMlxuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlLCAuLi5hcmdzKXtcbiAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBbbWVzc2FnZV0uY29uY2F0KGFyZ3MpKVxuICBjb25zb2xlLnRyYWNlKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IERFRkFVTFRfTUFYX0xJU1RFTkVSU1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fVxuICAgIH1cblxuICAgIG9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICBpZihsaXN0ZW5lcnMubGVuZ3RoID4gdGhpcy5fbWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgXCJ1c2UgRXZlbnRFbWl0dGVyI3NldE1heExpc3RlbmVycyhudW1iZXIpIGlmIHlvdSBcIiArXG4gICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih4UG9zLCB5UG9zKSB7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3MgfHwgMDtcbiAgICAgICAgdGhpcy55UG9zID0geVBvcyB8fCAwO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgaWYodGhpcy5pc1Zpc2libGUpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgsIGZyYW1lKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWkgZnJvbSAnLi9VaSc7XG5pbXBvcnQgQmF0dGxlVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9CYXR0bGVVaVJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBVaSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgICAgICAgICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgICAgICAgICAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYICAgICAgICAgIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZICAgICAgICAgIC0gJSBZIG9mZnNldFxuICAgICAqIEBwYXJhbSBwbGF5ZXJDaGFyYWN0ZXJzIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqIEBwYXJhbSBlbmVtaWVzICAgICAgICAgIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFksIHBsYXllckNoYXJhY3RlcnMsIGVuZW1pZXMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDaGFyYWN0ZXJzID0gcGxheWVyQ2hhcmFjdGVycztcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICAgID0gZW5lbWllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXphdGlvbiBQcm9taXNlXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBCYXR0bGVVaVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IE1vbnN0ZXJSZW5kZXJlciBmcm9tICcuLi92aWV3cy9Nb25zdGVyUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV1VSTSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAgICd3dXJtJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgdHlwZSkge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IE1vbnN0ZXJSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaW5pdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlT2JqZWN0ICAgICBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IFBsYXllclJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1BsYXllclJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBKT0JfQ0xBSVJWT1lBTlQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2NsYWlydm95YW50LXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50JyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA2MCxcbiAgICAgICAgICAgICdtYW5hJzogNDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnYmFjaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX0hFUkJBTElTVCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnaGVyYmFsaXN0LXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICdoZXJiYWxpc3QnLFxuICAgICAgICAgICAgJ2hlYWx0aCc6IDQwLFxuICAgICAgICAgICAgJ21hbmEnOiAwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2JhY2snXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9WSUxMQUlOKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICd2aWxsYWluMi1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAndmlsbGFpbicsXG4gICAgICAgICAgICAnaGVhbHRoJzogODAsXG4gICAgICAgICAgICAnbWFuYSc6IDIwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfS05JR0hUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdrbmlnaHQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2tuaWdodCcsXG4gICAgICAgICAgICAnaGVhbHRoJzogMTAwLFxuICAgICAgICAgICAgJ21hbmEnOiAwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgbmFtZSwgam9iKSB7XG4gICAgICAgIHN1cGVyKHhQb3MsIHlQb3MpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNXYWxraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuam9iID0gam9iO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gam9iLnBvc2l0aW9uO1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IGpvYi5oZWFsdGg7XG4gICAgICAgIHRoaXMuY3VycmVudEhlYWx0aCA9IGpvYi5oZWFsdGg7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gXCJ3YWl0XCI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQbGF5ZXJSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgfVxuXG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIFwiam9iXCI6IHRoaXMuam9iLFxuICAgICAgICAgICAgXCJyZWFkeVwiOiB0aGlzLnJlYWR5LFxuICAgICAgICAgICAgXCJpc1dhbGtpbmdcIjogdGhpcy5yZWFkeSxcbiAgICAgICAgICAgIFwiYWN0aW9uXCI6IHRoaXMuYWN0aW9uXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlcmlhbGl6ZShwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5uYW1lICAgICAgID0gcGxheWVyLm5hbWU7XG4gICAgICAgIHRoaXMuam9iICAgICAgICA9IHBsYXllci5qb2I7XG4gICAgICAgIHRoaXMucmVhZHkgICAgICA9IHBsYXllci5yZWFkeTtcbiAgICAgICAgdGhpcy5hY3Rpb24gICAgID0gcGxheWVyLmFjdGlvbjtcbiAgICAgICAgdGhpcy5pc1dhbGtpbmcgID0gcGxheWVyLnJlYWR5O1xuICAgIH1cblxuICAgIHNldEFjdGlvbihhY3Rpb24pIHtcbiAgICAgICAgdGhpcy5hY3Rpb24gPSBhY3Rpb247XG4gICAgfVxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciAgIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuaW1wb3J0IFJvb21SZW5kZXJlciBmcm9tICcuLi92aWV3cy9Sb29tUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9DQVZFKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmxvb3I6ICdnb29kdGlsZS5wbmcnLFxuICAgICAgICAgICAgd2FsbDogJ3BpbGxhcnMucG5nJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgVFlQRV9URU1QTEUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmbG9vcjogJ2dyYXNzLnBuZycsXG4gICAgICAgICAgICB3YWxsOiAncGlsbGFycy5wbmcnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IodHlwZSwgZW5lbWllcywgcGxheWVycywgZW5jb3VudGVyUmF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmlzTW92aW5nICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNCYXR0bGUgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICA9IGVuZW1pZXM7XG4gICAgICAgIHRoaXMucGxheWVycyAgICAgICAgPSBwbGF5ZXJzO1xuICAgICAgICB0aGlzLmlzTG9va2luZyAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlICAgICAgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZW5jb3VudGVyUmF0ZSA9IGVuY291bnRlclJhdGUgfHwgNTA7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSb29tUmVuZGVyZXIodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmluaXQoKTtcbiAgICB9XG5cbiAgICBsb29rRm9yVHJvdWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb29raW5nKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmlzQmF0dGxlKSB0aGlzLmVuZEJhdHRsZSgpO1xuICAgICAgICB0aGlzLmlzTW92aW5nICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgICAgIHBsYXllci5hY3Rpb24gPSBcIndhbGtcIjtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHBsYXllci5pc1dhbGtpbmcpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9wTG9va2luZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9va2luZykgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzTW92aW5nICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTG9va2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgcGxheWVyLmlzV2Fsa2luZyA9ICFwbGF5ZXIuaXNXYWxraW5nO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbmRCYXR0bGUoKSB7XG4gICAgICAgIGlmKHRoaXMuaXNCYXR0bGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCYXR0bGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbmVteSk9PntcbiAgICAgICAgICAgICAgICBlbmVteS50b2dnbGUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZW5kLWJhdHRsZVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0QmF0dGxlKCkge1xuICAgICAgICB0aGlzLnRpY2tDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuaXNCYXR0bGUgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmVtaWVzLmZvckVhY2goKGVuZW15KT0+e1xuICAgICAgICAgICAgZW5lbXkudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgcGxheWVyLmlzV2Fsa2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgcGxheWVyLnJlYWR5ICAgICA9IGZhbHNlO1xuICAgICAgICAgICAgcGxheWVyLmFjdGlvbiAgICA9IFwid2FpdFwiO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lbWl0KFwic3RhcnQtYmF0dGxlXCIpO1xuICAgIH1cblxuICAgIHNldE5leHRFbmNvdW50ZXIodGlja3MpIHtcbiAgICAgICAgdGhpcy5uZXh0RW5jb3VudGVyID0gdGlja3M7XG4gICAgfVxuXG4gICAgdGljaygpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSB0aGlzLnRpY2tDb3VudCB8fCAwO1xuICAgICAgICBpZih0aGlzLmlzTG9va2luZykge1xuICAgICAgICAgICAgdGhpcy50aWNrQ291bnQrKztcbiAgICAgICAgICAgIGlmKHRoaXMudGlja0NvdW50ID4gdGhpcy5uZXh0RW5jb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJhdHRsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4LCBmcmFtZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvVWlSZW5kZXJlcic7XG5pbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtICUgWSBvZmZzZXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYmcgICAgICAgICAgICAgICAgPSAnZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL3VpLWJnLnBuZyc7XG4gICAgICAgIHRoaXMud2lkdGggICAgICAgICAgICAgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgICAgICAgICAgICA9IGhlaWdodDtcbiAgICAgICAgdGhpcy5vZmZzZXRYICAgICAgICAgICA9IG9mZnNldFg7XG4gICAgICAgIHRoaXMub2Zmc2V0WSAgICAgICAgICAgPSBvZmZzZXRZO1xuICAgICAgICB0aGlzLnNob3dCYXR0bGVPcHRpb25zID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5iYXR0bGVPcHRpb25zID0gW1xuICAgICAgICAgICAgXCJhdHRhY2tcIixcbiAgICAgICAgICAgIFwiYWJpbGl0eVwiLFxuICAgICAgICAgICAgXCJpdGVtXCIsXG4gICAgICAgICAgICBcImRlZmVuZFwiXG4gICAgICAgIF1cbiAgICAgICAgdGhpcy5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXphdGlvbiBQcm9taXNlXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBVaVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGN0eCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlQmF0dGxlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5zaG93QmF0dGxlT3B0aW9ucyA9ICF0aGlzLnNob3dCYXR0bGVPcHRpb25zO1xuICAgIH1cblxuICAgIGdldFNlbGVjdGVkQmF0dGxlT3B0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5iYXR0bGVPcHRpb25zW3RoaXMuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleF07XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgZnJvbSAnLi9VdGlscyc7XG5pbXBvcnQgTG9nZ2VyICAgZnJvbSAnLi9Mb2dnZXInO1xuaW1wb3J0IENvbmZpZyAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUm5nICAgICAgZnJvbSAnLi9SbmcnO1xuXG4vLyBJbXBvcnQgQ29udHJvbGxlcnNcbmltcG9ydCBHYW1lQ29udHJvbGxlciAgICAgZnJvbSAnLi4vY29udHJvbGxlcnMvR2FtZUNvbnRyb2xsZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9jb2RldGhlb3J5LmluL2NvbnRyb2xsaW5nLXRoZS1mcmFtZS1yYXRlLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgICAgICAvLyBJZiB0aGUgZnBzIGludGVydmFsIGlzIGNvcnJlY3RcbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRpbWUgc2luY2UgbGFzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIFNldCB1cCBSZW5kZXJpbmdcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdGhpcy5fZnJhbWUgfHwgMTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gKHRoaXMuX2ZyYW1lJUNvbmZpZy5GUFMpID8gdGhpcy5fZnJhbWUgOiAxO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgQ29uZmlnLkNBTlZBU19XSURUSCwgQ29uZmlnLkNBTlZBU19IRUlHSFQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBQcm9ncmVzcyBnYW1lXG4gICAgICAgICAgICB0aGlzLmdhbWUudGljayh0aGlzLl9mcmFtZSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBuZXh0IHJlbmRlciBjeWNsZVxuICAgICAgICAgICAgbGV0IHRpbWVfZWwgPSAodGhpcy50aGVuIC0gdGhpcy5maXJzdCkvMTAwMDtcbiAgICAgICAgICAgICsrdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgbGV0IGZwcyA9IHBhcnNlSW50KHRoaXMuY291bnRlci90aW1lX2VsKTtcblxuICAgICAgICAgICAgLy8gU2hvdyBGUFNcbiAgICAgICAgICAgIGxldCBmb250U2l6ZSAgICAgICAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dCh0aGlzLl9mcmFtZSArIFwiL1wiICsgQ29uZmlnLkZQUyArIFwiIFwiICsgZnBzICsgXCJmcHNcIiwgMjAsIDIwKTtcblxuICAgICAgICAgICAgLy8gSW5jcmVtZW50IEZyYW1lXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKiBAdG9kbzogZG9lcyB0aGlzIGJlbG9uZyBoZXJlP1xuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHRoZSBnYW1lIGdvZXMgZnVsbCBzY3JlZW4sIHdpbGwgZnVsbHNjcmVlbiB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICAgKiBGb3VuZDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Z1bGxzY3JlZW5fQVBJXG4gICAgICovXG4gICAgcmVxdWVzdEZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGVuZ2luZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IFV0aWxzLnBhcnNlUXVlcnkod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vaW5pdGlhbGl6ZSB0aGUgZ2FtZSBjb250cm9sbGVyXG4gICAgICAgIC8vQHRvZG8gbmVlZCB0byBwYXNzIHBhcmFtcyB0byB0aGlzXG4gICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBHYW1lQ29udHJvbGxlcih0aGlzLl9jdHgpO1xuICAgICAgICB0aGlzLmdhbWUuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiR2FtZSBDb250cm9sbGVyIEluaXRpYWxpemVkXCIpO1xuICAgICAgICAgICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDAwL0NvbmZpZy5GUFM7XG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBBdHRhY2ggcmVzaXplIGV2ZW50XG4gICAgICAgIC8vd2luZG93LnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIEF0dGFjaCBGdWxsc2NyZWVuIGV2ZW50XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlcXVlc3RGdWxsc2NyZWVuLmJpbmQodGhpcykpO1xuXG4gICAgICAgIExvZ2dlci5iYW5uZXIoJ0dhbWUgU3RhcnRlZCcpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJORyBDUkVBVEVcIik7XG4gICAgICAgIHRoaXMuX3JuZyA9IG5ldyBSTkcoc2VlZCk7XG4gICAgICAgIHdpbmRvdy5ybmcgPSB0aGlzLl9ybmc7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZy5yYW5kb20oKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGxpbWl0bG9vcChmbiwgZnBzKSB7XG4gICAgICAgIC8vIFVzZSB2YXIgdGhlbiA9IERhdGUubm93KCk7IGlmIHlvdVxuICAgICAgICAvLyBkb24ndCBjYXJlIGFib3V0IHRhcmdldHRpbmcgPCBJRTlcbiAgICAgICAgdmFyIHRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBjdXN0b20gZnBzLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gNjBcbiAgICAgICAgZnBzID0gZnBzIHx8IDYwO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgICAgICAgICAgLy8gYWdhaW4sIERhdGUubm93KCkgaWYgaXQncyBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAvLyBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCkgaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBqdXN0IFxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZW4gPSBub3csIHdoaWNoIGNhbiBlbmQgdXAgbG93ZXJpbmcgb3ZlcmFsbCBmcHNcbiAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZm5cbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KDApKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzcGVjdEhlaWdodENhbGModzIpIHtcbiAgICAgICAgbGV0IHcxID0gMTkyMDtcbiAgICAgICAgbGV0IGgxID0gMTA4MDtcbiAgICAgICAgcmV0dXJuIGgxKncyL3cxO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZVF1ZXJ5KHNlYXJjaCkge1xuICAgICAgICB2YXIgYXJncyA9IHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcblxuICAgICAgICB2YXIgYXJnc1BhcnNlZCA9IHt9O1xuXG4gICAgICAgIHZhciBpLCBhcmcsIGt2cCwga2V5LCB2YWx1ZTtcblxuICAgICAgICBmb3IgKGk9MDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICAgICAgaWYgKC0xID09PSBhcmcuaW5kZXhPZignPScpKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2RlY29kZVVSSUNvbXBvbmVudChhcmcpLnRyaW0oKV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBrdnAgPSBhcmcuc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMF0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFsxXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJnc1BhcnNlZDtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWlSZW5kZXJlciBmcm9tICcuL1VpUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFVpUmVuZGVyZXIge1xuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKGN0eCk7XG5cbiAgICAgICAgbGV0IGZvbnRTaXplICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBjdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcblxuICAgICAgICBsZXQgeHBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ggLSA5KVxuICAgICAgICBsZXQgeXBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCkgKyBmb250U2l6ZSoyO1xuXG4gICAgICAgIC8vIFJlbmRlciBCYXR0bGUgT3B0aW9uc1xuICAgICAgICBpZih0aGlzLnVpLnNob3dCYXR0bGVPcHRpb25zKSB7XG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMCA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzBdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMSA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzFdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMiA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzJdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zICsgZm9udFNpemUqMlxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7dGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDMgPyAnPicgOiAnJ30ke3RoaXMudWkuYmF0dGxlT3B0aW9uc1szXX1gLFxuICAgICAgICAgICAgICAgIHhwb3MgKyBDb25maWcuVElMRV9TSVpFKjIsXG4gICAgICAgICAgICAgICAgeXBvcyArIGZvbnRTaXplKjJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgeHBvcyA9IENvbmZpZy5USUxFX1NJWkUqKENvbmZpZy5USUxFX1ggLSA1KVxuICAgICAgICB5cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcblxuICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEluZm9cbiAgICAgICAgdGhpcy51aS5wbGF5ZXJDaGFyYWN0ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHlwb3MgKz0gZm9udFNpemUqMjtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgTmFtZXNcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgbGV0IGhlYWx0aEJhclhQb3MgICA9IHhwb3MgKyBDb25maWcuVElMRV9TSVpFKjI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyWVBvcyAgID0geXBvcyAtIGZvbnRTaXplLzI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyV2lkdGggID0gQ29uZmlnLlRJTEVfU0laRSoyO1xuICAgICAgICAgICAgbGV0IGhlYWx0aEJhckhlaWdodCA9IGZvbnRTaXplO1xuXG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGMDAwMFwiO1xuICAgICAgICAgICAgbGV0IGhlYWx0aFBlcmNlbnRhZ2UgPSBwbGF5ZXIuY3VycmVudEhlYWx0aC9wbGF5ZXIubWF4SGVhbHRoO1xuICAgICAgICAgICAgY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoKmhlYWx0aFBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIuY3VycmVudEhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG1vbnN0ZXIpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBtb25zdGVyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnc3ByaXRlJywgdGhpcy5tb25zdGVyLnR5cGUuc3ByaXRlKSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgbGV0IHNwcml0ZSA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpO1xuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHNwcml0ZSxcbiAgICAgICAgICAgIHNwcml0ZS53aWR0aC8zKnRoaXMuZnJhbWUsXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMywgLy8gZFdpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMiwgLy8gZEhlaWdodFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICAxMCwgLy8gWXBvc1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykud2lkdGgvMypDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gcGxheWVyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnc3ByaXRlJywgdGhpcy5wbGF5ZXIuam9iLnNwcml0ZSksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnc2hhZG93JywgICdzaGFkb3cucG5nJyksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnYnViYmxlJywgICd3YWl0aW5nLnBuZycpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgICAgICA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcblxuICAgICAgICBsZXQgcGxheWVyICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdwbGF5ZXInKTtcbiAgICAgICAgbGV0IHBsYXllcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgbGV0IHhPZmZzZXQgPSBDb25maWcuVElMRV9YIC0gMztcbiAgICAgICAgaWYodGhpcy5wbGF5ZXIucG9zaXRpb24gPT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgIHhPZmZzZXQrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBzaGFkb3cgICAgICA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpO1xuXG4gICAgICAgIGxldCBidWJibGUgICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKTtcbiAgICAgICAgbGV0IGJ1YmJsZVdpZHRoICA9IGJ1YmJsZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBsZXQgYnViYmxlSGVpZ2h0ID0gYnViYmxlLmhlaWdodC81KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAgICAgLy8gRHJhdyBTaGFkb3dcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICBzaGFkb3csXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIHNoYWRvdy53aWR0aCwgLy8gZFdpZHRoXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHhPZmZzZXQqKHBsYXllcldpZHRoKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggcGxheWVyIFggUG9zXG4gICAgICAgICAgICB0aGlzLnBsYXllci55UG9zKihwbGF5ZXJXaWR0aCkgKyAocGxheWVyV2lkdGgpIC0gKENvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fcmVzb3VyY2VzLmdldCgnc2hhZG93JykuaGVpZ2h0LzEuNzUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gRHJhdyBQbGF5ZXIgU3ByaXRlXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJyksXG4gICAgICAgICAgICB0aGlzLnBsYXllci5pc1dhbGtpbmcgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUpIDogMCwgLy8gRFhcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgIHBsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHBsYXllcldpZHRoICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIERyYXcgQnViYmxlXG4gICAgICAgIGxldCBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICBzd2l0Y2godGhpcy5wbGF5ZXIuYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIFwid2FpdFwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYXR0YWNrXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImRlZmVuZFwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSoyO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIml0ZW1cIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJhYmlsaXR5XCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnBsYXllci5hY3Rpb24gIT09IFwid2Fsa1wiICYmIHRoaXMucGxheWVyLmFjdGlvbiAhPT0gXCJyZWFkeVwiKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCwgLy8gRFlcbiAgICAgICAgICAgICAgICBidWJibGUud2lkdGgsICAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGUuaGVpZ2h0LzUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCkgLSAoYnViYmxlV2lkdGgvMS41KSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpIC0gKGJ1YmJsZUhlaWdodC8xLjUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgICAgICBidWJibGVXaWR0aCwgIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIGJ1YmJsZUhlaWdodCAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgbG9hZFJlc291cmNlKG5hbWUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzLycgKyByZXNvdXJjZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcmVzb3VyY2UgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChuYW1lLCBpbWcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvb20gPSBvYmplY3Q7XG4gICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fd2FsbE9mZnNldCAgPSAwO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcImZsb29yXCIsIHRoaXMucm9vbS50eXBlLmZsb29yKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwid2FsbFwiLCAgdGhpcy5yb29tLnR5cGUud2FsbClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgLy8gUmVuZGVyIEZsb29yXG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2Zsb29yJyk7XG4gICAgICAgIGxldCBmbG9vcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YKzE7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IENvbmZpZy5USUxFX1kgLSA0OyB5KyspIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICAgICAgZmxvb3IsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArIGZsb29yV2lkdGgqeCAtIGZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgICh5KzIpKmZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGhcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlbmRlciBXYWxsXG4gICAgICAgIGxldCB3YWxsID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnd2FsbCcpO1xuICAgICAgICBsZXQgd2FsbFdpZHRoID0gd2FsbC53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLkNBTlZBU19XSURUSC8od2FsbFdpZHRoKSArIDE7IHgrKykge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgd2FsbCxcbiAgICAgICAgICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICsgd2FsbFdpZHRoKnggLSB3YWxsV2lkdGgsXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCd3YWxsJykud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnd2FsbCcpLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFIC8vIHNXaWR0aFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDYWxjdWxhdGUgT2Zmc2V0c1xuICAgICAgICBsZXQgeFN0ZXAgPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8xNjtcbiAgICAgICAgaWYodGhpcy5yb29tLmlzTW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArPSB4U3RlcDtcbiAgICAgICAgICAgIGlmKHRoaXMuX2Zsb29yT2Zmc2V0ID49IGZsb29yV2lkdGggLSAxKSB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl93YWxsT2Zmc2V0ID4gd2FsbFdpZHRoIC0gMSkgdGhpcy5fd2FsbE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKHVpKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMudWkgPSB1aTtcbiAgICAgICAgdGhpcy5fdWlCZyA9IHVpLmJnO1xuICAgICAgICB0aGlzLl90aWxlSGVpZ2h0ID0gMjtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHRoaXMuX3VpQmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcblxuICAgICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICAgIGxldCBiZ1JlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCksXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodCAtIDMwMFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCB1aVJlY3QgPSBbXG4gICAgICAgICAgICAwLFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCksXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqdGhpcy5fdGlsZUhlaWdodFxuICAgICAgICBdO1xuXG4gICAgICAgIGxldCBncmFkaWVudCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCguLi5iZ1JlY3QpO1xuXG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgwLCBcIiM2NEEzNTdcIik7XG4gICAgICAgIGdyYWRpZW50LmFkZENvbG9yU3RvcCgxLCBcIiMwMDM3MDBcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudDtcbiAgICAgICAgY3R4LmZpbGxSZWN0KC4uLnVpUmVjdCk7XG5cbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjOEQ4MDQ1XCI7XG5cbiAgICAgICAgLy8gVGhlIHN0cm9rZSBpcyBtaWRkbGUgYWxpZ25lZCB3aXRoIHRoZSBlZGdlcyBvZiB0aGUgYm94XG4gICAgICAgIGxldCBsaW5lV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8zMjtcbiAgICAgICAgLy9sZXQgbGluZVdpZHRoID0gNTtcbiAgICAgICAgY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICBsZXQgc3Ryb2tlUmVjdCA9IFsuLi51aVJlY3RdO1xuICAgICAgICBzdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICBzdHJva2VSZWN0WzJdIC09IGxpbmVXaWR0aDtcbiAgICAgICAgc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gVHJ5aW5nIHRvIGdldCBzZWNvbmQgYm9yZGVyXG4gICAgICAgIC8vY3R4LnN0cm9rZVN0eWxlID0gXCIjRkZGRkZGXCI7XG5cbiAgICAgICAgLy9saW5lV2lkdGggPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS80ODtcbiAgICAgICAgLy9jdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIC8vc3Ryb2tlUmVjdCA9IFsuLi51aVJlY3RdO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgLy9zdHJva2VSZWN0WzJdIC09IGxpbmVXaWR0aDtcbiAgICAgICAgLy9zdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICAvL2N0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIEZpbGwgYmcgd2l0aCBwYXRlcm5cblxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSAwLjE7XG4gICAgICAgIGxldCBwYXRlcm4gPSBjdHguY3JlYXRlUGF0dGVybih0aGlzLmltYWdlLCBcInJlcGVhdFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHBhdGVybjtcbiAgICAgICAgY3R4LnJlY3QoLi4uc3Ryb2tlUmVjdCk7XG4gICAgICAgIGN0eC5maWxsKCk7XG5cbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgIH1cbn1cbiJdfQ==
