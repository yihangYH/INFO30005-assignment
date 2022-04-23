// Import express
const express = require('express')
const mongoose = require('mongoose')
require('./models')
// Set your app up as an express app
const app = express()
const exphbs = require('express-handlebars')
require('./helper/hbsHelper.js')
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: true })) // only needed for URL-encoded input
const {Patient} = require('./models/patient.js')
const {weight} = require('./models/data.js')
const {exercise} = require('./models/data.js')
const {insulinTaken} = require('./models/data.js')
const {bloodGlucose} = require('./models/data.js')
app.engine(
    'hbs',
    exphbs.engine({
        // configure Handlebars
        defaultlayout: 'main',
        extname: 'hbs',
    })
)
app.set('view engine', 'hbs') // set Handlebars view engine

// log different resquests for debug purposes
app.use((req, res, next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

app.use(express.static('public'))
const patientRouter = require('./routes/patientRouter.js')
app.use('',patientRouter)

const loginRouter = require('./routes/loginRouter.js')
app.use('',loginRouter)

const welcomeRouter = require('./routes/welcomeRouter.js')
app.use('',welcomeRouter)

// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Demo app is listening on port 3000!')
})




