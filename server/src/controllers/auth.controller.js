const router = require("express").Router();
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  User.findOne({
    email: req.body.email,
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }

    
    var token = jwt.sign({ id: user.id }, process.env.JWTPRIVATEKEY, {
      expiresIn: 86400, // 24 hours
    });

    res.status(200).send({
      id: user._id,
      email: user.email,
      accountType: user.accountType,
      status: user.status,
      accessToken: token,
    });
  });
};

module.exports = {
  signIn,
};
