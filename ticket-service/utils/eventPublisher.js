const amqp = require('amqplib/callback_api');
const config = require('../config/default');

const createChannel = (callback) => {
  amqp.connect(config.rabbitmqurl, (err, connection) => {
    if (err) {
      throw err;
    }
    connection.createChannel((err, channel) => {
      if (err) {
        throw err;
      }
      callback(channel, connection);
    });
  });
};

exports.publishEvent = (event) => {
  createChannel((channel, connection) => {
    const exchange = 'events';
    channel.assertExchange(exchange, 'fanout', { durable: false });
    channel.publish(exchange, '', Buffer.from(JSON.stringify(event)));
    console.log(" [x] Sent %s", JSON.stringify(event));

    setTimeout(() => {
      connection.close();
    }, 500);
  });
};
