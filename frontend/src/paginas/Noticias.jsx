import { useState, useEffect } from 'react';
import Alerta from '../components/Alerta';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Noticias = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [imagenUrl, setImagenUrl] = useState(null);
  const [alerta, setAlerta] = useState({});
  const [noticias, setNoticias] = useState([]);
  const [editarNoticia, setEditarNoticia] = useState(null); // Estado para la noticia a editar
  const navigate = useNavigate();

  // Función para obtener las noticias
  const fetchNoticias = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/noticias');
      setNoticias(response.data);
    } catch (error) {
      console.error('Error al obtener noticias:', error);
    }
  };

  // Función para crear una noticia
  const crearNoticia = async () => {
    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      if (imagenUrl) {
        formData.append('imagenUrl', imagenUrl);
      }

      const response = await axios.post('http://localhost:4000/api/noticias/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);
      setAlerta({
        msg: response.data.message,
        error: false,
      });

      // Limpiar campos
      setTitulo('');
      setDescripcion('');
      setImagenUrl(null);
      // Volver a cargar las noticias
      fetchNoticias();
      navigate('/InicioSer');
    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response) {
        setAlerta({
          msg: error.response.data.message,
          error: true,
        });
      } else {
        setAlerta({
          msg: 'Error al guardar la noticia',
          error: true,
        });
      }
    }
  };

  // Función para actualizar una noticia
  const actualizarNoticia = async () => {
    try {
      const formData = new FormData();
      formData.append('titulo', titulo);
      formData.append('descripcion', descripcion);
      if (imagenUrl) {
        formData.append('imagenUrl', imagenUrl);
      }

      // Asegúrate de incluir el identificador de la noticia en la URL
      const response = await axios.put(`http://localhost:4000/api/noticias/${editarNoticia._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Respuesta del servidor:', response.data);
      setAlerta({
        msg: response.data.message,
        error: false,
      });

      // Limpiar campos y estado de edición
      setTitulo('');
      setDescripcion('');
      setImagenUrl(null);
      setEditarNoticia(null);
      // Volver a cargar las noticias
      fetchNoticias();
    } catch (error) {
      console.error('Error en la solicitud:', error);
      if (error.response) {
        setAlerta({
          msg: error.response.data.message,
          error: true,
        });
      } else {
        setAlerta({
          msg: 'Error al actualizar la noticia',
          error: true,
        });
      }
    }
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if ([titulo, descripcion].includes('') || (editarNoticia && !imagenUrl && !editarNoticia.imagenUrl)) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    setAlerta({});
    if (editarNoticia) {
      actualizarNoticia();
    } else {
      crearNoticia();
    }
  };

  // Manejo del cambio de imágenes
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagenUrl(file);
  };

  // Cargar noticias al montar el componente
  useEffect(() => {
    fetchNoticias();
  }, []);

  // Función para preparar la noticia para edición
  const editarNoticiaHandler = (noticia) => {
    setEditarNoticia(noticia);
    setTitulo(noticia.titulo);
    setDescripcion(noticia.descripcion);
    setImagenUrl(null); // Resetear imagen en edición
  };

  const { msg } = alerta;

  return (
    <div className="flex bg-gray-100 justify-center items-center">
      <div className="w-full max-w-3xl px-4 py-8">
        <form
          className="bg-white shadow-lg rounded-lg p-8"
          onSubmit={handleSubmit}
        >
          <div className="text-center mb-6">
            <h1 className="text-azuloscuro text-3xl font-black">
              {editarNoticia ? 'Editar Noticia' : 'Crear Noticia'}
            </h1>
          </div>
          {msg && <Alerta alerta={alerta} />}
          <div className="my-5">
            <label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="titulo"
            >
              Título
            </label>
            <input
              id="titulo"
              type="text"
              placeholder="Título de la noticia"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              placeholder="Descripción de la noticia"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label
              className="uppercase text-primary block text-lg font-bold"
              htmlFor="imagenUrl"
            >
              Imagen
            </label>
            <input
              id="imagenUrl"
              type="file"
              className="w-full mt-2 p-3 border rounded-xl bg-gray-50"
              onChange={handleImageChange}
            />
          </div>
          <input
            type="submit"
            value={editarNoticia ? 'Actualizar Noticia' : 'Crear Noticia'}
            className="bg-azuloscuro w-full py-2 text-white uppercase font-bold rounded-xl hover:bg-primary transition-colors"
          />
          {editarNoticia && (
            <button
              type="button"
              onClick={() => setEditarNoticia(null)}
              className="bg-red-600 w-full py-2 text-white uppercase font-bold rounded-xl mt-4 hover:bg-red-500 transition-colors"
            >
              Cancelar
            </button>
          )}
        </form>

        {/* Mostrar noticias */}
        <div className="mt-8">
          <h2 className="text-azuloscuro text-2xl font-bold">Noticias Publicadas</h2>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {noticias.length === 0 ? (
              <p>No hay noticias publicadas.</p>
            ) : (
              noticias.map((noticia) => (
                <div key={noticia._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <h3 className="text-xl font-semibold">{noticia.titulo}</h3>
                  <p className="mt-2 text-sm text-gray-700">{noticia.descripcion}</p>
                  {noticia.imagenUrl && (
                    <img
                      src={noticia.imagenUrl}
                      alt={noticia.titulo}
                      className="mt-4 w-full h-auto"
                    />
                  )}
                  <button
                    onClick={() => editarNoticiaHandler(noticia)}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noticias;
