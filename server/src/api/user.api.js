const express = require("express");
let router = require("express").Router();
const controller = require("../controllers/user.controller");
const authcontroller = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

router.post("/signup", controller.signUp);
router.post("/signin", authcontroller.signIn);
router.get("/", auth, controller.getAllUsers);
router.get("/:id", auth, controller.getUsereByID);
router.get("/type/:accountType", auth, controller.getUserByAccountType);
router.put("/:id", auth, controller.updateuser);

module.exports = router;
