import React from "react";

const Info = (props) => {
  return (
    <>
    <p
      style={{
        paddingTop: "27px",
        fontWeight: "bold",
        fontSize: "18px",
        color: "white",
      }}
    >
      {props.bio}
    </p>  
     <p
      style={{
        paddingTop: "27px",
        fontWeight: "bold",
        fontSize: "18px",
        color: "white",
      }}
    
    >{props.from}
    </p>  
     <p
      style={{
        paddingTop: "27px",
        fontWeight: "bold",
        fontSize: "18px",
        color: "white",
        marginLeft:"25px",
        marginRight:"30px"
      }}
    >
      {props.report}
    </p>   
    </>
  );
};
export default Info;
