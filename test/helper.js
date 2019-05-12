function $removeAllListeners (ee) {
    for(let event in ee._events) {
        ee._events.hasOwnProperty(event) && ee.removeAllListeners(event)
    }
}

export {$removeAllListeners}