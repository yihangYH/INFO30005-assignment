const express = require('express')

const patientRouter = express.Router()

const patientController = require('../controller/patientController')

patientRouter.get('/data/:id', patientController.getPatient)

module.exports = patientRouter