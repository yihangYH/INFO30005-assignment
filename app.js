// Import express
const express = require('express')
const mongoose = require('mongoose')
require('./models')
// Set your app up as an express app
const app = express()
const exphbs = require('express-handlebars')
app.use(express.json()) // needed if POST data is in JSON format
app.use(express.urlencoded({ extended: true })) // only needed for URL-encoded input
const {Patient} = require('./models/patient.js')
const {healthyData} = require('./models/patient.js')

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


app.get('/data', async (req, res) => {
    console.log('GET /data')
    const patient = await Patient.findOne({first_name:"Pat"}).populate('healthyData').lean();
    // const healthyData = await Patient.findOne({first_name:"Pat"}).populate('healthyData').lean();
    // console.log(patient)
    res.render('data.hbs', {patientInfo: patient})
})

app.use((req, res, next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

app.post('/data/:name', async (req, res) => {
    let date = new Date()
    let dateString = date.getFullYear() + "/" + (date.getMonth()+1) + "/" + date.getDate();
    const patient = await Patient.findOne({first_name:"Pat"}).lean();
    const data = new healthyData({
        blood_glucose: req.body.blood_glucose,
        exericse: req.body.exericse,
        insulin_taken: req.body.insulin_taken,
        time: dateString,
        weight: req.body.weight,
    })
    patient.healthyData.push(data._id)
    await Patient.findOneAndUpdate({first_name:"Pat"}, {$push: {healthyData: data._id}})
    data.save((err,result) => {
        if (err) res.send(err)
    })
    res.redirect('../data');
    // const newPatient = await Patient.findOne({first_name:"Pat"}).populate('healthyData').lean()
    // res.render('data.hbs', {patientInfo: newPatient})
    // app.get('/data', async (req, res) => {
    //     console.log('GET /data')
    //     const patient = await Patient.findOne({first_name:"Pat"}).populate('healthyData').lean();
    //     // const healthyData = await Patient.findOne({first_name:"Pat"}).populate('healthyData').lean();
    //     // console.log(patient)
    //     res.render('data.hbs', {patientInfo: patient})
    // })
})

app.get('/login', async (req, res) => {
    res.render('login.hbs')
})
app.use(express.static('public'))
// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Demo app is listening on port 3000!')
})




