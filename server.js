const express = require('express')
const bodyParser = require('body-parser')

// create express app
const app = express()

// port
const port = 5000

// configure database
const db = require('./config/database.config').mongoURI
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

// connect database
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})

// parse request dari content-type -aplication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse request dari content-type -aplication/json
app.use(bodyParser.json())

// define simple route untuk contoh route berhasil
app.get('/', (req, res) => {
    res.json({ "message": "Aplikasi simple note" })
})

// require notes routes
const Note = require("./app/routes/note.routes")(app)

// listen for request
app.listen(port, () => {
    console.log(`Server running on port : ${port}`)
})