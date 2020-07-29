const GoogleStrategy = require("passport-google-oauth2").Strategy;
const passport = require("passport");

const db = require("../models");

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const newUser = {
        googleId: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        image: profile.photos[0].value,
      };
      // console.log("emails", params);
      try {
        let user = await db.user.findOne({
          where: { googleId: profile.id },
        });
        // console.log("user profile id is", user);

        if (user) {
          done(null, user);
        } else {
          user = await db.user.create(newUser);
          done(null, user);
        }
      } catch (err) {
        console.log("This is a mistake", err);
      }
    }
  )
);

// // In order to help keep authentication state across HTTP requests,
// // Sequelize needs to serialize and deserialize the user
// // Just consider this part boilerplate needed to make it all work

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Exporting our configured passport
module.exports = passport;
