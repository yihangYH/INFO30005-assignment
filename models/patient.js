const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
    userid: String,
    password: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    bio: String,
    brithday: String,
    healthyData_required:[Boolean],      //0:weight, 1:blood pressure, 2:blood sugar, 3:blood oxygen
})

const Patient = mongoose.model('patient', patientSchema, 'patient')



module.exports = {
    Patient
}