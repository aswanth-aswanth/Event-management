const amqp = require("amqplib/callback_api");
const sendNotification = require("./notificationSender2");
const axios = require("axios");

const createChannel = (callback) => {
  amqp.connect("amqp://localhost", (err, connection) => {
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

const consumeMessages = (queue, callback) => {
  createChannel((channel, connection) => {
    channel.assertExchange("events", "fanout", { durable: false });
    channel.assertQueue(queue, { exclusive: true }, (err, q) => {
      if (err) {
        throw err;
      }
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        q.queue
      );
      channel.bindQueue(q.queue, "events", "");

      channel.consume(
        q.queue,
        (msg) => {
          if (msg.content) {
            console.log(" [x] %s", msg.content.toString());
            callback(JSON.parse(msg.content.toString()));
          }
        },
        {
          noAck: true,
        }
      );
    });
  });
};

// Start consuming messages
consumeMessages("", async (message) => {
  if (message.type === "TICKET_CREATED") {
    // Handle ticket created
    console.log("consume message.type : ", message.type);
    // sendNotification([`Ticket created: ${message.data._id}`]);
  } else if (message.type === "TICKET_UPDATED") {
    // Handle ticket updated
    console.log("consume message.type : ", message.type);
    // sendNotification([`Ticket updated: ${message.data._id}`]);
  } else if (message.type === "TICKET_DELETED") {
    // Handle ticket deleted
    console.log("consume message.type : ", message.type);
    // sendNotification([`Ticket deleted: ${message.data._id}`]);
  } else if (message.type === "EVENT_CREATED") {
    console.log("consume message.type : ", message.type);
    console.log("consume message : ", message);
    // Fetch all users from User Service
    try {
      const response = await axios.get("http://localhost:5001/api/users");
      const users = response.data;
      const userEmails = users.map((user) => user.email);
      console.log("User emails: ", userEmails);

      // Send notification to all users
      sendNotification(
        userEmails,
        `New Event: ${message.data.name}`,
        `An event titled "${message.data.name}" will be commenced on ${message.data.date}.
        ${message.data.description}. The location will be ${message.data.location}`
      );
    } catch (error) {
      console.error("Error fetching users or sending notifications:", error);
    }
    
  } else if (message.type === "EVENT_UPDATED") {

    console.log("consume message.type : ", message.type);
    try {
      const response = await axios.get("http://localhost:5001/api/users");
      const users = response.data;
      const userEmails = users.map((user) => user.email);
      console.log("User emails: ", userEmails);
      sendNotification(
        userEmails,
        `Event updated: ${message.data.name}`,
        `An event titled "${message.data.name}" will be commenced on ${message.data.date}.
        ${message.data.description}. The location will be ${message.data.location}`
      );
    } catch (error) {
      console.error("Error fetching users or sending notifications:", error);
    }

  } else if (message.type === "EVENT_DELETED") {
    console.log("consume message.type : ", message.type);
    try {
      const response = await axios.get("http://localhost:5001/api/users");
      const users = response.data;
      const userEmails = users.map((user) => user.email);
      console.log("User emails: ", userEmails);
      sendNotification(
        userEmails,
        `Event cancelled: ${message.data.name}`,
        `An event titled "${message.data.name}" is cancelled on ${message.data.date}.
        ${message.data.description}. The location of the event was ${message.data.location}`
      );
    } catch (error) {
      console.error("Error fetching users or sending notifications:", error);
    }
  }
});
