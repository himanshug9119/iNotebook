import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const [notes, setNotes] = useState([
    {
      _id: "660c6f1e8f64751be2b3fbac",
      user: "6609cdd1a84018f2b32ffc9d",
      title: "Learn Machine Learning",
      description: "Learning is important, exams are from 4 of may 2024",
      tag: "Exam",
      date: "2024-04-02T20:48:30.100Z",
      __v: 0,
    },
    // ... other notes
  ]);

  // Create a note
  const createNote = async (title, description, tag) => {
    try {
      const note = {
        _id: Date.now().toString(), // Generate a unique ID for the new note
        title,
        description,
        tag,
      };
      setNotes([...notes, note]);
      return Promise.resolve(); // Resolve the promise if successful
    } catch (error) {
      return Promise.reject(error); // Reject the promise if there's an error
    }
  };

  // Delete a note
  const deleteNote = (noteId) => {
    const newNotes = notes.filter((note) => note._id !== noteId);
    setNotes(newNotes);
  };

  // Edit a note
  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map((note) =>
      note._id === updatedNote._id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ notes, createNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
