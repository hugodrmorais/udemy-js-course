const product = {
    name: "pen",
    qty: 10,
    buy: function (n) {
        console.log(this); // 'this' here refers to the 'product' object itself.
        if (n > this.qty) {
            return "quantity not available";
        }
        this.qty -= n;
    },
    test1: function () {
        console.log("test1");
        console.log(this); // 'this' here refers to the 'product' object.
    },
    test2: () => {
        console.log("test2");
        console.log(this); // 'this' in an arrow function refers to the 'this' of the surrounding lexical context (global or module in this case), not the 'product' object.
    }
};

// Attempt to buy 3 pens
product.buy(3);
// After this, product.qty will be 7.

// Attempt to buy 13 pens (more than available)
product.buy(13);
// This will return "quantity not available" and product.qty will remain 7.

// Call test1
product.test1();
// This will log "test1" and then the 'product' object.

// Call test2 (arrow function)
product.test2();
// This will log "test2" and then the global object (window in browsers, or undefined in strict mode/module context in Node.js).
