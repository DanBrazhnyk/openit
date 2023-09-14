import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const router = express.Router();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: "",
  database: process.env.DB_COMMENTS,
});

const sql =
  "INSERT INTO comments (commenter_email, recipient_id, comment_text) VALUES (?, ?, ?)";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/comments", async (req, res) => {
  const { commenter_email, recipient_id ,comment_text, recipientEmail } = req.body;
  console.log("Received data:", commenter_email, recipient_id, comment_text);

  db.query(
    sql,
    [commenter_email, recipient_id, comment_text],
    (err, result) => {
      if (err) {
        console.error("Ошибка при добавлении комментария:", err);
        return res
          .status(500)
          .json({ error: "Ошибка сервера при сохранении комментария" });
      }
      console.log("Комментарий успешно сохранен в базе данных");

      const mailOptions = {
        from: commenter_email,
        to: recipientEmail, 
        subject: "New Comment Added",
        text: `${commenter_email} left a comment:\n\n${comment_text}`,
      };

      transporter.sendMail(mailOptions, (emailError, info) => {
        if (emailError) {
          console.error("Error sending email:", emailError);
        } else {
          console.log("Email notification sent:", info.response);
        }
      });

      res.status(200).json({ message: "Комментарий успешно сохранен" });
    }
  );
});
router.get("/getComments", (req, res) => {
    const selectQuery = "SELECT * FROM comments";
  
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
  router.post("/editComment", async (req, res) => {

    const {  comment_id,comment_text } = req.body;
  
    const updateQuery = "UPDATE comments SET comment_text = ? WHERE comment_id = ?";
  
    db.query(updateQuery, [comment_text, comment_id], (err, result) => {
      if (err) {
        console.error("Ошибка при обновлении комментария:", err);
        return res
          .status(500)
          .json({ error: "Ошибка сервера при обновлении комментария" });
      }
      console.log("Комментарий успешно обновлен в базе данных");
      res.status(200).json({ message: "Комментарий успешно обновлен" });
    });
  });
  
  router.post("/deleteComment", async (req, res) => {
    const { comment_id } = req.body;
  
    const deleteQuery = "DELETE FROM comments WHERE comment_id = ?";
  
    db.query(deleteQuery, [comment_id], (err, result) => {
      if (err) {
        console.error("Ошибка при удалении комментария:", err);
        return res
          .status(500)
          .json({ error: "Ошибка сервера при удалении комментария" });
      }
      console.log("Комментарий успешно удален из базы данных");
      res.status(200).json({ message: "Комментарий успешно удален" });
    });
  });
  
export default router;
