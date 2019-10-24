const nodemailer = require('nodemailer');
const log = require('./log');
const links = require('./links');

module.exports = (email, userId, name) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'rusak.mateusz2@gmail.com',
      pass: 'kopytko02',
    },
  });

  const mailOptions = {
    from: 'rusak.mateusz2@gmail.com',
    to: email,
    subject: 'Confirm your new @rusio-chat-app account',
    html: `<h1>Hi ${name}</h1>
                <p>Confirm your email address to complete sign up.</p>
                <p>You registered with email: <b>${email}</b></p>
                <a href="${links.api}/api/confirm/${userId}">Confirm your address here!</a>
                <br>
                <p>Best regards,</p>
                <p>Mateusz Rusak</p>
                `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      log(userId, 'Send mail error');
    } else {
      log(userId, `Mail sent to ${email}`);
    }
  });
};
