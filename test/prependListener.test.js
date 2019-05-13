import Events from '../dist/index.umd.js'
import { $removeAllListeners } from './testHelper.js'

const eventEmitter = new Events()

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)


test('case 0', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.prependListener('smile', cb2)
    expect(eventEmitter._events).toEqual({ smile: [cb2, cb1] })
    $removeAllListeners(eventEmitter)
})

test('case 1', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.prependListener('smile', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.prependListener('smile', cb4)
    expect(eventEmitter._events).toEqual({ smile: [cb4, cb2, cb1, cb3] })
    $removeAllListeners(eventEmitter)
})


test('case 2', () => {
    eventEmitter.once('smile', cb1)
    eventEmitter.prependListener('smile', cb2)
    expect(eventEmitter._events.smile.map(cb => cb.name)).toEqual(['cb2', 'bound cb1'])
})

