const createChannel = require('../../shared/config/rabbitmq');
const sendNotification = require('./notificationSender');

exports.consumeEvents = () => {
  createChannel((channel) => {
    const exchange = 'events';
    channel.assertExchange(exchange, 'fanout', { durable: false });
    channel.assertQueue('', { exclusive: true }, (err, q) => {
      if (err) throw err;
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      channel.bindQueue(q.queue, exchange, '');
      channel.consume(q.queue, (msg) => {
        if (msg.content) {
          const event = JSON.parse(msg.content.toString());
          sendNotification(event);
        }
      }, {
        noAck: true
      });
    });
  });
};
