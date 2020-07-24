// Requiring path to so we can use relative routes to our HTML files
const express = require("express");
const router = express.Router();
// const passport = require("../config/passport");

// Requiring our custom middleware for checking if a user is logged in
const {
  ensureAuth,
  ensureUser,
} = require("../config/middleware/isAuthenticated");

const Idea = require("../models/");

//   Login/Landing page
//   GET /
router.get("/", (req, res) => {
  res.render("intro", {
    layout: "intro",
  });
});
//   Dashboard
//   GET /dashboard

// router.get("/dashboard", ensureAuth, (req, res) => {
//     Idea.Post.findOne({
//       where: {
// 		name: req.user.firstName,
// 		ideas,
//       }
//     })
//       .then( (dbPost) => {
//         res.json(dbPost);
//       });
//   });

router.get("/dashboard", ensureAuth, async (req, res) => {
  res.render("dashboard", {
    name: req.user.firstName,
  });

  // try {
  // 	// await
  // 	const ideas = await Idea.find({ user: req.user.id });
  // 	res.render("dashboard", {
  // 		name: req.user.firstName,
  // 		ideas,
  // 	});
  // } catch (err) {
  // 	console.error(err);
  // 	res.render("error/500");
  // }
});

module.exports = router;
