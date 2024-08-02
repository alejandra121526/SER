//const express = require("express");
import express from "express";
import conectarDB from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors"
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'
import noticiasRouter from './routes/noticiasRoutes.js'

const app = express();
app.use(express.json())//hacer qeu aparezcan los datos que se ponen en postman

dotenv.config();
conectarDB();

// configurar cors
const whitelist =[process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback){
        if (whitelist.includes(origin)) {
           //Puede consultar la API
           callback(null, true)
        }else{
            // No esta permitido el req
            callback(new Error("Error de cors"))
        }
    }
}
app.use(cors(corsOptions))

//Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)
app.use('/api/noticias', noticiasRouter)

const PORT = process.env.PORT || 4000;
app.listen(4000, () => {
    console.log(`servidor corriendo p 4000 ${PORT}`)
});