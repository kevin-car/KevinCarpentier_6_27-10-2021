const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  userId:        {type: String, required: true }, 
  name:          {type: String, required: true }, // nom de la sauce
  manufacturer:  {type: String, required: true }, // fabricant de la sauce
  description:   {type: String, required: true }, // description de la sauce
  mainPepper:    {type: String, required: true }, // principal ingrédient épicé de la sauce
  imageUrl:      {type: String, required: true }, // photo de la sauce 
  heat:          {type: Number, required: true }, // taux compris entre 1 et 10 selon le piquant de la sauce
  likes:         {type: Number, required: true, default : 0 }, // nombre de personnes qui ont liké la sauce
  dislikes:      {type: Number, required: true, default : 0 }, // nombre de personne qui ont disliké la sauce
  usersLiked:    {type: Array, required:true  }, // tableau des identifiants des utilisateurs qui ont aimé (= liked) la sauce
  usersDisliked: {type: Array, required:true }, // tableau des identifiants des utilisateurs qui n'ont pas aimé (= disliked) la sauce
});

module.exports = mongoose.model('Sauce', sauceSchema); 