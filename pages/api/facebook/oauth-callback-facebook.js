import { getFacebookAccessToken } from "../../../lib/user";

export default async function FacebookCallback(req, res) {
  try {
    console.log("run getFacebookAccessToken");
    await getFacebookAccessToken(req.query)
      .then(() => {
        res.status(200).redirect("/settings?facebookAcces=refresh");
      })
      .catch((error) => {
        res.status(409).redirect("/settingsfacebookAcces=failedRefresh");
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
