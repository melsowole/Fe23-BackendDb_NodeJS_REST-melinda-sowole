import { Router } from "express";
import api from "../../backend/api/api.js";

const frontendApp = Router();

frontendApp
  .route("/students")
  .get(async (req, res) => {
    const students = await api.students.get();

    res.render("students", { students });
  })
  .post(async (req, res) => {
    const students = await api.students.get();
    res.render("students", { students, open: true });
  });

frontendApp.get("/student/:id", async (req, res) => {
  const student = await api.students.getById(req.params.id);
  const courses = await api.courses.get();

  res.render("student-view", { student, courses });
});

frontendApp.get("/courses", async (req, res) => {
  const courses = await api.courses.get();

  res.render("courses", { courses });
});

frontendApp.get("/", async (req, res) => {
  const students = await api.students.get();
  const courses = await api.courses.get();

  res.render("dashboard", { students, courses });
});

export default frontendApp;
