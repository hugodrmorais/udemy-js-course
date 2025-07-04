let arr = [1, 2, 3, 4];
// arr.reverse() // Commented: The .reverse() method reverses the order of the elements in an array in place.

let j = 0; // Auxiliary variable to demonstrate the execution order of reduce.

// The .reduce() method executes a 'reducer' function (provided by you) on each element in the array,
// resulting in a single output value.
// Parameters of the reducer function:
// - accumulator: The value returned from the last invocation of the callback function, or the 'initialValue' (here " -- ").
// - current: The value of the current array element being processed.
// - i: The index of the current element being processed.
// - _arr: The array on which .reduce() was called.
let sum = arr.reduce(function (accumulator, current, i, _arr) {
    console.log("i: ", i); // Prints the index of the current element.
    console.log("j: ", j++); // Prints and increments the auxiliary variable 'j'.
    console.log("accumulator: ", accumulator, " --- current: ", current); // Prints the value of the accumulator and the current element.
    return accumulator + current; // Returns the sum of the accumulator and the current value for the next iteration.
}, " -- "); // " -- " is the 'initialValue' of the accumulator.

console.log(sum); // Expected output: " -- 1234" (string concatenation because the initialValue is a string)
console.log(arr); // Expected output: [1, 2, 3, 4] (the original array is not modified by reduce)

const names = ["Daniel", "Maria", "Joana", "João"];

// Uses .reduce() to count the occurrence of the first letter of each name.
let namesByFirstLetter = names.reduce(function (accNames, currentName) {

    /* Example of execution flow with comments to understand the 'accNames' accumulator:
        1-
        accNames = {} (initial value of the accumulator)
        currentName = "Daniel" -> firstLetter = currentName[0] = "D"
        'if (accNames[firstLetter])' is false, so 'accNames["D"] = 1'
        return {D: 1}

        2-
        accNames = {D: 1} (accumulator from the previous iteration)
        currentName = "Maria" -> firstLetter = "M"
        'if (accNames[firstLetter])' is false, so 'accNames["M"] = 1'
        return {D: 1, M: 1}

        3-
        accNames = {D: 1, M: 1}
        currentName = "Joana" -> firstLetter = "J"
        'if (accNames[firstLetter])' is false, so 'accNames["J"] = 1'
        return {D: 1, M: 1, J: 1}

        4-
        accNames = {D: 1, M: 1, J: 1}
        currentName = "João" -> firstLetter = "J"
        'if (accNames[firstLetter])' is true (accNames["J"] already exists), so 'accNames["J"]++' (becomes 2)
        return {D: 1, M: 1, J: 2}
    */

    let firstLetter = currentName[0]; // Gets the first letter of the current name.
    if (accNames[firstLetter]) { // Checks if the property for this letter already exists in the 'accNames' object.
        accNames[firstLetter]++; // If it exists, increments the counter.
    } else {
        accNames[firstLetter] = 1; // If it doesn't exist, creates the property and initializes it with 1.
    }
    return accNames; // Returns the updated 'accNames' object for the next iteration.
}, {}); // {} is the 'initialValue' of the accumulator, which in this case is an empty object.

console.log(namesByFirstLetter); // Expected output: { D: 1, M: 1, J: 2 }

const numbers = [1, 3, 4, 1, 4, 5, 3, 5, 8, 9];
// Example of how to get unique numbers from an array, using .reduce() or Set.
// One way to do it:
/*
const uniqueNumbersResult = numbers.reduce((accumulator, currentNumber) => {
    if (!accumulator.includes(currentNumber)) {
        accumulator.push(currentNumber);
    }
    return accumulator;
}, []);
console.log(uniqueNumbersResult); // [1, 3, 4, 5, 8, 9]

// Another (more modern and efficient) way to get unique numbers:
const uniqueNumbersSet = [...new Set(numbers)];
console.log(uniqueNumbersSet); // [1, 3, 4, 5, 8, 9]
*/

const uniqueNumbersReduce = numbers.reduce((accumulator, currentNumber) => {
    // If the accumulator (our new array) does NOT already include the current number,
    // add it to the accumulator.
    if (!accumulator.includes(currentNumber)) {
        accumulator.push(currentNumber);
    }
    return accumulator; // Return the accumulator for the next iteration.
}, []); // Initialize the accumulator as an empty array.

console.log(uniqueNumbersReduce); // Output: [1, 3, 4, 5, 8, 9]

const uniqueNumbers = [1, 3, 4, 5, 8, 9]; // Array already with unique numbers for reference.
