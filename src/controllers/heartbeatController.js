import { updateHeartbeatIntervals } from '../services/heartbeatService.js';

export const updateHeartbeatSettings = async (req, res) => {
    const { minInterval, maxInterval } = req.body;

    if (!minInterval || !maxInterval || minInterval >= maxInterval) {
        return res.status(400).json({ error: 'Invalid heartbeat settings' });
    }

    try {
        await updateHeartbeatIntervals(minInterval, maxInterval);
        res.json({ message: 'Heartbeat settings updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update heartbeat settings' });
    }
};