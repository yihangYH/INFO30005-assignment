const {patient} = require('../models/patient.js')
const {clinicianNote} = require("../models/data")
const clinicianData = require("../models/clinician")

const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
    console.log(req.params.id)
    console.log(req.session)
    if(req.session.passport == undefined){
        return res.redirect('/welcome') 
    }
    if(req.params.id != req.session.passport.user){
        return res.redirect('/welcome') 
    }

    if (!req.isAuthenticated()) {
        return res.redirect('/welcome') 
    }
    return next() 
}

module.exports = {isAuthenticated}

