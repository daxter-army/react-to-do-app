import React, { useState } from "react";

import { AiOutlineDelete } from "react-icons/ai";

import classes from "./Notes.module.css";

const Notes = (props) => {
  //   const [check, setCheck] = useState(false);

  return (
    <div className={classes.Notes}>
      <div className={classes.Grid}>
        {props.children.map((item) => {
          return (
            <div key={item._id} className={classes.Card}>
              <div>
                <span>
                  <input
                    type="checkbox"
                    className={classes.Checkbox}
                    onChange={props.checkboxHandler}
                  />
                </span>{" "}
                <span className={classes.CardTitle}>{item.title}</span>
              </div>
              <button className={classes.DelBtn}>
                <AiOutlineDelete />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
