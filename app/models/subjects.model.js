module.exports = (sequelize, Sequelize) => {
  const Subjects = sequelize.define("subjects", {
    SubjectID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    SubjectName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Department: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    SubjectCode: { //ECE101
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Subjects;
};
