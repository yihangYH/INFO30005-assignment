const express = require('express')

const loginRouter = express.Router()

const loginController = require('../controller/loginController')

loginRouter.get('/login', loginController.login)

loginRouter.post('/login', loginController.loginToData)

module.exports = loginRouter