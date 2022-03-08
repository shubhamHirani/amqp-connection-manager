let connect = null;
(async()=>{
    connect =await require('../../connection/startConnection')
})()
/**
 * Publish message in RabbitMQ
 * @param  {string} exchangeName
 * @param  {string} exchangeType
 * @param  {string} routingKey
 * @param  {object} message
 * @param  {object={}} headers
 * @param  {number=2} deliveryMode
 * .
*/

const publishMessage = async(
    exchangeName,
    exchangeType,
    routingKey,
    message,
    headers,
    deliveryMode,
    ) => {

    // Create channel and configure exchange
    const channelWrapper = await connect.createChannel({
        json: true,
        setup: function (channel) {
          // `channel` here is a regular amqplib `ConfirmChannel`.
          return channel.assertExchange(exchangeName, exchangeType)
        },
      });
    // Publish message to the provided route and exchange
    await channelWrapper.publish(
        exchangeName, 
        routingKey, 
        JSON.stringify(message), 
        { 
            deliveryMode:deliveryMode, 
            headers: headers
        }
    ).then(function () {
        return console.log('Message was sent!  Hooray!');
      })
      .catch(function (err) {
        return console.log('Message was rejected...  Boo!', +err);
      });
};

module.exports = publishMessage