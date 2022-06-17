import express from "express";
import path from "path";
import { __dirname, __filename } from "./util/dirname.js";
import indexRouter from "./routes/index.js";
import cors from "cors";

import moviesRoutes from "./routes/moviesRoutes.js";
import genresRoutes from "./routes/genresRoutes.js";

import apiGenresRouter from "./routes/api/genres.js";
import apiMoviesRouter from "./routes/api/movies.js";

const app = express();

//set cors
app.use(cors());
// view engine setup
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);

app.use("/api/genres", apiGenresRouter);
app.use("/api/movies", apiMoviesRouter);

app.listen("3001", () => console.log("Servidor corriendo en el puerto 3001"));
