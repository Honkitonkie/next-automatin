import { getLinkedinAccessToken } from "../../../lib/user";

export default async function LinkedinCallback(req, res) {
  try {
    await getLinkedinAccessToken(req.query)
      .then(() => {
        res.status(200).redirect("/settings?linkedinAcces=refresh");
      })
      .catch((error) => {
        res.status(409).redirect("/settings?linkedinAcces=failedRefresh");
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
