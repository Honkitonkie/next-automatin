import { createUser } from "../../lib/user";

export default async function signup(req, res) {
  try {
    const answer = await createUser(req.body);
    if (answer === "gelukt!") {
      res.status(200).send({ done: true });
    } else {
      res.status(409).send(answer);
    }
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
