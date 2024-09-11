import { redisClient } from '../config/redis.js';

const CONNECTIONS_EXPIRY = 60; // 1 minute
const MESSAGES_EXPIRY = 60; // 1 minute

export const throttleConnection = async (clientId) => {
  const connectionsKey = `connections:${clientId}`;
  const connections = await redisClient.incr(connectionsKey);
  await redisClient.expire(connectionsKey, CONNECTIONS_EXPIRY);

  return connections > parseInt(process.env.MAX_CONNECTIONS_PER_CLIENT);
};

export const rateLimitMessages = async (clientId) => {
  const messagesKey = `messages:${clientId}`;
  const messages = await redisClient.incr(messagesKey);
  await redisClient.expire(messagesKey, MESSAGES_EXPIRY);

  return messages > parseInt(process.env.MAX_MESSAGES_PER_MINUTE);
};
