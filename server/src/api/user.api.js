const express = require("express");
let router = require("express").Router()
const controller = require("../controllers/user.controller");
const authcontroller = require("../controllers/auth.controller");
const auth = require('../middleware/auth');

router.post("/signup", controller.signUp);
router.post("/signin", authcontroller.signIn);
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUsereByID);
router.put("/:id", controller.updateuser);
router.post("/:id/verify/:token/",controller.verify)
router.post("/:id/:token",authcontroller.resetPassword)
router.get('/loggedUser',authcontroller.getLoggedUser);


module.exports = router;