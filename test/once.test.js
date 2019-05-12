import Events from '../src/index.js'
import {$removeAllListeners} from './testHelper.js'

const eventEmitter = new Events()

const eventName = 'smile'

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)

test('case 0', () => {
    eventEmitter.once(eventName, cb1)
    eventEmitter.emit(eventName)
    expect(eventEmitter._events).toEqual({})
    $removeAllListeners(eventEmitter)
})

test('case 1', () => {
    eventEmitter.once(eventName, cb1)
    eventEmitter.once(eventName, cb1)
    eventEmitter.emit(eventName)
    expect(eventEmitter._events).toEqual({})
    $removeAllListeners(eventEmitter)
})

test('case 2', () => {
    eventEmitter.once(eventName, cb1)
    eventEmitter.once(eventName, cb2)
    eventEmitter.emit(eventName)
    expect(eventEmitter._events).toEqual({})
    $removeAllListeners(eventEmitter)
})

test('case 3', () => {
    debugger
    eventEmitter.once(eventName, cb3)
    eventEmitter.once(eventName, cb4)
    eventEmitter.on(eventName, cb3)

    eventEmitter.emit(eventName)
    expect(eventEmitter._events).toEqual({smile: [cb3]})
    $removeAllListeners(eventEmitter)
})

test('case 4', () => {
    eventEmitter.on(eventName, cb3)
    eventEmitter.once(eventName, cb4)
    eventEmitter.once(eventName, cb3)
    eventEmitter.on(eventName, cb4)

    eventEmitter.emit(eventName)
    
    expect(eventEmitter._events).toEqual({smile: [cb3, cb4]})
    $removeAllListeners(eventEmitter)
})

test('case 5', () => {
    eventEmitter.once(eventName, cb1)
    eventEmitter.once(eventName, cb2)
    eventEmitter.once(eventName, cb3)
    eventEmitter.once(eventName, cb4)
    eventEmitter.once(eventName, cb1)

    eventEmitter.emit(eventName)
    
    expect(eventEmitter._events).toEqual({})
    $removeAllListeners(eventEmitter)
})

test('case 5', () => {
    eventEmitter.once(eventName, cb1)
    eventEmitter.once(eventName, cb2)
    eventEmitter.once(eventName, cb3)
    eventEmitter.once(eventName, cb4)
    eventEmitter.once(eventName, cb1)

    eventEmitter.on(eventName, cb2)
    eventEmitter.emit(eventName)
    
    expect(eventEmitter._events).toEqual({smile: [cb2]})
    $removeAllListeners(eventEmitter)
})