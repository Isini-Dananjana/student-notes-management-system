const router = require("express").Router();
const { User, validate, validatePassword } = require("../models/user.model");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const generator = require("generate-password");
const passwordComplexity = require("joi-password-complexity");
const Joi = require("joi");

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

    const tempPassword = generator.generate({
      length: 10,
      numbers: true,
    });

    //convert given password to a hash password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(tempPassword, salt);

    user = await new User({ ...req.body, password: hashPassword }).save();

    //create token
    const token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    //create url

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

const getUserByAccountType = async (req, res) => {
  let accountType = req.params.accountType;
  User.find({ accountType: accountType }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(docs);
    }
  }).catch((err) => {
    console.log(err);
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
    accountaccountType,
    password,
    status,
  } = req.body;

  const updateuser = {
    firstName,
    lastName,
    email,
    dob,
    mobile,
    accountaccountType,
    password,
    status: true,
  };

  const { error } = validatePassword(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  const salt = await bcrypt.genSalt(Number(process.env.SALT));
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  updateuser.password = hashPassword;
  const update = User.findByIdAndUpdate(userId, updateuser)

    .then(() => {
      res.status(200).send({ status: "User updated successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error with updating " });
    });
};

module.exports = {
  signUp,
  getAllUsers,
  getUsereByID,
  updateuser,
  getUserByAccountType,
};
