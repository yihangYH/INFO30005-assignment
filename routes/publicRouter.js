const passport = require('passport') 
const express = require('express') 
const publicRouter = express.Router()
const {patient} = require('../models/patient')
const bcrypt = require('bcryptjs')
const loginController = require('../controller/loginController')
const patientController = require('../controller/patientController')
const clinicianController = require('../controller/clinicianController')
// const { authenticate } = require('passport/lib')
// const { redirect } = require('express/lib/response')
// const isAuthenticated = (req, res, next) => {
//     // If user is not authenticated via passport, redirect to login page 
//     console.log(req.params.id)
//     console.log(req.session)
//     if(req.session.passport == undefined){
//         return res.redirect('/welcome') 
//     }
//     if(req.params.id != req.session.passport.user){
//         return res.redirect('/welcome') 
//     }

//     if (!req.isAuthenticated()) {
//         return res.redirect('/welcome') 
//     }
//     return next() 
// }
publicRouter.get('/', (req, res) => {
    res.redirect('/login') 
})
publicRouter.get('/data/:id', loginController.isAuthenticated, patientController.getPatient)

// publicRouter.get('/dashboard/:id', loginController.isAuthenticated, clinicianController.getClinician)

publicRouter.get('/changePassword', (req, res) => {
    res.render('changePassword')
})

publicRouter.post('/changePassword', function(req, res) {
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

publicRouter.get('/login', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

publicRouter.post('/logout', function(req, res){
    req.logOut();
    delete req.user
    req.session.destroy()
    res.redirect('/');
});

publicRouter.post('/patientlogin', 
    passport.authenticate('local', {
        failureRedirect: '/login', failureFlash: true 
    }),
    function(req, res) {
        res.status("202")
        res.statusMessage = req.user._id
        res.send()
    });

publicRouter.post('/doctorLogin', 
    passport.authenticate('client-login', {
        failureRedirect: '/login', failureFlash: true 
    }),
    function(req, res) {
        res.status("202")
        res.statusMessage = req.user._id
        res.send()
    });


// publicRouter.post('/data/:id', patientController.updateData)

publicRouter.get('/data/:id/bloodGlucose', loginController.isAuthenticated, patientController.getPassBloodGlucose)

publicRouter.get('/data/:id/weight', loginController.isAuthenticated, patientController.getPassWeight)

publicRouter.get('/data/:id/insulinTaken', loginController.isAuthenticated, patientController.getPassInsulin)

publicRouter.get('/data/:id/exercise', loginController.isAuthenticated, patientController.getPassExercise)

publicRouter.get('/data/:id/leaderboard', loginController.isAuthenticated, patientController.getLeaderboard)

// publicRouter.get('/:id/comment', loginController.isAuthenticated, clinicianController.comment)

// publicRouter.get('/:id/:patientID/patientDetail', loginController.isAuthenticated, clinicianController.getPatientDetail)

// publicRouter.get('/:id/:patientID/updatePatient', loginController.isAuthenticated, clinicianController.getUpdatePatient)

// publicRouter.get('/:id/newPatient', loginController.isAuthenticated, clinicianController.getPage)

module.exports = publicRouter