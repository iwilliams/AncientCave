(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    value: function on(types, listener) {
      if (typeof listener != "function") {
        throw new TypeError();
      }
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = types.split(" ")[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var type = _step.value;

          var listeners = this._events[type] || (this._events[type] = []);
          if (listeners.indexOf(listener) != -1) {
            return this;
          }
          listeners.push(listener);
          if (listeners.length > this._maxListeners) {
            error("possible memory leak, added %i %s listeners, " + "use EventEmitter#setMaxListeners(number) if you " + "want to increase the limit (%i now)", listeners.length, type, this._maxListeners);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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

},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = Message;
exports.decodeMessage = decodeMessage;
var EVENTS = ["initialize", "peer-connect", "game-state", "player-connect", "player-disconnect", "player-state", "player-job", "player-action", "player-cooldown", "view-ready"];

function Message(event, data) {
    var message = [];

    if (EVENTS.indexOf(event) < 0) throw "Event " + event + " is not a permitted event";

    messages[0] = EVENTS.indexOf(event);

    if (data) messages[1] = data;

    return message;
}

function decodeMessage(message) {
    if (message[0] > EVENTS.length - 1) throw "Event with index " + message[0] + " does not exist";

    return {
        "event": EVENTS[message[0]],
        "data": message[1]
    };
}

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mixinsEventEmitter = require('../mixins/EventEmitter');

var _mixinsEventEmitter2 = _interopRequireDefault(_mixinsEventEmitter);

var _servicesLogger = require('../services/Logger');

var _servicesLogger2 = _interopRequireDefault(_servicesLogger);

var _servicesMessage = require('../services/Message');

var NetworkWorker = (function () {
    function NetworkWorker(mainThreadMessage) {
        _classCallCheck(this, NetworkWorker);

        mainThreadMessage = this.onMainThreadMessage.bind(this);
    }

    /**
     * When we recieve a message from the main thread
     */

    _createClass(NetworkWorker, [{
        key: 'onMainThreadMessage',
        value: function onMainThreadMessage(e) {
            var message = (0, _servicesMessage.decodeMessage)(e.data);

            // Initialize is a private message
            // broadcast to peers otherwise
            if (message.event = "initialize") {
                this.onInitialize(message.data);
            } else {
                // overide the message with our internal id
                message.data.id = this._id;
                this.sendMessageToPeers((0, _servicesMessage.encodeMessage)(message.event, message.data));
            }
        }

        /**
         * Handler for network messages
         */
    }, {
        key: 'onNetworkMessage',
        value: function onNetworkMessage(rawMessage) {
            _servicesLogger2['default'].debug('Message recieved from peer with id ' + message.from);
            _servicesLogger2['default'].log(rawMessage);

            var message = (0, _servicesMessage.decodeMessage)(rawMessage);

            if (message.event == "peer-connect") {
                // See if this peer knows about any other peers and add if we don't know them
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = data.peers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var peer = _step.value;

                        if (!this._peers.get(peer) && peer !== this._id) {
                            _servicesLogger2['default'].debug('Adding Peer with id ' + peer);
                            this.addPeer(this._peer.connect(peer));
                        }
                    }

                    // See if we have already connected to this peer
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

                if (this._peers.get(message.from) && !this._peers.get(message.from).hasConnected) {
                    this.connectToPeer(this._peers.get(message.from));
                }

                postMessage((0, _servicesMessage.encodeMessage)("player-add", message.data));
            } else {
                postMessage((0, _servicesMessage.encodeMessage)(message.event, message.data));
            }
        }

        /**
         * Initialize with some info from the outside
         */
    }, {
        key: 'onInitialize',
        value: function onInitialize(data) {
            var _this = this;

            this._name = data.name;
            if (host) this._host = data.host;else this._id = "host";

            this._peers = new Map();

            this._peer = new Peer(this._id, {
                key: "xahxx0yuy5le4s4i",
                debug: 3
            });

            this._peer.on('open', function (id) {
                _servicesLogger2['default'].debug('Peer Connection created, Peer ID is ' + id);
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
                        _servicesLogger2['default'].debug("Peer has connected");
                        _servicesLogger2['default'].log(connection);
                        var peer = _this.addPeer(connection);
                        _this.connectToPeer(peer);
                    });
                });

                // Let the main thread know we are initialized
                postMessage((0, _servicesMessage.encodeMessage)("initialized"));
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

            connection.on('data', this.onNetworkMessage.bind(this));

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
                    "id": this._id,
                    "name": this._name,
                    "job": this._selectedJob || undefined
                }
            };

            var peers = [];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = this._peers.keys()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var _peer = _step2.value;

                    peers.push(_peer);
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

            message.data.peers = peers;

            _servicesLogger2['default'].debug('Sending peer-connect message to peer with id ' + peer);
            _servicesLogger2['default'].log(message);
            peer.connection.send(message);
            peer.hasConnected = true;
        }
    }, {
        key: 'removePeer',
        value: function removePeer(peer) {
            _servicesLogger2['default'].debug("Remove peer");
            this._peers['delete'](peer.connection.peer);
            postMessage({
                "message": "peer-disconnect",
                "data": {
                    "id": peer.connection.peer
                }
            });
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            this._peer.destroy();
        }

        /**
         * Send message to all peers
         */
    }, {
        key: 'sendMessageToPeers',
        value: function sendMessageToPeers(message) {
            if (this._peers) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = this._peers.values()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var peer = _step3.value;

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

    return NetworkWorker;
})();

new NetworkWorker(onmessage);

},{"../mixins/EventEmitter":1,"../services/Logger":2,"../services/Message":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvaWFuYXcvUHJvamVjdHMvQW5jaWVudENhdmUvc3JjL2FwcC9taXhpbnMvRXZlbnRFbWl0dGVyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTG9nZ2VyLmpzIiwiL1VzZXJzL2lhbmF3L1Byb2plY3RzL0FuY2llbnRDYXZlL3NyYy9hcHAvc2VydmljZXMvTWVzc2FnZS5qcyIsIi9Vc2Vycy9pYW5hdy9Qcm9qZWN0cy9BbmNpZW50Q2F2ZS9zcmMvYXBwL3dvcmtlcnMvTmV0d29ya1dvcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7QUNBQSxJQUFJLHFCQUFxQixHQUFHLEVBQUUsQ0FBQTs7QUFFOUIsU0FBUyxLQUFLLENBQUMsT0FBTyxFQUFVO29DQUFMLElBQUk7QUFBSixRQUFJOzs7QUFDN0IsU0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDcEQsU0FBTyxDQUFDLEtBQUssRUFBRSxDQUFBO0NBQ2hCOzs7QUFJYyxzQkFBRzs7O0FBQ1YsUUFBSSxDQUFDLGFBQWEsR0FBRyxxQkFBcUIsQ0FBQTtBQUMxQyxRQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQTtHQUNwQjs7OztXQUVDLFlBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRTtBQUNoQixVQUFHLE9BQU8sUUFBUSxJQUFJLFVBQVUsRUFBRTtBQUNoQyxjQUFNLElBQUksU0FBUyxFQUFFLENBQUE7T0FDdEI7Ozs7OztBQUNELDZCQUFnQixLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyw4SEFBRTtjQUExQixJQUFJOztBQUNSLGNBQUksU0FBUyxHQUFHLElBQUks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QUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3pDLHVCQUFXLENBQUM7QUFDUix5QkFBUyxFQUFFLGlCQUFpQjtBQUM1QixzQkFBTSxFQUFFO0FBQ0osd0JBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7aUJBQzdCO2FBQ0osQ0FBQyxDQUFDO1NBQ047OztlQUVTLHNCQUFHO0FBQ1QsZ0JBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDeEI7Ozs7Ozs7ZUFLaUIsNEJBQUMsT0FBTyxFQUFFO0FBQ3hCLGdCQUFHLElBQUksQ0FBQyxNQUFNOzs7Ozs7QUFDViwwQ0FBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7NEJBQTVCLElBQUk7O0FBQ1IsNEJBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUFBOzs7Ozs7Ozs7Ozs7Ozs7YUFBQTtTQUN6Qzs7O1dBNUpDLGFBQWE7OztBQWdLbkIsSUFBSSxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIERFRkFVTFRfTUFYX0xJU1RFTkVSUyA9IDEyXG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuICBjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpXG4gIGNvbnNvbGUudHJhY2UoKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5fbWF4TGlzdGVuZXJzID0gREVGQVVMVF9NQVhfTElTVEVORVJTXG4gICAgICAgIHRoaXMuX2V2ZW50cyA9IHt9XG4gICAgfVxuXG4gICAgb24odHlwZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKClcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IHR5cGUgb2YgdHlwZXMuc3BsaXQoXCIgXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdIHx8KHRoaXMuX2V2ZW50c1t0eXBlXSA9IFtdKVxuICAgICAgICAgICAgaWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaXN0ZW5lcnMucHVzaChsaXN0ZW5lcilcbiAgICAgICAgICAgIGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgZXJyb3IoXG4gICAgICAgICAgICAgICAgXCJwb3NzaWJsZSBtZW1vcnkgbGVhaywgYWRkZWQgJWkgJXMgbGlzdGVuZXJzLCBcIitcbiAgICAgICAgICAgICAgICBcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcbiAgICAgICAgICAgICAgICBcIndhbnQgdG8gaW5jcmVhc2UgdGhlIGxpbWl0ICglaSBub3cpXCIsXG4gICAgICAgICAgICAgICAgbGlzdGVuZXJzLmxlbmd0aCxcbiAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIHRoaXMuX21heExpc3RlbmVyc1xuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICB9XG5cbiAgICBvbmNlKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBldmVudHNJbnN0YW5jZSA9IHRoaXNcbiAgICAgICAgZnVuY3Rpb24gb25jZUNhbGxiYWNrKCl7XG4gICAgICAgICAgZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjaylcbiAgICAgICAgICBsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMub24odHlwZSwgb25jZUNhbGxiYWNrKVxuICAgIH1cblxuICAgIG9mZih0eXBlLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmKGFyZ3MubGVuZ3RoID09IDApIHtcbiAgICAgICAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBudWxsXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVyID0gYXJnc1swXVxuICAgICAgICBpZih0eXBlb2YgbGlzdGVuZXIgIT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigpXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpXG4gICAgICAgIGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuICAgICAgICAgIHJldHVybiB0aGlzXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleE9mTGlzdGVuZXIsIDEpXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgfVxuXG4gICAgZW1pdCh0eXBlLCAuLi5hcmdzKXtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXVxuICAgICAgICBpZighbGlzdGVuZXJzIHx8ICFsaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgbGlzdGVuZXJzLmZvckVhY2goZm4gPT4gZm4uYXBwbHkobnVsbCwgYXJncykpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgc2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG4gICAgICAgIGlmKHBhcnNlSW50KG5ld01heExpc3RlbmVycykgIT09IG5ld01heExpc3RlbmVycykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoKVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVyc1xuICAgIH1cblxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3Mge1xuICAgIHN0YXRpYyBiYW5uZXIobXNnKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGAlYyR7bXNnLnRvVXBwZXJDYXNlKCl9YCwgJ2ZvbnQtc2l6ZTogMzBweDsgYmFja2dyb3VuZDogIzIyMjsgY29sb3I6ICNiYWRhNTU7Jyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGRlYnVnKG1zZykge1xuICAgICAgICBjb25zb2xlLnRyYWNlKGAlYyR7bXNnfWAsICdmb250LXNpemU6IDE1cHg7IGJhY2tncm91bmQ6ICMyMjI7IGNvbG9yOiAjYmFkYTU1OycpO1xuICAgIH1cblxuICAgIHN0YXRpYyBsb2cobXNnKSB7XG4gICAgICAgIGNvbnNvbGUudHJhY2UobXNnKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgZXJyb3IobXNnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobXNnKTtcbiAgICB9XG59XG4iLCJsZXQgRVZFTlRTID0gW1xuICAgIFwiaW5pdGlhbGl6ZVwiLFxuICAgIFwicGVlci1jb25uZWN0XCIsXG4gICAgXCJnYW1lLXN0YXRlXCIsXG4gICAgXCJwbGF5ZXItY29ubmVjdFwiLFxuICAgIFwicGxheWVyLWRpc2Nvbm5lY3RcIixcbiAgICBcInBsYXllci1zdGF0ZVwiLFxuICAgIFwicGxheWVyLWpvYlwiLFxuICAgIFwicGxheWVyLWFjdGlvblwiLFxuICAgIFwicGxheWVyLWNvb2xkb3duXCIsXG4gICAgXCJ2aWV3LXJlYWR5XCJcbl07XG5cbmV4cG9ydCBmdW5jdGlvbiBNZXNzYWdlKGV2ZW50LCBkYXRhKSB7XG4gICAgbGV0IG1lc3NhZ2UgPSBbXTtcblxuICAgIGlmKEVWRU5UUy5pbmRleE9mKGV2ZW50KSA8IDApXG4gICAgICAgIHRocm93IFwiRXZlbnQgXCIgKyBldmVudCArIFwiIGlzIG5vdCBhIHBlcm1pdHRlZCBldmVudFwiO1xuXG4gICAgbWVzc2FnZXNbMF0gPSBFVkVOVFMuaW5kZXhPZihldmVudCk7XG5cbiAgICBpZihkYXRhKVxuICAgICAgICBtZXNzYWdlc1sxXSA9IGRhdGE7XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY29kZU1lc3NhZ2UobWVzc2FnZSkge1xuICAgIGlmKG1lc3NhZ2VbMF0gPiBFVkVOVFMubGVuZ3RoIC0gMSlcbiAgICAgICAgdGhyb3cgXCJFdmVudCB3aXRoIGluZGV4IFwiICsgbWVzc2FnZVswXSArIFwiIGRvZXMgbm90IGV4aXN0XCI7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBcImV2ZW50XCI6IEVWRU5UU1ttZXNzYWdlWzBdXSxcbiAgICAgICAgXCJkYXRhXCI6IG1lc3NhZ2VbMV1cbiAgICB9O1xufVxuIiwiaW1wb3J0IEV2ZW50RW1pdHRlciAgICAgICAgICAgICBmcm9tICcuLi9taXhpbnMvRXZlbnRFbWl0dGVyJztcbmltcG9ydCBMb2dnZXIgICAgICAgICAgICAgICAgICAgZnJvbSAnLi4vc2VydmljZXMvTG9nZ2VyJztcbmltcG9ydCB7ZW5jb2RlTWVzc2FnZSwgZGVjb2RlTWVzc2FnZX0gZnJvbSAnLi4vc2VydmljZXMvTWVzc2FnZSc7XG5cbmNsYXNzIE5ldHdvcmtXb3JrZXIge1xuICAgIGNvbnN0cnVjdG9yKG1haW5UaHJlYWRNZXNzYWdlKSB7XG4gICAgICAgIG1haW5UaHJlYWRNZXNzYWdlID0gdGhpcy5vbk1haW5UaHJlYWRNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogV2hlbiB3ZSByZWNpZXZlIGEgbWVzc2FnZSBmcm9tIHRoZSBtYWluIHRocmVhZFxuICAgICAqL1xuICAgIG9uTWFpblRocmVhZE1lc3NhZ2UoZSkge1xuICAgICAgICBsZXQgbWVzc2FnZSA9IGRlY29kZU1lc3NhZ2UoZS5kYXRhKTtcblxuICAgICAgICAvLyBJbml0aWFsaXplIGlzIGEgcHJpdmF0ZSBtZXNzYWdlXG4gICAgICAgIC8vIGJyb2FkY2FzdCB0byBwZWVycyBvdGhlcndpc2VcbiAgICAgICAgaWYobWVzc2FnZS5ldmVudCA9IFwiaW5pdGlhbGl6ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLm9uSW5pdGlhbGl6ZShtZXNzYWdlLmRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gb3ZlcmlkZSB0aGUgbWVzc2FnZSB3aXRoIG91ciBpbnRlcm5hbCBpZFxuICAgICAgICAgICAgbWVzc2FnZS5kYXRhLmlkID0gdGhpcy5faWQ7XG4gICAgICAgICAgICB0aGlzLnNlbmRNZXNzYWdlVG9QZWVycyhlbmNvZGVNZXNzYWdlKG1lc3NhZ2UuZXZlbnQsIG1lc3NhZ2UuZGF0YSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlciBmb3IgbmV0d29yayBtZXNzYWdlc1xuICAgICAqL1xuICAgIG9uTmV0d29ya01lc3NhZ2UocmF3TWVzc2FnZSkge1xuICAgICAgICBMb2dnZXIuZGVidWcoYE1lc3NhZ2UgcmVjaWV2ZWQgZnJvbSBwZWVyIHdpdGggaWQgJHttZXNzYWdlLmZyb219YCk7XG4gICAgICAgIExvZ2dlci5sb2cocmF3TWVzc2FnZSk7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2UgPSBkZWNvZGVNZXNzYWdlKHJhd01lc3NhZ2UpO1xuXG4gICAgICAgIGlmKG1lc3NhZ2UuZXZlbnQgPT0gXCJwZWVyLWNvbm5lY3RcIikge1xuICAgICAgICAgICAgLy8gU2VlIGlmIHRoaXMgcGVlciBrbm93cyBhYm91dCBhbnkgb3RoZXIgcGVlcnMgYW5kIGFkZCBpZiB3ZSBkb24ndCBrbm93IHRoZW1cbiAgICAgICAgICAgIGZvcihsZXQgcGVlciBvZiBkYXRhLnBlZXJzKSB7XG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuX3BlZXJzLmdldChwZWVyKSAmJiBwZWVyICE9PSB0aGlzLl9pZCkge1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoYEFkZGluZyBQZWVyIHdpdGggaWQgJHtwZWVyfWApO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFBlZXIodGhpcy5fcGVlci5jb25uZWN0KHBlZXIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNlZSBpZiB3ZSBoYXZlIGFscmVhZHkgY29ubmVjdGVkIHRvIHRoaXMgcGVlclxuICAgICAgICAgICAgaWYodGhpcy5fcGVlcnMuZ2V0KG1lc3NhZ2UuZnJvbSkgJiYgIXRoaXMuX3BlZXJzLmdldChtZXNzYWdlLmZyb20pLmhhc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29ubmVjdFRvUGVlcih0aGlzLl9wZWVycy5nZXQobWVzc2FnZS5mcm9tKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKGVuY29kZU1lc3NhZ2UoXCJwbGF5ZXItYWRkXCIsIG1lc3NhZ2UuZGF0YSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9zdE1lc3NhZ2UoZW5jb2RlTWVzc2FnZShtZXNzYWdlLmV2ZW50LCBtZXNzYWdlLmRhdGEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemUgd2l0aCBzb21lIGluZm8gZnJvbSB0aGUgb3V0c2lkZVxuICAgICAqL1xuICAgIG9uSW5pdGlhbGl6ZShkYXRhKSB7XG4gICAgICAgIHRoaXMuX25hbWUgPSBkYXRhLm5hbWU7XG4gICAgICAgIGlmKGhvc3QpXG4gICAgICAgICAgICB0aGlzLl9ob3N0ID0gZGF0YS5ob3N0O1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLl9pZCA9IFwiaG9zdFwiO1xuXG4gICAgICAgIHRoaXMuX3BlZXJzID0gbmV3IE1hcCgpO1xuXG4gICAgICAgIHRoaXMuX3BlZXIgPSBuZXcgUGVlcih0aGlzLl9pZCwge1xuICAgICAgICAgICAga2V5OiBcInhhaHh4MHl1eTVsZTRzNGlcIixcbiAgICAgICAgICAgIGRlYnVnOiAzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuX3BlZXIub24oJ29wZW4nLCAoaWQpPT57XG4gICAgICAgICAgICBMb2dnZXIuZGVidWcoYFBlZXIgQ29ubmVjdGlvbiBjcmVhdGVkLCBQZWVyIElEIGlzICR7aWR9YCk7XG4gICAgICAgICAgICB0aGlzLl9pZCA9IGlkO1xuXG4gICAgICAgICAgICAvLyBJZiB3ZSBrbm93IGFib3V0IGEgcGVlciB0aGVuIGNvbm5lY3RcbiAgICAgICAgICAgIGlmKHRoaXMuX2hvc3QpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGRQZWVyKHRoaXMuX3BlZXIuY29ubmVjdCh0aGlzLl9ob3N0KSk7XG5cbiAgICAgICAgICAgIC8vIFdoZW4gYSBwZWVyIGNvbm5lY3RzIGhhbmRsZSBpdFxuICAgICAgICAgICAgdGhpcy5fcGVlci5vbignY29ubmVjdGlvbicsIChjb25uZWN0aW9uKT0+e1xuICAgICAgICAgICAgICAgIC8vIERvbid0IGFsbG93IG1vcmUgdGhhbiA0IHBsYXllcnNcbiAgICAgICAgICAgICAgICBpZih0aGlzLl9wZWVycy5zaXplID49IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29ubmVjdGlvbi5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpb24ub24oJ29wZW4nLCAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuZGVidWcoXCJQZWVyIGhhcyBjb25uZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIExvZ2dlci5sb2coY29ubmVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwZWVyID0gdGhpcy5hZGRQZWVyKGNvbm5lY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbm5lY3RUb1BlZXIocGVlcik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gTGV0IHRoZSBtYWluIHRocmVhZCBrbm93IHdlIGFyZSBpbml0aWFsaXplZFxuICAgICAgICAgICAgcG9zdE1lc3NhZ2UoZW5jb2RlTWVzc2FnZShcImluaXRpYWxpemVkXCIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkUGVlcihjb25uZWN0aW9uKSB7XG4gICAgICAgIGxldCBwZWVyID0ge1xuICAgICAgICAgICAgXCJjb25uZWN0aW9uXCI6IGNvbm5lY3Rpb24sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3BlZXJzLnNldChjb25uZWN0aW9uLnBlZXIsIHBlZXIpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2RhdGEnLCAgdGhpcy5vbk5ldHdvcmtNZXNzYWdlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIGNvbm5lY3Rpb24ub24oJ2Nsb3NlJywgKCk9PntcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlUGVlcihwZWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHBlZXI7XG4gICAgfVxuXG4gICAgY29ubmVjdFRvUGVlcihwZWVyKSB7XG4gICAgICAgIGxldCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgXCJldmVudFwiOiBcInBlZXItY29ubmVjdFwiLFxuICAgICAgICAgICAgXCJmcm9tXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgXCJkYXRhXCI6IHtcbiAgICAgICAgICAgICAgICBcImlkXCI6IHRoaXMuX2lkLFxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiB0aGlzLl9uYW1lLFxuICAgICAgICAgICAgICAgIFwiam9iXCI6IHRoaXMuX3NlbGVjdGVkSm9iIHx8IHVuZGVmaW5lZFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBlZXJzID0gW107XG4gICAgICAgIGZvcihsZXQgcGVlciBvZiB0aGlzLl9wZWVycy5rZXlzKCkpIHtcbiAgICAgICAgICAgIHBlZXJzLnB1c2gocGVlcik7XG4gICAgICAgIH1cbiAgICAgICAgbWVzc2FnZS5kYXRhLnBlZXJzID0gcGVlcnM7XG5cbiAgICAgICAgTG9nZ2VyLmRlYnVnKGBTZW5kaW5nIHBlZXItY29ubmVjdCBtZXNzYWdlIHRvIHBlZXIgd2l0aCBpZCAke3BlZXJ9YCk7XG4gICAgICAgIExvZ2dlci5sb2cobWVzc2FnZSk7XG4gICAgICAgIHBlZXIuY29ubmVjdGlvbi5zZW5kKG1lc3NhZ2UpO1xuICAgICAgICBwZWVyLmhhc0Nvbm5lY3RlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmVtb3ZlUGVlcihwZWVyKSB7XG4gICAgICAgIExvZ2dlci5kZWJ1ZyhcIlJlbW92ZSBwZWVyXCIpO1xuICAgICAgICB0aGlzLl9wZWVycy5kZWxldGUocGVlci5jb25uZWN0aW9uLnBlZXIpO1xuICAgICAgICBwb3N0TWVzc2FnZSh7XG4gICAgICAgICAgICBcIm1lc3NhZ2VcIjogXCJwZWVyLWRpc2Nvbm5lY3RcIixcbiAgICAgICAgICAgIFwiZGF0YVwiOiB7XG4gICAgICAgICAgICAgICAgXCJpZFwiOiBwZWVyLmNvbm5lY3Rpb24ucGVlclxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICB0aGlzLl9wZWVyLmRlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZW5kIG1lc3NhZ2UgdG8gYWxsIHBlZXJzXG4gICAgICovXG4gICAgc2VuZE1lc3NhZ2VUb1BlZXJzKG1lc3NhZ2UpIHtcbiAgICAgICAgaWYodGhpcy5fcGVlcnMpXG4gICAgICAgICAgICBmb3IobGV0IHBlZXIgb2YgdGhpcy5fcGVlcnMudmFsdWVzKCkpXG4gICAgICAgICAgICAgICAgcGVlci5jb25uZWN0aW9uLnNlbmQobWVzc2FnZSk7XG4gICAgfVxuXG59XG5cbm5ldyBOZXR3b3JrV29ya2VyKG9ubWVzc2FnZSk7XG4iXX0=
