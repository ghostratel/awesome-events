import Events from '../dist/index.umd.js'
import { $removeAllListeners } from './testHelper.js'

const eventEmitter = new Events()

const eventEmitter2 = new Events()

const eventName = 'smile'

const equal = []

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)

eventEmitter.on(eventName, cb1)
eventEmitter.on(eventName, cb2)
eventEmitter.on(eventName, cb4)
eventEmitter.on(eventName, cb3)
eventEmitter.on(eventName, cb2)


test(`case0`, () => {
    eventEmitter.removeListener(eventName, cb2)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1, cb2, cb4, cb3] })
})

test(`case1`, () => {
    eventEmitter.addListener(eventName, cb2)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1, cb2, cb4, cb3, cb2] })
})

test(`case2`, () => {
    eventEmitter.removeListener(eventName, cb2)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1, cb2, cb4, cb3] })
})

test(`case3`, () => {
    eventEmitter.removeListener(eventName, cb1)
    expect(eventEmitter._events).toEqual({ 'smile': [cb2, cb4, cb3] })
})

test(`case4`, () => {
    eventEmitter.removeListener(eventName, cb3)
    expect(eventEmitter._events).toEqual({ 'smile': [cb2, cb4] })
})


test(`case5`, () => {
    eventEmitter.removeListener(eventName, cb4)
    expect(eventEmitter._events).toEqual({ 'smile': [cb2] })
})

test(`case6`, () => {
    eventEmitter.removeListener(eventName, cb2)
    expect(eventEmitter._events).toEqual({})
    $removeAllListeners(eventEmitter)
})
