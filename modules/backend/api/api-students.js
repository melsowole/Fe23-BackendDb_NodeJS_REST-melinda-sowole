import db from "../db/db-connection.js";
import { addCoursesToStudents } from "./helper.js";

export default {
  async get(queries) {
    let queryString = `SELECT * FROM students`;

    let queriesAdded = 0;

    for (const query in queries) {
      if (queriesAdded == 0) {
        queryString = `
            SELECT 
              s.*,
              c.*
            FROM students s
            LEFT JOIN students_courses sc
              ON s.student_id = sc.student_id
            LEFT JOIN courses c
              ON  sc.course_id = c.course_id
          `;
      }
      queryString +=
        (queriesAdded++ > 0 ? " AND " : " WHERE ") +
        `${query} = '${queries[query]}'`;
    }

    queryString += ` ORDER BY lName`;

    const results = await db.query(queryString);

    return queriesAdded ? addCoursesToStudents(results) : results;
  },
  async add(fName, lName, town) {
    const result = await db.query(
      `
        INSERT INTO students (fName, lName, town)
        VALUES (?, ?, ?)
      `,
      [fName, lName, town]
    );

    return await this.getById(result.insertId);
  },
  async getById(id) {
    const result = await db.query(
      `
         SELECT 
          s.*,
          c.*
        FROM students s
        LEFT JOIN students_courses sc
          ON s.student_id = sc.student_id
        LEFT JOIN courses c
          ON  sc.course_id = c.course_id
        WHERE s.student_id = ?
          `,
      [id]
    );

    const [student] = addCoursesToStudents(result);

    return student;
  },
  async delete(id) {
    return await db.query(
      `
        DELETE FROM students
        WHERE student_id = ?`,
      [id]
    );
  },
  async update(id, fName, lName, town) {
    await db.query(
      `
      UPDATE students
      SET fName = ?, lName = ?, town = ?
      WHERE student_id = ?
    `,
      [fName, lName, town, id]
    );

    return { message: "Updated student info!" };
  },
};
