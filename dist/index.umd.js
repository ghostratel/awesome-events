/*!
 * awsome-events v1.0.0
 * (c) 
 * Released under the ISC License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Events = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function checkListener(listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + _typeof(listener));
    }
  }

  function emitAllListeners(listeners) {
    var i = 0;

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    while (i < listeners.length) {
      var _listeners$i;

      (_listeners$i = listeners[i]).call.apply(_listeners$i, [this].concat(args));

      listeners[i].once && (listeners.splice(i, 1), i--); // when using splice will make the array length -1, so let the index -1 too

      i++;
    }
  }

  function checkListenersLimit(eventName, listeners) {
    if (listeners.length > this._maxListeners && !listeners.warned) {
      console.warn("Possible EventEmitter memory leak detected. ".concat(listeners.length, " '").concat(eventName, "' ") + 'listeners added. Use emitter.setMaxListeners() to increase limit.');
      listeners.warned = true;
    }
  }

  var Events = function Events() {
    this._events = {};

    var _maxListeners;

    Object.defineProperty(this, '_maxListeners', {
      get: function get() {
        // when Events instance has '_maxListeners', use instance's '_maxListeners'
        // when Events instance don't has '_maxListeners', use Events.defaultMaxListeners
        return _maxListeners ? _maxListeners : this.defaultMaxListeners;
      },
      set: function set(n) {
        if (n < 0 || isNaN(n) || typeof n !== 'number') {
          throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
        }

        _maxListeners = n;
      }
    });
  };

  Events.prototype.defaultMaxListeners = 10;

  Events.prototype.on = Events.prototype.addListener = function (eventName, listener) {
    checkListener(listener);

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events['newListener'] && emitAllListeners.call(this, this._events['newListener']);

    this._events[eventName].push(listener);

    checkListenersLimit.call(this, eventName, this._events[eventName]);
  };

  Events.prototype.off = Events.prototype.removeListener = function (eventName, listener) {
    checkListener(listener);
    var listeners = this._events[eventName];
    var listenerIndex = listeners.indexOf(listener);

    if (listenerIndex !== -1) {
      listeners.splice(listenerIndex, 1); // if no listeners, delete the event

      if (listeners.length === 0) {
        delete this._events[eventName];
      }

      this._events['removeListener'] && emitAllListeners.call(this, this._events['removeListener']);
    }

    return this;
  };

  Events.prototype.emit = function (eventName) {
    if (this._events.hasOwnProperty(eventName)) {
      var listeners = this._events[eventName];

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      emitAllListeners.call.apply(emitAllListeners, [this, listeners].concat(args));
      return true;
    } else {
      return false;
    }
  };

  Events.prototype.once = function (eventName, listener) {
    checkListener(listener);
    this.addListener(eventName, listener);
    listener.once = true;
    return this;
  };

  Events.prototype.removeAllListeners = function (eventName) {
    var listeners = this._events[eventName];
    var l = listeners.length;

    while (l) {
      this._events['removeListener'] && emitAllListeners.call(this, this._events['removeListener']);
      l--;
    }

    listeners && delete this._events[eventName];
    return this;
  };

  Events.prototype.prependListener = function (eventName, listener) {
    checkListener(listener);

    if (!this._events[eventName]) {
      this._events[eventName] = [];
    }

    this._events['newListener'] && emitAllListeners.call(this, this._events['newListener']);

    this._events[eventName].unshift(listener);

    checkListenersLimit.call(this, eventName, this._events[eventName]);
  };

  Events.prototype.prependOnceListener = function (eventName, listener) {
    checkListener(listener);
    this.prependListener(eventName, listener);
    listener.once = true;
    return this;
  };

  Events.prototype.listenerCount = function (eventName) {
    return this._events[eventName] ? this._events[eventName].length : 0;
  };

  Events.prototype.eventNames = function () {
    return Object.keys(this._events);
  };

  Events.prototype.listeners = function (eventName) {
    return this._events.hasOwnProperty(eventName) ? this._events[eventName].slice() : [];
  };

  Events.prototype.setMaxListeners = function (n) {
    if (n < 0 || isNaN(n) || typeof n !== 'number') {
      throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
    }

    this._maxListeners = n;
  };

  Events.prototype.getMaxListeners = function () {
    return this._maxListeners;
  };

  Events.prototype.rawListeners = function (eventName) {
    var instance = this;
    var listenrs = this._events[eventName] ? this._events[eventName].slice() : [];
    listenrs.length && (listenrs = listenrs.map(function (listener, _i) {
      var f = function f() {
        if (listener.once) {
          instance.removeListener(eventName, listener);
          listenrs.splice(_i, 1);

          if (listenrs.length === 0) {
            delete instance._events[eventName];
          }
        }

        listener();
      };

      if (listener.once) {
        f.listener = function () {
          listener();
        };

        f.listener.once = listener.once;
      }

      return f;
    }));
    return listenrs;
  };

  return Events;

}));
