const clinicianData = require("../models/clinician")
const {patient} = require("../models/patient")
const getClinician = async (req,res, next) =>{
    // res.render('allPatient.hbs', {data: clinicianData})
    try{
        const clinician = 
            await clinicianData.findOne({first_name: "Michael"}).populate("patient")
            .populate({path:"patient.weight" ,select:"weight"}).lean()
        console.log(clinician)
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