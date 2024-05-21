import { Router } from "express";
import coursesRoute from "./courses.js";
import studentsRoute from "./students.js";
import enrollmentsRoute from "./enrollments.js";

const backendApp = Router();

backendApp.use("/courses", coursesRoute);
backendApp.use("/students", studentsRoute);
backendApp.use("/enrollments", enrollmentsRoute);

export default backendApp;
