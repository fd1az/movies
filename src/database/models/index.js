import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { __dirname, __filename } from "../../util/dirname.js";
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
import config from "../config/config.js";
const db = {};
console.log("__dirname", __dirname);
let sequelize;
if (config[env].use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config[env].database,
    config[env].username,
    config[env].password,
    {
      ...config[env],
      port: 3307,
    }
  );
}

let promises = fs
  .readdirSync(__dirname + "database/models")
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .map(async (file) => {
    const fnModel = file !== "index.js" ? await import(`./${file}`) : null;
    if (fnModel) {
      const model = fnModel.default(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
      return model;
    }
  });

await Promise.all(promises);

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    console.log("NOOOOOOOO", db[modelName]);
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
