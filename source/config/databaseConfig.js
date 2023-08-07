const { Sequelize, DataTypes } = require("sequelize");

const env = require("./env");

const { username, password, database, host } = env;

const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: host,
  username: username,
  password: password,
  dialect: "postgres",
});

function connectToPostgres() {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.log("Unable to connect to the database: ", error);
      process.exit(1);
    });
  return sequelize;
}

const client = connectToPostgres();

module.exports = client;