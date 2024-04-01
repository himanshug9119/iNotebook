const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");

// Create a new note
router.post("/createnote", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;

    // Check if required fields are provided
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const newNote = new Notes({
      title,
      description,
      user: req.user.id,
      tag,
    });

    const savedNote = await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: savedNote });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fetch all notes for a user
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
// Update
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    let updatedFields = {};

    // Populate the fields to be updated
    if (title) updatedFields.title = title;
    if (description) updatedFields.description = description;
    if (tag) updatedFields.tag = tag;

    // Find the existing note by ID
    const existingNote = await Notes.findById(req.params.id);

    // Check if the note exists
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if the user is authorized to update the note
    if (existingNote.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Update the note
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Note updated successfully", data: updatedNote });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});
// Delete a Note
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    // Find the existing note by ID
    const existingNote = await Notes.findById(req.params.id);
    
    // Check if the note exists
    if (!existingNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    // Check if the user is authorized to delete the note
    if (existingNote.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Remove the note from the database
    const result = await Notes.findByIdAndDelete(req.params.id);

    if (result) {
      res.status(200).json({ message: "Deleted Successfully!" });
    } else {
      res.status(400).json({ message: "Failed to delete!" });
    }
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
