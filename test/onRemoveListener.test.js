import Events from '../dist/index.umd.js'

const eventEmitter = new Events()

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)

let removeListenerEmitCount = 0

eventEmitter.on('removeListener', () => { removeListenerEmitCount++ })

test('case 0', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.on('smile', cb4)
    eventEmitter.removeListener('smile', cb1)
    expect(removeListenerEmitCount).toBe(1)
})

test('case 1', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.on('smile', cb4)
    eventEmitter.removeAllListeners('smile')
    expect(removeListenerEmitCount).toBe(8)
})

test('case 2', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('cry', cb2)
    eventEmitter.once('smile', cb3)
    eventEmitter.once('cry', cb4)
    eventEmitter.removeListener('smile', cb1)
    eventEmitter.removeListener('cry', cb2)
    expect(removeListenerEmitCount).toBe(10)
})

test('case 3', () => {
    eventEmitter.once('smile', cb1)
    eventEmitter.prependOnceListener('cry', cb2)
    eventEmitter.prependListener('smile', cb3)
    eventEmitter.on('cry', cb4)
    eventEmitter.removeAllListeners('smile')
    expect(removeListenerEmitCount).toBe(13)
    eventEmitter.removeAllListeners('cry')
    expect(removeListenerEmitCount).toBe(16)
})