import React, { useState, useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";

function NotesItem(props) {
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState(props.note.title || "");
  const [tag, setTag] = useState(props.note.tag || "");
  const [description, setDescription] = useState(props.note.description || "");

  const noteContext = useContext(NoteContext);
  const { updateNote, deleteNote } = noteContext;

  const handleUpdate = () => {
    setIsEditable(true);
  };

  const handleSave = () => {
    setIsEditable(false);
    const note = {
      _id: props.note._id,
      title,
      tag,
      description,
    };
    updateNote(note);
  };

  const handleDelete = () => {
    deleteNote(props.note._id);
  };

  return (
    <div className="card" style={{ width: "18rem", minHeight: "18rem" }}>
      <div className="card-body">
        {isEditable ? (
          <>
            <input
              type="text"
              className="form-control mb-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="form-control mb-2"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
            />
            <textarea
              className="form-control mb-2"
              style={{
                height: "auto",
                minHeight: "100px",
                maxHeight: "300px",
                overflow: "auto",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </>
        ) : (
          <>
            <h5 className="card-title p-2">{title}</h5>
            <h6 className="card-subtitle p-2">{tag}</h6>
            <p className="card-text p-2">{description}</p>
          </>
        )}
        {isEditable ? (
          <button
            type="button"
            className="btn btn-sm btn-success m-1"
            onClick={handleSave}
          >
            <i className="fas fa-save"></i> Save
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-sm btn-dark m-1"
            onClick={handleUpdate}
          >
            <i className="fas fa-edit"></i> Update
          </button>
        )}
        <button
          type="button"
          className="btn btn-sm btn-danger m-1"
          onClick={handleDelete}
        >
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  );
}

export default NotesItem;
