import React, { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useLanguage } from "../../hooks/LanguageProvider";
import { motion } from "framer-motion";
import { translations } from "../../constants/translate";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const Registration = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
  });

  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://localhost:8081/roles");
        setRoleOptions(response.data);
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updateErrors = (field, message) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: message,
      }));
    };

    if (!values.name) {
      currentLanguage === "en"
        ? updateErrors("name", "Please enter your first name.")
        : updateErrors("name", "Proszę podaj swoje imię.");
      return;
    } else {
      updateErrors("name", "");
    }

    if (!values.surname) {
      currentLanguage === "en"
        ? updateErrors("surname", "Please enter your last name.")
        : updateErrors("surname", "Proszę podaj swoje nazwisko.");
      return;
    } else {
      updateErrors("surname", "");
    }

    if (!values.email || !values.email.includes("@")) {
      currentLanguage === "en"
        ? updateErrors("email", "Please enter a valid email address.")
        : updateErrors(
            "email",
            "Proszę podać poprawnie napisany  adres e-mail."
          );
      return;
    } else {
      updateErrors("email", "");
    }

    if (!values.password) {
      currentLanguage === "en"
        ? updateErrors("password", "Please enter a password.")
        : updateErrors("password", "Proszę podaj swoje  hasło.");
      return;
    } else {
      updateErrors("password", "");
    }

    if (!values.role) {
      currentLanguage === "en"
        ? updateErrors("role", "Please select your role.")
        : updateErrors("role", "Proszę wybierz swoją rolę.");
      return;
    } else {
      updateErrors("role", "");
    }

    try {
      const response = await axios.post("http://localhost:8081/check-email", {
        email: values.email,
      });

      if (response.data.exists) {
        currentLanguage === "en"
          ? updateErrors("email", "This email is already registered.")
          : updateErrors("email", "Ten email już jest zarejestrowany.");
        return;
      } else {
        updateErrors("email", "");
      }

      const registrationResponse = await axios.post(
        "http://localhost:8081/signup",
        {
          ...values,
        }
      );

      console.log("User registered:", registrationResponse.data);

      setIsSnackbarOpen(true);
      setValues({ name: "", surname: "", email: "", password: "", role: "" });
      setTimeout(() => {
        navigate("/login");
      }, 600);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };
  const { currentLanguage, changeLanguage } = useLanguage();
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordVisibilityChange = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div style={{ backgroundColor: "#e0e0e0", height: "100vh" }}>
      <img
        src="https://uksw.edu.pl/wp-content/uploads/2023/01/logo.svg"
        alt="error"
        style={{
          marginLeft: "605px",
          width: "420px",
          marginTop: "35px",
          marginBottom: "33px",
        }}
      />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={18}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            width: "510px",
            height: "530px",
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
              {translations[currentLanguage].registrationTitle}
              <LockOpenIcon
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label={translations[currentLanguage].registreName}
                  autoFocus
                  value={values.name}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      name:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    });
                    setErrors({ ...errors, name: "" });
                  }}
                  error={!!errors.name}
                  helperText={errors.name}
                  sx={{
                    backgroundColor: "white",
                    width: "210px",
                    marginLeft: "28px",
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="surname"
                  label={translations[currentLanguage].registreSurname}
                  name="surname"
                  autoComplete="family-name"
                  value={values.surname}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      surname:
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1),
                    });
                    setErrors({ ...errors, surname: "" });
                  }}
                  error={!!errors.surname}
                  helperText={errors.surname}
                  sx={{ width: "210px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label={translations[currentLanguage].adressMail}
                  name="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value });
                    setErrors({ ...errors, email: "" });
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                  sx={{ width: "445px", marginLeft: "27px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label={translations[currentLanguage].password}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={values.password}
                  onChange={(e) => {
                    setValues({ ...values, password: e.target.value });
                    setErrors({ ...errors, password: "" });
                  }}
                  error={!!errors.password}
                  helperText={errors.password}
                  sx={{
                    width: "280px",
                    marginLeft: "27px",
                    marginRight: "23px",
                  }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={showPassword}
                      onChange={handlePasswordVisibilityChange}
                      color="primary"
                    />
                  }
                  label={translations[currentLanguage].showPassword}
                  style={{ color: "#163a7d", marginTop: "10px" }}
                />
              </Grid>
              <Grid item xs={12}>
                <Select
                  required
                  fullWidth
                  name="role"
                  id="role"
                  value={values.role}
                  onChange={(e) => {
                    setValues({ ...values, role: e.target.value });
                    setErrors({ ...errors, role: "" });
                  }}
                  displayEmpty
                  error={!!errors.role}
                  sx={{ width: "445px", marginLeft: "27px" }}
                >
                  <MenuItem value="" disabled>
                    {translations[currentLanguage].role}
                  </MenuItem>
                  {roleOptions &&
                    roleOptions.map((role) => (
                      <MenuItem key={role.id} value={role.id}>
                        {currentLanguage === "en"
                          ? translations[currentLanguage].roles[role.id]
                          : translations[currentLanguage].roles[role.id]}
                      </MenuItem>
                    ))}
                </Select>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: "445px",
                marginLeft: "27px",
                mt: "25px",
                mb: "25px",
                bgcolor: "#163a7d",
              }}
            >
              {translations[currentLanguage].signUP}
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    to="/login"
                    variant="body2"
                    style={{
                      textDecoration: "none",
                      color: "#163a7d",
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
                  >
                    {translations[currentLanguage].alreadyHaveAccount}
                  </Link>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Paper>
        <div style={{ width: "650px", marginTop: "25px", marginLeft: "-20px" }}>
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
      </Container>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {currentLanguage === "en"
            ? "You have successfully registered!"
            : "Zarejestrowałeś się pomyślnie!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registration;
