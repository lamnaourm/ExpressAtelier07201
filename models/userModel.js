const mongoose = require('mongoose');
const {Schema} = require('mongoose');


const user = new Schema({
    login: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firstname: String,
    lastname: String,
    password: String,
}, {collection: 'users'}); 

module.exports = mongoose.model('users', user, 'users');