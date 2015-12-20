(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

//config.DISABLE_AUDIO = true;

// 16x9 Aspect Ratio
config.ASPECT_WIDTH = 1920;
config.ASPECT_HEIGHT = 1080;

config.TILE_X = 16; // MUST BE MULTIPLE OF 16
config.TILE_Y = config.TILE_X * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;

config.calculate = function () {
    // Horizontal or Vertical percentage that the game view should occupy
    config.PERCENTAGE = 1;

    config.SPRITE_SIZE = 24;

    // Caclulate canvas width and height according to above percentage and aspect ratio
    var screenWidth = window.outerWidth;
    do {
        config.CANVAS_WIDTH = screenWidth-- * config.PERCENTAGE;
        config.CANVAS_HEIGHT = config.CANVAS_WIDTH * config.ASPECT_HEIGHT / config.ASPECT_WIDTH;
    } while (config.CANVAS_HEIGHT % config.SPRITE_SIZE !== 0);

    // Make sure the window will fit vertically
    //if(config.CANVAS_HEIGHT > window.innerHeight) {
    //config.CANVAS_HEIGHT  = window.outerHeight*config.PERCENTAGE;
    //config.CANVAS_WIDTH = (config.CANVAS_HEIGHT*config.ASPECT_WIDTH)/config.ASPECT_HEIGHT;
    //}

    // Determine Sprite Scaling
    config.SPRITE_SCALE = config.CANVAS_WIDTH / (config.TILE_X * config.SPRITE_SIZE);
    config.TILE_SIZE = config.SPRITE_SIZE * config.SPRITE_SCALE;

    // Set FPS
    config.FPS = 60;
};

if (self.document) config.calculate();

exports["default"] = config;
module.exports = exports["default"];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _default = (function () {
    function _default(states) {
        _classCallCheck(this, _default);

        this._states = states;
    }

    /**
     * Set the state if it is legal.
     */

    _createClass(_default, [{
        key: 'state',
        set: function set(state) {
            if (this._states.indexOf(state) >= 0) {
                this._state = state;
            } else {
                throw 'State ' + state + ' is not allowed';
            }
        },

        /**
         * Return the current state
         */
        get: function get() {
            return this._state;
        }

        /**
         * Return the current state
         */
    }, {
        key: 'action',
        set: function set(action) {
            this._action = action;
        },
        get: function get() {
            return this._action;
        }

        /**
         * Return the name of the state message we need to send to modify
         * this model
         */
    }, {
        key: 'stateMessage',
        get: function get() {
            return this._stateMessage;
        }
    }]);

    return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];

},{"../services/Logger":7}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('./BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var STATES = ["main menu", "lobby", "playing"];

var _default = (function (_BaseModel) {
    _inherits(_default, _BaseModel);

    _createClass(_default, [{
        key: "stateMessage",
        get: function get() {
            return "game-state";
        }
    }]);

    function _default() {
        _classCallCheck(this, _default);

        _get(Object.getPrototypeOf(_default.prototype), "constructor", this).call(this, STATES);
        this.state = "main menu";
    }

    return _default;
})(_BaseModel3["default"]);

exports["default"] = _default;
module.exports = exports["default"];

},{"./BaseModel":2}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _default = (function (_BaseModel) {
    _inherits(_default, _BaseModel);

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

        this.health = 5;

        this.maxCooldown = 120;
    }

    /**
     * Update so we know to charge cooldown meeter
     */

    _createClass(_default, [{
        key: 'chargeCooldown',
        value: function chargeCooldown(callback) {
            this.cooldown = 0;
            this._isCoolingdown = true;
        }
    }, {
        key: 'tick',
        value: function tick() {
            if (this._isCoolingdown) {
                this.cooldown++;
                if (this.cooldown >= this.maxCooldown) {
                    this._isCoolingdown = false;
                    this._readyToAttack = true;
                    if (this.onCooldown) this.onCooldown(this);
                }
            }
        }
    }]);

    return _default;
})(_BaseModel3['default']);

exports['default'] = _default;
module.exports = exports['default'];

},{"../BaseModel":2}],5:[function(require,module,exports){
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

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

// Can't call this Object b/c of conflict xD

var _servicesLogger = require('../../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _Config = require('../../../Config');

var _Config2 = _interopRequireDefault(_Config);

var JOBS = new Map();

JOBS.set("clairvoyant", {
    'name': 'clairvoyant',
    'health': 60,
    'mana': 40,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("herbalist", {
    'name': 'herbalist',
    'health': 40,
    'mana': 0,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("villain", {
    'name': 'villain',
    'health': 80,
    'mana': 20,
    'cooldown': 40,
    'position': 'front'
});

JOBS.set("knight", {
    'name': 'knight',
    'health': 100,
    'mana': 0,
    'cooldown': 100,
    'position': 'front'
});

JOBS.set("necromancer", {
    'name': 'necromancer',
    'health': 40,
    'mana': 120,
    'cooldown': 80,
    'position': 'back'
});

JOBS.set("ninja", {
    'name': 'ninja',
    'health': 60,
    'mana': 30,
    'cooldown': 30,
    'position': 'front'
});

var STATES = ["idle", "ready", "cooldown", "walking", "attacking"];

var Player = (function (_BaseModel) {
    _inherits(Player, _BaseModel);

    _createClass(Player, [{
        key: 'stateMessage',
        get: function get() {
            return "player-state";
        }
    }, {
        key: 'job',
        get: function get() {
            return this._job;
        },

        /**
         * Set this players job if it is a valid job
         */
        set: function set(jobName) {
            this._job = JOBS.get(jobName);

            // Check if it was a valid job
            if (!this._job) throw 'Job ' + jobName + ' is not allowed';

            this.maxHealth = this._job.health;
            this.health = this._job.health;

            this.maxMana = this._job.mana;
            this.mana = this._job.mana;

            this.maxCooldown = this._job.cooldown;
            this.cooldown = this._job.cooldown;
        }
    }, {
        key: 'currentAction',
        get: function get() {
            return this._currentAction;
        }
    }, {
        key: 'nextAction',
        get: function get() {
            return this._nextAction;
        }
    }, {
        key: 'name',
        get: function get() {
            return this._name;
        }
    }, {
        key: 'id',
        get: function get() {
            return this._id;
        }
    }, {
        key: 'readyToAttack',
        get: function get() {
            return this._readyToAttack;
        }
    }, {
        key: 'isBusy',
        get: function get() {
            return this._isBusy;
        }
    }, {
        key: 'actionCycle',
        get: function get() {
            return this._actionCycle;
        }
    }], [{
        key: 'getJobs',
        value: function getJobs() {
            return [].concat(_toConsumableArray(JOBS.values()));
        }
    }]);

    function Player(name, id, job) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this, STATES);
        this._name = name;
        this._id = id;

        this.state = "idle";

        //this.currentAction = Immutable.Map({
        //"action": "thinking"
        //});
        this._nextAction = undefined;

        // Store the action cycle
        this._actionCycle = 0;

        this._isBusy = false;

        if (job) {
            this.job = job;
        }
    }

    return Player;
})(_BaseModel3['default']);

exports['default'] = Player;
module.exports = exports['default'];

},{"../../../Config":1,"../../services/Logger":7,"../BaseModel":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _BaseModel2 = require('../BaseModel');

var _BaseModel3 = _interopRequireDefault(_BaseModel2);

var _servicesLogger = require('../../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var STATES = ["idle", "moving", "battle"];

var Room = (function (_BaseModel) {
    _inherits(Room, _BaseModel);

    _createClass(Room, [{
        key: 'stateMessage',
        get: function get() {
            return "room-state";
        }
    }, {
        key: 'type',
        get: function get() {
            return this._type;
        }
    }], [{
        key: 'TYPES',
        get: function get() {
            return ["cave", "temple"];
        }
    }]);

    function Room(type) {
        _classCallCheck(this, Room);

        _get(Object.getPrototypeOf(Room.prototype), 'constructor', this).call(this, STATES);
        this._type = type;
        this.state = "idle";
    }

    return Room;
})(_BaseModel3['default']);

exports['default'] = Room;
module.exports = exports['default'];

},{"../../services/Logger":7,"../BaseModel":2}],7:[function(require,module,exports){
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
        key: 'network',
        value: function network(msg) {
            console.trace('%c' + msg, 'font-size: 15px; background: #FDF485; color: #000;');
        }
    }, {
        key: 'err',
        value: function err(msg) {
            console.trace('%c' + msg, 'font-size: 15px; background: #FDF485; color: #F00;');
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

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports["default"] = function (from, event, data) {
    return {
        from: from,
        event: event,
        data: data
    };
};

;
module.exports = exports["default"];

},{}],9:[function(require,module,exports){
/*
Copyright 2014 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var pool = [];
var math = Math;

//
// The following constants are related to IEEE 754 limits.
//
var global = self,
    width = 256,
    // each RC4 output is 0 <= x < 256
chunks = 6,
    // at least six RC4 outputs for each double
digits = 52,
    // there are 52 significant digits in a double
rngname = 'random',
    // rngname: name for Math.random and Math.seedrandom
startdenom = math.pow(width, chunks),
    significance = math.pow(2, digits),
    overflow = significance * 2,
    mask = width - 1,
    nodecrypto; // node.js crypto module, initialized at the bottom.

//
// seedrandom()
// This is the seedrandom function described above.
//
function seedrandom(seed, options, callback) {
  var key = [];
  options = options == true ? { entropy: true } : options || {};

  // Flatten the seed string or build one from local entropy if needed.
  var shortseed = mixkey(flatten(options.entropy ? [seed, tostring(pool)] : seed == null ? autoseed() : seed, 3), key);

  // Use the seed to initialize an ARC4 generator.
  var arc4 = new ARC4(key);

  // This function returns a random double in [0, 1) that contains
  // randomness in every bit of the mantissa of the IEEE 754 value.
  var prng = function prng() {
    var n = arc4.g(chunks),
        // Start with a numerator n < 2 ^ 48
    d = startdenom,
        //   and denominator d = 2 ^ 48.
    x = 0; //   and no 'extra last byte'.
    while (n < significance) {
      // Fill up all significant digits by
      n = (n + x) * width; //   shifting numerator and
      d *= width; //   denominator and generating a
      x = arc4.g(1); //   new least-significant-byte.
    }
    while (n >= overflow) {
      // To avoid rounding up, before adding
      n /= 2; //   last byte, shift everything
      d /= 2; //   right using integer math until
      x >>>= 1; //   we have exactly the desired bits.
    }
    return (n + x) / d; // Form the number within [0, 1).
  };

  prng.int32 = function () {
    return arc4.g(4) | 0;
  };
  prng.quick = function () {
    return arc4.g(4) / 0x100000000;
  };
  prng.double = prng;

  // Mix the randomness into accumulated entropy.
  mixkey(tostring(arc4.S), pool);

  // Calling convention: what to return as a function of prng, seed, is_math.
  return (options.pass || callback || function (prng, seed, is_math_call, state) {
    if (state) {
      // Load the arc4 state from the given state if it has an S array.
      if (state.S) {
        copy(state, arc4);
      }
      // Only provide the .state method if requested via options.state.
      prng.state = function () {
        return copy(arc4, {});
      };
    }

    // If called as a method of Math (Math.seedrandom()), mutate
    // Math.random because that is how seedrandom.js has worked since v1.0.
    if (is_math_call) {
      math[rngname] = prng;return seed;
    }

    // Otherwise, it is a newer calling convention, so return the
    // prng directly.
    else return prng;
  })(prng, shortseed, 'global' in options ? options.global : this == math, options.state);
}
math['seed' + rngname] = seedrandom;

//
// ARC4
//
// An ARC4 implementation.  The constructor takes a key in the form of
// an array of at most (width) integers that should be 0 <= x < (width).
//
// The g(count) method returns a pseudorandom integer that concatenates
// the next (count) outputs from ARC4.  Its return value is a number x
// that is in the range 0 <= x < (width ^ count).
//
function ARC4(key) {
  var t,
      keylen = key.length,
      me = this,
      i = 0,
      j = me.i = me.j = 0,
      s = me.S = [];

  // The empty key [] is treated as [0].
  if (!keylen) {
    key = [keylen++];
  }

  // Set up S using the standard key scheduling algorithm.
  while (i < width) {
    s[i] = i++;
  }
  for (i = 0; i < width; i++) {
    s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
    s[j] = t;
  }

  // The "g" method returns the next (count) outputs as one number.
  (me.g = function (count) {
    // Using instance members instead of closure state nearly doubles speed.
    var t,
        r = 0,
        i = me.i,
        j = me.j,
        s = me.S;
    while (count--) {
      t = s[i = mask & i + 1];
      r = r * width + s[mask & (s[i] = s[j = mask & j + t]) + (s[j] = t)];
    }
    me.i = i;me.j = j;
    return r;
    // For robust unpredictability, the function call below automatically
    // discards an initial batch of values.  This is called RC4-drop[256].
    // See http://google.com/search?q=rsa+fluhrer+response&btnI
  })(width);
}

//
// copy()
// Copies internal state of ARC4 to or from a plain object.
//
function copy(f, t) {
  t.i = f.i;
  t.j = f.j;
  t.S = f.S.slice();
  return t;
};

//
// flatten()
// Converts an object tree to nested arrays of strings.
//
function flatten(obj, depth) {
  var result = [],
      typ = typeof obj,
      prop;
  if (depth && typ == 'object') {
    for (prop in obj) {
      try {
        result.push(flatten(obj[prop], depth - 1));
      } catch (e) {}
    }
  }
  return result.length ? result : typ == 'string' ? obj : obj + '\0';
}

//
// mixkey()
// Mixes a string seed into a key that is an array of integers, and
// returns a shortened string seed that is equivalent to the result key.
//
function mixkey(seed, key) {
  var stringseed = seed + '',
      smear,
      j = 0;
  while (j < stringseed.length) {
    key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
  }
  return tostring(key);
}

//
// autoseed()
// Returns an object for autoseeding, using window.crypto and Node crypto
// module if available.
//
function autoseed() {
  try {
    if (nodecrypto) {
      return tostring(nodecrypto.randomBytes(width));
    }
    var out = new Uint8Array(width);
    (global.crypto || global.msCrypto).getRandomValues(out);
    return tostring(out);
  } catch (e) {
    var browser = self.navigator,
        plugins = browser && browser.plugins;
    return [+new Date(), global, plugins, self.screen, tostring(pool)];
  }
}

//
// tostring()
// Converts an array of charcodes to a string
//
function tostring(a) {
  return String.fromCharCode.apply(0, a);
}

//
// When seedrandom.js is loaded, we immediately mix a few bits
// from the built-in RNG into the entropy pool.  Because we do
// not want to interfere with deterministic PRNG state later,
// seedrandom will not call math.random on its own again after
// initialization.
//
mixkey(math.random(), pool);

//
// Nodejs and AMD support: export the implementation as a module using
// either convention.
//
//if ((typeof module) == 'object' && module.exports) {
//module.exports = seedrandom;
//// When in node.js, try using crypto package for autoseeding.
//try {
//nodecrypto = require('crypto');
//} catch (ex) {}
//} else if ((typeof define) == 'function' && define.amd) {
//define(function() { return seedrandom; });
//}

exports['default'] = seedrandom;
module.exports = exports['default'];

},{}],10:[function(require,module,exports){
// Utils
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Config = require('../../Config');

var _Config2 = _interopRequireDefault(_Config);

var _servicesMessage = require('../services/Message');

var _servicesMessage2 = _interopRequireDefault(_servicesMessage);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _servicesRng = require('../services/Rng');

var _servicesRng2 = _interopRequireDefault(_servicesRng);

// Models

var _modelsGame = require('../models/Game');

var _modelsGame2 = _interopRequireDefault(_modelsGame);

var _modelsObjectsRoom = require('../models/objects/Room');

var _modelsObjectsRoom2 = _interopRequireDefault(_modelsObjectsRoom);

var _modelsObjectsPlayer = require('../models/objects/Player');

var _modelsObjectsPlayer2 = _interopRequireDefault(_modelsObjectsPlayer);

var _modelsObjectsMonster = require('../models/objects/Monster');

var _modelsObjectsMonster2 = _interopRequireDefault(_modelsObjectsMonster);

var Simulation = (function () {
    _createClass(Simulation, [{
        key: 'setState',

        /**
         * Sets the state of a model
         */
        value: function setState(model, data) {
            try {
                model.state = data.state || data;
                this.outboundMessages.push(new _servicesMessage2['default'](0, model.stateMessage, data));
            } catch (err) {
                _servicesLogger2['default'].err(err);
            }
        }
    }, {
        key: 'localPlayer',
        get: function get() {
            return this._localPlayer;
        },
        set: function set(p) {
            this._localPlayer = p;
        }
    }]);

    function Simulation() {
        _classCallCheck(this, Simulation);

        this.then = Date.now();
        this.interval = 1000 / 30;
        this.first = this.then;
        this.counter = 0;
        this.messageStack = [];
        this.outboundMessages = [];
    }

    // Initialize a new simulation

    /**
     * Game Loop Logic
     */

    _createClass(Simulation, [{
        key: 'tick',
        value: function tick() {
            // Get current messages and then reset the stack
            var messages = this.messageStack;
            this.messageStack = [];

            // Process all messages that have come in since last tick
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = messages[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var message = _step.value;

                    _servicesLogger2['default'].debug("Procesing message:");
                    _servicesLogger2['default'].log(message);
                    var from = message.from;
                    var eventName = message.event;
                    var data = message.data;

                    // Decide what to do with message
                    switch (eventName) {
                        case "game-host":
                            // Initialize basic models
                            this.players = new Map();
                            this.game = new _modelsGame2['default']();
                            this.setState(this.game, "lobby");
                            this.rng = new Math.seedrandom();
                            var playerMessage = new _servicesMessage2['default'](0, "player-join-local", {
                                "name": message.data.name,
                                "id": message.data.id
                            });
                            var p = new _modelsObjectsPlayer2['default'](data.name, data.id);
                            this.localPlayer = p;
                            this.players.set(data.id, p);
                            this.queueMessage(playerMessage);
                            break;
                        case "player-join-remote":
                            this.players.set(data.id, new _modelsObjectsPlayer2['default'](data.name, data.id, data.job ? data.job.name : 0));
                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = this.players.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var player = _step2.value;

                                    this.queueMessage(new _servicesMessage2['default'](0, "player-join-remote", {
                                        name: player.name,
                                        id: player.id,
                                        job: player.job ? player.job.name : 0
                                    }));
                                    this.setState(player, {
                                        "id": player.id,
                                        "state": "idle"
                                    });
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

                            break;
                        case "player-job":
                            // Check to make sure its valid
                            if (from === 0 || from === data.id) {
                                var player = this.players.get(data.id);
                                if (player && !(player.job && player.job.name === data.job)) {
                                    player.job = data.job;
                                    this.queueMessage(message);
                                }
                            }
                            break;
                        case "player-state":
                            if (from === 0 || from === data.id) {
                                var player = this.players.get(data.id);
                                if (player && player.state !== data.state) {
                                    if (!(this.game.state === "lobby" && data.state === "ready" && !player.job)) this.setState(player, data);
                                }
                            }
                            break;
                        case "player-action":
                            if (from === 0 || from === data.id) {
                                var player = this.players.get(data.id);
                                this.setPlayerAction(player, data);
                            }
                            break;
                        case "game-start":
                            this.rng = (0, _servicesRng2['default'])(data.seed || "");
                            this.queueMessage(new _servicesMessage2['default'](0, "game-create", 1));
                            break;
                    }
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

            switch (this.game.state) {
                case "lobby":
                    this.lobbyTick();
                    break;
                case "playing":
                    this.playingTick();
                    break;
            }

            // Do we need to broadcast tick?
            if (this.outboundMessages.length) {
                _servicesLogger2['default'].debug("Simulation send messages");
                _servicesLogger2['default'].log(this.outboundMessages);
                self.postMessage(this.outboundMessages);
                this.outboundMessages = [];
            }
        }

        /**
         * Game logic for when in lobby
         */
    }, {
        key: 'lobbyTick',
        value: function lobbyTick() {
            var gameReady = true;

            // Check if all players are ready
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = this.players.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var player = _step3.value;

                    gameReady &= player.state === "ready";
                } // If all players are ready change the game state
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

            if (gameReady) {
                this.room = this.createRoom();
                this.queueMessage(new _servicesMessage2['default'](0, "room-create", this.room.type));
                this.setState(this.game, "playing");

                var xPos = 13.5;
                var yPos = 2;
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = this.players.values()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var player = _step4.value;

                        this.queueMessage(new _servicesMessage2['default'](0, "player-set", {
                            "id": player.id,
                            "keys": ["xPos", "yPos"],
                            "values": [player.job.possition === "back" ? xPos - 1 : xPos, yPos]
                        }));
                        this.setState(player, {
                            "state": "idle",
                            "id": player.id
                        });
                        yPos++;
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                            _iterator4['return']();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }
            }
        }

        /**
         * Game logic for when playing
         */
    }, {
        key: 'playingTick',
        value: function playingTick() {
            if (this.room.state === "idle") {
                var partyReady = true;

                // Check if all players are ready
                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    for (var _iterator5 = this.players.values()[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        var player = _step5.value;

                        partyReady &= player.action === "ready";
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                            _iterator5['return']();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                if (partyReady) {
                    this.setState(this.room, "moving");
                    this.room.steps = 0;
                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = this.players.values()[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var player = _step6.value;

                            this.setState(player, {
                                "state": "walking",
                                "id": player.id
                            });
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                                _iterator6['return']();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }
                }
            } else if (this.room.state === "moving") {
                this.room.steps++;
                if (this.room.steps >= 100) {
                    this.room.steps = 0;
                    this.startBattle();
                }
            } else if (this.room.state === "battle") {
                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = this.players.values()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var player = _step7.value;

                        if (player.state === "cooldown") {
                            player.cooldown++;
                            this.queueMessage(new _servicesMessage2['default'](0, "player-set", {
                                "id": player.id,
                                "keys": ["cooldown"],
                                "values": [player.cooldown]
                            }));
                            if (player.cooldown === player.job.cooldown) {
                                this.setState(player, {
                                    "state": "idle",
                                    "id": player.id
                                });
                            }
                        }
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                            _iterator7['return']();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }
            }
        }

        /**
         * Helper to create a room based on RNG
         */
    }, {
        key: 'createRoom',
        value: function createRoom() {
            var type = _modelsObjectsRoom2['default'].TYPES[parseInt(this.rng.quick() * _modelsObjectsRoom2['default'].TYPES.length)];
            return new _modelsObjectsRoom2['default'](type);
        }

        /**
         * Helper to create a room based on RNG
         */
    }, {
        key: 'setPlayerAction',
        value: function setPlayerAction(player, data) {
            if (this.game.state !== "playing") return;

            if (player.action !== data.action) {
                player.action = data.action;
                this.queueMessage(new _servicesMessage2['default'](0, "player-action", data));
            }
        }

        /**
         * Helper to set everything up for battle
         */
    }, {
        key: 'startBattle',
        value: function startBattle() {
            this.setState(this.room, "battle");
            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = this.players.values()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var player = _step8.value;

                    this.setPlayerAction(player, {
                        "action": "",
                        "id": player.id
                    });
                    this.startCooldown(player);
                }
            } catch (err) {
                _didIteratorError8 = true;
                _iteratorError8 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                        _iterator8['return']();
                    }
                } finally {
                    if (_didIteratorError8) {
                        throw _iteratorError8;
                    }
                }
            }
        }

        /**
         * Helper to start player cooldown
         */
    }, {
        key: 'startCooldown',
        value: function startCooldown(player) {
            this.setState(player, {
                "state": "cooldown",
                "id": player.id
            });
            player.cooldown = 0;
        }

        /**
         * Add message to the outbound queue
         */
    }, {
        key: 'queueMessage',
        value: function queueMessage(message) {
            this.outboundMessages.push(message);
        }

        /**
         * Procces incoming message
         */
    }, {
        key: 'onMessage',
        value: function onMessage(message) {
            _servicesLogger2['default'].debug("Simulation recieved message from Client");
            var decodedMessage = message.data;
            _servicesLogger2['default'].log(decodedMessage);
            this.messageStack.push(decodedMessage);
        }

        /**
         * Run closest to the FPS as possible
         */
    }, {
        key: 'loop',
        value: function loop() {
            var now = Date.now();
            var delta = now - this.then;

            // If the fps interval is correct
            if (delta > this.interval) {
                // Calculate time since last frame
                this.then = now - delta % this.interval;

                this.tick();

                // Calculate next render cycle
                var time_el = (this.then - this.first) / 1000;
                ++this.counter;
                //let _fps = parseInt(counter/time_el);

                // Increment Frame
                this.loop();
            } else {
                setTimeout(this.loop.bind(this), 1);
            }
        }
    }]);

    return Simulation;
})();

var simulation = new Simulation();

// Attach I/O
onmessage = simulation.onMessage.bind(simulation);
simulation.postMessage = postMessage;

// Start the simulation
simulation.loop();

self.simulation = simulation;

},{"../../Config":1,"../models/Game":3,"../models/objects/Monster":4,"../models/objects/Player":5,"../models/objects/Room":6,"../services/Logger":7,"../services/Message":8,"../services/Rng":9}]},{},[10])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL0NvbmZpZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9CYXNlTW9kZWwuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvR2FtZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL21vZGVscy9vYmplY3RzL01vbnN0ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9QbGF5ZXIuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9tb2RlbHMvb2JqZWN0cy9Sb29tLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTWVzc2FnZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3NlcnZpY2VzL1JuZy5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3dvcmtlcnMvU2ltdWxhdGlvbldvcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDQUEsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDOzs7OztBQUtoQixNQUFNLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDOzs7OztBQUtwQyxNQUFNLENBQUMsWUFBWSxHQUFJLElBQUksQ0FBQztBQUM1QixNQUFNLENBQUMsYUFBYSxHQUFHLElB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SUFBSSxDQUFDLElBQUksQ0FBQzs7O0FBRzVCLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFOztBQUV2QixvQkFBSSxDQUFDLElBQUksR0FBRyxHQUFHLEdBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEFBQUMsQ0FBQzs7QUFFMUMsb0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7O0FBR1osb0JBQUksT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFBLEdBQUUsSUFBSSxDQUFDO0FBQzVDLGtCQUFFLElBQUksQ0FBQyxPQUFPLENBQUM7Ozs7QUFJZixvQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2YsTUFBTTtBQUNILDBCQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDdkM7U0FDSjs7O1dBL1NDLFVBQVU7OztBQW1UaEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQzs7O0FBR2xDLFNBQVMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNsRCxVQUFVLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7O0FBR3JDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7QUFFbEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibGV0IGNvbmZpZyA9IHt9O1xuLyoqXG4gKiBTaG91bGQgYmUgc2V0IHVwIHRvIHJlY2FsY3VsYXRlIG9uIHRoZSBmbHkgd2hlbiB0aGluZ3MgY2hhZ25lLlxuICogTm90IHdvcmtpbmcgcmlnaHQgYXQgYWxsIGZvciB3aW5kb3cgc2l6ZSBjaGFnbmVzLlxuICovXG5jb25maWcuQVBJX0tFWSA9IFwieGFoeHgweXV5NWxlNHM0aVwiO1xuXG4vL2NvbmZpZy5ESVNBQkxFX0FVRElPID0gdHJ1ZTtcblxuLy8gMTZ4OSBBc3BlY3QgUmF0aW9cbmNvbmZpZy5BU1BFQ1RfV0lEVEggID0gMTkyMDtcbmNvbmZpZy5BU1BFQ1RfSEVJR0hUID0gMTA4MDtcblxuY29uZmlnLlRJTEVfWCA9IDE2OyAvLyBNVVNUIEJFIE1VTFRJUExFIE9GIDE2XG5jb25maWcuVElMRV9ZID0gKGNvbmZpZy5USUxFX1gqY29uZmlnLkFTUEVDVF9IRUlHSFQpL2NvbmZpZy5BU1BFQ1RfV0lEVEg7XG5cbmNvbmZpZy5jYWxjdWxhdGUgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBIb3Jpem9udGFsIG9yIFZlcnRpY2FsIHBlcmNlbnRhZ2UgdGhhdCB0aGUgZ2FtZSB2aWV3IHNob3VsZCBvY2N1cHlcbiAgICBjb25maWcuUEVSQ0VOVEFHRSA9IDE7XG5cbiAgICBjb25maWcuU1BSSVRFX1NJWkUgICA9IDI0O1xuXG4gICAgLy8gQ2FjbHVsYXRlIGNhbnZhcyB3aWR0aCBhbmQgaGVpZ2h0IGFjY29yZGluZyB0byBhYm92ZSBwZXJjZW50YWdlIGFuZCBhc3BlY3QgcmF0aW9cbiAgICBsZXQgc2NyZWVuV2lkdGggPSB3aW5kb3cub3V0ZXJXaWR0aDtcbiAgICBkbyB7XG4gICAgICAgIGNvbmZpZy5DQU5WQVNfV0lEVEggID0gKHNjcmVlbldpZHRoLS0qY29uZmlnLlBFUkNFTlRBR0UpO1xuICAgICAgICBjb25maWcuQ0FOVkFTX0hFSUdIVCA9IChjb25maWcuQ0FOVkFTX1dJRFRIKmNvbmZpZy5BU1BFQ1RfSEVJR0hUKS9jb25maWcuQVNQRUNUX1dJRFRIO1xuICAgIH0gd2hpbGUoY29uZmlnLkNBTlZBU19IRUlHSFQlY29uZmlnLlNQUklURV9TSVpFICE9PSAwKVxuXG5cbiAgICAvLyBNYWtlIHN1cmUgdGhlIHdpbmRvdyB3aWxsIGZpdCB2ZXJ0aWNhbGx5XG4gICAgLy9pZihjb25maWcuQ0FOVkFTX0hFSUdIVCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAvL2NvbmZpZy5DQU5WQVNfSEVJR0hUICA9IHdpbmRvdy5vdXRlckhlaWdodCpjb25maWcuUEVSQ0VOVEFHRTtcbiAgICAgICAgLy9jb25maWcuQ0FOVkFTX1dJRFRIID0gKGNvbmZpZy5DQU5WQVNfSEVJR0hUKmNvbmZpZy5BU1BFQ1RfV0lEVEgpL2NvbmZpZy5BU1BFQ1RfSEVJR0hUO1xuICAgIC8vfVxuXG4gICAgLy8gRGV0ZXJtaW5lIFNwcml0ZSBTY2FsaW5nXG4gICAgY29uZmlnLlNQUklURV9TQ0FMRSAgPSBjb25maWcuQ0FOVkFTX1dJRFRILyhjb25maWcuVElMRV9YKmNvbmZpZy5TUFJJVEVfU0laRSk7XG4gICAgY29uZmlnLlRJTEVfU0laRSAgICAgPSBjb25maWcuU1BSSVRFX1NJWkUqY29uZmlnLlNQUklURV9TQ0FMRTtcblxuICAgIC8vIFNldCBGUFNcbiAgICBjb25maWcuRlBTID0gNjA7XG59XG5cbmlmKHNlbGYuZG9jdW1lbnQpIGNvbmZpZy5jYWxjdWxhdGUoKTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuIiwiaW1wb3J0IExvZ2dlciAgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9Mb2dnZXInO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG4gICAgY29uc3RydWN0b3Ioc3RhdGVzKSB7XG4gICAgICAgIHRoaXMuX3N0YXRlcyA9IHN0YXRlcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHN0YXRlIGlmIGl0IGlzIGxlZ2FsLlxuICAgICAqL1xuICAgIHNldCBzdGF0ZShzdGF0ZSkge1xuICAgICAgICBpZih0aGlzLl9zdGF0ZXMuaW5kZXhPZihzdGF0ZSkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5fc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IGBTdGF0ZSAke3N0YXRlfSBpcyBub3QgYWxsb3dlZGA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzZXQgYWN0aW9uKGFjdGlvbikge1xuICAgICAgICB0aGlzLl9hY3Rpb24gPSBhY3Rpb25cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKi9cbiAgICBnZXQgc3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gdGhlIGN1cnJlbnQgc3RhdGVcbiAgICAgKi9cbiAgICBnZXQgYWN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiB0aGUgbmFtZSBvZiB0aGUgc3RhdGUgbWVzc2FnZSB3ZSBuZWVkIHRvIHNlbmQgdG8gbW9kaWZ5XG4gICAgICogdGhpcyBtb2RlbFxuICAgICAqL1xuICAgIGdldCBzdGF0ZU1lc3NhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGF0ZU1lc3NhZ2U7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuL0Jhc2VNb2RlbCc7XG5cbmxldCBTVEFURVMgPSBbXG4gICAgXCJtYWluIG1lbnVcIixcbiAgICBcImxvYmJ5XCIsXG4gICAgXCJwbGF5aW5nXCJcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICBnZXQgc3RhdGVNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gXCJnYW1lLXN0YXRlXCI7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKFNUQVRFUylcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwibWFpbiBtZW51XCI7XG4gICAgfVxufVxuIiwiaW1wb3J0IEJhc2VNb2RlbCBmcm9tICcuLi9CYXNlTW9kZWwnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBleHRlbmRzIEJhc2VNb2RlbCB7XG5cbiAgICAvLyBTdGF0aWMgUm9vbSBUeXBlc1xuICAgIHN0YXRpYyBnZXQgVFlQRV9XVVJNKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3Nwcml0ZSc6ICd3dXJtLXNoZWV0LnBuZycsXG4gICAgICAgICAgICAnbmFtZSc6ICAgJ3d1cm0nXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih4UG9zLCB5UG9zLCB0eXBlKSB7XG4gICAgICAgIHN1cGVyKFtdKTtcbiAgICAgICAgdGhpcy54UG9zID0geFBvcztcbiAgICAgICAgdGhpcy55cG9zID0geVBvcztcbiAgICAgICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgICAgICB0aGlzLmhlYWx0aCA9IDU7XG5cbiAgICAgICAgdGhpcy5tYXhDb29sZG93biA9IDEyMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgc28gd2Uga25vdyB0byBjaGFyZ2UgY29vbGRvd24gbWVldGVyXG4gICAgICovXG4gICAgY2hhcmdlQ29vbGRvd24oY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jb29sZG93biA9IDA7XG4gICAgICAgIHRoaXMuX2lzQ29vbGluZ2Rvd24gPSB0cnVlO1xuICAgIH1cblxuICAgIHRpY2soKSB7XG4gICAgICAgIGlmKHRoaXMuX2lzQ29vbGluZ2Rvd24pIHtcbiAgICAgICAgICAgIHRoaXMuY29vbGRvd24rKztcbiAgICAgICAgICAgIGlmKHRoaXMuY29vbGRvd24gPj0gdGhpcy5tYXhDb29sZG93bikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2lzQ29vbGluZ2Rvd24gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWFkeVRvQXR0YWNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZih0aGlzLm9uQ29vbGRvd24pXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Db29sZG93bih0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCBCYXNlTW9kZWwgICAgIGZyb20gJy4uL0Jhc2VNb2RlbCc7IC8vIENhbid0IGNhbGwgdGhpcyBPYmplY3QgYi9jIG9mIGNvbmZsaWN0IHhEXG5pbXBvcnQgTG9nZ2VyIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5pbXBvcnQgQ29uZmlnIGZyb20gJy4uLy4uLy4uL0NvbmZpZyc7XG5cbmxldCBKT0JTID0gbmV3IE1hcCgpO1xuXG5KT0JTLnNldChcImNsYWlydm95YW50XCIsIHtcbiAgICAnbmFtZSc6ICAgJ2NsYWlydm95YW50JyxcbiAgICAnaGVhbHRoJzogNjAsXG4gICAgJ21hbmEnOiA0MCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcImhlcmJhbGlzdFwiLCB7XG4gICAgJ25hbWUnOiAnaGVyYmFsaXN0JyxcbiAgICAnaGVhbHRoJzogNDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDgwLFxuICAgICdwb3NpdGlvbic6ICdiYWNrJ1xufSk7XG5cbkpPQlMuc2V0KFwidmlsbGFpblwiLCB7XG4gICAgJ25hbWUnOiAndmlsbGFpbicsXG4gICAgJ2hlYWx0aCc6IDgwLFxuICAgICdtYW5hJzogMjAsXG4gICAgJ2Nvb2xkb3duJzogNDAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbkpPQlMuc2V0KFwia25pZ2h0XCIsIHtcbiAgICAnbmFtZSc6ICdrbmlnaHQnLFxuICAgICdoZWFsdGgnOiAxMDAsXG4gICAgJ21hbmEnOiAwLFxuICAgICdjb29sZG93bic6IDEwMCxcbiAgICAncG9zaXRpb24nOiAnZnJvbnQnXG59KTtcblxuSk9CUy5zZXQoXCJuZWNyb21hbmNlclwiLCB7XG4gICAgJ25hbWUnOiAnbmVjcm9tYW5jZXInLFxuICAgICdoZWFsdGgnOiA0MCxcbiAgICAnbWFuYSc6IDEyMCxcbiAgICAnY29vbGRvd24nOiA4MCxcbiAgICAncG9zaXRpb24nOiAnYmFjaydcbn0pO1xuXG5KT0JTLnNldChcIm5pbmphXCIsIHtcbiAgICAnbmFtZSc6ICduaW5qYScsXG4gICAgJ2hlYWx0aCc6IDYwLFxuICAgICdtYW5hJzogMzAsXG4gICAgJ2Nvb2xkb3duJzogMzAsXG4gICAgJ3Bvc2l0aW9uJzogJ2Zyb250J1xufSk7XG5cbmxldCBTVEFURVMgPSBbXG4gICAgXCJpZGxlXCIsXG4gICAgXCJyZWFkeVwiLFxuICAgIFwiY29vbGRvd25cIixcbiAgICBcIndhbGtpbmdcIixcbiAgICBcImF0dGFja2luZ1wiXG5dO1xuXG5jbGFzcyBQbGF5ZXIgZXh0ZW5kcyBCYXNlTW9kZWwge1xuXG4gICAgc3RhdGljIGdldEpvYnMoKSB7XG4gICAgICAgIHJldHVybiBbLi4uSk9CUy52YWx1ZXMoKV07XG4gICAgfVxuXG4gICAgZ2V0IHN0YXRlTWVzc2FnZSgpIHtcbiAgICAgICAgcmV0dXJuIFwicGxheWVyLXN0YXRlXCI7XG4gICAgfVxuXG4gICAgZ2V0IGpvYigpICAgICAgICAgICB7cmV0dXJuIHRoaXMuX2pvYjt9XG4gICAgZ2V0IGN1cnJlbnRBY3Rpb24oKSB7cmV0dXJuIHRoaXMuX2N1cnJlbnRBY3Rpb259XG4gICAgZ2V0IG5leHRBY3Rpb24oKSAgICB7cmV0dXJuIHRoaXMuX25leHRBY3Rpb259XG4gICAgZ2V0IG5hbWUoKSAgICAgICAgICB7cmV0dXJuIHRoaXMuX25hbWU7fVxuICAgIGdldCBpZCgpICAgICAgICAgICAge3JldHVybiB0aGlzLl9pZDt9XG4gICAgZ2V0IHJlYWR5VG9BdHRhY2soKSB7cmV0dXJuIHRoaXMuX3JlYWR5VG9BdHRhY2s7fVxuICAgIGdldCBpc0J1c3koKSAgICAgICAge3JldHVybiB0aGlzLl9pc0J1c3l9XG4gICAgZ2V0IGFjdGlvbkN5Y2xlKCkgICB7cmV0dXJuIHRoaXMuX2FjdGlvbkN5Y2xlfVxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoaXMgcGxheWVycyBqb2IgaWYgaXQgaXMgYSB2YWxpZCBqb2JcbiAgICAgKi9cbiAgICBzZXQgam9iKGpvYk5hbWUpIHtcbiAgICAgICAgdGhpcy5fam9iID0gSk9CUy5nZXQoam9iTmFtZSk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQgd2FzIGEgdmFsaWQgam9iXG4gICAgICAgIGlmKCF0aGlzLl9qb2IpXG4gICAgICAgICAgICB0aHJvdyBgSm9iICR7am9iTmFtZX0gaXMgbm90IGFsbG93ZWRgO1xuXG4gICAgICAgIHRoaXMubWF4SGVhbHRoID0gdGhpcy5fam9iLmhlYWx0aDtcbiAgICAgICAgdGhpcy5oZWFsdGggPSB0aGlzLl9qb2IuaGVhbHRoO1xuXG4gICAgICAgIHRoaXMubWF4TWFuYSA9IHRoaXMuX2pvYi5tYW5hO1xuICAgICAgICB0aGlzLm1hbmEgPSB0aGlzLl9qb2IubWFuYTtcblxuICAgICAgICB0aGlzLm1heENvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgICAgICB0aGlzLmNvb2xkb3duID0gdGhpcy5fam9iLmNvb2xkb3duO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGlkLCBqb2IpIHtcbiAgICAgICAgc3VwZXIoU1RBVEVTKTtcbiAgICAgICAgdGhpcy5fbmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2lkID0gaWQ7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IFwiaWRsZVwiO1xuXG4gICAgICAgIC8vdGhpcy5jdXJyZW50QWN0aW9uID0gSW1tdXRhYmxlLk1hcCh7XG4gICAgICAgICAgICAvL1wiYWN0aW9uXCI6IFwidGhpbmtpbmdcIlxuICAgICAgICAvL30pO1xuICAgICAgICB0aGlzLl9uZXh0QWN0aW9uICAgID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIFN0b3JlIHRoZSBhY3Rpb24gY3ljbGVcbiAgICAgICAgdGhpcy5fYWN0aW9uQ3ljbGUgID0gMDtcblxuICAgICAgICB0aGlzLl9pc0J1c3kgPSBmYWxzZTtcblxuICAgICAgICBpZihqb2IpIHt0aGlzLmpvYiA9IGpvYjt9XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBQbGF5ZXI7XG4iLCJpbXBvcnQgQmFzZU1vZGVsIGZyb20gJy4uL0Jhc2VNb2RlbCc7XG5pbXBvcnQgTG9nZ2VyICAgIGZyb20gJy4uLy4uL3NlcnZpY2VzL0xvZ2dlcic7XG5cbmxldCBTVEFURVMgPSBbXG4gICAgXCJpZGxlXCIsXG4gICAgXCJtb3ZpbmdcIixcbiAgICBcImJhdHRsZVwiXG5dO1xuXG5jbGFzcyBSb29tIGV4dGVuZHMgQmFzZU1vZGVsIHtcbiAgICBnZXQgc3RhdGVNZXNzYWdlKCkge1xuICAgICAgICByZXR1cm4gXCJyb29tLXN0YXRlXCI7XG4gICAgfVxuXG4gICAgc3RhdGljIGdldCBUWVBFUygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFwiY2F2ZVwiLFxuICAgICAgICAgICAgXCJ0ZW1wbGVcIlxuICAgICAgICBdO1xuICAgIH1cblxuICAgIGdldCB0eXBlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgICAgIHN1cGVyKFNUQVRFUyk7XG4gICAgICAgIHRoaXMuX3R5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnN0YXRlID0gXCJpZGxlXCI7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBSb29tO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBiYW5uZXIobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnLnRvVXBwZXJDYXNlKCl9YCwgJ2ZvbnQtc2l6ZTogMzBweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlYnVnKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKGAlYyR7bXNnfWAsICdmb250LXNpemU6IDE1cHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBuZXR3b3JrKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKGAlYyR7bXNnfWAsICdmb250LXNpemU6IDE1cHg7IGJhY2tncm91bmQ6ICNGREY0ODU7IGNvbG9yOiAjMDAwOycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnIobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UoYCVjJHttc2d9YCwgJ2ZvbnQtc2l6ZTogMTVweDsgYmFja2dyb3VuZDogI0ZERjQ4NTsgY29sb3I6ICNGMDA7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvZyhtc2cpIHtcbiAgICAgICAgY29uc29sZS50cmFjZShtc2cpO1xuICAgIH1cblxuICAgIHN0YXRpYyBlcnJvcihtc2cpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihtc2cpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGZyb20sIGV2ZW50LCBkYXRhKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJvbTogZnJvbSxcbiAgICAgICAgZXZlbnQ6IGV2ZW50LFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgfVxufTtcbiIsIi8qXG5Db3B5cmlnaHQgMjAxNCBEYXZpZCBCYXUuXG5cblBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZ1xuYSBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG5cIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbndpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbmRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0b1xucGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG50aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlXG5pbmNsdWRlZCBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbkVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbkNMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG5UT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbiovXG5sZXQgcG9vbCA9IFtdO1xubGV0IG1hdGggPSBNYXRoO1xuXG4vL1xuLy8gVGhlIGZvbGxvd2luZyBjb25zdGFudHMgYXJlIHJlbGF0ZWQgdG8gSUVFRSA3NTQgbGltaXRzLlxuLy9cbnZhciBnbG9iYWwgPSBzZWxmLFxuICAgIHdpZHRoID0gMjU2LCAgICAgICAgLy8gZWFjaCBSQzQgb3V0cHV0IGlzIDAgPD0geCA8IDI1NlxuICAgIGNodW5rcyA9IDYsICAgICAgICAgLy8gYXQgbGVhc3Qgc2l4IFJDNCBvdXRwdXRzIGZvciBlYWNoIGRvdWJsZVxuICAgIGRpZ2l0cyA9IDUyLCAgICAgICAgLy8gdGhlcmUgYXJlIDUyIHNpZ25pZmljYW50IGRpZ2l0cyBpbiBhIGRvdWJsZVxuICAgIHJuZ25hbWUgPSAncmFuZG9tJywgLy8gcm5nbmFtZTogbmFtZSBmb3IgTWF0aC5yYW5kb20gYW5kIE1hdGguc2VlZHJhbmRvbVxuICAgIHN0YXJ0ZGVub20gPSBtYXRoLnBvdyh3aWR0aCwgY2h1bmtzKSxcbiAgICBzaWduaWZpY2FuY2UgPSBtYXRoLnBvdygyLCBkaWdpdHMpLFxuICAgIG92ZXJmbG93ID0gc2lnbmlmaWNhbmNlICogMixcbiAgICBtYXNrID0gd2lkdGggLSAxLFxuICAgIG5vZGVjcnlwdG87ICAgICAgICAgLy8gbm9kZS5qcyBjcnlwdG8gbW9kdWxlLCBpbml0aWFsaXplZCBhdCB0aGUgYm90dG9tLlxuXG4vL1xuLy8gc2VlZHJhbmRvbSgpXG4vLyBUaGlzIGlzIHRoZSBzZWVkcmFuZG9tIGZ1bmN0aW9uIGRlc2NyaWJlZCBhYm92ZS5cbi8vXG5mdW5jdGlvbiBzZWVkcmFuZG9tKHNlZWQsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gIHZhciBrZXkgPSBbXTtcbiAgb3B0aW9ucyA9IChvcHRpb25zID09IHRydWUpID8geyBlbnRyb3B5OiB0cnVlIH0gOiAob3B0aW9ucyB8fCB7fSk7XG5cbiAgLy8gRmxhdHRlbiB0aGUgc2VlZCBzdHJpbmcgb3IgYnVpbGQgb25lIGZyb20gbG9jYWwgZW50cm9weSBpZiBuZWVkZWQuXG4gIHZhciBzaG9ydHNlZWQgPSBtaXhrZXkoZmxhdHRlbihcbiAgICBvcHRpb25zLmVudHJvcHkgPyBbc2VlZCwgdG9zdHJpbmcocG9vbCldIDpcbiAgICAoc2VlZCA9PSBudWxsKSA/IGF1dG9zZWVkKCkgOiBzZWVkLCAzKSwga2V5KTtcblxuICAvLyBVc2UgdGhlIHNlZWQgdG8gaW5pdGlhbGl6ZSBhbiBBUkM0IGdlbmVyYXRvci5cbiAgdmFyIGFyYzQgPSBuZXcgQVJDNChrZXkpO1xuXG4gIC8vIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIHJhbmRvbSBkb3VibGUgaW4gWzAsIDEpIHRoYXQgY29udGFpbnNcbiAgLy8gcmFuZG9tbmVzcyBpbiBldmVyeSBiaXQgb2YgdGhlIG1hbnRpc3NhIG9mIHRoZSBJRUVFIDc1NCB2YWx1ZS5cbiAgdmFyIHBybmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbiA9IGFyYzQuZyhjaHVua3MpLCAgICAgICAgICAgICAvLyBTdGFydCB3aXRoIGEgbnVtZXJhdG9yIG4gPCAyIF4gNDhcbiAgICAgICAgZCA9IHN0YXJ0ZGVub20sICAgICAgICAgICAgICAgICAvLyAgIGFuZCBkZW5vbWluYXRvciBkID0gMiBeIDQ4LlxuICAgICAgICB4ID0gMDsgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgYW5kIG5vICdleHRyYSBsYXN0IGJ5dGUnLlxuICAgIHdoaWxlIChuIDwgc2lnbmlmaWNhbmNlKSB7ICAgICAgICAgIC8vIEZpbGwgdXAgYWxsIHNpZ25pZmljYW50IGRpZ2l0cyBieVxuICAgICAgbiA9IChuICsgeCkgKiB3aWR0aDsgICAgICAgICAgICAgIC8vICAgc2hpZnRpbmcgbnVtZXJhdG9yIGFuZFxuICAgICAgZCAqPSB3aWR0aDsgICAgICAgICAgICAgICAgICAgICAgIC8vICAgZGVub21pbmF0b3IgYW5kIGdlbmVyYXRpbmcgYVxuICAgICAgeCA9IGFyYzQuZygxKTsgICAgICAgICAgICAgICAgICAgIC8vICAgbmV3IGxlYXN0LXNpZ25pZmljYW50LWJ5dGUuXG4gICAgfVxuICAgIHdoaWxlIChuID49IG92ZXJmbG93KSB7ICAgICAgICAgICAgIC8vIFRvIGF2b2lkIHJvdW5kaW5nIHVwLCBiZWZvcmUgYWRkaW5nXG4gICAgICBuIC89IDI7ICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gICBsYXN0IGJ5dGUsIHNoaWZ0IGV2ZXJ5dGhpbmdcbiAgICAgIGQgLz0gMjsgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHJpZ2h0IHVzaW5nIGludGVnZXIgbWF0aCB1bnRpbFxuICAgICAgeCA+Pj49IDE7ICAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgd2UgaGF2ZSBleGFjdGx5IHRoZSBkZXNpcmVkIGJpdHMuXG4gICAgfVxuICAgIHJldHVybiAobiArIHgpIC8gZDsgICAgICAgICAgICAgICAgIC8vIEZvcm0gdGhlIG51bWJlciB3aXRoaW4gWzAsIDEpLlxuICB9O1xuXG4gIHBybmcuaW50MzIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGFyYzQuZyg0KSB8IDA7IH1cbiAgcHJuZy5xdWljayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJjNC5nKDQpIC8gMHgxMDAwMDAwMDA7IH1cbiAgcHJuZy5kb3VibGUgPSBwcm5nO1xuXG4gIC8vIE1peCB0aGUgcmFuZG9tbmVzcyBpbnRvIGFjY3VtdWxhdGVkIGVudHJvcHkuXG4gIG1peGtleSh0b3N0cmluZyhhcmM0LlMpLCBwb29sKTtcblxuICAvLyBDYWxsaW5nIGNvbnZlbnRpb246IHdoYXQgdG8gcmV0dXJuIGFzIGEgZnVuY3Rpb24gb2YgcHJuZywgc2VlZCwgaXNfbWF0aC5cbiAgcmV0dXJuIChvcHRpb25zLnBhc3MgfHwgY2FsbGJhY2sgfHxcbiAgICAgIGZ1bmN0aW9uKHBybmcsIHNlZWQsIGlzX21hdGhfY2FsbCwgc3RhdGUpIHtcbiAgICAgICAgaWYgKHN0YXRlKSB7XG4gICAgICAgICAgLy8gTG9hZCB0aGUgYXJjNCBzdGF0ZSBmcm9tIHRoZSBnaXZlbiBzdGF0ZSBpZiBpdCBoYXMgYW4gUyBhcnJheS5cbiAgICAgICAgICBpZiAoc3RhdGUuUykgeyBjb3B5KHN0YXRlLCBhcmM0KTsgfVxuICAgICAgICAgIC8vIE9ubHkgcHJvdmlkZSB0aGUgLnN0YXRlIG1ldGhvZCBpZiByZXF1ZXN0ZWQgdmlhIG9wdGlvbnMuc3RhdGUuXG4gICAgICAgICAgcHJuZy5zdGF0ZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29weShhcmM0LCB7fSk7IH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGNhbGxlZCBhcyBhIG1ldGhvZCBvZiBNYXRoIChNYXRoLnNlZWRyYW5kb20oKSksIG11dGF0ZVxuICAgICAgICAvLyBNYXRoLnJhbmRvbSBiZWNhdXNlIHRoYXQgaXMgaG93IHNlZWRyYW5kb20uanMgaGFzIHdvcmtlZCBzaW5jZSB2MS4wLlxuICAgICAgICBpZiAoaXNfbWF0aF9jYWxsKSB7IG1hdGhbcm5nbmFtZV0gPSBwcm5nOyByZXR1cm4gc2VlZDsgfVxuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQgaXMgYSBuZXdlciBjYWxsaW5nIGNvbnZlbnRpb24sIHNvIHJldHVybiB0aGVcbiAgICAgICAgLy8gcHJuZyBkaXJlY3RseS5cbiAgICAgICAgZWxzZSByZXR1cm4gcHJuZztcbiAgICAgIH0pKFxuICBwcm5nLFxuICBzaG9ydHNlZWQsXG4gICdnbG9iYWwnIGluIG9wdGlvbnMgPyBvcHRpb25zLmdsb2JhbCA6ICh0aGlzID09IG1hdGgpLFxuICBvcHRpb25zLnN0YXRlKTtcbn1cbm1hdGhbJ3NlZWQnICsgcm5nbmFtZV0gPSBzZWVkcmFuZG9tO1xuXG4vL1xuLy8gQVJDNFxuLy9cbi8vIEFuIEFSQzQgaW1wbGVtZW50YXRpb24uICBUaGUgY29uc3RydWN0b3IgdGFrZXMgYSBrZXkgaW4gdGhlIGZvcm0gb2Zcbi8vIGFuIGFycmF5IG9mIGF0IG1vc3QgKHdpZHRoKSBpbnRlZ2VycyB0aGF0IHNob3VsZCBiZSAwIDw9IHggPCAod2lkdGgpLlxuLy9cbi8vIFRoZSBnKGNvdW50KSBtZXRob2QgcmV0dXJucyBhIHBzZXVkb3JhbmRvbSBpbnRlZ2VyIHRoYXQgY29uY2F0ZW5hdGVzXG4vLyB0aGUgbmV4dCAoY291bnQpIG91dHB1dHMgZnJvbSBBUkM0LiAgSXRzIHJldHVybiB2YWx1ZSBpcyBhIG51bWJlciB4XG4vLyB0aGF0IGlzIGluIHRoZSByYW5nZSAwIDw9IHggPCAod2lkdGggXiBjb3VudCkuXG4vL1xuZnVuY3Rpb24gQVJDNChrZXkpIHtcbiAgdmFyIHQsIGtleWxlbiA9IGtleS5sZW5ndGgsXG4gICAgICBtZSA9IHRoaXMsIGkgPSAwLCBqID0gbWUuaSA9IG1lLmogPSAwLCBzID0gbWUuUyA9IFtdO1xuXG4gIC8vIFRoZSBlbXB0eSBrZXkgW10gaXMgdHJlYXRlZCBhcyBbMF0uXG4gIGlmICgha2V5bGVuKSB7IGtleSA9IFtrZXlsZW4rK107IH1cblxuICAvLyBTZXQgdXAgUyB1c2luZyB0aGUgc3RhbmRhcmQga2V5IHNjaGVkdWxpbmcgYWxnb3JpdGhtLlxuICB3aGlsZSAoaSA8IHdpZHRoKSB7XG4gICAgc1tpXSA9IGkrKztcbiAgfVxuICBmb3IgKGkgPSAwOyBpIDwgd2lkdGg7IGkrKykge1xuICAgIHNbaV0gPSBzW2ogPSBtYXNrICYgKGogKyBrZXlbaSAlIGtleWxlbl0gKyAodCA9IHNbaV0pKV07XG4gICAgc1tqXSA9IHQ7XG4gIH1cblxuICAvLyBUaGUgXCJnXCIgbWV0aG9kIHJldHVybnMgdGhlIG5leHQgKGNvdW50KSBvdXRwdXRzIGFzIG9uZSBudW1iZXIuXG4gIChtZS5nID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICAvLyBVc2luZyBpbnN0YW5jZSBtZW1iZXJzIGluc3RlYWQgb2YgY2xvc3VyZSBzdGF0ZSBuZWFybHkgZG91YmxlcyBzcGVlZC5cbiAgICB2YXIgdCwgciA9IDAsXG4gICAgICAgIGkgPSBtZS5pLCBqID0gbWUuaiwgcyA9IG1lLlM7XG4gICAgd2hpbGUgKGNvdW50LS0pIHtcbiAgICAgIHQgPSBzW2kgPSBtYXNrICYgKGkgKyAxKV07XG4gICAgICByID0gciAqIHdpZHRoICsgc1ttYXNrICYgKChzW2ldID0gc1tqID0gbWFzayAmIChqICsgdCldKSArIChzW2pdID0gdCkpXTtcbiAgICB9XG4gICAgbWUuaSA9IGk7IG1lLmogPSBqO1xuICAgIHJldHVybiByO1xuICAgIC8vIEZvciByb2J1c3QgdW5wcmVkaWN0YWJpbGl0eSwgdGhlIGZ1bmN0aW9uIGNhbGwgYmVsb3cgYXV0b21hdGljYWxseVxuICAgIC8vIGRpc2NhcmRzIGFuIGluaXRpYWwgYmF0Y2ggb2YgdmFsdWVzLiAgVGhpcyBpcyBjYWxsZWQgUkM0LWRyb3BbMjU2XS5cbiAgICAvLyBTZWUgaHR0cDovL2dvb2dsZS5jb20vc2VhcmNoP3E9cnNhK2ZsdWhyZXIrcmVzcG9uc2UmYnRuSVxuICB9KSh3aWR0aCk7XG59XG5cbi8vXG4vLyBjb3B5KClcbi8vIENvcGllcyBpbnRlcm5hbCBzdGF0ZSBvZiBBUkM0IHRvIG9yIGZyb20gYSBwbGFpbiBvYmplY3QuXG4vL1xuZnVuY3Rpb24gY29weShmLCB0KSB7XG4gIHQuaSA9IGYuaTtcbiAgdC5qID0gZi5qO1xuICB0LlMgPSBmLlMuc2xpY2UoKTtcbiAgcmV0dXJuIHQ7XG59O1xuXG4vL1xuLy8gZmxhdHRlbigpXG4vLyBDb252ZXJ0cyBhbiBvYmplY3QgdHJlZSB0byBuZXN0ZWQgYXJyYXlzIG9mIHN0cmluZ3MuXG4vL1xuZnVuY3Rpb24gZmxhdHRlbihvYmosIGRlcHRoKSB7XG4gIHZhciByZXN1bHQgPSBbXSwgdHlwID0gKHR5cGVvZiBvYmopLCBwcm9wO1xuICBpZiAoZGVwdGggJiYgdHlwID09ICdvYmplY3QnKSB7XG4gICAgZm9yIChwcm9wIGluIG9iaikge1xuICAgICAgdHJ5IHsgcmVzdWx0LnB1c2goZmxhdHRlbihvYmpbcHJvcF0sIGRlcHRoIC0gMSkpOyB9IGNhdGNoIChlKSB7fVxuICAgIH1cbiAgfVxuICByZXR1cm4gKHJlc3VsdC5sZW5ndGggPyByZXN1bHQgOiB0eXAgPT0gJ3N0cmluZycgPyBvYmogOiBvYmogKyAnXFwwJyk7XG59XG5cbi8vXG4vLyBtaXhrZXkoKVxuLy8gTWl4ZXMgYSBzdHJpbmcgc2VlZCBpbnRvIGEga2V5IHRoYXQgaXMgYW4gYXJyYXkgb2YgaW50ZWdlcnMsIGFuZFxuLy8gcmV0dXJucyBhIHNob3J0ZW5lZCBzdHJpbmcgc2VlZCB0aGF0IGlzIGVxdWl2YWxlbnQgdG8gdGhlIHJlc3VsdCBrZXkuXG4vL1xuZnVuY3Rpb24gbWl4a2V5KHNlZWQsIGtleSkge1xuICB2YXIgc3RyaW5nc2VlZCA9IHNlZWQgKyAnJywgc21lYXIsIGogPSAwO1xuICB3aGlsZSAoaiA8IHN0cmluZ3NlZWQubGVuZ3RoKSB7XG4gICAga2V5W21hc2sgJiBqXSA9XG4gICAgICBtYXNrICYgKChzbWVhciBePSBrZXlbbWFzayAmIGpdICogMTkpICsgc3RyaW5nc2VlZC5jaGFyQ29kZUF0KGorKykpO1xuICB9XG4gIHJldHVybiB0b3N0cmluZyhrZXkpO1xufVxuXG4vL1xuLy8gYXV0b3NlZWQoKVxuLy8gUmV0dXJucyBhbiBvYmplY3QgZm9yIGF1dG9zZWVkaW5nLCB1c2luZyB3aW5kb3cuY3J5cHRvIGFuZCBOb2RlIGNyeXB0b1xuLy8gbW9kdWxlIGlmIGF2YWlsYWJsZS5cbi8vXG5mdW5jdGlvbiBhdXRvc2VlZCgpIHtcbiAgdHJ5IHtcbiAgICBpZiAobm9kZWNyeXB0bykgeyByZXR1cm4gdG9zdHJpbmcobm9kZWNyeXB0by5yYW5kb21CeXRlcyh3aWR0aCkpOyB9XG4gICAgdmFyIG91dCA9IG5ldyBVaW50OEFycmF5KHdpZHRoKTtcbiAgICAoZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG8pLmdldFJhbmRvbVZhbHVlcyhvdXQpO1xuICAgIHJldHVybiB0b3N0cmluZyhvdXQpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgdmFyIGJyb3dzZXIgPSBzZWxmLm5hdmlnYXRvcixcbiAgICAgICAgcGx1Z2lucyA9IGJyb3dzZXIgJiYgYnJvd3Nlci5wbHVnaW5zO1xuICAgIHJldHVybiBbK25ldyBEYXRlLCBnbG9iYWwsIHBsdWdpbnMsIHNlbGYuc2NyZWVuLCB0b3N0cmluZyhwb29sKV07XG4gIH1cbn1cblxuLy9cbi8vIHRvc3RyaW5nKClcbi8vIENvbnZlcnRzIGFuIGFycmF5IG9mIGNoYXJjb2RlcyB0byBhIHN0cmluZ1xuLy9cbmZ1bmN0aW9uIHRvc3RyaW5nKGEpIHtcbiAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoMCwgYSk7XG59XG5cbi8vXG4vLyBXaGVuIHNlZWRyYW5kb20uanMgaXMgbG9hZGVkLCB3ZSBpbW1lZGlhdGVseSBtaXggYSBmZXcgYml0c1xuLy8gZnJvbSB0aGUgYnVpbHQtaW4gUk5HIGludG8gdGhlIGVudHJvcHkgcG9vbC4gIEJlY2F1c2Ugd2UgZG9cbi8vIG5vdCB3YW50IHRvIGludGVyZmVyZSB3aXRoIGRldGVybWluaXN0aWMgUFJORyBzdGF0ZSBsYXRlcixcbi8vIHNlZWRyYW5kb20gd2lsbCBub3QgY2FsbCBtYXRoLnJhbmRvbSBvbiBpdHMgb3duIGFnYWluIGFmdGVyXG4vLyBpbml0aWFsaXphdGlvbi5cbi8vXG5taXhrZXkobWF0aC5yYW5kb20oKSwgcG9vbCk7XG5cbi8vXG4vLyBOb2RlanMgYW5kIEFNRCBzdXBwb3J0OiBleHBvcnQgdGhlIGltcGxlbWVudGF0aW9uIGFzIGEgbW9kdWxlIHVzaW5nXG4vLyBlaXRoZXIgY29udmVudGlvbi5cbi8vXG4vL2lmICgodHlwZW9mIG1vZHVsZSkgPT0gJ29iamVjdCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgLy9tb2R1bGUuZXhwb3J0cyA9IHNlZWRyYW5kb207XG4gIC8vLy8gV2hlbiBpbiBub2RlLmpzLCB0cnkgdXNpbmcgY3J5cHRvIHBhY2thZ2UgZm9yIGF1dG9zZWVkaW5nLlxuICAvL3RyeSB7XG4gICAgLy9ub2RlY3J5cHRvID0gcmVxdWlyZSgnY3J5cHRvJyk7XG4gIC8vfSBjYXRjaCAoZXgpIHt9XG4vL30gZWxzZSBpZiAoKHR5cGVvZiBkZWZpbmUpID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAvL2RlZmluZShmdW5jdGlvbigpIHsgcmV0dXJuIHNlZWRyYW5kb207IH0pO1xuLy99XG5cbmV4cG9ydCBkZWZhdWx0IHNlZWRyYW5kb207XG4iLCIvLyBVdGlsc1xuaW1wb3J0IENvbmZpZyAgICAgICBmcm9tICcuLi8uLi9Db25maWcnO1xuaW1wb3J0IE1lc3NhZ2UgICAgICBmcm9tICcuLi9zZXJ2aWNlcy9NZXNzYWdlJztcbmltcG9ydCBMb2dnZXIgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCBzZWVkcmFuZG9tICAgZnJvbSAnLi4vc2VydmljZXMvUm5nJztcblxuLy8gTW9kZWxzXG5pbXBvcnQgR2FtZSAgICAgICAgIGZyb20gJy4uL21vZGVscy9HYW1lJztcbmltcG9ydCBSb29tICAgICAgICAgZnJvbSAnLi4vbW9kZWxzL29iamVjdHMvUm9vbSc7XG5pbXBvcnQgUGxheWVyICAgICAgIGZyb20gJy4uL21vZGVscy9vYmplY3RzL1BsYXllcic7XG5pbXBvcnQgTW9uc3RlciAgICAgIGZyb20gJy4uL21vZGVscy9vYmplY3RzL01vbnN0ZXInO1xuXG5jbGFzcyBTaW11bGF0aW9uIHtcblxuICAgIGdldCBsb2NhbFBsYXllcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xvY2FsUGxheWVyO1xuICAgIH1cblxuICAgIHNldCBsb2NhbFBsYXllcihwKSB7XG4gICAgICAgIHRoaXMuX2xvY2FsUGxheWVyID0gcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBzdGF0ZSBvZiBhIG1vZGVsXG4gICAgICovXG4gICAgc2V0U3RhdGUobW9kZWwsIGRhdGEpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1vZGVsLnN0YXRlID0gZGF0YS5zdGF0ZSB8fCBkYXRhO1xuICAgICAgICAgICAgdGhpcy5vdXRib3VuZE1lc3NhZ2VzLnB1c2gobmV3IE1lc3NhZ2UoMCwgbW9kZWwuc3RhdGVNZXNzYWdlLCBkYXRhKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgTG9nZ2VyLmVycihlcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSAxMDAwLzMwO1xuICAgICAgICB0aGlzLmZpcnN0ID0gdGhpcy50aGVuO1xuICAgICAgICB0aGlzLmNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTdGFjayA9IFtdO1xuICAgICAgICB0aGlzLm91dGJvdW5kTWVzc2FnZXMgPSBbXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHYW1lIExvb3AgTG9naWNcbiAgICAgKi9cbiAgICB0aWNrKCkge1xuICAgICAgICAvLyBHZXQgY3VycmVudCBtZXNzYWdlcyBhbmQgdGhlbiByZXNldCB0aGUgc3RhY2tcbiAgICAgICAgbGV0IG1lc3NhZ2VzID0gdGhpcy5tZXNzYWdlU3RhY2s7XG4gICAgICAgIHRoaXMubWVzc2FnZVN0YWNrID0gW107XG5cbiAgICAgICAgLy8gUHJvY2VzcyBhbGwgbWVzc2FnZXMgdGhhdCBoYXZlIGNvbWUgaW4gc2luY2UgbGFzdCB0aWNrXG4gICAgICAgIGZvcihsZXQgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgICAgICAgICAgTG9nZ2VyLmRlYnVnKFwiUHJvY2VzaW5nIG1lc3NhZ2U6XCIpO1xuICAgICAgICAgICAgTG9nZ2VyLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIGxldCBmcm9tICAgICAgPSBtZXNzYWdlLmZyb207XG4gICAgICAgICAgICBsZXQgZXZlbnROYW1lID0gbWVzc2FnZS5ldmVudDtcbiAgICAgICAgICAgIGxldCBkYXRhICAgICAgPSBtZXNzYWdlLmRhdGE7XG5cbiAgICAgICAgICAgIC8vIERlY2lkZSB3aGF0IHRvIGRvIHdpdGggbWVzc2FnZVxuICAgICAgICAgICAgc3dpdGNoKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgXCJnYW1lLWhvc3RcIjpcbiAgICAgICAgICAgICAgICAgICAgLy8gSW5pdGlhbGl6ZSBiYXNpYyBtb2RlbHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXJzID0gbmV3IE1hcCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdhbWUgICAgPSBuZXcgR2FtZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuZ2FtZSwgXCJsb2JieVwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ybmcgPSBuZXcgTWF0aC5zZWVkcmFuZG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwbGF5ZXJNZXNzYWdlID0gbmV3IE1lc3NhZ2UoMCwgXCJwbGF5ZXItam9pbi1sb2NhbFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5hbWVcIjogbWVzc2FnZS5kYXRhLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IG1lc3NhZ2UuZGF0YS5pZFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHAgPSBuZXcgUGxheWVyKGRhdGEubmFtZSwgZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9jYWxQbGF5ZXIgPSBwO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnMuc2V0KGRhdGEuaWQsIHApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlTWVzc2FnZShwbGF5ZXJNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBsYXllci1qb2luLXJlbW90ZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllcnMuc2V0KGRhdGEuaWQsIG5ldyBQbGF5ZXIoZGF0YS5uYW1lLCBkYXRhLmlkLCBkYXRhLmpvYiA/IGRhdGEuam9iLm5hbWUgOiAwKSk7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgcGxheWVyIG9mIHRoaXMucGxheWVycy52YWx1ZXMoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5xdWV1ZU1lc3NhZ2UobmV3IE1lc3NhZ2UoMCwgXCJwbGF5ZXItam9pbi1yZW1vdGVcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IHBsYXllci5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBwbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgam9iOiBwbGF5ZXIuam9iID8gcGxheWVyLmpvYi5uYW1lIDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShwbGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHBsYXllci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCI6IFwiaWRsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWVyLWpvYlwiOlxuICAgICAgICAgICAgICAgICAgICAvLyBDaGVjayB0byBtYWtlIHN1cmUgaXRzIHZhbGlkXG4gICAgICAgICAgICAgICAgICAgIGlmKGZyb20gPT09IDAgfHwgZnJvbSA9PT0gZGF0YS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHBsYXllciA9IHRoaXMucGxheWVycy5nZXQoZGF0YS5pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwbGF5ZXIgJiYgIShwbGF5ZXIuam9iICYmIHBsYXllci5qb2IubmFtZSA9PT0gZGF0YS5qb2IpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyLmpvYiA9IGRhdGEuam9iO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWVNZXNzYWdlKG1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJwbGF5ZXItc3RhdGVcIjpcbiAgICAgICAgICAgICAgICAgICAgaWYoZnJvbSA9PT0gMCB8fCBmcm9tID09PSBkYXRhLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcGxheWVyID0gdGhpcy5wbGF5ZXJzLmdldChkYXRhLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHBsYXllciAmJiBwbGF5ZXIuc3RhdGUgIT09IGRhdGEuc3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighKHRoaXMuZ2FtZS5zdGF0ZSA9PT0gXCJsb2JieVwiICYmIGRhdGEuc3RhdGUgPT09IFwicmVhZHlcIiAmJiAhcGxheWVyLmpvYikpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUocGxheWVyLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwicGxheWVyLWFjdGlvblwiOlxuICAgICAgICAgICAgICAgICAgICBpZihmcm9tID09PSAwIHx8IGZyb20gPT09IGRhdGEuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwbGF5ZXIgPSB0aGlzLnBsYXllcnMuZ2V0KGRhdGEuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRQbGF5ZXJBY3Rpb24ocGxheWVyLCBkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwiZ2FtZS1zdGFydFwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJuZyA9IHNlZWRyYW5kb20oZGF0YS5zZWVkIHx8IFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnF1ZXVlTWVzc2FnZShuZXcgTWVzc2FnZSgwLCBcImdhbWUtY3JlYXRlXCIsIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2godGhpcy5nYW1lLnN0YXRlKSB7XG4gICAgICAgICAgICBjYXNlIFwibG9iYnlcIjpcbiAgICAgICAgICAgICAgICB0aGlzLmxvYmJ5VGljaygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInBsYXlpbmdcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlpbmdUaWNrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEbyB3ZSBuZWVkIHRvIGJyb2FkY2FzdCB0aWNrP1xuICAgICAgICBpZih0aGlzLm91dGJvdW5kTWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJTaW11bGF0aW9uIHNlbmQgbWVzc2FnZXNcIik7XG4gICAgICAgICAgICBMb2dnZXIubG9nKHRoaXMub3V0Ym91bmRNZXNzYWdlcyk7XG4gICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHRoaXMub3V0Ym91bmRNZXNzYWdlcyk7XG4gICAgICAgICAgICB0aGlzLm91dGJvdW5kTWVzc2FnZXMgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdhbWUgbG9naWMgZm9yIHdoZW4gaW4gbG9iYnlcbiAgICAgKi9cbiAgICBsb2JieVRpY2soKSB7XG4gICAgICAgIGxldCBnYW1lUmVhZHkgPSB0cnVlO1xuXG4gICAgICAgIC8vIENoZWNrIGlmIGFsbCBwbGF5ZXJzIGFyZSByZWFkeVxuICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpXG4gICAgICAgICAgICBnYW1lUmVhZHkgJj0gcGxheWVyLnN0YXRlID09PSBcInJlYWR5XCI7XG5cbiAgICAgICAgLy8gSWYgYWxsIHBsYXllcnMgYXJlIHJlYWR5IGNoYW5nZSB0aGUgZ2FtZSBzdGF0ZVxuICAgICAgICBpZihnYW1lUmVhZHkpIHtcbiAgICAgICAgICAgIHRoaXMucm9vbSA9IHRoaXMuY3JlYXRlUm9vbSgpO1xuICAgICAgICAgICAgdGhpcy5xdWV1ZU1lc3NhZ2UobmV3IE1lc3NhZ2UoMCwgXCJyb29tLWNyZWF0ZVwiLCB0aGlzLnJvb20udHlwZSkpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh0aGlzLmdhbWUsIFwicGxheWluZ1wiKTtcblxuICAgICAgICAgICAgbGV0IHhQb3MgPSAxMy41O1xuICAgICAgICAgICAgbGV0IHlQb3MgPSAyO1xuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5xdWV1ZU1lc3NhZ2UobmV3IE1lc3NhZ2UoMCwgXCJwbGF5ZXItc2V0XCIsIHtcbiAgICAgICAgICAgICAgICAgICAgXCJpZFwiOiBwbGF5ZXIuaWQsXG4gICAgICAgICAgICAgICAgICAgIFwia2V5c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcInhQb3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieVBvc1wiXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIFwidmFsdWVzXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIChwbGF5ZXIuam9iLnBvc3NpdGlvbiA9PT0gXCJiYWNrXCIpID8geFBvcyAtIDEgOiB4UG9zLFxuICAgICAgICAgICAgICAgICAgICAgICAgeVBvc1xuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUocGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgIFwic3RhdGVcIjogXCJpZGxlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiaWRcIjogcGxheWVyLmlkXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgeVBvcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2FtZSBsb2dpYyBmb3Igd2hlbiBwbGF5aW5nXG4gICAgICovXG4gICAgcGxheWluZ1RpY2soKSB7XG4gICAgICAgIGlmKHRoaXMucm9vbS5zdGF0ZSA9PT0gXCJpZGxlXCIpIHtcbiAgICAgICAgICAgIGxldCBwYXJ0eVJlYWR5ID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYWxsIHBsYXllcnMgYXJlIHJlYWR5XG4gICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpXG4gICAgICAgICAgICAgICAgcGFydHlSZWFkeSAmPSBwbGF5ZXIuYWN0aW9uID09PSBcInJlYWR5XCI7XG5cbiAgICAgICAgICAgIGlmKHBhcnR5UmVhZHkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMucm9vbSwgXCJtb3ZpbmdcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5yb29tLnN0ZXBzID0gMDtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHBsYXllciBvZiB0aGlzLnBsYXllcnMudmFsdWVzKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUocGxheWVyLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCI6IFwid2Fsa2luZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpZFwiIDogcGxheWVyLmlkXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYodGhpcy5yb29tLnN0YXRlID09PSBcIm1vdmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLnJvb20uc3RlcHMrKztcbiAgICAgICAgICAgIGlmKHRoaXMucm9vbS5zdGVwcyA+PSAxMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb20uc3RlcHMgPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRCYXR0bGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKHRoaXMucm9vbS5zdGF0ZSA9PT0gXCJiYXR0bGVcIikge1xuICAgICAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICAgICAgaWYocGxheWVyLnN0YXRlID09PSBcImNvb2xkb3duXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLmNvb2xkb3duKys7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucXVldWVNZXNzYWdlKG5ldyBNZXNzYWdlKDAsIFwicGxheWVyLXNldFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBcImlkXCI6IHBsYXllci5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwia2V5c1wiOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjb29sZG93blwiXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2YWx1ZXNcIjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5jb29sZG93blxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBsYXllci5jb29sZG93biA9PT0gcGxheWVyLmpvYi5jb29sZG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShwbGF5ZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInN0YXRlXCI6IFwiaWRsZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaWRcIjogcGxheWVyLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciB0byBjcmVhdGUgYSByb29tIGJhc2VkIG9uIFJOR1xuICAgICAqL1xuICAgIGNyZWF0ZVJvb20oKSB7XG4gICAgICAgIGxldCB0eXBlID0gUm9vbS5UWVBFU1twYXJzZUludCh0aGlzLnJuZy5xdWljaygpKlJvb20uVFlQRVMubGVuZ3RoKV07XG4gICAgICAgIHJldHVybiBuZXcgUm9vbSh0eXBlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIZWxwZXIgdG8gY3JlYXRlIGEgcm9vbSBiYXNlZCBvbiBSTkdcbiAgICAgKi9cbiAgICBzZXRQbGF5ZXJBY3Rpb24ocGxheWVyLCBkYXRhKSB7XG4gICAgICAgIGlmKHRoaXMuZ2FtZS5zdGF0ZSAhPT0gXCJwbGF5aW5nXCIpIHJldHVybjtcblxuICAgICAgICBpZihwbGF5ZXIuYWN0aW9uICE9PSBkYXRhLmFjdGlvbikge1xuICAgICAgICAgICAgcGxheWVyLmFjdGlvbiA9IGRhdGEuYWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5xdWV1ZU1lc3NhZ2UobmV3IE1lc3NhZ2UoMCwgXCJwbGF5ZXItYWN0aW9uXCIsIGRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciB0byBzZXQgZXZlcnl0aGluZyB1cCBmb3IgYmF0dGxlXG4gICAgICovXG4gICAgc3RhcnRCYXR0bGUoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUodGhpcy5yb29tLCBcImJhdHRsZVwiKTtcbiAgICAgICAgZm9yKGxldCBwbGF5ZXIgb2YgdGhpcy5wbGF5ZXJzLnZhbHVlcygpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFBsYXllckFjdGlvbihwbGF5ZXIsIHtcbiAgICAgICAgICAgICAgICBcImFjdGlvblwiOiBcIlwiLFxuICAgICAgICAgICAgICAgIFwiaWRcIiA6IHBsYXllci5pZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0Q29vbGRvd24ocGxheWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhlbHBlciB0byBzdGFydCBwbGF5ZXIgY29vbGRvd25cbiAgICAgKi9cbiAgICBzdGFydENvb2xkb3duKHBsYXllcikge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHBsYXllciwge1xuICAgICAgICAgICAgXCJzdGF0ZVwiOiBcImNvb2xkb3duXCIsXG4gICAgICAgICAgICBcImlkXCIgOiBwbGF5ZXIuaWRcbiAgICAgICAgfSk7XG4gICAgICAgIHBsYXllci5jb29sZG93biA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkIG1lc3NhZ2UgdG8gdGhlIG91dGJvdW5kIHF1ZXVlXG4gICAgICovXG4gICAgcXVldWVNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgdGhpcy5vdXRib3VuZE1lc3NhZ2VzLnB1c2gobWVzc2FnZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2NlcyBpbmNvbWluZyBtZXNzYWdlXG4gICAgICovXG4gICAgb25NZXNzYWdlKG1lc3NhZ2UpIHtcbiAgICAgICAgTG9nZ2VyLmRlYnVnKFwiU2ltdWxhdGlvbiByZWNpZXZlZCBtZXNzYWdlIGZyb20gQ2xpZW50XCIpO1xuICAgICAgICBsZXQgZGVjb2RlZE1lc3NhZ2UgPSBtZXNzYWdlLmRhdGE7XG4gICAgICAgIExvZ2dlci5sb2coZGVjb2RlZE1lc3NhZ2UpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VTdGFjay5wdXNoKGRlY29kZWRNZXNzYWdlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSdW4gY2xvc2VzdCB0byB0aGUgRlBTIGFzIHBvc3NpYmxlXG4gICAgICovXG4gICAgbG9vcCgpIHtcbiAgICAgICAgbGV0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGxldCBkZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcblxuICAgICAgICAvLyBJZiB0aGUgZnBzIGludGVydmFsIGlzIGNvcnJlY3RcbiAgICAgICAgaWYgKGRlbHRhID4gdGhpcy5pbnRlcnZhbCkge1xuICAgICAgICAgICAgLy8gQ2FsY3VsYXRlIHRpbWUgc2luY2UgbGFzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy50aGVuID0gbm93IC0gKGRlbHRhICUgdGhpcy5pbnRlcnZhbCk7XG5cbiAgICAgICAgICAgIHRoaXMudGljaygpO1xuXG4gICAgICAgICAgICAvLyBDYWxjdWxhdGUgbmV4dCByZW5kZXIgY3ljbGVcbiAgICAgICAgICAgIGxldCB0aW1lX2VsID0gKHRoaXMudGhlbiAtIHRoaXMuZmlyc3QpLzEwMDA7XG4gICAgICAgICAgICArK3RoaXMuY291bnRlcjtcbiAgICAgICAgICAgIC8vbGV0IF9mcHMgPSBwYXJzZUludChjb3VudGVyL3RpbWVfZWwpO1xuXG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgRnJhbWVcbiAgICAgICAgICAgIHRoaXMubG9vcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0VGltZW91dCh0aGlzLmxvb3AuYmluZCh0aGlzKSwgMSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEluaXRpYWxpemUgYSBuZXcgc2ltdWxhdGlvblxubGV0IHNpbXVsYXRpb24gPSBuZXcgU2ltdWxhdGlvbigpO1xuXG4vLyBBdHRhY2ggSS9PXG5vbm1lc3NhZ2UgPSBzaW11bGF0aW9uLm9uTWVzc2FnZS5iaW5kKHNpbXVsYXRpb24pO1xuc2ltdWxhdGlvbi5wb3N0TWVzc2FnZSA9IHBvc3RNZXNzYWdlO1xuXG4vLyBTdGFydCB0aGUgc2ltdWxhdGlvblxuc2ltdWxhdGlvbi5sb29wKCk7XG5cbnNlbGYuc2ltdWxhdGlvbiA9IHNpbXVsYXRpb247XG4iXX0=
