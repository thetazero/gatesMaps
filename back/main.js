const express = require('express')
const cors = require('cors')
const { getRoute, describeRoute, getNodes, getPathCost, saveGraph, updateRoute } = require('./graph')

const app = express()

app.use(cors())
app.use(express.json())
const port = 4200

app.use(express.static('../front/build/'))

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/nodes', (req, res) => {
  res.json(getNodes())
})

app.get('/route/:from/:to', ({ params: { from, to } }, res) => {
  let route = getRoute(from, to)
  let description = describeRoute(route)
  let time = getPathCost(route)
  res.json({
    route, description, time
  })
})

app.post('/route', ({ body: { route, time } }, res) => {
  let newTime = updateRoute(route, time)
  saveGraph()
  res.send({ time: newTime })
})

app.listen(port, () => {
  console.log(`example app listening on http://localhost:${port}`)
})