import { updateUser } from "../../lib/user";

export default async function update(req, res) {
  try {
    await updateUser(req.body)
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
