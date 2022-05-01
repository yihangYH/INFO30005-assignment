const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controller/clinicianController')

clinicianRouter.get('/dashboard/:id', clinicianController.getClinician)

clinicianRouter.get('/:id/newPatient', clinicianController.getPage)

clinicianRouter.post('/:id/newPatient', clinicianController.CreatePatient)

clinicianRouter.get('/:id/updatePatient', clinicianController.updatePatient)

module.exports = clinicianRouter