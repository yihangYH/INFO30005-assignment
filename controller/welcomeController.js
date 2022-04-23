const mongoose = require('mongoose')

const welcome = async(req,res,next) => {
    try {
        res.render('welcome.hbs')
    } catch (error) {
        return next(err)
    }
}

const aboutDiabetes = async(req,res,next) => {
    try {
        res.render('aboutDiabetes.hbs')
    } catch (error) {
        return next(err)
    }
}

const aboutThisWebsite = async(req,res,next) => {
    try {
        res.render('aboutThisWebsite.hbs')
    } catch (error) {
        return next(err)
    }
}

module.exports = {welcome, aboutDiabetes,aboutThisWebsite }