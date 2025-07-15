import { MyMod2 } from './mod2.js'

function myMod1() {
    console.log("myMod 1 loading")
    return "loading myMod1"
}

export function myMod1_appointed() {
  return "function exported myMod1_appointed"
}

export const PI = "PI: " + Math.PI

// export const obj = {
//     foo: true,
//     bar: "Hello World"
// }

const name = "daniel"
const age = 41

export { name, age }

// console.log(new MyMod2())

export default myMod1
