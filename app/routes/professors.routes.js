module.exports = (app) => {
  const Professors = require("../controllers/professors.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Professors.create);

  // Retrieve all Professors
  router.get("/", Professors.findAll);

  // Retrieve a single Lab with id
  router.get("/:id", Professors.findOne);

  // Update a Lab with id
  router.put("/:id", Professors.update);

  // Delete a Lab with id
  router.delete("/:id", Professors.delete);

  // Delete all Professors
  router.delete("/", Professors.deleteAll);

  app.use("/api/professors", router);
};
