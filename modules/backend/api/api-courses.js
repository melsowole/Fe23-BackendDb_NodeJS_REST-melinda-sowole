import db from "../db/db-connection.js";
import { addStudentsToCourses } from "./helper.js";

export default {
  async get(queries) {
    let queryString = `SELECT * FROM courses`;

    let queriesAdded = 0;

    for (const query in queries) {
      if (queriesAdded == 0) {
        queryString = `
            SELECT 
              s.*,
              c.*
            FROM courses c
            LEFT JOIN students_courses sc
              ON c.course_id = sc.course_id
            LEFT JOIN students s
              ON  sc.student_id = s.student_id
          `;
      }
      queryString +=
        (queriesAdded++ > 0 ? " OR " : " WHERE ") +
        `${query} LIKE '%${queries[query]}%'`;
    }

    const results = await db.query(queryString);

    return queriesAdded ? addStudentsToCourses(results) : results;
  },
  async add(name, description) {
    const result = await db.query(
      `
        INSERT INTO courses (name, description)
        VALUES (?, ?)
      `,
      [name, description]
    );

    return await this.getById(result.insertId);
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

    return course;
  },
  async delete(id) {
    return await db.query(
      `
        DELETE FROM courses
        WHERE course_id = ?`,
      [id]
    );
  },
};
