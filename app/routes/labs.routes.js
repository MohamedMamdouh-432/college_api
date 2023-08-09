module.exports = (app) => {
  const Labs = require("../controllers/labs.controller.js");

  var router = require("express").Router();

  // Create a new Lab
  router.post("/", Labs.create);

  // Retrieve all Labs
  router.get("/", Labs.findAll);

  // Retrieve a single Lab with LabID
  router.get("/:LabID", Labs.findOne);

  // Update a Lab with LabID
  router.put("/:LabID", Labs.update);

  // Delete a Lab with LabID
  router.delete("/:LabID", Labs.delete);

  // // Delete all Labs
  // router.delete("/", Labs.deleteAll);

  app.use("/api/labs", router);
};
