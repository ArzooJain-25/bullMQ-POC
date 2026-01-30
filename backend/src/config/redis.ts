import { Redis, RedisOptions } from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

const redisConfig: RedisOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD || undefined,
    maxRetriesPerRequest: null, // Required for BullMQ
};

export const redisConnection = new Redis(redisConfig);

redisConnection.on('connect', () => {
    console.log('✅ Connected to Redis');
    console.log(`Redis Host: ${redisConfig.host}:${redisConfig.port}`);
});

redisConnection.on('error', (err: any) => {
    if (err.message.includes('NOAUTH')) {
        console.error('❌ REDIS AUTH ERROR: Your Redis server requires a password.');
        console.error('👉 Please add REDIS_PASSWORD=your_password to the backend/.env file.');
    } else {
        console.error('❌ Redis Connection Error:', err.message);
    }
});
