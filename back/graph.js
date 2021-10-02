const Graph = require('node-dijkstra')

const floor1 = require('../data/sigma.json')
const route = new Graph(floor1)
//const descriptionMap = get shit from json
//route.graph.get('A').set('B', 2)

function getRoute(from, to) {
  return route.path(from, to)
}
module.exports.getRoute = getRoute

function describeRoute(nodes) {
  let description = []
  description.push(`Start at ${nodes[0]}.`)
  for(let i = 0; i < nodes.length - 1; i++) {
    let edge = nodes[i] + nodes[i+1]
    description.push(`Turn towards ${edge}`)
  }
  description.push(`End at ${nodes[nodes.length-1]}`)
}
module.exports.describeRoute = describeRoute

function getNodes() {
  return Array.from(route.graph.keys())
}
module.exports.getNodes = getNodes

function getPathCost(path) {
  let cost = 0
  for (let i = 0; i < path.length - 1; i++) {
    cost += route.graph.get(path[i]).get(path[i + 1])
  }
  return cost
}

function updateRoute(path, time) {

}

module.exports.updateRoute = updateRoute