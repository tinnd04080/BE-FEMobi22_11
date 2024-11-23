import nodemailer from "nodemailer";

const sendMail = async ({ toEmail, title, content }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Send OTP email
    const mailOptions = {
      from: process.env.GMAIL,
      to: toEmail,
      subject: title,
      html: content,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

export default sendMail;
