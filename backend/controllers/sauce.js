const Sauce = require ('../models/Sauce')
/* Importation du module file system pour Multer */
const fs = require('fs');
const { exec } = require('child_process');
const { db, findOne } = require('../models/Sauce');
/* Création d'un nouveau produit */
exports.createSauce = (req, res, next) => {
    /* MULTER inclusion de l'image dans la requète */
    const sauceObject = JSON.parse(req.body.sauce)
/*     Création selon le model 
 */     delete sauceObject._id;
   const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    /* Enregistrement dans la BDD */
    sauce.save()
      .then(() => res.status(201).json({ message: 'la sauce est enregistré !'}))
      .catch(error => res.status(400).json({ error }));
}

/* Modification d'un objet existant avec l'ID en paramètre */
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

/* suppression de l'élément en paramètre ID et suppression de son image */
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'La sauce a été supprimé !'}))
          .catch(error => res.status(400).json({ error }))
      });
    })
    .catch(error => res.status(500).json({ error }))
};

exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }))
}

exports.getAllSauces = (req, res, next) => {
    Sauce.find()
      .then(sauces => res.status(200).json(sauces))
      .catch(error => res.status(400).json({ error }))
  }

exports.likeSauces = (req, res) => {
  /* Si le client Like cette sauce */
  if(req.body.like === 1){
    Sauce.findOneAndUpdate( 
      { _id : req.params.id },
      {$inc: { likes: 1 }, 
      $push: {usersLiked: req.body.userId}})
    .then(() => res.status(200).json({ message: 'Like ajouté !'}))
    .catch(error => res.status(400).json({ error }))
  /* Si le client disike cette sauce */
  } else if (req.body.like === -1) {
    Sauce.findOneAndUpdate( 
      { _id : req.params.id },
      {$inc: { dislikes: 1 }, 
      $push: {usersDisliked: req.body.userId}})
    .then(() => res.status(200).json({ message: 'Dislike ajouté !'}))
    .catch(error => res.status(400).json({ error }))
  /* Si le client annule son choix */
  } else {
    Sauce.findOne({ _id: req.params.id })
    .then(resultat => {
      if(resultat.usersLiked.includes(req.body.userId)){
        Sauce.findOneAndUpdate(
          { _id : req.params.id },
          {$inc: { likes: -1 }, 
          $pull: {usersLiked: req.body.userId}})
          .then(() => res.status(200).json({ message: 'like retiré !'}))
          .catch(error => res.status(400).json({ error }))
      } 
      else if(resultat.usersDisliked.includes(req.body.userId)){
        Sauce.findOneAndUpdate( 
          { _id : req.params.id },
          {$inc: { dislikes: -1 }, 
          $pull: {usersDisliked: req.body.userId}})
          .then(() => res.status(200).json({ message: 'dislike retiré !'}))
          .catch(error => res.status(400).json({ error }))
        }
    })
  }
} 