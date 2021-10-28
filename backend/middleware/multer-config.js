const multer = require('multer');

/* Permet de recupérer les type mimes */
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

/* Fonction d'enregistrement de fichier avec la destination*/
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
      /* Remplacer les espaces par des _ */
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    /* Renommer le fichier avec son nom d'origine + date + extension */
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');