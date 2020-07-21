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
  passport.authenticate("google", { failureREdirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);
module.exports = router;
