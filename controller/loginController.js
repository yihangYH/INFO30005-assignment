// const mongoose = require('mongoose')
// const passport = require('passport') 
// const express = require('express') 
// const {patient} = require('../models/patient.js')
const {patient} = require('../models/patient.js')
const {weight} = require('../models/data.js')
const {exercise} = require('../models/data.js')
const {insulinTaken} = require('../models/data.js')
const {bloodGlucose} = require('../models/data.js')

// // Authentication middleware
// const isAuthenticated = (req, res, next) => {
//     // Authentication middleware
//     if (!req.isAuthenticated()) {
//         return res.redirect('/login') 
//     }
    
//     // Otherwise, proceed to next middleware function
//     return next() 
// }

// // render login.hbs
// const login = async(req,res,next) => {
//     try {
//         res.render('login.hbs')
//     } catch (error) {
//         return next(err)
//     }
// }

// const loginToData = async(req,res,next) => {
//     passport.authenticate('local', {
//         successRedirect: '/', failureRedirect: '/login', failureFlash: true 
//     })
//     try {
//         //check if is patient
//         //when patient is selected req.body.isDoctor will be equal to object
//         if(typeof req.body.isDoctor == "object"){
//             passport.authenticate('local', {
//                 successRedirect: '/', failureRedirect: '/login', failureFlash: true 
//             })
//             // find patient info from db
//             // const patientData = await patient.findOne({userid:req.body.userid}).lean();
//             // //if password matches with data in database
//             // if(patientData != null &&patientData.password == req.body.password){
//             //     res.status("202")
//             //     res.statusMessage = patientData._id
//             // }else if(patientData != null && patientData.password != req.body.password){
//             //     //201: unsuccessfull
//             //     res.status("201")
//             // }
//            res.send()
//         }else if(typeof req.body.isPatient == "object"){
//             //TODO:Doctor login
//             res.status("201")
//             res.send()
//         }
//     } catch (error) {
//         return next(err)
//     }
// }

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
        // caculate each patient engagement rate 
        for(let i =0 ; i < allPatient.length; i++){
            patientRate.push(caculateRate(allPatient[i]));
        }
        patientRate.push(currentPatientRate);
        // sort engagement rate 
        patientRate.sort(function(a,b){
            return b[1] - a[1];
        });
        // assign engagement rate  to patientData named as rank
        Object.assign(patientData, {"rank": patientRate});
        res.render('data.hbs', {patientInfo: patientData})
    } catch (error) {
        return next(error)
    }
}

// function use to caculate engagement rate
function caculateRate(patient){
    var maxCount = findMacCountDataUpdated(patient);
    if(maxCount[0]>0){var rate  = findRate(maxCount)};
    rate = (rate * 100)
    rate = Math.round(rate);
    return [patient.screen_name, rate,patient.userid]
}

// caculate engagement rate
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
    if(Difference_In_Days == 0){
        Difference_In_Days = 1;
    }
    return maxCount[0]/Difference_In_Days;
};

// find which data has been updated most
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

module.exports = {getPatient}

// module.exports = {login, loginToData}