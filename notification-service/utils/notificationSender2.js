const nodemailer = require('nodemailer');
const config = {
  email: {
    service: 'gmail',
    user: 'aswanthndl@gmail.com',
    password: 'yourpassword',
    from: 'noreply@eventmanagementsystem.com',
    to: 'recipient@example.com'
  }
};

const sendNotification = (message) => {
  const transporter = nodemailer.createTransport({
    service: config.email.service,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });

  const mailOptions = {
    from: config.email.from,
    to: config.email.to,
    subject: 'Notification from Event Management System',
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