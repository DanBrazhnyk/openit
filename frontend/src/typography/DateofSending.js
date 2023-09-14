import React from "react";

const DateOfSending = (props) => {
  return (
    <p style={{
      paddingTop: "27px",
      fontWeight: "bold",
      fontSize: "18px",
      color: "white",
      marginLeft:props.marginLeft
    }}>

    {new Date(props.timestamp)
      .toLocaleDateString("en-GB")
      .split("/")
      .reverse()
      .slice(1)
      .concat(
        new Date(props.timestamp)
          .toLocaleDateString("en-GB")
          .split("/")
          .reverse()
          .slice(0, 1)
      )
      .join(".")}{" "}
    {new Date(props.timestamp).toLocaleTimeString(
      "en-GB",
      {
        hour12: false,
      }
    )}
  </p>
  );
};
export default DateOfSending;