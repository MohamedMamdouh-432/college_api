const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// To drop the table if it already exists :
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the college REST API" });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/lectureHalls.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/labs.routes")(app);
require("./app/routes/devices.routes")(app);
require("./app/routes/professors.routes")(app);
require("./app/routes/subjects.routes")(app);
require("./app/routes/groups.routes")(app);
require("./app/routes/timetables.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
