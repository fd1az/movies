import express from "express";
import genresAPIController from "../../controllers/api/genreApiController.js";

const router = express.Router();
//Rutas
//Listado de todos los generos
router.get("/", genresAPIController.list);

export default router;
