(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appServicesEngine = require('./app/services/Engine');

var _appServicesEngine2 = _interopRequireDefault(_appServicesEngine);

// Create new instance of game
var game = new _appServicesEngine2['default'](document.body);

// Initialize it
game.init();

},{"./app/services/Engine":12}],2:[function(require,module,exports){
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

},{"../../Config":2,"./MultiplayerController":5}],4:[function(require,module,exports){
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

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).apply(this, arguments);
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
                            "connections": ids
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

},{"../../Config":2,"./MultiplayerController":5}],5:[function(require,module,exports){
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
    function _default(player) {
        _classCallCheck(this, _default);

        this._player = player;
        this._peer = new Peer({
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
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{"../../Config":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _viewsObjectRenderer = require('../views/ObjectRenderer');

var _viewsObjectRenderer2 = _interopRequireDefault(_viewsObjectRenderer);

var _default = (function () {
    function _default(xPos, yPos) {
        _classCallCheck(this, _default);

        this.xPos = xPos || 0;
        this.yPos = yPos || 0;
        this.isVisible = true;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return new Promise(function (res, rej) {
                _this.renderer = new _viewsObjectRenderer2['default'](_this);
                _this.renderer.init().then(res);
            });
        }
    }, {
        key: 'render',
        value: function render(ctx, frame) {
            if (this.isVisible) this.renderer.render(ctx, frame);
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
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/ObjectRenderer":17}],7:[function(require,module,exports){
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

},{"../views/BattleUiRenderer":15,"./Ui":11}],8:[function(require,module,exports){
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

    function _default(xPos, yPos) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, xPos, yPos);
        // Define the Spirte Associated with the Player
        this.spriteResource = 'dist/resources/images/necro-sprite.png';
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return new Promise(function (res, rej) {
                _this.renderer = new _viewsMonsterRenderer2['default'](_this);
                _this.renderer.init().then(res);
            });
        }
    }]);

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/MonsterRenderer":16,"./BaseObject":6}],9:[function(require,module,exports){
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

var _default = (function (_BaseObject) {
    _inherits(_default, _BaseObject);

    _createClass(_default, null, [{
        key: 'JOB_CLAIRVOYANT',

        // Static Room Types
        get: function get() {
            return {
                'sprite': 'dist/resources/images/clairvoyant-sheet.png',
                'name': 'clairvoyant'
            };
        }
    }, {
        key: 'JOB_HERBALIST',
        get: function get() {
            return {
                'sprite': 'dist/resources/images/herbalist-sheet.png',
                'name': 'herbalist'
            };
        }
    }, {
        key: 'JOB_VILLAIN',
        get: function get() {
            return {
                'sprite': 'dist/resources/images/villain2-sheet.png',
                'name': 'villain'
            };
        }
    }, {
        key: 'JOB_KNIGHT',
        get: function get() {
            return {
                'sprite': 'dist/resources/images/knight-sheet.png',
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

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"./BaseObject":6}],10:[function(require,module,exports){
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
                floor: 'dist/resources/images/goodtile.png',
                wall: 'dist/resources/images/pillars.png'
            };
        }
    }, {
        key: 'TYPE_OUTSIDE',
        get: function get() {
            return 'dist/resources/images/grass.png';
        }
    }]);

    function _default(type, enemies, players, encounterRate) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);

        this.floorResource = type.floor;
        this.wallResource = type.wall;

        this.isMoving = false;
        this.isBattle = false;
        this.enemies = enemies;
        this.players = players;
        this.isLooking = false;

        this.encounterRate = encounterRate || 50;
        this.calculateNextEncounter();
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return new Promise(function (res, rej) {
                _this.renderer = new _viewsRoomRenderer2['default'](_this);
                _this.renderer.init().then(res);
            });
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

                this.calculateNextEncounter();
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
            });
        }
    }, {
        key: 'calculateNextEncounter',
        value: function calculateNextEncounter() {
            var myRand = Math.floor(Math.random() * 100 / this.encounterRate);
            this.nextEncounter = myRand * 50 + 25;
        }
    }, {
        key: 'tick',
        value: function tick() {
            this.tickCount = this.tickCount || 0;
            if (this.isLooking) {
                //this.tickCount++;
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

},{"../views/RoomRenderer":19,"./BaseObject":6}],11:[function(require,module,exports){
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

},{"../views/UiRenderer":21,"./BaseObject":6}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Logger = require('./Logger');

var _Logger2 = _interopRequireDefault(_Logger);

var _controllersHostController = require('../controllers/HostController');

var _controllersHostController2 = _interopRequireDefault(_controllersHostController);

var _controllersClientController = require('../controllers/ClientController');

var _controllersClientController2 = _interopRequireDefault(_controllersClientController);

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

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

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
            var _this = this;

            requestAnimationFrame(this.loop.bind(this));

            var now = Date.now();
            var delta = now - this.then;
            //console.log(delta);

            if (delta > this.interval) {
                this.then = now - delta % this.interval;

                this.frame = this.frame || 1;
                this.frame = this.frame % _Config2['default'].FPS ? this.frame : 1;

                this._canvas.width = _Config2['default'].CANVAS_WIDTH;
                this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
                this._ctx.imageSmoothingEnabled = false;

                this._ctx.fillStyle = "#000";
                this._ctx.fillRect(0, 0, _Config2['default'].CANVAS_WIDTH, _Config2['default'].CANVAS_HEIGHT);

                this._canvas.width = _Config2['default'].CANVAS_WIDTH;
                this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
                this._ctx.imageSmoothingEnabled = false;

                var shouldMove = true;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.players.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var player = _step.value;

                        shouldMove = shouldMove && player.ready;
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

                if (!this.room.isLooking && shouldMove) {
                    this.room.lookForTrouble();
                } else if (this.room.isLooking && !shouldMove) {
                    this.room.stopLooking();
                }

                this.objects.forEach(function (object) {
                    _this._ctx.save();
                    object.tick();
                    object.render(_this._ctx, _this.frame);
                    _this._ctx.restore();
                });

                var time_el = (this.then - this.first) / 1000;
                ++this.counter;
                var fps = parseInt(this.counter / time_el);

                var fontSize = 5 * _Config2['default'].SPRITE_SCALE;
                this._ctx.font = fontSize + "px Courier New";
                this._ctx.fillStyle = "#ffffff";

                this._ctx.fillText(this.frame + "/" + _Config2['default'].FPS + " " + fps + "fps", 20, 20);

                this.frame++;
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
            var _this2 = this;

            var queryParams = _Utils2['default'].parseQuery(window.location.search);

            this._element.appendChild(this._canvas);
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;

            this.players = new Map();
            var promises = [];

            var yOffset = 1.60;
            var xOffset = _Config2['default'].TILE_X - 3;

            console.log(queryParams.job);
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

            //let p2 = new Player(++xOffset, ++yOffset, "Stooks", Player.JOB_CLAIRVOYANT);
            //players.push(p2);
            //let p3 = new Player(--xOffset, ++yOffset, "Mecha", Player.JOB_VILLAIN);
            //players.push(p3);
            //let p4 = new Player(++xOffset, ++yOffset, "Space Squid", Player.JOB_HERBALIST);
            //players.push(p4);

            // Init all players
            promises.push(p1.init());
            //promises.push(p2.init());
            //promises.push(p3.init());
            //promises.push(p4.init());

            //// Add a baddie
            this.necro = new _modelsMonster2['default'](1, 1);
            promises.push(this.necro.init());
            this.necro.hide();

            // Initialize UI
            this.ui = new _modelsBattleUi2['default'](0, 0, 0, 0, this.players, this.players);
            promises.push(this.ui.init());

            // Initialize Room
            this.room = new _modelsRoom2['default'](_modelsRoom2['default'].TYPE_CAVE, [this.necro], this.players);
            promises.push(this.room.init());

            // Create all objects
            this.objects = [this.room].concat(_toConsumableArray(this.players.values()), [this.necro, this.ui]);
            //this.objects = [this.room, ...this.players, this.necro];

            // Attach input listeners
            // using https://dmauro.github.io/Keypress/
            this.listener = new window.keypress.Listener();
            this.attachInput(this.listener);

            // Initialize Multiplayer Controller
            if (queryParams.host) {
                this.multiplayerController = new _controllersClientController2['default'](queryParams.host, p1);
            } else {
                this.multiplayerController = new _controllersHostController2['default'](p1);
            }

            this.multiplayerController.on("player-connect", function (player) {
                console.log("add player");
                var p = new _modelsPlayer2['default'](xOffset, ++yOffset, player.name, player.job);
                p.init().then(function () {
                    _this2.players.set(p.name, p);
                    _this2.objects.push(p);
                });
            });

            this.multiplayerController.on("player-state", function (player) {
                _this2.players.get(player.name).ready = player.ready;
                console.log(_this2.players);
            });

            this.multiplayerController.on("click", function (player) {
                if (!_this2.room.isLooking) {
                    _this2.room.lookForTrouble();
                } else {
                    //this.room.endBattle();
                    _this2.room.stopLooking(); //lookForTrouble();
                }
            });

            promises.push(this.multiplayerController.init());

            Promise.all(promises).then(function () {
                _this2.then = Date.now();
                _this2.interval = 1000 / _Config2['default'].FPS;
                _this2.first = _this2.then;
                _this2.counter = 0;
                window.requestAnimationFrame(_this2.loop.bind(_this2));
            });

            // Attach resize event
            //window.resize = this.resize.bind(this);
            window.addEventListener("resize", this.resize.bind(this));

            // Attach Fullscreen event
            document.getElementsByTagName("button")[0].addEventListener("click", this.requestFullscreen.bind(this));

            _Logger2['default'].banner('Game Started');
        }
    }, {
        key: 'attachInput',
        value: function attachInput(listener) {
            var _this3 = this;

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
                _this3.multiplayerController.click();
            };

            //listener.simple_combo("t", ()=>{
            //lookForTrouble();
            //});
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../controllers/ClientController":3,"../controllers/HostController":4,"../models/BattleUi":7,"../models/Monster":8,"../models/Player":9,"../models/Room":10,"../models/Ui":11,"./Logger":13,"./Utils":14}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
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

},{"../../Config":2,"./UiRenderer":21}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SpriteRenderer2 = require('./SpriteRenderer');

var _SpriteRenderer3 = _interopRequireDefault(_SpriteRenderer2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_SpriteRenderer) {
    _inherits(_default, _SpriteRenderer);

    function _default(object) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, object.spriteResource);
        this.object = object;
    }

    _createClass(_default, [{
        key: 'render',
        value: function render(ctx, frame) {
            ctx.drawImage.apply(ctx, [this.image, 0, 0, // DY
            this.image.width, // dWidth
            this.image.height, // dHeight
            20, frame, // Ypos
            this.image.width * _Config2['default'].SPRITE_SCALE, // sWidth
            this.image.height * _Config2['default'].SPRITE_SCALE // sHeight
            ]);
        }
    }]);

    return _default;
})(_SpriteRenderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":14,"./SpriteRenderer":20}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _SpriteRenderer2 = require('./SpriteRenderer');

var _SpriteRenderer3 = _interopRequireDefault(_SpriteRenderer2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_SpriteRenderer) {
    _inherits(_default, _SpriteRenderer);

    function _default(object) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, object.spriteResource);
        this.object = object;
    }

    _createClass(_default, [{
        key: 'render',
        value: function render(ctx, frame) {
            this.frame = frame < _Config2['default'].FPS / 2 ? 0 : 1;

            ctx.drawImage.apply(ctx, [this.shadow, 0, 0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            this.object.xPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sx ~ Replace with object X Pos
            this.object.yPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE) + _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE - _Config2['default'].SPRITE_SCALE * this.shadow.height / 1.75, // sy ~ Replace with object Y Pos
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE, // sWidth
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE // sHeight
            ]);

            ctx.drawImage.apply(ctx, [this.image, this.object.isWalking ? _Config2['default'].SPRITE_SIZE * this.frame : 0, // DX
            0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            this.object.xPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sx ~ Replace with object X Pos
            this.object.yPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sy ~ Replace with object Y Pos
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE, // sWidth
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE // sHeight
            ]);

            if (!this.object.ready) {
                ctx.drawImage.apply(ctx, [this.waiting, 0, 0, // DY
                this.waiting.width, // dWidth
                this.waiting.height, // dHeight
                this.object.xPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE) - this.waiting.width * _Config2['default'].SPRITE_SCALE / 1.5, // sx ~ Replace with object X Pos
                this.object.yPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE) - this.waiting.height * _Config2['default'].SPRITE_SCALE / 1.5, // sy ~ Replace with object Y Pos
                this.waiting.width * _Config2['default'].SPRITE_SCALE, // sWidth
                this.waiting.height * _Config2['default'].SPRITE_SCALE // sHeight
                ]);
            }
        }
    }]);

    return _default;
})(_SpriteRenderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":14,"./SpriteRenderer":20}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = function _default() {
    _classCallCheck(this, _default);
};

exports["default"] = _default;
module.exports = exports["default"];

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

var _SpriteRenderer2 = require('./SpriteRenderer');

var _SpriteRenderer3 = _interopRequireDefault(_SpriteRenderer2);

var _servicesUtils = require('../services/Utils');

var _servicesUtils2 = _interopRequireDefault(_servicesUtils);

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _default = (function (_SpriteRenderer) {
    _inherits(_default, _SpriteRenderer);

    function _default(object) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.floorResource = object.floorResource;
        this.wallResource = object.wallResource;

        this.room = object;
        this._offsetX = 0;
        this.wallOffset = 0;
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return Promise.all([new Promise(function (res, rej) {
                _this.floorImage = document.createElement('img');
                _this.floorImage.onload = function () {
                    res(this);
                };
                _this.floorImage.src = _this.floorResource;
            }), new Promise(function (res, rej) {
                _this.wallImage = document.createElement('img');
                _this.wallImage.onload = function () {
                    res(this);
                };
                _this.wallImage.src = _this.wallResource;
            })]);
        }
    }, {
        key: 'render',
        value: function render(ctx, frame) {

            for (var x = 0; x < _Config2['default'].TILE_X + 1; x++) {
                for (var y = 0; y < _Config2['default'].TILE_Y - 2; y++) {
                    ctx.drawImage.apply(ctx, [this.floorImage, x * _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE - _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE + this._offsetX, // DX
                    (y + 2) * _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE, // DX
                    _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE, // sWidth
                    _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE // sWidth
                    ]);
                }
            }

            for (var x = 0; x < _Config2['default'].CANVAS_WIDTH / (this.wallImage.width * _Config2['default'].SPRITE_SCALE) + 1; x++) {
                ctx.drawImage.apply(ctx, [this.wallImage, this.wallOffset + this.wallImage.width * _Config2['default'].SPRITE_SCALE * x - this.wallImage.width * _Config2['default'].SPRITE_SCALE, 0, this.wallImage.width * _Config2['default'].SPRITE_SCALE, // sWidth
                this.wallImage.height * _Config2['default'].SPRITE_SCALE // sWidth
                ]);
            }

            if (this.room.isMoving) {
                this._offsetX += _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE / 16;
                if (this._offsetX >= _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE - 1) this._offsetX = 0;

                this.wallOffset += _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE / 16;
                if (this.wallOffset > this.wallImage.width * _Config2['default'].SPRITE_SCALE - 1) this.wallOffset = 0;
            }
        }
    }]);

    return _default;
})(_SpriteRenderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":14,"./SpriteRenderer":20}],20:[function(require,module,exports){
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

    function _default(spriteResource) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);

        this.shadowImage = './dist/resources/images/shadow.png';
        this.waitingImage = './dist/resources/images/waiting.png';

        if (spriteResource) {
            this._spriteResource = spriteResource;
        }
    }

    _createClass(_default, [{
        key: 'init',
        value: function init() {
            var _this = this;

            return Promise.all([new Promise(function (res, rej) {
                _this.image = document.createElement('img');
                _this.image.onload = function () {
                    res(this);
                };
                _this.image.src = _this._spriteResource;
            }), new Promise(function (res, rej) {
                _this.shadow = document.createElement('img');
                _this.shadow.onload = function () {
                    res(this);
                };
                _this.shadow.src = _this.shadowImage;
            }), new Promise(function (res, rej) {
                _this.waiting = document.createElement('img');
                _this.waiting.onload = function () {
                    res(this);
                };
                _this.waiting.src = _this.waitingImage;
            })]);
        }
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":14,"./Renderer":18}],21:[function(require,module,exports){
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

},{"../../Config":2,"./Renderer":18}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvY29udHJvbGxlcnMvSG9zdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9NdWx0aXBsYXllckNvbnRyb2xsZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvT2JqZWN0UmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Nwcml0ZVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7aUNDQW1CLHVCQUF1Qjs7Ozs7QUFHMUMsSUFBSSxJQUFJLEdBQUcsbUNBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ05aLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXO0FBQzFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdEIsVUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsVUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENB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Q0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDOzs7QUFHNUIsZ0JBQUksU0FBUyxHQUFHLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLEdBQUMsRUFBRSxDQUFDOztBQUUxRCxlQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7QUFFMUIsZ0JBQUksVUFBVSxhQUFPLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFDLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7QUFDM0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7O0FBRTNCLGVBQUcsQ0FBQyxVQUFVLE1BQUEsQ0FBZCxHQUFHLHFCQUFlLFVBQVUsRUFBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQjlCLGVBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLGdCQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsZUFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsZUFBRyxDQUFDLElBQUksTUFBQSxDQUFSLEdBQUcscUJBQVMsVUFBVSxFQUFDLENBQUM7QUFDeEIsZUFBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVYLGVBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL3NlcnZpY2VzL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGdhbWUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuXG4vLyBJbml0aWFsaXplIGl0XG5nYW1lLmluaXQoKTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG5jb25maWcuY2FsY3VsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uZmlnLlBFUkNFTlRBR0UgPSAxO1xuXG4gICAgLy8gMTZ4OSBBc3BlY3QgUmF0aW9cbiAgICBjb25maWcuQVNQRUNUX1dJRFRIICA9IDE5MjA7XG4gICAgY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG4gICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSB3aW5kb3cub3V0ZXJXaWR0aCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3aW5kb3cgd2lsbCBmaXQgdmVydGljYWxseVxuICAgIGlmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCA9IChjb25maWcuQ0FOVkFTX0hFSUdIVCpjb25maWcuQVNQRUNUX1dJRFRIKS9jb25maWcuQVNQRUNUX0hFSUdIVDtcbiAgICB9XG5cbiAgICBjb25maWcuVElMRV9YID0gMTQ7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbiAgICBjb25maWcuVElMRV9ZID0gKGNvbmZpZy5USUxFX1gqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuICAgIGNvbmZpZy5TUFJJVEVfU0NBTEUgID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCpjb25maWcuU1BSSVRFX1NJWkUpO1xuXG4gICAgY29uZmlnLkZQUyA9IDMwO1xufVxuXG5jb25maWcuY2FsY3VsYXRlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCBNdWx0aXBsYXllckNvbnRyb2xsZXIgZnJvbSAnLi9NdWx0aXBsYXllckNvbnRyb2xsZXInO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE11bHRpcGxheWVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihob3N0SWQsIHBsYXllcikge1xuICAgICAgICBzdXBlcihwbGF5ZXIpO1xuICAgICAgICB0aGlzLl9ob3N0SWQgPSBob3N0SWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBjb25uZWN0aW9uID0gdGhpcy5fcGVlci5jb25uZWN0KHRoaXMuX2hvc3RJZCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX2Nvbm5lY3Rpb25zKVxuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMgPSBbY29ubmVjdGlvbl07XG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCB0aGlzLmhhbmRsZURhdGEuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTXVsdGlwbGF5ZXJDb250cm9sbGVyIGZyb20gJy4vTXVsdGlwbGF5ZXJDb250cm9sbGVyJztcbmltcG9ydCBDb25maWcgICAgICAgICAgICAgICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBNdWx0aXBsYXllckNvbnRyb2xsZXIge1xuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcblxuICAgICAgICAgICAgdGhpcy5fcGVlci5vbignb3BlbicsIGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYEhvc3QgSUQgaXMgJHtpZH1gKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuX2lkID0gaWQ7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fcGVlci5vbignY29ubmVjdGlvbicsIChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgYGNvbm5lY3Rpb25gIGlzIGEgRGF0YUNvbm5lY3Rpb24gb2JqZWN0IHdpdGggd2hpY2ggd2UgY2FuIHNlbmRcbiAgICAgICAgICAgICAgICAvLyBkYXRhLlxuICAgICAgICAgICAgICAgIC8vIFRoZSBgb3BlbmAgZXZlbnQgZmlyaW5nIG1lYW5zIHRoYXQgdGhlIGNvbm5lY3Rpb24gaXMgbm93IHJlYWR5IHRvXG4gICAgICAgICAgICAgICAgLy8gdHJhbnNtaXQgZGF0YS5cblxuICAgICAgICAgICAgICAgIGlmKHRoaXMuX2Nvbm5lY3Rpb25zKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9ucy5wdXNoKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMgPSBbY29ubmVjdGlvbl07XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdvcGVuJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCAnSGVsbG8nIG9uIHRoZSBjb25uZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9jb25uZWN0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IGlkcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWRzLnB1c2goY29ubmVjdGlvbi5pZCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwiaG9zdC1jb25uZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25zXCI6IGlkc1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJldmVudFwiOiBcInBsYXllci1jb25uZWN0XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYXllclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuX3BsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiam9iXCI6IHRoaXMuX3BsYXllci5qb2JcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdkYXRhJywgdGhpcy5oYW5kbGVEYXRhLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG52YXIgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMTJcblxuZnVuY3Rpb24gZXJyb3IobWVzc2FnZSwgLi4uYXJncyl7XG4gIGNvbnNvbGUuZXJyb3IuYXBwbHkoY29uc29sZSwgW21lc3NhZ2VdLmNvbmNhdChhcmdzKSlcbiAgY29uc29sZS50cmFjZSgpXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihwbGF5ZXIpIHtcbiAgICAgICAgdGhpcy5fcGxheWVyID0gcGxheWVyO1xuICAgICAgICB0aGlzLl9wZWVyID0gbmV3IFBlZXIoe1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9wZWVyKTtcbiAgICAgICAgdGhpcy5faWQgPSB0aGlzLl9wZWVyLmlkO1xuICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSBERUZBVUxUX01BWF9MSVNURU5FUlNcbiAgICAgICAgdGhpcy5fZXZlbnRzID0ge31cbiAgICB9XG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcblxuICAgIH1cblxuICAgIG9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICBpZihsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcikgIT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIGxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKVxuICAgICAgICBpZihsaXN0ZW5lcnMubGVuZ3RoID4gdGhpcy5fbWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICBcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuICAgICAgICAgICAgXCJ1c2UgRXZlbnRFbWl0dGVyI3NldE1heExpc3RlbmVycyhudW1iZXIpIGlmIHlvdSBcIiArXG4gICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICBsaXN0ZW5lcnMubGVuZ3RoLFxuICAgICAgICAgICAgdHlwZSxcbiAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpc1xuICAgIH1cblxuICAgIG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGV2ZW50c0luc3RhbmNlID0gdGhpc1xuICAgICAgICBmdW5jdGlvbiBvbmNlQ2FsbGJhY2soKXtcbiAgICAgICAgICBldmVudHNJbnN0YW5jZS5vZmYodHlwZSwgb25jZUNhbGxiYWNrKVxuICAgICAgICAgIGxpc3RlbmVyLmFwcGx5KG51bGwsIGFyZ3VtZW50cylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spXG4gICAgfVxuXG4gICAgb2ZmKHR5cGUsIC4uLmFyZ3MpIHtcbiAgICAgICAgaWYoYXJncy5sZW5ndGggPT0gMCkge1xuICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGxcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXIgPSBhcmdzWzBdXG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleE9mTGlzdGVuZXIgPSBsaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcilcbiAgICAgICAgaWYoaW5kZXhPZkxpc3RlbmVyID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGluZGV4T2ZMaXN0ZW5lciwgMSlcbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdXG4gICAgICAgIGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSlcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG5cbiAgICBzZXRNYXhMaXN0ZW5lcnMobmV3TWF4TGlzdGVuZXJzKXtcbiAgICAgICAgaWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbmV3TWF4TGlzdGVuZXJzXG4gICAgfVxuXG4gICAgIGhhbmRsZURhdGEoZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgaWYoZGF0YS5ldmVudCA9PSBcImhvc3QtY29ubmVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJwbGF5ZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgICAgICAgICBcInBsYXllclwiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5fcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImpvYlwiOiB0aGlzLl9wbGF5ZXIuam9iXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZGF0YS5ldmVudCA9PSBcInBsYXllci1jb25uZWN0XCIpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdChcInBsYXllci1jb25uZWN0XCIsIGRhdGEucGxheWVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRhdGEuZXZlbnQgPT0gXCJwbGF5ZXItc3RhdGVcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwicGxheWVyLXN0YXRlXCIsIGRhdGEucGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLl9wbGF5ZXIucmVhZHkgPSAhdGhpcy5fcGxheWVyLnJlYWR5O1xuICAgICAgICB0aGlzLl9jb25uZWN0aW9ucy5mb3JFYWNoKChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgY29ubmVjdGlvbi5zZW5kKHtcbiAgICAgICAgICAgICAgICBcImV2ZW50XCI6ICAgICBcInBsYXllci1zdGF0ZVwiLFxuICAgICAgICAgICAgICAgIFwicGxheWVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6ICB0aGlzLl9wbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgXCJyZWFkeVwiOiB0aGlzLl9wbGF5ZXIucmVhZHlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IE9iamVjdFJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL09iamVjdFJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcykge1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zIHx8IDA7XG4gICAgICAgIHRoaXMueVBvcyA9IHlQb3MgfHwgMDtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgT2JqZWN0UmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4LCBmcmFtZSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpIGZyb20gJy4vVWknO1xuaW1wb3J0IEJhdHRsZVVpUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvQmF0dGxlVWlSZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgICAgICAgICAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgICAgICAgICAgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAgICAgICAgICAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAgICAgICAgICAtICUgWSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gcGxheWVyQ2hhcmFjdGVycyAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKiBAcGFyYW0gZW5lbWllcyAgICAgICAgICAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZLCBwbGF5ZXJDaGFyYWN0ZXJzLCBlbmVtaWVzKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpO1xuXG4gICAgICAgIHRoaXMucGxheWVyQ2hhcmFjdGVycyA9IHBsYXllckNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMuZW5lbWllcyAgICAgICAgICA9IGVuZW1pZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgQmF0dGxlVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcbmltcG9ydCBNb25zdGVyUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvTW9uc3RlclJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MpIHtcbiAgICAgICAgc3VwZXIoeFBvcywgeVBvcyk7XG4gICAgICAgIC8vIERlZmluZSB0aGUgU3BpcnRlIEFzc29jaWF0ZWQgd2l0aCB0aGUgUGxheWVyXG4gICAgICAgIHRoaXMuc3ByaXRlUmVzb3VyY2UgPSAnZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL25lY3JvLXNwcml0ZS5wbmcnO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgTW9uc3RlclJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IEpPQl9DTEFJUlZPWUFOVCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL2NsYWlydm95YW50LXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBKT0JfSEVSQkFMSVNUKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvaGVyYmFsaXN0LXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICdoZXJiYWxpc3QnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9WSUxMQUlOKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvdmlsbGFpbjItc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ3ZpbGxhaW4nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9LTklHSFQoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9rbmlnaHQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2tuaWdodCdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIG5hbWUsIGpvYikge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIHRoaXMucmVhZHkgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmpvYiA9IGpvYjtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBTcGlydGUgQXNzb2NpYXRlZCB3aXRoIHRoZSBQbGF5ZXJcbiAgICAgICAgdGhpcy5zcHJpdGVSZXNvdXJjZSA9IGpvYi5zcHJpdGU7XG5cbiAgICAgICAgdGhpcy5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCAgIGZyb20gJy4vQmFzZU9iamVjdCc7XG5pbXBvcnQgUm9vbVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1Jvb21SZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU9iamVjdCB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9DQVZFKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmxvb3I6ICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvZ29vZHRpbGUucG5nJyxcbiAgICAgICAgICAgIHdhbGw6ICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvcGlsbGFycy5wbmcnXG4gICAgICAgIH07XG4gICAgfVxuICAgIHN0YXRpYyBnZXQgVFlQRV9PVVRTSURFKCkgeyByZXR1cm4gJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9ncmFzcy5wbmcnO31cblxuICAgIGNvbnN0cnVjdG9yKHR5cGUsIGVuZW1pZXMsIHBsYXllcnMsIGVuY291bnRlclJhdGUpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLmZsb29yUmVzb3VyY2UgID0gdHlwZS5mbG9vcjtcbiAgICAgICAgdGhpcy53YWxsUmVzb3VyY2UgICA9IHR5cGUud2FsbDtcblxuICAgICAgICB0aGlzLmlzTW92aW5nICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNCYXR0bGUgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICA9IGVuZW1pZXM7XG4gICAgICAgIHRoaXMucGxheWVycyAgICAgICAgPSBwbGF5ZXJzO1xuICAgICAgICB0aGlzLmlzTG9va2luZyAgICAgID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5lbmNvdW50ZXJSYXRlID0gZW5jb3VudGVyUmF0ZSB8fCA1MDtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVOZXh0RW5jb3VudGVyKCk7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBSb29tUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvb2tGb3JUcm91YmxlKCkge1xuICAgICAgICBpZiAodGhpcy5pc0xvb2tpbmcpIHJldHVybjtcbiAgICAgICAgaWYgKHRoaXMuaXNCYXR0bGUpIHRoaXMuZW5kQmF0dGxlKCk7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgcGxheWVyLmlzV2Fsa2luZyA9ICFwbGF5ZXIuaXNXYWxraW5nO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdG9wTG9va2luZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9va2luZykgcmV0dXJuO1xuICAgICAgICB0aGlzLmlzTW92aW5nICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTG9va2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgcGxheWVyLmlzV2Fsa2luZyA9ICFwbGF5ZXIuaXNXYWxraW5nO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBlbmRCYXR0bGUoKSB7XG4gICAgICAgIGlmKHRoaXMuaXNCYXR0bGUpIHtcbiAgICAgICAgICAgIHRoaXMuaXNCYXR0bGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbmVteSk9PntcbiAgICAgICAgICAgICAgICBlbmVteS50b2dnbGUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLmNhbGN1bGF0ZU5leHRFbmNvdW50ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXJ0QmF0dGxlKCkge1xuICAgICAgICB0aGlzLnRpY2tDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuaXNCYXR0bGUgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbmVtaWVzLmZvckVhY2goKGVuZW15KT0+e1xuICAgICAgICAgICAgZW5lbXkudG9nZ2xlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgcGxheWVyLmlzV2Fsa2luZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVOZXh0RW5jb3VudGVyKCkge1xuICAgICAgICB2YXIgbXlSYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjEwMC90aGlzLmVuY291bnRlclJhdGUpO1xuICAgICAgICB0aGlzLm5leHRFbmNvdW50ZXIgPSBteVJhbmQqNTAgKyAyNTtcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICB0aGlzLnRpY2tDb3VudCA9IHRoaXMudGlja0NvdW50IHx8IDA7XG4gICAgICAgIGlmKHRoaXMuaXNMb29raW5nKSB7XG4gICAgICAgICAgICAvL3RoaXMudGlja0NvdW50Kys7XG4gICAgICAgICAgICBpZih0aGlzLnRpY2tDb3VudCA+IHRoaXMubmV4dEVuY291bnRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCYXR0bGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGN0eCwgZnJhbWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1VpUmVuZGVyZXInO1xuaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJnICAgICAgPSAnZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL3VpLWJnLnBuZyc7XG4gICAgICAgIHRoaXMud2lkdGggICA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCAgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMub2Zmc2V0WCA9IG9mZnNldFg7XG4gICAgICAgIHRoaXMub2Zmc2V0WSA9IG9mZnNldFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgICBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQgSG9zdENvbnRyb2xsZXIgICBmcm9tICcuLi9jb250cm9sbGVycy9Ib3N0Q29udHJvbGxlcic7XG5pbXBvcnQgQ2xpZW50Q29udHJvbGxlciAgIGZyb20gJy4uL2NvbnRyb2xsZXJzL0NsaWVudENvbnRyb2xsZXInO1xuaW1wb3J0IFBsYXllciAgIGZyb20gJy4uL21vZGVscy9QbGF5ZXInO1xuaW1wb3J0IE1vbnN0ZXIgIGZyb20gJy4uL21vZGVscy9Nb25zdGVyJztcbmltcG9ydCBSb29tICAgICBmcm9tICcuLi9tb2RlbHMvUm9vbSc7XG5pbXBvcnQgVWkgICAgICAgZnJvbSAnLi4vbW9kZWxzL1VpJztcbmltcG9ydCBCYXR0bGVVaSBmcm9tICcuLi9tb2RlbHMvQmF0dGxlVWknO1xuaW1wb3J0IFV0aWxzICAgIGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IENvbmZpZyAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2NvZGV0aGVvcnkuaW4vY29udHJvbGxpbmctdGhlLWZyYW1lLXJhdGUtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGRlbHRhID0gbm93IC0gdGhpcy50aGVuO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRlbHRhKTtcblxuICAgICAgICBpZiAoZGVsdGEgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZGVsdGEgJSB0aGlzLmludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5mcmFtZSA9IHRoaXMuZnJhbWUgfHwgMTtcbiAgICAgICAgICAgIHRoaXMuZnJhbWUgPSAodGhpcy5mcmFtZSVDb25maWcuRlBTKSA/IHRoaXMuZnJhbWUgOiAxO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlID0gXCIjMDAwXCI7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgQ29uZmlnLkNBTlZBU19XSURUSCwgQ29uZmlnLkNBTlZBU19IRUlHSFQpO1xuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICBsZXQgc2hvdWxkTW92ZSA9IHRydWU7XG4gICAgICAgICAgICBmb3IgKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgc2hvdWxkTW92ZSA9IHNob3VsZE1vdmUgJiYgcGxheWVyLnJlYWR5O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighdGhpcy5yb29tLmlzTG9va2luZyAmJiBzaG91bGRNb3ZlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLmxvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5yb29tLmlzTG9va2luZyAmJiAhc2hvdWxkTW92ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5zdG9wTG9va2luZygpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9iamVjdHMuZm9yRWFjaCgob2JqZWN0KT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnRpY2soKTtcbiAgICAgICAgICAgICAgICBvYmplY3QucmVuZGVyKHRoaXMuX2N0eCwgdGhpcy5mcmFtZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBsZXQgdGltZV9lbCA9ICh0aGlzLnRoZW4gLSB0aGlzLmZpcnN0KS8xMDAwO1xuICAgICAgICAgICAgKyt0aGlzLmNvdW50ZXI7XG4gICAgICAgICAgICBsZXQgZnBzID0gcGFyc2VJbnQodGhpcy5jb3VudGVyL3RpbWVfZWwpO1xuXG4gICAgICAgICAgICBsZXQgZm9udFNpemUgICAgICAgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQodGhpcy5mcmFtZSArIFwiL1wiICsgQ29uZmlnLkZQUyArIFwiIFwiICsgZnBzICsgXCJmcHNcIiwgMjAsIDIwKTtcblxuICAgICAgICAgICAgdGhpcy5mcmFtZSsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzaXplIEhhbmRsZXJcbiAgICAgKiBAdG9kbzogZG9lcyB0aGlzIGJlbG9uZyBoZXJlP1xuICAgICAqL1xuICAgIHJlc2l6ZSgpIHtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IHRoZSBnYW1lIGdvZXMgZnVsbCBzY3JlZW4sIHdpbGwgZnVsbHNjcmVlbiB0aGUgY2FudmFzIGVsZW1lbnRcbiAgICAgKiBGb3VuZDogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0Z1bGxzY3JlZW5fQVBJXG4gICAgICovXG4gICAgcmVxdWVzdEZ1bGxzY3JlZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLl9jYW52YXMucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5yZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMubXNSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhlIGVuZ2luZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIGxldCBxdWVyeVBhcmFtcyA9IFV0aWxzLnBhcnNlUXVlcnkod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMucGxheWVycyA9IG5ldyBNYXAoKTtcbiAgICAgICAgbGV0IHByb21pc2VzID0gW107XG5cbiAgICAgICAgbGV0IHlPZmZzZXQgPSAxLjYwO1xuICAgICAgICBsZXQgeE9mZnNldCA9IENvbmZpZy5USUxFX1ggLSAzO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHF1ZXJ5UGFyYW1zLmpvYik7XG4gICAgICAgIC8vIENyZWF0ZSA0IHBsYXllcnNcbiAgICAgICAgbGV0IGpvYiA9IFwiXCI7XG4gICAgICAgIGlmKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcImtuaWdodFwiKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImtuaWdodFwiKTtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfS05JR0hUO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcInZpbGxhaW5cIikge1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9WSUxMQUlOO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcImhlcmJhbGlzdFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0hFUkJBTElTVDtcbiAgICAgICAgfSBlbHNlIGlmIChxdWVyeVBhcmFtcy5qb2IgPT0gXCJjbGFpcnZveWFudFwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX0NMQUlSVk9ZQU5UO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHAxID0gbmV3IFBsYXllcih4T2Zmc2V0LCB5T2Zmc2V0LCBxdWVyeVBhcmFtcy5uYW1lLCBqb2IpO1xuICAgICAgICB0aGlzLnBsYXllcnMuc2V0KHAxLm5hbWUsIHAxKTtcblxuICAgICAgICAvL2xldCBwMiA9IG5ldyBQbGF5ZXIoKyt4T2Zmc2V0LCArK3lPZmZzZXQsIFwiU3Rvb2tzXCIsIFBsYXllci5KT0JfQ0xBSVJWT1lBTlQpO1xuICAgICAgICAvL3BsYXllcnMucHVzaChwMik7XG4gICAgICAgIC8vbGV0IHAzID0gbmV3IFBsYXllcigtLXhPZmZzZXQsICsreU9mZnNldCwgXCJNZWNoYVwiLCBQbGF5ZXIuSk9CX1ZJTExBSU4pO1xuICAgICAgICAvL3BsYXllcnMucHVzaChwMyk7XG4gICAgICAgIC8vbGV0IHA0ID0gbmV3IFBsYXllcigrK3hPZmZzZXQsICsreU9mZnNldCwgXCJTcGFjZSBTcXVpZFwiLCBQbGF5ZXIuSk9CX0hFUkJBTElTVCk7XG4gICAgICAgIC8vcGxheWVycy5wdXNoKHA0KTtcblxuICAgICAgICAvLyBJbml0IGFsbCBwbGF5ZXJzXG4gICAgICAgIHByb21pc2VzLnB1c2gocDEuaW5pdCgpKTtcbiAgICAgICAgLy9wcm9taXNlcy5wdXNoKHAyLmluaXQoKSk7XG4gICAgICAgIC8vcHJvbWlzZXMucHVzaChwMy5pbml0KCkpO1xuICAgICAgICAvL3Byb21pc2VzLnB1c2gocDQuaW5pdCgpKTtcblxuICAgICAgICAvLy8vIEFkZCBhIGJhZGRpZVxuICAgICAgICB0aGlzLm5lY3JvID0gbmV3IE1vbnN0ZXIoMSwgMSk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5uZWNyby5pbml0KCkpO1xuICAgICAgICB0aGlzLm5lY3JvLmhpZGUoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIFVJXG4gICAgICAgIHRoaXMudWkgPSBuZXcgQmF0dGxlVWkoMCwgMCwgMCwgMCwgdGhpcy5wbGF5ZXJzLCB0aGlzLnBsYXllcnMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMudWkuaW5pdCgpKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIFJvb21cbiAgICAgICAgdGhpcy5yb29tID0gbmV3IFJvb20oUm9vbS5UWVBFX0NBVkUsIFt0aGlzLm5lY3JvXSwgdGhpcy5wbGF5ZXJzKTtcbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLnJvb20uaW5pdCgpKTtcblxuICAgICAgICAvLyBDcmVhdGUgYWxsIG9iamVjdHNcbiAgICAgICAgdGhpcy5vYmplY3RzID0gW3RoaXMucm9vbSwgLi4udGhpcy5wbGF5ZXJzLnZhbHVlcygpLCB0aGlzLm5lY3JvLCB0aGlzLnVpXTtcbiAgICAgICAgLy90aGlzLm9iamVjdHMgPSBbdGhpcy5yb29tLCAuLi50aGlzLnBsYXllcnMsIHRoaXMubmVjcm9dO1xuXG4gICAgICAgIC8vIEF0dGFjaCBpbnB1dCBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdXNpbmcgaHR0cHM6Ly9kbWF1cm8uZ2l0aHViLmlvL0tleXByZXNzL1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgTXVsdGlwbGF5ZXIgQ29udHJvbGxlclxuICAgICAgICBpZihxdWVyeVBhcmFtcy5ob3N0KSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlciA9IG5ldyBDbGllbnRDb250cm9sbGVyKHF1ZXJ5UGFyYW1zLmhvc3QsIHAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyID0gbmV3IEhvc3RDb250cm9sbGVyKHAxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLm9uKFwicGxheWVyLWNvbm5lY3RcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiYWRkIHBsYXllclwiKTtcbiAgICAgICAgICAgIGxldCBwID0gbmV3IFBsYXllcih4T2Zmc2V0LCArK3lPZmZzZXQsIHBsYXllci5uYW1lLCBwbGF5ZXIuam9iKTtcbiAgICAgICAgICAgIHAuaW5pdCgpLnRoZW4oKCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnMuc2V0KHAubmFtZSwgcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gocCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJwbGF5ZXItc3RhdGVcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIHRoaXMucGxheWVycy5nZXQocGxheWVyLm5hbWUpLnJlYWR5ID0gcGxheWVyLnJlYWR5O1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wbGF5ZXJzKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJjbGlja1wiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20ubG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnJvb20uZW5kQmF0dGxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLnN0b3BMb29raW5nKCk7Ly9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmluaXQoKSk7XG5cbiAgICAgICAgUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLmludGVydmFsID0gMTAwMC9Db25maWcuRlBTO1xuICAgICAgICAgICAgdGhpcy5maXJzdCA9IHRoaXMudGhlbjtcbiAgICAgICAgICAgIHRoaXMuY291bnRlciA9IDA7XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAgIC8vIEF0dGFjaCByZXNpemUgZXZlbnRcbiAgICAgICAgLy93aW5kb3cucmVzaXplID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gQXR0YWNoIEZ1bGxzY3JlZW4gZXZlbnRcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVxdWVzdEZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgTG9nZ2VyLmJhbm5lcignR2FtZSBTdGFydGVkJyk7XG4gICAgfVxuXG4gICAgYXR0YWNoSW5wdXQobGlzdGVuZXIpIHtcblxuICAgICAgICBmdW5jdGlvbiBsb29rRm9yVHJvdWJsZSgpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmNsaWNrKCk7XG4gICAgICAgICAgICBpZighdGhpcy5yb29tLmlzTG9va2luZykge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucm9vbS5lbmRCYXR0bGUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20uc3RvcExvb2tpbmcoKTsvL2xvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cub25jbGljayA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLmNsaWNrKCk7XG5cbiAgICAgICAgfTtcblxuICAgICAgICAvL2xpc3RlbmVyLnNpbXBsZV9jb21ibyhcInRcIiwgKCk9PntcbiAgICAgICAgICAgIC8vbG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgLy99KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbGltaXRsb29wKGZuLCBmcHMpIHtcbiAgICAgICAgLy8gVXNlIHZhciB0aGVuID0gRGF0ZS5ub3coKTsgaWYgeW91XG4gICAgICAgIC8vIGRvbid0IGNhcmUgYWJvdXQgdGFyZ2V0dGluZyA8IElFOVxuICAgICAgICB2YXIgdGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGN1c3RvbSBmcHMsIG90aGVyd2lzZSBmYWxsYmFjayB0byA2MFxuICAgICAgICBmcHMgPSBmcHMgfHwgNjA7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG5cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG4gICAgICAgICAgICAvLyBhZ2FpbiwgRGF0ZS5ub3coKSBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGltZVxuICAgICAgICAgICAgICAgIC8vIG5vdyAtIChkZWx0YSAlIGludGVydmFsKSBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIGp1c3QgXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlbiA9IG5vdywgd2hpY2ggY2FuIGVuZCB1cCBsb3dlcmluZyBvdmVyYWxsIGZwc1xuICAgICAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBmblxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oMCkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXNwZWN0SGVpZ2h0Q2FsYyh3Mikge1xuICAgICAgICBsZXQgdzEgPSAxOTIwO1xuICAgICAgICBsZXQgaDEgPSAxMDgwO1xuICAgICAgICByZXR1cm4gaDEqdzIvdzE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlUXVlcnkoc2VhcmNoKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xuXG4gICAgICAgIHZhciBhcmdzUGFyc2VkID0ge307XG5cbiAgICAgICAgdmFyIGksIGFyZywga3ZwLCBrZXksIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaT0wOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGFyZy5pbmRleE9mKCc9JykpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRbZGVjb2RlVVJJQ29tcG9uZW50KGFyZykudHJpbSgpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGt2cCA9IGFyZy5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFswXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzFdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzUGFyc2VkO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4vVWlSZW5kZXJlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWlSZW5kZXJlciB7XG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoY3R4KTtcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeXBvcyA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuICAgICAgICBsZXQgeHBvcyA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9YIC0gNClcbiAgICAgICAgdGhpcy51aS5wbGF5ZXJDaGFyYWN0ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHlwb3MgKz0gZm9udFNpemUqMjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZVJlbmRlcmVyIGZyb20gJy4vU3ByaXRlUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTcHJpdGVSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKG9iamVjdC5zcHJpdGVSZXNvdXJjZSk7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgdGhpcy5pbWFnZS53aWR0aCwgLy8gZFdpZHRoXG4gICAgICAgICAgICB0aGlzLmltYWdlLmhlaWdodCwgLy8gZEhlaWdodFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICBmcmFtZSwgLy8gWXBvc1xuICAgICAgICAgICAgdGhpcy5pbWFnZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0KkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZVJlbmRlcmVyIGZyb20gJy4vU3ByaXRlUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTcHJpdGVSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKG9iamVjdC5zcHJpdGVSZXNvdXJjZSk7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLnNoYWRvdyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgdGhpcy5vYmplY3QueFBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnlQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSArIChDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSkgLSAoQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLnNoYWRvdy5oZWlnaHQvMS43NSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgdGhpcy5vYmplY3QuaXNXYWxraW5nID8gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKSA6IDAsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgdGhpcy5vYmplY3QueFBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnlQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICBpZighdGhpcy5vYmplY3QucmVhZHkpIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZyxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nLndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmcuaGVpZ2h0LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QueFBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpIC0gKHRoaXMud2FpdGluZy53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLzEuNSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0LnlQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSAtICh0aGlzLndhaXRpbmcuaGVpZ2h0KkNvbmZpZy5TUFJJVEVfU0NBTEUvMS41KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZy5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZVJlbmRlcmVyIGZyb20gJy4vU3ByaXRlUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTcHJpdGVSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmxvb3JSZXNvdXJjZSA9IG9iamVjdC5mbG9vclJlc291cmNlO1xuICAgICAgICB0aGlzLndhbGxSZXNvdXJjZSAgPSBvYmplY3Qud2FsbFJlc291cmNlO1xuXG4gICAgICAgIHRoaXMucm9vbSA9IG9iamVjdDtcbiAgICAgICAgdGhpcy5fb2Zmc2V0WCA9IDA7XG4gICAgICAgIHRoaXMud2FsbE9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgICAgICB0aGlzLmZsb29ySW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZsb29ySW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5mbG9vckltYWdlLnNyYyA9IHRoaXMuZmxvb3JSZXNvdXJjZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2Uuc3JjID0gdGhpcy53YWxsUmVzb3VyY2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuXG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YKzE7IHgrKykge1xuICAgICAgICAgICAgZm9yKGxldCB5ID0gMDsgeSA8IENvbmZpZy5USUxFX1kgLSAyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mbG9vckltYWdlLFxuICAgICAgICAgICAgICAgICAgICAoeCpDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSkgLSAoQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpICsgdGhpcy5fb2Zmc2V0WCwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgKHkrMikqQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLkNBTlZBU19XSURUSC8odGhpcy53YWxsSW1hZ2Uud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSkgKyAxOyB4KyspIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbEltYWdlLFxuICAgICAgICAgICAgICAgIHRoaXMud2FsbE9mZnNldCArICh0aGlzLndhbGxJbWFnZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFKngpIC0gKHRoaXMud2FsbEltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUpLFxuICAgICAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2Uud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2UuaGVpZ2h0KkNvbmZpZy5TUFJJVEVfU0NBTEUgLy8gc1dpZHRoXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMucm9vbS5pc01vdmluZykge1xuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0WCArPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8xNjtcbiAgICAgICAgICAgIGlmKHRoaXMuX29mZnNldFggPj0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUgLSAxKSB0aGlzLl9vZmZzZXRYID0gMDtcblxuICAgICAgICAgICAgdGhpcy53YWxsT2Zmc2V0ICs9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzE2O1xuICAgICAgICAgICAgaWYodGhpcy53YWxsT2Zmc2V0ID4gdGhpcy53YWxsSW1hZ2Uud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSAtIDEpIHRoaXMud2FsbE9mZnNldCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihzcHJpdGVSZXNvdXJjZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuc2hhZG93SW1hZ2UgPSAnLi9kaXN0L3Jlc291cmNlcy9pbWFnZXMvc2hhZG93LnBuZyc7XG4gICAgICAgIHRoaXMud2FpdGluZ0ltYWdlID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL3dhaXRpbmcucG5nJztcblxuICAgICAgICBpZihzcHJpdGVSZXNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlUmVzb3VyY2UgPSBzcHJpdGVSZXNvdXJjZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl9zcHJpdGVSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93LnNyYyA9IHRoaXMuc2hhZG93SW1hZ2U7XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLndhaXRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53YWl0aW5nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMud2FpdGluZy5zcmMgPSB0aGlzLndhaXRpbmdJbWFnZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1aSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVpID0gdWk7XG4gICAgICAgIHRoaXMuX3VpQmcgPSB1aS5iZztcbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl91aUJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLi4uYmdSZWN0KTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCIjNjRBMzU3XCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCIjMDAzNzAwXCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCguLi51aVJlY3QpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzhEODA0NVwiO1xuXG4gICAgICAgIC8vIFRoZSBzdHJva2UgaXMgbWlkZGxlIGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGJveFxuICAgICAgICBsZXQgbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMzI7XG4gICAgICAgIC8vbGV0IGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIHN0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIFRyeWluZyB0byBnZXQgc2Vjb25kIGJvcmRlclxuICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuXG4gICAgICAgIC8vbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvNDg7XG4gICAgICAgIC8vY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICAvL3N0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgLy9zdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9jdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBsZXQgcGF0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5pbWFnZSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICB9XG59XG4iXX0=
