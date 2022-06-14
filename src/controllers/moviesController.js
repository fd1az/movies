import db from "../database/models/index.js";
import fetch from "node-fetch";

const moviesController = {
  list: async (req, res) => {
    const movies = await db.Movie.findAll({ where: { deleted: 0 } });
    res.render("moviesList", { movies });
  },
  detail: async (req, res) => {
    db.Movie.findByPk(req.params.id, {
      include: ["actors"],
    }).then((movie) => {
      res.render("moviesDetail", { movie });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
      limit: 2,
    }).then((movies) => {
      res.render("newestMovies", { movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: { [db.Sequelize.Op.gt]: 8 },
      },
      order: [["release_date", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("recommendedMovies", { movies });
    });
  },
  add: async (req, res) => {
    const allGenres = await db.Genre.findAll();
    res.render("moviesAdd", { allGenres });
  },
  create: (req, res) => {
    const { title, rating, awards, release_date, length, genre_id } = req.body;
    db.Movie.create({
      title,
      rating,
      awards,
      release_date,
      length,
      genre_id,
    })
      .then(() => {
        return res.redirect("/movies");
      })
      .catch((e) => {
        console.log(e);
        console.log("Changos!");
      });
  },
  edit: (req, res) => {
    const Movie = db.Movie.findByPk(req.params.id, {
      include: ["genre", "actors"],
    });
    const allGenres = db.Genre.findAll();
    const allActors = db.Actor.findAll();

    Promise.all([Movie, allGenres, allActors])
      .then(([Movie, allGenres, allActors]) => {
        res.render("moviesEdit", { Movie, allGenres, allActors });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  update: async (req, res) => {
    try {
      const moviId = req.params.id;
      const { title, rating, awards, release_date, length, actors } = req.body;

      const actorsArrayOb =
        actors.length > 1
          ? actors.map((idStr) => {
              return { actor_id: Number(idStr), movie_id: moviId };
            })
          : [{ actor_id: Number(actors), movie_id: moviId }];

      await db.ActorMovie.destroy({
        where: {
          movie_id: moviId,
        },
      });

      await db.ActorMovie.bulkCreate(actorsArrayOb);

      await db.Movie.update(
        { title, rating, awards, release_date, length },
        { where: { id: moviId } }
      );

      res.redirect("/movies");
    } catch (error) {
      console.log(error);
    }
  },
  delete: (req, res) => {
    const id = req.params.id;
    db.Movie.findByPk(id).then((movie) => {
      res.render("moviesDelete", { Movie: movie });
    });
  },
  destroy: (req, res) => {
    const id = req.params.id;

    db.Movie.update({ deleted: 1 }, { where: { id } })
      .then(() => {
        res.redirect("/movies");
      })
      .catch((e) => {
        console.log(e);
      });
  },
  async search(req, res) {
    const rest = await fetch(
      "http://www.omdbapi.com/?apikey=d4e35e92&t=Doctor+Strange"
    );
    const movie = await rest.json();
    res.render("moviesDetailOmdb", { movie });
  },
};

export default moviesController;
