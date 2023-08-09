module.exports = (app) => {
  const Groups = require("../controllers/groups.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Groups.create);

  // Retrieve all Groups
  router.get("/", Groups.findAll);

  // Retrieve a single Lab with GroupID
  router.get("/:GroupID", Groups.findOne);

  // Update a Lab with GroupID
  router.put("/:GroupID", Groups.update);

  // Delete a Lab with GroupID
  router.delete("/:GroupID", Groups.delete);

  // // Delete all Groups
  // router.delete("/", Groups.deleteAll);

  app.use("/api/groups", router);
};
