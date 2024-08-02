// src/components/CrearNoticiaForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const noticias = () => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [imagenUrl, setImagenUrl] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const formData = {
            titulo,
            descripcion,
            imagenUrl
        };

        try {
            const response = await axios.post('http://localhost:4000/api/noticias', formData);
            alert('Noticia creada con éxito');
            setTitulo('');
            setDescripcion('');
            setImagenUrl('');
        } catch (error) {
            console.error('Error al crear noticia:', error);
            setError('Hubo un problema al crear la noticia. Intenta de nuevo.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="titulo">Título</label>
                <input
                    type="text"
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="descripcion">Descripción</label>
                <textarea
                    id="descripcion"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                ></textarea>
            </div>

            <div>
                <label htmlFor="imagenUrl">URL de la Imagen</label>
                <input
                    type="url"
                    id="imagenUrl"
                    value={imagenUrl}
                    onChange={(e) => setImagenUrl(e.target.value)}
                />
            </div>

            <button type="submit">Crear Noticia</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default noticias;

