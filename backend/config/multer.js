// // config/multer.js
// const multer = require('multer');
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinary = require('./cloudinary');

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'uploads',
//     allowedFormats: ['jpg', 'jpeg', 'png']
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

// const multer = require('multer');
// const path = require('path');

// // Configuración de almacenamiento
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   },
// });

// // Filtro de archivos
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('imagenUrl/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Solo se permiten imágenes'), false);
//   }
// };

// // Exportar el middleware de Multer
// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });

// module.exports = upload;
