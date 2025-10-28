console.log("______________")

// function addOrConcatenate(x: number, y: number) {
//     return x + y
// }

function addOrConcatenate(x: number | string, y: number | string) {
    return (typeof x === "number" && typeof y === "number") ? x + y : x + "" + y
}

console.log("addOrConcatenate(1, 2):", addOrConcatenate(1, 2))
console.log('addOrConcatenate("1", "2"):', addOrConcatenate("1", "2"))
console.log('addOrConcatenate("1", 2):', addOrConcatenate("1", 2))

// type NumberOrString = number | string

// function addOrConcatenateG<T extends NumberOrString>(x: T, y: T) {
//     return (typeof x === "number" && typeof y === "number") ? x + y : x + "" + y
// }

// addOrConcatenateG(1, 2)
// addOrConcatenateG("1", "2")
// // addOrConcatenateG(1, "2")         ERROR
// // addOrConcatenateG("1", 2)         ERROR
// // addOrConcatenateG(false, true)    ERROR

