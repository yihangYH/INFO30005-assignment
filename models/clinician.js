const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userid: String,
    password: String,
    first_name: String,
    last_name: String,
    screen_name: String,
    bio: String,
    patients: [{type:mongoose.Schema.Types.ObjectId, ref:'patient'}]
})

const Clinician = mongoose.model('Clinician', schema, 'clinician')


// const Clinician = [
//     {id: '1000', first_name: 'Demo'},
//     {id: '2000', first_name: 'Demo'}
// ]

module.exports = Clinician
