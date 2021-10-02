const Graph = require('node-dijkstra')
const fs = require('fs')

const floor1 = require('../data/sigma.json')
const curGraph = require('./graphSave.json')
let src = Object.keys(curGraph) == 0 ? floor1 : curGraph
const route = new Graph(src)
//const descriptionMap = get shit from json
//route.graph.get('A').set('B', 2)

function getRoute(from, to) {
  return route.path(from, to)
}
module.exports.getRoute = getRoute

function describeRoute(nodes) {
  //@saftey and correctness
  let description = []
  description.push(`Start at ${nodes[0]}.`)
  for (let i = 0; i < nodes.length - 1; i++) {
    let edge = nodes[i] + nodes[i + 1]
    description.push(`Turn towards ${edge}`)
  }
  description.push(`End at ${nodes[nodes.length - 1]}`)
  return description
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
module.exports.getPathCost = getPathCost

function updateRoute(path, time) {
  let expectedCost = getPathCost(path)
  let penalty = time - expectedCost
  for (let i = 0; i < path.length - 1; i++) {
    let cur = route.graph.get(path[i]).get(path[i + 1])
    let newCost = cur + penalty * cur / expectedCost
    route.graph.get(path[i]).set(path[i + 1], newCost)
    route.graph.get(path[i + 1]).set(path[i], newCost)
  }
}

module.exports.updateRoute = updateRoute

function saveGraph() {
  let data = {}
  route.graph.forEach((edges, node1) => {
    console.log(edges, node1)
    edges.forEach((weight, node2) => {
      if (data[node1] == null) data[node1] = {}
      data[node1][node2] = weight
    })
  })
  console.log(data)
  data = JSON.stringify(data)
  fs.writeFileSync('./graphSave.json', data)
}
module.exports.saveGraph = saveGraph