// Client Code will be written here 
import axios from 'axios' //getting from node module folder
import Noty from 'noty'


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
    // AJEX call using axios library. Install it using 'yarn add axios' and import it above this page to use it.
    axios.post('/update-cart',pizza).then(res => { //post because we will send data. '/update-cart' is the url name which is not created yet so create the route in the routes/web.js . 'pizza' is the data we want to send(from above). If the request is successsful then we will get a response.
        cartCounter.innerText = res.data.totalQty

        new Noty({ // This(Noty) will give a notification after successfull addition of item in cart
            type: 'success', // It will give green color to the notification
            timeout: 1000, // The messege will hide after 1 sec
            text: 'Item added to cart',
            progressBar: false, // This will remove the progress bar from the notification.
            layout: "topLeft" // This will position the notification bar to the top left corner of the screen
        }).show();

    }).catch(err => {  // If there's any error then we will give notification of this block
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
        })
    })
}


addToCart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{ // e is the event

        // This code will add the pizza onclick in the session or cart
        // Geting the value of pizza from home.ejs here on click of button
        let pizza = JSON.parse(btn.dataset.pizza) // parsing JSON string to object 
        updateCart(pizza)
        console.log(e)
    })
})

// import axios from 'axios'
// import Noty from 'noty'

// let addToCart = document.querySelectorAll('.add-to-cart')
// let cartCounter = document.querySelector('#cartCounter')

// function updateCart(pizza) {
//     axios.post('/update-cart', pizza).then(res => {
//         cartCounter.innerText = res.data.totalQty
//         new Noty({
//             type: 'success',
//             timeout: 1000,
//             text: 'Item added to cart',
//             progressBar: false,
//         }).show();
//     }).catch(err => {
//         new Noty({
//             type: 'error',
//             timeout: 1000,
//             text: 'Something went wrong',
//             progressBar: false,
//         }).show();
//     })
// }

// addToCart.forEach((btn) => {
//     btn.addEventListener('click', (e) => {
//         let pizza = JSON.parse(btn.dataset.pizza)
//         updateCart(pizza)
//     })
// })