import { updateUserFeedType } from "../../../lib/user";
import { setTransporter } from "../../../lib/nodemailer-auth";

export default async function updateFeedType(req, res) {
  try {
    await sendMail(req.body);
    await updateUserFeedType(req.body)
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

async function sendMail(body) {
  let nodemailer = require("nodemailer");
  const transporterObject = await setTransporter();
  const transporter = nodemailer.createTransport(transporterObject);
  console.log("sending message");
  const mailData = {
    from: "info@automatin.nl",
    to: "info@automatin.nl",
    subject: `FeedType update in setting`,
    html: `
    <div> Hey,<br><br> De feedtype is veranderd naar "${body.feedTypeSelector}" door ${body.email}</div>

    <p>Met geautomatiseerde groet, <br>
    Honkitonkie</p>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        result = err;
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
}
