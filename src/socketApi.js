const socketio = require('socket.io');
const socketAuthorization = require('../middleware/socketAuthorization');
const io = socketio();

const socketApi = {};
socketApi.io = io;

//libs
const Users = require('./lib/users');

io.use(socketAuthorization);

//redis adapter
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({
    host: process.env.REDIS_URI,
    port: process.env.REDIS_PORT
}));

io.on('connection', socket => {
    console.log('a user logged in with name ' + socket.request.user.name);

    Users.upsert(socket.id, socket.request.user);
});

module.exports = socketApi;