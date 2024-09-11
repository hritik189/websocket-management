import { createClient } from 'redis';

let redisClient;

const connectRedis = async () => {
    try {
        redisClient = createClient({
            url: process.env.REDIS_URL || 'redis://localhost:6379'
        });

        redisClient.on('error', (err) => console.log('Redis Client Error', err));

        await redisClient.connect();
        console.log('Redis connected successfully');
    } catch (error) {
        console.error('Redis connection error:', error);
        process.exit(1);
    }
};

export { connectRedis, redisClient };