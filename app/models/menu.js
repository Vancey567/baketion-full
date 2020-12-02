// The name in the database should be plural i.e. if name of the file in the models
// is menu.js then the database name should be "menus"  i.e. plural(s)
const mongoose = require('mongoose')
const Schema = mongoose.Schema // Capital "S" in javascript defines that the It will store either class or constructor function

// Creating Schema or skeleton or blue print
const menuSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true}, // We never keep raw img or raw data in database but we keep the img/data in storage and give its path or url 
    price: {type: Number, required: true},
    size: {type: String, required: true}
})

// const menuSchema = new Schema({
//     name: { type: String, required: true },
//     image: { type: String, required: true },
//     price: { type: Number, required: true },
//     size: { type: String, required: true }
// })

// Creating model after schema
const Menu = mongoose.model('Menu', menuSchema)// 1st is modelName, should start with Capital letter and is singular here but it will create the collection with same name in database but will have plural name. 2nd paramter is the schema name


module.exports = Menu // mongoose.model('Menu', menuSchema) removing all the above code simply this can be passed