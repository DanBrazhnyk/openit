import React from "react";

const TitleNewReport =({children})=>{
    return(
        <p
        style={{
          fontWeight: "bold",
          color: "#163a7d",
          marginTop: "15px",
          marginBottom: "25px",
          fontSize: "23px",
        }}
      >
     {children}
      </p>
    )
}
export default TitleNewReport