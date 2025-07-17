const fs = require("fs")
const emoji = require("node-emoji")

const test = require("./modules/mod1")
console.log(test)

fs.writeFile("test.txt", "Hello World!", err => {
  if(err) throw err
  console.log("saved", emoji.get("coffee"))
})

const mod2 = require("./modules/mod2")
const mod3 = require("./modules/mod3")

console.log("mod2")
console.log(mod2)
console.log("mod3")
console.log(mod3)

console.log("mod2 - 2")
console.log(mod2)
