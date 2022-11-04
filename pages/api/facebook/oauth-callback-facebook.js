import { getFacebookAccessToken } from "../../../lib/user";

export default async function FacebookCallback(req, res) {
  try {
    console.log("run getFacebookAccessToken");
    await getFacebookAccessToken(req.query)
      .then((data) => {
        console.log("data", data, "\n res", res.body);
        res.status(200).redirect("/settings?facebookAcces=refresh");
      })
      .catch((error) => {
        res.status(409).redirect("/settings?facebookAcces=failedRefresh");
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
