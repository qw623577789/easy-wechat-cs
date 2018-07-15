const Client = require('../').Client;
const Express = require('express');

(async() => {
    let app = Express();
    let client = new Client();
    await client.init('127.0.0.1', 5211);

    app.post('/wxapp.msg.push', client.middleware.wxAppJsonMessage((request) => {
        console.log(request.body)
    }))
    
    app.post('/wxapp.msg.push', client.middleware.wxAppXmlMessage((request) => {
        console.log(request.body)
    }))
    
    app.use('/platform.msg.push', client.middleware.platformMessage((request, resource) => {
        console.log(request.body);
        return resource.text('2222222');
    }))
    
    app.use('/payment.notify', client.middleware.payment((request) => {
        console.log(request.body);
    }))
    
    app.use('/platform.user.oauth.code.get', async (request, response) => {
        console.log(request.query.code);
    })

    app.listen(5200, '0.0.0.0');
})()
