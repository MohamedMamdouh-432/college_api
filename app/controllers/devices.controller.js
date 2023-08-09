const db = require("../models");
const Devices = db.Devices;
const Op = db.Sequelize.Op;

// Create and Save a new Lab
exports.create = (req, res) => {
  // Validate request
  if (!req.body.DeviceName) {
    res.status(400).send({
      message: "DeviceName can not be empty!",
    });
    return;
  }

  // Create a device
  const device = {
    DeviceName: req.body.DeviceName,
    DeviceType: req.body.DeviceType,
    SerialNumber: req.body.SerialNumber,
    Condition: req.body.Condition,
    LabID: req.body.LabID,

  };
  console.log(device);

  // Save device in the database
  Devices.create(device)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Devices from the database.
exports.findAll = (req, res) => {
  const DeviceName = req.query.DeviceName;
  var condition = DeviceName
    ? { DeviceName: { [Op.like]: `%${DeviceName}%` } }
    : null;

  Devices.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving devices.",
      });
    });
};

// Find a single HallName with an id
exports.findOne = (req, res) => {
  const DeviceID = req.params.DeviceID;

  Devices.findByPk(DeviceID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find device with id=${DeviceID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving device with id=" + DeviceID,
      });
    });
};

// Update a device by the id in the request
exports.update = (req, res) => {
  const DeviceID = req.params.DeviceID;

  Devices.update(req.body, {
    where: { DeviceID: DeviceID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update device with id=${DeviceID}. device was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating device with id=" + DeviceID,
      });
    });
};

// Delete a device with the specified id in the request
exports.delete = (req, res) => {
  const DeviceID = req.params.DeviceID;

  Devices.destroy({
    where: { DeviceID: DeviceID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${DeviceID}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + DeviceID,
      });
    });
};

// Delete all devices from the database.
exports.deleteAll = (req, res) => {
  Devices.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} device(s) were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all devices.",
      });
    });
};

// // find all published Tutorial
//// exports.findAllPublished = (req, res) => {
////   Tutorial.findAll({ where: { published: true } })
////     .then((data) => {
////       res.send(data);
////     })
////     .catch((err) => {
////       res.status(500).send({
////         message:
////           err.message || "Some error occurred while retrieving tutorials.",
////       });
////     });
//// };
//
