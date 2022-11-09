import { createUser } from "../../lib/user";
import { setTransporter } from "../../lib/nodemailer-auth";

export default async function signup(req, res) {
  try {
    console.log("req.body");

    await sendMail(req.body);
    const result = await createUser(req.body);
    res.status(200).json({ result: result });
  } catch (err) {
    res.status(500).json({ error: err });
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
    <div> Hey,<br><br> Nieuwe inschrijving van "${body.username}" op automatin.nl met mail ${body.email}</div>

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
