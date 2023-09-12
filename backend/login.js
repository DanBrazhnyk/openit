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


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const selectLoginData = "SELECT * FROM users WHERE email = ?";
  db.query(selectLoginData, [email], (err, results) => {
    if (err) {
      console.error("Error querying the database: ", err);
      res.status(500).json({ error: "An error occurred" });
    } else {
      if (results.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
      } else {
        const storedHashedPassword = results[0].password;
        const userRole = results[0].role;
        const userEmail = results[0].email; 
        bcrypt.compare(password, storedHashedPassword, (bcryptErr, isMatch) => {
          if (bcryptErr) {
            console.error("Error comparing passwords: ", bcryptErr);
            res.status(500).json({ error: "An error occurred" });
          } else if (!isMatch) {
            res.status(401).json({ error: "Invalid credentials" });
          } else {
            res.status(200).json({
              message: "Login successful",
              role: userRole,
              email: userEmail, 
            });
          }
        });
      }
    }
  });
});

export default router;
