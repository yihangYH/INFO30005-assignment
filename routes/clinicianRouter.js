const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/', clinicianController.getClinician)
clinicianRouter.get('/:id', clinicianController.getClinicianById)

module.exports = clinicianRouter