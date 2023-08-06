const Sequelize = require('sequelize');

const env = require('./env');

const { username, password, database, host } = env;

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: host,
    username: username,
    password: password,
    dialect: 'postgres'
});
