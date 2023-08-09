module.exports = (app) => {
  const Groups = require("../controllers/groups.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Groups.create);

  // Retrieve all Groups
  router.get("/", Groups.findAll);

  // Retrieve a single Lab with id
  router.get("/:id", Groups.findOne);

  // Update a Lab with id
  router.put("/:id", Groups.update);

  // Delete a Lab with id
  router.delete("/:id", Groups.delete);

  // // Delete all Groups
  // router.delete("/", Groups.deleteAll);

  app.use("/api/groups", router);
};
