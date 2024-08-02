import express from "express";
const router = express.Router();

import { crear } from "../controllers/noticiasController.js"

//Autenticacion, registro y configuracion de noticias
router.post('/', crear) // crear noticias

export default router;