module.exports = (sequelize, Sequelize) => {
  const Devices = sequelize.define("devices", {
    DeviceID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    DeviceName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    DeviceType: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    SerialNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Condition: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["working", "maintenance", "other"]],
      },
    },
  });

  return Devices;
};
