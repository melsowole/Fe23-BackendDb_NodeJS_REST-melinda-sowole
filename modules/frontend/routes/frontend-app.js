import { Router } from "express";
import api from "../../backend/api/api.js";
import courseRouter from "./courses.js";
import studentRouter from "./students.js";

const frontendApp = Router();

frontendApp.use("/", courseRouter);
frontendApp.use("/", studentRouter);

frontendApp.get("/", async (req, res) => {
  const students = await api.students.get();
  const courses = await api.courses.get();

  res.render("dashboard", { students, courses });
});

export default frontendApp;
