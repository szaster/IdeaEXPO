// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const morgan = require("morgan");
const exphbs = require("express-handlebars");
const app = express();
const passport = require("./config/passport");

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
//require("./config/passport")(passport);
// Requiring passport as we've configured it

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
	session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);

// Handlebars
app.engine(".hbs", exphbs({ extname: ".hbs" }));
app.set("view engine", ".hbs");

// Session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  // Add Sequelize here
  //store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

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
