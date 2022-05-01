const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const USER = { id: 123, username: 'user', password: 'password', secret: 'info30005' }

passport.serializeUser((user, done) => {
    // Use id to serialize user
    done(undefined, user.id)
})

passport.deserializeUser((userId, done) => {
    // Run database query here to retrieve user information 
    // For now, just return the hardcoded user
    if (userId === USER.id) {
        done(undefined, USER) } else {
        done(new Error('Bad User'), undefined) 
    }
})


passport.use(
    new LocalStrategy((userId, password, done) => {
        
        if (userId !== USER.username || password !== USER.password) {
            return done(undefined, false, {
                message: 'Incorrect username/password', 
            })
        }
        return done(undefined, USER)
    })
)

module.exports = passport