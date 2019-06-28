import React from "react"
import "./App.css"
import Table from "./Table.js"
import DataJS from 'data.js'

async function getData(datapackage) {
  console.log('getData', datapackage)
  return Promise.all(datapackage._descriptor.resources.map(async resource => {
    resource.pathType = 'remote' // @@TODO this is set to local initially no idea why
    const file = await DataJS.open(resource)
    const body = file.buffer
    console.log(resource, file, body)
    return body

    // await file.rows(), @@TODO --> 
    // Unhandled Rejection (Error): We do not have a parser for that format: json
  }))
}

function getViews(datapackage) {
  let views = [{}] // default to single table view

  try {
    const confViews = datapackage._descriptor.views
    views = confViews ? confViews : [{}]
  } catch (e) {
    console.log("No views found in datapackage descriptor")
  }

  return views
}

function App(props) {
  const { datapackage } = props
  // const views = getViews(datapackage)
  const views = [{}]
  const data = getData(datapackage).then(res => console.log('resolved getData', res)).catch(e => console.log('catch getData', e))

  const renderedViews = views.map((view, i) => {
    console.log("VUEW", view)
    if (view.type === "table" || !view.type) {
      return <Table data={data} key={i} />
    }
    return <p>Data view unavailable</p>
  })

  return (
    <div className="App">
      <header className="h-6 bg-gray-300">
        <h1>Datapackage Views</h1>
      </header>
      <div className="container m-24">{renderedViews}</div>
    </div>
  )
}

export default App
