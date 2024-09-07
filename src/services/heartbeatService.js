import { updateLastHeartbeat, getActiveConnectionsCount } from './conncectionService.js';

const MIN_INTERVAL = 10000; // 10 seconds
const MAX_INTERVAL = 60000; // 1 minute

export const startHeartbeat = (ws, connection) => {
    let interval = MIN_INTERVAL;

    const sendHeartbeat = async () => {
        try {
            const activeConnections = await getActiveConnectionsCount();
            interval = calculateHeartbeatInterval(activeConnections);

            ws.send(JSON.stringify({ type: 'heartbeat' }));
            await updateLastHeartbeat(connection._id);
        } catch (error) {
            console.error('Heartbeat error:', error);
        }
    };

    const heartbeatInterval = setInterval(sendHeartbeat, interval);

    ws.on('close', () => {
        clearInterval(heartbeatInterval);
    });
};

const calculateHeartbeatInterval = (activeConnections) => {
    // Adjust interval based on the number of active connections
    const scaleFactor = Math.min(activeConnections / 100, 1);
    return MIN_INTERVAL + scaleFactor * (MAX_INTERVAL - MIN_INTERVAL);
};

