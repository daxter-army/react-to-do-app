"use strict";

// IMPORT MODEL
import Note from "../model/note.js";

// FUNCTIONS FOR DIFFERENT APIS

// ROUTE -> GET
// FUNCTION -> to fetch all the notes
export const getNotes = async (req, res) => {
  try {
    //   finding all the notes
    const notes = await Note.find({});

    // sending the response
    res.status(200).send({
      notes,
    });
  } catch (error) {
    //   sending the error response
    res.status(500).send({
      message: error.message,
      error: "unable to retrieve notes...try again!",
    });
  }
};

// ROUTE -> POST
// FUNCTION -> to add a note
export const addNote = async (req, res) => {
  const note = req.body;
  const newNote = new Note(note);

  try {
    //   saving new note
    await newNote.save();

    res.status(201).send({
      newNote,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      error: "unable to add note...try again!",
    });
  }
};

// ROUTE -> UPDATE
// FUNCTION -> to update a note
export const updateNote = async (req, res) => {
  // can only update title and status
  const UPDATABLE_PROPS = ["title", "status"];
  //   grabbing keys of the incoming object
  const updateKeys = Object.keys(req.body);

  //   checking if there is any unwanted key
  const isValidUpdate = updateKeys.every((prop) =>
    UPDATABLE_PROPS.includes(prop)
  );

  // it will be false if there is unwanted key,
  // inverting it to true, for trigerring the desired response
  if (!isValidUpdate) {
    return res.status(400).send({
      error: "invalid updates!",
    });
  }

  try {
    //   updating the note and running validators again
    const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).send({
      updatedNote,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
      error: "invalid note id...please try again!",
    });
  }
};

// ROUTE -> DELETE
// FUNCTION -> to delete a note
export const deleteNote = async (req, res) => {
  const noteId = req.params.id;

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);

    res.status(200).send({
      deletedNote,
    });
  } catch (error) {
    res.status(404).send({
      message: error.message,
      error: "invalid note id...please try again!",
    });
  }
};
