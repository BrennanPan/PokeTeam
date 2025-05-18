# PokéTeam Builder

A tiny Node.js / Express / MongoDB app that lets trainers build and view their Pokémon teams using data from the public **PokéAPI**.

## Features
* Add any Pokémon to a trainer’s team (max 1 per Pokémon, max 6 recommended)
* Team data persisted in MongoDB (one document per trainer)
* Live Pokémon facts (types / height / weight / sprite) fetched from https://pokeapi.co
* Clean retro styling with a Google Font
* Deployed for free on Render

## Running locally
```bash
git clone https://github.com/yourname/pokemon-team.git
cd pokemon-team
npm install
echo "MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.mongodb.net/pokemon" > .env
npm start
