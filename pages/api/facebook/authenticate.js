import { updateFacebookAccessToken } from "../../../lib/user";

export default async function authenticate(req, res) {
  try {
    await updateFacebookAccessToken()
      .then((data) => {
        // console.log("data", data);
        res.status(200).redirect(`https://www.facebook.com/v15.0/dialog/oauth?client_id=${data.FACEBOOK_CLIENT_ID}&redirect_uri=${data.FACEBOOK_REDIRECT_URI}&state=${req.query.email}`);
      })
      .catch((error) => {
        console.error(error);
        res.status(401).send(error.message);
      });
    setTimeout(function () {
      res.send();
    }, 2000);
  } catch (error) {
    console.error(error);
    res.status(401).send(error.message);
    res.end();
  }
}
