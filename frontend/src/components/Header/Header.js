// REACT IMPORTS
import React from "react";

// CSS STYLES
import classes from "./Header.module.css";

const Header = () => {
  return (
    <div className={classes.Header}>
      <h1 className={classes.Heading}>#ToDo</h1>
    </div>
  );
};

export default Header;
