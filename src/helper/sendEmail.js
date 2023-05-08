import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const sendEmail = (from, to, subject, html) => {
  transporter.sendMail(
    {
      from: from, // sender address
      to, // list of receivers
      subject, // Subject line
      html,
    },
    (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

export default sendEmail;
