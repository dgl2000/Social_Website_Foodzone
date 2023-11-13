const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema({
    pid: {
        type: Number,
        required: [true, 'Pid is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    text: {
        type: String,
        required: [false, 'Text is optional']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    comments: {
        type: Array,
        required: [false, 'Comments is required']
    },
})

module.exports = articleSchema;