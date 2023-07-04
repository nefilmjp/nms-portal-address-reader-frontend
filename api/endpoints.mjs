import * as dotenv from 'dotenv';
import { extendedFetch } from './extendedFetch.mjs';
dotenv.config();
const apiUrl = process.env['PUBLIC_API_TRANSFER_URL']
    ? process.env['PUBLIC_API_TRANSFER_URL']
    : '';
export const endpoints = (fastify, _options, done) => {
    fastify.get('/api/health', async () => await extendedFetch(`${apiUrl}/api/health`, {
        method: 'GET',
        timeout: 1000,
        maxRetryCount: 0,
    })
        .then(() => true)
        .catch(() => false));
    fastify.post('/api/parse', async (req) => {
        const body = JSON.stringify(req.body);
        const result = await extendedFetch(`${apiUrl}/api/parse`, {
            method: 'POST',
            timeout: 5000,
            maxRetryCount: 0,
            headers: {
                'Content-Type': 'application/json',
            },
            body,
        })
            .then((res) => res.json())
            .catch(() => false);
        return result;
    });
    done();
};
