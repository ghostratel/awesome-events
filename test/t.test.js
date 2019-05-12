import Events from '../src/index.js'

let e = new Events()

let cb1 = () => console.log(1)

e.on('smile', cb1)

test('should ', () => {
    let cb1 = () => console.log(1)

    e.off('smile', cb1)

    e.emit('smile')

    expect(e._events).not.toEqual({})
})