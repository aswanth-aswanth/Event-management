const createChannel = require('../../shared/config/rabbitmq');

exports.publishEvent = (event) => {
  createChannel((channel, connection) => {
    const exchange = 'events';
    channel.assertExchange(exchange, 'fanout', { durable: false });
    channel.publish(exchange, '', Buffer.from(JSON.stringify(event)));
    console.log(" [x] Sent %s", event);

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};
