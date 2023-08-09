const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  port: dbConfig.PORT, //!  don't forget to change to the production port
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);
db.LectureHalls = require("./lectureHalls.model.js")(sequelize, Sequelize);
db.Users = require("./users.model.js")(sequelize, Sequelize);
db.Labs = require("./labs.model.js")(sequelize, Sequelize);
db.Devices = require("./devices.model.js")(sequelize, Sequelize);
db.Devices.belongsTo(db.Labs, { foreignKey: "LabID" });
db.Labs.hasMany(db.Devices, { foreignKey: "LabID" });
db.Professors = require("./professors.model.js")(sequelize, Sequelize);
db.Subjects = require("./subjects.model.js")(sequelize, Sequelize);
db.Groups = require("./groups.model.js")(sequelize, Sequelize);
db.Timetables = require("./timetables.model.js")(sequelize, Sequelize);
db.Timetables.belongsTo(db.Groups, { foreignKey: 'GroupID' });
db.Timetables.belongsTo(db.Subjects, { foreignKey: 'SubjectID' });
db.Timetables.belongsTo(db.Professors, { foreignKey: 'ProfessorID' });
db.Timetables.belongsTo(db.LectureHalls, { foreignKey: 'LectureHallID' });
db.Timetables.belongsTo(db.Labs, { foreignKey: 'LabID' });
db.Groups.hasMany(db.Timetables, { foreignKey: 'GroupID' });
module.exports = db;
