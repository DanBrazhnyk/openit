import React from "react";

const formWrapper = ({ children }) => {
  return (
    <div
      style={{
        marginLeft: "480px",
        height: "700px",
        marginTop: "130px",
        width: "700px",
        paddingTop: "25px",
        border: "15px solid #163a7d",
        borderRadius: "25px",
      }}
    >

      {children}
    </div>
  );
};
export default formWrapper;
