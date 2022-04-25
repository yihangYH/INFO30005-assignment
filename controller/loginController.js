const mongoose = require('mongoose')

const {patient} = require('../models/patient.js')

const login = async(req,res,next) => {
    try {
        res.render('login.hbs')
    } catch (error) {
        return next(err)
    }
}

const loginToData = async(req,res,next) => {
    try {
        if(typeof req.body.isDoctor == "object"){
            const patientData = await patient.findOne({userid:req.body.userid}).lean();
            if(patientData != null &&patientData.password == req.body.password){
                res.status("202")
                res.statusMessage = patientData._id
            }else if(patientData != null && patientData.password != req.body.password){
                res.status("201")
            }
           res.send()
        }else if(typeof req.body.isPatient == "object"){
    
            res.status("201")
            res.send()
        }
    } catch (error) {
        return next(err)
    }
}

module.exports = {login, loginToData}