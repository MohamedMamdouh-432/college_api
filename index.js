const express = require("express");

const app = express();

const client = require("./source/config/databaseConfig");

const env = require("./source/config/env");

const clint = require("./source/models/user");

const User = clint(client);

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const { username, password, database, host } = env;

const port = process.env.PORT || 3000;

// create a for loop that creates 10 users
console.log(User);
// for (let i = 0; i < 10; i++) {
//   User.create({
//     firstname: `John${i}`,
//     lastname: "Doe",
//     username: `johndoe${i}`,
//     password: "password",
//     email: "example.com",
//     createdAt: new Date(),
//     privilage: "admin",
//   });
// }

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
  { id: 5, name: "course5" },
  { id: 6, name: "course6" },
  { id: 7, name: "course7" },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => {
    return c.id === parseInt(req.params.id);
  });

  if (!course) {
    res.send("Course");
  }
  res.send(course);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
