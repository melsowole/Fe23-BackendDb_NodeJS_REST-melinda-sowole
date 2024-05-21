import { Router } from "express";
import api from "../modules/api/api.js";
import { DBError, sendError } from "../modules/db/DBError.js";
import { containsInvalidQueries } from "./helper.js";

const route = Router();

route
  .route("/")
  .get(async (req, res) => {
    try {
      if (containsInvalidQueries(req.query, ["name", "description"])) {
        throw new DBError(
          400,
          "provide only valid queries: name & description!"
        );
      }
      const courses = await api.courses.get(req.query);
      res.json(courses);
    } catch (err) {
      console.log(err);
      sendError(res, err);
    }
  })
  .post(async (req, res) => {
    try {
      const { name, description } = req.body;
      if (!name || !description) {
        throw new DBError(
          400,
          "name and description are both required fields!"
        );
      }
      const addedCourse = await api.courses.add(name, description);
      res.json(addedCourse);
    } catch (err) {
      sendError(res, err);
    }
  });

route
  .route("/:id")
  .get(async (req, res) => {
    try {
      const course = await api.courses.getById(req.params.id);
      res.json(course);
    } catch (err) {
      sendError(res, err);
    }
  })
  .delete(async (req, res) => {
    try {
      // remove enrollments
      await api.enrollments.unenrollAllStudents(req.params.id);
      // remove course
      await api.courses.delete(req.params.id);
      res.json({ message: "deleted course with id " + req.params.id });
    } catch (err) {
      sendError(res, err);
    }
  });

export default route;
