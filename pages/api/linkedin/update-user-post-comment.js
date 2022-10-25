import { updateUserAddComment } from "../../../lib/user";

export default async function updateUserCompanyUrn(req, res) {
  try {
    await updateUserAddComment(req.body)
      .then((user) => {
        res.status(200).send(user);
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
