const mongoose = require('mongoose')
const {patient} = require('../models/patient.js')
const {weight} = require('../models/data.js')
const {exercise} = require('../models/data.js')
const {insulinTaken} = require('../models/data.js')
const {bloodGlucose} = require('../models/data.js')

// find specific patient based on the id, and populate with 4 data and render data.hbs
const getPatient = async(req,res,next) => {
    try {
        const patientData = await patient.findOne({_id:req.params.id})
        .populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        res.render('data.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}

//when patient click update, the new data will be saved to DB after cerntain logic checking
const updateData  = async(req,res,next) =>{
    try {
        // get current update time, timezone Sydney
        let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
        let dateString = AuDate.toString().replace(',', ' ')
        const currentMonth = dateString.split('/')[1]
        const currentDay = dateString.split('/')[0]
        const patientData = await patient.findOne({_id:req.params.id}).populate("weight").populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean();

        //below we have logic set for updating data include blood glucose, body weight, insulin taken and exercise
        // need to check it data is not required or not empty first
        if(req.body.blood_glucose != "" && req.body.blood_glucose != "Not Required"){
            const leastTime = patientData.bloodGlucose[patientData.bloodGlucose.length - 1].time;
            // new data object
            const data = new bloodGlucose({
                value: req.body.blood_glucose,
                time:dateString,
                comment:req.body.blood_glucose_comment,
            })

            //update to data if the patient have not update today, 
            // if patient already updated today, patient will not be able to update again
            if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
                await patient.findOneAndUpdate({_id:req.params.id}, {$push: {bloodGlucose: data._id}});
                data.save() 
            }
        }
        // same logic as above but for weight
        if(req.body.weight != "" && req.body.weight != "Not Required" ){
            const leastTime = patientData.weight[patientData.weight.length - 1].time;
            const data = new weight({
                value: req.body.weight,
                time:dateString,
                comment:req.body.weight_comment,
            })
            if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
                await patient.findOneAndUpdate({_id:req.params.id}, {$push: {weight: data._id}});
                data.save() 
            }
        }
        // same logic as above but for insulin taken
        if(req.body.insulin_taken != "" && req.body.insulin_taken != "Not Required" ){
            const leastTime = patientData.insulinTaken[patientData.insulinTaken.length - 1].time;
            const data = new insulinTaken({
                value: req.body.insulin_taken,
                time:dateString,
                comment:req.body.insulin_comment,
            })
            if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
                await patient.findOneAndUpdate({_id:req.params.id}, {$push: {insulinTaken: data._id}});
                data.save()
            }
        }
        // same logic as above but for exercise
        if(req.body.exercise != "" && req.body.exercise != "Not Required" ){
            const leastTime = patientData.exercise[patientData.exercise.length - 1].time;
            const data = new exercise({
                value: req.body.exercise,
                time:dateString,
                comment:req.body.exercise_comment,
            })
            if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
                await patient.findOneAndUpdate({_id:req.params.id}, {$push: {exercise: data._id}});
                data.save() 
            }
        }
        // redirect to patient's data page
        res.redirect('../data/' + req.params.id)
    } catch (error) {
        return next(err)
    }
}

const getPassData = async(req,res,next)=>{
    try {
        const patientData = await patient.findOne({_id:req.params.id})
        .populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        
        res.render('passData.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}

module.exports = {getPatient, updateData, getPassData}