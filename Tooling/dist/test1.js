import axios from "axios"

const test = "test 9"
const arrowFn = n => n * n
console.log(arrowFn(2))

class Test {
  constructor(n) {
    this.n = n
  }
}

console.log(new Test(5))

const getAdress = async (cep) => {
  let url = `https://viacep.com.br/ws/${cep}/json/`
  try {
    const response = await axios.get(url)

    const json = response.data
    return json
} catch (e) {
    throw e
  }
}
console.log("------")
getAdress("03136-050").then(data => console.log(data))
