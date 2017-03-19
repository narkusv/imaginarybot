var server = require('http').Server();

var io = require('socket.io')(server);

var Redis = require('ioredis');
var redis = new Redis();

redis.subscribe('tester', function (err, count) {
   console.log("subscribed");
});
redis.on('message', function (channel, message) {
    console.log(channel, message);
    message = JSON.parse(message);
    const emmitChannel = `${channel}:${message.event}`;
    io.emit(emmitChannel, message.data);
});

server.listen(6001);