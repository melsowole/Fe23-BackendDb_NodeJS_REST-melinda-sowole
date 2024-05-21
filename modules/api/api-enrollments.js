import { DBError } from "../db/DBError.js";
import db from "../db/db-connection.js";
import { addStudentsToCourses } from "./helper.js";

export default {
  async get() {
    const results = await db.query(`
    SELECT 
      c.course_id,
      c.name,
      s.fName,
      s.lName
    FROM students_courses sc
    LEFT JOIN students s
      ON sc.student_id = s.student_id
    LEFT JOIN courses c
      ON sc.course_id = c.course_id
    ORDER BY c.course_id, s.lName
    `);

    console.log(results);

    return results;
  },
  async add(student_id, course_id) {
    const studentAlreadyEnrolled = await db.query(
      `SELECT * FROM students_courses WHERE student_id = ? AND course_id = ?`,
      [student_id, course_id]
    );

    if (studentAlreadyEnrolled.length > 0) {
      console.log("student already in class");
      throw new DBError(409, "Student already enrolled in course");
    }

    const result = await db.query(
      `
        INSERT INTO students_courses (student_id, course_id)
        VALUES (?, ?)
      `,
      [student_id, course_id]
    );

    return { message: "Successfully enrolled student" };
  },
  async getById(id) {
    const result = await db.query(
      `
      SELECT 
        c.*,
        s.*
      FROM courses c
      LEFT JOIN students_courses sc
        ON c.course_id = sc.course_id
      LEFT JOIN students s
        ON  sc.student_id = s.student_id
      WHERE c.course_id = ?`,
      [id]
    );

    const [course] = addStudentsToCourses(result);

    console.log(course);

    return course;
  },
  async unenrollStudent(student_id, course_id) {
    return await db.query(
      `
        DELETE FROM students_courses
        WHERE student_id = ?
        AND course_id = ?`,
      [student_id, course_id]
    );
  },
  async unenrollFromAllCourses(student_id) {
    return await db.query(
      `DELETE FROM students_courses WHERE student_id = ? `,
      [student_id]
    );
  },
  async unenrollAllStudents(course_id) {
    return await db.query(`DELETE FROM students_courses WHERE course_id = ? `, [
      course_id,
    ]);
  },
};
