import { getAccessToken } from "../../../lib/user";

export default async function LinkedinCallback(req, res) {
  try {
    const backURL = req.headers.referer || "/settings";
    await getAccessToken(req.query)
      .then(() => {
        res.status(200).redirect(backURL);
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
