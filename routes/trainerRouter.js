import { Router } from 'express';
import fetch from 'node-fetch';
import Trainer from '../models/Trainer.js';

const router = Router();

router.get('/', (req, res) => res.render('index'));

router.post('/add', async (req, res) => {
  const { trainerName, pokemonName } = req.body;
  if (!trainerName || !pokemonName) return res.redirect('/');

  try {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`);
    if (!resp.ok) throw new Error('Pokémon not found');
    const data = await resp.json();

    const sprite = data.sprites.front_default;
    const filter = { name: trainerName.toLowerCase() };
    const update = { $addToSet: { team: { name: data.name, sprite } } };
    const opts = { returnDocument: 'after', upsert: true };
    const trainer = await Trainer.findOneAndUpdate(filter, update, opts);

    const facts = {
      name: data.name,
      id: data.id,
      types: data.types.map(t => t.type.name),
      height: data.height,
      weight: data.weight,
      sprite
    };

    res.render('add-result', { trainer, facts, error: null });
  } catch (err) {
    res.render('add-result', { trainer: null, facts: null, error: err.message });  }
});

router.post('/team', async (req, res) => {
  const { trainerName } = req.body;
  if (!trainerName) return res.redirect('/');

  const trainer = await Trainer.findOne({ name: trainerName.toLowerCase() });
  res.render('team', { trainerName, trainer });
});

export default router;
