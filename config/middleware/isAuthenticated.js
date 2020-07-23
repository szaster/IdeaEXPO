// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = {
  // If the user is logged in, continue with the request to the restricted route
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  // If the user is already logged in, it'll take them to the homepage
  ensureUser: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
};
