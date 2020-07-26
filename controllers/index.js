// @file desc: Authorizatin middleware and dashboard ideas file
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
//   GET /dashboard// GET all the ideas by

router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const ideas = await db.idea.findAll({ where: { userId: req.user.id } });
    const data = ideas.map((a) => a.dataValues);
    // console.log("ideas object:", ideas),
    // console.log("db.object:", db.idea),
    // console.log("data object:", data)
    res.render("dashboard", {
      name: req.user.firstName,
      ideas: data,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
