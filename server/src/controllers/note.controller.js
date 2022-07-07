const Note = require("../models/note.model");

const addNewNote = async (req, res) => {
  if (req.body) {
    try {
      let result = await Note.create(req.body);
      res.status(200).json({ result });
    } catch (error) {
      res.status(400).json({ error: err.message });
    }
  }
};

const getAllNotes = async (req, res) => {
  await Note.find()
    .then((data) => {
      res.status(200).send(data);
      console.log("Success");
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

const getNoteByID = async (req, res) => {
  const id = req.params.id;
  await Note.findById(id)
    .then((note) => {
      res.status(200).send(note);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with get Note", error: err.message });
    });
};

const updateNote = async (req, res) => {
  let noteId = req.params.id;
  const { title, description } = req.body;

  const updateNote = {
    title,
    description,
  };
  console.log(noteId);
  console.log(updateNote);
  const update = Note.findByIdAndUpdate(noteId, updateNote)
    .then(() => {
      res.status(200).send({ status: "note updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating " });
    });
};

const deleteNote = async (req, res) => {
  let noteId = req.params.id;
  await Note.findByIdAndDelete(noteId)
    .then(() => {
      res.status(200).send({ status: "note deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with deleting" });
    });
};

module.exports = {
  addNewNote,
  getAllNotes,
  getNoteByID,
  updateNote,
  deleteNote,
};
