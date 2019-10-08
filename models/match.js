const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
  userId: String,
  gameId: String,
  winnerId: String,
});

module.exports = mongoose.model('Match', matchSchema);