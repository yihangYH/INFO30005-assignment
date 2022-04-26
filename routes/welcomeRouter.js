const express = require('express')

const welcomeRouter = express.Router()

const welcomeController = require('../controller/welcomeController')

welcomeRouter.get('/welcome', welcomeController.welcome)
welcomeRouter.get('/aboutDiabetes', welcomeController.aboutDiabetes)
welcomeRouter.get('/aboutThisWebsite', welcomeController.aboutThisWebsite)

module.exports = welcomeRouter