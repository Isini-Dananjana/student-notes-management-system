const express = require("express");
let router = require("express").Router()
const controller = require("../controllers/user.controller");
const authcontroller = require("../controllers/auth.controller");
const auth = require("../middleware/auth");

router.post("/signup", controller.signUp);
router.post("/signin", authcontroller.signIn);
router.get("/", auth ,controller.getAllUsers);
router.get("/:id", auth ,controller.getUsereByID);
router.get("/type/:accountType",auth , controller.getUserByAccountType);
router.put("/:id",auth , controller.updateuser);
router.post("/:id/verify/:token/",controller.verify)
router.post("/:id/:token",auth ,authcontroller.resetPassword)
router.get('/loggedUser',auth ,authcontroller.getLoggedUser);


module.exports = router;