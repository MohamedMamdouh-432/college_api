const express = require("express");

const app = express();

const port = process.env.PORT || 3000;

console.log(port);

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }, // added  this line
  { id: 4, name: "course4" }, // added  this line
  { id: 5, name: "course5" }, // added  this line
  { id: 6, name: "course6" }, // added  this line
  { id: 7, name: "course7" }, // added  this line
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
