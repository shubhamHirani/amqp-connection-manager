const amqp = require('amqp-connection-manager');

let connected = null
const startConnection = async () =>{


 // Create RabbitMQ connection
 connected = await amqp.connect("amqp://guest:guest@localhost:5672");
 console.log('connection');
 return connected
}
const connect =startConnection()
module.exports = connect 