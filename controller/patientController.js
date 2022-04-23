const mongoose = require('mongoose')
// require('./models')
// Set your app up as an express app
// const app = express()
// require('./helper/hbsHelper.js')
// app.use(express.json()) // needed if POST data is in JSON format
// app.use(express.urlencoded({ extended: true })) // only needed for URL-encoded input
const {Patient} = require('../models/patient.js')
const {weight} = require('../models/data.js')
const {exercise} = require('../models/data.js')
const {insulinTaken} = require('../models/data.js')
const {bloodGlucose} = require('../models/data.js')

const getPatient = async(req,res,next) => {
    try {
        const patient = await Patient.findOne({_id:req.params.id}).populate("weight").populate("exercise").populate("bloodGlucose").populate("insulinTaken").lean();
        res.render('data.hbs', {patientInfo: patient})
    } catch (error) {
        return next(err)
    }
}

module.exports = {getPatient}