module.exports = {
  // HOST: "localhost", //!  don't forget to change to the production port
  HOST: "bishopc4.internal", // * use this for production
  USER: "postgres",
  PASSWORD: "2rVzLlg1nmxPp1Z",
  // PORT: 5432, //!  don't forget to change to the production port
  PORT: 5433, // * use this for production
  DB: "postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
