const { json } = require("express")
const Menu = require('../../../models/menu')
function cartController() {
    return {
        index (req, res){
          res.render('customers/cart')
        },

        async delete(req, res) {
          // console.log(req.body);
          const _id = req.params.id;
          // let cake = await Menu.findByIdAndDelete(_id);
          sessionStorage.removeItem("_id")
          update()
          res.render('customers/cart', {cake : cake});
        },

      //   deleteProd.forEach((btn) => {
      //     btn.addEventListener('click', (e) => {
      //         let delprod = JSON.parse(btn.dataset.delprod);
      //         let pid = delprod.item._id
      //         console.log(pid);
      //         // sessionStorage.removeItem()
      //         // console.log(delprod.item._id);
      //         sessionStorage.removeItem("pid")
      //         // let cart =  JSON.parse(sessionStorage.getItem('cart')); // Problem
      //         // let newcart = cart.filter((item) => item._id != pid)
      //         // localStorage.setItem('cart', JSON.stringify(newcart))
      
      //         updateCart();
      //     })
      // })

        update(req,res){         
          // Create cart if theres no cart in the session
          if(!req.session.cart) {
            req.session.cart = {
              items:{},
              totalQty:0,
              totalPrice:0
            }
          }
          let cart = req.session.cart
            
          //check if item does not exist in cart.
          if(!cart.items[req.body._id]){
           cart.items[req.body._id]={
             item:req.body,
             qty:1
           }
           cart.totalQty=cart.totalQty + 1
           cart.totalPrice = cart.totalPrice + req.body.price
          } else { // if item exist in the cart
            cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
            cart.totalQty = cart.totalQty + 1
            cart.totalPrice = cart.totalPrice + req.body.price
          }
          return res.json({ totalQty: req.session.cart.totalQty })
        },



    }
}

module.exports = cartController