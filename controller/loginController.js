const {patient} = require('../models/patient.js')
const {clinicianNote} = require("../models/data")
const clinicianData = require("../models/clinician")
const bcrypt = require('bcryptjs')

const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
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

const getEmpty = (req, res, next) => {
    res.redirect('/login') 
}

const getChangePassword = (req, res, next) => {
    res.render('changePassword')
}

const postChangePassword = (req, res, next) => {
    patient.findOne({ userid: req.body.userID },(err, user) => {
      // Check if error connecting
      if (err) {
        // res.json({ success: false, message: err }); // Return error
      } else {
        user.verifyPassword(req.body.oldPassword, (err, valid) => { 
            if (err) {
                console.log('Incorrect password')
                return
            }

            if (!valid) {
                console.log('Incorrect password')
                // res.send('Incorrect password')
                return
            }

            bcrypt.hash(req.body.newPassword, 10, (err, hash) => { 
                if (err) {
                    return next(err) 
                }
                // Replace password with hash
                patient.findOneAndUpdate({ userid: req.body.userID }, 
                    { password: hash }, (err, user) => {
                    if (err) {
                        // res.json({ success: false, message: err }); // Return error
                    } else {
                        // res.json({ success: true, message: 'Password has been changed!' }); // Return success
                    }
                });
            })
        })
      }
    })
}

const getLogin = (req, res, next) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
}

const logOut = (req, res, next) =>{
    req.logOut();
    delete req.user
    req.session.destroy()
    res.redirect('/');
}

const patientLogin = (req, res) => {
    res.status("202")
    res.statusMessage = req.user._id
    res.send()
}

const clinicianLogin = (req, res) => {
    res.status("202")
    res.statusMessage = req.user._id
    res.send()
}

module.exports = {isAuthenticated
    ,getEmpty
    ,getChangePassword
    ,postChangePassword
    ,getLogin
    ,logOut
    ,patientLogin
    ,clinicianLogin}

