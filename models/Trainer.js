const mongoose = require('mongoose');

const TrainerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  team: [
    {
      name: String,
      sprite: String,
    }
  ]
});

module.exports = mongoose.model('Trainer', TrainerSchema);
