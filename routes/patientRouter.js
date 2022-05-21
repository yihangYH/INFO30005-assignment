const express = require('express')

const patientRouter = express.Router()


const patientController = require('../controller/patientController')


patientRouter.get('/data/:id', patientController.isAuthenticated, patientController.getPatient)

patientRouter.get('/data/:id/bloodGlucose', patientController.isAuthenticated,  patientController.getPassBloodGlucose)

patientRouter.get('/data/:id/weight', patientController.isAuthenticated, patientController.getPassWeight)

patientRouter.get('/data/:id/insulinTaken', patientController.isAuthenticated, patientController.getPassInsulin)

patientRouter.get('/data/:id/exercise', patientController.isAuthenticated, patientController.getPassExercise)

patientRouter.get('/data/:id/leaderboard', patientController.isAuthenticated, patientController.getLeaderboard)

patientRouter.post('/checkPatient', patientController.isAuthenticated, patientController.checkPatient)

patientRouter.post('/data/:id', patientController.isAuthenticated, patientController.updateData)

patientRouter.post('/data/:id/updateBio',patientController.updateBioMessage)

module.exports = patientRouter