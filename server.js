require('dotenv').config() // This dotenv should be at the top and it is used for cookies, process.env and  session 
const express = require('express')
const app = express()
const path  = require('path')
const ejs = require('ejs')
const expressLayout = require("express-ejs-layouts") // Helps in using same code on different pages by creating layouts of certain parts like navbar, body, footer. For that create a file naming layout.ejs in views folder of the projects
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash') // Here it is used as middleware below :)
const MongoDbStore = require('connect-mongo')(session) // we are taking session from above

const PORT = process.env.PORT || 3000 // If there is  any PORT variable inside the environment variable then it will use this else use 3000 "||"" means OR


// connecting to Database
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database connected...');
}).catch(err => {
    console.log('connection Failed...')
});


// Session store
let mongoStore = new MongoDbStore({
    // It is using a connection to connect to our default database and in our database a new table/collection will be created with 'name session' and it will store the "sessions" in it.
    mongooseConnection: connection, // It is using a connection to connect to our default database. Here we will have or database connection name for now which is already inherited in "connection"
    collection: 'sessions'// 'sessions' is just a random name. In our database a new table/collection will be created with 'name session' and it will store the "sessions" in it. Here we will tell which collection should be in the database because it will create a table in the database and it will store "sessions" in that table.
})


// Sessions config          // Session is valid till the time cookie is value
app.use(session({
    secret: process.env.COOKIE_SECRET, // COOKIE_SECRET is the variable containing some secrets stored in .env file It will take that secret value and assign it here in the session
    resave: false,
    store: mongoStore, // It will store all the session in the database having table/collection named mongoStore.  
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // This is cookies life till it will be valid. And it takes time in millisec (1000 * 60 * 60 * 24)this is approx 24hrs
    // Session is valid till the time co0kie is value
    // cookie: {maxAge: 1000 * 10} // It will expire in 15 sec
})) 

// 
app.use(flash());



// Server gives us response in text/html. then we will have to tell the express that for css file give the response in css only.
// For that we need to tell the express that where the assets are being kept
// Assets
app.use(express.static('./public/')) // Without this it will give MIME error. It will tell the 
app.use(express.json())

// Global middleware for frontend(layout.ejs-> to show nos. of items in cart dynamically on cart icon in navbar)
// app.use((req, res, next) => { // next is a call back, if everything is fine then we will call this.
//     res.locals.session = req.session //we will mount sessions on locals, which(sessions) we will get from request. This will give error we will not give next statement.
//     next() // Without calling this we will get error. calling next() is compulsary after middleware(above) code
// })

// Global middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

// Set Template Engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')

// This app.get code must be written after the Template Engine else it will give error while loading the layouts of the page from the package
// Import the moules exported from the "web.js" fiile
require('./routes/web')(app) // require('./routes/web') is a function. (returning function from web.js) which can be called using "()" two parenthesis. We are passing the instance of "app" to the initRotes function in "web.js" file

app.listen(PORT, (req,res)=>{
    console.log(`Listining on PORT ${PORT}`)
})