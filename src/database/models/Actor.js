module.exports = function (sequelize, dataTypes) {
  let alias = "Actor";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    last_name: {
      type: dataTypes.STRING(100),
      allowNull: false,
    },
    rating: {
      type: dataTypes.DECIMAL(3, 1),
      allowNull: false,
    },
    favorite_movie_id: {
      type: dataTypes.BIGINT(10).UNSIGNED,
      allowNull: false,
    },
  };

  let config = {
    tableName: "actors",
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const Actor = sequelize.define(alias, cols, config);

  Actor.associate = function (models) {
    Actor.belongsToMany(models.Movie, {
      as: "movies",
      through: "actor_movie",
      foreignKey: "actor_id",
      otherKey: "movie_id",
    });
  };
  return Actor;
};
