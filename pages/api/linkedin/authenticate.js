import { updateAccessToken } from "../../../lib/user";

export default async function authenticate(req, res) {
  try {
    console.log("running");
    await updateAccessToken()
      .then((data) => {
        res
          .status(200)
          .redirect(
            `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.LINKEDIN_REDIRECT_URI}&scope=r_liteprofile%20w_member_social%20w_organization_social%20rw_organization_admin&state=${req.query.email}`
          );
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
