const db = require("../models");
const Professors = db.Professors;
const Op = db.Sequelize.Op;

// Create and Save a new Lab
exports.create = (req, res) => {
  // Validate request
  if (!req.body.FirstName) {
    res.status(400).send({
      message: "FirstName can not be empty!",
    });
    return;
  }

  // Create a professor
  const professor = {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Department: req.body.Department,
    ContactInfo: req.body.ContactInfo,

  };

  // Save professor in the database
  Professors.create(professor)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Professors from the database.
exports.findAll = (req, res) => {
  const FirstName = req.query.FirstName;
  var condition = FirstName
    ? { FirstName: { [Op.like]: `%${FirstName}%` } }
    : null;

  Professors.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Professors.",
      });
    });
};

// Find a single FirstName with an id
exports.findOne = (req, res) => {
  const ProfessorID = req.params.ProfessorID;

  Professors.findByPk(ProfessorID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find professor with id=${ProfessorID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving professor with id=" + ProfessorID,
      });
    });
};

// Update a professor by the id in the request
exports.update = (req, res) => {
  const ProfessorID = req.params.ProfessorID;

  Professors.update(req.body, {
    where: { ProfessorID: ProfessorID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update professor with id=${ProfessorID}. professor was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating professor with id=" + ProfessorID,
      });
    });
};

// Delete a professor with the specified id in the request
exports.delete = (req, res) => {
  const ProfessorID = req.params.ProfessorID;

  Professors.destroy({
    where: { ProfessorID: ProfessorID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${ProfessorID}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + ProfessorID,
      });
    });
};

// Delete all Professors from the database.
exports.deleteAll = (req, res) => {
  Professors.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} professor(s) were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Professors.",
      });
    });
};
