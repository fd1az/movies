const db = require("../database/models");

const moviesController = {
  list: async (req, res) => {
    const movies = await db.Movie.findAll();
    res.render("moviesList", { movies });
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
};

module.exports = moviesController;
