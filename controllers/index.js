// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const router = express.Router();
// const passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
const {
  ensureAuth,
  ensureUser,
} = require("../config/middleware/isAuthenticated");
const idea = require("../models/idea");

//   Login/Landing page
//   GET /
router.get("/", ensureUser, (req, res) => {
  res.render("intro", {
    layout: "intro",
  });
});
//   Dashboard
//   GET /dashboard

//////////old code below//////////

router.get("/dashboard", ensureAuth, (req, res) => {
  // If the user already has an account send them to the home page
  res.render("dashboard", {
    layout: "main",
  });
});
///////////////////////////////////////////

// router.get("/dashboard", ensureAuth, async (req, res) => {
//   // If the user already has an account send them to the home page
//   try {
//     const ideas = await idea.findOne({ where: { user: req.user.id } }).lean();
//     res.render("dashboard", {
//       name: req.user.firstName,
//       ideas,
//     });
//   } catch (err) {
//     console.error(err);
//     res.render("error/500");
//   }
//   // res.render("dashboard", {
//   //   layout: "main",
//   // });
// });
module.exports = router;
