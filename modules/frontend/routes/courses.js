import { Router } from "express";
import api from "../../backend/api/api.js";

const router = Router();

// COURSES OVERVIEW
router
  .route("/courses")
  .get(async (req, res) => {
    const courses = await api.courses.get();
    res.render("courses", { courses });
  })
  .post(async (req, res) => {
    // add course
    const { name, description } = req.body;
    await api.courses.add(name, description);

    // display page
    const courses = await api.courses.get();
    res.render("courses", { 
      courses, 
      message: "Added course!",
      postReqReload:true
    });
  });

// COURSE VIEW
router
  .route("/course/:id")
  .get(async (req, res) => {
    const course = await api.courses.getById(req.params.id);
    const students = await api.students.get();

    res.render("course-view", { course, students });
  })
  .post(async (req, res) => {
    let message = "";
    if (req.body.method == "UNENROLL") {
      const { student_id } = req.body;
      await api.enrollments.unenrollStudent(
        student_id,
        req.params.id
      );
      message = "Removed student from course!";
    } else if (req.body.method == "ENROLL") {
      const {student_ids} = req.body;
      await api.enrollments.addMany(student_ids, req.params.id)
      message = "Enrolled students in course!";
    } else {
      const { name, description } = req.body;
      await api.courses.update(req.params.id, name, description);
      message = "Updated course info!";
    }

    const course = await api.courses.getById(req.params.id);
    const students = await api.students.get();

    res.render("course-view", {
      course,
      students,
      message,
    });
  });

router.post("/delete-course/:id", async (req, res)=>{
  await api.enrollments.unenrollAllStudents(req.params.id);
  await api.courses.delete(req.params.id);
  res.redirect("/courses");
})

export default router;
