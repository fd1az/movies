import db from "../../database/models/index.js";
const sequelize = db.sequelize;

//---------------------------
//Dentro del actorsAPIController uso las dos forma de poder llamar a nuestros modelo
//----------------------------------
const genresAPIController = {
  async list(req, res) {
    try {
      const genres = await db.Genre.findAll();
      let respuesta = {
        meta: {
          status: 200,
          total: genres.length,
          url: req.originalUrl,
        },
        data: genres,
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

export default genresAPIController;
