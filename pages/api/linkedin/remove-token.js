import { removeAccessToken } from "../../../lib/user";

export default async function removeToken(req, res) {
  try {
    console.log("req.body.email", req.body.email);
    console.log("req.body", req.body);
    await removeAccessToken(req.body.email)
      .then((user) => {
        res.status(200).send("removed token");
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
