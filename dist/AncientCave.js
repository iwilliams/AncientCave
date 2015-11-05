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
    }, {
        key: 'click',
        value: function click() {
            this._connections.forEach(function (connection) {
                connection.send({
                    "event": "click"
                });
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
    }, {
        key: 'click',
        value: function click() {
            this._connections.forEach(function (connection) {
                connection.send({
                    "event": "click"
                });
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

            if (data.event == "click") {
                this.emit("click");
            }
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

            var players = [];
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
            players.push(p1);

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

            this.players = players;

            //// Add a baddie
            this.necro = new _modelsMonster2['default'](1, 1);
            promises.push(this.necro.init());
            this.necro.hide();

            // Initialize UI
            this.ui = new _modelsBattleUi2['default'](0, 0, 0, 0, players, players);
            promises.push(this.ui.init());

            // Initialize Room
            this.room = new _modelsRoom2['default'](_modelsRoom2['default'].TYPE_CAVE, [this.necro], this.players);
            promises.push(this.room.init());

            // Create all objects
            this.objects = [this.room].concat(_toConsumableArray(this.players), [this.necro, this.ui]);
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
                    _this2.players.push(p);
                    _this2.objects.push(p);
                });
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
                if (!_this3.room.isLooking) {
                    _this3.room.lookForTrouble();
                } else {
                    //this.room.endBattle();
                    _this3.room.stopLooking(); //lookForTrouble();
                }
            };

            listener.simple_combo("t", function () {
                lookForTrouble();
            });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvY29udHJvbGxlcnMvSG9zdENvbnRyb2xsZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9jb250cm9sbGVycy9NdWx0aXBsYXllckNvbnRyb2xsZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvT2JqZWN0UmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Nwcml0ZVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7aUNDQW1CLHVCQUF1Qjs7Ozs7QUFHMUMsSUFBSSxJQUFJLEdBQUcsbUNBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ05aLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXO0FBQzFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdEIsVUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsVUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENB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LE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsZUFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsZUFBRyxDQUFDLElBQUksTUFBQSxDQUFSLEdBQUcscUJBQVMsVUFBVSxFQUFDLENBQUM7QUFDeEIsZUFBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVYLGVBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL3NlcnZpY2VzL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGdhbWUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuXG4vLyBJbml0aWFsaXplIGl0XG5nYW1lLmluaXQoKTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG5jb25maWcuY2FsY3VsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uZmlnLlBFUkNFTlRBR0UgPSAxO1xuXG4gICAgLy8gMTZ4OSBBc3BlY3QgUmF0aW9cbiAgICBjb25maWcuQVNQRUNUX1dJRFRIICA9IDE5MjA7XG4gICAgY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG4gICAgY29uZmlnLkNBTlZBU19XSURUSCAgPSB3aW5kb3cub3V0ZXJXaWR0aCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuXG4gICAgLy8gTWFrZSBzdXJlIHRoZSB3aW5kb3cgd2lsbCBmaXQgdmVydGljYWxseVxuICAgIGlmKGNvbmZpZy5DQU5WQVNfSEVJR0hUID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgY29uZmlnLkNBTlZBU19XSURUSCA9IChjb25maWcuQ0FOVkFTX0hFSUdIVCpjb25maWcuQVNQRUNUX1dJRFRIKS9jb25maWcuQVNQRUNUX0hFSUdIVDtcbiAgICB9XG5cbiAgICBjb25maWcuVElMRV9YID0gMTQ7IC8vIE1VU1QgQkUgTVVMVElQTEUgT0YgMTZcbiAgICBjb25maWcuVElMRV9ZID0gKGNvbmZpZy5USUxFX1gqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuICAgIGNvbmZpZy5TUFJJVEVfU0NBTEUgID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCpjb25maWcuU1BSSVRFX1NJWkUpO1xuXG4gICAgY29uZmlnLkZQUyA9IDMwO1xufVxuXG5jb25maWcuY2FsY3VsYXRlKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGNvbmZpZztcbiIsImltcG9ydCBNdWx0aXBsYXllckNvbnRyb2xsZXIgZnJvbSAnLi9NdWx0aXBsYXllckNvbnRyb2xsZXInO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE11bHRpcGxheWVyQ29udHJvbGxlciB7XG5cbiAgICBjb25zdHJ1Y3Rvcihob3N0SWQsIHBsYXllcikge1xuICAgICAgICBzdXBlcihwbGF5ZXIpO1xuICAgICAgICB0aGlzLl9ob3N0SWQgPSBob3N0SWQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGlzIENvbnRyb2xsZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4gUHJvbWlzZVxuICAgICAqXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIGxldCBjb25uZWN0aW9uID0gdGhpcy5fcGVlci5jb25uZWN0KHRoaXMuX2hvc3RJZCk7XG5cbiAgICAgICAgICAgIGlmKHRoaXMuX2Nvbm5lY3Rpb25zKVxuICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMgPSBbY29ubmVjdGlvbl07XG5cbiAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCB0aGlzLmhhbmRsZURhdGEuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbGljaygpIHtcbiAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZCh7XG4gICAgICAgICAgICAgICAgXCJldmVudFwiOiBcImNsaWNrXCJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBNdWx0aXBsYXllckNvbnRyb2xsZXIgZnJvbSAnLi9NdWx0aXBsYXllckNvbnRyb2xsZXInO1xuaW1wb3J0IENvbmZpZyAgICAgICAgICAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIE11bHRpcGxheWVyQ29udHJvbGxlciB7XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoaXMgQ29udHJvbGxlclxuICAgICAqXG4gICAgICogQHJldHVybiBQcm9taXNlXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuXG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdvcGVuJywgZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgSG9zdCBJRCBpcyAke2lkfWApO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5faWQgPSBpZDtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB0aGlzLl9wZWVyLm9uKCdjb25uZWN0aW9uJywgKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBgY29ubmVjdGlvbmAgaXMgYSBEYXRhQ29ubmVjdGlvbiBvYmplY3Qgd2l0aCB3aGljaCB3ZSBjYW4gc2VuZFxuICAgICAgICAgICAgICAgIC8vIGRhdGEuXG4gICAgICAgICAgICAgICAgLy8gVGhlIGBvcGVuYCBldmVudCBmaXJpbmcgbWVhbnMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyBub3cgcmVhZHkgdG9cbiAgICAgICAgICAgICAgICAvLyB0cmFuc21pdCBkYXRhLlxuXG4gICAgICAgICAgICAgICAgaWYodGhpcy5fY29ubmVjdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zLnB1c2goY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9jb25uZWN0aW9ucyA9IFtjb25uZWN0aW9uXTtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ29wZW4nLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBTZW5kICdIZWxsbycgb24gdGhlIGNvbm5lY3Rpb24uXG4gICAgICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2Nvbm5lY3Rpb25zKTtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgaWRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZHMucHVzaChjb25uZWN0aW9uLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5zZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJob3N0LWNvbm5lY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbnNcIjogaWRzXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24uc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLWNvbm5lY3RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxheWVyXCI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogdGhpcy5fcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JcIjogdGhpcy5fcGxheWVyLmpvYlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCB0aGlzLmhhbmRsZURhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgY2xpY2soKSB7XG4gICAgICAgIHRoaXMuX2Nvbm5lY3Rpb25zLmZvckVhY2goKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoe1xuICAgICAgICAgICAgICAgIFwiZXZlbnRcIjogXCJjbGlja1wiXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xudmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IocGxheWVyKSB7XG4gICAgICAgIHRoaXMuX3BsYXllciA9IHBsYXllcjtcbiAgICAgICAgdGhpcy5fcGVlciA9IG5ldyBQZWVyKHtcbiAgICAgICAgICAgIGtleTogQ29uZmlnLkFQSV9LRVksXG4gICAgICAgICAgICBkZWJ1ZzogM1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fcGVlcik7XG4gICAgICAgIHRoaXMuX2lkID0gdGhpcy5fcGVlci5pZDtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgdGhpcyBDb250cm9sbGVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIFByb21pc2VcbiAgICAgKlxuICAgICAqL1xuICAgIGluaXQoKSB7XG5cbiAgICB9XG5cbiAgICBvbih0eXBlLCBsaXN0ZW5lcikge1xuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXSB8fCh0aGlzLl9ldmVudHNbdHlwZV0gPSBbXSlcbiAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgaWYobGlzdGVuZXJzLmxlbmd0aCA+IHRoaXMuX21heExpc3RlbmVycykge1xuICAgICAgICAgIGVycm9yKFxuICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgIFwidXNlIEV2ZW50RW1pdHRlciNzZXRNYXhMaXN0ZW5lcnMobnVtYmVyKSBpZiB5b3UgXCIgK1xuICAgICAgICAgICAgXCJ3YW50IHRvIGluY3JlYXNlIHRoZSBsaW1pdCAoJWkgbm93KVwiLFxuICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgICB0aGlzLl9tYXhMaXN0ZW5lcnNcbiAgICAgICAgICApXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxuICAgICBoYW5kbGVEYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIGlmKGRhdGEuZXZlbnQgPT0gXCJob3N0LWNvbm5lY3RcIikge1xuICAgICAgICAgICAgdGhpcy5fY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubmVjdGlvbik9PntcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLnNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBcImV2ZW50XCI6IFwicGxheWVyLWNvbm5lY3RcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwbGF5ZXJcIjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJuYW1lXCI6IHRoaXMuX3BsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqb2JcIjogdGhpcy5fcGxheWVyLmpvYlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGRhdGEuZXZlbnQgPT0gXCJwbGF5ZXItY29ubmVjdFwiKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoXCJwbGF5ZXItY29ubmVjdFwiLCBkYXRhLnBsYXllcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZihkYXRhLmV2ZW50ID09IFwiY2xpY2tcIikge1xuICAgICAgICAgICAgdGhpcy5lbWl0KFwiY2xpY2tcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgT2JqZWN0UmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvT2JqZWN0UmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih4UG9zLCB5UG9zKSB7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3MgfHwgMDtcbiAgICAgICAgdGhpcy55UG9zID0geVBvcyB8fCAwO1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBPYmplY3RSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgaWYodGhpcy5pc1Zpc2libGUpXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgsIGZyYW1lKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNob3coKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKSB7XG4gICAgICAgIHRoaXMuaXNWaXNpYmxlID0gIXRoaXMuaXNWaXNpYmxlO1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWkgZnJvbSAnLi9VaSc7XG5pbXBvcnQgQmF0dGxlVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9CYXR0bGVVaVJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBVaSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgICAgICAgICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgICAgICAgICAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYICAgICAgICAgIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZICAgICAgICAgIC0gJSBZIG9mZnNldFxuICAgICAqIEBwYXJhbSBwbGF5ZXJDaGFyYWN0ZXJzIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqIEBwYXJhbSBlbmVtaWVzICAgICAgICAgIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFksIHBsYXllckNoYXJhY3RlcnMsIGVuZW1pZXMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDaGFyYWN0ZXJzID0gcGxheWVyQ2hhcmFjdGVycztcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICAgID0gZW5lbWllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXphdGlvbiBQcm9taXNlXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBCYXR0bGVVaVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IE1vbnN0ZXJSZW5kZXJlciBmcm9tICcuLi92aWV3cy9Nb25zdGVyUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcykge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBTcGlydGUgQXNzb2NpYXRlZCB3aXRoIHRoZSBQbGF5ZXJcbiAgICAgICAgdGhpcy5zcHJpdGVSZXNvdXJjZSA9ICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvbmVjcm8tc3ByaXRlLnBuZyc7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBNb25zdGVyUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlT2JqZWN0IGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU9iamVjdCB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgSk9CX0NMQUlSVk9ZQU5UKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvY2xhaXJ2b3lhbnQtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogICAnY2xhaXJ2b3lhbnQnXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGF0aWMgZ2V0IEpPQl9IRVJCQUxJU1QoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9oZXJiYWxpc3Qtc2hlZXQucG5nJyxcbiAgICAgICAgICAgICduYW1lJzogJ2hlcmJhbGlzdCdcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX1ZJTExBSU4oKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnc3ByaXRlJzogJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy92aWxsYWluMi1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAndmlsbGFpbidcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBnZXQgSk9CX0tOSUdIVCgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdzcHJpdGUnOiAnZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL2tuaWdodC1zaGVldC5wbmcnLFxuICAgICAgICAgICAgJ25hbWUnOiAna25pZ2h0J1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgbmFtZSwgam9iKSB7XG4gICAgICAgIHN1cGVyKHhQb3MsIHlQb3MpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgdGhpcy5qb2IgPSBqb2I7XG4gICAgICAgIC8vIERlZmluZSB0aGUgU3BpcnRlIEFzc29jaWF0ZWQgd2l0aCB0aGUgUGxheWVyXG4gICAgICAgIHRoaXMuc3ByaXRlUmVzb3VyY2UgPSBqb2Iuc3ByaXRlO1xuXG4gICAgICAgIHRoaXMuaXNXYWxraW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgICBmcm9tICcuL0Jhc2VPYmplY3QnO1xuaW1wb3J0IFJvb21SZW5kZXJlciBmcm9tICcuLi92aWV3cy9Sb29tUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgLy8gU3RhdGljIFJvb20gVHlwZXNcbiAgICBzdGF0aWMgZ2V0IFRZUEVfQ0FWRSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZsb29yOiAnZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL2dvb2R0aWxlLnBuZycsXG4gICAgICAgICAgICB3YWxsOiAnZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL3BpbGxhcnMucG5nJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfT1VUU0lERSgpIHsgcmV0dXJuICdkaXN0L3Jlc291cmNlcy9pbWFnZXMvZ3Jhc3MucG5nJzt9XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlLCBlbmVtaWVzLCBwbGF5ZXJzLCBlbmNvdW50ZXJSYXRlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5mbG9vclJlc291cmNlICA9IHR5cGUuZmxvb3I7XG4gICAgICAgIHRoaXMud2FsbFJlc291cmNlICAgPSB0eXBlLndhbGw7XG5cbiAgICAgICAgdGhpcy5pc01vdmluZyAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcyAgICAgICAgPSBlbmVtaWVzO1xuICAgICAgICB0aGlzLnBsYXllcnMgICAgICAgID0gcGxheWVycztcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgICAgICA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZW5jb3VudGVyUmF0ZSA9IGVuY291bnRlclJhdGUgfHwgNTA7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlTmV4dEVuY291bnRlcigpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUm9vbVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb29rRm9yVHJvdWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb29raW5nKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmlzQmF0dGxlKSB0aGlzLmVuZEJhdHRsZSgpO1xuICAgICAgICB0aGlzLmlzTW92aW5nICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcExvb2tpbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0xvb2tpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5kQmF0dGxlKCkge1xuICAgICAgICBpZih0aGlzLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQmF0dGxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuZm9yRWFjaCgoZW5lbXkpPT57XG4gICAgICAgICAgICAgICAgZW5lbXkudG9nZ2xlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVOZXh0RW5jb3VudGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEJhdHRsZSgpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbmVteSk9PntcbiAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlTmV4dEVuY291bnRlcigpIHtcbiAgICAgICAgdmFyIG15UmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAvdGhpcy5lbmNvdW50ZXJSYXRlKTtcbiAgICAgICAgdGhpcy5uZXh0RW5jb3VudGVyID0gbXlSYW5kKjUwICsgMjU7XG4gICAgfVxuXG4gICAgdGljaygpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSB0aGlzLnRpY2tDb3VudCB8fCAwO1xuICAgICAgICBpZih0aGlzLmlzTG9va2luZykge1xuICAgICAgICAgICAgLy90aGlzLnRpY2tDb3VudCsrO1xuICAgICAgICAgICAgaWYodGhpcy50aWNrQ291bnQgPiB0aGlzLm5leHRFbmNvdW50ZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0QmF0dGxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgsIGZyYW1lKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9VaVJlbmRlcmVyJztcbmltcG9ydCBCYXNlT2JqZWN0IGZyb20gJy4vQmFzZU9iamVjdCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU9iamVjdCB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZIC0gJSBZIG9mZnNldFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5iZyAgICAgID0gJ2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy91aS1iZy5wbmcnO1xuICAgICAgICB0aGlzLndpZHRoICAgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLm9mZnNldFggPSBvZmZzZXRYO1xuICAgICAgICB0aGlzLm9mZnNldFkgPSBvZmZzZXRZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemF0aW9uIFByb21pc2VcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFVpUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyICAgZnJvbSAnLi9Mb2dnZXInO1xuaW1wb3J0IEhvc3RDb250cm9sbGVyICAgZnJvbSAnLi4vY29udHJvbGxlcnMvSG9zdENvbnRyb2xsZXInO1xuaW1wb3J0IENsaWVudENvbnRyb2xsZXIgICBmcm9tICcuLi9jb250cm9sbGVycy9DbGllbnRDb250cm9sbGVyJztcbmltcG9ydCBQbGF5ZXIgICBmcm9tICcuLi9tb2RlbHMvUGxheWVyJztcbmltcG9ydCBNb25zdGVyICBmcm9tICcuLi9tb2RlbHMvTW9uc3Rlcic7XG5pbXBvcnQgUm9vbSAgICAgZnJvbSAnLi4vbW9kZWxzL1Jvb20nO1xuaW1wb3J0IFVpICAgICAgIGZyb20gJy4uL21vZGVscy9VaSc7XG5pbXBvcnQgQmF0dGxlVWkgZnJvbSAnLi4vbW9kZWxzL0JhdHRsZVVpJztcbmltcG9ydCBVdGlscyAgICBmcm9tICcuL1V0aWxzJztcbmltcG9ydCBDb25maWcgICBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5fY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgIH1cblxuICAgIC8vIGh0dHA6Ly9jb2RldGhlb3J5LmluL2NvbnRyb2xsaW5nLXRoZS1mcmFtZS1yYXRlLXdpdGgtcmVxdWVzdGFuaW1hdGlvbmZyYW1lL1xuICAgIGxvb3AoKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhkZWx0YSk7XG5cbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhbWUgPSB0aGlzLmZyYW1lIHx8IDE7XG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gKHRoaXMuZnJhbWUlQ29uZmlnLkZQUykgPyB0aGlzLmZyYW1lIDogMTtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgIG9iamVjdC50aWNrKCk7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJlbmRlcih0aGlzLl9jdHgsIHRoaXMuZnJhbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHRpbWVfZWwgPSAodGhpcy50aGVuIC0gdGhpcy5maXJzdCkvMTAwMDtcbiAgICAgICAgICAgICsrdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgbGV0IGZwcyA9IHBhcnNlSW50KHRoaXMuY291bnRlci90aW1lX2VsKTtcblxuICAgICAgICAgICAgbGV0IGZvbnRTaXplICAgICAgICAgID0gNSpDb25maWcuU1BSSVRFX1NDQUxFO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxUZXh0KHRoaXMuZnJhbWUgKyBcIi9cIiArIENvbmZpZy5GUFMgKyBcIiBcIiArIGZwcyArIFwiZnBzXCIsIDIwLCAyMCk7XG5cbiAgICAgICAgICAgIHRoaXMuZnJhbWUrKztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2l6ZSBIYW5kbGVyXG4gICAgICogQHRvZG86IGRvZXMgdGhpcyBiZWxvbmcgaGVyZT9cbiAgICAgKi9cbiAgICByZXNpemUoKSB7XG4gICAgICAgIENvbmZpZy5jYWxjdWxhdGUoKTtcbiAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gQ29uZmlnLkNBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IENvbmZpZy5DQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCB0aGUgZ2FtZSBnb2VzIGZ1bGwgc2NyZWVuLCB3aWxsIGZ1bGxzY3JlZW4gdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICogRm91bmQ6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GdWxsc2NyZWVuX0FQSVxuICAgICAqL1xuICAgIHJlcXVlc3RGdWxsc2NyZWVuKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbmdpbmVcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICBsZXQgcXVlcnlQYXJhbXMgPSBVdGlscy5wYXJzZVF1ZXJ5KHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgcGxheWVycyA9IFtdO1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSBbXTtcblxuICAgICAgICBsZXQgeU9mZnNldCA9IDEuNjA7XG4gICAgICAgIGxldCB4T2Zmc2V0ID0gQ29uZmlnLlRJTEVfWCAtIDM7XG5cbiAgICAgICAgY29uc29sZS5sb2cocXVlcnlQYXJhbXMuam9iKTtcbiAgICAgICAgLy8gQ3JlYXRlIDQgcGxheWVyc1xuICAgICAgICBsZXQgam9iID0gXCJcIjtcbiAgICAgICAgaWYocXVlcnlQYXJhbXMuam9iID09IFwia25pZ2h0XCIpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwia25pZ2h0XCIpO1xuICAgICAgICAgICAgam9iID0gUGxheWVyLkpPQl9LTklHSFQ7XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlQYXJhbXMuam9iID09IFwidmlsbGFpblwiKSB7XG4gICAgICAgICAgICBqb2IgPSBQbGF5ZXIuSk9CX1ZJTExBSU47XG4gICAgICAgIH0gZWxzZSBpZiAocXVlcnlQYXJhbXMuam9iID09IFwiaGVyYmFsaXN0XCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfSEVSQkFMSVNUO1xuICAgICAgICB9IGVsc2UgaWYgKHF1ZXJ5UGFyYW1zLmpvYiA9PSBcImNsYWlydm95YW50XCIpIHtcbiAgICAgICAgICAgIGpvYiA9IFBsYXllci5KT0JfQ0xBSVJWT1lBTlQ7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcDEgPSBuZXcgUGxheWVyKHhPZmZzZXQsIHlPZmZzZXQsIHF1ZXJ5UGFyYW1zLm5hbWUsIGpvYik7XG4gICAgICAgIHBsYXllcnMucHVzaChwMSk7XG5cbiAgICAgICAgLy9sZXQgcDIgPSBuZXcgUGxheWVyKCsreE9mZnNldCwgKyt5T2Zmc2V0LCBcIlN0b29rc1wiLCBQbGF5ZXIuSk9CX0NMQUlSVk9ZQU5UKTtcbiAgICAgICAgLy9wbGF5ZXJzLnB1c2gocDIpO1xuICAgICAgICAvL2xldCBwMyA9IG5ldyBQbGF5ZXIoLS14T2Zmc2V0LCArK3lPZmZzZXQsIFwiTWVjaGFcIiwgUGxheWVyLkpPQl9WSUxMQUlOKTtcbiAgICAgICAgLy9wbGF5ZXJzLnB1c2gocDMpO1xuICAgICAgICAvL2xldCBwNCA9IG5ldyBQbGF5ZXIoKyt4T2Zmc2V0LCArK3lPZmZzZXQsIFwiU3BhY2UgU3F1aWRcIiwgUGxheWVyLkpPQl9IRVJCQUxJU1QpO1xuICAgICAgICAvL3BsYXllcnMucHVzaChwNCk7XG5cbiAgICAgICAgLy8gSW5pdCBhbGwgcGxheWVyc1xuICAgICAgICBwcm9taXNlcy5wdXNoKHAxLmluaXQoKSk7XG4gICAgICAgIC8vcHJvbWlzZXMucHVzaChwMi5pbml0KCkpO1xuICAgICAgICAvL3Byb21pc2VzLnB1c2gocDMuaW5pdCgpKTtcbiAgICAgICAgLy9wcm9taXNlcy5wdXNoKHA0LmluaXQoKSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gcGxheWVycztcblxuICAgICAgICAvLy8vIEFkZCBhIGJhZGRpZVxuICAgICAgICB0aGlzLm5lY3JvID0gbmV3IE1vbnN0ZXIoMSwgMSk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy5uZWNyby5pbml0KCkpO1xuICAgICAgICB0aGlzLm5lY3JvLmhpZGUoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIFVJXG4gICAgICAgIHRoaXMudWkgPSBuZXcgQmF0dGxlVWkoMCwgMCwgMCwgMCwgcGxheWVycywgcGxheWVycyk7XG4gICAgICAgIHByb21pc2VzLnB1c2godGhpcy51aS5pbml0KCkpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgUm9vbVxuICAgICAgICB0aGlzLnJvb20gPSBuZXcgUm9vbShSb29tLlRZUEVfQ0FWRSwgW3RoaXMubmVjcm9dLCB0aGlzLnBsYXllcnMpO1xuICAgICAgICBwcm9taXNlcy5wdXNoKHRoaXMucm9vbS5pbml0KCkpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbGwgb2JqZWN0c1xuICAgICAgICB0aGlzLm9iamVjdHMgPSBbdGhpcy5yb29tLCAuLi50aGlzLnBsYXllcnMsIHRoaXMubmVjcm8sIHRoaXMudWldO1xuICAgICAgICAvL3RoaXMub2JqZWN0cyA9IFt0aGlzLnJvb20sIC4uLnRoaXMucGxheWVycywgdGhpcy5uZWNyb107XG5cbiAgICAgICAgLy8gQXR0YWNoIGlucHV0IGxpc3RlbmVyc1xuICAgICAgICAvLyB1c2luZyBodHRwczovL2RtYXVyby5naXRodWIuaW8vS2V5cHJlc3MvXG4gICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgd2luZG93LmtleXByZXNzLkxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuYXR0YWNoSW5wdXQodGhpcy5saXN0ZW5lcik7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBNdWx0aXBsYXllciBDb250cm9sbGVyXG4gICAgICAgIGlmKHF1ZXJ5UGFyYW1zLmhvc3QpIHtcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyID0gbmV3IENsaWVudENvbnRyb2xsZXIocXVlcnlQYXJhbXMuaG9zdCwgcDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIgPSBuZXcgSG9zdENvbnRyb2xsZXIocDEpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5tdWx0aXBsYXllckNvbnRyb2xsZXIub24oXCJwbGF5ZXItY29ubmVjdFwiLCAocGxheWVyKT0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJhZGQgcGxheWVyXCIpO1xuICAgICAgICAgICAgbGV0IHAgPSBuZXcgUGxheWVyKHhPZmZzZXQsICsreU9mZnNldCwgcGxheWVyLm5hbWUsIHBsYXllci5qb2IpO1xuICAgICAgICAgICAgcC5pbml0KCkudGhlbigoKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycy5wdXNoKHApO1xuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKHApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJDb250cm9sbGVyLm9uKFwiY2xpY2tcIiwgKHBsYXllcik9PntcbiAgICAgICAgICAgIGlmKCF0aGlzLnJvb20uaXNMb29raW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLmxvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5yb29tLmVuZEJhdHRsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5zdG9wTG9va2luZygpOy8vbG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcHJvbWlzZXMucHVzaCh0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5pbml0KCkpO1xuXG4gICAgICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpPT57XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAvQ29uZmlnLkZQUztcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSB0aGlzLnRoZW47XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG5cblxuICAgICAgICAvLyBBdHRhY2ggcmVzaXplIGV2ZW50XG4gICAgICAgIC8vd2luZG93LnJlc2l6ZSA9IHRoaXMucmVzaXplLmJpbmQodGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMucmVzaXplLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIEF0dGFjaCBGdWxsc2NyZWVuIGV2ZW50XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLnJlcXVlc3RGdWxsc2NyZWVuLmJpbmQodGhpcykpO1xuXG4gICAgICAgIExvZ2dlci5iYW5uZXIoJ0dhbWUgU3RhcnRlZCcpO1xuICAgIH1cblxuICAgIGF0dGFjaElucHV0KGxpc3RlbmVyKSB7XG5cbiAgICAgICAgZnVuY3Rpb24gbG9va0ZvclRyb3VibGUoKSB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5jbGljaygpO1xuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20ubG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnJvb20uZW5kQmF0dGxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLnN0b3BMb29raW5nKCk7Ly9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgd2luZG93Lm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm11bHRpcGxheWVyQ29udHJvbGxlci5jbGljaygpO1xuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20ubG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnJvb20uZW5kQmF0dGxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLnN0b3BMb29raW5nKCk7Ly9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInRcIiwgKCk9PntcbiAgICAgICAgICAgIGxvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgYmFubmVyKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhgJWMke21zZy50b1VwcGVyQ2FzZSgpfWAsICdmb250LXNpemU6IDMwcHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2cobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKG1zZyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGVycm9yKG1zZykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1zZyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBsaW1pdGxvb3AoZm4sIGZwcykge1xuICAgICAgICAvLyBVc2UgdmFyIHRoZW4gPSBEYXRlLm5vdygpOyBpZiB5b3VcbiAgICAgICAgLy8gZG9uJ3QgY2FyZSBhYm91dCB0YXJnZXR0aW5nIDwgSUU5XG4gICAgICAgIHZhciB0aGVuID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gY3VzdG9tIGZwcywgb3RoZXJ3aXNlIGZhbGxiYWNrIHRvIDYwXG4gICAgICAgIGZwcyA9IGZwcyB8fCA2MDtcbiAgICAgICAgdmFyIGludGVydmFsID0gMTAwMCAvIGZwcztcblxuICAgICAgICByZXR1cm4gKGZ1bmN0aW9uIGxvb3AodGltZSl7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCk7XG5cbiAgICAgICAgICAgIC8vIGFnYWluLCBEYXRlLm5vdygpIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgICAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSBub3cgLSB0aGVuO1xuXG4gICAgICAgICAgICBpZiAoZGVsdGEgPiBpbnRlcnZhbCkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aW1lXG4gICAgICAgICAgICAgICAgLy8gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpIGlzIGFuIGltcHJvdmVtZW50IG92ZXIganVzdCBcbiAgICAgICAgICAgICAgICAvLyB1c2luZyB0aGVuID0gbm93LCB3aGljaCBjYW4gZW5kIHVwIGxvd2VyaW5nIG92ZXJhbGwgZnBzXG4gICAgICAgICAgICAgICAgdGhlbiA9IG5vdyAtIChkZWx0YSAlIGludGVydmFsKTtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGwgdGhlIGZuXG4gICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSgwKSk7XG4gICAgfTtcblxuICAgIHN0YXRpYyBhc3BlY3RIZWlnaHRDYWxjKHcyKSB7XG4gICAgICAgIGxldCB3MSA9IDE5MjA7XG4gICAgICAgIGxldCBoMSA9IDEwODA7XG4gICAgICAgIHJldHVybiBoMSp3Mi93MTtcbiAgICB9XG5cbiAgICBzdGF0aWMgcGFyc2VRdWVyeShzZWFyY2gpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBzZWFyY2guc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XG5cbiAgICAgICAgdmFyIGFyZ3NQYXJzZWQgPSB7fTtcblxuICAgICAgICB2YXIgaSwgYXJnLCBrdnAsIGtleSwgdmFsdWU7XG5cbiAgICAgICAgZm9yIChpPTA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGFyZyA9IGFyZ3NbaV07XG5cbiAgICAgICAgICAgIGlmICgtMSA9PT0gYXJnLmluZGV4T2YoJz0nKSkge1xuXG4gICAgICAgICAgICAgICAgYXJnc1BhcnNlZFtkZWNvZGVVUklDb21wb25lbnQoYXJnKS50cmltKCldID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuXG4gICAgICAgICAgICAgICAga3ZwID0gYXJnLnNwbGl0KCc9Jyk7XG5cbiAgICAgICAgICAgICAgICBrZXkgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzBdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChrdnBbMV0pLnRyaW0oKTtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFyZ3NQYXJzZWQ7XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpUmVuZGVyZXIgZnJvbSAnLi9VaVJlbmRlcmVyJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBVaVJlbmRlcmVyIHtcbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcihjdHgpO1xuXG4gICAgICAgIGxldCBmb250U2l6ZSAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgIGxldCB5cG9zID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCk7XG4gICAgICAgIGxldCB4cG9zID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ggLSA0KVxuICAgICAgICB0aGlzLnVpLnBsYXllckNoYXJhY3RlcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgeXBvcyArPSBmb250U2l6ZSoyO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlUmVuZGVyZXIgZnJvbSAnLi9TcHJpdGVSZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFNwcml0ZVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LnNwcml0ZVJlc291cmNlKTtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICB0aGlzLmltYWdlLndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIGZyYW1lLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLmltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlUmVuZGVyZXIgZnJvbSAnLi9TcHJpdGVSZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFNwcml0ZVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LnNwcml0ZVJlc291cmNlKTtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuc2hhZG93LFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB0aGlzLm9iamVjdC54UG9zKihDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgdGhpcy5vYmplY3QueVBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpICsgKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSAtIChDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuc2hhZG93LmhlaWdodC8xLjc1KSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UsXG4gICAgICAgICAgICB0aGlzLm9iamVjdC5pc1dhbGtpbmcgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUpIDogMCwgLy8gRFhcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICB0aGlzLm9iamVjdC54UG9zKihDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSksIC8vIHN4IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBYIFBvc1xuICAgICAgICAgICAgdGhpcy5vYmplY3QueVBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFICAvLyBzSGVpZ2h0XG4gICAgICAgIF0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlUmVuZGVyZXIgZnJvbSAnLi9TcHJpdGVSZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFNwcml0ZVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5mbG9vclJlc291cmNlID0gb2JqZWN0LmZsb29yUmVzb3VyY2U7XG4gICAgICAgIHRoaXMud2FsbFJlc291cmNlICA9IG9iamVjdC53YWxsUmVzb3VyY2U7XG5cbiAgICAgICAgdGhpcy5yb29tID0gb2JqZWN0O1xuICAgICAgICB0aGlzLl9vZmZzZXRYID0gMDtcbiAgICAgICAgdGhpcy53YWxsT2Zmc2V0ID0gMDtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMuZmxvb3JJbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgICAgIHRoaXMuZmxvb3JJbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmZsb29ySW1hZ2Uuc3JjID0gdGhpcy5mbG9vclJlc291cmNlO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxJbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLndhbGxJbWFnZS5zcmMgPSB0aGlzLndhbGxSZXNvdXJjZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG5cbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5USUxFX1grMTsgeCsrKSB7XG4gICAgICAgICAgICBmb3IobGV0IHkgPSAwOyB5IDwgQ29uZmlnLlRJTEVfWSAtIDI7IHkrKykge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZsb29ySW1hZ2UsXG4gICAgICAgICAgICAgICAgICAgICh4KkNvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSAtIChDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSkgKyB0aGlzLl9vZmZzZXRYLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICAoeSsyKSpDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gRFhcbiAgICAgICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuQ0FOVkFTX1dJRFRILyh0aGlzLndhbGxJbWFnZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFKSArIDE7IHgrKykge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2UsXG4gICAgICAgICAgICAgICAgdGhpcy53YWxsT2Zmc2V0ICsgKHRoaXMud2FsbEltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUqeCkgLSAodGhpcy53YWxsSW1hZ2Uud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSksXG4gICAgICAgICAgICAgICAgMCxcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxJbWFnZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxJbWFnZS5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRSAvLyBzV2lkdGhcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5yb29tLmlzTW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXRYICs9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzE2O1xuICAgICAgICAgICAgaWYodGhpcy5fb2Zmc2V0WCA+PSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSAtIDEpIHRoaXMuX29mZnNldFggPSAwO1xuXG4gICAgICAgICAgICB0aGlzLndhbGxPZmZzZXQgKz0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgICAgICBpZih0aGlzLndhbGxPZmZzZXQgPiB0aGlzLndhbGxJbWFnZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFIC0gMSkgdGhpcy53YWxsT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKHNwcml0ZVJlc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zaGFkb3dJbWFnZSA9ICcuL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9zaGFkb3cucG5nJztcblxuICAgICAgICBpZihzcHJpdGVSZXNvdXJjZSkge1xuICAgICAgICAgICAgdGhpcy5fc3ByaXRlUmVzb3VyY2UgPSBzcHJpdGVSZXNvdXJjZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl9zcHJpdGVSZXNvdXJjZTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93Lm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hhZG93LnNyYyA9IHRoaXMuc2hhZG93SW1hZ2U7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIF0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IodWkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51aSA9IHVpO1xuICAgICAgICB0aGlzLl91aUJnID0gdWkuYmc7XG4gICAgICAgIHRoaXMuX3RpbGVIZWlnaHQgPSAyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdGhpcy5fdWlCZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgbGV0IGJnUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0IC0gMzAwXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IHVpUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC4uLmJnUmVjdCk7XG5cbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwiIzY0QTM1N1wiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwiIzAwMzcwMFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3QoLi4udWlSZWN0KTtcblxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM4RDgwNDVcIjtcblxuICAgICAgICAvLyBUaGUgc3Ryb2tlIGlzIG1pZGRsZSBhbGlnbmVkIHdpdGggdGhlIGVkZ2VzIG9mIHRoZSBib3hcbiAgICAgICAgbGV0IGxpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzMyO1xuICAgICAgICAvL2xldCBsaW5lV2lkdGggPSA1O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIGxldCBzdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIHN0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICBzdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBUcnlpbmcgdG8gZ2V0IHNlY29uZCBib3JkZXJcbiAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSBcIiNGRkZGRkZcIjtcblxuICAgICAgICAvL2xpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzQ4O1xuICAgICAgICAvL2N0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9zdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIC8vc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgLy9zdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICAvL3N0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIC8vY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gRmlsbCBiZyB3aXRoIHBhdGVyblxuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMTtcbiAgICAgICAgbGV0IHBhdGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuaW1hZ2UsIFwicmVwZWF0XCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0ZXJuO1xuICAgICAgICBjdHgucmVjdCguLi5zdHJva2VSZWN0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgfVxufVxuIl19
