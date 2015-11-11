(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _appServicesEngine = require('./app/services/Engine');

var _appServicesEngine2 = _interopRequireDefault(_appServicesEngine);

// Create new instance of game
var engine = new _appServicesEngine2["default"](document.body);

document.getElementsByTagName("button")[0].addEventListener("click", function (e) {
    e.preventDefault();

    var name = document.querySelector('input[name="name"]').value;
    var job = document.querySelector('select[name="job"]').value;
    var id = document.querySelector('input[name="id"]').value;
    var host = document.querySelector('input[name="host"]').value;

    document.querySelector('form').remove();
    // Initialize it
    engine.init(name, job, id, host);
});

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

// Event Buss

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

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
        value: function init(name, job, id, host) {
            var _this = this;

            var queryParams = _servicesUtils2['default'].parseQuery(window.location.search);

            this._eventBuss = new _mixinsEventEmitter2['default']();

            this.players = new Map();
            var promises = [];

            var yOffset = 2.5;
            var xOffset = _Config2['default'].TILE_X - 3;

            // Create 4 players
            if (job == "knight") {
                job = _modelsPlayer2['default'].JOB_KNIGHT;
            } else if (job == "villain") {
                job = _modelsPlayer2['default'].JOB_VILLAIN;
            } else if (job == "herbalist") {
                job = _modelsPlayer2['default'].JOB_HERBALIST;
            } else if (job == "clairvoyant") {
                job = _modelsPlayer2['default'].JOB_CLAIRVOYANT;
            } else if (job == "necromancer") {
                job = _modelsPlayer2['default'].JOB_NECROMANCER;
            }

            // Initialize Local Player
            var p1 = new _modelsPlayer2['default'](xOffset, yOffset, name, job);
            this.players.set(this, p1);
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
            this.room.attachEvents(this._eventBuss);
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
            if (host) {
                this.multiplayerController = new _MultiplayerController2['default'](p1, null, id, host);
            } else {
                var seed = "TEST";
                this.rng = new _servicesRng2['default'](seed);
                this.multiplayerController = new _MultiplayerController2['default'](p1, seed, id);
            }
            promises.push(this.multiplayerController.init());

            ///////////////////////////////////
            // LISTEN FOR MULTIPLAYER EVENTS //
            ///////////////////////////////////

            // Add player when peer connects
            this.multiplayerController.on("peer-connect", function (message) {
                _servicesLogger2['default'].debug("Add player");
                var p = new _modelsPlayer2['default'].createFromState(message.data.player);
                p.id = message.from;

                p.init().then(function () {
                    _servicesLogger2['default'].debug('Add player with id ' + message.from);
                    _this.addPlayer(p);
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
                _this.updatePlayerState(player, message.data.player);

                if (!_this.room.isBattle) {
                    if (player.ready) player.action = "ready";
                }
                _this._eventBuss.emit("player-state");
            });

            /////////////////////////////
            // LISTEN FOR GLOBAL EVENTS//
            /////////////////////////////
            this._eventBuss.on("room-state", function () {
                //
                _servicesLogger2['default'].debug("Update Room State");
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var _player = _step.value;

                        if (_this.room.isMoving) {
                            _player.isWalking = true;
                            _player.action = "walk";
                        } else {
                            _player.ready = false;
                            _player.action = "wait";
                        }
                        _servicesLogger2['default'].log(_player);
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
            });

            /////////////////////////////
            // LISTEN FOR INPUT EVENTS //
            /////////////////////////////
            // Initialize Input Controller
            this.inputController = new _InputController2['default']();

            this.inputController.on('enter', function () {
                if (_this.room.isBattle) {
                    //p1.ready = !p1.ready;
                    //p1.setAction(this.ui.getSelectedBattleOption());

                    var playerState = {
                        "ready": true,
                        "action": _this.ui.getSelectedBattleOption()
                    };

                    _this.updatePlayerState(p1, playerState);
                    _this.multiplayerController.click();
                    _this._eventBuss.emit("player-state");
                } else {
                    p1.ready = !p1.ready;
                    if (player.ready) player.action = "ready";else player.action = "waiting";
                    _this._eventBuss.emit("player-state");
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
        key: 'addPlayer',
        value: function addPlayer(p) {
            var players = this.players.values();
            var yPos = 0;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = players[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _player2 = _step2.value;

                    yPos = _player2.yPos;
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

            yPos++;
            p.yPos = yPos;
            this.players.set(p.id, p);
            this.objects.add(p);
        }
    }, {
        key: 'updatePlayerState',
        value: function updatePlayerState(player, state) {
            player.deserialize(state);
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

},{"../../Config":2,"../mixins/EventEmitter":7,"../models/BattleUi":9,"../models/Monster":10,"../models/Player":11,"../models/Room":12,"../models/Ui":13,"../services/Logger":15,"../services/Rng":16,"../services/Utils":17,"./InputController":5,"./MultiplayerController":6}],5:[function(require,module,exports){
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

            //window.onclick = () => {
            //this.emit("click");
            //};

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
        this._fillable = fillable;
        this.isVisible = true;
    }

    _createClass(_default, [{
        key: 'render',
        value: function render(ctx, frame) {
            if (this.isVisible) this.renderer.render(ctx, frame);
        }
    }, {
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
        key: 'attachEvents',
        value: function attachEvents(buss) {
            return;
        }
    }, {
        key: 'hide',
        value: function hide() {
            this.isVisible = false;
        }
    }, {
        key: 'show',
        value: function show() {
            this.isVisible = true;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            this.isVisible = !this.isVisible;
        }
    }, {
        key: 'tick',
        value: function tick() {
            return;
        }
    }]);

    return _default;
})(_mixinsEventEmitter2['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../mixins/EventEmitter":7,"../services/Logger":15}],9:[function(require,module,exports){
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

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, []);
        this.xPos = xPos;
        this.ypos = yPos;
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

var FILLABLE = new Set(["name", "ready", "isWalking", "job", "position", "maxHealth", "health", "maxMana", "mana", "action"]);

var STATES = new Set(["idle", "walking", "waiting", "action", "busy"]);

var Player = (function (_BaseObject) {
    _inherits(Player, _BaseObject);

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

    function Player(xPos, yPos, name, job, state) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, FILLABLE);
        this.name = name;
        this.ready = false;
        this.isWalking = false;
        this.job = job;
        this.position = job.position;
        this.maxHealth = job.health;
        this.health = job.health;
        this.maxMana = job.mana;
        this.mana = job.mana;
        this.action = "wait";
        this.xPos = xPos || 0;
        this.yPos = yPos || 0;

        this.state = state || "idle";
    }

    _createClass(Player, [{
        key: 'init',
        value: function init() {
            this.renderer = new _viewsPlayerRenderer2['default'](this);
            return this.renderer.init();
        }
    }, {
        key: 'setAction',
        value: function setAction(action) {
            this.action = action;
        }
    }], [{
        key: 'createFromState',
        value: function createFromState(obj) {
            return new Player(obj.xpos, obj.ypos, obj.name, obj.job);
        }
    }]);

    return Player;
})(_BaseObject3['default']);

exports['default'] = Player;
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

var _BaseObject2 = require('./BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

// Can't call this Object b/c of conflict xD

var _viewsRoomRenderer = require('../views/RoomRenderer');

var _viewsRoomRenderer2 = _interopRequireDefault(_viewsRoomRenderer);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var FILLABLE = new Set(["enemies", "type", "isMoving", "isBattle", "isLooking", "nextEncounter", "encounterRate", "tickCount"]);

var Room = (function (_BaseObject) {
    _inherits(Room, _BaseObject);

    _createClass(Room, null, [{
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

    function Room(type, enemies, players, encounterRate) {
        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this, FILLABLE);
        this.players = players;
        this.type = type;
        this.isMoving = false;
        this.isBattle = false;
        this.enemies = enemies;
        this.isLooking = false;
        this.encounterRate = encounterRate || 50;
    }

    _createClass(Room, [{
        key: 'attachEvents',
        value: function attachEvents(eventBuss) {
            var _this = this;

            eventBuss.on("player-state", function () {
                var ready = true;

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = _this.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var player = _step.value;

                        ready = player.ready && ready;
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

                if (ready) {
                    if (!_this.isLooking && !_this.isBattle) {
                        _this.setNextEncounter(100);
                        _this.lookForTrouble();
                    } else {}
                    eventBuss.emit("room-state");
                }
            });
        }
    }, {
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

    return Room;
})(_BaseObject3['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"../services/Logger":15,"../views/RoomRenderer":22,"./BaseObject":8}],13:[function(require,module,exports){
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
        value: function init(name, job, id, host) {
            var _this = this;

            var queryParams = _Utils2['default'].parseQuery(window.location.search);

            this._element.appendChild(this._canvas);
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;

            //initialize the game controller
            //@todo need to pass params to this
            this.game = new _controllersGameController2['default'](this._ctx);
            this.game.init(name, job, id, host).then(function () {
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9TZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL0lucHV0Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL011bHRpcGxheWVyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21peGlucy9FdmVudEVtaXR0ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvUm5nLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyUmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1VpUmVuZGVyZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2lDQ0FtQix1QkFBdUI7Ozs7O0FBRzFDLElBQUksTUFBTSxHQUFHLG1DQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFdkMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFTLENBQUMsRUFBRTtBQUM3RSxLQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FB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QyxTQUFTLEdBQUcsU0FBUyxDQUFDOztBQUUxQixnQkFBSSxVQUFVLGFBQU8sTUFBTSxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLEdBQUMsQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFDLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQztBQUMzQixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsQ0FBQzs7QUFFM0IsZUFBRyxDQUFDLFVBQVUsTUFBQSxDQUFkLEdBQUcscUJBQWUsVUFBVSxFQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCOUIsZUFBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7QUFDdEIsZ0JBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztBQUNyRCxlQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QixlQUFHLENBQUMsSUFBSSxNQUFBLENBQVIsR0FBRyxxQkFBUyxVQUFVLEVBQUMsQ0FBQztBQUN4QixlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVgsZUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2hCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi9hcHAvc2VydmljZXMvRW5naW5lJztcblxuLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG52YXIgZW5naW5lID0gbmV3IEVuZ2luZShkb2N1bWVudC5ib2R5KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsdWU7XG4gICAgbGV0IGpvYiAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3RbbmFtZT1cImpvYlwiXScpLnZhbHVlO1xuICAgIGxldCBpZCAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImlkXCJdJykudmFsdWU7XG4gICAgbGV0IGhvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaG9zdFwiXScpLnZhbHVlO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpLnJlbW92ZSgpO1xuICAgIC8vIEluaXRpYWxpemUgaXRcbiAgICBlbmdpbmUuaW5pdChuYW1lLCBqb2IsIGlkLCBob3N0KTtcbn0pO1xuXG4vLyBERUJVR1xud2luZG93LmVuZ2luZSA9IGVuZ2luZTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG4vLyAxNng5IEFzcGVjdCBSYXRpb1xuY29uZmlnLkFTUEVDVF9XSURUSCAgPSAxOTIwO1xuY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG5jb25maWcuVElMRV9YID0gMTY7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbmNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuY29uZmlnLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIEhvcml6b250YWwgb3IgVmVydGljYWwgcGVyY2VudGFnZSB0aGF0IHRoZSBnYW1lIHZpZXcgc2hvdWxkIG9jY3VweVxuICAgIGNvbmZpZy5QRVJDRU5UQUdFID0gMTtcblxuICAgIC8vIENhY2x1bGF0ZSBjYW52YXMgd2lkdGggYW5kIGhlaWdodCBhY2NvcmRpbmcgdG8gYWJvdmUgcGVyY2VudGFnZSBhbmQgYXNwZWN0IHJhdGlvXG4gICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSB3aW5kb3cub3V0ZXJXaWR0aCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3aW5kb3cgd2lsbCBmaXQgdmVydGljYWxseVxuICAgIGlmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCA9IChjb25maWcuQ0FOVkFTX0hFSUdIVCpjb25maWcuQVNQRUNUX1dJRFRIKS9jb25maWcuQVNQRUNUX0hFSUdIVDtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgU3ByaXRlIFNjYWxpbmdcbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuICAgIGNvbmZpZy5TUFJJVEVfU0NBTEUgID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCpjb25maWcuU1BSSVRFX1NJWkUpO1xuICAgIGNvbmZpZy5USUxFX1NJWkUgICAgID0gY29uZmlnLlNQUklURV9TSVpFKmNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAvLyBTZXQgRlBTXG4gICAgY29uZmlnLkZQUyA9IDMwO1xufVxuXG5jb25maWcuY2FsY3VsYXRlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IExvZ2dlciAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9SbmcnO1xuXG4vLyBJbXBvcnQgQ29udHJvbGxlcnNcbmltcG9ydCBNdWx0aXBsYXllckNvbnRyb2xsZXIgICAgIGZyb20gJy4vTXVsdGlwbGF5ZXJDb250cm9sbGVyJztcbmltcG9ydCBJbnB1dENvbnRyb2xsZXIgICAgICAgICAgIGZyb20gJy4vSW5wdXRDb250cm9sbGVyJztcblxuLy8gSW1wb3J0IE1vZGVsc1xuaW1wb3J0IFBsYXllciAgIGZyb20gJy4uL21vZGVscy9QbGF5ZXInO1xuaW1wb3J0IE1vbnN0ZXIgIGZyb20gJy4uL21vZGVscy9Nb25zdGVyJztcbmltcG9ydCBSb29tICAgICBmcm9tICcuLi9tb2RlbHMvUm9vbSc7XG5pbXBvcnQgVWkgICAgICAgZnJvbSAnLi4vbW9kZWxzL1VpJztcbmltcG9ydCBCYXR0bGVVaSBmcm9tICcuLi9tb2RlbHMvQmF0dGxlVWknO1xuXG4vLyBFdmVudCBCdXNzXG5pbXBvcnQgRXZlbnRCdXNzIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICAvLyBQYXNzIGN0eFxuICAgIGNvbnN0cnVjdG9yKGN0eCkge1xuICAgICAgICB0aGlzLl9jdHggPSBjdHg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdChuYW1lLCBqb2IsIGlkLCBob3N0KSB7XG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IFV0aWxzLnBhcnNlUXVlcnkod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cbiAgICAgICAgdGhpcy5fZXZlbnRCdXNzID0gbmV3IEV2ZW50QnVzcygpO1xuXG4gICAgICAgIHRoaXMucGxheWVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgbGV0IHlPZmZzZXQgPSAyLjU7XG4gICAgICAgIGxldCB4T2Zmc2V0ID0gQ29uZmlnLlRJTEVfWCAtIDM7XG5cbiAgICAgICAgLy8gQ3JlYXRlIDQgcGxheWVyc1xuICAgICAgICBpZihqb2IgPT0gXCJrbmlnaHRcIikge1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9LTklHSFQ7XG4gICAgICAgIH0gZWxzZSBpZiAoam9iID09IFwidmlsbGFpblwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX1ZJTExBSU47XG4gICAgICAgIH0gZWxzZSBpZiAoam9iID09IFwiaGVyYmFsaXN0XCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfSEVSQkFMSVNUO1xuICAgICAgICB9IGVsc2UgaWYgKGpvYiA9PSBcImNsYWlydm95YW50XCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfQ0xBSVJWT1lBTlQ7XG4gICAgICAgIH0gIGVsc2UgaWYgKGpvYiA9PSBcIm5lY3JvbWFuY2VyXCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfTkVDUk9NQU5DRVI7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbml0aWFsaXplIExvY2FsIFBsYXllclxuICAgICAgICBsZXQgcDEgPSBuZXcgUGxheWVyKHhPZmZzZXQsIHlPZmZzZXQsIG5hbWUsIGpvYik7XG4gICAgICAgIHRoaXMucGxheWVycy5zZXQodGhpcywgcDEpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHAxLmluaXQoKSk7XG4gICAgICAgIHdpbmRvdy5wbGF5ZXIgPSBwMTtcblxuICAgICAgICAvLy8vIEFkZCBhIGJhZGRpZVxuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBuZXcgTW9uc3RlcigxLCAxLCBNb25zdGVyLlRZUEVfV1VSTSk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5tb25zdGVyLmluaXQoKSk7XG4gICAgICAgIHRoaXMubW9uc3Rlci5oaWRlKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBVSVxuICAgICAgICB0aGlzLnVpID0gbmV3IEJhdHRsZVVpKDAsIDAsIDAsIDAsIHRoaXMucGxheWVycywgdGhpcy5wbGF5ZXJzKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnVpLmluaXQoKSk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBSb29tXG4gICAgICAgIHRoaXMucm9vbSA9IG5ldyBSb29tKFJvb20uVFlQRV9DQVZFLCBbdGhpcy5tb25zdGVyXSwgdGhpcy5wbGF5ZXJzKTtcbiAgICAgICAgdGhpcy5yb29tLmF0dGFjaEV2ZW50cyh0aGlzLl9ldmVudEJ1c3MpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucm9vbS5pbml0KCkpO1xuXG4gICAgICAgIHRoaXMucm9vbS5vbihcInN0YXJ0LWJhdHRsZVwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy51aS50b2dnbGVCYXR0bGVPcHRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucm9vbS5vbihcImVuZC1iYXR0bGVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMudWkudG9nZ2xlQmF0dGxlT3B0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgYWxsIG9iamVjdHNcbiAgICAgICAgdGhpcy5vYmplY3RzID0gbmV3IFNldChbXG4gICAgICAgICAgICB0aGlzLnJvb20sXG4gICAgICAgICAgICAuLi50aGlzLnBsYXllcnMudmFsdWVzKCksXG4gICAgICAgICAgICB0aGlzLm1vbnN0ZXIsXG4gICAgICAgICAgICB0aGlzLnVpXG4gICAgICAgIF0pO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgTXVsdGlwbGF5ZXIgQ29udHJvbGxlclxuICAgICAgICBpZihob3N0KSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlciA9IG5ldyBNdWx0aXBsYXllckNvbnRyb2xsZXIocDEsIG51bGwsIGlkLCBob3N0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBzZWVkID0gXCJURVNUXCI7XG4gICAgICAgICAgICB0aGlzLnJuZyA9IG5ldyBSbmcoc2VlZCk7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlciA9IG5ldyBNdWx0aXBsYXllckNvbnRyb2xsZXIocDEsIHNlZWQsIGlkKTtcbiAgICAgICAgfVxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmluaXQoKSk7XG5cblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyBMSVNURU4gRk9SIE1VTFRJUExBWUVSIEVWRU5UUyAvL1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gICAgICAgIC8vIEFkZCBwbGF5ZXIgd2hlbiBwZWVyIGNvbm5lY3RzXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLm9uKFwicGVlci1jb25uZWN0XCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiQWRkIHBsYXllclwiKTtcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllci5jcmVhdGVGcm9tU3RhdGUobWVzc2FnZS5kYXRhLnBsYXllcik7XG4gICAgICAgICAgICBwLmlkID0gbWVzc2FnZS5mcm9tO1xuXG4gICAgICAgICAgICBwLmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBBZGQgcGxheWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQbGF5ZXIocCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyBvdXIgZmlyc3QgY29ubmVjdGlvbiBhbmQgd2UgZG9uJ3QgYWxyZWFkeSBoYXZlIGEgc2VlZCB0aGVuIHNldCBpdFxuICAgICAgICAgICAgaWYoIXRoaXMucm5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ybmcgPSBuZXcgUm5nKG1lc3NhZ2UuZGF0YS5zZWVkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBwZWVycyBwbGF5ZXIgZnJvbSB0aGUgZ2FtZVxuICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5vbihcInBlZXItZGlzY29ubmVjdFwiLCAocGVlcik9PntcbiAgICAgICAgICAgIGxldCBwbGF5ZXJUb0RlbGV0ZSA9IHRoaXMucGxheWVycy5nZXQocGVlcilcbiAgICAgICAgICAgIHRoaXMucGxheWVycy5kZWxldGUocGVlcik7XG4gICAgICAgICAgICB0aGlzLm9iamVjdHMuZGVsZXRlKHBsYXllclRvRGVsZXRlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gU3luYyBQbGF5ZXIgc3RhdGVcbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJwbGF5ZXItc3RhdGVcIiwgKG1lc3NhZ2UpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJTZXQgcGxheWVyIHRvIFJlYWR5XCIpO1xuXG4gICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5wbGF5ZXJzLmdldChtZXNzYWdlLmZyb20pO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJTdGF0ZShwbGF5ZXIsIG1lc3NhZ2UuZGF0YS5wbGF5ZXIpO1xuXG4gICAgICAgICAgICBpZighdGhpcy5yb29tLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyLnJlYWR5KSBwbGF5ZXIuYWN0aW9uID0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZXZlbnRCdXNzLmVtaXQoXCJwbGF5ZXItc3RhdGVcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC8vIExJU1RFTiBGT1IgR0xPQkFMIEVWRU5UUy8vXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIHRoaXMuX2V2ZW50QnVzcy5vbihcInJvb20tc3RhdGVcIiwgKCk9PnsvL1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiVXBkYXRlIFJvb20gU3RhdGVcIik7XG4gICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnJvb20uaXNNb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmlzV2Fsa2luZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5hY3Rpb24gPSBcIndhbGtcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmFjdGlvbiA9IFwid2FpdFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBMb2dnZXIubG9nKHBsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC8vIExJU1RFTiBGT1IgSU5QVVQgRVZFTlRTIC8vXG4gICAgICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC8vIEluaXRpYWxpemUgSW5wdXQgQ29udHJvbGxlclxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlciA9IG5ldyBJbnB1dENvbnRyb2xsZXIoKTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbignZW50ZXInLCAoKT0+e1xuICAgICAgICAgICAgaWYodGhpcy5yb29tLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICAgICAgLy9wMS5yZWFkeSA9ICFwMS5yZWFkeTtcbiAgICAgICAgICAgICAgICAvL3AxLnNldEFjdGlvbih0aGlzLnVpLmdldFNlbGVjdGVkQmF0dGxlT3B0aW9uKCkpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHBsYXllclN0YXRlID0ge1xuICAgICAgICAgICAgICAgICAgICBcInJlYWR5XCI6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFwiYWN0aW9uXCI6IHRoaXMudWkuZ2V0U2VsZWN0ZWRCYXR0bGVPcHRpb24oKVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXllclN0YXRlKHAxLCBwbGF5ZXJTdGF0ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIuY2xpY2soKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEJ1c3MuZW1pdChcInBsYXllci1zdGF0ZVwiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcDEucmVhZHkgPSAhcDEucmVhZHk7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyLnJlYWR5KSBwbGF5ZXIuYWN0aW9uID0gXCJyZWFkeVwiO1xuICAgICAgICAgICAgICAgIGVsc2UgcGxheWVyLmFjdGlvbiA9IFwid2FpdGluZ1wiO1xuICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50QnVzcy5lbWl0KFwicGxheWVyLXN0YXRlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyLm9uKCd1cCcsICgpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ3VwJyk7XG4gICAgICAgICAgICBpZih0aGlzLnVpLnNob3dCYXR0bGVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCsyKSU0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbignZG93bicsICgpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ2Rvd24nKTtcbiAgICAgICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4KzIpJTQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaW5wdXRDb250cm9sbGVyLm9uKCdsZWZ0JywgKCk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZygnbGVmdCcpO1xuICAgICAgICAgICAgaWYodGhpcy51aS5zaG93QmF0dGxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAwKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDEpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMykgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAyKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbigncmlnaHQnLCAoKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdyaWdodCcpO1xuICAgICAgICAgICAgaWYodGhpcy51aS5zaG93QmF0dGxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAwKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAxO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDEpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMykgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMjtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAyKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIGFkZFBsYXllcihwKSB7XG4gICAgICAgIGxldCBwbGF5ZXJzID0gdGhpcy5wbGF5ZXJzLnZhbHVlcygpO1xuICAgICAgICBsZXQgeVBvcyA9IDA7XG4gICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHBsYXllcnMpIHtcbiAgICAgICAgICAgIHlQb3MgPSBwbGF5ZXIueVBvcztcbiAgICAgICAgfVxuICAgICAgICB5UG9zKys7XG4gICAgICAgIHAueVBvcyA9IHlQb3M7XG4gICAgICAgIHRoaXMucGxheWVycy5zZXQocC5pZCwgcCk7XG4gICAgICAgIHRoaXMub2JqZWN0cy5hZGQocCk7XG4gICAgfVxuXG4gICAgdXBkYXRlUGxheWVyU3RhdGUocGxheWVyLCBzdGF0ZSkge1xuICAgICAgICBwbGF5ZXIuZGVzZXJpYWxpemUoc3RhdGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2dyZXNzIEdhbWUgTG9naWMgYnkgY2FsbGluZyB0aWNrIG9uIGV2ZXJ5IG9iamVjdFxuICAgICAqL1xuICAgIHRpY2soZnJhbWUpIHtcbiAgICAgICAgLy8gUmVuZGVyIGV2ZXJ5dGhpbmdcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuX2N0eC5zYXZlKCk7XG4gICAgICAgICAgICBvYmplY3QudGljaygpO1xuICAgICAgICAgICAgb2JqZWN0LnJlbmRlcih0aGlzLl9jdHgsIGZyYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgaWQpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICAvLyBBdHRhY2ggaW5wdXQgbGlzdGVuZXJzXG4gICAgICAgIC8vIHVzaW5nIGh0dHBzOi8vZG1hdXJvLmdpdGh1Yi5pby9LZXlwcmVzcy9cbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IG5ldyB3aW5kb3cua2V5cHJlc3MuTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5hdHRhY2hJbnB1dCh0aGlzLmxpc3RlbmVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuXG4gICAgfVxuXG4gICAgYXR0YWNoSW5wdXQobGlzdGVuZXIpIHtcbiAgICAgICAgLy93aW5kb3cub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIC8vdGhpcy5lbWl0KFwiY2xpY2tcIik7XG4gICAgICAgIC8vfTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJ0XCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJjbGlja1wiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwidXBcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInVwXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJkb3duXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJkb3duXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJsZWZ0XCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJsZWZ0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJyaWdodFwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicmlnaHRcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcImVudGVyXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJlbnRlclwiKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi4vU2VydmljZXMvTG9nZ2VyJztcblxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IocGxheWVyLCBzZWVkLCBpZCwgaG9zdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHRoaXMuX3NlZWQgICA9IHNlZWQgfHwgbnVsbDtcbiAgICAgICAgdGhpcy5faWQgICAgID0gaWQgfHwgbnVsbDtcblxuICAgICAgICBpZihob3N0KVxuICAgICAgICAgICAgdGhpcy5faG9zdCA9IGhvc3Q7XG5cbiAgICAgICAgdGhpcy5fcGVlcnMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcblxuICAgICAgICAvLyBJbml0aWFsaXplIHRoZSBwZWVyIGNvbm5lY3Rpb25cbiAgICAgICAgdGhpcy5fcGVlciA9IG5ldyBQZWVyKHRoaXMuX2lkLCB7XG4gICAgICAgICAgICBrZXk6IENvbmZpZy5BUElfS0VZLFxuICAgICAgICAgICAgZGVidWc6IDNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuX3BlZXIub24oJ29wZW4nLCAoaWQpPT57XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBQZWVyIENvbm5lY3Rpb24gY3JlYXRlZCwgUGVlciBJRCBpcyAke2lkfWApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgICAgICAgICAvLyBJZiB3ZSBrbm93IGFib3V0IGEgcGVlciB0aGVuIGNvbm5lY3RcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9ob3N0KVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHRoaXMuX2hvc3QpKTtcblxuICAgICAgICAgICAgICAgIC8vIFdoZW4gYSBwZWVyIGNvbm5lY3RzIGhhbmRsZSBpdFxuICAgICAgICAgICAgICAgIHRoaXMuX3BlZXIub24oJ2Nvbm5lY3Rpb24nLCAoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gRG9uJ3QgYWxsb3cgbW9yZSB0aGFuIDQgcGxheWVyc1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLl9wZWVycy5zaXplID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ29wZW4nLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiUGVlciBoYXMgY29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwZWVyID0gdGhpcy5hZGRQZWVyKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHBlZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlcygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFBlZXIoY29ubmVjdGlvbikge1xuICAgICAgICBsZXQgcGVlciA9IHtcbiAgICAgICAgICAgIFwiY29ubmVjdGlvblwiOiBjb25uZWN0aW9uLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9wZWVycy5zZXQoY29ubmVjdGlvbi5wZWVyLCBwZWVyKTtcblxuICAgICAgICBjb25uZWN0aW9uLm9uKCdkYXRhJywgIHRoaXMuaGFuZGxlRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgY29ubmVjdGlvbi5vbignY2xvc2UnLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVQZWVyKHBlZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcGVlcjtcbiAgICB9XG5cbiAgICBjb25uZWN0VG9QZWVyKHBlZXIpIHtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICBcImV2ZW50XCI6IFwicGVlci1jb25uZWN0XCIsXG4gICAgICAgICAgICBcImZyb21cIjogdGhpcy5faWQsXG4gICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgIFwic2VlZFwiOiB0aGlzLl9zZWVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlLmRhdGEucGxheWVyID0gdGhpcy5fcGxheWVyLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGxldCBwZWVycyA9IFtdO1xuICAgICAgICBmb3IobGV0IHBlZXIgb2YgdGhpcy5fcGVlcnMua2V5cygpKSB7XG4gICAgICAgICAgICBwZWVycy5wdXNoKHBlZXIpO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UuZGF0YS5wZWVycyA9IHBlZXJzO1xuXG4gICAgICAgIExvZ2dlci5kZWJ1ZyhgU2VuZGluZyBwZWVyLWNvbm5lY3QgbWVzc2FnZSB0byBwZWVyIHdpdGggaWQgJHtwZWVyfWApO1xuICAgICAgICBMb2dnZXIubG9nKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmNvbm5lY3Rpb24uc2VuZChtZXNzYWdlKTtcbiAgICAgICAgcGVlci5oYXNTZW50UGxheWVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW1vdmVQZWVyKHBlZXIpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiUmVtb3ZlIHBlZXJcIik7XG4gICAgICAgIHRoaXMuZW1pdChcInBlZXItZGlzY29ubmVjdFwiLCBwZWVyLmNvbm5lY3Rpb24ucGVlcik7XG4gICAgICAgIHRoaXMuX3BlZXJzLmRlbGV0ZShwZWVyLmNvbm5lY3Rpb24ucGVlcik7XG4gICAgfVxuXG4gICAgaGFuZGxlRGF0YShtZXNzYWdlKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhgTWVzc2FnZSByZWNpZXZlZCBmcm9tIHBlZXIgd2l0aCBpZCAke21lc3NhZ2UuZnJvbX1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcblxuICAgICAgICBsZXQgZGF0YSA9IG1lc3NhZ2UuZGF0YTtcblxuICAgICAgICBpZihtZXNzYWdlLmV2ZW50ID09IFwicGVlci1jb25uZWN0XCIpIHtcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZygnQ3VycmVudCBjb25uZWN0aW9ucycpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9wZWVycyk7XG5cbiAgICAgICAgICAgIC8vIFNlZSBpZiB0aGlzIHBlZXIga25vd3MgYWJvdXQgYW55IG90aGVyIHBlZXJzIGFuZCBhZGQgaWYgd2UgZG9uJ3Qga25vdyB0aGVtXG4gICAgICAgICAgICBmb3IobGV0IHBlZXIgb2YgZGF0YS5wZWVycykge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLl9wZWVycy5nZXQocGVlcikgJiYgcGVlciAhPT0gdGhpcy5faWQpIHtcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKGBBZGRpbmcgUGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdChwZWVyKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ0NoZWNrIGlmIHdlIG5lZWQgdG8gc2VuZCBtZXNzYWdlIHRvIG1lc3NhZ2Ugc2VuZGVyJyk7XG4gICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMuX3BlZXJzLmdldChcImhvc3RcIikpO1xuICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkgJiYgIXRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pLmhhc1NlbnRQbGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIodGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMuX2Nvbm5lY3Rpb25zKTtcblxuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGVlci1jb25uZWN0XCIsIG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcInBsYXllci1zdGF0ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItc3RhdGVcIiwgbWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGljaygpIHtcbiAgICAgICAgaWYodGhpcy5fcGVlcnMpIHtcbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy52YWx1ZXMoKSkge1xuXG4gICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItc3RhdGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgICAgICBcImRhdGFcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGF5ZXJcIjogdGhpcy5fcGxheWVyLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJ2YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG5cbiAgICBvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXSB8fCh0aGlzLl9ldmVudHNbdHlwZV0gPSBbXSlcbiAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgIGVycm9yKFxuICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgXCJ3YW50IHRvIGluY3JlYXNlIHRoZSBsaW1pdCAoJWkgbm93KVwiLFxuICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnNcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuXG4gICAgY29uc3RydWN0b3IoZmlsbGFibGUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fZmlsbGFibGUgPSBmaWxsYWJsZTtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4LCBmcmFtZSk7XG4gICAgfVxuXG4gICAgc2VyaWFsaXplKCkge1xuICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgIGZvcihsZXQgcHJvcCBvZiB0aGlzLl9maWxsYWJsZSkge1xuICAgICAgICAgICAgb2JqW3Byb3BdID0gdGhpc1twcm9wXS5zZXJpYWxpemUgPyB0aGlzW3Byb3BdLnNlcmlhbGl6ZSgpOiB0aGlzW3Byb3BdO1xuICAgICAgICB9XG4gICAgICAgIG9ialsnaXNWaXNpYmxlJ10gPSB0aGlzWydpc1Zpc2libGUnXTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICBkZXNlcmlhbGl6ZShkYXRhKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIkRlc2VyaWFsaXplXCIpO1xuICAgICAgICBMb2dnZXIubG9nKGRhdGEpO1xuICAgICAgICBmb3IobGV0IHByb3Agb2YgdGhpcy5fZmlsbGFibGUpIHtcbiAgICAgICAgICAgIHRoaXNbcHJvcF0gPSBkYXRhW3Byb3BdICE9PSB1bmRlZmluZWQgPyBkYXRhW3Byb3BdIDogdGhpc1twcm9wXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF0dGFjaEV2ZW50cyhidXNzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWkgZnJvbSAnLi9VaSc7XG5pbXBvcnQgQmF0dGxlVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9CYXR0bGVVaVJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBVaSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgICAgICAgICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgICAgICAgICAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYICAgICAgICAgIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZICAgICAgICAgIC0gJSBZIG9mZnNldFxuICAgICAqIEBwYXJhbSBwbGF5ZXJDaGFyYWN0ZXJzIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqIEBwYXJhbSBlbmVtaWVzICAgICAgICAgIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFksIHBsYXllckNoYXJhY3RlcnMsIGVuZW1pZXMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDaGFyYWN0ZXJzID0gcGxheWVyQ2hhcmFjdGVycztcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICAgID0gZW5lbWllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXphdGlvbiBQcm9taXNlXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBCYXR0bGVVaVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IE1vbnN0ZXJSZW5kZXJlciBmcm9tICcuLi92aWV3cy9Nb25zdGVyUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV1VSTSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAgICd3dXJtJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgdHlwZSkge1xuICAgICAgICBzdXBlcihbXSk7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3M7XG4gICAgICAgIHRoaXMueXBvcyA9IHlQb3M7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBNb25zdGVyUmVuZGVyZXIodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlcmVyLmluaXQoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCAgICAgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcbmltcG9ydCBQbGF5ZXJSZW5kZXJlciBmcm9tICcuLi92aWV3cy9QbGF5ZXJSZW5kZXJlcic7XG5cbmxldCBGSUxMQUJMRSA9IG5ldyBTZXQoW1xuICAgIFwibmFtZVwiLFxuICAgIFwicmVhZHlcIixcbiAgICBcImlzV2Fsa2luZ1wiLFxuICAgIFwiam9iXCIsXG4gICAgXCJwb3NpdGlvblwiLFxuICAgIFwibWF4SGVhbHRoXCIsXG4gICAgXCJoZWFsdGhcIixcbiAgICBcIm1heE1hbmFcIixcbiAgICBcIm1hbmFcIixcbiAgICBcImFjdGlvblwiLFxuXSk7XG5cbmxldCBTVEFURVMgPSBuZXcgU2V0KFtcbiAgICBcImlkbGVcIixcbiAgICBcIndhbGtpbmdcIixcbiAgICBcIndhaXRpbmdcIixcbiAgICBcImFjdGlvblwiLFxuICAgIFwiYnVzeVwiXG5dKTtcblxuY2xhc3MgUGxheWVyIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IEpPQl9DTEFJUlZPWUFOVCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnY2xhaXJ2b3lhbnQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnY2xhaXJ2b3lhbnQnLFxuICAgICAgICAgICAgJ2hlYWx0aCc6IDYwLFxuICAgICAgICAgICAgJ21hbmEnOiA0MCxcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdiYWNrJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfSEVSQkFMSVNUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdoZXJiYWxpc3Qtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2hlcmJhbGlzdCcsXG4gICAgICAgICAgICAnaGVhbHRoJzogNDAsXG4gICAgICAgICAgICAnbWFuYSc6IDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnYmFjaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX1ZJTExBSU4oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3ZpbGxhaW4yLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICd2aWxsYWluJyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA4MCxcbiAgICAgICAgICAgICdtYW5hJzogMjAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnZnJvbnQnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9LTklHSFQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2tuaWdodC1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAna25pZ2h0JyxcbiAgICAgICAgICAgICdoZWFsdGgnOiAxMDAsXG4gICAgICAgICAgICAnbWFuYSc6IDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnZnJvbnQnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9ORUNST01BTkNFUigpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnbmVjcm9tYW5jZXItc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ25lY3JvbWFuY2VyJyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA0MCxcbiAgICAgICAgICAgICdtYW5hJzogMTIwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgbmFtZSwgam9iLCBzdGF0ZSkge1xuICAgICAgICBzdXBlcihGSUxMQUJMRSk7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5qb2IgPSBqb2I7XG4gICAgICAgIHRoaXMucG9zaXRpb24gPSBqb2IucG9zaXRpb247XG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gam9iLmhlYWx0aDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSBqb2IuaGVhbHRoO1xuICAgICAgICB0aGlzLm1heE1hbmEgPSBqb2IubWFuYTtcbiAgICAgICAgdGhpcy5tYW5hID0gam9iLm1hbmE7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gXCJ3YWl0XCI7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3MgfHwgMDtcbiAgICAgICAgdGhpcy55UG9zID0geVBvcyB8fCAwO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZSB8fCBcImlkbGVcIjtcbiAgICB9XG5cbiAgICBzdGF0aWMgY3JlYXRlRnJvbVN0YXRlKG9iaikge1xuICAgICAgICByZXR1cm4gbmV3IFBsYXllcihvYmoueHBvcywgb2JqLnlwb3MsIG9iai5uYW1lLCBvYmouam9iKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFBsYXllclJlbmRlcmVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICB9XG5cbiAgICBzZXRBY3Rpb24oYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuYWN0aW9uID0gYWN0aW9uO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiaW1wb3J0IEJhc2VPYmplY3QgICAgIGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgUm9vbVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1Jvb21SZW5kZXJlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmxldCBGSUxMQUJMRSA9IG5ldyBTZXQoW1xuICAgIFwiZW5lbWllc1wiLFxuICAgIFwidHlwZVwiLFxuICAgIFwiaXNNb3ZpbmdcIixcbiAgICBcImlzQmF0dGxlXCIsXG4gICAgXCJpc0xvb2tpbmdcIixcbiAgICBcIm5leHRFbmNvdW50ZXJcIixcbiAgICBcImVuY291bnRlclJhdGVcIixcbiAgICBcInRpY2tDb3VudFwiXG5dKTtcblxuY2xhc3MgUm9vbSBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfQ0FWRSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZsb29yOiAnZ29vZHRpbGUucG5nJyxcbiAgICAgICAgICAgIHdhbGw6ICdzaGl0d2FsbC5wbmcnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFX1RFTVBMRSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZsb29yOiAnZ3Jhc3MucG5nJyxcbiAgICAgICAgICAgIHdhbGw6ICdwaWxsYXJzLnBuZydcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBlbmVtaWVzLCBwbGF5ZXJzLCBlbmNvdW50ZXJSYXRlKSB7XG4gICAgICAgIHN1cGVyKEZJTExBQkxFKTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzICAgICAgICA9IHBsYXllcnM7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0JhdHRsZSAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuZW1pZXMgICAgICAgID0gZW5lbWllcztcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuY291bnRlclJhdGUgPSBlbmNvdW50ZXJSYXRlIHx8IDUwO1xuICAgIH1cblxuICAgIGF0dGFjaEV2ZW50cyhldmVudEJ1c3MpIHtcbiAgICAgICAgZXZlbnRCdXNzLm9uKFwicGxheWVyLXN0YXRlXCIsICgpPT4ge1xuICAgICAgICAgICAgbGV0IHJlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgcmVhZHkgPSBwbGF5ZXIucmVhZHkgJiYgcmVhZHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHJlYWR5KSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNMb29raW5nICYmICF0aGlzLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV4dEVuY291bnRlcigxMDApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBldmVudEJ1c3MuZW1pdChcInJvb20tc3RhdGVcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUm9vbVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5pbml0KCk7XG4gICAgfVxuXG4gICAgbG9va0ZvclRyb3VibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9va2luZykgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5pc0JhdHRsZSkgdGhpcy5lbmRCYXR0bGUoKTtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTG9va2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgc3RvcExvb2tpbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0xvb2tpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5kQmF0dGxlKCkge1xuICAgICAgICBpZih0aGlzLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQmF0dGxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuZm9yRWFjaCgoZW5lbXkpPT57XG4gICAgICAgICAgICAgICAgZW5lbXkudG9nZ2xlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcImVuZC1iYXR0bGVcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEJhdHRsZSgpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbmVteSk9PntcbiAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllci5yZWFkeSAgICAgPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllci5hY3Rpb24gICAgPSBcIndhaXRcIjtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZW1pdChcInN0YXJ0LWJhdHRsZVwiKTtcbiAgICB9XG5cbiAgICBzZXROZXh0RW5jb3VudGVyKHRpY2tzKSB7XG4gICAgICAgIHRoaXMubmV4dEVuY291bnRlciA9IHRpY2tzO1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIHRoaXMudGlja0NvdW50ID0gdGhpcy50aWNrQ291bnQgfHwgMDtcbiAgICAgICAgaWYodGhpcy5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMudGlja0NvdW50Kys7XG4gICAgICAgICAgICBpZih0aGlzLnRpY2tDb3VudCA+IHRoaXMubmV4dEVuY291bnRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCYXR0bGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGN0eCwgZnJhbWUpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9vbTtcbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1VpUmVuZGVyZXInO1xuaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJnICAgICAgICAgICAgICAgID0gJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy91aS1iZy5wbmcnO1xuICAgICAgICB0aGlzLndpZHRoICAgICAgICAgICAgID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ICAgICAgICAgICAgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMub2Zmc2V0WCAgICAgICAgICAgPSBvZmZzZXRYO1xuICAgICAgICB0aGlzLm9mZnNldFkgICAgICAgICAgID0gb2Zmc2V0WTtcbiAgICAgICAgdGhpcy5zaG93QmF0dGxlT3B0aW9ucyA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuYmF0dGxlT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIFwiYXR0YWNrXCIsXG4gICAgICAgICAgICBcImFiaWxpdHlcIixcbiAgICAgICAgICAgIFwiaXRlbVwiLFxuICAgICAgICAgICAgXCJkZWZlbmRcIlxuICAgICAgICBdXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgpO1xuICAgIH1cblxuICAgIHRvZ2dsZUJhdHRsZU9wdGlvbnMoKSB7XG4gICAgICAgIHRoaXMuc2hvd0JhdHRsZU9wdGlvbnMgPSAhdGhpcy5zaG93QmF0dGxlT3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXRTZWxlY3RlZEJhdHRsZU9wdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYmF0dGxlT3B0aW9uc1t0aGlzLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXhdO1xuICAgIH1cbn1cbiIsIi8vIEltcG9ydCBVdGlsc1xuaW1wb3J0IFV0aWxzICAgIGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IExvZ2dlciAgIGZyb20gJy4vTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IFJuZyAgICAgIGZyb20gJy4vUm5nJztcblxuLy8gSW1wb3J0IENvbnRyb2xsZXJzXG5pbXBvcnQgR2FtZUNvbnRyb2xsZXIgICAgIGZyb20gJy4uL2NvbnRyb2xsZXJzL0dhbWVDb250cm9sbGVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgSGFuZGxlclxuICAgICAqIEB0b2RvOiBkb2VzIHRoaXMgYmVsb25nIGhlcmU/XG4gICAgICovXG4gICAgcmVzaXplKCkge1xuICAgICAgICBDb25maWcuY2FsY3VsYXRlKCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgdGhlIGdhbWUgZ29lcyBmdWxsIHNjcmVlbiwgd2lsbCBmdWxsc2NyZWVuIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqIEZvdW5kOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRnVsbHNjcmVlbl9BUElcbiAgICAgKi9cbiAgICByZXF1ZXN0RnVsbHNjcmVlbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZW5naW5lXG4gICAgICovXG4gICAgaW5pdChuYW1lLCBqb2IsIGlkLCBob3N0KSB7XG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IFV0aWxzLnBhcnNlUXVlcnkod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vaW5pdGlhbGl6ZSB0aGUgZ2FtZSBjb250cm9sbGVyXG4gICAgICAgIC8vQHRvZG8gbmVlZCB0byBwYXNzIHBhcmFtcyB0byB0aGlzXG4gICAgICAgIHRoaXMuZ2FtZSA9IG5ldyBHYW1lQ29udHJvbGxlcih0aGlzLl9jdHgpO1xuICAgICAgICB0aGlzLmdhbWUuaW5pdChuYW1lLCBqb2IsIGlkLCBob3N0KS50aGVuKCgpPT57XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkdhbWUgQ29udHJvbGxlciBJbml0aWFsaXplZFwiKTtcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICAgICAgdGhpcy5maXJzdCA9IHRoaXMudGhlbjtcbiAgICAgICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQXR0YWNoIHJlc2l6ZSBldmVudFxuICAgICAgICAvL3dpbmRvdy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBBdHRhY2ggRnVsbHNjcmVlbiBldmVudFxuICAgICAgICAvL2RvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlcXVlc3RGdWxsc2NyZWVuLmJpbmQodGhpcykpO1xuXG4gICAgICAgIExvZ2dlci5iYW5uZXIoJ0dhbWUgU3RhcnRlZCcpO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9jb2RldGhlb3J5LmluL2NvbnRyb2xsaW5nLXRoZS1mcmFtZS1yYXRlLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgICAgICAvLyBJZiB0aGUgZnBzIGludGVydmFsIGlzIGNvcnJlY3RcbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRpbWUgc2luY2UgbGFzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIC8vIFNldCB1cCBSZW5kZXJpbmdcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gdGhpcy5fZnJhbWUgfHwgMTtcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lID0gKHRoaXMuX2ZyYW1lJUNvbmZpZy5GUFMpID8gdGhpcy5fZnJhbWUgOiAxO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgQ29uZmlnLkNBTlZBU19XSURUSCwgQ29uZmlnLkNBTlZBU19IRUlHSFQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBQcm9ncmVzcyBnYW1lXG4gICAgICAgICAgICB0aGlzLmdhbWUudGljayh0aGlzLl9mcmFtZSk7XG5cbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSBuZXh0IHJlbmRlciBjeWNsZVxuICAgICAgICAgICAgbGV0IHRpbWVfZWwgPSAodGhpcy50aGVuIC0gdGhpcy5maXJzdCkvMTAwMDtcbiAgICAgICAgICAgICsrdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgbGV0IGZwcyA9IHBhcnNlSW50KHRoaXMuY291bnRlci90aW1lX2VsKTtcblxuICAgICAgICAgICAgLy8gU2hvdyBGUFNcbiAgICAgICAgICAgIGxldCBmb250U2l6ZSAgICAgICAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dCh0aGlzLl9mcmFtZSArIFwiL1wiICsgQ29uZmlnLkZQUyArIFwiIFwiICsgZnBzICsgXCJmcHNcIiwgMjAsIDIwKTtcblxuICAgICAgICAgICAgLy8gSW5jcmVtZW50IEZyYW1lXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSsrO1xuICAgICAgICB9XG4gICAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzZWVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUk5HIENSRUFURVwiKTtcbiAgICAgICAgdGhpcy5fcm5nID0gbmV3IFJORyhzZWVkKTtcbiAgICAgICAgd2luZG93LnJuZyA9IHRoaXMuX3JuZztcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm5nLnJhbmRvbSgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbGltaXRsb29wKGZuLCBmcHMpIHtcbiAgICAgICAgLy8gVXNlIHZhciB0aGVuID0gRGF0ZS5ub3coKTsgaWYgeW91XG4gICAgICAgIC8vIGRvbid0IGNhcmUgYWJvdXQgdGFyZ2V0dGluZyA8IElFOVxuICAgICAgICB2YXIgdGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGN1c3RvbSBmcHMsIG90aGVyd2lzZSBmYWxsYmFjayB0byA2MFxuICAgICAgICBmcHMgPSBmcHMgfHwgNjA7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG5cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG4gICAgICAgICAgICAvLyBhZ2FpbiwgRGF0ZS5ub3coKSBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGltZVxuICAgICAgICAgICAgICAgIC8vIG5vdyAtIChkZWx0YSAlIGludGVydmFsKSBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIGp1c3QgXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlbiA9IG5vdywgd2hpY2ggY2FuIGVuZCB1cCBsb3dlcmluZyBvdmVyYWxsIGZwc1xuICAgICAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBmblxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oMCkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXNwZWN0SGVpZ2h0Q2FsYyh3Mikge1xuICAgICAgICBsZXQgdzEgPSAxOTIwO1xuICAgICAgICBsZXQgaDEgPSAxMDgwO1xuICAgICAgICByZXR1cm4gaDEqdzIvdzE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlUXVlcnkoc2VhcmNoKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xuXG4gICAgICAgIHZhciBhcmdzUGFyc2VkID0ge307XG5cbiAgICAgICAgdmFyIGksIGFyZywga3ZwLCBrZXksIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaT0wOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGFyZy5pbmRleE9mKCc9JykpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRbZGVjb2RlVVJJQ29tcG9uZW50KGFyZykudHJpbSgpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGt2cCA9IGFyZy5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFswXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzFdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzUGFyc2VkO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4vVWlSZW5kZXJlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWlSZW5kZXJlciB7XG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoY3R4KTtcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuXG4gICAgICAgIGxldCB4cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWCAtIDkpXG4gICAgICAgIGxldCB5cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSArIGZvbnRTaXplKjI7XG5cbiAgICAgICAgLy8gUmVuZGVyIEJhdHRsZSBPcHRpb25zXG4gICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAwID8gJz4nIDogJyd9JHt0aGlzLnVpLmJhdHRsZU9wdGlvbnNbMF19YCxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAxID8gJz4nIDogJyd9JHt0aGlzLnVpLmJhdHRsZU9wdGlvbnNbMV19YCxcbiAgICAgICAgICAgICAgICB4cG9zICsgQ29uZmlnLlRJTEVfU0laRSoyLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAyID8gJz4nIDogJyd9JHt0aGlzLnVpLmJhdHRsZU9wdGlvbnNbMl19YCxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3MgKyBmb250U2l6ZSoyXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMyA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzNdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5cG9zICsgZm9udFNpemUqMlxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICB4cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWCAtIDUpXG4gICAgICAgIHlwb3MgPSBDb25maWcuVElMRV9TSVpFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuXG4gICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSW5mb1xuICAgICAgICB0aGlzLnVpLnBsYXllckNoYXJhY3RlcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgeXBvcyArPSBmb250U2l6ZSoyO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBOYW1lc1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyWFBvcyAgID0geHBvcyArIENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJZUG9zICAgPSB5cG9zIC0gZm9udFNpemUvMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJXaWR0aCAgPSBDb25maWcuVElMRV9TSVpFKjI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFySGVpZ2h0ID0gZm9udFNpemUvMjtcblxuXG4gICAgICAgICAgICAvL2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIC8vY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoUGVyY2VudGFnZSA9IHBsYXllci5oZWFsdGgvcGxheWVyLm1heEhlYWx0aDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCpoZWFsdGhQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLmhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGhlYWx0aEJhcllQb3MgKz0gaGVhbHRoQmFySGVpZ2h0KjEuNTtcblxuICAgICAgICAgICAgLy9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICAvL2N0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xuICAgICAgICAgICAgbGV0IG1hbmFQZXJjZW50YWdlID0gcGxheWVyLm1hbmEvcGxheWVyLm1heE1hbmE7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqbWFuYVBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIubWFuYX0vJHtwbGF5ZXIubWF4TWFuYX1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihtb25zdGVyKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5tb25zdGVyID0gbW9uc3RlcjtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ3Nwcml0ZScsIHRoaXMubW9uc3Rlci50eXBlLnNwcml0ZSksXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICBzcHJpdGUsXG4gICAgICAgICAgICBzcHJpdGUud2lkdGgvMyp0aGlzLmZyYW1lLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLndpZHRoLzMsIC8vIGRXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIDIwLFxuICAgICAgICAgICAgMTAsIC8vIFlwb3NcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLndpZHRoLzMqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMipDb25maWcuU1BSSVRFX1NDQUxFICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ3Nwcml0ZScsIHRoaXMucGxheWVyLmpvYi5zcHJpdGUpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ3NoYWRvdycsICAnc2hhZG93LnBuZycpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ2J1YmJsZScsICAnd2FpdGluZy5wbmcnKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgbGV0IHBsYXllciAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgncGxheWVyJyk7XG4gICAgICAgIGxldCBwbGF5ZXJXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIGxldCB4T2Zmc2V0ID0gQ29uZmlnLlRJTEVfWCAtIDM7XG4gICAgICAgIGlmKHRoaXMucGxheWVyLnBvc2l0aW9uID09IFwiYmFja1wiKSB7XG4gICAgICAgICAgICB4T2Zmc2V0Kys7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hhZG93ICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzaGFkb3cnKTtcblxuICAgICAgICBsZXQgYnViYmxlICAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyk7XG4gICAgICAgIGxldCBidWJibGVXaWR0aCAgPSBidWJibGUud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgbGV0IGJ1YmJsZUhlaWdodCA9IGJ1YmJsZS5oZWlnaHQvNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIC8vIERyYXcgU2hhZG93XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc2hhZG93LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRXaWR0aFxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIHBsYXllciBYIFBvc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpICsgKHBsYXllcldpZHRoKSAtIChDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpLmhlaWdodC8xLjc1KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggcGxheWVyIFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuXG4gICAgICAgIC8vIERyYXcgUGxheWVyIFNwcml0ZVxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaXNXYWxraW5nID8gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKSA6IDAsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBEcmF3IEJ1YmJsZVxuICAgICAgICBsZXQgYnViYmxlT2Zmc2V0ID0gMDtcbiAgICAgICAgc3dpdGNoKHRoaXMucGxheWVyLmFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcIndhaXRcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImF0dGFja1wiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkZWZlbmRcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpdGVtXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYWJpbGl0eVwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSo0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuYWN0aW9uICE9PSBcIndhbGtcIiAmJiB0aGlzLnBsYXllci5hY3Rpb24gIT09IFwicmVhZHlcIikge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQsIC8vIERZXG4gICAgICAgICAgICAgICAgYnViYmxlLndpZHRoLCAgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlLmhlaWdodC81LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpIC0gKGJ1YmJsZVdpZHRoLzEuNSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSAtIChidWJibGVIZWlnaHQvMS41KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAgICAgYnViYmxlV2lkdGgsICAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGVIZWlnaHQgIC8vIHNIZWlnaHRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIGxvYWRSZXNvdXJjZShuYW1lLCByZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy8nICsgcmVzb3VyY2U7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHJlc291cmNlIGNyZWF0ZSBpdFxuICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5zZXQobmFtZSwgaW1nKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yb29tID0gb2JqZWN0O1xuICAgICAgICB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgID0gMDtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoXCJmbG9vclwiLCB0aGlzLnJvb20udHlwZS5mbG9vciksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcIndhbGxcIiwgIHRoaXMucm9vbS50eXBlLndhbGwpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgICAgICA9IChmcmFtZSA8IENvbmZpZy5GUFMlMikgPyAwIDogMTtcbiAgICAgICAgdGhpcy5mcmFtZSA9IGZyYW1lJTI7XG5cbiAgICAgICAgLy8gUmVuZGVyIEZsb29yXG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2Zsb29yJyk7XG4gICAgICAgIGxldCBmbG9vcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YKzE7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IENvbmZpZy5USUxFX1kgLSA0OyB5KyspIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICAgICAgZmxvb3IsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArIGZsb29yV2lkdGgqeCAtIGZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgICh5KzIpKmZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGhcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLFxuICAgICAgICAgICAgLy90aGlzLnBsYXllci5pc1dhbGtpbmcgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUpIDogMCwgLy8gRFhcbiAgICAgICAgICAgIC8vMCwgLy8gRFlcbiAgICAgICAgICAgIC8vQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIC8vQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAvL3hPZmZzZXQqKHBsYXllcldpZHRoKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAvL3RoaXMucGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAvL3BsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIC8vcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcblxuICAgICAgICAvLyBSZW5kZXIgV2FsbFxuICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKTtcbiAgICAgICAgbGV0IHdhbGxXaWR0aCA9IHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHdhbGxXaWR0aCkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHdhbGwsXG4gICAgICAgICAgICAgICAgMCwgLy8gRFhcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yKnRoaXMuZnJhbWUsIC8vRFlcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArIHdhbGxXaWR0aCp4IC0gd2FsbFdpZHRoLCAvL3N4XG4gICAgICAgICAgICAgICAgMCwgLy9zeVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFLzJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIE9mZnNldHNcbiAgICAgICAgbGV0IHhTdGVwID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgIGlmKHRoaXMucm9vbS5pc01vdmluZykge1xuICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl9mbG9vck9mZnNldCA+PSBmbG9vcldpZHRoIC0gMSkgdGhpcy5fZmxvb3JPZmZzZXQgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fd2FsbE9mZnNldCA+IHdhbGxXaWR0aCAtIDEpIHRoaXMuX3dhbGxPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1aSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVpID0gdWk7XG4gICAgICAgIHRoaXMuX3VpQmcgPSB1aS5iZztcbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl91aUJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLi4uYmdSZWN0KTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCIjNjRBMzU3XCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCIjMDAzNzAwXCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCguLi51aVJlY3QpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzhEODA0NVwiO1xuXG4gICAgICAgIC8vIFRoZSBzdHJva2UgaXMgbWlkZGxlIGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGJveFxuICAgICAgICBsZXQgbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMzI7XG4gICAgICAgIC8vbGV0IGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIHN0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIFRyeWluZyB0byBnZXQgc2Vjb25kIGJvcmRlclxuICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuXG4gICAgICAgIC8vbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvNDg7XG4gICAgICAgIC8vY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICAvL3N0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgLy9zdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9jdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBsZXQgcGF0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5pbWFnZSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICB9XG59XG4iXX0=
