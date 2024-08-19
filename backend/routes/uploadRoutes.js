import express from 'express';
import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import 'dotenv/config'; // Carga las variables de entorno desde .env
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// Configura Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configura Multer para usar Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Nombre de la carpeta en Cloudinary
    allowed_formats: ['jpg', 'png'], // Formatos permitidos
    public_id: (req, file) => file.originalname.split('.')[0], // Nombre del archivo
  },
});

const upload = multer({ storage: storage });

// Ruta para subir la imagen
router.post('/noticias/crear', upload.single('imagenUrl'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No se ha subido ninguna imagen.' });
  }

  // URL de la imagen subida en Cloudinary
  const imageUrl = req.file.path;

  res.status(200).json({
    message: 'Imagen subida con éxito.',
    imageUrl: imageUrl,
  });
});


export default router;
