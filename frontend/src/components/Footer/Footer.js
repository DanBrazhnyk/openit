import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Button, Link } from "@mui/material";
import { useNavigate } from "react-router";
import { useLanguage } from "../../hooks/LanguageProvider";
import { translations } from "../../constants/translate";

const Footer = () => {
  const navigate = useNavigate();
  const { currentLanguage } = useLanguage();

  return (
    <footer
      style={{
        backgroundColor: "#163a7d",
        height: "410px",
        paddingTop: "20px",
      }}
    >
      <div style={{ marginLeft: "120px", marginTop: "15px" }}>
        <p
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: "17px",
            marginBottom: "9px",
          }}
        >
          {translations[currentLanguage].systemsCenter}
        </p>
        <ul style={{ listStyle: "none", marginLeft: "20px" }}>
          <li>
            <p
              style={{ color: "white", fontSize: "16px", marginBottom: "5px" }}
            >
              {translations[currentLanguage].adress}
            </p>
            <br />
            <p style={{ color: "white", fontSize: "16px" }}>
              {translations[currentLanguage].number}
            </p>
            <br />
            <p style={{ color: "white", fontSize: "16px" }}>
              {translations[currentLanguage].room}
            </p>
            <br />
            <Link
              href="mailto:csi@uksw.edu.pl"
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "16px",
              }}
            >
              csi@uksw.edu.pl
            </Link>
          </li>
        </ul>
      </div>
      <div style={{ marginLeft: "120px", marginTop: "25px" }}>
        <p
          style={{
            fontWeight: "bold",
            color: "white",
            fontSize: "17px",
            marginBottom: "9px",
          }}
        >
          {translations[currentLanguage].uksw}
        </p>
        <ul style={{ listStyle: "none", marginLeft: "20px" }}>
          <li>
            <p style={{ color: "white", fontSize: "16px" }}>
              {translations[currentLanguage].adress}
            </p>
            <br />
            <p style={{ color: "white", fontSize: "16px" }}>
              {translations[currentLanguage].ukswPhone}
            </p>
            <br />
            <p style={{ color: "white", fontSize: "16px" }}>
              NIP: 525-00-12-946 | REGON: 000001956
            </p>
            <br />
          </li>
        </ul>
      </div>
      <img
        src="https://csi.uksw.edu.pl/fileadmin/user_upload/Stopka_akronim_godlo.svg"
        alt="error"
        style={{
          height: "200px",
          width: "370px",
          float: "right",
          marginTop: "-300px",
          marginRight: "220px",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "16px",
        }}
      >
        <Link
          href="https://www.facebook.com/csi.uksw/"
          target="_blank"
          style={{ color: "white" }}
        >
          <FacebookIcon
            sx={{ width: "40px", height: "40px", marginTop: "-6px" }}
          />
        </Link>
        <Button
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            textDecoration: "none",
            fontSize: "17px",
            paddingBottom: "3px",
          }}
          onClick={() => {
            navigate("/newReport");
          }}
        >
          Zgłoszenia
        </Button>
        <Button
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            textDecoration: "none",
            fontSize: "17px",
            paddingBottom: "3px",
          }}
          onClick={() => {
            navigate("/Contact");
          }}
        >
          Contact
        </Button>
        <Button
          style={{
            color: "white",
            background: "transparent",
            border: "none",
            textDecoration: "none",
            fontSize: "17px",
            paddingBottom: "3px",
          }}
          onClick={() => {
            alert("gegeg");
          }}
        >
          Instrukcja
        </Button>
        <p
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "19px",
            marginLeft: "200px",
          }}
        >
          CSI/ ©UKSW 2023.
        </p>
      </div>
    </footer>
  );
};
export default Footer;
