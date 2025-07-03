function somar() {
    console.log(arguments)

    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i]
    }
    return total
}
console.log(somar.name)

console.log(somar(1, 2, 3)) // 6
console.log(somar(1, 2, 3, 4, 5)) // 15
console.log(somar(1, 2, 3, 4, 5, 12, 14, 50)) // 91

const somar1 = function () {
    console.log(arguments)

    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i]
    }
    return total
}
console.log(somar1.name)

console.log(somar1(1, 2, 3)) // 6
console.log(somar1(1, 2, 3, 4, 5)) // 15
console.log(somar1(1, 2, 3, 4, 5, 12, 14, 50)) // 91

const somar2 = () => {
    console.log(arguments)

    let total = 0;
    for (let i = 0; i < arguments.length; i++) {
        total += arguments[i]
    }
    return total
}
console.log(somar2)
console.log(somar2(1, 2, 3)) // Uncaught ReferenceError: arguments is not defined
