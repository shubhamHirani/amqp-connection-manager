const amqp = require('amqp-connection-manager');

var QUEUE_NAME = 'test';
// Handle an incomming message.
var onMessage = function (data) {
    var message = JSON.parse(data.content.toString());
     console.log("receiver: got message", message);
     channelWrapper.ack(data);
}

// Create a connetion manager
var connection = amqp.connect("amqp://guest:guest@localhost:5672", {reconnectTimeInSeconds: 2, json: true});
connection.on('connect', function () {
    console.log('Connected!');
});
connection.on('disconnect', function (params) {
    console.log('Disconnected.', params.err.stack);
});

// Set up a channel listening for messages in the queue.
var channelWrapper = connection.createChannel({
    setup: function (channel) {
        // `channel` here is a regular amqplib `ConfirmChannel`.
        return Promise.all([
            channel.assertQueue(QUEUE_NAME, {durable: true,contentType: "application/json" }),
            channel.prefetch(0),
            channel.consume(QUEUE_NAME, onMessage)
        ]);
    }
});

channelWrapper.waitForConnect()
    .then( function () {
       console.log("Listening for messages");
    });