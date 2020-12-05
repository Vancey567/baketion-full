// Video 6 Time 4:39

// Importing Controller
const homeController = require('../app/http/controllers/homeController') // const name(homeController) can be anything 
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middleware/guest')

function initRoutes(app) { // initRoutes is function name which can be anything. app is the parameter (receving the same instance of app from server.js) which is being passed here from the server.js file using the module.export()
    app.get('/', homeController().index)
    app.get('/login', guest, authController().login) // Both login and register page will have middleware named 'guest' which will stop already loggedIn user to go to login or register page.
    app.post('/login', authController().postLogin)
    app.get('/register', guest, authController().register) // To go to login or register page it is compulsary for a user not to be loggedIn
    app.post('/register', authController().postRegister)
    app.post('/logout', authController().logout)

    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)

}


// Syntax: module.exports = function_name_to_be_exported 
module.exports = initRoutes // In Nodejs every file is a module so we can export "this web.js module". Then Import this web.js in the sever.js file. Syntax: module.exports = function_name_to_be_exported 