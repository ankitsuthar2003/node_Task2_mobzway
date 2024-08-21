const socketIo = require('socket.io');

let io;
let users = {};

const initSocket = (server) => {
    io = socketIo(server);

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        // Join the "live users" room
        socket.join('live users');

        // Handle a user joining
        socket.on('userJoined', (user) => {
            users[user.email] = { name: user.name, email: user.email, socketId: socket.id };
            console.log('User joined:', users);
            io.to('live users').emit('updateUserList', users);
        });

        // Handle user disconnection
        socket.on('disconnect', () => {
            Object.keys(users).forEach(email => {
                if (users[email].socketId === socket.id) {
                    delete users[email];
                    io.to('live users').emit('updateUserList', users);
                }
            });
            console.log('User disconnected:', socket.id);
        });
    });
};

const getIo = () => io;

module.exports = { initSocket, getIo };
