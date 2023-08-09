module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define("users", {
    UserID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    SecondName: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    UserName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    Email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    Rank: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        min: 0,
        max: 6,
      }
    },

    Department: {

      type: Sequelize.STRING,

      allowNull: false,

    
    }
  });

  return Users;
};
