import { useEffect, useState } from 'react';
import axios from 'axios';

const InicioSer = () => {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/noticias');
        setNoticias(response.data);
      } catch (error) {
        console.error('Error al obtener noticias:', error);
      }
    };

    fetchNoticias();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {noticias.map((noticia) => (
        <div
          key={noticia._id}
          className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
        >
          <div className="flex flex-col flex-grow p-4">
            <h2 className="text-2xl font-bold">{noticia.titulo}</h2>
            <p className="mt-2 flex-grow">{noticia.descripcion}</p>
            {noticia.imagenUrl && (
              <div className="mt-4 flex-grow">
                <img 
                  src={noticia.imagenUrl} 
                  alt={noticia.titulo} 
                  className="w-full h-auto object-contain" 
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default InicioSer;


