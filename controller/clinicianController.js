const Clinician = require("../models/clinician")
const clinicianData = require("../models/clinician")
const {patient} = require("../models/patient")
const {clinicianNote} = require("../models/data")
require('../models/data')

checkBox = ["bloodGlucoseCheckboxUpdate","weightCheckboxUpdate","insulinTakenCheckboxUpdate", "exerciseCheckboxUpdate"]
lowervalue= ["bloodGlucoseLowerValueUpdate","weightLowerValueUpdate", "insulinTakenLowerValueUpdate","exerciseLowerBalueUpdate"]
uppervalue= ["bloodGlucoseUpperValueUpdate", "weightUpperValueUpdate", "insulinTakenUpperValueUpdate","exerciseUpperValueUpdate"]

//get corresponding info from DB 
// and populate with patient and 4 data
// then render the clinician.hbs
const getClinician = async (req,res, next) =>{
    try{
        // find the clinician from DB based on the object id, and populate with patient collection
        const clinician = 
            await clinicianData.findOne({_id: req.params.id}).populate("patient").lean()
        // iterate all clinician's patients and populate the data related to the patitent 
        for(let i = 0; i < Object.keys(clinician.patient).length; i++){
            const patientData = await patient.findById({_id:clinician.patient[i]._id})
            .populate("weight")
            .populate("exercise")
            .populate("bloodGlucose")
            .populate("insulinTaken").lean()
            // assign found data to the JSON
            clinician.patient[i].weight = patientData.weight
            clinician.patient[i].bloodGlucose = patientData.bloodGlucose
            clinician.patient[i].insulinTaken = patientData.insulinTaken
            clinician.patient[i].exercise = patientData.exercise
        }
        return res.render('clinician.hbs', {data: clinician})
    }catch(err){
        return next(err)
    }
}

const getPatientDetail = async (req,res, next) =>{
    try {
        const bloodGlucose =[];
        const bloodGlucoseTime=[];
        const weight = [];
        const weightTime = [];
        const exercise = [];
        const exerciseTime = [];
        const insulinTaken = [];
        const insulinTakenTime = [];
        const jsondata=[];
        const patientInfo = 
            await patient.findOne({_id: req.params.patientID})
            .populate("weight")
            .populate("exercise")
            .populate("bloodGlucose")
            .populate("insulinTaken")
            .populate("notes").lean()
        const clinician = 
            await clinicianData.findOne({_id: req.params.id}).lean()
        Object.assign(patientInfo, {clinicianID: clinician._id, clinicianName: clinician.screen_name})
        var type = findMaxDataType(patientInfo);
        
        if(type == 1){
            for(let i = 0; i < patientInfo.bloodGlucose.length; i++){
                bloodGlucose.push(patientInfo.bloodGlucose[i].value)
                bloodGlucoseTime.push(patientInfo.bloodGlucose[i].time)
            }
            for(let i = 0; i < patientInfo.bloodGlucose.length; i++){
                if(i < patientInfo.weight.length){ 
                    weight.push(patientInfo.weight[i].value)
                    weightTime.push(patientInfo.weight[i].time)
                }else{
                    weight.push("No data")
                    weightTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.bloodGlucose.length; i++){
                if(i < patientInfo.exercise.length){ 
                    exercise.push(patientInfo.exercise[i].value)
                    exerciseTime.push(patientInfo.exercise[i].time)
                }else{
                    exercise.push("No data")
                    exerciseTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.bloodGlucose.length; i++){
                if(i < patientInfo.insulinTaken.length){ 
                    insulinTaken.push(patientInfo.insulinTaken[i].value)
                    insulinTakenTime.push(patientInfo.insulinTaken[i].time)
                }else{
                    insulinTaken.push("No data")
                    insulinTakenTime.push("No time")
                }
            }
        }else if(type == 2){
            for(let i = 0; i < patientInfo.weight.length; i++){
                weight.push(patientInfo.weight[i].value)
                weightTime.push(patientInfo.weight[i].time)
            }
            for(let i = 0; i < patientInfo.weight.length; i++){
                if(i < patientInfo.bloodGlucose.length){ 
                    bloodGlucose.push(patientInfo.bloodGlucose[i].value)
                    bloodGlucoseTime.push(patientInfo.bloodGlucose[i].time)
                }else{
                    bloodGlucose.push("No data")
                    bloodGlucoseTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.weight.length; i++){
                if(i < patientInfo.exercise.length){ 
                    exercise.push(patientInfo.exercise[i].value)
                    exerciseTime.push(patientInfo.exercise[i].time)
                }else{
                    exercise.push("No data")
                    exerciseTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.weight.length; i++){
                if(i < patientInfo.insulinTaken.length){ 
                    insulinTaken.push(patientInfo.insulinTaken[i].value)
                    insulinTakenTime.push(patientInfo.insulinTaken[i].time)
                }else{
                    insulinTaken.push("No data")
                    insulinTakenTime.push("No time")
                }
            }
        }else if(type == 3){
            for(let i = 0; i < patientInfo.exercise.length; i++){
                exercise.push(patientInfo.exercise[i].value)
                exerciseTime.push(patientInfo.exercise[i].time)
            }
            for(let i = 0; i < patientInfo.exercise.length; i++){
                if(i < patientInfo.bloodGlucose.length){ 
                    bloodGlucose.push(patientInfo.bloodGlucose[i].value)
                    bloodGlucoseTime.push(patientInfo.bloodGlucose[i].time)
                }else{
                    bloodGlucose.push("No data")
                    bloodGlucoseTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.exercise.length; i++){
                if(i < patientInfo.weight.length){ 
                    weight.push(patientInfo.weight[i].value)
                    weightTime.push(patientInfo.weight[i].time)
                }else{
                    weight.push("No data")
                    weightTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.exercise.length; i++){
                if(i < patientInfo.insulinTaken.length){ 
                    insulinTaken.push(patientInfo.insulinTaken[i].value)
                    insulinTakenTime.push(patientInfo.insulinTaken[i].time)
                }else{
                    insulinTaken.push("No data")
                    insulinTakenTime.push("No time")
                }
            }
        }else{
            for(let i = 0; i < patientInfo.insulinTaken.length; i++){
                insulinTaken.push(patientInfo.insulinTaken[i].value)
                insulinTakenTime.push(patientInfo.insulinTaken[i].time)
            }
            for(let i = 0; i < patientInfo.insulinTaken.length; i++){
                if(i < patientInfo.bloodGlucose.length){ 
                    bloodGlucose.push(patientInfo.bloodGlucose[i].value)
                    bloodGlucoseTime.push(patientInfo.bloodGlucose[i].time)
                }else{
                    bloodGlucose.push("No data")
                    bloodGlucoseTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.insulinTaken.length; i++){
                if(i < patientInfo.weight.length){ 
                    weight.push(patientInfo.weight[i].value)
                    weightTime.push(patientInfo.weight[i].time)
                }else{
                    weight.push("No data")
                    weightTime.push("No time")
                }
            }
            for(let i = 0; i < patientInfo.insulinTaken.length; i++){
                if(i < patientInfo.exercise.length){ 
                    exercise.push(patientInfo.exercise[i].value)
                    exerciseTime.push(patientInfo.exercise[i].time)
                }else{
                    exercise.push("No data")
                    exerciseTime.push("No time")
                }
            }
        }

        for(let i = 0 ; i < bloodGlucose.length; i++){
            jsondata.push({
                bloodGlucoseValue: bloodGlucose[i],
                bloodGlucoseTime: bloodGlucoseTime[i],
                weightValue: weight[i],
                weightTime: weightTime[i],
                exerciseValue: exercise[i],
                exerciseTime: exerciseTime[i],
                insulinTakenValue: insulinTaken[i],
                insulinTakenTime: insulinTakenTime[i],
                safety_threshold: patientInfo.safety_threshold,
            })
        }
        Object.assign(patientInfo, {data:jsondata})
        // console.log(patientInfo)
        return res.render('patientDetail.hbs',{patientInfo:patientInfo})

    } catch (error) {
        return next(error)
    }
}

function findMaxDataType(patientInfo){
    var len = 0;
    var type =0;
    if(patientInfo.bloodGlucose.length >= len){
        len = patientInfo.bloodGlucose.length
        type = 1
    }
    if(patientInfo.weight.length >= len){
        len = patientInfo.weight.length
        type = 2
    }
    if(patientInfo.exercise.length >= len){
        len = patientInfo.exercise.length
        type = 3
    }
    if(patientInfo.insulinTaken.length >= len){
        len = patientInfo.insulinTaken.length
        type = 4
    }
    return type
}

const getPage = async(req,res,next) => {
    try {
        res.render('createPatient.hbs', {id: req.params.id})
    } catch (error) {
        return next(err)
    }
}

const CreatePatient = async(req,res,next) => {
    const healthyData_required = [true,true,true,true];
    const safety_threshold = [];
    if(req.body.bloodGlucoseCheckbox != 'on'){
        healthyData_required[0] = false
        safety_threshold.push("Not Required")
    }else{
        safety_threshold.push(req.body.bloodGlucoseLowerValue + "-" + req.body.bloodGlucoseUpperValue );
    }
    if(req.body.weightCheckbox != 'on'){
        healthyData_required[1] =false
        safety_threshold.push("Not Required")
    }else{
        safety_threshold.push(req.body.weightLowerValue + "-" + req.body.weightUpperValue );
    }
    if(req.body.insulinTakenCheckbox !='on') {
        healthyData_required[2] =false
        safety_threshold.push("Not Required")
    }else{
        safety_threshold.push(req.body.insulinTakenLowerValue + "-" + req.body.insulinTakenUpperValue );
    }
    if(req.body.exerciseCheckbox != 'on') {
        healthyData_required[3] = false
        safety_threshold.push("Not Required")
    }else{
        safety_threshold.push(req.body.exerciseLowerBalue + "-" + req.body.exerciseUpperValue );
    }
    patient.create({
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'screen_name': req.body.screen_name,
        'birth': req.body.birthday,
        'userid':req.body.userid,
        'password':req.body.password,
        'bio': "enter your bio!!!",
        'supportMessage': "keep going",
        'bloodGlucose':[],
        'weight':[],
        'insulinTaken':[],
        'exercise':[],
        'healthyData_required': healthyData_required,
        'safety_threshold':safety_threshold
    }, async function(err, newPatient){
        if (err) { console.log(err); return; }
        console.log('Dummy user inserted')
        console.log(newPatient._id)
        await clinicianData.findByIdAndUpdate({_id: req.params.id}, {$push: {patient: newPatient._id}})
    })
    // await clinicianData.findByIdAndUpdate({_id: req.params.id}, {$push: {patient: newPatient_id}})
    // console.log(req.params)
    res.redirect('/dashboard/'+req.params.id)
}

// to be remove, it used to create clinician
const createTemp = async(req,res,next) => {
    clinicianData.create({
        'userid':req.body.userid,
        'password':req.body.password,
    }, function(err, newClinician){
        if (err) { console.log(err); return; }
        console.log('Dummy user inserted')
        console.log(newClinician._id)
    })
}

const comment = async(req,res,next) => {
    try {
        const clinician = 
        await clinicianData.findOne({_id: req.params.id}).populate("patient").lean()
        for(let i = 0; i < Object.keys(clinician.patient).length; i++){
            const patientData = await patient.findById({_id:clinician.patient[i]._id})
            .populate("weight")
            .populate("exercise")
            .populate("bloodGlucose")
            .populate("insulinTaken").lean()
            // assign found data to the JSON
            clinician.patient[i].weight = patientData.weight
            clinician.patient[i].bloodGlucose = patientData.bloodGlucose
            clinician.patient[i].insulinTaken = patientData.insulinTaken
            clinician.patient[i].exercise = patientData.exercise
            // console.log(clinician.patient[i])
            // break
        }
        // console.log(clinician)
        res.render('comment.hbs',{clinicianInfo:clinician})
    } catch (error) {
        return next(err)
    }
}

// to be removed get temp page for create clinician
const getTemp = async(req,res,next) => {
    try {
        res.render('creatClincianTemp.hbs')
    } catch (error) {
        return next(err)
    }
}


const getUpdatePatient = async(req,res,next) => {
    const patientInfo = await patient.findById({_id: req.params.patientID}).lean();
    Object.assign(patientInfo, {clinicianID: req.params.id})
    res.render('updatePatient.hbs', {patient: patientInfo})
}

const updatePatient = async(req,res,next) => {
    const patientInfo = await patient.findById({_id: req.params.patientID}).lean();
    console.log(req.body)
    const healthyData_required = patientInfo.healthyData_required;
    const safetyThreshold = patientInfo.safety_threshold;
    if(req.body.bloodGlucoseCheckboxUpdate == undefined){
        healthyData_required[0] = false
        safetyThreshold[0] = "Not Required"
    }else if(req.body.bloodGlucoseCheckboxUpdate == 'on'){
        healthyData_required[0] = true
        safetyThreshold[0] = req.body.bloodGlucoseLowerValueUpdate + "-" + req.body.bloodGlucoseUpperValueUpdate
    }
    if(req.body.weightCheckboxUpdate == undefined){
        healthyData_required[1] = false
        safetyThreshold[1] = "Not Required"
    }else if(req.body.weightCheckboxUpdate == 'on'){
        healthyData_required[1] = true
        safetyThreshold[1] = req.body.weightLowerValueUpdate + "-" + req.body.weightUpperValueUpdate
    }
    if(req.body.insulinTakenCheckboxUpdate == undefined){
        healthyData_required[2] = false
        safetyThreshold[2] = "Not Required"
    }else if(req.body.insulinTakenCheckboxUpdate == 'on'){
        healthyData_required[2] = true
        safetyThreshold[2] = req.body.insulinTakenLowerValueUpdate + "-" + req.body.insulinTakenUpperValueUpdate
    }
    if(req.body.exerciseCheckboxUpdate == undefined){
        healthyData_required[3] = false
        safetyThreshold[3] = "Not Required"
    }
    console.log("aadsasdsadad")
    patient.findByIdAndUpdate({_id: req.params.patientID}, {$set:{healthyData_required: healthyData_required, safety_threshold: safetyThreshold}}, function(err, updatedPatient){
        if (err) { console.log(err); return; }
        console.log('Patient updated')
    })
    let path="/"+req.params.id + "/"+ req.params.patientID+"/patientDetail"
    res.redirect(path)
    
}


const updateSupportMessage = async(req,res,next)=>{
    patient.findByIdAndUpdate({_id: req.params.patientID}, {$set:{supportMessage: req.body.supportMessage}}, function(err, updatedPatient){
        if (err) { console.log(err); return; }
        console.log('Patient updated')
    })
    var path = "/"+req.params.id + "/"+ req.params.patientID+"/patientDetail"
    res.redirect(path)
};

const updateNote = async(req,res,next)=>{
    let AuDate = new Date().toLocaleString("en-US", {timeZone: "Australia/Sydney"});
    let dateString = AuDate.toString().replace(',', ' ');
    const note = new clinicianNote({
        content: req.body.content,
        time: dateString,
    })
    patient.findByIdAndUpdate({_id: req.params.patientID}, {$push:{notes: note._id}}, function(err, updatedPatient){
        if (err) { console.log(err); return; }
    })
    note.save(function(err, newNote){
        if (err) { console.log(err); return; }
    })
    var path = "/"+req.params.id + "/"+ req.params.patientID+"/patientDetail"
    res.redirect(path);
};

// to be removed, getTemp,createTemp
module.exports = { 
    getClinician, 
    getPage, 
    CreatePatient, 
    getUpdatePatient,
    getTemp,
    createTemp,
    comment,
    updatePatient,
    getPatientDetail,
    updateSupportMessage,
    updateNote
}
