const db = require("../models");
const Users = db.Users;
const Op = db.Sequelize.Op;

// Create and Save a new LectureHall
exports.create = (req, res) => {
  // Validate request
  if (!req.body.UserName) {
    res.status(400).send({
      message: "UserName can not be empty!",
    });
    return;
  }

  // Create a LectureHall
  const user = {
    FirstName: req.body.FirstName,
    SecondName: req.body.SecondName,
    UserName: req.body.UserName,
    Password: req.body.Password,
    Email: req.body.Email,
    Rank: req.body.Rank ? req.body.Rank : 3,
    Department: req.body.Department ? req.body.Department : "None",
  };

  // Save user in the database
  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all LectureHalls from the database.
exports.findAll = (req, res) => {
  const UserName = req.query.UserName;
  var condition = UserName
    ? { UserName: { [Op.like]: `%${UserName}%` } }
    : null;

  Users.findAll({ where: condition })
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
  const id = req.params.UserID;

  Users.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id,
      });
    });
};

// Update a user by the id in the request
exports.update = (req, res) => {
  const UserID = req.params.UserID;

  Users.update(req.body, {
    where: { UserID: UserID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update user with id=${UserID}. user was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating user with id=" + UserID,
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const UserID = req.params.UserID;

  LectureHalls.destroy({
    where: { UserID: UserID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${UserID}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + UserID,
      });
    });
};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  Users.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} user(s) were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all users.",
      });
    });
};
