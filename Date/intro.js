const data = new Date()
console.log(data)
console.log(data.getDay())
console.log(data.getDate())
console.log(data.getMonth())
console.log(data.getTime())
console.log(data.getFullYear())
console.log(data.getHours())
console.log(data.getUTCHours())
console.log("----")
console.log(data.toString())
console.log(data.toDateString())
console.log(data.toISOString())
console.log(data.toLocaleDateString())
console.log(data.toLocaleString())
console.log(data.toUTCString())
console.log(data.toLocaleString("pt-BR", { month: "long", weekday: "long", day: "numeric", year: "numeric" }))
