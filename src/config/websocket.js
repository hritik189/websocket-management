import { WebSocketServer } from 'ws';
import { createClient } from 'redis';
import { handleConnection } from '../controllers/websocketController.js';

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  const redisClient = createClient({ url: process.env.REDIS_URL });

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  wss.on('connection', (ws) => handleConnection(ws, redisClient));

  return wss;
};

export default setupWebSocket;