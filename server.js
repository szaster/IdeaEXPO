// Requiring necessary npm packages
require("dotenv").config();
const express = require("express");
const session = require("express-session");
// const dotenv = require("dotenv");
const path = require("path");
// Handlebars
const exphbs = require("express-handlebars");
// Requiring passport as we've configured it
const passport = require("./config/passport");
// Setting up port and requiring models for syncing
const methodOverride = require("method-override");
const morgan = require("morgan");

const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public")));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
//Passport middleware
app.use(passport.initialize());
// integrate passport with our express session middleware
app.use(passport.session());

//Setting global variable
app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
});

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "method" in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body.method;
      delete req.body.method;
      return method;
    }
  })
);

// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require("./helpers/hbs");

// Handlebars;
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: "main",
    extname: ".hbs",
    layoutsDir: path.join(__dirname, "views/layouts"),
  })
);
app.set("view engine", ".hbs");

// Requiring our routes
app.use("/", require("./controllers/index"));
app.use("/auth", require("./controllers/auth"));
app.use("/ideas", require("./controllers/ideas"));

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
