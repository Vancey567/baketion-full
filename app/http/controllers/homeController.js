const Menu = require('../../models/menu')
const Pastry = require('../../models/pastry')

function homeController() {
    return {
        async index(req, res){
            const cakes = await Menu.find() // get all the cakes
            // const pastrys = await Pastry.find()
            return res.render('home', {cakes : cakes}) // 1st is key and 2nd is cakes received from database
        }
        // async Pastry(req, res) {
        //     const pastrys = await Pastry.find()
        //     return res.render('home', {pastrys : pastrys})
        // }
    }
}

module.exports = homeController