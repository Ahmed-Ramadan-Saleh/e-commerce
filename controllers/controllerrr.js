const Authuser = require("../model/Authuser");
const createproduct = require("../model/newproduct");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
// to get cookies from browser
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

// Get Requests






const get_contact = (req, res) => {
  res.render("Auth/contact", { mytitle: "contact" });
};
const get_signup = (req, res) => {
  res.render("Auth/signup", { mytitle: "signup" });
};
const get_login = (req, res) => {
  res.render("Auth/login", { mytitle: "login" });
};



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

//   -------------------------------------------
// Post Requests

const post_signup = async (req, res) => {
  try {
    //check feilds is null
    if (req.body.username && req.body.email && req.body.password !== null) {
      if (req.body.password === req.body.Confirmpassword) {
        //check if email alreedy existed
        const ExistedUser = await Authuser.findOne({ email: req.body.email });
        if (ExistedUser == null) {
          //create new user
          Authuser.create(req.body)
            .then((result) => {
              //create jwt
              const token = jwt.sign(
                { id: result._id },
                process.env.PROTECT_KEY_JWT
              );
              res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });

              res.redirect("/");
            })
            .catch((error) => {
              console.log("error in signup new user", error);
            });
        } else {
          console.log("email alreedy existed");
        }
      } else {
        console.log("please confirm enter password");
      }
    } else {
      console.log("please enter data inside the inputs");
      res.redirect("/signup");
    }
  } catch (error) {}
};
const post_login = async (req, res) => {
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
        console.log("correct email & password");
        //create jwt
        const token = jwt.sign(
          { id: ExistedUser._id },
          process.env.PROTECT_KEY_JWT
        );
        res.cookie("jwt", token, { httpOnly: true, maxAge: 86400000 });

        res.redirect("/");
      } else {
        console.log("wrong password");
      }
    } else {
      console.log("email not found");
    }
  } catch (error) {}
};
const post_addProduct = async (req, res, next) => {
  // create newProduct
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

module.exports = {
  get_contact,
  get_signup,
  get_login,
  get_admin_product,
  get_adminViewProduct,
  get_adminEditProduct,
  post_signup,
  post_login,
  post_addProduct,
  put_updatproduct,
  post_deleteimage,
  delete_product
};
