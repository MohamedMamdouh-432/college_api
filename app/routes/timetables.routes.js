module.exports = (app) => {
  const Timetables = require("../controllers/timetables.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Timetables.create);

  // Retrieve all Timetables
  router.get("/", Timetables.findAll);

  // Retrieve a single Lab with id
  router.get("/:TimetableID", Timetables.findOne);

  // Update a Lab with id
  router.put("/:TimetableID", Timetables.update);

  // Delete a Lab with id
  router.delete("/:TimetableID", Timetables.delete);

  // // Delete all Timetables
  // router.delete("/", Timetables.deleteAll);

  app.use("/api/timetables", router);
};
