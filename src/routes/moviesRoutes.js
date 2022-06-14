import express from "express";
import moviesController from "../controllers/moviesController.js";

const router = express.Router();

router.get("/movies", moviesController.list);
router.get("/movies/new", moviesController.new);
router.get("/movies/recommended", moviesController.recomended);
router.get("/movies/detail/:id", moviesController.detail);

router.get("/movies/add", moviesController.add);
router.post("/movies/create", moviesController.create);

router.get("/movies/edit/:id", moviesController.edit);
router.post("/movies/update/:id", moviesController.update);

router.get("/movies/delete/:id", moviesController.delete);
router.post("/movies/delete/:id", moviesController.destroy);
router.post("/movies/search", moviesController.search);

export default router;
