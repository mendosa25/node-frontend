const express = require('express');
const app = express();
const mongoose = require('mongoose') // connexion base de donnée 
const stuffRoutes = require('./routes/stuff');



mongoose.connect('mongodb+srv://richard:Laviedereve@cluster0.35iqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


// authorisations 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // remplace body-parser
  app.use(express.json());
  app.use(express.urlencoded({
    extended: true
  }));

  app.use('/api/stuff', stuffRoutes);

  

module.exports = app;