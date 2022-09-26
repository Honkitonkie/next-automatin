import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "../../lib/password-local";
import { setLoginSession } from "../../lib/auth";

const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        console.log("err @ authenticate");
        reject(error);
      } else {
        console.log("succes @ authenticate");
        resolve(token);
      }
    })(req, res);
  });

passport.use(localStrategy);

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      const user = await authenticate("local", req, res);
      // session is the payload to save in the token, it may contain basic info about the user

      // console.log("got a user in nextConnect", user.email);

      const session = { ...user };
      console.log("session email @nextconnect >> ", session._doc.email);

      await setLoginSession(res, session);

      res.status(200).send({ done: true });
    } catch (error) {
      console.error(error);
      res.status(401).send(error.message);
    }
  });
