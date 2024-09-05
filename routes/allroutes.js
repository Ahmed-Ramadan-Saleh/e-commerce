const express = require("express");
const router = express.Router();
const controllerrr = require("../controllers/controllerrr");
const { check, validationResult } = require("express-validator");
// middleware 
var { requireAuthadmin } = require("../middleware/middle");
const { requireAuthUser } = require("../middleware/middle");

// UPLOUD IMAGES
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });
// ---------------------------------
// GET REQUESTS FRONTEND
// ---------------------------------












// get homepage
router.get("/", controllerrr.get_homepage);

// get contact
router.get("/contact",controllerrr.get_contact);

// get orders
router.get("/orders", controllerrr.get_orders);

// get Checkout
router.get("/Checkout", requireAuthUser, controllerrr.get_Checkout);

// get productdetails
router.get("/productdetails/:id", controllerrr.get_productdetails);

// get productpage
router.get("/productpage", controllerrr.get_productpage);

// get ShoppingCart
router.get("/ShoppingCart", requireAuthUser,controllerrr.get_ShoppingCart);

// get useraccount
router.get("/useraccount", requireAuthUser,controllerrr.get_useraccount);

//get signup User
router.get("/signup", controllerrr.get_signup);

//get login User
router.get("/login", controllerrr.get_login);

// ---------------------------------
// GET REQUESTS BACKEND
// ---------------------------------

// get admin dashboard
router.get("/admin/dashboard", requireAuthadmin, controllerrr.get_admin_dashboard);

// get admin admininfo
router.get("/admin/admininfo", requireAuthadmin, controllerrr.get_admin_admininfo);

// get admin analytics
router.get("/admin/analytics", requireAuthadmin,controllerrr.get_admin_analytics);

// get admin customers
router.get("/admin/customers", requireAuthadmin,controllerrr.get_admin_customers);

// get admin orders
router.get("/admin/orders", requireAuthadmin, controllerrr.get_admin_orders);

// get admin settings
router.get("/admin/settings", requireAuthadmin, controllerrr.get_admin_settings);

// get /admin/manageproducts
router.get("/admin/products", requireAuthadmin, controllerrr.get_admin_product);

// get /admin/viewproduct
router.get("/view/:id", requireAuthadmin, controllerrr.get_adminViewProduct);

// get /admin/editproduct
router.get("/edit/:id", requireAuthadmin, controllerrr.get_adminEditProduct);

// get admin login && Register
router.get("/admin/login",controllerrr.get_loginAdmin);

// --------------------------------------------------------------
// --------------------------------------------------------------

// ---------------------------------
// POST REQUESTS FRONTEND
// ---------------------------------

// /add Product to card post
router.post("/addtocard/:id", requireAuthUser, controllerrr.post_addtocard);

// /Remove Product to card post
router.post("/removeoncard/:id", requireAuthUser, controllerrr.post_removeoncard);

// /Update Personal Data to User post
router.post("/updatedatauser", requireAuthUser, controllerrr.post_updatedatauser);

// search product Using name post
router.post("/search", controllerrr.post_search);

//signup post User
router.post("/signup", controllerrr.post_signup_User);

//login post User
router.post("/login", controllerrr.post_login_User);

// --------------------

// ---------------------------------
// POST REQUESTS BACKEND
// ---------------------------------

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

// delete image
router.post("/deleteimage", controllerrr.post_deleteimage);

// delete product
router.delete("/edit/:id", controllerrr.delete_product);

//signup post Admin
router.post("/admin/signup",
  [
    check("email", "Please provide a valid email").isEmail(),
    check(
      "password",
      "Password must be at least 8 characters with 1 upper case letter and 1 number"
    ).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  ],
  controllerrr.post_admin_signup
);

// login post Admin
router.post("/admin/login",controllerrr.post_admin_login);

module.exports = router;
