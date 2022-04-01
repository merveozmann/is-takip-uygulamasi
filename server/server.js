const express = require('express')
const app = express()
const port = 3005

const priortylist=[
    "3","1","2"
]

app.get('/', (req, res) => {
  res.send(priortylist)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})