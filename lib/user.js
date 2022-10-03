import dbConnect from "./dbConnect";
import User from "./../models/User";
import crypto from "crypto";
import { resolve } from "path";
import axios from "axios";

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
export async function updateUserSwitch({ email, feedType, templateVal, index }) {
  let db = await dbConnect();

  User.findOneAndUpdate({ email: email })
    .then((user) => {
      // let unChanged = feedType === "person" || feedType === "organization" ? user.linkedin.templates[feedType][index] === templateVal : user.wantedPics[feedType][index] === templateVal;
      // if (!unChanged) {
      switch (feedType) {
        case "person":
          user.linkedin.templates.person[index] = templateVal;
          break;
        case "organization":
          user.linkedin.templates.organization[index] = templateVal;
          break;
        case "linksboven":
          user.wantedPics.linksboven[index] = templateVal;
          break;
        case "linksonder":
          user.wantedPics.linksonder[index] = templateVal;
          break;
        case "rechtsboven":
          user.wantedPics.rechtsboven[index] = templateVal;
          break;
        case "rechtsonder":
          user.wantedPics.rechtsonder[index] = templateVal;
          break;
        case "center":
          user.wantedPics.center[index] = templateVal;
          break;
        default:
          console.log("no match in feedtype switch");
      }
      user.save();
      console.log(`DB update:  ${feedType}[${index}] for ${email} to ${templateVal}`);
      return user;
    })
    .catch((err) => console.log("err @ updateUserSwitch:", err));
}
// Here you should lookup for the user in your DB
export async function updateUserFeedType(body) {
  let db = await dbConnect();
  return User.findOneAndUpdate({ email: body.email }, { upsert: true })
    .then((user) => {
      user.linkedin.feed_type = body.feedTypeSelector;
      user.save();
      console.log(`DB updated feedtype to ${user.linkedin.feed_type}:`);
    })
    .catch((err) => console.log("err at updateUserSettings:", err));
}
export async function updateUserOrganizationUrn(body) {
  let db = await dbConnect();
  console.log("body", body.organizationUrnSelector);
  return User.findOneAndUpdate({ email: body.email }, { upsert: true })
    .then((user) => {
      user.linkedin.organization_urn = body.organizationUrnSelector;
      user.save();
      console.log(`DB updated organization_urn to ${user.linkedin.organization_urn}:`);
    })
    .catch((err) => console.log("err at updateUserOrganizationUrn :", err));
}

// Compare the password of an already fetched user (using `findUser`) and compare the
// password for a potential match
export function validatePassword(user, inputPassword) {
  const inputHash = crypto.pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512").toString("hex");
  const passwordsMatch = user.password === inputHash;
  return passwordsMatch;
}

export async function updateAccessToken() {
  return { LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID, LINKEDIN_REDIRECT_URI: process.env.LINKEDIN_REDIRECT_URI };
}

export async function getAccessToken(body) {
  const email = body.state;
  if (body.state && body.code) {
    let db = await dbConnect();
    let thisURI = `https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&code=${body.code}`;
    // lvl1
    const res = axios
      .post(thisURI)
      .then((res) => {
        const lvl2data = res.data;
        const accesToken = res.data.access_token;
        const expires_in = res.data.expires_in;
        const config = {
          headers: { Authorization: `Bearer ${res.data.access_token}` },
        };

        console.log("\nlvl2 data", lvl2data);
        // lvl2
        axios
          .get("https://api.linkedin.com/v2/me", config)
          .then((res) => {
            const meData = res.data;
            const urn = res.data.id;
            console.log("meData received from: https://api.linkedin.com/v2/me: ", meData);
            const organizationConfig = {
              headers: { Authorization: `Bearer ${accesToken}`, "X-Restli-Protocol-Version": "2.0.0" },
            };
            // lvl3
            axios
              .get("https://api.linkedin.com/v2/organizationAcls?q=roleAssignee", organizationConfig)
              .then((res) => {
                const lvl3data = res.data;
                const listCompanies = [];
                const listCompaniesIds = [];
                lvl3data.elements.forEach((element) => {
                  if (element.state === "APPROVED") {
                    let temp = element.organization;
                    let ellArr = temp.split(":");
                    listCompaniesIds.push(ellArr[ellArr.length - 1]);
                  }
                });
                console.log("\nlvl 3 data", lvl3data);
                console.log("lvl 3 listCompaniesIds", listCompaniesIds);
                // lvl4
                axios
                  .get(`https://api.linkedin.com/v2/organizationsLookup?ids=List(${listCompaniesIds.toString()})`, organizationConfig)
                  .then((res) => {
                    const lvl4data = res.data;
                    for (const [key, value] of Object.entries(lvl4data.results)) {
                      let nameVar;
                      let urnVar;
                      let selected;
                      for (const [deeperkey, deepervalue] of Object.entries(value)) {
                        if (deeperkey === "localizedName") {
                          nameVar = deepervalue;
                        }
                        urnVar = key;
                      }
                      listCompanies.push({
                        name: nameVar,
                        urn: key,
                      });
                    }
                    console.log("\nlvl4 data: ", lvl4data);
                    console.log("lvl4 listCompanies: ", listCompanies);
                    // update linkedindata for current user in database
                    const query = { email: email };
                    return User.findOne(query).then((user) => {
                      console.log("Updated token on your account");
                      user.linkedin.access_token = user.linkedin.access_token ? accesToken : accesToken;
                      user.linkedin.expires_in = user.linkedin.expires_in ? expires_in : expires_in;
                      user.linkedin.urn = user.linkedin.urn ? urn : urn;
                      user.linkedin.token_expire_date = user.linkedin.token_expire_date
                        ? new Date(Date.now() + expires_in * 1000).toLocaleString().split(",")[0]
                        : new Date(Date.now() + expires_in * 1000).toLocaleString().split(",")[0];
                      user.linkedin.creationDate = user.linkedin.creationDate ? Date.now() : Date.now();
                      user.linkedin.listCompanies = user.linkedin.listCompanies ? listCompanies : listCompanies;
                      user.linkedin.automatin_client_secret = user.linkedin.automatin_client_secret ? user.linkedin.automatin_client_secret : crypto.randomBytes(16).toString("hex");
                      user.linkedin.automatin_client_id = user.linkedin.automatin_client_id ? user.linkedin.automatin_client_id : process.env.AUTOMATIN_CLIENT_ID;
                      user.linkedin.templates = user.linkedin.templates ? user.linkedin.templates : User().linkedin.templates;
                      user.save();
                    });
                  })
                  .catch((err) => {
                    console.log("err @lvl4: \n", err.message);
                  });
              })
              .catch((err) => console.log("err @lvl3: \n", err.message));
          })
          .catch((err) => console.log("err @lvl2: \n", err.message));
      })
      .catch((err) => console.log("err @lvl1: \n", err.message));
  }
}

export async function removeAccessToken(email) {
  console.log("body removeAccessToken", email);
  if (email) {
    let db = await dbConnect();
    const query = { email: email };
    return User.findOne(query).then((user) => {
      console.log("Removed token on account");
      user.linkedin.access_token = "";
      user.expires_in = "";
      user.token_expire_date = "";
      user.save();
    });
  }
}

export async function updatePassword(body) {
  let db = await dbConnect();
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(body.password, salt, 1000, 64, "sha512").toString("hex");
  const new_secret = crypto.pbkdf2Sync(body.password, salt, 1000, 64, "sha512").toString("hex");
  User.findOne({ email: body.email }).then((user) => {
    if (user && body.secret === user.linkedin.automatin_client_secret) {
      user.password = hash;
      user.salt = salt;
      user.linkedin.automatin_client_secret = new_secret;
      user.save();
      return user;
    } else {
      return;
    }
  });
}
