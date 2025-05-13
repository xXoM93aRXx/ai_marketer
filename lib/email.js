const nodemailer = require("nodemailer");

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_FROM.match(/<(.*)>/)?.[1] || process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Common Email Template for Consistency
function generateEmailTemplate({ title, message, link, buttonText }) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 20px auto; border: 1px solid #ddd; border-radius: 8px; overflow: hidden;">
        <div style="background-color: #fff; padding: 20px; text-align: center;">
          <h1 style="color: #333; font-size: 24px;">PostBot</h1>
        </div>
        <div style="padding: 20px;">
          <h2 style="font-size: 20px; margin-bottom: 10px;">${title}</h2>
          <p style="font-size: 16px; margin-bottom: 20px;">${message}</p>
          <div style="text-align: center;">
            <a href="${link}" style="background-color: #0077cc; color: #fff; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block;">
              ${buttonText}
            </a>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center;">
          <p style="font-size: 12px; color: #888;">If you did not request this, please ignore this email.</p>
        </div>
      </div>
    </div>
  `;
}

// Send confirmation email with a modern template
async function sendConfirmationEmail({ to, name = "", token }) {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const verifyLink = `${baseUrl}/api/verify/${token}`;

  const message = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Verify your email - PostBot",
    html: generateEmailTemplate({
      title: `Hello${name ? ` ${name}` : ""}, Verify Your Email`,
      message: `Please click the button below to verify your email address for PostBot.`,
      link: verifyLink,
      buttonText: "Verify Email",
    }),
  };

  await transporter.sendMail(message);
}

// Send password setup email with a modern template
async function sendPasswordSetupEmail({ to, token }) {
  const baseUrl = process.env.NEXTAUTH_URL;
  const link = `${baseUrl}/setup-password/${token}`;

  const message = {
    to,
    from: process.env.EMAIL_FROM,
    subject: "Set Your Password - PostBot",
    html: generateEmailTemplate({
      title: "Set Your Password",
      message: "Click the button below to set your password for your PostBot account.",
      link: link,
      buttonText: "Set Password",
    }),
  };

  await transporter.sendMail(message);
}

module.exports = { 
  sendConfirmationEmail,
  sendPasswordSetupEmail,
};
