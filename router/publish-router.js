const express = require('express')
const publishMessage = require('../services/rabbitMq/helper')
const { JSDOM } = require('jsdom')
const { window } = new JSDOM()

const router = express.Router()

router.post('/publish', async(req,res)=>{
    try{
        const start = window.performance.now()
    const exchangeName = req.body.exchangeName
    const exchangeType = req.body.exchangeType
    const routingKey = req.body.routingKey
    const message = req.body.message
    const headers = req.body.headers
    const deliveryMode = req.body.deliveryMode
    await publishMessage(exchangeName,exchangeType, routingKey, message, headers, deliveryMode)
    const stop = window.performance.now()
    console.log(stop-start);
        res.status(200).send({status : "ok", message : "message sent succesfully"})
    }
    catch(err){
        res.status(400).send({status : "fail", error : err})
    }
})

module.exports = router