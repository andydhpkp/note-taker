const fs = require('fs')
const path = require('path')
const express = require('express')
const PORT = process.env.PORT || 3002
const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

const { notes } = require('./db/db.json')


app.listen(PORT, () => {
    console.log(`API server not on port ${PORT}!`)
})