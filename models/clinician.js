const mongoose = require('mongoose')
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

const Clinician = mongoose.model('Clinician', schema, 'clinician')


module.exports = Clinician
