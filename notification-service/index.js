const app = require("./app");
const notificationConsumer = require("./utils/notificationConsumer");

const PORT = process.env.PORT || 5004;

app.listen(PORT, () => {
  console.log(`Notification Service running on port ${PORT}`);
});
