const passport = require('passport') 
const express = require('express') 
const router = express.Router()

const isAuthenticated = (req, res, next) => {
    // If user is not authenticated via passport, redirect to login page 
    if (!req.isAuthenticated()) {
        return res.redirect('/login1') 
    }
    return next() 
}
router.get('/', isAuthenticated, (req, res) => {
    res.render('home', { title: 'Express', user: req.user }) 
})
router.get('/login1', (req, res) => {
    res.render('login1', { flash: req.flash('error'), title: 'Login' }) 
})
router.post('/login1', 
    passport.authenticate('local', {
        successRedirect: '/', failureRedirect: '/login1', failureFlash: true 
    })
)

router.post('/logout', (req, res) => { req.logout()
    res.redirect('/') 
})

module.exports = router