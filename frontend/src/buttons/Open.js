import React from "react";
import { Button } from "@mui/material";

const Open = (props) => {
  return (
    <Button key={props.key} onClick={props.onClick} sx={{ color: "white" }}>
      {props.text}
    </Button>
  );
};

export default Open;
