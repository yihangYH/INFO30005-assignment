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
        var currentPatientRate= caculateRate(patientData);
        Object.assign(patientData, {"rate": patientData[1]});

        var patientRate = [];
        const allPatient = await patient.find({_id:{$nin:req.params.id}}).populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        for(let i =0 ; i < allPatient.length; i++){
            patientRate.push(caculateRate(allPatient[i]));
        }
        patientRate.push(currentPatientRate);
        patientRate.sort(function(a,b){
            return b[1] - a[1];
        });
        Object.assign(patientData, {"rank": patientRate});
        res.render('data.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}


const checkPatient = async(req,res,next)=>{
    try {
        const patientData = await patient.findOne({userid:req.body.userId}).lean()
        if(patientData != null){
            res.status(201);
            res.send();
        }else{
            res.status(202);
            res.send();
        }
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
        // this is bug, the date is not correct month is actually day and day is actually month
        const currentMonth = dateString.split('/')[1]
        const currentDay = dateString.split('/')[0]
        const patientData = await patient.findOne({_id:req.params.id}).populate("weight").populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean();
        //below we have logic set for updating data include blood glucose, body weight, insulin taken and exercise
        // need to check it data is not required or not empty first
        if(patientData.bloodGlucose.length == 0 && req.body.blood_glucose != "Not Required"){
            const data = new bloodGlucose({
                value: req.body.blood_glucose,
                time:dateString,
                comment:req.body.blood_glucose_comment,
            })
            await patient.findOneAndUpdate({_id:req.params.id}, {$push: {bloodGlucose: data._id}});
            data.save() 
        }else{
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
        }

        if(patientData.weight.length == 0 && req.body.weight != "Not Required" ){
            const data = new weight({
                value: req.body.weight,
                time:dateString,
                comment:req.body.weight_comment,
            })
            await patient.findOneAndUpdate({_id:req.params.id}, {$push: {weight: data._id}});
            data.save() 
        }else{
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
        }
        if(patientData.insulinTaken.length == 0 && req.body.insulin_taken != "Not Required"){
            const data = new insulinTaken({
                value: req.body.insulin_taken,
                time:dateString,
                comment:req.body.inssulin_comment,
            })
            await patient.findOneAndUpdate({_id:req.params.id}, {$push: {insulinTaken: data._id}});
            data.save()
        }else{
            // same logic as above but for insulin taken
            if(req.body.insulin_taken != "" && req.body.insulin_taken != "Not Required" ){
                const leastTime = patientData.insulinTaken[patientData.insulinTaken.length - 1].time;
                const data = new insulinTaken({
                    value: req.body.insulin_taken,
                    time:dateString,
                    comment:req.body.inssulin_comment,
                })
                if(leastTime.split('/')[1] != currentMonth || leastTime.split('/')[0] != currentDay){
                    await patient.findOneAndUpdate({_id:req.params.id}, {$push: {insulinTaken: data._id}});
                    data.save()
                }
            }
        }
        if(patientData.exercise.length == 0 && req.body.exercise != "Not Required"){
            const data = new exercise({
                value: req.body.exercise,
                time:dateString,
                comment:req.body.exercise_comment,
            })
            await patient.findOneAndUpdate({_id:req.params.id}, {$push: {exercise: data._id}});
            data.save() 
        }else{
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
        }
        // redirect to patient's data page
        res.redirect('../data/' + req.params.id)
    } catch (error) {
        return next(error)
    }
}

const getPassBloodGlucose = async(req,res,next)=>{
    try {
        const patientData = await patient.findOne({_id:req.params.id})
        .populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        // if(req.body.blood_glucose == "Not Required"){
        //     a.setAttribute("a", readonly);
        // }else{
        //     res.render('passBloodGlucose.hbs', {patientInfo: patientData})
        // }
        res.render('passBloodGlucose.hbs', {patientInfo: patientData})
        
    } catch (error) {
        return next(error)
    }
}
const getPassWeight = async(req,res,next)=>{
    try {
        const patientData = await patient.findOne({_id:req.params.id})
        .populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        res.render('passWeight.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}
const getPassInsulin = async(req,res,next)=>{
    try {
        const patientData = await patient.findOne({_id:req.params.id})
        .populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        // checkArrow(patientData.insulinTaken, data.hbs);
        // if(patientData.insulinTaken[0].value == "Not Required"){
        //     const changeTag = document.getElementsByClassName("insulin-taken-arrow").style;
        //     console.log(changeTag)
        // }
        res.render('passInsulin.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}

const getPassExercise = async(req,res,next)=>{
    try {
        const patientData = await patient.findOne({_id:req.params.id})
        .populate("weight")
        .populate("exercise")
        .populate("bloodGlucose")
        .populate("insulinTaken").lean();
        res.render('passExercise.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}

const getLeaderboard = async(req,res,next)=>{
    // console.log(req.params.id)
    const currentPatient = await patient.findOne({_id:req.params.id}).populate("weight")
    .populate("exercise")
    .populate("bloodGlucose")
    .populate("insulinTaken").lean();
    var currentPatientRate= caculateRate(currentPatient);
    Object.assign(currentPatient, {"rate": currentPatientRate[1]});

    var patientRate = [];
    const allPatient = await patient.find({_id:{$nin:req.params.id}}).populate("weight")
    .populate("exercise")
    .populate("bloodGlucose")
    .populate("insulinTaken").lean();
    for(let i =0 ; i < allPatient.length; i++){
        patientRate.push(caculateRate(allPatient[i]));
    }
    patientRate.push(currentPatientRate);
    patientRate.sort(function(a,b){
        return b[1] - a[1];
    });
    Object.assign(currentPatient, {"rank": patientRate});
    res.render("leaderBoard.hbs", {patientInfo: currentPatient});
}

function caculateRate(patient){
    // console.log(patient)
    var maxCount = findMacCountDataUpdated(patient);
    if(maxCount>0){var rate  = findRate(maxCount)};
    rate = (rate * 100)
    rate = Math.round(rate);
    return [patient.screen_name, rate,patient.userid]
}


function findRate(maxCount){
    var fisrtTime = maxCount[1][0].time;
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ');
    currDateString = dateString.split(" ")[0];
    firstUpdate = fisrtTime.split(" ")[0];
    var date1 = new Date(firstUpdate);
    var date2 = new Date(currDateString);
    var Difference_In_Time = date2.getTime() - date1.getTime();
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return maxCount[0]/Difference_In_Days;
};

function findMacCountDataUpdated(currentPatient){
    var max = 0;
    var dataName = null;
    if(currentPatient.bloodGlucose.length > max && currentPatient.bloodGlucose[0].value != "Not Required"){
        max = currentPatient.bloodGlucose.length;
        dataName = currentPatient.bloodGlucose;
    }
    if(currentPatient.weight.length > max && currentPatient.weight[0].value != "Not Required"){
        max = currentPatient.weight.length;
        dataName = currentPatient.weight;
    }
    if(currentPatient.insulinTaken.length > max &&  currentPatient.insulinTaken[0].value != "Not Required"){
        max = currentPatient.insulinTaken.length;
        dataName = currentPatient.insulinTaken;
    }
    if(currentPatient.exercise.length > max && currentPatient.exercise[0].value != "Not Required"){
        max = currentPatient.exercise.length;
        dataName = currentPatient.exercise;
    }
   return [max,dataName];
}



module.exports = {
    getPatient, 
    updateData, 
    getPassBloodGlucose, 
    getPassWeight, 
    getPassInsulin, 
    getPassExercise,
    checkPatient,
    getLeaderboard
    
}