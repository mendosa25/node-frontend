const express = require("express");
const app = express();

const mongoose = require("mongoose"); // connexion base de données
// configuration mongoose (évite message erreur dans la console)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

const uri = "mongodb+srv://richard:Laviedereve@cluster0.35iqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
  .connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// authorisations
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// remplace body-parser
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/stuff", stuffRoutes); // toutes les requetes stuff
app.use("/api/auth", userRoutes);


module.exports = app;
