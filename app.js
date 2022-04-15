// Import express
const express = require('express')

// Set your app up as an express app
const app = express()
const exphbs = require('express-handlebars')
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: true })) // only needed for URL-encoded input
require('./models/index')
app.engine(
    'hbs',
    exphbs.engine({
        // configure Handlebars
        defaultlayout: 'main',
        extname: 'hbs',
    })
)
app.set('view engine', 'hbs') // set Handlebars view engine


app.get('/welcome', (req, res) => {
    res.render('welcome.hbs')
})

app.get('/aboutDiabetes', (req, res) => {
    res.render('aboutDiabetes.hbs')
})
app.get('/aboutThisWebsite', (req, res) => {
    res.render('aboutThisWebsite.hbs')
})

app.get('/data', (req, res) => {
    res.render('data.hbs')
})

    

app.use(express.static('public'))
// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Demo app is listening on port 3000!')
})