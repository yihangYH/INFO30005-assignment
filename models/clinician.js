//Clinician's data storing structure

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('./patient.js')
const schema = new mongoose.Schema({
    userid: String,
    password: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    bio: String,
    patient: [{type:mongoose.Schema.Types.ObjectId, ref:'patient'}]
})
schema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password, (err, valid) => {
    callback(err, valid) 
})
}
const SALT_FACTOR = 10

schema.pre('save', function save(next) {
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
const Clinician = mongoose.model('Clinician', schema, 'clinician')


module.exports = Clinician
