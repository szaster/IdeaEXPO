const path = require('path')
const express = require('express');
//const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan');
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')

//const MongoStore = require('connect-mongo')(session)
//const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

// Passport config
require('./config/passport')(passport)

//connectDB();

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
app.use("/", require("./controllers/index"));
app.use("/auth", require("./controllers/auth"));

// require("./controllers/index")(app);
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

const PORT = process.env.PORT || 8080;

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
    }
}))

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Handlebars Helpers
//const { formatDate, stripTags, truncate, editIcon, select} = require('./helpers/hbs')

// Handlebars
app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Passport Session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
   // store: new MongoStore({ mongooseConnection: mongoose.connection})
}))

// Set Passport middleware//
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
 app.use('/', require('./controllers/index'))
app.use('/auth', require('./controllers/auth'))
app.use('/ideas', require('./controllers/ideas'))

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} `));

