import Message from '../models/Message.js';
import { clearQueue } from '../services/messageService.js';

export const getMessageStats = async (req, res) => {
    try {
        const totalMessages = await Message.countDocuments();
        const messagesLastHour = await Message.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 3600000) }
        });
        const averagePriority = await Message.aggregate([
            { $group: { _id: null, avgPriority: { $avg: '$priority' } } }
        ]);

        res.json({
            totalMessages,
            messagesLastHour,
            averagePriority: averagePriority[0]?.avgPriority || 0,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve message stats' });
    }
};

export const clearMessageQueue = async (req, res) => {
    try {
        await clearQueue();
        res.json({ message: 'Message queue cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear message queue' });
    }
};