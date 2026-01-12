import nodemailer from "nodemailer";
import AppConfig from "../config/app.config";

const transporter = nodemailer.createTransport({
  host: AppConfig.SMTP_HOST,
  port: 587,
  auth: {
    user: AppConfig.SMTP_FROM,
    pass: AppConfig.SMTP_PASSWORD,
  },
});

const sendEmail = async ({
  from = AppConfig.SMTP_FROM,
  to,
  subject,
  html,
}: {
  from?: string;
  to: string;
  subject: string;
  html: string;
}) => {
  await transporter.sendMail({ html, to, from, subject });
};

export default sendEmail;
