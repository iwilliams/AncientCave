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

},{"./app/services/Engine":13}],2:[function(require,module,exports){
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

config.calculate = function () {
    config.PERCENTAGE = 1;

    // 16x9 Aspect Ratio
    config.ASPECT_WIDTH = 1920;
    config.ASPECT_HEIGHT = 1080;

    config.CANVAS_WIDTH = window.outerWidth * config.PERCENTAGE;
    config.CANVAS_HEIGHT = config.CANVAS_WIDTH * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

    // Make sure the window will fit vertically
    if (config.CANVAS_HEIGHT > window.innerHeight) {
        config.CANVAS_HEIGHT = window.outerHeight * config.PERCENTAGE;
        config.CANVAS_WIDTH = config.CANVAS_HEIGHT * config.ASPECT_WIDTH / config.ASPECT_HEIGHT;
    }

    config.TILE_X = 14; // MUST BE MULTIPLE OF 16
    config.TILE_Y = config.TILE_X * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

    config.SPRITE_SIZE = 24;
    config.SPRITE_SCALE = config.CANVAS_WIDTH / (config.TILE_X * config.SPRITE_SIZE);

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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MultiplayerController2 = require('./MultiplayerController');

var _MultiplayerController3 = _interopRequireDefault(_MultiplayerController2);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_MultiplayerController) {
    _inherits(_default, _MultiplayerController);

    function _default(hostId, player) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, player);
        this._hostId = hostId;
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

            return new Promise(function (res, rej) {
                var connection = _this._peer.connect(_this._hostId);

                if (_this._connections) _this._connections.push(connection);else _this._connections = [connection];

                connection.on('data', _this.handleData.bind(_this));

                res();
            });
        }
    }]);

    return _default;
})(_MultiplayerController3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"./MultiplayerController":6}],4:[function(require,module,exports){
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

var _HostController = require('./HostController');

var _HostController2 = _interopRequireDefault(_HostController);

var _ClientController = require('./ClientController');

var _ClientController2 = _interopRequireDefault(_ClientController);

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

            var yOffset = 1.60;
            var xOffset = _Config2['default'].TILE_X - 3;

            // Create 4 players
            var job = "";
            if (queryParams.job == "knight") {
                console.log("knight");
                job = _modelsPlayer2['default'].JOB_KNIGHT;
            } else if (queryParams.job == "villain") {
                job = _modelsPlayer2['default'].JOB_VILLAIN;
            } else if (queryParams.job == "herbalist") {
                job = _modelsPlayer2['default'].JOB_HERBALIST;
            } else if (queryParams.job == "clairvoyant") {
                job = _modelsPlayer2['default'].JOB_CLAIRVOYANT;
            }

            var p1 = new _modelsPlayer2['default'](xOffset, yOffset, queryParams.name, job);
            this.players.set(p1.name, p1);
            promises.push(p1.init());

            //let p2 = new Player(++xOffset, ++yOffset, "Stooks", Player.JOB_CLAIRVOYANT);
            //players.push(p2);
            //let p3 = new Player(--xOffset, ++yOffset, "Mecha", Player.JOB_VILLAIN);
            //players.push(p3);
            //let p4 = new Player(++xOffset, ++yOffset, "Space Squid", Player.JOB_HERBALIST);
            //players.push(p4);

            // Init all players
            //promises.push(p2.init());
            //promises.push(p3.init());
            //promises.push(p4.init());

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

            // Create all objects
            this.objects = [this.room].concat(_toConsumableArray(this.players.values()), [this.monster, this.ui]);
            //this.objects = [...this.players.values()];
            //this.objects = [this.room, ...this.players, this.necro];

            // Attach input listeners
            // using https://dmauro.github.io/Keypress/
            this.listener = new window.keypress.Listener();
            this.attachInput(this.listener);

            // Initialize Multiplayer Controller
            if (queryParams.host) {
                this.multiplayerController = new _ClientController2['default'](queryParams.host, p1);
                this.multiplayerController.on("host-connect", function (seed) {
                    _this.rng = new _servicesRng2['default'](seed);
                    _this.room.setNextEncounter(_this.rng.next() * 1000);
                });
            } else {
                this.rng = new _servicesRng2['default']("TEST");
                this.room.setNextEncounter(this.rng.next() * 1000);
                this.multiplayerController = new _HostController2['default'](p1, "TEST");
            }

            this.multiplayerController.on("player-connect", function (player) {
                console.log("add player");
                var p = new _modelsPlayer2['default'](xOffset, ++yOffset, player.name, player.job);
                p.init().then(function () {
                    _this.players.set(p.name, p);
                    _this.objects.push(p);
                });
            });

            this.multiplayerController.on("player-state", function (player) {
                _this.players.get(player.name).ready = player.ready;
                console.log(_this.players);
            });

            this.multiplayerController.on("click", function (player) {
                if (!_this.room.isLooking) {
                    _this.room.lookForTrouble();
                } else {
                    //this.room.endBattle();
                    _this.room.stopLooking(); //lookForTrouble();
                }
            });

            promises.push(this.multiplayerController.init());

            return Promise.all(promises);
        }
    }, {
        key: 'attachInput',
        value: function attachInput(listener) {
            var _this2 = this;

            function lookForTrouble() {
                this.multiplayerController.click();
                if (!this.room.isLooking) {
                    this.room.lookForTrouble();
                } else {
                    //this.room.endBattle();
                    this.room.stopLooking(); //lookForTrouble();
                }
            }

            window.onclick = function () {
                _this2.multiplayerController.click();
            };

            //listener.simple_combo("t", ()=>{
            //lookForTrouble();
            //});
        }
    }, {
        key: 'tick',
        value: function tick(frame) {
            var _this3 = this;

            // Calculate if we should be moving based on player state
            // NEEDS TO BE MOVED
            var shouldMove = true;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var player = _step.value;

                    shouldMove = shouldMove && player.ready;
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
                this.room.lookForTrouble();
            } else if (!this.room.isLooking && shouldMove) {
                this.room.startLooking();
            }

            // Render everything
            this.objects.forEach(function (object) {
                _this3._ctx.save();
                object.tick();
                object.render(_this3._ctx, frame);
                _this3._ctx.restore();
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../models/BattleUi":8,"../models/Monster":9,"../models/Player":10,"../models/Room":11,"../models/Ui":12,"../services/Logger":14,"../services/Rng":15,"../services/Utils":16,"./ClientController":3,"./HostController":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _MultiplayerController2 = require('./MultiplayerController');

var _MultiplayerController3 = _interopRequireDefault(_MultiplayerController2);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_MultiplayerController) {
    _inherits(_default, _MultiplayerController);

    function _default(player, seed) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, player, "host");
        this._seed = seed;
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

            return new Promise(function (res, rej) {

                _this._peer.on('open', function (id) {
                    console.log('Host ID is ' + id);
                    //this._id = id;
                });

                _this._peer.on('connection', function (connection) {
                    // This `connection` is a DataConnection object with which we can send
                    // data.
                    // The `open` event firing means that the connection is now ready to
                    // transmit data.

                    if (_this._connections) _this._connections.push(connection);else _this._connections = [connection];

                    connection.on('open', function () {
                        // Send 'Hello' on the connection.
                        //
                        console.log(_this._connections);

                        var ids = [];
                        _this._connections.forEach(function (connection) {
                            ids.push(connection.id);
                        });

                        connection.send({
                            "event": "host-connect",
                            "connections": ids,
                            "seed": _this._seed
                        });

                        connection.send({
                            "event": "player-connect",
                            "player": {
                                "name": _this._player.name,
                                "job": _this._player.job
                            }
                        });
                    });

                    connection.on('data', _this.handleData.bind(_this));
                });

                res();
            });
        }
    }]);

    return _default;
})(_MultiplayerController3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"./MultiplayerController":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var DEFAULT_MAX_LISTENERS = 12;

function error(message) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
    }

    console.error.apply(console, [message].concat(args));
    console.trace();
}

var _default = (function () {
    function _default(player, id) {
        _classCallCheck(this, _default);

        this._player = player;
        this._peer = new Peer(id || null, {
            key: _Config2["default"].API_KEY,
            debug: 3
        });
        console.log(this._peer);
        this._id = this._peer.id;
        this._maxListeners = DEFAULT_MAX_LISTENERS;
        this._events = {};
    }

    /**
     * Initialize this Controller
     *
     * @return Promise
     *
     */

    _createClass(_default, [{
        key: "init",
        value: function init() {}
    }, {
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
    }, {
        key: "handleData",
        value: function handleData(data) {
            var _this = this;

            console.log(data);
            if (data.event == "host-connect") {
                this.emit("host-connect", data.seed);
                this._connections.forEach(function (connection) {
                    connection.send({
                        "event": "player-connect",
                        "player": {
                            "name": _this._player.name,
                            "job": _this._player.job
                        }
                    });
                });
            }

            if (data.event == "player-connect") {
                this.emit("player-connect", data.player);
            }

            if (data.event == "player-state") {
                this.emit("player-state", data.player);
            }
        }
    }, {
        key: "click",
        value: function click() {
            var _this2 = this;

            this._player.ready = !this._player.ready;
            if (this._connections) {
                this._connections.forEach(function (connection) {
                    connection.send({
                        "event": "player-state",
                        "player": {
                            "name": _this2._player.name,
                            "ready": _this2._player.ready
                        }
                    });
                });
            }
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{"../../Config":2}],7:[function(require,module,exports){
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

},{"../views/BattleUiRenderer":17,"./Ui":12}],9:[function(require,module,exports){
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

},{"../views/MonsterRenderer":18,"./BaseObject":7}],10:[function(require,module,exports){
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
                'name': 'clairvoyant'
            };
        }
    }, {
        key: 'JOB_HERBALIST',
        get: function get() {
            return {
                'sprite': 'herbalist-sheet.png',
                'name': 'herbalist'
            };
        }
    }, {
        key: 'JOB_VILLAIN',
        get: function get() {
            return {
                'sprite': 'villain2-sheet.png',
                'name': 'villain'
            };
        }
    }, {
        key: 'JOB_KNIGHT',
        get: function get() {
            return {
                'sprite': 'knight-sheet.png',
                'name': 'knight'
            };
        }
    }]);

    function _default(xPos, yPos, name, job) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, xPos, yPos);

        this.name = name;

        this.ready = false;

        this.job = job;
        // Define the Spirte Associated with the Player
        this.spriteResource = job.sprite;

        this.isWalking = false;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            this.renderer = new _viewsPlayerRenderer2['default'](this);
            return this.renderer.init();
        }
    }]);

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/PlayerRenderer":19,"./BaseObject":7}],11:[function(require,module,exports){
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

var _viewsRoomRenderer = require('../views/RoomRenderer');

var _viewsRoomRenderer2 = _interopRequireDefault(_viewsRoomRenderer);

var _default = (function (_BaseObject) {
    _inherits(_default, _BaseObject);

    _createClass(_default, null, [{
        key: 'TYPE_CAVE',

        // Static Room Types
        get: function get() {
            return {
                floor: 'goodtile.png',
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
            });
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
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/RoomRenderer":21,"./BaseObject":7}],12:[function(require,module,exports){
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
    }]);

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/UiRenderer":22,"./BaseObject":7}],13:[function(require,module,exports){
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

},{"../../Config":2,"../controllers/GameController":4,"./Logger":14,"./Rng":15,"./Utils":16}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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
            ctx.fillStyle = "#ffffff";

            var ypos = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * (_Config2['default'].TILE_Y - this._tileHeight);
            var xpos = _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE * (_Config2['default'].TILE_X - 4);
            this.ui.playerCharacters.forEach(function (player) {
                ypos += fontSize * 2;
                ctx.fillText.apply(ctx, [player.name, xpos, ypos]);
            });
        }
    }]);

    return _default;
})(_UiRenderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"./UiRenderer":22}],18:[function(require,module,exports){
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
            ctx.drawImage.apply(ctx, [this._resources.get('sprite'), 0, this._resources.get('sprite').height / 2 * this.frame, // DX
            this._resources.get('sprite').width / 2, // dWidth
            this._resources.get('sprite').height / 2, // dHeight
            20, 10, // Ypos
            this._resources.get('sprite').width / 2 * _Config2['default'].SPRITE_SCALE, // sWidth
            this._resources.get('sprite').height / 2 * _Config2['default'].SPRITE_SCALE // sHeight
            ]);
        }
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":16,"./Renderer":20}],19:[function(require,module,exports){
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

            ctx.drawImage.apply(ctx, [this._resources.get('shadow'), 0, 0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            this.player.xPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sx ~ Replace with player X Pos
            this.player.yPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE) + _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE - _Config2['default'].SPRITE_SCALE * this._resources.get('shadow') / 1.75, // sy ~ Replace with player Y Pos
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE, // sWidth
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE // sHeight
            ]);

            // DRAW PLAYE SPRIET
            ctx.drawImage.apply(ctx, [this._resources.get('sprite'), this.player.isWalking ? _Config2['default'].SPRITE_SIZE * this.frame : 0, // DX
            0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            this.player.xPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sx ~ Replace with object X Pos
            this.player.yPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sy ~ Replace with object Y Pos
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE, // sWidth
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE // sHeight
            ]);

            if (!this.player.ready) {
                ctx.drawImage.apply(ctx, [this._resources.get('bubble'), 0, 0, // DY
                this._resources.get('bubble').width, // dWidth
                this._resources.get('bubble').height, // dHeight
                this.player.xPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE) - this._resources.get('bubble').width * _Config2['default'].SPRITE_SCALE / 1.5, // sx ~ Replace with object X Pos
                this.player.yPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE) - this._resources.get('bubble').height * _Config2['default'].SPRITE_SCALE / 1.5, // sy ~ Replace with object Y Pos
                this._resources.get('bubble').width * _Config2['default'].SPRITE_SCALE, // sWidth
                this._resources.get('bubble').height * _Config2['default'].SPRITE_SCALE // sHeight
                ]);
            }
        }
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":16,"./Renderer":20}],20:[function(require,module,exports){
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

},{}],21:[function(require,module,exports){
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

            var floor = this._resources.get('floor');
            var floorWidth = floor.width * _Config2['default'].SPRITE_SCALE;
            for (var x = 0; x < _Config2['default'].TILE_X + 1; x++) {
                for (var y = 0; y < _Config2['default'].TILE_Y - 2; y++) {
                    ctx.drawImage.apply(ctx, [this._resources.get('floor'), this._floorOffset + floorWidth * x - floorWidth, // DX
                    (y + 2) * floorWidth, // DX
                    floorWidth, floorWidth]);
                }
            }

            var wall = this._resources.get('wall');
            var wallWidth = wall.width * _Config2['default'].SPRITE_SCALE;
            for (var x = 0; x < _Config2['default'].CANVAS_WIDTH / wallWidth + 1; x++) {
                ctx.drawImage.apply(ctx, [wall, this._wallOffset + wallWidth * x - wallWidth, 0, this._resources.get('wall').width * _Config2['default'].SPRITE_SCALE, // sWidth
                this._resources.get('wall').height * _Config2['default'].SPRITE_SCALE // sWidth
                ]);
            }

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

},{"../../Config":2,"../services/Utils":16,"./Renderer":20}],22:[function(require,module,exports){
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

},{"../../Config":2,"./Renderer":20}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvY29udHJvbGxlcnMvR2FtZUNvbnRyb2xsZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9Ib3N0Q29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL2NvbnRyb2xsZXJzL011bHRpcGxheWVyQ29udHJvbGxlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlT2JqZWN0LmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL0JhdHRsZVVpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL01vbnN0ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvUGxheWVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1Jvb20uanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvVWkuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9SbmcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9VdGlscy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL0JhdHRsZVVpUmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9Nb25zdGVyUmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9QbGF5ZXJSZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1JlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUm9vbVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7aUNDQW1CLHVCQUF1Qjs7Ozs7QUFHMUMsSUFBSSxNQUFNLEdBQUcsbUNBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHdkMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDOzs7QUFHZCxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7QUNUdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7OztBQUtoQixNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDOztBQUVwQyxNQUFNLENBQUMsU0FBUyxHQUFHLFlBQVc7QUFD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OztBQUVYLGVBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL3NlcnZpY2VzL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGVuZ2luZSA9IG5ldyBFbmdpbmUoZG9jdW1lbnQuYm9keSk7XG5cbi8vIEluaXRpYWxpemUgaXRcbmVuZ2luZS5pbml0KCk7XG5cbi8vIERFQlVHXG53aW5kb3cuZW5naW5lID0gZW5naW5lO1xuXG4iLCJsZXQgY29uZmlnID0ge307XG4vKipcbiAqIFNob3VsZCBiZSBzZXQgdXAgdG8gcmVjYWxjdWxhdGUgb24gdGhlIGZseSB3aGVuIHRoaW5ncyBjaGFnbmUuXG4gKiBOb3Qgd29ya2luZyByaWdodCBhdCBhbGwgZm9yIHdpbmRvdyBzaXplIGNoYWduZXMuXG4gKi9cbmNvbmZpZy5BUElfS0VZID0gXCJ4YWh4eDB5dXk1bGU0czRpXCI7XG5cbmNvbmZpZy5jYWxjdWxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBjb25maWcuUEVSQ0VOVEFHRSA9IDE7XG5cbiAgICAvLyAxNng5IEFzcGVjdCBSYXRpb1xuICAgIGNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbiAgICBjb25maWcuQVNQRUNUX0hFSUdIVCA9IDEwODA7XG5cbiAgICBjb25maWcuQ0FOVkFTX1dJRFRIICA9IHdpbmRvdy5vdXRlcldpZHRoKmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgaWYoY29uZmlnLkNBTlZBU19IRUlHSFQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICBjb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIH1cblxuICAgIGNvbmZpZy5USUxFX1ggPSAxNDsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuICAgIGNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG5cbiAgICBjb25maWcuRlBTID0gMzA7XG59XG5cbmNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IE11bHRpcGxheWVyQ29udHJvbGxlciBmcm9tICcuL011bHRpcGxheWVyQ29udHJvbGxlcic7XG5pbXBvcnQgQ29uZmlnICAgICAgICAgICAgICAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgTXVsdGlwbGF5ZXJDb250cm9sbGVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGhvc3RJZCwgcGxheWVyKSB7XG4gICAgICAgIHN1cGVyKHBsYXllcik7XG4gICAgICAgIHRoaXMuX2hvc3RJZCA9IGhvc3RJZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgbGV0IGNvbm5lY3Rpb24gPSB0aGlzLl9wZWVyLmNvbm5lY3QodGhpcy5faG9zdElkKTtcblxuICAgICAgICAgICAgaWYodGhpcy5fY29ubmVjdGlvbnMpXG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9ucyA9IFtjb25uZWN0aW9uXTtcblxuICAgICAgICAgICAgY29ubmVjdGlvbi5vbignZGF0YScsIHRoaXMuaGFuZGxlRGF0YS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsIi8vIEltcG9ydCBVdGlsc1xuaW1wb3J0IFV0aWxzICAgIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuaW1wb3J0IENvbmZpZyAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5pbXBvcnQgUm5nICAgICAgZnJvbSAnLi4vc2VydmljZXMvUm5nJztcblxuLy8gSW1wb3J0IENvbnRyb2xsZXJzXG5pbXBvcnQgSG9zdENvbnRyb2xsZXIgICAgIGZyb20gJy4vSG9zdENvbnRyb2xsZXInO1xuaW1wb3J0IENsaWVudENvbnRyb2xsZXIgICBmcm9tICcuL0NsaWVudENvbnRyb2xsZXInO1xuXG4vLyBJbXBvcnQgTW9kZWxzXG5pbXBvcnQgUGxheWVyICAgZnJvbSAnLi4vbW9kZWxzL1BsYXllcic7XG5pbXBvcnQgTW9uc3RlciAgZnJvbSAnLi4vbW9kZWxzL01vbnN0ZXInO1xuaW1wb3J0IFJvb20gICAgIGZyb20gJy4uL21vZGVscy9Sb29tJztcbmltcG9ydCBVaSAgICAgICBmcm9tICcuLi9tb2RlbHMvVWknO1xuaW1wb3J0IEJhdHRsZVVpIGZyb20gJy4uL21vZGVscy9CYXR0bGVVaSc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcblxuICAgIC8vIFBhc3MgY3R4XG4gICAgY29uc3RydWN0b3IoY3R4KSB7XG4gICAgICAgIHRoaXMuX2N0eCA9IGN0eDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBVdGlscy5wYXJzZVF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICAgIHRoaXMucGxheWVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgbGV0IHlPZmZzZXQgPSAxLjYwO1xuICAgICAgICBsZXQgeE9mZnNldCA9IENvbmZpZy5USUxFX1ggLSAzO1xuXG4gICAgICAgIC8vIENyZWF0ZSA0IHBsYXllcnNcbiAgICAgICAgbGV0IGpvYiA9IFwiXCI7XG4gICAgICAgIGlmKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcImtuaWdodFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImtuaWdodFwiKTtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfS05JR0hUO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcInZpbGxhaW5cIikge1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9WSUxMQUlOO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcImhlcmJhbGlzdFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0hFUkJBTElTVDtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeVBhcmFtcy5qb2IgPT0gXCJjbGFpcnZveWFudFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0NMQUlSVk9ZQU5UO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHAxID0gbmV3IFBsYXllcih4T2Zmc2V0LCB5T2Zmc2V0LCBxdWVyeVBhcmFtcy5uYW1lLCBqb2IpO1xuICAgICAgICB0aGlzLnBsYXllcnMuc2V0KHAxLm5hbWUsIHAxKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaChwMS5pbml0KCkpO1xuXG4gICAgICAgIC8vbGV0IHAyID0gbmV3IFBsYXllcigrK3hPZmZzZXQsICsreU9mZnNldCwgXCJTdG9va3NcIiwgUGxheWVyLkpPQl9DTEFJUlZPWUFOVCk7XG4gICAgICAgIC8vcGxheWVycy5wdXNoKHAyKTtcbiAgICAgICAgLy9sZXQgcDMgPSBuZXcgUGxheWVyKC0teE9mZnNldCwgKyt5T2Zmc2V0LCBcIk1lY2hhXCIsIFBsYXllci5KT0JfVklMTEFJTik7XG4gICAgICAgIC8vcGxheWVycy5wdXNoKHAzKTtcbiAgICAgICAgLy9sZXQgcDQgPSBuZXcgUGxheWVyKCsreE9mZnNldCwgKyt5T2Zmc2V0LCBcIlNwYWNlIFNxdWlkXCIsIFBsYXllci5KT0JfSEVSQkFMSVNUKTtcbiAgICAgICAgLy9wbGF5ZXJzLnB1c2gocDQpO1xuXG4gICAgICAgIC8vIEluaXQgYWxsIHBsYXllcnNcbiAgICAgICAgLy9wcm9taXNlcy5wdXNoKHAyLmluaXQoKSk7XG4gICAgICAgIC8vcHJvbWlzZXMucHVzaChwMy5pbml0KCkpO1xuICAgICAgICAvL3Byb21pc2VzLnB1c2gocDQuaW5pdCgpKTtcblxuICAgICAgICAvLy8vIEFkZCBhIGJhZGRpZVxuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBuZXcgTW9uc3RlcigxLCAxLCBNb25zdGVyLlRZUEVfV1VSTSk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5tb25zdGVyLmluaXQoKSk7XG4gICAgICAgIHRoaXMubW9uc3Rlci5oaWRlKCk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBVSVxuICAgICAgICB0aGlzLnVpID0gbmV3IEJhdHRsZVVpKDAsIDAsIDAsIDAsIHRoaXMucGxheWVycywgdGhpcy5wbGF5ZXJzKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnVpLmluaXQoKSk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBSb29tXG4gICAgICAgIHRoaXMucm9vbSA9IG5ldyBSb29tKFJvb20uVFlQRV9DQVZFLCBbdGhpcy5tb25zdGVyXSwgdGhpcy5wbGF5ZXJzKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnJvb20uaW5pdCgpKTtcblxuICAgICAgICAvLyBDcmVhdGUgYWxsIG9iamVjdHNcbiAgICAgICAgdGhpcy5vYmplY3RzID0gW3RoaXMucm9vbSwgLi4udGhpcy5wbGF5ZXJzLnZhbHVlcygpLCB0aGlzLm1vbnN0ZXIsIHRoaXMudWldO1xuICAgICAgICAvL3RoaXMub2JqZWN0cyA9IFsuLi50aGlzLnBsYXllcnMudmFsdWVzKCldO1xuICAgICAgICAvL3RoaXMub2JqZWN0cyA9IFt0aGlzLnJvb20sIC4uLnRoaXMucGxheWVycywgdGhpcy5uZWNyb107XG5cbiAgICAgICAgLy8gQXR0YWNoIGlucHV0IGxpc3RlbmVyc1xuICAgICAgICAvLyB1c2luZyBodHRwczovL2RtYXVyby5naXRodWIuaW8vS2V5cHJlc3MvXG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgd2luZG93LmtleXByZXNzLkxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoSW5wdXQodGhpcy5saXN0ZW5lcik7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBNdWx0aXBsYXllciBDb250cm9sbGVyXG4gICAgICAgIGlmKHF1ZXJ5UGFyYW1zLmhvc3QpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyID0gbmV3IENsaWVudENvbnRyb2xsZXIocXVlcnlQYXJhbXMuaG9zdCwgcDEpO1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJob3N0LWNvbm5lY3RcIiwgKHNlZWQpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5ybmcgPSBuZXcgUm5nKHNlZWQpO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5zZXROZXh0RW5jb3VudGVyKHRoaXMucm5nLm5leHQoKSAqIDEwMDApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJuZyA9IG5ldyBSbmcoXCJURVNUXCIpO1xuICAgICAgICAgICAgdGhpcy5yb29tLnNldE5leHRFbmNvdW50ZXIodGhpcy5ybmcubmV4dCgpICogMTAwMCk7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlciA9IG5ldyBIb3N0Q29udHJvbGxlcihwMSwgXCJURVNUXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJwbGF5ZXItY29ubmVjdFwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGQgcGxheWVyXCIpO1xuICAgICAgICAgICAgbGV0IHAgPSBuZXcgUGxheWVyKHhPZmZzZXQsICsreU9mZnNldCwgcGxheWVyLm5hbWUsIHBsYXllci5qb2IpO1xuICAgICAgICAgICAgcC5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycy5zZXQocC5uYW1lLCBwKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdHMucHVzaChwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5vbihcInBsYXllci1zdGF0ZVwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXJzLmdldChwbGF5ZXIubmFtZSkucmVhZHkgPSBwbGF5ZXIucmVhZHk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBsYXllcnMpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5vbihcImNsaWNrXCIsIChwbGF5ZXIpPT57XG4gICAgICAgICAgICBpZighdGhpcy5yb29tLmlzTG9va2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucm9vbS5lbmRCYXR0bGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20uc3RvcExvb2tpbmcoKTsvL2xvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIuaW5pdCgpKTtcblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9va0ZvclRyb3VibGUoKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5jbGljaygpO1xuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20ubG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnJvb20uZW5kQmF0dGxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLnN0b3BMb29raW5nKCk7Ly9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5jbGljaygpO1xuXG4gICAgICAgIH07XG5cbiAgICAgICAgLy9saXN0ZW5lci5zaW1wbGVfY29tYm8oXCJ0XCIsICgpPT57XG4gICAgICAgICAgICAvL2xvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgIC8vfSk7XG4gICAgfVxuXG4gICAgdGljayhmcmFtZSkge1xuICAgICAgICAvLyBDYWxjdWxhdGUgaWYgd2Ugc2hvdWxkIGJlIG1vdmluZyBiYXNlZCBvbiBwbGF5ZXIgc3RhdGVcbiAgICAgICAgLy8gTkVFRFMgVE8gQkUgTU9WRURcbiAgICAgICAgbGV0IHNob3VsZE1vdmUgPSB0cnVlO1xuICAgICAgICBmb3IgKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICBzaG91bGRNb3ZlID0gc2hvdWxkTW92ZSAmJiBwbGF5ZXIucmVhZHk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEZWNpZGUgaWYgd2UgbmVlZCB0byBzdGFydCBvciBlbmQgY29tYmF0XG4gICAgICAgIGlmKHNob3VsZE1vdmUgJiYgIXRoaXMucm9vbS5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgIHRoaXMucm9vbS5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICB9IGVsc2UgaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcgJiYgc2hvdWxkTW92ZSkge1xuICAgICAgICAgICAgdGhpcy5yb29tLnN0YXJ0TG9va2luZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUmVuZGVyIGV2ZXJ5dGhpbmdcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCk9PntcbiAgICAgICAgICAgIHRoaXMuX2N0eC5zYXZlKCk7XG4gICAgICAgICAgICBvYmplY3QudGljaygpO1xuICAgICAgICAgICAgb2JqZWN0LnJlbmRlcih0aGlzLl9jdHgsIGZyYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5yZXN0b3JlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBNdWx0aXBsYXllckNvbnRyb2xsZXIgZnJvbSAnLi9NdWx0aXBsYXllckNvbnRyb2xsZXInO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE11bHRpcGxheWVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIHNlZWQpIHtcbiAgICAgICAgc3VwZXIocGxheWVyLCBcImhvc3RcIik7XG4gICAgICAgIHRoaXMuX3NlZWQgPSBzZWVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG5cbiAgICAgICAgICAgIHRoaXMuX3BlZXIub24oJ29wZW4nLCBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBIb3N0IElEIGlzICR7aWR9YCk7XG4gICAgICAgICAgICAgICAgLy90aGlzLl9pZCA9IGlkO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuX3BlZXIub24oJ2Nvbm5lY3Rpb24nLCAoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGBjb25uZWN0aW9uYCBpcyBhIERhdGFDb25uZWN0aW9uIG9iamVjdCB3aXRoIHdoaWNoIHdlIGNhbiBzZW5kXG4gICAgICAgICAgICAgICAgLy8gZGF0YS5cbiAgICAgICAgICAgICAgICAvLyBUaGUgYG9wZW5gIGV2ZW50IGZpcmluZyBtZWFucyB0aGF0IHRoZSBjb25uZWN0aW9uIGlzIG5vdyByZWFkeSB0b1xuICAgICAgICAgICAgICAgIC8vIHRyYW5zbWl0IGRhdGEuXG5cbiAgICAgICAgICAgICAgICBpZih0aGlzLl9jb25uZWN0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMucHVzaChjb25uZWN0aW9uKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zID0gW2Nvbm5lY3Rpb25dO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdGlvbi5vbignb3BlbicsICgpPT57XG4gICAgICAgICAgICAgICAgICAgIC8vIFNlbmQgJ0hlbGxvJyBvbiB0aGUgY29ubmVjdGlvbi5cbiAgICAgICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fY29ubmVjdGlvbnMpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBpZHMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkcy5wdXNoKGNvbm5lY3Rpb24uaWQpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudFwiOiBcImhvc3QtY29ubmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uc1wiOiBpZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNlZWRcIjogdGhpcy5fc2VlZFxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudFwiOiBcInBsYXllci1jb25uZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYXllclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuX3BsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiam9iXCI6IHRoaXMuX3BsYXllci5qb2JcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdkYXRhJywgdGhpcy5oYW5kbGVEYXRhLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG52YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIsIGlkKSB7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5fcGVlciA9IG5ldyBQZWVyKGlkIHx8IG51bGwsIHtcbiAgICAgICAgICAgIGtleTogQ29uZmlnLkFQSV9LRVksXG4gICAgICAgICAgICBkZWJ1ZzogM1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fcGVlcik7XG4gICAgICAgIHRoaXMuX2lkID0gdGhpcy5fcGVlci5pZDtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXSB8fCh0aGlzLl9ldmVudHNbdHlwZV0gPSBbXSlcbiAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgIGVycm9yKFxuICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgXCJ3YW50IHRvIGluY3JlYXNlIHRoZSBsaW1pdCAoJWkgbm93KVwiLFxuICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnNcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxuICAgICBoYW5kbGVEYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGlmKGRhdGEuZXZlbnQgPT0gXCJob3N0LWNvbm5lY3RcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiaG9zdC1jb25uZWN0XCIsIGRhdGEuc2VlZCk7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInBsYXllclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5fcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpvYlwiOiB0aGlzLl9wbGF5ZXIuam9iXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZGF0YS5ldmVudCA9PSBcInBsYXllci1jb25uZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1jb25uZWN0XCIsIGRhdGEucGxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRhdGEuZXZlbnQgPT0gXCJwbGF5ZXItc3RhdGVcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIGRhdGEucGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLl9wbGF5ZXIucmVhZHkgPSAhdGhpcy5fcGxheWVyLnJlYWR5O1xuICAgICAgICBpZih0aGlzLl9jb25uZWN0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6ICAgICBcInBsYXllci1zdGF0ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInBsYXllclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogIHRoaXMuX3BsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWFkeVwiOiB0aGlzLl9wbGF5ZXIucmVhZHlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih4UG9zLCB5UG9zKSB7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3MgfHwgMDtcbiAgICAgICAgdGhpcy55UG9zID0geVBvcyB8fCAwO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgaWYodGhpcy5pc1Zpc2libGUpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgsIGZyYW1lKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWkgZnJvbSAnLi9VaSc7XG5pbXBvcnQgQmF0dGxlVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9CYXR0bGVVaVJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBVaSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgICAgICAgICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgICAgICAgICAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYICAgICAgICAgIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZICAgICAgICAgIC0gJSBZIG9mZnNldFxuICAgICAqIEBwYXJhbSBwbGF5ZXJDaGFyYWN0ZXJzIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqIEBwYXJhbSBlbmVtaWVzICAgICAgICAgIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFksIHBsYXllckNoYXJhY3RlcnMsIGVuZW1pZXMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDaGFyYWN0ZXJzID0gcGxheWVyQ2hhcmFjdGVycztcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICAgID0gZW5lbWllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXphdGlvbiBQcm9taXNlXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBCYXR0bGVVaVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IE1vbnN0ZXJSZW5kZXJlciBmcm9tICcuLi92aWV3cy9Nb25zdGVyUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfV1VSTSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnd3VybS1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAgICd3dXJtJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgdHlwZSkge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IE1vbnN0ZXJSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaW5pdCgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlT2JqZWN0ICAgICBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IFBsYXllclJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1BsYXllclJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBKT0JfQ0xBSVJWT1lBTlQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2NsYWlydm95YW50LXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfSEVSQkFMSVNUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdoZXJiYWxpc3Qtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2hlcmJhbGlzdCdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX1ZJTExBSU4oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ3ZpbGxhaW4yLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICd2aWxsYWluJ1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfS05JR0hUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdrbmlnaHQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2tuaWdodCdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIG5hbWUsIGpvYikge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBTcGlydGUgQXNzb2NpYXRlZCB3aXRoIHRoZSBQbGF5ZXJcbiAgICAgICAgdGhpcy5zcHJpdGVSZXNvdXJjZSA9IGpvYi5zcHJpdGU7XG5cbiAgICAgICAgdGhpcy5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFBsYXllclJlbmRlcmVyKHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCAgIGZyb20gJy4vQmFzZU9iamVjdCc7XG5pbXBvcnQgUm9vbVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1Jvb21SZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU9iamVjdCB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9DQVZFKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmxvb3I6ICdnb29kdGlsZS5wbmcnLFxuICAgICAgICAgICAgd2FsbDogJ3BpbGxhcnMucG5nJ1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGVuZW1pZXMsIHBsYXllcnMsIGVuY291bnRlclJhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLmlzTW92aW5nICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNCYXR0bGUgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICA9IGVuZW1pZXM7XG4gICAgICAgIHRoaXMucGxheWVycyAgICAgICAgPSBwbGF5ZXJzO1xuICAgICAgICB0aGlzLmlzTG9va2luZyAgICAgID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5lbmNvdW50ZXJSYXRlID0gZW5jb3VudGVyUmF0ZSB8fCA1MDtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJvb21SZW5kZXJlcih0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIGxvb2tGb3JUcm91YmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0xvb2tpbmcpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuaXNCYXR0bGUpIHRoaXMuZW5kQmF0dGxlKCk7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgcGxheWVyLmlzV2Fsa2luZyA9ICFwbGF5ZXIuaXNXYWxraW5nO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocGxheWVyLmlzV2Fsa2luZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BMb29raW5nKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNMb29raW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICBwbGF5ZXIuaXNXYWxraW5nID0gIXBsYXllci5pc1dhbGtpbmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuZEJhdHRsZSgpIHtcbiAgICAgICAgaWYodGhpcy5pc0JhdHRsZSkge1xuICAgICAgICAgICAgdGhpcy5pc0JhdHRsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLmZvckVhY2goKGVuZW15KT0+e1xuICAgICAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEJhdHRsZSgpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbmVteSk9PntcbiAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHBsYXllci5yZWFkeSAgICAgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0TmV4dEVuY291bnRlcih0aWNrcykge1xuICAgICAgICB0aGlzLm5leHRFbmNvdW50ZXIgPSB0aWNrcztcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICB0aGlzLnRpY2tDb3VudCA9IHRoaXMudGlja0NvdW50IHx8IDA7XG4gICAgICAgIGlmKHRoaXMuaXNMb29raW5nKSB7XG4gICAgICAgICAgICB0aGlzLnRpY2tDb3VudCsrO1xuICAgICAgICAgICAgaWYodGhpcy50aWNrQ291bnQgPiB0aGlzLm5leHRFbmNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QmF0dGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgsIGZyYW1lKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9VaVJlbmRlcmVyJztcbmltcG9ydCBCYXNlT2JqZWN0IGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5iZyAgICAgID0gJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy91aS1iZy5wbmcnO1xuICAgICAgICB0aGlzLndpZHRoICAgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLm9mZnNldFggPSBvZmZzZXRYO1xuICAgICAgICB0aGlzLm9mZnNldFkgPSBvZmZzZXRZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemF0aW9uIFByb21pc2VcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFVpUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4KTtcbiAgICB9XG59XG4iLCIvLyBJbXBvcnQgVXRpbHNcbmltcG9ydCBVdGlscyAgICBmcm9tICcuL1V0aWxzJztcbmltcG9ydCBMb2dnZXIgICBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcbmltcG9ydCBSbmcgICAgICBmcm9tICcuL1JuZyc7XG5cbi8vIEltcG9ydCBDb250cm9sbGVyc1xuaW1wb3J0IEdhbWVDb250cm9sbGVyICAgICBmcm9tICcuLi9jb250cm9sbGVycy9HYW1lQ29udHJvbGxlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2NvZGV0aGVvcnkuaW4vY29udHJvbGxpbmctdGhlLWZyYW1lLXJhdGUtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGRlbHRhID0gbm93IC0gdGhpcy50aGVuO1xuXG4gICAgICAgIC8vIElmIHRoZSBmcHMgaW50ZXJ2YWwgaXMgY29ycmVjdFxuICAgICAgICBpZiAoZGVsdGEgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgdGltZSBzaW5jZSBsYXN0IGZyYW1lXG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZGVsdGEgJSB0aGlzLmludGVydmFsKTtcblxuICAgICAgICAgICAgLy8gU2V0IHVwIFJlbmRlcmluZ1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSB0aGlzLl9mcmFtZSB8fCAxO1xuICAgICAgICAgICAgdGhpcy5fZnJhbWUgPSAodGhpcy5fZnJhbWUlQ29uZmlnLkZQUykgPyB0aGlzLl9mcmFtZSA6IDE7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCgwLCAwLCBDb25maWcuQ0FOVkFTX1dJRFRILCBDb25maWcuQ0FOVkFTX0hFSUdIVCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIFByb2dyZXNzIGdhbWVcbiAgICAgICAgICAgIHRoaXMuZ2FtZS50aWNrKHRoaXMuX2ZyYW1lKTtcblxuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIG5leHQgcmVuZGVyIGN5Y2xlXG4gICAgICAgICAgICBsZXQgdGltZV9lbCA9ICh0aGlzLnRoZW4gLSB0aGlzLmZpcnN0KS8xMDAwO1xuICAgICAgICAgICAgKyt0aGlzLmNvdW50ZXI7XG4gICAgICAgICAgICBsZXQgZnBzID0gcGFyc2VJbnQodGhpcy5jb3VudGVyL3RpbWVfZWwpO1xuXG4gICAgICAgICAgICAvLyBTaG93IEZQU1xuICAgICAgICAgICAgbGV0IGZvbnRTaXplICAgICAgICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KHRoaXMuX2ZyYW1lICsgXCIvXCIgKyBDb25maWcuRlBTICsgXCIgXCIgKyBmcHMgKyBcImZwc1wiLCAyMCwgMjApO1xuXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgRnJhbWVcbiAgICAgICAgICAgIHRoaXMuX2ZyYW1lKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgSGFuZGxlclxuICAgICAqIEB0b2RvOiBkb2VzIHRoaXMgYmVsb25nIGhlcmU/XG4gICAgICovXG4gICAgcmVzaXplKCkge1xuICAgICAgICBDb25maWcuY2FsY3VsYXRlKCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgdGhlIGdhbWUgZ29lcyBmdWxsIHNjcmVlbiwgd2lsbCBmdWxsc2NyZWVuIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqIEZvdW5kOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRnVsbHNjcmVlbl9BUElcbiAgICAgKi9cbiAgICByZXF1ZXN0RnVsbHNjcmVlbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZW5naW5lXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gVXRpbHMucGFyc2VRdWVyeSh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcblxuICAgICAgICB0aGlzLl9lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX2N0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgLy9pbml0aWFsaXplIHRoZSBnYW1lIGNvbnRyb2xsZXJcbiAgICAgICAgLy9AdG9kbyBuZWVkIHRvIHBhc3MgcGFyYW1zIHRvIHRoaXNcbiAgICAgICAgdGhpcy5nYW1lID0gbmV3IEdhbWVDb250cm9sbGVyKHRoaXMuX2N0eCk7XG4gICAgICAgIHRoaXMuZ2FtZS5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJHYW1lIENvbnRyb2xsZXIgSW5pdGlhbGl6ZWRcIik7XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAvQ29uZmlnLkZQUztcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSB0aGlzLnRoZW47XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEF0dGFjaCByZXNpemUgZXZlbnRcbiAgICAgICAgLy93aW5kb3cucmVzaXplID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gQXR0YWNoIEZ1bGxzY3JlZW4gZXZlbnRcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVxdWVzdEZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgTG9nZ2VyLmJhbm5lcignR2FtZSBTdGFydGVkJyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBiYW5uZXIobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnLnRvVXBwZXJDYXNlKCl9YCwgJ2ZvbnQtc2l6ZTogMzBweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc2VlZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlJORyBDUkVBVEVcIik7XG4gICAgICAgIHRoaXMuX3JuZyA9IG5ldyBSTkcoc2VlZCk7XG4gICAgICAgIHdpbmRvdy5ybmcgPSB0aGlzLl9ybmc7XG4gICAgfVxuXG4gICAgbmV4dCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JuZy5yYW5kb20oKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGxpbWl0bG9vcChmbiwgZnBzKSB7XG4gICAgICAgIC8vIFVzZSB2YXIgdGhlbiA9IERhdGUubm93KCk7IGlmIHlvdVxuICAgICAgICAvLyBkb24ndCBjYXJlIGFib3V0IHRhcmdldHRpbmcgPCBJRTlcbiAgICAgICAgdmFyIHRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBjdXN0b20gZnBzLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gNjBcbiAgICAgICAgZnBzID0gZnBzIHx8IDYwO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgICAgICAgICAgLy8gYWdhaW4sIERhdGUubm93KCkgaWYgaXQncyBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAvLyBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCkgaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBqdXN0IFxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZW4gPSBub3csIHdoaWNoIGNhbiBlbmQgdXAgbG93ZXJpbmcgb3ZlcmFsbCBmcHNcbiAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZm5cbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KDApKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzcGVjdEhlaWdodENhbGModzIpIHtcbiAgICAgICAgbGV0IHcxID0gMTkyMDtcbiAgICAgICAgbGV0IGgxID0gMTA4MDtcbiAgICAgICAgcmV0dXJuIGgxKncyL3cxO1xuICAgIH1cblxuICAgIHN0YXRpYyBwYXJzZVF1ZXJ5KHNlYXJjaCkge1xuICAgICAgICB2YXIgYXJncyA9IHNlYXJjaC5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcblxuICAgICAgICB2YXIgYXJnc1BhcnNlZCA9IHt9O1xuXG4gICAgICAgIHZhciBpLCBhcmcsIGt2cCwga2V5LCB2YWx1ZTtcblxuICAgICAgICBmb3IgKGk9MDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICAgICAgaWYgKC0xID09PSBhcmcuaW5kZXhPZignPScpKSB7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2RlY29kZVVSSUNvbXBvbmVudChhcmcpLnRyaW0oKV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG5cbiAgICAgICAgICAgICAgICBrdnAgPSBhcmcuc3BsaXQoJz0nKTtcblxuICAgICAgICAgICAgICAgIGtleSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMF0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIHZhbHVlID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFsxXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gYXJnc1BhcnNlZDtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWlSZW5kZXJlciBmcm9tICcuL1VpUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFVpUmVuZGVyZXIge1xuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgc3VwZXIucmVuZGVyKGN0eCk7XG5cbiAgICAgICAgbGV0IGZvbnRTaXplICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICBjdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgbGV0IHlwb3MgPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KTtcbiAgICAgICAgbGV0IHhwb3MgPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWCAtIDQpXG4gICAgICAgIHRoaXMudWkucGxheWVyQ2hhcmFjdGVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICB5cG9zICs9IGZvbnRTaXplKjI7XG4gICAgICAgICAgICBjdHguZmlsbFRleHQoLi4uW1xuICAgICAgICAgICAgICAgIHBsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgIHhwb3MsXG4gICAgICAgICAgICAgICAgeXBvc1xuICAgICAgICAgICAgXSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG1vbnN0ZXIpIHtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLm1vbnN0ZXIgPSBtb25zdGVyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZSgnc3ByaXRlJywgdGhpcy5tb25zdGVyLnR5cGUuc3ByaXRlKSxcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS5oZWlnaHQvMioodGhpcy5mcmFtZSksIC8vIERYXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8yLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3Nwcml0ZScpLmhlaWdodC8yLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIDEwLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKS53aWR0aC8yKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnc3ByaXRlJykuaGVpZ2h0LzIqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKCdzcHJpdGUnLCB0aGlzLnBsYXllci5qb2Iuc3ByaXRlKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKCdzaGFkb3cnLCAgJ3NoYWRvdy5wbmcnKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKCdidWJibGUnLCAgJ3dhaXRpbmcucG5nJylcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB0aGlzLnBsYXllci54UG9zKihDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIHBsYXllciBYIFBvc1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIueVBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpICsgKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSAtIChDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3Jlc291cmNlcy5nZXQoJ3NoYWRvdycpLzEuNzUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBwbGF5ZXIgWSBQb3NcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuXG5cbiAgICAgICAgLy8gRFJBVyBQTEFZRSBTUFJJRVRcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdzcHJpdGUnKSxcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmlzV2Fsa2luZyA/IENvbmZpZy5TUFJJVEVfU0laRSoodGhpcy5mcmFtZSkgOiAwLCAvLyBEWFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRIZWlnaHRcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnhQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICB0aGlzLnBsYXllci55UG9zKihDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYoIXRoaXMucGxheWVyLnJlYWR5KSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnYnViYmxlJykud2lkdGgsIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ2J1YmJsZScpLmhlaWdodCwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnhQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSAtICh0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLzEuNSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnlQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSAtICh0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKS5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRS8xLjUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdidWJibGUnKS5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZHMgdGhlIHJlc291cmNlIGJ5IGZpbGVuYW1lXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICovXG4gICAgbG9hZFJlc291cmNlKG5hbWUsIHJlc291cmNlKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYHJlc291cmNlIGxvYWRlZDogJHtyZXNvdXJjZX1gKTtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbWcuc3JjID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzLycgKyByZXNvdXJjZTtcblxuICAgICAgICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcmVzb3VyY2UgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZighdGhpcy5fcmVzb3VyY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnNldChuYW1lLCBpbWcpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvb20gPSBvYmplY3Q7XG4gICAgICAgIHRoaXMuX2Zsb29yT2Zmc2V0ID0gMDtcbiAgICAgICAgdGhpcy5fd2FsbE9mZnNldCAgPSAwO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLmxvYWRSZXNvdXJjZShcImZsb29yXCIsIHRoaXMucm9vbS50eXBlLmZsb29yKSxcbiAgICAgICAgICAgIHRoaXMubG9hZFJlc291cmNlKFwid2FsbFwiLCAgdGhpcy5yb29tLnR5cGUud2FsbClcbiAgICAgICAgXSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcblxuICAgICAgICBsZXQgZmxvb3IgPSB0aGlzLl9yZXNvdXJjZXMuZ2V0KCdmbG9vcicpO1xuICAgICAgICBsZXQgZmxvb3JXaWR0aCA9IGZsb29yLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YKzE7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IENvbmZpZy5USUxFX1kgLSAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnZmxvb3InKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKyBmbG9vcldpZHRoKnggLSBmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICAoeSsyKSpmbG9vcldpZHRoLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoLFxuICAgICAgICAgICAgICAgICAgICBmbG9vcldpZHRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd2FsbCA9IHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKTtcbiAgICAgICAgbGV0IHdhbGxXaWR0aCA9IHdhbGwud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHdhbGxXaWR0aCkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHdhbGwsXG4gICAgICAgICAgICAgICAgdGhpcy5fd2FsbE9mZnNldCArIHdhbGxXaWR0aCp4IC0gd2FsbFdpZHRoLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLmdldCgnd2FsbCcpLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc291cmNlcy5nZXQoJ3dhbGwnKS5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRSAvLyBzV2lkdGhcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHhTdGVwID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgIGlmKHRoaXMucm9vbS5pc01vdmluZykge1xuICAgICAgICAgICAgdGhpcy5fZmxvb3JPZmZzZXQgKz0geFN0ZXA7XG4gICAgICAgICAgICBpZih0aGlzLl9mbG9vck9mZnNldCA+PSBmbG9vcldpZHRoIC0gMSkgdGhpcy5fZmxvb3JPZmZzZXQgPSAwO1xuXG4gICAgICAgICAgICB0aGlzLl93YWxsT2Zmc2V0ICs9IHhTdGVwO1xuICAgICAgICAgICAgaWYodGhpcy5fd2FsbE9mZnNldCA+IHdhbGxXaWR0aCAtIDEpIHRoaXMuX3dhbGxPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1aSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVpID0gdWk7XG4gICAgICAgIHRoaXMuX3VpQmcgPSB1aS5iZztcbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl91aUJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLi4uYmdSZWN0KTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCIjNjRBMzU3XCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCIjMDAzNzAwXCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCguLi51aVJlY3QpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzhEODA0NVwiO1xuXG4gICAgICAgIC8vIFRoZSBzdHJva2UgaXMgbWlkZGxlIGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGJveFxuICAgICAgICBsZXQgbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMzI7XG4gICAgICAgIC8vbGV0IGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIHN0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIFRyeWluZyB0byBnZXQgc2Vjb25kIGJvcmRlclxuICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuXG4gICAgICAgIC8vbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvNDg7XG4gICAgICAgIC8vY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICAvL3N0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgLy9zdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9jdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBsZXQgcGF0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5pbWFnZSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICB9XG59XG4iXX0=
