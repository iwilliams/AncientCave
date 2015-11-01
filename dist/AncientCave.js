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

    config.FPS = 10;
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
            this.renderer.render(ctx, frame);
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
        this.spriteResource = '/dist/resources/images/spritesheet.png';
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _viewsRoomRenderer = require('../views/RoomRenderer');

var _viewsRoomRenderer2 = _interopRequireDefault(_viewsRoomRenderer);

var _default = (function () {
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

    function _default(type) {
        _classCallCheck(this, _default);

        this.roomBgResource = type;
        this.isMoving = false;
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
        key: 'render',
        value: function render(ctx, frame) {
            this.renderer.render(ctx, frame);
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/RoomRenderer":16}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _viewsUiRenderer = require('../views/UiRenderer');

var _viewsUiRenderer2 = _interopRequireDefault(_viewsUiRenderer);

var _default = (function () {
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
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/UiRenderer":18}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

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

    _createClass(_default, [{
        key: 'loop',
        value: function loop() {
            var _this = this;

            this.frame = this.frame || 1;
            this.frame = this.frame % _Config2['default'].FPS ? this.frame : 1;
            this._ctx.fillStyle = "#000";
            this._ctx.fillRect(0, 0, _Config2['default'].CANVAS_WIDTH, _Config2['default'].CANVAS_HEIGHT);

            this.room.render(this._ctx, this.frame);

            this.players.forEach(function (player) {
                _this._ctx.save();
                player.render(_this._ctx, _this.frame);
                _this._ctx.restore();
            });

            this._ctx.save();
            this.necro.render(this._ctx, this.frame);
            this._ctx.restore();

            this._ctx.save();
            this.ui.render(this._ctx, this.frame);
            this._ctx.restore();
            this.frame++;

            setTimeout(function () {
                window.requestAnimationFrame(_this.loop.bind(_this));
            }, 1000 / _Config2['default'].FPS);
        }

        /**
         * Resize Handler
         * @todo: does this belong here?
         */
    }, {
        key: 'resize',
        value: function resize() {
            console.log("resize");
            _Config2['default'].calculate();
            this._canvas.width = _Config2['default'].CANVAS_WIDTH;
            this._canvas.height = _Config2['default'].CANVAS_HEIGHT;
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

            //Initialize all players
            //for(let y = 0; y < Config.TILE_Y - 2; y++) {
            //for(let x = 0; x < Config.TILE_X; x++) {
            //let p = new Player(x, y);
            //players.push(p);
            //playerPromises.push(p.init());
            //}
            //}

            // Create 4 players
            var p1 = new _modelsPlayer2['default'](13, 3, "ROMEDA");
            players.push(p1);
            var p2 = new _modelsPlayer2['default'](14, 4, "Stooks");
            players.push(p2);
            var p3 = new _modelsPlayer2['default'](13, 5, "Mecha");
            players.push(p3);
            var p4 = new _modelsPlayer2['default'](14, 6, "Space Squid");
            players.push(p4);

            // Init all players
            playerPromises.push(p1.init());
            playerPromises.push(p2.init());
            playerPromises.push(p3.init());
            playerPromises.push(p4.init());

            this.players = new Set(players);

            //// Add a baddie
            this.necro = new _modelsMonster2['default'](1, 1);
            playerPromises.push(this.necro.init());

            // Initialize UI
            this.ui = new _modelsBattleUi2['default'](0, 0, 0, 0, players, players);
            playerPromises.push(this.ui.init());

            // Initialize Room
            this.room = new _modelsRoom2['default'](_modelsRoom2['default'].TYPE_OUTSIDE);
            playerPromises.push(this.room.init());

            Promise.all(playerPromises).then(function () {
                window.requestAnimationFrame(_this2.loop.bind(_this2));
            });

            // Attach input listeners
            this.listener = new window.keypress.Listener();

            this.listener.simple_combo("t", function () {
                _this2.room.isMoving = !_this2.room.isMoving;
                _this2.players.forEach(function (player) {
                    player.isWalking = !player.isWalking;
                });
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
            ctx.drawImage.apply(ctx, [this.image, this.object.isWalking ? _Config2['default'].SPRITE_SIZE * (this.frame * 2) : 0, // DX
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
    }, {
        key: 'render',
        value: function render(ctx, frame) {}
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXR0bGVVaS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Nb25zdGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1BsYXllci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvbW9kZWxzL1VpLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvRW5naW5lLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvVXRpbHMuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9CYXR0bGVVaVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvTW9uc3RlclJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvT2JqZWN0UmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Jvb21SZW5kZXJlci5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL1Nwcml0ZVJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvVWlSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7aUNDQW1CLHVCQUF1Qjs7Ozs7QUFHMUMsSUFBSSxJQUFJLEdBQUcsbUNBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ05aLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLaEIsTUFBTSxDQUFDLFNBQVMsR0FBRyxZQUFXO0FBQzFCLFVBQU0sQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDOzs7QUFHeEIsVUFBTSxDQUFDLFlBQVksR0FBSSxJQUFJLENBQUM7QUFDNUIsVUFBTSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7O0FBRTVCLFVBQU0sQ0FBQyxZQUFZLEdBQUksTUFBTSxDQUFDLFVBQVUsR0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO0FBQzNELFVBQU0sQ0FBQyxhQUFhLEdBQUcsQUFBQyxNQUFNLENBQUMsWUFBWSxHQUFDLE1BQU0sQ0FBQyxhQUFhLEdBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQzs7O0FBR3RGLFFBQUcsTUFBTSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzFDLGNBQU0sQ0FBQyxhQUFhLEdBQUksTUFBTSxDQUFDLFdBQVcsR0FBQyxNQUFNLENBQUMs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VSxhQUFPLE1BQU0sQ0FBQyxDQUFDO0FBQzdCLHNCQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksU0FBUyxHQUFDLENBQUMsQ0FBQztBQUM3QixzQkFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFNBQVMsR0FBQyxDQUFDLENBQUM7QUFDN0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7QUFDM0Isc0JBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUM7O0FBRTNCLGVBQUcsQ0FBQyxVQUFVLE1BQUEsQ0FBZCxHQUFHLHFCQUFlLFVBQVUsRUFBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQjlCLGVBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO0FBQ3RCLGdCQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDckQsZUFBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7QUFDdkIsZUFBRyxDQUFDLElBQUksTUFBQSxDQUFSLEdBQUcscUJBQVMsVUFBVSxFQUFDLENBQUM7QUFDeEIsZUFBRyxDQUFDLElBQUksRUFBRSxDQUFDOztBQUVYLGVBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtTQUNoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL3NlcnZpY2VzL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGdhbWUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuXG4vLyBJbml0aWFsaXplIGl0XG5nYW1lLmluaXQoKTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuY2FsY3VsYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgY29uZmlnLlBFUkNFTlRBR0UgPSAuOTA7XG5cbiAgICAvLyAxNng5IEFzcGVjdCBSYXRpb1xuICAgIGNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbiAgICBjb25maWcuQVNQRUNUX0hFSUdIVCA9IDEwODA7XG5cbiAgICBjb25maWcuQ0FOVkFTX1dJRFRIICA9IHdpbmRvdy5vdXRlcldpZHRoKmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgIGNvbmZpZy5DQU5WQVNfSEVJR0hUID0gKGNvbmZpZy5DQU5WQVNfV0lEVEgqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgaWYoY29uZmlnLkNBTlZBU19IRUlHSFQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgY29uZmlnLkNBTlZBU19IRUlHSFQgID0gd2luZG93Lm91dGVySGVpZ2h0KmNvbmZpZy5QRVJDRU5UQUdFO1xuICAgICAgICBjb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIH1cblxuICAgIGNvbmZpZy5USUxFX1ggPSAxNjsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuICAgIGNvbmZpZy5USUxFX1kgPSAoY29uZmlnLlRJTEVfWCpjb25maWcuQVNQRUNUX0hFSUdIVCkvY29uZmlnLkFTUEVDVF9XSURUSDtcblxuICAgIGNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG5cbiAgICBjb25maWcuRlBTID0gMTA7XG59XG5cbmNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IE9iamVjdFJlbmRlcmVyIGZyb20gJy4uL3ZpZXdzL09iamVjdFJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcykge1xuICAgICAgICB0aGlzLnhQb3MgPSB4UG9zIHx8IDA7XG4gICAgICAgIHRoaXMueVBvcyA9IHlQb3MgfHwgMDtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IE9iamVjdFJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcihjdHgsIGZyYW1lKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgVWkgZnJvbSAnLi9VaSc7XG5pbXBvcnQgQmF0dGxlVWlSZW5kZXJlciBmcm9tICcuLi92aWV3cy9CYXR0bGVVaVJlbmRlcmVyJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBVaSB7XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIFVJIHdpbmRvd1xuICAgICAqXG4gICAgICogQHBhcmFtIHdpZHRoICAgICAgICAgICAgLSAlIFdpZHRoIG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIGhlaWdodCAgICAgICAgICAgLSAlIEhlaWdodCBvZiB0aGUgVUkgRWxlbWVudFxuICAgICAqIEBwYXJhbSBvZmZzZXRYICAgICAgICAgIC0gJSBYIG9mZnNldFxuICAgICAqIEBwYXJhbSBvZmZzZXRZICAgICAgICAgIC0gJSBZIG9mZnNldFxuICAgICAqIEBwYXJhbSBwbGF5ZXJDaGFyYWN0ZXJzIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqIEBwYXJhbSBlbmVtaWVzICAgICAgICAgIC0gYXJyYXkgb2YgcGxheWVyQ2hhcmFjdGVyc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIG9mZnNldFgsIG9mZnNldFksIHBsYXllckNoYXJhY3RlcnMsIGVuZW1pZXMpIHtcbiAgICAgICAgc3VwZXIod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJDaGFyYWN0ZXJzID0gcGxheWVyQ2hhcmFjdGVycztcbiAgICAgICAgdGhpcy5lbmVtaWVzICAgICAgICAgID0gZW5lbWllcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXphdGlvbiBQcm9taXNlXG4gICAgICovXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4ge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlciA9IG5ldyBCYXR0bGVVaVJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuaW1wb3J0IE1vbnN0ZXJSZW5kZXJlciBmcm9tICcuLi92aWV3cy9Nb25zdGVyUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcykge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcbiAgICAgICAgLy8gRGVmaW5lIHRoZSBTcGlydGUgQXNzb2NpYXRlZCB3aXRoIHRoZSBQbGF5ZXJcbiAgICAgICAgdGhpcy5zcHJpdGVSZXNvdXJjZSA9ICcvZGlzdC9yZXNvdXJjZXMvaW1hZ2VzL25lY3JvLXNwcml0ZS5wbmcnO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgTW9uc3RlclJlbmRlcmVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5pbml0KClcbiAgICAgICAgICAgICAgICAudGhlbihyZXMpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcywgbmFtZSkge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcblxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuXG4gICAgICAgIC8vIERlZmluZSB0aGUgU3BpcnRlIEFzc29jaWF0ZWQgd2l0aCB0aGUgUGxheWVyXG4gICAgICAgIHRoaXMuc3ByaXRlUmVzb3VyY2UgPSAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9zcHJpdGVzaGVldC5wbmcnO1xuICAgICAgICAvL3RoaXMuc3ByaXRlUmVzb3VyY2UgPSAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy9hc3Ryb2xvZ2lzdC5wbmcnO1xuXG4gICAgICAgIHRoaXMuaXNXYWxraW5nID0gZmFsc2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IFJvb21SZW5kZXJlciBmcm9tICcuLi92aWV3cy9Sb29tUmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9DQVZFKCkgICAgeyByZXR1cm4gJy9kaXN0L3Jlc291cmNlcy9pbWFnZXMvZmZ2LWJnLnBuZyc7fVxuICAgIHN0YXRpYyBnZXQgVFlQRV9PVVRTSURFKCkgeyByZXR1cm4gJy9kaXN0L3Jlc291cmNlcy9pbWFnZXMvZmZ2LWJnMi5wbmcnO31cblxuICAgIGNvbnN0cnVjdG9yKHR5cGUpIHtcbiAgICAgICAgdGhpcy5yb29tQmdSZXNvdXJjZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgICAgICAgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFJvb21SZW5kZXJlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuaW5pdCgpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4LCBmcmFtZSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFVpUmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvVWlSZW5kZXJlcic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgVUkgd2luZG93XG4gICAgICpcbiAgICAgKiBAcGFyYW0gd2lkdGggICAtICUgV2lkdGggb2YgdGhlIFVJIEVsZW1lbnRcbiAgICAgKiBAcGFyYW0gaGVpZ2h0ICAtICUgSGVpZ2h0IG9mIHRoZSBVSSBFbGVtZW50XG4gICAgICogQHBhcmFtIG9mZnNldFggLSAlIFggb2Zmc2V0XG4gICAgICogQHBhcmFtIG9mZnNldFkgLSAlIFkgb2Zmc2V0XG4gICAgICovXG4gICAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgb2Zmc2V0WCwgb2Zmc2V0WSkge1xuICAgICAgICB0aGlzLmJnICAgICAgPSAnL2Rpc3QvcmVzb3VyY2VzL2ltYWdlcy91aS1iZy5wbmcnO1xuICAgICAgICB0aGlzLndpZHRoICAgPSB3aWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgID0gaGVpZ2h0O1xuICAgICAgICB0aGlzLm9mZnNldFggPSBvZmZzZXRYO1xuICAgICAgICB0aGlzLm9mZnNldFkgPSBvZmZzZXRZO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemF0aW9uIFByb21pc2VcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyID0gbmV3IFVpUmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgTG9nZ2VyICAgZnJvbSAnLi9Mb2dnZXInO1xuaW1wb3J0IFBsYXllciAgIGZyb20gJy4uL21vZGVscy9QbGF5ZXInO1xuaW1wb3J0IE1vbnN0ZXIgIGZyb20gJy4uL21vZGVscy9Nb25zdGVyJztcbmltcG9ydCBSb29tICAgICBmcm9tICcuLi9tb2RlbHMvUm9vbSc7XG5pbXBvcnQgVWkgICAgICAgZnJvbSAnLi4vbW9kZWxzL1VpJztcbmltcG9ydCBCYXR0bGVVaSBmcm9tICcuLi9tb2RlbHMvQmF0dGxlVWknO1xuaW1wb3J0IFV0aWxzICAgIGZyb20gJy4vVXRpbHMnO1xuaW1wb3J0IENvbmZpZyAgIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLl9jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgfVxuXG4gICAgbG9vcCgpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IHRoaXMuZnJhbWUgfHwgMTtcbiAgICAgICAgdGhpcy5mcmFtZSA9ICh0aGlzLmZyYW1lJUNvbmZpZy5GUFMpID8gdGhpcy5mcmFtZSA6IDE7XG4gICAgICAgIHRoaXMuX2N0eC5maWxsU3R5bGUgPSBcIiMwMDBcIjtcbiAgICAgICAgdGhpcy5fY3R4LmZpbGxSZWN0KDAsIDAsIENvbmZpZy5DQU5WQVNfV0lEVEgsIENvbmZpZy5DQU5WQVNfSEVJR0hUKTtcblxuICAgICAgICB0aGlzLnJvb20ucmVuZGVyKHRoaXMuX2N0eCwgdGhpcy5mcmFtZSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHRoaXMuX2N0eC5zYXZlKCk7XG4gICAgICAgICAgICBwbGF5ZXIucmVuZGVyKHRoaXMuX2N0eCwgdGhpcy5mcmFtZSk7XG4gICAgICAgICAgICB0aGlzLl9jdHgucmVzdG9yZSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLl9jdHguc2F2ZSgpO1xuICAgICAgICB0aGlzLm5lY3JvLnJlbmRlcih0aGlzLl9jdHgsIHRoaXMuZnJhbWUpO1xuICAgICAgICB0aGlzLl9jdHgucmVzdG9yZSgpO1xuXG4gICAgICAgIHRoaXMuX2N0eC5zYXZlKCk7XG4gICAgICAgIHRoaXMudWkucmVuZGVyKHRoaXMuX2N0eCwgdGhpcy5mcmFtZSk7XG4gICAgICAgIHRoaXMuX2N0eC5yZXN0b3JlKCk7XG4gICAgICAgIHRoaXMuZnJhbWUrKztcblxuICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcbiAgICAgICAgfSwgMTAwMC9Db25maWcuRlBTKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNpemUgSGFuZGxlclxuICAgICAqIEB0b2RvOiBkb2VzIHRoaXMgYmVsb25nIGhlcmU/XG4gICAgICovXG4gICAgcmVzaXplKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcInJlc2l6ZVwiKTtcbiAgICAgICAgQ29uZmlnLmNhbGN1bGF0ZSgpO1xuICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSBDb25maWcuQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gQ29uZmlnLkNBTlZBU19IRUlHSFQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVxdWVzdCB0aGUgZ2FtZSBnb2VzIGZ1bGwgc2NyZWVuLCB3aWxsIGZ1bGxzY3JlZW4gdGhlIGNhbnZhcyBlbGVtZW50XG4gICAgICogRm91bmQ6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9GdWxsc2NyZWVuX0FQSVxuICAgICAqL1xuICAgIHJlcXVlc3RGdWxsc2NyZWVuKCkge1xuICAgICAgICBpZiAodGhpcy5fY2FudmFzLnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMucmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLm1zUmVxdWVzdEZ1bGxzY3JlZW4oKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9jYW52YXMubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2NhbnZhcy53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplIHRoZSBlbmdpbmVcbiAgICAgKi9cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgIHRoaXMuX2N0eCA9IHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB0aGlzLl9jdHguaW1hZ2VTbW9vdGhpbmdFbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHBsYXllcnMgPSBbXTtcbiAgICAgICAgbGV0IHBsYXllclByb21pc2VzID0gW107XG5cbiAgICAgICAgIC8vSW5pdGlhbGl6ZSBhbGwgcGxheWVyc1xuICAgICAgICAvL2ZvcihsZXQgeSA9IDA7IHkgPCBDb25maWcuVElMRV9ZIC0gMjsgeSsrKSB7XG4gICAgICAgICAgICAvL2ZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YOyB4KyspIHtcbiAgICAgICAgICAgICAgICAvL2xldCBwID0gbmV3IFBsYXllcih4LCB5KTtcbiAgICAgICAgICAgICAgICAvL3BsYXllcnMucHVzaChwKTtcbiAgICAgICAgICAgICAgICAvL3BsYXllclByb21pc2VzLnB1c2gocC5pbml0KCkpO1xuICAgICAgICAgICAgLy99XG4gICAgICAgIC8vfVxuXG4gICAgICAgIC8vIENyZWF0ZSA0IHBsYXllcnNcbiAgICAgICAgbGV0IHAxID0gbmV3IFBsYXllcigxMywgMywgXCJST01FREFcIik7XG4gICAgICAgIHBsYXllcnMucHVzaChwMSk7XG4gICAgICAgIGxldCBwMiA9IG5ldyBQbGF5ZXIoMTQsIDQsIFwiU3Rvb2tzXCIpO1xuICAgICAgICBwbGF5ZXJzLnB1c2gocDIpO1xuICAgICAgICBsZXQgcDMgPSBuZXcgUGxheWVyKDEzLCA1LCBcIk1lY2hhXCIpO1xuICAgICAgICBwbGF5ZXJzLnB1c2gocDMpO1xuICAgICAgICBsZXQgcDQgPSBuZXcgUGxheWVyKDE0LCA2LCBcIlNwYWNlIFNxdWlkXCIpO1xuICAgICAgICBwbGF5ZXJzLnB1c2gocDQpO1xuXG4gICAgICAgIC8vIEluaXQgYWxsIHBsYXllcnNcbiAgICAgICAgcGxheWVyUHJvbWlzZXMucHVzaChwMS5pbml0KCkpO1xuICAgICAgICBwbGF5ZXJQcm9taXNlcy5wdXNoKHAyLmluaXQoKSk7XG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2gocDMuaW5pdCgpKTtcbiAgICAgICAgcGxheWVyUHJvbWlzZXMucHVzaChwNC5pbml0KCkpO1xuXG4gICAgICAgIHRoaXMucGxheWVycyA9IG5ldyBTZXQocGxheWVycyk7XG5cbiAgICAgICAgLy8vLyBBZGQgYSBiYWRkaWVcbiAgICAgICAgdGhpcy5uZWNybyA9IG5ldyBNb25zdGVyKDEsIDEpO1xuICAgICAgICBwbGF5ZXJQcm9taXNlcy5wdXNoKHRoaXMubmVjcm8uaW5pdCgpKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIFVJXG4gICAgICAgIHRoaXMudWkgPSBuZXcgQmF0dGxlVWkoMCwgMCwgMCwgMCwgcGxheWVycywgcGxheWVycyk7XG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2godGhpcy51aS5pbml0KCkpO1xuXG4gICAgICAgIC8vIEluaXRpYWxpemUgUm9vbVxuICAgICAgICB0aGlzLnJvb20gPSBuZXcgUm9vbShSb29tLlRZUEVfT1VUU0lERSk7XG4gICAgICAgIHBsYXllclByb21pc2VzLnB1c2godGhpcy5yb29tLmluaXQoKSk7XG5cblxuICAgICAgICBQcm9taXNlLmFsbChwbGF5ZXJQcm9taXNlcykudGhlbigoKT0+e1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIEF0dGFjaCBpbnB1dCBsaXN0ZW5lcnNcbiAgICAgICAgdGhpcy5saXN0ZW5lciA9IG5ldyB3aW5kb3cua2V5cHJlc3MuTGlzdGVuZXIoKTtcblxuICAgICAgICB0aGlzLmxpc3RlbmVyLnNpbXBsZV9jb21ibyhcInRcIiwgKCk9PntcbiAgICAgICAgICAgIHRoaXMucm9vbS5pc01vdmluZyA9ICF0aGlzLnJvb20uaXNNb3Zpbmc7XG4gICAgICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgICAgIHBsYXllci5pc1dhbGtpbmcgPSAhcGxheWVyLmlzV2Fsa2luZztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIEF0dGFjaCByZXNpemUgZXZlbnRcbiAgICAgICAgLy93aW5kb3cucmVzaXplID0gdGhpcy5yZXNpemUuYmluZCh0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5yZXNpemUuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgLy8gQXR0YWNoIEZ1bGxzY3JlZW4gZXZlbnRcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMucmVxdWVzdEZ1bGxzY3JlZW4uYmluZCh0aGlzKSk7XG5cbiAgICAgICAgTG9nZ2VyLmJhbm5lcignR2FtZSBTdGFydGVkJyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBiYW5uZXIobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnLnRvVXBwZXJDYXNlKCl9YCwgJ2ZvbnQtc2l6ZTogMzBweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGxpbWl0bG9vcChmbiwgZnBzKSB7XG4gICAgICAgIC8vIFVzZSB2YXIgdGhlbiA9IERhdGUubm93KCk7IGlmIHlvdVxuICAgICAgICAvLyBkb24ndCBjYXJlIGFib3V0IHRhcmdldHRpbmcgPCBJRTlcbiAgICAgICAgdmFyIHRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBjdXN0b20gZnBzLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gNjBcbiAgICAgICAgZnBzID0gZnBzIHx8IDYwO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgICAgICAgICAgLy8gYWdhaW4sIERhdGUubm93KCkgaWYgaXQncyBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAvLyBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCkgaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBqdXN0IFxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZW4gPSBub3csIHdoaWNoIGNhbiBlbmQgdXAgbG93ZXJpbmcgb3ZlcmFsbCBmcHNcbiAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZm5cbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KDApKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzcGVjdEhlaWdodENhbGModzIpIHtcbiAgICAgICAgbGV0IHcxID0gMTkyMDtcbiAgICAgICAgbGV0IGgxID0gMTA4MDtcbiAgICAgICAgcmV0dXJuIGgxKncyL3cxO1xuICAgIH1cbn1cbiIsImltcG9ydCBVaVJlbmRlcmVyIGZyb20gJy4vVWlSZW5kZXJlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgVWlSZW5kZXJlciB7XG4gICAgcmVuZGVyKGN0eCkge1xuICAgICAgICBzdXBlci5yZW5kZXIoY3R4KTtcblxuICAgICAgICBsZXQgZm9udFNpemUgICAgPSA1KkNvbmZpZy5TUFJJVEVfU0NBTEU7XG4gICAgICAgIGN0eC5mb250ICAgICAgICA9IGZvbnRTaXplICsgXCJweCBDb3VyaWVyIE5ld1wiO1xuICAgICAgICBjdHguZmlsbFN0eWxlICAgPSBcIiNmZmZmZmZcIjtcblxuICAgICAgICBsZXQgeXBvcyA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9ZLXRoaXMuX3RpbGVIZWlnaHQpO1xuICAgICAgICBsZXQgeHBvcyA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKihDb25maWcuVElMRV9YIC0gNClcbiAgICAgICAgdGhpcy51aS5wbGF5ZXJDaGFyYWN0ZXJzLmZvckVhY2goKHBsYXllcik9PntcbiAgICAgICAgICAgIHlwb3MgKz0gZm9udFNpemUqMjtcbiAgICAgICAgICAgIGN0eC5maWxsVGV4dCguLi5bXG4gICAgICAgICAgICAgICAgcGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgeHBvcyxcbiAgICAgICAgICAgICAgICB5cG9zXG4gICAgICAgICAgICBdKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IFNwcml0ZVJlbmRlcmVyIGZyb20gJy4vU3ByaXRlUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBTcHJpdGVSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Iob2JqZWN0KSB7XG4gICAgICAgIHN1cGVyKG9iamVjdC5zcHJpdGVSZXNvdXJjZSk7XG4gICAgICAgIHRoaXMub2JqZWN0ID0gb2JqZWN0O1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgMCxcbiAgICAgICAgICAgIDAsIC8vIERZXG4gICAgICAgICAgICB0aGlzLmltYWdlLndpZHRoLCAvLyBkV2lkdGhcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UuaGVpZ2h0LCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAyMCxcbiAgICAgICAgICAgIGZyYW1lLCAvLyBZcG9zXG4gICAgICAgICAgICB0aGlzLmltYWdlLndpZHRoKkNvbmZpZy5TUFJJVEVfU0NBTEUsIC8vIHNXaWR0aFxuICAgICAgICAgICAgdGhpcy5pbWFnZS5oZWlnaHQqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICBdKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlUmVuZGVyZXIgZnJvbSAnLi9TcHJpdGVSZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFNwcml0ZVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LnNwcml0ZVJlc291cmNlKTtcbiAgICAgICAgdGhpcy5vYmplY3QgPSBvYmplY3Q7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCwgZnJhbWUpIHtcbiAgICAgICAgdGhpcy5mcmFtZSA9IChmcmFtZSA8IENvbmZpZy5GUFMvMikgPyAwIDogMTtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC5pc1dhbGtpbmcgPyBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUgKiAyKSA6IDAsIC8vIERYXG4gICAgICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUsIC8vIGRXaWR0aFxuICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZEhlaWdodFxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0LnhQb3MqKENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFKSwgLy8gc3ggfiBSZXBsYWNlIHdpdGggb2JqZWN0IFggUG9zXG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QueVBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeSB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWSBQb3NcbiAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSwgLy8gc1dpZHRoXG4gICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUgIC8vIHNIZWlnaHRcbiAgICAgICAgICAgIF0pO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICB9XG59XG4iLCJpbXBvcnQgU3ByaXRlUmVuZGVyZXIgZnJvbSAnLi9TcHJpdGVSZW5kZXJlcic7XG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vc2VydmljZXMvVXRpbHMnO1xuaW1wb3J0IENvbmZpZyBmcm9tICcuLi8uLi9Db25maWcnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIFNwcml0ZVJlbmRlcmVyIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIob2JqZWN0LnJvb21CZ1Jlc291cmNlKTtcblxuICAgICAgICB0aGlzLnJvb20gPSBvYmplY3Q7XG4gICAgICAgIHRoaXMuX29mZnNldFggPSAwO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgsIGZyYW1lKSB7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICB0aGlzLmltYWdlLFxuICAgICAgICAgICAgdGhpcy5fb2Zmc2V0WCAtIENvbmZpZy5DQU5WQVNfV0lEVEgsIC8vIERYXG4gICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19XSURUSCwgLy8gZFdpZHRoXG4gICAgICAgICAgICBDb25maWcuQ0FOVkFTX0hFSUdIVCwgLy8gZEhlaWdodFxuICAgICAgICBdKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKC4uLltcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UsXG4gICAgICAgICAgICB0aGlzLl9vZmZzZXRYLCAvLyBEWFxuICAgICAgICAgICAgMCwgLy8gRFlcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsIC8vIGRXaWR0aFxuICAgICAgICAgICAgQ29uZmlnLkNBTlZBU19IRUlHSFQsIC8vIGRIZWlnaHRcbiAgICAgICAgXSk7XG5cbiAgICAgICAgaWYodGhpcy5yb29tLmlzTW92aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9vZmZzZXRYICs9IDEwO1xuICAgICAgICAgICAgaWYodGhpcy5fb2Zmc2V0WCA+IENvbmZpZy5DQU5WQVNfV0lEVEgpIHRoaXMuX29mZnNldFggPSAwO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiaW1wb3J0IFJlbmRlcmVyIGZyb20gJy4vUmVuZGVyZXInO1xuaW1wb3J0IFV0aWxzIGZyb20gJy4uL3NlcnZpY2VzL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3Ioc3ByaXRlUmVzb3VyY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fc3ByaXRlUmVzb3VyY2UgPSBzcHJpdGVSZXNvdXJjZTtcbiAgICB9XG5cbiAgICBpbml0KCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcywgcmVqKT0+e1xuICAgICAgICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgICAgICAgdGhpcy5pbWFnZS5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXModGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmltYWdlLnNyYyA9IHRoaXMuX3Nwcml0ZVJlc291cmNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4LCBmcmFtZSkge1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgZXh0ZW5kcyBSZW5kZXJlciB7XG4gICAgY29uc3RydWN0b3IodWkpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy51aSA9IHVpO1xuICAgICAgICB0aGlzLl91aUJnID0gdWkuYmc7XG4gICAgICAgIHRoaXMuX3RpbGVIZWlnaHQgPSAyO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopPT57XG4gICAgICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgICAgICB0aGlzLmltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJlcyh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uuc3JjID0gdGhpcy5fdWlCZztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuXG4gICAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgICAgbGV0IGJnUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0IC0gMzAwXG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IHVpUmVjdCA9IFtcbiAgICAgICAgICAgIDAsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSooQ29uZmlnLlRJTEVfWS10aGlzLl90aWxlSGVpZ2h0KSxcbiAgICAgICAgICAgIENvbmZpZy5DQU5WQVNfV0lEVEgsXG4gICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSp0aGlzLl90aWxlSGVpZ2h0XG4gICAgICAgIF07XG5cbiAgICAgICAgbGV0IGdyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KC4uLmJnUmVjdCk7XG5cbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDAsIFwiIzY0QTM1N1wiKTtcbiAgICAgICAgZ3JhZGllbnQuYWRkQ29sb3JTdG9wKDEsIFwiIzAwMzcwMFwiKTtcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50O1xuICAgICAgICBjdHguZmlsbFJlY3QoLi4udWlSZWN0KTtcblxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiM4RDgwNDVcIjtcblxuICAgICAgICAvLyBUaGUgc3Ryb2tlIGlzIG1pZGRsZSBhbGlnbmVkIHdpdGggdGhlIGVkZ2VzIG9mIHRoZSBib3hcbiAgICAgICAgbGV0IGxpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzMyO1xuICAgICAgICAvL2xldCBsaW5lV2lkdGggPSA1O1xuICAgICAgICBjdHgubGluZVdpZHRoID0gbGluZVdpZHRoO1xuXG4gICAgICAgIGxldCBzdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIHN0cm9rZVJlY3RbMF0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMV0gKz0gbGluZVdpZHRoLzI7XG4gICAgICAgIHN0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICBzdHJva2VSZWN0WzNdIC09IGxpbmVXaWR0aDtcblxuICAgICAgICBjdHguc3Ryb2tlUmVjdCguLi5zdHJva2VSZWN0KTtcblxuICAgICAgICAvLyBUcnlpbmcgdG8gZ2V0IHNlY29uZCBib3JkZXJcbiAgICAgICAgLy9jdHguc3Ryb2tlU3R5bGUgPSBcIiNGRkZGRkZcIjtcblxuICAgICAgICAvL2xpbmVXaWR0aCA9IENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLzQ4O1xuICAgICAgICAvL2N0eC5saW5lV2lkdGggPSBsaW5lV2lkdGg7XG5cbiAgICAgICAgLy9zdHJva2VSZWN0ID0gWy4uLnVpUmVjdF07XG4gICAgICAgIC8vc3Ryb2tlUmVjdFswXSArPSBsaW5lV2lkdGgvMjtcbiAgICAgICAgLy9zdHJva2VSZWN0WzFdICs9IGxpbmVXaWR0aC8yO1xuICAgICAgICAvL3N0cm9rZVJlY3RbMl0gLT0gbGluZVdpZHRoO1xuICAgICAgICAvL3N0cm9rZVJlY3RbM10gLT0gbGluZVdpZHRoO1xuXG4gICAgICAgIC8vY3R4LnN0cm9rZVJlY3QoLi4uc3Ryb2tlUmVjdCk7XG5cbiAgICAgICAgLy8gRmlsbCBiZyB3aXRoIHBhdGVyblxuXG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IDAuMTtcbiAgICAgICAgbGV0IHBhdGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKHRoaXMuaW1hZ2UsIFwicmVwZWF0XCIpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gcGF0ZXJuO1xuICAgICAgICBjdHgucmVjdCguLi5zdHJva2VSZWN0KTtcbiAgICAgICAgY3R4LmZpbGwoKTtcblxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgfVxufVxuIl19
