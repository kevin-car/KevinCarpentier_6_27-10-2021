/* Importation de l'application express et bodyparser*/
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

/* Importation du model Sauce */
const Sauce = require('./models/Sauce');
const myPassword =require('./password.js')

/* Importation de l'application express */
const app = express();

/* Importation des routes */
const saucesRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user')

/* Importation du module pour l'accès au dossier  */
const path = require('path')

/* Connexion à la base de donnée MangoDB */
mongoose.connect('mongodb+srv://kevin:'+ myPassword.password +'@cluster0.rhi97.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));  

/* CORS - règles de sécurité  */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
}); 

/* Conversion des fichiers JSON pour l'import de données */
app.use(bodyParser.json());

/* Autorisation de Importation de l'image */
app.use('/images',express.static(path.join(__dirname,'images')));

/* Utilisation des routes contenu dans le fichier de route --> stuff.js */
app.use('/api/sauces/', saucesRoutes);
app.use('/api/auth', userRoutes);
 
/* Exporter le module app pour le server.js */
module.exports = app;

