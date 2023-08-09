module.exports = (app) => {
  const Labs = require("../controllers/labs.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Labs.create);

  // Retrieve all Labs
  router.get("/", Labs.findAll);

  // Retrieve a single Lab with id
  router.get("/:id", Labs.findOne);

  // Update a Lab with id
  router.put("/:id", Labs.update);

  // Delete a Lab with id
  router.delete("/:id", Labs.delete);

  // // Delete all Labs
  // router.delete("/", Labs.deleteAll);

  app.use("/api/labs", router);
};
