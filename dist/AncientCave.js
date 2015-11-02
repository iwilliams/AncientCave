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
            return './dist/resources/images/clairvoyant-sheet.png';
        }
    }, {
        key: 'JOB_HERBALIST',
        get: function get() {
            return './dist/resources/images/herbalist-sheet.png';
        }
    }]);

    function _default(xPos, yPos, name, job) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, xPos, yPos);

        this.name = name;

        // Define the Spirte Associated with the Player
        this.spriteResource = job;

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
            return {
                floor: '/dist/resources/images/goodtile.png',
                wall: '/dist/resources/images/pillars.png'
            };
        }
    }, {
        key: 'TYPE_OUTSIDE',
        get: function get() {
            return '/dist/resources/images/grass.png';
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
                var fps = this.counter / time_el;

                var fontSize = 5 * _Config2['default'].SPRITE_SCALE;
                this._ctx.font = fontSize + "px Courier New";
                this._ctx.fillStyle = "#ffffff";

                this._ctx.fillText(this.frame + "/" + _Config2['default'].FPS + " " + fps, 20, 20);

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
            console.log(queryParams);

            var peer = new Peer({
                key: _Config2['default'].API_KEY,
                //secure: true,
                debug: 3
            });

            if (!queryParams.p) {
                peer.on('open', function (id) {
                    console.log('My peer ID is: ' + id);
                });

                peer.on('connection', function (connection) {
                    // This `connection` is a DataConnection object with which we can send
                    // data.
                    // The `open` event firing means that the connection is now ready to
                    // transmit data.
                    //
                    _this2.connection = connection;
                    connection.on('open', function () {
                        // Send 'Hello' on the connection.
                        //connection.send('Hello Client!');

                        var clientPlayer = new _modelsPlayer2['default'](++xOffset, ++yOffset, "Stooks", _modelsPlayer2['default'].JOB_CLAIRVOYANT);
                        clientPlayer.init().then(function () {
                            console.log("push new player");
                            _this2.objects.push(clientPlayer);
                            _this2.players.push(clientPlayer);
                        });
                    });

                    connection.on('data', function (data) {
                        // Append the data to body.
                        console.log(data);
                        if (!_this2.room.isLooking) {
                            _this2.room.lookForTrouble();
                        } else {
                            //this.room.endBattle();
                            _this2.room.stopLooking(); //lookForTrouble();
                        }
                    });

                    // Attach input listeners
                    // using https://dmauro.github.io/Keypress/
                    _this2.listener = new window.keypress.Listener();
                    _this2.attachInput(_this2.listener);
                });
            } else {
                var c = peer.connect(queryParams.p);
                this.connection = c;
                c.on('data', function (data) {
                    // When we receive 'Hello', send ' world'.
                    console.log(data);
                    //c.send('Hello Host!');

                    if (!_this2.room.isLooking) {
                        _this2.room.lookForTrouble();
                    } else {
                        //this.room.endBattle();
                        _this2.room.stopLooking(); //lookForTrouble();
                    }
                });

                // Attach input listeners
                // using https://dmauro.github.io/Keypress/
                this.listener = new window.keypress.Listener();
                this.attachInput(this.listener);
            }

            this._element.appendChild(this._canvas);
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;

            var players = [];
            var playerPromises = [];

            var yOffset = 1.60;
            var xOffset = _Config2['default'].TILE_X - 3;

            // Create 4 players
            var p1 = new _modelsPlayer2['default'](xOffset, yOffset, "ROMEDA", _modelsPlayer2['default'].JOB_HERBALIST);
            players.push(p1);
            //let p2 = new Player(++xOffset, ++yOffset, "Stooks", Player.JOB_CLAIRVOYANT);
            //players.push(p2);
            //let p3 = new Player(--xOffset, ++yOffset, "Mecha", Player.JOB_HERBALIST);
            //players.push(p3);
            //let p4 = new Player(++xOffset, ++yOffset, "Space Squid", Player.JOB_CLAIRVOYANT);
            //players.push(p4);

            // Init all players
            playerPromises.push(p1.init());
            //playerPromises.push(p2.init());
            //playerPromises.push(p3.init());
            //playerPromises.push(p4.init());

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
            this.objects = [this.room].concat(_toConsumableArray(this.players), [this.necro, this.ui]);
            //this.objects = [this.room, ...this.players, this.necro];

            Promise.all(playerPromises).then(function () {
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

            window.onclick = function () {

                _this3.connection.send('Hello Client!');

                if (!_this3.room.isLooking) {
                    _this3.room.lookForTrouble();
                } else {
                    //this.room.endBattle();
                    _this3.room.stopLooking(); //lookForTrouble();
                }
            };

            listener.simple_combo("t", function () {
                // Toggle walking and battle
                //if(!this.room.isLooking) {
                //this.room.lookForTrouble();
                //} else {
                //this.room.endBattle();
                //this.room.stopLooking();lookForTrouble();
                //}
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

            //ctx.drawImage(...[
            //this.image,
            //this._offsetX - Config.CANVAS_WIDTH, // DX
            //0, // DY
            //Config.CANVAS_WIDTH, // dWidth
            //Config.CANVAS_HEIGHT, // dHeight
            //]);

            //ctx.drawImage(...[
            //this.image,
            //this._offsetX, // DX
            //0, // DY
            //Config.CANVAS_WIDTH, // dWidth
            //Config.CANVAS_HEIGHT, // dHeight
            //]);

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvT2JqZWN0UmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Nwcml0ZVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7aUNDQW1CLHVCQUF1Qjs7Ozs7QUFHMUMsSUFBSSxJQUFJLEdBQUcsbUNBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ05aLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQzs7QUFFcEMsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXO0FBQzFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdEIsVUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsVUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTVCLFVBQU0sQ0FBQyxZQUFZLEdBQUksTUFBTSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQzNELFVBQU0sQ0FBQyxhQUFhLEdBQUcsQUFBQyxNQUFNLENBQUMsWUFBWSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7O0FBR3RGLFFBQUcsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzFDLGNBQU0sQ0FBQyxh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QkFBUyxVQUFVLEVBQUMsQ0FBQztBQUN4QixlQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRVgsZUFBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO1NBQ2hCIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBFbmdpbmUgZnJvbSAnLi9hcHAvc2VydmljZXMvRW5naW5lJztcblxuLy8gQ3JlYXRlIG5ldyBpbnN0YW5jZSBvZiBnYW1lXG52YXIgZ2FtZSA9IG5ldyBFbmdpbmUoZG9jdW1lbnQuYm9keSk7XG5cbi8vIEluaXRpYWxpemUgaXRcbmdhbWUuaW5pdCgpO1xuXG4iLCJsZXQgY29uZmlnID0ge307XG4vKipcbiAqIFNob3VsZCBiZSBzZXQgdXAgdG8gcmVjYWxjdWxhdGUgb24gdGhlIGZseSB3aGVuIHRoaW5ncyBjaGFnbmUuXG4gKiBOb3Qgd29ya2luZyByaWdodCBhdCBhbGwgZm9yIHdpbmRvdyBzaXplIGNoYWduZXMuXG4gKi9cbmNvbmZpZy5BUElfS0VZID0gXCJ4YWh4eDB5dXk1bGU0czRpXCI7XG5cbmNvbmZpZy5jYWxjdWxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICBjb25maWcuUEVSQ0VOVEFHRSA9IDE7XG5cbiAgICAvLyAxNng5IEFzcGVjdCBSYXRpb1xuICAgIGNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbiAgICBjb25maWcuQVNQRUNUX0hFSUdIVCA9IDEwODA7XG5cbiAgICBjb25maWcuQ0FOVkFTX1dJRFRIICA9IHdpbmRvdy5vdXRlcldpZHRoKmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgaWYoY29uZmlnLkNBTlZBU19IRUlHSFQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICBjb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIH1cblxuICAgIGNvbmZpZy5USUxFX1ggPSAxNDsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuICAgIGNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG5cbiAgICBjb25maWcuRlBTID0gMzA7XG59XG5cbmNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IE9iamVjdFJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL09iamVjdFJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcykge1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zIHx8IDA7XG4gICAgICAgIHRoaXMueVBvcyA9IHlQb3MgfHwgMDtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgT2JqZWN0UmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGlmKHRoaXMuaXNWaXNpYmxlKVxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4LCBmcmFtZSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5pc1Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBzaG93KCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLmlzVmlzaWJsZSA9ICF0aGlzLmlzVmlzaWJsZTtcbiAgICB9XG5cbiAgICB0aWNrKCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpIGZyb20gJy4vVWknO1xuaW1wb3J0IEJhdHRsZVVpUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvQmF0dGxlVWlSZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWkge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgICAgICAgICAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgICAgICAgICAgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAgICAgICAgICAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAgICAgICAgICAtICUgWSBvZmZzZXRcbiAgICAgKiBAcGFyYW0gcGxheWVyQ2hhcmFjdGVycyAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKiBAcGFyYW0gZW5lbWllcyAgICAgICAgICAtIGFycmF5IG9mIHBsYXllckNoYXJhY3RlcnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZLCBwbGF5ZXJDaGFyYWN0ZXJzLCBlbmVtaWVzKSB7XG4gICAgICAgIHN1cGVyKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFkpO1xuXG4gICAgICAgIHRoaXMucGxheWVyQ2hhcmFjdGVycyA9IHBsYXllckNoYXJhY3RlcnM7XG4gICAgICAgIHRoaXMuZW5lbWllcyAgICAgICAgICA9IGVuZW1pZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgQmF0dGxlVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcbmltcG9ydCBNb25zdGVyUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvTW9uc3RlclJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHhQb3MsIHlQb3MpIHtcbiAgICAgICAgc3VwZXIoeFBvcywgeVBvcyk7XG4gICAgICAgIC8vIERlZmluZSB0aGUgU3BpcnRlIEFzc29jaWF0ZWQgd2l0aCB0aGUgUGxheWVyXG4gICAgICAgIHRoaXMuc3ByaXRlUmVzb3VyY2UgPSAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9uZWNyby1zcHJpdGUucG5nJztcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IE1vbnN0ZXJSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9CYXNlT2JqZWN0JzsgLy8gQ2FuJ3QgY2FsbCB0aGlzIE9iamVjdCBiL2Mgb2YgY29uZmxpY3QgeERcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBKT0JfQ0xBSVJWT1lBTlQoKSB7IHJldHVybiAnLi9kaXN0L3Jlc291cmNlcy9pbWFnZXMvY2xhaXJ2b3lhbnQtc2hlZXQucG5nJzt9XG4gICAgc3RhdGljIGdldCBKT0JfSEVSQkFMSVNUKCkgICB7IHJldHVybiAnLi9kaXN0L3Jlc291cmNlcy9pbWFnZXMvaGVyYmFsaXN0LXNoZWV0LnBuZyc7fVxuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgbmFtZSwgam9iKSB7XG4gICAgICAgIHN1cGVyKHhQb3MsIHlQb3MpO1xuXG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG5cbiAgICAgICAgLy8gRGVmaW5lIHRoZSBTcGlydGUgQXNzb2NpYXRlZCB3aXRoIHRoZSBQbGF5ZXJcbiAgICAgICAgdGhpcy5zcHJpdGVSZXNvdXJjZSA9IGpvYjtcblxuICAgICAgICB0aGlzLmlzV2Fsa2luZyA9IGZhbHNlO1xuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlT2JqZWN0ICAgZnJvbSAnLi9CYXNlT2JqZWN0JztcbmltcG9ydCBSb29tUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvUm9vbVJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcblxuICAgIC8vIFN0YXRpYyBSb29tIFR5cGVzXG4gICAgc3RhdGljIGdldCBUWVBFX0NBVkUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmbG9vcjogJy9kaXN0L3Jlc291cmNlcy9pbWFnZXMvZ29vZHRpbGUucG5nJyxcbiAgICAgICAgICAgIHdhbGw6ICcvZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL3BpbGxhcnMucG5nJ1xuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IFRZUEVfT1VUU0lERSgpIHsgcmV0dXJuICcvZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL2dyYXNzLnBuZyc7fVxuXG4gICAgY29uc3RydWN0b3IodHlwZSwgZW5lbWllcywgcGxheWVycywgZW5jb3VudGVyUmF0ZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuZmxvb3JSZXNvdXJjZSAgPSB0eXBlLmZsb29yO1xuICAgICAgICB0aGlzLndhbGxSZXNvdXJjZSAgID0gdHlwZS53YWxsO1xuXG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgICAgICAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc0JhdHRsZSAgICAgICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuZW1pZXMgICAgICAgID0gZW5lbWllcztcbiAgICAgICAgdGhpcy5wbGF5ZXJzICAgICAgICA9IHBsYXllcnM7XG4gICAgICAgIHRoaXMuaXNMb29raW5nICAgICAgPSBmYWxzZTtcblxuICAgICAgICB0aGlzLmVuY291bnRlclJhdGUgPSBlbmNvdW50ZXJSYXRlIHx8IDUwO1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZU5leHRFbmNvdW50ZXIoKTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJvb21SZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbG9va0ZvclRyb3VibGUoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9va2luZykgcmV0dXJuO1xuICAgICAgICBpZiAodGhpcy5pc0JhdHRsZSkgdGhpcy5lbmRCYXR0bGUoKTtcbiAgICAgICAgdGhpcy5pc01vdmluZyAgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTG9va2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICBwbGF5ZXIuaXNXYWxraW5nID0gIXBsYXllci5pc1dhbGtpbmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHN0b3BMb29raW5nKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNMb29raW5nKSByZXR1cm47XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaXNMb29raW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICBwbGF5ZXIuaXNXYWxraW5nID0gIXBsYXllci5pc1dhbGtpbmc7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGVuZEJhdHRsZSgpIHtcbiAgICAgICAgaWYodGhpcy5pc0JhdHRsZSkge1xuICAgICAgICAgICAgdGhpcy5pc0JhdHRsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLmZvckVhY2goKGVuZW15KT0+e1xuICAgICAgICAgICAgICAgIGVuZW15LnRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlTmV4dEVuY291bnRlcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMudGlja0NvdW50ID0gMDtcbiAgICAgICAgdGhpcy5pc0JhdHRsZSAgPSB0cnVlO1xuICAgICAgICB0aGlzLmlzTG9va2luZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTW92aW5nICA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVuZW1pZXMuZm9yRWFjaCgoZW5lbXkpPT57XG4gICAgICAgICAgICBlbmVteS50b2dnbGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGxheWVycy5mb3JFYWNoKChwbGF5ZXIpPT57XG4gICAgICAgICAgICBwbGF5ZXIuaXNXYWxraW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZU5leHRFbmNvdW50ZXIoKSB7XG4gICAgICAgIHZhciBteVJhbmQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTAwL3RoaXMuZW5jb3VudGVyUmF0ZSk7XG4gICAgICAgIHRoaXMubmV4dEVuY291bnRlciA9IG15UmFuZCo1MCArIDI1O1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIHRoaXMudGlja0NvdW50ID0gdGhpcy50aWNrQ291bnQgfHwgMDtcbiAgICAgICAgaWYodGhpcy5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgIC8vdGhpcy50aWNrQ291bnQrKztcbiAgICAgICAgICAgIGlmKHRoaXMudGlja0NvdW50ID4gdGhpcy5uZXh0RW5jb3VudGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEJhdHRsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4LCBmcmFtZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvVWlSZW5kZXJlcic7XG5pbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBVSSB3aW5kb3dcbiAgICAgKlxuICAgICAqIEBwYXJhbSB3aWR0aCAgIC0gJSBXaWR0aCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBoZWlnaHQgIC0gJSBIZWlnaHQgb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WCAtICUgWCBvZmZzZXRcbiAgICAgKiBAcGFyYW0gb2Zmc2V0WSAtICUgWSBvZmZzZXRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuYmcgICAgICA9ICcvZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL3VpLWJnLnBuZyc7XG4gICAgICAgIHRoaXMud2lkdGggICA9IHdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCAgPSBoZWlnaHQ7XG4gICAgICAgIHRoaXMub2Zmc2V0WCA9IG9mZnNldFg7XG4gICAgICAgIHRoaXMub2Zmc2V0WSA9IG9mZnNldFk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6YXRpb24gUHJvbWlzZVxuICAgICAqL1xuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgVWlSZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgpO1xuICAgIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgICBmcm9tICcuL0xvZ2dlcic7XG5pbXBvcnQgUGxheWVyICAgZnJvbSAnLi4vbW9kZWxzL1BsYXllcic7XG5pbXBvcnQgTW9uc3RlciAgZnJvbSAnLi4vbW9kZWxzL01vbnN0ZXInO1xuaW1wb3J0IFJvb20gICAgIGZyb20gJy4uL21vZGVscy9Sb29tJztcbmltcG9ydCBVaSAgICAgICBmcm9tICcuLi9tb2RlbHMvVWknO1xuaW1wb3J0IEJhdHRsZVVpIGZyb20gJy4uL21vZGVscy9CYXR0bGVVaSc7XG5pbXBvcnQgVXRpbHMgICAgZnJvbSAnLi9VdGlscyc7XG5pbXBvcnQgQ29uZmlnICAgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICB9XG5cbiAgICAvLyBodHRwOi8vY29kZXRoZW9yeS5pbi9jb250cm9sbGluZy10aGUtZnJhbWUtcmF0ZS13aXRoLXJlcXVlc3RhbmltYXRpb25mcmFtZS9cbiAgICBsb29wKCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGxldCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBsZXQgZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XG4gICAgICAgIC8vY29uc29sZS5sb2coZGVsdGEpO1xuXG4gICAgICAgIGlmIChkZWx0YSA+IHRoaXMuaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMudGhlbiA9IG5vdyAtIChkZWx0YSAlIHRoaXMuaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICB0aGlzLmZyYW1lID0gdGhpcy5mcmFtZSB8fCAxO1xuICAgICAgICAgICAgdGhpcy5mcmFtZSA9ICh0aGlzLmZyYW1lJUNvbmZpZy5GUFMpID8gdGhpcy5mcmFtZSA6IDE7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsUmVjdCgwLCAwLCBDb25maWcuQ0FOVkFTX1dJRFRILCBDb25maWcuQ0FOVkFTX0hFSUdIVCk7XG5cbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpPT57XG4gICAgICAgICAgICAgICAgdGhpcy5fY3R4LnNhdmUoKTtcbiAgICAgICAgICAgICAgICBvYmplY3QudGljaygpO1xuICAgICAgICAgICAgICAgIG9iamVjdC5yZW5kZXIodGhpcy5fY3R4LCB0aGlzLmZyYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jdHgucmVzdG9yZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGxldCB0aW1lX2VsID0gKHRoaXMudGhlbiAtIHRoaXMuZmlyc3QpLzEwMDA7XG4gICAgICAgICAgICArK3RoaXMuY291bnRlcjtcbiAgICAgICAgICAgIGxldCBmcHMgPSB0aGlzLmNvdW50ZXIvdGltZV9lbFxuXG4gICAgICAgICAgICBsZXQgZm9udFNpemUgICAgICAgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgICAgICB0aGlzLl9jdHguZm9udCAgICAgICAgPSBmb250U2l6ZSArIFwicHggQ291cmllciBOZXdcIjtcbiAgICAgICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgICA9IFwiI2ZmZmZmZlwiO1xuXG4gICAgICAgICAgICB0aGlzLl9jdHguZmlsbFRleHQodGhpcy5mcmFtZSArIFwiL1wiICsgQ29uZmlnLkZQUyArIFwiIFwiICsgZnBzLCAyMCwgMjApO1xuXG4gICAgICAgICAgICB0aGlzLmZyYW1lKys7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgSGFuZGxlclxuICAgICAqIEB0b2RvOiBkb2VzIHRoaXMgYmVsb25nIGhlcmU/XG4gICAgICovXG4gICAgcmVzaXplKCkge1xuICAgICAgICBDb25maWcuY2FsY3VsYXRlKCk7XG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcXVlc3QgdGhlIGdhbWUgZ29lcyBmdWxsIHNjcmVlbiwgd2lsbCBmdWxsc2NyZWVuIHRoZSBjYW52YXMgZWxlbWVudFxuICAgICAqIEZvdW5kOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRnVsbHNjcmVlbl9BUElcbiAgICAgKi9cbiAgICByZXF1ZXN0RnVsbHNjcmVlbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NhbnZhcy5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5tc1JlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5fY2FudmFzLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMubW96UmVxdWVzdEZ1bGxTY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdGlhbGl6ZSB0aGUgZW5naW5lXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5UGFyYW1zID0gVXRpbHMucGFyc2VRdWVyeSh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcbiAgICAgICAgY29uc29sZS5sb2cocXVlcnlQYXJhbXMpO1xuXG4gICAgICAgIHZhciBwZWVyID0gbmV3IFBlZXIoe1xuICAgICAgICAgICAga2V5OiBDb25maWcuQVBJX0tFWSxcbiAgICAgICAgICAgIC8vc2VjdXJlOiB0cnVlLFxuICAgICAgICAgICAgZGVidWc6IDNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoIXF1ZXJ5UGFyYW1zLnApIHtcbiAgICAgICAgICAgIHBlZXIub24oJ29wZW4nLCBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTXkgcGVlciBJRCBpczogJyArIGlkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBwZWVyLm9uKCdjb25uZWN0aW9uJywgKGNvbm5lY3Rpb24pPT57XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBgY29ubmVjdGlvbmAgaXMgYSBEYXRhQ29ubmVjdGlvbiBvYmplY3Qgd2l0aCB3aGljaCB3ZSBjYW4gc2VuZFxuICAgICAgICAgICAgICAgIC8vIGRhdGEuXG4gICAgICAgICAgICAgICAgLy8gVGhlIGBvcGVuYCBldmVudCBmaXJpbmcgbWVhbnMgdGhhdCB0aGUgY29ubmVjdGlvbiBpcyBub3cgcmVhZHkgdG9cbiAgICAgICAgICAgICAgICAvLyB0cmFuc21pdCBkYXRhLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgICAgICAgICAgICAgICBjb25uZWN0aW9uLm9uKCdvcGVuJywgKCk9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gU2VuZCAnSGVsbG8nIG9uIHRoZSBjb25uZWN0aW9uLlxuICAgICAgICAgICAgICAgICAgICAvL2Nvbm5lY3Rpb24uc2VuZCgnSGVsbG8gQ2xpZW50IScpO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGllbnRQbGF5ZXIgPSBuZXcgUGxheWVyKCsreE9mZnNldCwgKyt5T2Zmc2V0LCBcIlN0b29rc1wiLCBQbGF5ZXIuSk9CX0NMQUlSVk9ZQU5UKTtcbiAgICAgICAgICAgICAgICAgICAgY2xpZW50UGxheWVyLmluaXQoKS50aGVuKCgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInB1c2ggbmV3IHBsYXllclwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5wdXNoKGNsaWVudFBsYXllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnMucHVzaChjbGllbnRQbGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwZW5kIHRoZSBkYXRhIHRvIGJvZHkuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBpZighdGhpcy5yb29tLmlzTG9va2luZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yb29tLmxvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3RoaXMucm9vbS5lbmRCYXR0bGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbS5zdG9wTG9va2luZygpOy8vbG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gQXR0YWNoIGlucHV0IGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIC8vIHVzaW5nIGh0dHBzOi8vZG1hdXJvLmdpdGh1Yi5pby9LZXlwcmVzcy9cbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlbmVyID0gbmV3IHdpbmRvdy5rZXlwcmVzcy5MaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXR0YWNoSW5wdXQodGhpcy5saXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBjID0gcGVlci5jb25uZWN0KHF1ZXJ5UGFyYW1zLnApO1xuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gYztcbiAgICAgICAgICAgIGMub24oJ2RhdGEnLCAoZGF0YSk9PntcbiAgICAgICAgICAgICAgICAvLyBXaGVuIHdlIHJlY2VpdmUgJ0hlbGxvJywgc2VuZCAnIHdvcmxkJy5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgICAgICAgICAvL2Muc2VuZCgnSGVsbG8gSG9zdCEnKTtcblxuICAgICAgICAgICAgICAgIGlmKCF0aGlzLnJvb20uaXNMb29raW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm9vbS5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5yb29tLmVuZEJhdHRsZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvb20uc3RvcExvb2tpbmcoKTsvL2xvb2tGb3JUcm91YmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEF0dGFjaCBpbnB1dCBsaXN0ZW5lcnNcbiAgICAgICAgICAgIC8vIHVzaW5nIGh0dHBzOi8vZG1hdXJvLmdpdGh1Yi5pby9LZXlwcmVzcy9cbiAgICAgICAgICAgIHRoaXMubGlzdGVuZXIgPSBuZXcgd2luZG93LmtleXByZXNzLkxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmF0dGFjaElucHV0KHRoaXMubGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xuICAgICAgICB0aGlzLl9jdHggPSB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5fY3R4LmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBwbGF5ZXJzID0gW107XG4gICAgICAgIGxldCBwbGF5ZXJQcm9taXNlcyA9IFtdO1xuXG4gICAgICAgIGxldCB5T2Zmc2V0ID0gMS42MDtcbiAgICAgICAgbGV0IHhPZmZzZXQgPSBDb25maWcuVElMRV9YIC0gMztcblxuICAgICAgICAvLyBDcmVhdGUgNCBwbGF5ZXJzXG4gICAgICAgIGxldCBwMSA9IG5ldyBQbGF5ZXIoeE9mZnNldCwgeU9mZnNldCwgXCJST01FREFcIiwgUGxheWVyLkpPQl9IRVJCQUxJU1QpO1xuICAgICAgICBwbGF5ZXJzLnB1c2gocDEpO1xuICAgICAgICAvL2xldCBwMiA9IG5ldyBQbGF5ZXIoKyt4T2Zmc2V0LCArK3lPZmZzZXQsIFwiU3Rvb2tzXCIsIFBsYXllci5KT0JfQ0xBSVJWT1lBTlQpO1xuICAgICAgICAvL3BsYXllcnMucHVzaChwMik7XG4gICAgICAgIC8vbGV0IHAzID0gbmV3IFBsYXllcigtLXhPZmZzZXQsICsreU9mZnNldCwgXCJNZWNoYVwiLCBQbGF5ZXIuSk9CX0hFUkJBTElTVCk7XG4gICAgICAgIC8vcGxheWVycy5wdXNoKHAzKTtcbiAgICAgICAgLy9sZXQgcDQgPSBuZXcgUGxheWVyKCsreE9mZnNldCwgKyt5T2Zmc2V0LCBcIlNwYWNlIFNxdWlkXCIsIFBsYXllci5KT0JfQ0xBSVJWT1lBTlQpO1xuICAgICAgICAvL3BsYXllcnMucHVzaChwNCk7XG5cbiAgICAgICAgLy8gSW5pdCBhbGwgcGxheWVyc1xuICAgICAgICBwbGF5ZXJQcm9taXNlcy5wdXNoKHAxLmluaXQoKSk7XG4gICAgICAgIC8vcGxheWVyUHJvbWlzZXMucHVzaChwMi5pbml0KCkpO1xuICAgICAgICAvL3BsYXllclByb21pc2VzLnB1c2gocDMuaW5pdCgpKTtcbiAgICAgICAgLy9wbGF5ZXJQcm9taXNlcy5wdXNoKHA0LmluaXQoKSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gcGxheWVycztcblxuICAgICAgICAvLy8vIEFkZCBhIGJhZGRpZVxuICAgICAgICB0aGlzLm5lY3JvID0gbmV3IE1vbnN0ZXIoMSwgMSk7XG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2godGhpcy5uZWNyby5pbml0KCkpO1xuICAgICAgICB0aGlzLm5lY3JvLmhpZGUoKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIFVJXG4gICAgICAgIHRoaXMudWkgPSBuZXcgQmF0dGxlVWkoMCwgMCwgMCwgMCwgcGxheWVycywgcGxheWVycyk7XG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2godGhpcy51aS5pbml0KCkpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgUm9vbVxuICAgICAgICB0aGlzLnJvb20gPSBuZXcgUm9vbShSb29tLlRZUEVfQ0FWRSwgW3RoaXMubmVjcm9dLCB0aGlzLnBsYXllcnMpO1xuICAgICAgICBwbGF5ZXJQcm9taXNlcy5wdXNoKHRoaXMucm9vbS5pbml0KCkpO1xuXG4gICAgICAgIC8vIENyZWF0ZSBhbGwgb2JqZWN0c1xuICAgICAgICB0aGlzLm9iamVjdHMgPSBbdGhpcy5yb29tLCAuLi50aGlzLnBsYXllcnMsIHRoaXMubmVjcm8sIHRoaXMudWldO1xuICAgICAgICAvL3RoaXMub2JqZWN0cyA9IFt0aGlzLnJvb20sIC4uLnRoaXMucGxheWVycywgdGhpcy5uZWNyb107XG5cblxuICAgICAgICBQcm9taXNlLmFsbChwbGF5ZXJQcm9taXNlcykudGhlbigoKT0+e1xuICAgICAgICAgICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDAwL0NvbmZpZy5GUFM7XG4gICAgICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICAgICAgdGhpcy5jb3VudGVyID0gMDtcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB9KTtcblxuXG5cbiAgICAgICAgLy8gQXR0YWNoIHJlc2l6ZSBldmVudFxuICAgICAgICAvL3dpbmRvdy5yZXNpemUgPSB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBBdHRhY2ggRnVsbHNjcmVlbiBldmVudFxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdGhpcy5yZXF1ZXN0RnVsbHNjcmVlbi5iaW5kKHRoaXMpKTtcblxuICAgICAgICBMb2dnZXIuYmFubmVyKCdHYW1lIFN0YXJ0ZWQnKTtcbiAgICB9XG5cbiAgICBhdHRhY2hJbnB1dChsaXN0ZW5lcikge1xuICAgICAgICB3aW5kb3cub25jbGljayA9ICgpID0+IHtcblxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLnNlbmQoJ0hlbGxvIENsaWVudCEnKTtcblxuICAgICAgICAgICAgaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20ubG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLnJvb20uZW5kQmF0dGxlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLnN0b3BMb29raW5nKCk7Ly9sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInRcIiwgKCk9PntcbiAgICAgICAgICAgIC8vIFRvZ2dsZSB3YWxraW5nIGFuZCBiYXR0bGVcbiAgICAgICAgICAgIC8vaWYoIXRoaXMucm9vbS5pc0xvb2tpbmcpIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMucm9vbS5sb29rRm9yVHJvdWJsZSgpO1xuICAgICAgICAgICAgLy99IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5yb29tLmVuZEJhdHRsZSgpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5yb29tLnN0b3BMb29raW5nKCk7bG9va0ZvclRyb3VibGUoKTtcbiAgICAgICAgICAgIC8vfVxuICAgICAgICAgICAgLy90aGlzLm5lY3JvLnRvZ2dsZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGJhbm5lcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coYCVjJHttc2cudG9VcHBlckNhc2UoKX1gLCAnZm9udC1zaXplOiAzMHB4OyBiYWNrZ3JvdW5kOiAjMjIyOyBjb2xvcjogI2JhZGE1NTsnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9nKG1zZykge1xuICAgICAgICBjb25zb2xlLmxvZyhtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBzdGF0aWMgbGltaXRsb29wKGZuLCBmcHMpIHtcbiAgICAgICAgLy8gVXNlIHZhciB0aGVuID0gRGF0ZS5ub3coKTsgaWYgeW91XG4gICAgICAgIC8vIGRvbid0IGNhcmUgYWJvdXQgdGFyZ2V0dGluZyA8IElFOVxuICAgICAgICB2YXIgdGhlbiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGN1c3RvbSBmcHMsIG90aGVyd2lzZSBmYWxsYmFjayB0byA2MFxuICAgICAgICBmcHMgPSBmcHMgfHwgNjA7XG4gICAgICAgIHZhciBpbnRlcnZhbCA9IDEwMDAgLyBmcHM7XG5cbiAgICAgICAgcmV0dXJuIChmdW5jdGlvbiBsb29wKHRpbWUpe1xuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGxvb3ApO1xuXG4gICAgICAgICAgICAvLyBhZ2FpbiwgRGF0ZS5ub3coKSBpZiBpdCdzIGF2YWlsYWJsZVxuICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgdmFyIGRlbHRhID0gbm93IC0gdGhlbjtcblxuICAgICAgICAgICAgaWYgKGRlbHRhID4gaW50ZXJ2YWwpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGltZVxuICAgICAgICAgICAgICAgIC8vIG5vdyAtIChkZWx0YSAlIGludGVydmFsKSBpcyBhbiBpbXByb3ZlbWVudCBvdmVyIGp1c3QgXG4gICAgICAgICAgICAgICAgLy8gdXNpbmcgdGhlbiA9IG5vdywgd2hpY2ggY2FuIGVuZCB1cCBsb3dlcmluZyBvdmVyYWxsIGZwc1xuICAgICAgICAgICAgICAgIHRoZW4gPSBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCk7XG5cbiAgICAgICAgICAgICAgICAvLyBjYWxsIHRoZSBmblxuICAgICAgICAgICAgICAgIGZuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0oMCkpO1xuICAgIH07XG5cbiAgICBzdGF0aWMgYXNwZWN0SGVpZ2h0Q2FsYyh3Mikge1xuICAgICAgICBsZXQgdzEgPSAxOTIwO1xuICAgICAgICBsZXQgaDEgPSAxMDgwO1xuICAgICAgICByZXR1cm4gaDEqdzIvdzE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlUXVlcnkoc2VhcmNoKSB7XG4gICAgICAgIHZhciBhcmdzID0gc2VhcmNoLnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xuXG4gICAgICAgIHZhciBhcmdzUGFyc2VkID0ge307XG5cbiAgICAgICAgdmFyIGksIGFyZywga3ZwLCBrZXksIHZhbHVlO1xuXG4gICAgICAgIGZvciAoaT0wOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBhcmcgPSBhcmdzW2ldO1xuXG4gICAgICAgICAgICBpZiAoLTEgPT09IGFyZy5pbmRleE9mKCc9JykpIHtcblxuICAgICAgICAgICAgICAgIGFyZ3NQYXJzZWRbZGVjb2RlVVJJQ29tcG9uZW50KGFyZykudHJpbSgpXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcblxuICAgICAgICAgICAgICAgIGt2cCA9IGFyZy5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgICAgICAga2V5ID0gZGVjb2RlVVJJQ29tcG9uZW50KGt2cFswXSkudHJpbSgpO1xuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkZWNvZGVVUklDb21wb25lbnQoa3ZwWzFdKS50cmltKCk7XG5cbiAgICAgICAgICAgICAgICBhcmdzUGFyc2VkW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhcmdzUGFyc2VkO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4vVWlSZW5kZXJlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWlSZW5kZXJlciB7XG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoY3R4KTtcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeXBvcyA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuICAgICAgICBsZXQgeHBvcyA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9YIC0gNClcbiAgICAgICAgdGhpcy51aS5wbGF5ZXJDaGFyYWN0ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHlwb3MgKz0gZm9udFNpemUqMjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZVJlbmRlcmVyIGZyb20gJy4vU3ByaXRlUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTcHJpdGVSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKG9iamVjdC5zcHJpdGVSZXNvdXJjZSk7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgdGhpcy5pbWFnZS53aWR0aCwgLy8gZFdpZHRoXG4gICAgICAgICAgICB0aGlzLmltYWdlLmhlaWdodCwgLy8gZEhlaWdodFxuICAgICAgICAgICAgMjAsXG4gICAgICAgICAgICBmcmFtZSwgLy8gWXBvc1xuICAgICAgICAgICAgdGhpcy5pbWFnZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0KkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZVJlbmRlcmVyIGZyb20gJy4vU3ByaXRlUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTcHJpdGVSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKG9iamVjdC5zcHJpdGVSZXNvdXJjZSk7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG4gICAgICAgIHRoaXMuZnJhbWUgPSAoZnJhbWUgPCBDb25maWcuRlBTLzIpID8gMCA6IDE7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLnNoYWRvdyxcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgdGhpcy5vYmplY3QueFBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnlQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSArIChDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSkgLSAoQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLnNoYWRvdy5oZWlnaHQvMS43NSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgdGhpcy5vYmplY3QuaXNXYWxraW5nID8gQ29uZmlnLlNQUklURV9TSVpFKih0aGlzLmZyYW1lKSA6IDAsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgdGhpcy5vYmplY3QueFBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgIHRoaXMub2JqZWN0LnlQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSwgLy8gc3kgfiBSZXBsYWNlIHdpdGggb2JqZWN0IFkgUG9zXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZVJlbmRlcmVyIGZyb20gJy4vU3ByaXRlUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTcHJpdGVSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZmxvb3JSZXNvdXJjZSA9IG9iamVjdC5mbG9vclJlc291cmNlO1xuICAgICAgICB0aGlzLndhbGxSZXNvdXJjZSAgPSBvYmplY3Qud2FsbFJlc291cmNlO1xuXG4gICAgICAgIHRoaXMucm9vbSA9IG9iamVjdDtcbiAgICAgICAgdGhpcy5fb2Zmc2V0WCA9IDA7XG4gICAgICAgIHRoaXMud2FsbE9mZnNldCA9IDA7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgICAgICB0aGlzLmZsb29ySW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmZsb29ySW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5mbG9vckltYWdlLnNyYyA9IHRoaXMuZmxvb3JSZXNvdXJjZTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgICAgIHRoaXMud2FsbEltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy53YWxsSW1hZ2Uuc3JjID0gdGhpcy53YWxsUmVzb3VyY2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuXG4gICAgICAgIC8vY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAvL3RoaXMuaW1hZ2UsXG4gICAgICAgICAgICAvL3RoaXMuX29mZnNldFggLSBDb25maWcuQ0FOVkFTX1dJRFRILCAvLyBEWFxuICAgICAgICAgICAgLy8wLCAvLyBEWVxuICAgICAgICAgICAgLy9Db25maWcuQ0FOVkFTX1dJRFRILCAvLyBkV2lkdGhcbiAgICAgICAgICAgIC8vQ29uZmlnLkNBTlZBU19IRUlHSFQsIC8vIGRIZWlnaHRcbiAgICAgICAgLy9dKTtcblxuICAgICAgICAvL2N0eC5kcmF3SW1hZ2UoLi4uW1xuICAgICAgICAgICAgLy90aGlzLmltYWdlLFxuICAgICAgICAgICAgLy90aGlzLl9vZmZzZXRYLCAvLyBEWFxuICAgICAgICAgICAgLy8wLCAvLyBEWVxuICAgICAgICAgICAgLy9Db25maWcuQ0FOVkFTX1dJRFRILCAvLyBkV2lkdGhcbiAgICAgICAgICAgIC8vQ29uZmlnLkNBTlZBU19IRUlHSFQsIC8vIGRIZWlnaHRcbiAgICAgICAgLy9dKTtcblxuICAgICAgICBmb3IobGV0IHggPSAwOyB4IDwgQ29uZmlnLlRJTEVfWCsxOyB4KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBDb25maWcuVElMRV9ZIC0gMjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmxvb3JJbWFnZSxcbiAgICAgICAgICAgICAgICAgICAgKHgqQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpIC0gKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSArIHRoaXMuX29mZnNldFgsIC8vIERYXG4gICAgICAgICAgICAgICAgICAgICh5KzIpKkNvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBEWFxuICAgICAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGxldCB4ID0gMDsgeCA8IENvbmZpZy5DQU5WQVNfV0lEVEgvKHRoaXMud2FsbEltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUpICsgMTsgeCsrKSB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxJbWFnZSxcbiAgICAgICAgICAgICAgICB0aGlzLndhbGxPZmZzZXQgKyAodGhpcy53YWxsSW1hZ2Uud2lkdGgqQ29uZmlnLlNQUklURV9TQ0FMRSp4KSAtICh0aGlzLndhbGxJbWFnZS53aWR0aCpDb25maWcuU1BSSVRFX1NDQUxFKSxcbiAgICAgICAgICAgICAgICAwLFxuICAgICAgICAgICAgICAgIHRoaXMud2FsbEltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgICAgIHRoaXMud2FsbEltYWdlLmhlaWdodCpDb25maWcuU1BSSVRFX1NDQUxFIC8vIHNXaWR0aFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0aGlzLnJvb20uaXNNb3ZpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuX29mZnNldFggKz0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMTY7XG4gICAgICAgICAgICBpZih0aGlzLl9vZmZzZXRYID49IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFIC0gMSkgdGhpcy5fb2Zmc2V0WCA9IDA7XG5cbiAgICAgICAgICAgIHRoaXMud2FsbE9mZnNldCArPSBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRS8xNjtcbiAgICAgICAgICAgIGlmKHRoaXMud2FsbE9mZnNldCA+IHRoaXMud2FsbEltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUgLSAxKSB0aGlzLndhbGxPZmZzZXQgPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Ioc3ByaXRlUmVzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLnNoYWRvd0ltYWdlID0gJy4vZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL3NoYWRvdy5wbmcnO1xuXG4gICAgICAgIGlmKHNwcml0ZVJlc291cmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9zcHJpdGVSZXNvdXJjZSA9IHNwcml0ZVJlc291cmNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHRoaXMuX3Nwcml0ZVJlc291cmNlO1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFkb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFkb3cub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaGFkb3cuc3JjID0gdGhpcy5zaGFkb3dJbWFnZTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgXSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1aSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnVpID0gdWk7XG4gICAgICAgIHRoaXMuX3VpQmcgPSB1aS5iZztcbiAgICAgICAgdGhpcy5fdGlsZUhlaWdodCA9IDI7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl91aUJnO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG5cbiAgICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgICBsZXQgYmdSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHQgLSAzMDBcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgdWlSZWN0ID0gW1xuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpLFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCxcbiAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKnRoaXMuX3RpbGVIZWlnaHRcbiAgICAgICAgXTtcblxuICAgICAgICBsZXQgZ3JhZGllbnQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoLi4uYmdSZWN0KTtcblxuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMCwgXCIjNjRBMzU3XCIpO1xuICAgICAgICBncmFkaWVudC5hZGRDb2xvclN0b3AoMSwgXCIjMDAzNzAwXCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQ7XG4gICAgICAgIGN0eC5maWxsUmVjdCguLi51aVJlY3QpO1xuXG4gICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiIzhEODA0NVwiO1xuXG4gICAgICAgIC8vIFRoZSBzdHJva2UgaXMgbWlkZGxlIGFsaWduZWQgd2l0aCB0aGUgZWRnZXMgb2YgdGhlIGJveFxuICAgICAgICBsZXQgbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvMzI7XG4gICAgICAgIC8vbGV0IGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIGN0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgbGV0IHN0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsxXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIHN0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIGN0eC5zdHJva2VSZWN0KC4uLnN0cm9rZVJlY3QpO1xuXG4gICAgICAgIC8vIFRyeWluZyB0byBnZXQgc2Vjb25kIGJvcmRlclxuICAgICAgICAvL2N0eC5zdHJva2VTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuXG4gICAgICAgIC8vbGluZVdpZHRoID0gQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUvNDg7XG4gICAgICAgIC8vY3R4LmxpbmVXaWR0aCA9IGxpbmVXaWR0aDtcblxuICAgICAgICAvL3N0cm9rZVJlY3QgPSBbLi4udWlSZWN0XTtcbiAgICAgICAgLy9zdHJva2VSZWN0WzBdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFsyXSAtPSBsaW5lV2lkdGg7XG4gICAgICAgIC8vc3Ryb2tlUmVjdFszXSAtPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9jdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBGaWxsIGJnIHdpdGggcGF0ZXJuXG5cbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gMC4xO1xuICAgICAgICBsZXQgcGF0ZXJuID0gY3R4LmNyZWF0ZVBhdHRlcm4odGhpcy5pbWFnZSwgXCJyZXBlYXRcIik7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBwYXRlcm47XG4gICAgICAgIGN0eC5yZWN0KC4uLnN0cm9rZVJlY3QpO1xuICAgICAgICBjdHguZmlsbCgpO1xuXG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICB9XG59XG4iXX0=
