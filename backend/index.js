import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import usuarioRoutes from './routes/usuarioRoutes.js';
import proyectoRoutes from './routes/proyectoRoutes.js';
import tareaRoutes from './routes/tareaRoutes.js';
import noticiasRoutes from './routes/noticiasRoutes.js';


const app = express();
app.use(express.json()); // Permite recibir datos en formato JSON

dotenv.config();
conectarDB();

// Configuración CORS
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Error de CORS"));
        }
    }
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // Para manejar datos urlencoded

// Routing
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/proyectos', proyectoRoutes);
app.use('/api/tareas', tareaRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/', noticiasRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
