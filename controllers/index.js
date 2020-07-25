// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const router = express.Router();
// const passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
const {
  ensureAuth,
  ensureUser,
} = require("../config/middleware/isAuthenticated");

const db = require("../models");

//   Login/Landing page
//   GET /
router.get("/", (req, res) => {
  res.render("intro", {
    layout: "intro",
  });
});
//   Dashboard
//   GET /dashboard
//was async (req,res)
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const ideas = await db.user.findOne({ user: req.user.id });
    console.log("dashboard/ideas:", ideas);
    res.render("dashboard", {
      name: req.user.firstName,
      ideas,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }

  // res.render("dashboard", {
  //   name: req.user.firstName,
  // });

  // try {
  //   const ideas = await db.idea.find({ idea: req.idea._id });
  //   res.render("dashboard", {
  //     name: req.user.firstName,
  //     ideas,
  //   });
  // } catch (err) {
  // console.log("this is db.idea", db.idea);
  // console.error(err);
  // console.log("name ", name);
  // console.log("ideas ", ideas);
  // res.render("error/500");
});

module.exports = router;
