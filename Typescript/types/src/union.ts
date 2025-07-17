function add2(x: number, y?: number) {
  if (y === undefined) {
    return null
  }
  return x + y
}

const test2 = add2(10)


let test3: number | string | boolean
test3 = 10
test3 = "test 3"

test3 = true

const User: {
  nome: string,
  idade?: number
} = {
  nome: "daniel"
}
