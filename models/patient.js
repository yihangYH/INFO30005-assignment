//patient's data storing stucture
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
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
    safety_threshold: [String],
    weight: [{type:mongoose.Schema.Types.ObjectId, ref:'weight'}],
    exercise: [{type:mongoose.Schema.Types.ObjectId, ref:'exercise'}],
    insulinTaken: [{type:mongoose.Schema.Types.ObjectId, ref:'insulinTaken'}],
    bloodGlucose: [{type:mongoose.Schema.Types.ObjectId, ref:'bloodGlucose'}],
    supportMessage: String,
    notes: [{type:mongoose.Schema.Types.ObjectId, ref:'clinicianNote'}],
})

patientSchema.methods.verifyPassword = function (password, callback) {
        bcrypt.compare(password, this.password, (err, valid) => {
        callback(err, valid) 
    })
}
const SALT_FACTOR = 10

patientSchema.pre('save', function save(next) {
    const user = this
    // Go to next if password field has not been modified 
    if (!user.isModified('password')) {
        return next() 
    }
    // Automatically generate salt, and calculate hash
    bcrypt.hash(user.password, SALT_FACTOR, (err, hash) => { 
        if (err) {
            return next(err) 
        }
        // Replace password with hash
        user.password = hash
        next() 
    })
})


const patient = mongoose.model('patient', patientSchema, 'patient')

module.exports = {
    patient
}