module.exports = (app) => {
  const lectureHalls = require("../controllers/lectureHalls.controller.js");

  var router = require("express").Router();

  // Create a new lectureHall
  router.post("/", lectureHalls.create);

  // Retrieve all lectureHalls
  router.get("/", lectureHalls.findAll);

  // Retrieve a single lectureHall with id
  router.get("/:id", lectureHalls.findOne);

  // Update a lectureHall with id
  router.put("/:id", lectureHalls.update);

  // Delete a lectureHall with id
  router.delete("/:id", lectureHalls.delete);

  // // Delete all lectureHalls
  // router.delete("/", lectureHalls.deleteAll);

  app.use("/api/lectureHalls", router);
};
