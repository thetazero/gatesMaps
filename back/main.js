const express = require('express')
const { getRoute, describeRoute } = require('./graph')

const app = express()
const port = 4200

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.get('/graph', (req, res) => {
  // send json of graph
})

app.get('/route/:from/:to', ({ params: { from, to } }, res) => {
  let route = getRoute(from, to)
  let description = describeRoute(route)
  res.json({
    route, description
  })
})

app.post('/route/:from/:to/:time', ({ params: { from, to, time }, body: { route } }, res) => {
  //body should contain route
  // update graph to show time changes
})

app.listen(port, () => {
  console.log(`example app listening on http://localhost:${port}`)
})