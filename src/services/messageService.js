import Message from '../models/Message.js';
import { PriorityQueue } from '../utils/priorityQueue.js';

const messageQueue = new PriorityQueue();

export const handleMessage = async (ws, message, connection) => {
    try {
        const parsedMessage = JSON.parse(message);
        const { content, priority = 0 } = parsedMessage;

        const newMessage = new Message({
            connectionId: connection._id,
            content,
            priority,
        });

        await newMessage.save();
        messageQueue.enqueue(newMessage, priority);

        processMessageQueue(ws);
    } catch (error) {
        console.error('Error handling message:', error);
        ws.send(JSON.stringify({ error: 'Invalid message format' }));
    }
};

const processMessageQueue = async (ws) => {
    while (!messageQueue.isEmpty()) {
        const message = messageQueue.dequeue();
        ws.send(JSON.stringify({ content: message.content }));
        await Message.findByIdAndUpdate(message._id, { sent: true });
    }
};