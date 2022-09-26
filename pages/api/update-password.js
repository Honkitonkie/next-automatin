import { updatePassword } from "../../lib/user";

export default async function updatePass(req, res) {
  try {
    await updatePassword(req.body);
    res.status(200).send({ done: true });
  } catch (error) {
    console.error(error);
    res.status(500).end(error.message);
  }
}
