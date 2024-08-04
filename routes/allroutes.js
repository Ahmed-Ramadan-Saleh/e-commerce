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
// get homepage
router.get("/", async(req, res) => {
  try {
    // get all product
    const allproduct = await createproduct.find();
    res.render("product/homepage", { mytitle: "homepage", data: allproduct });

  } catch (error) {
    console.log("have error in get_homepage", error);

  }
});
// get contact
router.get("/contact", async(req, res) => {
  try {
    res.render("product/contact", { mytitle: "contact" });

  } catch (error) {
    console.log("have error in get_contact", error);

  }
});
// get orders
router.get("/orders", async(req, res) => {
  try {
    res.render("product/orders", { mytitle: "orders" });

  } catch (error) {
    console.log("have error in get_orders", error);

  }
});
// get pay
router.get("/pay", async(req, res) => {
  try {
    res.render("product/pay", { mytitle: "pay" });

  } catch (error) {
    console.log("have error in get_pay", error);

  }
});
// get productdetails
router.get("/productdetails", async(req, res) => {
  try {
    res.render("product/productdetails", { mytitle: "productdetails" });

  } catch (error) {
    console.log("have error in get_productdetails", error);

  }
});
// get productpage
router.get("/productpage", async(req, res) => {
  try {
    res.render("product/productpage", { mytitle: "productpage" });

  } catch (error) {
    console.log("have error in get_productpage", error);

  }
});
// get ShoppingCart
router.get("/ShoppingCart", async(req, res) => {
  try {
    res.render("product/ShoppingCart", { mytitle: "ShoppingCart" });

  } catch (error) {
    console.log("have error in get_ShoppingCart", error);

  }
});
// get useraccount
router.get("/useraccount", async(req, res) => {
  try {
    res.render("product/useraccount", { mytitle: "useraccount" });

  } catch (error) {
    console.log("have error in get_useraccount", error);

  }
});






//get contact
router.get("/contact", controllerrr.get_contact);

//get signup
router.get("/signup", controllerrr.get_signup);

//get login
router.get("/login", controllerrr.get_login);



// -------------------
//Admin
// get admin dashboard
router.get("/admin/dashboard", (req, res) => {
  try {
    res.render("admin/dashboard", { mytitle: "dashboard" });
  } catch (error) {
    console.log("have error in get_dashboard", error);
  }
});
// get admin admininfo
router.get("/admin/admininfo", (req, res) => {
  try {
    res.render("admin/admininfo", { mytitle: "admininfo" });
  } catch (error) {
    console.log("have error in get_admininfo", error);
  }
});
// get admin analytics
router.get("/admin/analytics", (req, res) => {
  try {
    res.render("admin/analytics", { mytitle: "analytics" });
  } catch (error) {
    console.log("have error in get_analytics", error);
  }
});
// get admin customers
router.get("/admin/customers", (req, res) => {
  try {
    res.render("admin/customers", { mytitle: "customers" });
  } catch (error) {
    console.log("have error in get_customers", error);
  }
});
// get admin orders
router.get("/admin/orders", (req, res) => {
  try {
    res.render("admin/orders", { mytitle: "orders" });
  } catch (error) {
    console.log("have error in get_orders", error);
  }
});

// get admin settings
router.get("/admin/settings", (req, res) => {
  try {
    res.render("admin/settings", { mytitle: "settings" });
  } catch (error) {
    console.log("have error in get_settings", error);
  }
});
// get admin loginAdmin
router.get("/admin/loginAdmin", (req, res) => {
  try {
    res.render("admin/loginAdmin", { mytitle: "loginAdmin" });
  } catch (error) {
    console.log("have error in get_loginAdmin", error);
  }
});
// ----------------complete


// get /admin/manageproducts
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
router.post(
  "/addproduct",
  upload.array("photos", 12),
  controllerrr.post_addProduct
);

// update product
router.put(
  "/updatproduct/:id",
  upload.single("image"),
  controllerrr.put_updatproduct
);

// deleteimage
router.post("/deleteimage", controllerrr.post_deleteimage);

// delete product

router.delete("/edit/:id", controllerrr.delete_product);

module.exports = router;
