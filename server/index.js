const express = require("express");
const http = require("http");
const path = require("path");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const { initSocket } = require('./socket/socket');
const database = require('./config/database');

// Load environment variables
dotenv.config();


// Connect to the database
database.connect();

const app = express();
const server = http.createServer(app);

// Initialize Socket.io
initSocket(server);

// Middleware
app.use(express.json());

app.use(cors({
  origin: "*",  // Adjust this as necessary
  credentials: true,
}));
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/api/users', userRoutes);

// Serve the HTML files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/display-users', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/display-users.html'));
});

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});












// const express = require("express");
// const http = require("http");
// const path = require("path");
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// let users = {};

// io.on('connection', (socket) => {
//     console.log('A user connected:', socket.id);

//     socket.on('userJoined', (user) => {
//         users[user.email] = { name: user.name, socketId: socket.id };
//         io.emit('updateUserList', users);
//     });

//     socket.on('disconnect', () => {
//         for (const email in users) {
//             if (users[email].socketId === socket.id) {
//                 delete users[email];
//             }
//         }
//         io.emit('updateUserList', users);
//         console.log('User disconnected:', socket.id);
//     });
// });

//  app.use('/api/users', userRoutes);

// app.use(express.static(path.join(__dirname, '../client')));

// app.get('/display-users', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/display-users.html'));
// });

// server.listen(4000, () => {
//     console.log('Server is running on port 4000');
// });

