import express from "express";
import moviesAPIController from "../../controllers/api/movieApiController.js";

const router = express.Router();
//Rutas
//Listado de todos los generos
router.get("/", moviesAPIController.list);
router.get("/:id", moviesAPIController.detail);
router.put("/:id", moviesAPIController.update);

export default router;
