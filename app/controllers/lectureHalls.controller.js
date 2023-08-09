const db = require("../models");
const LectureHalls = db.LectureHalls;
const Op = db.Sequelize.Op;

// Create and Save a new LectureHall
exports.create = (req, res) => {
  // Validate request
  if (!req.body.HallName) {
    res.status(400).send({
      message: "HallName can not be empty!",
    });
    return;
  }

  // Create a LectureHall
  const lectureHall = {
    HallName: req.body.HallName,
    Facilities: req.body.Facilities,
  };

  // Save LectureHall in the database
  LectureHalls.create(lectureHall)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the lecture hall.",
      });
    });
};

// Retrieve all LectureHalls from the database.
exports.findAll = (req, res) => {
  const HallName = req.query.HallName;
  var condition = HallName
    ? { HallName: { [Op.like]: `%${HallName}%` } }
    : null;

  LectureHalls.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single HallName with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  LectureHalls.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Lecture hall with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving lecture hall with id=" + id,
      });
    });
};

// Update a Lecture hall by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  LectureHalls.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lecture Hall was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update LectureHall with id=${id}. Lecture hall was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Lecture hall with id=" + id,
      });
    });
};

// Delete a Lecturehall with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  LectureHalls.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Lecture hall was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete LectureHall with id=${id}. Lecture hall was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Lecture hall with id=" + id,
      });
    });
};

// Delete all Lecture halls from the database.
exports.deleteAll = (req, res) => {
  LectureHalls.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Lecture halls were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all lecture halls.",
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
