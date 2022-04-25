const express = require('express')

const clinicianRouter = express.Router()

const clinicianController = require('../controllers/clinicianController')

clinicianRouter.get('/:id', clinicianController.getClinician)

module.exports = clinicianRouter