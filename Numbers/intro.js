let number = 1234567.890; // Initialize a number variable

// toFixed(digits): Formats a number using fixed-point notation.
// It rounds the number to the specified number of decimal places and returns a string.
console.log(number.toFixed(5));     // Output: "1234567.89000" (Rounds to 5 decimal places)
console.log(typeof number.toFixed(5)); // Output: "string" (Returns a string, not a number)

// toPrecision(precision): Formats a number to a specified length (total number of significant digits).
// It returns a string representation of the number.
console.log(number.toPrecision(15)); // Output: "1234567.89000000" (15 significant digits)
console.log(typeof number.toPrecision(15)); // Output: "string"
console.log((123).toPrecision(6));  // Output: "123.000" (123 followed by 3 zeros to make 6 significant digits)

// toExponential(fractionDigits): Converts a number to exponential notation.
// It returns a string, optionally specifying the number of digits after the decimal point.
number = 12.34567; // Reassign number for exponential examples
console.log(number.toExponential());    // Output: "1.234567e+1" (Default exponential notation)
console.log(number.toExponential(4));   // Output: "1.2346e+1" (Rounds to 4 digits after decimal in exponential form)

// toString(radix): Converts a number to a string representation in the specified base (radix).
// Common bases are 2 (binary), 8 (octal), 10 (decimal), 16 (hexadecimal).
number = 15; // Reassign number for base conversion examples
console.log(number.toString(2)); // Output: "1111" (15 in binary)
console.log(typeof number.toString(2)); // Output: "string"

// Examples of decimal numbers converted to binary (base 2).
// Note: (0).toString(2) is "0", (1).toString(2) is "1", (2).toString(2) is "10", (3).toString(2) is "11", etc.
console.log((0).toString(2));  // Output: "0"
console.log((1).toString(2));  // Output: "1"
console.log((2).toString(2));  // Output: "10"
console.log((3).toString(2));  // Output: "11"
console.log((4).toString(2));  // Output: "100"
console.log((5).toString(2));  // Output: "101"
console.log((6).toString(2));  // Output: "110"
console.log((7).toString(2));  // Output: "111"
console.log((8).toString(2));  // Output: "1000"

// Examples of decimal numbers converted to hexadecimal (base 16).
// In hexadecimal, 10 is 'a', 11 is 'b', ..., 15 is 'f'.
console.log((15).toString(16)); // Output: "f"
console.log((16).toString(16)); // Output: "10"

// toLocaleString(): Returns a string with a language-sensitive representation of this number.
// It formats the number according to the conventions of a specified locale.
number = 123456.789; // Reassign number for locale examples
console.log(number.toLocaleString());            // Output: "123,456.789" (Default locale, usually en-US for many systems)
console.log(number.toLocaleString("pt-BR"));     // Output: "123.456,789" (Brazilian Portuguese format)
// Formatting as currency: specify style and currency code.
console.log(number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })); // Output: "R$ 123.456,79" (Brazilian Real)
console.log(number.toLocaleString("pt-PT", { style: "currency", currency: "EUR" })); // Output: "123 456,79 €" (Portuguese Euro)

// Number.MAX_VALUE and Number.MIN_VALUE:
// Represent the largest and smallest positive representable numbers in JavaScript.
console.log(Number.MAX_VALUE, Number.MIN_VALUE);
// Output: 1.7976931348623157e+308 5e-324

// isNaN(): Checks if a value is Not-a-Number (NaN). Returns true if the value is NaN.
// parseFloat(): Parses a string argument and returns a floating-point number.
// If the string starts with non-numeric characters, it returns NaN.
let numberAsString = "a3.456";
console.log(isNaN(numberAsString)); // Output: true (Because "a3.456" cannot be converted to a valid number)
console.log(numberAsString, typeof numberAsString, parseFloat(numberAsString));
// Output: "a3.456" "string" NaN (parseFloat returns NaN because it starts with 'a')
