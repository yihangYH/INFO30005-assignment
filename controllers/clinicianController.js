const clinicianData = require("../models/clinician")
const {patient} = require("../models/patient")
require('../models/data')
const getClinician = async (req,res, next) =>{
    
    try{
        const clinician = 
            await clinicianData.findOne({_id: req.params.id}).populate("patient").lean()
        
        for(let i = 0; i < Object.keys(clinician.patient).length; i++){
            const patientData = await patient.findById({_id:clinician.patient[i]._id}).populate("weight").
            populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean()
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


module.exports = {
    getClinician
}