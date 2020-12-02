function cartController() {
    // Factory Function: It is a object creational pattern. Simply it is function which returns you objects
    return {
        // We will create some methods here.
        index(req, res){
            // Logics are Written in here
            res.render('customers/cart')
        },
        update(req, res) { // This is for updating items in cart when we add items in cart. 
            // below we will calculate the Details of items added in cart
            // let cart = { // This is the example
            //     items: {
            //         pizzaId: {item: pizzaObject, qty:0}, // This is the pizzaId of the objects(pizza) we added in our cart. qty is the quantity you want to buy
            //     },
            //     totalQty: 0,
            //     totalPrice: 0
            // }

            // for the first time creating cart and adding basic object structure
            // if we do not have a cart then create an empty cart
            if(!req.session.cart) { // In the request object check whether the sessions has the cart key, If not then 
                req.session.cart = { // create req.session.cart named variable or property and store a object in it. 
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart // all items, totalqty, totalprice everything will be stored in the cart.
            // console.log(req.body)
            // check if items doesnot exist in cart 
            if(!cart.items[req.body._id]){ // we are getting this 'req.body._id' from client addtocart fuction updatecart(pizza) in app.js. pizza has body and it has id in it  
                cart.items[req.body._id] = { // If there's no items in the cart then when we will add items in the cart with that totalqty, totalprice every thing will be incremented
                    items: req.body,
                    qty: 1,
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price // Jitnin v total price already cart me hai usme current pizza ki price add kardo
            } else{ // if Jo v pizza hum add karna chahte hai wo already cart me hai then only increase it's quantity
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1 // already jitni qty hai usme 1 add kardo.
                cart.totalQty = cart.totalQty + 1 // already jitni totalQty hai usme ek pizza aur add kardo
                cart.totalPrice = cart.totalPrice + req.body.price // already jitni totalPrice hai usme current added pizza ki price aur add kardo
            }
            // Now GO check in database for sessions and if the totalQty, totalprice is there incrementing or not.
            // Then we will update totalQty in our cart icon.

            return res.json({ totalQty: req.session.cart.totalQty})
        }
    }
}

module.exports = cartController