const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser"); // Middleware to fetch user details
const Notes = require("../models/Notes"); // Importing the Notes model

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

    // Create a new note object
    const newNote = new Notes({
      title,
      description,
      user: req.user.id,
      tag,
    });

    // Save the new note to the database
    const savedNote = await newNote.save();

    // Send response
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
    // Retrieve all notes associated with the logged-in user
    const notes = await Notes.find({ user: req.user.id });

    // Check if any notes are found
    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found" });
    }

    // Send the retrieved notes as response
    res.json(notes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update a note
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

    // Update the note in the database
    const updatedNote = await Notes.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    // Send the updated note as response
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

    // Check if the note was deleted successfully
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
