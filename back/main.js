const express = require('express')
const cors = require('cors')
const { getRoute, describeRoute, getNodes, getPathCost, saveGraph } = require('./graph')

const app = express()
app.use(cors())
const port = 4200

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/graph', (req, res) => {
  // send json of graph
})

// this is dumb delete >:(
app.get('/save', (req, res) => {
  saveGraph()
  res.send("saved")
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

app.post('/route/:time', ({ params: { time }, body: { route } }, res) => {
  //body should contain route
  // update graph to show time changes
})

app.listen(port, () => {
  console.log(`example app listening on http://localhost:${port}`)
})