import cors from '@fastify/cors';
import * as dotenv from 'dotenv';

import { server } from './libs/server.mjs';

dotenv.config();

const port = process.env['PUBLIC_MOCK_PORT']
  ? parseInt(process.env['PUBLIC_MOCK_PORT'], 10)
  : 5050;

await server.register(cors, {
  origin: '*',
});

await server.ready();

await server.listen({ port, host: '0.0.0.0' });

console.log();
