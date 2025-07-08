let str1 = "My Cool String"; // Initial string variable

// replace(): Replaces occurrences of a substring with another.
// The /i/g is a regular expression: 'i' matches the letter 'i', 'g' means global (all occurrences).
console.log(str1.replace(/i/g, "o")); // Output: Monha Strog Bacanuda (assuming original Portuguese, otherwise it's "My Cool Strong")
console.log(str1); // Output: My Cool String (original string is unchanged, replace() returns a new string)

// --- String Searching Methods ---
// (These lines were commented out in your original code, but show common usage)

// indexOf(): Returns the index of the first occurrence of a specified value, or -1 if not found.
// console.log(str1.indexOf("asdasdas")); // Output: -1 (substring not found)
// includes(): Checks if a string contains a specified substring, returns true or false.
// console.log(str1.includes("asdasdas")); // Output: false (substring not found)
// console.log(str1.indexOf("asdasdas")); // Output: -1 (redundant check)
// console.log(str1.indexOf("asdasdas") >= 0); // Output: false (common way to check if found using indexOf)

// --- String Slicing Methods ---

// slice(startIndex, endIndex): Extracts a section of a string and returns it as a new string.
// If only startIndex is given, it extracts to the end.
console.log(str1.slice(2)); // Output:  Cool String (Starts from index 2 to end)
// substring(startIndex, endIndex): Similar to slice, but handles negative arguments differently.
console.log(str1.substring(2)); // Output:  Cool String (Similar behavior to slice(2) here)

// slice() with negative indices: Counts from the end of the string.
console.log(str1.slice(-5, -2)); // Output: rin (for "My Cool String", -5 is 't', -2 is 'n'. It extracts 'tri')
// substring() with negative indices: Treats negative indices as 0.
console.log(str1.substring(-5, -2)); // Output: (empty string, as -5 becomes 0, -2 becomes 0. substring(0,0) is empty)

// slice(startIndex, endIndex) where startIndex > endIndex: Returns an empty string.
console.log(str1.slice(8, 1)); // Output: (empty string)
// substring(startIndex, endIndex) where startIndex > endIndex: Swaps the arguments.
console.log(str1.substring(8, 1)); // Output: y Cool St (Becomes substring(1, 8))

// --- String Object vs. Primitive String ---

let strAsObj = new String("my string as an object"); // Creates a String object (not a primitive string).
console.log(strAsObj); // Output: [String: 'my string as an object'] (Shows it's an object)
// valueOf(): Returns the primitive value of a String object.
console.log(strAsObj.valueOf()); // Output: my string as an object
// toString(): Returns the string representation of a String object.
console.log(strAsObj.toString()); // Output: my string as an object
console.log("--------------------");

// --- Whitespace Trimming Methods ---

/* Re-assigning str1 to a multi-line string with leading/trailing whitespace
str1 = `

    test

`*/
// For demonstration, let's explicitly set str1 with whitespace here if it was commented out.
str1 = `
    This is a test string
    with some leading and trailing whitespace.
`;

console.log(str1); // Output: (The string with all its original whitespace, including newlines)
console.log("--------------------");

// trim(): Removes whitespace from both ends of a string.
console.log(str1.trim());
// Output: "This is a test string\n    with some leading and trailing whitespace." (Newlines are preserved within the string)
console.log("--------------------");

// trimEnd() / trimRight(): Removes whitespace from the end of a string.
console.log(str1.trimEnd());
// Output: "    This is a test string\n    with some leading and trailing whitespace." (Trailing newline and spaces removed)
console.log("--------------------");

// trimStart() / trimLeft(): Removes whitespace from the beginning of a string.
console.log(str1.trimStart());
// Output: "This is a test string\n    with some leading and trailing trailing whitespace.\n" (Leading newlines and spaces removed)
console.log("--------------------");
console.log(str1); // Output: (The original string, unchanged, as trim methods return new strings)

// --- String Padding Methods ---

str1 = "0123456789"; // Reset str1 for padding examples

// padEnd(targetLength, padString): Pads the current string with a given string (repeated, if necessary)
// until the resulting string reaches the targetLength. Pads at the end.
console.log(str1.padEnd(20));     // Output: "0123456789          " (Pads with spaces by default)
console.log(str1.padEnd(20, "*")); // Output: "0123456789**********" (Pads with asterisks)
console.log(str1.padEnd(20, "*").length); // Output: 20 (The length of the padded string)
console.log(str1); // Output: "0123456789" (Original string unchanged)

// --- Practical Example: Masking Phone Numbers ---

let phone1 = "91234-2345"; // Example phone number 1 // "9****-**45"
let phone2 = "1234-2345";  // Example phone number 2 // "1***-**45"

// Function to mask a phone number, showing only the first digit of the prefix and the last two digits of the suffix.
function maskPhoneNumber(number) {
    let hyphenPosition = number.indexOf("-"); // Find the position of the hyphen.
    let prefix = number.slice(0, hyphenPosition); // Get the part before the hyphen.
    let suffix = number.slice(hyphenPosition + 1); // Get the part after the hyphen.

    let lastTwoDigitsOfSuffix = suffix.slice(-2); // Get the last two digits of the suffix.

    // Use template literals to construct the masked number:
    // prefix[0] gets the first digit of the prefix.
    // padEnd() fills the rest of the prefix with '*' up to its original length.
    // padStart() fills the beginning of the suffix with '*' until it reaches its original length,
    // ensuring the last two digits remain visible.
    return `${prefix[0].padEnd(prefix.length, "*")}-${lastTwoDigitsOfSuffix.padStart(suffix.length, "*")}`;
}
console.log(maskPhoneNumber(phone1)); // Output: 9****-**45
console.log(maskPhoneNumber(phone2)); // Output: 1***-**45

// --- String Checking Methods (Starts/Ends With) ---

let str2 = "Today is Saturday"; // Example string

// startsWith(searchString, position): Checks if a string begins with 'searchString' from a given 'position'.
console.log(str2.startsWith("oday", 1)); // Output: true (Does "Today is Saturday" start with "oday" at index 1? Yes, 'T' is at 0, 'o' is at 1.)

// endsWith(searchString, length): Checks if a string ends with 'searchString' within a given 'length'.
// The 'length' argument specifies the portion of the string to consider.
console.log(str2.endsWith("is", 9)); // Output: true (Does the substring "Today is " (length 9) end with "is"? Yes.)

// --- Character Access Methods ---

let str3 = "abcdefgh"; // Example string

// charAt(index): Returns the character at the specified index.
console.log(str3.charAt(1)); // Output: b (Character at index 1)
// Bracket notation: Provides direct access to characters by index (read-only).
console.log(str3[1]); // Output: b (Similar to charAt, more common)

// charCodeAt(index): Returns the Unicode (UTF-16) code unit value of the character at the given index.
console.log(str3.charCodeAt(0)); // Output: 97 (Unicode for 'a')
console.log(str3.charCodeAt(1)); // Output: 98 (Unicode for 'b')

/*
--- Summary of Common String Methods ---

* **replace()**, **replaceAll()**: Find and replace substrings.
* **indexOf()**, **lastIndexOf()**, **includes()**: Search for substrings.
* **slice()**, **substring()**, **split()**: Extract parts of strings or split into arrays.
* **toLowerCase()**, **toUpperCase()**: Change case.
* **valueOf()**, **toString()**: Convert String objects to primitive strings.
* **trim()**, **trimEnd()**, **trimStart()**: Remove whitespace from ends.
* **padStart()**, **padEnd()**: Add characters to the beginning or end of a string to reach a target length.
* **startsWith()**, **endsWith()**: Check if a string begins or ends with specific characters.
* **charAt()**, **charCodeAt()**: Access individual characters or their Unicode values.
* **length**: Property to get the length of the string.
*/
