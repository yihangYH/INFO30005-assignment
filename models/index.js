//info to connect to mongodb

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'info30005Database'
})

const db = mongoose.connection.on('error', err => {
    console.error(err);
    process.exit(1)
})

db.once('open', async () => {
    console.log(`Mongo connection started on ${db.host}:${db.port}`)
})

require('./patient')

const mongooseClient = mongoose
    .connect(process.env.MONGO_URL || 'mongodb://localhost', {
        dbName: 'info30005Database' 
    })
    .then((m) => m.connection.getClient())

module.exports = mongooseClient