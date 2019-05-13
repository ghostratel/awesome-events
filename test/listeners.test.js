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
    eventEmitter.on('smile', cb4)
    expect(eventEmitter.listeners('smile')).toEqual([cb1, cb2, cb3, cb4])
    $removeAllListeners(eventEmitter)
})


test('case 1', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb1)
    expect(eventEmitter.listeners('smile')).toEqual([cb1, cb1])
    $removeAllListeners(eventEmitter)
})

test('case 2', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.on('smile', cb2)
    eventEmitter.removeListener('smile', cb1)
    expect(eventEmitter.listeners('smile')).toEqual([cb1, cb2])
    $removeAllListeners(eventEmitter)
})

test('case 3', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.once('smile', cb1)
    expect(eventEmitter.listeners('smile').map(cb => cb.name)).toEqual(['cb1', 'bound cb1'])
    $removeAllListeners(eventEmitter)
})

test('case 4', () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.prependListener('smile', cb1)
    eventEmitter.once('smile', cb1)
    eventEmitter.prependOnceListener('smile', cb1)
    expect(eventEmitter.listeners('smile').map(cb => cb.name)).toEqual(['bound cb1', 'cb1', 'cb1', 'bound cb1'])
    $removeAllListeners(eventEmitter)
})