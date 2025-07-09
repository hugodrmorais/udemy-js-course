function test(str) {
  console.log("fn expression " + str)
  return "fn expression " + str
}

const t1 = test("T1")

const testArrow = (str) => {
  console.log("fn expression " + str)
  return "fn expression " + str
}

const testArrow2 = str => console.log("fn expression " + str) + "fn expression " + str


const t11 = testArrow("T2")
const t2 = testArrow2("T3")

const testeArrow3 = () => ({
    foo: "bar"
})
const t3 = testeArrow3()
console.log(t3)
