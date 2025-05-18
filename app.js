const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
/*
require('dotenv').config({
  path: path.resolve(__dirname, 'credentialsDontPost', '.env'),
});
*/
const trainerRouter = require('./routes/trainerRouter');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
  .then(() => {
    console.log('MongoDB connected');

    app.set('view engine', 'ejs');
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/', trainerRouter);

    app.use((req, res) => res.status(404).render('404'));

    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    );
  })
  .catch(err => {
    console.error('Connecting to MongoDB error:', err);
  });
