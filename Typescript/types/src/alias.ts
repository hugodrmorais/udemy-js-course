function add2(x: number, y?: number) {
    if (y === undefined) {
        return null
    }
    return x + y
}

const test2 = add2(10)

type testAlias = number | string | boolean


let test3: testAlias
test3 = 10
test3 = "test 3"

test3 = true

let test4: testAlias
test4 = 10

type User = {
    nome: string,
    idade?: number
}

const daniel: User = {
    nome: "daniel"
}

const maria: User = {
    nome: "maria",
    idade: 30
}


type Sizes = "12px" | "18px" | "24px"

const small: Sizes = "12px"
const normal: Sizes = "18px";

export default 1
