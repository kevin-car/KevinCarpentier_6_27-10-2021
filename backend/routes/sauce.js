const express = require('express');
const router = express.Router();

 
/* Importation des modules crées et utilisés par nos routes  */
const sauceCtrl = require('../controllers/sauce')
const auth = require('../middleware/auth');
const multer = require ('../middleware/multer-config')

/* Création d'un nouveau produit */
router.post('/', auth, multer, sauceCtrl.createSauce);

/* Modification d'un objet existant avec l'ID en paramètre */
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

/* Supprimer un élément précis avec l'ID en paramètre */
router.delete('/:id', auth, sauceCtrl.deleteSauce);

/* Afficher une page fiche produit avec l'ID en paramètre  */
router.get('/:id', auth, sauceCtrl.getOneSauce);

/* Récupération de tous les objets (page d'accueil) */
router.get('/', auth, sauceCtrl.getAllSauces);

/* Récupération de tous les objets (page d'accueil) */
router.post('/:id/like', auth, sauceCtrl.likeSauces);

/* Exporter le module router pour les routes */
module.exports = router;