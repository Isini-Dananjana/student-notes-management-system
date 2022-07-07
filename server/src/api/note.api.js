const express = require("express");
let router = require("express").Router();
const controller = require("../controllers/note.controller");
const auth = require("../middleware/auth");

router.post("/", auth, controller.addNewNote);
router.get("/", auth, controller.getAllNotes);
router.get("/:id", auth, controller.getNoteByID);
router.put("/updateNote/:id", auth, controller.updateNote);
router.delete("/deleteNote/:id", auth, controller.deleteNote);

module.exports = router;
