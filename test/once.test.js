import Events from '../src/index.js'

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
})

test('case 1', () => {
    eventEmitter.once(eventName, cb1)
    eventEmitter.once(eventName, cb1)
    eventEmitter.emit(eventName)
    expect(eventEmitter._events).toEqual({})
})

test('case 2', () => {
    eventEmitter.once(eventName, cb1)
    eventEmitter.once(eventName, cb2)
    eventEmitter.emit(eventName)
    expect(eventEmitter._events).toEqual({})
})

test('case 3', () => {
    debugger
    eventEmitter.once(eventName, cb3)
    eventEmitter.once(eventName, cb4)
    eventEmitter.on(eventName, cb3)

    eventEmitter.emit(eventName)
    expect(eventEmitter._events).toEqual({smile: [cb3]})
})