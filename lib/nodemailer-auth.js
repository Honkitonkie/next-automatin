export async function setTransporter() {
  const transporter = {
    port: 465,
    host: process.env.EMAILHOST,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASSWORD,
    },
    secure: true,
  };
  return transporter;
}
