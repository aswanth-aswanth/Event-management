const app = require('./app');
const logger = require('../shared/config/logger');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`Auth Service running on port ${PORT}`);
});
