import passport from "passport";
import LocalStrategy from "passport-local";
import { findUserByEmail, validatePassword } from "./db";
// import { dbConnect } from "./dbConnect";

passport.serializeUser(function (user, done) {
  // serialize the email into session
  done(null, user.email);
});

passport.deserializeUser(function (req, id, done) {
  // deserialize the email back into user object
  const user = findUserByEmail(req, id);
  done(null, user);
});

passport.use(
  new LocalStrategy({ passReqToCallback: true, emailField: "email" }, (req, email, password, done) => {
    // Here you lookup the user in your DB and compare the password/hashed password
    const user = findUserByEmail(req, email);

    // Security-wise, if you hashed the password earlier, you must verify it
    // if (!user || await argon2.verify(user.password, password))
    if (!user || !validatePassword(user, password)) {
      done(null, null);
    } else {
      done(null, user);
    }
  })
);

export default passport;
