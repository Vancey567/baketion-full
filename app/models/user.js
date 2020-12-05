const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userScheme = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Each user should have unique email ID. CHecks in daatbse for the uniqness of the email
    password: { type: String, required: true },
    role: { type: String, default: 'customer' } // In our app we have two type of role 1. customer, 2. Admin
}, { timestamps: true }) // This will log the time and date of usere registerationn in database

module.exports = mongoose.model('user', userScheme)