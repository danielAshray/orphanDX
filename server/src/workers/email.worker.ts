import { Queue, Worker } from "bullmq";
import sendEmail from "../utils/emailService";

const connection = { host: "127.0.0.1", port: 6379 };

const emailQueue = new Queue("email-queue", {
  connection,
});

new Worker(
  "email-queue",
  async (job) => {
    const { html, subject, to } = job.data;
    await sendEmail({ html, subject, to });
    console.log("Email successfully sent");
  },
  { connection }
);

export default emailQueue;
