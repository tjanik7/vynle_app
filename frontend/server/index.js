// Configuration file for Express server - using to serve React app

// Note Express is a lightweight web framework build on Node
// and Node is a js runtime env used to run js outside a browser

const express = require('express')
const path = require('path')

const app = express()
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../dist')))
// Serve .js files from js static folder
app.get('*/*.js', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/../dist/static/js/' + urlParts[urlParts.length - 1]))
})
// Serve .css files from css static folder
app.get('*/*.css', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/../dist/static/css/' + urlParts[urlParts.length - 1]))
})
app.get('*/*.css.map', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/../dist/static/css/' + urlParts[urlParts.length - 1]))
})
// Serve images files from media static folder
app.get('*/*.(jpg|svg|png|woff|woff2)', (req, res) => {
    const urlParts = req.url.split('/')
    res.sendFile(path.join(__dirname + '/../dist/static/media/' + urlParts[urlParts.length - 1]))
})
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../dist/index.html'))
})
const port = process.env.PORT || 8080
app.listen(port)
console.log('App is listening on port ' + port)