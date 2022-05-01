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
    if(req.body.bloodGlucoseCheckbox != 'on'){healthyData_required[0] = false}
    if(req.body.weightCheckbox != 'on'){healthyData_required[1] =false}
    if(req.body.insulinTakenCheckbox !='on') {healthyData_required[2] =false}
    if(req.body.exerciseCheckbox != 'on') {healthyData_required[3] = false}
    const body = {
        'first_name': req.body.first_name,
        'last_name': req.body.last_name,
        'screen_name': req.body.screen_name,
        'birth': req.body.birthday,
        'userid':req.body.userid,
        'bio': "enter your bio!!!",
        'supportMessage': "keep going",
        'bloodGlucose':[],
        'weight':[],
        'insulinTaken':[],
        'exercise':[],
        'healthyData_required': healthyData_required,


    }
    console.log(body)
    res.send(body)
}

const updatePatient = async(req,res,next) => {
    res.render('updatePatient.hbs')
}

module.exports = { getClinician, getPage, CreatePatient, updatePatient }