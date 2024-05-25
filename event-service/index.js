const app = require('./app');
const logger = require('../shared/config/logger');

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  logger.info(`Event Service running on port ${PORT}`);
});
