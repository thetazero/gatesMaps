const Graph = require('node-dijkstra')
const fs = require('fs')

//const floor1 = require('../data/sigma.json')
const floor7 = require('./data/floor7-s.json')
const floor6 = require('./data/floor6-s.json')
const edgeLabels = { ...require('./data/floor7-edges.json'), ...require('./data/floor6-edges.json') }
const curGraph = require('./graphSave.json')
let src = Object.keys(curGraph) == 0 ? [floor7, floor6] : [curGraph]
let route = new Graph(mergeGraphs(src))

function mergeGraphs(arr) {
  let r = {}
  arr.forEach(graph => {
    for (let v1 in graph) {
      for (let v2 in graph[v1]) {
        if (r[v1] == null) r[v1] = {}
        r[v1][v2] = graph[v1][v2]
      }
    }
  })
  return r
}

function hasEdge(a, b) {
  return route.graph.get(a).get(b) != null
}

function getRoute(from, to) {
  let path = route.path(from, to)
  path = path.filter((e, i) => {
    //make sure that we only remove this node if it can be removed
    if (i > 0 && i < path.length - 1 && !hasEdge(path[i - 1], path[i + 1])) return true
    return (i == 0 || i == path.length - 1 || e[0] != "7")
  })
  return path
}
module.exports.getRoute = getRoute

function describeRoute(nodes) {
  let description = []
  for (let i = 1; i < nodes.length - 2; i++) {
    let edge = nodes[i] + nodes[i + 1]
    console.log(edge)
    description.push(`Walk ${edgeLabels[edge].des}.`)
  }
  description.push(`End at ${nodes[nodes.length - 1]}.`)
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
  let weight = 0.1
  let expectedCost = getPathCost(path)
  let penalty = time - expectedCost
  for (let i = 0; i < path.length - 1; i++) {
    let cur = route.graph.get(path[i]).get(path[i + 1])
    let newCost = cur + (penalty * cur / expectedCost) * weight
    route.graph.get(path[i]).set(path[i + 1], newCost)
    // route.graph.get(path[i + 1]).set(path[i], newCost)
  }
  return getPathCost(path)
}
module.exports.updateRoute = updateRoute

function saveGraph() {
  let data = {}
  route.graph.forEach((edges, node1) => {
    edges.forEach((weight, node2) => {
      if (data[node1] == null) data[node1] = {}
      data[node1][node2] = weight
    })
  })
  data = JSON.stringify(data)
  fs.writeFileSync('./graphSave.json', data)
}
module.exports.saveGraph = saveGraph