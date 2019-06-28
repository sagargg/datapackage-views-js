/**
 * A quick harness for outputing frictionless
 * data formatted datapackage.json files for use
 * as fixtures and for testing
 **/
const data = require("data.js")
const fs = require("fs")
const url = 'https://datahub.io/starsinmypockets/montreal-kpis'
const resource = data.Dataset.load(url).then(console.log)

const inlineData = [
  ["a", "b", "c", "d"],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6]
]

const dataset = data.open({
  name: "inline",
  data: inlineData
})

fs.writeFileSync(
  "./__fixtures__/simple.datapackage.json",
  JSON.stringify(dataset)
)

const multi = data.open({
  name: "multi",
  data: inlineData
})

multi._descriptor.views = [
  {
    name: 1,
    type: "table"
  },
  {
    name: 2,
    type: "table"
  },
  {
    name: 3,
    type: "table"
  }
]

fs.writeFileSync("./__fixtures__/multi.datapackage.json", JSON.stringify(multi))

data.Dataset.load({pathType: 'remote', path: 'https://datahub.io/starsinmypockets/montreal-kpis'}).then(res => {
  fs.writeFileSync("./__fixtures__/singleUrl.datapackage.json", JSON.stringify(res))
})
