import Events from '../src/index.js'

let e = new Events()

let cb1 = () => console.log(1)

e.once('smile', cb1)

test('should ', () => {
    let cb2 = cb1

    e.off('smile', cb2)

    e.emit('smile')

    console.log(e);

    expect(e._events).toEqual({})
})