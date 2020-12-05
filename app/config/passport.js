// require local starategy
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

// Creating passport configuration here 
function init(passport) { // receiving passport from server.js where we have imported
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => { // we are passing object(LocalStrategy) and inside it we will pass some parameters, 1st parameter is object i.e. which field is username in your database.(In our database the username is email(for login)), 2nd parameter is arrow function and in this function we receive some credential like email, password and done when we login. done is a callback which can be named anything.
        // Logic for login is written here
        // 1st check if email exists in database
        const user = await User.findOne({ email: email }) // find one user in database and condition is email here should be equal to email in the database. 
        
        if(!user) { // If the user is not present in the database the call the done call back and pass null, false, and give a message to the user.
            return done(null, false, {message: 'No user with this email'})
        }
        
        // If the email matched then now we need to match the password of the user so use the bcrypt.compare()
        bcrypt.compare(password, user.password).then(match => { // Compare the password in database with the password given by the user(user.password), both password matches then then call the match()  
            if(match) { // if password matches
                return done(null, user, {message: 'LoggedIn Succesfully'}) // then call the done callback and pass null, data of the matched user, and message
            }
            return done(null, false, {message: 'Wrong Username or Password'}) // if the password does't match then run this code
        }).catch(err => { // If some error occurs at the time of compare of two password then give this error
            return done(null, false, { message: 'Something went wrong, try again!!! '})
        })
    })) 

    passport.serializeUser((user, done) => { // this 'serializeUser()' method store the state of the user after user gets loggedIn, like we store the ID of the user and with that ID we can identify that the user is logged in on not or when did he logged in. So passport gives us the option to what we want to store after user gets  logged in. We gets information about user from done() in matching the password.
        done(null, user._id) // So we call the done() and pass 1st parameter as null and 2nd parameter as what you want to store in the session. (here we wanted to store id so used 'user._id').  '_id' this is how the id is store in the database. 
    })

    passport.deserializeUser((id, done) => { // In this method we get/received what is store in the session(i.e. id is stored in the session which can be named anything (id is just a random variable name which can be anything))
        // User.findOne({ _id: id})
        User.findById(id, (err, user) => { // find the search id in the database and if found then return/give the user information of that id
            done(err, user)
        })
    })

}

module.exports = init