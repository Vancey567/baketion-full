// This will Fetch data of homepage from database
const Menu = require('../../models/menu')

function homeController() {
    // Factory Function: It is a object creational pattern. Simply it is function which returns you objects
    return {
        // We will create some methods here.
        async index(req, res){
           // Logics are Written in here
            const pizzas = await Menu.find()
            console.log(pizzas)
            return res.render('home', {pizzas : pizzas})
        }

        // This is called using normal method
        // index(req, res) {
        //     Menu.find().then( function(pizzas) {
        //         console.log(pizzas)
        //         return res.render('home', { pizzas : pizzas }) // First pizzas is key and the 2nd pizzas is array of objects
        //     })
        // }
    }
}


module.exports = homeController