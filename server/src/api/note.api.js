const express = require("express");
let router = require("express").Router();
const controller = require("../controllers/note.controller");
const auth = require("../middleware/auth");

// router.get("/", (req, res) => {
//   res.send("Dilvery API v1");
// });
router.post("/",auth , controller.addNewNote);
router.get("/",auth , controller.getAllNotes);
router.get("/:id",auth , controller.getNoteByID);
router.put("/updateNote/:id", auth ,controller.updateNote);
router.delete("/deleteNote/:id", auth ,controller.deleteNote);

module.exports = router;
;















