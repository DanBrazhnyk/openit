import express from "express";
import nodemailer from "nodemailer";
import mysql from "mysql";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const router = express.Router();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_EMAIL,
});
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/email", upload.single("file"), (req, res) => {
  const { bio, phone, senderEmail, recipientEmail, location, report,subject } = req.body;
  const file = req.file;
  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: subject,
    text: `Name: ${bio}\nPhone: ${phone}\nLocation: ${location}\nReport: ${report}`,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };

  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res
        .status(500)
        .json({ error: "Error sending email", details: error.message });
    } else {
      console.log("Email sent:", info.response);

      const insertQuery =
        "INSERT INTO message (bio, phone, senderEmail, recipientEmail, location, report,subject) VALUES (?, ?, ?, ?, ?, ?, ?)";
      db.query(
        insertQuery,
        [bio, phone, senderEmail, recipientEmail, location, report,subject],
        (err, result) => {
          if (err) {
            console.error("Error saving to MySQL:", err);
            res
              .status(500)
              .json({ error: "Error saving to MySQL", details: err.message });
          } else {
            console.log("Saved to MySQL:", result);
            res.status(200).json({ message: "Email sent and saved to MySQL" });
          }
        }
      );
    }
  });
});

router.get("/getEmails", (req, res) => {
  const selectQuery = "SELECT * FROM message";

  db.query(selectQuery, (err, results) => {
    if (err) {
      console.error("Error fetching email data from MySQL:", err);
      res
        .status(500)
        .json({ error: "Error fetching email data", details: err.message });
    } else {
      console.log("Fetched email data from MySQL:", results);
      res.status(200).json(results);
    }
  });
});


export default router;
