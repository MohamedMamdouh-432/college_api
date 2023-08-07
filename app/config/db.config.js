module.exports = {
  HOST: "localhost",
  USER: "postgres",
  PASSWORD: "2rVzLlg1nmxPp1Z",
  PORT: 5432, //!  don't forget to change to the production port
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
