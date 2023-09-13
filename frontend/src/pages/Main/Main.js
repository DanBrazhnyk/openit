import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Link, Outlet } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";
import Footer from "../../components/Footer/Footer";
import { useLanguage } from "../../hooks/LanguageProvider";
import { translations } from "../../constants/translate";


const Main = () => {
  const [userRole, setUserRole] = useState("viewer");
  const { currentLanguage, changeLanguage } = useLanguage();


  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    if (storedUserRole) {
      setUserRole(storedUserRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    localStorage.removeItem("userEmail");
    setUserRole(null);
  };
  const handleLanguageChange = (language) => {
    changeLanguage(language);
    localStorage.setItem("language", language);
  };
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#98989C",
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <>
      <div>
        <nav style={{ marginBottom: "22px" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <img
              src="https://csi.uksw.edu.pl/typo3conf/ext/uksw_demo/Resources/Public/Images/CSI_logo.svg"
              alt="error"
              style={{
                height: "130px",
                width: "380px",
                marginLeft: "250px",
              }}
            />
          </Link>
          <ul
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              listStyle: "none",
              marginLeft: "140px",
            }}
          >
            <motion.li whileHover={{ borderBottom: "3px solid #98989C" }}>
              <Link
                to="/newReport"
                style={{
                  color: "#98989C",
                  fontWeight: "bold",
                  background: "transparent",
                  border: "none",
                  textDecoration: "none",
                  fontSize: "22px",
                  paddingBottom: "3px",
                }}
              >
                {translations[currentLanguage].submissions}
              </Link>
            </motion.li>
            <motion.li whileHover={{ borderBottom: "3px solid #98989C" }}>
              <Link
                style={{
                  color: "#98989C",
                  fontWeight: "bold",
                  background: "transparent",
                  border: "none",
                  textDecoration: "none",
                  fontSize: "22px",
                  paddingBottom: "3px",
                }}
              >
                {translations[currentLanguage].instruction}
              </Link>
            </motion.li>
            {userRole === "2" && (
              <>
                <motion.li whileHover={{ borderBottom: "3px solid #98989C" }}>
                  <Link
                    style={{
                      color: "#98989C",
                      fontWeight: "bold",
                      background: "transparent",
                      border: "none",
                      textDecoration: "none",
                      fontSize: "22px",
                      paddingBottom: "3px",
                    }}
                  >
                    {translations[currentLanguage].staff}
                  </Link>
                </motion.li>
                <motion.li whileHover={{ borderBottom: "3px solid #98989C" }}>
                  <Link
                    style={{
                      color: "#98989C",
                      fontWeight: "bold",
                      background: "transparent",
                      border: "none",
                      textDecoration: "none",
                      fontSize: "22px",
                      paddingBottom: "3px",
                    }}
                  >
                    {translations[currentLanguage].timetable}
                  </Link>
                </motion.li>
                <motion.li whileHover={{ borderBottom: "3px solid #98989C" }}>
                  <Link
                    style={{
                      color: "#98989C",
                      fontWeight: "bold",
                      background: "transparent",
                      border: "none",
                      textDecoration: "none",
                      fontSize: "22px",
                      paddingBottom: "3px",
                    }}
                  >
                    {translations[currentLanguage].tasks}
                  </Link>
                </motion.li>
              </>
            )}

            <motion.li whileHover={{ borderBottom: "3px solid #98989C" }}>
              <Link
                to="/Contact"
                style={{
                  color: "#98989C",
                  fontWeight: "bold",
                  background: "transparent",
                  border: "none",
                  paddingBottom: "3px",
                  textDecoration: "none",
                  fontSize: "22px",
                }}
              >
                {translations[currentLanguage].contact}
              </Link>
            </motion.li>
           
            <li>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder={translations[currentLanguage].searchPlaceholder}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </li>
             <li>
            <p>{translations[currentLanguage].roles[userRole]}</p>
            </li>
            <li>
              {userRole !== "viewer" && (
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginRight: "25px" }}
                    onClick={() => {
                      handleLogout();
                      handleLanguageChange("pl");
                    }}
                  >
                    {translations[currentLanguage].signOut}
                  </Button>
                </Link>
              )}
              {userRole === "viewer" && (
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ marginRight: "25px" }}
                  >
                    {translations[currentLanguage].signIn}
                  </Button>
                </Link>
              )}
            </li>
          </ul>
        </nav>
        <div
          style={{
            display: "flex",
            backgroundColor: "#F2F2F2",
            height: "40px",
          }}
        >
          <p
            style={{
              color: "#163a7d",
              marginLeft: "230px",
              marginTop: "10px",
              fontSize: "19px",
              fontWeight: "bold",
            }}
          >
            {translations[currentLanguage].csi}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "1040px",
            }}
          >
            <motion.button
              style={{
                border: "none",
                marginRight: "8px",
                color: "#163a7d",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.3 }}
              onClick={() => handleLanguageChange("pl")}
            >
              PL
            </motion.button>
            <span>/</span>
            <motion.button
              style={{
                border: "none",
                marginLeft: "4px",
                color: "#163a7d",
                fontSize: "16px",
                fontWeight: "bold",
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1.3 }}
              onClick={() => handleLanguageChange("en")}
            >
              EN
            </motion.button>
          </div>
        </div>
        <div style={{ minHeight: "100vh" }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
