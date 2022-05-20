const passport = require('passport') 
const express = require('express') 
const loginRouter = express.Router()
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
loginRouter.get('/', loginController.getEmpty)

// loginRouter.get('/data/:id', loginController.isAuthenticated, patientController.getPatient)

// loginRouter.get('/dashboard/:id', loginController.isAuthenticated, clinicianController.getClinician)

loginRouter.get('/changePassword', loginController.getChangePassword)

loginRouter.post('/changePassword', loginController.postChangePassword)

loginRouter.get('/login', loginController.getLogin)

loginRouter.post('/logout', loginController.logOut)

loginRouter.post('/patientlogin', 
    passport.authenticate('local', {
        failureRedirect: '/login', failureFlash: true 
    }),
    loginController.patientLogin);

loginRouter.post('/doctorLogin', 
    passport.authenticate('client-login', {
        failureRedirect: '/login', failureFlash: true 
    }),
    loginController.clinicianLogin);


// loginRouter.post('/data/:id', patientController.updateData)

// loginRouter.get('/data/:id/bloodGlucose', loginController.isAuthenticated, patientController.getPassBloodGlucose)

// loginRouter.get('/data/:id/weight', loginController.isAuthenticated, patientController.getPassWeight)

// loginRouter.get('/data/:id/insulinTaken', loginController.isAuthenticated, patientController.getPassInsulin)

// loginRouter.get('/data/:id/exercise', loginController.isAuthenticated, patientController.getPassExercise)

// loginRouter.get('/data/:id/leaderboard', loginController.isAuthenticated, patientController.getLeaderboard)

// loginRouter.get('/:id/comment', loginController.isAuthenticated, clinicianController.comment)

// loginRouter.get('/:id/:patientID/patientDetail', loginController.isAuthenticated, clinicianController.getPatientDetail)

// loginRouter.get('/:id/:patientID/updatePatient', loginController.isAuthenticated, clinicianController.getUpdatePatient)

// loginRouter.get('/:id/newPatient', loginController.isAuthenticated, clinicianController.getPage)

module.exports = loginRouter