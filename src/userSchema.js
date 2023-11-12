const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required']
  },
  hash: {
    type: String,
    required: [true, 'Hash is required']
  },
  salt: {
    type: String,
    required: [true, 'Salt is required']
  },
  auth: {
    type: Array,
    required: [true, 'Auth is required']
  },
  created: {
    type: Date,
    required: [true, 'Created date is required']
  }
})

module.exports = userSchema;