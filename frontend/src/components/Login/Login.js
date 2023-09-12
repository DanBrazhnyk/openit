import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link, useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Switch from "@mui/material/Switch";
import { translations } from "../../constants/translate";
import { useLanguage } from "../../hooks/LanguageProvider";
import { motion } from "framer-motion";

const Login = () => {
  const { currentLanguage, changeLanguage } = useLanguage();

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/login", {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        navigate("/");
        localStorage.setItem("userRole", response.data.role);
        console.log(response.data.role);
        localStorage.setItem("userEmail", response.data.email);
        console.log(response.data.email);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError("Invalid credentials");
        setIsSnackbarOpen(true);
      } else {
        setError("An error occurred");
      }
    }
  };
  return (
    <div style={{ backgroundColor: "#163a7d", height: "100vh" }}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <img
          src="https://csi.uksw.edu.pl/fileadmin/user_upload/Stopka_akronim_godlo.svg"
          alt="error"
          style={{ marginLeft: "100px", marginTop: "35px" }}
        />

        <Box
          sx={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            width: "500px",
            height: "500px",
            borderRadius: "20px",
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
              {translations[currentLanguage].login}
              <LockOutlinedIcon
                style={{
                  paddingTop: "6px",
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
          <form onSubmit={handleSubmit}>
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
              sx={{ width: "350px", marginLeft: "80px", marginTop: "25px" }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={translations[currentLanguage].password}
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ width: "350px", marginLeft: "80px", marginTop: "25px" }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showPassword}
                  onChange={handlePasswordVisibilityChange}
                />
              }
              label={translations[currentLanguage].showPassword}
              style={{
                marginLeft: "100px",
                marginTop: "10px",
                color: "#163a7d",
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: "350px",
                marginLeft: "80px",
                marginTop: "25px",
                bgcolor: "#163a7d",
              }}
            >
              {translations[currentLanguage].loginBTN}
            </Button>

            <Grid container style={{ marginTop: "47px" }}>
              <Grid item xs style={{ marginLeft: "35px", marginRight: "20px" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/ForgotPassword"
                    variant="body2"
                    style={{
                      textDecoration: "none",
                      color: "#163a7d",
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
                  >
                    {translations[currentLanguage].forgotPassword}
                  </Link>
                </motion.div>
              </Grid>
              <Grid item style={{ marginRight: "27px" }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/registration"
                    variant="body2"
                    style={{
                      textDecoration: "none",
                      color: "#163a7d",
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
                  >
                    {translations[currentLanguage].registre}
                  </Link>
                </motion.div>
              </Grid>
            </Grid>
          </form>
        </Box>
        <div style={{ width: "650px", marginTop: "20px", marginLeft: "-35px" }}>
          <Typography sx={{ color: "white", fontWeight: "bold" }}>
            {"Copyright © "} {new Date().getFullYear()}{" "}
            <a
              style={{ color: "white" }}
              href="https://uksw.edu.pl/"
              target="_blank"
              rel="noreferrer"
            >
              {translations[currentLanguage].uksw}
            </a>
          </Typography>
        </div>
      </Container>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={1200}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity="error"
          sx={{ width: "100%", marginLeft: "70px", marginTop: "10px" }}
        >
          {translations[currentLanguage].alertLogin}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
