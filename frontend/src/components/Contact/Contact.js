import React from "react";
import { Button } from "@mui/material";
import { useLanguage } from "../../hooks/LanguageProvider";
import { translations } from "../../constants/translate";

const Contact = () => {
  const { currentLanguage } = useLanguage();

  return (
    <div
      style={{
        display: "flex",
        gap: "25px",
      }}
    >
      <div
        style={{
          width: "272px",
          height: "335px",
          marginLeft: "40px",
          marginTop: "140px",
          backgroundColor: "#01579b",
          borderRadius: "15px",
          border: "3px solid black",
          marginRight: "25px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "16px",
            color: "white",
            marginTop: "12px",
          }}
        >
          {translations[currentLanguage].infoAboutCSI}
        </p>
        <ul style={{ listStyle: "none", marginTop: "19px" }}>
          <li
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: "white",
            }}
          >
            {translations[currentLanguage].dewajtisAdress}{" "}
            {translations[currentLanguage].floorDewajtis}
            <br />
            <p style={{ marginTop: "10px" }}>
              {translations[currentLanguage].active}{" "}
              {translations[currentLanguage].time}
            </p>
            <Button
              href="https://goo.gl/maps/XpEzZdA6ER68JXyt9"
              target="_blank"
              color="secondary"
              variant="contained"
              sx={{
                width: "180px",
                height: "30px",
                marginTop: "12px",
                borderRadius: "12px",
              }}
            >
              {translations[currentLanguage].seeOntheMap}
            </Button>
          </li>

          <li
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "16px",
              color: "white",
              marginTop: "15px",
            }}
          >
            {translations[currentLanguage].woycickiegoAdress}{" "}
            {translations[currentLanguage].floorWoycickiego}
            <br />
            <p style={{ marginTop: "10px" }}>
              {" "}
              {translations[currentLanguage].active}{" "}
              {translations[currentLanguage].time}
            </p>
            <Button
              href="https://goo.gl/maps/1rexwNtMumVB9wgF7"
              target="_blank"
              color="secondary"
              variant="contained"
              sx={{
                width: "180px",
                height: "30px",
                marginTop: "12px",
                borderRadius: "12px",
              }}
            >
              {translations[currentLanguage].seeOntheMap}
            </Button>
          </li>
        </ul>
        <Button
          href="https://csi.uksw.edu.pl/"
          target="_blank"
          color="secondary"
          variant="contained"
          sx={{
            marginTop: "15px",
            marginLeft: "80px",
            width: "90px",
            height: "30px",
            borderRadius: "12px",
          }}
        >
          {translations[currentLanguage].more}
        </Button>
      </div>
      <img
        src="https://csi.uksw.edu.pl/fileadmin/_processed_/8/8/csm_oba_kampusy_2_13b5942568.jpg"
        alt="error"
        style={{ marginTop: "88px" }}
      />
    </div>
  );
};
export default Contact;
