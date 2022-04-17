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
const { Router } = require('express')

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


app.get('/data/:id', async (req, res) => {
    console.log('hit data')
    const patient = await Patient.findOne({_id:req.params.id}).populate('healthyData').lean();
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
})

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

app.get('/login', async (req, res) => {
    res.render('login.hbs')
})
app.use(express.static('public'))
// Tells the app to listen on port 3000 and logs tha tinformation to the console.
app.listen(process.env.PORT || 3000, () => {
    console.log('Demo app is listening on port 3000!')
})




