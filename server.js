const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const routes = require('./src/routes/index');
const { IndexController } = require('./src/controllers/index');
const networkMonitor = require('./src/utils/network-monitor');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const indexController = new IndexController();

// Middleware
app.use(express.static(path.join(__dirname, 'src/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Routes
routes(app, indexController);

// Socket.IO connection
io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit network data every second
    setInterval(async () => {
        const networkData = await networkMonitor.getNetworkData();
        socket.emit('networkData', networkData);
    }, 1000);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});