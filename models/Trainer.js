import mongoose from 'mongoose';

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true, lowercase: true, unique: true },
  team:  [{
    name: String,
    sprite: String             
  }]
});

export default mongoose.model('Trainer', trainerSchema, 'UsersPokemon');
