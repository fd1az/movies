export default function (sequelize, dataTypes) {
  let alias = "ActorMovie";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    actor_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
    movie_id: {
      type: dataTypes.INTEGER,
      allowNull: false,
    },
  };

  let config = {
    tableName: "actor_movie",
    createdAt: "created_at",
    updatedAt: "updated_at",
  };

  const ActorMovie = sequelize.define(alias, cols, config);

  return ActorMovie;
}
