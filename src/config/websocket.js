import { WebSocketServer } from 'ws';
import { createClient } from 'redis';
import { handleConnection } from '../controllers/websocketController.js';

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  const redisClient = createClient({ url: process.env.REDIS_URL });

  redisClient.on('error', (err) => console.error('Redis Client Error', err));

  wss.on('connection', (ws) => {
    try {
      handleConnection(ws, redisClient);
    } catch (err) {
      console.error('WebSocket connection error:', err);
      ws.close(1011, 'Internal server error');
    }
  });

  return wss;
};


export default setupWebSocket;