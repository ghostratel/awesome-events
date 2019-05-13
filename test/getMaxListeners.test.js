import Events from '../dist/index.umd.js'

const eventEmitter = new Events()


test('case 0', () => {
    expect(eventEmitter.getMaxListeners()).toBe(10)
})

test('case 1', () => {
    eventEmitter.defaultMaxListeners = 20
    expect(eventEmitter.getMaxListeners()).toBe(20)
})


test('case 2', () => {
    eventEmitter.setMaxListeners(30)
    expect(eventEmitter.getMaxListeners()).toBe(30)
})

test('case 3', () => {
    eventEmitter.setMaxListeners(10)
    expect(eventEmitter.getMaxListeners()).toBe(10)
})

