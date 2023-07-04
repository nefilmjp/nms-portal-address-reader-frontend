import cors from '@fastify/cors';
import { server } from './server.mjs';
await server.register(cors, {
    origin: /\.vercel\.app$/,
});
export default async function handler(req, res) {
    await server.ready();
    server.server.emit('request', req, res);
}
