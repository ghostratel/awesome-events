import Events from '../dist/index.umd.js'

const eventEmitter = new Events()

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)

let newListenerEmitCount = 0

eventEmitter.on('newListener', () => {newListenerEmitCount++})

test('case 0', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.on('smile', cb4)
    expect(newListenerEmitCount).toBe(5)
})

test('case 1', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('cry', cb1)
    eventEmitter.on('cry', cb1)
    eventEmitter.on('cry', cb2)
    expect(newListenerEmitCount).toBe(11)
})

test('case 2', () => {
    eventEmitter.once('smile', cb3)
    eventEmitter.prependListener('smile', cb4)
    eventEmitter.prependOnceListener('cry', cb3)
    expect(newListenerEmitCount).toBe(14)
})