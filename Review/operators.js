// + - * / % **
let n1 = 10;
let n2 = 5;

// ARITHMETIC OPERATORS
console.log(n1 + n2);
console.log(n1 - n2);
console.log(n1 * n2);
console.log(n1 / n2);
console.log(n1 % n2);
console.log(2 ** 3);

// ASSIGNMENT OPERATORS
let n3 = 25;
// n3 = n3 * 2;
n3 += 2; // Equivalent to n3 = n3 + 2;
console.log(n3);

// INCREMENT AND DECREMENT
let i = 0;
console.log(i--); // Prints i then decrements it. So, prints 0, i becomes -1.
i++; // i becomes 0
i++; // i becomes 1
i++; // i becomes 2
console.log(i); // Prints 2

// COMPARISON OPERATORS
/*
 Value equality ==
 Value and type equality ===
 <, >, <=, >=
 != different values
 !== different values or types
*/

console.log(n1 != "10");  // true, because n1 is a number and "10" is a string, even though their values are the same.
console.log(n1 !== "10"); // true, because n1 (number) and "10" (string) have different types.

// LOGICAL OPERATORS
/*
For a person to travel abroad:
- needs to be over 18 years old
OR
Accompanied by parents
AND
have bought a ticket
*/
let age = 21;
let parentsPresent = false;
let boughtTicket = false;
const canTravel = (age >= 18 || parentsPresent) && boughtTicket;

console.log(`Can travel: ${canTravel}`);


console.log(n1, n2, n3);
n1 = 6;
n2 = 8;
let average = (n1 + n2) / 2;
console.log(`Average: ${average}`);
console.log((3 * 2) ** 2); // (6) ** 2 = 36
