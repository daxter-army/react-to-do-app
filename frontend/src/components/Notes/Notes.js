import React, { useState } from "react";

import { AiOutlineDelete } from "react-icons/ai";
import { BsPen } from "react-icons/bs";

import classes from "./Notes.module.css";

const Notes = (props) => {
  const [title, setTitle] = useState("");

  const updateTitleHandler = (e) => {
    if (e.target.value) {
      return setTitle(e.target.value);
    }
  };

  const checkboxHandlerHelper = (id, status) => {
    props.checkboxHandler({ id, status: !status });
  };

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
                    defaultChecked={item.status ? true : false}
                    onChange={() =>
                      checkboxHandlerHelper(item._id, item.status)
                    }
                  />
                </span>{" "}
                <input
                  className={`${classes.CardTitle} ${
                    item.status ? classes.CompletedTask : null
                  }`}
                  defaultValue={item.title}
                  onChange={updateTitleHandler}
                />
              </div>
              <div>
                <button
                  className={classes.EditBtn}
                  onClick={() => props.modifyHandler({ title, id: item._id })}
                >
                  <BsPen />
                </button>
                <button
                  className={classes.DelBtn}
                  onClick={() => props.removeHandler(item._id)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Notes;
