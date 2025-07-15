// import abacaxi, { myMod1_appointed, PI, obj, name, age } from './modules/mod1.js'

// const myMod = abacaxi()
// console.log("app loading", myMod1_appointed())
// console.log(obj.foo, obj.bar, name, age)

import myMod1, { myMod1_appointed, PI, name, age } from './modules/mod1.js'

const myMod = myMod1()

console.log("app running", myMod)
console.log("oi", PI)
console.log("app loading", myMod1_appointed())
console.log(name, age)
console.log("test")
