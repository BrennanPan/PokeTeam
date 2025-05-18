import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import trainerRouter from './routes/trainerRouter.js';

console.log('cwd  =', process.cwd());
console.log('URI  =', JSON.stringify(process.env.MONGODB_URI));

const app  = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
.then(() => {
  console.log('MongoDB connected');

  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(process.cwd(), 'public')));
  app.use('/', trainerRouter);
  app.use((req, res) => res.status(404).render('404'));

  app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
  );
}).catch(err => {
  console.error('connecting to MongoDB has error:', err);
});

