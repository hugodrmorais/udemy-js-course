test()

function test() {
  console.log('test')
}

// the functions are sort of placed at the top of the file, and that way it will work, calling the function before defining it

// test1()

// const test1 = function test1() {
//   console.log('test1')
// }

// in this case we will have: ReferenceError: Cannot access 'test1' before initialization

console.log(myVar) // undefined but the variable exists
var myVar = "My Variable"
console.log(myVar) // My Variable

// console.log(myLet) // ReferenceError: Cannot access 'myLet' before initialization
let myLet = "My Variable"
console.log(myLet) // My Variable
