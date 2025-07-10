if (!String.prototype.replaceAll) { // 1
  String.prototype.replaceAll = function (busca, troca) { // 2

    if (!(busca instanceof String || typeof busca === "string")) { // 3
      throw Error("first parameter must be a string")
    }
    if (!(troca instanceof String || typeof troca === "string")) { // 4
      throw Error("second parameter must be a string")
    }
    return this.valueOf().split(busca).join(troca) // 5
  }
}

// --- Tests for the replaceAll polyfill ---

// Test 1: Simple replacement
let phrase1 = "Hello world, beautiful world!";
let result1 = phrase1.replaceAll("world", "JavaScript");
console.log("Test 1 (simple):", result1); // Expected: "Hello JavaScript, beautiful JavaScript!"

// Test 2: Replacing something that doesn't exist
let phrase2 = "Portugal is beautiful.";
let result2 = phrase2.replaceAll("Brazil", "Spain");
console.log("Test 2 (non-existent):", result2); // Expected: "Portugal is beautiful."

// Test 3: Replacing with an empty string (removing)
let phrase3 = "abracadabra";
let result3 = phrase3.replaceAll("a", "");
console.log("Test 3 (remove):", result3); // Expected: "brcdbr"

// Test 4: Empty search string (Note: Native replaceAll behaves differently here, this polyfill inserts replacement between characters)
let phrase4 = "test";
let result4 = phrase4.replaceAll("", "-");
console.log("Test 4 (empty search with polyfill):", result4); // Expected: "-t-e-s-t-e-"

// Test 5: Using a String object instance
let phrase5 = new String("JavaScript is cool!");
let result5 = phrase5.replaceAll("cool", "awesome");
console.log("Test 5 (String object):", result5); // Expected: "JavaScript is awesome!"

// Check if String.prototype.replaceAll exists (will be true in modern browsers,
// indicating the native method is present)
console.log("String.prototype.replaceAll exists?", typeof String.prototype.replaceAll === 'function');
