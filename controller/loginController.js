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
        //if is patient
        if(typeof req.body.isDoctor == "object"){
            const patientData = await patient.findOne({userid:req.body.userid}).lean();
            //if password matches with data in database
            if(patientData != null &&patientData.password == req.body.password){
                res.status("202")
                res.statusMessage = patientData._id
            }else if(patientData != null && patientData.password != req.body.password){
                //201: unsuccessfull
                res.status("201")
            }
           res.send()
        }else if(typeof req.body.isPatient == "object"){
            //TODO:Doctor login
            res.status("201")
            res.send()
        }
    } catch (error) {
        return next(err)
    }
}

module.exports = {login, loginToData}