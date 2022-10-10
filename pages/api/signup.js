import { createUser } from "../../lib/user";

export default async function signup(req, res) {
  try {
    const result = await createUser(req.body);
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}
