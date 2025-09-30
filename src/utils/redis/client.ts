import { createClient } from 'redis';
import { REDIS_URL } from '../../config';

const client = createClient({
    url: REDIS_URL,
});

client.on('error', (err) => console.error('Redis Client Error', err));

async function connectRedis() {
    if (!client.isOpen) {
        await client.connect();
        console.log('Redis connected');
    }
}

connectRedis().catch(console.error);

export default client;