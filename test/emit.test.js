import Events from '../src/index.js'
import { $removeAllListeners } from './testHelper.js'

const eventEmitter = new Events()

let cb1 = () => listenerEmitCount.cb1++
let cb2 = () => listenerEmitCount.cb2++
let cb3 = () => listenerEmitCount.cb3++
let cb4 = () => listenerEmitCount.cb4++

const listenerEmitCount = {
    cb1: 0,
    cb2: 0,
    cb3: 0,
    cb4: 0
}

function $reset() {
    $removeAllListeners(eventEmitter)
    for(let cb in listenerEmitCount) {
        listenerEmitCount.hasOwnProperty(cb) && (listenerEmitCount[cb] = 0)
    }
}


test('case 0', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb1)
    eventEmitter.emit('smile')
    expect(listenerEmitCount).toEqual({ cb1: 2, cb2: 0, cb3: 0, cb4: 0 })
    $reset()
})


test('case 1', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.emit('smile')
    expect(listenerEmitCount).toEqual({ cb1: 1, cb2: 1, cb3: 0, cb4: 0 })
    $reset()
})

test('case 2', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.emit('smile')
    expect(listenerEmitCount).toEqual({ cb1: 1, cb2: 1, cb3: 1, cb4: 0 })
    $reset()
})

test('case 3', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.emit('smile')
    eventEmitter.on('smile', cb1)
    expect(listenerEmitCount).toEqual({ cb1: 1, cb2: 1, cb3: 1, cb4: 0 })
    $reset()
})

test('case 4', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.emit('smile')
    eventEmitter.removeListener('smile', cb1)
    eventEmitter.emit('smile')
    expect(listenerEmitCount).toEqual({ cb1: 1, cb2: 2, cb3: 2, cb4: 0 })
    $reset()
})

// TODO: test once method