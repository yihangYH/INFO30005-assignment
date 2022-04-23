const mongoose = require('mongoose')

const {Patient} = require('../models/patient.js')

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
            const patient = await Patient.findOne({userid:req.body.userid}).lean();
            if(patient != null && patient.password == req.body.password){
                res.status("202")
                res.statusMessage = patient._id
            }else if(patient != null && patient.password != req.body.password){
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