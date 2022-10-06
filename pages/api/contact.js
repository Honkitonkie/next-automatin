export default async function (req, res) {
  require("dotenv").config();

  let nodemailer = require("nodemailer");

  console.log("user: ", process.env.EMAILUSER, "pass", process.env.EMAILPASSWORD);

  const transporter = nodemailer.createTransport({
    port: 465,
    host: process.env.EMAILUSER,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASSWORD,
    },
    secure: true,
  });
  const mailData = {
    from: "info@automatin.nl",
    to: "info@automatin.nl",
    subject: `${req.body.subject}`,
    //   text: req.body.message + " | Sent from: " + req.body.email,
    html: `
    <div> Hey,<br> Er is een bericht achtergelaten vanaf automatin.nl/contact:</div>
    <div><strong>Message:</strong> ${req.body.message}</div>
    <br/>
    <div><p><strong>Onderwerp:</strong> ${req.body.subject}</p></div>
    <div><p><strong>Achtergelaten mailadres:</strong> ${req.body.email}</p></div>
    <p>Met geautomatiseerde groet, <br>
    Duncan uit het verleden</p>`,
  };
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, function (err, info) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
  res.status(200).json({ status: "OK" });
}
