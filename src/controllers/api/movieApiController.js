import db from "../../database/models/index.js";
const sequelize = db.sequelize;

//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const moviesAPIController = {
  async list(req, res) {
    try {
      const movies = await db.Movie.findAll();

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
};

export default moviesAPIController;
