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
const {weight} = require('./models/patient.js')
const {exercise} = require('./models/patient.js')
const {insulinTaken} = require('./models/patient.js')
const {bloodGlucose} = require('./models/patient.js')
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
    const patient = await Patient.findOne({_id:req.params.id}).populate("weight").populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean();

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
    const currentMonth = dateString.split('/')[1]
    const currentDay = dateString.split('/')[0]
    const patient = await Patient.findOne({_id:req.params.id}).populate("weight").populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean();
    if(req.body.blood_glucose != "" && req.body.blood_glucose != "Not required"){
        const leastValue = patient.bloodGlucose[patient.bloodGlucose.length - 1].value;
        const leastTime = patient.bloodGlucose[patient.bloodGlucose.length - 1].time;
        const data = new bloodGlucose({
            value: req.body.blood_glucose,
            time:dateString,
        })
        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.blood_glucose.replace(/\s/g,'')!= leastValue){
            await bloodGlucose.findOneAndUpdate(
                {_id:patient.bloodGlucose[patient.bloodGlucose.length - 1]._id}, 
                {value: req.body.blood_glucose, time:dateString}
            )
        }else if(leastTime.split('/')[1] != currentMonth && leastTime.split('/')[0] != currentDay){
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {bloodGlucose: data._id}});
            data.save() 
        }
    }
    if(req.body.weight != "" && req.body.weight != "Not required" ){
        const leastValue = patient.weight[patient.weight.length - 1].value;
        const leastTime = patient.weight[patient.weight.length - 1].time;
        const data = new weight({
            value: req.body.weight,
            time:dateString,
        })
        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.weight.replace(/\s/g,'')!= leastValue){
            await weight.findOneAndUpdate(
                {_id:patient.weight[patient.weight.length - 1]._id}, 
                {value: req.body.weight, time:dateString}
            )
        }else if(leastTime.split('/')[1] != currentMonth && leastTime.split('/')[0] != currentDay){
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {weight: data._id}});
            data.save() 
        }
    }
    if(req.body.insulin_taken != "" && req.body.insulin_taken != "Not required" ){
        const leastValue = patient.insulinTaken[patient.insulinTaken.length - 1].value;
        const leastTime = patient.insulinTaken[patient.insulinTaken.length - 1].time;
        const data = new insulinTaken({
            value: req.body.insulin_taken,
            time:dateString,
        })
        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.insulin_taken.replace(/\s/g,'')!= leastValue){
            console.log(patient.insulinTaken[patient.insulinTaken.length - 1]._id)
            await insulinTaken.findOneAndUpdate(
                {_id:patient.insulinTaken[patient.insulinTaken.length - 1]._id}, 
                {value: req.body.insulin_taken, time:dateString}
            )
        }else if(leastTime.split('/')[1] != currentMonth && leastTime.split('/')[0] != currentDay){
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {insulinTaken: data._id}});
            data.save()
        }
    }
    if(req.body.exercise != "" && req.body.exercise != "Not required" ){
        const leastValue = patient.exercise[patient.exercise.length - 1].value;
        const leastTime = patient.exercise[patient.exercise.length - 1].time;
        const data = new exercise({
            value: req.body.exercise,
            time:dateString,
        })
        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.exercise!= leastValue){
            console.log("check")
            await exercise.findOneAndUpdate(
                {_id:patient.exercise[patient.exercise.length - 1]._id}, 
                {value: req.body.exercise, time:dateString}
            )
        }else if(leastTime.split('/')[1] != currentMonth && leastTime.split('/')[0] != currentDay){
            console.log("hit")
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {exercise: data._id}});
            data.save() 
        }
    }
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




