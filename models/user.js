const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  handle: String,
  email: String,
});

module.exports = mongoose.model('User', userSchema);