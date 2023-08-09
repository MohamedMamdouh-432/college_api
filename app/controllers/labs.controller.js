const db = require("../models");
const Labs = db.Labs;
const Op = db.Sequelize.Op;

// Create and Save a new Lab
exports.create = (req, res) => {
  // Validate request
  if (!req.body.LabName) {
    res.status(400).send({
      message: "LabName can not be empty!",
    });
    return;
  }

  // Create a lab
const lab = {
  LabName: req.body.LabName,
  Capacity: req.body.Capacity,
  Facilities: req.body.Facilities,
};


  // Save lab in the database
  Labs.create(lab)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Labs from the database.
exports.findAll = (req, res) => {
  const LabName = req.query.LabName;
  var condition = LabName ? { LabName: { [Op.like]: `%${LabName}%` } } : null;

  Labs.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving labs.",
      });
    });
};

// Find a single HallName with an id
exports.findOne = (req, res) => {
  const LabID = req.params.LabID;

  Labs.findByPk(LabID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find lab with id=${LabID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving lab with id=" + LabID,
      });
    });
};

// Update a lab by the id in the request
exports.update = (req, res) => {
  const LabID = req.params.LabID;

  Labs.update(req.body, {
    where: { LabID: LabID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update lab with id=${LabID}. lab was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating lab with id=" + LabID,
      });
    });
};

// Delete a lab with the specified id in the request
exports.delete = (req, res) => {
  const LabID = req.params.LabID;

  Labs.destroy({
    where: { LabID: LabID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${LabID}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + LabID,
      });
    });
};

// Delete all labs from the database.
exports.deleteAll = (req, res) => {
  Labs.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} lab(s) were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all labs.",
      });
    });
};
