const passport = require('passport') 
const express = require('express') 
const loginRouter = express.Router()
const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
    if (!req.isAuthenticated()) {
        return res.redirect('/login1') 
    }
    return next() 
}
loginRouter.get('/', isAuthenticated, (req, res) => {
    res.render('login') 
})



loginRouter.get('/login', (req, res) => {
        res.render('login', { flash: req.flash('error'), title: 'Login' })
})

loginRouter.post('/login', 
    passport.authenticate('local', {
        failureRedirect: '/login', failureFlash: true 
    }),
    function(req, res) {
        res.status("202")
        res.send()
    });


loginRouter.post('/logout', (req, res) => { req.logout()
    res.redirect('/') 
})

module.exports = loginRouter