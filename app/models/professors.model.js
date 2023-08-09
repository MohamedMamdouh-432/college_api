module.exports = (sequelize, Sequelize) => {
  const Professors = sequelize.define("professors", {
    ProfessorID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Department: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    ContactInfo: {
      // type: Sequelize.STRING,
      
      type: Sequelize.JSONB,
      allowNull: true,
    },
  });

  return Professors;
};
