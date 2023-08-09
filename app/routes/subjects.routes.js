module.exports = (app) => {
  const Subjects = require("../controllers/subjects.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Subjects.create);

  // Retrieve all Subjects
  router.get("/", Subjects.findAll);

  // Retrieve a single Lab with SubjectID
  router.get("/:SubjectID", Subjects.findOne);

  // Update a Lab with SubjectID
  router.put("/:SubjectID", Subjects.update);

  // Delete a Lab with SubjectID
  router.delete("/:SubjectID", Subjects.delete);

  // // Delete all Subjects
  // router.delete("/", Subjects.deleteAll);

  app.use("/api/subjects", router);
};
