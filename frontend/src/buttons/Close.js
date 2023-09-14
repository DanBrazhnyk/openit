import React from "react";
import { Button } from "@mui/material";

const Close = (props) => {
  return (

    <button
    style={{
      background: "#98989C",
      color: "#163a7d",
      borderRadius: "16px",
      border: "none",
      height: "41px",
      fontWeight: "bold",
      fontSize: "15px",
      width: "77px",
      marginTop:"25px",
      marginBottom:"30px"
    }} key={props.key} onClick={props.onClick}  >
      {props.text}
    </button>
  );
};

export default Close;
