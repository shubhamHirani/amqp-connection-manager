const express = require('express')
const publishMessage = require('../services/rabbitMq/helper')
const { JSDOM } = require('jsdom')
const { window } = new JSDOM()

const router = express.Router()

router.post('/publish', async(req,res)=>{
    try{
        const start = window.performance.now()
    const exchangeName = req.body.exchangeName
    const routingKey = req.body.routingKey
    const message = req.body.message
    const headers = req.body.headers
    const deliveryMode = req.body.deliveryMode
    for (let i = 0; i <10; i++){
    await publishMessage(exchangeName,routingKey, message, headers, deliveryMode)
    }
    const stop = window.performance.now()
    console.log(stop-start);

        res.status(200).send({status : "ok", message : "message sent succesfully"})
    }
    catch(err){
        res.status(400).send({status : "fail", error : err})
    }
})

router.get('/', async(req,res)=>{
    console.log('checking');
    res.send('ok')
})

module.exports = router