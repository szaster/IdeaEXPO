// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// const dotenv = require("dotenv");

// dotenv.config({ path: "./config/config.env" });

// Requiring passport as we've configured it
const passport = require("./config/passport");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
//Passport middleware
app.use(passport.initialize());
// integrate passport with our express session middleware
app.use(passport.session());

// Handlebars
const exphbs = require("express-handlebars");

app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Requiring our routes
// app.use("/", require("./controllers/index"));
// app.use("/auth", require("./controllers/auth"));

// require("./controllers/auth")(app);
require("./controllers/index")(app);
// require("./controllers/api-routes.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
