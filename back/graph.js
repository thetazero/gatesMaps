const Graph = require('node-dijkstra')

const floor1 = require('../data/sigma.json')
const route = new Graph(floor1)

//route.graph.get('A').set('B', 2)

module.exports.getRoute = (from, to) => {
  return route.path(from, to)
}

module.exports.describeRoute = (nodes) => {
  return ["these", "are", "directions"]
}