const db = require("../models");
const Subjects = db.Subjects;
const Op = db.Sequelize.Op;

// Create and Save a new Lab
exports.create = (req, res) => {
  // Validate request
  if (!req.body.SubjectName) {
    res.status(400).send({
      message: "SubjectName can not be empty!",
    });
    return;
  }

  // Create a subject
  const subject = {
    SubjectName: req.body.SubjectName,

    Department: req.body.Department,

    SubjectCode: req.body.SubjectCode,
  };

  // Save subject in the database
  Subjects.create(subject)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Subjects from the database.
exports.findAll = (req, res) => {
  const SubjectName = req.query.SubjectName;
  var condition = SubjectName
    ? { SubjectName: { [Op.like]: `%${SubjectName}%` } }
    : null;

  Subjects.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving subjects.",
      });
    });
};

// Find a single HallName with an id
exports.findOne = (req, res) => {
  const SubjectID = req.params.SubjectID;

  Subjects.findByPk(SubjectID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find subject with id=${SubjectID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving subject with id=" + SubjectID,
      });
    });
};

// Update a subject by the id in the request
exports.update = (req, res) => {
  const SubjectID = req.params.SubjectID;

  Subjects.update(req.body, {
    where: { SubjectID: SubjectID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update subject with id=${SubjectID}. subject was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating subject with id=" + SubjectID,
      });
    });
};

// Delete a subject with the specified id in the request
exports.delete = (req, res) => {
  const SubjectID = req.params.SubjectID;

  Subjects.destroy({
    where: { SubjectID: SubjectID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${SubjectID}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + SubjectID,
      });
    });
};

// Delete all subjects from the database.
exports.deleteAll = (req, res) => {
  Subjects.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} subject(s) were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all subjects.",
      });
    });
};
