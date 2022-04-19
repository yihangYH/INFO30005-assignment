const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    userid: String,
    password: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    bio: String,
    birthday: String,
    healthyData_required: [Boolean], 
    healthyData:[{type:mongoose.Schema.Types.ObjectId, ref:'healthyData'}],
    weight: [{type:mongoose.Schema.Types.ObjectId, ref:'weight'}],
    exercise: [{type:mongoose.Schema.Types.ObjectId, ref:'exercise'}],
    insulinTaken: [{type:mongoose.Schema.Types.ObjectId, ref:'insulinTaken'}],
    bloodGlucose: [{type:mongoose.Schema.Types.ObjectId, ref:'bloodGlucose'}],

})

const Patient = mongoose.model('patient', patientSchema, 'patient')

const healthyDataSchema = new mongoose.Schema({
    blood_glucose: String,
    exericse: String,
    insulin_taken: String,
    time: String,
    weight: String,
})
const weightSchema = new mongoose.Schema({
    value:String,
})
const exerciseSchema = new mongoose.Schema({
    value:String,
})
const insulinTakenSchema = new mongoose.Schema({
    value:String,
})

const bloodGlucoseSchema = new mongoose.Schema({
    value:String,
})


const healthyData = mongoose.model('healthyData', healthyDataSchema, 'healthyData')
const weight = mongoose.model("weight", weightSchema, 'weight');
const exercise = mongoose.model("exercise", exerciseSchema, "exercise")
const insulinTaken = mongoose.model("insulinTaken", exerciseSchema, "insulinTaken")
const bloodGlucose = mongoose.model("bloodGlucose", exerciseSchema, "bloodGlucose")

module.exports = {
    Patient,
    healthyData,
    weight,
    exercise,
    insulinTaken,
    bloodGlucose,
}