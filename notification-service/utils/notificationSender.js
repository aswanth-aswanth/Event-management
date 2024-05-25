const nodemailer = require('nodemailer');
const config = require('config');
const logger = require('../../shared/config/logger');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: config.get('emailUser'),
    pass: config.get('emailPass')
  }
});

module.exports = (event) => {
  const mailOptions = {
    from: config.get('emailUser'),
    to: event.userEmail,
    subject: 'Event Notification',
    text: `Hello, there is an update on the event: ${event.eventName}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return logger.error(`Error: ${error}`);
    }
    logger.info(`Message sent: ${info.response}`);
  });
};
