// Requiring path to so we can use relative routes to our HTML files
var express = require("express");
var app = express.Router();

// Requiring our custom middleware for checking if a user is logged in
const {
  ensureAuth,
  ensureUser,
} = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", ensureUser, (req, res) => {
    res.render("intro", {
      layout: "intro",
    });
  });

  app.get("/dashboard", ensureUser, (req, res) => {
    // If the user already has an account send them to the home page
    res.render("dashboard", {
      layout: "main",
    });
  });
};
