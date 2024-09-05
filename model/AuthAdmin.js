const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;
const bcrypt = require('bcrypt');

const SchemaNewAdmin = new Schema({
  username: String,
  email:String,
  password:String,
});

//hash password

SchemaNewAdmin.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
 });



const AuthAdmin = new model("Adminaccount", SchemaNewAdmin);

module.exports = AuthAdmin;
