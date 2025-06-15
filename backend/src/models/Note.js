import mongoose, { mongo } from "mongoose";

// 1. create a schema for notes
const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//2. Create a model for this schema
 
const Note = mongoose.model("Note", noteSchema)
export default Note;