const express = require('express')
const clinicianRouter = express.Router()
const loginController = require('../controller/loginController')
const clinicianController = require('../controller/clinicianController')

clinicianRouter.get('/dashboard/:id', clinicianController.isAuthenticated, clinicianController.getClinician)

clinicianRouter.get('/:id/newPatient', clinicianController.isAuthenticated, clinicianController.createPatient)

clinicianRouter.post('/:id/newPatient', clinicianController.CreatePatient)

clinicianRouter.get('/:id/:patientID/updatePatient', clinicianController.isAuthenticated, clinicianController.getUpdatePatient)

clinicianRouter.post('/:id/:patientID/updatePatient',  clinicianController.updatePatient)

clinicianRouter.get('/:id/comment', clinicianController.isAuthenticated, clinicianController.comment)

clinicianRouter.get('/:id/:patientID/patientDetail', clinicianController.isAuthenticated, clinicianController.getPatientDetail)

clinicianRouter.post('/:id/:patientID/updateMessage' ,clinicianController.updateSupportMessage)

clinicianRouter.post('/:id/:patientID/updateNote' ,clinicianController.updateNote)

// to be remove, it used to create clinician
clinicianRouter.get('/creatClincianTemp', clinicianController.getTemp)
// to be remove, it used to create clinician
clinicianRouter.post('/creatClincianTemp', clinicianController.createTemp)

module.exports = clinicianRouter