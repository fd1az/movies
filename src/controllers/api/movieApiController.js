import db from "../../database/models/index.js";
const sequelize = db.sequelize;

//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const moviesAPIController = {
  async list(req, res) {
    try {
      const movies = await db.Movie.findAll({ include: ["genre"] });

      console.log("RUN server 2");
      let respuesta = {
        meta: {
          status: 200,
          total: movies.length,
          url: req.originalUrl,
        },
        data: movies,
      };
      res.json(respuesta);
    } catch (error) {
      let respuesta = {
        meta: {
          status: 500,
          url: req.originalUrl,
        },
        error: JSON.stringify(error),
      };
      res.status(500).json(respuesta);
    }
  },
  detail: async (req, res) => {
    db.Movie.findByPk(req.params.id, {
      include: ["actors"],
    }).then((movie) => {
      res.json(movie);
    });
  },
  update: async (req, res) => {
    try {
      const moviId = req.params.id;
      const { title, rating, awards, release_date, length } = req.body;

      await db.Movie.update(
        { title, rating, awards, release_date, length },
        { where: { id: moviId } }
      );

      res.status(200).json({ data: "ok" });
    } catch (error) {
      console.log(error);
    }
  },
};

export default moviesAPIController;
