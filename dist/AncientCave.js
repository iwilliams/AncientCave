(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _appServicesEngine = require('./app/services/Engine');

var _appServicesEngine2 = _interopRequireDefault(_appServicesEngine);

// Create new instance of game
var game = new _appServicesEngine2['default'](document.body);

// Initialize it
game.init();

},{"./app/services/Engine":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var config = {};

// 16x9 Aspect Ratio
config.ASPECT_WIDTH = 1920;
config.ASPECT_HEIGHT = 1080;

config.CANVAS_WIDTH = 1000;
config.CANVAS_HEIGHT = config.CANVAS_WIDTH * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

config.TILE_X = 16; // MUST BE MULTIPLE OF 16
config.TILE_Y = config.TILE_X * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

config.SPRITE_SIZE = 24;
config.SPRITE_SCALE = config.CANVAS_WIDTH / (config.TILE_X * config.SPRITE_SIZE);

config.FPS = 1000 / 10;

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
        value: function render(ctx) {
            this.renderer.render(ctx);
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../views/ObjectRenderer":8}],4:[function(require,module,exports){
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

    function _default(xPos, yPos) {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this, xPos, yPos);

        // Define the Spirte Associated with the Player
        this.spriteResource = '/dist/resources/images/spritesheet.png';
    }

    return _default;
})(_BaseObject3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"./BaseObject":3}],5:[function(require,module,exports){
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

            this._ctx.fillRect(0, 0, _Config2['default'].CANVAS_WIDTH, _Config2['default'].CANVAS_HEIGHT);

            if (!this.frame) this.frame = 0;

            this.players.forEach(function (player) {
                player.render(_this._ctx);
            });

            this.frame = this.frame ? 0 : 1;

            setTimeout(function () {
                window.requestAnimationFrame(_this.loop.bind(_this));
            }, _Config2['default'].FPS);
        }
    }, {
        key: 'init',
        value: function init() {
            var _this2 = this;

            this._element.appendChild(this._canvas);
            this._ctx = this._canvas.getContext('2d');
            this._ctx.imageSmoothingEnabled = false;

            var players = [];
            var playerPromises = [];

            // Initialize all players
            for (var y = 0; y < _Config2['default'].TILE_Y; y++) {
                for (var x = 0; x < _Config2['default'].TILE_X; x++) {
                    var p = new _modelsPlayer2['default'](x, y);
                    players.push(p);
                    playerPromises.push(p.init());
                }
            }
            this.players = new Set(players);

            Promise.all(playerPromises).then(function () {
                window.requestAnimationFrame(_this2.loop.bind(_this2));
            });

            _Logger2['default'].banner('Game Started');
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../models/Player":4,"./Logger":6,"./Utils":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
        value: function render(ctx) {
            if (!this.frame) this.frame = 0;
            ctx.drawImage.apply(ctx, [this.image, _Config2['default'].SPRITE_SIZE * (this.frame * 6), // DX
            0, // DY
            _Config2['default'].SPRITE_SIZE, // dWidth
            _Config2['default'].SPRITE_SIZE, // dHeight
            this.object.xPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sx ~ Replace with object X Pos
            this.object.yPos * (_Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE), // sy ~ Replace with object Y Pos
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE, // sWidth
            _Config2['default'].SPRITE_SIZE * _Config2['default'].SPRITE_SCALE // sHeight
            ]);
            this.frame = this.frame ? 0 : 1;
        }
    }]);

    return _default;
})(_SpriteRenderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":7,"./SpriteRenderer":10}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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
        value: function render(ctx) {}
    }]);

    return _default;
})(_Renderer3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../../Config":2,"../services/Utils":7,"./Renderer":9}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0FuY2llbnRDYXZlLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9Db25maWcuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvQmFzZU9iamVjdC5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9QbGF5ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9FbmdpbmUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9Mb2dnZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9zZXJ2aWNlcy9VdGlscy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3ZpZXdzL09iamVjdFJlbmRlcmVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvdmlld3MvUmVuZGVyZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC92aWV3cy9TcHJpdGVSZW5kZXJlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7aUNDQW1CLHVCQUF1Qjs7Ozs7QUFHMUMsSUFBSSxJQUFJLEdBQUcsbUNBQVcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzs7QUFHckMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7OztBQ05aLElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQzs7O0FBR2hCLE1BQU0sQ0FBQyxZ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WUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLENBQUM7S0FDekM7Ozs7ZUFFRyxnQkFBRzs7O0FBQ0gsbUJBQU8sSUFBSSxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFHO0FBQzNCLHNCQUFLLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzNDLHNCQUFLLEtBQUssQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUMzQix1QkFBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNiLENBQUE7QUFDRCxzQkFBSyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQUssZUFBZSxDQUFDO2FBQ3pDLENBQUMsQ0FBQztTQUNOOzs7ZUFFSyxnQkFBQyxHQUFHLEVBQUUsRUFDWCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgRW5naW5lIGZyb20gJy4vYXBwL3NlcnZpY2VzL0VuZ2luZSc7XG5cbi8vIENyZWF0ZSBuZXcgaW5zdGFuY2Ugb2YgZ2FtZVxudmFyIGdhbWUgPSBuZXcgRW5naW5lKGRvY3VtZW50LmJvZHkpO1xuXG4vLyBJbml0aWFsaXplIGl0XG5nYW1lLmluaXQoKTtcblxuIiwibGV0IGNvbmZpZyA9IHt9O1xuXG4vLyAxNng5IEFzcGVjdCBSYXRpb1xuY29uZmlnLkFTUEVDVF9XSURUSCAgPSAxOTIwO1xuY29uZmlnLkFTUEVDVF9IRUlHSFQgPSAxMDgwO1xuXG5jb25maWcuQ0FOVkFTX1dJRFRIICA9IDEwMDA7XG5jb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIICogY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbmNvbmZpZy5USUxFX1ggPSAxNjsgLy8gTVVTVCBCRSBNVUxUSVBMRSBPRiAxNlxuY29uZmlnLlRJTEVfWSA9IChjb25maWcuVElMRV9YICogY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbmNvbmZpZy5TUFJJVEVfU0laRSAgID0gMjQ7XG5jb25maWcuU1BSSVRFX1NDQUxFID0gY29uZmlnLkNBTlZBU19XSURUSC8oY29uZmlnLlRJTEVfWCAqIGNvbmZpZy5TUFJJVEVfU0laRSk7XG5cbmNvbmZpZy5GUFMgPSAxMDAwLzEwO1xuXG5leHBvcnQgZGVmYXVsdCBjb25maWc7XG4iLCJpbXBvcnQgT2JqZWN0UmVuZGVyZXIgZnJvbSAnLi4vdmlld3MvT2JqZWN0UmVuZGVyZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3Rvcih4UG9zLCB5UG9zKSB7XG4gICAgICAgIHRoaXMueFBvcyA9IHhQb3MgfHwgMDtcbiAgICAgICAgdGhpcy55UG9zID0geVBvcyB8fCAwO1xuICAgIH1cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLCByZWopID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIgPSBuZXcgT2JqZWN0UmVuZGVyZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmluaXQoKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJlbmRlcihjdHgpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW5kZXIoY3R4KTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL0Jhc2VPYmplY3QnOyAvLyBDYW4ndCBjYWxsIHRoaXMgT2JqZWN0IGIvYyBvZiBjb25mbGljdCB4RFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VPYmplY3Qge1xuXG4gICAgY29uc3RydWN0b3IoeFBvcywgeVBvcykge1xuICAgICAgICBzdXBlcih4UG9zLCB5UG9zKTtcblxuICAgICAgICAvLyBEZWZpbmUgdGhlIFNwaXJ0ZSBBc3NvY2lhdGVkIHdpdGggdGhlIFBsYXllclxuICAgICAgICB0aGlzLnNwcml0ZVJlc291cmNlID0gJy9kaXN0L3Jlc291cmNlcy9pbWFnZXMvc3ByaXRlc2hlZXQucG5nJztcblxuICAgIH1cbn1cbiIsImltcG9ydCBMb2dnZXIgZnJvbSAnLi9Mb2dnZXInO1xuaW1wb3J0IFBsYXllciBmcm9tICcuLi9tb2RlbHMvUGxheWVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuL1V0aWxzJztcbmltcG9ydCBDb25maWcgZnJvbSAnLi4vLi4vQ29uZmlnJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX2NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IENvbmZpZy5DQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSBDb25maWcuQ0FOVkFTX0hFSUdIVDtcbiAgICB9XG5cbiAgICBsb29wKCkge1xuICAgICAgICB0aGlzLl9jdHguZmlsbFJlY3QoMCwgMCwgQ29uZmlnLkNBTlZBU19XSURUSCwgQ29uZmlnLkNBTlZBU19IRUlHSFQpO1xuXG4gICAgICAgIGlmKCF0aGlzLmZyYW1lKSB0aGlzLmZyYW1lID0gMDtcblxuICAgICAgICB0aGlzLnBsYXllcnMuZm9yRWFjaCgocGxheWVyKT0+e1xuICAgICAgICAgICAgcGxheWVyLnJlbmRlcih0aGlzLl9jdHgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZyYW1lID0gdGhpcy5mcmFtZSA/IDAgOiAxO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCk9PntcbiAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xuICAgICAgICB9LCBDb25maWcuRlBTKTtcbiAgICB9XG5cblxuICAgIGluaXQoKSB7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcbiAgICAgICAgdGhpcy5fY3R4ID0gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIHRoaXMuX2N0eC5pbWFnZVNtb290aGluZ0VuYWJsZWQgPSBmYWxzZTtcblxuICAgICAgICBsZXQgcGxheWVycyA9IFtdO1xuICAgICAgICBsZXQgcGxheWVyUHJvbWlzZXMgPSBbXTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGFsbCBwbGF5ZXJzXG4gICAgICAgIGZvcihsZXQgeSA9IDA7IHkgPCBDb25maWcuVElMRV9ZOyB5KyspIHtcbiAgICAgICAgICAgIGZvcihsZXQgeCA9IDA7IHggPCBDb25maWcuVElMRV9YOyB4KyspIHtcbiAgICAgICAgICAgICAgICBsZXQgcCA9IG5ldyBQbGF5ZXIoeCwgeSlcbiAgICAgICAgICAgICAgICBwbGF5ZXJzLnB1c2gocCk7XG4gICAgICAgICAgICAgICAgcGxheWVyUHJvbWlzZXMucHVzaChwLmluaXQoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gbmV3IFNldChwbGF5ZXJzKTtcblxuICAgICAgICBQcm9taXNlLmFsbChwbGF5ZXJQcm9taXNlcykudGhlbigoKT0+e1xuICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgTG9nZ2VyLmJhbm5lcignR2FtZSBTdGFydGVkJyk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBiYW5uZXIobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnLnRvVXBwZXJDYXNlKCl9YCwgJ2ZvbnQtc2l6ZTogMzBweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS5sb2cobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgc3RhdGljIGxpbWl0bG9vcChmbiwgZnBzKSB7XG4gICAgICAgIC8vIFVzZSB2YXIgdGhlbiA9IERhdGUubm93KCk7IGlmIHlvdVxuICAgICAgICAvLyBkb24ndCBjYXJlIGFib3V0IHRhcmdldHRpbmcgPCBJRTlcbiAgICAgICAgdmFyIHRoZW4gPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBjdXN0b20gZnBzLCBvdGhlcndpc2UgZmFsbGJhY2sgdG8gNjBcbiAgICAgICAgZnBzID0gZnBzIHx8IDYwO1xuICAgICAgICB2YXIgaW50ZXJ2YWwgPSAxMDAwIC8gZnBzO1xuXG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24gbG9vcCh0aW1lKXtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcblxuICAgICAgICAgICAgLy8gYWdhaW4sIERhdGUubm93KCkgaWYgaXQncyBhdmFpbGFibGVcbiAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIHZhciBkZWx0YSA9IG5vdyAtIHRoZW47XG5cbiAgICAgICAgICAgIGlmIChkZWx0YSA+IGludGVydmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRpbWVcbiAgICAgICAgICAgICAgICAvLyBub3cgLSAoZGVsdGEgJSBpbnRlcnZhbCkgaXMgYW4gaW1wcm92ZW1lbnQgb3ZlciBqdXN0IFxuICAgICAgICAgICAgICAgIC8vIHVzaW5nIHRoZW4gPSBub3csIHdoaWNoIGNhbiBlbmQgdXAgbG93ZXJpbmcgb3ZlcmFsbCBmcHNcbiAgICAgICAgICAgICAgICB0aGVuID0gbm93IC0gKGRlbHRhICUgaW50ZXJ2YWwpO1xuXG4gICAgICAgICAgICAgICAgLy8gY2FsbCB0aGUgZm5cbiAgICAgICAgICAgICAgICBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KDApKTtcbiAgICB9O1xuXG4gICAgc3RhdGljIGFzcGVjdEhlaWdodENhbGModzIpIHtcbiAgICAgICAgbGV0IHcxID0gMTkyMDtcbiAgICAgICAgbGV0IGgxID0gMTA4MDtcbiAgICAgICAgcmV0dXJuIGgxKncyL3cxO1xuICAgIH1cbn1cbiIsImltcG9ydCBTcHJpdGVSZW5kZXJlciBmcm9tICcuL1Nwcml0ZVJlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgU3ByaXRlUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICBzdXBlcihvYmplY3Quc3ByaXRlUmVzb3VyY2UpO1xuICAgICAgICB0aGlzLm9iamVjdCA9IG9iamVjdDtcbiAgICB9XG5cbiAgICByZW5kZXIoY3R4KSB7XG4gICAgICAgIGlmKCF0aGlzLmZyYW1lKSB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSguLi5bXG4gICAgICAgICAgICAgICAgdGhpcy5pbWFnZSxcbiAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqKHRoaXMuZnJhbWUgKiA2KSwgLy8gRFhcbiAgICAgICAgICAgICAgICAwLCAvLyBEWVxuICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSwgLy8gZFdpZHRoXG4gICAgICAgICAgICAgICAgQ29uZmlnLlNQUklURV9TSVpFLCAvLyBkSGVpZ2h0XG4gICAgICAgICAgICAgICAgdGhpcy5vYmplY3QueFBvcyooQ29uZmlnLlNQUklURV9TSVpFKkNvbmZpZy5TUFJJVEVfU0NBTEUpLCAvLyBzeCB+IFJlcGxhY2Ugd2l0aCBvYmplY3QgWCBQb3NcbiAgICAgICAgICAgICAgICB0aGlzLm9iamVjdC55UG9zKihDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSksIC8vIHN5IH4gUmVwbGFjZSB3aXRoIG9iamVjdCBZIFBvc1xuICAgICAgICAgICAgICAgIENvbmZpZy5TUFJJVEVfU0laRSpDb25maWcuU1BSSVRFX1NDQUxFLCAvLyBzV2lkdGhcbiAgICAgICAgICAgICAgICBDb25maWcuU1BSSVRFX1NJWkUqQ29uZmlnLlNQUklURV9TQ0FMRSAgLy8gc0hlaWdodFxuICAgICAgICAgICAgXSk7XG4gICAgICAgIHRoaXMuZnJhbWUgPSB0aGlzLmZyYW1lID8gMCA6IDE7XG4gICAgfVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgIH1cbn1cbiIsImltcG9ydCBSZW5kZXJlciBmcm9tICcuL1JlbmRlcmVyJztcbmltcG9ydCBVdGlscyBmcm9tICcuLi9zZXJ2aWNlcy9VdGlscyc7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uL0NvbmZpZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgUmVuZGVyZXIge1xuICAgIGNvbnN0cnVjdG9yKHNwcml0ZVJlc291cmNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX3Nwcml0ZVJlc291cmNlID0gc3ByaXRlUmVzb3VyY2U7XG4gICAgfVxuXG4gICAgaW5pdCgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMsIHJlaik9PntcbiAgICAgICAgICAgIHRoaXMuaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgICAgIHRoaXMuaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVzKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSB0aGlzLl9zcHJpdGVSZXNvdXJjZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKGN0eCkge1xuICAgIH1cbn1cbiJdfQ==
