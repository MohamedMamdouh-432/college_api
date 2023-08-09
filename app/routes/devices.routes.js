module.exports = (app) => {
  const Devices = require("../controllers/devices.controller.js");

  var router = require("express").Router();

  // Create a new Device
  router.post("/", Devices.create);

  // Retrieve all Devices
  router.get("/", Devices.findAll);

  // Retrieve a single Device with DeviceID
  router.get("/:DeviceID", Devices.findOne);

  // Update a Device with DeviceID
  router.put("/:DeviceID", Devices.update);

  // Delete a Device with DeviceID
  router.delete("/:DeviceID", Devices.delete);

  // // Delete all Devices
  // router.delete("/", Devices.deleteAll);

  app.use("/api/devices", router);
};
