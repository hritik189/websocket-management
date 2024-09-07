import Connection from '../models/connection.js';

export const updateLastHeartbeat = async (connectionId) => {
    await Connection.findByIdAndUpdate(connectionId, { lastHeartbeat: Date.now() });
};

export const getActiveConnectionsCount = async () => {
    return await Connection.countDocuments();
};