const db = require("../models");
const Timetables = db.Timetables;
const Op = db.Sequelize.Op;

// Create and Save a new Lab
exports.create = (req, res) => {
  //return 500 error if groupid, subjectid, ProfessorID or LectureHallID or LabID is null
  if (
    req.body.GroupID == null ||
    req.body.SubjectID == null ||
    req.body.ProfessorID == null || // false && true >> false                      //                 (  null  == null >> true &&    labID == null >> false) => false
    (req.body.LectureHallID != null && req.body.LabID != null) ||
    (req.body.LectureHallID == null && req.body.LabID == null)
  ) {
    res.status(500).send({
      message:
        "GroupID, SubjectID, ProfessorID, LectureHallID or LabID cannot be null",
    });
    return;
  }

  // Create a timetable
  const timetable = {
    DayOfWeek: req.body.DayOfWeek,
    StartTime: req.body.StartTime,
    EndTime: req.body.EndTime,
    GroupID: req.body.GroupID,
    SubjectID: req.body.SubjectID,
    ProfessorID: req.body.ProfessorID,
    LectureHallID: req.body.LectureHallID,
    LabID: req.body.LabID,
  };

  // Save timetable in the database
  Timetables.create(timetable)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err || "Some error occurred while creating the Timetable.",
      });
    });
};

// Retrieve all Timetables from the database.
exports.findAll = (req, res) => {
  const GroupID = req.query.GroupID;
  var condition = GroupID ? { GroupID: { [Op.like]: `%${GroupID}%` } } : null;
  console.log("findall was called with GroupID: " + GroupID);

  // Timetables.findAll({ where: condition })
  Timetables.findAll({
    where: GroupID
      ? {
          GroupID: {
            [Op.eq]: GroupID,
          },
        }
      : null,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving timetables.",
      });
    });
};

// Find a single Timetable with an id
exports.findOne = (req, res) => {
  const TimetableID = req.params.TimetableID;

  Timetables.findByPk(TimetableID)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find timetable with id=${TimetableID}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving timetable with id=" + TimetableID,
      });
    });
};

// Update a timetable by the id in the request
exports.update = (req, res) => {
  const TimetableID = req.params.TimetableID;

  Timetables.update(req.body, {
    where: { TimetableID: TimetableID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Timetable was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update timetable with id=${TimetableID}. timetable was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating timetable with id=" + TimetableID,
      });
    });
};

// Delete a timetable with the specified id in the request
exports.delete = (req, res) => {
  const TimetableID = req.params.TimetableID;

  Timetables.destroy({
    where: { TimetableID: TimetableID },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Timetable slot was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Timetable with id=${TimetableID}. timetable was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete timetable with id=" + TimetableID,
      });
    });
};

// Delete all timetables from the database.
exports.deleteAll = (req, res) => {
  Timetables.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} timetable(s) were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all timetables.",
      });
    });
};
