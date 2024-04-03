import React, { useEffect, useState, useContext } from "react";
import NotesItem from "./NotesItem";
import NoteContext from "../Context/Notes/NoteContext";
function Notes() {
  const noteContext = useContext(NoteContext);
  const { notes } = noteContext;
  return (
    <div className="container d-flex flex-row flex-wrap gap-4 p-3">
      {notes.map((note) => (
        <NotesItem key={note.id} note={note} />
      ))}
    </div>
  );
}

export default Notes;
