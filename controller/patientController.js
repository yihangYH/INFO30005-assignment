const mongoose = require('mongoose')
// require('./models')
// Set your app up as an express app
// const app = express()
// require('./helper/hbsHelper.js')
// app.use(express.json()) // needed if POST data is in JSON format
// app.use(express.urlencoded({ extended: true })) // only needed for URL-encoded input
const {Patient} = require('../models/patient.js')
const {weight} = require('../models/data.js')
const {exercise} = require('../models/data.js')
const {insulinTaken} = require('../models/data.js')
const {bloodGlucose} = require('../models/data.js')

const getPatient = async(req,res,next) => {
    try {
        const patient = await Patient.findOne({_id:req.params.id}).populate("weight").populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean();
        res.render('data.hbs', {patientInfo: patient})
    } catch (error) {
        return next(err)
    }
}

const updateData  = async(req,res,next) =>{
    try {
        let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ')
    const currentMonth = dateString.split('/')[1]
    const currentDay = dateString.split('/')[0]
    const patient = await Patient.findOne({_id:req.params.id}).populate("weight").populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean();
    if(req.body.blood_glucose != "" && req.body.blood_glucose != "Not Required"){
        const leastValue = patient.bloodGlucose[patient.bloodGlucose.length - 1].value;
        const leastTime = patient.bloodGlucose[patient.bloodGlucose.length - 1].time;
        const data = new bloodGlucose({
            value: req.body.blood_glucose,
            time:dateString,
            comment:req.body.blood_glucose_comment,
        })

        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.blood_glucose.replace(/\s/g,'')!= leastValue){
            // await bloodGlucose.findOneAndUpdate(
            //     {_id:patient.bloodGlucose[patient.bloodGlucose.length - 1]._id}, 
            //     {value: req.body.blood_glucose, time:dateString}
            // )
        }else if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {bloodGlucose: data._id}});
            data.save() 
        }
    }
    if(req.body.weight != "" && req.body.weight != "Not Required" ){
        const leastValue = patient.weight[patient.weight.length - 1].value;
        const leastTime = patient.weight[patient.weight.length - 1].time;
        const data = new weight({
            value: req.body.weight,
            time:dateString,
            comment:req.body.weight_comment,
        })
        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.weight.replace(/\s/g,'')!= leastValue){
            // await weight.findOneAndUpdate(
            //     {_id:patient.weight[patient.weight.length - 1]._id}, 
            //     {value: req.body.weight, time:dateString}
            // )
        }else if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {weight: data._id}});
            data.save() 
        }
    }
    if(req.body.insulin_taken != "" && req.body.insulin_taken != "Not Required" ){
        const leastValue = patient.insulinTaken[patient.insulinTaken.length - 1].value;
        const leastTime = patient.insulinTaken[patient.insulinTaken.length - 1].time;
        const data = new insulinTaken({
            value: req.body.insulin_taken,
            time:dateString,
            comment:req.body.insulin_comment,
        })
        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.insulin_taken.replace(/\s/g,'')!= leastValue){
            // await insulinTaken.findOneAndUpdate(
            //     {_id:patient.insulinTaken[patient.insulinTaken.length - 1]._id}, 
            //     {value: req.body.insulin_taken, time:dateString}
            // )
        }else if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {insulinTaken: data._id}});
            data.save()
        }
    }
    if(req.body.exercise != "" && req.body.exercise != "Not Required" ){
        const leastValue = patient.exercise[patient.exercise.length - 1].value;
        const leastTime = patient.exercise[patient.exercise.length - 1].time;
        const data = new exercise({
            value: req.body.exercise,
            time:dateString,
            comment:req.body.exercise_comment,
        })
        if(leastTime.split('/')[1] == currentMonth && leastTime.split('/')[0] == currentDay && req.body.exercise!= leastValue){
            // await exercise.findOneAndUpdate(
            //     {_id:patient.exercise[patient.exercise.length - 1]._id}, 
            //     {value: req.body.exercise, time:dateString}
            // )
        }else if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
            await Patient.findOneAndUpdate({_id:req.params.id}, {$push: {exercise: data._id}});
            data.save() 
        }
    }
    // redirect to patient's data page
    res.redirect('../data/' + req.params.id)
    } catch (error) {
        return next(err)
    }
}

module.exports = {getPatient, updateData}