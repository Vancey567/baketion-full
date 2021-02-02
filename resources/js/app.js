import axios from 'axios'
import Noty from 'noty' 
import { initAdmin } from './admin'
import moment from 'moment'
import { session } from 'passport'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelectorAll('#cartCounter')

let prodimg = document.querySelectorAll("#prodimg");
let deleteProd = document.querySelectorAll("#deleteProd");

const hamburger = document.querySelector('.hamburger');
const navlinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

// const toggleOptions = document.querySelector('#option');
// const optionsDiv = document.querySelector('.optionsDiv');

// toggleOptions.addEventListener('click', () => {
//     if (optionsDiv.style.display === 'none') {
//         optionsDiv.style.display = 'block'
//     } else {
//         optionsDiv.style.display = 'none'
//     }
// })


hamburger.addEventListener('click', () => {
    navlinks.classList.toggle('open');
    links.forEach(link => {
        link.classList.toggle('fade');
    });
});

function updateCart(cake) {
    axios.post('/update-cart', cake).then(res => {
        cartCounter.innerText = res.data.totalQty

        new Noty({
            type: 'success',
            timeout: 1000,
            text: 'Item added to cart',
            progressBar: false,
            layout: "topLeft"
        }).show();

    }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something went wrong',
            progressBar: false,
            layout: "topLeft"
        }).show();
    })
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e)=>{
        let cake = JSON.parse(btn.dataset.cake)
        updateCart(cake)
    })
})

// Remove alert message after 2 seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 2000)
}


// Changing order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order =  hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if(stepCompleted) {
            status.classList.add('step-completed')
        }
        if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updateAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')                
            }
        }
    })
}

updateStatus(order);

// Socket
let socket = io()

// Join
if (order) {
    socket.emit('join', `order_${order._id}`)    
}

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')) {
    initAdmin(socket)
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updateAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)

    new Noty({
        type: 'success',
        timeout: 1000,
        text: 'Order updated',
        progressBar: false,
        layout: "topLeft"
    }).show();
})

// $('.owl-carousel').owlCarousel({
//     loop:true, // loops the 1st and last carousel
//     margin: 10,
//     nav:false,
//     dots:true,
//     stagedPadding: true,
//     autoplay: true,
//     autoplayTimeout: 3000,
//     mouseDrag: true,
//     // autoWidth: true,
//     // autoHeight: true,
//     responsive:{
//         0:{
//             items:1
//         },
//         600:{
//             items:2
//         },
//         1000:{
//             items:4
//         },
//         1400:{
//             items:6
//         }
//     }
// })


// Product detail page
prodimg.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let prod = JSON.parse(btn.dataset.prod)
        console.log(prod);
        
    })
})

// function removeProd(prodid) {
//     let cart =  JSON.parse(localStorage.getItem('cart'));
//     let newcart = cart.filter((items) =>  session.items.prod = !prodid)
//     localStorage.setItem('cart', JSON.stringify(newcart))
//     updateCart(); 
// }

// deleteProd.forEach((btn) => {
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