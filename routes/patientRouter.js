const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controller/patientController')

patientRouter.get('/data/:id', patientController.getPatient)

patientRouter.post('/data/:id', patientController.updateData)

module.exports = patientRouter