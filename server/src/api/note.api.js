const express = require("express");
let router = require("express").Router();
const controller = require("../controllers/note.controller");

// router.get("/", (req, res) => {
//   res.send("Dilvery API v1");
// });
router.post("/", controller.addNewNote);
router.get("/", controller.getAllNotes);
router.get("/:id", controller.getNoteByID);
router.put("/updateNote/:id", controller.updateNote);
router.delete("/deleteNote/:id", controller.deleteNote);

module.exports = router;