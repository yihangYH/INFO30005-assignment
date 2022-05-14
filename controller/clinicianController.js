const clinicianData = require("../models/clinician")
const {patient} = require("../models/patient")
require('../models/data')

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

const getPage = async(req,res,next) => {
    try {
        res.render('createPatient.hbs', {id: req.params.id})
    } catch (error) {
        return next(err)
    }
}

const CreatePatient = async(req,res,next) => {
    const healthyData_required = [true,true,true,true];
    console.log(req.body)
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
        res.render('comment.hbs')
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
    // console.log(patientInfo)
    res.render('updatePatient.hbs', {patient: patientInfo})
}

const updatePatient = async(req,res,next) => {
    console.log("check");
}

// to be removed, getTemp,createTemp
module.exports = { getClinician, getPage, CreatePatient, getUpdatePatient,getTemp,createTemp,comment,updatePatient }