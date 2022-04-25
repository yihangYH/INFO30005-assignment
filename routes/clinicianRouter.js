const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controller/clinicianController')

clinicianRouter.get('/dashboard/:id', clinicianController.getClinician)

module.exports = clinicianRouter