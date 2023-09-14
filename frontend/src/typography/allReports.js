import React from "react";

const AllReports = ({ children }) => {
  return (
    <p
    style={{
      marginBottom: "20px",
      width: "200px",
      marginLeft: "710px",
      color:"#163a7d",
      fontWeight:"bold",
      fontSize:"20px"
    }}
    >
      {children}
      <hr style={{width:"270px",marginLeft:"-31px",marginTop:"7px",height:"6px",backgroundColor:"#163a7d"}}/>
    </p>
  );
};
export default AllReports;
