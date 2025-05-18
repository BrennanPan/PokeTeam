const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  team: [
    {
      name: String,
      sprite: String
    }
  ]
});

module.exports = mongoose.model('Trainer', trainerSchema, 'trainers');
