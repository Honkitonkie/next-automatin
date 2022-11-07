import { getFacebookTest } from "../../../lib/user";

export default async function FacebookCallback(req, res) {
  try {
    await getFacebookTest(req.body.email)
      .then((data) => {
        console.log("data", data);
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
