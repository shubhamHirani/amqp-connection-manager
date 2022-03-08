let connect = null;
let channelWrapper = null;
(async()=>{
    const {createChannelWrapper, startConnection} =await require('../../connection/startConnection')
    connect = await startConnection()
    channelWrapper = await createChannelWrapper()
})()
/**
 * Publish message in RabbitMQ
 * @param  {string} routingKey
 * @param  {object} message
 * @param  {object={}} headers
 * @param  {number=2} deliveryMode
 * 
*/

const publishMessage = async(
    exchangeName,
    routingKey,
    message,
    headers,
    deliveryMode,
    ) => {
    // Publish message to the provided route and exchange  
    await channelWrapper.publish(
        exchangeName, 
        routingKey, 
        JSON.stringify(message), 
        { 
            deliveryMode:deliveryMode, 
            headers: headers
        }
    )
      .catch(function (err) {
        return console.log('Message was rejected...  Boo!', +err);
      });
};

module.exports = publishMessage