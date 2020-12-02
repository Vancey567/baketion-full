// Video 6 Time 4:39

// Importing Controller
const homeController = require('../app/http/controllers/homeController') // const name(homeController) can be anything 
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app) { // initRoutes is function name which can be anything. app is the parameter (receving the same instance of app from server.js) which is being passed here from the server.js file using the module.export()
    app.get('/', homeController().index)
    app.get('/login', authController().login)
    app.get('/register', authController().register)

    app.get('/cart', cartController().index)
    app.post('/update-cart',cartController().update)

}


// Syntax: module.exports = function_name_to_be_exported 
module.exports = initRoutes // In Nodejs every file is a module so we can export "this web.js module". Then Inport this web.js in the sever.js file. Syntax: module.exports = function_name_to_be_exported 