import React from "react";
import { motion } from "framer-motion";


const ReportElementContainer = (props) => {
  return (
    <motion.div
    initial={props.initialHeight }
    style={{
      backgroundColor: "#163a7d",
      marginBottom: "30px",
      borderRadius: "13px",
      textAlign: "center",
      width: props.initialWidth,
      marginLeft: "98px",
      overflowY: "hidden"
    }}
    key={props.id}
    value={props.value}
    animate={{
      height: props.height,
      width: props.width,
      marginLeft: props.marginLeft,
    }}
    whileHover={{ scale: props.scale }}
    transition={{ duration: 0.5, type: "tweet" }}
  >
      {props.children}
    </motion.div>
  );
};

export default ReportElementContainer;