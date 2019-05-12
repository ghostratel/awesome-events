import Events from '../src/index.js'
import {$removeAllListeners} from './helper.js'

const eventEmitter = new Events()

let cb1 = () => console.log(1)
let cb2 = () => console.log(2)
let cb3 = () => console.log(3)
let cb4 = () => console.log(4)


test(`case0`, () => {
  eventEmitter.on('smile', cb1)
  eventEmitter.on('smile', cb3)
  eventEmitter.removeAllListeners('smile')
  expect(eventEmitter._events).toEqual({})
})

test(`case1`, () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('smile', cb3)
    eventEmitter.on('laugh', cb2)
    eventEmitter.removeAllListeners('smile')
    expect(eventEmitter._events).toEqual({laugh: [cb2]})
    $removeAllListeners(eventEmitter)
  })

  test(`case2`, () => {
    eventEmitter.on('smile', cb1)
    eventEmitter.on('laugh', cb2)
    eventEmitter.on('cry', cb2)
    eventEmitter.on('smile', cb3)
    eventEmitter.removeAllListeners('smile')
    expect(eventEmitter._events).toEqual({laugh: [cb2], cry: [cb2]})
    $removeAllListeners(eventEmitter)
  })