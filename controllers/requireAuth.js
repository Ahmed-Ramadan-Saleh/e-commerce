//protect routes or Authorization
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, "ahmed123", async (err, decoded) => {
        if (err) {
          res.redirect("/login");
        } else {
          const currentUser = await Authuser.findById(decoded.id);
          res.locals.user = currentUser;
          next();
        }
      });
    } else {
      res.redirect("/login");
    }
  };