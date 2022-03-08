const express = require('express')
const publishRouter = require('./router/publish-router')

const app = express()

app.use(express.json())
app.use('/sender',publishRouter)

module.exports = app