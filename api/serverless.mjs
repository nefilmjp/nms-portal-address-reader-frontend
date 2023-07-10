import cors from '@fastify/cors';
import { server } from './libs/server.mjs';
await server.register(cors, {
    origin: [
        'nmspar.vercel.app',
        /^nms-portal-address-reader-frontend.*\.vercel\.app$/,
    ],
});
export default async function handler(req, res) {
    await server.ready();
    server.server.emit('request', req, res);
}
