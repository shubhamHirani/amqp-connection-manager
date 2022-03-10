const amqp = require('amqp-connection-manager');


let connected = null
const startConnection = async () =>{
    
    // Create RabbitMQ connection
     connected = await amqp.connect("amqp://guest:guest@localhost:5672");
    console.log('connection started');
    return connected
}



const createChannelWrapper = async ()=>{
    const sampleUsers =await require('../common/constants/rabbitMq')
    const users = Object.keys(sampleUsers)

    // Create channel and configure exchange
    const channelWrapper = await connected.createChannel({
        json: true,
        setup: function (channel) {
            channel.assertExchange('deadletter', 'direct')
            channel.assertQueue('DEQ' , { 
                arguments: {
                'x-dead-letter-exchange': 'deadletter',
                'x-dead-letter-routing-key': 'anything',
                'x-message-ttl': 150000,
                'x-expires': 100000
            }})
            channel.bindQueue('DEQ', "deadletter", 'anything')
            users.forEach((user)=>{
            // `channel` here is a regular amqplib `ConfirmChannel`.
            return channel.assertExchange(sampleUsers[user].exchange, sampleUsers[user].exchange_type)
        })
        }
    })
    return channelWrapper
}
// const channelWrapper = createChannelWrapper()
// const connect =startConnection()
module.exports = {createChannelWrapper,startConnection}