const E = require('events')

let ee = new E()

let cb1 = () => {console.log(1)}

ee.on('smile', cb1)

void function(){
    let cb1 = () => {console.log(2)}
    ee.off('smile', cb1)

    ee.emit('smile')
}()