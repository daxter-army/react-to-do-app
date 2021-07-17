// REACT IMPORTS
import React, { useState, useEffect } from "react";
import axios from "axios";

// COMPONENT IMPORTS
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import Notes from "./components/Notes/Notes.js";
import Footer from "./components/Footer/Footer";

// CSS STYLES
import classes from "./App.module.css";

function App() {
  const [notesList, setNotesList] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(`/api/read`)
      .then((res) => {
        console.log(res);
        setNotesList(res.data.notes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // function handling input state
  const inputStateHandler = (data) => {
    setInput(data.target.value);
  };

  const statusHandler = () => {};

  // function handling the create note button
  const createNoteHandler = () => {
    if (input === "") {
      return;
    }

    // creating header configuration
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // creating json body, with note
    const postData = {
      title: input,
    };

    // sending the request
    const changeState = async () => {
      try {
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
      } catch (err) {
        console.log(err);
      }
    };

    changeState();
  };

  return (
    <>
      <Header />
      <div className={classes.App}>
        <h2 className={classes.Heading}>So what's on your mind ?</h2>
        <SearchBar
          query={input}
          stateHandler={inputStateHandler}
          buttonHandler={createNoteHandler}
        />
        <h3 className={classes.SubHeading}>Notes</h3>
        {notesList.length !== 0 ? (
          <Notes checkboxHandler={statusHandler}>{notesList}</Notes>
        ) : (
          <div className={classes.Loader}>Loading...</div>
        )}
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default App;
