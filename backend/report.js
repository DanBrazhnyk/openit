import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_EMAIL,
});
router.get("/sender/reports", (req, res) => {
    const { email } = req.query; 
    const selectQuery = "SELECT * FROM message WHERE senderEmail = ?";
    db.query(selectQuery, [email], (err, results) => {
      if (err) {
        console.error("Error fetching reports:", err);
        res.status(500).json({ error: "Error fetching reports" });
      } else {
        res.status(200).json(results);
      }
    });
  });
  router.get("/recipient/reports", (req, res) => {
    const { email } = req.query; 
    const selectQuery = "SELECT * FROM message WHERE  recipientEmail = ?";
    db.query(selectQuery, [email], (err, results) => {
      if (err) {
        console.error("Error fetching reports:", err);
        res.status(500).json({ error: "Error fetching reports" });
      } else {
        res.status(200).json(results);
      }
    });
  });
  

  export default router;
  

