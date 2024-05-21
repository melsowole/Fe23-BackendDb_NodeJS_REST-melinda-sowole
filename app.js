import express from "express";
import coursesRoute from "./routes/courses.js";
import studentsRoute from "./routes/students.js";
import enrollmentsRoute from "./routes/enrollments.js";

const app = express();

app.use(express.json(), express.urlencoded({ extended: true }));

app.use("/courses", coursesRoute);
app.use("/students", studentsRoute);
app.use("/enrollments", enrollmentsRoute);

app.listen(3000, () => {
  console.log("listening to port 3000");
});
