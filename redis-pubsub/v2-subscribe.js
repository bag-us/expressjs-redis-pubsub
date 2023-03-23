const express = require('express');
const redis = require('redis')
const nodemailer = require('nodemailer')
const app = express();
const port = 9001;
require('dotenv').config()

const subscriber = redis.createClient({ url: 'redis://client:rahasia@localhost:6379' });
(async () => {
  subscriber.on("error", (error) => console.error(`Ups : ${error}`));
  await subscriber.connect();
  await subscriber.subscribe('posts', (message) => {
    const book = JSON.parse(message)
    if(book != null){
      sendMail(book)
    }else{
      console.log("Message empty")
    }
  });
})();

function sendMail(book){
  console.log(book)
  const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_TRANSPORTER,
        pass: process.env.PASS_APPLICATION
      }
    });
  
    const mailOptions = {
      from: process.env.EMAIL_TRANSPORTER,
      to: process.env.EMAIL_COMPANY,
      subject: book.subject,
      text: `Email from: ${book.form}\n\nMessage: ${book.message}`
    };
  
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) throw err;
      console.log('Email sent: ' + info.response);
    });
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
