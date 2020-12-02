function authController() {
    // Factory Function: It is a object creational pattern. Simply it is function which returns you objects
    return {
        // We will create some methods here.
        login(req, res){
            // Logics are Written in here
            res.render('auth/login')
        },
        register(req, res){
            res.render('auth/register')
        }
    }
}

module.exports = authController