function guest(req, res, next) { // Since it is a middleware therefor we will receive this req, res, next
    if(!req.isAuthenticated()) {// This Checks if user is not loggedIn then process next(), passport gives this isAuthenticated() method with the help of which we can check whether the user is loggedIn or not 
        return next()
    }
    return res.redirect('/') // If user is already loggedIn then redirect it to homepage
}


module.exports = guest