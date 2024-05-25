const app = require('./app');
const logger = require('../shared/config/logger');

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`User Service running on port ${PORT}`);
});
