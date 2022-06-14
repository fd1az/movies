import express from "express";
import genresController from "../controllers/genresController.js";

const router = express.Router();

router.get("/genres", genresController.list);
router.get("/genres/detail/:id", genresController.detail);

export default router;
