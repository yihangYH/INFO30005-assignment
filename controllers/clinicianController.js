const clinicianData = require("../models/clinician")
const {patient} = require("../models/patient")
require('../models/data')
const getClinician = async (req,res, next) =>{
    // res.render('allPatient.hbs', {data: clinicianData})
    try{
        const clinician = 
            await clinicianData.findOne({first_name: "Michael"}).populate("patient").lean()
        
        for(let i = 0; i < Object.keys(clinician.patient).length; i++){
            const patientData = await patient.findById({_id:clinician.patient[i]._id}).populate('weight')
            // console.log(patientData)
            clinician.patient[i].weight = patientData.weight
        }
        console.log(clinician.patient[0])
        return res.render('allPatient.hbs', {data: clinician})
    }catch(err){
        return next(err)
    }
}

const getClinicianById = (req, res) =>{
    const data = clinicianData.find(data=>data.id === req.params.id)

    if(data){
        res.render('allPatient.hbs', {data: data})
    }else{
        res.sendStatus([])
    }
}

module.exports = {
    getClinician,
    getClinicianById
}