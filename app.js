const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const Authuser = require("./model/Authuser");
const createproduct = require("./model/newproduct");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
// to get cookies from browser
var cookieparser = require("cookie-parser");
const { render } = require("ejs");
const moment = require("moment");
var methodOverride = require("method-override");
app.use(methodOverride("_method"));

// import router file
const allroutes = require("./routes/allroutes");

//create static files in folder named public
app.use(express.static("public"));
//defination data coming ==>> req.body
app.use(express.urlencoded({ extended: true }));
//using ejs template
app.set("view engine", "ejs");
app.use(cookieparser());
app.use(allroutes);

// auto refresh
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, "public"));

const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


//create server && connect DB
mongoose
  .connect(process.env.URL_DB)
  .then((conn) => {
    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log(`there are error in url database = ${error}`);
  });
