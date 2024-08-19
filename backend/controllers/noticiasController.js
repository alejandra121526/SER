import Noticia from '../models/Noticias.js';

// Crear una noticia
export const crear = async (req, res) => {
  try {
    const { titulo, descripcion } = req.body;

    // Verifica si hay un archivo de imagen subido
    if (!req.file) {
      return res.status(400).json({ message: 'No se ha subido ninguna imagen.' });
    }

    // URL de la imagen subida en Cloudinary
    const imagenUrl = req.file.path;

    // Crear una nueva noticia
    const nuevaNoticia = new Noticia({
      titulo,
      descripcion,
      imagenUrl
    });

    // Guardar la noticia en la base de datos
    await nuevaNoticia.save();

    res.status(201).json({
      message: 'Noticia creada con éxito',
      data: nuevaNoticia
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la noticia' });
  }
};

// Obtener todas las noticias
export const obtenerTodas = async (req, res) => {
  try {
    const noticias = await Noticia.find(); // Obtener todas las noticias de la base de datos
    res.status(200).json(noticias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las noticias.' });
  }
};

// Actualizar una noticia
export const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion } = req.body;

    // Verifica si hay un archivo de imagen subido
    let imagenUrl = req.file ? req.file.path : undefined;

    // Encuentra la noticia por ID y actualiza
    const noticiaActualizada = await Noticia.findByIdAndUpdate(id, {
      titulo,
      descripcion,
      imagenUrl: imagenUrl ? imagenUrl : undefined
    }, { new: true });

    if (!noticiaActualizada) {
      return res.status(404).json({ message: 'Noticia no encontrada.' });
    }

    res.status(200).json({
      message: 'Noticia actualizada con éxito',
      data: noticiaActualizada
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la noticia' });
  }
};
