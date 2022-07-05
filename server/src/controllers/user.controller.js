const router = require("express").Router();
const { User, validate } = require("../models/user.model");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const generator = require("generate-password");

const signUp = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    //check whether email is exit or not
    //send email of registration
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    // //convert given password to a hash password
    // const salt = await bcrypt.genSalt(Number(process.env.SALT));
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    const tempPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    user = await new User({ ...req.body, password: tempPassword }).save();

    //create token
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    //create url
    // const url = `${process.env.BASE_URL}/user/${user.id}/verify/${token.token}`;

    const url = `Your email is verified!!\n\n Login link : ${process.env.BASE_URL}\n Your tempary password :${tempPassword}`;

    //send email

    await sendEmail(user.email, "Verify Email", url);

    res.status(201).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" }, error);
  }
};

//get all users
const getAllUsers = async (req, res) => {
  await User.find()
    .then((data) => {
      res.status(200).send(data);
      console.log("Success");
    })
    .catch((err) => {
      res.status(500).send({ message: "Internal Server Error" });
    });
};

//get userby ID
const getUsereByID = async (req, res) => {
  const id = req.params.id;
  await User.findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ status: "Error with get User", error: err.message });
    });
};

//update a user

const updateuser = async (req, res) => {
  let userId = req.params.id;
  const {
    firstName,
    lastName,
    email,
    dob,
    mobile,
    accountType,
    password,
    status,
  } = req.body;

  const updateuser = {
    firstName,
    lastName,
    email,
    dob,
    mobile,
    accountType,
    password,
    status: true,
  };

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  updateuser.password = hash;
  const update = User.findByIdAndUpdate(userId, updateuser)

    .then(() => {
      res.status(200).send({ status: "User updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating " });
    });
};

//verify the token whith sent ro the usr and update to be verified in the db

const verify = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });

    await User.updateOne({ _id: user._id, status: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

module.exports = {
  signUp,
  verify,
  getAllUsers,
  getUsereByID,
  updateuser,
};
