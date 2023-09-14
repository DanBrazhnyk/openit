import React from "react";

const ReportContainer = ({ children }) => {
  return (
    <div
      style={{
        borderRadius: "15px",
        border: "none",display:"flex",flexWrap:"wrap",justifyContent:"center"
      }}
    >
      {children}
    </div>
  );
};

export default ReportContainer;
