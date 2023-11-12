const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    headline: {
        type: String,
        required: [false, 'Headline is optional']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    zipcode: {
        type: String,
        required: [true, 'Zipcode is required']
    },
    dob: {
        type: String,
        required: [true, 'Date of birth is required']
    },
    avatar: {
        type: String,
        required: [false, 'Avatar is optional']
    },
    following: {
        type: Array,
        default: [],
        required: [false, 'Following is optional']
    }
})

module.exports = profileSchema;