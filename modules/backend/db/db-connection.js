import mysql from "mysql2/promise";
import { DBError } from "./DBError.js";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "GritAcademy",
  password: "root",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export default {
  query: (sql, values) => {
    return new Promise(async (resolve, reject) => {
      try {
        const [data] = await pool.query(sql, values);
        resolve(data);
      } catch (err) {
        reject(new DBError(500, err.message));
      }
    });
  },
};
