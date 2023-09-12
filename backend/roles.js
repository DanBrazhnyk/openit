import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_ROLESDB,
});

router.get("/roles", (req, res) => {
  const getRolesQuery = "SELECT id, name FROM roles";

  db.query(getRolesQuery, (err, results) => {
    if (err) {
      console.error("Error querying the database: ", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      const roles = results.map((row) => ({
        id: row.id,
        name: row.name,
      }));
      res.status(200).json(roles);
    }
  });
});

export default router;
