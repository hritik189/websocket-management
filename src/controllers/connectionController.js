import Connection from '../models/Connection.js';

export const getActiveConnections = async (req, res) => {
    try {
        const connections = await Connection.find().sort('-createdAt').limit(100);
        res.json(connections);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve active connections' });
    }
};

export const getConnectionStats = async (req, res) => {
    try {
        const totalConnections = await Connection.countDocuments();
        const activeLastMinute = await Connection.countDocuments({
            lastHeartbeat: { $gte: new Date(Date.now() - 60000) }
        });

        res.json({
            totalConnections,
            activeLastMinute,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve connection stats' });
    }
};

export const disconnectClient = async (req, res) => {
    const { clientId } = req.body;

    if (!clientId) {
        return res.status(400).json({ error: 'Client ID is required' });
    }

    try {
        const result = await Connection.deleteOne({ clientId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Client not found' });
        }
        res.json({ message: 'Client disconnected successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to disconnect client' });
    }
};