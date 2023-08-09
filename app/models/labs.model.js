module.exports = (sequelize, Sequelize) => {
  const Labs = sequelize.define("labs", {
    LabID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    LabName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 500,
      },
    },
    Facilities: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Labs;
};
