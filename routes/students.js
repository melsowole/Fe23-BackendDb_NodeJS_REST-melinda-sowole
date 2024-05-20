import { Router } from "express";
import api from "../modules/api/api.js";
import { DBError, sendError } from "../modules/db/DBError.js";
import { containsInvalidQueries } from "./helper.js";

const route = Router();

route
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

route
  .route("/:id")
  .get(async (req, res) => {
    try {
      const student = await api.students.getById(req.params.id);
      res.json(student);
    } catch (err) {
      sendError(res, err);
    }
  })
  .delete(async (req, res) => {
    try {
      await api.students.delete(req.params.id);
      res.json({ message: "deleted student with id " + req.params.id });
    } catch (err) {
      sendError(res, err);
    }
  });

export default route;
