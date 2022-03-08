const app = require('./app')


const port = process.env.PORT ||3000


app.get('/', (req,res)=>{
    res.send('inside amqp-connection-manager api')
})

app.listen(port,async()=>
{
    console.log('this app is running on port ', port);
})