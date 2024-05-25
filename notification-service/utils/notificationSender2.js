const nodemailer = require('nodemailer');
const config = {
  email: {
    service: 'gmail',
    user: 'aswanth2t@gmail.com',
    password: 'eozy ywpl dagy xpuo',
    from: 'aswanth2t@gmail.com'
  }
};

const sendNotification = (recipients, subject, message) => {
  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });

  const mailOptions = {
    from: config.email.from,
    to: recipients.join(','),  // Join the array of recipients into a comma-separated string
    subject: subject,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending notification email:', error);
    } else {
      console.log('Notification email sent:', info.response);
    }
  });
};

module.exports = sendNotification;
