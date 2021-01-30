const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Creating passport configuration 
function init(passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        // check if email exists in DB
        const user = await User.findOne({ email: email })

        if(!user) {
            return done(null, false, {message: 'No user with this email'})
        }
        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, {message: 'LoggedIn Succesfully'})
            }
            return done(null, false, {message: 'Wrong Username or Password'})
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong, try again!!! '})
        })
    })) 

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}

module.exports = init