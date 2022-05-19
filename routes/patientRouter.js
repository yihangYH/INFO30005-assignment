const express = require('express')

const patientRouter = express.Router()


const patientController = require('../controller/patientController')


// patientRouter.get('/data/:id', patientController.getPatient)

patientRouter.post('/data/:id', patientController.updateData)

// patientRouter.get('/data/:id/bloodGlucose',  patientController.getPassBloodGlucose)

// patientRouter.get('/data/:id/weight', patientController.getPassWeight)

// patientRouter.get('/data/:id/insulinTaken', patientController.getPassInsulin)

// patientRouter.get('/data/:id/exercise', patientController.getPassExercise)

// patientRouter.get('/data/:id/leaderboard', patientController.getLeaderboard)

patientRouter.post('/checkPatient', patientController.checkPatient)



module.exports = patientRouter