const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  type: String,
  msg: String,
});

module.exports = mongoose.model('Message', messageSchema);