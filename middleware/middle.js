
// check Admin
var jwt = require("jsonwebtoken");
const AuthUser = require("../model/AuthAdmin");

const requireAuthadmin = (req, res, next) => {
  const token = req.cookies.jwt_Admin;

  if (token) {
    jwt.verify(token, process.env.PROTECT_KEY_JWT, (err) => {
      if (err) {
        res.redirect("/admin/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/admin/login");
  }
};

// const checkIfAdmin = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (token) {
//     // login admin
//     jwt.verify(token,  PROTECT_KEY_JWT, async (err, decoded) => {
//       if (err) {
//         res.locals.user = null;
//         next();
//       } else {
//         const loginAdmin = await AuthUser.findById(decoded.id);
   
//         res.locals.user = loginAdmin ;
//         next();
//       }
//     });
//   } else {
//     // no login user
//     res.locals.user = null;
//     next();
//   }
// };

// check User
const requireAuthUser = (req, res, next) => {
  const token = req.cookies.jwt_User;

  if (token) {
    jwt.verify(token, process.env.PROTECT_KEY_JWT, (err) => {
      if (err) {
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

module.exports = { requireAuthadmin, requireAuthUser}
