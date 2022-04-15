const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    userid: String,
    password: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    bio: String,
    brithday: String,
})

const Patient = mongoose.model('patient', patientSchema, 'patient')



module.exports = {
    Patient
}