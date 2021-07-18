// REACT IMPORTS
import React, { useState, useEffect } from "react";
import axios from "axios";

// COMPONENT IMPORTS
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Notes from "./components/Notes/Notes.js";

// CSS STYLES
import classes from "./App.module.css";

function App() {
  const [notesList, setNotesList] = useState([]);
  const [input, setInput] = useState("");
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [notification, setNotification] = useState({ status: false, msg: "" });

  // creating header configuration
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  useEffect(() => {
    axios
      .get(`/api/read`)
      .then((res) => {
        console.log(res);
        setNotesList(res.data.notes);
        setLoadingNotes(true);
        notificationHandler({ status: true, msg: "Notes Loaded" });
      })
      .catch((err) => {
        // setting notification
        notificationHandler({ status: false, msg: "Error!" });
        console.log(err);
      });
  }, []);

  // function handling input state
  const inputStateHandler = (data) => {
    setInput(data.target.value);
  };

  // function handling state of list
  const statusHandler = ({ id, status }) => {
    // updating in db

    // console.log(id, status);

    // sending request
    axios
      .patch(`/api/update/${id}`, { status: status }, config)
      .then((res) => {
        console.log(res.data);

        const newData = notesList.map((item) => {
          if (item._id === id) {
            item.status = res.data.updatedNote.status;
          }

          return item;
        });

        // setting notification
        notificationHandler({ status: true, msg: "Note Updated!" });

        // setting new list
        setNotesList(newData);
      })
      .catch((err) => {
        // setting notification
        notificationHandler({ status: false, msg: "Error!" });

        console.log(err);
      });
  };

  //* notification handler
  const notificationHandler = (msg) => {
    // setting the notification
    setNotification(msg);

    // removing the notification
    setTimeout(() => setNotification(""), 3000);
  };

  //* updation handler
  const updateHandler = ({ title, id }) => {
    if (!title) {
      return;
    }

    // updating in the db
    axios
      .patch(`/api/update/${id}`, { title: title }, config)
      .then((res) => {
        // setting notification
        notificationHandler({ status: true, msg: "Note Updated!" });
        // console.log(res.data);
      })
      .catch((err) => {
        // setting notification
        notificationHandler({ status: false, msg: "Error!" });
        console.log(err);
      });
  };

  //* function to delete note
  const deleteHandler = (id) => {
    console.log("id: ", id);

    axios
      .delete(`/api/delete/${id}`)
      .then((res) => {
        console.log(res.data);

        // deleting the note from the list
        const newData = notesList.filter((item) => item._id !== id);

        // setting notification
        notificationHandler({ status: true, msg: "Note Deleted!" });

        // setting new list
        setNotesList(newData);
      })
      .catch((err) => {
        // setting notification
        notificationHandler({ status: false, msg: "Error!" });
        console.log(err);
      });
  };

  //* function handling the create note button
  const createNoteHandler = () => {
    if (input === "") {
      return;
    }

    // creating json body, with note
    const postData = {
      title: input,
    };

    // sending the request
    const changeState = async () => {
      try {
        // sending request
        const res = await axios.post(`/api/add`, postData, config);
        console.log(res.data.newNote);

        // setting the new list
        setNotesList([
          ...notesList,
          {
            title: res.data.newNote.title,
            _id: res.data.newNote._id,
            __v: res.data.newNote.__v,
            status: res.data.newNote.status,
            createdAt: res.data.newNote.createdAt,
          },
        ]);

        // setting notification
        notificationHandler({ status: true, msg: "Note Created!" });

        // clearing the input bar
        setInput("");
      } catch (err) {
        // setting notification
        notificationHandler({ status: false, msg: "Error!" });
        console.log(err);
      }
    };

    // function calling
    changeState();
  };

  return (
    <>
      {/* header */}
      <Header />
      {/* main content */}
      <div className={classes.App}>
        <h2 className={classes.Heading}>So what's on your mind ?</h2>
        {/* search bar */}
        <SearchBar
          query={input}
          stateHandler={inputStateHandler}
          buttonHandler={createNoteHandler}
        />
        {/* Notes heading and notification center */}
        <div className={classes.Info}>
          <h3 className={classes.SubHeading}>Notes</h3>
          {notification ? (
            <div
              className={`${classes.Notification} ${
                notification.status
                  ? classes.NotificationSuccess
                  : classes.NotificationError
              }`}
            >
              {notification.msg}
            </div>
          ) : null}
        </div>
        {loadingNotes && notesList.length !== 0 ? (
          <p>* Click on the title to edit.</p>
        ) : null}
        {loadingNotes && notesList.length !== 0 ? (
          <Notes
            modifyHandler={updateHandler}
            removeHandler={deleteHandler}
            checkboxHandler={statusHandler}
          >
            {notesList}
          </Notes>
        ) : !loadingNotes ? (
          <div className={classes.Loader}>Loading...</div>
        ) : (
          <div className={classes.Empty}>Added notes would be shown here!</div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
