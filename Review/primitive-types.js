// strings, number (int, floats), boolean
// undefined, null, symbol (ES2015)

let myVar = "My string";
let myVar2 = 'My "String"';
console.log(myVar2);

var myVar3 = `my template literal`;
console.log(myVar3);

let age = 40;
let msg = `My name is ${myVar} and I am ${age} years old`;
console.log(msg);

console.log(typeof msg, typeof age, typeof myVar3);

const n1 = 10;
const n2 = 1.1;

console.log(`n1 kind: ${typeof n1} and his value is ${n1}`);
console.log(`n2 kind: ${typeof n2} and his value is ${n2}`);


const isValid = true;
console.log(`isValid: ${typeof isValid} and his value is ${isValid}`);

let varTest;
console.log(varTest);
console.log(typeof varTest);
