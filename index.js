const express = require("express");

const app = express();

const env = require("./source/config/env");

const { username, password, database, host } = env;

const port = process.env.PORT || 3000;

console.log(`port: ${process.env.PORT}`);
console.log(`username: ${username} password: ${password} database: ${database} host: ${host}`);

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
  console.log(`Example app listening on port ${port}!`);
});
