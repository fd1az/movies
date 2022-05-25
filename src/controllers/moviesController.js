const db = require("../database/models");

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
    const Movie = db.Movie.findByPk(req.params.id, { include: ["genre"] });
    const allGenres = db.Genre.findAll();

    Promise.all([Movie, allGenres])
      .then(([Movie, allGenres]) => {
        res.render("moviesEdit", { Movie, allGenres });
      })
      .catch((e) => {
        console.log(e);
      });
  },
  update: (req, res) => {
    const id = req.params.id;
    const { title, rating, awards, release_date, length } = req.body;
    db.Movie.update(
      { title, rating, awards, release_date, length },
      { where: { id } }
    ).then(() => {
      res.redirect("/movies");
    });
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
};

module.exports = moviesController;
