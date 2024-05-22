import { Router } from "express";
import api from "../../backend/api/api.js";


const router = Router();


router
  .route("/students")
  .get(async (req, res) => {
    const students = await api.students.get();

    res.render("students", { students });
  })
  .post(async (req, res) => {
    const students = await api.students.get();
    res.render("students", {
      students,
      open: true,
      message: "Added student!",
    });
  });

router
  .route("/student/:id")
  .get(async (req, res) => {
    const student = await api.students.getById(req.params.id);
    const courses = await api.courses.get();

    res.render("student-view", { student, courses });
  })
  .post(async (req, res) => {
    let message = "";

    if (req.body.method == "UNENROLL") {
      const { course_id } = req.body;
      await api.enrollments.unenrollStudent(
        req.params.id,
        course_id
      );
      message = "Removed student from course!";
      
    } else if (req.body.method == "ENROLL") {
      const {course_id} = req.body;
      await api.enrollments.add(req.params.id, course_id)
      message = "Enrolled student in course!";

    } else {
      const { fName, lName, town } = req.body;
      await api.students.update(req.params.id, fName, lName, town);
      message = "Updated student info!";

    }

    const student = await api.students.getById(req.params.id);
    const courses = await api.courses.get();

    res.render("student-view", {
      student,
      courses,
      message
    });
  });

export default router;