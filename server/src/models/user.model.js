const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dob: {
    type: String,
    required: false,
  },
  mobile: {
    type: String,
    required: false,
  },
  accountType: {
    type: String,
    default: "student",
  },
  password: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
    expiresIn: "7d",
  });
  return token;
};

const validate = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
  });
  return schema.validate(data);
};

const validatePassword = (data) => {
  const schema = Joi.object({
    dob: Joi.string().required().label("date of Birth"),
    mobile: Joi.number().required().label("Phone number"),
    password: passwordComplexity().label("Password"),
  });
  return schema.validate(data);
};

const User = mongoose.model("User", userSchema);

module.exports = { User, validate, validatePassword };
