const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require("bcrypt");

const SchemaNewUser = new Schema({
  username: String,
  email: String,
  password: String,
  phonenumber: String,
  ProductCards: [],
});

//hash password

SchemaNewUser.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const Authuser = new model("NewUser", SchemaNewUser);

module.exports = Authuser;
