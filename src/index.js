import { checkListener, emitAllListeners, checkListenersLimit, findFromTail } from './helper.js'

const Events = function () {
  this._events = {}
  let _maxListeners

  Object.defineProperty(this, '_maxListeners', {
    get() {
      // when Events instance has '_maxListeners', use instance's '_maxListeners'
      // when Events instance don't has '_maxListeners', use Events.defaultMaxListeners
      return _maxListeners ? _maxListeners : this.defaultMaxListeners
    },
    set(n) {
      if (n < 0 || isNaN(n) || typeof n !== 'number') {
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.')
      }
      _maxListeners = n
    }
  })
}

Events.prototype.defaultMaxListeners = 10


Events.prototype.on = Events.prototype.addListener = function (eventName, listener) {
  checkListener(listener)
  if (!this._events[eventName]) {
    this._events[eventName] = []
  }
  this._events['newListener'] && emitAllListeners.call(this, this._events['newListener'])
  this._events[eventName].push(listener)
  checkListenersLimit.call(this, eventName, this._events[eventName])
}

Events.prototype.off = Events.prototype.removeListener = function (eventName, listener) {
  checkListener(listener)
  let listeners = this._events[eventName]
  if (!listeners) { return this }
  let context = this
  let listenerIndex = findFromTail(listeners, function (_lisener) {
    let _funcName = _lisener.name.match(/bound\s(\w*)/) ? _lisener.name.match(/bound\s([_\w]*)/)[1] : _lisener.name
    if (_lisener.once) {
      return _funcName === listener.name && _lisener.toString() === listener.bind(context).toString()
    } else {
      return _funcName === listener.name && _lisener.toString() === listener.toString()
    }
  })
  if (listenerIndex !== -1) {
    listeners.splice(listenerIndex, 1)
    // if no listeners, delete the event
    if (listeners.length === 0) {
      delete this._events[eventName]
    }
    this._events['removeListener'] && emitAllListeners.call(this, this._events['removeListener'])
  }
  return this
}



Events.prototype.emit = function (eventName, ...args) {
  if (this._events.hasOwnProperty(eventName)) {
    let listeners = this._events[eventName]
    emitAllListeners.call(this, listeners, ...args)
    listeners.length === 0 && delete this._events[eventName]
    return true
  } else {
    return false
  }
}

Events.prototype.once = function (eventName, listener) {
  checkListener(listener)
  let bound = listener.bind(this)
  this.addListener(eventName, bound)
  bound.once = true
  return this
}

Events.prototype.removeAllListeners = function (eventName) {
  let listeners = this._events[eventName]
  let l = listeners.length
  while (l) {
    this._events['removeListener'] && emitAllListeners.call(this, this._events['removeListener'])
    l--
  }
  listeners && delete this._events[eventName]
  return this
}

Events.prototype.prependListener = function (eventName, listener) {
  checkListener(listener)
  if (!this._events[eventName]) {
    this._events[eventName] = []
  }
  this._events['newListener'] && emitAllListeners.call(this, this._events['newListener'])
  this._events[eventName].unshift(listener)
  checkListenersLimit.call(this, eventName, this._events[eventName])
}

Events.prototype.prependOnceListener = function (eventName, listener) {
  checkListener(listener)
  this.prependListener(eventName, listener)
  listener.once = true
  return this
}

Events.prototype.listenerCount = function (eventName) {
  return this._events[eventName] ? this._events[eventName].length : 0
}

Events.prototype.eventNames = function () {
  return Object.keys(this._events)
}

Events.prototype.listeners = function (eventName) {
  return this._events.hasOwnProperty(eventName) ? this._events[eventName].slice() : []
}

Events.prototype.setMaxListeners = function (n) {
  if (n < 0 || isNaN(n) || typeof n !== 'number') {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.')
  }
  this._maxListeners = n
}

Events.prototype.getMaxListeners = function () {
  return this._maxListeners
}


Events.prototype.rawListeners = function (eventName) {
  let instance = this
  let listenrs = this._events[eventName] ? this._events[eventName].slice() : []
  listenrs.length && (listenrs = listenrs.map(function (listener, _i) {

    let f = function () {
      if (listener.once) {
        instance.removeListener(eventName, listener)
        listenrs.splice(_i, 1)
        if (listenrs.length === 0) { delete instance._events[eventName] }
      }
      listener()
    }

    if (listener.once) {
      f.listener = function () {
        listener()
      }
      f.listener.once = listener.once
    }


    return f
  }))

  return listenrs
}

export default Events