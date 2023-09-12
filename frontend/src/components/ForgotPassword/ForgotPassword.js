import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useLanguage } from "../../hooks/LanguageProvider";
import { translations } from "../../constants/translate";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import LockResetIcon from "@mui/icons-material/LockReset";

const ForgotPassword = () => {
  const { currentLanguage, changeLanguage } = useLanguage();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showTimer, setShowTimer] = useState(false);
  const [timer, setTimer] = useState(300);
  const [isSnackbarOpenSuccess, setIsSnackbarOpenSuccess] = useState(false);
  const [isSnackbarOpenInfo, setIsSnackbarOpenInfo] = useState(false);
  const [isOpenErrorEmail, setIsOpenErrorEmail] = useState(false);
  const [isOpenErrorToken, setIsOpenErrorToken] = useState(false);
  const [isOpenErrorEmpty, setIsOpenErrorEmpty] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;

    if (showTimer && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowTimer(false);
    }

    return () => {
      clearInterval(interval);
    };
  }, [showTimer, timer]);

  const handleSendPassword = async () => {
    try {
      if (!email) {
        return setIsOpenErrorEmail(true);
      }

      const responseUser = await axios.post(
        "http://localhost:8081/check-email",
        {
          email: email,
        }
      );

      if (responseUser.data.exists) {
        const response = await axios.post(
          "http://localhost:8081/forgotPassword",
          { email }
        );

        setIsSnackbarOpenInfo(true);
        setMessage(response.data.message);
        setShowTimer(true);
      } else {
        setIsOpenErrorEmail(true);
      }
    } catch (error) {
      console.error("Error sending email: ", error);
      setMessage("An error occurred while sending the email");
    }
  };

  const handleResetPassword = async () => {
    try {
      if (token==="" || newPassword==="") {
        return setIsOpenErrorEmpty(true);
      }else{
        const responseToken = await axios.post(
          "http://localhost:8081/check-token",
          {
            token: token,
          }
        );
        if (responseToken.data.exists) {
          const response = await axios.post(
            "http://localhost:8081/resetPassword",
            {
              email,
              token,
              newPassword,
            }
          );
          setMessage(response.data.message);
          setToken("");
          setShowTimer(false);
  
          setIsSnackbarOpenSuccess(true);
          setEmail("");
          setToken("");
          setNewPassword("");
          setTimeout(() => {
            navigate("/login");
          }, 720);
        } else {
          setIsOpenErrorToken(true);
        }
      }
    } catch (error) {
      console.error("Error resetting password: ", error);
      setMessage("An error occurred while resetting the password");
    }
  };

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#e0e0e0",
      }}
    >
      <img
        src="https://uksw.edu.pl/wp-content/uploads/2023/01/logo.svg"
        alt="error"
        style={{
          marginLeft: "605px",
          width: "420px",
          marginTop: "35px",
          marginBottom: "24px",
        }}
      />
      <Paper
        elevation={18}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          width: "600px",
          height: "554px",
          borderRadius: "20px",
          ml: "525px",
        }}
      >
        <div style={{ display: "flex", marginTop: "42px" }}>
          <Typography
            sx={{
              backgroundColor: "#163a7d",
              color: "white",
              fontWeight: "bold",
              width: "210px",
              height: "50px",
              textAlign: "center",
              paddingTop: "7px",
              fontSize: "24px",
              borderRadius: "20px",
            }}
          >
            {translations[currentLanguage].reset}
            <LockResetIcon
              style={{
                marginTop: "6px",
                marginLeft: "10px",
                width: "27px",
                height: "27px",
              }}
            />
          </Typography>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8, marginTop: "-30px" }}
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => changeLanguage("pl")}
          >
            <img
              src="https://login.uksw.edu.pl/img/lang_pl.png"
              alt="error"
              style={{
                width: "34px",
                height: "28px",
                borderRadius: "8px",
                marginLeft: "40px",
                border: currentLanguage === "pl" ? "2px solid black" : "none",
              }}
            />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8, marginTop: "-30px" }}
            style={{ border: "none", backgroundColor: "transparent" }}
            onClick={() => changeLanguage("en")}
          >
            <img
              src="https://login.uksw.edu.pl/img/lang_en.png"
              alt="error"
              style={{
                width: "34px",
                height: "28px",
                borderRadius: "8px",
                marginLeft: "40px",
                border: currentLanguage === "en" ? "2px solid black" : "none",
              }}
            />
          </motion.button>
        </div>
        <Typography
          color="primary"
          sx={{
            mt: 2,
            textAlign: "center",
            color: "#163a7d",
            fontWeight: "bold",
          }}
        >
          {translations[currentLanguage].instructionLogin}
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={translations[currentLanguage].adressMail}
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ backgroundColor: "white", mt: 2, width: "350px" }}
        />
        <Button
          variant="contained"
          onClick={handleSendPassword}
          color="primary"
          sx={{ mt: 2, width: "130px", bgcolor: "#163a7d" }}
        >
          {translations[currentLanguage].send}
        </Button>

        {showTimer && timer > 0 && (
          <Box sx={{ mt: "10px", mb: "10px" }}>
            <Typography variant="h6" color="textSecondary">
              {translations[currentLanguage].timeRemaining}
            </Typography>
            <Typography
              variant="h4"
              sx={{ marginLeft: "25px", height: "10px" }}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </Typography>
          </Box>
        )}

        {showTimer && timer === 0 && (
          <Typography variant="body1" color="error" sx={{ mt: 2 }}>
            {translations[currentLanguage].tokenExpired}
          </Typography>
        )}

        <Typography
          color="primary"
          sx={{ mt: 2, color: "#163a7d", fontWeight: "bold" }}
        >
          {translations[currentLanguage].incsrtuctionReset}
        </Typography>
        <div style={{ display: "flex" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="token"
            label={translations[currentLanguage].resetToken}
            name="token"
            autoComplete="off"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            sx={{
              backgroundColor: "white",
              mt: 2,
              width: "250px",
              marginRight: "20px",
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label={translations[currentLanguage].newPassword}
            name="newPassword"
            type="password"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ backgroundColor: "white", mt: 2, width: "250px" }}
          />
        </div>

        <Button
          variant="contained"
          onClick={handleResetPassword}
          color="primary"
          sx={{ mt: 2, bgcolor: "#163a7d" }}
        >
          {translations[currentLanguage].resetPassword}
        </Button>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.9 }}>
          <Link
            to="/login"
            variant="body2"
            style={{
              marginTop: "20px",
              display: "block",
              textDecoration: "none",
              color: "#163a7d",
              fontWeight: "bold",
              fontSize: "21px",
            }}
          >
            {translations[currentLanguage].backToLogin}
          </Link>
        </motion.div>
      </Paper>
      <div style={{ width: "650px", marginTop: "15px", marginLeft: "525px" }}>
        <Typography sx={{ color: "#163a7d", fontWeight: "bold" }}>
          {"Copyright © "} {new Date().getFullYear()}{" "}
          <a
            style={{ color: "#163a7d" }}
            href="https://uksw.edu.pl/"
            target="_blank"
            rel="noreferrer"
          >
            {translations[currentLanguage].uksw}
          </a>
        </Typography>
      </div>
      <Snackbar
        open={isSnackbarOpenSuccess}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpenSuccess(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="success"
          sx={{ width: "100%", ml: "109px", mt: "8px" }}
        >
          {currentLanguage === "en"
            ? "Password changed successfully!"
            : "Hasło zostało pomyślnie zmienione!"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isSnackbarOpenInfo}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpenInfo(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" sx={{ width: "100%", ml: "109px", mt: "8px" }}>
          {currentLanguage === "en"
            ? "We sent a token to your email!"
            : "Wysłaliśmy token na twój e-mail!"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpenErrorEmail}
        autoHideDuration={6000}
        onClose={() => setIsOpenErrorEmail(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%", ml: "109px", mt: "8px" }}>
          {currentLanguage === "en"
            ? "No such email exists in the database"
            : "W bazie danych nie istnieje takiego e-maila"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpenErrorToken}
        autoHideDuration={6000}
        onClose={() => setIsOpenErrorToken(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%", ml: "109px", mt: "8px" }}>
          {currentLanguage === "en"
            ? "There is no such token"
            : "Nie ma takiego tokena"}
        </Alert>
      </Snackbar>
      <Snackbar
        open={isOpenErrorEmpty}
        autoHideDuration={6000}
        onClose={() => setIsOpenErrorEmpty(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="error" sx={{ width: "100%", ml: "109px", mt: "8px" }}>
          {currentLanguage === "en"
            ? "Nie powinno być pustych miejsc w polach!"
            : "There should be no empty spaces in the fields!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
