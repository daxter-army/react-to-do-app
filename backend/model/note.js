"use strict";

// IMPORT MONGOOSE
import mongoose from "mongoose";

// CREATING MODEL SCHEMA
const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      default: false,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
  },
  {
    collection: "todo",
  }
);

const Note = mongoose.model("Note", noteSchema);
export default Note;
