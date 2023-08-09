module.exports = (app) => {
  const Subjects = require("../controllers/subjects.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Subjects.create);

  // Retrieve all Subjects
  router.get("/", Subjects.findAll);

  // Retrieve a single Lab with id
  router.get("/:id", Subjects.findOne);

  // Update a Lab with id
  router.put("/:id", Subjects.update);

  // Delete a Lab with id
  router.delete("/:id", Subjects.delete);

  // Delete all Subjects
  router.delete("/", Subjects.deleteAll);

  app.use("/api/subjects", router);
};
