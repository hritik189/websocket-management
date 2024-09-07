import { throttleConnection, rateLimitMessages } from '../utils/rateLimiter.js';
import { handleMessage } from '../services/messageService.js';
import { startHeartbeat } from '../services/heartbeatService.js';
import Connection from '../models/connection.js';

export const handleConnection = async (ws, redisClient) => {
    const clientId = ws._socket.remoteAddress;

    if (await throttleConnection(clientId, redisClient)) {
        ws.close(1008, 'Too many connections');
        return;
    }

    const connection = new Connection({ clientId });
    await connection.save();

    ws.on('message', async (message) => {
        if (await rateLimitMessages(clientId, redisClient)) {
            ws.send(JSON.stringify({ error: 'Rate limit exceeded' }));
            return;
        }

        await handleMessage(ws, message, connection);
    });

    ws.on('close', async () => {
        await Connection.findByIdAndDelete(connection._id);
    });

    startHeartbeat(ws, connection);
};