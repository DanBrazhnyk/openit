import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NewSubmissions  = (props) => {
  return (
    <div
    style={{
      marginBottom: "40px",
      marginLeft: "100px",
    }}
  >
    <Button
      variant="contained"
      color="success"
      onClick={props.onClick}
    >
      <AddIcon />
      {props.text}
    </Button>
  </div>
  );
};

export default NewSubmissions ;
