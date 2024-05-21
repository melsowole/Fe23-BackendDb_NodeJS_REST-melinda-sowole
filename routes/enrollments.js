import { Router } from "express";
import api from "../modules/api/api.js";
import { DBError, sendError } from "../modules/db/DBError.js";
import { containsInvalidQueries } from "./helper.js";

const route = Router();

route
  .route("/")
  .get(async (req, res) => {
    try {
      const enrollments = await api.enrollments.get();
      res.json(enrollments);
    } catch (err) {
      sendError(res, err);
    }
  })
  .post(async (req, res) => {
    try {
      const { student_id, course_id } = req.body;
      if (!student_id || !course_id) {
        throw new DBError(
          400,
          "student_id, course_id are all required fields!"
        );
      }
      const newEnrollment = await api.enrollments.add(student_id, course_id);
      res.json(newEnrollment);
    } catch (err) {
      sendError(res, err);
    }
  })
  .delete(async (req, res) => {
    try {
      const { student_id, course_id } = req.body;
      if (!student_id || !course_id) {
        throw new DBError(
          400,
          "student_id, course_id are all required fields!"
        );
      }

      await api.enrollments.unenrollStudent(student_id, course_id);
      res.json({ message: "Removed student from course" });
    } catch (err) {
      sendError(res, err);
    }
  });

export default route;
