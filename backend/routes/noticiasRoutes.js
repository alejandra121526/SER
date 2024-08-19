import express from 'express';
import upload from '../middleware/uploadMiddleware.js'; // Asegúrate de que la ruta sea correcta
import { crear, obtenerTodas, actualizar } from '../controllers/noticiasController.js'; // Asegúrate de que la ruta sea correcta

const router = express.Router();

//para crear una noticia
router.post('/crear', upload.single('imagenUrl'), crear);

//para obtener todas las noticias
router.get('/noticias', obtenerTodas);  

//para actualizar todas las noticias
router.put('/:id', upload.single('imagenUrl'), actualizar);

export default router;
