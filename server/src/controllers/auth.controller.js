const router = require("express").Router();
const { User } = require("../models/user.model");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
  // try {
  //   const { error } = validate(req.body);
  //   if (error)
  //     return res.status(400).send({ message: error.details[0].message });

  //   const user = await User.findOne({ email: req.body.email });
  //   if (!user)
  //     return res.status(401).send({ message: "Invalid Email or Password" });

  //   const validPassword = req.body.password;

  //   if (!validPassword)
  //     return res.status(401).send({ message: "Invalid Email or Password" });

  //   const token = user.generateAuthToken();
  //   res
  //     .status(200)
  //     .send({ data: user, token, message: "logged in successfully" });
  // } catch (error) {
  //   res.status(500).send({ message: "Internal Server Error" });
  // }

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
      accountType : user.accountType,
      status:user.status,
      accessToken: token,
    });
  });
};
const getLoggedUser = async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "token", async (err, decodedToken) => {
      if (err) {
        console.log(err);
        res.local.user = null;
        next();
      } else {
        console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

//  set new password
const resetPassword = async (req, res) => {
  try {
    const passwordSchema = Joi.object({
      password: passwordComplexity().required().label("Password"),
    });
    const { error } = passwordSchema.validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    if (!user.status) user.status= true;

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user.password = hashPassword;
    await user.save();
    await token.remove();

    res.status(200).send({ message: "Password reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};
module.exports = {
  signIn,
  getLoggedUser,
  resetPassword
};
