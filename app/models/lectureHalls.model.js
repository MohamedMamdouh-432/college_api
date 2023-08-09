module.exports = (sequelize, Sequelize) => {
  const LectureHalls = sequelize.define("LectureHalls", {
  HallID: {
      type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  HallName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Facilities: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  });

  return LectureHalls;
};
