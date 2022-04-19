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

// get welcome page
app.get('/welcome', (req, res) => {
    res.render('welcome.hbs')
})

// get about diabetes page
app.get('/aboutDiabetes', (req, res) => {
    res.render('aboutDiabetes.hbs')
})

// get about this website page
app.get('/aboutThisWebsite', (req, res) => {
    res.render('aboutThisWebsite.hbs')
})

// get specific patient's data page
// will move to patientRouter later
app.get('/data/:id', async (req, res) => {
    const patient = await Patient.findOne({_id:req.params.id}).populate('healthyData').lean();
    // const healthyData = await Patient.findOne({first_name:"Pat"}).populate('healthyData').lean();
    res.render('data.hbs', {patientInfo: patient})
})

// log different resquests for debug purposes
app.use((req, res, next) => {
    console.log('message arrived: ' + req.method + ' ' + req.path)
    next()
})

// post method for patient adding new data
app.post('/data/:id', async (req, res) => {

    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ')
    const patient = await Patient.findOne({_id:req.params.id}).lean();
    // only implemented for datas, the corresponding data's comment will be added later
    const data = new healthyData({
        blood_glucose: req.body.blood_glucose,
        exericse: req.body.exericse,
        insulin_taken: req.body.insulin_taken,
        time: dateString,
        weight: req.body.weight,
    })
    // push data collection objectID to patient's data collection
    patient.healthyData.push(data._id)
    await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {healthyData: data._id}})
    // save data to database
    data.save((err,result) => {
        if (err) res.send(err)
    })
    // redirect to patient's data page
    res.redirect('../data/' + req.params.id);
})

// implement patient login logic but not using Passport, will redo it later
app.post('/login', async(req, res) => {
    if(typeof req.body.isDoctor == "object"){
        const patient = await Patient.findOne({userid:req.body.userid}).populate('healthyData').lean();
        if(patient != null && patient.password == req.body.password){
            res.status("202")
            res.statusMessage = patient._id
        }else if(patient != null && patient.password != req.body.password){
            res.status("201")
        }
       res.send()
    }else if(typeof req.body.isPatient == "object"){

        res.status("201")
        res.send()
    }
})

// get method for patient and doctor login
app.get('/login', async (req, res) => {
    res.render('login.hbs')
})
app.use(express.static('public'))
// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Demo app is listening on port 3000!')
})




