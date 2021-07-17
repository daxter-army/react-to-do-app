import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaCheck } from "react-icons/fa";
import { BiNote } from "react-icons/bi";

import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  return (
    <div className={classes.SearchBar}>
      <input
        className={classes.Input}
        type={props.type}
        value={props.query}
        onChange={props.stateHandler}
        placeholder="create a react to-do app"
      />
      <button
        className={`${classes.SearchBtn} ${
          props.query ? classes.ColorActive : classes.ColorPassive
        }`}
        onClick={props.buttonHandler}
      >
        <BiNote />
      </button>
    </div>
  );
};

export default SearchBar;
