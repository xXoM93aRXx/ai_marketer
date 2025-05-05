const nodemailer = require("nodemailer");

// Extract credentials from EMAIL_SERVER or use manual fields
const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM.match(/<(.*)>/)?.[1] || process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendConfirmationEmail({ to, name = "", token }) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyLink = `${baseUrl}/api/verify/${token}`;

  const message = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Verify your email - AI Marketer",
    text: `Click to verify your account: ${verifyLink}`,
    html: `
      <p>Hi${name ? ` ${name}` : ""},</p>
      <p>Click below to verify your email:</p>
      <a href="${verifyLink}">${verifyLink}</a>
    `,
  };

  await transporter.sendMail(message);
}


async function sendPasswordSetupEmail({ to, token }) {
  const baseUrl = process.env.NEXTAUTH_URL;
  const link = `${baseUrl}/setup-password/${token}`;

  const message = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Set your password - AI Marketer",
    text: `Click the link to set your password: ${link}`,
    html: `<p>Click below to set your password:</p><a href="${link}">${link}</a>`,
  };

  await transporter.sendMail(message);
}

module.exports = { 
  sendConfirmationEmail,
  sendPasswordSetupEmail,
 };
