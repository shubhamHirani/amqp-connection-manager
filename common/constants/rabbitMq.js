/**
 * All the RabbitMQ related constants.
 */

const queueMapping = {
    /* 
    All the rabbitMQ queue configurations, which are being used into the service.
    */

    SAMPLE_USER: {
        routingKey: "sample_user",
        queue: 'sample_user_q',
        worker_count: 0,
        exchange_type: 'direct',
        exchange: 'wotnot.direct'
    }
};

module.exports = queueMapping