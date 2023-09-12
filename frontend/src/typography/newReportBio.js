import React from "react";

const Info = ({ children }) => {
  return (
    <p
      style={{
        paddingTop: "27px",
        fontWeight: "bold",
        fontSize: "18px",
        color: "white",
      }}
    >
      {children}
    </p>
  );
};
export default Info;
