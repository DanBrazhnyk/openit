import React from "react";

const NewReportContainer = ({ children }) => {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        minHeight: "150vh",
      }}
    >
      {children}
    </div>
  );
};

export default NewReportContainer;
