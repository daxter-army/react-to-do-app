"use strict";

// NODE.JS IMPORTS
import express from "express";
const router = express.Router();

// IMPORT CONTROLLERS
import {
  addNote,
  updateNote,
  getNotes,
  deleteNote,
} from "../controllers/endpoints.js";

// ROUTE -> GET
// FUNCTION -> To fetch all the notes
router.get("/read", getNotes);

// ROUTE -> POST
// FUNCTION -> To create a note
router.post("/add", addNote);

// ROUTE -> PATCH
// FUNCTION -> To fetch all the notes
router.patch("/update/:id", updateNote);

// ROUTE -> DELETE
// FUNCTION -> To delete a the note
router.delete("/delete/:id", deleteNote);

export default router;
