// import nextConnect from "next-connect";
// import auth from "../../middleware/auth";
// import { getAllUsers, createUser, findUserByEmail } from "../../lib/db";

// const handler = nextConnect();

// handler
//   .use(auth)
//   .get((req, res) => {
//     // For demo purpose only. You will never have an endpoint which returns all users.
//     // Remove this in production
//     res.json({ users: getAllUsers(req) });
//   })
//   .post((req, res) => {
//     const { email, password, company } = req.body;
//     if (!email || !password || !company) {
//       return res.status(400).send("Missing fields");
//     }
//     // Here you check if the email has already been used
//     const emailExisted = !!findUserByEmail(req, email);
//     if (emailExisted) {
//       return res.status(409).send("The email has already been used");
//     }
//     const user = { email, password, company };
//     // Security-wise, you must hash the password before saving it
//     // const hashedPass = await argon2.hash(password);
//     // const user = { email, password: hashedPass, company }
//     createUser(req, user);
//     req.logIn(user, (err) => {
//       if (err) throw err;
//       // Log the signed up user in
//       res.status(201).json({
//         user,
//       });
//     });
//   });

// export default handler;
