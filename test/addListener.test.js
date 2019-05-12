import Events from '../src/index.js'

const eventEmitter = new Events()

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)


test(`case0`, () => {
    eventEmitter.on('smile', cb1)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1] })
})

test(`case1`, () => {
    eventEmitter.on('smile', cb2)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1, cb2] })
})

test(`case2`, () => {
    eventEmitter.on('smile', cb4)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1, cb2, cb4] })
})

test(`case3`, () => {
    eventEmitter.on('smile', cb3)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1, cb2, cb4, cb3] })
})

test(`case4`, () => {
    eventEmitter.on('smile', cb2)
    expect(eventEmitter._events).toEqual({ 'smile': [cb1, cb2, cb4, cb3, cb2] })
})

