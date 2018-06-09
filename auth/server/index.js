// Main starting point of the app
const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// DB setup
mongoose.connect('mongodb://localhost/auth')

// App setup
app.use(morgan('dev'))
app.use(bodyParser.json({ type: '*/*' }))
router(app)

// Server setup
const port = process.env.port || 3090
const server = http.createServer(app)
server.listen(port)
console.log(`Server listening on port ${port}`)
