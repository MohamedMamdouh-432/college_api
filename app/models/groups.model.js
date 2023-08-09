module.exports = (sequelize, Sequelize) => {
  const Groups = sequelize.define("groups", {
    GroupID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    GroupYear: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    GroupName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });

  return Groups;
};
