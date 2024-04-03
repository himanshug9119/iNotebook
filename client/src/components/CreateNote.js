import React, { useState, useContext } from "react";
import NoteContext from "../Context/Notes/NoteContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const CreateNote = () => {
  const noteContext = useContext(NoteContext);
  const { createNote } = noteContext;

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const promise = createNote(title, description, tag);
      const toastConfig = {
        loading: "Saving...",
        success: <b>Note created!</b>,
        error: <b>Could not create note.</b>,
      };
      await toast.promise(promise, toastConfig);
      navigate("/notes");

      setTitle("");
      setDescription("");
      setTag("");
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className="bg-dark h-screen">
      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ minHeight: "90vh" }}
      >
        <form
          onSubmit={handleSubmit}
          className="w-50 p-2 text-white bg-secondary"
        >
          <div className="form-group p-2">
            <label htmlFor="title" className="mb-1">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />
          </div>
          <div className="form-group p-2">
            <label htmlFor="description" className="mb-1">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
            ></textarea>
          </div>
          <div className="form-group p-2">
            <label htmlFor="tag" className="mb-1">
              Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              value={tag}
              onChange={(e) => setTag(e.target.value)}
              placeholder="Enter tag"
            />
          </div>
          <div className="form-group p-2">
            <button type="submit" className="btn btn-primary p-2">
              Submit
            </button>
            <Toaster />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNote;
