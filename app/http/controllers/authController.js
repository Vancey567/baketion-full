const User = require('../../models/user') // Imported the exported Model from user.js
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    // Factory Function: It is a object creational pattern. Simply it is function which returns you objects
    return {
        // We will create some methods here.
        login(req, res){
            // Logics are Written in here
            res.render('auth/login')
        },
        postLogin(req, res, next) { // next is a callback, if everything is alright then we call 'next' so that we request gets processed
            // Login Logic
            passport.authenticate('local', (err, user, info) => {// 1st parameter is which is the strategy we are using (here we are using local) and 2nd parameter is a function. we are getting msg in the 'info' from the done() from file passport.js from login()
                if(err) {
                    req.flash( 'error', info.message ) // .message is the key on the object info which is being passed from done() passport.js file
                    return next(err) // if there any error then give the error
                }
                if(!user) { // If user is not available 
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.login(user, (err) => {  // If user is available and there's no error then login the given user.
                    if(err) { // And if there's any error then reflect this error
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect('/') // and if there's no error then redirect it to order page
                })
            })(req, res, next)
        },
        register(req, res){
            res.render('auth/register')
        },
        async postRegister(req, res){
            const { name, email, password } = req.body // we will receive data from req.body (body object) and we will use object destructuring. const { }, name, email, password are the fields of "register form". 
             // Validate Request i.e. We are receiving the data correctly or not if not then give the validation error
               if(!name || !email || !password) { // In 3 me se koi v chij empty hai too
                    req.flash('error', 'All fields are required') // This req.flash() must have two parameter 1st is key which caan be any thinng and 2nd is Message.
                    req.flash('name', name) // We are sending the data back so that after refresh we have the erlier inputed data present in the field and we don't need to data again and again. And we can show that data through register.ejs 
                    req.flash('email', email) // we will store this name, email data in value="" attribute using ejs tags.
                    return res.redirect('/register') // koi error aati hai upar k 3 options me too redirect kardo apne register form pe phirse
               }
               // If the email received using request already exist in database then redirect the user and give the error message that user already exist. We will not allow registeration using same email.               
               // Check if email exists
               User.exists({ email: email }, (err, result) => { // 1st parameter is the key to filter out (here if the email in the database is same with email above in the 'if' statement)
                    if(result) { // result hai database me means agar email already exists in database then give error to the user saying email already exists.
                        req.flash('error', 'Email already taken')
                        req.flash('name', name)
                        req.flash('email', email)
                        return res.redirect('/register')
                    }
               })

               // HASHED PASSWORD       we need to install a package name 'bcrypt' and import it here
               const hashedPassword = await bcrypt.hash(password, 10)
               
               // If everything is alright then create a user in database
                const user = new User({ // We are using the User Model that we have created above and in /models/user.js
                    name: name,
                    email: email,
                    password: hashedPassword // we should never store password simply, we should always keep hased password. for that we need to install a package name 'bcrypt'.
                }) 
                user.save().then((user) => {
                    // Login: after complition of registration we can redirect user to Login

                      
                    return res.redirect('/') // after complition of registration we can redirect user to homepage
                } ).catch(err => {
                    req.flash('error', 'Something went wrong')
                    return res.redirect('/')
                })
        },
        logout(req, res) {
            req.logout()
            return res.redirect('/login')
        }
    }
}

module.exports = authController