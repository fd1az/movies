module.exports = (sequelize, dataTypes) => {
  let alias = "Movie";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: dataTypes.STRING,
    },
    rating: {
      type: dataTypes.INTEGER,
    },
    awards: {
      type: dataTypes.INTEGER,
    },
    release_date: {
      type: dataTypes.DATE,
    },
    length: {
      type: dataTypes.INTEGER,
    },
    deleted: {
      type: dataTypes.INTEGER,
    },
  };

  let config = {
    tableName: "movies",
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Movie = sequelize.define(alias, cols, config);

  return Movie;
};
