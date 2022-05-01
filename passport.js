const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const {patient} = require("./models/patient")

passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user._id)
})

passport.deserializeUser((userId, done) => {
    // Run database query here to retrieve user information 
    // For now, just return the hardcoded user
    User.findById(userId, (err, user) => {
        if (err) {
            return done(err, undefined) 
        }
        return done(undefined, user) 
    })
})


passport.use(
    new LocalStrategy((userId, password, done) => {
        patient.findOne({ userId }, {}, {}, (err, user) => { 
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred' 
                })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password', 
                })
            }
                          // Check password
            user.verifyPassword(password, (err, valid) => { 
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred' 
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect username or password', 
                    })
                }
                return done(undefined, user)
            })
        })
    })
)

module.exports = passport