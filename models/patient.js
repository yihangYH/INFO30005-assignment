const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    userid: String,
    password: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    bio: String,
    brithday: String,
    healthyData_required: [Boolean], 
    healthyData:[{type:mongoose.Schema.Types.ObjectId, ref:'healthyData'}],
})

const Patient = mongoose.model('patient', patientSchema, 'patient')

const healthyDataSchema = new mongoose.Schema({
    blood_glucose: String,
    exericse: String,
    insulin_taken: String,
    time: String,
    weight: String,
})

const healthyData = mongoose.model('healthyData', healthyDataSchema, 'healthyData')


module.exports = {
    Patient,
    healthyData
}