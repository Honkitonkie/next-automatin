import mongoose from "mongoose";
import crypto from "crypto";

var max = 120;
var fillArr = fillArray(new Array(), max);
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
const wantedPics = mongoose.Schema({
  linksboven: {
    type: Array,
  },
  linksonder: {
    type: Array,
  },
  rechtsboven: {
    type: Array,
  },
  rechtsonder: {
    type: Array,
  },
  center: {
    type: Array,
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
    type: wantedPics,
  },
  form_id: {
    type: Array,
    default: [
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
      "thirteen",
      "fourteen",
      "fifteen",
      "sixteen",
      "seventeen",
      "eighteen",
      "nineteen",
      "twenty",
      "twentyone",
      "twentytwo",
      "twentythree",
      "twentyfour",
      "twentyfive",
      "twentysix",
      "twentyseven",
      "twentyeight",
      "twentynine",
      "thirty",
      "thirtyone",
      "thirtytwo",
      "thirtythree",
      "thirtyfour",
      "thirtyfive",
      "thirtysix",
      "thirtyseven",
      "thirtyeight",
      "thirtynine",
      "fourty",
      "fourtyone",
      "fourtytwo",
      "fourtythree",
      "fourtyfour",
      "fourtyfive",
      "fourtysix",
      "fourtyseven",
      "fourtyeight",
      "fourtynine",
      "fifty",
      "fiftyone",
      "fiftytwo",
      "fiftythree",
      "fiftyfour",
      "fiftyfive",
      "fiftysix",
      "fiftyseven",
      "fiftyeight",
      "fiftynine",
      "sixty",
      "sixtyone",
      "sixtytwo",
      "sixtythree",
      "sixtyfour",
      "sixtyfive",
      "sixtysix",
      "sixtyseven",
      "sixtyeight",
      "sixtynine",
      "seventy",
      "seventyone",
      "seventytwo",
      "seventythree",
      "seventyfour",
      "seventyfive",
      "seventysix",
      "seventyseven",
      "seventyeight",
      "seventynine",
      "eighty",
      "eightyone",
      "eightytwo",
      "eightythree",
      "eightyfour",
      "eightyfive",
      "eightysix",
      "eightyseven",
      "eightyeight",
      "eightynine",
      "ninety",
      "ninetyone",
      "ninetytwo",
      "ninetythree",
      "ninetyfour",
      "ninetyfive",
      "ninetysix",
      "ninetyseven",
      "ninetyeight",
      "ninetynine",
      "hundred",
      "hundredone",
      "hundredtwo",
      "hundredthree",
      "hundredfour",
      "hundredfive",
      "hundredsix",
      "hundredseven",
      "hundredeight",
      "hundrednine",
      "hundredten",
      "hundredeleven",
      "hundredtwelve",
      "hundredthirteen",
      "hundredfourteen",
      "hundredfifteen",
      "hundredsixteen",
      "hundredseventeen",
      "hundredeightteen",
      "hundrednineteen",
      "hundredtwenty",
    ],
  },
  linkedin: {
    type: Object,
    type: LinkedinSchema,
    default: {},
  },
});

function fillArray(arr, index) {
  arr.length = index;
  for (let i = 0; i < arr.length; i++) {
    arr[i] = true;
    if ((i > 3 && i < 11) || (i > 42 && i < 50) || i > 97) {
      arr[i] = false;
    }
  }
  return arr;
}

// const User = mongoose.model("User", UserSchema);
// module.exports = User;

export default mongoose.models.User || mongoose.model("User", UserSchema);
