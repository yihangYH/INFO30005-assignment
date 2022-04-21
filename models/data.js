const mongoose = require('mongoose')

const weightSchema = new mongoose.Schema({
    value:String,
    time:String,
})
const exerciseSchema = new mongoose.Schema({
    value:String,
    time:String
})
const insulinTakenSchema = new mongoose.Schema({
    value:String,
    time:String,
})

const bloodGlucoseSchema = new mongoose.Schema({
    value:String,
    time:String
})

const weight = mongoose.model("weight", weightSchema, 'weight');
const exercise = mongoose.model("exercise", exerciseSchema, "exercise")
const insulinTaken = mongoose.model("insulinTaken", insulinTakenSchema, "insulinTaken")
const bloodGlucose = mongoose.model("bloodGlucose", bloodGlucoseSchema, "bloodGlucose")

module.exports = {
    weight,
    exercise,
    insulinTaken,
    bloodGlucose,
}