// Import express
const express = require('express')
const mongoose = require('mongoose')
// import models
require('./models')

// Set app as an express app
const app = express()
const exphbs = require('express-handlebars')
// import habHelper
require('./helper/hbsHelper.js')

// for JSON format
app.use(express.json()) 

// only needed for URL-encoded input
app.use(express.urlencoded({ extended: true }))

app.engine(
    'hbs',
    exphbs.engine({
        // configure Handlebars with helper 
        helpers: require('./helper/hbsHelper.js').helpers,
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

// import all the routers 
const patientRouter = require('./routes/patientRouter.js')
app.use('',patientRouter)

const loginRouter = require('./routes/loginRouter.js')
app.use('',loginRouter)

const welcomeRouter = require('./routes/welcomeRouter.js')
app.use('',welcomeRouter)

const clinicianRouter = require('./routes/clinicianRouter.js')
app.use('',clinicianRouter)

// listen on port 3000 and logs tha tinformation to the console.
// in the local env
app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port 3000!')
})




