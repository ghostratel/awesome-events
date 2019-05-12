function checkListener (listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener)
    }
  }
  
  function emitAllListeners (listeners, ...args) {
    let i = 0
    while(i < listeners.length) {
      listeners[i].call(this, ...args)
      listeners[i].once && (listeners.splice(i, 1), i--) // when using splice will make the array length -1, so let the index -1 too
      i++
    }
  }
  
  function checkListenersLimit(eventName, listeners) {
    if(listeners.length > this._maxListeners && !listeners.warned) {
      console.warn(`Possible EventEmitter memory leak detected. ${listeners.length} '${eventName}' `
      + 'listeners added. Use emitter.setMaxListeners() to increase limit.')
      listeners.warned = true
    }
  }

  function findFromTail(list, cb){
    let i = list.length
    let ret = -1
    while(i) {
        --i
        let _ret = cb(list[i], i)
        if(_ret) {
            ret = i
            break
        }
    }
    return ret
}

  
  
  
  export {checkListener, emitAllListeners, checkListenersLimit, findFromTail}