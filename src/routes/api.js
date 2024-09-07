import express from 'express';
import Connection from '../models/Connection.js';
import Message from '../models/Message.js';

const router = express.Router();

// Get all active connections
router.get('/connections', async (req, res) => {
  try {
    const connections = await Connection.find();
    res.json(connections);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get connection statistics
router.get('/stats', async (req, res) => {
  try {
    const connectionCount = await Connection.countDocuments();
    const messageCount = await Message.countDocuments();
    res.json({ connections: connectionCount, messages: messageCount });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get recent messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }).limit(10);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;