import mongoose from "mongoose";
import crypto from "crypto";

var fillArr = fillArray(new Array(), 120);
var fillArrTwo = fillArray(new Array(), 46, true);
var secret = crypto.randomBytes(32).toString("hex");

const TemplatesSchema = mongoose.Schema({
  person: {
    type: Array,
    default: fillArr,
  },
  person_history: {
    type: Array,
    default: [0],
  },
  organization: {
    type: Array,
    default: fillArr,
  },
  organization_history: {
    type: Array,
    default: [0],
  },
});
const WantedPicsSchema = mongoose.Schema({
  linksboven: {
    type: Array,
    default: fillArrTwo,
  },
  linksonder: {
    type: Array,
    default: fillArrTwo,
  },
  rechtsboven: {
    type: Array,
    default: fillArrTwo,
  },
  rechtsonder: {
    type: Array,
    default: fillArrTwo,
  },
  center: {
    type: Array,
    default: [0],
  },
});
const LinkedinSchema = mongoose.Schema({
  access_token: {
    type: String,
  },
  expires_in: {
    type: String,
  },
  urn: {
    type: String,
  },
  organization_urn: {
    type: String,
    default: "Selecteer hier",
  },
  addComment: {
    type: Boolean,
    default: true,
  },
  commentIntro: {
    type: String,
    default: "Lees hier verder: ",
  },
  creation_date: {
    type: Date,
  },
  token_expire_date: {
    type: Date,
  },
  automatin_client_id: {
    type: String,
    default: process.env.AUTOMATIN_CLIENT_ID,
  },
  automatin_client_secret: {
    type: String,
    default: secret,
  },
  listCompanies: {
    type: Array,
    default: [],
  },
  feed_type: {
    type: String,
    default: "person",
  },
  templates: {
    type: TemplatesSchema,
    default: {},
  },
});
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "automatin",
    required: false,
  },
  company: {
    type: String,
    default: "automatin",
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
    default: "",
  },
  resetPasswordExpires: {
    type: Date,
    default: "",
  },
  password_recovery_date: {
    type: Date,
    default: Date.now(),
  },
  contract: {
    type: String,
    default: "basic",
    required: false,
  },
  creation_date: {
    type: Date,
    default: Date.now(),
  },
  wantedPics: {
    type: Object,
    type: WantedPicsSchema,
    default: {},
  },
  linkedin: {
    type: Object,
    type: LinkedinSchema,
    default: {},
  },
});

function fillArray(arr, index, allTrue) {
  arr.length = index;
  if (!allTrue) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = true;
      if ((i > 3 && i < 11) || (i > 42 && i < 50) || i > 97) {
        arr[i] = false;
      }
    }
  } else {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = true;
    }
  }
  return arr;
}

// const User = mongoose.model("User", UserSchema);
// module.exports = User;

export default mongoose.models.User || mongoose.model("User", UserSchema);
