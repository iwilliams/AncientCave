(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appServicesEngine = require('./app/services/Engine');

var _appServicesEngine2 = _interopRequireDefault(_appServicesEngine);

// Create new instance of game
var game = new _appServicesEngine2['default'](document.body);

// Initialize it
game.init();

},{"./app/services/Engine":9}],2:[function(require,module,exports){
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
    config.PERCENTAGE = .90;

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

    config.TILE_X = 16; // MUST BE MULTIPLE OF 16
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

},{"../views/ObjectRenderer":14}],4:[function(require,module,exports){
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

},{"../views/BattleUiRenderer":12,"./Ui":8}],5:[function(require,module,exports){
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
        this.spriteResource = '/dist/resources/images/necro-sprite.png';
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

},{"../views/MonsterRenderer":13,"./BaseObject":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseObject2 = require('./BaseObject');

var _BaseObject3 = _interopRequireDefault(_BaseObject2);

// Can't call this Object b/c of conflict xD

var _default = (function (_BaseObject) {
    _inherits(_default, _BaseObject);

    function _default(xPos, yPos, name) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, xPos, yPos);

        this.name = name;

        // Define the Spirte Associated with the Player
        this.spriteResource = '/dist/resources/images/clairvoyant-sheet.png';
        //this.spriteResource = '/dist/resources/images/astrologist.png';

        this.isWalking = false;
    }

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"./BaseObject":3}],7:[function(require,module,exports){
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
            return '/dist/resources/images/ffv-bg.png';
        }
    }, {
        key: 'TYPE_OUTSIDE',
        get: function get() {
            return '/dist/resources/images/ffv-bg2.png';
        }
    }]);

    function _default(type, enemies, players, encounterRate) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
        this.roomBgResource = type;
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
                this.tickCount++;
                console.log('tick');
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

},{"../views/RoomRenderer":16,"./BaseObject":3}],8:[function(require,module,exports){
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
        this.bg = '/dist/resources/images/ui-bg.png';
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

},{"../views/UiRenderer":18,"./BaseObject":3}],9:[function(require,module,exports){
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
                this._ctx.fillStyle = "#000";
                this._ctx.fillRect(0, 0, _Config2['default'].CANVAS_WIDTH, _Config2['default'].CANVAS_HEIGHT);

                this.objects.forEach(function (object) {
                    _this._ctx.save();
                    object.tick();
                    object.render(_this._ctx, _this.frame);
                    _this._ctx.restore();
                });

                var time_el = (this.then - this.first) / 1000;
                ++this.counter;
                var fps = this.counter / time_el;

                var fontSize = 5 * _Config2['default'].SPRITE_SCALE;
                this._ctx.font = fontSize + "px Courier New";
                this._ctx.fillStyle = "#ffffff";

                this._ctx.fillText(this.frame + "/" + _Config2['default'].FPS + " " + fps, 200, 50);

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

            this._element.appendChild(this._canvas);
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;

            var players = [];
            var playerPromises = [];

            var yOffset = 4;

            // Create 4 players
            var p1 = new _modelsPlayer2['default'](13, yOffset, "ROMEDA");
            players.push(p1);
            var p2 = new _modelsPlayer2['default'](14, ++yOffset, "Stooks");
            players.push(p2);
            var p3 = new _modelsPlayer2['default'](13, ++yOffset, "Mecha");
            players.push(p3);
            var p4 = new _modelsPlayer2['default'](14, ++yOffset, "Space Squid");
            players.push(p4);

            // Init all players
            playerPromises.push(p1.init());
            playerPromises.push(p2.init());
            playerPromises.push(p3.init());
            playerPromises.push(p4.init());

            this.players = players;

            //// Add a baddie
            this.necro = new _modelsMonster2['default'](1, 1);
            playerPromises.push(this.necro.init());
            this.necro.hide();

            // Initialize UI
            this.ui = new _modelsBattleUi2['default'](0, 0, 0, 0, players, players);
            playerPromises.push(this.ui.init());

            // Initialize Room
            this.room = new _modelsRoom2['default'](_modelsRoom2['default'].TYPE_CAVE, [this.necro], this.players);
            playerPromises.push(this.room.init());

            // Create all objects
            //this.objects = [this.room, ...this.players, this.necro, this.ui];
            this.objects = [this.room].concat(_toConsumableArray(this.players), [this.necro]);

            Promise.all(playerPromises).then(function () {
                _this2.then = Date.now();
                _this2.interval = 1000 / _Config2['default'].FPS;
                _this2.first = _this2.then;
                _this2.counter = 0;
                window.requestAnimationFrame(_this2.loop.bind(_this2));
            });

            // Attach input listeners
            // using https://dmauro.github.io/Keypress/
            this.listener = new window.keypress.Listener();
            this.attachInput(this.listener);

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

            //listener.register_combo({
            //"keys"              : "a",
            //"on_keydown"        : () => {
            //this.players[0].walk('w');
            //}.bind(this),
            //"on_release"        : () => {
            //this.players[0].stopWalking();
            //}.bind(this),
            //"this"              : this,
            //"prevent_default"   : true,
            //"prevent_repeat"    : true,
            //});

            //listener.register_combo({
            //"keys"              : "w",
            //"on_keydown"        : () => {
            //this.players[0].walk('n');
            //}.bind(this),
            //"on_release"        : () => {
            //this.players[0].stopWalking();
            //}.bind(this),
            //"this"              : this,
            //"prevent_default"   : true,
            //"prevent_repeat"    : true,
            //});

            //listener.register_combo({
            //"keys"              : "d",
            //"on_keydown"        : () => {
            //this.players[0].walk('e');
            //}.bind(this),
            //"on_release"        : () => {
            //this.players[0].stopWalking();
            //}.bind(this),
            //"this"              : this.players[0],
            //"prevent_default"   : true,
            //"prevent_repeat"    : true,
            //});

            //listener.register_combo({
            //"keys"              : "s",
            //"on_keydown"        : () => {
            //this.players[0].walk('s');
            //}.bind(this),
            //"on_release"        : () => {
            //this.players[0].stopWalking();
            //}.bind(this),
            //"this"              : this.players[0],
            //"prevent_default"   : true,
            //"prevent_repeat"    : true,
            //});

            listener.simple_combo("t", function () {
                // Toggle walking and battle
                if (!_this3.room.isBattle) {
                    _this3.room.lookForTrouble();
                } else {
                    _this3.room.endBattle();
                    _this3.room.lookForTrouble();
                }
                //this.necro.toggle();
            });
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../models/BattleUi":4,"../models/Monster":5,"../models/Player":6,"../models/Room":7,"../models/Ui":8,"./Logger":10,"./Utils":11}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _default = (function () {
    function _default() {
        _classCallCheck(this, _default);
    }

    _createClass(_default, null, [{
        key: "limitloop",
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
        key: "aspectHeightCalc",
        value: function aspectHeightCalc(w2) {
            var w1 = 1920;
            var h1 = 1080;
            return h1 * w2 / w1;
        }
    }]);

    return _default;
})();

exports["default"] = _default;
module.exports = exports["default"];

},{}],12:[function(require,module,exports){
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

},{"../../Config":2,"./UiRenderer":18}],13:[function(require,module,exports){
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

},{"../../Config":2,"../services/Utils":11,"./SpriteRenderer":17}],14:[function(require,module,exports){
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

},{"../../Config":2,"../services/Utils":11,"./SpriteRenderer":17}],15:[function(require,module,exports){
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

},{}],16:[function(require,module,exports){
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

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, object.roomBgResource);

        this.room = object;
        this._offsetX = 0;
    }

    _createClass(_default, [{
        key: 'render',
        value: function render(ctx, frame) {

            ctx.drawImage.apply(ctx, [this.image, this._offsetX - _Config2['default'].CANVAS_WIDTH, // DX
            0, // DY
            _Config2['default'].CANVAS_WIDTH, // dWidth
            _Config2['default'].CANVAS_HEIGHT]);

            // dHeight
            ctx.drawImage.apply(ctx, [this.image, this._offsetX, // DX
            0, // DY
            _Config2['default'].CANVAS_WIDTH, // dWidth
            _Config2['default'].CANVAS_HEIGHT]);

            // dHeight
            if (this.room.isMoving) {
                this._offsetX += 10;
                if (this._offsetX > _Config2['default'].CANVAS_WIDTH) this._offsetX = 0;
            }
        }
    }]);

    return _default;
})(_SpriteRenderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":11,"./SpriteRenderer":17}],17:[function(require,module,exports){
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
        this._spriteResource = spriteResource;
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
                _this.image.src = _this._spriteResource;
            });
        }
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":11,"./Renderer":15}],18:[function(require,module,exports){
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

},{"../../Config":2,"./Renderer":15}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvT2JqZWN0UmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Nwcml0ZVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7aUNDQW1CLHVCQUF1Qjs7Ozs7QUFHMUMsSUFBSSxJQUFJLEdBQUcsbUNBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ05aLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXO0FBQzFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDOzs7QUFHeEIsVUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsVUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTVCLFVBQU0sQ0FBQyxZQUFZLEdBQUksTUFBTSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQzNELFVBQU0sQ0FBQyxhQUFhLEdBQUcsQUFBQyxNQUFNLENBQUMsWUFBWSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7O0FBR3RGLFFBQUcsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzFDLGNBQU0sQ0FBQyxh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O0FBQ3pCLGVBQUcsQ0FBQyxRQUFRLE1BQUEsQ0FBWixHQUFHLEVBQWEsTUFBTSxDQUFDLENBQUM7O0FBRXhCLGVBQUcsQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDOzs7QUFHNUIsZ0JBQUksU0FBUyxHQUFHLG9CQUFPLFdBQVcsR0FBQyxvQkFBTyxZQUFZLEdBQUMsRUFBRSxDQUFDOztBQUUxRCxlQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7QUFFMUIsZ0JBQUksVUFBVSxhQUFPLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFDLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7QUFDM0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7O0FBRTNCLGVBQUcsQ0FBQyxVQUFVLE1BQUEsQ0FBZCxHQUFHLHFCQUFlLFVBQVUsRUFBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQjlCLGVBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLGdCQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsZUFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsZUFBRyxDQUFDLElBQUksTUFBQSxDQUFSLEdBQUcscUJBQVMsVUFBVSxFQUFDLENBQUM7QUFDeEIsZUFBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVYLGVBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL3NlcnZpY2VzL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGdhbWUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuXG4vLyBJbml0aWFsaXplIGl0XG5nYW1lLmluaXQoKTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG5jb25maWcuY2FsY3VsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uZmlnLlBFUkNFTlRBR0UgPSAuOTA7XG5cbiAgICAvLyAxNng5IEFzcGVjdCBSYXRpb1xuICAgIGNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbiAgICBjb25maWcuQVNQRUNUX0hFSUdIVCA9IDEwODA7XG5cbiAgICBjb25maWcuQ0FOVkFTX1dJRFRIICA9IHdpbmRvdy5vdXRlcldpZHRoKmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgaWYoY29uZmlnLkNBTlZBU19IRUlHSFQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICBjb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIH1cblxuICAgIGNvbmZpZy5USUxFX1ggPSAxNjsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuICAgIGNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG5cbiAgICBjb25maWcuRlBTID0gMzA7XG59XG5cbmNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IE9iamVjdFJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL09iamVjdFJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcykge1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zIHx8IDA7XG4gICAgICAgIHRoaXMueVBvcyA9IHlQb3MgfHwgMDtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgT2JqZWN0UmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4LCBmcmFtZSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpIGZyb20gJy4vVWknO1xuaW1wb3J0IEJhdHRsZVVpUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvQmF0dGxlVWlSZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgICAgICAgICAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgICAgICAgICAgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAgICAgICAgICAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAgICAgICAgICAtICUgWSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gcGxheWVyQ2hhcmFjdGVycyAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKiBAcGFyYW0gZW5lbWllcyAgICAgICAgICAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZLCBwbGF5ZXJDaGFyYWN0ZXJzLCBlbmVtaWVzKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpO1xuXG4gICAgICAgIHRoaXMucGxheWVyQ2hhcmFjdGVycyA9IHBsYXllckNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMuZW5lbWllcyAgICAgICAgICA9IGVuZW1pZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgQmF0dGxlVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcbmltcG9ydCBNb25zdGVyUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvTW9uc3RlclJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MpIHtcbiAgICAgICAgc3VwZXIoeFBvcywgeVBvcyk7XG4gICAgICAgIC8vIERlZmluZSB0aGUgU3BpcnRlIEFzc29jaWF0ZWQgd2l0aCB0aGUgUGxheWVyXG4gICAgICAgIHRoaXMuc3ByaXRlUmVzb3VyY2UgPSAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9uZWNyby1zcHJpdGUucG5nJztcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IE1vbnN0ZXJSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MsIG5hbWUpIHtcbiAgICAgICAgc3VwZXIoeFBvcywgeVBvcyk7XG5cbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIFNwaXJ0ZSBBc3NvY2lhdGVkIHdpdGggdGhlIFBsYXllclxuICAgICAgICB0aGlzLnNwcml0ZVJlc291cmNlID0gJy9kaXN0L3Jlc291cmNlcy9pbWFnZXMvY2xhaXJ2b3lhbnQtc2hlZXQucG5nJztcbiAgICAgICAgLy90aGlzLnNwcml0ZVJlc291cmNlID0gJy9kaXN0L3Jlc291cmNlcy9pbWFnZXMvYXN0cm9sb2dpc3QucG5nJztcblxuICAgICAgICB0aGlzLmlzV2Fsa2luZyA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlT2JqZWN0ICAgZnJvbSAnLi9CYXNlT2JqZWN0JztcbmltcG9ydCBSb29tUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvUm9vbVJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBUWVBFX0NBVkUoKSAgICB7IHJldHVybiAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9mZnYtYmcucG5nJzt9XG4gICAgc3RhdGljIGdldCBUWVBFX09VVFNJREUoKSB7IHJldHVybiAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9mZnYtYmcyLnBuZyc7fVxuXG4gICAgY29uc3RydWN0b3IodHlwZSwgZW5lbWllcywgcGxheWVycywgZW5jb3VudGVyUmF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnJvb21CZ1Jlc291cmNlID0gdHlwZTtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICAgICAgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcyAgICAgICAgPSBlbmVtaWVzO1xuICAgICAgICB0aGlzLnBsYXllcnMgICAgICAgID0gcGxheWVycztcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgICAgICA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuZW5jb3VudGVyUmF0ZSA9IGVuY291bnRlclJhdGUgfHwgNTA7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlTmV4dEVuY291bnRlcigpO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgUm9vbVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBsb29rRm9yVHJvdWJsZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb29raW5nKSByZXR1cm47XG4gICAgICAgIGlmICh0aGlzLmlzQmF0dGxlKSB0aGlzLmVuZEJhdHRsZSgpO1xuICAgICAgICB0aGlzLmlzTW92aW5nICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc3RvcExvb2tpbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0xvb2tpbmcpIHJldHVybjtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0xvb2tpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZW5kQmF0dGxlKCkge1xuICAgICAgICBpZih0aGlzLmlzQmF0dGxlKSB7XG4gICAgICAgICAgICB0aGlzLmlzQmF0dGxlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVuZW1pZXMuZm9yRWFjaCgoZW5lbXkpPT57XG4gICAgICAgICAgICAgICAgZW5lbXkudG9nZ2xlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVOZXh0RW5jb3VudGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdGFydEJhdHRsZSgpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmlzQmF0dGxlICA9IHRydWU7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKChlbmVteSk9PntcbiAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlTmV4dEVuY291bnRlcigpIHtcbiAgICAgICAgdmFyIG15UmFuZCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDAvdGhpcy5lbmNvdW50ZXJSYXRlKTtcbiAgICAgICAgdGhpcy5uZXh0RW5jb3VudGVyID0gbXlSYW5kKjUwICsgMjU7XG4gICAgfVxuXG4gICAgdGljaygpIHtcbiAgICAgICAgdGhpcy50aWNrQ291bnQgPSB0aGlzLnRpY2tDb3VudCB8fCAwO1xuICAgICAgICBpZih0aGlzLmlzTG9va2luZykge1xuICAgICAgICAgICAgdGhpcy50aWNrQ291bnQrKztcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0aWNrJyk7XG4gICAgICAgICAgICBpZih0aGlzLnRpY2tDb3VudCA+IHRoaXMubmV4dEVuY291bnRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCYXR0bGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKGN0eCwgZnJhbWUpO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL1VpUmVuZGVyZXInO1xuaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJnICAgICAgPSAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy91aS1iZy5wbmcnO1xuICAgICAgICB0aGlzLndpZHRoICAgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLm9mZnNldFggPSBvZmZzZXRYO1xuICAgICAgICB0aGlzLm9mZnNldFkgPSBvZmZzZXRZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemF0aW9uIFByb21pc2VcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFVpUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyICAgZnJvbSAnLi9Mb2dnZXInO1xuaW1wb3J0IFBsYXllciAgIGZyb20gJy4uL21vZGVscy9QbGF5ZXInO1xuaW1wb3J0IE1vbnN0ZXIgIGZyb20gJy4uL21vZGVscy9Nb25zdGVyJztcbmltcG9ydCBSb29tICAgICBmcm9tICcuLi9tb2RlbHMvUm9vbSc7XG5pbXBvcnQgVWkgICAgICAgZnJvbSAnLi4vbW9kZWxzL1VpJztcbmltcG9ydCBCYXR0bGVVaSBmcm9tICcuLi9tb2RlbHMvQmF0dGxlVWknO1xuaW1wb3J0IFV0aWxzICAgIGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IENvbmZpZyAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgfVxuXG4gICAgLy8gaHR0cDovL2NvZGV0aGVvcnkuaW4vY29udHJvbGxpbmctdGhlLWZyYW1lLXJhdGUtd2l0aC1yZXF1ZXN0YW5pbWF0aW9uZnJhbWUvXG4gICAgbG9vcCgpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcblxuICAgICAgICBsZXQgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgbGV0IGRlbHRhID0gbm93IC0gdGhpcy50aGVuO1xuICAgICAgICAvL2NvbnNvbGUubG9nKGRlbHRhKTtcblxuICAgICAgICBpZiAoZGVsdGEgPiB0aGlzLmludGVydmFsKSB7XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBub3cgLSAoZGVsdGEgJSB0aGlzLmludGVydmFsKTtcblxuICAgICAgICAgICAgdGhpcy5mcmFtZSA9IHRoaXMuZnJhbWUgfHwgMTtcbiAgICAgICAgICAgIHRoaXMuZnJhbWUgPSAodGhpcy5mcmFtZSVDb25maWcuRlBTKSA/IHRoaXMuZnJhbWUgOiAxO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSA9IFwiIzAwMFwiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goKG9iamVjdCk9PntcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgIG9iamVjdC50aWNrKCk7XG4gICAgICAgICAgICAgICAgb2JqZWN0LnJlbmRlcih0aGlzLl9jdHgsIHRoaXMuZnJhbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2N0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbGV0IHRpbWVfZWwgPSAodGhpcy50aGVuIC0gdGhpcy5maXJzdCkvMTAwMDtcbiAgICAgICAgICAgICsrdGhpcy5jb3VudGVyO1xuICAgICAgICAgICAgbGV0IGZwcyA9IHRoaXMuY291bnRlci90aW1lX2VsXG5cbiAgICAgICAgICAgIGxldCBmb250U2l6ZSAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICAgICAgdGhpcy5fY3R4LmZpbGxTdHlsZSAgID0gXCIjZmZmZmZmXCI7XG5cbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsVGV4dCh0aGlzLmZyYW1lICsgXCIvXCIgKyBDb25maWcuRlBTICsgXCIgXCIgKyBmcHMsIDIwMCwgNTApO1xuXG4gICAgICAgICAgICB0aGlzLmZyYW1lKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgSGFuZGxlclxuICAgICAqIEB0b2RvOiBkb2VzIHRoaXMgYmVsb25nIGhlcmU/XG4gICAgICovXG4gICAgcmVzaXplKCkge1xuICAgICAgICBDb25maWcuY2FsY3VsYXRlKCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgdGhlIGdhbWUgZ29lcyBmdWxsIHNjcmVlbiwgd2lsbCBmdWxsc2NyZWVuIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqIEZvdW5kOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRnVsbHNjcmVlbl9BUElcbiAgICAgKi9cbiAgICByZXF1ZXN0RnVsbHNjcmVlbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZW5naW5lXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBwbGF5ZXJzID0gW107XG4gICAgICAgIGxldCBwbGF5ZXJQcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gNDtcblxuICAgICAgICAvLyBDcmVhdGUgNCBwbGF5ZXJzXG4gICAgICAgIGxldCBwMSA9IG5ldyBQbGF5ZXIoMTMsIHlPZmZzZXQsIFwiUk9NRURBXCIpO1xuICAgICAgICBwbGF5ZXJzLnB1c2gocDEpO1xuICAgICAgICBsZXQgcDIgPSBuZXcgUGxheWVyKDE0LCArK3lPZmZzZXQsIFwiU3Rvb2tzXCIpO1xuICAgICAgICBwbGF5ZXJzLnB1c2gocDIpO1xuICAgICAgICBsZXQgcDMgPSBuZXcgUGxheWVyKDEzLCArK3lPZmZzZXQsIFwiTWVjaGFcIik7XG4gICAgICAgIHBsYXllcnMucHVzaChwMyk7XG4gICAgICAgIGxldCBwNCA9IG5ldyBQbGF5ZXIoMTQsICsreU9mZnNldCwgXCJTcGFjZSBTcXVpZFwiKTtcbiAgICAgICAgcGxheWVycy5wdXNoKHA0KTtcblxuICAgICAgICAvLyBJbml0IGFsbCBwbGF5ZXJzXG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2gocDEuaW5pdCgpKTtcbiAgICAgICAgcGxheWVyUHJvbWlzZXMucHVzaChwMi5pbml0KCkpO1xuICAgICAgICBwbGF5ZXJQcm9taXNlcy5wdXNoKHAzLmluaXQoKSk7XG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2gocDQuaW5pdCgpKTtcblxuICAgICAgICB0aGlzLnBsYXllcnMgPSBwbGF5ZXJzO1xuXG4gICAgICAgIC8vLy8gQWRkIGEgYmFkZGllXG4gICAgICAgIHRoaXMubmVjcm8gPSBuZXcgTW9uc3RlcigxLCAxKTtcbiAgICAgICAgcGxheWVyUHJvbWlzZXMucHVzaCh0aGlzLm5lY3JvLmluaXQoKSk7XG4gICAgICAgIHRoaXMubmVjcm8uaGlkZSgpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgVUlcbiAgICAgICAgdGhpcy51aSA9IG5ldyBCYXR0bGVVaSgwLCAwLCAwLCAwLCBwbGF5ZXJzLCBwbGF5ZXJzKTtcbiAgICAgICAgcGxheWVyUHJvbWlzZXMucHVzaCh0aGlzLnVpLmluaXQoKSk7XG5cbiAgICAgICAgLy8gSW5pdGlhbGl6ZSBSb29tXG4gICAgICAgIHRoaXMucm9vbSA9IG5ldyBSb29tKFJvb20uVFlQRV9DQVZFLCBbdGhpcy5uZWNyb10sIHRoaXMucGxheWVycyk7XG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2godGhpcy5yb29tLmluaXQoKSk7XG5cbiAgICAgICAgLy8gQ3JlYXRlIGFsbCBvYmplY3RzXG4gICAgICAgIC8vdGhpcy5vYmplY3RzID0gW3RoaXMucm9vbSwgLi4udGhpcy5wbGF5ZXJzLCB0aGlzLm5lY3JvLCB0aGlzLnVpXTtcbiAgICAgICAgdGhpcy5vYmplY3RzID0gW3RoaXMucm9vbSwgLi4udGhpcy5wbGF5ZXJzLCB0aGlzLm5lY3JvXTtcblxuXG4gICAgICAgIFByb21pc2UuYWxsKHBsYXllclByb21pc2VzKS50aGVuKCgpPT57XG4gICAgICAgICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdGhpcy5pbnRlcnZhbCA9IDEwMDAvQ29uZmlnLkZQUztcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSB0aGlzLnRoZW47XG4gICAgICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEF0dGFjaCBpbnB1dCBsaXN0ZW5lcnNcbiAgICAgICAgLy8gdXNpbmcgaHR0cHM6Ly9kbWF1cm8uZ2l0aHViLmlvL0tleXByZXNzL1xuICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuXG5cbiAgICAgICAgLy8gQXR0YWNoIHJlc2l6ZSBldmVudFxuICAgICAgICAvL3dpbmRvdy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBBdHRhY2ggRnVsbHNjcmVlbiBldmVudFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZXF1ZXN0RnVsbHNjcmVlbi5iaW5kKHRoaXMpKTtcblxuICAgICAgICBMb2dnZXIuYmFubmVyKCdHYW1lIFN0YXJ0ZWQnKTtcbiAgICB9XG5cbiAgICBhdHRhY2hJbnB1dChsaXN0ZW5lcikge1xuXG4gICAgICAgIC8vbGlzdGVuZXIucmVnaXN0ZXJfY29tYm8oe1xuICAgICAgICAgICAgLy9cImtleXNcIiAgICAgICAgICAgICAgOiBcImFcIixcbiAgICAgICAgICAgIC8vXCJvbl9rZXlkb3duXCIgICAgICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJzWzBdLndhbGsoJ3cnKTtcbiAgICAgICAgICAgIC8vfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgLy9cIm9uX3JlbGVhc2VcIiAgICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllcnNbMF0uc3RvcFdhbGtpbmcoKTtcbiAgICAgICAgICAgIC8vfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgLy9cInRoaXNcIiAgICAgICAgICAgICAgOiB0aGlzLFxuICAgICAgICAgICAgLy9cInByZXZlbnRfZGVmYXVsdFwiICAgOiB0cnVlLFxuICAgICAgICAgICAgLy9cInByZXZlbnRfcmVwZWF0XCIgICAgOiB0cnVlLFxuICAgICAgICAvL30pO1xuXG4gICAgICAgIC8vbGlzdGVuZXIucmVnaXN0ZXJfY29tYm8oe1xuICAgICAgICAgICAgLy9cImtleXNcIiAgICAgICAgICAgICAgOiBcIndcIixcbiAgICAgICAgICAgIC8vXCJvbl9rZXlkb3duXCIgICAgICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJzWzBdLndhbGsoJ24nKTtcbiAgICAgICAgICAgIC8vfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgLy9cIm9uX3JlbGVhc2VcIiAgICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllcnNbMF0uc3RvcFdhbGtpbmcoKTtcbiAgICAgICAgICAgIC8vfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgLy9cInRoaXNcIiAgICAgICAgICAgICAgOiB0aGlzLFxuICAgICAgICAgICAgLy9cInByZXZlbnRfZGVmYXVsdFwiICAgOiB0cnVlLFxuICAgICAgICAgICAgLy9cInByZXZlbnRfcmVwZWF0XCIgICAgOiB0cnVlLFxuICAgICAgICAvL30pO1xuXG4gICAgICAgIC8vbGlzdGVuZXIucmVnaXN0ZXJfY29tYm8oe1xuICAgICAgICAgICAgLy9cImtleXNcIiAgICAgICAgICAgICAgOiBcImRcIixcbiAgICAgICAgICAgIC8vXCJvbl9rZXlkb3duXCIgICAgICAgIDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5wbGF5ZXJzWzBdLndhbGsoJ2UnKTtcbiAgICAgICAgICAgIC8vfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgLy9cIm9uX3JlbGVhc2VcIiAgICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllcnNbMF0uc3RvcFdhbGtpbmcoKTtcbiAgICAgICAgICAgIC8vfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgLy9cInRoaXNcIiAgICAgICAgICAgICAgOiB0aGlzLnBsYXllcnNbMF0sXG4gICAgICAgICAgICAvL1wicHJldmVudF9kZWZhdWx0XCIgICA6IHRydWUsXG4gICAgICAgICAgICAvL1wicHJldmVudF9yZXBlYXRcIiAgICA6IHRydWUsXG4gICAgICAgIC8vfSk7XG5cbiAgICAgICAgLy9saXN0ZW5lci5yZWdpc3Rlcl9jb21ibyh7XG4gICAgICAgICAgICAvL1wia2V5c1wiICAgICAgICAgICAgICA6IFwic1wiLFxuICAgICAgICAgICAgLy9cIm9uX2tleWRvd25cIiAgICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnBsYXllcnNbMF0ud2FsaygncycpO1xuICAgICAgICAgICAgLy99LmJpbmQodGhpcyksXG4gICAgICAgICAgICAvL1wib25fcmVsZWFzZVwiICAgICAgICA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucGxheWVyc1swXS5zdG9wV2Fsa2luZygpO1xuICAgICAgICAgICAgLy99LmJpbmQodGhpcyksXG4gICAgICAgICAgICAvL1widGhpc1wiICAgICAgICAgICAgICA6IHRoaXMucGxheWVyc1swXSxcbiAgICAgICAgICAgIC8vXCJwcmV2ZW50X2RlZmF1bHRcIiAgIDogdHJ1ZSxcbiAgICAgICAgICAgIC8vXCJwcmV2ZW50X3JlcGVhdFwiICAgIDogdHJ1ZSxcbiAgICAgICAgLy99KTtcblxuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInRcIiwgKCk9PntcbiAgICAgICAgICAgIC8vIFRvZ2dsZSB3YWxraW5nIGFuZCBiYXR0bGVcbiAgICAgICAgICAgIGlmKCF0aGlzLnJvb20uaXNCYXR0bGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20ubG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLmVuZEJhdHRsZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMucm9vbS5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy90aGlzLm5lY3JvLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbGltaXRsb29wKGZuLCBmcHMpIHtcbiAgICAgICAgLy8gVXNlIHZhciB0aGVuID0gRGF0ZS5ub3coKTsgaWYgeW91XG4gICAgICAgIC8vIGRvbid0IGNhcmUgYWJvdXQgdGFyZ2V0dGluZyA8IElFOVxuICAgICAgICB2YXIgdGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGN1c3RvbSBmcHMsIG90aGVyd2lzZSBmYWxsYmFjayB0byA2MFxuICAgICAgICBmcHMgPSBmcHMgfHwgNjA7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG5cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG4gICAgICAgICAgICAvLyBhZ2FpbiwgRGF0ZS5ub3coKSBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGltZVxuICAgICAgICAgICAgICAgIC8vIG5vdyAtIChkZWx0YSAlIGludGVydmFsKSBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIGp1c3QgXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlbiA9IG5vdywgd2hpY2ggY2FuIGVuZCB1cCBsb3dlcmluZyBvdmVyYWxsIGZwc1xuICAgICAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBmblxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oMCkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXNwZWN0SGVpZ2h0Q2FsYyh3Mikge1xuICAgICAgICBsZXQgdzEgPSAxOTIwO1xuICAgICAgICBsZXQgaDEgPSAxMDgwO1xuICAgICAgICByZXR1cm4gaDEqdzIvdzE7XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpUmVuZGVyZXIgZnJvbSAnLi9VaVJlbmRlcmVyJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBVaVJlbmRlcmVyIHtcbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIHN1cGVyLnJlbmRlcihjdHgpO1xuXG4gICAgICAgIGxldCBmb250U2l6ZSAgICA9IDUqQ29uZmlnLlNQUklURV9TQ0FMRTtcbiAgICAgICAgY3R4LmZvbnQgICAgICAgID0gZm9udFNpemUgKyBcInB4IENvdXJpZXIgTmV3XCI7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgIGxldCB5cG9zID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ktdGhpcy5fdGlsZUhlaWdodCk7XG4gICAgICAgIGxldCB4cG9zID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUqKENvbmZpZy5USUxFX1ggLSA0KVxuICAgICAgICB0aGlzLnVpLnBsYXllckNoYXJhY3RlcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgeXBvcyArPSBmb250U2l6ZSoyO1xuICAgICAgICAgICAgY3R4LmZpbGxUZXh0KC4uLltcbiAgICAgICAgICAgICAgICBwbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICB4cG9zLFxuICAgICAgICAgICAgICAgIHlwb3NcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlUmVuZGVyZXIgZnJvbSAnLi9TcHJpdGVSZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFNwcml0ZVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LnNwcml0ZVJlc291cmNlKTtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICB0aGlzLmltYWdlLndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIGZyYW1lLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLmltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlUmVuZGVyZXIgZnJvbSAnLi9TcHJpdGVSZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFNwcml0ZVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LnNwcml0ZVJlc291cmNlKTtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC5pc1dhbGtpbmcgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUpIDogMCwgLy8gRFhcbiAgICAgICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QueFBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC55UG9zKihDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGVSZW5kZXJlciBmcm9tICcuL1Nwcml0ZVJlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3ByaXRlUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICBzdXBlcihvYmplY3Qucm9vbUJnUmVzb3VyY2UpO1xuXG4gICAgICAgIHRoaXMucm9vbSA9IG9iamVjdDtcbiAgICAgICAgdGhpcy5fb2Zmc2V0WCA9IDA7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UsXG4gICAgICAgICAgICB0aGlzLl9vZmZzZXRYIC0gQ29uZmlnLkNBTlZBU19XSURUSCwgLy8gRFhcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX1dJRFRILCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfSEVJR0hULCAvLyBkSGVpZ2h0XG4gICAgICAgIF0pO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIHRoaXMuX29mZnNldFgsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCwgLy8gZFdpZHRoXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX0hFSUdIVCwgLy8gZEhlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICBpZih0aGlzLnJvb20uaXNNb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldFggKz0gMTA7XG4gICAgICAgICAgICBpZih0aGlzLl9vZmZzZXRYID4gQ29uZmlnLkNBTlZBU19XSURUSCkgdGhpcy5fb2Zmc2V0WCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJpbXBvcnQgUmVuZGVyZXIgZnJvbSAnLi9SZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihzcHJpdGVSZXNvdXJjZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9zcHJpdGVSZXNvdXJjZSA9IHNwcml0ZVJlc291cmNlO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdGhpcy5fc3ByaXRlUmVzb3VyY2U7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IodWkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51aSA9IHVpO1xuICAgICAgICB0aGlzLl91aUJnID0gdWkuYmc7XG4gICAgICAgIHRoaXMuX3RpbGVIZWlnaHQgPSAyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdGhpcy5fdWlCZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgbGV0IGJnUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0IC0gMzAwXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IHVpUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC4uLmJnUmVjdCk7XG5cbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwiIzY0QTM1N1wiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwiIzAwMzcwMFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3QoLi4udWlSZWN0KTtcblxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM4RDgwNDVcIjtcblxuICAgICAgICAvLyBUaGUgc3Ryb2tlIGlzIG1pZGRsZSBhbGlnbmVkIHdpdGggdGhlIGVkZ2VzIG9mIHRoZSBib3hcbiAgICAgICAgbGV0IGxpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzMyO1xuICAgICAgICAvL2xldCBsaW5lV2lkdGggPSA1O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIGxldCBzdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIHN0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICBzdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBUcnlpbmcgdG8gZ2V0IHNlY29uZCBib3JkZXJcbiAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSBcIiNGRkZGRkZcIjtcblxuICAgICAgICAvL2xpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzQ4O1xuICAgICAgICAvL2N0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9zdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIC8vc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgLy9zdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICAvL3N0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIC8vY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gRmlsbCBiZyB3aXRoIHBhdGVyblxuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMTtcbiAgICAgICAgbGV0IHBhdGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuaW1hZ2UsIFwicmVwZWF0XCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0ZXJuO1xuICAgICAgICBjdHgucmVjdCguLi5zdHJva2VSZWN0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgfVxufVxuIl19
