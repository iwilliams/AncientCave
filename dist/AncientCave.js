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

var _servicesEventBuss = require('../services/EventBuss');

var _servicesEventBuss2 = _interopRequireDefault(_servicesEventBuss);

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
        value: function init(name, job, id, host) {
            var _this = this;

            var queryParams = _servicesUtils2['default'].parseQuery(window.location.search);

            this._eventBuss = new _servicesEventBuss2['default']();

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

},{"../../Config":2,"../models/BattleUi":9,"../models/Monster":10,"../models/Player":11,"../models/Room":12,"../models/Ui":13,"../services/EventBuss":15,"../services/Logger":16,"../services/Rng":17,"../services/Utils":18,"./InputController":5,"./MultiplayerController":6}],5:[function(require,module,exports){
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

},{"../mixins/EventEmitter":7,"../services/Logger":16}],9:[function(require,module,exports){
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

},{"../views/BattleUiRenderer":19,"./Ui":13}],10:[function(require,module,exports){
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

},{"../views/MonsterRenderer":20,"./BaseObject":8}],11:[function(require,module,exports){
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

},{"../views/PlayerRenderer":21,"./BaseObject":8}],12:[function(require,module,exports){
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

},{"../services/Logger":16,"../views/RoomRenderer":23,"./BaseObject":8}],13:[function(require,module,exports){
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

},{"../views/UiRenderer":24,"./BaseObject":8}],14:[function(require,module,exports){
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

},{"../../Config":2,"../controllers/GameController":4,"./Logger":16,"./Rng":17,"./Utils":18}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

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

      _Logger2["default"].debug("Event Buss Emit: " + type);
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

},{"./Logger":16}],16:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
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

},{"../../Config":2,"./UiRenderer":24}],20:[function(require,module,exports){
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

},{"../../Config":2,"../services/Utils":18,"./Renderer":22}],21:[function(require,module,exports){
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

},{"../../Config":2,"../services/Utils":18,"./Renderer":22}],22:[function(require,module,exports){
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

},{}],23:[function(require,module,exports){
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

},{"../../Config":2,"../services/Utils":18,"./Renderer":22}],24:[function(require,module,exports){
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

},{"../../Config":2,"./Renderer":22}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9TZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL0lucHV0Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL011bHRpcGxheWVyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21peGlucy9FdmVudEVtaXR0ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRXZlbnRCdXNzLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvUm5nLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUGxheWVyUmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1VpUmVuZGVyZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7O2lDQ0FtQix1QkFBdUI7Ozs7O0FBRzFDLElBQUksTUFBTSxHQUFHLG1DQUFXLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFdkMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFn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LENBQUMsQ0FBQztBQUNyRCxlQUFHLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztBQUN2QixlQUFHLENBQUMsSUFBSSxNQUFBLENBQVIsR0FBRyxxQkFBUyxVQUFVLEVBQUMsQ0FBQztBQUN4QixlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVgsZUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2hCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi9hcHAvc2VydmljZXMvRW5naW5lJztcblxuLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG52YXIgZW5naW5lID0gbmV3IEVuZ2luZShkb2N1bWVudC5ib2R5KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBsZXQgbmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W25hbWU9XCJuYW1lXCJdJykudmFsdWU7XG4gICAgbGV0IGpvYiAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3RbbmFtZT1cImpvYlwiXScpLnZhbHVlO1xuICAgIGxldCBpZCAgID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaW5wdXRbbmFtZT1cImlkXCJdJykudmFsdWU7XG4gICAgbGV0IGhvc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdpbnB1dFtuYW1lPVwiaG9zdFwiXScpLnZhbHVlO1xuXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpLnJlbW92ZSgpO1xuICAgIC8vIEluaXRpYWxpemUgaXRcbiAgICBlbmdpbmUuaW5pdChuYW1lLCBqb2IsIGlkLCBob3N0KTtcbn0pO1xuXG4vLyBERUJVR1xud2luZG93LmVuZ2luZSA9IGVuZ2luZTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG4vLyAxNng5IEFzcGVjdCBSYXRpb1xuY29uZmlnLkFTUEVDVF9XSURUSCAgPSAxOTIwO1xuY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG5jb25maWcuVElMRV9YID0gMTY7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbmNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuY29uZmlnLmNhbGN1bGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIEhvcml6b250YWwgb3IgVmVydGljYWwgcGVyY2VudGFnZSB0aGF0IHRoZSBnYW1lIHZpZXcgc2hvdWxkIG9jY3VweVxuICAgIGNvbmZpZy5QRVJDRU5UQUdFID0gMTtcblxuICAgIC8vIENhY2x1bGF0ZSBjYW52YXMgd2lkdGggYW5kIGhlaWdodCBhY2NvcmRpbmcgdG8gYWJvdmUgcGVyY2VudGFnZSBhbmQgYXNwZWN0IHJhdGlvXG4gICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSB3aW5kb3cub3V0ZXJXaWR0aCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3aW5kb3cgd2lsbCBmaXQgdmVydGljYWxseVxuICAgIGlmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCA9IChjb25maWcuQ0FOVkFTX0hFSUdIVCpjb25maWcuQVNQRUNUX1dJRFRIKS9jb25maWcuQVNQRUNUX0hFSUdIVDtcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgU3ByaXRlIFNjYWxpbmdcbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuICAgIGNvbmZpZy5TUFJJVEVfU0NBTEUgID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCpjb25maWcuU1BSSVRFX1NJWkUpO1xuICAgIGNvbmZpZy5USUxFX1NJWkUgICAgID0gY29uZmlnLlNQUklURV9TSVpFKmNvbmZpZy5TUFJJVEVfU0NBTEU7XG5cbiAgICAvLyBTZXQgRlBTXG4gICAgY29uZmlnLkZQUyA9IDMwO1xufVxuXG5jb25maWcuY2FsY3VsYXRlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBkZWJ1Zyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShgJWMke21zZ31gLCAnZm9udC1zaXplOiAxNXB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiLy8gSW1wb3J0IFV0aWxzXG5pbXBvcnQgVXRpbHMgICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBDb25maWcgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICAgZnJvbSAnLi4vc2VydmljZXMvUm5nJztcbmltcG9ydCBFdmVudEJ1c3MgZnJvbSAnLi4vc2VydmljZXMvRXZlbnRCdXNzJztcblxuLy8gSW1wb3J0IENvbnRyb2xsZXJzXG5pbXBvcnQgTXVsdGlwbGF5ZXJDb250cm9sbGVyICAgICBmcm9tICcuL011bHRpcGxheWVyQ29udHJvbGxlcic7XG5pbXBvcnQgSW5wdXRDb250cm9sbGVyICAgICAgICAgICBmcm9tICcuL0lucHV0Q29udHJvbGxlcic7XG5cbi8vIEltcG9ydCBNb2RlbHNcbmltcG9ydCBQbGF5ZXIgICBmcm9tICcuLi9tb2RlbHMvUGxheWVyJztcbmltcG9ydCBNb25zdGVyICBmcm9tICcuLi9tb2RlbHMvTW9uc3Rlcic7XG5pbXBvcnQgUm9vbSAgICAgZnJvbSAnLi4vbW9kZWxzL1Jvb20nO1xuaW1wb3J0IFVpICAgICAgIGZyb20gJy4uL21vZGVscy9VaSc7XG5pbXBvcnQgQmF0dGxlVWkgZnJvbSAnLi4vbW9kZWxzL0JhdHRsZVVpJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgLy8gUGFzcyBjdHhcbiAgICBjb25zdHJ1Y3RvcihjdHgpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQobmFtZSwgam9iLCBpZCwgaG9zdCkge1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBVdGlscy5wYXJzZVF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICAgIHRoaXMuX2V2ZW50QnVzcyA9IG5ldyBFdmVudEJ1c3MoKTtcblxuICAgICAgICB0aGlzLnBsYXllcnMgPSBuZXcgTWFwKCk7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gMi41O1xuICAgICAgICBsZXQgeE9mZnNldCA9IENvbmZpZy5USUxFX1ggLSAzO1xuXG4gICAgICAgIC8vIENyZWF0ZSA0IHBsYXllcnNcbiAgICAgICAgaWYoam9iID09IFwia25pZ2h0XCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfS05JR0hUO1xuICAgICAgICB9IGVsc2UgaWYgKGpvYiA9PSBcInZpbGxhaW5cIikge1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9WSUxMQUlOO1xuICAgICAgICB9IGVsc2UgaWYgKGpvYiA9PSBcImhlcmJhbGlzdFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0hFUkJBTElTVDtcbiAgICAgICAgfSBlbHNlIGlmIChqb2IgPT0gXCJjbGFpcnZveWFudFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0NMQUlSVk9ZQU5UO1xuICAgICAgICB9ICBlbHNlIGlmIChqb2IgPT0gXCJuZWNyb21hbmNlclwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX05FQ1JPTUFOQ0VSO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBMb2NhbCBQbGF5ZXJcbiAgICAgICAgbGV0IHAxID0gbmV3IFBsYXllcih4T2Zmc2V0LCB5T2Zmc2V0LCBuYW1lLCBqb2IpO1xuICAgICAgICB0aGlzLnBsYXllcnMuc2V0KHRoaXMsIHAxKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChwMS5pbml0KCkpO1xuICAgICAgICB3aW5kb3cucGxheWVyID0gcDE7XG5cbiAgICAgICAgLy8vLyBBZGQgYSBiYWRkaWVcbiAgICAgICAgdGhpcy5tb25zdGVyID0gbmV3IE1vbnN0ZXIoMSwgMSwgTW9uc3Rlci5UWVBFX1dVUk0pO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubW9uc3Rlci5pbml0KCkpO1xuICAgICAgICB0aGlzLm1vbnN0ZXIuaGlkZSgpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgVUlcbiAgICAgICAgdGhpcy51aSA9IG5ldyBCYXR0bGVVaSgwLCAwLCAwLCAwLCB0aGlzLnBsYXllcnMsIHRoaXMucGxheWVycyk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy51aS5pbml0KCkpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgUm9vbVxuICAgICAgICB0aGlzLnJvb20gPSBuZXcgUm9vbShSb29tLlRZUEVfQ0FWRSwgW3RoaXMubW9uc3Rlcl0sIHRoaXMucGxheWVycyk7XG4gICAgICAgIHRoaXMucm9vbS5hdHRhY2hFdmVudHModGhpcy5fZXZlbnRCdXNzKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnJvb20uaW5pdCgpKTtcblxuICAgICAgICB0aGlzLnJvb20ub24oXCJzdGFydC1iYXR0bGVcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMudWkudG9nZ2xlQmF0dGxlT3B0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnJvb20ub24oXCJlbmQtYmF0dGxlXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLnVpLnRvZ2dsZUJhdHRsZU9wdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFsbCBvYmplY3RzXG4gICAgICAgIHRoaXMub2JqZWN0cyA9IG5ldyBTZXQoW1xuICAgICAgICAgICAgdGhpcy5yb29tLFxuICAgICAgICAgICAgLi4udGhpcy5wbGF5ZXJzLnZhbHVlcygpLFxuICAgICAgICAgICAgdGhpcy5tb25zdGVyLFxuICAgICAgICAgICAgdGhpcy51aVxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIE11bHRpcGxheWVyIENvbnRyb2xsZXJcbiAgICAgICAgaWYoaG9zdCkge1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIgPSBuZXcgTXVsdGlwbGF5ZXJDb250cm9sbGVyKHAxLCBudWxsLCBpZCwgaG9zdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgc2VlZCA9IFwiVEVTVFwiO1xuICAgICAgICAgICAgdGhpcy5ybmcgPSBuZXcgUm5nKHNlZWQpO1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIgPSBuZXcgTXVsdGlwbGF5ZXJDb250cm9sbGVyKHAxLCBzZWVkLCBpZCk7XG4gICAgICAgIH1cbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5pbml0KCkpO1xuXG5cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAgICAgLy8gTElTVEVOIEZPUiBNVUxUSVBMQVlFUiBFVkVOVFMgLy9cbiAgICAgICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgICAgICAvLyBBZGQgcGxheWVyIHdoZW4gcGVlciBjb25uZWN0c1xuICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5vbihcInBlZXItY29ubmVjdFwiLCAobWVzc2FnZSk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIkFkZCBwbGF5ZXJcIik7XG4gICAgICAgICAgICBsZXQgcCA9IG5ldyBQbGF5ZXIuY3JlYXRlRnJvbVN0YXRlKG1lc3NhZ2UuZGF0YS5wbGF5ZXIpO1xuICAgICAgICAgICAgcC5pZCA9IG1lc3NhZ2UuZnJvbTtcblxuICAgICAgICAgICAgcC5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhgQWRkIHBsYXllciB3aXRoIGlkICR7bWVzc2FnZS5mcm9tfWApO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkUGxheWVyKHApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGNvbm5lY3Rpb24gYW5kIHdlIGRvbid0IGFscmVhZHkgaGF2ZSBhIHNlZWQgdGhlbiBzZXQgaXRcbiAgICAgICAgICAgIGlmKCF0aGlzLnJuZykge1xuICAgICAgICAgICAgICAgIHRoaXMucm5nID0gbmV3IFJuZyhtZXNzYWdlLmRhdGEuc2VlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlbW92ZSB0aGUgcGVlcnMgcGxheWVyIGZyb20gdGhlIGdhbWVcbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJwZWVyLWRpc2Nvbm5lY3RcIiwgKHBlZXIpPT57XG4gICAgICAgICAgICBsZXQgcGxheWVyVG9EZWxldGUgPSB0aGlzLnBsYXllcnMuZ2V0KHBlZXIpXG4gICAgICAgICAgICB0aGlzLnBsYXllcnMuZGVsZXRlKHBlZXIpO1xuICAgICAgICAgICAgdGhpcy5vYmplY3RzLmRlbGV0ZShwbGF5ZXJUb0RlbGV0ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFN5bmMgUGxheWVyIHN0YXRlXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLm9uKFwicGxheWVyLXN0YXRlXCIsIChtZXNzYWdlKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiU2V0IHBsYXllciB0byBSZWFkeVwiKTtcblxuICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMucGxheWVycy5nZXQobWVzc2FnZS5mcm9tKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheWVyU3RhdGUocGxheWVyLCBtZXNzYWdlLmRhdGEucGxheWVyKTtcblxuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0JhdHRsZSkge1xuICAgICAgICAgICAgICAgIGlmKHBsYXllci5yZWFkeSkgcGxheWVyLmFjdGlvbiA9IFwicmVhZHlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2V2ZW50QnVzcy5lbWl0KFwicGxheWVyLXN0YXRlXCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyBMSVNURU4gRk9SIEdMT0JBTCBFVkVOVFMvL1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICB0aGlzLl9ldmVudEJ1c3Mub24oXCJyb29tLXN0YXRlXCIsICgpPT57Ly9cbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlVwZGF0ZSBSb29tIFN0YXRlXCIpO1xuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5yb29tLmlzTW92aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZXIuYWN0aW9uID0gXCJ3YWxrXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5hY3Rpb24gPSBcIndhaXRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgTG9nZ2VyLmxvZyhwbGF5ZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyBMSVNURU4gRk9SIElOUFVUIEVWRU5UUyAvL1xuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgICAgICAvLyBJbml0aWFsaXplIElucHV0IENvbnRyb2xsZXJcbiAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIgPSBuZXcgSW5wdXRDb250cm9sbGVyKCk7XG5cbiAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIub24oJ2VudGVyJywgKCk9PntcbiAgICAgICAgICAgIGlmKHRoaXMucm9vbS5pc0JhdHRsZSkge1xuICAgICAgICAgICAgICAgIC8vcDEucmVhZHkgPSAhcDEucmVhZHk7XG4gICAgICAgICAgICAgICAgLy9wMS5zZXRBY3Rpb24odGhpcy51aS5nZXRTZWxlY3RlZEJhdHRsZU9wdGlvbigpKTtcblxuICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFkeVwiOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBcImFjdGlvblwiOiB0aGlzLnVpLmdldFNlbGVjdGVkQmF0dGxlT3B0aW9uKClcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5ZXJTdGF0ZShwMSwgcGxheWVyU3RhdGUpO1xuICAgICAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRCdXNzLmVtaXQoXCJwbGF5ZXItc3RhdGVcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHAxLnJlYWR5ID0gIXAxLnJlYWR5O1xuICAgICAgICAgICAgICAgIGlmKHBsYXllci5yZWFkeSkgcGxheWVyLmFjdGlvbiA9IFwicmVhZHlcIjtcbiAgICAgICAgICAgICAgICBlbHNlIHBsYXllci5hY3Rpb24gPSBcIndhaXRpbmdcIjtcbiAgICAgICAgICAgICAgICB0aGlzLl9ldmVudEJ1c3MuZW1pdChcInBsYXllci1zdGF0ZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbigndXAnLCAoKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCd1cCcpO1xuICAgICAgICAgICAgaWYodGhpcy51aS5zaG93QmF0dGxlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9ICh0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXgrMiklNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIub24oJ2Rvd24nLCAoKT0+e1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdkb3duJyk7XG4gICAgICAgICAgICBpZih0aGlzLnVpLnNob3dCYXR0bGVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCsyKSU0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmlucHV0Q29udHJvbGxlci5vbignbGVmdCcsICgpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ2xlZnQnKTtcbiAgICAgICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMCkgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAxKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDMpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDI7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMikgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5pbnB1dENvbnRyb2xsZXIub24oJ3JpZ2h0JywgKCk9PntcbiAgICAgICAgICAgIExvZ2dlci5kZWJ1ZygncmlnaHQnKTtcbiAgICAgICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMCkgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMTtcbiAgICAgICAgICAgICAgICBlbHNlIGlmKHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAxKSB0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYodGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID09IDMpIHRoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9IDI7XG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMikgdGhpcy51aS5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4ID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICBhZGRQbGF5ZXIocCkge1xuICAgICAgICBsZXQgcGxheWVycyA9IHRoaXMucGxheWVycy52YWx1ZXMoKTtcbiAgICAgICAgbGV0IHlQb3MgPSAwO1xuICAgICAgICBmb3IobGV0IHBsYXllciBvZiBwbGF5ZXJzKSB7XG4gICAgICAgICAgICB5UG9zID0gcGxheWVyLnlQb3M7XG4gICAgICAgIH1cbiAgICAgICAgeVBvcysrO1xuICAgICAgICBwLnlQb3MgPSB5UG9zO1xuICAgICAgICB0aGlzLnBsYXllcnMuc2V0KHAuaWQsIHApO1xuICAgICAgICB0aGlzLm9iamVjdHMuYWRkKHApO1xuICAgIH1cblxuICAgIHVwZGF0ZVBsYXllclN0YXRlKHBsYXllciwgc3RhdGUpIHtcbiAgICAgICAgcGxheWVyLmRlc2VyaWFsaXplKHN0YXRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9ncmVzcyBHYW1lIExvZ2ljIGJ5IGNhbGxpbmcgdGljayBvbiBldmVyeSBvYmplY3RcbiAgICAgKi9cbiAgICB0aWNrKGZyYW1lKSB7XG4gICAgICAgIC8vIFJlbmRlciBldmVyeXRoaW5nXG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpPT57XG4gICAgICAgICAgICB0aGlzLl9jdHguc2F2ZSgpO1xuICAgICAgICAgICAgb2JqZWN0LnRpY2soKTtcbiAgICAgICAgICAgIG9iamVjdC5yZW5kZXIodGhpcy5fY3R4LCBmcmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9jdHgucmVzdG9yZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgRXZlbnRFbWl0dGVyIGZyb20gJy4uL21peGlucy9FdmVudEVtaXR0ZXInO1xuXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGlkKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgLy8gQXR0YWNoIGlucHV0IGxpc3RlbmVyc1xuICAgICAgICAvLyB1c2luZyBodHRwczovL2RtYXVyby5naXRodWIuaW8vS2V5cHJlc3MvXG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgd2luZG93LmtleXByZXNzLkxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoSW5wdXQodGhpcy5saXN0ZW5lcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcblxuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG4gICAgICAgIC8vd2luZG93Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICAvL3RoaXMuZW1pdChcImNsaWNrXCIpO1xuICAgICAgICAvL307XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwidFwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY2xpY2tcIik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInVwXCIsICgpPT57XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJ1cFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwiZG93blwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZG93blwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwibGVmdFwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwibGVmdFwiKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGlzdGVuZXIuc2ltcGxlX2NvbWJvKFwicmlnaHRcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInJpZ2h0XCIpO1xuICAgICAgICB9KTtcblxuICAgICAgICBsaXN0ZW5lci5zaW1wbGVfY29tYm8oXCJlbnRlclwiLCAoKT0+e1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiZW50ZXJcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBDb25maWcgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4uL1NlcnZpY2VzL0xvZ2dlcic7XG5cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBFdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllciwgc2VlZCwgaWQsIGhvc3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9zZWVkICAgPSBzZWVkIHx8IG51bGw7XG4gICAgICAgIHRoaXMuX2lkICAgICA9IGlkIHx8IG51bGw7XG5cbiAgICAgICAgaWYoaG9zdClcbiAgICAgICAgICAgIHRoaXMuX2hvc3QgPSBob3N0O1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSB0aGUgcGVlciBjb25uZWN0aW9uXG4gICAgICAgIHRoaXMuX3BlZXIgPSBuZXcgUGVlcih0aGlzLl9pZCwge1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdvcGVuJywgKGlkKT0+e1xuICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhgUGVlciBDb25uZWN0aW9uIGNyZWF0ZWQsIFBlZXIgSUQgaXMgJHtpZH1gKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgICAgICAgICAgLy8gSWYgd2Uga25vdyBhYm91dCBhIHBlZXIgdGhlbiBjb25uZWN0XG4gICAgICAgICAgICAgICAgaWYodGhpcy5faG9zdClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdCh0aGlzLl9ob3N0KSk7XG5cbiAgICAgICAgICAgICAgICAvLyBXaGVuIGEgcGVlciBjb25uZWN0cyBoYW5kbGUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdjb25uZWN0aW9uJywgKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIERvbid0IGFsbG93IG1vcmUgdGhhbiA0IHBsYXllcnNcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuc2l6ZSA+PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLmNsb3NlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdvcGVuJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhcIlBlZXIgaGFzIGNvbm5lY3RlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGVlciA9IHRoaXMuYWRkUGVlcihjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvUGVlcihwZWVyKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRQZWVyKGNvbm5lY3Rpb24pIHtcbiAgICAgICAgbGV0IHBlZXIgPSB7XG4gICAgICAgICAgICBcImNvbm5lY3Rpb25cIjogY29ubmVjdGlvbixcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fcGVlcnMuc2V0KGNvbm5lY3Rpb24ucGVlciwgcGVlcik7XG5cbiAgICAgICAgY29ubmVjdGlvbi5vbignZGF0YScsICB0aGlzLmhhbmRsZURhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgY29ubmVjdFRvUGVlcihwZWVyKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcInBlZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcInNlZWRcIjogdGhpcy5fc2VlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbWVzc2FnZS5kYXRhLnBsYXllciA9IHRoaXMuX3BsYXllci5zZXJpYWxpemUoKTtcblxuICAgICAgICBsZXQgcGVlcnMgPSBbXTtcbiAgICAgICAgZm9yKGxldCBwZWVyIG9mIHRoaXMuX3BlZXJzLmtleXMoKSkge1xuICAgICAgICAgICAgcGVlcnMucHVzaChwZWVyKTtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlLmRhdGEucGVlcnMgPSBwZWVycztcblxuICAgICAgICBMb2dnZXIuZGVidWcoYFNlbmRpbmcgcGVlci1jb25uZWN0IG1lc3NhZ2UgdG8gcGVlciB3aXRoIGlkICR7cGVlcn1gKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuaGFzU2VudFBsYXllciA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGVlcihwZWVyKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIlJlbW92ZSBwZWVyXCIpO1xuICAgICAgICB0aGlzLmVtaXQoXCJwZWVyLWRpc2Nvbm5lY3RcIiwgcGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgICAgICB0aGlzLl9wZWVycy5kZWxldGUocGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgIH1cblxuICAgIGhhbmRsZURhdGEobWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG5cbiAgICAgICAgbGV0IGRhdGEgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9PSBcInBlZXItY29ubmVjdFwiKSB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoJ0N1cnJlbnQgY29ubmVjdGlvbnMnKTtcbiAgICAgICAgICAgIExvZ2dlci5sb2codGhpcy5fcGVlcnMpO1xuXG4gICAgICAgICAgICAvLyBTZWUgaWYgdGhpcyBwZWVyIGtub3dzIGFib3V0IGFueSBvdGhlciBwZWVycyBhbmQgYWRkIGlmIHdlIGRvbid0IGtub3cgdGhlbVxuICAgICAgICAgICAgZm9yKGxldCBwZWVyIG9mIGRhdGEucGVlcnMpIHtcbiAgICAgICAgICAgICAgICBpZighdGhpcy5fcGVlcnMuZ2V0KHBlZXIpICYmIHBlZXIgIT09IHRoaXMuX2lkKSB7XG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5kZWJ1ZyhgQWRkaW5nIFBlZXIgd2l0aCBpZCAke3BlZXJ9YCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUGVlcih0aGlzLl9wZWVyLmNvbm5lY3QocGVlcikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKCdDaGVjayBpZiB3ZSBuZWVkIHRvIHNlbmQgbWVzc2FnZSB0byBtZXNzYWdlIHNlbmRlcicpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9wZWVycy5nZXQoXCJob3N0XCIpKTtcbiAgICAgICAgICAgIGlmKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pICYmICF0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKS5oYXNTZW50UGxheWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0VG9QZWVyKHRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgTG9nZ2VyLmxvZyh0aGlzLl9jb25uZWN0aW9ucyk7XG5cbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBlZXItY29ubmVjdFwiLCBtZXNzYWdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwbGF5ZXItc3RhdGVcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xpY2soKSB7XG4gICAgICAgIGlmKHRoaXMuX3BlZXJzKSB7XG4gICAgICAgICAgICBmb3IobGV0IHBlZXIgb2YgdGhpcy5fcGVlcnMudmFsdWVzKCkpIHtcblxuICAgICAgICAgICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLXN0YXRlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZnJvbVwiOiB0aGlzLl9pZCxcbiAgICAgICAgICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxheWVyXCI6IHRoaXMuX3BsYXllci5zZXJpYWxpemUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV0gfHwodGhpcy5fZXZlbnRzW3R5cGVdID0gW10pXG4gICAgICAgIGlmKGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKSAhPSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpXG4gICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBlcnJvcihcbiAgICAgICAgICAgIFwicG9zc2libGUgbWVtb3J5IGxlYWssIGFkZGVkICVpICVzIGxpc3RlbmVycywgXCIrXG4gICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgIFwid2FudCB0byBpbmNyZWFzZSB0aGUgbGltaXQgKCVpIG5vdylcIixcbiAgICAgICAgICAgIGxpc3RlbmVycy5sZW5ndGgsXG4gICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgb25jZSh0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgZXZlbnRzSW5zdGFuY2UgPSB0aGlzXG4gICAgICAgIGZ1bmN0aW9uIG9uY2VDYWxsYmFjaygpe1xuICAgICAgICAgIGV2ZW50c0luc3RhbmNlLm9mZih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgICAgICAgbGlzdGVuZXIuYXBwbHkobnVsbCwgYXJndW1lbnRzKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm9uKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICB9XG5cbiAgICBvZmYodHlwZSwgLi4uYXJncykge1xuICAgICAgICBpZihhcmdzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbnVsbFxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lciA9IGFyZ3NbMF1cbiAgICAgICAgaWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV1cbiAgICAgICAgaWYoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGluZGV4T2ZMaXN0ZW5lciA9IGxpc3RlbmVycy5pbmRleE9mKGxpc3RlbmVyKVxuICAgICAgICBpZihpbmRleE9mTGlzdGVuZXIgPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5zcGxpY2UoaW5kZXhPZkxpc3RlbmVyLCAxKVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIGVtaXQodHlwZSwgLi4uYXJncyl7XG4gICAgICAgIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV1cbiAgICAgICAgaWYoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5mb3JFYWNoKGZuID0+IGZuLmFwcGx5KG51bGwsIGFyZ3MpKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cblxuICAgIHNldE1heExpc3RlbmVycyhuZXdNYXhMaXN0ZW5lcnMpe1xuICAgICAgICBpZihwYXJzZUludChuZXdNYXhMaXN0ZW5lcnMpICE9PSBuZXdNYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBuZXdNYXhMaXN0ZW5lcnNcbiAgICB9XG5cbn1cbiIsImltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnLi4vbWl4aW5zL0V2ZW50RW1pdHRlcic7XG5pbXBvcnQgTG9nZ2VyICAgICAgIGZyb20gJy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGZpbGxhYmxlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2ZpbGxhYmxlID0gZmlsbGFibGU7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICBpZih0aGlzLmlzVmlzaWJsZSlcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGN0eCwgZnJhbWUpO1xuICAgIH1cblxuICAgIHNlcmlhbGl6ZSgpIHtcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICBmb3IobGV0IHByb3Agb2YgdGhpcy5fZmlsbGFibGUpIHtcbiAgICAgICAgICAgIG9ialtwcm9wXSA9IHRoaXNbcHJvcF0uc2VyaWFsaXplID8gdGhpc1twcm9wXS5zZXJpYWxpemUoKTogdGhpc1twcm9wXTtcbiAgICAgICAgfVxuICAgICAgICBvYmpbJ2lzVmlzaWJsZSddID0gdGhpc1snaXNWaXNpYmxlJ107XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgZGVzZXJpYWxpemUoZGF0YSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoXCJEZXNlcmlhbGl6ZVwiKTtcbiAgICAgICAgTG9nZ2VyLmxvZyhkYXRhKTtcbiAgICAgICAgZm9yKGxldCBwcm9wIG9mIHRoaXMuX2ZpbGxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzW3Byb3BdID0gZGF0YVtwcm9wXSAhPT0gdW5kZWZpbmVkID8gZGF0YVtwcm9wXSA6IHRoaXNbcHJvcF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhdHRhY2hFdmVudHMoYnVzcykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpIGZyb20gJy4vVWknO1xuaW1wb3J0IEJhdHRsZVVpUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvQmF0dGxlVWlSZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgICAgICAgICAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgICAgICAgICAgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAgICAgICAgICAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAgICAgICAgICAtICUgWSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gcGxheWVyQ2hhcmFjdGVycyAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKiBAcGFyYW0gZW5lbWllcyAgICAgICAgICAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZLCBwbGF5ZXJDaGFyYWN0ZXJzLCBlbmVtaWVzKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpO1xuXG4gICAgICAgIHRoaXMucGxheWVyQ2hhcmFjdGVycyA9IHBsYXllckNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMuZW5lbWllcyAgICAgICAgICA9IGVuZW1pZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgQmF0dGxlVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcbmltcG9ydCBNb25zdGVyUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvTW9uc3RlclJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBUWVBFX1dVUk0oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3d1cm0tc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnd3VybSdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIHR5cGUpIHtcbiAgICAgICAgc3VwZXIoW10pO1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zO1xuICAgICAgICB0aGlzLnlwb3MgPSB5UG9zO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgTW9uc3RlclJlbmRlcmVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5pbml0KCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgICAgIGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgUGxheWVyUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvUGxheWVyUmVuZGVyZXInO1xuXG5sZXQgRklMTEFCTEUgPSBuZXcgU2V0KFtcbiAgICBcIm5hbWVcIixcbiAgICBcInJlYWR5XCIsXG4gICAgXCJpc1dhbGtpbmdcIixcbiAgICBcImpvYlwiLFxuICAgIFwicG9zaXRpb25cIixcbiAgICBcIm1heEhlYWx0aFwiLFxuICAgIFwiaGVhbHRoXCIsXG4gICAgXCJtYXhNYW5hXCIsXG4gICAgXCJtYW5hXCIsXG4gICAgXCJhY3Rpb25cIixcbl0pO1xuXG5sZXQgU1RBVEVTID0gbmV3IFNldChbXG4gICAgXCJpZGxlXCIsXG4gICAgXCJ3YWxraW5nXCIsXG4gICAgXCJ3YWl0aW5nXCIsXG4gICAgXCJhY3Rpb25cIixcbiAgICBcImJ1c3lcIlxuXSk7XG5cbmNsYXNzIFBsYXllciBleHRlbmRzIEJhc2VPYmplY3Qge1xuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBKT0JfQ0xBSVJWT1lBTlQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2NsYWlydm95YW50LXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50JyxcbiAgICAgICAgICAgICdoZWFsdGgnOiA2MCxcbiAgICAgICAgICAgICdtYW5hJzogNDAsXG4gICAgICAgICAgICAncG9zaXRpb24nOiAnYmFjaydcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX0hFUkJBTElTVCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnaGVyYmFsaXN0LXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICdoZXJiYWxpc3QnLFxuICAgICAgICAgICAgJ2hlYWx0aCc6IDQwLFxuICAgICAgICAgICAgJ21hbmEnOiAwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2JhY2snXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9WSUxMQUlOKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICd2aWxsYWluMi1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAndmlsbGFpbicsXG4gICAgICAgICAgICAnaGVhbHRoJzogODAsXG4gICAgICAgICAgICAnbWFuYSc6IDIwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfS05JR0hUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdrbmlnaHQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2tuaWdodCcsXG4gICAgICAgICAgICAnaGVhbHRoJzogMTAwLFxuICAgICAgICAgICAgJ21hbmEnOiAwLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfTkVDUk9NQU5DRVIoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ25lY3JvbWFuY2VyLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICduZWNyb21hbmNlcicsXG4gICAgICAgICAgICAnaGVhbHRoJzogNDAsXG4gICAgICAgICAgICAnbWFuYSc6IDEyMCxcbiAgICAgICAgICAgICdwb3NpdGlvbic6ICdmcm9udCdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIG5hbWUsIGpvYiwgc3RhdGUpIHtcbiAgICAgICAgc3VwZXIoRklMTEFCTEUpO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnJlYWR5ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNXYWxraW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuam9iID0gam9iO1xuICAgICAgICB0aGlzLnBvc2l0aW9uID0gam9iLnBvc2l0aW9uO1xuICAgICAgICB0aGlzLm1heEhlYWx0aCA9IGpvYi5oZWFsdGg7XG4gICAgICAgIHRoaXMuaGVhbHRoID0gam9iLmhlYWx0aDtcbiAgICAgICAgdGhpcy5tYXhNYW5hID0gam9iLm1hbmE7XG4gICAgICAgIHRoaXMubWFuYSA9IGpvYi5tYW5hO1xuICAgICAgICB0aGlzLmFjdGlvbiA9IFwid2FpdFwiO1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zIHx8IDA7XG4gICAgICAgIHRoaXMueVBvcyA9IHlQb3MgfHwgMDtcblxuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGUgfHwgXCJpZGxlXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZUZyb21TdGF0ZShvYmopIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQbGF5ZXIob2JqLnhwb3MsIG9iai55cG9zLCBvYmoubmFtZSwgb2JqLmpvYik7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBQbGF5ZXJSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgfVxuXG4gICAgc2V0QWN0aW9uKGFjdGlvbikge1xuICAgICAgICB0aGlzLmFjdGlvbiA9IGFjdGlvbjtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImltcG9ydCBCYXNlT2JqZWN0ICAgICBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IFJvb21SZW5kZXJlciBmcm9tICcuLi92aWV3cy9Sb29tUmVuZGVyZXInO1xuaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5sZXQgRklMTEFCTEUgPSBuZXcgU2V0KFtcbiAgICBcImVuZW1pZXNcIixcbiAgICBcInR5cGVcIixcbiAgICBcImlzTW92aW5nXCIsXG4gICAgXCJpc0JhdHRsZVwiLFxuICAgIFwiaXNMb29raW5nXCIsXG4gICAgXCJuZXh0RW5jb3VudGVyXCIsXG4gICAgXCJlbmNvdW50ZXJSYXRlXCIsXG4gICAgXCJ0aWNrQ291bnRcIlxuXSk7XG5cbmNsYXNzIFJvb20gZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBUWVBFX0NBVkUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmbG9vcjogJ2dvb2R0aWxlLnBuZycsXG4gICAgICAgICAgICB3YWxsOiAnc2hpdHdhbGwucG5nJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgVFlQRV9URU1QTEUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmbG9vcjogJ2dyYXNzLnBuZycsXG4gICAgICAgICAgICB3YWxsOiAncGlsbGFycy5wbmcnXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IodHlwZSwgZW5lbWllcywgcGxheWVycywgZW5jb3VudGVyUmF0ZSkge1xuICAgICAgICBzdXBlcihGSUxMQUJMRSk7XG4gICAgICAgIHRoaXMucGxheWVycyAgICAgICAgPSBwbGF5ZXJzO1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmlzTW92aW5nICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNCYXR0bGUgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICA9IGVuZW1pZXM7XG4gICAgICAgIHRoaXMuaXNMb29raW5nICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmNvdW50ZXJSYXRlID0gZW5jb3VudGVyUmF0ZSB8fCA1MDtcbiAgICB9XG5cbiAgICBhdHRhY2hFdmVudHMoZXZlbnRCdXNzKSB7XG4gICAgICAgIGV2ZW50QnVzcy5vbihcInBsYXllci1zdGF0ZVwiLCAoKT0+IHtcbiAgICAgICAgICAgIGxldCByZWFkeSA9IHRydWU7XG5cbiAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgIHJlYWR5ID0gcGxheWVyLnJlYWR5ICYmIHJlYWR5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihyZWFkeSkge1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzLmlzTG9va2luZyAmJiAhdGhpcy5pc0JhdHRsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE5leHRFbmNvdW50ZXIoMTAwKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZXZlbnRCdXNzLmVtaXQoXCJyb29tLXN0YXRlXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJvb21SZW5kZXJlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIGxvb2tGb3JUcm91YmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0xvb2tpbmcpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuaXNCYXR0bGUpIHRoaXMuZW5kQmF0dGxlKCk7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIHN0b3BMb29raW5nKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNMb29raW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICBwbGF5ZXIuaXNXYWxraW5nID0gIXBsYXllci5pc1dhbGtpbmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuZEJhdHRsZSgpIHtcbiAgICAgICAgaWYodGhpcy5pc0JhdHRsZSkge1xuICAgICAgICAgICAgdGhpcy5pc0JhdHRsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLmZvckVhY2goKGVuZW15KT0+e1xuICAgICAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJlbmQtYmF0dGxlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMudGlja0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5pc0JhdHRsZSAgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTG9va2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW92aW5nICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuZW1pZXMuZm9yRWFjaCgoZW5lbXkpPT57XG4gICAgICAgICAgICBlbmVteS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICBwbGF5ZXIuaXNXYWxraW5nID0gZmFsc2U7XG4gICAgICAgICAgICBwbGF5ZXIucmVhZHkgICAgID0gZmFsc2U7XG4gICAgICAgICAgICBwbGF5ZXIuYWN0aW9uICAgID0gXCJ3YWl0XCI7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVtaXQoXCJzdGFydC1iYXR0bGVcIik7XG4gICAgfVxuXG4gICAgc2V0TmV4dEVuY291bnRlcih0aWNrcykge1xuICAgICAgICB0aGlzLm5leHRFbmNvdW50ZXIgPSB0aWNrcztcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICB0aGlzLnRpY2tDb3VudCA9IHRoaXMudGlja0NvdW50IHx8IDA7XG4gICAgICAgIGlmKHRoaXMuaXNMb29raW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRpY2tDb3VudCsrO1xuICAgICAgICAgICAgaWYodGhpcy50aWNrQ291bnQgPiB0aGlzLm5leHRFbmNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QmF0dGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgsIGZyYW1lKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IFJvb207XG4iLCJpbXBvcnQgVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9VaVJlbmRlcmVyJztcbmltcG9ydCBCYXNlT2JqZWN0IGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5iZyAgICAgICAgICAgICAgICA9ICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvdWktYmcucG5nJztcbiAgICAgICAgdGhpcy53aWR0aCAgICAgICAgICAgICA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCAgICAgICAgICAgID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLm9mZnNldFggICAgICAgICAgID0gb2Zmc2V0WDtcbiAgICAgICAgdGhpcy5vZmZzZXRZICAgICAgICAgICA9IG9mZnNldFk7XG4gICAgICAgIHRoaXMuc2hvd0JhdHRsZU9wdGlvbnMgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmJhdHRsZU9wdGlvbnMgPSBbXG4gICAgICAgICAgICBcImF0dGFja1wiLFxuICAgICAgICAgICAgXCJhYmlsaXR5XCIsXG4gICAgICAgICAgICBcIml0ZW1cIixcbiAgICAgICAgICAgIFwiZGVmZW5kXCJcbiAgICAgICAgXVxuICAgICAgICB0aGlzLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemF0aW9uIFByb21pc2VcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFVpUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4KTtcbiAgICB9XG5cbiAgICB0b2dnbGVCYXR0bGVPcHRpb25zKCkge1xuICAgICAgICB0aGlzLnNob3dCYXR0bGVPcHRpb25zID0gIXRoaXMuc2hvd0JhdHRsZU9wdGlvbnM7XG4gICAgfVxuXG4gICAgZ2V0U2VsZWN0ZWRCYXR0bGVPcHRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJhdHRsZU9wdGlvbnNbdGhpcy5zZWxlY3RlZEJhdHRsZU9wdGlvbkluZGV4XTtcbiAgICB9XG59XG4iLCIvLyBJbXBvcnQgVXRpbHNcbmltcG9ydCBVdGlscyAgICBmcm9tICcuL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICBmcm9tICcuL1JuZyc7XG5cbi8vIEltcG9ydCBDb250cm9sbGVyc1xuaW1wb3J0IEdhbWVDb250cm9sbGVyICAgICBmcm9tICcuLi9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKiBAdG9kbzogZG9lcyB0aGlzIGJlbG9uZyBoZXJlP1xuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHRoZSBnYW1lIGdvZXMgZnVsbCBzY3JlZW4sIHdpbGwgZnVsbHNjcmVlbiB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICAgKiBGb3VuZDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Z1bGxzY3JlZW5fQVBJXG4gICAgICovXG4gICAgcmVxdWVzdEZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGVuZ2luZVxuICAgICAqL1xuICAgIGluaXQobmFtZSwgam9iLCBpZCwgaG9zdCkge1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBVdGlscy5wYXJzZVF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAvL2luaXRpYWxpemUgdGhlIGdhbWUgY29udHJvbGxlclxuICAgICAgICAvL0B0b2RvIG5lZWQgdG8gcGFzcyBwYXJhbXMgdG8gdGhpc1xuICAgICAgICB0aGlzLmdhbWUgPSBuZXcgR2FtZUNvbnRyb2xsZXIodGhpcy5fY3R4KTtcbiAgICAgICAgdGhpcy5nYW1lLmluaXQobmFtZSwgam9iLCBpZCwgaG9zdCkudGhlbigoKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIENvbnRyb2xsZXIgSW5pdGlhbGl6ZWRcIik7XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAvQ29uZmlnLkZQUztcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSB0aGlzLnRoZW47XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEF0dGFjaCByZXNpemUgZXZlbnRcbiAgICAgICAgLy93aW5kb3cucmVzaXplID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gQXR0YWNoIEZ1bGxzY3JlZW4gZXZlbnRcbiAgICAgICAgLy9kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZXF1ZXN0RnVsbHNjcmVlbi5iaW5kKHRoaXMpKTtcblxuICAgICAgICBMb2dnZXIuYmFubmVyKCdHYW1lIFN0YXJ0ZWQnKTtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vY29kZXRoZW9yeS5pbi9jb250cm9sbGluZy10aGUtZnJhbWUtcmF0ZS13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XG5cbiAgICAgICAgLy8gSWYgdGhlIGZwcyBpbnRlcnZhbCBpcyBjb3JyZWN0XG4gICAgICAgIGlmIChkZWx0YSA+IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIC8vIENhbGN1bGF0ZSB0aW1lIHNpbmNlIGxhc3QgZnJhbWVcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChkZWx0YSAlIHRoaXMuaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAvLyBTZXQgdXAgUmVuZGVyaW5nXG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9IHRoaXMuX2ZyYW1lIHx8IDE7XG4gICAgICAgICAgICB0aGlzLl9mcmFtZSA9ICh0aGlzLl9mcmFtZSVDb25maWcuRlBTKSA/IHRoaXMuX2ZyYW1lIDogMTtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3MgZ2FtZVxuICAgICAgICAgICAgdGhpcy5nYW1lLnRpY2sodGhpcy5fZnJhbWUpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbmV4dCByZW5kZXIgY3ljbGVcbiAgICAgICAgICAgIGxldCB0aW1lX2VsID0gKHRoaXMudGhlbiAtIHRoaXMuZmlyc3QpLzEwMDA7XG4gICAgICAgICAgICArK3RoaXMuY291bnRlcjtcbiAgICAgICAgICAgIGxldCBmcHMgPSBwYXJzZUludCh0aGlzLmNvdW50ZXIvdGltZV9lbCk7XG5cbiAgICAgICAgICAgIC8vIFNob3cgRlBTXG4gICAgICAgICAgICBsZXQgZm9udFNpemUgICAgICAgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQodGhpcy5fZnJhbWUgKyBcIi9cIiArIENvbmZpZy5GUFMgKyBcIiBcIiArIGZwcyArIFwiZnBzXCIsIDIwLCAyMCk7XG5cbiAgICAgICAgICAgIC8vIEluY3JlbWVudCBGcmFtZVxuICAgICAgICAgICAgdGhpcy5fZnJhbWUrKztcbiAgICAgICAgfVxuICAgIH1cblxufVxuIiwiaW1wb3J0IExvZ2dlciBmcm9tICcuL0xvZ2dlcic7XG5cbnZhciBERUZBVUxUX01BWF9MSVNURU5FUlMgPSAxMlxuXG5mdW5jdGlvbiBlcnJvcihtZXNzYWdlLCAuLi5hcmdzKXtcbiAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBbbWVzc2FnZV0uY29uY2F0KGFyZ3MpKVxuICBjb25zb2xlLnRyYWNlKClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IERFRkFVTFRfTUFYX0xJU1RFTkVSU1xuICAgICAgICB0aGlzLl9ldmVudHMgPSB7fVxuICAgIH1cblxuICAgIG9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICBpZihsaXN0ZW5lcnMubGVuZ3RoID4gdGhpcy5fbWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgXCJ1c2UgRXZlbnRFbWl0dGVyI3NldE1heExpc3RlbmVycyhudW1iZXIpIGlmIHlvdSBcIiArXG4gICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICBMb2dnZXIuZGVidWcoYEV2ZW50IEJ1c3MgRW1pdDogJHt0eXBlfWApO1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZGVidWcobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihzZWVkKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUk5HIENSRUFURVwiKTtcbiAgICAgICAgdGhpcy5fcm5nID0gbmV3IFJORyhzZWVkKTtcbiAgICAgICAgd2luZG93LnJuZyA9IHRoaXMuX3JuZztcbiAgICB9XG5cbiAgICBuZXh0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm5nLnJhbmRvbSgpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbGltaXRsb29wKGZuLCBmcHMpIHtcbiAgICAgICAgLy8gVXNlIHZhciB0aGVuID0gRGF0ZS5ub3coKTsgaWYgeW91XG4gICAgICAgIC8vIGRvbid0IGNhcmUgYWJvdXQgdGFyZ2V0dGluZyA8IElFOVxuICAgICAgICB2YXIgdGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGN1c3RvbSBmcHMsIG90aGVyd2lzZSBmYWxsYmFjayB0byA2MFxuICAgICAgICBmcHMgPSBmcHMgfHwgNjA7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG5cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG4gICAgICAgICAgICAvLyBhZ2FpbiwgRGF0ZS5ub3coKSBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGltZVxuICAgICAgICAgICAgICAgIC8vIG5vdyAtIChkZWx0YSAlIGludGVydmFsKSBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIGp1c3QgXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlbiA9IG5vdywgd2hpY2ggY2FuIGVuZCB1cCBsb3dlcmluZyBvdmVyYWxsIGZwc1xuICAgICAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBmblxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oMCkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXNwZWN0SGVpZ2h0Q2FsYyh3Mikge1xuICAgICAgICBsZXQgdzEgPSAxOTIwO1xuICAgICAgICBsZXQgaDEgPSAxMDgwO1xuICAgICAgICByZXR1cm4gaDEqdzIvdzE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlUXVlcnkoc2VhcmNoKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xuXG4gICAgICAgIHZhciBhcmdzUGFyc2VkID0ge307XG5cbiAgICAgICAgdmFyIGksIGFyZywga3ZwLCBrZXksIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaT0wOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGFyZy5pbmRleE9mKCc9JykpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRbZGVjb2RlVVJJQ29tcG9uZW50KGFyZykudHJpbSgpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGt2cCA9IGFyZy5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFswXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzFdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzUGFyc2VkO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4vVWlSZW5kZXJlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWlSZW5kZXJlciB7XG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoY3R4KTtcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuXG4gICAgICAgIGxldCB4cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWCAtIDkpXG4gICAgICAgIGxldCB5cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSArIGZvbnRTaXplKjI7XG5cbiAgICAgICAgLy8gUmVuZGVyIEJhdHRsZSBPcHRpb25zXG4gICAgICAgIGlmKHRoaXMudWkuc2hvd0JhdHRsZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAwID8gJz4nIDogJyd9JHt0aGlzLnVpLmJhdHRsZU9wdGlvbnNbMF19YCxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAxID8gJz4nIDogJyd9JHt0aGlzLnVpLmJhdHRsZU9wdGlvbnNbMV19YCxcbiAgICAgICAgICAgICAgICB4cG9zICsgQ29uZmlnLlRJTEVfU0laRSoyLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIGAke3RoaXMudWkuc2VsZWN0ZWRCYXR0bGVPcHRpb25JbmRleCA9PSAyID8gJz4nIDogJyd9JHt0aGlzLnVpLmJhdHRsZU9wdGlvbnNbMl19YCxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3MgKyBmb250U2l6ZSoyXG4gICAgICAgICAgICBdKTtcblxuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHt0aGlzLnVpLnNlbGVjdGVkQmF0dGxlT3B0aW9uSW5kZXggPT0gMyA/ICc+JyA6ICcnfSR7dGhpcy51aS5iYXR0bGVPcHRpb25zWzNdfWAsXG4gICAgICAgICAgICAgICAgeHBvcyArIENvbmZpZy5USUxFX1NJWkUqMixcbiAgICAgICAgICAgICAgICB5cG9zICsgZm9udFNpemUqMlxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICB4cG9zID0gQ29uZmlnLlRJTEVfU0laRSooQ29uZmlnLlRJTEVfWCAtIDUpXG4gICAgICAgIHlwb3MgPSBDb25maWcuVElMRV9TSVpFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuXG4gICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSW5mb1xuICAgICAgICB0aGlzLnVpLnBsYXllckNoYXJhY3RlcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgeXBvcyArPSBmb250U2l6ZSoyO1xuXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBOYW1lc1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFyWFBvcyAgID0geHBvcyArIENvbmZpZy5USUxFX1NJWkUqMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJZUG9zICAgPSB5cG9zIC0gZm9udFNpemUvMjtcbiAgICAgICAgICAgIGxldCBoZWFsdGhCYXJXaWR0aCAgPSBDb25maWcuVElMRV9TSVpFKjI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoQmFySGVpZ2h0ID0gZm9udFNpemUvMjtcblxuXG4gICAgICAgICAgICAvL2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIC8vY3R4LmZpbGxSZWN0KGhlYWx0aEJhclhQb3MsIGhlYWx0aEJhcllQb3MsIGhlYWx0aEJhcldpZHRoLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBGaWxsXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gXCIjRkYwMDAwXCI7XG4gICAgICAgICAgICBsZXQgaGVhbHRoUGVyY2VudGFnZSA9IHBsYXllci5oZWFsdGgvcGxheWVyLm1heEhlYWx0aDtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCpoZWFsdGhQZXJjZW50YWdlLCBoZWFsdGhCYXJIZWlnaHQpO1xuXG4gICAgICAgICAgICAvLyBSZW5kZXIgUGxheWVyIEhlYWx0aCBTdHJva2VcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCAgID0gMSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBcIiNGRkZcIjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgYCR7cGxheWVyLmhlYWx0aH0vJHtwbGF5ZXIubWF4SGVhbHRofWAsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWFBvcytoZWFsdGhCYXJXaWR0aCsyKkNvbmZpZy5TUFJJVEVfU0NBTEUsXG4gICAgICAgICAgICAgICAgaGVhbHRoQmFyWVBvc1xuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIGhlYWx0aEJhcllQb3MgKz0gaGVhbHRoQmFySGVpZ2h0KjEuNTtcblxuICAgICAgICAgICAgLy9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICAvL2N0eC5maWxsUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgLy8gUmVuZGVyIFBsYXllciBIZWFsdGggRmlsbFxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiIzAwMDBGRlwiO1xuICAgICAgICAgICAgbGV0IG1hbmFQZXJjZW50YWdlID0gcGxheWVyLm1hbmEvcGxheWVyLm1heE1hbmE7XG4gICAgICAgICAgICBjdHguZmlsbFJlY3QoaGVhbHRoQmFyWFBvcywgaGVhbHRoQmFyWVBvcywgaGVhbHRoQmFyV2lkdGgqbWFuYVBlcmNlbnRhZ2UsIGhlYWx0aEJhckhlaWdodCk7XG5cbiAgICAgICAgICAgIC8vIFJlbmRlciBQbGF5ZXIgSGVhbHRoIFN0cm9rZVxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoICAgPSAxKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICBjdHguc3Ryb2tlUmVjdChoZWFsdGhCYXJYUG9zLCBoZWFsdGhCYXJZUG9zLCBoZWFsdGhCYXJXaWR0aCwgaGVhbHRoQmFySGVpZ2h0KTtcblxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwiI0ZGRlwiO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBgJHtwbGF5ZXIubWFuYX0vJHtwbGF5ZXIubWF4TWFuYX1gLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhclhQb3MraGVhbHRoQmFyV2lkdGgrMipDb25maWcuU1BSSVRFX1NDQUxFLFxuICAgICAgICAgICAgICAgIGhlYWx0aEJhcllQb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcihtb25zdGVyKSB7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5tb25zdGVyID0gbW9uc3RlcjtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ3Nwcml0ZScsIHRoaXMubW9uc3Rlci50eXBlLnNwcml0ZSksXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG4gICAgICAgIGxldCBzcHJpdGUgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICBzcHJpdGUsXG4gICAgICAgICAgICBzcHJpdGUud2lkdGgvMyp0aGlzLmZyYW1lLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLndpZHRoLzMsIC8vIGRXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIDIwLFxuICAgICAgICAgICAgMTAsIC8vIFlwb3NcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLndpZHRoLzMqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMipDb25maWcuU1BSSVRFX1NDQUxFICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKHBsYXllcikge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ3Nwcml0ZScsIHRoaXMucGxheWVyLmpvYi5zcHJpdGUpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ3NoYWRvdycsICAnc2hhZG93LnBuZycpLFxuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoJ2J1YmJsZScsICAnd2FpdGluZy5wbmcnKVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLmZyYW1lICAgICAgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgbGV0IHBsYXllciAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgncGxheWVyJyk7XG4gICAgICAgIGxldCBwbGF5ZXJXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIGxldCB4T2Zmc2V0ID0gQ29uZmlnLlRJTEVfWCAtIDM7XG4gICAgICAgIGlmKHRoaXMucGxheWVyLnBvc2l0aW9uID09IFwiYmFja1wiKSB7XG4gICAgICAgICAgICB4T2Zmc2V0Kys7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgc2hhZG93ICAgICAgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzaGFkb3cnKTtcblxuICAgICAgICBsZXQgYnViYmxlICAgICAgID0gdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyk7XG4gICAgICAgIGxldCBidWJibGVXaWR0aCAgPSBidWJibGUud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgbGV0IGJ1YmJsZUhlaWdodCA9IGJ1YmJsZS5oZWlnaHQvNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuXG4gICAgICAgIC8vIERyYXcgU2hhZG93XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgc2hhZG93LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBzaGFkb3cud2lkdGgsIC8vIGRXaWR0aFxuICAgICAgICAgICAgc2hhZG93LndpZHRoLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB4T2Zmc2V0KihwbGF5ZXJXaWR0aCksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIHBsYXllciBYIFBvc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueVBvcyoocGxheWVyV2lkdGgpICsgKHBsYXllcldpZHRoKSAtIChDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpLmhlaWdodC8xLjc1KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggcGxheWVyIFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuXG4gICAgICAgIC8vIERyYXcgUGxheWVyIFNwcml0ZVxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLFxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuaXNXYWxraW5nID8gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKSA6IDAsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCwgLy8gc1dpZHRoXG4gICAgICAgICAgICBwbGF5ZXJXaWR0aCAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICAvLyBEcmF3IEJ1YmJsZVxuICAgICAgICBsZXQgYnViYmxlT2Zmc2V0ID0gMDtcbiAgICAgICAgc3dpdGNoKHRoaXMucGxheWVyLmFjdGlvbikge1xuICAgICAgICAgICAgY2FzZSBcIndhaXRcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImF0dGFja1wiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJkZWZlbmRcIjpcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQgPSBidWJibGUuaGVpZ2h0LzUqMjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJpdGVtXCI6XG4gICAgICAgICAgICAgICAgYnViYmxlT2Zmc2V0ID0gYnViYmxlLmhlaWdodC81KjM7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiYWJpbGl0eVwiOlxuICAgICAgICAgICAgICAgIGJ1YmJsZU9mZnNldCA9IGJ1YmJsZS5oZWlnaHQvNSo0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5wbGF5ZXIuYWN0aW9uICE9PSBcIndhbGtcIiAmJiB0aGlzLnBsYXllci5hY3Rpb24gIT09IFwicmVhZHlcIikge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJyksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICBidWJibGVPZmZzZXQsIC8vIERZXG4gICAgICAgICAgICAgICAgYnViYmxlLndpZHRoLCAgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgYnViYmxlLmhlaWdodC81LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgeE9mZnNldCoocGxheWVyV2lkdGgpIC0gKGJ1YmJsZVdpZHRoLzEuNSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSAtIChidWJibGVIZWlnaHQvMS41KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAgICAgYnViYmxlV2lkdGgsICAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBidWJibGVIZWlnaHQgIC8vIHNIZWlnaHRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWRzIHRoZSByZXNvdXJjZSBieSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqL1xuICAgIGxvYWRSZXNvdXJjZShuYW1lLCByZXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGByZXNvdXJjZSBsb2FkZWQ6ICR7cmVzb3VyY2V9YCk7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW1nLnNyYyA9ICcuL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy8nICsgcmVzb3VyY2U7XG5cbiAgICAgICAgICAgIC8vIElmIHRoaXMgaXMgdGhlIGZpcnN0IHJlc291cmNlIGNyZWF0ZSBpdFxuICAgICAgICAgICAgaWYoIXRoaXMuX3Jlc291cmNlcykge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5zZXQobmFtZSwgaW1nKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yb29tID0gb2JqZWN0O1xuICAgICAgICB0aGlzLl9mbG9vck9mZnNldCA9IDA7XG4gICAgICAgIHRoaXMuX3dhbGxPZmZzZXQgID0gMDtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgdGhpcy5sb2FkUmVzb3VyY2UoXCJmbG9vclwiLCB0aGlzLnJvb20udHlwZS5mbG9vciksXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcIndhbGxcIiwgIHRoaXMucm9vbS50eXBlLndhbGwpXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgICAgICA9IChmcmFtZSA8IENvbmZpZy5GUFMlMikgPyAwIDogMTtcbiAgICAgICAgdGhpcy5mcmFtZSA9IGZyYW1lJTI7XG5cbiAgICAgICAgLy8gUmVuZGVyIEZsb29yXG4gICAgICAgIGxldCBmbG9vciA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ2Zsb29yJyk7XG4gICAgICAgIGxldCBmbG9vcldpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YKzE7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IENvbmZpZy5USUxFX1kgLSA0OyB5KyspIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICAgICAgZmxvb3IsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9mbG9vck9mZnNldCArIGZsb29yV2lkdGgqeCAtIGZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgICh5KzIpKmZsb29yV2lkdGgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGZsb29yV2lkdGhcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICAgICAvL3RoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLFxuICAgICAgICAgICAgLy90aGlzLnBsYXllci5pc1dhbGtpbmcgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUpIDogMCwgLy8gRFhcbiAgICAgICAgICAgIC8vMCwgLy8gRFlcbiAgICAgICAgICAgIC8vQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIC8vQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAvL3hPZmZzZXQqKHBsYXllcldpZHRoKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAvL3RoaXMucGxheWVyLnlQb3MqKHBsYXllcldpZHRoKSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAvL3BsYXllcldpZHRoLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIC8vcGxheWVyV2lkdGggIC8vIHNIZWlnaHRcblxuICAgICAgICAvLyBSZW5kZXIgV2FsbFxuICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKTtcbiAgICAgICAgbGV0IHdhbGxXaWR0aCA9IHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHdhbGxXaWR0aCkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHdhbGwsXG4gICAgICAgICAgICAgICAgMCwgLy8gRFhcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodC8yKnRoaXMuZnJhbWUsIC8vRFlcbiAgICAgICAgICAgICAgICB3YWxsLndpZHRoLFxuICAgICAgICAgICAgICAgIHdhbGwuaGVpZ2h0LzIsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArIHdhbGxXaWR0aCp4IC0gd2FsbFdpZHRoLCAvL3N4XG4gICAgICAgICAgICAgICAgMCwgLy9zeVxuICAgICAgICAgICAgICAgIHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSxcbiAgICAgICAgICAgICAgICB3YWxsLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFLzJcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRlIE9mZnNldHNcbiAgICAgICAgbGV0IHhTdGVwID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgIGlmKHRoaXMucm9vbS5pc01vdmluZykge1xuICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl9mbG9vck9mZnNldCA+PSBmbG9vcldpZHRoIC0gMSkgdGhpcy5fZmxvb3JPZmZzZXQgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fd2FsbE9mZnNldCA+IHdhbGxXaWR0aCAtIDEpIHRoaXMuX3dhbGxPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1aSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVpID0gdWk7XG4gICAgICAgIHRoaXMuX3VpQmcgPSB1aS5iZztcbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl91aUJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLi4uYmdSZWN0KTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCIjNjRBMzU3XCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCIjMDAzNzAwXCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCguLi51aVJlY3QpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzhEODA0NVwiO1xuXG4gICAgICAgIC8vIFRoZSBzdHJva2UgaXMgbWlkZGxlIGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGJveFxuICAgICAgICBsZXQgbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMzI7XG4gICAgICAgIC8vbGV0IGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIHN0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIFRyeWluZyB0byBnZXQgc2Vjb25kIGJvcmRlclxuICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuXG4gICAgICAgIC8vbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvNDg7XG4gICAgICAgIC8vY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICAvL3N0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgLy9zdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9jdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBsZXQgcGF0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5pbWFnZSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICB9XG59XG4iXX0=
