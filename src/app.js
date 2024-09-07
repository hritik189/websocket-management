import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import setupWebSocket from './config/websocket.js';
import apiRoutes from './routes/api.js';

dotenv.config();

const app = express();
const server = http.createServer(app);

connectDB();
setupWebSocket(server);

app.use(express.json());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});