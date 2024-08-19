import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';

// Configuración de Cloudinary
cloudinary.v2.config({
  cloud_name: 'defqbmfhk',
  api_key: '211356155782121',
  api_secret: '23SsqmCSNZ8g4u4cU6f8j7-1vAo'
});

// Configuración de almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'uploads', // Carpeta en Cloudinary
    allowed_formats: ['jpg', 'jpeg', 'png'], // Formatos permitidos
  }
});

// Configuración de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 } // 1MB límite
});

export default upload;
