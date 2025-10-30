const express = require("express")
const tasks = require('./data/tasks.json')

const app = express()

app.get("/tasks", (req, res) => {
  res.send(tasks)
})

app.listen(3001)
