const express = require('express')
const apiRoutes = require('./router/apiRoutes')
const htmlRoutes = require('./router/htmlRoutes')
const PORT = process.env.PORT || 3002
const app = express()

//parse incoming string or array data
app.use(express.urlencoded({ extended: true }))
//parse incoming JSON data
app.use(express.json())
app.use(express.static('public'))

app.use('/api', apiRoutes)
app.use('/', htmlRoutes)

app.listen(PORT, () => {
    console.log(`API server on port ${PORT}!`)
})