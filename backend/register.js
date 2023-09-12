import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const router = express.Router();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_SIGNUP,
});
const insertIntoUsers =
  "INSERT INTO users (name, surname, email, password,role) VALUES (?, ?, ?, ?, ?)";

router.post("/signup",async (req, res) => {
  const { name, surname, email, password, role } = req.body;
  console.log("Received data:", name, surname, email, password, role);
   const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    insertIntoUsers,
    [name, surname, email, hashedPassword, role],
    (err, result) => {
      if (err) {
        console.error("Error inserting data into the database: ", err);
        res.status(500).json({ error: "An error occurred" });
      } else {
        console.log("Data inserted successfully");
        res.status(200).json({ message: "Data inserted successfully" });
      }
    }
  );
});

router.post("/check-email", (req, res) => {
  const { email } = req.body;
  const checkEmailQuery = "SELECT COUNT(*) AS count FROM users WHERE email = ?";

  db.query(checkEmailQuery, [email], (err, results) => {
    if (err) {
      console.error("Error querying the database: ", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      const count = results[0].count;
      res.status(200).json({ exists: count > 0 });
    }
  });
});

export default router;
