let nodemailer = require('nodemailer');
let mysql = require('mysql');
let db = require('./db');

module.exports = (email, userId, name) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'rusak.mateusz2@gmail.com',
          pass: 'kopytko02'
        }
      });

    let mailOptions = {
        from: 'rusak.mateusz2@gmail.com',
        to: email,
        subject: 'Confirm your new @rusio-chat-app account',
        html: `<h1>Hi ${name}</h1>
                <p>Confirm your email address to complete sign up.</p>
                <p>You registered with email: <b>${email}</b></p>
                <a href="http://localhost:3001/api/confirm/${userId}">Confirm your address here!</a>
                `
                        
      };

    let connection = mysql.createConnection(db);
    let time = new Date();

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        }
    });
}