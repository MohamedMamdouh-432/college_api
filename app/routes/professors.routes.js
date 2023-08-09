module.exports = (app) => {
  const Professors = require("../controllers/professors.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Professors.create);

  // Retrieve all Professors
  router.get("/", Professors.findAll);

  // Retrieve a single Lab with ProfessorID
  router.get("/:ProfessorID", Professors.findOne);

  // Update a Lab with ProfessorID
  router.put("/:ProfessorID", Professors.update);

  // Delete a Lab with ProfessorID
  router.delete("/:ProfessorID", Professors.delete);

  // // Delete all Professors
  // router.delete("/", Professors.deleteAll);

  app.use("/api/professors", router);
};
