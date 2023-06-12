const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");

const settings = require("../config/settings");
const key = settings.secret;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: key,
};

module.exports = (passport) => {
  passport.use(
    // Create a new instance of JwtStrategy
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        // Find a user in the database based on the username in the jwt_payload
        const user = await User.findOne({ username: jwt_payload.username });

        if (user) {
          // If a user is found, return it as the authenticated user
          return done(null, user);
        } else {
          // If no user is found, return false indicating authentication failure
          return done(null, false);
        }
      } catch (err) {
        // Return the error to the caller
        return done(err, false);
      }
    })
  );
};
