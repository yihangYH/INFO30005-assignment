const express = require('express')
const passport = require('passport') 
const clinicianRouter = express.Router()

const clinicianController = require('../controller/clinicianController')

clinicianRouter.get('/dashboard/:id', clinicianController.getClinician)

clinicianRouter.get('/:id/newPatient', clinicianController.getPage)

clinicianRouter.post('/:id/newPatient', clinicianController.CreatePatient)

clinicianRouter.get('/:id/updatePatient', clinicianController.updatePatient)

// to be remove, it used to create clinician
clinicianRouter.get('/creatClincianTemp', clinicianController.getTemp)
// to be remove, it used to create clinician
clinicianRouter.post('/creatClincianTemp', clinicianController.createTemp)

module.exports = clinicianRouter