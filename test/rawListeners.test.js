import Events from '../dist/index.umd.js'
import {$removeAllListeners} from './testHelper.js'

const eventEmitter = new Events()

let listenerEmitCount = {
    cb1: 0,
    cb2: 0,
    cb3: 0,
    cb4: 0
}

let cb1 = () => listenerEmitCount.cb1++
let cb2 = () => listenerEmitCount.cb2++
let cb3 = () => listenerEmitCount.cb3++
let cb4 = () => listenerEmitCount.cb4++

function reset(){
    $removeAllListeners(eventEmitter)
    listenerEmitCount = {
        cb1: 0,
        cb2: 0,
        cb3: 0,
        cb4: 0
    }
}

test('case 0', () => {
    eventEmitter.once('smile', cb1)
    let listeners = eventEmitter.rawListeners('smile')
    listeners[0].listener()
    expect(listenerEmitCount).toEqual({cb1: 1, cb2: 0, cb3: 0, cb4: 0})
    listeners[0]()
    expect(listenerEmitCount).toEqual({cb1: 2, cb2: 0, cb3: 0, cb4: 0})
    expect(listeners).toEqual([])
    expect(eventEmitter._events).toEqual({})
    reset()
})

test('case 1', () => {
    eventEmitter.once('smile', cb1)
    eventEmitter.once('smile', cb2)
    let listeners = eventEmitter.rawListeners('smile')
    listeners[0].listener()
    listeners[1].listener()
    expect(listenerEmitCount).toEqual({cb1: 1, cb2: 1, cb3: 0, cb4: 0})
    debugger
    listeners[0]()
    expect(listenerEmitCount).toEqual({cb1: 2, cb2: 1, cb3: 0, cb4: 0})
    expect(listeners.length).toEqual(1)

    expect(eventEmitter._events.smile.map(cb => cb.name)).toEqual(['bound cb2'])

    reset()
  })
  

  test('case 3', () => {
    eventEmitter.on('smile', cb3)
    eventEmitter.on('smile', cb4)
    let listeners = eventEmitter.rawListeners('smile')
    listeners[0]()
    listeners[1]()
    expect(listenerEmitCount).toEqual({cb1: 0, cb2: 0, cb3: 1, cb4: 1})
    eventEmitter.off('smile', cb3)
    expect(listeners.length).toEqual(2)
    listeners.unshift()
    expect(eventEmitter._events).toEqual({smile: [cb4]})
  })
  
