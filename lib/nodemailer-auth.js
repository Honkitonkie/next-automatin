export function setTransporter() {
  return {
    port: 465,
    host: process.env.EMAILHOST,
    auth: {
      user: process.env.EMAILUSER,
      pass: process.env.EMAILPASSWORD,
    },
    secure: true,
  };
}
