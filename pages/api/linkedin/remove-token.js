import { removeLinkedinAccessToken } from "../../../lib/user";

export default async function removeToken(req, res) {
  try {
    await removeLinkedinAccessToken(req.body.email)
      .then((user) => {
        res.status(200).redirect("/settings?removeLinkedinToken=verwijderd");
      })
      .catch((error) => {
        res.status(409).redirect("/settings?removeLinkedinToken=failed");
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
