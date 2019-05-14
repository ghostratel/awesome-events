const E = require('events')

let ee = new E()

let cb1 = () => {console.log(1)}
let cb2 = () => {console.log(2)}

ee.on('smile', cb1)
ee.on('smile', cb2)

let ls = ee.rawListeners('smile')

ls.unshift()

console.log(ee);