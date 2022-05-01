const mongoose = require('mongoose')
const passport = require('passport') 
const express = require('express') 
const {patient} = require('../models/patient.js')

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    // Authentication middleware
    if (!req.isAuthenticated()) {
        return res.redirect('/login') 
    }
    
    // Otherwise, proceed to next middleware function
    return next() 
}

// render login.hbs
const login = async(req,res,next) => {
    try {
        res.render('login.hbs')
    } catch (error) {
        return next(err)
    }
}

const loginToData = async(req,res,next) => {
    passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login', failureFlash: true 
    })
    try {
        //check if is patient
        //when patient is selected req.body.isDoctor will be equal to object
        if(typeof req.body.isDoctor == "object"){
            passport.authenticate('local', {
                successRedirect: '/', failureRedirect: '/login', failureFlash: true 
            })
            // find patient info from db
            // const patientData = await patient.findOne({userid:req.body.userid}).lean();
            // //if password matches with data in database
            // if(patientData != null &&patientData.password == req.body.password){
            //     res.status("202")
            //     res.statusMessage = patientData._id
            // }else if(patientData != null && patientData.password != req.body.password){
            //     //201: unsuccessfull
            //     res.status("201")
            // }
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