const app = require('./app');
const logger = require('../shared/config/logger');
// const { consumeEvents } = require('./utils/eventConsumer');
const  notificationConsumer  = require('./utils/notificationConsumer');

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  logger.info(`Notification Service running on port ${PORT}`);
});
