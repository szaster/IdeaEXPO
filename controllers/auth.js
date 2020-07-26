const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

// Auth with Google
// route GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google Auth callback
// GET /auth/google/callback
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect("/dashboard");
	}
);

//  Logout User
//  /auth/logout
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
