const app = require('./app');
const logger = require('../shared/config/logger');

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  logger.info(`Ticket Service running on port ${PORT}`);
});
