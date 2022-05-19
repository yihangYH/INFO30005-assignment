const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const clinician = require('./models/clinician')
const {patient} = require('./models/patient')


passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(null, user._id)
})

passport.deserializeUser((userId, done) => {
    patient.findOne({ _id: userId },  (err, user) => {
        if (err) {
            return done(err, undefined) 
        }
        return done(undefined, user) 
    })
})


passport.use(
    new LocalStrategy((userId, password, done) => {
        patient.findOne({ userid: userId }, (err, user) => { 
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred' })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password', })
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

passport.use('client-login',
    new LocalStrategy((userId, password, done) => {
        clinician.findOne({ userid: userId }, (err, user) => { 
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred' })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect username or password', })
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