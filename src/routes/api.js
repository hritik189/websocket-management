import express from 'express';
import { getActiveConnections, getConnectionStats, disconnectClient } from '../controllers/connectionController.js';
import { getMessageStats, clearMessageQueue } from '../controllers/messageController.js';
import { updateHeartbeatSettings } from '../controllers/heartbeatController.js';

const router = express.Router();

// Connection related endpoints
router.get('/connections', getActiveConnections);
router.get('/connections/stats', getConnectionStats);
router.post('/connections/disconnect', disconnectClient);

// Message related endpoints
router.get('/messages/stats', getMessageStats);
router.post('/messages/clear-queue', clearMessageQueue);

// Heartbeat related endpoints
router.post('/heartbeat/settings', updateHeartbeatSettings);

export default router;