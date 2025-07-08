let x = 10

function changeX(n) {
  n++ // 'n' is a copy of 'x'. Only 'n' gets incremented.
  console.log("n internal", n) // Output: n internal 11
}

changeX(x) // The value 10 from 'x' is copied to 'n'.
console.log("x external", x) // Output: x external 10

let myArr = [1, 2, 3];

function addElement(arr) {
  arr.push(4); // Modifies the array that 'arr' (the copied reference) points to.
  console.log("Array internal", arr); // Output: Array internal [1, 2, 3, 4]
}

addElement(myArr);
console.log("Array external", myArr); // Output: Array external [1, 2, 3, 4]
