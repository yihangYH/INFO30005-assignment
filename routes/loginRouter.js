const passport = require('passport') 
const express = require('express') 
const loginRouter = express.Router()
const {patient} = require('../models/patient')
const bcrypt = require('bcryptjs')
const { redirect } = require('express/lib/response')
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
    if (!req.isAuthenticated()) {
        return res.redirect('/welcome') 
    }
    return next() 
}
loginRouter.get('/', isAuthenticated, (req, res) => {
    res.redirect('/login') 
})

loginRouter.get('/changePassword', (req, res) => {
    res.render('changePassword')
})

loginRouter.post('/changePassword', function(req, res) {
    console.log(req.body.oldPassword)
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
                patient.findOneAndUpdate({ userid: req.body.userID }, { password: hash }, (err, user) => {
                    if (err) {
                        // res.json({ success: false, message: err }); // Return error
                    } else {
                        // res.json({ success: true, message: 'Password has been changed!' }); // Return success
                    }
                });
            })
        })
      }
    }); 
})

loginRouter.get('/login', (req, res) => {
        res.render('login', { flash: req.flash('error'), title: 'Login' })
})

loginRouter.post('/patientlogin', 
    passport.authenticate('local', {
        failureRedirect: '/login', failureFlash: true 
    }),
    function(req, res) {
        res.status("202")
        res.statusMessage = req.user._id
        res.send()
    });

loginRouter.post('/doctorLogin', 
    passport.authenticate('client-login', {
        failureRedirect: '/login', failureFlash: true 
    }),
    function(req, res) {
        res.status("202")
        res.statusMessage = req.user._id
        res.send()
    });




module.exports = loginRouter