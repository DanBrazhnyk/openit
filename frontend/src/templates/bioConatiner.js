import React from "react";

const BioContainer = (props) => {
  return (
    <div
      style={{
        display: "flex",
        marginLeft: "130px",
      }}
    >
      <p
        style={{
          paddingTop: "27px",
          fontWeight: "bold",
          fontSize: "18px",
          color: "white",
          marginLeft: "50px",
          marginRight: "20px",
        }}
      >
        Name: {props.bio}
      </p>
      <p
        style={{
          paddingTop: "27px",
          fontWeight: "bold",
          fontSize: "18px",
          color: "white",
        }}
      >
        Theme: {props.subject}
      </p>
    </div>
  );
};

export default BioContainer;
