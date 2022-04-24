const mongoose = require('mongoose')
require('./data.js')
const patientSchema = new mongoose.Schema({
    userid: String,
    password: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    bio: String,
    birthday: String,
    healthyData_required: [Boolean], 
    weight: [{type:mongoose.Schema.Types.ObjectId, ref:'weight'}],
    exercise: [{type:mongoose.Schema.Types.ObjectId, ref:'exercise'}],
    insulinTaken: [{type:mongoose.Schema.Types.ObjectId, ref:'insulinTaken'}],
    bloodGlucose: [{type:mongoose.Schema.Types.ObjectId, ref:'bloodGlucose'}],
    supportMessage: String,

})

const Patient = mongoose.model('patient', patientSchema, 'patient')

module.exports = {
    Patient
}