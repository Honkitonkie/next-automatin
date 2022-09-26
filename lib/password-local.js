import Local from "passport-local";
import { findUser, validatePassword } from "./user";

export const localStrategy = new Local.Strategy({ usernameField: "email" }, function (email, password, done) {
  findUser({ email })
    .then((user) => {
      if (user && validatePassword(user, password)) {
        done(null, user);
      } else {
        done(new Error("Email en wachtwoord combinatie klopt niet"));
      }
    })
    .catch((error) => {
      done(error);
    });
});
