const express = require("express");
let router = require("express").Router()
const controller = require("../controllers/user.controller");
const authcontroller = require("../controllers/auth.controller");


router.post("/signup", controller.signUp);
router.post("/signin", authcontroller.signIn);
router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUsereByID);
router.put("/:id", controller.updateuser);
router.post("/:id/verify/:token/",controller.verify)


module.exports = router;