const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  user: String,
  game: String,
  winner: String,
});

module.exports = mongoose.model('Match', matchSchema);