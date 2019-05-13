import Events from '../dist/index.umd.js'
import { $removeAllListeners } from './testHelper.js'

const eventEmitter = new Events()

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)

test('case 0', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('smile', cb3)
    expect(eventEmitter.listenerCount('smile')).toBe(3)
    $removeAllListeners(eventEmitter)
})

test('case 1', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb1)
    expect(eventEmitter.listenerCount('smile')).toBe(2)
    $removeAllListeners(eventEmitter)
})

test('case 2', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    expect(eventEmitter.listenerCount('smile')).toBe(2)
    $removeAllListeners(eventEmitter)
})

test('case 3', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.on('smile', cb2)
    expect(eventEmitter.listenerCount('smile')).toBe(3)
    $removeAllListeners(eventEmitter)
})

test('case 4', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.emit('smile')
    expect(eventEmitter.listenerCount('smile')).toBe(1)
    $removeAllListeners(eventEmitter)
})


test('case 5', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.emit('smile')
    eventEmitter.once('smile', cb2)
    expect(eventEmitter.listenerCount('smile')).toBe(2)
    $removeAllListeners(eventEmitter)
})

test('case 5', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.emit('smile')
    eventEmitter.removeListener('smile', cb1)
    expect(eventEmitter.listenerCount('smile')).toBe(0)
    $removeAllListeners(eventEmitter)
})

test('case 5', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.removeListener('smile', cb1)
    eventEmitter.removeListener('smile', cb1)
    expect(eventEmitter.listenerCount('smile')).toBe(0)
    expect(eventEmitter._events).toEqual({})
    $removeAllListeners(eventEmitter)
})

test('case 5', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.on('cry', cb1)
    eventEmitter.emit('smile')
    expect(eventEmitter.listenerCount('smile')).toBe(1)
    expect(eventEmitter.listenerCount('cry')).toBe(1)
    $removeAllListeners(eventEmitter)
})

