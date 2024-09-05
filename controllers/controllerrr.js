
// MODELS
const createproduct = require("../model/newproduct");
const AuthAdmin = require("../model/AuthAdmin");
const Authuser = require("../model/Authuser");
const mongoose = require("mongoose");

const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const moment = require("moment");
// send image
const multer = require("multer");
const upload = multer({ storage: multer.diskStorage({}) });
const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// ---------------------------------
// FUNCTIONS GET REQUESTS FRONTEND
// ---------------------------------


const get_homepage = async (req, res) => {
  try {
    // get all product
    const allproduct = await createproduct.find();

    allproduct ? (newData = allproduct) : (newData = null);
    res.render("product/homepage", {
      mytitle: "homepage",
      data: newData,
      momen_t: moment,
    });
  } catch (error) {
    console.log("have error in get_homepage", error);
  }
}

const get_contact = async (req, res) => {
  try {
    res.render("product/contact", { mytitle: "contact" });
  } catch (error) {
    console.log("have error in get_contact", error);
  }
}

const get_orders = async (req, res) => {
  try {

    res.render("product/orders", { mytitle: "orders" });
  } catch (error) {
    console.log("have error in get_orders", error);
  }
}

const get_Checkout =async (req, res) => {
  try {
    const token = req.cookies.jwt_User;
    var decoded = jwt.verify(token, process.env.PROTECT_KEY_JWT);

    // account user
    const getUser = await Authuser.findOne({ _id: decoded.id });
    getUser.ProductCards.length > 0
      ? (productCard = getUser.ProductCards)
      : (productCard = null);

    res.render("product/pay", { mytitle: "Checkout", Prodata: productCard });
  } catch (error) {
    console.log("have error in get_Checkout", error);
  }
}

const get_productdetails =async (req, res) => {
  try {
    const getProduct = await createproduct.findById(req.params.id);

    // get all product
    const allproduct = await createproduct.find();
    allproduct ? (newAll = allproduct) : (newAll = null);
    getProduct ? (newOne = getProduct) : (newOne = null);
    res.render("product/productdetails", {
      mytitle: "productdetails",
      ProductData: newOne,
      productsAll: newAll,
    });
  } catch (error) {
    console.log("have error in get_productdetails", error);
  }
}

const get_productpage =async (req, res) => {
  try {
    const allproduct = await createproduct.find();
    allproduct.length > 0 ? (arrdata = allproduct) : (arrdata = null);

    res.render("product/productpage", {
      mytitle: "productpage",
      products: arrdata,
    });
  } catch (error) {
    console.log("have error in get_productpage", error);
  }
}

const get_ShoppingCart = async (req, res) => {
  try {
    const token = req.cookies.jwt_User;
    var decoded = jwt.verify(token, process.env.PROTECT_KEY_JWT);

    // account user
    const getUser = await Authuser.findOne({ _id: decoded.id });
    getUser.ProductCards
      ? (UserProduct = getUser.ProductCards)
      : (UserProduct = null);

    res.render("product/ShoppingCart", {
      mytitle: "ShoppingCart",
      allcards: UserProduct,
    });
  } catch (error) {
    console.log("have error in get_ShoppingCart", error);
  }
}

const get_useraccount = async (req, res) => {
  try {
    const token = req.cookies.jwt_User;
    var decoded = jwt.verify(token, process.env.PROTECT_KEY_JWT);

    // account user
    const getUserData = await Authuser.findOne({ _id: decoded.id });
    getUserData ? (dataUser = getUserData) : (dataUser = null);
    if (getUserData) {
      res.render("product/useraccount", {
        mytitle: "useraccount",
        dataOfUser: dataUser,
        momen_t: moment,
      });
    }
  } catch (error) {
    console.log("have error in get_useraccount", error);
  }
}

const get_signup = (req, res) => {
  res.render("AuthUser/Signup", { mytitle: "signup" });
};
const get_login = (req, res) => {
  res.render("AuthUser/Login", { mytitle: "login" });
};

// -----------------------------------

// ---------------------------------
// FUNCTIONS GET REQUESTS BACKEND
// ---------------------------------

const get_admin_dashboard =(req, res) => {
  try {
    res.render("admin/dashboard", { mytitle: "dashboard" });
  } catch (error) {
    console.log("have error in get_dashboard", error);
  }
}

const get_admin_admininfo = (req, res) => {
  try {
    res.render("admin/admininfo", { mytitle: "admininfo" });
  } catch (error) {
    console.log("have error in get_admininfo", error);
  }
}

const get_admin_analytics = (req, res) => {
  try {
    res.render("admin/analytics", { mytitle: "analytics" });
  } catch (error) {
    console.log("have error in get_analytics", error);
  }
}

const get_admin_customers = (req, res) => {
  try {
    res.render("admin/customers", { mytitle: "customers" });
  } catch (error) {
    console.log("have error in get_customers", error);
  }
}

const get_admin_orders =(req, res) => {
  try {
    res.render("admin/orders", { mytitle: "orders" });
  } catch (error) {
    console.log("have error in get_orders", error);
  }
}

const get_admin_settings =(req, res) => {
  try {
    res.render("admin/settings", { mytitle: "settings" });
  } catch (error) {
    console.log("have error in get_settings", error);
  }
}

const get_admin_product = async (req, res) => {
  await createproduct
    .find()
    .then((allproducts) => {
      res.render("admin/manageProducts/manageproducts", {
        data: allproducts,
        momen_t: moment,
        mytitle: "manageproducts",
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const get_adminViewProduct = async (req, res) => {
  const viewProduct = await createproduct.findById(req.params.id);
  if (viewProduct) {
    res.render("admin/manageProducts/viewproduct", {
      data: viewProduct,
      mytitle: "viewproduct",
    });
  } else {
    console.log("have error in get_viewProduct");
  }
};

const get_adminEditProduct = async (req, res) => {
  const editProduct = await createproduct.findById(req.params.id);
  if (editProduct) {
    //create jwt
    const token = jwt.sign(
      { id: editProduct._id },
      process.env.PROTECT_KEY_JWT
    );
    res.cookie("jwt_product", token, { httpOnly: true, maxAge: 86400000 });

    res.render("admin/manageProducts/editproduct", {
      mytitle: "editproduct",
      data: editProduct,
    });
  } else {
    console.log("have error in get_EditProduct");
  }
};

const get_loginAdmin = (req, res) => {
  try {
    res.render("admin/loginAdmin", { mytitle: "LoginAdmin" });
  } catch (error) {
    console.log("have error in get_loginAdmin", error);
  }
}

//   -------------------------------------------
//   -------------------------------------------

// ---------------------------------
// FUNCTIONS POST REQUESTS FRONTEND
// ---------------------------------

const post_addtocard =async (req, res) => {
  const token = req.cookies.jwt_User;
  var decoded = jwt.verify(token, process.env.PROTECT_KEY_JWT);

  // find product
  const getproduct = await createproduct.findOne({ _id: req.params.id });
  if (getproduct) {
    // update one
    const AddProduct = await Authuser.updateOne(
      { _id: decoded.id },
      { $push: { ProductCards: getproduct } }
    );
    res.redirect("/ShoppingCart");
  }
}

const post_removeoncard =async (req, res) => {
  const token = req.cookies.jwt_User;
  var decoded = jwt.verify(token, process.env.PROTECT_KEY_JWT);

  // remove Product from cards
  const removeProduct = await Authuser.updateOne(
    { _id: decoded.id },
    {
      $pull: {
        ProductCards: { _id: new mongoose.Types.ObjectId(req.params.id) },
      },
    }
  );

  res.redirect("/ShoppingCart");
}

const post_updatedatauser =async (req, res) => {
  const token = req.cookies.jwt_User;
  var decoded = jwt.verify(token, process.env.PROTECT_KEY_JWT);

  const updatedatauser = await Authuser.updateOne(
    { _id: decoded.id },
    req.body
  );

  res.redirect("/useraccount");
}

const post_search =async (req, res) => {
  let searchWords = req.body.search.toLowerCase().trim();

  if (searchWords) {
    const products = await createproduct.find();
    if (products.length > 0) {
      let arrsearch = [];

      products.forEach((element) => {
        console.log(element.productname.toLowerCase().trim() == searchWords);
        if (element.productname.toLowerCase().trim() == searchWords) {
          arrsearch.push(element);
        }
      });

      // بدلاً من إعادة التوجيه، استخدم res.render لتمرير البيانات
      res.render("product/productpage", { products: arrsearch,mytitle: "productpage" });
    } else {
      // إذا لم يتم العثور على أي منتجات
      res.render("product/productpage", { products: [],mytitle: "productpage" });
    }
  } else {
    // إذا كان حقل البحث فارغًا
    res.render("product/productpage", { products: [],mytitle: "productpage" });
  }
 }

const post_signup_User =async (req, res) => {
  const { password, Confirmpassword } = req.body;

  if (password === Confirmpassword) {
    //check if email alreedy existed
    const ExistedUser = await Authuser.findOne({ email: req.body.email });
    if (!ExistedUser) {
      //create new user
      const newUser = await Authuser.create(req.body);
      //create jwt
      const token = jwt.sign({ id: newUser._id }, process.env.PROTECT_KEY_JWT);
      res.cookie("jwt_User", token, { httpOnly: true, maxAge: 86400000 });

      res.redirect("/");
    } else {
      res.json({ emailExisted: "email alreedy existed" });
      res.redirect("/signup");
    }
  } else {
    res.json({ errorPassword: "password not equal confirmPassword" });
    res.redirect("/signup");
  }
}

const post_login_User =async (req, res) => {
  try {
    //chech email
    const ExistedUser = await Authuser.findOne({ email: req.body.email });
    if (ExistedUser) {
      //check password
      const match = await bcrypt.compare(
        req.body.password,
        ExistedUser.password
      );
      if (match) {
        //create jwt
        const token = jwt.sign(
          { id: ExistedUser._id },
          process.env.PROTECT_KEY_JWT
        );
        res.cookie("jwt_User", token, { httpOnly: true, maxAge: 86400000 });

        res.redirect("/");
      } else {
        console.log("wrong password");
      }
    } else {
      console.log("email not found");
    }
  } catch (error) {}
}

// ------------------------------------

// ---------------------------------
// FUNCTIONS POST REQUESTS FRONTEND
// ---------------------------------

const post_addProduct = async (req, res, next) => {
  // create newProduct
  console.log(req.body);
  const newproduct = await createproduct.create(req.body);
  // restore image in product
  for (const img of req.files) {
    cloudinary.uploader.upload(img.path, async (error, result) => {
      const addimage = await createproduct.updateOne(
        { _id: newproduct.id },
        { $push: { images: result.secure_url } }
      );
    });
  }
  res.redirect("admin/products");
};
const put_updatproduct =   async (req, res, next) => {
  
  const Updateopject = await createproduct.updateOne(
    { _id: req.params.id },
    req.body
  );

  if (!req.file) {
    return res.redirect("/admin/products");
  }

// updateImage
cloudinary.uploader.upload(req.file.path, async (error, result) => {
  let NewUrlImage = result.secure_url;
  let IndexImage = req.body.imageindex;
  const UpdateOneImage = await createproduct.updateOne(
    { _id:  req.params.id },
    { $set: { [`images.${IndexImage}`]: NewUrlImage } }
  );
});

res.redirect("/admin/products");
}
const post_deleteimage = async (req, res) => {
  const token = req.cookies.jwt_product;
  if (token) {
    const decoded = jwt.verify(token, process.env.PROTECT_KEY_JWT);
    const deleteimage = await createproduct.updateOne(
      { _id: decoded.id },
      { $pull: { images: req.body.image } }
    );
    res.redirect("/admin/products");
  }
}
const delete_product = async (req, res) => {
  const deleteProduct = await createproduct.deleteOne({ _id: req.params.id });
  res.redirect("/admin/products");
}

const post_admin_signup =  async (req, res) => {
  const objError = validationResult(req);
  if (objError.errors.length > 0) {
    return res.json({
      validationerrors: objError.errors,
    });
  }

  //is email existed
  const isExistedAdmin = await AuthAdmin.findOne({ email: req.body.email });

  if (!isExistedAdmin) {
    //create new user
    const newAdmin = await AuthAdmin.create(req.body);
    //create jwt
    const token = jwt.sign({ id: newAdmin._id }, process.env.PROTECT_KEY_JWT);
    res.cookie("jwt_Admin", token, { httpOnly: true, maxAge: 86400000 });
    res.json({ id: newAdmin._id });
  } else {
    res.json({ emailExisted: "email alreedy existed" });
  }
}

const post_admin_login = async (req, res) => {
  try {
    //chech email
    const ExistedAdmin = await AuthAdmin.findOne({ email: req.body.email });
    if (ExistedAdmin) {
      //check password
      const match = await bcrypt.compare(
        req.body.password,
        ExistedAdmin.password
      );

      if (match) {
        //create jwt
        const token = jwt.sign(
          { id: ExistedAdmin._id },
          process.env.PROTECT_KEY_JWT
        );
        res.cookie("jwt_Admin", token, { httpOnly: true, maxAge: 86400000 });
        res.json({ id: ExistedAdmin._id });
      } else {
        res.json({ wrongPassword: "wrong password" });
      }
    } else {
      res.json({ wrongEmail: "email not found" });
    }
  } catch (error) {
    console.log("error in admin login post");
  }
}

module.exports = {
  get_homepage,
  get_contact,
  get_orders,
  get_Checkout,
  get_productdetails,
  get_productpage,
  get_ShoppingCart,
  get_useraccount,
  get_signup,
  get_login,
  // ------
  get_admin_dashboard,
  get_admin_admininfo,
  get_admin_analytics,
  get_admin_customers,
  get_admin_orders,
  get_admin_settings,
  get_admin_product,
  get_adminViewProduct,
  get_adminEditProduct,
  get_loginAdmin,
  // ------
  post_addtocard,
  post_removeoncard,
  post_updatedatauser,
  post_search,
  post_signup_User,
  post_login_User,
  // ------
  post_addProduct,
  put_updatproduct,
  post_deleteimage,
  delete_product,
  post_admin_signup,
  post_admin_login
};
