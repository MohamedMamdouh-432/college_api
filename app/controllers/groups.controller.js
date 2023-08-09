const db = require("../models");
const Groups = db.Groups;
const Op = db.Sequelize.Op;

// Create and Save a new Lab
exports.create = (req, res) => {
  // Validate request
  if (!req.body.GroupName) {
    res.status(400).send({
      message: "GroupName can not be empty!",
    });
    return;
  }

  // Create a group
  const group = {
    GroupYear: req.body.GroupYear,
    GroupName: req.body.GroupName,
    Department: req.body.Department,
  };

  // Save group in the database
  Groups.create(group)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the User.",
      });
    });
};

// Retrieve all Groups from the database.
exports.findAll = (req, res) => {
  const GroupName = req.query.GroupName;
  var condition = GroupName
    ? { GroupName: { [Op.like]: `%${GroupName}%` } }
    : null;

  Groups.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving groups.",
      });
    });
};

// Find a single HallName with an id
exports.findOne = (req, res) => {
  const GroupID = req.params.GroupID;

  Groups.findByPk(GroupID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find group with id=${GroupID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving group with id=" + GroupID,
      });
    });
};

// Update a group by the id in the request
exports.update = (req, res) => {
  const GroupID = req.params.GroupID;

  Groups.update(req.body, {
    where: { GroupID: GroupID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update group with id=${GroupID}. group was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating group with id=" + GroupID,
      });
    });
};

// Delete a group with the specified id in the request
exports.delete = (req, res) => {
  const GroupID = req.params.GroupID;

  Groups.destroy({
    where: { GroupID: GroupID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${GroupID}. User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + GroupID,
      });
    });
};

// Delete all groups from the database.
exports.deleteAll = (req, res) => {
  Groups.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} group(s) were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all groups.",
      });
    });
};
