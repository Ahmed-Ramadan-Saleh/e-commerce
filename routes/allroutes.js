const express = require("express");
const router = express.Router();
const controllerrr = require("../controllers/controllerrr");
const createproduct = require("../model/newproduct");
const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });

// GET REQUESTS
router.get("/", controllerrr.get_index);

//get about
router.get("/about", controllerrr.get_about);

//get product
router.get("/product", controllerrr.get_product);

//get blog
router.get("/blog", controllerrr.get_blog);

//get contact
router.get("/contact", controllerrr.get_contact);

//get signup
router.get("/signup", controllerrr.get_signup);

//get login
router.get("/login", controllerrr.get_login);

// Delete cookies to sign out:
router.get("/logout", controllerrr.get_logout);

// -------------------
//Admin

// get /admin/products
router.get("/admin/products", controllerrr.get_admin_product);

// get /admin/viewproduct
router.get("/view/:id", controllerrr.get_adminViewProduct);

// get /admin/editproduct
router.get("/edit/:id", controllerrr.get_adminEditProduct);

// --------------------------------------------------------------

//post
//signup post
router.post("/signup", controllerrr.post_signup);

//login post
router.post("/login", controllerrr.post_login);

// post addproduct
router.post("/addproduct",
  upload.array("photos", 12),
  controllerrr.post_addProduct
);

// update product
router.put("/updatproduct/:id",
  upload.single("image"),
  controllerrr.put_updatproduct
);

// deleteimage
router.post("/deleteimage", controllerrr.post_deleteimage);

// delete product

router.delete("/edit/:id", controllerrr.delete_product);

module.exports = router;
