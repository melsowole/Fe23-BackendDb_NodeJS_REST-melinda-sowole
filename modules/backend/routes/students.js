import { Router } from "express";
import api from "../api/api.js";
import { DBError, sendError } from "../db/DBError.js";
import { containsInvalidQueries } from "./helper.js";

const router = Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      if (containsInvalidQueries(req.query, ["fName", "lName", "town"])) {
        throw new DBError(
          400,
          "provide only valid queries: fName, lName & town!"
        );
      }
      const students = await api.students.get(req.query);
      res.json(students);
    } catch (err) {
      sendError(res, err);
    }
  })
  .post(async (req, res) => {
    try {
      const { fName, lName, town } = req.body;
      if (!fName || !lName || !town) {
        throw new DBError(
          400,
          "fName, lName and town are all required fields!"
        );
      }
      const addedStudent = await api.students.add(fName, lName, town);
      res.json(addedStudent);
    } catch (err) {
      sendError(res, err);
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const student = await api.students.getById(req.params.id);
      res.json(student);
    } catch (err) {
      sendError(res, err);
    }
  })
  .patch(async (req, res) => {
    try {
      const { fName, lName, town } = req.body;
      if (!fName || !lName || !town) {
        throw new DBError(
          400,
          "fName, lName and town are all required fields!"
        );
      }

      const result = await api.students.update(
        req.params.id,
        fName,
        lName,
        town
      );
      res.json(result);
    } catch (err) {
      sendError(res, err);
    }
  })
  .delete(async (req, res) => {
    try {
      // remove enrollments
      await api.enrollments.unenrollFromAllCourses(req.params.id);
      // remove student
      await api.students.delete(req.params.id);
      res.json({ message: "deleted student with id " + req.params.id });
    } catch (err) {
      sendError(res, err);
    }
  });

export default router;
