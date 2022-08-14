import dbConnect from "./dbConnect";
import User from "./../models/User";
import crypto from "crypto";
import { resolve } from "path";

const users = [];

export async function createUser({ username, email, company, password }) {
  let db = await dbConnect();
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  User.findOne({ email: email }).then((user) => {
    if (user) {
      return;
    } else {
      const newUser = new User();
      newUser.password = hash;
      newUser.email = email;
      newUser.company = company;
      newUser.name = username;
      newUser.salt = salt;
      newUser.save();
      users.push(newUser);
      return newUser;
    }
  });
}

// Here you should lookup for the user in your DB
export async function findUser({ email }) {
  let db = await dbConnect();
  return User.findOne({ email: email });
}

// Here you should lookup for the user in your DB
export async function updateUser({ email, feedType, templateVal, index, field }) {
  let db = await dbConnect();

  return User.findOneAndUpdate({ email: email })
    .then((user) => {
      if (feedType === "person") {
        user.linkedin.templates.person[index] = templateVal;
      } else if (feedType === "organization") {
        user.linkedin.templates.organization[index] = templateVal;
      } else if (feedType === "linksboven") {
        user.wantedPics.linksboven[index] = templateVal;
      } else if (feedType === "linksonder") {
        user.wantedPics.linksonder[index] = templateVal;
      } else if (feedType === "rechtsboven") {
        user.wantedPics.rechtsboven[index] = templateVal;
      } else if (feedType === "rechtsonder") {
        user.wantedPics.rechtsonder[index] = templateVal;
      } else if (feedType === "center") {
        user.wantedPics.center[index] = templateVal;
      } else {
        console.log("no matching feedType found");
      }
      user.save();
      console.log("updated user!", email, feedType, templateVal, index);
    })
    .catch((err) => console.log("err:", err));
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512").toString("hex");
  const passwordsMatch = user.password === inputHash;
  return passwordsMatch;
}
