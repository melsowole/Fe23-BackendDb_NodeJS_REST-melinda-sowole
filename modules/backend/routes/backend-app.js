import { Router } from "express";
import coursesRouter from "./courses.js";
import studentsRouter from "./students.js";
import enrollmentsRouter from "./enrollments.js";

const backendApp = Router();

backendApp.use("/courses", coursesRouter);
backendApp.use("/students", studentsRouter);
backendApp.use("/enrollments", enrollmentsRouter);

export default backendApp;
