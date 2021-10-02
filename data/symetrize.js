const input = "./floor7"
const output = "./floor7-s.json"

const fs = require('fs')

const inputData = require(input)
let newGraph = {}
console.log(inputData)
for (let v1 in inputData) {
  for (let v2 in inputData[v1]) {
    console.log(v1, v2, inputData[v1][v2])
    if (newGraph[v1] == null) newGraph[v1] = {}
    if (newGraph[v2] == null) newGraph[v2] = {}
    newGraph[v1][v2] = inputData[v1][v2]
    newGraph[v2][v1] = inputData[v1][v2]
  }
}
fs.writeFileSync(output, JSON.stringify(newGraph))